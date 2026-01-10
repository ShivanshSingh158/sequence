'use client';

import { motion } from 'framer-motion';

const projects = [
    {
        title: "Neon Horizon",
        category: "Immersive Web Experience",
        description: "A WebGL-based racing experience featuring retro-wave aesthetics and reactive audio visualization.",
    },
    {
        title: "Zenith OS",
        category: "System Design",
        description: "A conceptual operating system interface built entirely in the browser using React and Framer Motion.",
    },
    {
        title: "Aether Lens",
        category: "Photography Portfolio",
        description: "Interactive gallery with fluid transitions and custom shader effects for a renowned photographer.",
    }
];

export default function Projects() {
    return (
        <section className="relative z-10 w-full min-h-screen bg-[#121212] py-24 px-6 md:px-12">
            <div className="max-w-7xl mx-auto">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-5xl md:text-7xl font-bold text-white mb-16 tracking-tight"
                >
                    Selected Works
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="group relative p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md overflow-hidden hover:bg-white/10 transition-colors duration-300"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            <div className="relative z-10 flex flex-col h-full justify-between min-h-[300px]">
                                <div>
                                    <h3 className="text-sm font-medium text-purple-400 mb-2 uppercase tracking-wider">{project.category}</h3>
                                    <h4 className="text-3xl font-semibold text-white mb-4">{project.title}</h4>
                                    <p className="text-gray-400 leading-relaxed">{project.description}</p>
                                </div>

                                <div className="mt-8 flex items-center text-white font-medium group-hover:translate-x-2 transition-transform">
                                    View Case Study <span className="ml-2">→</span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
