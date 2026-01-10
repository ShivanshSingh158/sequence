'use client';

import { Suspense, useEffect, useRef } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

function ScrollToTopContent() {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const prevPathname = useRef(pathname);

    useEffect(() => {
        // Did pathname actually change?
        if (prevPathname.current !== pathname) {
            prevPathname.current = pathname; // Update ref

            // On REAL page navigation, scroll to top
            if (!window.location.hash) {
                window.scrollTo(0, 0);
            }
        }

        // Hash clearing logic (Keep this, just don't let it trigger the scroll above)
        if (window.location.hash) {
            const timeout = setTimeout(() => {
                // This replaceState might trigger a re-render, but since 
                // pathname === prevPathname, the block above won't run.
                window.history.replaceState(null, '', window.location.pathname + window.location.search);
            }, 1000); // 1s delay to safeguard

            return () => clearTimeout(timeout);
        }
    }, [pathname, searchParams]);

    return null;
}

export default function ScrollToTop() {
    return (
        <Suspense fallback={null}>
            <ScrollToTopContent />
        </Suspense>
    );
}
