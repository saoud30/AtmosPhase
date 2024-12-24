'use client';

import { Component, ErrorInfo, ReactNode } from 'react';
import { ErrorState } from './Error/ErrorState';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <ErrorState
          message="Something went wrong. Please refresh the page."
          onRetry={() => window.location.reload()}
        />
      );
    }

    return this.props.children;
  }
}