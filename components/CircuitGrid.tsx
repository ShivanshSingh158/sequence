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
    active: boolean;
    pulse: number;
}

export default function CircuitGrid() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

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
            ctx.scale(dpr, dpr);
            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;
        };

        window.addEventListener('resize', resize);
        resize();

        // Grid Configuration
        const gridSize = 40;
        const nodes: Node[] = [];
        const particles: Particle[] = [];
        let mouseX = 0;
        let mouseY = 0;
        let isHovering = false;

        // Initialize Nodes (Substations)
        const initNodes = () => {
            nodes.length = 0;
            const cols = Math.floor(width / gridSize);
            const rows = Math.floor(height / gridSize);

            for (let i = 0; i < cols; i++) {
                for (let j = 0; j < rows; j++) {
                    // Create a structured grid pattern, not random
                    if ((i % 4 === 0 && j % 3 === 0) || Math.random() > 0.92) {
                        nodes.push({
                            x: i * gridSize + gridSize / 2,
                            y: j * gridSize + gridSize / 2,
                            size: Math.random() * 2 + 1.5,
                            active: false,
                            pulse: 0
                        });
                    }
                }
            }
        };

        initNodes();

        // Animation Loop
        const animate = () => {
            ctx.fillStyle = '#0a0a0a'; // Very dark grey background
            ctx.fillRect(0, 0, width, height);

            // Draw Grid Lines (Faint Engineering Grid)
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
            ctx.lineWidth = 1;
            ctx.beginPath();

            for (let x = gridSize / 2; x < width; x += gridSize) {
                ctx.moveTo(x, 0);
                ctx.lineTo(x, height);
            }
            for (let y = gridSize / 2; y < height; y += gridSize) {
                ctx.moveTo(0, y);
                ctx.lineTo(width, y);
            }
            ctx.stroke();

            // Interact with Mouse
            if (isHovering) {
                // Spawn "Current" particles
                if (Math.random() > 0.4) {
                    particles.push({
                        x: mouseX,
                        y: mouseY,
                        vx: (Math.random() - 0.5) * 4,
                        vy: (Math.random() - 0.5) * 4,
                        life: 0,
                        maxLife: 50,
                        color: Math.random() > 0.5 ? '#fbbf24' : '#34d399' // Amber/Emerald
                    });
                }

                // Energize nearby nodes
                nodes.forEach(node => {
                    const dx = node.x - mouseX;
                    const dy = node.y - mouseY;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < 200) {
                        node.active = true;
                        node.pulse = Math.min(node.pulse + 0.05, 1);
                    } else {
                        node.active = false;
                        node.pulse = Math.max(node.pulse - 0.02, 0);
                    }
                });
            } else {
                nodes.forEach(node => {
                    node.active = false;
                    node.pulse = Math.max(node.pulse - 0.02, 0);
                });
            }

            // Draw Nodes (Substations)
            nodes.forEach(node => {
                ctx.beginPath();
                ctx.arc(node.x, node.y, node.size + node.pulse * 2, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(34, 197, 94, ${0.1 + node.pulse * 0.5})`; // Base glow
                ctx.fill();

                if (node.pulse > 0.01) {
                    // Core
                    ctx.beginPath();
                    ctx.arc(node.x, node.y, node.size, 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(34, 197, 94, ${0.4 + node.pulse * 0.6})`;
                    ctx.fill();

                    // Expanding Ring (Field)
                    ctx.beginPath();
                    ctx.arc(node.x, node.y, node.size + node.pulse * 8, 0, Math.PI * 2);
                    ctx.strokeStyle = `rgba(34, 197, 94, ${node.pulse * 0.2})`;
                    ctx.stroke();
                }
            });

            // Update and Draw Particles (Electron Flow)
            for (let i = particles.length - 1; i >= 0; i--) {
                const p = particles[i];
                p.x += p.vx;
                p.y += p.vy;
                p.life++;

                // Circuit Trace Physics (Snap to 90 degrees)
                const modX = p.x % gridSize;
                const modY = p.y % gridSize;
                if (Math.abs(modX - gridSize / 2) < 4) {
                    p.vx = 0;
                    p.vy = Math.sign(p.vy || 1) * 2;
                } else if (Math.abs(modY - gridSize / 2) < 4) {
                    p.vy = 0;
                    p.vx = Math.sign(p.vx || 1) * 2;
                }

                ctx.fillStyle = p.color;
                ctx.globalAlpha = Math.max(0, 1 - p.life / p.maxLife);
                ctx.beginPath();
                ctx.arc(p.x, p.y, 1.2, 0, Math.PI * 2);
                ctx.fill();
                ctx.globalAlpha = 1;

                if (p.life > p.maxLife) particles.splice(i, 1);
            }

            // Draw Connections (Transmission Lines)
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            for (let i = 0; i < nodes.length; i++) {
                if (nodes[i].pulse > 0.2) {
                    for (let j = i + 1; j < nodes.length; j++) {
                        if (nodes[j].pulse > 0.2) {
                            const dx = nodes[i].x - nodes[j].x;
                            const dy = nodes[i].y - nodes[j].y;
                            const dist = Math.sqrt(dx * dx + dy * dy);

                            // Visualize Load Balancing
                            if (dist < gridSize * 3.5) {
                                ctx.strokeStyle = `rgba(251, 191, 36, ${Math.min(nodes[i].pulse, nodes[j].pulse) * 0.4})`; // Amber
                                ctx.moveTo(nodes[i].x, nodes[i].y);
                                ctx.lineTo(nodes[j].x, nodes[j].y);
                            }
                        }
                    }
                }
            }
            ctx.stroke();

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
        };
    }, []);

    return (
        <section className="relative w-full h-[60vh] bg-[#0a0a0a] overflow-hidden flex flex-col items-center justify-center">
            <div className="absolute top-12 text-center z-10 pointer-events-none px-4 mix-blend-screen">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    className="inline-block px-3 py-1 mb-4 rounded-full border border-green-500/30 bg-green-500/10 backdrop-blur-sm"
                >
                    <span className="text-xs font-mono text-green-400 tracking-widest uppercase">
                        System Status: Online
                    </span>
                </motion.div>

                <motion.h3
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-4xl md:text-5xl font-bold text-white mb-2 tracking-tight"
                >
                    Decentralized Power Grid
                </motion.h3>

                <div className="h-px w-24 bg-gradient-to-r from-transparent via-green-500 to-transparent mx-auto my-6" />

                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-white/70 max-w-xl mx-auto text-sm md:text-base leading-relaxed"
                >
                    Visualizing the backbone of <span className="text-white font-medium">ChargeBrize</span>.
                    Simulating load-balancing and energy distribution across a high-efficiency network.
                    <br />
                    <span className="text-green-400 mt-2 block font-mono text-xs opacity-80">
                        [ MOVE CURSOR TO TEST CONNECTIVITY ]
                    </span>
                </motion.p>
            </div>

            <div ref={containerRef} className="absolute inset-0 w-full h-full">
                <canvas ref={canvasRef} className="block w-full h-full" />
            </div>

            {/* Fade gradients specifically for blending */}
            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black via-black/80 to-transparent pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none" />
        </section>
    );
}
