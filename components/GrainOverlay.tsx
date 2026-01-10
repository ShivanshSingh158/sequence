'use client';
// Production - Premium + Advanced + Ultimate Creative Features

export default function GrainOverlay() {
    return (
        <div className="fixed inset-0 pointer-events-none z-[9998] mix-blend-overlay opacity-20">
            {/* CSS Animation for noise moving */}
            <style jsx>{`
                @keyframes noise {
                    0%, 100% { transform: translate(0, 0); }
                    10% { transform: translate(-5%, -5%); }
                    20% { transform: translate(-10%, 5%); }
                    30% { transform: translate(5%, -10%); }
                    40% { transform: translate(-5%, 15%); }
                    50% { transform: translate(-10%, 5%); }
                    60% { transform: translate(15%, 0); }
                    70% { transform: translate(0, 10%); }
                    80% { transform: translate(-15%, 0); }
                    90% { transform: translate(10%, 5%); }
                }
                .grain-bg {
                    position: absolute;
                    top: -50%;
                    left: -50%;
                    width: 200%;
                    height: 200%;
                    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.5'/%3E%3C/svg%3E");
                    background-size: 100px 100px; /* Small tile size for tight grain */
                    animation: noise 0.5s steps(5) infinite;
                }
            `}</style>
            <div className="grain-bg" />
        </div>
    );
}
