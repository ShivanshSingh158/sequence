import { motion } from 'framer-motion';

export default function AnimatedCode({ className }: { className?: string }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <motion.polyline
                points="16 18 22 12 16 6"
                initial={{ pathLength: 0, x: -5 }}
                animate={{ pathLength: 1, x: 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
            />
            <motion.polyline
                points="8 6 2 12 8 18"
                initial={{ pathLength: 0, x: 5 }}
                animate={{ pathLength: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2, ease: "easeInOut" }}
            />
        </svg>
    );
}
