'use client';

import { useEffect, useRef, useState } from 'react';

export default function TypingSounds() {
    const [isEnabled, setIsEnabled] = useState(true);
    const audioContext = useRef<AudioContext | null>(null);

    useEffect(() => {
        if (typeof window === 'undefined') return;
        audioContext.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }, []);

    const playKeySound = (frequency: number) => {
        if (!isEnabled || !audioContext.current) return;

        const ctx = audioContext.current;
        const oscillator = ctx.createOscillator();
        const gainNode = ctx.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(ctx.destination);

        oscillator.frequency.value = frequency;
        oscillator.type = 'square';

        gainNode.gain.setValueAtTime(0.1, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);

        oscillator.start(ctx.currentTime);
        oscillator.stop(ctx.currentTime + 0.1);
    };

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            // Different frequencies for different key types
            let freq = 400;
            if (e.key === ' ') freq = 300;
            else if (e.key === 'Enter') freq = 500;
            else if (e.key === 'Backspace') freq = 250;
            else freq = 350 + Math.random() * 100;

            playKeySound(freq);
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [isEnabled]);

    return (
        <button
            onClick={() => setIsEnabled(!isEnabled)}
            className="fixed bottom-24 right-8 z-[100] p-3 backdrop-blur-md border border-white/10 rounded-full hover:bg-white/20 transition-all"
            title={isEnabled ? 'Disable typing sounds' : 'Enable typing sounds'}
        >
            <span className="text-xl">{isEnabled ? '🔊' : '🔇'}</span>
        </button>
    );
}
