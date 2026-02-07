/**
 * API Resilience Layer
 * 
 * Provides timeout handling, retry logic with exponential backoff,
 * and user-friendly error messaging for external API calls.
 */

export interface ResilientApiOptions {
    timeout?: number;
    retries?: number;
    backoff?: 'linear' | 'exponential';
    onRetry?: (attempt: number, error: Error) => void;
    circuitBreaker?: CircuitBreaker;
    operationName?: string;
}

export class ApiError extends Error {
    constructor(
        message: string,
        public userMessage: string,
        public isRetryable: boolean = false,
        public originalError?: Error
    ) {
        super(message);
        this.name = 'ApiError';
    }
}

/**
 * Sleep utility for retry delays
 */
const sleep = (ms: number): Promise<void> =>
    new Promise(resolve => setTimeout(resolve, ms));

/**
 * Calculate backoff delay
 */
const getBackoffDelay = (
    attempt: number,
    backoff: 'linear' | 'exponential'
): number => {
    if (backoff === 'exponential') {
        return Math.min(1000 * Math.pow(2, attempt - 1), 8000); // Max 8s
    }
    return 1000 * attempt; // Linear: 1s, 2s, 3s
};

/**
 * Map technical errors to user-friendly messages
 */
export const getUserFriendlyError = (error: any): string => {
    // Network errors
    if (error.message?.includes('Failed to fetch') ||
        error.message?.includes('Network request failed')) {
        return 'Unable to connect. Please check your internet connection and try again.';
    }

    // Timeout errors
    if (error.message?.includes('timeout') || error.name === 'TimeoutError') {
        return 'Request timed out. Please try again or contact us directly via email.';
    }

    // EmailJS specific errors
    if (error.status === 400) {
        return 'Invalid form data. Please check your inputs and try again.';
    }

    if (error.status === 401 || error.status === 403) {
        return 'Email service authentication failed. Please contact us directly at aburahatsabir178@gmail.com';
    }

    if (error.status === 429) {
        return 'Too many requests. Please wait a moment and try again.';
    }

    if (error.status >= 500) {
        return 'Email service is temporarily unavailable. Please try again in a few minutes or contact us directly.';
    }

    // Generic fallback
    return 'Something went wrong. Please try again or email us directly at aburahatsabir178@gmail.com';
};

/**
 * Check if error is retryable
 */
const isRetryableError = (error: any): boolean => {
    // Network errors are retryable
    if (error.message?.includes('Failed to fetch') ||
        error.message?.includes('Network request failed')) {
        return true;
    }

    // Timeout errors are retryable
    if (error.message?.includes('timeout') || error.name === 'TimeoutError') {
        return true;
    }

    // 5xx server errors are retryable
    if (error.status >= 500 && error.status < 600) {
        return true;
    }

    // 429 (rate limit) is retryable after backoff
    if (error.status === 429) {
        return true;
    }

    return false;
};

/**
 * Execute API call with timeout
 */
const withTimeout = <T>(
    promise: Promise<T>,
    timeoutMs: number
): Promise<T> => {
    return Promise.race([
        promise,
        new Promise<T>((_, reject) =>
            setTimeout(
                () => reject(new Error('Request timeout')),
                timeoutMs
            )
        ),
    ]);
};

/**
 * Execute API call with resilience (timeout + retry)
 */
export async function resilientApiCall<T>(
    apiCall: () => Promise<T>,
    options: ResilientApiOptions = {}
): Promise<T> {
    const {
        timeout = 5000,
        retries = 3,
        backoff = 'exponential',
        onRetry,
    } = options;

    let lastError: Error | undefined;

    for (let attempt = 1; attempt <= retries; attempt++) {
        try {
            // Execute with timeout
            const result = await withTimeout(apiCall(), timeout);
            return result;
        } catch (error: any) {
            lastError = error;

            // Check if we should retry
            const shouldRetry = attempt < retries && isRetryableError(error);

            if (shouldRetry) {
                // Calculate delay
                const delay = getBackoffDelay(attempt, backoff);

                // Notify about retry
                if (onRetry) {
                    onRetry(attempt, error);
                }

                console.warn(
                    `API call failed (attempt ${attempt}/${retries}). Retrying in ${delay}ms...`,
                    error
                );

                // Wait before retry
                await sleep(delay);
            } else {
                // No more retries or non-retryable error
                break;
            }
        }
    }

    // All retries exhausted, throw user-friendly error
    const userMessage = getUserFriendlyError(lastError);
    throw new ApiError(
        lastError?.message || 'API call failed',
        userMessage,
        isRetryableError(lastError),
        lastError
    );
}

/**
 * Circuit Breaker for EmailJS
 * Prevents hammering a failing service
 */
export class CircuitBreaker {
    private failureCount = 0;
    private lastFailureTime = 0;
    private state: 'closed' | 'open' | 'half-open' = 'closed';
    private readonly STORAGE_KEY = 'emailjs_circuit_breaker_state';
    // ✅ FIX: In-memory fallback for private browsing mode when localStorage is disabled
    private fallbackState: { failureCount: number; lastFailureTime: number; state: 'closed' | 'open' | 'half-open' } | null = null;

    constructor(
        private threshold = 5,
        private timeout = 60000 // 1 minute
    ) {
        // Restore state from localStorage on initialization
        this.loadState();
    }

    /**
     * Load circuit breaker state from localStorage
     * ✅ FIX: Falls back to in-memory state if localStorage unavailable (private browsing)
     */
    private loadState(): void {
        try {
            const stored = localStorage.getItem(this.STORAGE_KEY);
            if (stored) {
                const state = JSON.parse(stored);
                this.failureCount = state.failureCount || 0;
                this.lastFailureTime = state.lastFailureTime || 0;
                this.state = state.state || 'closed';

                // ✅ AUTO-RESET: If state is stale (>5 minutes old), reset to prevent permanent lockout
                const timeSinceLastFailure = Date.now() - this.lastFailureTime;
                const STALE_THRESHOLD = 5 * 60 * 1000; // 5 minutes

                if (this.state === 'open' && timeSinceLastFailure > STALE_THRESHOLD) {
                    console.log('[CircuitBreaker] Auto-resetting stale OPEN state (>5 min old)');
                    this.reset();
                    return;
                }

                if (this.state === 'open') {
                    console.warn('[CircuitBreaker] Restored OPEN state from localStorage');
                }
            }
        } catch (error) {
            // ✅ FIX: Private browsing mode or localStorage disabled → Use in-memory fallback
            console.warn('[CircuitBreaker] localStorage unavailable, checking in-memory fallback:', error);
            if (this.fallbackState) {
                this.failureCount = this.fallbackState.failureCount;
                this.lastFailureTime = this.fallbackState.lastFailureTime;
                this.state = this.fallbackState.state;
                console.log('[CircuitBreaker] Restored state from in-memory fallback');
            } else {
                // No fallback available, default to closed state
                this.reset();
            }
        }
    }

    /**
     * Save circuit breaker state to localStorage
     * ✅ FIX: Also saves to in-memory fallback for private browsing mode
     */
    private saveState(): void {
        const stateData = {
            failureCount: this.failureCount,
            lastFailureTime: this.lastFailureTime,
            state: this.state,
        };

        try {
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(stateData));
        } catch (error) {
            // ✅ FIX: localStorage unavailable (private browsing) → Save to memory instead
            console.warn('[CircuitBreaker] localStorage unavailable, saving to in-memory fallback:', error);
            this.fallbackState = stateData;
        }
    }

    async execute<T>(fn: () => Promise<T>): Promise<T> {
        // Check circuit state
        if (this.state === 'open') {
            const timeSinceLastFailure = Date.now() - this.lastFailureTime;

            if (timeSinceLastFailure > this.timeout) {
                // Try half-open
                this.state = 'half-open';
            } else {
                throw new ApiError(
                    'Circuit breaker is open',
                    'Email service is temporarily unavailable. Please try again later or contact us directly.',
                    false
                );
            }
        }

        try {
            const result = await fn();

            // Success - reset circuit
            this.failureCount = 0;
            this.state = 'closed';
            this.saveState(); // Persist successful state

            return result;
        } catch (error) {
            this.failureCount++;
            this.lastFailureTime = Date.now();

            if (this.failureCount >= this.threshold) {
                this.state = 'open';
                console.error('[CircuitBreaker] Circuit OPENED after', this.failureCount, 'failures');

                // Log to Sentry for production visibility
                if (typeof window !== 'undefined') {
                    import('./sentry').then(({ captureError }) => {
                        captureError(new Error('EmailJS Circuit Breaker Opened'), {
                            failureCount: this.failureCount,
                            threshold: this.threshold,
                            lastFailureTime: this.lastFailureTime,
                            component: 'CircuitBreaker',
                        });
                    });

                    // Track to GA4 for analytics
                    import('./analytics').then(({ trackCustomEvent }) => {
                        trackCustomEvent('circuit_breaker_opened', {
                            event_category: 'System Error',
                            failure_count: this.failureCount,
                            threshold: this.threshold,
                        });
                    });
                }
            }

            this.saveState(); // Persist failure state
            throw error;
        }
    }

    reset() {
        this.failureCount = 0;
        this.state = 'closed';
        this.saveState(); // Persist reset
    }

    /**
     * Get current circuit breaker state (for UI display)
     */
    getState(): { state: string; failureCount: number; lastFailureTime: number } {
        return {
            state: this.state,
            failureCount: this.failureCount,
            lastFailureTime: this.lastFailureTime,
        };
    }
}

export interface ResilientApiOptions {
    timeout?: number;
    retries?: number;
    backoff?: 'linear' | 'exponential';
    onRetry?: (attempt: number, error: Error) => void;
    circuitBreaker?: CircuitBreaker;
    operationName?: string;
}

// Export singleton circuit breaker for EmailJS
export const emailJsCircuitBreaker = new CircuitBreaker(5, 60000);
