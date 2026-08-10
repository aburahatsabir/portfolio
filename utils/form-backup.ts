import { captureMessage } from './sentry';

/**
 * Interface for backup submission stored in localStorage
 */
export interface BackupSubmission {
    id: string;
    timestamp: number;
    formData: {
        name: string;
        email: string;
        role: string;
        challenge: string;
        timeline: string;
        message: string;
    };
    attempts: number;
    status: 'pending' | 'failed' | 'sent';
}

const STORAGE_KEY = 'emailjs_backup_submissions';

/**
 * Save a failed form submission to localStorage
 * Returns the backup ID for tracking
 */
export const saveFailedSubmission = (formData: BackupSubmission['formData']): string => {
    try {
        const id = `form_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

        const submission: BackupSubmission = {
            id,
            timestamp: Date.now(),
            formData,
            attempts: 1,
            status: 'pending',
        };

        const existing = getBackupSubmissions();
        existing.push(submission);

        localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
        localStorage.setItem(`form_backup_${id}`, JSON.stringify(submission));

        // Log to Sentry for monitoring
        captureMessage(`Form submission backed up to localStorage: ${id}`, 'info');

        console.log('[FormBackup] Submission saved:', id);
        return id;
    } catch (error) {
        console.error('[FormBackup] Failed to save submission:', error);
        return '';
    }
};

/**
 * Get all backup submissions from localStorage
 */
export const getBackupSubmissions = (): BackupSubmission[] => {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        return stored ? JSON.parse(stored) : [];
    } catch (error) {
        console.error('[FormBackup] Failed to retrieve submissions:', error);
        return [];
    }
};

/**
 * Mark a submission as successfully sent
 */
export const markSubmissionAsSent = (id: string): void => {
    try {
        const submissions = getBackupSubmissions();
        const updated = submissions.map(sub =>
            sub.id === id ? { ...sub, status: 'sent' as const } : sub
        );
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

        console.log('[FormBackup] Submission marked as sent:', id);
    } catch (error) {
        console.error('[FormBackup] Failed to mark submission as sent:', error);
    }
};

/**
 * Increment attempt count for a submission
 */
export const incrementAttempts = (id: string): void => {
    try {
        const submissions = getBackupSubmissions();
        const updated = submissions.map(sub =>
            sub.id === id ? { ...sub, attempts: sub.attempts + 1 } : sub
        );
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (error) {
        console.error('[FormBackup] Failed to increment attempts:', error);
    }
};

/**
 * Retry all pending submissions using the provided send function
 */
export const retryPendingSubmissions = async (
    sendFn: (data: BackupSubmission['formData']) => Promise<void>
): Promise<{ successful: number; failed: number }> => {
    const pending = getBackupSubmissions().filter(s => s.status === 'pending');

    let successful = 0;
    let failed = 0;

    for (const submission of pending) {
        try {
            await sendFn(submission.formData);
            markSubmissionAsSent(submission.id);
            successful++;
        } catch (error) {
            console.error(`[FormBackup] Failed to retry submission ${submission.id}:`, error);
            incrementAttempts(submission.id);
            failed++;
        }
    }

    console.log(`[FormBackup] Retry complete: ${successful} successful, ${failed} failed`);
    return { successful, failed };
};

/**
 * Get count of pending submissions
 */
export const getPendingCount = (): number => {
    return getBackupSubmissions().filter(s => s.status === 'pending').length;
};

/**
 * Clear old sent submissions (older than 7 days)
 */
export const cleanupOldSubmissions = (): void => {
    try {
        const submissions = getBackupSubmissions();
        const sevenDaysAgo = Date.now() - (7 * 24 * 60 * 60 * 1000);
        const thirtyDaysAgo = Date.now() - (30 * 24 * 60 * 60 * 1000);

        const cleaned = submissions.filter(sub => {
            // Keep pending submissions
            if (sub.status === 'pending') return true;
            // Keep recent sent submissions
            if (sub.status === 'sent' && sub.timestamp > sevenDaysAgo) return true;
            // Remove old sent submissions
            return false;
        });

        localStorage.setItem(STORAGE_KEY, JSON.stringify(cleaned));

        // Also clean up individual form_backup_* keys from localStorage
        const keysToRemove: string[] = [];
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key && key.startsWith('form_backup_')) {
                try {
                    const raw = localStorage.getItem(key);
                    if (raw) {
                        const parsed = JSON.parse(raw);
                        const ts = parsed.timestamp || 0;
                        if (ts < thirtyDaysAgo || (parsed.status === 'sent' && ts < sevenDaysAgo)) {
                            keysToRemove.push(key);
                        }
                    }
                } catch {
                    keysToRemove.push(key);
                }
            }
        }
        keysToRemove.forEach(k => localStorage.removeItem(k));

        console.log('[FormBackup] Cleaned up old submissions');
    } catch (error) {
        console.error('[FormBackup] Failed to cleanup submissions:', error);
    }
};

/**
 * Generate mailto: link with pre-filled form data
 */
export const generateMailtoLink = (formData: BackupSubmission['formData']): string => {
    const subject = encodeURIComponent(
        `Portfolio Contact: ${formData.role} - ${formData.challenge}`
    );

    const body = encodeURIComponent(`
Name: ${formData.name}
Email: ${formData.email}
Role: ${formData.role}
Challenge: ${formData.challenge}
Timeline: ${formData.timeline}

Message:
${formData.message}

---
Sent via Portfolio Contact Form (EmailJS Fallback)
Timestamp: ${new Date().toISOString()}
  `.trim());

    return `mailto:aburahatsabir178@gmail.com?subject=${subject}&body=${body}`;
};
