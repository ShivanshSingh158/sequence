'use client';

import { Suspense, useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

function ScrollToTopContent() {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    useEffect(() => {
        // Logic 1: Reset scroll on normal route changes (unless hash is present)
        if (!window.location.hash) {
            window.scrollTo(0, 0);
        }

        // Logic 2: Clean the URL hash if it exists
        if (window.location.hash) {
            const timeout = setTimeout(() => {
                window.history.replaceState(null, '', window.location.pathname + window.location.search);
            }, 500);

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
