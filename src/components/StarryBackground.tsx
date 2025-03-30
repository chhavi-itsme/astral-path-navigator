
import { useEffect, useRef } from "react";

const StarryBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    interface Star {
      x: number;
      y: number;
      radius: number;
      alpha: number;
      direction: number;
      twinkleSpeed: number;
      color: string;
      sparkle: boolean;
      sparkleTime: number;
    }
    
    const stars: Star[] = [];
    
    // Create stars
    const createStars = () => {
      const numberOfStars = Math.floor(canvas.width * canvas.height / 800); // Increased star density
      
      for (let i = 0; i < numberOfStars; i++) {
        // Determine if star should be white or light blue
        const colorChoice = Math.random();
        const color = colorChoice > 0.7 
          ? `rgba(135, 206, 250, ${0.5 + Math.random() * 0.5})` // Light blue
          : colorChoice > 0.4 
            ? `rgba(255, 255, 255, ${0.5 + Math.random() * 0.5})` // White
            : `rgba(200, 200, 255, ${0.3 + Math.random() * 0.7})`; // Light purple
        
        // Add occasional sparkling stars
        const sparkle = Math.random() > 0.85;
        
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 2.5, // Slightly larger
          alpha: Math.random(),
          direction: Math.random() > 0.5 ? 0.005 : -0.005,
          twinkleSpeed: Math.random() * 0.01 + 0.003,
          color,
          sparkle,
          sparkleTime: 0
        });
      }
    };
    
    // Draw stars
    const drawStars = (timestamp: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      stars.forEach(star => {
        ctx.beginPath();
        
        // Normal star drawing
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        
        // Extract base color and apply current alpha
        const baseColor = star.color.substring(0, star.color.lastIndexOf(',') + 1);
        let currentColor = `${baseColor} ${star.alpha})`;
        
        // Add sparkle effect for special stars
        if (star.sparkle) {
          star.sparkleTime += 0.01;
          
          // Add glow effect and occasional sparkle burst
          if (Math.sin(star.sparkleTime) > 0.9) {
            // Sparkle burst
            ctx.shadowColor = star.color;
            ctx.shadowBlur = 10 * Math.sin(star.sparkleTime);
            
            // Draw sparkle lines
            if (Math.sin(star.sparkleTime) > 0.95) {
              const sparkLength = star.radius * 2;
              ctx.save();
              ctx.strokeStyle = currentColor;
              ctx.lineWidth = 0.5;
              
              // Draw sparkle lines
              for (let i = 0; i < 4; i++) {
                const angle = (Math.PI / 2) * i;
                ctx.beginPath();
                ctx.moveTo(star.x, star.y);
                ctx.lineTo(
                  star.x + Math.cos(angle) * sparkLength,
                  star.y + Math.sin(angle) * sparkLength
                );
                ctx.stroke();
              }
              ctx.restore();
            }
          } else {
            ctx.shadowBlur = 0;
          }
        }
        
        ctx.fillStyle = currentColor;
        ctx.fill();
        
        // Reset shadow
        ctx.shadowBlur = 0;
        
        // Twinkle effect
        star.alpha += star.direction * star.twinkleSpeed;
        
        if (star.alpha <= 0.1 || star.alpha >= 0.9) {
          star.direction *= -1;
        }
      });
      
      requestAnimationFrame(drawStars);
    };
    
    // Handle resize
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      stars.length = 0;
      createStars();
    };
    
    window.addEventListener("resize", handleResize);
    
    createStars();
    requestAnimationFrame(drawStars);
    
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  
  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none" />;
};

export default StarryBackground;
