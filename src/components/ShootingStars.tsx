
import React, { useEffect, useRef } from 'react';

interface ShootingStarsProps {
  count?: number;
  speed?: number;
}

const ShootingStars: React.FC<ShootingStarsProps> = ({ 
  count = 5, 
  speed = 10 
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const starElements: HTMLDivElement[] = [];
    
    // Clean up any existing stars
    container.querySelectorAll('.shooting-star-element').forEach(star => star.remove());
    
    // Create shooting stars
    for (let i = 0; i < count; i++) {
      const star = document.createElement('div');
      star.classList.add('shooting-star-element');
      
      // Random positioning and timing
      const top = Math.random() * 100;
      const left = Math.random() * 100;
      const duration = (Math.random() * 3 + 2) * (15 / speed);
      const delay = Math.random() * 15;
      const size = Math.random() * 150 + 50;
      
      // Set styles
      star.style.top = `${top}%`;
      star.style.left = `${left}%`;
      star.style.width = `${size}px`;
      star.style.height = '2px';
      star.style.position = 'absolute';
      star.style.transformOrigin = 'left center';
      star.style.transform = `rotate(${215 + Math.random() * 50}deg)`;
      
      // Create the actual shooting star
      const trail = document.createElement('div');
      trail.style.width = '100%';
      trail.style.height = '100%';
      trail.style.background = 'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.8) 50%, rgba(255,255,255,0) 100%)';
      trail.style.borderRadius = '50px';
      trail.style.boxShadow = '0 0 10px rgba(255, 255, 255, 0.7)';
      trail.style.animation = `shooting-star-move ${duration}s infinite ease-out ${delay}s`;
      
      star.appendChild(trail);
      container.appendChild(star);
      starElements.push(star);
    }
    
    // Add shooting star animation keyframes dynamically if they don't exist
    if (!document.querySelector('#shooting-stars-keyframes')) {
      const styleSheet = document.createElement('style');
      styleSheet.id = 'shooting-stars-keyframes';
      styleSheet.textContent = `
        @keyframes shooting-star-move {
          0% {
            transform: translateX(0) scaleX(0.1);
            opacity: 0;
          }
          5% {
            opacity: 1;
            transform: translateX(0) scaleX(1);
          }
          25% {
            transform: translateX(-100px) scaleX(1);
            opacity: 1;
          }
          40% {
            transform: translateX(-200px) scaleX(0.1);
            opacity: 0;
          }
          100% {
            transform: translateX(-200px);
            opacity: 0;
          }
        }
      `;
      document.head.appendChild(styleSheet);
    }
    
    // Cleanup function
    return () => {
      starElements.forEach(star => {
        if (star.parentNode === container) {
          container.removeChild(star);
        }
      });
      
      // Remove style if no other shooting stars components exist
      if (document.querySelectorAll('.shooting-stars-container').length <= 1) {
        const styleElement = document.querySelector('#shooting-stars-keyframes');
        if (styleElement && styleElement.parentNode) {
          styleElement.parentNode.removeChild(styleElement);
        }
      }
    };
  }, [count, speed]);
  
  return (
    <div 
      ref={containerRef}
      className="shooting-stars-container fixed inset-0 z-0 pointer-events-none"
      aria-hidden="true"
    />
  );
};

export default ShootingStars;
