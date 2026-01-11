'use client';

import { useEffect, useRef } from 'react';

export default function BackgroundBlob() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const mousePos = useRef({ x: 0, y: 0 });
    const blobPos = useRef({ x: 0, y: 0 });

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        const handleMouseMove = (e: MouseEvent) => {
            mousePos.current = { x: e.clientX, y: e.clientY };
        };

        window.addEventListener('resize', handleResize);
        window.addEventListener('mousemove', handleMouseMove);

        let animationId: number;
        const animate = () => {
            // Smooth follow
            blobPos.current.x += (mousePos.current.x - blobPos.current.x) * 0.05;
            blobPos.current.y += (mousePos.current.y - blobPos.current.y) * 0.05;

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Create gradient blob
            const gradient = ctx.createRadialGradient(
                blobPos.current.x, blobPos.current.y, 0,
                blobPos.current.x, blobPos.current.y, 400
            );

            gradient.addColorStop(0, 'rgba(168, 85, 247, 0.15)');
            gradient.addColorStop(0.5, 'rgba(59, 130, 246, 0.08)');
            gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            animationId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none z-0 hidden md:block"
            style={{ mixBlendMode: 'screen' }}
        />
    );
}
