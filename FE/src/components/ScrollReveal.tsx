import React, { useEffect, useRef, useState } from "react";

export type RevealVariant = "up" | "scale" | "fade" | "left" | "right";

export interface ScrollRevealProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
  variant?: RevealVariant;
  delay?: number; // ms, e.g. 75, 100, 150, 200, 300
  threshold?: number; // 0 to 1, default 0.12
  once?: boolean; // default true
  as?: React.ElementType;
  className?: string;
}

/**
 * Hook to apply scroll reveal class when the element scrolls into view
 */
export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(
  options: {
    threshold?: number;
    once?: boolean;
  } = {}
) {
  const { threshold = 0.12, once = true } = options;
  const ref = useRef<T>(null);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Graceful fallback if IntersectionObserver is not supported
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      setIsRevealed(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setIsRevealed(true);
          if (once) {
            observer.unobserve(el);
          }
        } else if (!once) {
          setIsRevealed(false);
        }
      },
      {
        threshold,
        rootMargin: "0px 0px -40px 0px", // triggers slightly before scrolling fully past bottom
      }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, [threshold, once]);

  return { ref, isRevealed };
}

/**
 * ScrollReveal Component
 * Smoothly reveals content when scrolled into view with Zen/Cổ phong aesthetics.
 */
export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  variant = "up",
  delay = 0,
  threshold = 0.12,
  once = true,
  as: Component = "div",
  className = "",
  style,
  ...rest
}) => {
  const { ref, isRevealed } = useScrollReveal<HTMLElement>({
    threshold,
    once,
  });

  const variantClass =
    variant === "scale"
      ? "reveal-scale"
      : variant === "fade"
      ? "reveal-fade"
      : variant === "left"
      ? "reveal-left"
      : variant === "right"
      ? "reveal-right"
      : "";

  const delayClass =
    delay === 75
      ? "delay-75"
      : delay === 100
      ? "delay-100"
      : delay === 150
      ? "delay-150"
      : delay === 200
      ? "delay-200"
      : delay === 250
      ? "delay-250"
      : delay === 300
      ? "delay-300"
      : delay === 400
      ? "delay-400"
      : delay === 500
      ? "delay-500"
      : "";

  const customDelayStyle =
    delay > 0 && !delayClass
      ? { transitionDelay: `${delay}ms`, ...style }
      : style;

  return (
    <Component
      ref={ref}
      className={`scroll-reveal ${variantClass} ${delayClass} ${
        isRevealed ? "is-revealed" : ""
      } ${className}`.trim()}
      style={customDelayStyle}
      {...rest}
    >
      {children}
    </Component>
  );
};

export default ScrollReveal;
