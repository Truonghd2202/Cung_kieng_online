import { Component, type ReactNode } from "react";
import { Button } from "./ui/button";

interface Props {
  children: ReactNode;
  onClose: () => void;
  onOpenAltar: () => void;
}

interface State {
  hasError: boolean;
}

export class SceneErrorBoundary extends Component<Props, State> {
  state: State = {
    hasError: false,
  };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <section
          aria-labelledby="scene-error-title"
          className="rounded-card border border-line bg-surface p-5"
        >
          <h3
            id="scene-error-title"
            className="text-base font-semibold text-ink"
          >
            Chưa mở được cảnh 3D
          </h3>

          <p role="status" className="mt-2 text-sm text-muted">
            Bạn có thể tiếp tục ở bàn thờ gia tiên hoặc
            đóng cảnh và sử dụng những mục bên dưới.
          </p>

          <div className="mt-4 flex flex-wrap gap-3">
            <Button
              type="button"
              onClick={this.props.onOpenAltar}
            >
              Mở bàn thờ gia tiên
            </Button>

            <Button
              type="button"
              variant="outline"
              onClick={this.props.onClose}
            >
              Đóng cảnh 3D
            </Button>
          </div>
        </section>
      );
    }

    return this.props.children;
  }
}
