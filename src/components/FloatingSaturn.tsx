
import React from "react";

interface FloatingSaturnProps {
  size?: "sm" | "md" | "lg";
  position: string;
  delay?: number;
  rotation?: number;
}

const FloatingSaturn: React.FC<FloatingSaturnProps> = ({ 
  size = "md", 
  position,
  delay = 0,
  rotation = -12
}) => {
  const sizeMap = {
    sm: "w-16 h-16",
    md: "w-24 h-24",
    lg: "w-32 h-32",
  };

  return (
    <div 
      className={`absolute ${position} z-10`}
      style={{ 
        animation: `float 8s ease-in-out ${delay}s infinite`,
        opacity: 0.8
      }}
    >
      <svg
        className={`${sizeMap[size]} transform rotate-[${rotation}deg]`}
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Saturn planet with gradient */}
        <defs>
          <radialGradient id="saturnGradient" cx="0.5" cy="0.5" r="0.5" fx="0.6" fy="0.35">
            <stop offset="0%" stopColor="#F8D89C" />
            <stop offset="60%" stopColor="#E8B77D" />
            <stop offset="100%" stopColor="#C08529" />
          </radialGradient>
          
          {/* Ring radial gradients */}
          <linearGradient id="ringGradient1" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#9775FA" stopOpacity="0.2" />
            <stop offset="30%" stopColor="#A384FF" stopOpacity="0.8" />
            <stop offset="70%" stopColor="#7950F2" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#5F3DC4" stopOpacity="0.2" />
          </linearGradient>
          
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="1" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          
          <filter id="planetShadow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="1" dy="1" stdDeviation="2" floodColor="#000" floodOpacity="0.3" />
          </filter>
        </defs>
        
        {/* Shadow for 3D effect */}
        <circle cx="33" cy="33" r="15" fill="#000000" fillOpacity="0.2" filter="url(#blur)" />
        
        {/* Main Saturn planet body */}
        <circle 
          cx="32" 
          cy="32" 
          r="16" 
          fill="url(#saturnGradient)" 
          filter="url(#planetShadow)"
        />
        
        {/* Surface detail */}
        <ellipse cx="28" cy="28" rx="4" ry="2" fill="#F8D89C" fillOpacity="0.6" />
        <ellipse cx="38" cy="36" rx="3" ry="1.5" fill="#E6AD4C" fillOpacity="0.3" />
        
        {/* Planet highlight */}
        <circle cx="26" cy="26" r="2" fill="#FFF7E4" fillOpacity="0.5" />
        <circle cx="24" cy="24" r="0.8" fill="#FFFFFF" fillOpacity="0.6" />
        
        {/* Saturn Rings */}
        <g filter="url(#glow)">
          {/* Outer ring */}
          <ellipse 
            cx="32" 
            cy="32" 
            rx="28" 
            ry="6" 
            transform="rotate(-20 32 32)" 
            stroke="url(#ringGradient1)" 
            strokeWidth="2.5" 
            strokeLinecap="round"
            className="saturn-ring"
            style={{ strokeDasharray: '3 1' }}
          />
          
          {/* Inner rings */}
          <ellipse 
            cx="32" 
            cy="32" 
            rx="26" 
            ry="5" 
            transform="rotate(-20 32 32)" 
            stroke="#A384FF" 
            strokeWidth="1" 
            strokeLinecap="round"
            strokeOpacity="0.6"
            className="saturn-ring-inner"
          />
          
          <ellipse 
            cx="32" 
            cy="32" 
            rx="22" 
            ry="4" 
            transform="rotate(-20 32 32)" 
            stroke="#7950F2" 
            strokeWidth="0.8" 
            strokeLinecap="round"
            strokeOpacity="0.7"
            className="saturn-ring"
          />
          
          {/* Shadow cast by planet on rings */}
          <path 
            d="M 32,32 m-16,0 a 16,16 0 1,0 32,0 a 16,16 0 1,0 -32,0" 
            fill="none" 
            stroke="#000000" 
            strokeWidth="10" 
            transform="rotate(-20 32 32)"
            strokeOpacity="0.15"
          />
        </g>
        
        {/* Stars behind Saturn for added effect */}
        <circle cx="12" cy="12" r="0.5" fill="#FFFFFF" fillOpacity="0.8" className="animate-twinkle" />
        <circle cx="56" cy="48" r="0.6" fill="#FFFFFF" fillOpacity="0.7" className="animate-twinkle" style={{ animationDelay: '1s' }} />
        <circle cx="52" cy="14" r="0.4" fill="#FFFFFF" fillOpacity="0.9" className="animate-twinkle" style={{ animationDelay: '2s' }} />
      </svg>
    </div>
  );
};

export default FloatingSaturn;
