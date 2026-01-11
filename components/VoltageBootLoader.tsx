'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLoading } from '@/context/LoadingContext';

const logs = [
    "> INITIALIZING GRID...",
    "> BYPASSING RELAYS...",
    "> SYNCING 50HZ PHASE...",
    "> VOLTAGE STABLE.",
    "> SYSTEM ONLINE."
];

export default function VoltageBootLoader() {
    const [counter, setCounter] = useState(0);
    const [logIndex, setLogIndex] = useState(0);
    const [isComplete, setIsComplete] = useState(false);
    const { setIsLoading } = useLoading();
    const [hasPlayed, setHasPlayed] = useState(true); // Default to true to prevent flash on hydration

    useEffect(() => {
        // Check session storage to only play once per session
        const sessionPlayed = sessionStorage.getItem('voltage_boot_played');

        if (!sessionPlayed) {
            setHasPlayed(false);
            sessionStorage.setItem('voltage_boot_played', 'true');

            // Start Sequence
            const totalDuration = 2000; // 2 seconds fast boot
            const intervalTime = 20;
            const steps = totalDuration / intervalTime;
            const increment = 100 / steps;

            const timer = setInterval(() => {
                setCounter(prev => {
                    const next = prev + increment;
                    if (next >= 100) {
                        clearInterval(timer);
                        setIsComplete(true);
                        setTimeout(() => setIsLoading(false), 200); // Unlock scroll shortly after
                        return 100;
                    }
                    return next;
                });
            }, intervalTime);

            // Log sequencer
            const logInterval = setInterval(() => {
                setLogIndex(prev => Math.min(prev + 1, logs.length - 1));
            }, totalDuration / 5);

            return () => {
                clearInterval(timer);
                clearInterval(logInterval);
            };
        } else {
            // If already played, immediately unlock
            setIsLoading(false);
        }
    }, [setIsLoading]);

    if (hasPlayed) return null;

    return (
        <AnimatePresence>
            {!isComplete && (
                <motion.div
                    className="fixed inset-0 z-[9999] bg-[#050505] flex flex-col items-center justify-center font-mono overflow-hidden"
                    exit={{
                        opacity: 0,
                        scale: 1.1,
                        filter: "brightness(2)", // Flash effect
                        transition: { duration: 0.5, ease: "easeInOut" }
                    }}
                >
                    {/* Voltage Line Decoration */}
                    <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-green-500/50 to-transparent" />
                    <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-green-500/50 to-transparent" />

                    {/* Central Percentage */}
                    <div className="relative">
                        <motion.h1
                            className="text-[120px] md:text-[180px] font-bold text-white leading-none tracking-tighter mix-blend-difference"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                        >
                            {Math.floor(counter)}%
                        </motion.h1>

                        {/* Glitch Overlay */}
                        <div className="absolute inset-0 bg-white/5 animate-pulse mix-blend-overlay" />
                    </div>

                    {/* Terminal Output */}
                    <div className="absolute bottom-12 left-6 md:left-12 text-green-500/80 text-xs md:text-sm font-mono flex flex-col gap-1 items-start">
                        {logs.slice(0, logIndex + 1).map((log, i) => (
                            <motion.span
                                key={i}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                            >
                                {log}
                            </motion.span>
                        ))}
                    </div>

                    {/* Progress Bar */}
                    <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white/10 -z-10">
                        <motion.div
                            className="h-full bg-green-500 shadow-[0_0_20px_rgba(34,197,94,0.5)]"
                            style={{ width: `${counter}%` }}
                        />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
