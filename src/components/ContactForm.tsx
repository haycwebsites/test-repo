import { useState, useCallback } from 'react';
import { useHayc } from '../hayc/config-context';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function ContactForm() {
  const { t, config, cp } = useHayc();
  const siteId = config.siteConfig.siteId;
  const apiUrl = config.siteConfig.apiUrl;
  const { contactPageConfig } = config;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [hp, setHp] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<{
    name?: string;
    email?: string;
    message?: string;
  }>({});

  const validate = useCallback((): boolean => {
    const errors: { name?: string; email?: string; message?: string } = {};
    if (!name.trim()) errors.name = t(contactPageConfig.nameRequired);
    if (!EMAIL_PATTERN.test(email.trim())) errors.email = t(contactPageConfig.emailInvalid);
    if (!message.trim()) errors.message = t(contactPageConfig.messageRequired);
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  }, [name, email, message, t, contactPageConfig]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setError(null);
      if (!validate()) return;

      if (!apiUrl || !siteId) {
        setError(t(contactPageConfig.errorText));
        return;
      }

      setLoading(true);
      try {
        const res = await fetch(`${apiUrl}/public/contact`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            siteId,
            name: name.trim(),
            email: email.trim(),
            message: message.trim(),
            _hp: hp,
          }),
        });
        if (!res.ok) throw new Error('Request failed');
        setSubmitted(true);
      } catch {
        setError(t(contactPageConfig.errorText));
      } finally {
        setLoading(false);
      }
    },
    [apiUrl, siteId, name, email, message, hp, validate, t, contactPageConfig]
  );

  if (submitted) {
    return (
      <div className="space-y-2 text-center">
        <h3 className="text-lg font-semibold" {...cp('contactPageConfig.successTitle')}>{t(contactPageConfig.successTitle)}</h3>
        <p className="text-muted-foreground text-sm" {...cp('contactPageConfig.successText')}>{t(contactPageConfig.successText)}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input
        type="text"
        name="_hp"
        value={hp}
        onChange={(e) => setHp(e.target.value)}
        autoComplete="off"
        tabIndex={-1}
        style={{ display: 'none' }}
        aria-hidden
      />

      <div className="grid gap-2">
        <Label htmlFor="contact-name" {...cp('contactPageConfig.formLabels.name')}>{t(contactPageConfig.formLabels.name)}</Label>
        <Input
          id="contact-name"
          type="text"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            if (fieldErrors.name) setFieldErrors((prev) => ({ ...prev, name: undefined }));
          }}
          disabled={loading}
          aria-invalid={!!fieldErrors.name}
          aria-describedby={fieldErrors.name ? 'contact-name-error' : undefined}
        />
        {fieldErrors.name && (
          <p id="contact-name-error" className="text-destructive text-sm">
            {fieldErrors.name}
          </p>
        )}
      </div>

      <div className="grid gap-2">
        <Label htmlFor="contact-email" {...cp('contactPageConfig.formLabels.email')}>{t(contactPageConfig.formLabels.email)}</Label>
        <Input
          id="contact-email"
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (fieldErrors.email) setFieldErrors((prev) => ({ ...prev, email: undefined }));
          }}
          disabled={loading}
          aria-invalid={!!fieldErrors.email}
          aria-describedby={fieldErrors.email ? 'contact-email-error' : undefined}
        />
        {fieldErrors.email && (
          <p id="contact-email-error" className="text-destructive text-sm">
            {fieldErrors.email}
          </p>
        )}
      </div>

      <div className="grid gap-2">
        <Label htmlFor="contact-message" {...cp('contactPageConfig.formLabels.message')}>{t(contactPageConfig.formLabels.message)}</Label>
        <Textarea
          id="contact-message"
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
            if (fieldErrors.message) setFieldErrors((prev) => ({ ...prev, message: undefined }));
          }}
          disabled={loading}
          rows={4}
          aria-invalid={!!fieldErrors.message}
          aria-describedby={fieldErrors.message ? 'contact-message-error' : undefined}
        />
        {fieldErrors.message && (
          <p id="contact-message-error" className="text-destructive text-sm">
            {fieldErrors.message}
          </p>
        )}
      </div>

      <Button type="submit" disabled={loading} className="w-full" {...cp('contactPageConfig.submitButton')}>
        {loading ? t(contactPageConfig.submitting) : t(contactPageConfig.submitButton)}
      </Button>

      {error && (
        <p className="text-destructive text-sm" role="alert">
          {error}
        </p>
      )}
    </form>
  );
}
