import { useState, useCallback } from 'react';
import { useHayc } from '../hayc/config-context';

// <NewsletterForm />

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function NewsletterForm() {
  const { config } = useHayc();
  const siteId = config.siteConfig.siteId;
  const apiUrl = config.siteConfig.apiUrl;

  const [email, setEmail] = useState('');
  const [hp, setHp] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setError(null);

      const normalizedEmail = email.trim();
      if (!normalizedEmail || !EMAIL_PATTERN.test(normalizedEmail)) {
        setError('Please enter a valid email address.');
        return;
      }

      if (hp.trim()) {
        setSubmitted(true);
        return;
      }

      if (!apiUrl || !siteId) {
        setError('Something went wrong. Please try again.');
        return;
      }

      setLoading(true);
      try {
        const res = await fetch(`${apiUrl}/api/newsletter/subscribe`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            siteId,
            email: normalizedEmail,
            _hp: hp,
          }),
        });

        if (!res.ok) throw new Error('Request failed');
        setSubmitted(true);
      } catch {
        setError('Something went wrong. Please try again.');
      } finally {
        setLoading(false);
      }
    },
    [email, hp, apiUrl, siteId]
  );

  if (submitted) {
    return (
      <p className="text-sm text-green-700" role="status">
        You are subscribed. Thank you.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="w-full" noValidate>
      <input
        type="text"
        name="_hp"
        value={hp}
        onChange={(e) => setHp(e.target.value)}
        autoComplete="off"
        tabIndex={-1}
        className="hidden"
        aria-hidden
      />

      <div className="flex w-full items-start gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          disabled={loading}
          className="min-w-0 flex-1 rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-900 disabled:cursor-not-allowed disabled:opacity-60"
          aria-label="Email"
          aria-invalid={!!error}
        />
        <button
          type="submit"
          disabled={loading}
          className="shrink-0 rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? 'Subscribing...' : 'Subscribe'}
        </button>
      </div>

      {error && (
        <p className="mt-2 text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
    </form>
  );
}
