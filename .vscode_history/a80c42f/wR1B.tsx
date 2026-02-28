import React from 'react';

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error) {
    console.error('ErrorBoundary caught:', error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          color: 'red',
          fontSize: '16px',
          padding: '20px',
          fontFamily: 'monospace',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          backgroundColor: '#f5f5f5'
        }}>
          <h2>Application Error</h2>
          <p>Something went wrong rendering the application.</p>
          <pre style={{
            background: '#fff',
            padding: '10px',
            overflow: 'auto',
            fontSize: '12px',
            maxWidth: '600px',
            border: '1px solid #ccc',
            borderRadius: '4px'
          }}>
            {this.state.error?.message}
          </pre>
          <button 
            onClick={() => window.location.reload()}
            style={{
              marginTop: '20px',
              padding: '10px 20px',
              cursor: 'pointer',
              background: '#2563eb',
              color: 'white',
              border: 'none',
              borderRadius: '4px'
            }}
          >
            Reload Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
