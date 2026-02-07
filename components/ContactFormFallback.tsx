import React from 'react';
import { motion } from 'framer-motion';
import { BackupSubmission, generateMailtoLink } from '../utils/form-backup';

interface ContactFormFallbackProps {
    formData: BackupSubmission['formData'];
    backupId: string;
    onRetry: () => void;
}

const ContactFormFallback: React.FC<ContactFormFallbackProps> = ({
    formData,
    backupId,
    onRetry
}) => {
    const mailtoLink = generateMailtoLink(formData);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 bg-blue-50 border-2 border-blue-200 rounded-xl"
        >
            {/* Icon & Title */}
            <div className="flex items-center gap-3 mb-4">
                <svg
                    className="w-6 h-6 text-blue-700"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                </svg>
                <h3 className="text-lg font-bold text-slate-900">
                    Message Saved — Alternative Delivery Options
                </h3>
            </div>

            {/* Explanation */}
            <p className="text-slate-700 mb-4">
                Our primary email service is temporarily unavailable, but your message is safe.
                Choose how you'd like to proceed:
            </p>

            {/* Options */}
            <div className="space-y-3">
                {/* Option 1: Mailto (Recommended) */}
                <a
                    href={mailtoLink}
                    onClick={() => {
                        // Track mailto fallback usage
                        if (typeof window !== 'undefined' && (window as any).gtag) {
                            (window as any).gtag('event', 'mailto_fallback_clicked', {
                                event_category: 'Form Fallback',
                                backup_id: backupId,
                            });
                        }
                    }}
                    className="block w-full px-6 py-4 bg-blue-700 text-white rounded-lg hover:bg-blue-600 transition text-center font-bold"
                >
                    📧 Send via Your Email Client (Recommended)
                </a>

                {/* Option 2: Retry */}
                <button
                    onClick={() => {
                        onRetry();
                        // Track retry attempt
                        if (typeof window !== 'undefined' && (window as any).gtag) {
                            (window as any).gtag('event', 'form_retry_attempted', {
                                event_category: 'Form Fallback',
                                backup_id: backupId,
                            });
                        }
                    }}
                    className="block w-full px-6 py-4 bg-white border-2 border-blue-200 text-slate-900 rounded-lg hover:bg-blue-50 transition font-bold"
                >
                    🔄 Retry Original Submission
                </button>

                {/* Option 3: Direct Contact (Collapsible) */}
                <details className="pt-3">
                    <summary className="cursor-pointer text-sm font-bold text-blue-700 hover:underline">
                        View All Contact Methods →
                    </summary>
                    <div className="mt-3 pl-4 space-y-2 text-sm border-l-2 border-blue-200">
                        <a
                            href="mailto:abu.rahat.sabir@gmail.com"
                            className="block text-blue-700 hover:underline"
                        >
                            ✉️ abu.rahat.sabir@gmail.com
                        </a>
                        <a
                            href="https://linkedin.com/in/abu-rahat-sabir"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block text-blue-700 hover:underline"
                        >
                            💼 Connect on LinkedIn
                        </a>
                        <a
                            href="https://github.com/aburahatsabir"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block text-blue-700 hover:underline"
                        >
                            🔗 GitHub Profile
                        </a>
                    </div>
                </details>
            </div>

            {/* Backup ID for debugging */}
            <p className="mt-4 pt-4 border-t border-blue-200 text-xs text-slate-500">
                Backup ID: <code className="px-1 py-0.5 bg-slate-100 rounded">{backupId}</code>
                {' • '}Your message is saved locally and will auto-retry when the service recovers
            </p>
        </motion.div>
    );
};

export default ContactFormFallback;
