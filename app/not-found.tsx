'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function NotFound() {
    const [glitch, setGlitch] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setGlitch(true);
            setTimeout(() => setGlitch(false), 100);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="min-h-screen bg-black flex items-center justify-center px-6 relative overflow-hidden">
            {/* Animated grid background */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                    backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
                    backgroundSize: '50px 50px'
                }} />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center z-10"
            >
                {/* 404 with glitch effect */}
                <motion.h1
                    className={`text-9xl md:text-[200px] font-bold text-white mb-8 ${glitch ? 'animate-pulse' : ''}`}
                    style={{
                        textShadow: glitch
                            ? '5px 0 #ff00de, -5px 0 #00ffff'
                            : 'none'
                    }}
                >
                    404
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-2xl md:text-4xl text-white/60 mb-4 font-light"
                >
                    Page Not Found
                </motion.p>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-white/40 mb-12 max-w-md mx-auto"
                >
                    The page you&apos;re looking for doesn&apos;t exist or has been moved.
                </motion.p>

                <Link href="/">
                    <motion.button
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-white/90 transition-colors"
                    >
                        Back to Home
                    </motion.button>
                </Link>
            </motion.div>
        </div>
    );
}
