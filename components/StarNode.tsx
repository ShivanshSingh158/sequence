'use client';

import { motion, MotionValue } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { useRef } from 'react';

interface StarNodeProps {
    x: number;
    y: number;
    size?: number;
    icon: any;
    label: string;
    isActive?: boolean;
    color?: string;
    onClick?: () => void;
    delay?: number;
    xSpring: MotionValue<number>;
    ySpring: MotionValue<number>;
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
    delay = 0,
    xSpring,
    ySpring
}: StarNodeProps) {
    const ref = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: React.MouseEvent) => {
        const rect = ref.current?.getBoundingClientRect();
        if (rect) {
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            const flowX = (e.clientX - centerX) * 0.5; // Magnetic pull strength
            const flowY = (e.clientY - centerY) * 0.5;
            xSpring.set(flowX);
            ySpring.set(flowY);
        }
    };

    const handleMouseLeave = () => {
        xSpring.set(0);
        ySpring.set(0);
    };

    return (
        <motion.div
            ref={ref}
            className="absolute flex flex-col items-center justify-center cursor-pointer z-10 group"
            style={{
                left: `${x}%`,
                top: `${y}%`,
                x: xSpring,
                y: ySpring,
                transform: 'translate(-50%, -50%)' // Base centering
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0, transition: { duration: 0.3 } }}
            transition={{ delay, duration: 0.5, type: 'spring' }}
            onClick={onClick}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            whileHover={{ scale: 1.4, zIndex: 50 }}
            whileTap={{ scale: 0.9 }}
        >
            {/* Holographic Orb - Glass Effect */}
            <div className="relative">
                {/* Core Glow */}
                <motion.div
                    className="absolute inset-0 rounded-full blur-xl opacity-40 transition-opacity duration-500 group-hover:opacity-80"
                    style={{ backgroundColor: color }}
                />

                {/* Glass Container */}
                <div
                    className={`relative flex items-center justify-center rounded-full backdrop-blur-md border border-white/20 shadow-[inset_0_0_10px_rgba(255,255,255,0.2)] transition-all duration-300 ${isActive ? 'bg-white/10 ring-2 ring-white/50' : 'bg-white/5 group-hover:bg-white/10'}`}
                    style={{
                        width: size,
                        height: size,
                        boxShadow: `0 0 20px -5px ${color}80` // Dynamic colored shadow
                    }}
                >
                    {/* Inner Reflection (Gloss) */}
                    <div className="absolute top-1 left-1/2 -translate-x-1/2 w-1/2 h-1/3 bg-gradient-to-b from-white/40 to-transparent rounded-full opacity-60" />

                    {/* Icon - Support both Lucide & Custom SVG */}
                    {typeof Icon === 'function' ? (
                        <Icon className={`w-1/2 h-1/2 transition-transform duration-300 group-hover:scale-110`} style={{ color: isActive ? '#fff' : color }} />
                    ) : (
                        // Fallback for straight SVG elements if passed differently
                        <Icon size={size * 0.5} color={isActive ? color : '#ffffff'} />
                    )}
                </div>
            </div>

            {/* Label */}
            <motion.span
                className={`mt-3 text-[10px] md:text-xs font-mono tracking-wider px-3 py-1 rounded-full backdrop-blur-md border border-white/10 transition-colors ${isActive ? 'bg-white/20 text-white border-white/40' : 'bg-black/40 text-white/50 group-hover:text-white'}`}
                style={{ color: isActive ? color : undefined }}
            >
                {label}
            </motion.span>
        </motion.div>
    );
}
