# HAYC Websites Template

A base React template for building client websites under the HAYC platform. Each derived repo represents a unique client website with its own visual identity, content, and configuration.

## Tech Stack

- React 18 + TypeScript
- Vite
- Tailwind CSS
- Lucide React (icons)
- shadcn/ui components
- Formspree (contact form / newsletter)

## Creating a New Client Repo

1. Click **"Use this template"** on GitHub to create a new repo
2. Set the `SITE_ID` variable in the new repo → **Settings → Secrets and variables → Actions → Variables**
3. ⚠️ **Register the new repo** in `repos.json` in this template repo:
```json
{
  "repos": [
    "haycwebsites/existing-repo",
    "haycwebsites/new-repo"
  ]
}
```
4. Commit and push — the new repo will be included in all future syncs automatically

---

## Template Sync System

This template automatically syncs infrastructure files to all connected derived repos when changes are pushed to `main`.

### Flow
```
Commit to template (main)
        ↓
sync-template.yml fires
        ↓
Reads repos.json → clones each derived repo
        ↓
Copies allowlisted files → opens PR → auto-merges
        ↓
Derived repo deploys to S3
```

### Sync Config Files

| File | Purpose |
|---|---|
| `repos.json` | Registry of all connected derived repos |
| `sync-files.json` | Allowlist of files to sync to derived repos |
| `.github/workflows/sync-template.yml` | Main sync action |
| `.github/workflows/validate-sync-config.yml` | Validates sync-files.json and sync-template.yml paths stay in sync |

### What Gets Synced

Infrastructure and framework files that must be identical across all derived repos:

- `.github/workflows/deploy.yml`
- `.cursor/rules/hayc-config.mdc`
- `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json`, `tsconfig.scripts.json`
- `postcss.config.js`, `eslint.config.js`, `components.json`
- `src/hayc/config-context.tsx`
- `src/components/LanguageSwitcher.tsx`, `Preloader.tsx`, `ScrollToTop.tsx`
- `src/components/ui/*` (all shadcn components)

### What Never Gets Synced

Files owned by each derived repo after creation:

| File | Reason |
|---|---|
| `vite.config.ts` | Each repo may add custom plugins |
| `tailwind.config.js` | Each site has its own theme/colors |
| `src/hayc/use-remote-config.ts` | Each repo has its own config types |
| `scripts/export-config.ts` | Each repo exports its own config keys |
| `src/config.ts` | Site-specific content and configuration |
| `src/App.tsx`, `src/App.css`, `src/index.css` | Site-specific UI and styles |
| `public/hayc/config.json` | Live site content, never overwrite |
| `public/images/*` | Site-specific images |

### Adding a New File to the Sync

1. Add the file path to `sync-files.json`
2. Add the same path to the `paths:` trigger in `sync-template.yml`
3. Commit both files together — the validate action will catch any mismatch on PRs

### Token

The sync action uses a classic PAT stored as `SYNC_TOKEN` in the template repo secrets. Requires `repo` and `workflow` scopes. **Rotate annually.**

---

## Project Structure

```
├── .github/workflows/
│   ├── deploy.yml              # S3 deployment (disabled on template)
│   ├── sync-template.yml       # Syncs files to derived repos
│   └── validate-sync-config.yml
├── public/
│   ├── hayc/config.json        # Exported site config (per-repo)
│   └── images/                 # Site images (per-repo)
├── scripts/
│   └── export-config.ts        # Exports src/config.ts to config.json (per-repo)
├── src/
│   ├── hayc/
│   │   ├── config-context.tsx  # HAYC config context (synced)
│   │   └── use-remote-config.ts # Remote config hook (per-repo)
│   ├── components/
│   │   ├── ui/                 # shadcn components (synced)
│   │   ├── LanguageSwitcher.tsx (synced)
│   │   ├── Preloader.tsx       (synced)
│   │   └── ScrollToTop.tsx     (synced)
│   ├── config.ts               # Site content (per-repo)
│   ├── App.tsx                 # App routing (per-repo)
│   └── index.css               # Base styles (per-repo)
├── repos.json                  # Connected repos registry
└── sync-files.json             # Sync allowlist
```

---

## Notes

- All components check for empty config and render nothing if unconfigured
- The template repo's own `Deploy to S3` workflow is disabled — the template should never deploy itself
- If a synced file gets incorrectly overwritten in a derived repo, restore it with:
```bash
git show HEAD~1:<file-path> > <file-path>
```
- Icon fields in config use string names (e.g. `"Wine"`, `"MapPin"`) resolved via icon lookup maps in each component
- Images should be optimized for web (JPG for photos, PNG for transparent images)