
import React, { Component, ReactNode } from 'react';
import { trackError } from '../utils/analytics';
import { captureError } from '../utils/sentry';

interface Props {
    children: ReactNode;
    fallback?: (error: Error, retry: () => void) => React.ReactNode;
}

interface State {
    error: Error | null;
    hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { error: null, hasError: false };
    }

    static getDerivedStateFromError(error: Error): State {
        return { error, hasError: true };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        console.error('Error caught by boundary:', error, errorInfo);

        // Send to Sentry with full context
        captureError(error, {
            componentStack: errorInfo.componentStack,
            errorBoundary: 'ErrorBoundary',
            userAgent: navigator.userAgent,
            url: window.location.href,
            timestamp: new Date().toISOString(),
        });

        // Track error in analytics
        trackError(error, true);
    }


    handleRetry = () => {
        this.setState({ hasError: false, error: null });
    };

    render() {
        if (this.state.hasError) {
            // Use custom fallback if provided
            if (this.props.fallback) {
                return this.props.fallback(this.state.error!, this.handleRetry);
            }

            // Default fallback UI
            return (
                <div className="min-h-screen flex items-center justify-center bg-white px-6">
                    <div className="text-center space-y-6 max-w-md">
                        <div className="w-20 h-20 mx-auto bg-red-50 rounded-full flex items-center justify-center">
                            <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                        </div>
                        <h1 className="text-4xl font-black text-slate-900">Something Went Wrong</h1>
                        <p className="text-slate-600 text-lg leading-relaxed">
                            We encountered an unexpected error. Don't worry—your data is safe and we've been notified.
                        </p>
                        {this.state.error && (
                            <details className="text-left bg-slate-50 p-4 rounded-lg border border-slate-200">
                                <summary className="text-sm font-bold text-slate-700 cursor-pointer hover:text-slate-900 transition-colors">
                                    Technical Details
                                </summary>
                                <pre className="mt-3 text-xs text-slate-600 overflow-auto max-h-40">
                                    {this.state.error.message}
                                    {this.state.error.stack && `\n\n${this.state.error.stack}`}
                                </pre>
                            </details>
                        )}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button
                                type="button"
                                onClick={this.handleRetry}
                                className="px-8 py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                                aria-label="Try again"
                            >
                                Try Again
                            </button>
                            <button
                                type="button"
                                onClick={() => window.location.href = '/'}
                                className="px-8 py-4 bg-white border-2 border-slate-200 text-slate-700 font-bold rounded-xl hover:bg-slate-50 hover:border-slate-300 transition-all"
                                aria-label="Return to homepage"
                            >
                                Return Home
                            </button>
                        </div>
                        <div className="pt-4 border-t border-slate-200">
                            <p className="text-sm text-slate-500 mb-3">
                                Need immediate assistance?
                            </p>
                            <a
                                href={`mailto:aburahatsabir178@gmail.com?subject=Error Report&body=Error: ${encodeURIComponent(this.state.error?.message || 'Unknown error')}`}
                                className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold text-sm transition-colors"
                                aria-label="Report this issue via email"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                Report this issue
                            </a>
                        </div>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
