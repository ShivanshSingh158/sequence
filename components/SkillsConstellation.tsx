'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import SkillUniverse from './SkillUniverse';
import { Rocket } from 'lucide-react';

export default function SkillsConstellation() {
    const [showUniverse, setShowUniverse] = useState(false);
    const containerRef = useRef(null);

    return (
        <section ref={containerRef} className="relative w-full min-h-[60vh] flex flex-col items-center justify-center overflow-hidden py-24">

            {/* Background Elements */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#121212] via-black to-[#121212]" />
            <div className="absolute inset-0 opacity-20"
                style={{
                    backgroundImage: 'radial-gradient(circle at center, white 1px, transparent 1px)',
                    backgroundSize: '50px 50px'
                }}
            />

            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative z-10 text-center px-6"
            >
                <div className="inline-block mb-6 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm">
                    <span className="text-sm font-mono text-purple-400">♦ EXPERTISE</span>
                </div>

                <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
                    Skills Constellation
                </h2>

                <p className="max-w-xl mx-auto text-lg text-white/50 mb-12">
                    A celestial mapping of my technical capabilities.
                    Explore the universe of technologies I've mastered.
                </p>

                {/* Main CTA */}
                <motion.button
                    onClick={() => setShowUniverse(true)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="group relative inline-flex items-center gap-3 px-8 py-4 bg-white text-black rounded-full font-bold text-lg overflow-hidden"
                >
                    <span className="relative z-10">Enter Skill Universe</span>
                    <Rocket className="w-5 h-5 relative z-10 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />

                    {/* Hover Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.button>
            </motion.div>

            {/* Floating Orbit Preview (Decorative) */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {[...Array(3)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute top-1/2 left-1/2 border border-white/5 rounded-full"
                        style={{
                            width: 300 + i * 150,
                            height: 300 + i * 150,
                            x: '-50%',
                            y: '-50%',
                        }}
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20 + i * 10, repeat: Infinity, ease: "linear" }}
                    >
                        <div className="absolute top-0 left-1/2 w-2 h-2 bg-white/20 rounded-full blur-[2px]" />
                    </motion.div>
                ))}
            </div>

            {/* Full Screen Overlay */}
            <SkillUniverse isOpen={showUniverse} onClose={() => setShowUniverse(false)} />
        </section>
    );
}
