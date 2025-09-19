import { useEffect, useRef } from 'react';

const RotatingGlobe = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const size = 200;
    canvas.width = size;
    canvas.height = size;

    let rotation = 0;
    const radius = size * 0.35;
    const centerX = size / 2;
    const centerY = size / 2;

    const animate = () => {
      ctx.clearRect(0, 0, size, size);
      
      // Set up holographic glow
      ctx.shadowColor = '#00ffff';
      ctx.shadowBlur = 30;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;

      // Draw the main globe
      ctx.save();
      ctx.translate(centerX, centerY);
      
      // Globe outline
      ctx.beginPath();
      ctx.arc(0, 0, radius, 0, Math.PI * 2);
      ctx.strokeStyle = '#00ffff';
      ctx.lineWidth = 2;
      ctx.stroke();
      
      // Fill with transparent cosmic gradient
      const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, radius);
      gradient.addColorStop(0, 'rgba(0, 255, 255, 0.1)');
      gradient.addColorStop(0.7, 'rgba(0, 100, 255, 0.05)');
      gradient.addColorStop(1, 'rgba(0, 50, 150, 0.1)');
      ctx.fillStyle = gradient;
      ctx.fill();

      // Draw rotating grid lines
      ctx.strokeStyle = '#00ffff60';
      ctx.lineWidth = 1;
      
      // Latitude lines
      for (let i = 1; i < 6; i++) {
        const y = (radius * 2 * i / 6) - radius;
        const lineRadius = Math.sqrt(radius * radius - y * y);
        
        ctx.beginPath();
        ctx.ellipse(0, y, lineRadius, lineRadius * 0.3, 0, 0, Math.PI * 2);
        ctx.stroke();
      }
      
      // Longitude lines
      for (let i = 0; i < 8; i++) {
        const angle = (i * Math.PI / 4) + rotation;
        
        ctx.save();
        ctx.rotate(angle);
        
        ctx.beginPath();
        ctx.ellipse(0, 0, radius * 0.2, radius, 0, 0, Math.PI * 2);
        ctx.stroke();
        
        ctx.restore();
      }

      // Add some glowing points for land locations
      const points = [
        { x: 0.3, y: -0.2 },
        { x: -0.4, y: 0.1 },
        { x: 0.2, y: 0.4 },
        { x: -0.1, y: -0.3 },
        { x: 0.5, y: 0.2 },
      ];

      ctx.fillStyle = '#ffff00';
      ctx.shadowColor = '#ffff00';
      ctx.shadowBlur = 15;
      
      points.forEach(point => {
        const x = point.x * radius * Math.cos(rotation * 0.5);
        const y = point.y * radius;
        const visibility = Math.cos(rotation * 0.5 + point.x) * 0.5 + 0.5;
        
        if (visibility > 0.3) {
          ctx.globalAlpha = visibility;
          ctx.beginPath();
          ctx.arc(x, y, 3, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      ctx.globalAlpha = 1;
      ctx.restore();

      rotation += 0.01;
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <div className="flex justify-center">
      <canvas 
        ref={canvasRef}
        className="animate-float"
        style={{ filter: 'drop-shadow(0 0 20px #00ffff30)' }}
      />
    </div>
  );
};

export default RotatingGlobe;