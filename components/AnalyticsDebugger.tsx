import React, { useState, useEffect } from 'react';

interface LogEntry {
    timestamp: string;
    type: string;
    data: any;
}

const AnalyticsDebugger: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [logs, setLogs] = useState<LogEntry[]>([]);
    const [gaStatus, setGaStatus] = useState<'loading' | 'loaded' | 'missing'>('loading');

    useEffect(() => {
        // Check for debug mode in URL
        const params = new URLSearchParams(window.location.search);
        if (params.get('debug_mode') === 'true') {
            setIsVisible(true);
        } else {
            return;
        }

        // Check GA Status
        const checkGA = setInterval(() => {
            if (typeof window !== 'undefined' && (window as any).gtag) {
                setGaStatus('loaded');
                clearInterval(checkGA);
            } else {
                setGaStatus('missing');
            }
        }, 1000);

        // Monkey patch gtag to intercept events
        const originalGtag = (window as any).gtag;
        (window as any).gtag = function (...args: any[]) {
            const newLog = {
                timestamp: new Date().toLocaleTimeString(),
                type: args[0],
                data: args.slice(1),
            };

            setLogs(prev => [newLog, ...prev].slice(0, 50)); // Keep last 50 events

            if (originalGtag) {
                originalGtag.apply(window, args);
            }
        };

        return () => {
            if (originalGtag) {
                (window as any).gtag = originalGtag;
            }
            clearInterval(checkGA);
        };
    }, []);

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-4 right-4 z-50 w-96 bg-slate-900/95 text-xs font-mono text-slate-200 border border-slate-700 rounded-lg shadow-2xl backdrop-blur max-h-[500px] flex flex-col">
            <div className="p-3 border-b border-slate-700 flex justify-between items-center bg-slate-800 rounded-t-lg">
                <h3 className="font-bold text-white">Analytics Debugger</h3>
                <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold ${gaStatus === 'loaded' ? 'bg-green-500/20 text-green-400' :
                        gaStatus === 'missing' ? 'bg-red-500/20 text-red-400' : 'bg-yellow-500/20 text-yellow-400'
                    }`}>
                    {gaStatus}
                </span>
            </div>

            <div className="flex-1 overflow-y-auto p-2 space-y-2">
                {logs.length === 0 ? (
                    <div className="text-slate-500 italic p-2 text-center">Waiting for events...</div>
                ) : (
                    logs.map((log, i) => (
                        <div key={i} className="p-2 bg-slate-800/50 rounded border border-slate-700/50">
                            <div className="flex justify-between text-slate-400 mb-1">
                                <span className="font-bold text-blue-400">{log.type}</span>
                                <span>{log.timestamp}</span>
                            </div>
                            <pre className="overflow-x-auto text-[10px] text-slate-300">
                                {JSON.stringify(log.data, null, 2)}
                            </pre>
                        </div>
                    ))
                )}
            </div>

            <div className="p-2 border-t border-slate-700 bg-slate-800 rounded-b-lg flex justify-between">
                <button
                    onClick={() => setLogs([])}
                    className="text-xs hover:text-white transition-colors"
                >
                    Clear Logs
                </button>
                <div className="text-[10px] text-slate-500">
                    Showing last 50 events
                </div>
            </div>
        </div>
    );
};

export default AnalyticsDebugger;
