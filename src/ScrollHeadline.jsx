import { useEffect, useRef, useState } from 'react';

export default function ScrollHeadline({ text }) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const headlineRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Trigger animation when the element enters the viewport
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          // Optional: stop observing if you only want the animation to run once
          observer.unobserve(entry.target); 
        }
      },
      { 
        threshold: 0.1 // Triggers when 10% of the element is visible
      }
    );

    if (headlineRef.current) {
      observer.observe(headlineRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <h1 
      ref={headlineRef} 
      className={`reveal-headline ${isIntersecting ? 'active' : ''}`}
      style={{ lineHeight: '20px' }}
    >
      {text}
    </h1>
  );
}
