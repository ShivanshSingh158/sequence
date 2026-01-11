'use client';

import { motion, useScroll, useSpring } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function ScrollProgressRing() {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 100) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
                opacity: isVisible ? 1 : 0,
                scale: isVisible ? 1 : 0.8
            }}
            className="fixed bottom-8 right-8 z-50 pointer-events-none"
        >
            <svg width="60" height="60" viewBox="0 0 100 100" className="transform -rotate-90">
                {/* Background Circle */}
                <circle
                    cx="50"
                    cy="50"
                    r="30"
                    pathLength="1"
                    className="stroke-white/10 fill-black/80 backdrop-blur-sm"
                    strokeWidth="4"
                />
                {/* Progress Circle */}
                <motion.circle
                    cx="50"
                    cy="50"
                    r="30"
                    pathLength="1"
                    className="stroke-purple-500 fill-none drop-shadow-[0_0_8px_rgba(168,85,247,0.5)]"
                    strokeWidth="4"
                    style={{ pathLength: scaleX }}
                />
                {/* Percentage Text or Icon */}
                <text
                    x="50"
                    y="50"
                    textAnchor="middle"
                    dy=".3em"
                    className="fill-white text-[10px] font-mono"
                >
                    ▼
                </text>
            </svg>
        </motion.div>
    );
}
