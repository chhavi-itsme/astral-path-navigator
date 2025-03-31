import React, { useEffect, useRef } from 'react';
import SaturnLogo from '@/components/SaturnLogo';

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

  // Draw the orbit visualization with enhanced realism
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    // Draw space background with subtle gradients
    const bgGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, canvas.width / 1.5);
    bgGradient.addColorStop(0, 'rgba(30, 20, 60, 0.3)');
    bgGradient.addColorStop(1, 'rgba(10, 10, 30, 0)');
    ctx.fillStyle = bgGradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Add some stars to the background
    for (let i = 0; i < 50; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const radius = Math.random() * 0.8;
      const opacity = Math.random() * 0.8 + 0.2;
      
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
      ctx.fill();
    }

    // Draw enhanced sun with more realistic gradients
    ctx.beginPath();
    const sunGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 15);
    sunGradient.addColorStop(0, '#FFFDE7'); // Center: Almost white
    sunGradient.addColorStop(0.3, '#FFF9C4'); // Light yellow
    sunGradient.addColorStop(0.7, '#FFD54F'); // Medium yellow
    sunGradient.addColorStop(1, '#F57F17'); // Orange-yellow edge
    ctx.fillStyle = sunGradient;
    ctx.arc(centerX, centerY, 15, 0, Math.PI * 2);
    ctx.fill();

    // Enhanced sun glow with multiple layers
    ctx.beginPath();
    const glowGradient = ctx.createRadialGradient(centerX, centerY, 15, centerX, centerY, 40);
    glowGradient.addColorStop(0, 'rgba(255, 236, 179, 0.7)');
    glowGradient.addColorStop(0.5, 'rgba(255, 236, 179, 0.3)');
    glowGradient.addColorStop(1, 'rgba(255, 236, 179, 0)');
    ctx.fillStyle = glowGradient;
    ctx.arc(centerX, centerY, 40, 0, Math.PI * 2);
    ctx.fill();
    
    // Add subtle sun corona
    ctx.beginPath();
    const coronaGradient = ctx.createRadialGradient(centerX, centerY, 40, centerX, centerY, 60);
    coronaGradient.addColorStop(0, 'rgba(255, 160, 0, 0.1)');
    coronaGradient.addColorStop(1, 'rgba(255, 160, 0, 0)');
    ctx.fillStyle = coronaGradient;
    ctx.arc(centerX, centerY, 60, 0, Math.PI * 2);
    ctx.fill();

    // Draw orbits
    const orbits = [
      { radius: 80, label: "First Saturn Return", age: "29.5" },
      { radius: 130, label: "Second Saturn Return", age: "59" },
      { radius: 180, label: "Third Saturn Return", age: "88.5" },
      { radius: 230, label: "Fourth Saturn Return", age: "118" },
      { radius: 280, label: "Fifth Saturn Return", age: "147.5" }
    ];

    // Draw orbit circles with enhanced visual style
    orbits.forEach((orbit, index) => {
      // Draw orbit circle
      ctx.beginPath();
      
      // Current orbit gets a special appearance
      const isCurrentOrbit = index === calculateOrbit() - 1;
      
      // Create gradient for orbit
      const orbitGradient = ctx.createLinearGradient(
        centerX - orbit.radius, centerY, 
        centerX + orbit.radius, centerY
      );
      
      if (isCurrentOrbit) {
        orbitGradient.addColorStop(0, 'rgba(155, 120, 255, 0.8)');
        orbitGradient.addColorStop(0.5, 'rgba(180, 140, 255, 0.9)');
        orbitGradient.addColorStop(1, 'rgba(155, 120, 255, 0.8)');
        ctx.strokeStyle = orbitGradient;
        ctx.lineWidth = 2.5;
        
        // Add glow to current orbit
        ctx.shadowColor = 'rgba(163, 132, 255, 0.8)';
        ctx.shadowBlur = 8;
      } else {
        orbitGradient.addColorStop(0, 'rgba(255, 255, 255, 0.1)');
        orbitGradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.25)');
        orbitGradient.addColorStop(1, 'rgba(255, 255, 255, 0.1)');
        ctx.strokeStyle = orbitGradient;
        ctx.lineWidth = 1;
        ctx.shadowBlur = 0;
      }
      
      ctx.arc(centerX, centerY, orbit.radius, 0, Math.PI * 2);
      ctx.stroke();
      ctx.shadowBlur = 0; // Reset shadow for other elements
      
      // Add subtle orbit labels with age markers
      if (isCurrentOrbit) {
        ctx.font = '12px Arial';
        ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
        ctx.textAlign = 'center';
        ctx.fillText(orbit.label, centerX, centerY - orbit.radius - 10);
        ctx.fillText(`Age: ${orbit.age}`, centerX, centerY - orbit.radius + 15);
      }
    });

    // Calculate Saturn's position on the orbit
    const orbitIndex = calculateOrbit() - 1;
    const orbitRadius = orbits[orbitIndex].radius;
    const position = calculateSaturnPosition();
    const angle = (position / 100) * Math.PI * 2 - Math.PI / 2; // Start from top (subtract 90 degrees)
    
    const saturnX = centerX + Math.cos(angle) * orbitRadius;
    const saturnY = centerY + Math.sin(angle) * orbitRadius;

    // Draw Saturn's current position with enhanced glow
    ctx.save();
    ctx.translate(saturnX, saturnY);
    ctx.rotate(angle + Math.PI / 2); // Adjust Saturn's rotation
    
    // Draw a pulsing glow circle for Saturn's position
    ctx.beginPath();
    const saturnGlow = ctx.createRadialGradient(0, 0, 0, 0, 0, 25);
    saturnGlow.addColorStop(0, 'rgba(163, 132, 255, 0.9)');
    saturnGlow.addColorStop(0.5, 'rgba(163, 132, 255, 0.5)');
    saturnGlow.addColorStop(1, 'rgba(163, 132, 255, 0)');
    ctx.fillStyle = saturnGlow;
    ctx.arc(0, 0, 25, 0, Math.PI * 2);
    ctx.fill();
    
    // Add subtle pulse animation to Saturn's position
    const now = Date.now();
    const pulseSize = Math.sin(now * 0.002) * 5 + 20; // Pulse between 15 and 25
    
    ctx.beginPath();
    const pulseGlow = ctx.createRadialGradient(0, 0, 0, 0, 0, pulseSize);
    pulseGlow.addColorStop(0, 'rgba(180, 150, 255, 0.3)');
    pulseGlow.addColorStop(1, 'rgba(180, 150, 255, 0)');
    ctx.fillStyle = pulseGlow;
    ctx.arc(0, 0, pulseSize, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.restore();
    
    // Request animation frame to keep the animation smooth
    requestAnimationFrame(() => {
      if (canvas) {
        // This will trigger a redraw on the next frame
        const redraw = new Event('redraw');
        canvas.dispatchEvent(redraw);
      }
    });
  }, [currentAge, birthDate]);

  // Add event listener for redraw event
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const handleRedraw = () => {
      // This will trigger the useEffect above
      const ctx = canvas.getContext('2d');
      if (ctx) {
        // Just a minimal update to create animation effect
        const now = Date.now();
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        
        // Subtle pulsing for sun
        const pulseSize = Math.sin(now * 0.001) * 2 + 15; // Pulse between 13 and 17
        ctx.beginPath();
        const sunPulse = ctx.createRadialGradient(centerX, centerY, pulseSize-3, centerX, centerY, pulseSize+5);
        sunPulse.addColorStop(0, 'rgba(255, 236, 179, 0.2)');
        sunPulse.addColorStop(1, 'rgba(255, 236, 179, 0)');
        ctx.fillStyle = sunPulse;
        ctx.arc(centerX, centerY, pulseSize+5, 0, Math.PI * 2);
        ctx.fill();
      }
    };
    
    canvas.addEventListener('redraw', handleRedraw);
    return () => {
      canvas.removeEventListener('redraw', handleRedraw);
    };
  }, []);

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
        
        {/* Saturn overlay at calculated position with animation */}
        <div 
          className="absolute animate-pulse" 
          style={{ 
            left: `calc(50% + ${Math.cos((calculateSaturnPosition() / 100) * Math.PI * 2 - Math.PI / 2) * (calculateOrbit() < 3 ? 80 : 130)}px)`,
            top: `calc(50% + ${Math.sin((calculateSaturnPosition() / 100) * Math.PI * 2 - Math.PI / 2) * (calculateOrbit() < 3 ? 80 : 130)}px)`,
            transform: 'translate(-50%, -50%)',
            animation: 'pulse 3s infinite ease-in-out'
          }}
        >
          <SaturnLogo className="w-12 h-12 animate-[glow_3s_infinite_ease-in-out]" />
        </div>

        {/* Sun at center with enhanced animation */}
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-yellow-100 via-yellow-300 to-yellow-500 animate-pulse shadow-[0_0_25px_15px_rgba(255,215,0,0.4)]"></div>
        </div>
      </div>
      
      <div className="text-center space-y-2 glassmorphism p-4 rounded-lg">
        <div className="text-lg text-accent font-medium">
          <span className="sparkling-text">Current position: {calculateSaturnPosition().toFixed(1)}%</span>
        </div>
        <div className="text-xl font-semibold text-yellow-300">
          <span className="sparkling-text">Orbit {calculateOrbit()}</span>
        </div>
        <div className="text-2xl">
          Your current age: <span className="font-bold cosmic-title">{currentAge.toFixed(2)}</span>
        </div>
      </div>
      
      <button
        className="px-6 py-2 bg-primary/20 hover:bg-primary/30 text-primary-foreground rounded-full border border-primary/50 transition-colors backdrop-blur-sm shadow-lg hover:shadow-primary/20 transform hover:scale-105"
      >
        Hide Detailed Results
      </button>
    </div>
  );
};

export default SaturnCycleVisualization;
