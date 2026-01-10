'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useLoading } from '@/context/LoadingContext';

export default function Overlay() {
    const { isLoading } = useLoading();
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        // Only start the sequence when loading is DONE
        if (isLoading) return;

        // Sequence Timings based on 3.8s video duration (120 frames * 32ms)

        // 0s: Start with Section 0 ("Crafting...")
        // NOTE: We could set activeIndex(0) here if we wanted to be sure, but state starts at 0.

        // 1.8s: Switch to Section 1 ("Bridge...") (Faster pace)
        const timer1 = setTimeout(() => {
            setActiveIndex(1);
        }, 1800);

        // 4.2s: Switch to Section 2 ("ShivansH!!" - Final)
        const timer2 = setTimeout(() => {
            setActiveIndex(2);
        }, 4200);

        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
        };
    }, [isLoading]);

    return (
        <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
            <AnimatePresence mode="wait">

                {/* Don't show anything (except maybe static placeholder) until loading is done? 
                    Actually, we assume ScrollyCanvas fade-in handles visibility, 
                    but here we prevent the Text Animation logic from racing ahead. 
                */}

                {/* 0s - 1.9s: Crafting (Left Aligned) */}
                {!isLoading && activeIndex === 0 && (
                    <motion.div
                        key="section1"
                        initial={{ opacity: 0, x: -50, filter: 'blur(10px)' }}
                        animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                        exit={{ opacity: 0, x: 50, filter: 'blur(10px)' }}
                        transition={{ duration: 1, ease: "easeInOut" }}
                        className="absolute inset-0 flex items-center justify-start p-12 md:p-32"
                    >
                        <h2 className="text-5xl md:text-8xl font-bold text-white leading-tight max-w-5xl tracking-tighter">
                            I build digital <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">experiences.</span>
                        </h2>
                    </motion.div>
                )}

                {/* 1.9s - 3.8s: Bridge (Right Aligned) */}
                {!isLoading && activeIndex === 1 && (
                    <motion.div
                        key="section2"
                        initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
                        animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                        exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
                        transition={{ duration: 1, ease: "easeInOut" }}
                        className="absolute inset-0 flex items-center justify-end p-12 md:p-32 text-right"
                    >
                        <h2 className="text-4xl md:text-7xl font-light text-white mix-blend-difference leading-tight max-w-3xl">
                            A bridge between <br />
                            <span className="font-bold">Design</span> & <span className="font-bold">Engineering.</span>
                        </h2>
                    </motion.div>
                )}

                {/* 3.8s+ : ShivansH!! (Center - Final State) */}
                {!isLoading && activeIndex === 2 && (
                    <motion.div
                        key="section3"
                        initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
                        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                        exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
                        transition={{ duration: 1.2, ease: "easeInOut" }}
                        className="absolute inset-0 flex flex-col items-center justify-center text-center"
                    >
                        <h1 className="text-6xl md:text-9xl font-bold tracking-tighter text-white mix-blend-difference drop-shadow-2xl">
                            ShivansH!!
                        </h1>
                        <p className="mt-6 text-xl md:text-2xl font-light text-gray-300 tracking-[0.3em] uppercase mix-blend-difference">
                            Web Developer
                        </p>
                    </motion.div>
                )}

            </AnimatePresence>

            {/* Floating 'Connect to Me' Bar - Always visible */}
            {!isLoading && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    transition={{ delay: 0.5, duration: 0.8, type: "spring", bounce: 0.4 }}
                    className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 pointer-events-auto"
                >
                    <div className="group flex items-center gap-3 px-6 py-3 bg-white/10 backdrop-blur-md border border-white/10 rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.2)]">
                        <span className="text-white font-medium tracking-wide text-sm">Scroll Down</span>
                        <div className="w-6 h-6 rounded-full bg-white text-black flex items-center justify-center animate-bounce">
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="12" y1="5" x2="12" y2="19"></line>
                                <polyline points="19 12 12 19 5 12"></polyline>
                            </svg>
                        </div>
                    </div>
                </motion.div>
            )}

            {/* Status Indicator - Top Left */}
            {!isLoading && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1, duration: 1 }}
                    className="fixed top-8 left-8 z-50 flex items-center gap-3 pointer-events-auto"
                >
                    <div className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-white/90 text-xs font-medium tracking-wide">Available for Freelance</span>
                        <span className="text-white/40 text-[10px] uppercase tracking-wider">Based in India</span>
                    </div>
                </motion.div>
            )}
        </div>
    );
}
