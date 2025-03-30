
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
          <feGaussianBlur stdDeviation="0.5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>
      
      {/* Main Saturn planet body */}
      <circle 
        cx="32" 
        cy="32" 
        r="16" 
        fill="url(#saturnLogoGradient)" 
      />
      
      {/* Surface detail */}
      <ellipse cx="28" cy="28" rx="4" ry="2" fill="#F8D89C" fillOpacity="0.6" />
      
      {/* Saturn Rings */}
      <g filter="url(#logoGlow)">
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
        
        <ellipse 
          cx="32" 
          cy="32" 
          rx="24" 
          ry="4" 
          transform="rotate(-20 32 32)" 
          stroke="#A384FF" 
          strokeWidth="1.5" 
          strokeLinecap="round"
          className="saturn-ring-inner"
        />
      </g>
    </svg>
  );
};

export default SaturnLogo;
