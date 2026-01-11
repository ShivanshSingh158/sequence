'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?";

export default function GlitchLoader() {
    const [progress, setProgress] = useState(0);
    const [show, setShow] = useState(true);
    const [decodedText, setDecodedText] = useState("LOADING");

    useEffect(() => {
        // Change key to force a new load for the user
        const hasLoaded = sessionStorage.getItem('loaded_v3');
        if (hasLoaded) {
            setShow(false);
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
                    setTimeout(() => setShow(false), 500);
                    return 100;
                }
                return next;
            });
        }, interval);

        // Decoding Effect
        const scrambleTimer = setInterval(() => {
            setDecodedText(prev =>
                prev.split('').map((char, index) => {
                    if (Math.random() > 0.5) {
                        return CHARS[Math.floor(Math.random() * CHARS.length)];
                    }
                    // Specific goal text "SYSTEM READY" or keep random?
                    // Let's just keep it random chaos until the end
                    return CHARS[Math.floor(Math.random() * CHARS.length)];
                }).join('')
            );
        }, 50);

        return () => {
            clearInterval(timer);
            clearInterval(scrambleTimer);
        };
    }, []);

    const onExit = () => {
        sessionStorage.setItem('loaded_v3', 'true');
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
                    {/* Progress Bar background connection */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-10">
                        <div className="w-[200vw] h-[200vw] rounded-full border-[100px] border-white animate-spin-slow" />
                    </div>

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

                        {/* Thin line */}
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
