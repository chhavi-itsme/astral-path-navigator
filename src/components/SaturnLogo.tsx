
import React from "react";

interface SaturnLogoProps {
  className?: string;
}

const SaturnLogo: React.FC<SaturnLogoProps> = ({ className = "w-10 h-10" }) => {
  return (
    <svg
      className={className}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="50" cy="50" r="30" fill="#E6AD4C" />
      <ellipse
        cx="50"
        cy="50"
        rx="45"
        ry="10"
        transform="rotate(-20 50 50)"
        stroke="#E6AD4C"
        strokeWidth="3"
        className="saturn-ring"
      />
      <circle cx="60" cy="40" r="5" fill="#F8D89C" opacity="0.7" />
    </svg>
  );
};

export default SaturnLogo;
