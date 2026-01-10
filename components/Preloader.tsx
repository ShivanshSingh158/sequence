'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Preloader() {
    const [isLoading, setIsLoading] = useState(true);
    const [counter, setCounter] = useState(0);

    useEffect(() => {
        // We simulate a loading duration for the "experience"
        // In a real heavy app, this could be tied to asset loading progress
        const timer = setInterval(() => {
            setCounter((prev) => {
                const next = prev + 1;
                if (next >= 100) {
                    clearInterval(timer);
                    setTimeout(() => setIsLoading(false), 500); // Small pause at 100%
                    return 100;
                }
                return next;
            });
        }, 20); // ~2 seconds total load time (100 * 20ms)

        return () => clearInterval(timer);
    }, []);

    return (
        <AnimatePresence mode="wait">
            {isLoading && (
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
