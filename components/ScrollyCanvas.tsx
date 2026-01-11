'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import Overlay from './Overlay';

export default function ScrollyCanvas() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    // Animation State
    const frameIndexRef = useRef(0);
    const requestRef = useRef<number>(0);
    const lastTimeRef = useRef<number>(0);
    const fpsInterval = 1000 / 30; // Target 30fps for cinematic feel (or 60 for smooth)

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
                        // console.error(`Failed to load: ${src}`); // Suppress noise
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
            }
        };

        loadImages();
    }, []);

    // Setup Canvas Resolution (High DPI)
    const setupCanvas = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const dpr = window.devicePixelRatio || 1;
        const rect = canvas.getBoundingClientRect();

        // Set actual size in memory (scaled to account for extra pixel density)
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;

        const ctx = canvas.getContext('2d');
        if (ctx) {
            // Normalize coordinate system to use css pixels
            ctx.scale(dpr, dpr);
            ctx.imageSmoothingEnabled = true;
            ctx.imageSmoothingQuality = 'high';
        }
    }, []);

    // Draw Frame
    const renderFrame = useCallback((index: number) => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
        const img = images[index];

        if (!canvas || !ctx || !img) return;

        // Note: canvas.width/height are now physically scaled by DPR
        // But since we used ctx.scale(dpr, dpr), we draw using logical CSS pixels
        // However, we need to know the logical size again
        const width = canvas.width / (window.devicePixelRatio || 1);
        const height = canvas.height / (window.devicePixelRatio || 1);

        // Object-fit: Cover Logic
        const scale = Math.max(width / img.width, height / img.height);
        const x = (width / 2) - (img.width / 2) * scale;
        const y = (height / 2) - (img.height / 2) * scale;

        ctx.clearRect(0, 0, width, height);
        ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
    }, [images]);

    // Animation Loop
    const animate = useCallback((time: number) => {
        if (!lastTimeRef.current) lastTimeRef.current = time;
        const delta = time - lastTimeRef.current;

        if (delta > fpsInterval) {
            // Update frame
            if (frameIndexRef.current < images.length - 1) {
                frameIndexRef.current += 1;
                renderFrame(frameIndexRef.current);
            }
            lastTimeRef.current = time - (delta % fpsInterval);
        }

        requestRef.current = requestAnimationFrame(animate);
    }, [images.length, fpsInterval, renderFrame]);

    // Init & Events
    useEffect(() => {
        if (!isLoaded || images.length === 0) return;

        setupCanvas();
        window.addEventListener('resize', setupCanvas);

        // Start Animation
        lastTimeRef.current = performance.now();
        requestRef.current = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener('resize', setupCanvas);
            cancelAnimationFrame(requestRef.current);
        };
    }, [isLoaded, images, setupCanvas, animate]);

    // Handle Scroll Reset / Replay
    const onViewportEnter = () => {
        frameIndexRef.current = 0;
        lastTimeRef.current = performance.now();
    };

    return (
        <div ref={containerRef} className="h-screen relative bg-[#121212]">
            {/* Sticky container for smooth pinning */}
            <motion.div
                className="sticky top-0 h-screen w-full overflow-hidden"
                onViewportEnter={onViewportEnter}
            >
                <canvas
                    ref={canvasRef}
                    className="block w-full h-full object-cover"
                    style={{ width: '100%', height: '100%' }} // Ensure CSS size is explicit
                />

                <Overlay />

                {!isLoaded && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black z-50">
                        <div className="text-white/30 text-lg md:text-xl font-light tracking-[0.3em] uppercase animate-pulse">
                            Decreasing Entropy
                        </div>
                    </div>
                )}

                {/* Seamless Fade into Next Section */}
                <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#0a0a0a] to-transparent pointer-events-none z-20" />
            </motion.div>
        </div>
    );
}
