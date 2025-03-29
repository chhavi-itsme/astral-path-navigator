
import React from "react";

interface FloatingSaturnProps {
  size?: "sm" | "md" | "lg";
  position: string;
  delay?: number;
}

const FloatingSaturn: React.FC<FloatingSaturnProps> = ({ 
  size = "md", 
  position,
  delay = 0
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
        opacity: 0.6
      }}
    >
      <svg
        className={`${sizeMap[size]} transform -rotate-12`}
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="32" cy="32" r="16" fill="#E8B77D" fillOpacity="0.6"/>
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
          strokeOpacity="0.8"
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
          strokeOpacity="0.6"
        />
      </svg>
    </div>
  );
};

export default FloatingSaturn;
