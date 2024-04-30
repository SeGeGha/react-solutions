import { Component, ErrorInfo, ReactNode } from 'react';

type ErrorBoundaryProps = {
    silent?: boolean
}
type ErrorBoundarySate = {
    error: null | Error
    errorInfo: null | ErrorInfo
}

export class ErrorBoundary extends Component<ErrorBoundaryProps & { children: ReactNode }> {
    state: ErrorBoundarySate = {
        error    : null,
        errorInfo: null,
    };

    componentDidCatch (error: Error, errorInfo: ErrorInfo) {
        this.setState({ error, errorInfo });
    }

    render () {
        if (this.state.error && this.props.silent) return null;

        if (this.state.errorInfo) {
            return (
                <div style={ { padding: 16 } }>
                    <h2>Error</h2>
                    <details style={ { whiteSpace: 'pre-wrap' } }>
                        { this.state.error && this.state.error.toString() }
                        <br />
                        { this.state.errorInfo.componentStack }
                    </details>
                </div>
            );
        }

        return this.props.children;
    }
}
