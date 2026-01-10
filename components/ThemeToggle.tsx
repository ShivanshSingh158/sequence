'use client';

import { motion } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';
import { Gamepad2 } from 'lucide-react';

export default function ThemeToggle() {
    const { isRetro, toggleRetro } = useTheme();

    return (
        <motion.button
            onClick={toggleRetro}
            className="fixed top-8 right-24 z-[100] p-3 backdrop-blur-md border rounded-full transition-all duration-300 group"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            style={{
                background: isRetro
                    ? 'linear-gradient(135deg, #ff00ff, #00ffff)'
                    : 'rgba(255,255,255,0.1)',
                borderColor: isRetro ? '#ff00ff' : 'rgba(255,255,255,0.1)'
            }}
        >
            <Gamepad2 className="w-5 h-5 text-white" />

            <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 px-3 py-1 bg-black/80 text-white text-xs rounded opacity-0 group-hover:opacity-100 whitespace-nowrap transition-opacity pointer-events-none border border-white/10">
                {isRetro ? 'Normal Mode' : 'Retro Mode'}
            </span>
        </motion.button>
    );
}
