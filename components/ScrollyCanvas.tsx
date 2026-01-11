'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, useInView } from 'framer-motion';
import Overlay from './Overlay';

// Global flag to track if animation has played in this session
let hasPlayedSession = false;

export default function ScrollyCanvas() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    // Scroll Logic


    // Load images
    useEffect(() => {
        const loadImages = async () => {
            const imageCount = 120; // Ensure this matches your sequence length
            const promises: Promise<HTMLImageElement | null>[] = [];

            for (let i = 0; i < imageCount; i++) {
                const indexStr = i.toString().padStart(3, '0');
                const src = `/sequence/${indexStr}.webp`;

                const promise = new Promise<HTMLImageElement | null>((resolve) => {
                    const img = new Image();
                    img.src = src;
                    img.onload = () => resolve(img);
                    img.onerror = () => {
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

    // Animation State
    const frameIndexRef = useRef(0);
    const requestRef = useRef<number>(0);
    const lastTimeRef = useRef<number>(0);
    // Target duration: ~4.5s for 120 frames (120 / 4.5 ≈ 26.66 FPS)
    const fpsInterval = 1000 / 26.5;

    // Draw Frame
    const renderFrame = useCallback((index: number) => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
        const img = images[index];

        if (!canvas || !ctx || !img) return;

        const width = canvas.width / (window.devicePixelRatio || 1);
        const height = canvas.height / (window.devicePixelRatio || 1);

        const scale = Math.max(width / img.width, height / img.height);
        const x = (width / 2) - (img.width / 2) * scale;
        const y = (height / 2) - (img.height / 2) * scale;

        ctx.clearRect(0, 0, width, height);
        ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
    }, [images]);

    // Time-based Animation Loop
    const animate = useCallback((time: number) => {
        if (!lastTimeRef.current) lastTimeRef.current = time;
        const delta = time - lastTimeRef.current;

        if (delta > fpsInterval) {
            if (frameIndexRef.current < images.length - 1) {
                frameIndexRef.current += 1;
                renderFrame(frameIndexRef.current);
            } else {
                // Animation Finished
                hasPlayedSession = true;
            }
            lastTimeRef.current = time - (delta % fpsInterval);
        }

        if (frameIndexRef.current < images.length - 1) {
            requestRef.current = requestAnimationFrame(animate);
        }
    }, [images.length, fpsInterval, renderFrame]);

    // Viewport Detection
    const isInView = useInView(containerRef, { amount: 0.1 }); // Trigger when 10% visible
    const hasStartedRef = useRef(false);

    // Start Animation & Handle Replay on Viewport Entry
    useEffect(() => {
        if (!isLoaded || images.length === 0) return;

        setupCanvas();

        const handleResize = () => {
            setupCanvas();
            renderFrame(frameIndexRef.current);
        };
        window.addEventListener('resize', handleResize);

        // Logic: If in view and animation finished (or stopped), restart it
        // We only restart if we are NOT currently animating (or if we want to force restart)
        // User wants "autoplay from starting properly" when "scrolling up again".

        if (isInView) {
            // Cancel any existing loop to be safe
            if (requestRef.current) cancelAnimationFrame(requestRef.current);

            // Reset to 0
            frameIndexRef.current = 0;
            lastTimeRef.current = performance.now();

            // Start Loop
            requestRef.current = requestAnimationFrame(animate);
        } else {
            // Optional: specific logic when leaving view?
            // For now, let it run to completion or stop.
        }

        return () => {
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(requestRef.current);
        };
    }, [isLoaded, images, setupCanvas, animate, renderFrame, isInView]);

    return (
        <div ref={containerRef} className="h-screen relative bg-[#121212]">
            {/* Standard full-screen container */}
            <motion.div
                className="h-full w-full overflow-hidden"
            >
                <canvas
                    ref={canvasRef}
                    className="block w-full h-full object-cover"
                    style={{ width: '100%', height: '100%' }}
                />

                <Overlay forceFinalState={hasPlayedSession} />

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
