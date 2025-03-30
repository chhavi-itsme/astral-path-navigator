
import React, { useEffect, useRef } from 'react';
import { SaturnLogo } from '@/components/SaturnLogo';

interface SaturnCycleVisualizationProps {
  currentAge: number;
  birthDate: Date | undefined;
}

const SaturnCycleVisualization: React.FC<SaturnCycleVisualizationProps> = ({ 
  currentAge, 
  birthDate 
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Calculate Saturn position based on age
  const calculateSaturnPosition = () => {
    // Saturn completes a full orbit in ~29.5 years
    const orbitPercentage = (currentAge % 29.5) / 29.5;
    return orbitPercentage * 100;
  };

  // Determine which orbit the person is in
  const calculateOrbit = () => {
    if (currentAge < 29.5) return 1;
    if (currentAge < 59) return 2;
    if (currentAge < 88.5) return 3;
    if (currentAge < 118) return 4;
    return 5;
  };

  // Draw the orbit visualization
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    // Draw sun
    ctx.beginPath();
    const sunGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 15);
    sunGradient.addColorStop(0, '#FFF9C4');
    sunGradient.addColorStop(1, '#F57F17');
    ctx.fillStyle = sunGradient;
    ctx.arc(centerX, centerY, 15, 0, Math.PI * 2);
    ctx.fill();

    // Add glow to sun
    ctx.beginPath();
    const glowGradient = ctx.createRadialGradient(centerX, centerY, 15, centerX, centerY, 30);
    glowGradient.addColorStop(0, 'rgba(255, 236, 179, 0.6)');
    glowGradient.addColorStop(1, 'rgba(255, 236, 179, 0)');
    ctx.fillStyle = glowGradient;
    ctx.arc(centerX, centerY, 30, 0, Math.PI * 2);
    ctx.fill();

    // Draw orbits
    const orbits = [
      { radius: 80, label: "First Saturn Return", age: "29.5" },
      { radius: 130, label: "Second Saturn Return", age: "59" },
      { radius: 180, label: "Third Saturn Return", age: "88.5" },
      { radius: 230, label: "Fourth Saturn Return", age: "118" },
      { radius: 280, label: "Fifth Saturn Return", age: "147.5" }
    ];

    // Draw orbit circles
    orbits.forEach((orbit, index) => {
      // Draw orbit circle
      ctx.beginPath();
      ctx.strokeStyle = index === calculateOrbit() - 1 
        ? 'rgba(163, 132, 255, 0.6)' 
        : 'rgba(255, 255, 255, 0.2)';
      ctx.lineWidth = index === calculateOrbit() - 1 ? 2 : 1;
      ctx.arc(centerX, centerY, orbit.radius, 0, Math.PI * 2);
      ctx.stroke();
    });

    // Calculate Saturn's position on the orbit
    const orbitIndex = calculateOrbit() - 1;
    const orbitRadius = orbits[orbitIndex].radius;
    const position = calculateSaturnPosition();
    const angle = (position / 100) * Math.PI * 2 - Math.PI / 2; // Start from top (subtract 90 degrees)
    
    const saturnX = centerX + Math.cos(angle) * orbitRadius;
    const saturnY = centerY + Math.sin(angle) * orbitRadius;

    // Draw Saturn's current position
    ctx.save();
    ctx.translate(saturnX, saturnY);
    ctx.rotate(angle + Math.PI / 2); // Adjust Saturn's rotation
    
    // Draw a small glowing circle for Saturn's position
    ctx.beginPath();
    const saturnGlow = ctx.createRadialGradient(0, 0, 0, 0, 0, 20);
    saturnGlow.addColorStop(0, 'rgba(163, 132, 255, 0.8)');
    saturnGlow.addColorStop(1, 'rgba(163, 132, 255, 0)');
    ctx.fillStyle = saturnGlow;
    ctx.arc(0, 0, 20, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.restore();
  }, [currentAge, birthDate]);

  return (
    <div className="flex flex-col items-center space-y-6 py-8">
      <h2 className="text-3xl font-bold text-center">Your Saturn Cycle</h2>
      
      <div className="relative">
        <canvas 
          ref={canvasRef} 
          width={600} 
          height={600} 
          className="max-w-full h-auto"
        />
        
        {/* Saturn overlay at calculated position */}
        <div 
          className="absolute" 
          style={{ 
            left: `calc(50% + ${Math.cos((calculateSaturnPosition() / 100) * Math.PI * 2 - Math.PI / 2) * (calculateOrbit() < 3 ? 80 : 130)}px)`,
            top: `calc(50% + ${Math.sin((calculateSaturnPosition() / 100) * Math.PI * 2 - Math.PI / 2) * (calculateOrbit() < 3 ? 80 : 130)}px)`,
            transform: 'translate(-50%, -50%)'
          }}
        >
          <SaturnLogo className="w-10 h-10" />
        </div>

        {/* Sun at center */}
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-8 h-8 rounded-full bg-yellow-400 animate-pulse shadow-[0_0_20px_10px_rgba(255,215,0,0.3)]"></div>
        </div>
      </div>
      
      <div className="text-center space-y-2">
        <div className="text-lg text-accent">
          Current position: {calculateSaturnPosition().toFixed(1)}%
        </div>
        <div className="text-xl font-semibold text-yellow-400">
          Orbit {calculateOrbit()}
        </div>
        <div className="text-2xl">
          Your current age: <span className="font-bold">{currentAge.toFixed(2)}</span>
        </div>
      </div>
      
      <button
        className="px-6 py-2 bg-primary/20 hover:bg-primary/30 text-primary-foreground rounded-full border border-primary/50 transition-colors"
      >
        Hide Detailed Results
      </button>
    </div>
  );
};

export default SaturnCycleVisualization;
