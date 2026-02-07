import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { isOnline, addNetworkListeners } from '../utils/network-status';

/**
 * OfflineIndicator Component
 * Displays a banner when user is offline
 */
const OfflineIndicator: React.FC = () => {
    const [offline, setOffline] = useState(!isOnline());

    useEffect(() => {
        // Check initial status
        setOffline(!isOnline());

        // Add network status listeners
        const cleanup = addNetworkListeners(
            () => setOffline(false), // onOnline
            () => setOffline(true)   // onOffline
        );

        // Cleanup on unmount
        return cleanup;
    }, []);

    return (
        <AnimatePresence>
            {offline && (
                <motion.div
                    initial={{ y: -100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -100, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    className="fixed top-0 left-0 right-0 z-[9999] bg-amber-500 text-white px-4 py-3 shadow-lg"
                    role="alert"
                    aria-live="polite"
                    aria-label="Network status notification"
                >
                    <div className="container mx-auto flex items-center gap-3">
                        {/* Offline Icon */}
                        <svg
                            className="w-5 h-5 flex-shrink-0"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M18.364 5.636a9 9 0 010 12.728m0 0l-2.829-2.829m2.829 2.829L21 21M15.536 8.464a5 5 0 010 7.072m0 0l-2.829-2.829m-4.243 2.829a4.978 4.978 0 01-1.414-2.83m-1.414 5.658a9 9 0 01-2.167-9.238m7.824 2.167a1 1 0 111.414 1.414m-1.414-1.414L3 3"
                            />
                        </svg>

                        {/* Message */}
                        <div className="flex-1">
                            <p className="font-semibold text-sm sm:text-base">You're offline</p>
                            <p className="text-xs sm:text-sm opacity-90">
                                Some features may not work. Check your internet connection.
                            </p>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default OfflineIndicator;
