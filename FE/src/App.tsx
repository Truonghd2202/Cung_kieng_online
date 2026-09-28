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
import {
  MoodKey,
  getSignalById,
  getDefaultSignalForMood,
  getNextSignalForMood,
} from "./data/demoSignals";
import { Button } from "@/src/components/ui/button";
import { Badge } from "@/src/components/ui/badge";
import { Card } from "@/src/components/ui/card";
import { Trash2, Calendar, BookOpen, ArrowRight, Flower2, Sparkles } from "lucide-react";

interface SavedEntry {
  id: string;
  signalId: string;
  mood: MoodKey;
  date: string;
  journal?: string;
  poemLine1: string;
  poemLine2: string;
  actionTitle?: string;
}

interface UserProfile {
  name: string;
  email: string;
}

export default function App() {
  const todayDateString = new Date().toDateString();

  // Helper to resolve initial screen from URL
  const getInitialScreen = (): NavScreen => {
    const path = window.location.pathname.replace(/^\//, "");
    if (["guest", "today", "mood", "loading", "result", "account", "login", "register", "saved"].includes(path)) {
      return path as NavScreen;
    }
    return "guest";
  };

  // Check URL signalId first
  const initialUrlSignalId = new URLSearchParams(window.location.search).get("signalId");
  const initialUrlSignal = initialUrlSignalId ? getSignalById(initialUrlSignalId) : null;

  const [screen, setScreen] = useState<NavScreen>(getInitialScreen);
  const [journalText, setJournalText] = useState("");
  const [dark, setDark] = useState(() => localStorage.getItem("tltl-theme") === "dark");

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
    if (initialUrlSignal) {
      return initialUrlSignal.mood;
    }
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

  const [currentSignalId, setCurrentSignalId] = useState<string>(() => {
    if (initialUrlSignal) {
      return initialUrlSignal.id;
    }
    try {
      const storedSigId = localStorage.getItem("tltl-current-signal-id");
      if (storedSigId && getSignalById(storedSigId)) {
        return storedSigId;
      }
    } catch {}
    return getDefaultSignalForMood("Chênh vênh").id;
  });

  // Trạng thái hành động hoàn thành được nâng lên App.tsx và lưu theo ngày
  const [isActionDone, setIsActionDone] = useState<boolean>(() => {
    try {
      const doneDate = localStorage.getItem("tltl-action-done-date");
      return doneDate === todayDateString;
    } catch {
      return false;
    }
  });

  const [savedEntries, setSavedEntries] = useState<SavedEntry[]>(() => {
    try {
      const stored = localStorage.getItem("tltl-saved-entries");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          return parsed.filter((item: any) => item.id !== "demo-1");
        }
      }
    } catch {
      // fallback
    }
    return [];
  });

  // Active signal computed from currentSignalId
  const activeSignal = getSignalById(currentSignalId) || getDefaultSignalForMood(selectedMood);

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

  useEffect(() => {
    localStorage.setItem("tltl-current-signal-id", currentSignalId);
  }, [currentSignalId]);

  // Handle URL history sync & direct link / popstate reload
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname.replace(/^\//, "");
      const params = new URLSearchParams(window.location.search);
      const urlSignalId = params.get("signalId");
      if (urlSignalId) {
        const sig = getSignalById(urlSignalId);
        if (sig) {
          setCurrentSignalId(sig.id);
          setSelectedMood(sig.mood);
        }
      }
      if (["guest", "today", "mood", "loading", "result", "account", "login", "register", "saved"].includes(path)) {
        setScreen(path as NavScreen);
      } else {
        setScreen("guest");
      }
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const navigateTo = (newScreen: NavScreen, signalIdParam?: string) => {
    setScreen(newScreen);
    let url = newScreen === "guest" ? "/" : `/${newScreen}`;
    if (newScreen === "result") {
      const idToUse = signalIdParam || currentSignalId || activeSignal.id;
      url = `/result?signalId=${idToUse}`;
    }
    window.history.pushState(null, "", url);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleToggleAction = (completed: boolean) => {
    setIsActionDone(completed);
    try {
      if (completed) {
        localStorage.setItem("tltl-action-done-date", todayDateString);
      } else {
        localStorage.removeItem("tltl-action-done-date");
      }
    } catch {}
  };

  const handleStartSignalFromGuest = (mood: MoodKey) => {
    setSelectedMood(mood);
    const defaultSig = getDefaultSignalForMood(mood);
    setCurrentSignalId(defaultSig.id);
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
      localStorage.setItem("tltl-current-signal-id", activeSignal.id);
    } catch {}
    navigateTo("result", activeSignal.id);
  };

  // Đổi tín hiệu: GIỮ NGUYÊN TÂM TRẠNG, chỉ đổi quẻ tín hiệu khác cùng tâm trạng
  const handleRefreshSignal = () => {
    const nextSignal = getNextSignalForMood(activeSignal.id, selectedMood);
    setCurrentSignalId(nextSignal.id);
    try {
      localStorage.setItem("tltl-current-signal-id", nextSignal.id);
    } catch {}
    // Đồng bộ URL ngay lập tức
    window.history.replaceState(null, "", `/result?signalId=${nextSignal.id}`);
  };

  const handleSaveResult = () => {
    setIsCheckedIn(true);
    try {
      localStorage.setItem("tltl-last-checkin-date", todayDateString);
      localStorage.setItem("tltl-today-mood", selectedMood);
      localStorage.setItem("tltl-current-signal-id", activeSignal.id);
    } catch {}

    const newEntry: SavedEntry = {
      id: Date.now().toString(),
      signalId: activeSignal.id,
      mood: activeSignal.mood,
      date: new Date().toLocaleDateString("vi-VN"),
      journal: journalText.trim() || undefined,
      poemLine1: activeSignal.poem.line1,
      poemLine2: activeSignal.poem.line2,
      actionTitle: activeSignal.action.title,
    };

    if (!currentUser) {
      // Khách chưa đăng nhập: Ghi nhận kết quả chờ lưu & chuyển đến màn đăng nhập mô phỏng
      setPendingEntry(newEntry);
      navigateTo("login");
    } else {
      // Đã đăng nhập: Lưu trực tiếp
      const exists = savedEntries.some((e) => e.signalId === activeSignal.id);
      if (!exists) {
        setSavedEntries([newEntry, ...savedEntries]);
      }
    }
  };

  const handleSimulatedLogin = (name?: string, email?: string) => {
    const user: UserProfile = {
      name: name || "Lữ khách An Yên",
      email: email || "annhien@tinlam.vn",
    };
    setCurrentUser(user);

    if (pendingEntry) {
      setSavedEntries((prev) => {
        const exists = prev.some((e) => e.signalId === pendingEntry.signalId);
        return exists ? prev : [pendingEntry, ...prev];
      });
      const savedSigId = pendingEntry.signalId;
      setPendingEntry(null);
      setCurrentSignalId(savedSigId);
      navigateTo("result", savedSigId);
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

  // Mở lại đúng bản ghi tín hiệu đã lưu
  const handleOpenSavedSignal = (entry: SavedEntry) => {
    setSelectedMood(entry.mood);
    setCurrentSignalId(entry.signalId);
    navigateTo("result", entry.signalId);
  };

  const isCurrentSignalSaved = savedEntries.some((e) => e.signalId === activeSignal.id);

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
            isActionDone={isActionDone}
            onSelectMoodClick={() => navigateTo("mood")}
            onViewSignalDetails={() => navigateTo("result", activeSignal.id)}
          />
        )}

        {screen === "mood" && (
          <MoodCheckInScreen
            selectedMood={selectedMood}
            onSelectMood={(mood) => {
              setSelectedMood(mood);
              const defaultSig = getDefaultSignalForMood(mood);
              setCurrentSignalId(defaultSig.id);
            }}
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
            signal={activeSignal}
            isActionDone={isActionDone}
            onToggleAction={handleToggleAction}
            onGoToCompletion={() => navigateTo("saved")}
            onSaveToAccount={handleSaveResult}
            onRefreshSignal={handleRefreshSignal}
            onGoToDiary={() => navigateTo("account")}
            isSaved={isCurrentSignalSaved}
          />
        )}

        {screen === "login" && (
          <LoginScreen
            onBack={() => navigateTo(pendingEntry ? "result" : "guest", pendingEntry?.signalId)}
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
            signal={activeSignal}
            isLoggedIn={!!currentUser}
            userName={currentUser?.name}
            onGoToHome={() => navigateTo("today")}
            onGoToAccount={() => navigateTo("account")}
            onGoToAuth={() => {
              const newEntry: SavedEntry = {
                id: Date.now().toString(),
                signalId: activeSignal.id,
                mood: activeSignal.mood,
                date: new Date().toLocaleDateString("vi-VN"),
                journal: journalText.trim() || undefined,
                poemLine1: activeSignal.poem.line1,
                poemLine2: activeSignal.poem.line2,
                actionTitle: activeSignal.action.title,
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
                  <Sparkles className="w-4 h-4" />
                  <span>Gieo tín hiệu mới</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>

              {/* Frontend Demo Banner */}
              <div className="mb-6 p-4 rounded-2xl bg-[#fbf3ec] border border-[#ecd9cb] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-[#78645c] shadow-2xs">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="text-xs font-bold text-[#9e3b2e] bg-white border-[#e6cbba]">
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
                          {item.actionTitle && (
                            <p className="text-xs text-[#85736c] mt-2 font-sans font-medium">
                              Hành động: {item.actionTitle}
                            </p>
                          )}
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
                          onClick={() => handleOpenSavedSignal(item)}
                          className="text-[#9e3b2e] font-semibold flex items-center gap-1 p-0 h-auto"
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
      <AppFooter onNavigate={navigateTo} />
    </div>
  );
}
