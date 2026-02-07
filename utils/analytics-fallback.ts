/**
 * Analytics Fallback System
 * 
 * Provides localStorage-based event queue for when GA4 is blocked by ad blockers.
 * Events are queued and automatically flushed when GA4 becomes available.
 */

interface QueuedEvent {
    eventName: string;
    params: Record<string, any>;
    timestamp: number;
}

const STORAGE_KEY = 'analytics_event_queue';
const MAX_QUEUE_SIZE = 100; // Prevent localStorage overflow
const MAX_EVENT_AGE_MS = 24 * 60 * 60 * 1000; // 24 hours
const RETRY_INTERVAL_MS = 5000; // Check every 5 seconds

class AnalyticsFallback {
    private queue: QueuedEvent[] = [];
    private retryTimer: number | null = null;
    private isGA4Available = false;

    constructor() {
        this.loadQueue();
        this.startRetryLoop();
        this.checkGA4Availability();
    }

    /**
     * Check if GA4 is loaded and available
     */
    private checkGA4Availability(): boolean {
        this.isGA4Available = typeof window !== 'undefined' && typeof (window as any).gtag === 'function';
        return this.isGA4Available;
    }

    /**
     * Load queued events from localStorage
     */
    private loadQueue(): void {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                const parsed = JSON.parse(stored) as QueuedEvent[];

                // Filter out old events
                const now = Date.now();
                this.queue = parsed.filter(event =>
                    (now - event.timestamp) < MAX_EVENT_AGE_MS
                );

                // Save cleaned queue
                this.saveQueue();
            }
        } catch (error) {
            console.warn('[AnalyticsFallback] Failed to load queue:', error);
            this.queue = [];
        }
    }

    /**
     * Save queue to localStorage
     */
    private saveQueue(): void {
        try {
            // Limit queue size to prevent localStorage overflow
            if (this.queue.length > MAX_QUEUE_SIZE) {
                this.queue = this.queue.slice(-MAX_QUEUE_SIZE);
            }

            localStorage.setItem(STORAGE_KEY, JSON.stringify(this.queue));
        } catch (error) {
            console.warn('[AnalyticsFallback] Failed to save queue:', error);

            // If localStorage is full, clear old events
            if (error instanceof DOMException && error.name === 'QuotaExceededError') {
                this.queue = this.queue.slice(-50); // Keep only last 50 events
                try {
                    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.queue));
                } catch {
                    // If still failing, clear queue entirely
                    this.queue = [];
                    localStorage.removeItem(STORAGE_KEY);
                }
            }
        }
    }

    /**
     * Add event to queue
     */
    queueEvent(eventName: string, params: Record<string, any> = {}): void {
        // Remove PII before queuing
        const sanitizedParams = this.sanitizeParams(params);

        this.queue.push({
            eventName,
            params: sanitizedParams,
            timestamp: Date.now(),
        });

        this.saveQueue();

        // Try to flush immediately if GA4 is available
        if (this.checkGA4Availability()) {
            this.flushQueue();
        }
    }

    /**
     * Remove PII from event parameters
     */
    private sanitizeParams(params: Record<string, any>): Record<string, any> {
        const sanitized = { ...params };

        // Remove common PII fields
        const piiFields = ['email', 'name', 'phone', 'address', 'from_email', 'from_name'];
        piiFields.forEach(field => {
            if (sanitized[field]) {
                delete sanitized[field];
            }
        });

        return sanitized;
    }

    /**
     * Flush queued events to GA4
     */
    private flushQueue(): void {
        if (!this.checkGA4Availability() || this.queue.length === 0) {
            return;
        }

        const gtag = (window as any).gtag;
        const eventsToFlush = [...this.queue];

        // Clear queue before flushing to prevent duplicates
        this.queue = [];
        this.saveQueue();

        // Send all queued events
        eventsToFlush.forEach(({ eventName, params }) => {
            try {
                gtag('event', eventName, {
                    ...params,
                    queued: true, // Mark as queued event
                    queue_delay_ms: Date.now() - params.timestamp,
                });
            } catch (error) {
                console.warn('[AnalyticsFallback] Failed to flush event:', eventName, error);
            }
        });

        console.log(`[AnalyticsFallback] Flushed ${eventsToFlush.length} queued events`);
    }

    /**
     * Start retry loop to check for GA4 availability
     */
    private startRetryLoop(): void {
        if (this.retryTimer) {
            return;
        }

        this.retryTimer = window.setInterval(() => {
            if (this.checkGA4Availability() && this.queue.length > 0) {
                this.flushQueue();
            }
        }, RETRY_INTERVAL_MS);
    }

    /**
     * Stop retry loop
     */
    stopRetryLoop(): void {
        if (this.retryTimer) {
            clearInterval(this.retryTimer);
            this.retryTimer = null;
        }
    }

    /**
     * Get current queue status
     */
    getStatus(): { queueSize: number; isGA4Available: boolean; oldestEventAge: number | null } {
        const oldestEvent = this.queue[0];
        const oldestEventAge = oldestEvent ? Date.now() - oldestEvent.timestamp : null;

        return {
            queueSize: this.queue.length,
            isGA4Available: this.isGA4Available,
            oldestEventAge,
        };
    }

    /**
     * Clear queue manually
     */
    clearQueue(): void {
        this.queue = [];
        localStorage.removeItem(STORAGE_KEY);
    }
}

// Export singleton instance
export const analyticsFallback = new AnalyticsFallback();

// Cleanup on page unload
if (typeof window !== 'undefined') {
    window.addEventListener('beforeunload', () => {
        analyticsFallback.stopRetryLoop();
    });
}
