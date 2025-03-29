
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
      <circle cx="32" cy="32" r="16" fill="#E8B77D"/>
      <ellipse 
        cx="32" 
        cy="32" 
        rx="28" 
        ry="6" 
        transform="rotate(-20 32 32)" 
        stroke="#A384FF" 
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
    </svg>
  );
};

export default SaturnLogo;
