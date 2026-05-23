import { Component, type ErrorInfo, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
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
    console.error('Dashboard render error:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <div className="cute-card p-8 text-center text-blush-600">
            <p className="font-display text-lg">화면을 불러오지 못했어요</p>
            <p className="mt-2 text-sm text-blush-400">페이지를 새로고침해 주세요.</p>
          </div>
        )
      );
    }

    return this.props.children;
  }
}
