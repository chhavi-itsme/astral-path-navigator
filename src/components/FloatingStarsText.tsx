
import React, { useEffect, useRef } from 'react';

interface FloatingStarsTextProps {
  children: React.ReactNode;
  starCount?: number;
  starColor?: string;
}

const FloatingStarsText: React.FC<FloatingStarsTextProps> = ({
  children,
  starCount = 6,
  starColor = 'rgba(255, 255, 255, 0.8)'
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Create stars
    for (let i = 0; i < starCount; i++) {
      const star = document.createElement('div');
      star.className = 'floating-star';
      star.style.cssText = `
        position: absolute;
        width: 4px;
        height: 4px;
        background: ${starColor};
        border-radius: 50%;
        box-shadow: 0 0 6px ${starColor};
        pointer-events: none;
        animation: float-star ${3 + Math.random() * 4}s ease-in-out infinite;
        animation-delay: ${Math.random() * 2}s;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        opacity: ${0.4 + Math.random() * 0.6};
      `;
      container.appendChild(star);
    }

    // Add CSS animation if not already added
    if (!document.querySelector('#floating-stars-style')) {
      const style = document.createElement('style');
      style.id = 'floating-stars-style';
      style.textContent = `
        @keyframes float-star {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          25% {
            transform: translateY(-10px) rotate(90deg);
          }
          50% {
            transform: translateY(-5px) rotate(180deg);
          }
          75% {
            transform: translateY(-15px) rotate(270deg);
          }
        }
      `;
      document.head.appendChild(style);
    }

    // Cleanup function
    return () => {
      const stars = container.querySelectorAll('.floating-star');
      stars.forEach(star => star.remove());
    };
  }, [starCount, starColor]);

  return (
    <div ref={containerRef} className="relative inline-block">
      {children}
    </div>
  );
};

export default FloatingStarsText;
