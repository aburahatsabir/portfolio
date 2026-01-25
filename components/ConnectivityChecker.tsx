import React, { useEffect, useState } from 'react';

const ConnectivityChecker: React.FC = () => {
    const [status, setStatus] = useState<'checking' | 'blocked' | 'connected'>('checking');

    useEffect(() => {
        const checkConnection = async () => {
            // Test 1: Check if object exists
            if (typeof window !== 'undefined' && (window as any).google_tag_manager && (window as any).google_tag_manager['G-BGM02GLZ84']) {
                setStatus('connected');
                return;
            }

            // Test 2: Active Network Check
            try {
                const response = await fetch('https://www.googletagmanager.com/gtag/js?id=G-BGM02GLZ84', {
                    method: 'HEAD',
                    mode: 'no-cors' // We can't read status in no-cors, but we can catch network errors
                });
                // If we get here in no-cors, it wasn't blocked by network, but maybe script execution failed
                setStatus('execution_failed');
            } catch (e) {
                // Fetch failed completely - this is a network block (AdBlock)
                setStatus('blocked');
            }
        };

        const timer = setTimeout(checkConnection, 2000);
        return () => clearTimeout(timer);
    }, []);

    if (status === 'connected') return null;

    return (
        <div className="fixed bottom-4 left-4 z-50 p-4 bg-red-900/95 text-white border-2 border-red-500 rounded-lg shadow-2xl max-w-sm backdrop-blur">
            <h3 className="font-bold text-lg mb-2 flex items-center">
                <span className="text-2xl mr-2">🚫</span>
                Analytics Error
            </h3>

            {status === 'blocked' && (
                <>
                    <p className="text-sm mb-2 font-bold text-red-200">Network Request Blocked</p>
                    <p className="text-xs">Your browser or network blocked the connection to Google.</p>
                </>
            )}

            {status === 'execution_failed' && (
                <>
                    <p className="text-sm mb-2 font-bold text-yellow-200">Script Loaded but Failed</p>
                    <p className="text-xs">The script was downloaded but GTM did not initialize. This is rare.</p>
                </>
            )}

            {status === 'checking' && <p>Checking connection...</p>}

            <div className="mt-3 text-[10px] bg-black/30 p-2 rounded font-mono">
                ID: G-BGM02GLZ84<br />
                Status: {status}
            </div>
        </div>
    );
};

export default ConnectivityChecker;
