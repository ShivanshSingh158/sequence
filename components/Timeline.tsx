'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const milestones = [
    {
        year: "2023",
        title: "The Genesis",
        desc: "Started with a simple idea: Decentralized Power. Prototyped the first version of the ChargeBrize smart plug in a garage."
    },
    {
        year: "2024",
        title: "ChargeBrize Launch",
        desc: "Deployed the first 500 units. The network went live, proving that peer-to-peer energy sharing was viable at scale."
    },
    {
        year: "2024",
        title: "RoadSathi Beta",
        desc: "Pivoted to roadside assistance. Built the 'Uber for Mechanics' MVP in 3 weeks during a hackathon. It went viral locally."
    },
    {
        year: "2025",
        title: "Ecosystem Expansion",
        desc: "Integrated AI Load Balancing and Predictive Logic. The platform evolved from a single app to a comprehensive suite of connected services."
    },
    {
        year: "2026",
        title: "Global Scale",
        desc: "Now scaling to new markets. Building the future of connected infrastructure, one node at a time."
    }
];

export default function Timeline() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

    return (
        <section ref={containerRef} className="relative w-full py-32 bg-[#0a0a0a] overflow-hidden">
            <div className="max-w-4xl mx-auto px-6 relative">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="text-center mb-24"
                >
                    <h2 className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tighter">
                        The Journey
                    </h2>
                    <p className="text-white/40 font-mono tracking-widest text-sm uppercase">
                        From Zero to One
                    </p>
                </motion.div>

                {/* Timeline Stem */}
                <div className="absolute left-6 md:left-1/2 top-48 bottom-0 w-px bg-white/10 md:-translate-x-1/2">
                    <motion.div
                        style={{ height: lineHeight }}
                        className="w-full bg-gradient-to-b from-transparent via-purple-500 to-transparent shadow-[0_0_20px_#a855f7]"
                    />
                </div>

                {/* Milestones */}
                <div className="space-y-24">
                    {milestones.map((item, index) => (
                        <div key={index} className={`relative flex flex-col md:flex-row items-center gap-8 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>

                            {/* Content Side */}
                            <div className="flex-1 text-left md:text-center md:items-start pl-12 md:pl-0">
                                <motion.div
                                    initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    transition={{ duration: 0.6, delay: 0.2 }}
                                    className={`p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:border-purple-500/30 transition-colors ${index % 2 === 0 ? 'md:text-left' : 'md:text-right'}`}
                                >
                                    <span className="text-purple-400 font-mono text-sm tracking-widest mb-2 block">
                                        {item.year}
                                    </span>
                                    <h3 className="text-2xl font-bold text-white mb-2">
                                        {item.title}
                                    </h3>
                                    <p className="text-gray-400 font-light leading-relaxed text-sm">
                                        {item.desc}
                                    </p>
                                </motion.div>
                            </div>

                            {/* Center Node */}
                            <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 w-3 h-3 bg-[#0a0a0a] border border-white/30 rounded-full z-10">
                                <motion.div
                                    initial={{ scale: 0 }}
                                    whileInView={{ scale: 1 }}
                                    viewport={{ once: true }}
                                    className="w-full h-full bg-purple-500 rounded-full shadow-[0_0_10px_#a855f7]"
                                />
                            </div>

                            {/* Empty Side for layout balance */}
                            <div className="flex-1 hidden md:block" />
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}
