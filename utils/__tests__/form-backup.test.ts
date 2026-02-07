import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { saveFailedSubmission, getFailedSubmissions, cleanupOldSubmissions } from '../form-backup';

describe('form-backup', () => {
    beforeEach(() => {
        localStorage.clear();
    });

    afterEach(() => {
        localStorage.clear();
    });

    it('saves failed submission to localStorage', () => {
        const formData = {
            name: 'John Doe',
            email: 'john@example.com',
            subject: 'Test',
            message: 'Test message'
        };

        const backupId = saveFailedSubmission(formData);

        expect(backupId).toBeTruthy();
        expect(localStorage.getItem(`form_backup_${backupId}`)).toBeTruthy();
    });

    it('retrieves failed submissions', () => {
        const formData = {
            name: 'John Doe',
            email: 'john@example.com',
            subject: 'Test',
            message: 'Test message'
        };

        saveFailedSubmission(formData);
        const submissions = getFailedSubmissions();

        expect(submissions.length).toBeGreaterThan(0);
        expect(submissions[0].data.name).toBe('John Doe');
    });

    it('cleans up old submissions', () => {
        // Save submission with old timestamp
        const oldData = {
            name: 'Old',
            email: 'old@example.com',
            subject: 'Old',
            message: 'Old message'
        };
        const oldTimestamp = Date.now() - (31 * 24 * 60 * 60 * 1000); // 31 days ago
        localStorage.setItem('form_backup_old', JSON.stringify({
            data: oldData,
            timestamp: oldTimestamp
        }));

        cleanupOldSubmissions();

        expect(localStorage.getItem('form_backup_old')).toBeNull();
    });

    it('keeps recent submissions', () => {
        const recentData = {
            name: 'Recent',
            email: 'recent@example.com',
            subject: 'Recent',
            message: 'Recent message'
        };
        const recentTimestamp = Date.now() - (5 * 24 * 60 * 60 * 1000); // 5 days ago
        localStorage.setItem('form_backup_recent', JSON.stringify({
            data: recentData,
            timestamp: recentTimestamp
        }));

        cleanupOldSubmissions();

        expect(localStorage.getItem('form_backup_recent')).toBeTruthy();
    });

    it('handles empty localStorage gracefully', () => {
        expect(() => {
            getFailedSubmissions();
        }).not.toThrow();

        expect(() => {
            cleanupOldSubmissions();
        }).not.toThrow();
    });
});
