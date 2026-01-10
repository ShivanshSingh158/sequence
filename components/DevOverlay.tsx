'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useDevMode } from '@/context/DevModeContext';
import { X } from 'lucide-react';

export default function DevOverlay() {
    const { isDevMode, toggleDevMode } = useDevMode();

    const techStack = [
        { name: 'Next.js', version: '16.1.1', purpose: 'React Framework' },
        { name: 'React', version: '19.2.3', purpose: 'UI Library' },
        { name: 'Framer Motion', version: '12.25.0', purpose: 'Animations' },
        { name: 'TypeScript', version: '5.x', purpose: 'Type Safety' },
        { name: 'Tailwind CSS', version: '4.x', purpose: 'Styling' },
        { name: 'Lenis', version: 'Latest', purpose: 'Smooth Scroll' },
    ];

    const features = [
        '🎨 Lenis Smooth Scrolling',
        '✨ Mouse Trail Particles',
        '🎮 Retro Mode Toggle',
        '🔊 Sound Effects System',
        '🎯 Magnetic Cursor',
        '🌊 Parallax Depth Effects',
        '🚪 Page Transitions',
        '🔦 Spotlight Cards',
        '🎉 Pull-to-Refresh Easter Egg',
        '🚫 Custom 404 Page',
    ];

    const codeSnippets = [
        {
            title: 'Parallax Implementation',
            code: `const { scrollYProgress } = useScroll({
  target: ref,
  offset: ["start end", "end start"]
});

const y = useTransform(
  scrollYProgress, 
  [0, 1], 
  [100, -100]
);`
        },
        {
            title: 'Smooth Scroll Setup',
            code: `const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true,
});`
        },
        {
            title: 'Magnetic Button',
            code: `const handleMouseMove = (e) => {
  const distance = e.clientX - centerX;
  x.set(Math.max(-20, Math.min(20, distance * 0.3)));
};`
        }
    ];

    return (
        <AnimatePresence>
            {isDevMode && (
                <motion.div
                    initial={{ x: '100%' }}
                    animate={{ x: 0 }}
                    exit={{ x: '100%' }}
                    transition={{ type: 'spring', damping: 20 }}
                    className="fixed right-0 top-0 h-screen w-full md:w-[500px] bg-black/95 backdrop-blur-xl border-l border-white/10 z-[10001] overflow-y-auto"
                >
                    {/* Header */}
                    <div className="sticky top-0 bg-black/90 backdrop-blur-xl border-b border-white/10 p-6 flex items-center justify-between">
                        <div>
                            <h2 className="text-2xl font-bold text-white">Developer Mode</h2>
                            <p className="text-sm text-white/60">Tech Stack & Implementation</p>
                        </div>
                        <button
                            onClick={toggleDevMode}
                            className="p-2 hover:bg-white/10 rounded-full transition-colors"
                        >
                            <X className="w-6 h-6 text-white" />
                        </button>
                    </div>

                    <div className="p-6 space-y-8">
                        {/* Tech Stack */}
                        <section>
                            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                                <span className="text-2xl">⚙️</span> Tech Stack
                            </h3>
                            <div className="space-y-2">
                                {techStack.map((tech, i) => (
                                    <div key={i} className="p-3 bg-white/5 rounded-lg border border-white/10">
                                        <div className="flex items-center justify-between">
                                            <span className="font-mono text-sm text-white">{tech.name}</span>
                                            <span className="text-xs text-white/40">{tech.version}</span>
                                        </div>
                                        <p className="text-xs text-white/60 mt-1">{tech.purpose}</p>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Features */}
                        <section>
                            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                                <span className="text-2xl">✨</span> Features Implemented
                            </h3>
                            <div className="grid grid-cols-2 gap-2">
                                {features.map((feature, i) => (
                                    <div key={i} className="p-2 bg-white/5 rounded border border-white/10 text-xs text-white/80">
                                        {feature}
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Code Snippets */}
                        <section>
                            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                                <span className="text-2xl">💻</span> Code Snippets
                            </h3>
                            <div className="space-y-4">
                                {codeSnippets.map((snippet, i) => (
                                    <div key={i} className="bg-zinc-900 rounded-lg border border-white/10 overflow-hidden">
                                        <div className="px-3 py-2 bg-white/5 border-b border-white/10">
                                            <p className="text-xs font-mono text-white/80">{snippet.title}</p>
                                        </div>
                                        <pre className="p-3 text-xs text-green-400 font-mono overflow-x-auto">
                                            <code>{snippet.code}</code>
                                        </pre>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Performance */}
                        <section>
                            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                                <span className="text-2xl">⚡</span> Performance
                            </h3>
                            <div className="space-y-2">
                                <div className="p-3 bg-white/5 rounded-lg border border-white/10">
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-white/80">Build Time</span>
                                        <span className="text-sm font-mono text-green-400">~3s</span>
                                    </div>
                                </div>
                                <div className="p-3 bg-white/5 rounded-lg border border-white/10">
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-white/80">Bundle Size</span>
                                        <span className="text-sm font-mono text-green-400">Optimized</span>
                                    </div>
                                </div>
                                <div className="p-3 bg-white/5 rounded-lg border border-white/10">
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-white/80">Framework</span>
                                        <span className="text-sm font-mono text-blue-400">Next.js 16</span>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
