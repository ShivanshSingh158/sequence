'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    life: number;
    maxLife: number;
    color: string;
}

interface Node {
    x: number;
    y: number;
    size: number;
    baseSize: number;
    active: boolean;
    pulse: number;
    charge: number; // 0 to 1
}

export default function CircuitGrid() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    // Shockwave State
    const shockwaveRef = useRef({ active: false, radius: 0, opacity: 0 });

    useEffect(() => {
        const canvas = canvasRef.current;
        const container = containerRef.current;
        if (!canvas || !container) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = container.clientWidth;
        let height = container.clientHeight;

        const resize = () => {
            width = container.clientWidth;
            height = container.clientHeight;
            const dpr = window.devicePixelRatio || 1;
            canvas.width = width * dpr;
            canvas.height = height * dpr;
            ctx.setTransform(1, 0, 0, 1, 0, 0);
            ctx.scale(dpr, dpr);
            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;

            // Re-init nodes if grid dimensions change
            initNodes();
        };

        window.addEventListener('resize', resize);
        setTimeout(resize, 100); // Force check after mount layout

        // Grid Configuration
        const gridSize = 40;
        const nodes: Node[] = [];
        const particles: Particle[] = [];
        let mouseX = 0;
        let mouseY = 0;
        let isHovering = false;

        // Initialize Nodes
        const initNodes = () => {
            nodes.length = 0;
            const cols = Math.floor(width / gridSize);
            const rows = Math.floor(height / gridSize);

            for (let i = 0; i < cols; i++) {
                for (let j = 0; j < rows; j++) {
                    if ((i % 4 === 0 && j % 3 === 0) || Math.random() > 0.92) {
                        nodes.push({
                            x: i * gridSize + gridSize / 2,
                            y: j * gridSize + gridSize / 2,
                            size: Math.random() * 2 + 1.5,
                            baseSize: Math.random() * 2 + 1.5,
                            active: false,
                            pulse: 0,
                            charge: 0
                        });
                    }
                }
            }
        };

        const handleClick = () => {
            // Trigger EMP
            shockwaveRef.current = { active: true, radius: 0, opacity: 1 };
        };

        container.addEventListener('click', handleClick);
        initNodes();

        // Helper: Draw Lightning Arc (Recursive Displacement)
        const drawLightning = (x1: number, y1: number, x2: number, y2: number, intense: boolean) => {
            const dx = x2 - x1;
            const dy = y2 - y1;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 5) return; // Too short

            const segments = Math.floor(dist / 10);
            if (segments === 0) return;

            ctx.beginPath();
            ctx.moveTo(x1, y1);

            let curX = x1;
            let curY = y1;

            // Generate jittery path
            for (let i = 1; i < segments; i++) {
                const t = i / segments;
                const nextX = x1 + dx * t;
                const nextY = y1 + dy * t;

                // Jitter amount based on intensity
                const jitter = intense ? (Math.random() - 0.5) * 15 : (Math.random() - 0.5) * 4;

                // Perpendicular jitter
                const perpX = -dy / dist * jitter;
                const perpY = dx / dist * jitter;

                curX = nextX + perpX;
                curY = nextY + perpY;
                ctx.lineTo(curX, curY);
            }

            ctx.lineTo(x2, y2);
            ctx.stroke();
        };

        // Animation Loop
        const animate = () => {
            // Semi-transparent clear for trail effect? No, clean redraw for sharpness.
            ctx.fillStyle = '#050505';
            ctx.fillRect(0, 0, width, height);

            // 1. Draw Faint Background Grid
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)'; // Increased visibility
            ctx.lineWidth = 1;
            ctx.beginPath();
            for (let x = gridSize / 2; x < width; x += gridSize) {
                ctx.moveTo(x, 0); ctx.lineTo(x, height);
            }
            for (let y = gridSize / 2; y < height; y += gridSize) {
                ctx.moveTo(0, y); ctx.lineTo(width, y);
            }
            ctx.stroke();

            // 2. Handle EMP Shockwave
            if (shockwaveRef.current.active) {
                const wave = shockwaveRef.current;
                wave.radius += 20; // Fast expansion
                wave.opacity -= 0.02;

                if (wave.opacity <= 0) {
                    wave.active = false;
                } else {
                    // Draw Shockwave Ring
                    ctx.beginPath();
                    ctx.arc(mouseX, mouseY, wave.radius, 0, Math.PI * 2);
                    ctx.strokeStyle = `rgba(56, 189, 248, ${wave.opacity * 0.5})`; // Cyan Pulse
                    ctx.lineWidth = 2 + wave.opacity * 10;
                    ctx.stroke();
                }
            }

            // 3. Logic & Interaction
            nodes.forEach(node => {
                let distToMouse = 9999;
                if (isHovering) {
                    const dx = node.x - mouseX;
                    const dy = node.y - mouseY;
                    distToMouse = Math.sqrt(dx * dx + dy * dy);
                }

                // EMP Hit Logic
                if (shockwaveRef.current.active) {
                    const distToWave = Math.abs(distToMouse - shockwaveRef.current.radius);
                    if (distToWave < 50) {
                        node.charge = 1; // Instant Full Charge
                    }
                }

                // Mouse Proximity Charge
                if (distToMouse < 250) {
                    node.charge = Math.min(node.charge + 0.1, 1);
                } else {
                    node.charge = Math.max(node.charge - 0.02, 0);
                }

                // Pulsing Logic based on Charge
                node.pulse += 0.05 + (node.charge * 0.2); // Faster pulse when charged
            });

            // 4. Draw Connections (Lightning Arcs)
            nodes.forEach((node, i) => {
                if (node.charge > 0.1) {
                    for (let j = i + 1; j < nodes.length; j++) {
                        const other = nodes[j];
                        if (other.charge > 0.1) {
                            const dx = node.x - other.x;
                            const dy = node.y - other.y;
                            const dist = Math.sqrt(dx * dx + dy * dy);

                            if (dist < gridSize * 4.5) {
                                // Intensity based on combined charge
                                const intensity = (node.charge + other.charge) / 2;
                                ctx.shadowBlur = intensity * 15;
                                ctx.shadowColor = intensity > 0.8 ? '#38bdf8' : '#a855f7'; // Cyan to Purple
                                ctx.strokeStyle = intensity > 0.8
                                    ? `rgba(200, 230, 255, ${intensity})` // White-hot
                                    : `rgba(168, 85, 247, ${intensity * 0.8})`; // Purple base

                                ctx.lineWidth = intensity * 1.5;

                                // Only draw lightning if highly charged, else simple line
                                if (intensity > 0.6) {
                                    drawLightning(node.x, node.y, other.x, other.y, intensity > 0.9);
                                } else {
                                    ctx.beginPath();
                                    ctx.moveTo(node.x, node.y);
                                    ctx.lineTo(other.x, other.y);
                                    ctx.stroke();
                                }

                                ctx.shadowBlur = 0; // Reset
                            }
                        }
                    }
                }
            });

            // 5. Draw Nodes
            nodes.forEach(node => {
                const pulseSize = Math.sin(node.pulse) * 3; // Breathe
                const size = node.baseSize + (node.charge * 4) + pulseSize;

                ctx.beginPath();
                ctx.arc(node.x, node.y, size, 0, Math.PI * 2);

                if (node.charge > 0.8) {
                    ctx.fillStyle = '#ffffff'; // White Core (Overcharged)
                    ctx.shadowBlur = 20;
                    ctx.shadowColor = '#38bdf8'; // Cyan Glow
                } else if (node.charge > 0.3) {
                    ctx.fillStyle = '#a855f7'; // Purple Active
                    ctx.shadowBlur = 10;
                    ctx.shadowColor = '#a855f7';
                } else {
                    ctx.fillStyle = 'rgba(255,255,255,0.3)'; // VISIBLE Dormant State
                }

                ctx.fill();
                ctx.shadowBlur = 0;
            });

            requestAnimationFrame(animate);
        };

        const animId = requestAnimationFrame(animate);

        const onMouseMove = (e: MouseEvent) => {
            const rect = container.getBoundingClientRect();
            mouseX = e.clientX - rect.left;
            mouseY = e.clientY - rect.top;
            isHovering = true;
        };

        const onMouseLeave = () => {
            isHovering = false;
        };

        container.addEventListener('mousemove', onMouseMove);
        container.addEventListener('mouseleave', onMouseLeave);

        return () => {
            cancelAnimationFrame(animId);
            window.removeEventListener('resize', resize);
            container.removeEventListener('mousemove', onMouseMove);
            container.removeEventListener('mouseleave', onMouseLeave);
            container.removeEventListener('click', handleClick);
        };
    }, []);

    return (
        <section className="relative w-full h-[70vh] bg-[#050505] overflow-hidden flex flex-col items-center justify-center cursor-crosshair">
            <div className="absolute top-12 text-center z-10 pointer-events-none px-4 mix-blend-screen">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    className="inline-block px-3 py-1 mb-4 rounded-full border border-cyan-500/30 bg-cyan-500/10 backdrop-blur-sm"
                >
                    <span className="text-xs font-mono text-cyan-400 tracking-widest uppercase">
                        High Voltage System
                    </span>
                </motion.div>

                <motion.h3
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-4xl md:text-6xl font-black text-white mb-2 tracking-tight drop-shadow-[0_0_20px_rgba(56,189,248,0.5)]"
                >
                    THE GRID
                </motion.h3>

                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-white/70 max-w-xl mx-auto text-sm md:text-base leading-relaxed"
                >
                    Visualizing the raw power of connectivity.
                    <span className="text-cyan-400 font-bold mx-1">Click to Surge.</span>
                    Drag to Charge.
                    <br />
                    <span className="opacity-50 text-[10px] uppercase tracking-widest mt-4 block">
                        Simulation: 99.9% Load
                    </span>
                </motion.p>
            </div>

            <div ref={containerRef} className="absolute inset-0 w-full h-full">
                <canvas ref={canvasRef} className="block w-full h-full" />
            </div>

            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black via-black/80 to-transparent pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none" />
        </section>
    );
}
