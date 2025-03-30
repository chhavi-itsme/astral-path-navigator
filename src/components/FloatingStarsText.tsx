
import React, { useEffect, useRef } from 'react';

interface FloatingStarsTextProps {
  children: React.ReactNode;
  className?: string;
  starCount?: number;
  starColor?: string;
}

const FloatingStarsText: React.FC<FloatingStarsTextProps> = ({
  children,
  className = "",
  starCount = 5,
  starColor = "white"
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    const container = containerRef.current;
    const starElements: HTMLSpanElement[] = [];
    
    // Clean up any existing stars
    container.querySelectorAll('.floating-star').forEach(star => star.remove());
    
    // Create new stars
    for (let i = 0; i < starCount; i++) {
      const star = document.createElement('span');
      star.classList.add('floating-star');
      
      // Random positioning
      const left = Math.random() * 100;
      
      // Set styles
      star.style.left = `${left}%`;
      star.style.width = `${Math.random() * 3 + 1}px`;
      star.style.height = star.style.width;
      star.style.backgroundColor = starColor;
      star.style.position = 'absolute';
      star.style.borderRadius = '50%';
      star.style.opacity = '0';
      star.style.boxShadow = `0 0 ${Math.random() * 5 + 3}px ${starColor}`;
      
      // Set animation with random delay
      star.style.animation = `float-star ${Math.random() * 2 + 2}s infinite ease-in-out ${Math.random() * 5}s`;
      
      // Append to container
      container.appendChild(star);
      starElements.push(star);
    }
    
    // Cleanup function
    return () => {
      starElements.forEach(star => {
        if (star.parentNode === container) {
          container.removeChild(star);
        }
      });
    };
  }, [starCount, starColor]);
  
  return (
    <div ref={containerRef} className={`relative sparkling-text ${className}`}>
      {children}
    </div>
  );
};

export default FloatingStarsText;
