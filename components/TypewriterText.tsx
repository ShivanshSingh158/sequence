'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

interface TypewriterTextProps {
    text: string;
    className?: string;
    cursorColor?: string;
    speed?: number;
    delay?: number;
}

export default function TypewriterText({
    text,
    className = "",
    cursorColor = "#22c55e",
    speed = 0.05,
    delay = 0
}: TypewriterTextProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
    const [displayedText, setDisplayedText] = useState("");

    useEffect(() => {
        if (isInView) {
            let currentIndex = 0;
            const timeout = setTimeout(() => {
                const interval = setInterval(() => {
                    if (currentIndex < text.length) {
                        setDisplayedText(prev => prev + text[currentIndex]);
                        currentIndex++;
                    } else {
                        clearInterval(interval);
                    }
                }, speed * 1000);

                return () => clearInterval(interval);
            }, delay * 1000);

            return () => clearTimeout(timeout);
        }
    }, [isInView, text, speed, delay]);

    return (
        <span ref={ref} className={`${className} inline-block`}>
            {displayedText}
            <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                style={{ color: cursorColor }}
                className="inline-block ml-1 w-[3px] h-[1em] bg-current align-middle"
            />
        </span>
    );
}
