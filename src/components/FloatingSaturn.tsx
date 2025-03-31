
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
        opacity: 0.9
      }}
    >
      <svg
        className={`${sizeMap[size]} transform rotate-[${rotation}deg]`}
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Enhanced planet gradient with more realistic colors */}
          <radialGradient id="saturnGradient" cx="0.5" cy="0.5" r="0.5" fx="0.6" fy="0.35">
            <stop offset="0%" stopColor="#FEF7CD" /> {/* Light yellow center */}
            <stop offset="30%" stopColor="#FED89A" /> {/* Soft orange */}
            <stop offset="60%" stopColor="#E8B77D" /> {/* Sandy tan */}
            <stop offset="100%" stopColor="#D89B44" /> {/* Deeper orange-brown */}
          </radialGradient>
          
          {/* Enhanced ring gradients */}
          <linearGradient id="ringGradient1" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#9775FA" stopOpacity="0.3" />
            <stop offset="20%" stopColor="#A384FF" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#8B5CF6" stopOpacity="0.9" />
            <stop offset="80%" stopColor="#7950F2" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#5F3DC4" stopOpacity="0.3" />
          </linearGradient>
          
          {/* Enhanced glow */}
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          
          {/* Realistic shadow */}
          <filter id="planetShadow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="1.5" dy="1.5" stdDeviation="2.5" floodColor="#000" floodOpacity="0.4" />
          </filter>
        </defs>
        
        {/* Shadow for 3D effect */}
        <circle cx="33" cy="33" r="15" fill="#000000" fillOpacity="0.2" filter="url(#blur)" />
        
        {/* Main Saturn planet body with enhanced realism */}
        <circle 
          cx="32" 
          cy="32" 
          r="16" 
          fill="url(#saturnGradient)" 
          filter="url(#planetShadow)"
          className="animate-[pulse_8s_ease-in-out_infinite]"
        />
        
        {/* Realistic surface details */}
        <ellipse cx="28" cy="28" rx="7" ry="3" fill="#FEF7CD" fillOpacity="0.4" />
        <ellipse cx="38" cy="36" rx="6" ry="2.5" fill="#D89B44" fillOpacity="0.4" />
        <ellipse cx="30" cy="34" rx="5" ry="2" fill="#E8B77D" fillOpacity="0.5" />
        
        {/* Realistic surface bands */}
        <path 
          d="M16,32 C16,32 20,29 32,29 C44,29 48,32 48,32" 
          stroke="#D89B44" 
          strokeWidth="0.8" 
          strokeOpacity="0.4" 
          fill="none" 
        />
        <path 
          d="M16,36 C16,36 22,39 32,39 C42,39 48,36 48,36" 
          stroke="#D89B44" 
          strokeWidth="0.8" 
          strokeOpacity="0.4" 
          fill="none" 
        />
        
        {/* Realistic planet highlights */}
        <circle cx="26" cy="26" r="2.5" fill="#FFF7E4" fillOpacity="0.6" />
        <circle cx="24" cy="24" r="0.8" fill="#FFFFFF" fillOpacity="0.8" />
        
        {/* Enhanced Saturn Rings */}
        <g filter="url(#glow)" className="saturn-ring">
          {/* Outer ring with dash pattern for realistic detail */}
          <ellipse 
            cx="32" 
            cy="32" 
            rx="28" 
            ry="6" 
            transform="rotate(-20 32 32)" 
            stroke="url(#ringGradient1)" 
            strokeWidth="2.5" 
            strokeLinecap="round"
            strokeDasharray="1.5 0.5"
          />
          
          {/* Multiple inner rings for detailed appearance */}
          <ellipse 
            cx="32" 
            cy="32" 
            rx="26" 
            ry="5" 
            transform="rotate(-20 32 32)" 
            stroke="#A384FF" 
            strokeWidth="1.2" 
            strokeLinecap="round"
            strokeOpacity="0.7"
            className="saturn-ring-inner"
          />
          
          <ellipse 
            cx="32" 
            cy="32" 
            rx="22" 
            ry="4" 
            transform="rotate(-20 32 32)" 
            stroke="#8B5CF6" 
            strokeWidth="1" 
            strokeLinecap="round"
            strokeOpacity="0.6"
            className="saturn-ring"
            strokeDasharray="3 1"
          />
          
          <ellipse 
            cx="32" 
            cy="32" 
            rx="18" 
            ry="3" 
            transform="rotate(-20 32 32)" 
            stroke="#7950F2" 
            strokeWidth="0.8" 
            strokeLinecap="round"
            strokeOpacity="0.5"
            strokeDasharray="2 1"
          />
          
          {/* Shadow cast by planet on rings */}
          <path 
            d="M 32,32 m-16,0 a 16,16 0 1,0 32,0 a 16,16 0 1,0 -32,0" 
            fill="none" 
            stroke="#000000" 
            strokeWidth="10" 
            transform="rotate(-20 32 32)"
            strokeOpacity="0.25"
          />
        </g>
        
        {/* Stars behind Saturn with animation */}
        <circle cx="12" cy="12" r="0.5" fill="#FFFFFF" fillOpacity="0.8" className="animate-[pulse_2s_ease-in-out_infinite]" />
        <circle cx="56" cy="48" r="0.6" fill="#FFFFFF" fillOpacity="0.7" className="animate-[pulse_3s_ease-in-out_1s_infinite]" />
        <circle cx="52" cy="14" r="0.4" fill="#FFFFFF" fillOpacity="0.9" className="animate-[pulse_2.5s_ease-in-out_0.5s_infinite]" />
        <circle cx="10" cy="50" r="0.5" fill="#FFFFFF" fillOpacity="0.8" className="animate-[pulse_3.5s_ease-in-out_1.5s_infinite]" />
        <circle cx="45" cy="8" r="0.4" fill="#FFFFFF" fillOpacity="0.7" className="animate-[pulse_2.8s_ease-in-out_0.8s_infinite]" />
      </svg>
    </div>
  );
};

export default FloatingSaturn;
