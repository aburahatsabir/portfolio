import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie } from 'lucide-react';

declare global {
    interface Window {
        gtag?: (...args: unknown[]) => void;
        loadGoogleAnalytics?: () => void;
    }
}

const clearAnalyticsState = () => {
    localStorage.removeItem('analytics_event_queue');
    sessionStorage.removeItem('analytics_blocked_logged');

    document.cookie.split(';').forEach((cookie) => {
        const name = cookie.split('=')[0]?.trim();
        if (name === '_ga' || name?.startsWith('_ga_')) {
            document.cookie = name + '=; Max-Age=0; path=/; SameSite=Lax';
        }
    });
};

const CookieConsent: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem('cookie-consent');
        let timer: ReturnType<typeof setTimeout> | undefined;
        if (!consent) {
            timer = setTimeout(() => setIsVisible(true), 1000);
        } else {
            updateGtagConsent(consent === 'accepted');
        }

        const openSettings = () => setIsVisible(true);
        window.addEventListener('open-cookie-settings', openSettings);

        return () => {
            if (timer) clearTimeout(timer);
            window.removeEventListener('open-cookie-settings', openSettings);
        };
    }, []);

    const updateGtagConsent = (granted: boolean) => {
        if (window.gtag) {
            const status = granted ? 'granted' : 'denied';
            window.gtag('consent', 'update', {
                'ad_storage': 'denied',
                'ad_user_data': 'denied',
                'ad_personalization': 'denied',
                'analytics_storage': status
            });
        }

        if (granted) {
            window.loadGoogleAnalytics?.();
        } else {
            clearAnalyticsState();
        }

        window.dispatchEvent(new CustomEvent('analytics-consent-change', {
            detail: { granted },
        }));
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
                <div className="fixed bottom-6 left-0 right-0 z-[100] flex justify-center px-4 pointer-events-none">
                    <motion.div
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 100, opacity: 0 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        className="pointer-events-auto bg-white border border-gray-100 rounded-[6px] shadow-2xl p-5 md:p-6 max-w-[850px] w-full flex flex-col md:flex-row items-center gap-6 md:gap-8"
                        role="dialog"
                        aria-modal="true"
                        aria-label="Analytics cookie preferences"
                    >
                        {/* Refined: Scaled down icon */}
                        <div className="flex-shrink-0">
                            <Cookie className="w-10 h-10 text-[#3b82f6] stroke-[1.5]" />
                        </div>
                        
                        {/* Refined: Scaled down text */}
                        <div className="flex-grow">
                            <p className="text-[#4b5563] text-[15px] leading-relaxed mb-0.5">
                                Optional Google Analytics cookies help measure site traffic. Analytics stays off unless you choose Accept; advertising and personalization storage remain disabled.
                            </p>
                            <a href="/cookies" className="text-[#3b82f6] hover:text-blue-700 underline underline-offset-4 transition-colors text-[14px] font-medium">
                                Learn more
                            </a>
                        </div>
                        
                        {/* Refined: Consistent, non-oversized buttons */}
                        <div className="flex gap-3">
                            <button
                                onClick={handleAccept}
                                className="bg-[#111827] text-white px-5 py-2.5 rounded-[6px] font-medium text-[15px] hover:bg-black transition-all active:scale-95 min-w-[100px]"
                            >
                                Accept
                            </button>
                            <button
                                onClick={handleDecline}
                                className="bg-[#111827] text-white px-5 py-2.5 rounded-[6px] font-medium text-[15px] hover:bg-black transition-all active:scale-95 min-w-[100px]"
                            >
                                Reject
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default CookieConsent;
