import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CookieConsent: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Check if user has already made a choice
        const consent = localStorage.getItem('cookie-consent');
        if (!consent) {
            // Show banner after a short delay
            const timer = setTimeout(() => setIsVisible(true), 1000);
            return () => clearTimeout(timer);
        } else {
            // Apply saved consent on mount
            updateGtagConsent(consent === 'accepted');
        }
    }, []);

    const updateGtagConsent = (granted: boolean) => {
        if (typeof window !== 'undefined' && (window as any).gtag) {
            const status = granted ? 'granted' : 'denied';
            (window as any).gtag('consent', 'update', {
                'ad_storage': status,
                'ad_user_data': status,
                'ad_personalization': status,
                'analytics_storage': status
            });
            console.log(`🍪 Cookie Consent: ${status}`);
        }
    };

    const handleAccept = () => {
        localStorage.setItem('cookie-consent', 'accepted');
        updateGtagConsent(true);
        setIsVisible(false);
    };

    const handleDecline = () => {
        localStorage.setItem('cookie-consent', 'declined');
        updateGtagConsent(false);
        setIsVisible(false);
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="fixed bottom-0 left-0 right-0 z-[60] p-4 md:p-6"
                >
                    <div className="max-w-4xl mx-auto bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl border border-slate-200 p-6 md:flex md:items-center md:justify-between gap-6">
                        <div className="flex-1 mb-4 md:mb-0">
                            <div className="flex items-center gap-3 mb-2">
                                <span className="text-2xl">🍪</span>
                                <h3 className="font-bold text-slate-900">We care about your privacy</h3>
                            </div>
                            <p className="text-sm text-slate-600 leading-relaxed">
                                We use cookies to analyze site traffic and enhance your experience.
                                We don't sell your data. By clicking "Accept", you agree to our use of cookies.
                            </p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-3 min-w-[280px]">
                            <button
                                onClick={handleDecline}
                                className="px-6 py-2.5 rounded-xl border border-slate-300 text-slate-600 font-medium hover:bg-slate-50 hover:text-slate-900 transition-colors flex-1"
                            >
                                Decline
                            </button>
                            <button
                                onClick={handleAccept}
                                className="px-6 py-2.5 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 shadow-lg shadow-blue-600/20 transition-all transform hover:-translate-y-0.5 flex-1"
                            >
                                Accept
                            </button>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default CookieConsent;
