'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

type ThemeContextType = {
    isRetro: boolean;
    toggleRetro: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
    const [isRetro, setIsRetro] = useState(false);

    const toggleRetro = () => {
        setIsRetro(!isRetro);
        // Apply retro class to body
        if (!isRetro) {
            document.body.classList.add('retro-mode');
        } else {
            document.body.classList.remove('retro-mode');
        }
    };

    return (
        <ThemeContext.Provider value={{ isRetro, toggleRetro }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (!context) throw new Error('useTheme must be used within ThemeProvider');
    return context;
}
