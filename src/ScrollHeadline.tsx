import { useEffect, useRef, useState } from 'react';

export default function ScrollHeadline({ text }: { text: string }) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const headlineRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const element = headlineRef.current;
    if (!element || !('IntersectionObserver' in window)) {
      setIsIntersecting(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 },
    );

    observer.observe(element);

    // Fallback: ensure headlines never remain hidden if observer doesn't fire (e.g., WebKit full-page capture)
    const fallbackTimer = window.setTimeout(() => {
      setIsIntersecting(true);
    }, 1000);

    return () => {
      observer.disconnect();
      window.clearTimeout(fallbackTimer);
    };
  }, []);

  return (
    <span
      ref={headlineRef}
      className={`reveal-headline ${isIntersecting ? 'active' : ''}`}
      style={{ display: 'inline-block', marginBottom: '20px' }}
    >
      {text}
    </span>
  );
}
