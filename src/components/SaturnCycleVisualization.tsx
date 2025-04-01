
import React, { useEffect, useRef, memo } from 'react';
import SaturnLogo from '@/components/SaturnLogo';
import { Button } from '@/components/ui/button';

interface SaturnCycleVisualizationProps {
  currentAge: number;
  birthDate: Date | undefined;
  showDetailedResults: boolean;
  toggleDetailedResults: () => void;
}

const SaturnCycleVisualization: React.FC<SaturnCycleVisualizationProps> = memo(({ 
  currentAge, 
  birthDate,
  showDetailedResults,
  toggleDetailedResults
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  
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

  // Optimized drawing function with reduced operations
  const drawCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    // Draw space background with subtle gradients - simplified for performance
    const bgGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, canvas.width / 1.5);
    bgGradient.addColorStop(0, 'rgba(30, 20, 60, 0.3)');
    bgGradient.addColorStop(1, 'rgba(10, 10, 30, 0)');
    ctx.fillStyle = bgGradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Add fewer stars to the background for better performance
    for (let i = 0; i < 25; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const radius = Math.random() * 0.8;
      const opacity = Math.random() * 0.8 + 0.2;
      
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
      ctx.fill();
    }

    // Draw enhanced sun with simplified gradients
    ctx.beginPath();
    const sunGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 15);
    sunGradient.addColorStop(0, '#FFFDE7');
    sunGradient.addColorStop(1, '#F57F17');
    ctx.fillStyle = sunGradient;
    ctx.arc(centerX, centerY, 15, 0, Math.PI * 2);
    ctx.fill();

    // Simplified sun glow
    ctx.beginPath();
    const glowGradient = ctx.createRadialGradient(centerX, centerY, 15, centerX, centerY, 40);
    glowGradient.addColorStop(0, 'rgba(255, 236, 179, 0.7)');
    glowGradient.addColorStop(1, 'rgba(255, 236, 179, 0)');
    ctx.fillStyle = glowGradient;
    ctx.arc(centerX, centerY, 40, 0, Math.PI * 2);
    ctx.fill();

    // Draw orbits - optimized to draw only needed orbits
    const orbits = [
      { radius: 80, label: "First Saturn Return", age: "29.5" },
      { radius: 130, label: "Second Saturn Return", age: "59" },
      { radius: 180, label: "Third Saturn Return", age: "88.5" },
      { radius: 230, label: "Fourth Saturn Return", age: "118" },
      { radius: 280, label: "Fifth Saturn Return", age: "147.5" }
    ];

    // Get the current orbit for highlighting
    const currentOrbitIndex = calculateOrbit() - 1;
    
    // Draw orbit circles - only draw important ones for better performance
    orbits.forEach((orbit, index) => {
      // Draw orbit circle if it's the current orbit or adjacent orbits
      if (Math.abs(index - currentOrbitIndex) <= 1) {
        ctx.beginPath();
        const isCurrentOrbit = index === currentOrbitIndex;
        
        if (isCurrentOrbit) {
          ctx.strokeStyle = 'rgba(155, 120, 255, 0.8)';
          ctx.lineWidth = 2;
        } else {
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
          ctx.lineWidth = 1;
        }
        
        ctx.arc(centerX, centerY, orbit.radius, 0, Math.PI * 2);
        ctx.stroke();
        
        // Add orbit labels only for current orbit
        if (isCurrentOrbit) {
          ctx.font = '12px Arial';
          ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
          ctx.textAlign = 'center';
          ctx.fillText(orbit.label, centerX, centerY - orbit.radius - 10);
          ctx.fillText(`Age: ${orbit.age}`, centerX, centerY - orbit.radius + 15);
        }
      }
    });

    // Calculate Saturn's position on the orbit
    const orbitRadius = orbits[currentOrbitIndex].radius;
    const position = calculateSaturnPosition();
    const angle = (position / 100) * Math.PI * 2 - Math.PI / 2;
    
    const saturnX = centerX + Math.cos(angle) * orbitRadius;
    const saturnY = centerY + Math.sin(angle) * orbitRadius;

    // Simplified Saturn glow
    ctx.save();
    ctx.beginPath();
    ctx.fillStyle = 'rgba(163, 132, 255, 0.5)';
    ctx.arc(saturnX, saturnY, 15, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  };

  // Initialize and cleanup canvas effect
  useEffect(() => {
    let animationFrameId: number;
    
    const animate = () => {
      drawCanvas();
      animationFrameId = requestAnimationFrame(animate);
    };
    
    // Start animation
    animationFrameId = requestAnimationFrame(animate);
    
    // Cleanup
    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [currentAge, birthDate]);

  return (
    <div className="flex flex-col items-center space-y-6 py-8">
      <h2 className="text-3xl font-bold text-center cosmic-title">Your Saturn Cycle</h2>
      
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
            transform: 'translate(-50%, -50%)',
          }}
        >
          <SaturnLogo className="w-12 h-12" />
        </div>

        {/* Sun at center */}
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-yellow-100 via-yellow-300 to-yellow-500"></div>
        </div>
      </div>
      
      <div className="text-center space-y-2 glassmorphism p-4 rounded-lg">
        <div className="text-lg text-accent font-medium">
          <span>Current position: {calculateSaturnPosition().toFixed(1)}%</span>
        </div>
        <div className="text-xl font-semibold text-yellow-300">
          <span>Orbit {calculateOrbit()}</span>
        </div>
        <div className="text-2xl">
          Your current age: <span className="font-bold cosmic-title">{currentAge.toFixed(2)}</span>
        </div>
      </div>
      
      <Button
        onClick={toggleDetailedResults}
        className="px-6 py-2 bg-primary/20 hover:bg-primary/30 text-primary-foreground rounded-full border border-primary/50 transition-colors backdrop-blur-sm"
      >
        {showDetailedResults ? "Hide" : "Show"} Detailed Results
      </Button>
    </div>
  );
});

SaturnCycleVisualization.displayName = 'SaturnCycleVisualization';

export default SaturnCycleVisualization;
