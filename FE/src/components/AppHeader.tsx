import React from "react";
import { Sun, Moon, User } from "lucide-react";
import { Button } from "@/src/components/ui/button";

export type NavScreen = "guest" | "today" | "mood" | "loading" | "result" | "account" | "culture" | "experience";

interface AppHeaderProps {
  currentScreen: NavScreen;
  onNavigate: (screen: NavScreen) => void;
  dark?: boolean;
  onToggleDark?: () => void;
  onLoginClick?: () => void;
}

export const AppHeader: React.FC<AppHeaderProps> = ({
  currentScreen,
  onNavigate,
  dark = false,
  onToggleDark,
  onLoginClick,
}) => {
  return (
    <header className="sticky top-0 z-50 bg-[#fffdfa]/95 backdrop-blur-md border-b border-[#f1e5d8] transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <button
          onClick={() => onNavigate("guest")}
          className="flex items-center gap-3 text-left group focus:outline-none cursor-pointer"
        >
          <div className="w-10 h-10 rounded-full bg-[#fbf3ec] border border-[#e8d5c4] flex items-center justify-center text-[#9e3b2e] shadow-xs group-hover:scale-105 transition-transform">
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
              Tín Lãm Tâm Linh
            </div>
            <div className="text-[10px] tracking-[0.14em] text-[#86766e] uppercase font-semibold font-['Be_Vietnam_Pro',sans-serif]">
              Chiêm nghiệm dân gian đương đại
            </div>
          </div>
        </button>

        {/* Navigation items */}
        <nav className="hidden md:flex items-center gap-1 sm:gap-2">
          <Button
            variant={
              currentScreen === "today" || currentScreen === "mood" || currentScreen === "loading" || currentScreen === "result"
                ? "default"
                : "ghost"
            }
            size="pill"
            onClick={() => onNavigate("today")}
          >
            Hôm nay
          </Button>

          <Button
            variant={currentScreen === "experience" ? "default" : "ghost"}
            size="pill"
            onClick={() => onNavigate("today")}
          >
            Trải nghiệm
          </Button>

          <Button
            variant="ghost"
            size="pill"
            className={currentScreen === "guest" ? "text-[#9e3b2e] font-semibold" : ""}
            onClick={() => onNavigate("guest")}
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
          >
            {dark ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
          </Button>

          <Button
            variant="default"
            size="pill"
            onClick={onLoginClick || (() => onNavigate("account"))}
          >
            Đăng nhập
          </Button>

          <Button
            variant="default"
            size="icon"
            onClick={() => onNavigate("account")}
            title="Tài khoản"
          >
            <User className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </header>
  );
};
