import { Component, type ReactNode } from "react";
import { Button } from "./ui/button";

interface Props {
  children: ReactNode;
  onClose?: () => void;
  onOpenAltar?: () => void;
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
            {this.props.onOpenAltar
              ? "Bạn có thể mở bàn thờ gia tiên để tiếp tục trải nghiệm."
              : this.props.onClose
                ? "Bạn có thể đóng cảnh và tiếp tục sử dụng những mục bên dưới."
                : "Bạn có thể tiếp tục sử dụng những mục bên dưới."}
          </p>

          {(this.props.onOpenAltar || this.props.onClose) && (
            <div className="mt-4 flex flex-wrap gap-3">
              {this.props.onOpenAltar && (
                <Button
                  type="button"
                  onClick={this.props.onOpenAltar}
                >
                  Mở bàn thờ gia tiên
                </Button>
              )}

              {this.props.onClose && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={this.props.onClose}
                >
                  Đóng cảnh 3D
                </Button>
              )}
            </div>
          )}
        </section>
      );
    }

    return this.props.children;
  }
}
