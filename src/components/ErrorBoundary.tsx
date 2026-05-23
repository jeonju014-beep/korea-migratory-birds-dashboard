import { Component, type ErrorInfo, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error(error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen items-center justify-center p-6">
          <div className="glass-card max-w-md p-8 text-center">
            <p className="font-display text-xl text-blush-600">앗, 문제가 생겼어요</p>
            <p className="mt-2 text-sm text-blush-400">페이지를 새로고침해 주세요.</p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
