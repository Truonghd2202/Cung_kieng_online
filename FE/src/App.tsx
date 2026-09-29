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
import { CulturalCalendarScreen } from "./screens/CulturalCalendarScreen";
import { EventDetailScreen } from "./screens/EventDetailScreen";
import { GratitudeScreen } from "./screens/GratitudeScreen";
import { XinXamScreen } from "./screens/XinXamScreen";
import { WishScreen, WishTopic } from "./screens/WishScreen";
import { RitualGuideScreen } from "./screens/RitualGuideScreen";
import { RitualDetailScreen } from "./screens/RitualDetailScreen";
import { ZenScreen } from "./screens/ZenScreen";
import { XinKeoScreen } from "./screens/XinKeoScreen";
import { GoodDayScreen } from "./screens/GoodDayScreen";
import { HoroscopeScreen } from "./screens/HoroscopeScreen";
import { MembershipScreen } from "./screens/MembershipScreen";
import { SettingsScreen } from "./screens/SettingsScreen";
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

export const getAccountScopedKey = (base: string, email?: string | null) => {
  const accountId = email ? email.trim().toLowerCase() : "guest";
  return `${base}_${accountId}`;
};

export const loadUserSessionState = (user: UserProfile | null, todayStr: string) => {
  const email = user?.email;
  const checkInKey = getAccountScopedKey("tltl-last-checkin-date", email);
  const moodKey = getAccountScopedKey("tltl-today-mood", email);
  const topicsKey = getAccountScopedKey("tltl-selected-topics", email);
  const actionKey = getAccountScopedKey("tltl-action-done-date", email);
  const signalKey = getAccountScopedKey("tltl-current-signal-id", email);

  let checkedIn = false;
  try {
    checkedIn = localStorage.getItem(checkInKey) === todayStr;
  } catch {}

  let mood: MoodKey = "Chênh vênh";
  try {
    const savedMood = localStorage.getItem(moodKey);
    if (
      savedMood &&
      ["An yên", "Chênh vênh", "Băn khoăn", "Nôn nóng", "Biết ơn", "Cần điểm tựa"].includes(savedMood)
    ) {
      mood = savedMood as MoodKey;
    }
  } catch {}

  let topics: string[] = ["cadao", "xinxam", "bamien"];
  try {
    const stored = localStorage.getItem(topicsKey);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed) && parsed.length > 0) topics = parsed;
    }
  } catch {}

  let actionDone = false;
  try {
    actionDone = localStorage.getItem(actionKey) === todayStr;
  } catch {}

  let signalId = getDefaultSignalForMood(mood).id;
  try {
    const storedSigId = localStorage.getItem(signalKey);
    if (storedSigId && getSignalById(storedSigId)) {
      signalId = storedSigId;
    }
  } catch {}

  return { checkedIn, mood, topics, actionDone, signalId };
};

export type PendingSave =
  | { type: "signal"; item: SavedSignalItem }
  | { type: "xam"; item: SavedXinXamItem }
  | { type: "wish"; item: SavedWishItem };

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
  const initialSession = loadUserSessionState(initialUser, todayDateString);

  // Helper to resolve initial screen from URL safely with prerequisite checks
  const getInitialScreen = (): NavScreen => {
    const path = window.location.pathname.replace(/^\//, "");
    if (path === "account" && !initialUser) {
      return "login";
    }
    // loading requires active check-in flow; if opened directly, redirect safely
    if (path === "loading") {
      const lastCheck = localStorage.getItem(
        getAccountScopedKey("tltl-last-checkin-date", initialUser?.email)
      );
      return lastCheck === todayDateString ? "today" : "mood";
    }
    // saved requires completed ritual/action context; if opened directly, redirect to today or guest
    if (path === "saved") {
      const lastCheck = localStorage.getItem(
        getAccountScopedKey("tltl-last-checkin-date", initialUser?.email)
      );
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
        "calendar",
        "calendar-detail",
        "experience",
        "xinxam",
        "wish",
        "zen",
        "gratitude",
        "login",
        "register",
        "forgot",
        "xinkeo",
        "good-days",
        "horoscope",
        "membership",
        "settings",
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

  // Check URL eventId for CalendarDetail
  const initialUrlCalendarEventId = new URLSearchParams(window.location.search).get("eventId") || "le-soc-vong-ngay-ram";

  const [screen, setScreen] = useState<NavScreen>(getInitialScreen);
  const [selectedArticleId, setSelectedArticleId] = useState<string>(initialUrlArticleId);
  const [selectedRitualId, setSelectedRitualId] = useState<string>(initialUrlRitualId);
  const [selectedCalendarEventId, setSelectedCalendarEventId] = useState<string>(initialUrlCalendarEventId);
  const [journalText, setJournalText] = useState("");
  const [dark, setDark] = useState(() => localStorage.getItem("tltl-theme") === "dark");

  const [currentUser, setCurrentUser] = useState<UserProfile | null>(initialUser);
  const [pendingSave, setPendingSave] = useState<PendingSave | null>(null);

  // Lưu và đồng bộ chủ đề yêu thích theo từng tài khoản
  const [selectedTopics, setSelectedTopics] = useState<string[]>(initialSession.topics);

  // Check-in theo tài khoản
  const [isCheckedIn, setIsCheckedIn] = useState<boolean>(initialSession.checkedIn);

  // Mood theo tài khoản
  const [selectedMood, setSelectedMood] = useState<MoodKey>(() => {
    if (initialUrlSignal) {
      return initialUrlSignal.mood;
    }
    return initialSession.mood;
  });

  // Current signal theo tài khoản
  const [currentSignalId, setCurrentSignalId] = useState<string>(() => {
    if (initialUrlSignal) {
      return initialUrlSignal.id;
    }
    return initialSession.signalId;
  });

  // Trạng thái hành động hoàn thành theo từng tài khoản
  const [isActionDone, setIsActionDone] = useState<boolean>(initialSession.actionDone);

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
    try {
      localStorage.setItem(
        getAccountScopedKey("tltl-current-signal-id", currentUser?.email),
        currentSignalId
      );
    } catch {}
  }, [currentSignalId, currentUser]);

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

      // Restore calendar event context
      const urlEventId = params.get("eventId") || (state as { eventId?: string })?.eventId;
      if (urlEventId) {
        setSelectedCalendarEventId(urlEventId);
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
          "calendar",
          "calendar-detail",
          "experience",
          "xinxam",
          "wish",
          "zen",
          "gratitude",
          "login",
          "register",
          "forgot",
          "xinkeo",
          "good-days",
          "horoscope",
          "membership",
          "settings",
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
    let resolvedEventId = undefined;

    if (targetScreen === "result") {
      resolvedSignalId = signalIdParam || currentSignalId || activeSignal.id;
      url = `/result?signalId=${resolvedSignalId}`;
    } else if (targetScreen === "culture-detail") {
      resolvedArticleId = signalIdParam || selectedArticleId || "dinh-lang-bac-bo";
      url = `/culture-detail?articleId=${resolvedArticleId}`;
    } else if (targetScreen === "ritual-detail") {
      resolvedRitualId = signalIdParam || selectedRitualId || "chuan-bi-ngay-ram";
      url = `/ritual-detail?ritualId=${resolvedRitualId}`;
    } else if (targetScreen === "calendar-detail") {
      resolvedEventId = signalIdParam || selectedCalendarEventId || "le-soc-vong-ngay-ram";
      url = `/calendar-detail?eventId=${resolvedEventId}`;
    }

    const historyPayload = {
      screen: targetScreen,
      signalId: resolvedSignalId,
      articleId: resolvedArticleId,
      ritualId: resolvedRitualId,
      eventId: resolvedEventId,
      mood: selectedMood,
    };

    window.history.pushState(historyPayload, "", url);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleToggleAction = (completed: boolean) => {
    setIsActionDone(completed);
    try {
      const key = getAccountScopedKey("tltl-action-done-date", currentUser?.email);
      if (completed) {
        localStorage.setItem(key, todayDateString);
      } else {
        localStorage.removeItem(key);
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
      const email = currentUser?.email;
      localStorage.setItem(getAccountScopedKey("tltl-last-checkin-date", email), todayDateString);
      localStorage.setItem(getAccountScopedKey("tltl-today-mood", email), selectedMood);
      localStorage.setItem(getAccountScopedKey("tltl-current-signal-id", email), activeSignal.id);
    } catch {}
    navigateTo("result", activeSignal.id);
  };

  // Đổi tín hiệu: GIỮ NGUYÊN TÂM TRẠNG, chỉ đổi quẻ tín hiệu khác cùng tâm trạng
  const handleRefreshSignal = () => {
    const nextSignal = getNextSignalForMood(activeSignal.id, selectedMood);
    setCurrentSignalId(nextSignal.id);
    try {
      localStorage.setItem(
        getAccountScopedKey("tltl-current-signal-id", currentUser?.email),
        nextSignal.id
      );
    } catch {}
    // Đồng bộ URL ngay lập tức
    window.history.replaceState(null, "", `/result?signalId=${nextSignal.id}`);
  };

  // Lưu chủ đề được chọn từ Trải nghiệm
  const handleSaveTopics = (topics: string[]) => {
    setSelectedTopics(topics);
    try {
      localStorage.setItem(
        getAccountScopedKey("tltl-selected-topics", currentUser?.email),
        JSON.stringify(topics)
      );
    } catch {}
    navigateTo("today");
  };

  const handleSaveResult = () => {
    setIsCheckedIn(true);
    try {
      const email = currentUser?.email;
      localStorage.setItem(getAccountScopedKey("tltl-last-checkin-date", email), todayDateString);
      localStorage.setItem(getAccountScopedKey("tltl-today-mood", email), selectedMood);
      localStorage.setItem(getAccountScopedKey("tltl-current-signal-id", email), activeSignal.id);
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
      // Lưu tín hiệu khi chưa đăng nhập
      setPendingSave({ type: "signal", item: newEntry });
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

    const loadedData = loadUserCornerData(user);

    if (pendingSave?.type === "signal") {
      loadedData.signals = [pendingSave.item, ...loadedData.signals];
    }
    if (pendingSave?.type === "xam") {
      loadedData.xam = [pendingSave.item, ...loadedData.xam];
    }
    if (pendingSave?.type === "wish") {
      loadedData.wishes = [pendingSave.item, ...loadedData.wishes];
    }

    if (pendingSave) saveUserCornerData(user.email, loadedData);

    setCurrentUser(user);
    localStorage.setItem("tltl-current-user", JSON.stringify(user));
    setUserCornerData(loadedData);
    setPendingSave(null);

    // Đồng bộ trạng thái session (check-in, mood, topics, action, signal) theo tài khoản vừa đăng nhập
    const userSession = loadUserSessionState(user, todayDateString);
    setIsCheckedIn(userSession.checkedIn);
    setSelectedMood(userSession.mood);
    setSelectedTopics(userSession.topics);
    setIsActionDone(userSession.actionDone);
    setCurrentSignalId(userSession.signalId);
    setJournalText("");

    navigateTo("account");
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem("tltl-current-user");
    setUserCornerData({ signals: [], xam: [], wishes: [] });

    // Reset các trạng thái session về tài khoản khách (guest)
    const guestSession = loadUserSessionState(null, todayDateString);
    setIsCheckedIn(guestSession.checkedIn);
    setSelectedMood(guestSession.mood);
    setSelectedTopics(guestSession.topics);
    setIsActionDone(guestSession.actionDone);
    setCurrentSignalId(guestSession.signalId);
    setJournalText("");
    setPendingSave(null);

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

  const handleSaveDayToCalendar = (dayData: { title: string; day: number; month: number }) => {
    try {
      const stored = localStorage.getItem("tltl-calendar-personal-notes");
      const list = stored ? JSON.parse(stored) : [];
      const newNote = {
        id: `good-day-${Date.now()}`,
        title: dayData.title,
        lunarDate: "Theo tiết khí cát lành",
        solarDate: `${dayData.day}/${dayData.month}/2024`,
        day: dayData.day,
        month: dayData.month,
        year: 2024,
        type: "personal" as const,
        description: `Ghi chú lưu từ phân hệ Tra cứu ngày lành: ${dayData.title}`,
        isImportant: true,
      };
      list.push(newNote);
      localStorage.setItem("tltl-calendar-personal-notes", JSON.stringify(list));
    } catch {}
  };

  const isCurrentSignalSaved = currentUser
    ? userCornerData.signals.some((e) => e.signalId === activeSignal.id)
    : false;

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
            onGoToGratitude={() => navigateTo("gratitude")}
            onGoToXinKeo={() => navigateTo("xinkeo")}
            onGoToHoroscope={() => navigateTo("horoscope")}
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
            onGoToCalendar={() => navigateTo("calendar")}
            onGoToGoodDays={() => navigateTo("good-days")}
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
                // Lưu xăm khi chưa đăng nhập -> chuyển sang login, trả về false vì chưa lưu thật vào tài khoản
                setPendingSave({ type: "xam", item: newXam });
                navigateTo("login");
                return false;
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
                return true;
              }
            }}
            onGoToLogin={() => navigateTo("login")}
            onGoToExplore={() => navigateTo("culture")}
            onGoToWish={() => navigateTo("wish")}
            isLoggedIn={!!currentUser}
            savedXamList={userCornerData.xam}
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
                // Lưu điều ước khi chưa đăng nhập -> chuyển sang login, trả về false vì chưa lưu thật vào tài khoản
                setPendingSave({ type: "wish", item: newWish });
                navigateTo("login");
                return false;
              } else {
                setUserCornerData((prev) => {
                  const updated = {
                    ...prev,
                    wishes: [newWish, ...prev.wishes],
                  };
                  saveUserCornerData(currentUser.email, updated);
                  return updated;
                });
                return true;
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

        {screen === "calendar" && (
          <CulturalCalendarScreen
            onSelectEvent={(eventId) => {
              setSelectedCalendarEventId(eventId);
              navigateTo("calendar-detail", eventId);
            }}
            onGoToCulture={() => navigateTo("culture")}
            onGoToHome={() => navigateTo("today")}
            onGoToGoodDays={() => navigateTo("good-days")}
          />
        )}

        {screen === "calendar-detail" && (
          <EventDetailScreen
            eventId={selectedCalendarEventId}
            onBackToCalendar={() => navigateTo("calendar")}
            onGoToRituals={() => navigateTo("rituals")}
            onGoToExplore={() => navigateTo("culture")}
          />
        )}

        {screen === "gratitude" && (
          <GratitudeScreen
            onBackToExperience={() => navigateTo("experience")}
            onBackToHome={() => navigateTo("today")}
            onGoToCulture={() => navigateTo("culture")}
            user={currentUser}
            onSaveGratitude={(text) => {
              const newWish: SavedWishItem = {
                id: Date.now().toString(),
                category: "Tri ân & Tưởng niệm",
                content: text,
                date: new Date().toLocaleDateString("vi-VN"),
                sealed: true,
                starred: true,
              };
              if (!currentUser) {
                setPendingSave({ type: "wish", item: newWish });
                navigateTo("login");
                return false;
              } else {
                setUserCornerData((prev) => {
                  const updated = {
                    ...prev,
                    wishes: [newWish, ...prev.wishes],
                  };
                  saveUserCornerData(currentUser.email, updated);
                  return updated;
                });
                return true;
              }
            }}
            onRequireLogin={(text) => {
              const newWish: SavedWishItem = {
                id: Date.now().toString(),
                category: "Tri ân & Tưởng niệm",
                content: text,
                date: new Date().toLocaleDateString("vi-VN"),
                sealed: true,
                starred: true,
              };
              setPendingSave({ type: "wish", item: newWish });
              navigateTo("login");
            }}
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
            onBack={() => {
              if (pendingSave?.type === "signal") {
                navigateTo("result", pendingSave.item.signalId);
              } else if (pendingSave?.type === "xam") {
                navigateTo("xinxam");
              } else if (pendingSave?.type === "wish") {
                navigateTo("wish");
              } else {
                navigateTo("guest");
              }
            }}
            onSuccess={handleSimulatedLogin}
            onGoToRegister={() => navigateTo("register")}
            onGoToForgotPassword={() => navigateTo("forgot")}
            pendingSignalMood={
              pendingSave?.type === "signal"
                ? `Tín hiệu "${pendingSave.item.mood}"`
                : pendingSave?.type === "xam"
                ? `Thẻ xăm số ${pendingSave.item.stickNumber} (${pendingSave.item.fortuneType})`
                : pendingSave?.type === "wish"
                ? `Điều ước ${pendingSave.item.category}`
                : undefined
            }
          />
        )}

        {screen === "register" && (
          <RegisterScreen
            onBack={() => navigateTo("login")}
            onSuccess={handleSimulatedLogin}
            onGoToLogin={() => navigateTo("login")}
            pendingSignalMood={
              pendingSave?.type === "signal"
                ? `Tín hiệu "${pendingSave.item.mood}"`
                : pendingSave?.type === "xam"
                ? `Thẻ xăm số ${pendingSave.item.stickNumber} (${pendingSave.item.fortuneType})`
                : pendingSave?.type === "wish"
                ? `Điều ước ${pendingSave.item.category}`
                : undefined
            }
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
              setPendingSave({ type: "signal", item: newEntry });
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
            onGoToSettings={() => navigateTo("settings")}
          />
        )}

        {screen === "xinkeo" && (
          <XinKeoScreen
            onBackToExperience={() => navigateTo("experience")}
            onGoToCulture={() => navigateTo("culture")}
            onGoToHome={() => navigateTo("today")}
          />
        )}

        {screen === "good-days" && (
          <GoodDayScreen
            onBackToCulture={() => navigateTo("culture")}
            onGoToHome={() => navigateTo("today")}
            onGoToCalendar={() => navigateTo("calendar")}
            onGoToRituals={() => navigateTo("rituals")}
            onSaveDayToCalendar={handleSaveDayToCalendar}
          />
        )}

        {screen === "horoscope" && (
          <HoroscopeScreen
            onBackToExperience={() => navigateTo("experience")}
            onGoToCulture={() => navigateTo("culture")}
            onGoToHome={() => navigateTo("today")}
          />
        )}

        {screen === "membership" && (
          <MembershipScreen
            onBackToHome={() => navigateTo("today")}
            onGoToExperience={() => navigateTo("experience")}
          />
        )}

        {screen === "settings" && (
          <SettingsScreen
            onBackToAccount={() => navigateTo("account")}
            onGoToHome={() => navigateTo("today")}
            dark={dark}
            onToggleDark={() => {
              const newDark = !dark;
              setDark(newDark);
              try {
                localStorage.setItem("tltl-theme", newDark ? "dark" : "light");
                if (newDark) {
                  document.documentElement.classList.add("dark");
                } else {
                  document.documentElement.classList.remove("dark");
                }
              } catch {}
            }}
            user={currentUser}
            onLogout={handleLogout}
            onClearAllLocalData={() => {
              try {
                localStorage.removeItem("tltl-calendar-personal-notes");
                if (currentUser) {
                  saveUserCornerData(currentUser.email, { signals: [], xam: [], wishes: [] });
                  setUserCornerData({ signals: [], xam: [], wishes: [] });
                }
              } catch {}
            }}
          />
        )}
      </div>

      {/* Universal Footer */}
      <AppFooter onNavigate={navigateTo} />
    </div>
  );
}
