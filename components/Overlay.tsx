'use client';

import { motion, useTransform } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useLoading } from '@/context/LoadingContext';

export default function Overlay({ progress }: { progress: any, forceFinalState?: boolean }) {
    const { isLoading } = useLoading();

    // Text 1: "I build digital experiences" (0% - 30%)
    // Text 1: "I build digital experiences" (0% - 30%)
    // START VISIBLE: Opacity starts at 1, stays 1 until 0.25, then fades out
    const opacity1 = useTransform(progress, [0, 0.25, 0.3], [1, 1, 0]);
    const y1 = useTransform(progress, [0, 0.3], [0, -20]); // Optional: Parallax up
    const filter1 = useTransform(progress, [0, 0.05, 0.25, 0.3], ['blur(0px)', 'blur(0px)', 'blur(0px)', 'blur(10px)']);
    const scale1 = useTransform(progress, [0, 0.3], [1, 1.1]); // Subtle grow

    // Text 2: "A bridge between..." (35% - 65%)
    const opacity2 = useTransform(progress, [0.35, 0.4, 0.6, 0.65], [0, 1, 1, 0]);
    const scale2 = useTransform(progress, [0.35, 0.65], [0.9, 1.05]);
    const filter2 = useTransform(progress, [0.35, 0.4, 0.6, 0.65], ['blur(10px)', 'blur(0px)', 'blur(0px)', 'blur(10px)']);

    // Text 3: "ShivansH!!" (70% - 100%)
    const opacity3 = useTransform(progress, [0.7, 0.8, 1], [0, 1, 1]);
    const y3 = useTransform(progress, [0.7, 1], [30, 0]);
    const filter3 = useTransform(progress, [0.7, 0.8], ['blur(10px)', 'blur(0px)']);

    if (isLoading) return null;

    return (
        <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">

            {/* Text 1: Crafting */}
            <motion.div
                style={{ opacity: opacity1, y: y1, filter: filter1, scale: scale1 }}
                className="absolute inset-0 flex items-center justify-start p-12 md:p-32"
            >
                <h2 className="text-5xl md:text-8xl font-bold text-white leading-tight max-w-5xl tracking-tighter">
                    I build digital <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">experiences.</span>
                </h2>
            </motion.div>

            {/* Text 2: Bridge */}
            <motion.div
                style={{ opacity: opacity2, scale: scale2, filter: filter2 }}
                className="absolute inset-0 flex items-center justify-end p-12 md:p-32 text-right"
            >
                <h2 className="text-4xl md:text-7xl font-light text-white mix-blend-difference leading-tight max-w-3xl">
                    A bridge between <br />
                    <span className="font-bold">Design</span> & <span className="font-bold">Engineering.</span>
                </h2>
            </motion.div>

            {/* Text 3: Identity */}
            <motion.div
                style={{ opacity: opacity3, y: y3, filter: filter3 }}
                className="absolute inset-0 flex flex-col items-center justify-center text-center"
            >
                <h1 className="text-6xl md:text-9xl font-bold tracking-tighter text-white mix-blend-difference drop-shadow-2xl">
                    ShivansH!!
                </h1>
                <p className="mt-6 text-xl md:text-2xl font-light text-gray-300 tracking-[0.3em] uppercase mix-blend-difference">
                    Web Developer
                </p>
            </motion.div>

            {/* Floating 'Connect to Me' Bar - Always visible */}
            <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
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

            {/* Status Indicator - Top Left */}
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
        </div>
    );
}
