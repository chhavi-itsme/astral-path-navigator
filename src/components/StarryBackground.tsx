
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
    
    const stars: {
      x: number;
      y: number;
      radius: number;
      alpha: number;
      direction: number;
      twinkleSpeed: number;
    }[] = [];
    
    // Create stars
    const createStars = () => {
      const numberOfStars = Math.floor(canvas.width * canvas.height / 1500);
      
      for (let i = 0; i < numberOfStars; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 1.5,
          alpha: Math.random(),
          direction: Math.random() > 0.5 ? 0.005 : -0.005,
          twinkleSpeed: Math.random() * 0.01 + 0.003
        });
      }
    };
    
    // Draw stars
    const drawStars = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      stars.forEach(star => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
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
