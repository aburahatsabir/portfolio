
import React, { Component, ReactNode } from 'react';
import { trackError } from '../utils/analytics';

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

        // Track error in analytics
        trackError(error, true);

        // TODO: Send to error logging service (e.g., Sentry)
        // Example: Sentry.captureException(error, { extra: errorInfo });
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
                        <h1 className="text-4xl font-black text-slate-900">Oops!</h1>
                        <p className="text-slate-600 text-lg leading-relaxed">
                            Something went wrong. Our team has been notified and we're working on a fix.
                        </p>
                        {this.state.error && (
                            <details className="text-left bg-slate-50 p-4 rounded-lg border border-slate-200">
                                <summary className="text-sm font-bold text-slate-700 cursor-pointer">
                                    Technical Details
                                </summary>
                                <pre className="mt-3 text-xs text-slate-600 overflow-auto">
                                    {this.state.error.message}
                                </pre>
                            </details>
                        )}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button
                                onClick={this.handleRetry}
                                className="px-8 py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all shadow-lg"
                            >
                                Try Again
                            </button>
                            <button
                                onClick={() => window.location.href = '/'}
                                className="px-8 py-4 bg-white border border-slate-200 text-slate-700 font-bold rounded-xl hover:bg-slate-50 transition-all"
                            >
                                Return Home
                            </button>
                        </div>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
