import * as fs from 'node:fs';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BUCKET_BASE = 'http://hayc-react-apps.s3-website.eu-north-1.amazonaws.com';

function loadEnvVar(key: string): string {
  for (const envFile of ['.env.local', '.env']) {
    const envPath = path.resolve(__dirname, '..', envFile);
    if (!fs.existsSync(envPath)) continue;
    const content = fs.readFileSync(envPath, 'utf-8');
    const match = content.match(new RegExp('^' + key + '=(.+)$', 'm'));
    if (match) return match[1].trim();
  }
  return process.env[key] ?? '';
}

const SITE_ID = loadEnvVar('VITE_SITE_ID');

if (!SITE_ID) {
  console.error('VITE_SITE_ID is not set. Add it to your .env.local file:');
  console.error('VITE_SITE_ID=your-site-name');
  process.exit(1);
}

const CONFIG_URL = BUCKET_BASE + '/sites/' + SITE_ID + '/config/config.json';
const configTsPath = path.resolve(__dirname, '../src/config.ts');
const SKIP_KEYS = new Set(['version', 'exportedAt']);

function escapeString(str: string): string {
  return str
    .replace(/\\/g, '\\\\')
    .replace(/'/g, "\\'")
    .replace(/\r/g, '\\r')
    .replace(/\n/g, '\\n')
    .replace(/\t/g, '\\t');
}

function serializeValue(val: unknown, indent: number): string {
  const pad = '  '.repeat(indent);
  const innerPad = '  '.repeat(indent + 1);

  if (val === null) return 'null';
  if (typeof val === 'string') return "'" + escapeString(val) + "'";
  if (typeof val === 'number' || typeof val === 'boolean') return String(val);

  if (Array.isArray(val)) {
    if (val.length === 0) return '[]';
    const items = val.map(function(item) { return innerPad + serializeValue(item, indent + 1); });
    return '[\n' + items.join(',\n') + ',\n' + pad + ']';
  }

  if (typeof val === 'object') {
    const entries = Object.entries(val as Record<string, unknown>);
    if (entries.length === 0) return '{}';

    const isLocaleString =
      entries.length === 2 &&
      entries.every(function(e) { return (e[0] === 'el' || e[0] === 'en') && typeof e[1] === 'string'; });

    if (isLocaleString) {
      const parts = entries.map(function(e) { return e[0] + ': ' + "'" + escapeString(e[1] as string) + "'"; });
      return '{ ' + parts.join(', ') + ' }';
    }

    const lines = entries.map(function(e) { return innerPad + e[0] + ': ' + serializeValue(e[1], indent + 1); });
    return '{\n' + lines.join(',\n') + ',\n' + pad + '}';
  }

  return String(val);
}

async function main() {
  console.log('Fetching config.json from ' + CONFIG_URL + '...');

  const res = await fetch(CONFIG_URL);
  if (!res.ok) {
    console.error('Failed to fetch config.json: ' + res.status + ' ' + res.statusText);
    process.exit(1);
  }

  const remoteConfig = await res.json() as Record<string, unknown>;
  console.log('Fetched config.json (exported at: ' + remoteConfig.exportedAt + ')');

  const configTs = fs.readFileSync(configTsPath, 'utf-8');

  // Find the LAST export interface block end, then take everything up to the first export const after it
  const firstConstAfterInterfaces = configTs.search(/\nexport const [a-z]/);
  if (firstConstAfterInterfaces === -1) {
    console.error('Could not find any "export const" in config.ts');
    process.exit(1);
  }

  const interfacesSection = configTs.slice(0, firstConstAfterInterfaces);

  const constTypeMap = new Map<string, string>();
  const constBlockMap = new Map<string, string>();
  const constRegex = /export const (\w+):\s*([\w<>]+)\s*=/g;
  let match;
  while ((match = constRegex.exec(configTs)) !== null) {
    const key = match[1];
    constTypeMap.set(key, match[2]);

    // Capture the original full const declaration so we can preserve local-only defaults.
    const blockStart = match.index;
    const valueStart = constRegex.lastIndex;
    let i = valueStart;
    let inSingle = false;
    let inDouble = false;
    let inTemplate = false;
    let escape = false;
    let depthParen = 0;
    let depthBracket = 0;
    let depthBrace = 0;

    while (i < configTs.length) {
      const ch = configTs[i];

      if (escape) {
        escape = false;
        i++;
        continue;
      }

      if (ch === '\\') {
        escape = true;
        i++;
        continue;
      }

      if (!inDouble && !inTemplate && ch === "'") {
        inSingle = !inSingle;
        i++;
        continue;
      }

      if (!inSingle && !inTemplate && ch === '"') {
        inDouble = !inDouble;
        i++;
        continue;
      }

      if (!inSingle && !inDouble && ch === '`') {
        inTemplate = !inTemplate;
        i++;
        continue;
      }

      if (!inSingle && !inDouble && !inTemplate) {
        if (ch === '(') depthParen++;
        else if (ch === ')') depthParen = Math.max(0, depthParen - 1);
        else if (ch === '[') depthBracket++;
        else if (ch === ']') depthBracket = Math.max(0, depthBracket - 1);
        else if (ch === '{') depthBrace++;
        else if (ch === '}') depthBrace = Math.max(0, depthBrace - 1);
        else if (ch === ';' && depthParen === 0 && depthBracket === 0 && depthBrace === 0) {
          constBlockMap.set(key, configTs.slice(blockStart, i + 1));
          break;
        }
      }

      i++;
    }
  }

  const constLines: string[] = [];
  const writtenKeys = new Set<string>();
  for (const [key, value] of Object.entries(remoteConfig)) {
    if (SKIP_KEYS.has(key)) continue;
    const typeAnnotation = constTypeMap.has(key) ? ': ' + constTypeMap.get(key) : '';
    constLines.push('export const ' + key + typeAnnotation + ' = ' + serializeValue(value, 0) + ';');
    writtenKeys.add(key);
  }

  for (const key of constTypeMap.keys()) {
    if (SKIP_KEYS.has(key) || writtenKeys.has(key)) continue;
    const existingConstBlock = constBlockMap.get(key);
    if (!existingConstBlock) continue;
    console.warn("Warning: '" + key + "' not found in S3 config — preserving local default.");
    constLines.push(existingConstBlock);
  }

  const newConfigTs = interfacesSection + '\n' + constLines.join('\n\n') + '\n';
  fs.writeFileSync(configTsPath, newConfigTs, 'utf-8');
  console.log('src/config.ts updated with latest content from S3.');
  console.log('Review the changes and deploy when ready.');
}

main().catch(function(err) {
  console.error('Unexpected error:', err);
  process.exit(1);
});