import { useEffect, useState, useRef } from "react";

export default function ScrollCounter({ targetNumber, label, duration = 2000 }) {
  const [count, setCount] = useState(0);
  const elementRef = useRef(null);
  const hasAnimated = useRef(false); // Prevents re-triggering if scrolling back up

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Trigger animation only once when the element becomes visible
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          let startTime = null;

          const animate = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = timestamp - startTime;
            
            // Calculate progress percentage (capped at 1)
            const progressPercent = Math.min(progress / duration, 1);
            
            // Calculate current value based on progress
            const currentValue = Math.floor(progressPercent * targetNumber);
            setCount(currentValue);

            // Continue animation frame until duration is reached
            if (progress < duration) {
              requestAnimationFrame(animate);
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.2 } // Triggers when 20% of the element is visible
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) observer.unobserve(elementRef.current);
    };
  }, [targetNumber, duration]);

  return (
    <div ref={elementRef}>
      {count}
      <p>{label}</p>
    </div>
  );
}