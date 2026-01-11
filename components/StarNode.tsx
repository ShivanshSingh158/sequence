'use client';

import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface StarNodeProps {
    x: number;
    y: number;
    size?: number;
    icon: LucideIcon;
    label: string;
    isActive?: boolean;
    color?: string;
    onClick?: () => void;
    delay?: number;
}

export default function StarNode({
    x,
    y,
    size = 40,
    icon: Icon,
    label,
    isActive = false,
    color = '#ffffff',
    onClick,
    delay = 0
}: StarNodeProps) {
    return (
        <motion.div
            className="absolute flex flex-col items-center justify-center cursor-pointer z-10 group"
            style={{
                left: `${x}%`,
                top: `${y}%`,
                transform: 'translate(-50%, -50%)'
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay, duration: 0.5, type: 'spring' }}
            onClick={onClick}
            whileHover={{ scale: 1.2, zIndex: 20 }}
            whileTap={{ scale: 0.9 }}
        >
            {/* Glow Effect */}
            <motion.div
                className="absolute inset-0 rounded-full blur-md"
                style={{ backgroundColor: color }}
                animate={{
                    opacity: [0.3, 0.6, 0.3],
                    scale: [1, 1.2, 1]
                }}
                transition={{
                    duration: 2 + Math.random() * 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />

            {/* Icon Container */}
            <div
                className={`relative flex items-center justify-center rounded-full border transition-colors duration-300 ${isActive ? 'bg-white/20 border-white' : 'bg-black/40 border-white/20 group-hover:border-white/60'}`}
                style={{
                    width: size,
                    height: size,
                    borderColor: isActive ? color : undefined
                }}
            >
                <Icon size={size * 0.5} color={isActive ? color : '#ffffff'} />
            </div>

            {/* Label */}
            <motion.span
                className={`mt-2 text-[10px] md:text-xs font-mono tracking-wider px-2 py-0.5 rounded-full backdrop-blur-sm transition-colors ${isActive ? 'bg-white/10 text-white' : 'text-white/40 group-hover:text-white'}`}
                style={{ color: isActive ? color : undefined }}
            >
                {label}
            </motion.span>
        </motion.div>
    );
}
