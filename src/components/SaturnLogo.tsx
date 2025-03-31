
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
        {/* Enhanced realistic planet gradient */}
        <radialGradient id="saturnLogoGradient" cx="0.5" cy="0.5" r="0.5" fx="0.6" fy="0.4">
          <stop offset="0%" stopColor="#FEF7CD" />
          <stop offset="30%" stopColor="#FED89A" />
          <stop offset="70%" stopColor="#E8B77D" />
          <stop offset="100%" stopColor="#D89B44" />
        </radialGradient>
        
        {/* Enhanced ring gradient with multiple color stops */}
        <linearGradient id="ringLogoGradient" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#9775FA" stopOpacity="0.3" />
          <stop offset="20%" stopColor="#A384FF" stopOpacity="0.7" />
          <stop offset="50%" stopColor="#8B5CF6" stopOpacity="0.9" />
          <stop offset="80%" stopColor="#7950F2" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#5F3DC4" stopOpacity="0.3" />
        </linearGradient>
        
        {/* Improved glow effect */}
        <filter id="logoGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="1.5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
        
        {/* Enhanced shadow for 3D effect */}
        <filter id="planetShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="1.5" dy="1.5" stdDeviation="2" floodColor="#000" floodOpacity="0.4" />
        </filter>
      </defs>
      
      {/* Main Saturn planet body with enhanced 3D effect */}
      <circle 
        cx="32" 
        cy="32" 
        r="16" 
        fill="url(#saturnLogoGradient)"
        filter="url(#planetShadow)" 
      />
      
      {/* Detailed surface features */}
      <ellipse cx="26" cy="28" rx="6" ry="3" fill="#FEF7CD" fillOpacity="0.4" />
      <ellipse cx="38" cy="36" rx="5" ry="2.5" fill="#D89B44" fillOpacity="0.4" />
      <ellipse cx="30" cy="34" rx="4" ry="2" fill="#E8B77D" fillOpacity="0.5" />
      
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
      
      {/* Enhanced Saturn Rings with more detail */}
      <g filter="url(#logoGlow)" className="saturn-ring">
        {/* Outer ring with dash pattern for more detail */}
        <ellipse 
          cx="32" 
          cy="32" 
          rx="28" 
          ry="6" 
          transform="rotate(-20 32 32)" 
          stroke="url(#ringLogoGradient)" 
          strokeWidth="2.5" 
          strokeLinecap="round"
          strokeDasharray="1.5 0.5"
        />
        
        {/* Multiple inner rings for detailed appearance */}
        <ellipse 
          cx="32" 
          cy="32" 
          rx="24" 
          ry="5" 
          transform="rotate(-20 32 32)" 
          stroke="#A384FF" 
          strokeWidth="1.5" 
          strokeLinecap="round"
          strokeOpacity="0.8"
          className="saturn-ring-inner"
        />
        
        <ellipse 
          cx="32" 
          cy="32" 
          rx="20" 
          ry="4" 
          transform="rotate(-20 32 32)" 
          stroke="#8B5CF6" 
          strokeWidth="1" 
          strokeLinecap="round"
          strokeOpacity="0.7"
        />
        
        <ellipse 
          cx="32" 
          cy="32" 
          rx="18" 
          ry="3.5" 
          transform="rotate(-20 32 32)" 
          stroke="#7950F2" 
          strokeWidth="0.8" 
          strokeLinecap="round"
          strokeOpacity="0.6"
          strokeDasharray="2 0.5"
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
      
      {/* Add stars in background for depth */}
      <circle cx="12" cy="12" r="0.4" fill="#FFFFFF" fillOpacity="0.8" />
      <circle cx="56" cy="48" r="0.5" fill="#FFFFFF" fillOpacity="0.7" />
      <circle cx="52" cy="14" r="0.3" fill="#FFFFFF" fillOpacity="0.9" />
    </svg>
  );
};

export default SaturnLogo;
