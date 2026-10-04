import { useEffect, useRef, type ReactNode } from "react";

interface ScreenFocusProps {
  children: ReactNode;
}

export function ScreenFocus({ children }: ScreenFocusProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const heading = container.querySelector<HTMLElement>("h1");
    if (!heading) return;

    // Giữ nguyên tabindex nếu màn đã tự cấu hình.
    const previousTabIndex = heading.getAttribute("tabindex");

    if (previousTabIndex === null) {
      heading.setAttribute("tabindex", "-1");
    }

    heading.focus({ preventScroll: true });

    return () => {
      if (previousTabIndex === null) {
        heading.removeAttribute("tabindex");
      }
    };
  }, []);

  return (
    <div ref={containerRef} className="min-w-0">
      {children}
    </div>
  );
}
