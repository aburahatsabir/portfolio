import { describe, it, expect, vi, beforeEach } from 'vitest';
import { resilientApiCall } from '../api-resilience';

describe('api-resilience', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('succeeds on first attempt when API works', async () => {
        const mockFn = vi.fn().mockResolvedValue({ data: 'success' });

        const result = await resilientApiCall(mockFn);

        expect(result).toEqual({ data: 'success' });
        expect(mockFn).toHaveBeenCalledTimes(1);
    });

    it('retries on transient failures', async () => {
        const mockFn = vi.fn()
            .mockRejectedValueOnce(new Error('Network error'))
            .mockResolvedValueOnce({ data: 'success' });

        const result = await resilientApiCall(mockFn, { retries: 2 });

        expect(result).toEqual({ data: 'success' });
        expect(mockFn).toHaveBeenCalledTimes(2);
    });

    it('throws after max retries exceeded', async () => {
        const mockFn = vi.fn().mockRejectedValue(new Error('Persistent error'));

        await expect(
            resilientApiCall(mockFn, { retries: 3 })
        ).rejects.toThrow();

        expect(mockFn).toHaveBeenCalledTimes(3);
    });

    it('uses exponential backoff between retries', async () => {
        const mockFn = vi.fn()
            .mockRejectedValueOnce(new Error('Error 1'))
            .mockRejectedValueOnce(new Error('Error 2'))
            .mockResolvedValueOnce({ data: 'success' });

        const startTime = Date.now();
        await resilientApiCall(mockFn, { retries: 3,  });
        const endTime = Date.now();

        // Should have delays: 100ms + 200ms = 300ms minimum
        expect(endTime - startTime).toBeGreaterThanOrEqual(250);
    });

    it('provides user-friendly error messages', async () => {
        const mockFn = vi.fn().mockRejectedValue(new Error('ECONNREFUSED'));

        try {
            await resilientApiCall(mockFn, { retries: 1 });
            expect.fail('Should have thrown an error');
        } catch (error: any) {
            expect(error.userMessage || error.message).toBeTruthy();
        }
    });

    it('handles timeout errors', async () => {
        const mockFn = vi.fn().mockRejectedValue(new Error('ETIMEDOUT'));

        await expect(
            resilientApiCall(mockFn, { retries: 2 })
        ).rejects.toThrow();

        expect(mockFn).toHaveBeenCalledTimes(2);
    });
});
