'use client';

import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import { Cpu, Globe, Layers, Zap } from 'lucide-react';
import TiltCard from './TiltCard';
import ScrollReveal from './ScrollReveal';
import { MouseEvent } from 'react';

const philosophy = [
    {
        icon: Cpu,
        title: "Lean Innovation",
        phrase: "Efficiency at Scale",
        desc: "Building high-impact hardware solutions like ChargeBrize using existing infrastructure and AI, minimizing assets while maximizing scale.",
        gradient: "from-purple-500 to-blue-500"
    },
    {
        icon: Globe,
        title: "Real-Time Orchestration",
        phrase: "Speed is a Feature",
        desc: "Powering RoadSathi with advanced geospatial algorithms to connect people instantly. Performance and speed are non-negotiable.",
        gradient: "from-blue-500 to-cyan-500"
    },
    {
        icon: Layers,
        title: "Immersive Engineering",
        phrase: "Visceral Experience",
        desc: "Crafting web experiences that aren't just functional but visceral. Blending Next.js power with premium aesthetics.",
        gradient: "from-cyan-500 to-green-500"
    }
];

function SpotlightCard({ item, index }: { item: typeof philosophy[0], index: number }) {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    function onMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    return (
        <TiltCard className="h-full">
            <div
                onMouseMove={onMouseMove}
                className="group relative h-full bg-white/5 rounded-2xl border border-white/10 overflow-hidden"
            >
                {/* Spotlight Gradient */}
                <motion.div
                    className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition duration-300 group-hover:opacity-100"
                    style={{
                        background: useMotionTemplate`
                            radial-gradient(
                                650px circle at ${mouseX}px ${mouseY}px,
                                rgba(150, 150, 255, 0.15),
                                transparent 80%
                            )
                        `,
                    }}
                />

                {/* Border Reveal */}
                <motion.div
                    className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition duration-300 group-hover:opacity-100 placeholder-border"
                    style={{
                        background: useMotionTemplate`
                            radial-gradient(
                                300px circle at ${mouseX}px ${mouseY}px,
                                rgba(255, 255, 255, 0.3),
                                transparent 80%
                            )
                        `,
                        maskImage: 'linear-gradient(black, black) content-box, linear-gradient(black, black)',
                        maskComposite: 'exclude',
                        WebkitMaskComposite: 'xor',
                        padding: '1px'
                    }}
                />

                <div className="relative h-full p-8 flex flex-col items-start z-10">
                    {/* Header: Icon + Number */}
                    <div className="flex justify-between items-start w-full mb-8">
                        <div className={`p-4 rounded-xl bg-gradient-to-br ${item.gradient} bg-opacity-10 border border-white/10 group-hover:scale-110 transition-transform duration-500`}>
                            <item.icon className="w-8 h-8 text-white" />
                        </div>
                        <span className="font-mono text-xs text-white/20">0{index + 1}</span>
                    </div>

                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-400 transition-all duration-300">
                        {item.title}
                    </h3>

                    <div className="inline-block px-2 py-1 bg-white/5 rounded md:mb-6 mb-4">
                        <span className={`text-[10px] font-mono uppercase tracking-widest bg-gradient-to-r ${item.gradient} bg-clip-text text-transparent`}>
                            {item.phrase}
                        </span>
                    </div>

                    <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors">
                        {item.desc}
                    </p>

                    {/* Bottom active line */}
                    <div className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${item.gradient} w-0 group-hover:w-full transition-all duration-700 ease-out`} />
                </div>
            </div>
        </TiltCard>
    );
}

export default function Philosophy() {
    return (
        <section className="relative w-full py-32 px-6 bg-[#0E0E0E] flex flex-col items-center justify-center z-10 overflow-hidden">

            {/* Background Ambient Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-purple-900/20 blur-[120px] rounded-full pointer-events-none" />

            <div className="max-w-7xl w-full mx-auto relative z-10">
                <ScrollReveal className="mb-20 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="inline-block mb-4 px-3 py-1 rounded-full border border-purple-500/30 bg-purple-500/10 backdrop-blur-sm"
                    >
                        <span className="text-xs font-mono text-purple-400 tracking-widest uppercase flex items-center gap-2">
                            <Zap className="w-3 h-3" /> Core Principles
                        </span>
                    </motion.div>

                    <h2 className="text-5xl md:text-7xl font-bold text-white mb-8 tracking-tight">
                        Building Philosophy.
                    </h2>
                    <p className="text-xl text-gray-400 font-light max-w-2xl mx-auto leading-relaxed">
                        Merging hardware, AI, and design to solve real-world problems.
                    </p>
                </ScrollReveal>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {philosophy.map((item, index) => (
                        <ScrollReveal key={index} delay={index * 0.1}>
                            <SpotlightCard item={item} index={index} />
                        </ScrollReveal>
                    ))}
                </div>
            </div>
        </section>
    );
}
