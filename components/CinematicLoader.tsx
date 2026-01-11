'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function CinematicLoader() {
    const [count, setCount] = useState(0);
    const [isComplete, setIsComplete] = useState(false);
    const [show, setShow] = useState(true);

    useEffect(() => {
        // Check session storage to only show once per session
        const hasLoaded = sessionStorage.getItem('hasLoaded');
        if (hasLoaded) {
            setShow(false);
            return;
        }

        // Fast count up (2 seconds total)
        const duration = 2000;
        const intervalTime = 20;
        const steps = duration / intervalTime;
        const increment = 100 / steps;

        const timer = setInterval(() => {
            setCount(prev => {
                const next = prev + increment;
                if (next >= 100) {
                    clearInterval(timer);
                    setTimeout(() => setIsComplete(true), 200); // Short pause at 100
                    return 100;
                }
                return next;
            });
        }, intervalTime);

        return () => clearInterval(timer);
    }, []);

    // Handle exit
    const handleAnimationComplete = () => {
        sessionStorage.setItem('hasLoaded', 'true');
        setTimeout(() => setShow(false), 800); // Remove from DOM after exit anim
    };

    if (!show) return null;

    return (
        <AnimatePresence onExitComplete={() => setShow(false)}>
            {!isComplete && (
                <div className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center">

                    {/* Big Counter */}
                    <div className="relative">
                        <motion.h1
                            className="text-[12rem] md:text-[18rem] font-bold text-white leading-none tracking-tighter mix-blend-difference"
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            {Math.floor(count)}%
                        </motion.h1>

                        {/* Loading Bar (Thin line) */}
                        <motion.div
                            className="w-full h-1 bg-white/20 mt-8 rounded-full overflow-hidden"
                            initial={{ width: 0 }}
                            animate={{ width: "100%" }}
                        >
                            <motion.div
                                className="h-full bg-white"
                                style={{ width: `${count}%` }}
                            />
                        </motion.div>

                        <motion.p
                            className="text-white/40 font-mono text-sm tracking-[0.5em] uppercase text-center mt-4"
                            animate={{ opacity: [0.4, 1, 0.4] }}
                            transition={{ repeat: Infinity, duration: 0.5 }}
                        >
                            INITIALIZING EXPERIENCE
                        </motion.p>
                    </div>
                </div>
            )}

            {/* Shutter Reveal Animation */}
            {isComplete && (
                <>
                    <motion.div
                        className="fixed top-0 left-0 w-full h-[50vh] bg-black z-[9999]"
                        initial={{ y: 0 }}
                        animate={{ y: "-100%" }}
                        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                        onAnimationComplete={handleAnimationComplete}
                    />
                    <motion.div
                        className="fixed bottom-0 left-0 w-full h-[50vh] bg-black z-[9999]"
                        initial={{ y: 0 }}
                        animate={{ y: "100%" }}
                        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                    />
                </>
            )}
        </AnimatePresence>
    );
}
