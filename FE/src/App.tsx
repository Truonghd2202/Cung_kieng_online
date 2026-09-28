import { useEffect, useState } from "react";
import { AppHeader, NavScreen } from "./components/AppHeader";
import { AppFooter } from "./components/AppFooter";
import { GuestScreen } from "./screens/GuestScreen";
import { TodayScreen } from "./screens/TodayScreen";
import { MoodCheckInScreen } from "./screens/MoodCheckInScreen";
import { SignalLoadingScreen } from "./screens/SignalLoadingScreen";
import { SignalResultScreen } from "./screens/SignalResultScreen";
import { LoginScreen } from "./screens/LoginScreen";
import { RegisterScreen } from "./screens/RegisterScreen";
import { CompletionScreen } from "./screens/CompletionScreen";
import { MoodKey, SIGNALS_DATA } from "./data/demoSignals";
import { Button } from "@/src/components/ui/button";
import { Badge } from "@/src/components/ui/badge";
import { Card } from "@/src/components/ui/card";
import { Trash2, Calendar, BookOpen, ArrowRight, Flower2 } from "lucide-react";

interface SavedEntry {
  id: string;
  mood: MoodKey;
  date: string;
  journal?: string;
  poemLine1: string;
  poemLine2: string;
}

interface UserProfile {
  name: string;
  email: string;
}

export default function App() {
  const [screen, setScreen] = useState<NavScreen>("guest");
  const [journalText, setJournalText] = useState("");
  const [dark, setDark] = useState(() => localStorage.getItem("tltl-theme") === "dark");

  const todayDateString = new Date().toDateString();

  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => {
    try {
      const stored = localStorage.getItem("tltl-current-user");
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const [pendingEntry, setPendingEntry] = useState<SavedEntry | null>(null);

  const [isCheckedIn, setIsCheckedIn] = useState<boolean>(() => {
    try {
      const lastCheckIn = localStorage.getItem("tltl-last-checkin-date");
      return lastCheckIn === todayDateString;
    } catch {
      return false;
    }
  });

  const [selectedMood, setSelectedMood] = useState<MoodKey>(() => {
    try {
      const savedMood = localStorage.getItem("tltl-today-mood");
      if (
        savedMood &&
        ["An yên", "Chênh vênh", "Băn khoăn", "Nôn nóng", "Biết ơn", "Cần điểm tựa"].includes(savedMood)
      ) {
        return savedMood as MoodKey;
      }
    } catch {
      // fallback
    }
    return "Chênh vênh";
  });

  const [savedEntries, setSavedEntries] = useState<SavedEntry[]>(() => {
    try {
      const stored = localStorage.getItem("tltl-saved-entries");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          // Bỏ bản ghi mẫu demo-1 nếu trước đó đã lưu vào localStorage
          return parsed.filter((item: any) => item.id !== "demo-1");
        }
      }
    } catch {
      // fallback
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem("tltl-theme", dark ? "dark" : "light");
    if (dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [dark]);

  useEffect(() => {
    localStorage.setItem("tltl-saved-entries", JSON.stringify(savedEntries));
  }, [savedEntries]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("tltl-current-user", JSON.stringify(currentUser));
    } else {
      localStorage.removeItem("tltl-current-user");
    }
  }, [currentUser]);

  // Handle URL history sync
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname.replace(/^\//, "");
      if (["guest", "today", "mood", "loading", "result", "account", "login", "register", "saved"].includes(path)) {
        setScreen(path as NavScreen);
      } else {
        setScreen("guest");
      }
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const navigateTo = (newScreen: NavScreen) => {
    setScreen(newScreen);
    window.history.pushState(null, "", newScreen === "guest" ? "/" : `/${newScreen}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleStartSignalFromGuest = (mood: MoodKey) => {
    setSelectedMood(mood);
    navigateTo("mood");
  };

  const handleSubmitMood = () => {
    navigateTo("loading");
  };

  const handleFinishLoading = () => {
    setIsCheckedIn(true);
    try {
      localStorage.setItem("tltl-last-checkin-date", todayDateString);
      localStorage.setItem("tltl-today-mood", selectedMood);
    } catch {}
    navigateTo("result");
  };

  const handleSaveResult = () => {
    setIsCheckedIn(true);
    try {
      localStorage.setItem("tltl-last-checkin-date", todayDateString);
      localStorage.setItem("tltl-today-mood", selectedMood);
    } catch {}

    const signal = SIGNALS_DATA[selectedMood];
    const newEntry: SavedEntry = {
      id: Date.now().toString(),
      mood: selectedMood,
      date: new Date().toLocaleDateString("vi-VN"),
      journal: journalText.trim() || undefined,
      poemLine1: signal.poem.line1,
      poemLine2: signal.poem.line2,
    };

    if (!currentUser) {
      // Khách chưa đăng nhập: Ghi nhận kết quả chờ lưu & chuyển đến màn đăng nhập mô phỏng
      setPendingEntry(newEntry);
      navigateTo("login");
    } else {
      // Đã đăng nhập: Lưu trực tiếp và sang màn hoàn tất
      setSavedEntries([newEntry, ...savedEntries]);
      navigateTo("saved");
    }
  };

  const handleSimulatedLogin = (name?: string, email?: string) => {
    const user: UserProfile = {
      name: name || "Lữ khách An Yên",
      email: email || "annhien@tinlam.vn",
    };
    setCurrentUser(user);

    if (pendingEntry) {
      setSavedEntries([pendingEntry, ...savedEntries]);
      setPendingEntry(null);
      navigateTo("saved");
    } else {
      navigateTo("account");
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    navigateTo("guest");
  };

  const handleDeleteEntry = (id: string) => {
    setSavedEntries(savedEntries.filter((item) => item.id !== id));
  };

  return (
    <div className={`min-h-screen flex flex-col bg-[#fcf8f2] text-[#2e2624] font-['Be_Vietnam_Pro',sans-serif] ${dark ? "dark" : ""}`}>
      {/* Universal Header */}
      <AppHeader
        currentScreen={screen}
        onNavigate={navigateTo}
        dark={dark}
        onToggleDark={() => setDark(!dark)}
        onLoginClick={() => navigateTo("login")}
        user={currentUser}
        onLogout={handleLogout}
      />

      {/* Screen Router */}
      <div className="flex-1">
        {screen === "guest" && (
          <GuestScreen
            onStartSignal={handleStartSignalFromGuest}
            onGoToToday={() => navigateTo("today")}
            onGoToAccount={() => navigateTo("account")}
          />
        )}

        {screen === "today" && (
          <TodayScreen
            isCheckedIn={isCheckedIn}
            mood={selectedMood}
            onSelectMoodClick={() => navigateTo("mood")}
            onViewSignalDetails={() => navigateTo("result")}
            onExploreRegion={(region) => {
              if (region === "Bắc Bộ") setSelectedMood("An yên");
              else if (region === "Trung Bộ") setSelectedMood("Chênh vênh");
              else setSelectedMood("Biết ơn");
              navigateTo("mood");
            }}
          />
        )}

        {screen === "mood" && (
          <MoodCheckInScreen
            selectedMood={selectedMood}
            onSelectMood={setSelectedMood}
            journalText={journalText}
            onChangeJournal={setJournalText}
            onBackToToday={() => navigateTo("today")}
            onSubmit={handleSubmitMood}
          />
        )}

        {screen === "loading" && (
          <SignalLoadingScreen
            mood={selectedMood}
            onFinishLoading={handleFinishLoading}
            onCancel={() => navigateTo("mood")}
          />
        )}

        {screen === "result" && (
          <SignalResultScreen
            mood={selectedMood}
            onSaveToAccount={handleSaveResult}
            onRefreshSignal={() => {
              const moods: MoodKey[] = ["An yên", "Chênh vênh", "Băn khoăn", "Nôn nóng", "Biết ơn", "Cần điểm tựa"];
              const otherMoods = moods.filter((m) => m !== selectedMood);
              const nextMood = otherMoods[Math.floor(Math.random() * otherMoods.length)];
              setSelectedMood(nextMood);
            }}
            onGoToDiary={() => navigateTo("account")}
          />
        )}

        {screen === "login" && (
          <LoginScreen
            onBack={() => navigateTo(pendingEntry ? "result" : "guest")}
            onSuccess={handleSimulatedLogin}
            onGoToRegister={() => navigateTo("register")}
            pendingSignalMood={pendingEntry?.mood}
          />
        )}

        {screen === "register" && (
          <RegisterScreen
            onBack={() => navigateTo("login")}
            onSuccess={handleSimulatedLogin}
            onGoToLogin={() => navigateTo("login")}
            pendingSignalMood={pendingEntry?.mood}
          />
        )}

        {screen === "saved" && (
          <CompletionScreen
            mood={selectedMood}
            isLoggedIn={!!currentUser}
            userName={currentUser?.name}
            onGoToHome={() => navigateTo("today")}
            onGoToAccount={() => navigateTo("account")}
            onGoToAuth={() => {
              const signal = SIGNALS_DATA[selectedMood];
              const newEntry: SavedEntry = {
                id: Date.now().toString(),
                mood: selectedMood,
                date: new Date().toLocaleDateString("vi-VN"),
                journal: journalText.trim() || undefined,
                poemLine1: signal.poem.line1,
                poemLine2: signal.poem.line2,
              };
              setPendingEntry(newEntry);
              navigateTo("login");
            }}
          />
        )}

        {screen === "account" && (
          <div className="w-full min-h-screen bg-[#fcf8f2] text-[#2e2624] font-['Be_Vietnam_Pro',sans-serif]">
            <main className="max-w-5xl mx-auto px-4 sm:px-6 pt-10 pb-16">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-[#eddcd0]">
                <div>
                  <Badge variant="terracotta" className="gap-2 px-3 py-1 mb-2 uppercase tracking-wider text-xs">
                    <Flower2 className="w-3.5 h-3.5" />
                    <span>Không gian lưu giữ cá nhân</span>
                  </Badge>
                  <h1 className="text-3xl sm:text-4xl font-['Noto_Serif',serif] font-bold text-[#2a2220]">
                    Góc của tôi • Nhật ký an yên
                  </h1>
                  <p className="mt-1.5 text-xs sm:text-sm text-[#77665f]">
                    Nơi lưu lại các quẻ chữ, lời chiêm nghiệm và tâm tư bạn đã gửi gắm mỗi ngày.
                  </p>
                </div>

                <Button
                  variant="default"
                  size="pill"
                  onClick={() => navigateTo("mood")}
                  className="gap-2 self-start sm:self-auto"
                >
                  <span>Gieo tín hiệu mới</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>

              {/* Frontend Demo Banner */}
              <div className="mb-6 p-4 rounded-2xl bg-[#fbf3ec] border border-[#ecd9cb] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-[#78645c] shadow-2xs">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="text-[10px] font-bold text-[#9e3b2e] bg-white border-[#e6cbba]">
                    FRONTEND DEMO
                  </Badge>
                  <span>
                    Chưa kết nối Backend • Dữ liệu đang được lưu tạm trên Local Storage của trình duyệt.
                  </span>
                </div>
                {currentUser ? (
                  <div className="flex items-center gap-2 sm:gap-3 self-end sm:self-auto">
                    <span className="text-[#9e3b2e] font-semibold">
                      {currentUser.name} ({currentUser.email})
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleLogout}
                      className="text-xs text-[#8a7a72] hover:text-[#9e3b2e] h-7 px-2"
                    >
                      Đăng xuất (Demo)
                    </Button>
                  </div>
                ) : (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigateTo("login")}
                    className="text-xs font-semibold self-start sm:self-auto h-7 px-3 border-[#dfc6b3]"
                  >
                    Đăng nhập mô phỏng
                  </Button>
                )}
              </div>

              {savedEntries.length === 0 ? (
                <Card className="p-12 text-center max-w-lg mx-auto shadow-xs">
                  <div className="w-12 h-12 mx-auto rounded-full bg-[#faede2] text-[#9e3b2e] flex items-center justify-center mb-4">
                    <BookOpen className="w-6 h-6" />
                  </div>
                  <h3 className="font-['Noto_Serif',serif] font-bold text-lg text-[#2a2220] mb-2">
                    Chưa có nhật ký nào được lưu
                  </h3>
                  <p className="text-xs sm:text-sm text-[#7a6b64] mb-6">
                    Hãy khởi đầu ngày mới bằng việc chọn một tâm trạng và đón nhận lời nhắn lành.
                  </p>
                  <Button
                    variant="default"
                    size="pill"
                    onClick={() => navigateTo("mood")}
                  >
                    Chọn tâm trạng ngay
                  </Button>
                </Card>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {savedEntries.map((item) => (
                    <Card
                      key={item.id}
                      className="p-6 shadow-xs flex flex-col justify-between hover:border-[#dfc3af] transition-all"
                    >
                      <div>
                        <div className="flex items-center justify-between text-xs text-[#8c7b74] mb-3">
                          <span className="flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5 text-[#9e3b2e]" />
                            <span>{item.date}</span>
                          </span>
                          <Badge variant="terracotta">{item.mood}</Badge>
                        </div>

                        <div className="p-4 rounded-2xl bg-[#fbf5ee] border border-[#f0dfd1] mb-4">
                          <p className="font-['Noto_Serif',serif] italic font-semibold text-sm sm:text-base text-[#2c2220] leading-snug">
                            “{item.poemLine1}
                            <br />
                            {item.poemLine2}”
                          </p>
                        </div>

                        {item.journal && (
                          <div className="text-xs text-[#6e5d56] leading-relaxed italic bg-[#faf4ed]/60 p-3 rounded-xl border border-[#ede0d5] mb-4">
                            "{item.journal}"
                          </div>
                        )}
                      </div>

                      <div className="pt-3 border-t border-[#f4e8dc] flex items-center justify-between text-xs">
                        <Button
                          variant="link"
                          onClick={() => {
                            setSelectedMood(item.mood);
                            navigateTo("result");
                          }}
                          className="text-[#9e3b2e] font-semibold flex items-center gap-1"
                        >
                          <span>Xem lại chiêm nghiệm</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Button>

                        <button
                          onClick={() => handleDeleteEntry(item.id)}
                          title="Xóa ghi chép này"
                          className="text-[#aa9991] hover:text-[#9e3b2e] p-1.5 rounded-lg transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </main>
          </div>
        )}
      </div>

      {/* Universal Footer */}
      <AppFooter />
    </div>
  );
}
