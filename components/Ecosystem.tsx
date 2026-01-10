'use client';

import { motion } from 'framer-motion';
import React from 'react';
import Image from 'next/image';

interface Product {
    title: string;
    desc: string;
    gradient: string;
    logo: string;
}

const products: Product[] = [
    {
        title: "ChargeBrize",
        desc: "Building a low-asset EV charging network. We leverage IoT smart plugs and AI to turn any standard socket into a monetizable charging station.",
        gradient: "from-green-500 to-emerald-700",
        logo: "/logos/chargebrize.png"
    },
    {
        title: "IoT Smart Plugs",
        desc: "Proprietary hardware with built-in Wi-Fi and metering. Enables remote monitoring and seamless payments for any connected device.",
        gradient: "from-emerald-500 to-teal-700",
        logo: "/logos/iot_smart.png"
    },
    {
        title: "AI Load Balancing",
        desc: "Intelligent grid algorithms that distribute power dynamically, preventing overloads and optimizing energy usage during peak hours.",
        gradient: "from-teal-500 to-cyan-700",
        logo: "/logos/ai_load.png"
    },
    {
        title: "RoadSathi",
        desc: "The 'Uber for Mechanics'. Connecting stranded drivers with nearby roadside assistance in real-time.",
        gradient: "from-orange-500 to-amber-700",
        logo: "/logos/roadsathi.png"
    },
    {
        title: "Geospatial Dispatch",
        desc: "Advanced mapping tech that matches requests to the nearest specialist provider, minimizing ETA and maximizing efficiency.",
        gradient: "from-amber-500 to-yellow-700",
        logo: "/logos/geospatial.png"
    },
    {
        title: "Predictive AI Logic",
        desc: "Analyzing vehicle symptoms and data to offer instant diagnostics and proactive SOS alerts before a breakdown occurs.",
        gradient: "from-yellow-500 to-orange-700",
        logo: "/logos/predictive.png"
    },
];

export default function Ecosystem() {
    return (
        <section className="relative w-full py-32 px-6 bg-[#0a0a0a] z-10 overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="flex items-center gap-4 mb-20"
                >
                    <div className="w-2 h-16 bg-purple-500 rounded-full" />
                    <h2 className="text-5xl md:text-6xl font-bold text-white tracking-tighter">
                        Ventures & Core Technologies
                    </h2>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {products.map((product, index) => (
                        <Flashcard key={index} product={product} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
}

function Flashcard({ product, index }: { product: Product, index: number }) {
    return (
        <div className="group h-[420px] w-full [perspective:1000px]">
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="h-full w-full"
            >
                <div className="relative h-full w-full transition-all duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">

                    {/* --- FRONT FACE (The Pin) --- */}
                    <div className="absolute inset-0 h-full w-full bg-zinc-900/40 backdrop-blur-sm border border-white/5 rounded-3xl [backface-visibility:hidden] flex flex-col items-center justify-center shadow-xl">

                        {/* Floating Logo */}
                        <div className="relative w-32 h-32 mb-8 transition-transform duration-500 group-hover:scale-110">
                            <div className={`absolute inset-0 bg-gradient-to-br ${product.gradient} opacity-20 rounded-full blur-2xl`} />
                            <div className="relative w-full h-full mix-blend-screen">
                                <Image
                                    src={product.logo}
                                    alt={product.title}
                                    fill
                                    className="object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]"
                                />
                            </div>
                        </div>

                        <h3 className="text-3xl font-bold text-white tracking-tight">
                            {product.title}
                        </h3>

                        <div className="absolute bottom-8 text-white/20 text-xs font-mono uppercase tracking-[0.2em]">
                            Hover to Reveal
                        </div>
                    </div>

                    {/* --- BACK FACE (The Flashcard Info) --- */}
                    <div className={`absolute inset-0 h-full w-full rounded-3xl [backface-visibility:hidden] [transform:rotateY(180deg)] bg-gradient-to-br ${product.gradient} p-8 flex flex-col items-center justify-center text-center shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/10`}>

                        <h3 className="text-3xl font-bold text-white mb-6 drop-shadow-lg">
                            {product.title}
                        </h3>

                        <p className="text-white/90 text-lg leading-relaxed font-medium drop-shadow-md">
                            {product.desc}
                        </p>

                        <div className="mt-8 px-6 py-2 bg-white/20 backdrop-blur-md rounded-full border border-white/30 text-white text-sm font-bold tracking-wider uppercase">
                            Learn More
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
