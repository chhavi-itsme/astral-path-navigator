
import React, { useState, useEffect } from "react";

interface FloatingSaturnProps {
  size?: "sm" | "md" | "lg" | "xl";
  position: string;
  delay?: number;
  rotation?: number;
  variant?: "golden" | "purple" | "fiery";
}

const FloatingSaturn: React.FC<FloatingSaturnProps> = ({ 
  size = "md", 
  position,
  delay = 0,
  rotation = -12,
  variant = "golden"
}) => {
  const [randomStars, setRandomStars] = useState<Array<{x: number, y: number, size: number, delay: number}>>([]);
  
  // Generate random stars
  useEffect(() => {
    const stars = [];
    const starCount = Math.floor(Math.random() * 10) + 5;
    
    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * 64,
        y: Math.random() * 64,
        size: Math.random() * 0.4 + 0.2,
        delay: Math.random() * 2
      });
    }
    
    setRandomStars(stars);
  }, []);
  
  const sizeMap = {
    sm: "w-20 h-20",
    md: "w-32 h-32",
    lg: "w-40 h-40",
    xl: "w-64 h-64",
  };
  
  const variantMap = {
    golden: {
      planetGradient: "saturnGradient",
      ringGradient: "ringGradient1",
      glow: "goldenGlow",
    },
    purple: {
      planetGradient: "purpleSaturnGradient",
      ringGradient: "purpleRingGradient",
      glow: "purpleGlow",
    },
    fiery: {
      planetGradient: "fierySaturnGradient",
      ringGradient: "fieryRingGradient",
      glow: "fieryGlow",
    }
  };
  
  const selectedVariant = variantMap[variant];

  return (
    <div 
      className={`absolute ${position} z-10`}
      style={{ 
        animation: `float 8s ease-in-out ${delay}s infinite`,
        opacity: 0.9,
        filter: "drop-shadow(0 0 10px rgba(0,0,0,0.5))"
      }}
    >
      <svg
        className={`${sizeMap[size]} transform rotate-[${rotation}deg]`}
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Enhanced planet gradients */}
          <radialGradient id="saturnGradient" cx="0.5" cy="0.5" r="0.5" fx="0.6" fy="0.35">
            <stop offset="0%" stopColor="#FEF9E7" /> {/* Light yellow center */}
            <stop offset="20%" stopColor="#F4D03F" /> {/* Bright yellow */}
            <stop offset="50%" stopColor="#E9B64D" /> {/* Gold */}
            <stop offset="80%" stopColor="#CA8A17" /> {/* Dark gold */}
            <stop offset="100%" stopColor="#9A7D0A" /> {/* Deep gold */}
          </radialGradient>
          
          {/* Purple Saturn variant */}
          <radialGradient id="purpleSaturnGradient" cx="0.5" cy="0.5" r="0.5" fx="0.4" fy="0.4">
            <stop offset="0%" stopColor="#A569BD" /> {/* Light purple */}
            <stop offset="30%" stopColor="#8E44AD" /> {/* Medium purple */}
            <stop offset="70%" stopColor="#6C3483" /> {/* Deep purple */}
            <stop offset="100%" stopColor="#512E5F" /> {/* Dark purple */}
          </radialGradient>
          
          {/* Fiery orange Saturn variant */}
          <radialGradient id="fierySaturnGradient" cx="0.5" cy="0.5" r="0.5" fx="0.6" fy="0.4">
            <stop offset="0%" stopColor="#FFEFBA" /> {/* Light yellow */}
            <stop offset="20%" stopColor="#F5B041" /> {/* Orange */}
            <stop offset="50%" stopColor="#E67E22" /> {/* Dark orange */}
            <stop offset="80%" stopColor="#D35400" /> {/* Deep orange */}
            <stop offset="100%" stopColor="#A93226" /> {/* Red orange */}
          </radialGradient>
          
          {/* Enhanced ring gradients */}
          <linearGradient id="ringGradient1" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#F9E79F" stopOpacity="0.3" />
            <stop offset="20%" stopColor="#F7DC6F" stopOpacity="0.7" />
            <stop offset="50%" stopColor="#F1C40F" stopOpacity="0.9" />
            <stop offset="80%" stopColor="#D4AC0D" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#9A7D0A" stopOpacity="0.3" />
          </linearGradient>
          
          {/* Purple ring gradient */}
          <linearGradient id="purpleRingGradient" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#D2B4DE" stopOpacity="0.3" />
            <stop offset="20%" stopColor="#BB8FCE" stopOpacity="0.7" />
            <stop offset="50%" stopColor="#8E44AD" stopOpacity="0.9" />
            <stop offset="80%" stopColor="#6C3483" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#512E5F" stopOpacity="0.3" />
          </linearGradient>
          
          {/* Fiery ring gradient */}
          <linearGradient id="fieryRingGradient" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#FFBB9A" stopOpacity="0.3" />
            <stop offset="20%" stopColor="#F5B041" stopOpacity="0.7" />
            <stop offset="50%" stopColor="#E67E22" stopOpacity="0.9" />
            <stop offset="80%" stopColor="#D35400" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#A93226" stopOpacity="0.3" />
          </linearGradient>
          
          {/* Enhanced glows */}
          <filter id="goldenGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feFlood flood-color="#F1C40F" flood-opacity="0.3" result="color" />
            <feComposite in="color" in2="blur" operator="in" result="glow" />
            <feComposite in="SourceGraphic" in2="glow" operator="over" />
          </filter>
          
          <filter id="purpleGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feFlood flood-color="#8E44AD" flood-opacity="0.3" result="color" />
            <feComposite in="color" in2="blur" operator="in" result="glow" />
            <feComposite in="SourceGraphic" in2="glow" operator="over" />
          </filter>
          
          <filter id="fieryGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feFlood flood-color="#E67E22" flood-opacity="0.3" result="color" />
            <feComposite in="color" in2="blur" operator="in" result="glow" />
            <feComposite in="SourceGraphic" in2="glow" operator="over" />
          </filter>
          
          {/* Realistic shadow */}
          <filter id="planetShadow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="1.5" dy="1.5" stdDeviation="2.5" floodColor="#000" floodOpacity="0.5" />
          </filter>
          
          {/* Star glint effect */}
          <filter id="starGlint" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="0.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>
        
        {/* Background space effect */}
        <rect width="64" height="64" fill="url(#spaceBackground)" opacity="0.3" />
        
        {/* Shadow for 3D effect */}
        <circle cx="33" cy="33" r="15" fill="#000000" fillOpacity="0.2" filter="url(#blur)" />
        
        {/* Main Saturn planet body with enhanced realism */}
        <circle 
          cx="32" 
          cy="32" 
          r="16" 
          fill={`url(#${selectedVariant.planetGradient})`} 
          filter="url(#planetShadow)"
          className="animate-[pulse_8s_ease-in-out_infinite]"
        />
        
        {/* Realistic surface details - different for each variant */}
        {variant === "golden" && (
          <>
            <ellipse cx="28" cy="28" rx="7" ry="3" fill="#FEF9E7" fillOpacity="0.4" />
            <ellipse cx="38" cy="36" rx="6" ry="2.5" fill="#9A7D0A" fillOpacity="0.4" />
            <ellipse cx="30" cy="34" rx="5" ry="2" fill="#F4D03F" fillOpacity="0.5" />
            
            {/* Surface bands */}
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
          </>
        )}
        
        {variant === "purple" && (
          <>
            <ellipse cx="28" cy="28" rx="7" ry="3" fill="#A569BD" fillOpacity="0.4" />
            <ellipse cx="38" cy="36" rx="6" ry="2.5" fill="#512E5F" fillOpacity="0.4" />
            <ellipse cx="30" cy="34" rx="5" ry="2" fill="#8E44AD" fillOpacity="0.5" />
            
            {/* Surface bands */}
            <path 
              d="M16,32 C16,32 20,29 32,29 C44,29 48,32 48,32" 
              stroke="#512E5F" 
              strokeWidth="0.8" 
              strokeOpacity="0.4" 
              fill="none" 
            />
            <path 
              d="M16,36 C16,36 22,39 32,39 C42,39 48,36 48,36" 
              stroke="#512E5F" 
              strokeWidth="0.8" 
              strokeOpacity="0.4" 
              fill="none" 
            />
          </>
        )}
        
        {variant === "fiery" && (
          <>
            <ellipse cx="28" cy="28" rx="7" ry="3" fill="#FFEFBA" fillOpacity="0.4" />
            <ellipse cx="38" cy="36" rx="6" ry="2.5" fill="#A93226" fillOpacity="0.4" />
            <ellipse cx="30" cy="34" rx="5" ry="2" fill="#F5B041" fillOpacity="0.5" />
            
            {/* Surface bands */}
            <path 
              d="M16,32 C16,32 20,29 32,29 C44,29 48,32 48,32" 
              stroke="#A93226" 
              strokeWidth="0.8" 
              strokeOpacity="0.4" 
              fill="none" 
            />
            <path 
              d="M16,36 C16,36 22,39 32,39 C42,39 48,36 48,36" 
              stroke="#A93226" 
              strokeWidth="0.8" 
              strokeOpacity="0.4" 
              fill="none" 
            />
          </>
        )}
        
        {/* Realistic planet highlights */}
        <circle cx="26" cy="26" r="2.5" fill="#FFFFFF" fillOpacity="0.6" />
        <circle cx="24" cy="24" r="0.8" fill="#FFFFFF" fillOpacity="0.8" />
        
        {/* Enhanced Saturn Rings */}
        <g filter={`url(#${selectedVariant.glow})`} className="saturn-ring">
          {/* Outer ring with dash pattern for realistic detail */}
          <ellipse 
            cx="32" 
            cy="32" 
            rx="28" 
            ry="6" 
            transform="rotate(-20 32 32)" 
            stroke={`url(#${selectedVariant.ringGradient})`} 
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
            stroke={variant === "golden" ? "#F7DC6F" : variant === "purple" ? "#BB8FCE" : "#F5B041"} 
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
            stroke={variant === "golden" ? "#F1C40F" : variant === "purple" ? "#8E44AD" : "#E67E22"} 
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
            stroke={variant === "golden" ? "#D4AC0D" : variant === "purple" ? "#6C3483" : "#D35400"} 
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
        
        {/* Add particle effects to rings */}
        {Array.from({ length: 12 }).map((_, i) => {
          const angle = (i / 12) * Math.PI * 2;
          const radiusVariation = Math.random() * 5 + 20;
          const x = 32 + Math.cos(angle) * radiusVariation;
          const y = 32 + Math.sin(angle) * (radiusVariation / 4);
          
          return (
            <circle 
              key={i}
              cx={x} 
              cy={y} 
              r={Math.random() * 0.4 + 0.2} 
              fill="#FFFFFF" 
              fillOpacity={Math.random() * 0.5 + 0.5} 
              className="animate-[pulse_3s_ease-in-out_infinite]"
              style={{ animationDelay: `${Math.random() * 2}s` }}
            />
          );
        })}
        
        {/* Stars behind Saturn with animation */}
        {randomStars.map((star, index) => (
          <circle 
            key={index}
            cx={star.x} 
            cy={star.y} 
            r={star.size} 
            fill="#FFFFFF" 
            fillOpacity={Math.random() * 0.4 + 0.6} 
            className="animate-[pulse_3s_ease-in-out_infinite]"
            style={{ animationDelay: `${star.delay}s` }}
            filter="url(#starGlint)"
          />
        ))}
      </svg>
    </div>
  );
};

export default FloatingSaturn;
