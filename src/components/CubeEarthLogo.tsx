import { useEffect, useRef } from 'react';
import earthTexture from '@/assets/earth-texture.jpg';

const CubeEarthLogo = ({ size = 60 }: { size?: number }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = size;
    canvas.height = size;

    const img = new Image();
    img.src = earthTexture;
    
    let rotation = 0;
    const cubeSize = size * 0.8;
    const centerX = size / 2;
    const centerY = size / 2;

    const animate = () => {
      ctx.clearRect(0, 0, size, size);
      
      // Apply holographic glow effect
      ctx.shadowColor = '#00ffff';
      ctx.shadowBlur = 20;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;

      // Save context for transformations
      ctx.save();
      
      // Move to center and rotate
      ctx.translate(centerX, centerY);
      ctx.rotate(rotation);
      
      // Draw cube faces with earth texture
      const faceSize = cubeSize / 2;
      
      // Front face
      ctx.fillStyle = '#00ffff40';
      ctx.fillRect(-faceSize/2, -faceSize/2, faceSize, faceSize);
      
      // Draw wireframe edges with neon glow
      ctx.strokeStyle = '#00ffff';
      ctx.lineWidth = 2;
      ctx.setLineDash([5, 5]);
      
      // Cube outline
      ctx.strokeRect(-faceSize/2, -faceSize/2, faceSize, faceSize);
      
      // Add 3D effect lines
      ctx.setLineDash([]);
      ctx.beginPath();
      ctx.moveTo(-faceSize/2, -faceSize/2);
      ctx.lineTo(-faceSize/4, -faceSize/1.5);
      ctx.moveTo(faceSize/2, -faceSize/2);
      ctx.lineTo(faceSize/4, -faceSize/1.5);
      ctx.moveTo(faceSize/2, faceSize/2);
      ctx.lineTo(faceSize/4, faceSize/4);
      ctx.moveTo(-faceSize/2, faceSize/2);
      ctx.lineTo(-faceSize/4, faceSize/4);
      ctx.stroke();
      
      // Top face
      ctx.fillStyle = '#00dddd60';
      ctx.beginPath();
      ctx.moveTo(-faceSize/2, -faceSize/2);
      ctx.lineTo(-faceSize/4, -faceSize/1.5);
      ctx.lineTo(faceSize/4, -faceSize/1.5);
      ctx.lineTo(faceSize/2, -faceSize/2);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      
      // Right face
      ctx.fillStyle = '#0099ff40';
      ctx.beginPath();
      ctx.moveTo(faceSize/2, -faceSize/2);
      ctx.lineTo(faceSize/4, -faceSize/1.5);
      ctx.lineTo(faceSize/4, faceSize/4);
      ctx.lineTo(faceSize/2, faceSize/2);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      ctx.restore();

      rotation += 0.02;
      animationRef.current = requestAnimationFrame(animate);
    };

    img.onload = () => animate();
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [size]);

  return (
    <div className="relative">
      <canvas 
        ref={canvasRef}
        className="animate-float"
        style={{ filter: 'drop-shadow(0 0 10px #00ffff50)' }}
      />
    </div>
  );
};

export default CubeEarthLogo;