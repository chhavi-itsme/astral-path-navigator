
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
        {/* Enhanced realistic planet gradients */}
        <radialGradient id="saturnLogoGradient" cx="0.5" cy="0.5" r="0.5" fx="0.6" fy="0.4">
          <stop offset="0%" stopColor="#FEF9E7" />
          <stop offset="20%" stopColor="#F4D03F" />
          <stop offset="50%" stopColor="#E9B64D" />
          <stop offset="80%" stopColor="#CA8A17" />
          <stop offset="100%" stopColor="#9A7D0A" />
        </radialGradient>
        
        {/* Purple Saturn variant */}
        <radialGradient id="purpleSaturnGradient" cx="0.5" cy="0.5" r="0.5" fx="0.4" fy="0.4">
          <stop offset="0%" stopColor="#A569BD" />
          <stop offset="30%" stopColor="#8E44AD" />
          <stop offset="70%" stopColor="#6C3483" />
          <stop offset="100%" stopColor="#512E5F" />
        </radialGradient>
        
        {/* Fiery orange Saturn variant */}
        <radialGradient id="fierySaturnGradient" cx="0.5" cy="0.5" r="0.5" fx="0.6" fy="0.4">
          <stop offset="0%" stopColor="#FFEFBA" />
          <stop offset="20%" stopColor="#F5B041" />
          <stop offset="50%" stopColor="#E67E22" />
          <stop offset="80%" stopColor="#D35400" />
          <stop offset="100%" stopColor="#A93226" />
        </radialGradient>
        
        {/* Enhanced golden ring gradient */}
        <linearGradient id="goldenRingGradient" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#F9E79F" stopOpacity="0.3" />
          <stop offset="20%" stopColor="#F7DC6F" stopOpacity="0.7" />
          <stop offset="50%" stopColor="#F1C40F" stopOpacity="0.9" />
          <stop offset="80%" stopColor="#D4AC0D" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#9A7D0A" stopOpacity="0.3" />
        </linearGradient>
        
        {/* Enhanced purple ring gradient */}
        <linearGradient id="purpleRingGradient" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#D2B4DE" stopOpacity="0.3" />
          <stop offset="20%" stopColor="#BB8FCE" stopOpacity="0.7" />
          <stop offset="50%" stopColor="#8E44AD" stopOpacity="0.9" />
          <stop offset="80%" stopColor="#6C3483" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#512E5F" stopOpacity="0.3" />
        </linearGradient>
        
        {/* Enhanced fiery ring gradient */}
        <linearGradient id="fieryRingGradient" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#FFBB9A" stopOpacity="0.3" />
          <stop offset="20%" stopColor="#F5B041" stopOpacity="0.7" />
          <stop offset="50%" stopColor="#E67E22" stopOpacity="0.9" />
          <stop offset="80%" stopColor="#D35400" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#A93226" stopOpacity="0.3" />
        </linearGradient>
        
        {/* Enhanced glow effects */}
        <filter id="logoGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="1.5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
        
        <filter id="goldenGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feFlood flood-color="#F1C40F" flood-opacity="0.5" result="color" />
          <feComposite in="color" in2="blur" operator="in" result="glow" />
          <feComposite in="SourceGraphic" in2="glow" operator="over" />
        </filter>
        
        <filter id="purpleGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feFlood flood-color="#8E44AD" flood-opacity="0.5" result="color" />
          <feComposite in="color" in2="blur" operator="in" result="glow" />
          <feComposite in="SourceGraphic" in2="glow" operator="over" />
        </filter>
        
        <filter id="fieryGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feFlood flood-color="#E67E22" flood-opacity="0.5" result="color" />
          <feComposite in="color" in2="blur" operator="in" result="glow" />
          <feComposite in="SourceGraphic" in2="glow" operator="over" />
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
        className="animate-pulse-slow"
      />
      
      {/* Detailed surface features - golden variant */}
      <ellipse cx="26" cy="28" rx="6" ry="3" fill="#FEF9E7" fillOpacity="0.4" />
      <ellipse cx="38" cy="36" rx="5" ry="2.5" fill="#9A7D0A" fillOpacity="0.4" />
      <ellipse cx="30" cy="34" rx="4" ry="2" fill="#F4D03F" fillOpacity="0.5" />
      
      {/* Realistic surface bands */}
      <path 
        d="M16,32 C16,32 20,29 32,29 C44,29 48,32 48,32" 
        stroke="#9A7D0A" 
        strokeWidth="0.8" 
        strokeOpacity="0.4" 
        fill="none" 
      />
      <path 
        d="M16,36 C16,36 22,39 32,39 C42,39 48,36 48,36" 
        stroke="#9A7D0A" 
        strokeWidth="0.8" 
        strokeOpacity="0.4" 
        fill="none" 
      />
      
      {/* Realistic planet highlights */}
      <circle cx="26" cy="26" r="2.5" fill="#FFF7E4" fillOpacity="0.6" />
      <circle cx="24" cy="24" r="0.8" fill="#FFFFFF" fillOpacity="0.8" />
      
      {/* Enhanced Saturn Rings with more detail */}
      <g filter="url(#goldenGlow)" className="saturn-ring">
        {/* Outer ring with dash pattern for more detail */}
        <ellipse 
          cx="32" 
          cy="32" 
          rx="28" 
          ry="6" 
          transform="rotate(-20 32 32)" 
          stroke="url(#goldenRingGradient)" 
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
          stroke="#F7DC6F" 
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
          stroke="#F1C40F" 
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
          stroke="#D4AC0D" 
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
      <circle cx="12" cy="12" r="0.4" fill="#FFFFFF" fillOpacity="0.8" className="animate-pulse-slow" />
      <circle cx="56" cy="48" r="0.5" fill="#FFFFFF" fillOpacity="0.7" className="animate-pulse-slow" />
      <circle cx="52" cy="14" r="0.3" fill="#FFFFFF" fillOpacity="0.9" className="animate-pulse-slow" />
      
      {/* Add subtle particles in the rings */}
      <circle cx="48" cy="28" r="0.3" fill="#FFFFFF" fillOpacity="0.9" className="animate-pulse-slow" />
      <circle cx="16" cy="36" r="0.3" fill="#FFFFFF" fillOpacity="0.9" className="animate-pulse-slow" />
      <circle cx="44" cy="36" r="0.3" fill="#FFFFFF" fillOpacity="0.9" className="animate-pulse-slow" />
      <circle cx="20" cy="28" r="0.3" fill="#FFFFFF" fillOpacity="0.9" className="animate-pulse-slow" />
    </svg>
  );
};

export default SaturnLogo;
