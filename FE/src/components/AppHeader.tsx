import React, { useEffect, useRef, useState } from "react";
import { LogOut, Menu, Moon, Sun, UserRound, X } from "lucide-react";
import { Button } from "@/src/components/ui/button";

export type NavScreen =
  | "guest"
  | "today"
  | "mood"
  | "loading"
  | "result"
  | "account"
  | "culture"
  | "culture-detail"
  | "rituals"
  | "ritual-detail"
  | "calendar"
  | "calendar-detail"
  | "experience"
  | "sanctuary"
  | "ancestor-altar"
  | "memorial"
  | "memorial-form"
  | "culture-map"
  | "region-culture"
  | "chau-van"
  | "sea-prayer"
  | "southern-culture"
  | "mood-journey"
  | "notifications"
  | "xinxam"
  | "wish"
  | "zen"
  | "gratitude"
  | "saved"
  | "login"
  | "register"
  | "forgot"
  | "xinkeo"
  | "good-days"
  | "horoscope"
  | "astrology"
  | "membership"
  | "settings";

interface AppHeaderProps {
  currentScreen: NavScreen;
  onNavigate: (screen: NavScreen) => void;
  dark?: boolean;
  onToggleDark?: () => void;
  onLoginClick?: () => void;
  user?: { name: string; email: string } | null;
  onLogout?: () => void;
}

const navItems: { label: string; target: NavScreen; screens: NavScreen[] }[] = [
  { label: "Hôm nay", target: "today", screens: ["today", "mood", "loading", "result", "saved"] },
  { label: "Trải nghiệm", target: "experience", screens: ["experience", "xinxam", "wish", "zen", "gratitude", "xinkeo", "horoscope", "astrology", "sanctuary", "ancestor-altar", "memorial", "memorial-form"] },
  { label: "Khám phá", target: "culture", screens: ["culture", "culture-detail", "culture-map", "region-culture", "chau-van", "sea-prayer", "southern-culture", "rituals", "ritual-detail", "calendar", "calendar-detail", "good-days"] },
  { label: "Góc của tôi", target: "account", screens: ["account", "settings", "mood-journey", "notifications"] },
];

export const AppHeader: React.FC<AppHeaderProps> = ({
  currentScreen,
  onNavigate,
  dark = false,
  onToggleDark,
  onLoginClick,
  user,
  onLogout,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [currentScreen]);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1024px)");

    const closeOnDesktop = () => {
      if (desktop.matches) {
        setMobileMenuOpen(false);
      }
    };

    closeOnDesktop();
    desktop.addEventListener("change", closeOnDesktop);

    return () => {
      desktop.removeEventListener("change", closeOnDesktop);
    };
  }, []);
  const closeMenu = () => setMobileMenuOpen(false);
  const goTo = (screen: NavScreen) => {
    onNavigate(screen);
    closeMenu();
  };

  const renderNavigation = (mobile = false) => (
    <nav className={mobile ? "mobile-menu" : "primary-nav"} aria-label="Điều hướng chính" data-open={mobile ? mobileMenuOpen : undefined}>
      {navItems.map((item) => {
        const active = item.screens.includes(currentScreen);
        return (
          <button
            key={item.target}
            type="button"
            className="nav-link"
            aria-current={
              currentScreen === item.target
                ? "page"
                : active
                  ? "location"
                  : undefined
            }
            onClick={() => goTo(item.target)}
          >
            {item.label}
          </button>
        );
      })}
      {mobile && !user && (
        <Button
          variant="default"
          className="mt-2 w-full"
          onClick={() => {
            (onLoginClick || (() => onNavigate("login")))();
            closeMenu();
          }}
        >
          Đăng nhập / Đăng ký
        </Button>
      )}
      {mobile && user && onLogout && (
        <Button variant="ghost" className="mt-2 w-full justify-start" onClick={() => { onLogout(); closeMenu(); }}>
          <LogOut className="h-4 w-4" aria-hidden="true" />
          Đăng xuất
        </Button>
      )}
    </nav>
  );

  return (
    <header className="site-header" onKeyDown={(event) => {
      if (event.key === "Escape" && mobileMenuOpen) {
        closeMenu();
        menuButtonRef.current?.focus();
      }
    }}>
      <div className="site-header__inner">
        <button
          type="button"
          onClick={() => goTo("guest")}
          className="brand-link"
          aria-label="Tin Lắm Tâm Linh — về trang chủ"
        >
          <span className="brand-mark">
            <img src="/logo.png" alt="" />
          </span>
          <span className="min-w-0">
            <span className="brand-name">Tin Lắm Tâm Linh</span>
            <span className="brand-caption">Chiêm nghiệm dân gian đương đại</span>
          </span>
        </button>

        {renderNavigation()}

        <div className="header-actions">
          <button
            type="button"
            className="icon-control"
            onClick={onToggleDark}
            aria-label={dark ? "Chuyển sang giao diện sáng" : "Chuyển sang giao diện tối"}
            title={dark ? "Chuyển sang Màu Be (Ban Ngày)" : "Chuyển sang Màu Đỏ (Ban Đêm)"}
          >
            {dark ? <Moon className="h-4 w-4" aria-hidden="true" /> : <Sun className="h-4 w-4" aria-hidden="true" />}
          </button>

          {user ? (
            <>
              <button
                type="button"
                className="header-account inline-flex min-h-11 max-w-44 items-center gap-2 rounded-control px-2.5 text-sm font-semibold text-ink hover:bg-surface-soft"
                onClick={() => goTo("account")}
                title={`Tài khoản: ${user.name}`}
                aria-label={`Mở Góc của tôi — ${user.name}`}
              >
                <UserRound className="h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                <span className="hidden truncate sm:inline">{user.name}</span>
              </button>
              {onLogout && (
                <button type="button" className="icon-control hidden sm:inline-grid" onClick={onLogout} aria-label="Đăng xuất" title="Đăng xuất">
                  <LogOut className="h-4 w-4" aria-hidden="true" />
                </button>
              )}
            </>
          ) : (
            <Button
              variant="outline"
              size="pill"
              className="hidden sm:inline-flex border-line text-ink hover:border-accent hover:text-accent bg-surface/50 font-medium text-xs px-4"
              onClick={onLoginClick || (() => onNavigate("login"))}
            >
              Đăng nhập
            </Button>
          )}

          <button
            ref={menuButtonRef}
            type="button"
            className="icon-control lg:hidden"
            onClick={() => setMobileMenuOpen((open) => !open)}
            aria-label={mobileMenuOpen ? "Đóng menu" : "Mở menu"}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-primary-navigation"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
          </button>
        </div>
      </div>

      <div id="mobile-primary-navigation" className={mobileMenuOpen ? "lg:hidden" : "hidden lg:hidden"}>
        {renderNavigation(true)}
      </div>
    </header>
  );
};
