'use client';

import { motion, AnimatePresence, useSpring, useTransform, MotionValue } from 'framer-motion';
import { Database, Server, Cpu, Layers, Zap, Workflow, MessageSquare, X } from 'lucide-react';
import { ReactIcon, NextIcon, TailwindIcon, JsIcon, TsIcon, NodeIcon, HtmlIcon, CssIcon, MongoIcon } from './SkillIcons';
import StarNode from './StarNode';
import { useState, useEffect, useMemo } from 'react';

// Skill Data (unchanged)
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

// Elastic Line Component
const ElasticLine = ({
    start,
    end,
    startSpring,
    endSpring
}: {
    start: { x: number, y: number },
    end: { x: number, y: number },
    startSpring: { x: MotionValue, y: MotionValue },
    endSpring: { x: MotionValue, y: MotionValue }
}) => {
    // Transform percent coordinates + spring pixel offsets back to percent strings (or usage in SVG)
    // Actually simpler: SVG lines take standard props. We can use `useTransform` to produce string "calc(X% + Ypx)"

    const x1 = useTransform(startSpring.x, (val) => `calc(${start.x}% + ${val}px)`);
    const y1 = useTransform(startSpring.y, (val) => `calc(${start.y}% + ${val}px)`);
    const x2 = useTransform(endSpring.x, (val) => `calc(${end.x}% + ${val}px)`);
    const y2 = useTransform(endSpring.y, (val) => `calc(${end.y}% + ${val}px)`);

    return (
        <motion.line
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="white"
            strokeWidth="1"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.3 }} // Lower opacity for high-tech look
            transition={{ duration: 1.5, delay: 0.2 }}
        />
    );
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

    // Initialize Physics Engine (Springs for every skill)
    // We treat SKILLS as static for initialization to keep hook order constant.
    const physicsEngine = useMemo(() => {
        // This is a bit "hacky" in pure React but since SKILLS is constant, it works perfectly for this effect
        // NOTE: We cannot call hooks inside useMemo. We must map gently.
        // Actually, we need to call useSpring at the top level.
        return null;
    }, []);

    // Correct way: Call useSpring unconditionally for the static list
    // This creates an array of spring objects { x, y }
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const springs = SKILLS.map(() => ({
        // eslint-disable-next-line react-hooks/rules-of-hooks
        x: useSpring(0, { stiffness: 120, damping: 15 }),
        // eslint-disable-next-line react-hooks/rules-of-hooks
        y: useSpring(0, { stiffness: 120, damping: 15 })
    }));

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

                    {/* UNIVERSE CONTENT - DESKTOP (Physics & Constellation) */}
                    <div className="hidden md:block flex-1 relative overflow-hidden">
                        {/* Elastic Connecting Lines */}
                        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40">
                            {filteredSkills.map((skill, i) => (
                                filteredSkills.map((other, j) => {
                                    if (i >= j) return null;
                                    if (skill.category === other.category || Math.abs(skill.id - other.id) < 3) {
                                        const startIdx = SKILLS.findIndex(s => s.id === skill.id);
                                        const endIdx = SKILLS.findIndex(s => s.id === other.id);
                                        if (startIdx === -1 || endIdx === -1) return null;
                                        return (
                                            <ElasticLine
                                                key={`${skill.id}-${other.id}`}
                                                start={{ x: skill.x, y: skill.y }}
                                                end={{ x: other.x, y: other.y }}
                                                startSpring={springs[startIdx]}
                                                endSpring={springs[endIdx]}
                                            />
                                        );
                                    }
                                    return null;
                                })
                            ))}
                        </svg>

                        {/* Stars with Physics */}
                        <AnimatePresence>
                            {filteredSkills.map((skill, index) => {
                                const originalIndex = SKILLS.findIndex(s => s.id === skill.id);
                                return (
                                    <StarNode
                                        key={skill.id}
                                        {...skill}
                                        isActive={selectedSkill?.id === skill.id}
                                        onClick={() => setSelectedSkill(skill)}
                                        delay={index * 0.05}
                                        icon={skill.icon as any}
                                        xSpring={springs[originalIndex].x}
                                        ySpring={springs[originalIndex].y}
                                    />
                                );
                            })}
                        </AnimatePresence>
                    </div>

                    {/* UNIVERSE CONTENT - MOBILE (Vertical Scrollable Starmap) */}
                    <div className="md:hidden flex-1 overflow-y-auto p-4 pb-24 space-y-8 no-scrollbar">
                        {categories.filter(c => c !== 'All' && (filter === 'All' || filter === c)).map((category, catIndex) => (
                            <motion.div
                                key={category}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: catIndex * 0.1 }}
                            >
                                <h3 className="text-xl font-bold text-white/50 mb-4 px-2 uppercase tracking-widest text-xs flex items-center gap-2">
                                    <span className="w-1 h-3 bg-white/50 rounded-full" />
                                    {category} Sector
                                </h3>
                                <div className="grid grid-cols-2 gap-3">
                                    {SKILLS.filter(s => s.category === category).map((skill) => (
                                        <motion.button
                                            key={skill.id}
                                            onClick={() => setSelectedSkill(skill)}
                                            whileTap={{ scale: 0.95 }}
                                            className={`
                                                relative p-4 rounded-xl border flex flex-col items-center gap-3 transition-all duration-300
                                                ${selectedSkill?.id === skill.id
                                                    ? 'bg-white/10 border-white/40 shadow-[0_0_20px_rgba(255,255,255,0.1)]'
                                                    : 'bg-white/5 border-white/5 hover:bg-white/10'
                                                }
                                            `}
                                        >
                                            {/* @ts-ignore */}
                                            <skill.icon className="w-8 h-8" style={{ color: skill.color }} />
                                            <span className="text-sm text-white font-medium">{skill.label}</span>

                                            {/* Selection Indicator */}
                                            {selectedSkill?.id === skill.id && (
                                                <motion.div
                                                    layoutId="mobile-glow"
                                                    className="absolute inset-0 rounded-xl bg-gradient-to-tr from-white/5 to-transparent pointer-events-none"
                                                />
                                            )}
                                        </motion.button>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* DETAIL CARD (Shared Logic, adapted positioning) */}
                    <AnimatePresence>
                        {selectedSkill && (
                            <motion.div
                                initial={{ opacity: 0, y: 100 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 100 }}
                                className="fixed bottom-0 left-0 w-full md:w-[400px] md:bottom-12 md:left-1/2 md:-translate-x-1/2 bg-[#0a0a0a] md:bg-black/90 md:backdrop-blur-xl border-t md:border border-white/20 p-6 md:rounded-2xl z-50 shadow-2xl safe-area-bottom"
                            >
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                                        {/* @ts-ignore */}
                                        <selectedSkill.icon className="w-6 h-6" style={{ color: selectedSkill.color }} />
                                        {selectedSkill.label}
                                    </h3>
                                    <button
                                        onClick={() => setSelectedSkill(null)}
                                        className="md:hidden p-1 bg-white/10 rounded-full"
                                    >
                                        <X className="w-5 h-5 text-white" />
                                    </button>
                                </div>
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

                    {/* Floating Particles/Dust */}
                    <ParticlesOverlay />
                </motion.div>
            )}
        </AnimatePresence>
    );
}

function ParticlesOverlay() {
    const [particles, setParticles] = useState<{ width: number, height: number, left: string, top: string, duration: number }[]>([]);

    useEffect(() => {
        setParticles([...Array(20)].map(() => ({
            width: Math.random() * 3 + 1,
            height: Math.random() * 3 + 1,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            duration: 5 + Math.random() * 5
        })));
    }, []);

    return (
        <div className="absolute inset-0 pointer-events-none">
            {particles.map((p, i) => (
                <motion.div
                    key={i}
                    className="absolute bg-white/30 rounded-full"
                    style={{
                        width: p.width,
                        height: p.height,
                        left: p.left,
                        top: p.top,
                    }}
                    animate={{
                        y: [0, -100, 0],
                        opacity: [0, 1, 0],
                    }}
                    transition={{
                        duration: p.duration,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                />
            ))}
        </div>
    );
}
