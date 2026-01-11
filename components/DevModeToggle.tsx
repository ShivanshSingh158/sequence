'use client';

import { motion } from 'framer-motion';
import { useDevMode } from '@/context/DevModeContext';
import { Code2 } from 'lucide-react';

export default function DevModeToggle() {
    const { isDevMode, toggleDevMode } = useDevMode();

    return (
        <motion.button
            onClick={toggleDevMode}
            className="fixed top-4 right-16 md:top-8 md:right-96 z-[100] p-2 md:p-3 backdrop-blur-md border rounded-full transition-all duration-300 group"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            style={{
                background: isDevMode
                    ? 'linear-gradient(135deg, #10b981, #3b82f6)'
                    : 'rgba(255,255,255,0.1)',
                borderColor: isDevMode ? '#10b981' : 'rgba(255,255,255,0.1)'
            }}
        >
            <Code2 className="w-5 h-5 text-white" />

            <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 px-3 py-1 bg-black/80 text-white text-xs rounded opacity-0 group-hover:opacity-100 whitespace-nowrap transition-opacity pointer-events-none border border-white/10">
                {isDevMode ? 'Hide Dev Info' : 'Developer Mode'}
            </span>
        </motion.button>
    );
}
