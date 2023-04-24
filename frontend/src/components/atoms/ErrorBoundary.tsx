import React, { Component, ErrorInfo, ReactNode } from "react";

interface ErrorBoundaryState {
  error: Error | null;
}

class ErrorBoundary extends Component<React.PropsWithChildren<{}>, ErrorBoundaryState> {
  constructor(props: React.PropsWithChildren<{}>) {
    super(props);
    this.state = {
      error: null,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.log({ error, errorInfo });
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { error };
  }

  render(): ReactNode {
    if (this.state.error) {
      return <div style={{ color: "red" }}>Error boundary errorrrr</div>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
