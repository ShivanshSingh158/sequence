'use client';

import { useState, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

// --- Sound Synthesis Engine ---
const AudioContextClass = typeof window !== 'undefined' ? (window.AudioContext || (window as any).webkitAudioContext) : null;

let audioCtx: AudioContext | null = null;
let masterGain: GainNode | null = null;

const initAudio = () => {
    if (!AudioContextClass) return;
    if (!audioCtx) {
        audioCtx = new AudioContextClass();
        masterGain = audioCtx.createGain();
        masterGain.connect(audioCtx.destination);
    }
    if (audioCtx.state === 'suspended') {
        audioCtx.resume();
    }
};

const playTone = (freq: number, type: 'sine' | 'triangle' | 'square', duration: number, vol: number) => {
    if (!audioCtx || !masterGain) return;

    if (audioCtx.state === 'suspended') {
        audioCtx.resume();
    }

    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

    const now = audioCtx.currentTime;
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(vol, now + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

    osc.connect(gain);
    gain.connect(masterGain);

    osc.start();
    osc.stop(now + duration + 0.1);
};

export const playHoverSound = () => {
    if (!audioCtx || !masterGain) return;
    const now = audioCtx.currentTime;

    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(400, now);
    osc.frequency.exponentialRampToValueAtTime(800, now + 0.1);

    gain.gain.setValueAtTime(0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);

    osc.connect(gain);
    gain.connect(masterGain);

    osc.start();
    osc.stop(now + 0.1);
};

export const playClickSound = () => {
    if (!audioCtx || !masterGain) return;
    const now = audioCtx.currentTime;

    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(300, now);
    osc.frequency.exponentialRampToValueAtTime(50, now + 0.15);

    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);

    osc.connect(gain);
    gain.connect(masterGain);

    osc.start();
    osc.stop(now + 0.15);
};

export const playStartupSound = () => {
    playTone(440, 'sine', 0.5, 0.1);
    setTimeout(() => playTone(554, 'sine', 0.5, 0.1), 100);
    setTimeout(() => playTone(659, 'sine', 0.5, 0.1), 200);
};

export default function SoundControl() {
    const [isMuted, setIsMuted] = useState(true);
    const [hasInteracted, setHasInteracted] = useState(false);

    const toggleMute = () => {
        initAudio();

        const nextStateIsMuted = !isMuted;

        if (masterGain) {
            masterGain.gain.setValueAtTime(nextStateIsMuted ? 0 : 1, audioCtx!.currentTime);
        }

        setIsMuted(nextStateIsMuted);

        if (!nextStateIsMuted && !hasInteracted) {
            setHasInteracted(true);
            playStartupSound();
        }
    };

    useEffect(() => {
        if (isMuted) return;

        const handleMouseEnter = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (target.matches('a, button, input, .cursor-pointer') || target.closest('a, button, .cursor-pointer')) {
                playHoverSound();
            }
        };

        const handleClick = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (target.matches('a, button, input, .cursor-pointer') || target.closest('a, button, .cursor-pointer')) {
                playClickSound();
            }
        };

        document.addEventListener('mouseover', handleMouseEnter);
        document.addEventListener('click', handleClick);

        return () => {
            document.removeEventListener('mouseover', handleMouseEnter);
            document.removeEventListener('click', handleClick);
        };
    }, [isMuted]);

    return (
        <button
            onClick={toggleMute}
            className={`fixed bottom-8 right-8 z-[100] p-4 backdrop-blur-md border rounded-full transition-all duration-300 group
                ${!isMuted
                    ? 'bg-purple-600 border-purple-500 text-white shadow-[0_0_20px_rgba(168,85,247,0.5)]'
                    : 'bg-white/10 border-white/10 text-white/50 hover:bg-white/20 hover:text-white'}
            `}
        >
            {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}

            <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 px-3 py-1 bg-black/80 text-white text-xs rounded opacity-0 group-hover:opacity-100 whitespace-nowrap transition-opacity pointer-events-none border border-white/10">
                {isMuted ? "Unmute Sounds" : "Mute Sounds"}
            </span>
        </button>
    );
}
