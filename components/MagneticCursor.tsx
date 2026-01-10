'use client';

import { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

export default function MagneticCursor() {
    const [isHovering, setIsHovering] = useState(false);

    // Smooth mouse coordinates
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Optimized Spring Physics
    // Damping: Higher = less oscillation (smoother stop)
    // Stiffness: Higher = faster response
    // Mass: Lower = lighter feel
    const springConfig = { damping: 20, stiffness: 400, mass: 0.5 };

    const cursorX = useSpring(mouseX, springConfig);
    const cursorY = useSpring(mouseY, springConfig);

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            // Center the cursor
            mouseX.set(e.clientX - 16);
            mouseY.set(e.clientY - 16);
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            // Check if hovering over clickable elements
            const isClickable = target.matches('a, button, input, .cursor-pointer') || target.closest('a, button, .cursor-pointer');
            setIsHovering(!!isClickable);
        };

        window.addEventListener('mousemove', moveCursor);
        window.addEventListener('mouseover', handleMouseOver);

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            window.removeEventListener('mouseover', handleMouseOver);
        };
    }, [mouseX, mouseY]);

    return (
        <>
            {/* Logic to hide default cursor globally */}
            <style jsx global>{`
                body {
                    cursor: none;
                }
                a, button, .cursor-pointer, input, label {
                    cursor: none !important;
                }
            `}</style>

            {/* Main Cursor (The Ring) */}
            <motion.div
                style={{
                    x: cursorX,
                    y: cursorY,
                }}
                className={`fixed top-0 left-0 w-8 h-8 pointer-events-none z-[9999] rounded-full border transition-all duration-200 ease-out mix-blend-difference will-change-transform
                    ${isHovering
                        ? 'scale-[2.5] bg-white border-transparent opacity-80'
                        : 'scale-100 bg-transparent border-white opacity-100'}
                `}
            />

            {/* Center Dot (Always sharp) */}
            <motion.div
                style={{
                    x: cursorX,
                    y: cursorY,
                }}
                className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-[9999] flex items-center justify-center mix-blend-difference will-change-transform"
            >
                <div className={`w-1.5 h-1.5 bg-white rounded-full transition-opacity duration-200 ${isHovering ? 'opacity-0' : 'opacity-100'}`} />
            </motion.div>
        </>
    );
}
