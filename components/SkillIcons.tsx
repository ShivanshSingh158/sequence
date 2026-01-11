import React from 'react';

export const HtmlIcon = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 32 32" className={className} fill="currentColor">
        <path d="M4.66 2.66h22.68l-2.06 22.88L16 30l-9.28-4.46L4.66 2.66zm17.84 4H9.5l.32 4h12.18l-1.04 11.42-5.96 2.88-5.96-2.88-.6-6.62H5.56l.9 10.32L16 26.66l9.54-4.88 1.96-17.12z" />
    </svg>
);

export const CssIcon = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 32 32" className={className} fill="currentColor">
        <path d="M4.66 2.66h22.68l-2.06 22.88L16 30l-9.28-4.46L4.66 2.66zm17.84 4H9.5l.32 4h12.18l-1.04 11.42-5.96 2.88-5.96-2.88-.6-6.62H5.56l.9 10.32L16 26.66l9.54-4.88 1.96-17.12z" transform="matrix(-1 0 0 1 32 0)" />
    </svg>
);

export const ReactIcon = ({ className }: { className?: string }) => (
    <svg viewBox="-11.5 -10.232 23 20.463" className={className} fill="currentColor">
        <circle cx="0" cy="0" r="2.05" />
        <g stroke="currentColor" strokeWidth="1" fill="none">
            <ellipse rx="11" ry="4.2" />
            <ellipse rx="11" ry="4.2" transform="rotate(60)" />
            <ellipse rx="11" ry="4.2" transform="rotate(120)" />
        </g>
    </svg>
);

export const TailwindIcon = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
        <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z" />
    </svg>
);

export const NextIcon = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 180 180" className={className} fill="currentColor">
        <mask height="180" id="mask0_408_134" maskUnits="userSpaceOnUse" width="180" x="0" y="0" style={{ maskType: 'alpha' }}>
            <circle cx="90" cy="90" fill="black" r="90"></circle>
        </mask>
        <g mask="url(#mask0_408_134)">
            <circle cx="90" cy="90" data-circle="true" fill="black" r="90"></circle>
            <path d="M149.508 157.52L69.142 54H54V125.97H66.1136V69.3836L139.999 164.845C143.333 162.614 146.509 160.165 149.508 157.52Z" fill="url(#paint0_linear_408_134)"></path>
            <rect fill="url(#paint1_linear_408_134)" height="72" width="12" x="115" y="54"></rect>
        </g>
        <defs>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_408_134" x1="109" x2="144.5" y1="116.5" y2="160.5">
                <stop stopColor="white"></stop>
                <stop offset="1" stopColor="white" stopOpacity="0"></stop>
            </linearGradient>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint1_linear_408_134" x1="121" x2="120.799" y1="54" y2="106.875">
                <stop stopColor="white"></stop>
                <stop offset="1" stopColor="white" stopOpacity="0"></stop>
            </linearGradient>
        </defs>
    </svg>
);

export const JsIcon = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 32 32" className={className} fill="currentColor">
        <path d="M0 0h32v32H0V0zm27.45 23.48c-1.34 2.26-3.77 3.52-6.52 3.52-5.46 0-8.23-3.66-8.23-9.52v-6.9H9.28v1.36h1.76c.86 0 1.28.36 1.28 1.1v9.2c0 2.22-.84 3.52-3.26 3.52-.84 0-1.72-.24-2.28-.66l-.58 1.48c.84.62 2.12.98 3.32.98 3.58 0 5.6-2.14 5.6-6.04v-.28c.18 3.96 2.8 6.04 6.7 6.04 3.08 0 5.92-1.6 7.24-4.52l-1.61-2.28z" />
        <text x="18" y="16" fontSize="12" fill="black" fontWeight="bold">JS</text>
    </svg>
);

export const TsIcon = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 128 128" className={className} fill="currentColor">
        <path d="M2.21,2.21H125.79V125.79H2.21V2.21ZM68.61,64.24H57.4V102H41V109.8H85V102H68.61V64.24ZM109.8,110.4c6.6,0,11.2-3.4,11.2-10,0-5.2-3.2-8-9.4-10.6l-5-2.2c-2.4-1-4-2-4-4.6,0-2.2,1.8-3.6,5-3.6a18.06,18.06,0,0,1,10.6,3.6L122,76c-4-3.4-8.8-5-14.4-5-7.6,0-12.8,4.2-12.8,11.4,0,5.6,3.4,8.8,10,11.6l4.6,2c2.8,1.2,3.8,2.4,3.8,4.6,0,2.6-2.4,4-6,4-3.6,0-8.2-2-12.2-5.2l-3.8,7.2C96.2,109.2,102.6,110.4,109.8,110.4Z" />
    </svg>
);

export const NodeIcon = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 32 32" className={className} fill="currentColor">
        <path d="M4.6 21.6 15 27.6a2 2 0 0 0 2 0l10.4-6a2 2 0 0 0 1-1.7V8a2 2 0 0 0-1-1.7L17 0.4a2 2 0 0 0-2 0L4.6 6.3A2 2 0 0 0 3.6 8v11.9a2 2 0 0 0 1 1.7zm24-12.7L18.3 15v11.8l10.3-6zM5.5 8.9 16 15l10.5-6.1L16 2.7 5.5 8.9zm0 1.2L16 16.2v11.6L5.5 21.8Z" />
    </svg>
);

export const MongoIcon = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
        <path d="M17.193 10.057c.224 0 .386-.175.362-.362-.125-.797-.884-1.393-1.685-1.393-1.42 0-2.368 1.196-2.368 1.196s-1.047-1.196-2.438-1.196c-.733 0-1.46.545-1.62 1.39-.02.19.141.365.37.365.2 0 .363-.146.402-.34.113-.564.577-.88 1.11-.88.943 0 1.75 1.05 2.176 1.932V10.057h-.362c-1.353 0-2.45.986-2.45 2.2s1.097 2.2 2.45 2.2h.362v-2.06c.003-1.095 1.838-1.095 1.838 0v2.06h.362c1.352 0 2.45-.986 2.45-2.2s-1.098-2.2-2.45-2.2h-.362V10.057zm-4.04 8.783c.245 2.152-1.776 5.16-1.127 5.16.65 0-1.328-3.008-1.082-5.16h2.21z" />
    </svg>
);
