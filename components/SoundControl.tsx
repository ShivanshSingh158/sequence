'use client';

import { useState, useEffect, useCallback } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

// --- Sound Synthesis Engine ---
// We create simple oscillators to avoid loading external mp3s
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

    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

    gain.gain.setValueAtTime(vol, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + duration);

    osc.connect(gain);
    gain.connect(masterGain);

    osc.start();
    osc.stop(audioCtx.currentTime + duration);
};

export const playHoverSound = () => {
    // Subtle high-pitch "flick"
    playTone(800, 'sine', 0.05, 0.05);
};

export const playClickSound = () => {
    // Sharp click
    playTone(600, 'triangle', 0.1, 0.1);
};

export default function SoundControl() {
    const [isMuted, setIsMuted] = useState(false);
    const [hasInteracted, setHasInteracted] = useState(false);

    // Initialize audio on first click (browser policy)
    const toggleMute = () => {
        if (!hasInteracted) {
            initAudio();
            setHasInteracted(true);
        }

        if (masterGain) {
            masterGain.gain.setValueAtTime(isMuted ? 1 : 0, audioCtx!.currentTime);
        }
        setIsMuted(!isMuted);
    };

    // Attach global listeners for UI sounds
    useEffect(() => {
        if (!hasInteracted || isMuted) return;

        const handleMouseEnter = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (target.closest('a') || target.closest('button') || target.classList.contains('cursor-pointer')) {
                playHoverSound();
            }
        };

        const handleClick = () => {
            playClickSound();
        };

        document.addEventListener('mouseover', handleMouseEnter);
        document.addEventListener('click', handleClick);

        return () => {
            document.removeEventListener('mouseover', handleMouseEnter);
            document.removeEventListener('click', handleClick);
        };
    }, [hasInteracted, isMuted]);

    return (
        <button
            onClick={toggleMute}
            className="fixed bottom-8 right-8 z-50 p-4 bg-white/10 backdrop-blur-md border border-white/10 rounded-full text-white/50 hover:text-white hover:bg-white/20 transition-all duration-300 group"
        >
            {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}

            <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 px-3 py-1 bg-black/80 text-white text-xs rounded opacity-0 group-hover:opacity-100 whitespace-nowrap transition-opacity pointer-events-none">
                {isMuted ? "Unmute UI Sounds" : "Mute UI Sounds"}
            </span>
        </button>
    );
}
