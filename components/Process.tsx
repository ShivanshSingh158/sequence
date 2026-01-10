'use client';

import { motion } from 'framer-motion';
import { Cpu, Globe, Layers } from 'lucide-react';

const philosophy = [
    {
        icon: Cpu,
        title: "Lean Innovation",
        desc: "Building high-impact hardware solutions like ChargeBrize using existing infrastructure and AI, minimizing assets while maximizing scale."
    },
    {
        icon: Globe,
        title: "Real-Time Orchestration",
        desc: "Powering RoadSathi with advanced geospatial algorithms to connect people instantly. Performance and speed are non-negotiable."
    },
    {
        icon: Layers,
        title: "Immersive Engineering",
        desc: "Crafting web experiences that aren't just functional but visceral. Blending Next.js power with premium aesthetics."
    }
];

export default function Process() {
    return (
        <section className="relative w-full py-32 px-6 bg-[#0E0E0E] flex flex-col items-center justify-center text-center z-10">

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="mb-20"
            >
                <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
                    Building Philosophy
                </h2>
                <p className="text-xl text-gray-400 font-light max-w-2xl mx-auto">
                    Merging hardware, AI, and design to solve real-world problems.
                </p>
            </motion.div>

            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 relative px-4">
                {philosophy.map((item, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: index * 0.2 }}
                        className="flex flex-col items-center group"
                    >
                        {/* Glowing Icon Container - No Box */}
                        <div className="relative w-20 h-20 mb-8 flex items-center justify-center">
                            <div className="absolute inset-0 bg-purple-600/30 rounded-full blur-2xl group-hover:bg-purple-500/50 transition-colors duration-500" />
                            <item.icon className="relative w-10 h-10 text-white group-hover:text-purple-300 transition-colors duration-300" />
                        </div>

                        <h3 className="text-3xl font-bold text-white mb-4 tracking-tight">
                            {item.title}
                        </h3>

                        <div className="w-12 h-[1px] bg-gradient-to-r from-transparent via-purple-500 to-transparent mb-6 opacity-50 group-hover:w-24 transition-all duration-500" />

                        <p className="text-gray-400 font-light leading-relaxed text-base max-w-sm">
                            {item.desc}
                        </p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
