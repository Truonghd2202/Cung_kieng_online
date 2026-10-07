import { useEffect } from "react";

/**
 * Global Auto Scroll Reveal Hook
 * Automatically observes major sections, cards, and articles across ALL screens in the project.
 * When an element is scrolled into view, it applies the `.is-revealed` class with smooth Zen-inspired transitions.
 */
export function useGlobalScrollReveal(activeScreenKey?: string) {
  useEffect(() => {
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      return;
    }

    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Selector targeting meaningful content containers across all screens
    const TARGET_SELECTORS = [
      ".scroll-reveal",
      "[data-reveal]",
      ".page-container > section",
      ".screen-shell main > section",
      ".today-scroll-card",
      ".today-tea-intro-card",
      ".today-heritage-card",
      ".card-surface",
      ".membership-matrix-frame",
      ".today-masthead",
      ".discovery-masthead",
      ".culture-masthead",
      ".guest-first-look",
      ".guest-cultural-note",
      ".reading-panel",
      ".interactive-card",
      "main > .grid > article",
      "main > .grid > .card",
      "main > .grid > div",
      ".page-container > .grid > *",
      ".page-container > .space-y-6 > *",
      ".page-container > .space-y-8 > *",
    ].join(", ");

    // Set of elements currently being observed
    const observedElements = new WeakSet<Element>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target;
            el.classList.add("is-revealed");
            // Stop observing once revealed to maximize 60fps performance and conserve memory/battery
            observer.unobserve(el);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    const registerElements = () => {
      // Find candidate elements within content areas (ignore fixed header/footer/modals)
      const container = document.querySelector(".app-screen-outlet") || document.body;
      const elements = container.querySelectorAll(TARGET_SELECTORS);

      const windowHeight = window.innerHeight;

      elements.forEach((el, index) => {
        // Skip elements inside dialogs, dropdown menus or header/footer
        if (
          el.closest('[role="dialog"]') ||
          el.closest(".site-header") ||
          el.closest(".site-footer") ||
          el.closest(".mobile-menu")
        ) {
          return;
        }

        // If user prefers reduced motion, reveal instantly
        if (prefersReducedMotion) {
          el.classList.add("is-revealed");
          return;
        }

        // Ensure element has base .scroll-reveal class
        if (!el.classList.contains("scroll-reveal")) {
          el.classList.add("scroll-reveal");

          // Natural staggered delay for sibling items in a grid
          const parentGrid = el.parentElement;
          if (parentGrid && (parentGrid.classList.contains("grid") || parentGrid.style.display === "grid")) {
            const childIndex = Array.from(parentGrid.children).indexOf(el);
            if (childIndex === 1) el.classList.add("delay-100");
            else if (childIndex === 2) el.classList.add("delay-200");
            else if (childIndex >= 3) el.classList.add("delay-300");
          }
        }

        // Check if element is already in initial viewport on page load
        const rect = el.getBoundingClientRect();
        if (rect.top < windowHeight * 0.95 && rect.bottom > 0) {
          // Immediately reveal elements that are already visible on load
          el.classList.add("is-revealed");
        } else if (!observedElements.has(el) && !el.classList.contains("is-revealed")) {
          observedElements.add(el);
          observer.observe(el);
        }
      });
    };

    // Initial registration with a tiny tick to allow layout to settle
    const timer = setTimeout(registerElements, 40);

    // MutationObserver to capture dynamically rendered cards/sub-components
    const mutationObserver = new MutationObserver(() => {
      registerElements();
    });

    const screenOutlet = document.querySelector(".app-screen-outlet") || document.body;
    mutationObserver.observe(screenOutlet, {
      childList: true,
      subtree: true,
    });

    return () => {
      clearTimeout(timer);
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, [activeScreenKey]);
}

export default useGlobalScrollReveal;
