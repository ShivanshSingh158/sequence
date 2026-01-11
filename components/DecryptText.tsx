'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

interface DecryptTextProps {
    text: string;
    className?: string;
    speed?: number; // ms per frame
    maxIterations?: number; // how many scrambles before fixing a char
    revealDirection?: 'start' | 'end' | 'center';
    useOriginalCharsOnly?: boolean;
}

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*()_+-=[]{}|;:,.<>?/~';

export default function DecryptText({
    text,
    className = "",
    speed = 50,
    maxIterations = 10,
}: DecryptTextProps) {
    const [displayText, setDisplayText] = useState(text);
    const hasScrambledRef = useRef(false);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.5 });

    useEffect(() => {
        if (!isInView || hasScrambledRef.current) return;

        hasScrambledRef.current = true;
        let iteration = 0;

        const interval = setInterval(() => {
            setDisplayText(prev =>
                text
                    .split("")
                    .map((char, index) => {
                        if (index < iteration) {
                            return text[index];
                        }
                        return CHARS[Math.floor(Math.random() * CHARS.length)];
                    })
                    .join("")
            );

            if (iteration >= text.length) {
                clearInterval(interval);
            }

            // Non-linear speed: accelerate towards end
            iteration += 1 / 3;
        }, speed);

        return () => clearInterval(interval);
    }, [isInView, text, speed]);

    return (
        <span ref={ref} className={`${className} font-mono`}>
            {displayText}
        </span>
    );
}
