import React, { useEffect, useState } from 'react';

const ConnectivityChecker: React.FC = () => {
    const [status, setStatus] = useState<'checking' | 'blocked' | 'connected'>('checking');

    useEffect(() => {
        const checkConnection = () => {
            // Check if the Google Tag Manager object exists (provided by the script)
            if (typeof window !== 'undefined' && (window as any).google_tag_manager && (window as any).google_tag_manager['G-GNCS8NZW8L']) {
                setStatus('connected');
            } else {
                setStatus('blocked');
            }
        };

        // Check after 2 seconds to allow script to load
        const timer = setTimeout(checkConnection, 2000);
        return () => clearTimeout(timer);
    }, []);

    if (status === 'connected') return null; // Hide if everything is fine

    return (
        <div className="fixed bottom-4 left-4 z-50 p-4 bg-red-900/95 text-white border-2 border-red-500 rounded-lg shadow-2xl max-w-sm backdrop-blur">
            <h3 className="font-bold text-lg mb-2 flex items-center">
                <span className="text-2xl mr-2">🚫</span>
                Analytics Blocked
            </h3>
            <p className="text-sm mb-3">
                Google Analytics is being blocked by your browser.
            </p>
            <div className="text-xs bg-red-950/50 p-2 rounded mb-3 font-mono">
                window.google_tag_manager = undefined
            </div>
            <p className="text-xs text-red-200">
                Please disable <strong>AdBlock</strong>, <strong>uBlock Origin</strong>, or <strong>Brave Shields</strong> for this site to allow tracking.
            </p>
        </div>
    );
};

export default ConnectivityChecker;
