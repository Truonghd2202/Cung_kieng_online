import React, { useState } from "react";
import { Sun, Moon, User, LogOut, Menu, X } from "lucide-react";
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

  return (
    <header className="sticky top-0 z-50 bg-[#f8efe4]/92 dark:bg-[#180508]/92 backdrop-blur-lg border-b border-[#eadcce]/90 dark:border-[#381117] shadow-[0_2px_20px_-4px_rgba(42,24,21,0.05)] dark:shadow-[0_4px_24px_rgba(0,0,0,0.6)] transition-all">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between gap-3 sm:gap-4">
        {/* Brand Logo */}
        <button
          onClick={() => {
            onNavigate("guest");
            setMobileMenuOpen(false);
          }}
          className="flex items-center gap-3 text-left group focus:outline-none cursor-pointer"
        >
          <div className="relative">
            <div className="w-11 h-11 rounded-full p-[1.5px] bg-gradient-to-tr from-[#be8e5a] via-[#8a252c] to-[#e4a86c] shadow-[0_2px_12px_rgba(138,37,44,0.25)] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-300">
              <div className="w-full h-full rounded-full overflow-hidden bg-[#8a252c] flex items-center justify-center">
                <img
                  src="/logo.png"
                  alt="Logo Tin Lắm Tâm Linh"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            {/* Subtle pulse aura */}
            <div className="absolute -inset-0.5 rounded-full bg-[#be8e5a]/20 blur-[3px] pointer-events-none group-hover:bg-[#be8e5a]/40 transition-colors" />
          </div>
          <div>
            <div className="font-['Noto_Serif',serif] font-bold text-lg sm:text-xl leading-tight bg-gradient-to-r from-[#8a252c] via-[#a82f37] to-[#6e1920] dark:from-[#ff9ca4] dark:via-[#f7ede6] dark:to-[#f27c88] bg-clip-text text-transparent tracking-tight">
              Tin Lắm Tâm Linh
            </div>
            <div className="text-[10px] sm:text-[11px] tracking-[0.14em] text-[#8b7770] dark:text-[#bda49c] uppercase font-semibold font-['Be_Vietnam_Pro',sans-serif]">
              Chiêm nghiệm dân gian đương đại
            </div>
          </div>
        </button>

        {/* Navigation items in elevated pill track */}
        <nav className="hidden md:flex items-center p-1 bg-[#eee2d4]/70 dark:bg-[#250b10]/90 rounded-full border border-[#e2d2c1]/80 dark:border-[#4d1b24] shadow-inner gap-1">
          <Button
            variant={
              ["today", "mood", "loading", "result", "saved"].includes(currentScreen)
                ? "default"
                : "ghost"
            }
            size="pill"
            onClick={() => onNavigate("today")}
            className="text-xs sm:text-sm font-medium transition-all"
          >
            Hôm nay
          </Button>

          <Button
            variant={
              [
                "experience",
                "xinxam",
                "wish",
                "zen",
                "gratitude",
                "xinkeo",
                "horoscope",
              ].includes(currentScreen)
                ? "default"
                : "ghost"
            }
            size="pill"
            onClick={() => onNavigate("xinxam")}
            className="text-xs sm:text-sm font-medium transition-all"
          >
            Trải nghiệm
          </Button>

          <Button
            variant={
              [
                "culture",
                "culture-detail",
                "rituals",
                "ritual-detail",
                "calendar",
                "calendar-detail",
                "good-days",
              ].includes(currentScreen)
                ? "default"
                : "ghost"
            }
            size="pill"
            onClick={() => onNavigate("culture")}
            className="text-xs sm:text-sm font-medium transition-all"
          >
            Khám phá
          </Button>

          <Button
            variant={["account", "settings"].includes(currentScreen) ? "default" : "ghost"}
            size="pill"
            onClick={() => onNavigate("account")}
            className="text-xs sm:text-sm font-medium transition-all"
          >
            Góc của tôi
          </Button>
        </nav>

        {/* Right action controls */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Subtle Lunar Date Badge */}
          <div className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#f4e8dc]/70 dark:bg-[#2c0e14]/70 border border-[#e4d4c5] dark:border-[#4d1b24] text-[11px] font-medium text-[#755f56] dark:text-[#d4bfb7]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#be8e5a] animate-pulse"></span>
            <span>Tiết Khí An Lành</span>
          </div>

          <Button
            variant="outline"
            size="icon"
            onClick={onToggleDark}
            title={dark ? "Chuyển sang Màu Be (Ban Ngày)" : "Chuyển sang Màu Đỏ (Ban Đêm)"}
            className="dark:border-[#4d1b24] dark:text-[#f7ede6] shadow-xs hover:scale-105 transition-transform"
          >
            {dark ? <Moon className="w-4 h-4 text-[#ff9ca4]" /> : <Sun className="w-4 h-4 text-[#8a252c]" />}
          </Button>

          {user ? (
            <div className="flex items-center gap-1.5">
              <Button
                variant="outline"
                size="pill"
                onClick={() => onNavigate("account")}
                className="text-xs font-semibold gap-1.5 border-[#eadcce] bg-white/90 text-[#2a1815] dark:bg-[#2c0e14] dark:border-[#4d1b24] dark:text-[#f7ede6] max-w-[130px] sm:max-w-[160px] shadow-xs hover:border-[#8a252c]/50 transition-colors"
                title={`Tài khoản: ${user.name}`}
              >
                <div className="w-4 h-4 rounded-full bg-[#8a252c]/10 dark:bg-[#a62734]/30 flex items-center justify-center shrink-0">
                  <User className="w-2.5 h-2.5 text-[#8a252c] dark:text-[#ff9ca4]" />
                </div>
                <span className="truncate">{user.name}</span>
              </Button>

              {onLogout && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onLogout}
                  title="Đăng xuất"
                  className="text-[#8b7770] hover:text-[#8a252c] dark:text-[#a0837b] dark:hover:text-[#ff9ca4]"
                >
                  <LogOut className="w-4 h-4" />
                </Button>
              )}
            </div>
          ) : (
            <Button
              variant="default"
              size="pill"
              onClick={onLoginClick || (() => onNavigate("login"))}
              className="hidden sm:inline-flex shadow-sm"
            >
              Đăng nhập
            </Button>
          )}

          {/* Mobile Menu Toggle Button */}
          <Button
            variant="outline"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden border-[#eadcce] text-[#2a1815] dark:border-[#4d1b24] dark:text-[#f7ede6]"
            aria-label="Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <nav className="md:hidden border-t border-[#e2d4c3] dark:border-[#3e1219] bg-[#f5ece1] dark:bg-[#180508] px-4 py-4 space-y-2 shadow-lg animate-in fade-in slide-in-from-top-2 duration-150">
          <Button
            variant={
              ["today", "mood", "loading", "result", "saved"].includes(currentScreen)
                ? "default"
                : "ghost"
            }
            className="w-full justify-start text-sm font-medium"
            onClick={() => {
              onNavigate("today");
              setMobileMenuOpen(false);
            }}
          >
            Hôm nay
          </Button>

          <Button
            variant={
              [
                "experience",
                "xinxam",
                "wish",
                "zen",
                "gratitude",
                "xinkeo",
                "horoscope",
              ].includes(currentScreen)
                ? "default"
                : "ghost"
            }
            className="w-full justify-start text-sm font-medium"
            onClick={() => {
              onNavigate("xinxam");
              setMobileMenuOpen(false);
            }}
          >
            Trải nghiệm
          </Button>

          <Button
            variant={
              [
                "culture",
                "culture-detail",
                "rituals",
                "ritual-detail",
                "calendar",
                "calendar-detail",
                "good-days",
              ].includes(currentScreen)
                ? "default"
                : "ghost"
            }
            className="w-full justify-start text-sm font-medium"
            onClick={() => {
              onNavigate("culture");
              setMobileMenuOpen(false);
            }}
          >
            Khám phá
          </Button>

          <Button
            variant={["account", "settings"].includes(currentScreen) ? "default" : "ghost"}
            className="w-full justify-start text-sm font-medium"
            onClick={() => {
              onNavigate("account");
              setMobileMenuOpen(false);
            }}
          >
            Góc của tôi
          </Button>

          {!user && (
            <div className="pt-2 border-t border-[#f1e5d8] dark:border-[#382b26]">
              <Button
                variant="default"
                className="w-full text-sm font-semibold"
                onClick={() => {
                  if (onLoginClick) onLoginClick();
                  else onNavigate("login");
                  setMobileMenuOpen(false);
                }}
              >
                Đăng nhập / Đăng ký
              </Button>
            </div>
          )}
        </nav>
      )}
    </header>
  );
};
