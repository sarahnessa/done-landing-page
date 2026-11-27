import { useRef, useState, type FormEvent } from 'react';
import emailjs from '@emailjs/browser';

const SubscribeForm = () => {
  const CORAL = '#ff7f50';

  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubscribe = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
      setStatus('error');
      setMessage('Subscription is unavailable right now. Please try again later.');
      return;
    }

    const form = formRef.current;
    if (!form) {
      setStatus('error');
      setMessage('Something went wrong. Please try again.');
      return;
    }

    setStatus('loading');

    emailjs
      .sendForm(SERVICE_ID, TEMPLATE_ID, form, {
        publicKey: PUBLIC_KEY,
      })
      .then(
        () => {
          setStatus('success');
          setMessage('Thank you for subscribing!');
          formRef.current?.reset(); // Clears the input field after success
        },
        (error) => {
          setStatus('error');
          setMessage('Something went wrong. Please try again.');
          console.error('EmailJS Error:', error);
        },
      );
  };

  return (
    <div className="subscribe-container">
      <h2 className="mb-2 mt-8">SUBSCRIBE to DONE Updates</h2>

      <form
        id="subscribe-form"
        className="flex flex-col sm:flex-row gap-3"
        ref={formRef}
        onSubmit={handleSubscribe}
      >
        <label className="sr-only" htmlFor="subscribe-email">
          Email address
        </label>
        <input
          id="subscribe-email"
          type="email"
          name="user_email"
          className="border-2 font-roboto text-xs font-700 text-left tracking-widest uppercase px-4 py-2 h-13 rounded-lg hover:!text-white transition-colors"
          style={{ borderColor: 'white', color: '#130f40', backgroundColor: 'white' }}
          placeholder="Enter your email address"
          required
        />

        <button
          type="submit"
          disabled={status === 'loading'}
          className="border-2 font-roboto text-xs font-700 tracking-widest uppercase px-8 py-4 h-13 rounded-lg transition-colors"
          style={{ borderColor: 'white', color: 'white' }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.backgroundColor = CORAL;
            (e.currentTarget as HTMLButtonElement).style.color = '#130f40';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'transparent';
            (e.currentTarget as HTMLButtonElement).style.color = 'white';
          }}
        >
          {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
        </button>
      </form>

      <p
        className={`font-mono text-[11px] tracking-wide mt-4 status-message ${status}`}
        role={status === 'error' ? 'alert' : 'status'}
        aria-live={status === 'error' ? 'assertive' : 'polite'}
        aria-atomic="true"
      >
        {message}
      </p>
    </div>
  );
};

export default SubscribeForm;
