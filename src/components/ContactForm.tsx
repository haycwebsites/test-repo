import { useState, useCallback } from 'react';
import { useHayc } from '../hayc/config-context';

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
      <>
        <style>{`
          .contact-form-success { text-align: center; }
          .contact-form-success h3 {
            margin: 0 0 0.5rem;
            font-size: 1.125rem;
            font-weight: 600;
          }
          .contact-form-success p {
            margin: 0;
            font-size: 0.875rem;
            color: #71717a;
          }
        `}</style>
        <div className="contact-form-success">
          <h3>{t(labels.successTitle)}</h3>
          <p>{t(labels.successText)}</p>
        </div>
      </>
    );
  }

  return (
    <>
      <style>{`
        .contact-form {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .contact-form-field {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .contact-form-label {
          font-size: 0.875rem;
          font-weight: 500;
        }
        .contact-form-input,
        .contact-form-textarea {
          width: 100%;
          box-sizing: border-box;
          padding: 0.5rem 0.75rem;
          font: inherit;
          font-size: 1rem;
          line-height: 1.5;
          border: 1px solid #d4d4d8;
          border-radius: 0.375rem;
          background: #fff;
          color: inherit;
        }
        .contact-form-textarea {
          min-height: 6rem;
          resize: vertical;
        }
        .contact-form-input:disabled,
        .contact-form-textarea:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
        .contact-form-input[aria-invalid="true"],
        .contact-form-textarea[aria-invalid="true"] {
          border-color: #dc2626;
        }
        .contact-form-button {
          width: 100%;
          padding: 0.5rem 1rem;
          font: inherit;
          font-size: 1rem;
          font-weight: 500;
          cursor: pointer;
          border: none;
          border-radius: 0.375rem;
          background: #18181b;
          color: #fafafa;
        }
        .contact-form-button:hover:not(:disabled) {
          background: #27272a;
        }
        .contact-form-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
        .contact-form-error {
          margin: 0;
          font-size: 0.875rem;
          color: #dc2626;
        }
      `}</style>
      <form onSubmit={handleSubmit} className="contact-form" noValidate>
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

        <div className="contact-form-field">
          <label className="contact-form-label" htmlFor="contact-name">
            {t(labels.nameLabel)}
          </label>
          <input
            id="contact-name"
            className="contact-form-input"
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
            <p id="contact-name-error" className="contact-form-error">
              {fieldErrors.name}
            </p>
          )}
        </div>

        <div className="contact-form-field">
          <label className="contact-form-label" htmlFor="contact-email">
            {t(labels.emailLabel)}
          </label>
          <input
            id="contact-email"
            className="contact-form-input"
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
            <p id="contact-email-error" className="contact-form-error">
              {fieldErrors.email}
            </p>
          )}
        </div>

        <div className="contact-form-field">
          <label className="contact-form-label" htmlFor="contact-message">
            {t(labels.messageLabel)}
          </label>
          <textarea
            id="contact-message"
            className="contact-form-textarea"
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
            <p id="contact-message-error" className="contact-form-error">
              {fieldErrors.message}
            </p>
          )}
        </div>

        <button type="submit" className="contact-form-button" disabled={loading}>
          {loading ? t(labels.submitting) : t(labels.submitButton)}
        </button>

        {error && (
          <p className="contact-form-error" role="alert">
            {error}
          </p>
        )}
      </form>
    </>
  );
}
