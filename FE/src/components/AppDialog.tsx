import React, { useEffect, useRef } from "react";

interface AppDialogProps {
  labelledBy: string;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
}

export const AppDialog: React.FC<
  AppDialogProps
> = ({
  labelledBy,
  onClose,
  children,
  className = "",
}) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;

    if (!dialog) return;

    const previousFocus =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;

    const previousOverflow =
      document.body.style.overflow;

    dialog.showModal();
    document.body.style.overflow = "hidden";

    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;

      if (previousFocus?.isConnected) {
        previousFocus.focus({
          preventScroll: true,
        });
      }
    };
  }, []);

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={labelledBy}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onKeyDown={(event) => {
        if (event.key !== "Tab") return;

        const dialog = event.currentTarget;

        const elements = Array.from(
          dialog.querySelectorAll<HTMLElement>(
            [
              "a[href]",
              "button:not([disabled])",
              "input:not([disabled])",
              "select:not([disabled])",
              "textarea:not([disabled])",
              '[tabindex]:not([tabindex="-1"])',
            ].join(",")
          )
        ).filter(
          (element) =>
            element.tabIndex >= 0 &&
            element.getClientRects().length > 0
        );

        const first = elements[0];
        const last = elements[elements.length - 1];

        if (!first || !last) {
          event.preventDefault();
          dialog.focus();
          return;
        }

        if (
          event.shiftKey &&
          document.activeElement === first
        ) {
          event.preventDefault();
          last.focus();
        } else if (
          !event.shiftKey &&
          document.activeElement === last
        ) {
          event.preventDefault();
          first.focus();
        }
      }}
      tabIndex={-1}
      className={[
        "m-auto w-[calc(100%-2rem)] max-w-lg",
        "max-h-[85dvh] overflow-y-auto",
        "overscroll-contain rounded-card",
        "border border-line bg-surface",
        "p-6 text-ink shadow-2xl sm:p-8",
        "backdrop:bg-black/50",
        className,
      ].join(" ")}
    >
      {children}
    </dialog>
  );
};
