import { useState, useCallback } from 'react';
import { Check } from 'lucide-react';
import { useHayc } from '../hayc/config-context';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

const labels = {
  nameLabel: { el: 'Όνομα', en: 'Name' },
  emailLabel: { el: 'Email', en: 'Email' },
  messageLabel: { el: 'Μήνυμα', en: 'Message' },
  submitButton: { el: 'Αποστολή', en: 'Send Message' },
  submitting: { el: 'Αποστολή...', en: 'Sending...' },
  successTitle: { el: 'Το μήνυμά σας στάλθηκε!', en: 'Message sent!' },
  successText: {
    el: 'Θα επικοινωνήσουμε μαζί σας σύντομα.',
    en: 'We will get back to you shortly.',
  },
  errorText: {
    el: 'Κάτι πήγε στραβά. Παρακαλώ δοκιμάστε ξανά.',
    en: 'Something went wrong. Please try again.',
  },
  nameRequired: {
    el: 'Το όνομα είναι υποχρεωτικό.',
    en: 'Name is required.',
  },
  emailInvalid: {
    el: 'Εισάγετε έγκυρο email.',
    en: 'Please enter a valid email.',
  },
  messageRequired: {
    el: 'Το μήνυμα είναι υποχρεωτικό.',
    en: 'Message is required.',
  },
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function ContactForm() {
  const { t, config } = useHayc();
  const siteId = config.siteConfig.siteId;
  const apiUrl = config.siteConfig.apiUrl;

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
    if (!name.trim()) errors.name = t(labels.nameRequired);
    if (!EMAIL_PATTERN.test(email.trim())) errors.email = t(labels.emailInvalid);
    if (!message.trim()) errors.message = t(labels.messageRequired);
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  }, [name, email, message, t]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setError(null);
      if (!validate()) return;

      if (!apiUrl || !siteId) {
        setError(t(labels.errorText));
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
        setError(t(labels.errorText));
      } finally {
        setLoading(false);
      }
    },
    [apiUrl, siteId, name, email, message, hp, validate, t]
  );

  if (submitted) {
    return (
      <div className="text-center">
        <div className="w-16 h-16 bg-[#2F6BFF] rounded-full flex items-center justify-center mx-auto mb-6">
          <Check className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-2xl md:text-3xl font-semibold tracking-tight text-[#F4F2EE] mb-4">
          {t(labels.successTitle)}
        </h3>
        <p className="text-[#6D6A63] text-lg max-w-md mx-auto">{t(labels.successText)}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
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

      <div>
        <Label htmlFor="contact-name" className="text-[#F4F2EE] mb-2 block">
          {t(labels.nameLabel)}
        </Label>
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
          className="bg-transparent border-[#F4F2EE]/20 text-[#F4F2EE] placeholder:text-[#6D6A63] focus:border-[#2F6BFF] focus-visible:ring-[#2F6BFF]/50"
        />
        {fieldErrors.name && (
          <p id="contact-name-error" className="text-red-400 text-sm mt-1.5">
            {fieldErrors.name}
          </p>
        )}
      </div>

      <div>
        <Label htmlFor="contact-email" className="text-[#F4F2EE] mb-2 block">
          {t(labels.emailLabel)}
        </Label>
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
          className="bg-transparent border-[#F4F2EE]/20 text-[#F4F2EE] placeholder:text-[#6D6A63] focus:border-[#2F6BFF] focus-visible:ring-[#2F6BFF]/50"
        />
        {fieldErrors.email && (
          <p id="contact-email-error" className="text-red-400 text-sm mt-1.5">
            {fieldErrors.email}
          </p>
        )}
      </div>

      <div>
        <Label htmlFor="contact-message" className="text-[#F4F2EE] mb-2 block">
          {t(labels.messageLabel)}
        </Label>
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
          className="bg-transparent border-[#F4F2EE]/20 text-[#F4F2EE] placeholder:text-[#6D6A63] focus:border-[#2F6BFF] focus-visible:ring-[#2F6BFF]/50"
        />
        {fieldErrors.message && (
          <p id="contact-message-error" className="text-red-400 text-sm mt-1.5">
            {fieldErrors.message}
          </p>
        )}
      </div>

      <Button
        type="submit"
        disabled={loading}
        className="w-full bg-[#2F6BFF] hover:bg-[#2556CC] text-white py-6 text-base font-medium"
      >
        {loading ? t(labels.submitting) : t(labels.submitButton)}
      </Button>

      {error && (
        <p className="text-red-400 text-sm" role="alert">
          {error}
        </p>
      )}
    </form>
  );
}
