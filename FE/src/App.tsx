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
import {
  AccountScreen,
  SavedSignalItem,
  SavedXinXamItem,
  SavedWishItem,
} from "./screens/AccountScreen";
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

export type SavedEntry = SavedSignalItem;

export interface UserProfile {
  name: string;
  email: string;
}

export interface UserCornerData {
  signals: SavedSignalItem[];
  xam: SavedXinXamItem[];
  wishes: SavedWishItem[];
}

const getAnNhienDefaultData = (): UserCornerData => ({
  signals: [
    {
      id: "annhien-sig-1",
      signalId: "1",
      mood: "An yên",
      date: "28/09/2026",
      poemLine1: "Gió đưa cành trúc la đà",
      poemLine2: "Tiếng chuông Trấn Vũ canh gà Thọ Xương",
      actionTitle: "Uống một ngụm trà ấm trong chánh niệm",
      journal: "Sáng sớm thanh bình, tâm an vạn sự an.",
      starred: true,
    },
  ],
  xam: [
    {
      id: "annhien-xam-1",
      stickNumber: "07",
      fortuneType: "Thượng Cát",
      category: "Bình an & Tâm an",
      region: "Bắc Bộ",
      quote: "Nước chảy đá mòn, thuận theo tự nhiên mọi việc ắt hanh thông.",
      date: "26/09/2026",
      starred: true,
    },
    {
      id: "annhien-xam-2",
      stickNumber: "12",
      fortuneType: "Trung Cát",
      category: "Công việc & Học tập",
      region: "Nam Bộ",
      quote: "Buồm thuận gió xuôi, kiên tâm ắt gặt trái ngọt nơi bến đỗ.",
      date: "22/09/2026",
      starred: false,
    },
  ],
  wishes: [
    {
      id: "annhien-wish-1",
      category: "Gia đạo",
      content: "Cầu mong cha mẹ sức khỏe dồi dào, gia đạo thuận hòa, mỗi bữa cơm đều rộn rã tiếng cười ấm áp.",
      date: "24/09/2026",
      sealed: true,
      starred: true,
    },
    {
      id: "annhien-wish-2",
      category: "Bản thân",
      content: "Nguyện giữ cho lòng luôn sáng trong, bớt âu lo chuyện được mất, bao dung với chính mình hơn.",
      date: "18/09/2026",
      sealed: true,
      starred: false,
    },
  ],
});

export const getUserCornerStorageKey = (email: string) => {
  return `tltl-user-corner-${email.trim().toLowerCase()}`;
};

export const loadUserCornerData = (user: UserProfile | null): UserCornerData => {
  if (!user || !user.email) {
    return { signals: [], xam: [], wishes: [] };
  }
  const key = getUserCornerStorageKey(user.email);
  try {
    const stored = localStorage.getItem(key);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (parsed && typeof parsed === "object") {
        return {
          signals: Array.isArray(parsed.signals) ? parsed.signals : [],
          xam: Array.isArray(parsed.xam) ? parsed.xam : [],
          wishes: Array.isArray(parsed.wishes) ? parsed.wishes : [],
        };
      }
    }
  } catch {}

  // If An Nhien demo account has no records yet, seed with demo showcase
  const normEmail = user.email.trim().toLowerCase();
  if (normEmail === "annhien@tinlamtamlinh.vn" || normEmail === "annhien@tinlam.vn") {
    const demoData = getAnNhienDefaultData();
    try {
      localStorage.setItem(key, JSON.stringify(demoData));
    } catch {}
    return demoData;
  }

  // Any other real/new user starts completely clean
  return { signals: [], xam: [], wishes: [] };
};

export const saveUserCornerData = (email: string, data: UserCornerData) => {
  const key = getUserCornerStorageKey(email);
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch {}
};

export default function App() {
  const todayDateString = new Date().toDateString();

  const getInitialUser = (): UserProfile | null => {
    try {
      const stored = localStorage.getItem("tltl-current-user");
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  };

  const initialUser = getInitialUser();

  // Helper to resolve initial screen from URL safely with prerequisite checks
  const getInitialScreen = (): NavScreen => {
    const path = window.location.pathname.replace(/^\//, "");
    if (path === "account" && !initialUser) {
      return "login";
    }
    // loading requires active check-in flow; if opened directly, redirect safely
    if (path === "loading") {
      const lastCheck = localStorage.getItem("tltl-last-checkin-date");
      return lastCheck === todayDateString ? "today" : "mood";
    }
    // saved requires completed ritual/action context; if opened directly, redirect to today or guest
    if (path === "saved") {
      const lastCheck = localStorage.getItem("tltl-last-checkin-date");
      return lastCheck === todayDateString ? "today" : "guest";
    }
    if (
      [
        "guest",
        "today",
        "mood",
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

  // Tách biệt dữ liệu Góc của tôi (tín hiệu, thẻ xăm, điều ước) theo từng tài khoản
  const [userCornerData, setUserCornerData] = useState<UserCornerData>(() => {
    return loadUserCornerData(initialUser);
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

  // Bảo vệ màn Account: chỉ cho người đã đăng nhập truy cập
  useEffect(() => {
    if (screen === "account" && !currentUser) {
      navigateTo("login");
    }
  }, [screen, currentUser]);

  useEffect(() => {
    localStorage.setItem("tltl-current-signal-id", currentSignalId);
  }, [currentSignalId]);

  // Handle URL history sync & direct link / popstate reload with full context restoration
  useEffect(() => {
    // If opened directly on /result without ?signalId=..., ensure URL query param is normalized
    if (screen === "result" && !initialUrlSignalId) {
      window.history.replaceState(
        { screen: "result", signalId: activeSignal.id, mood: selectedMood },
        "",
        `/result?signalId=${activeSignal.id}`
      );
    }

    const handlePopState = (event: PopStateEvent) => {
      const path = window.location.pathname.replace(/^\//, "");
      const params = new URLSearchParams(window.location.search);
      const state = event.state as {
        screen?: NavScreen;
        signalId?: string;
        articleId?: string;
        ritualId?: string;
        mood?: MoodKey;
      } | null;

      // Restore signal context
      const urlSignalId = params.get("signalId") || state?.signalId;
      if (urlSignalId) {
        const sig = getSignalById(urlSignalId);
        if (sig) {
          setCurrentSignalId(sig.id);
          setSelectedMood(sig.mood);
        }
      } else if (path === "result") {
        const fallbackSig = getSignalById(currentSignalId) || getDefaultSignalForMood(selectedMood);
        setCurrentSignalId(fallbackSig.id);
        setSelectedMood(fallbackSig.mood);
        window.history.replaceState(
          { screen: "result", signalId: fallbackSig.id, mood: fallbackSig.mood },
          "",
          `/result?signalId=${fallbackSig.id}`
        );
      }

      // Restore article context
      const urlArticleId = params.get("articleId") || state?.articleId;
      if (urlArticleId) {
        setSelectedArticleId(urlArticleId);
      }

      // Restore ritual context
      const urlRitualId = params.get("ritualId") || state?.ritualId;
      if (urlRitualId) {
        setSelectedRitualId(urlRitualId);
      }

      // Handle screen routing with guards for missing context
      if (path === "account" && !currentUser) {
        setScreen("login");
      } else if (path === "loading") {
        // Direct hit or back to loading: do not trap in loading spinner
        setScreen(isCheckedIn ? "today" : "mood");
      } else if (path === "saved") {
        // Direct hit or back to saved without completed flow: route to today or guest
        setScreen(isCheckedIn ? "today" : "guest");
      } else if (
        [
          "guest",
          "today",
          "mood",
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
  }, [currentUser, isCheckedIn, activeSignal.id, currentSignalId, selectedMood]);

  const navigateTo = (newScreen: NavScreen, signalIdParam?: string) => {
    let targetScreen = newScreen;
    // Chuyển hướng về login nếu chưa đăng nhập mà muốn vào account
    if (targetScreen === "account" && !currentUser) {
      targetScreen = "login";
    }
    setScreen(targetScreen);
    let url = targetScreen === "guest" ? "/" : `/${targetScreen}`;
    let resolvedSignalId = undefined;
    let resolvedArticleId = undefined;
    let resolvedRitualId = undefined;

    if (targetScreen === "result") {
      resolvedSignalId = signalIdParam || currentSignalId || activeSignal.id;
      url = `/result?signalId=${resolvedSignalId}`;
    } else if (targetScreen === "culture-detail") {
      resolvedArticleId = signalIdParam || selectedArticleId || "dinh-lang-bac-bo";
      url = `/culture-detail?articleId=${resolvedArticleId}`;
    } else if (targetScreen === "ritual-detail") {
      resolvedRitualId = signalIdParam || selectedRitualId || "chuan-bi-ngay-ram";
      url = `/ritual-detail?ritualId=${resolvedRitualId}`;
    }

    const historyPayload = {
      screen: targetScreen,
      signalId: resolvedSignalId,
      articleId: resolvedArticleId,
      ritualId: resolvedRitualId,
      mood: selectedMood,
    };

    window.history.pushState(historyPayload, "", url);
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

    const newEntry: SavedSignalItem = {
      id: Date.now().toString(),
      signalId: activeSignal.id,
      mood: activeSignal.mood,
      date: new Date().toLocaleDateString("vi-VN"),
      journal: journalText.trim() || undefined,
      poemLine1: activeSignal.poem.line1,
      poemLine2: activeSignal.poem.line2,
      actionTitle: activeSignal.action.title,
      starred: false,
    };

    if (!currentUser) {
      // Khách chưa đăng nhập: Ghi nhận kết quả chờ lưu & chuyển đến màn đăng nhập mô phỏng
      setPendingEntry(newEntry);
      navigateTo("login");
    } else {
      // Đã đăng nhập: Lưu trực tiếp theo tài khoản
      setUserCornerData((prev) => {
        const exists = prev.signals.some((e) => e.signalId === activeSignal.id);
        if (exists) return prev;
        const updated = {
          ...prev,
          signals: [newEntry, ...prev.signals],
        };
        saveUserCornerData(currentUser.email, updated);
        return updated;
      });
    }
  };

  const handleSimulatedLogin = (name?: string, email?: string) => {
    const user: UserProfile = {
      name: name || "An Nhiên",
      email: email ? email.trim().toLowerCase() : "annhien@tinlamtamlinh.vn",
    };
    setCurrentUser(user);
    localStorage.setItem("tltl-current-user", JSON.stringify(user));
    const loadedData = loadUserCornerData(user);

    if (pendingEntry) {
      const exists = loadedData.signals.some((e) => e.signalId === pendingEntry.signalId);
      if (!exists) {
        loadedData.signals = [pendingEntry, ...loadedData.signals];
        saveUserCornerData(user.email, loadedData);
      }
      const savedSigId = pendingEntry.signalId;
      setPendingEntry(null);
      setUserCornerData(loadedData);
      setCurrentSignalId(savedSigId);
      navigateTo("result", savedSigId);
    } else {
      setUserCornerData(loadedData);
      navigateTo("account");
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem("tltl-current-user");
    setUserCornerData({ signals: [], xam: [], wishes: [] });
    navigateTo("guest");
  };

  const handleDeleteSignal = (id: string) => {
    if (!currentUser) return;
    setUserCornerData((prev) => {
      const updated = {
        ...prev,
        signals: prev.signals.filter((s) => s.id !== id),
      };
      saveUserCornerData(currentUser.email, updated);
      return updated;
    });
  };

  const handleDeleteXam = (id: string) => {
    if (!currentUser) return;
    setUserCornerData((prev) => {
      const updated = {
        ...prev,
        xam: prev.xam.filter((x) => x.id !== id),
      };
      saveUserCornerData(currentUser.email, updated);
      return updated;
    });
  };

  const handleDeleteWish = (id: string) => {
    if (!currentUser) return;
    setUserCornerData((prev) => {
      const updated = {
        ...prev,
        wishes: prev.wishes.filter((w) => w.id !== id),
      };
      saveUserCornerData(currentUser.email, updated);
      return updated;
    });
  };

  const handleToggleStarSignal = (id: string) => {
    if (!currentUser) return;
    setUserCornerData((prev) => {
      const updated = {
        ...prev,
        signals: prev.signals.map((s) => (s.id === id ? { ...s, starred: !s.starred } : s)),
      };
      saveUserCornerData(currentUser.email, updated);
      return updated;
    });
  };

  const handleToggleStarXam = (id: string) => {
    if (!currentUser) return;
    setUserCornerData((prev) => {
      const updated = {
        ...prev,
        xam: prev.xam.map((x) => (x.id === id ? { ...x, starred: !x.starred } : x)),
      };
      saveUserCornerData(currentUser.email, updated);
      return updated;
    });
  };

  const handleToggleStarWish = (id: string) => {
    if (!currentUser) return;
    setUserCornerData((prev) => {
      const updated = {
        ...prev,
        wishes: prev.wishes.map((w) => (w.id === id ? { ...w, starred: !w.starred } : w)),
      };
      saveUserCornerData(currentUser.email, updated);
      return updated;
    });
  };

  // Mở lại đúng bản ghi tín hiệu đã lưu
  const handleOpenSavedSignal = (entry: SavedSignalItem) => {
    setSelectedMood(entry.mood);
    setCurrentSignalId(entry.signalId);
    navigateTo("result", entry.signalId);
  };

  const isCurrentSignalSaved = userCornerData.signals.some((e) => e.signalId === activeSignal.id);

  return (
    <div className={`min-h-screen flex flex-col bg-[#fcf8f2] dark:bg-[#120d0b] text-[#2e2624] dark:text-[#f3eae4] font-['Be_Vietnam_Pro',sans-serif] ${dark ? "dark" : ""}`}>
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
              const newXam: SavedXinXamItem = {
                id: Date.now().toString(),
                stickNumber: result.stickNumber,
                fortuneType: result.fortuneType || result.sealText || "Thượng Cát",
                category: result.category || result.topic,
                region: result.region,
                quote: result.quote,
                date: new Date().toLocaleDateString("vi-VN"),
                starred: false,
              };
              if (!currentUser) {
                navigateTo("login");
              } else {
                setUserCornerData((prev) => {
                  const exists = prev.xam.some(
                    (x) => x.stickNumber === newXam.stickNumber && x.category === newXam.category
                  );
                  if (exists) return prev;
                  const updated = {
                    ...prev,
                    xam: [newXam, ...prev.xam],
                  };
                  saveUserCornerData(currentUser.email, updated);
                  return updated;
                });
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
              const newWish: SavedWishItem = {
                id: Date.now().toString(),
                category: topic,
                content: text,
                date: new Date().toLocaleDateString("vi-VN"),
                sealed: true,
                starred: false,
              };
              if (!currentUser) {
                navigateTo("login");
              } else {
                setUserCornerData((prev) => {
                  const updated = {
                    ...prev,
                    wishes: [newWish, ...prev.wishes],
                  };
                  saveUserCornerData(currentUser.email, updated);
                  return updated;
                });
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
              const newEntry: SavedSignalItem = {
                id: Date.now().toString(),
                signalId: activeSignal.id,
                mood: activeSignal.mood,
                date: new Date().toLocaleDateString("vi-VN"),
                journal: journalText.trim() || undefined,
                poemLine1: activeSignal.poem.line1,
                poemLine2: activeSignal.poem.line2,
                actionTitle: activeSignal.action.title,
                starred: false,
              };
              setPendingEntry(newEntry);
              navigateTo("login");
            }}
          />
        )}

        {screen === "account" && (
          <AccountScreen
            currentUser={currentUser}
            savedSignals={userCornerData.signals}
            savedXamList={userCornerData.xam}
            savedWishList={userCornerData.wishes}
            onDeleteSignal={handleDeleteSignal}
            onDeleteXam={handleDeleteXam}
            onDeleteWish={handleDeleteWish}
            onToggleStarSignal={handleToggleStarSignal}
            onToggleStarXam={handleToggleStarXam}
            onToggleStarWish={handleToggleStarWish}
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
