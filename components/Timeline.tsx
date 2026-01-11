'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import { ChevronRight } from 'lucide-react';

const milestones = [
    {
        year: "2024",
        title: "The Foundation",
        desc: "Joined Punjab Engineering College (PEC) in Electrical Engineering after cracking the rigorous JEE exams.",
        details: "Proved analytical rigor and technical aptitude early on. The intersection of hardware (Electrical) and software (Code) became the new playground."
    },
    {
        year: "2024",
        title: "Hello World",
        desc: "Started the web development journey. Moved from writing basic scripts to building functional web applications.",
        details: "Mastered the core trilogy: HTML, CSS, and JavaScript. The realization that code could solve real-world problems sparked a fire."
    },
    {
        year: "2025",
        title: "ChargeBrize",
        desc: "Founded 'ChargeBrize' as a solo venture to tackle India's crumbling EV infrastructure.",
        details: "Proposed a decentralized model to stabilize the grid. Built the entire platform from scratch, merging electrical concepts with web tech."
    },
    {
        year: "2025",
        title: "RoadSathi",
        desc: "Co-founded 'RoadSathi' with a team of 3. Built the 'Uber for Mechanics' to help stranded travelers on highways.",
        details: "A college venture with a clear motto: Connect mechanics to users instantly. Validated the idea with real-world prototypes and team collaboration."
    },
    {
        year: "2026",
        title: "Full Stack Evolution",
        desc: "Deep diving into advanced Backend & Frontend architectures. Aspiring to define the future of digital engineering.",
        details: "Expanding the arsenal with Next.js, Databases, and System Design. The goal is clear: Become a world-class Full Stack Developer."
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
        <section id="timeline" ref={containerRef} className="relative w-full py-32 bg-[#0a0a0a] overflow-hidden">
            <div className="max-w-4xl mx-auto px-6 relative">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: false }}
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
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div className={`relative flex flex-col md:flex-row items-center gap-8 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>

            {/* Content Side */}
            <div className={`flex-1 w-full pl-12 md:pl-0 ${index % 2 === 0 ? 'md:text-left' : 'md:text-right'}`}>
                <motion.div
                    initial={{ opacity: 0, x: index % 2 === 0 ? 100 : -100, scale: 0.9 }}
                    whileInView={{ opacity: 1, x: 0, scale: 1 }}
                    viewport={{ once: false, amount: 0.4 }}
                    transition={{ type: "spring", stiffness: 50, damping: 20 }}
                    className={`
                        relative group cursor-pointer overflow-hidden
                        p-6 rounded-2xl border transition-all duration-500
                        ${isHovered ? 'bg-white/10 border-purple-500/50 shadow-[0_0_30px_rgba(168,85,247,0.2)]' : 'bg-white/5 border-white/10'}
                    `}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    {/* Normal Content - Fades Out */}
                    <motion.div
                        animate={{ opacity: isHovered ? 0 : 1, y: isHovered ? -20 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="relative z-10"
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
                    </motion.div>

                    {/* Hover Content - Fades In */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
                        transition={{ duration: 0.3 }}
                        className="absolute inset-0 p-6 flex flex-col justify-center bg-[#0a0a0a]/90 backdrop-blur-md"
                    >
                        <h4 className="text-purple-400 font-bold mb-2 text-sm uppercase tracking-wider">
                            Behind the Scenes
                        </h4>
                        <p className="text-gray-200 text-sm leading-relaxed">
                            {item.details}
                        </p>
                        <div className="mt-4 flex gap-2">
                            <div className="h-1 w-8 bg-purple-500 rounded-full" />
                            <div className="h-1 w-2 bg-purple-500/50 rounded-full" />
                        </div>
                    </motion.div>

                </motion.div>
            </div>

            {/* Center Node */}
            <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 w-4 h-4 rounded-full z-10 flex items-center justify-center">
                <div className="w-full h-full bg-[#0a0a0a] rounded-full border border-white/30" />
                <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: false }}
                    className="absolute inset-0 bg-purple-500 rounded-full shadow-[0_0_10px_#a855f7]"
                />
            </div>

            {/* Empty Side for layout balance */}
            <div className="flex-1 hidden md:block" />
        </div>
    );
}
