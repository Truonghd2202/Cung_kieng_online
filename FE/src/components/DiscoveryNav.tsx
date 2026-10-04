import React from "react";

type DiscoverySection = "culture" | "rituals";

interface DiscoveryNavProps {
  current: DiscoverySection;
  onGoToCulture?: () => void;
  onGoToRituals?: () => void;
  onGoToCalendar?: () => void;
  onGoToPlan?: () => void;
  onGoToMap?: () => void;
}

export const DiscoveryNav: React.FC<
  DiscoveryNavProps
> = ({
  current,
  onGoToCulture,
  onGoToRituals,
  onGoToCalendar,
  onGoToPlan,
  onGoToMap,
}) => {
  const items = [
    {
      key: "culture",
      label: "Bài viết văn hóa",
      href: "/culture",
      onNavigate: onGoToCulture,
    },
    {
      key: "rituals",
      label: "Cẩm nang nghi lễ",
      href: "/rituals",
      onNavigate: onGoToRituals,
    },
    {
      key: "calendar",
      label: "Lịch văn hóa",
      href: "/calendar",
      onNavigate: onGoToCalendar,
    },
    {
      key: "map",
      label: "Văn hóa ba miền",
      href: "/culture-map",
      onNavigate: onGoToMap,
    },
    {
      key: "plan",
      label: "Kế hoạch cá nhân",
      href: "/good-days",
      onNavigate: onGoToPlan,
    },
  ];

  return (
    <nav
      aria-label="Các mục khám phá"
      className="mb-6 grid grid-cols-2 gap-2 sm:flex sm:flex-wrap"
    >
      {items.map((item) => {
        const active = item.key === current;

        if (!active && !item.onNavigate) {
          return null;
        }

        return (
          <a
            key={item.key}
            href={item.href}
            aria-current={active ? "page" : undefined}
            onClick={(event) => {
              if (
                event.button !== 0 ||
                event.ctrlKey ||
                event.metaKey ||
                event.shiftKey ||
                event.altKey
              ) {
                return;
              }

              event.preventDefault();

              if (!active) {
                item.onNavigate?.();
              }
            }}
            className={[
              "inline-flex min-h-11 items-center",
              "justify-center rounded-xl border px-3 py-2",
              "text-center text-sm font-medium",
              "focus-visible:outline-none",
              "focus-visible:ring-2 focus-visible:ring-accent",
              active
                ? "border-accent/40 bg-accent-soft text-accent"
                : "border-line bg-surface text-ink hover:border-accent hover:text-accent",
            ].join(" ")}
          >
            {item.label}
          </a>
        );
      })}
    </nav>
  );
};
