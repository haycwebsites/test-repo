// <NewsletterSection />

import { useState, useCallback } from 'react';
import { useHayc } from '../hayc/config-context';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function NewsletterSection() {
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

  return (
    <section className="w-full bg-gray-900">
      <div className="max-w-2xl mx-auto py-16 px-4 text-center">
        <h2 className="text-white text-3xl font-bold">Stay in the loop</h2>
        <p className="text-gray-400 mt-2">Get updates on availability and offers.</p>

        {submitted ? (
          <p className="text-green-400 mt-8">You are subscribed. Thank you!</p>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8" noValidate>
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

            <div className="flex flex-col md:flex-row gap-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                disabled={loading}
                className="w-full rounded-lg px-4 py-3 bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-white disabled:opacity-60 disabled:cursor-not-allowed"
                aria-label="Email"
                aria-invalid={!!error}
              />
              <button
                type="submit"
                disabled={loading}
                className="bg-white text-gray-900 font-semibold rounded-lg px-6 py-3 hover:bg-gray-100 disabled:opacity-60 disabled:cursor-not-allowed whitespace-nowrap"
              >
                {loading ? 'Subscribing...' : 'Subscribe'}
              </button>
            </div>

            {error && (
              <p className="text-red-400 text-sm mt-2" role="alert">
                {error}
              </p>
            )}
          </form>
        )}
      </div>
    </section>
  );
}
