
import React from "react";

interface SaturnLogoProps {
  className?: string;
}

const SaturnLogo: React.FC<SaturnLogoProps> = ({ className = "w-10 h-10" }) => {
  return (
    <svg
      className={className}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id="saturnLogoGradient" cx="0.5" cy="0.5" r="0.5" fx="0.6" fy="0.35">
          <stop offset="0%" stopColor="#F8D89C" />
          <stop offset="60%" stopColor="#E8B77D" />
          <stop offset="100%" stopColor="#C08529" />
        </radialGradient>
        
        <linearGradient id="ringLogoGradient" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#9775FA" stopOpacity="0.7" />
          <stop offset="50%" stopColor="#A384FF" />
          <stop offset="100%" stopColor="#5F3DC4" stopOpacity="0.7" />
        </linearGradient>
        
        <filter id="logoGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="1.5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
        
        <filter id="planetShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="1" dy="1" stdDeviation="2" floodColor="#000" floodOpacity="0.3" />
        </filter>
      </defs>
      
      {/* Main Saturn planet body */}
      <circle 
        cx="32" 
        cy="32" 
        r="16" 
        fill="url(#saturnLogoGradient)"
        filter="url(#planetShadow)" 
      />
      
      {/* Surface details */}
      <ellipse cx="26" cy="28" rx="5" ry="2.5" fill="#F8D89C" fillOpacity="0.6" />
      <ellipse cx="38" cy="36" rx="4" ry="2" fill="#E6AD4C" fillOpacity="0.4" />
      
      {/* Planet highlights */}
      <circle cx="26" cy="26" r="2" fill="#FFF7E4" fillOpacity="0.5" />
      <circle cx="24" cy="24" r="0.8" fill="#FFFFFF" fillOpacity="0.6" />
      
      {/* Saturn Rings */}
      <g filter="url(#logoGlow)">
        {/* Outer ring */}
        <ellipse 
          cx="32" 
          cy="32" 
          rx="28" 
          ry="6" 
          transform="rotate(-20 32 32)" 
          stroke="url(#ringLogoGradient)" 
          strokeWidth="2" 
          strokeLinecap="round"
          className="saturn-ring"
        />
        
        {/* Inner rings */}
        <ellipse 
          cx="32" 
          cy="32" 
          rx="24" 
          ry="4" 
          transform="rotate(-20 32 32)" 
          stroke="#A384FF" 
          strokeWidth="1.5" 
          strokeLinecap="round"
          strokeOpacity="0.9"
          className="saturn-ring-inner"
        />
        
        <ellipse 
          cx="32" 
          cy="32" 
          rx="20" 
          ry="3" 
          transform="rotate(-20 32 32)" 
          stroke="#7950F2" 
          strokeWidth="1" 
          strokeLinecap="round"
          strokeOpacity="0.8"
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
    </svg>
  );
};

export default SaturnLogo;
