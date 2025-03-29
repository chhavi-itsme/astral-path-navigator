
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
    }
    
    const stars: Star[] = [];
    
    // Create stars
    const createStars = () => {
      const numberOfStars = Math.floor(canvas.width * canvas.height / 1000);
      
      for (let i = 0; i < numberOfStars; i++) {
        // Determine if star should be white or light blue
        const colorChoice = Math.random();
        const color = colorChoice > 0.7 
          ? `rgba(135, 206, 250, ${0.5 + Math.random() * 0.5})` // Light blue
          : colorChoice > 0.4 
            ? `rgba(255, 255, 255, ${0.5 + Math.random() * 0.5})` // White
            : `rgba(200, 200, 255, ${0.3 + Math.random() * 0.7})`; // Light purple
        
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 2,
          alpha: Math.random(),
          direction: Math.random() > 0.5 ? 0.005 : -0.005,
          twinkleSpeed: Math.random() * 0.01 + 0.003,
          color
        });
      }
    };
    
    // Draw stars
    const drawStars = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      stars.forEach(star => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        
        // Extract base color and apply current alpha
        const baseColor = star.color.substring(0, star.color.lastIndexOf(',') + 1);
        const currentColor = `${baseColor} ${star.alpha})`;
        
        ctx.fillStyle = currentColor;
        ctx.fill();
        
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
    drawStars();
    
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  
  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none" />;
};

export default StarryBackground;
