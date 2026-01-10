'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import Overlay from './Overlay';

export default function ScrollyCanvas() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [frameIndex, setFrameIndex] = useState(0);

    // Load images
    // Load images
    useEffect(() => {
        const loadImages = async () => {
            const imageCount = 120;
            const promises: Promise<HTMLImageElement | null>[] = [];

            for (let i = 0; i < imageCount; i++) {
                const indexStr = i.toString().padStart(3, '0');
                const src = `/sequence/${indexStr}.webp`;

                const promise = new Promise<HTMLImageElement | null>((resolve) => {
                    const img = new Image();
                    img.src = src;
                    img.onload = () => resolve(img);
                    img.onerror = () => {
                        console.error(`Failed to load image: ${src}`);
                        resolve(null);
                    };
                });
                promises.push(promise);
            }

            const results = await Promise.all(promises);
            const validImages = results.filter((img): img is HTMLImageElement => img !== null);

            if (validImages.length > 0) {
                setImages(validImages);
                setIsLoaded(true);
            } else {
                console.error("No images loaded successfully");
                // Optionally handle total failure
            }
        };

        loadImages();
    }, []);

    // Animation Loop
    useEffect(() => {
        if (!isLoaded || images.length === 0 || frameIndex >= images.length - 1) return;

        // Total Duration goal: ~3.8s
        // 120 frames / 3.8s ≈ 31 fps => ~32ms interval
        const interval = setInterval(() => {
            setFrameIndex(prev => {
                if (prev >= images.length - 1) {
                    clearInterval(interval);
                    return images.length - 1;
                }
                return prev + 1;
            });
        }, 32);

        return () => clearInterval(interval);
    }, [isLoaded, frameIndex, images.length]);

    const renderFrame = useCallback((index: number) => {
        const canvas = canvasRef.current;
        const context = canvas?.getContext('2d');
        const img = images[index];

        if (!canvas || !context || !img) return;

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        // Object-fit: cover logic
        const scale = Math.max(canvas.width / img.width, canvas.height / img.height);
        const x = (canvas.width / 2) - (img.width / 2) * scale;
        const y = (canvas.height / 2) - (img.height / 2) * scale;

        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(img, x, y, img.width * scale, img.height * scale);
    }, [images]);

    // Render loop
    useEffect(() => {
        if (isLoaded) {
            requestAnimationFrame(() => renderFrame(frameIndex));
        }
    }, [frameIndex, isLoaded, renderFrame]);

    // Handle resize
    useEffect(() => {
        const handleResize = () => {
            if (isLoaded) {
                renderFrame(frameIndex);
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [isLoaded, frameIndex, renderFrame]);

    // Restart when scrolling back to top (viewport re-entry)
    const onViewportEnter = () => {
        setFrameIndex(0);
    };

    return (
        <div ref={containerRef} className="h-screen relative bg-[#121212]">
            <motion.div
                className="sticky top-0 h-screen w-full overflow-hidden"
                onViewportEnter={onViewportEnter}
            >
                <canvas ref={canvasRef} className="block w-full h-full object-cover" />

                <Overlay />

                {!isLoaded && (
                    <div className="absolute inset-0 flex items-center justify-center text-white/30 text-lg md:text-xl font-light tracking-[0.3em] uppercase animate-pulse">
                        World is LOADING
                    </div>
                )}

                {/* Seamless Fade into Next Section */}
                <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#0a0a0a] to-transparent pointer-events-none z-20" />
            </motion.div>
        </div>
    );
}
