'use client';

import { useEffect } from 'react';

export default function ScrollToTop() {
    useEffect(() => {
        // Prevent browser from restoring scroll position automatically
        if (history.scrollRestoration) {
            history.scrollRestoration = 'manual';
        }

        // Force scroll to top
        window.scrollTo(0, 0);

        // Clean URL hash (remove #ecosystem etc.) without reloading
        if (window.location.hash) {
            window.history.replaceState(null, '', window.location.pathname);
        }
    }, []);

    return null;
}
