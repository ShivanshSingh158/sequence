'use client';

import { motion } from 'framer-motion';

interface ScrollRevealProps {
    children: React.ReactNode;
    width?: "fit-content" | "100%";
    delay?: number;
    className?: string;
}

export default function ScrollReveal({
    children,
    width = "fit-content",
    delay = 0,
    className = ""
}: ScrollRevealProps) {
    return (
        <div style={{ position: 'relative', width, overflow: 'hidden' }} className={className}>
            <motion.div
                variants={{
                    hidden: { opacity: 0, y: 75 },
                    visible: { opacity: 1, y: 0 },
                }}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.2 + delay, ease: "easeOut" }}
            >
                {children}
            </motion.div>
        </div>
    );
}
