'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function AgencyIntro() {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    // Parallax transforms - different speeds for depth
    const badgeY = useTransform(scrollYProgress, [0, 1], [100, -100]);
    const headlineY = useTransform(scrollYProgress, [0, 1], [50, -50]);
    const subtextY = useTransform(scrollYProgress, [0, 1], [30, -30]);

    return (
        <section ref={ref} className="relative w-full py-32 px-6 flex flex-col items-center justify-center text-center bg-[#121212] z-10">

            <div className="flex flex-col md:flex-row gap-6 mb-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    style={{ y: badgeY }}
                    className="p-[1px] rounded-full bg-gradient-to-r from-green-500 via-emerald-400 to-green-600 box-decoration-clone"
                >
                    <div className="px-8 py-3 rounded-full bg-[#121212]">
                        <span className="text-base md:text-lg font-bold tracking-[0.2em] text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-green-200 to-emerald-600 drop-shadow-[0_0_10px_rgba(34,197,94,0.4)] uppercase">
                            Founder @ ChargeBrize
                        </span>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    style={{ y: badgeY }}
                    className="p-[1px] rounded-full bg-gradient-to-r from-orange-500 via-amber-400 to-orange-600 box-decoration-clone"
                >
                    <div className="px-8 py-3 rounded-full bg-[#121212]">
                        <span className="text-base md:text-lg font-bold tracking-[0.2em] text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-200 to-orange-600 drop-shadow-[0_0_10px_rgba(249,115,22,0.4)] uppercase">
                            Co-Founder @ RoadSathi
                        </span>
                    </div>
                </motion.div>
            </div>

            <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                style={{ y: headlineY }}
                className="max-w-7xl text-6xl md:text-8xl font-bold text-white tracking-tight mb-10 leading-[1.1]"
            >
                Building <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-green-200 to-emerald-600 drop-shadow-[0_0_20px_rgba(34,197,94,0.6)]">Low-Asset Charging Infrastructure</span> <br />
                Across All of India.
            </motion.h2>

            <motion.p
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                style={{ y: subtextY }}
                className="max-w-4xl text-2xl md:text-3xl text-gray-400 leading-relaxed font-light"
            >
                Pioneering the future of EV mobility with scalable, accessible, and efficient energy solutions
                that empower communities and drive sustainable growth.
            </motion.p>

        </section>
    );
}
