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
  | "experience"
  | "xinxam"
  | "wish"
  | "zen"
  | "saved"
  | "login"
  | "register"
  | "forgot";

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
    <header className="sticky top-0 z-50 bg-[#fffdfa]/95 dark:bg-[#181311]/95 backdrop-blur-md border-b border-[#f1e5d8] dark:border-[#382b26] transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <button
          onClick={() => {
            onNavigate("guest");
            setMobileMenuOpen(false);
          }}
          className="flex items-center gap-3 text-left group focus:outline-none cursor-pointer"
        >
          <div className="w-10 h-10 rounded-full bg-[#fbf3ec] dark:bg-[#2c201c] border border-[#e8d5c4] dark:border-[#4a3630] flex items-center justify-center text-[#9e3b2e] dark:text-[#de6250] shadow-xs group-hover:scale-105 transition-transform">
            <svg
              className="w-5 h-5 fill-current"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 2C12 2 10 7 10 10C10 11.5 10.8 12.8 12 13.5C13.2 12.8 14 11.5 14 10C14 7 12 2 12 2Z" />
              <path d="M12 14.5C10.5 14 8 13.5 6 15C4 16.5 4 19 6 20.5C8 22 11 20.5 12 17.5C13 20.5 16 22 18 20.5C20 19 20 16.5 18 15C16 13.5 13.5 14 12 14.5Z" />
              <circle cx="12" cy="14" r="1.5" />
            </svg>
          </div>
          <div>
            <div className="font-['Noto_Serif',serif] font-bold text-lg leading-tight text-[#9e3b2e] tracking-tight">
              Tin Lắm Tâm Linh
            </div>
            <div className="text-xs tracking-[0.12em] text-[#86766e] uppercase font-semibold font-['Be_Vietnam_Pro',sans-serif]">
              Chiêm nghiệm dân gian đương đại
            </div>
          </div>
        </button>

        {/* Navigation items matching Image 2 */}
        <nav className="hidden md:flex items-center gap-1 sm:gap-2">
          <Button
            variant={
              ["today", "mood", "loading", "result", "saved"].includes(currentScreen)
                ? "default"
                : "ghost"
            }
            size="pill"
            onClick={() => onNavigate("today")}
          >
            Hôm nay
          </Button>

          <Button
            variant={
              ["experience", "xinxam", "wish", "zen"].includes(currentScreen)
                ? "default"
                : "ghost"
            }
            size="pill"
            onClick={() => onNavigate("xinxam")}
          >
            Trải nghiệm
          </Button>

          <Button
            variant={
              ["culture", "culture-detail", "rituals", "ritual-detail"].includes(
                currentScreen
              )
                ? "default"
                : "ghost"
            }
            size="pill"
            onClick={() => onNavigate("culture")}
          >
            Khám phá
          </Button>

          <Button
            variant={currentScreen === "account" ? "default" : "ghost"}
            size="pill"
            onClick={() => onNavigate("account")}
          >
            Góc của tôi
          </Button>
        </nav>

        {/* Right action controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          <Button
            variant="outline"
            size="icon"
            onClick={onToggleDark}
            title="Đổi giao diện"
            className="dark:border-[#4a3630] dark:text-[#eedcd0]"
          >
            {dark ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
          </Button>

          {user ? (
            <div className="flex items-center gap-1.5">
              <Button
                variant="outline"
                size="pill"
                onClick={() => onNavigate("account")}
                className="text-xs font-semibold gap-1.5 border-[#e8d5c4] bg-[#fbf5ee] text-[#2a2220] dark:bg-[#2c201c] dark:border-[#4a3630] dark:text-[#f3eae4] max-w-[130px] sm:max-w-[160px]"
                title={`Tài khoản: ${user.name}`}
              >
                <User className="w-3.5 h-3.5 text-[#9e3b2e] dark:text-[#de6250] flex-shrink-0" />
                <span className="truncate">{user.name}</span>
              </Button>

              {onLogout && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onLogout}
                  title="Đăng xuất"
                  className="text-[#887870] hover:text-[#9e3b2e] dark:text-[#a8958c]"
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
              className="hidden sm:inline-flex"
            >
              Đăng nhập
            </Button>
          )}

          {/* Mobile Menu Toggle Button */}
          <Button
            variant="outline"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden border-[#ecdacb] text-[#2a2220] dark:border-[#4d3c37] dark:text-[#f3eae4]"
            aria-label="Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <nav className="md:hidden border-t border-[#f1e5d8] dark:border-[#382b26] bg-[#fffdfa] dark:bg-[#1a1412] px-4 py-4 space-y-2 shadow-lg animate-in fade-in slide-in-from-top-2 duration-150">
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
              ["experience", "xinxam", "wish", "zen"].includes(currentScreen)
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
              ["culture", "culture-detail", "rituals", "ritual-detail"].includes(
                currentScreen
              )
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
            variant={currentScreen === "account" ? "default" : "ghost"}
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
