'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Database, Server, Cpu, Layers, Zap, Workflow, MessageSquare, X } from 'lucide-react';
import { ReactIcon, NextIcon, TailwindIcon, JsIcon, TsIcon, NodeIcon, HtmlIcon, CssIcon, MongoIcon } from './SkillIcons';
import StarNode from './StarNode';
import { useState, useEffect } from 'react';

// Skill Data
const SKILLS = [
    // Frontend
    { id: 1, label: 'HTML', icon: HtmlIcon, category: 'Frontend', x: 15, y: 30, color: '#E44D26' },
    { id: 16, label: 'CSS', icon: CssIcon, category: 'Frontend', x: 25, y: 25, color: '#264DE4' },
    { id: 12, label: 'React', icon: ReactIcon, category: 'Frontend', x: 35, y: 40, color: '#61DAFB' },
    { id: 13, label: 'Tailwind', icon: TailwindIcon, category: 'Frontend', x: 25, y: 55, color: '#38B2AC' },
    { id: 14, label: 'NextJS', icon: NextIcon, category: 'Frontend', x: 45, y: 25, color: '#ffffff' },

    // Core JS
    { id: 2, label: 'JS Core', icon: JsIcon, category: 'Core', x: 55, y: 50, color: '#F7DF1E' },
    { id: 3, label: 'Architecture', icon: Cpu, category: 'Core', x: 65, y: 40, color: '#A855F7' },
    { id: 9, label: 'TypeScript', icon: TsIcon, category: 'Core', x: 70, y: 60, color: '#3178C6' },

    // Backend & Runtime
    { id: 5, label: 'NodeJS', icon: NodeIcon, category: 'Backend', x: 80, y: 30, color: '#339933' },
    { id: 6, label: 'Express', icon: Server, category: 'Backend', x: 75, y: 20, color: '#ffffff' },
    { id: 11, label: 'Bun', icon: Zap, category: 'Backend', x: 88, y: 45, color: '#fbf0df' },

    // Data
    { id: 7, label: 'MongoDB', icon: MongoIcon, category: 'Data', x: 25, y: 75, color: '#47A248' },
    { id: 8, label: 'Postgres', icon: Database, category: 'Data', x: 35, y: 85, color: '#336791' },

    // Advanced
    { id: 10, label: 'Turborepo', icon: Workflow, category: 'Advanced', x: 65, y: 80, color: '#EF4444' },
    { id: 15, label: 'WebSockets', icon: MessageSquare, category: 'Advanced', x: 50, y: 85, color: '#ffffff' },
    { id: 17, label: 'Redis', icon: Layers, category: 'Advanced', x: 80, y: 70, color: '#FF4438' },
];

const THEMES = {
    cosmic: { bg: 'bg-[#050505]', accent: 'text-purple-400', grid: 'opacity-20' },
    cyberpunk: { bg: 'bg-[#0a0a1a]', accent: 'text-cyan-400', grid: 'opacity-40' },
    minimal: { bg: 'bg-[#121212]', accent: 'text-white', grid: 'opacity-5' },
};

export default function SkillUniverse({
    isOpen,
    onClose
}: {
    isOpen: boolean;
    onClose: () => void;
}) {
    const [activeTheme, setActiveTheme] = useState<'cosmic' | 'cyberpunk' | 'minimal'>('cosmic');
    const [selectedSkill, setSelectedSkill] = useState<typeof SKILLS[0] | null>(null);
    const [filter, setFilter] = useState<string>('All');

    // Reset selection when closing
    useEffect(() => {
        if (!isOpen) setSelectedSkill(null);
    }, [isOpen]);

    const filteredSkills = filter === 'All'
        ? SKILLS
        : SKILLS.filter(s => s.category === filter);

    const categories = ['All', ...Array.from(new Set(SKILLS.map(s => s.category)))];

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.2 }}
                    transition={{ duration: 0.5 }}
                    className={`fixed inset-0 z-[10000] overflow-hidden flex flex-col ${THEMES[activeTheme].bg}`}
                >
                    {/* Background Grid */}
                    <div className={`absolute inset-0 pointer-events-none ${THEMES[activeTheme].grid}`}
                        style={{
                            backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
                            backgroundSize: '100px 100px'
                        }}
                    />

                    {/* Controls Header */}
                    <div className="relative z-20 flex justify-between items-center p-6 md:p-8 backdrop-blur-md border-b border-white/10">
                        <div>
                            <h2 className="text-2xl md:text-4xl font-bold text-white mb-2">Skill Universe</h2>
                            <div className="flex gap-2 text-xs md:text-sm flex-wrap">
                                {categories.map(cat => (
                                    <button
                                        key={cat}
                                        onClick={() => setFilter(cat)}
                                        className={`
                                            px-4 py-1.5 rounded-full border transition-all duration-300 cursor-pointer
                                            ${filter === cat
                                                ? 'bg-white text-black border-white shadow-[0_0_15px_rgba(255,255,255,0.4)] scale-105 font-bold'
                                                : 'text-white/60 border-white/10 hover:border-white/50 hover:text-white hover:bg-white/5'
                                            }
                                        `}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="flex items-center gap-6">
                            {/* Theme Switcher */}
                            <div className="hidden md:flex gap-3">
                                {(Object.keys(THEMES) as Array<keyof typeof THEMES>).map(theme => (
                                    <button
                                        key={theme}
                                        onClick={() => setActiveTheme(theme)}
                                        className={`
                                            w-8 h-8 rounded-full border transition-all duration-300 cursor-pointer relative group
                                            ${activeTheme === theme ? 'ring-2 ring-white scale-110 shadow-lg' : 'opacity-60 hover:opacity-100 hover:scale-110 border-white/30'}
                                        `}
                                        style={{
                                            background: theme === 'cosmic' ? '#050505' : theme === 'cyberpunk' ? '#0a0a1a' : '#121212'
                                        }}
                                        title={theme.charAt(0).toUpperCase() + theme.slice(1)}
                                    >
                                        {/* Hover Glow */}
                                        <div className="absolute inset-0 rounded-full bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </button>
                                ))}
                            </div>

                            <button
                                onClick={onClose}
                                className="p-3 rounded-full hover:bg-white/10 transition-all duration-300 cursor-pointer hover:rotate-90 active:scale-95 group"
                            >
                                <X className="text-white w-8 h-8 group-hover:text-red-400 transition-colors" />
                            </button>
                        </div>
                    </div>

                    {/* Universe Content */}
                    <div className="flex-1 relative overflow-hidden cursor-crosshair">

                        {/* Connecting Lines */}
                        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
                            {filteredSkills.map((skill, i) => (
                                filteredSkills.map((other, j) => {
                                    if (i >= j) return null; // Avoid duplicates
                                    // Connect if in same category or adjacent IDs (hacky connection logic but works for visuals)
                                    if (skill.category === other.category || Math.abs(skill.id - other.id) < 3) {
                                        return (
                                            <motion.line
                                                key={`${skill.id}-${other.id}`}
                                                x1={`${skill.x}%`}
                                                y1={`${skill.y}%`}
                                                x2={`${other.x}%`}
                                                y2={`${other.y}%`}
                                                stroke="white"
                                                strokeWidth="1"
                                                initial={{ pathLength: 0, opacity: 0 }}
                                                animate={{ pathLength: 1, opacity: 0.5 }}
                                                transition={{ duration: 1, delay: 0.5 }}
                                            />
                                        );
                                    }
                                    return null;
                                })
                            ))}
                        </svg>

                        {/* Stars */}
                        <AnimatePresence>
                            {filteredSkills.map((skill, index) => (
                                <StarNode
                                    key={skill.id}
                                    {...skill}
                                    isActive={selectedSkill?.id === skill.id}
                                    onClick={() => setSelectedSkill(skill)}
                                    delay={index * 0.05}
                                    icon={skill.icon as any} // Cast safely
                                />
                            ))}
                        </AnimatePresence>

                        {/* Skill Detail Card (Floating) */}
                        <AnimatePresence>
                            {selectedSkill && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20, x: '-50%' }}
                                    animate={{ opacity: 1, y: 0, x: '-50%' }}
                                    exit={{ opacity: 0, y: 20, x: '-50%' }}
                                    className="absolute bottom-12 left-1/2 -translate-x-1/2 w-[90%] md:w-[400px] bg-black/80 backdrop-blur-xl border border-white/20 p-6 rounded-2xl z-50"
                                >
                                    <h3 className="text-2xl font-bold text-white mb-2 flex items-center gap-3">
                                        {/* @ts-ignore */}
                                        <selectedSkill.icon className="w-6 h-6" style={{ color: selectedSkill.color }} />
                                        {selectedSkill.label}
                                    </h3>
                                    <div className="text-sm text-white/60 font-mono mb-4">
                                        Category: {selectedSkill.category}
                                    </div>
                                    <p className="text-white/80 text-sm leading-relaxed">
                                        Mastered concepts in {selectedSkill.label}.
                                        Part of the {selectedSkill.category} constellation.
                                        Crucial for building scalable applications.
                                    </p>
                                </motion.div>
                            )}
                        </AnimatePresence>

                    </div>

                    {/* Floating Particles/Dust */}
                    <div className="absolute inset-0 pointer-events-none">
                        {[...Array(20)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="absolute bg-white/30 rounded-full"
                                style={{
                                    width: Math.random() * 3 + 1,
                                    height: Math.random() * 3 + 1,
                                    left: `${Math.random() * 100}%`,
                                    top: `${Math.random() * 100}%`,
                                }}
                                animate={{
                                    y: [0, -100, 0],
                                    opacity: [0, 1, 0],
                                }}
                                transition={{
                                    duration: 5 + Math.random() * 5,
                                    repeat: Infinity,
                                    ease: "linear"
                                }}
                            />
                        ))}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
