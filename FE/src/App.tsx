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
import { ForgotPasswordScreen } from "./screens/ForgotPasswordScreen";
import { ExperienceScreen } from "./screens/ExperienceScreen";
import { CultureScreen } from "./screens/CultureScreen";
import { CultureDetailScreen } from "./screens/CultureDetailScreen";
import { XinXamScreen } from "./screens/XinXamScreen";
import { WishScreen, WishTopic } from "./screens/WishScreen";
import { RitualGuideScreen } from "./screens/RitualGuideScreen";
import { RitualDetailScreen } from "./screens/RitualDetailScreen";
import { ZenScreen } from "./screens/ZenScreen";
import { AccountScreen } from "./screens/AccountScreen";
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

  // Helper to isolate storage key per simulated user
  const getUserStorageKey = (user: UserProfile | null) => {
    if (!user || !user.email) return null;
    return `tltl-saved-entries-${user.email.trim().toLowerCase()}`;
  };

  const loadUserEntries = (user: UserProfile | null): SavedEntry[] => {
    const key = getUserStorageKey(user);
    if (!key) return [];
    try {
      const stored = localStorage.getItem(key);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          return parsed.filter((item: any) => item.id !== "demo-1");
        }
      }
    } catch {}
    return [];
  };

  const getInitialUser = (): UserProfile | null => {
    try {
      const stored = localStorage.getItem("tltl-current-user");
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  };

  const initialUser = getInitialUser();

  // Helper to resolve initial screen from URL
  const getInitialScreen = (): NavScreen => {
    const path = window.location.pathname.replace(/^\//, "");
    if (path === "account" && !initialUser) {
      return "login";
    }
    if (
      [
        "guest",
        "today",
        "mood",
        "loading",
        "result",
        "account",
        "culture",
        "culture-detail",
        "rituals",
        "ritual-detail",
        "xinxam",
        "wish",
        "zen",
        "login",
        "register",
        "saved",
        "experience",
        "forgot",
      ].includes(path)
    ) {
      return path as NavScreen;
    }
    return "guest";
  };

  // Check URL signalId first
  const initialUrlSignalId = new URLSearchParams(window.location.search).get("signalId");
  const initialUrlSignal = initialUrlSignalId ? getSignalById(initialUrlSignalId) : null;

  // Check URL articleId for CultureDetail
  const initialUrlArticleId = new URLSearchParams(window.location.search).get("articleId") || "dinh-lang-bac-bo";

  // Check URL ritualId for RitualDetail
  const initialUrlRitualId = new URLSearchParams(window.location.search).get("ritualId") || "chuan-bi-ngay-ram";

  const [screen, setScreen] = useState<NavScreen>(getInitialScreen);
  const [selectedArticleId, setSelectedArticleId] = useState<string>(initialUrlArticleId);
  const [selectedRitualId, setSelectedRitualId] = useState<string>(initialUrlRitualId);
  const [journalText, setJournalText] = useState("");
  const [dark, setDark] = useState(() => localStorage.getItem("tltl-theme") === "dark");

  const [currentUser, setCurrentUser] = useState<UserProfile | null>(initialUser);

  const [pendingEntry, setPendingEntry] = useState<SavedEntry | null>(null);

  // Lưu và đồng bộ chủ đề yêu thích từ Trải nghiệm sang Hôm nay
  const [selectedTopics, setSelectedTopics] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem("tltl-selected-topics");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {}
    return ["cadao", "xinxam", "bamien"];
  });

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

  // Tách biệt dữ liệu nhật ký theo từng user mô phỏng
  const [savedEntries, setSavedEntries] = useState<SavedEntry[]>(() => {
    return loadUserEntries(initialUser);
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

  // Đồng bộ nhật ký riêng theo user hiện tại
  useEffect(() => {
    const key = getUserStorageKey(currentUser);
    if (key) {
      localStorage.setItem(key, JSON.stringify(savedEntries));
    }
  }, [savedEntries, currentUser]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("tltl-current-user", JSON.stringify(currentUser));
      setSavedEntries(loadUserEntries(currentUser));
    } else {
      localStorage.removeItem("tltl-current-user");
      setSavedEntries([]);
    }
  }, [currentUser]);

  // Bảo vệ màn Account: chỉ cho người đã đăng nhập truy cập
  useEffect(() => {
    if (screen === "account" && !currentUser) {
      navigateTo("login");
    }
  }, [screen, currentUser]);

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
      const urlArticleId = params.get("articleId");
      if (urlArticleId) {
        setSelectedArticleId(urlArticleId);
      }
      const urlRitualId = params.get("ritualId");
      if (urlRitualId) {
        setSelectedRitualId(urlRitualId);
      }
      if (path === "account" && !currentUser) {
        setScreen("login");
      } else if (
        [
          "guest",
          "today",
          "mood",
          "loading",
          "result",
          "account",
          "culture",
          "culture-detail",
          "rituals",
          "ritual-detail",
          "xinxam",
          "wish",
          "zen",
          "login",
          "register",
          "saved",
          "experience",
          "forgot",
        ].includes(path)
      ) {
        setScreen(path as NavScreen);
      } else {
        setScreen("guest");
      }
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [currentUser]);

  const navigateTo = (newScreen: NavScreen, signalIdParam?: string) => {
    let targetScreen = newScreen;
    // Chuyển hướng về login nếu chưa đăng nhập mà muốn vào account
    if (targetScreen === "account" && !currentUser) {
      targetScreen = "login";
    }
    setScreen(targetScreen);
    let url = targetScreen === "guest" ? "/" : `/${targetScreen}`;
    if (targetScreen === "result") {
      const idToUse = signalIdParam || currentSignalId || activeSignal.id;
      url = `/result?signalId=${idToUse}`;
    } else if (targetScreen === "culture-detail") {
      const idToUse = signalIdParam || selectedArticleId || "dinh-lang-bac-bo";
      url = `/culture-detail?articleId=${idToUse}`;
    } else if (targetScreen === "ritual-detail") {
      const idToUse = signalIdParam || selectedRitualId || "chuan-bi-ngay-ram";
      url = `/ritual-detail?ritualId=${idToUse}`;
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

  // Lưu chủ đề được chọn từ Trải nghiệm
  const handleSaveTopics = (topics: string[]) => {
    setSelectedTopics(topics);
    try {
      localStorage.setItem("tltl-selected-topics", JSON.stringify(topics));
    } catch {}
    navigateTo("today");
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
      // Đã đăng nhập: Lưu trực tiếp theo tài khoản
      const exists = savedEntries.some((e) => e.signalId === activeSignal.id);
      if (!exists) {
        const updated = [newEntry, ...savedEntries];
        setSavedEntries(updated);
        const userKey = getUserStorageKey(currentUser);
        if (userKey) {
          localStorage.setItem(userKey, JSON.stringify(updated));
        }
      }
    }
  };

  const handleSimulatedLogin = (name?: string, email?: string) => {
    const user: UserProfile = {
      name: name || "Lữ khách An Yên",
      email: email || "annhien@tinlam.vn",
    };
    setCurrentUser(user);
    const userEntries = loadUserEntries(user);

    if (pendingEntry) {
      const exists = userEntries.some((e) => e.signalId === pendingEntry.signalId);
      const updated = exists ? userEntries : [pendingEntry, ...userEntries];
      setSavedEntries(updated);
      const key = getUserStorageKey(user);
      if (key) {
        localStorage.setItem(key, JSON.stringify(updated));
      }
      const savedSigId = pendingEntry.signalId;
      setPendingEntry(null);
      setCurrentSignalId(savedSigId);
      navigateTo("result", savedSigId);
    } else {
      setSavedEntries(userEntries);
      navigateTo("account");
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setSavedEntries([]);
    navigateTo("guest");
  };

  const handleDeleteEntry = (id: string) => {
    const updated = savedEntries.filter((item) => item.id !== id);
    setSavedEntries(updated);
    const userKey = getUserStorageKey(currentUser);
    if (userKey) {
      localStorage.setItem(userKey, JSON.stringify(updated));
    }
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
            selectedTopics={selectedTopics}
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

        {screen === "experience" && (
          <ExperienceScreen
            initialTopics={selectedTopics}
            onComplete={handleSaveTopics}
            onSkip={() => navigateTo("guest")}
            onGoToXinXam={() => navigateTo("xinxam")}
            onGoToWish={() => navigateTo("wish")}
            onGoToZen={() => navigateTo("zen")}
          />
        )}

        {screen === "culture" && (
          <CultureScreen
            onSelectArticle={(id) => {
              setSelectedArticleId(id);
              navigateTo("culture-detail", id);
            }}
            onGoToHome={() => navigateTo("today")}
            onGoToRituals={() => navigateTo("rituals")}
          />
        )}

        {screen === "culture-detail" && (
          <CultureDetailScreen
            articleId={selectedArticleId}
            onBackToCulture={() => navigateTo("culture")}
            onSelectRelatedArticle={(id) => {
              setSelectedArticleId(id);
              navigateTo("culture-detail", id);
            }}
            onGoToExperience={() => navigateTo("xinxam")}
            onGoToMood={() => navigateTo("mood")}
          />
        )}

        {screen === "xinxam" && (
          <XinXamScreen
            onBackToExperienceHome={() => navigateTo("experience")}
            onGoToArticle={(articleId) => {
              setSelectedArticleId(articleId);
              navigateTo("culture-detail", articleId);
            }}
            onSaveToAccount={(result) => {
              const newEntry: SavedEntry = {
                id: Date.now().toString(),
                signalId: `xinxam-${result.stickNumber}`,
                mood: selectedMood,
                date: new Date().toLocaleDateString("vi-VN"),
                journal: `${result.title}: ${result.quote}`,
                poemLine1: result.poem.line1,
                poemLine2: result.poem.line2,
                actionTitle: result.microAction.title,
              };
              if (!currentUser) {
                setPendingEntry(newEntry);
                navigateTo("login");
              } else {
                const exists = savedEntries.some((e) => e.signalId === newEntry.signalId);
                if (!exists) {
                  const updated = [newEntry, ...savedEntries];
                  setSavedEntries(updated);
                  const userKey = getUserStorageKey(currentUser);
                  if (userKey) {
                    localStorage.setItem(userKey, JSON.stringify(updated));
                  }
                }
              }
            }}
            onGoToLogin={() => navigateTo("login")}
            onGoToExplore={() => navigateTo("culture")}
            onGoToWish={() => navigateTo("wish")}
            isLoggedIn={!!currentUser}
          />
        )}

        {screen === "wish" && (
          <WishScreen
            onBackToExperience={() => navigateTo("xinxam")}
            onGoToDiary={() => navigateTo("account")}
            onGoToHome={() => navigateTo("today")}
            onGoToExplore={() => navigateTo("culture")}
            onSaveJournal={(text, topic) => {
              const newEntry: SavedEntry = {
                id: Date.now().toString(),
                signalId: `wish-${Date.now()}`,
                mood: "An yên",
                date: new Date().toLocaleDateString("vi-VN"),
                journal: `[${topic}] ${text}`,
                poemLine1: "Gửi gắm ước nguyện vào khoảng lặng",
                poemLine2: "Tâm bình thế giới bình, lòng an vạn sự tỏ",
                actionTitle: `Lưu giữ ước nguyện (${topic})`,
              };
              if (!currentUser) {
                setPendingEntry(newEntry);
                navigateTo("login");
              } else {
                const updated = [newEntry, ...savedEntries];
                setSavedEntries(updated);
                const userKey = getUserStorageKey(currentUser);
                if (userKey) {
                  localStorage.setItem(userKey, JSON.stringify(updated));
                }
              }
            }}
            isLoggedIn={!!currentUser}
          />
        )}

        {screen === "rituals" && (
          <RitualGuideScreen
            onSelectRitual={(id) => {
              setSelectedRitualId(id);
              navigateTo("ritual-detail", id);
            }}
            onGoToCulture={() => navigateTo("culture")}
          />
        )}

        {screen === "ritual-detail" && (
          <RitualDetailScreen
            ritualId={selectedRitualId}
            onBackToRitualList={() => navigateTo("rituals")}
            onSelectRelatedRitual={(id) => {
              setSelectedRitualId(id);
              navigateTo("ritual-detail", id);
            }}
          />
        )}

        {screen === "zen" && (
          <ZenScreen
            onBackToExperience={() => navigateTo("xinxam")}
            onGoToHome={() => navigateTo("today")}
          />
        )}

        {screen === "forgot" && (
          <ForgotPasswordScreen
            onBackToLogin={() => navigateTo("login")}
            onSuccessSubmit={() => {}}
          />
        )}

        {screen === "login" && (
          <LoginScreen
            onBack={() => navigateTo(pendingEntry ? "result" : "guest", pendingEntry?.signalId)}
            onSuccess={handleSimulatedLogin}
            onGoToRegister={() => navigateTo("register")}
            onGoToForgotPassword={() => navigateTo("forgot")}
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
          <AccountScreen
            currentUser={currentUser}
            savedSignals={savedEntries}
            onDeleteSignal={handleDeleteEntry}
            onGoToSignalResult={(signalId) => {
              setCurrentSignalId(signalId);
              navigateTo("result", signalId);
            }}
            onGoToXinXam={() => navigateTo("xinxam")}
            onGoToWish={() => navigateTo("wish")}
            onGoToMood={() => navigateTo("mood")}
            onGoToHome={() => navigateTo("today")}
          />
        )}
      </div>

      {/* Universal Footer */}
      <AppFooter onNavigate={navigateTo} />
    </div>
  );
}
