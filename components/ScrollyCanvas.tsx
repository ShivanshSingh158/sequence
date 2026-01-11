'use client';

import { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import Overlay from './Overlay';

export default function ScrollyCanvas() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    // Scroll Logic
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // Smooth scroll progress to avoid jittery frames
    const smoothProgress = useSpring(scrollYProgress, { stiffness: 200, damping: 20, mass: 0.5 });

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

    // Scroll Loop
    useEffect(() => {
        if (!isLoaded || images.length === 0) return;

        setupCanvas();
        const handleResize = () => {
            setupCanvas();
            // Re-render current frame on resize
            const currentProg = smoothProgress.get();
            const frameIndex = Math.min(
                Math.floor(currentProg * (images.length - 1)),
                images.length - 1
            );
            renderFrame(frameIndex);
        };

        window.addEventListener('resize', handleResize);

        // Subscribe to spring changes
        const unsubscribe = smoothProgress.on("change", (latest) => {
            const frameIndex = Math.min(
                Math.floor(latest * (images.length - 1)),
                images.length - 1
            );
            requestAnimationFrame(() => renderFrame(frameIndex));
        });

        // Initial render
        renderFrame(0);

        return () => {
            window.removeEventListener('resize', handleResize);
            unsubscribe();
        };
    }, [isLoaded, images, setupCanvas, renderFrame, smoothProgress]);

    return (
        <div ref={containerRef} className="h-[400vh] relative bg-[#121212]">
            {/* Sticky container for smooth pinning */}
            <motion.div
                className="sticky top-0 h-screen w-full overflow-hidden"
            >
                <canvas
                    ref={canvasRef}
                    className="block w-full h-full object-cover"
                    style={{ width: '100%', height: '100%' }}
                />

                <Overlay scrollProgress={smoothProgress} />

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
