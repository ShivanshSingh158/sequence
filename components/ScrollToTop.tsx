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
    }, []);

    return null;
}
