'use client';

import { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

export default function MagneticCursor() {
    const [isHovering, setIsHovering] = useState(false);
    const [isMobile, setIsMobile] = useState(true);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 20, stiffness: 400, mass: 0.5 };
    const cursorX = useSpring(mouseX, springConfig);
    const cursorY = useSpring(mouseY, springConfig);

    useEffect(() => {
        const checkMobile = () => {
            const isTouch = window.matchMedia('(pointer: coarse)').matches;
            setIsMobile(isTouch);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);

        const moveCursor = (e: MouseEvent) => {
            mouseX.set(e.clientX - 16);
            mouseY.set(e.clientY - 16);
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const isClickable = target.matches('a, button, input, .cursor-pointer') || target.closest('a, button, .cursor-pointer');
            setIsHovering(!!isClickable);
        };

        if (!isMobile) {
            window.addEventListener('mousemove', moveCursor);
            window.addEventListener('mouseover', handleMouseOver);
        }

        return () => {
            window.removeEventListener('resize', checkMobile);
            window.removeEventListener('mousemove', moveCursor);
            window.removeEventListener('mouseover', handleMouseOver);
        };
    }, [mouseX, mouseY, isMobile]);

    if (isMobile) return null;

    return (
        <>
            <style jsx global>{`
                @media (pointer: fine) {
                    body {
                        cursor: none;
                    }
                    /* We override defaults but keep the custom cursor visible */
                    a, button, .cursor-pointer, input, label {
                        cursor: none !important;
                    }
                }
            `}</style>

            {/* Main Ring */}
            <motion.div
                style={{
                    x: cursorX,
                    y: cursorY,
                }}
                className={`fixed top-0 left-0 w-8 h-8 pointer-events-none z-[11000] rounded-full border transition-all duration-200 ease-out will-change-transform
                    ${isHovering
                        ? 'border-white bg-white/10 scale-150' // Subtle expansion, distinct border
                        : 'border-white/50 bg-transparent scale-100'}
                `}
            />

            {/* Center Dot - ALWAYS VISIBLE now */}
            <motion.div
                style={{
                    x: cursorX,
                    y: cursorY,
                }}
                className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-[11000] flex items-center justify-center will-change-transform"
            >
                <div
                    className={`rounded-full bg-white transition-all duration-200
                        ${isHovering ? 'w-2 h-2' : 'w-1.5 h-1.5'} 
                    `}
                />
            </motion.div>
        </>
    );
}
