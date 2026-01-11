'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
import { useLoading } from '@/context/LoadingContext';

export default function GlitchLoader() {
    const { setIsLoading } = useLoading();
    const [progress, setProgress] = useState(0);
    const [show, setShow] = useState(true);
    const [decodedText, setDecodedText] = useState("LOADING");
    const canvasRef = useRef<HTMLCanvasElement>(null);

    // Initial check and Timer Logic
    useEffect(() => {
        // CLEAN URL: Remove hashes like #ecosystem on load
        if (typeof window !== 'undefined' && window.location.hash) {
            window.history.replaceState(null, '', window.location.pathname);
        }

        // Change key if you want to force reload for user, e.g. 'loaded_v4'
        const hasLoaded = sessionStorage.getItem('loaded_v4');
        if (hasLoaded) {
            setShow(false);
            setIsLoading(false); // Immediate unlock
            return;
        }

        const duration = 2000;
        const interval = 20;
        const steps = duration / interval;
        const inc = 100 / steps;

        const timer = setInterval(() => {
            setProgress(prev => {
                const next = prev + inc;
                if (next >= 100) {
                    clearInterval(timer);
                    setTimeout(() => {
                        setShow(false);
                        setIsLoading(false); // Global unlock
                    }, 500);
                    return 100;
                }
                return next;
            });
        }, interval);

        // Text Decoding
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        const scrambleTimer = setInterval(() => {
            setDecodedText(prev =>
                prev.split('').map(() => {
                    return chars[Math.floor(Math.random() * chars.length)];
                }).join('')
            );
        }, 50);

        return () => {
            clearInterval(timer);
            clearInterval(scrambleTimer);
        };
    }, []);

    // Matrix Rain Animation
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = window.innerWidth;
        let height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;

        const resize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
        };
        window.addEventListener('resize', resize);

        // Configuration
        const text = "ShivansH!!";
        const fontSize = 14;
        const columns = width / fontSize;
        const drops: number[] = [];

        // Initialize drops at random y positions to simulate "already raining"
        for (let i = 0; i < columns; i++) {
            drops[i] = Math.random() * -100; // Start above screen
        }

        const animate = () => {
            // Semi-transparent fade to create trails
            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
            ctx.fillRect(0, 0, width, height);

            ctx.fillStyle = '#0F0'; // Green text (Matrix style) or maybe Cyan for brand?
            // Let's go with a premium Cyan/White fading
            ctx.font = `${fontSize}px monospace`;

            for (let i = 0; i < drops.length; i++) {
                // Randomly pick a character from the name
                const char = text[Math.floor(Math.random() * text.length)];

                // Color variation
                const isHead = Math.random() > 0.95;
                ctx.fillStyle = isHead ? '#fff' : 'rgba(34, 211, 238, 0.3)'; // White head, Cyan trail

                // x = column index * font size, y = value in drops array * font size
                ctx.fillText(char, i * fontSize, drops[i] * fontSize);

                // Reset drop to top randomly after it crosses screen
                if (drops[i] * fontSize > height && Math.random() > 0.975) {
                    drops[i] = 0;
                }

                // Increment y
                drops[i]++;
            }
            requestAnimationFrame(animate);
        };

        const animId = requestAnimationFrame(animate);

        return () => {
            cancelAnimationFrame(animId);
            window.removeEventListener('resize', resize);
        };
    }, []);

    const onExit = () => {
        sessionStorage.setItem('loaded_v4', 'true');
    }

    if (!show) return null;

    return (
        <AnimatePresence onExitComplete={onExit}>
            {show && (
                <motion.div
                    className="fixed inset-0 z-[10000] bg-black flex flex-col items-center justify-center overflow-hidden"
                    exit={{
                        opacity: 0,
                        filter: "blur(20px)",
                        transition: { duration: 0.8 }
                    }}
                >
                    {/* Matrix Rain Canvas */}
                    <canvas
                        ref={canvasRef}
                        className="absolute inset-0 w-full h-full opacity-40"
                    />

                    {/* Radial Vignette to focus center */}
                    <div className="absolute inset-0 bg-radial-gradient from-transparent via-black/80 to-black pointer-events-none" />

                    <div className="relative z-10 flex flex-col items-center">
                        <motion.h1
                            className="text-8xl md:text-9xl font-black text-white tracking-widest mb-4 font-mono mix-blend-difference"
                        >
                            {Math.floor(progress).toString().padStart(2, '0')}%
                        </motion.h1>

                        {/* Glitchy Text */}
                        <div className="h-8 overflow-hidden">
                            <p className="text-cyan-400 font-mono text-sm tracking-[0.5em]">
                                {progress < 99 ? decodedText.substring(0, 10) : "SYSTEM READY"}
                            </p>
                        </div>

                        {/* Progress Line */}
                        <div className="w-64 h-px bg-white/20 mt-8 relative overflow-hidden">
                            <motion.div
                                className="absolute left-0 top-0 h-full bg-cyan-400 box-shadow-[0_0_10px_cyan]"
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
