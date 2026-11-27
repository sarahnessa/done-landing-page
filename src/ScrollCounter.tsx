import { useEffect, useState, useRef } from 'react';

interface ProcessOptions {
  targetNumber: number;
  label: string;
  duration: number;
}

export default function ScrollCounter({ targetNumber, label, duration = 2000 }: ProcessOptions) {
  const [count, setCount] = useState(0);
  const elementRef = useRef(null);
  const hasAnimated = useRef(false); // Prevents re-triggering if scrolling back up

  useEffect(() => {
    let animationFrameId: number | null = null;
    let isActive = true;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Trigger animation only once when the element becomes visible
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          let startTime: number | null = null;

          const animate = (timestamp: number) => {
            if (!isActive) return;
            if (!startTime) startTime = timestamp;
            const progress = timestamp - startTime;

            // Calculate progress percentage (capped at 1)
            const progressPercent = Math.min(progress / duration, 1);

            // Calculate current value based on progress
            const currentValue = Math.floor(progressPercent * targetNumber);
            setCount(currentValue);

            // Continue animation frame until duration is reached
            if (progress < duration) {
              animationFrameId = requestAnimationFrame(animate);
            }
          };

          animationFrameId = requestAnimationFrame(animate);
        }
      },
      { threshold: 0.2 }, // Triggers when 20% of the element is visible
    );

    const element = elementRef.current;
    if (element) observer.observe(element);

    return () => {
      isActive = false;
      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId);
      }
      if (element) observer.unobserve(element);
      observer.disconnect();
    };
  }, [targetNumber, duration]);

  return (
    <div ref={elementRef}>
      {count}
      <p>{label}</p>
    </div>
  );
}
