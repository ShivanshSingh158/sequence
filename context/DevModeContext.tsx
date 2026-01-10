'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

type DevModeContextType = {
    isDevMode: boolean;
    toggleDevMode: () => void;
};

const DevModeContext = createContext<DevModeContextType | undefined>(undefined);

export function DevModeProvider({ children }: { children: ReactNode }) {
    const [isDevMode, setIsDevMode] = useState(false);

    const toggleDevMode = () => {
        setIsDevMode(!isDevMode);
    };

    return (
        <DevModeContext.Provider value={{ isDevMode, toggleDevMode }}>
            {children}
        </DevModeContext.Provider>
    );
}

export function useDevMode() {
    const context = useContext(DevModeContext);
    if (!context) throw new Error('useDevMode must be used within DevModeProvider');
    return context;
}
