
import React, { useEffect, useRef } from 'react';

interface FloatingStarsTextProps {
  children: React.ReactNode;
  className?: string;
  starCount?: number;
  starColor?: string;
  shootingStars?: boolean;
}

const FloatingStarsText: React.FC<FloatingStarsTextProps> = ({
  children,
  className = "",
  starCount = 5,
  starColor = "white",
  shootingStars = false
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
    
    // Create shooting stars if enabled
    if (shootingStars) {
      for (let i = 0; i < Math.min(3, starCount); i++) {
        const shootingStar = document.createElement('span');
        shootingStar.classList.add('shooting-star');
        
        // Set random position and angle
        const top = Math.random() * 100;
        const left = Math.random() * 100;
        const angle = Math.random() * 45;
        
        // Set styles
        shootingStar.style.top = `${top}%`;
        shootingStar.style.left = `${left}%`;
        shootingStar.style.width = `${Math.random() * 40 + 20}px`;
        shootingStar.style.height = '1px';
        shootingStar.style.backgroundColor = starColor;
        shootingStar.style.position = 'absolute';
        shootingStar.style.transform = `rotate(${angle}deg)`;
        shootingStar.style.opacity = '0';
        shootingStar.style.boxShadow = `0 0 ${Math.random() * 8 + 4}px ${starColor}`;
        
        // Set animation with random delay
        shootingStar.style.animation = `shooting-star ${Math.random() * 3 + 2}s infinite ease-out ${Math.random() * 15}s`;
        
        // Append to container
        container.appendChild(shootingStar);
        starElements.push(shootingStar);
      }
    }
    
    // Cleanup function
    return () => {
      starElements.forEach(star => {
        if (star.parentNode === container) {
          container.removeChild(star);
        }
      });
    };
  }, [starCount, starColor, shootingStars]);
  
  return (
    <div ref={containerRef} className={`relative sparkling-text ${className}`}>
      {children}
    </div>
  );
};

export default FloatingStarsText;
