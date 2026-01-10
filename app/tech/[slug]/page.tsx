'use client';

import { useParams, notFound } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

// --- DATA ---
const technologies: Record<string, {
    title: string;
    subtitle: string;
    theme: string; // Tailwind color class for text/gradients
    gradient: string; // The specific gradient used in cards
    vision: string[];
    engineering: string[];
    stack: string[];
}> = {
    "chargebrize": {
        title: "ChargeBrize",
        subtitle: "Democratizing EV Infrastructure",
        theme: "green-500",
        gradient: "from-green-500 to-emerald-700",
        vision: [
            "The biggest hurdle to EV adoption isn't the cars—it's the chargers. Traditional charging stations are expensive, bulky, and require massive grid upgrades. we asked a different question: What if every socket could be a station?",
            "ChargeBrize isn't just a network; it's a protocol for decentralized energy. We empower small business owners, parking lots, and even homeowners to monetize their electricity without a massive upfront investment. use What you have, charge what you want."
        ],
        engineering: [
            "We built a lightweight, hardware-agnostic platform. The core challenge was trust—how do you verify a session on a standard socket? We solved this by developing a handshake protocol between our mobile app and encrypted IoT smart plugs.",
            "The backend runs on a high-concurrency Node.js cluster capable of handling thousands of socket 'heartbeats' per second. We use Websockets for real-time state management, ensuring that when you plug in, the app knows instantly."
        ],
        stack: ["Next.js", "Node.js", "WebSockets", "TimescaleDB"]
    },
    "iot-smart-plugs": {
        title: "IoT Smart Plugs",
        subtitle: "The Hardware Bridge",
        theme: "emerald-400",
        gradient: "from-emerald-500 to-teal-700",
        vision: [
            "Hardware is hard, but it's the only way to bridge the physical gap. We didn't want to rely on third-party smart plugs that could be hacked or bricked. We needed total control over the firmware.",
            "Our custom-designed plugs aren't just switches; they are energy meters. They measure voltage, amperage, and power factor in real-time, giving users granular data on their consumption down to the millisecond."
        ],
        engineering: [
            "We wrote custom firmware in C++ for the ESP32 microcontroller architecture. The focus was on resilience. The device stores charging data locally if the Wi-Fi drops and syncs it back when connectivity is restored, ensuring no revenue is lost.",
            "Security is paramount. Each plug has a unique crypto-chip for identity verification. We implemented Mutual TLS (mTLS) to ensure that only our server can talk to the plug, preventing man-in-the-middle attacks."
        ],
        stack: ["C++", "ESP32", "MQTT", "mTLS"]
    },
    "ai-load-balancing": {
        title: "AI Load Balancing",
        subtitle: "Optimizing the Grid",
        theme: "teal-400",
        gradient: "from-teal-500 to-cyan-700",
        vision: [
            "When ten cars plug in at once, the lights shouldn't flicker. But in many older buildings, they do. The grid wasn't designed for the EV revolution.",
            "Our AI doesn't just react to overloads; it predicts them. By analyzing usage patterns, we can dynamically throttle charging speeds across a cluster of chargers, ensuring the building's main breaker never trips while maximizing throughput."
        ],
        engineering: [
            "We trained a Reinforcement Learning model using historical load data. The model treats power distribution as a resource allocation game, constantly solving for 'Maximum Satisfaction' without violating 'Max Ampacity'.",
            "The system operates on the Edge. We use a hybrid architecture where critical safety logic runs locally on a gateway, while long-term optimization strategies are computed in the cloud and pushed down periodically."
        ],
        stack: ["Python", "TensorFlow", "Redis", "Edge Computing"]
    },
    "roadsathi": {
        title: "RoadSathi",
        subtitle: "Uber for Mechanics",
        theme: "orange-500",
        gradient: "from-orange-500 to-amber-700",
        vision: [
            "Getting stranded on an Indian highway is terrifying. You don't know who to call, and help can be hours away. RoadSathi changes that paradigm.",
            "We wanted to create a safety net for every driver. It’s not just about a tow truck; it’s about peace of mind. One tap, and you know exactly who is coming, what it will cost, and when they will arrive."
        ],
        engineering: [
            "Real-time location is non-negotiable. We utilized the Google Maps Platform heavily but built our own layer of 'provider availability' on top. We essentially built a high-frequency trading engine, but for mechanic slots.",
            "Reliability was key. We implemented an offline-first architecture for the driver app because breakdowns often happen in low-network zones. The app queues the SOS request and fires it the millisecond it detects a byte of signal."
        ],
        stack: ["React Native", "Google Maps API", "Firebase", "Node.js"]
    },
    "geospatial-dispatch": {
        title: "Geospatial Dispatch",
        subtitle: "Precision Logistics",
        theme: "amber-400",
        gradient: "from-amber-500 to-yellow-700",
        vision: [
            "Distance is linear; traffic is chaos. Assigning the 'nearest' mechanic 'as the crow flies' is a rookie mistake. A mechanic 5km away might be 20 minutes faster than one 2km away stuck in a jam.",
            "Our dispatch engine understands the pulse of the city. It considers traffic, road conditions, and even the mechanic's specific skill set before making a match."
        ],
        engineering: [
            "We implemented a Quadtree-based spatial index to query available mechanics efficiently. PostGIS was our database of choice for performing complex geometric queries in milliseconds.",
            "On top of that, we run an A* routing algorithm modulated by real-time traffic data streams. It allows us to give drivers an ETA that is genuinely accurate, not just a guess."
        ],
        stack: ["PostGIS", "Golang", "Mapbox", "Redis Geo"]
    },
    "predictive-ai-logic": {
        title: "Predictive AI Logic",
        subtitle: "Diagnostic Intelligence",
        theme: "yellow-500",
        gradient: "from-yellow-500 to-orange-700",
        vision: [
            "The best breakdown is the one that never happens. Cars speak a language of sensors and vibrations long before they fail. We just learned to listen.",
            "This module acts as a digital doctor. By analyzing OBD-II data and user-reported symptoms, we can categorize the severity of a problem instantly, advising the user whether to stop immediately or if they can limp home safely."
        ],
        engineering: [
            "We built an NLP pipeline to process user descriptions ('clunking noise', 'white smoke') and map them to probabilistic mechanical failures. It's like Shazam for engine trouble.",
            "For sensor data, we use anomaly detection algorithms (IsoForest) to flag readings that deviate from the norm for that specific make and model. This runs on a serverless architecture to scale infinitely with demand."
        ],
        stack: ["Python", "NLTK", "Scikit-learn", "AWS Lambda"]
    }
};

export default function TechPage() {
    const params = useParams();
    const slug = params?.slug as string;
    const data = technologies[slug];

    if (!data) return notFound();

    return (
        <main className="w-full min-h-screen bg-[#050505] text-white overflow-hidden selection:bg-white/20">
            {/* Background Ambient Glow */}
            <div className={`fixed -top-[20%] -left-[10%] w-[70vw] h-[70vw] bg-${data.theme} opacity-[0.08] blur-[120px] rounded-full pointer-events-none mix-blend-screen`} />
            <div className={`fixed -bottom-[20%] -right-[10%] w-[70vw] h-[70vw] bg-${data.theme} opacity-[0.05] blur-[100px] rounded-full pointer-events-none mix-blend-screen`} />

            <div className="relative z-10 max-w-5xl mx-auto px-6 py-20">
                {/* Back Button */}
                <Link href="/" className="inline-flex items-center gap-2 text-white/40 hover:text-white transition-colors mb-20 group">
                    <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    <span className="text-sm font-mono uppercase tracking-widest">Back to Ecosystem</span>
                </Link>

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="mb-24"
                >
                    <div className={`inline-block px-4 py-1 rounded-full border border-${data.theme}/30 bg-${data.theme}/10 backdrop-blur-md mb-6`}>
                        <span className={`text-sm font-bold tracking-widest uppercase text-${data.theme} drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]`}>
                            {data.subtitle}
                        </span>
                    </div>

                    <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-8 leading-[0.9]">
                        {data.title}
                    </h1>

                    <div className={`h-1 w-32 bg-gradient-to-r ${data.gradient} rounded-full`} />
                </motion.div>

                {/* Content Grid */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-24">

                    {/* Left Col: Vision + Engineering */}
                    <div className="md:col-span-8 flex flex-col gap-20">
                        {/* Vision Section */}
                        <section>
                            <h2 className="text-3xl font-light text-white/50 mb-8 border-l-2 border-white/10 pl-6">
                                The Vision
                            </h2>
                            <div className="prose prose-xl prose-invert leading-relaxed text-gray-300">
                                {data.vision.map((paragraph, i) => (
                                    <p key={i} className="mb-6">{paragraph}</p>
                                ))}
                            </div>
                        </section>

                        {/* Engineering Section */}
                        <section>
                            <h2 className="text-3xl font-light text-white/50 mb-8 border-l-2 border-white/10 pl-6">
                                How We Built It
                            </h2>
                            <div className="prose prose-xl prose-invert leading-relaxed text-gray-300">
                                {data.engineering.map((paragraph, i) => (
                                    <p key={i} className="mb-6">{paragraph}</p>
                                ))}
                            </div>
                        </section>
                    </div>

                    {/* Right Col: Stack & Quick Info */}
                    <div className="md:col-span-4">
                        <div className="sticky top-24 p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl">
                            <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-white/40 mb-8">
                                Core Stack
                            </h3>
                            <ul className="flex flex-col gap-4">
                                {data.stack.map((item, i) => (
                                    <li key={i} className="flex items-center gap-3 text-lg font-medium">
                                        <div className={`w-2 h-2 rounded-full bg-${data.theme}`} />
                                        {item}
                                    </li>
                                ))}
                            </ul>

                            <div className="mt-12 pt-8 border-t border-white/10">
                                <p className="text-white/60 text-sm italic">
                                    "Innovation is about solving simple problems with complex engineering, to make them simple again."
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </main>
    );
}
