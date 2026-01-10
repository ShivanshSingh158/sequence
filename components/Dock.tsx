'use client';

import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Home, Layers, Clock, Mail } from 'lucide-react';
import Link from 'next/link';

const items = [
    { id: 'home', icon: Home, label: 'Home', href: '/' },
    { id: 'ecosystem', icon: Layers, label: 'Work', href: '/#ecosystem' },
    { id: 'timeline', icon: Clock, label: 'Journey', href: '/#timeline' },
    { id: 'contact', icon: Mail, label: 'Contact', href: '/#contact' },
];

export default function Dock() {
    const mouseX = useMotionValue(Infinity);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            // Show dock after scrolling down 200px
            if (window.scrollY > 200) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 pointer-events-none">
            <AnimatePresence>
                {isVisible && (
                    <motion.div
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 100, opacity: 0 }}
                        transition={{ type: "spring", damping: 20, stiffness: 300 }}
                        className="flex items-end gap-3 px-4 py-3 pb-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl pointer-events-auto"
                        onMouseMove={(e) => mouseX.set(e.pageX)}
                        onMouseLeave={() => mouseX.set(Infinity)}
                    >
                        {items.map((item) => (
                            <DockIcon mouseX={mouseX} key={item.id} {...item} />
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

function DockIcon({ mouseX, icon: Icon, href }: { mouseX: any, icon: any, href: string }) {
    const ref = useRef<HTMLAnchorElement>(null);

    const distance = useTransform(mouseX, (val: number) => {
        const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
        return val - bounds.x - bounds.width / 2;
    });

    const widthSync = useTransform(distance, [-150, 0, 150], [40, 80, 40]);
    const width = useSpring(widthSync, { mass: 0.1, stiffness: 150, damping: 12 });

    return (
        <Link href={href} ref={ref} scroll={false} onClick={(e) => {
            // Manual smooth scroll handling if needed, though Next.js with css smooth scroll usually works.
            // Adding scroll={false} prevents standard jump, letting CSS handle it if hash exists.
            // Actually, for hash links, we want to allow standard behavior or handle it via ScrollToTop

            if (href.startsWith('/#')) {
                const id = href.replace('/#', '');
                const element = document.getElementById(id);
                if (element) {
                    e.preventDefault();
                    element.scrollIntoView({ behavior: 'smooth' });
                    // Update URL cleanly via our ScrollToTop logic? 
                    // Or just let it update and disappear. 
                    // We'll let ScrollToTop handle the cleanup.
                    window.history.pushState(null, '', href);
                }
            }
        }}>
            <motion.div
                style={{ width }}
                className="aspect-square rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center border border-white/5 cursor-pointer relative group"
            >
                <Icon className="w-1/2 h-1/2 text-white/80 group-hover:text-white transition-colors" />
            </motion.div>
        </Link>
    );
}
