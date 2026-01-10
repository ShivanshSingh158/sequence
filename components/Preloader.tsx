'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLoading } from '@/context/LoadingContext';

export default function Preloader() {
    // Local visual state for the curtain itself (it needs to exit)
    const [isLocalLoading, setIsLocalLoading] = useState(true);
    const [counter, setCounter] = useState(0);
    const { setIsLoading } = useLoading();

    useEffect(() => {
        // We simulate a loading duration for the "experience"
        const timer = setInterval(() => {
            setCounter((prev) => {
                const next = prev + 1;
                if (next >= 100) {
                    clearInterval(timer);
                    setTimeout(() => {
                        setIsLocalLoading(false);
                        // We delay the global "start" slightly to match the curtain lift
                    }, 500);
                    return 100;
                }
                return next;
            });
        }, 10); // 100 steps * 10ms = 1 second total

        return () => clearInterval(timer);
    }, []);

    // Effect to trigger global start ONLY when the curtain exit animation is starting/done
    useEffect(() => {
        if (!isLocalLoading) {
            // Wait for the exit animation (0.8s) to be partially done before starting text
            // e.g., 0.6s delay
            const timer = setTimeout(() => {
                setIsLoading(false);
            }, 600);
            return () => clearTimeout(timer);
        }
    }, [isLocalLoading, setIsLoading]);

    return (
        <AnimatePresence mode="wait">
            {isLocalLoading && (
                <motion.div
                    className="fixed inset-0 z-[10000] bg-black flex items-center justify-center flex-col"
                    initial={{ y: 0 }}
                    exit={{ y: "-100%", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
                >
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="text-center"
                    >
                        {/* Large Counter */}
                        <div className="relative mb-2 overflow-hidden">
                            <motion.h1
                                className="text-9xl font-bold text-white tracking-tighter"
                                initial={{ y: 50 }}
                                animate={{ y: 0 }}
                            >
                                {counter}%
                            </motion.h1>
                        </div>

                        {/* Loading Text */}
                        <motion.p
                            className="text-white/40 font-mono text-sm uppercase tracking-[0.5em]"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                        >
                            Loading Experience
                        </motion.p>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
