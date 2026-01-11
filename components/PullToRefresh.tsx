'use client';

import { useEffect, useState } from 'react';

export default function PullToRefresh() {
    const [pullDistance, setPullDistance] = useState(0);
    const [showConfetti, setShowConfetti] = useState(false);
    const [startY, setStartY] = useState(0);

    useEffect(() => {
        let isAtTop = true;

        const handleTouchStart = (e: TouchEvent) => {
            if (window.scrollY === 0) {
                isAtTop = true;
                setStartY(e.touches[0].clientY);
            } else {
                isAtTop = false;
            }
        };

        const handleTouchMove = (e: TouchEvent) => {
            if (!isAtTop) return;

            const currentY = e.touches[0].clientY;
            const distance = currentY - startY;

            if (distance > 0 && distance < 150) {
                setPullDistance(distance);
            }
        };

        const handleTouchEnd = () => {
            if (pullDistance > 100) {
                // Trigger confetti!
                setShowConfetti(true);
                setTimeout(() => setShowConfetti(false), 3000);
            }
            setPullDistance(0);
        };

        document.addEventListener('touchstart', handleTouchStart);
        document.addEventListener('touchmove', handleTouchMove);
        document.addEventListener('touchend', handleTouchEnd);

        return () => {
            document.removeEventListener('touchstart', handleTouchStart);
            document.removeEventListener('touchmove', handleTouchMove);
            document.removeEventListener('touchend', handleTouchEnd);
        };
    }, [pullDistance, startY]);

    const [confettiItems, setConfettiItems] = useState<{ left: string, delay: string, duration: string, char: string }[]>([]);

    useEffect(() => {
        if (showConfetti) {
            const items = Array.from({ length: 50 }).map(() => ({
                left: `${Math.random() * 100}%`,
                delay: `${Math.random() * 0.5}s`,
                duration: `${1 + Math.random() * 2}s`,
                char: ['🎉', '✨', '🎊', '⭐', '💫'][Math.floor(Math.random() * 5)]
            }));
            setConfettiItems(items);
        } else {
            setConfettiItems([]);
        }
    }, [showConfetti]);

    // ... (touch logic remains same)

    return (
        <>
            {/* Pull indicator */}
            {pullDistance > 0 && (
                <div
                    className="fixed top-0 left-1/2 -translate-x-1/2 z-[9999] pointer-events-none"
                    style={{
                        transform: `translate(-50%, ${Math.min(pullDistance - 50, 50)}px)`,
                        opacity: Math.min(pullDistance / 100, 1)
                    }}
                >
                    <div className="text-4xl">🎉</div>
                </div>
            )}

            {/* Confetti effect */}
            {showConfetti && (
                <div className="fixed inset-0 z-[9999] pointer-events-none">
                    {confettiItems.map((item, i) => (
                        <div
                            key={i}
                            className="absolute text-2xl animate-bounce"
                            style={{
                                left: item.left,
                                top: '-50px',
                                animation: `fall ${item.duration} linear forwards`,
                                animationDelay: item.delay
                            }}
                        >
                            {item.char}
                        </div>
                    ))}
                </div>
            )}

            <style jsx>{`
                @keyframes fall {
                    to {
                        transform: translateY(100vh) rotate(360deg);
                        opacity: 0;
                    }
                }
            `}</style>
        </>
    );
}
