'use client';

import { useLayoutEffect } from 'react';

export default function ScrollToTop() {
    useLayoutEffect(() => {
        // 1. Set scroll restoration to manual immediately
        if ('scrollRestoration' in history) {
            history.scrollRestoration = 'manual';
        }

        // 2. Force scroll to top
        window.scrollTo(0, 0);

        // 3. Backup: Attempt again after a short delay to handle any hydration layout shifts
        const timeout = setTimeout(() => {
            window.scrollTo(0, 0);
        }, 50);

        return () => clearTimeout(timeout);
    }, []);

    return null;
}
