import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { saveFailedSubmission, getBackupSubmissions, cleanupOldSubmissions } from '../form-backup';

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
            role: 'Test', challenge: 'Test', timeline: 'Test',
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
            role: 'Test', challenge: 'Test', timeline: 'Test',
            message: 'Test message'
        };

        saveFailedSubmission(formData);
        const submissions = getBackupSubmissions();
        expect(submissions.length).toBeGreaterThan(0);
        expect(submissions[0].formData.name).toBe('John Doe');
    });

    it('cleans up old submissions', () => {
        // Save submission with old timestamp
        const oldData = {
            name: 'Old',
            email: 'old@example.com',
            role: 'Old', challenge: 'Old', timeline: 'Old',
            message: 'Old message'
        };
        const oldTimestamp = Date.now() - (31 * 24 * 60 * 60 * 1000); // 31 days ago
        localStorage.setItem('form_backup_old', JSON.stringify({
            formData: oldData,
            timestamp: oldTimestamp
        }));

        cleanupOldSubmissions();

        expect(localStorage.getItem('form_backup_old')).toBeNull();
    });

    it('keeps recent submissions', () => {
        const recentData = {
            name: 'Recent',
            email: 'recent@example.com',
            role: 'Recent', challenge: 'Recent', timeline: 'Recent',
            message: 'Recent message'
        };
        const recentTimestamp = Date.now() - (5 * 24 * 60 * 60 * 1000); // 5 days ago
        localStorage.setItem('form_backup_recent', JSON.stringify({
            formData: recentData,
            timestamp: recentTimestamp
        }));

        cleanupOldSubmissions();

        expect(localStorage.getItem('form_backup_recent')).toBeTruthy();
    });

    it('handles empty localStorage gracefully', () => {
        expect(() => {
            getBackupSubmissions();
        }).not.toThrow();

        expect(() => {
            cleanupOldSubmissions();
        }).not.toThrow();
    });
});
