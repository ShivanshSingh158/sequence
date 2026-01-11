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

import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

// ... (milestones data remains same but add more details if needed)

export default function Timeline() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

    return (
        <section id="timeline" ref={containerRef} className="relative w-full py-32 bg-[#0a0a0a] overflow-hidden">
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
                        className="w-full bg-gradient-to-b from-purple-500 via-cyan-500 to-purple-500 shadow-[0_0_20px_#a855f7]"
                    />
                </div>

                {/* Milestones */}
                <div className="space-y-12">
                    {milestones.map((item, index) => (
                        <TimelineItem key={index} item={item} index={index} />
                    ))}
                </div>

            </div>
        </section>
    );
}

function TimelineItem({ item, index }: { item: any, index: number }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={`relative flex flex-col md:flex-row items-center gap-8 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>

            {/* Content Side */}
            <div className={`flex-1 w-full pl-12 md:pl-0 ${index % 2 === 0 ? 'md:text-left' : 'md:text-right'}`}>
                <motion.div
                    initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className={`
                        relative group cursor-pointer
                        p-6 rounded-2xl border transition-all duration-300
                        ${isOpen ? 'bg-white/10 border-purple-500/50 scale-105 shadow-[0_0_30px_rgba(168,85,247,0.2)]' : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-purple-500/30'}
                    `}
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <div className={`flex items-center gap-4 mb-2 ${index % 2 === 0 ? 'justify-start' : 'md:justify-end justify-start'}`}>
                        <span className="text-purple-400 font-mono text-sm tracking-widest font-bold">
                            {item.year}
                        </span>
                        {index === milestones.length - 1 && (
                            <span className="px-2 py-0.5 text-[10px] bg-green-500/20 text-green-400 border border-green-500/50 rounded-full animate-pulse">
                                CURRENT
                            </span>
                        )}
                    </div>

                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">
                        {item.title}
                    </h3>

                    <p className="text-gray-400 font-light leading-relaxed text-sm">
                        {item.desc}
                    </p>

                    <motion.div
                        initial={false}
                        animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
                        className="overflow-hidden"
                    >
                        <div className="pt-4 mt-4 border-t border-white/10">
                            <p className="text-sm text-gray-300">
                                Detailed insights about {item.title} can be added here.
                                Showing expanded content seamlessly.
                            </p>
                            <div className="flex gap-2 mt-3">
                                <span className="text-xs px-2 py-1 bg-white/5 rounded text-gray-400">#milestone</span>
                                <span className="text-xs px-2 py-1 bg-white/5 rounded text-gray-400">#growth</span>
                            </div>
                        </div>
                    </motion.div>

                    <ChevronDown className={`absolute top-6 right-6 w-5 h-5 text-white/20 transition-transform ${isOpen ? 'rotate-180 text-purple-500' : ''}`} />

                </motion.div>
            </div>

            {/* Center Node */}
            <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 w-4 h-4 rounded-full z-10 flex items-center justify-center">
                <div className="w-full h-full bg-[#0a0a0a] rounded-full border border-white/30" />
                <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    className="absolute inset-0 bg-purple-500 rounded-full shadow-[0_0_10px_#a855f7]"
                />
            </div>

            {/* Empty Side for layout balance */}
            <div className="flex-1 hidden md:block" />
        </div>
    );
}
