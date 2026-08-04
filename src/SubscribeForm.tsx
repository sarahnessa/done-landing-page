import { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';

const SubscribeForm = () => {
  const CORAL = '#ff7f50';

  const formRef: any = useRef('');
  const [status, setStatus] = useState(''); // 'loading', 'success', 'error'
  const [message, setMessage] = useState('');

  const handleSubscribe = (e: any) => {
    e.preventDefault();
    setStatus('loading');

    const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, {
        publicKey: PUBLIC_KEY,
      })
      .then(
        () => {
          setStatus('success');
          setMessage('Thank you for subscribing!');
          formRef.current.reset(); // Clears the input field after success
        },
        (error) => {
          setStatus('error');
          setMessage('Something went wrong. Please try again.');
          console.error('EmailJS Error:', error.text);
        }
      );
  };

  return (
    <div className="subscribe-container">
      <h2 className="mb-2 mt-8">SUBSCRIBE to DONE Updates</h2>
      
      <form id="subscribe-form" className="flex flex-col sm:flex-row gap-3" ref={formRef} onSubmit={handleSubscribe}>
      
        <input 
          type="user_name" 
          name="user_email" 
          className="border-2 font-roboto text-xs font-700 text-left tracking-widest uppercase px-4 py-2 h-13 rounded-lg hover:!text-white transition-colors"
          style={{ borderColor: 'white', color: 'white' }}
          placeholder="Enter your email address" 
          required 
        />
        
        <button 
            type="submit" disabled={status === 'loading'}
            className="border-2 font-roboto text-xs font-700 tracking-widest uppercase px-8 py-4 h-13 rounded-lg hover:!text-white transition-colors"
            style={{ borderColor: 'white', color: 'white' }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = CORAL }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'transparent' }}
        >
          {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
        </button>
      </form>

      {message && (
        <p className={`text-gray-600 font-mono text-[11px] tracking-wide mt-4 status-message ${status}`}>
          {message}
        </p>
      )}
    </div>
  );
};

export default SubscribeForm;