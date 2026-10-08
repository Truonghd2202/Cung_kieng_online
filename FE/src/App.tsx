import { lazy, Suspense, useEffect, useState } from "react";
import { AppHeader, NavScreen } from "./components/AppHeader";
import { AppFooter } from "./components/AppFooter";
import { ScreenFocus } from "./components/ScreenFocus";
import { SavedSignalDialog } from "./components/SavedSignalDialog";
import { useTheme } from "./hooks/useTheme";
import type { MemorialRecord } from "./screens/MemorialSpaceScreen";
import type { CultureRegionSlug } from "./screens/CulturalMapScreen";
import type { RegionalExperienceKind } from "./screens/RegionalExperienceScreen";
import { GuestScreen } from "./screens/GuestScreen";
import { TodayScreen } from "./screens/TodayScreen";
import type { WishTopic } from "./screens/WishScreen";
import type { SavedSignalItem, SavedXinXamItem, SavedWishItem } from "./screens/AccountScreen";
import {
  MoodKey,
  getSignalById,
  getDefaultSignalForMood,
  getNextSignalForMood,
} from "./data/demoSignals";

import { Trash2, Calendar, BookOpen, ArrowRight, Flower2, Sparkles } from "lucide-react";
import {
  loadCurrentDemoUser,
  logoutAccount,
  restoreSession,
  saveLocalDemoAccount,
} from "./data/authService";
import {
  getCalendarNotesStorageKey,
  getReliableLunarDate,
  loadCalendarPersonalNotes,
  saveCalendarPersonalNotes,
} from "./data/calendarData";
import { sanitizeCulturalTopics } from "./data/culturalTopics";
import {
  DEFAULT_USER_SETTINGS,
  loadUserPreferences,
  replaceTopics,
  updateProfile,
  updateSettings,
  type UserSettings,
} from "./data/userService";
import {
  createMoodCheckIn,
  deleteSavedSignal,
  loadSavedSignals,
  loadSignals,
  saveSignal,
  updateMoodAction,
  updateSavedSignal,
} from "./data/moodSignalService";
import {
  deleteSavedWish,
  deleteSavedXam,
  loadSavedWishes,
  loadSavedXam,
  saveWish,
  saveXam,
  updateSavedWish,
  updateSavedXam,
} from "./data/reflectionService";
import {
  deleteCalendarNote,
  loadCalendarNotes,
  loadMemorial,
  saveCalendarNote,
  saveMemorial,
} from "./data/memoryService";

const MoodCheckInScreen = lazy(() => import("./screens/MoodCheckInScreen").then((module) => ({ default: module.MoodCheckInScreen })));
const SignalLoadingScreen = lazy(() => import("./screens/SignalLoadingScreen").then((module) => ({ default: module.SignalLoadingScreen })));
const SignalResultScreen = lazy(() => import("./screens/SignalResultScreen").then((module) => ({ default: module.SignalResultScreen })));
const LoginScreen = lazy(() => import("./screens/LoginScreen").then((module) => ({ default: module.LoginScreen })));
const RegisterScreen = lazy(() => import("./screens/RegisterScreen").then((module) => ({ default: module.RegisterScreen })));
const CompletionScreen = lazy(() => import("./screens/CompletionScreen").then((module) => ({ default: module.CompletionScreen })));
const ForgotPasswordScreen = lazy(() => import("./screens/ForgotPasswordScreen").then((module) => ({ default: module.ForgotPasswordScreen })));
const ExperienceScreen = lazy(() => import("./screens/ExperienceScreen").then((module) => ({ default: module.ExperienceScreen })));
const CultureScreen = lazy(() => import("./screens/CultureScreen").then((module) => ({ default: module.CultureScreen })));
const CultureDetailScreen = lazy(() => import("./screens/CultureDetailScreen").then((module) => ({ default: module.CultureDetailScreen })));
const CulturalCalendarScreen = lazy(() => import("./screens/CulturalCalendarScreen").then((module) => ({ default: module.CulturalCalendarScreen })));
const EventDetailScreen = lazy(() => import("./screens/EventDetailScreen").then((module) => ({ default: module.EventDetailScreen })));
const GratitudeScreen = lazy(() => import("./screens/GratitudeScreen").then((module) => ({ default: module.GratitudeScreen })));
const XinXamScreen = lazy(() => import("./screens/XinXamScreen").then((module) => ({ default: module.XinXamScreen })));
const WishScreen = lazy(() => import("./screens/WishScreen").then((module) => ({ default: module.WishScreen })));
const RitualGuideScreen = lazy(() => import("./screens/RitualGuideScreen").then((module) => ({ default: module.RitualGuideScreen })));
const RitualDetailScreen = lazy(() => import("./screens/RitualDetailScreen").then((module) => ({ default: module.RitualDetailScreen })));
const ZenScreen = lazy(() => import("./screens/ZenScreen").then((module) => ({ default: module.ZenScreen })));
const XinKeoScreen = lazy(() => import("./screens/XinKeoScreen").then((module) => ({ default: module.XinKeoScreen })));
const GoodDayScreen = lazy(() => import("./screens/GoodDayScreen").then((module) => ({ default: module.GoodDayScreen })));
const HoroscopeScreen = lazy(() => import("./screens/HoroscopeScreen").then((module) => ({ default: module.HoroscopeScreen })));
const AstrologyHubScreen = lazy(() => import("./screens/AstrologyHubScreen").then((module) => ({ default: module.AstrologyHubScreen })));
const MembershipScreen = lazy(() => import("./screens/MembershipScreen").then((module) => ({ default: module.MembershipScreen })));
const SettingsScreen = lazy(() => import("./screens/SettingsScreen").then((module) => ({ default: module.SettingsScreen })));
const AccountScreen = lazy(() => import("./screens/AccountScreen").then((module) => ({ default: module.AccountScreen })));
const VirtualSanctuaryScreen = lazy(() => import("./screens/VirtualSanctuaryScreen").then((module) => ({ default: module.VirtualSanctuaryScreen })));
const AncestorAltarScreen = lazy(() => import("./screens/AncestorAltarScreen").then((module) => ({ default: module.AncestorAltarScreen })));
const MemorialSpaceScreen = lazy(() => import("./screens/MemorialSpaceScreen").then((module) => ({ default: module.MemorialSpaceScreen })));
const MemorialFormScreen = lazy(() => import("./screens/MemorialFormScreen").then((module) => ({ default: module.MemorialFormScreen })));
const CulturalMapScreen = lazy(() => import("./screens/CulturalMapScreen").then((module) => ({ default: module.CulturalMapScreen })));
const RegionCultureScreen = lazy(() => import("./screens/RegionCultureScreen").then((module) => ({ default: module.RegionCultureScreen })));
const RegionalExperienceScreen = lazy(() => import("./screens/RegionalExperienceScreen").then((module) => ({ default: module.RegionalExperienceScreen })));
const MoodJourneyScreen = lazy(() => import("./screens/MoodJourneyScreen").then((module) => ({ default: module.MoodJourneyScreen })));
const NotificationScreen = lazy(() => import("./screens/NotificationScreen").then((module) => ({ default: module.NotificationScreen })));

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

const hasStringFields = (
  value: unknown,
  fields: string[]
): value is Record<string, unknown> => {
  if (
    typeof value !== "object" ||
    value === null ||
    Array.isArray(value)
  ) {
    return false;
  }

  const record = value as Record<string, unknown>;

  return fields.every(
    (field) => typeof record[field] === "string"
  );
};

const validSavedMoods: MoodKey[] = [
  "An yên",
  "Chênh vênh",
  "Băn khoăn",
  "Nôn nóng",
  "Biết ơn",
  "Cần điểm tựa",
];

const hasValidOptionalFields = (
  record: Record<string, unknown>
): boolean => {
  return (
    (record.starred === undefined ||
      typeof record.starred === "boolean") &&
    (record.createdAt === undefined ||
      (typeof record.createdAt === "number" &&
        Number.isFinite(record.createdAt) &&
        record.createdAt > 0 &&
        Number.isFinite(new Date(record.createdAt).getTime())))
  );
};

const isSavedSignalItem = (
  value: unknown
): value is SavedSignalItem => {
  if (
    !hasStringFields(value, [
      "id",
      "signalId",
      "mood",
      "date",
      "poemLine1",
      "poemLine2",
    ])
  ) {
    return false;
  }

  return (
    Boolean((value.id as string).trim()) &&
    validSavedMoods.includes(value.mood as MoodKey) &&
    (value.journal === undefined ||
      typeof value.journal === "string") &&
    (value.actionTitle === undefined ||
      typeof value.actionTitle === "string") &&
    hasValidOptionalFields(value)
  );
};

const isSavedXinXamItem = (
  value: unknown
): value is SavedXinXamItem => {
  return (
    hasStringFields(value, [
      "id",
      "stickNumber",
      "fortuneType",
      "category",
      "region",
      "quote",
      "date",
    ]) &&
    Boolean((value.id as string).trim()) &&
    (
      value.drawId === undefined ||
      (
        typeof value.drawId === "string" &&
        value.drawId.trim().length > 0
      )
    ) &&
    hasValidOptionalFields(value)
  );
};

const isSavedWishItem = (
  value: unknown
): value is SavedWishItem => {
  return (
    hasStringFields(value, [
      "id",
      "category",
      "content",
      "date",
    ]) &&
    Boolean((value.id as string).trim()) &&
    typeof value.sealed === "boolean" &&
    hasValidOptionalFields(value)
  );
};

const parseUserCornerData = (
  value: unknown
): UserCornerData => {
  const empty: UserCornerData = {
    signals: [],
    xam: [],
    wishes: [],
  };

  if (
    typeof value !== "object" ||
    value === null ||
    Array.isArray(value)
  ) {
    return empty;
  }

  const record = value as Record<string, unknown>;

  return {
    signals: Array.isArray(record.signals)
      ? record.signals.filter(isSavedSignalItem)
      : [],
    xam: Array.isArray(record.xam)
      ? record.xam.filter(isSavedXinXamItem)
      : [],
    wishes: Array.isArray(record.wishes)
      ? record.wishes.filter(isSavedWishItem)
      : [],
  };
};

const isCompleteUserCornerData = (
  value: unknown
): boolean => {
  if (
    typeof value !== "object" ||
    value === null ||
    Array.isArray(value)
  ) {
    return false;
  }

  const record = value as Record<string, unknown>;

  return (
    Array.isArray(record.signals) &&
    record.signals.every(isSavedSignalItem) &&
    Array.isArray(record.xam) &&
    record.xam.every(isSavedXinXamItem) &&
    Array.isArray(record.wishes) &&
    record.wishes.every(isSavedWishItem)
  );
};

export const loadUserCornerData = (
  user: UserProfile | null
): UserCornerData => {
  const empty: UserCornerData = {
    signals: [],
    xam: [],
    wishes: [],
  };

  if (!user?.email) return empty;

  const key = getUserCornerStorageKey(user.email);
  let stored: string | null;

  try {
    stored = localStorage.getItem(key);
  } catch {
    return empty;
  }

  // Khóa đã tồn tại: đọc dữ liệu, không tự tạo lại mẫu.
  if (stored !== null) {
    try {
      const parsed: unknown = JSON.parse(stored);
      return parseUserCornerData(parsed);
    } catch {
      // Giữ nguyên dữ liệu gốc trong bộ nhớ trình duyệt.
      return empty;
    }
  }

  // Chỉ tạo dữ liệu mẫu nếu chưa từng có khóa.
  const email = user.email.trim().toLowerCase();

  const isDemoAccount =
    email === "annhien@tinlamtamlinh.vn" ||
    email === "annhien@tinlam.vn";

  if (!isDemoAccount) return empty;

  const demoData = getAnNhienDefaultData();

  try {
    localStorage.setItem(key, JSON.stringify(demoData));
  } catch {
    // Vẫn cho xem dữ liệu mẫu trong phiên hiện tại.
  }

  return demoData;
};

export const saveUserCornerData = (
  email: string,
  data: UserCornerData
): boolean => {
  if (!isCompleteUserCornerData(data)) {
    return false;
  }

  const key = getUserCornerStorageKey(email);

  try {
    const previousRaw = localStorage.getItem(key);

    if (previousRaw !== null) {
      let previousIsValid = false;

      try {
        const previousParsed: unknown = JSON.parse(previousRaw);
        previousIsValid =
          isCompleteUserCornerData(previousParsed);
      } catch {
        previousIsValid = false;
      }

      if (!previousIsValid) {
        const backupKey =
          `${key}-recovery-${crypto.randomUUID()}`;

        // Giữ nguyên nội dung gốc, kể cả JSON không đọc được.
        localStorage.setItem(backupKey, previousRaw);
      }
    }

    localStorage.setItem(key, JSON.stringify(data));
    return true;
  } catch {
    // Nếu sao lưu hoặc ghi dữ liệu mới thất bại, không báo thành công.
    return false;
  }
};

export const getAccountScopedKey = (base: string, email?: string | null) => {
  const accountId = email ? email.trim().toLowerCase() : "guest";
  return `${base}_${accountId}`;
};

const readActionDone = (
  signalId: string,
  date: string,
  email?: string | null
): boolean => {
  try {
    const raw = localStorage.getItem(
      getAccountScopedKey(
        "tltl-action-done-date",
        email
      )
    );

    if (!raw) return false;

    const value: unknown = JSON.parse(raw);

    if (
      typeof value !== "object" ||
      value === null
    ) {
      return false;
    }

    const record = value as {
      date?: unknown;
      signalId?: unknown;
    };

    return (
      record.date === date &&
      record.signalId === signalId
    );
  } catch {
    return false;
  }
};

export const loadUserSessionState = (user: UserProfile | null, todayStr: string) => {
  const email = user?.email;
  const checkInKey = getAccountScopedKey("tltl-last-checkin-date", email);
  const moodKey = getAccountScopedKey("tltl-today-mood", email);
  const topicsKey = getAccountScopedKey("tltl-selected-topics", email);
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

    if (stored !== null) {
      const parsed: unknown = JSON.parse(stored);

      if (Array.isArray(parsed)) {
        topics = sanitizeCulturalTopics(parsed);
      }
    }
  } catch {
    // Giữ lựa chọn mặc định nếu dữ liệu không đọc được.
  }

  let signalId = getDefaultSignalForMood(mood).id;
  try {
    const storedSigId = localStorage.getItem(signalKey);
    if (storedSigId && getSignalById(storedSigId)) {
      signalId = storedSigId;
    }
  } catch {}

  const actionDone = readActionDone(
    signalId,
    todayStr,
    email
  );

  return { checkedIn, mood, topics, actionDone, signalId };
};

export type PendingSave =
  | { type: "signal"; item: SavedSignalItem }
  | { type: "xam"; item: SavedXinXamItem }
  | { type: "wish"; item: SavedWishItem };

const isSameSavedReflection = (
  entry: SavedSignalItem,
  candidate: {
    signalId: string;
    date: string;
    journal?: string;
  }
): boolean => {
  return (
    entry.signalId === candidate.signalId &&
    entry.date === candidate.date &&
    (entry.journal || "").trim() ===
      (candidate.journal || "").trim()
  );
};

const getCultureRegionFromLocation = (): CultureRegionSlug => {
  const path = window.location.pathname.replace(/^\/+/, "");

  // Các trải nghiệm riêng luôn thuộc vùng tương ứng.
  if (path === "chau-van") return "north";
  if (path === "sea-prayer") return "central";
  if (path === "southern-culture") return "south";

  const region = new URLSearchParams(
    window.location.search
  ).get("region");

  if (
    region === "north" ||
    region === "central" ||
    region === "south"
  ) {
    return region;
  }

  return "north";
};

const parseMemorialRecord = (
  value: unknown
): MemorialRecord | null => {
  if (
    typeof value !== "object" ||
    value === null ||
    Array.isArray(value)
  ) {
    return null;
  }

  const record = value as Record<string, unknown>;

  if (
    typeof record.name !== "string" ||
    typeof record.relation !== "string" ||
    typeof record.date !== "string"
  ) {
    return null;
  }

  const name = record.name.trim();
  const relation = record.relation.trim();
  const date = record.date.trim();

  if (!name || !relation) return null;

  if (
    record.note !== undefined &&
    record.note !== null &&
    typeof record.note !== "string"
  ) {
    return null;
  }

  const match = date.match(/^(\d{4})-(\d{2})-(\d{2})$/);

  if (!match) return null;

  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);

  if (
    year < 1 ||
    month < 1 ||
    month > 12 ||
    day < 1 ||
    day > 31
  ) {
    return null;
  }

  const parsedDate = new Date(0);
  parsedDate.setHours(0, 0, 0, 0);
  parsedDate.setFullYear(year, month - 1, day);

  if (
    parsedDate.getFullYear() !== year ||
    parsedDate.getMonth() !== month - 1 ||
    parsedDate.getDate() !== day
  ) {
    return null;
  }

  const note =
    typeof record.note === "string"
      ? record.note.trim()
      : "";

  return {
    name,
    relation,
    date,
    note: note || undefined,
  };
};

const loadMemorialRecord = (
  email?: string | null
): MemorialRecord | null => {
  const accountId = email?.trim().toLowerCase() || "guest";

  try {
    const raw = localStorage.getItem(
      `tltl-memorial-${accountId}`
    );

    if (!raw) return null;

    const parsed: unknown = JSON.parse(raw);

    return parseMemorialRecord(parsed);
  } catch {
    return null;
  }
};

export default function App() {
  const todayDateString = new Date().toDateString();

  const initialUser = loadCurrentDemoUser();
  const initialSession = loadUserSessionState(initialUser, todayDateString);

  // Helper to resolve initial screen from URL safely with prerequisite checks
  const getInitialScreen = (): NavScreen => {
    const path = window.location.pathname.replace(/^\//, "");
    if (
      ["account", "settings"].includes(path) &&
      !initialUser
    ) {
      return "login";
    }
    if (path === "loading") {
      return initialSession.checkedIn ? "today" : "mood";
    }

    if (path === "saved") {
      return initialSession.checkedIn ? "today" : "guest";
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
        "culture-map",
        "region-culture",
        "chau-van",
        "sea-prayer",
        "southern-culture",
        "mood-journey",
        "notifications",
        "rituals",
        "ritual-detail",
        "calendar",
        "calendar-detail",
        "experience",
        "sanctuary",
        "ancestor-altar",
        "memorial",
        "memorial-form",
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
        "astrology",
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
  const [selectedCultureRegion, setSelectedCultureRegion] =
    useState<CultureRegionSlug>(
      getCultureRegionFromLocation
    );
  const [selectedRitualId, setSelectedRitualId] = useState<string>(initialUrlRitualId);
  const [selectedCalendarEventId, setSelectedCalendarEventId] = useState<string>(initialUrlCalendarEventId);
  const [journalText, setJournalText] = useState("");
  const {
    dark,
    themePreference,
    setThemePreference,
  } = useTheme();

  const [currentUser, setCurrentUser] = useState<UserProfile | null>(initialUser);
  const [userSettings, setUserSettings] = useState<UserSettings>(DEFAULT_USER_SETTINGS);
  const [pendingSave, setPendingSave] = useState<PendingSave | null>(null);
  const [isLoginImmersive, setIsLoginImmersive] = useState(false);

  useEffect(() => {
    let active = true;

    void restoreSession().then(async (user) => {
      if (!active) return;

      setCurrentUser(user);
      setUserCornerData(loadUserCornerData(user));

      const session = loadUserSessionState(user, todayDateString);
      setSelectedTopics(session.topics);
      setIsCheckedIn(session.checkedIn);
      setSelectedMood(session.mood);
      setIsActionDone(session.actionDone);
      setCurrentSignalId(session.signalId);

      if (user) {
        try {
          const preferences = await loadUserPreferences();
          if (!active) return;
          setUserSettings(preferences.settings);
          setThemePreference(preferences.settings.theme);
          setSelectedTopics(sanitizeCulturalTopics(preferences.topics));
        } catch {
          // Giữ cache cục bộ nếu máy chủ tạm thời không phản hồi.
        }

        try {
          const remoteSignals = await loadSavedSignals();
          if (active && remoteSignals.length > 0) {
            setUserCornerData((previous) => ({
              ...previous,
              signals: remoteSignals,
            }));
          }
        } catch {
          // Giữ cache cục bộ khi danh sách tín hiệu chưa sẵn sàng.
        }

        try {
          const [remoteXam, remoteWishes] = await Promise.all([
            loadSavedXam(),
            loadSavedWishes(),
          ]);
          if (active) {
            setUserCornerData((previous) => ({
              ...previous,
              xam: remoteXam,
              wishes: remoteWishes,
            }));
          }
        } catch {
          // Giữ cache cục bộ nếu API reflection chưa sẵn sàng.
        }

        try {
          const [remoteMemorial, remoteNotes] = await Promise.all([
            loadMemorial(),
            loadCalendarNotes(),
          ]);
          if (active) {
            if (remoteMemorial) setMemorial(remoteMemorial);
            if (remoteNotes.length > 0) {
              for (const note of remoteNotes) {
                try {
                  const key = getCalendarNotesStorageKey(user.email);
                  const current = loadCalendarPersonalNotes(user.email);
                  if (!current.some((item) => item.id === note.id)) {
                    localStorage.setItem(key, JSON.stringify([note, ...current]));
                  }
                } catch {
                  // Backend remains the source of truth when local cache is unavailable.
                }
              }
            }
          }
        } catch {
          // Giữ cache local nếu memorial/calendar API chưa sẵn sàng.
        }
      }

      if (user) {
        const path = window.location.pathname.replace(/^\/+/, "");
        if (["account", "settings"].includes(path)) setScreen(path as NavScreen);
      }
    });

    return () => {
      active = false;
    };
  }, [todayDateString]);

  useEffect(() => {
    if (screen !== "login") {
      setIsLoginImmersive(false);
    }
  }, [screen]);

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
  const [pendingMoodCheckInId, setPendingMoodCheckInId] = useState<string | null>(null);

  // Trạng thái hành động hoàn thành theo từng tài khoản
  const [isActionDone, setIsActionDone] =
    useState<boolean>(() =>
      readActionDone(
        initialUrlSignal?.id || initialSession.signalId,
        todayDateString,
        initialUser?.email
      )
    );

  useEffect(() => {
    setIsActionDone(
      readActionDone(
        currentSignalId,
        todayDateString,
        currentUser?.email
      )
    );
  }, [
    currentSignalId,
    currentUser?.email,
    todayDateString,
  ]);

  // Tách biệt dữ liệu Góc của tôi (tín hiệu, thẻ xăm, điều ước) theo từng tài khoản
  const [userCornerData, setUserCornerData] = useState<UserCornerData>(() => {
    return loadUserCornerData(initialUser);
  });

  const [openedSavedSignal, setOpenedSavedSignal] =
    useState<SavedSignalItem | null>(null);

  const handleOpenSavedSignal = (entryId: string) => {
    const entry = userCornerData.signals.find(
      (item) => item.id === entryId
    );

    if (!entry) {
      window.alert(
        "Nội dung này không còn trong danh sách đã lưu."
      );
      return;
    }

    setOpenedSavedSignal(entry);
  };

  useEffect(() => {
    setOpenedSavedSignal(null);
  }, [currentUser?.email]);

  const [memorial, setMemorial] =
    useState<MemorialRecord | null>(() =>
      loadMemorialRecord(initialUser?.email)
    );

  // Active signal computed from currentSignalId
  const activeSignal = getSignalById(currentSignalId) || getDefaultSignalForMood(selectedMood);

  useEffect(() => {
    setMemorial(loadMemorialRecord(currentUser?.email));
  }, [currentUser?.email]);

  // Account và Settings yêu cầu hồ sơ đăng nhập.
  useEffect(() => {
    if (currentUser) return;

    const path = window.location.pathname.replace(
      /^\/+/,
      ""
    );

    const protectedScreens = [
      "account",
      "settings",
    ];

    const needsLogin =
      protectedScreens.includes(screen) ||
      protectedScreens.includes(path);

    if (!needsLogin) return;

    setScreen("login");

    // Đồng bộ URL và tránh thêm một trang bị chặn
    // vào lịch sử điều hướng.
    window.history.replaceState(
      { screen: "login" },
      "",
      "/login"
    );

    window.scrollTo({
      top: 0,
      behavior: "auto",
    });
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

      if (
        path === "region-culture" ||
        path === "chau-van" ||
        path === "sea-prayer" ||
        path === "southern-culture"
      ) {
        setSelectedCultureRegion(
          getCultureRegionFromLocation()
        );
      }

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
      if (
        ["account", "settings"].includes(path) &&
        !currentUser
      ) {
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
          "culture-map",
          "region-culture",
          "chau-van",
          "sea-prayer",
          "southern-culture",
          "mood-journey",
          "notifications",
          "rituals",
          "ritual-detail",
          "calendar",
          "calendar-detail",
          "experience",
          "sanctuary",
          "ancestor-altar",
          "memorial",
          "memorial-form",
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
          "astrology",
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
  }, [
    currentUser,
    isCheckedIn,
    activeSignal.id,
    currentSignalId,
    selectedMood,
    selectedCultureRegion,
  ]);

  const navigateTo = (
    newScreen: NavScreen,
    signalIdParam?: string,
    authenticatedUser?: UserProfile | null,
    cultureRegionParam?: CultureRegionSlug
  ) => {
    let targetScreen = newScreen;
    const effectiveUser =
      authenticatedUser !== undefined
        ? authenticatedUser
        : currentUser ?? loadCurrentDemoUser();

    if (
      ["account", "settings"].includes(targetScreen) &&
      !effectiveUser
    ) {
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

    if (targetScreen === "region-culture") {
      const region =
        cultureRegionParam || selectedCultureRegion;

      setSelectedCultureRegion(region);
      url = `/region-culture?region=${region}`;
    }

    if (
      targetScreen === "chau-van" ||
      targetScreen === "sea-prayer" ||
      targetScreen === "southern-culture"
    ) {
      const region: CultureRegionSlug =
        targetScreen === "chau-van"
          ? "north"
          : targetScreen === "sea-prayer"
            ? "central"
            : "south";

      setSelectedCultureRegion(region);
      url = `/${targetScreen}?region=${region}`;
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

  const handleToggleAction = (
    completed: boolean
  ): boolean => {
    const key = getAccountScopedKey(
      "tltl-action-done-date",
      currentUser?.email
    );

    try {
      if (completed) {
        localStorage.setItem(
          key,
          JSON.stringify({
            date: todayDateString,
            signalId: activeSignal.id,
          })
        );
      } else {
        localStorage.removeItem(key);
      }
    } catch {
      window.alert(
        "Chưa lưu được trạng thái hành động. Bạn hãy thử lại."
      );

      return false;
    }

    setIsActionDone(completed);

    if (currentUser && pendingMoodCheckInId) {
      void updateMoodAction(pendingMoodCheckInId, completed).catch(() => {
        window.alert("Chưa đồng bộ được trạng thái hành động. Bạn hãy thử lại.");
      });
    }

    return true;
  };

  const handleSubmitMood = async () => {
    // Mỗi lần gửi cảm xúc là một lượt mới,
    // kể cả khi chọn lại cùng cảm xúc.
    const resetSucceeded = handleToggleAction(false);

    if (!resetSucceeded) return;

    const nextSignal = getDefaultSignalForMood(
      selectedMood
    );

    if (currentUser) {
      try {
        const result = await createMoodCheckIn({
          mood: selectedMood,
          note: journalText.trim() || undefined,
          signalId: nextSignal.id,
        });
        setPendingMoodCheckInId(result.checkIn.id);
        setCurrentSignalId(result.signal.id);
      } catch {
        window.alert("Chưa ghi nhận được cảm xúc. Bạn hãy thử lại.");
        return;
      }
    } else {
      setCurrentSignalId(nextSignal.id);
    }
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

  const handleRefreshSignal = async () => {
    if (currentUser) {
      try {
        const result = await loadSignals(activeSignal.mood);
        const currentIndex = result.items.findIndex((item) => item.id === activeSignal.id);
        const nextSignal = result.items[(currentIndex + 1) % result.items.length];
        if (!nextSignal) return;

        const checkIn = await createMoodCheckIn({
          mood: activeSignal.mood,
          note: journalText.trim() || undefined,
          signalId: nextSignal.id,
        });
        setPendingMoodCheckInId(checkIn.checkIn.id);
        setIsActionDone(false);
        setSelectedMood(activeSignal.mood);
        setCurrentSignalId(checkIn.signal.id);
        window.history.replaceState(
          { screen: "result", signalId: checkIn.signal.id, mood: activeSignal.mood },
          "",
          `/result?signalId=${encodeURIComponent(checkIn.signal.id)}`
        );
      } catch {
        window.alert("Chưa đổi được lời chiêm nghiệm. Bạn hãy thử lại.");
      }
      return;
    }

    const nextSignal = getNextSignalForMood(
      activeSignal.id,
      activeSignal.mood
    );

    const signalKey = getAccountScopedKey(
      "tltl-current-signal-id",
      undefined
    );

    const actionKey = getAccountScopedKey(
      "tltl-action-done-date",
      undefined
    );

    let previousSignal: string | null;
    let previousAction: string | null;

    try {
      previousSignal = localStorage.getItem(signalKey);
      previousAction = localStorage.getItem(actionKey);
    } catch {
      window.alert(
        "Chưa đọc được dữ liệu trên trình duyệt. Bạn hãy thử lại."
      );
      return;
    }

    try {
      localStorage.setItem(signalKey, nextSignal.id);
      localStorage.removeItem(actionKey);
    } catch {
      try {
        if (previousSignal === null) {
          localStorage.removeItem(signalKey);
        } else {
          localStorage.setItem(
            signalKey,
            previousSignal
          );
        }

        if (previousAction === null) {
          localStorage.removeItem(actionKey);
        } else {
          localStorage.setItem(
            actionKey,
            previousAction
          );
        }
      } catch {
        // Việc khôi phục cũng có thể bị trình duyệt chặn.
      }

      window.alert(
        "Chưa hoàn tất việc đổi lời chiêm nghiệm. Bạn hãy tải lại trang để kiểm tra trước khi thử lại."
      );
      return;
    }

    setIsActionDone(false);
    setSelectedMood(nextSignal.mood);
    setCurrentSignalId(nextSignal.id);

    window.history.replaceState(
      {
        screen: "result",
        signalId: nextSignal.id,
        mood: nextSignal.mood,
      },
      "",
      `/result?signalId=${encodeURIComponent(nextSignal.id)}`
    );
  };

  const handleSaveResult = async () => {
    setIsCheckedIn(true);
    try {
      const email = currentUser?.email;
      localStorage.setItem(getAccountScopedKey("tltl-last-checkin-date", email), todayDateString);
      localStorage.setItem(getAccountScopedKey("tltl-today-mood", email), selectedMood);
      localStorage.setItem(getAccountScopedKey("tltl-current-signal-id", email), activeSignal.id);
    } catch {}

    const createdAt = Date.now();

    const newEntry: SavedSignalItem = {
      id: crypto.randomUUID(),
      signalId: activeSignal.id,
      mood: activeSignal.mood,
      createdAt,
      date: new Date(createdAt).toLocaleDateString("vi-VN"),
      journal: journalText.trim() || undefined,
      poemLine1: activeSignal.poem.line1,
      poemLine2: activeSignal.poem.line2,
      actionTitle: activeSignal.action.title,
      starred: false,
    };

    if (!currentUser) {
      setPendingSave({
        type: "signal",
        item: newEntry,
      });

      navigateTo("login");
      return;
    }

    try {
      const remoteEntry = await saveSignal(activeSignal.id, {
        checkInId: pendingMoodCheckInId || undefined,
        note: journalText.trim() || undefined,
        actionDone: isActionDone,
      });
      setUserCornerData((previous) => ({
        ...previous,
        signals: [
          remoteEntry,
          ...previous.signals.filter((entry) => entry.id !== remoteEntry.id),
        ],
      }));
      return;
    } catch {
      window.alert("Chưa lưu được lời chiêm nghiệm. Bạn hãy thử lại.");
      return;
    }

    return;

    /* if (!saved) {
      window.alert(
        "Chưa lưu được lời chiêm nghiệm. Trình duyệt có thể hết dung lượng hoặc đang chặn lưu dữ liệu. Bạn hãy thử lại."
      );

      return;
    }

    setUserCornerData(updated); */
  };

  const handleAuthenticated = (
    name?: string,
    email?: string
  ) => {
    const user: UserProfile = {
      name: name?.trim() || "An Nhiên",
      email: email?.trim().toLowerCase() ||
        "annhien@tinlamtamlinh.vn",
    };

    // Giữ nội dung đang chờ trước khi cập nhật state.
    const pending = pendingSave;

    const existingData = loadUserCornerData(user);

    const nextData: UserCornerData = {
      signals: [...existingData.signals],
      xam: [...existingData.xam],
      wishes: [...existingData.wishes],
    };

    if (pending?.type === "signal") {
      const item = pending.item;

      const exists = nextData.signals.some((entry) =>
        isSameSavedReflection(entry, item)
      );

      if (!exists) {
        nextData.signals.unshift(item);
      }
    }

    if (pending?.type === "xam") {
      const item = pending.item;

      const exists = nextData.xam.some(
        (entry) =>
          entry.id === item.id ||
          (
            Boolean(item.drawId) &&
            entry.drawId === item.drawId
          )
      );

      if (!exists) {
        nextData.xam.unshift(item);
      }
    }

    if (pending?.type === "wish") {
      const item = pending.item;

      const exists = nextData.wishes.some(
        (entry) => entry.id === item.id
      );

      if (!exists) {
        nextData.wishes.unshift(item);
      }
    }

    // Ghi trực tiếp để lỗi lưu không bị hàm helper bỏ qua.
    try {
      if (pending) {
        const saved = saveUserCornerData(user.email, nextData);

        if (!saved) {
          throw new Error("Không thể lưu nội dung đang chờ.");
        }
      }

      localStorage.setItem(
        "tltl-current-user",
        JSON.stringify(user)
      );
    } catch {
      window.alert(
        "Trình duyệt chưa lưu được dữ liệu. Nội dung đang chờ vẫn được giữ trong phiên này. Bạn hãy thử lại."
      );
      return;
    }

    const userSession = loadUserSessionState(
      user,
      todayDateString
    );

    setCurrentUser(user);
    setUserCornerData(nextData);
    setSelectedTopics(userSession.topics);

    void loadUserPreferences()
      .then((preferences) => {
        setUserSettings(preferences.settings);
        setThemePreference(preferences.settings.theme);
        setSelectedTopics(sanitizeCulturalTopics(preferences.topics));
      })
      .catch(() => {
        // Phiên đăng nhập vẫn hợp lệ; giữ tùy chọn cache để người dùng tiếp tục.
      });

    void loadSavedSignals()
      .then((remoteSignals) => {
        if (remoteSignals.length > 0) {
          setUserCornerData((previous) => ({
            ...previous,
            signals: remoteSignals,
          }));
        }
      })
      .catch(() => {
        // Giữ dữ liệu local nếu API tín hiệu chưa sẵn sàng.
      });

    void Promise.all([loadSavedXam(), loadSavedWishes()])
      .then(([remoteXam, remoteWishes]) => {
        setUserCornerData((previous) => ({
          ...previous,
          xam: remoteXam,
          wishes: remoteWishes,
        }));
      })
      .catch(() => {
        // Giữ cache local nếu API reflection chưa sẵn sàng.
      });

    void Promise.all([loadMemorial(), loadCalendarNotes()])
      .then(([remoteMemorial, remoteNotes]) => {
        if (remoteMemorial) setMemorial(remoteMemorial);
        if (remoteNotes.length > 0) {
          try {
            localStorage.setItem(getCalendarNotesStorageKey(user.email), JSON.stringify(remoteNotes));
          } catch {
            // Backend remains the source of truth.
          }
        }
      })
      .catch(() => {});

    if (pending?.type === "signal") {
      const savedSignal =
        getSignalById(pending.item.signalId) ||
        getDefaultSignalForMood(
          pending.item.mood as MoodKey
        );

      // Giữ đúng lượt chiêm nghiệm trước khi đăng nhập.
      setIsCheckedIn(true);
      setSelectedMood(savedSignal.mood);
      setCurrentSignalId(savedSignal.id);
      setJournalText(pending.item.journal || "");

      try {
        localStorage.setItem(
          getAccountScopedKey(
            "tltl-last-checkin-date",
            user.email
          ),
          todayDateString
        );

        localStorage.setItem(
          getAccountScopedKey(
            "tltl-today-mood",
            user.email
          ),
          savedSignal.mood
        );

        localStorage.setItem(
          getAccountScopedKey(
            "tltl-current-signal-id",
            user.email
          ),
          savedSignal.id
        );

        const actionKey = getAccountScopedKey(
          "tltl-action-done-date",
          user.email
        );

        if (isActionDone) {
          localStorage.setItem(
            actionKey,
            JSON.stringify({
              date: todayDateString,
              signalId: savedSignal.id,
            })
          );
        } else {
          localStorage.removeItem(actionKey);
        }
      } catch {
        // Nội dung đã lưu; trạng thái ngày có thể không
        // được khôi phục đầy đủ khi tải lại.
      }

      setPendingSave(null);

      if (pending?.type === "signal") {
        void saveSignal(pending.item.signalId, {
          note: pending.item.journal,
          actionDone: isActionDone,
        }).catch(() => {
          // Bản ghi local vẫn được giữ lại để không mất nội dung khi API tạm thời lỗi.
        });
      }

      navigateTo("result", savedSignal.id, user);
      return;
    }

    // Đăng nhập thông thường hoặc lưu xăm/lời nguyện:
    // khôi phục trạng thái riêng của tài khoản.
    if (pending?.type === "xam") {
      void saveXam({
        stickNumber: pending.item.stickNumber,
        topic: pending.item.category,
        region: pending.item.region,
        category: pending.item.category,
        fortuneType: pending.item.fortuneType,
        quote: pending.item.quote,
      }).catch(() => {});
    }
    if (pending?.type === "wish") {
      void saveWish(pending.item.content, pending.item.category).catch(() => {});
    }

    setIsCheckedIn(userSession.checkedIn);
    setSelectedMood(userSession.mood);
    setIsActionDone(userSession.actionDone);
    setCurrentSignalId(userSession.signalId);
    setJournalText("");
    setPendingSave(null);

    navigateTo("account", undefined, user);
  };

  const handleLogout = async () => {
    await logoutAccount();

    const guestSession = loadUserSessionState(
      null,
      todayDateString
    );

    setCurrentUser(null);
    setUserSettings(DEFAULT_USER_SETTINGS);

    setUserCornerData({
      signals: [],
      xam: [],
      wishes: [],
    });

    setOpenedSavedSignal(null);

    setIsCheckedIn(guestSession.checkedIn);
    setSelectedMood(guestSession.mood);
    setSelectedTopics(guestSession.topics);
    setIsActionDone(guestSession.actionDone);
    setCurrentSignalId(guestSession.signalId);

    setJournalText("");
    setPendingSave(null);

    // Truyền null rõ ràng để không dùng hồ sơ của lần render cũ.
    navigateTo("guest", undefined, null);
  };

  const handleUpdateProfile = async (
    updated: { name: string; email?: string }
  ): Promise<boolean> => {
    if (!currentUser) return false;

    const cleanName = updated.name.trim();

    if (!cleanName || cleanName.length > 120) {
      return false;
    }

    try {
      const updatedUser = await updateProfile(cleanName);
      saveLocalDemoAccount(updatedUser);
      setCurrentUser(updatedUser);
      return true;
    } catch {
      return false;
    }
  };

  const handleSaveTopics = async (topics: string[]): Promise<boolean> => {
    if (!currentUser) return false;
    const nextTopics = sanitizeCulturalTopics(topics);

    try {
      const savedTopics = sanitizeCulturalTopics(await replaceTopics(nextTopics));
      setSelectedTopics(savedTopics);
      try {
        localStorage.setItem(
          getAccountScopedKey("tltl-selected-topics", currentUser.email),
          JSON.stringify(savedTopics)
        );
      } catch {
        // Backend là nguồn dữ liệu chính; cache local có thể không khả dụng.
      }
      return true;
    } catch {
      return false;
    }
  };

  const handleChangeTheme = async (theme: typeof themePreference): Promise<boolean> => {
    if (!currentUser) return false;
    const previous = themePreference;
    setThemePreference(theme);

    try {
      const saved = await updateSettings({ theme });
      setUserSettings(saved);
      setThemePreference(saved.theme);
      return true;
    } catch {
      setThemePreference(previous);
      return false;
    }
  };

  const handleChangeNotifications = async (
    notifications: Pick<UserSettings, "emailNotifications" | "pushNotifications">
  ): Promise<boolean> => {
    if (!currentUser) return false;
    try {
      const saved = await updateSettings(notifications);
      setUserSettings(saved);
      return true;
    } catch {
      return false;
    }
  };

  const handleToggleTheme = () => {
    const nextTheme = dark ? "light" : "dark";
    if (currentUser) {
      void handleChangeTheme(nextTheme);
    } else {
      setThemePreference(nextTheme);
    }
  };

  const commitCornerData = (
    updated: UserCornerData,
    showErrorAlert = true
  ): boolean => {
    if (!currentUser) return false;

    const saved = saveUserCornerData(
      currentUser.email,
      updated
    );

    if (!saved) {
      if (showErrorAlert) {
        window.alert(
          "Chưa lưu được thay đổi. Nội dung trên màn hình vẫn được giữ nguyên. Bạn hãy thử lại."
        );
      }

      return false;
    }

    setUserCornerData(updated);
    return true;
  };

  const handleDeleteSignal = (id: string): boolean => {
    const saved = commitCornerData(
      {
        ...userCornerData,
        signals: userCornerData.signals.filter(
          (item) => item.id !== id
        ),
      },
      false
    );

    if (saved && openedSavedSignal?.id === id) {
      setOpenedSavedSignal(null);
    }

    if (saved && currentUser) {
      void deleteSavedSignal(id).catch(() => {
        // Optimistic local update; server retry can happen on the next sync.
      });
    }

    return saved;
  };

  const handleDeleteXam = (id: string): boolean => {
    const saved = commitCornerData(
      {
        ...userCornerData,
        xam: userCornerData.xam.filter(
          (item) => item.id !== id
        ),
      },
      false
    );
    if (saved && currentUser) void deleteSavedXam(id).catch(() => {});
    return saved;
  };

  const handleDeleteWish = (id: string): boolean => {
    const saved = commitCornerData(
      {
        ...userCornerData,
        wishes: userCornerData.wishes.filter(
          (item) => item.id !== id
        ),
      },
      false
    );
    if (saved && currentUser) void deleteSavedWish(id).catch(() => {});
    return saved;
  };

  const handleToggleStarSignal = (id: string) => {
    const entry = userCornerData.signals.find((item) => item.id === id);
    commitCornerData({
      ...userCornerData,
      signals: userCornerData.signals.map(
        (item) =>
          item.id === id
            ? { ...item, starred: !item.starred }
            : item
      ),
    });

    if (currentUser && entry) {
      void updateSavedSignal(id, !entry.starred).catch(() => {
        // Optimistic local update; server remains the source of truth on reload.
      });
    }
  };

  const handleToggleStarXam = (id: string) => {
    const entry = userCornerData.xam.find((item) => item.id === id);
    commitCornerData({
      ...userCornerData,
      xam: userCornerData.xam.map(
        (item) =>
          item.id === id
            ? { ...item, starred: !item.starred }
            : item
      ),
    });
    if (currentUser && entry) void updateSavedXam(id, !entry.starred).catch(() => {});
  };

  const handleToggleStarWish = (id: string) => {
    const entry = userCornerData.wishes.find((item) => item.id === id);
    commitCornerData({
      ...userCornerData,
      wishes: userCornerData.wishes.map(
        (item) =>
          item.id === id
            ? { ...item, starred: !item.starred }
            : item
      ),
    });
    if (currentUser && entry) void updateSavedWish(id, !entry.starred).catch(() => {});
  };

  const handleSavePrivateWish = (
    content: string,
    category: string
  ): boolean => {
    const cleanContent = content.trim();
    if (!cleanContent) return false;

    const createdAt = Date.now();

    const newWish: SavedWishItem = {
      id: crypto.randomUUID(),
      category,
      content: cleanContent,
      createdAt,
      date: new Date(createdAt).toLocaleDateString("vi-VN"),
      sealed: true,
      starred: false,
    };

    if (!currentUser) {
      setPendingSave({
        type: "wish",
        item: newWish,
      });

      navigateTo("login");
      return false;
    }

    void saveWish(cleanContent, category)
      .then((remoteWish) => {
        setUserCornerData((previous) => ({
          ...previous,
          wishes: [remoteWish, ...previous.wishes.filter((item) => item.id !== remoteWish.id)],
        }));
      })
      .catch(() => {});

    const nextData: UserCornerData = {
      ...userCornerData,
      wishes: [newWish, ...userCornerData.wishes],
    };

    const saved = saveUserCornerData(
      currentUser.email,
      nextData
    );

    if (!saved) return false;

    setUserCornerData(nextData);
    return true;
  };


  const handleSaveDayToCalendar = (dayData: {
    title: string;
    day: number;
    month: number;
    year: number;
  }): boolean => {
    try {
      const currentList = loadCalendarPersonalNotes(
        currentUser?.email
      );

      const exists = currentList.some(
        (note) =>
          note.title === dayData.title &&
          note.day === dayData.day &&
          note.month === dayData.month &&
          note.year === dayData.year
      );

      if (exists) return true;

      const lunarInfo = getReliableLunarDate(
        dayData.day,
        dayData.month,
        dayData.year
      );

      const newNote = {
        id: crypto.randomUUID(),
        title: dayData.title,
        typeLabel: "Ghi chú cá nhân",
        region: "Cá nhân",
        shortDesc: "Ngày dự định do bạn chọn.",
        lunarDate: lunarInfo
          ? `Ngày ${lunarInfo.lunarDay}/${lunarInfo.lunarMonth} âm lịch (${lunarInfo.canChiYear})`
          : "Chưa có thông tin âm lịch",
        day: dayData.day,
        month: dayData.month,
        year: dayData.year,
        type: "personal" as const,
      };

      localStorage.setItem(
        getCalendarNotesStorageKey(currentUser?.email),
        JSON.stringify([newNote, ...currentList])
      );

      if (currentUser) {
        void saveCalendarNote(dayData).catch(() => {
          // Local cache keeps the calendar usable if the API is temporarily unavailable.
        });
      }

      return true;
    } catch {
      return false;
    }
  };

  const currentDateLabel = new Date().toLocaleDateString("vi-VN");

  const isCurrentSignalSaved = Boolean(
    currentUser &&
      userCornerData.signals.some((entry) =>
        isSameSavedReflection(entry, {
          signalId: activeSignal.id,
          date: currentDateLabel,
          journal: journalText,
        })
      )
  );

  return (
    <div className={`app-shell ${dark ? "dark" : ""} ${["login", "register", "forgot"].includes(screen) ? "lg:h-screen lg:max-h-screen lg:overflow-hidden" : ""}`}>
      {/* Universal Header - tự động ẩn khi ấn đăng nhập tại LoginScreen */}
      {!isLoginImmersive && (
        <AppHeader
          currentScreen={screen}
          onNavigate={navigateTo}
          dark={dark}
          onToggleDark={handleToggleTheme}
          onLoginClick={() => navigateTo("login")}
          user={currentUser}
          onLogout={handleLogout}
        />
      )}

      {/* Screen Router */}
      <div className={`app-screen-outlet ${["login", "register", "forgot"].includes(screen) ? "flex-1 min-h-0 lg:overflow-hidden" : ""}`}>
        <Suspense
          fallback={
            <div
              className="page-container max-w-7xl text-sm text-muted"
              role="status"
            >
              Đang mở nội dung…
            </div>
          }
        >
          <ScreenFocus key={screen}>
        {screen === "guest" && (
          <GuestScreen
            onSelectMood={() => navigateTo("mood")}
            onGoToCulture={() => navigateTo("culture")}
            onGoToExperience={() => navigateTo("experience")}
          />
        )}

        {screen === "today" && (
          <TodayScreen
            signal={activeSignal}
            isCheckedIn={isCheckedIn}
            mood={selectedMood}
            isActionDone={isActionDone}
            onSelectMoodClick={() => navigateTo("mood")}
            onViewSignalDetails={() =>
              navigateTo("result", activeSignal.id)
            }
            selectedTopics={selectedTopics}
            onGoToCulture={() => navigateTo("culture")}
            onGoToExperience={() => navigateTo("experience")}
            onGoToZen={() => navigateTo("zen")}
          />
        )}

        {screen === "mood" && (
          <MoodCheckInScreen
            selectedMood={selectedMood}
            onSelectMood={setSelectedMood}
            journalText={journalText}
            onChangeJournal={setJournalText}
            onBackToToday={() => {
              setSelectedMood(activeSignal.mood);
              navigateTo("today");
            }}
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
            journalText={journalText}
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
            onGoToXinXam={() => navigateTo("xinxam")}
            onGoToWish={() => navigateTo("wish")}
            onGoToZen={() => navigateTo("zen")}
            onGoToGratitude={() => navigateTo("gratitude")}
            onGoToXinKeo={() => navigateTo("xinkeo")}
            onGoToAstrology={() => navigateTo("astrology")}
            onGoToSanctuary={() => navigateTo("sanctuary")}
            onGoToCulture={() => navigateTo("culture")}
          />
        )}

        {screen === "sanctuary" && (
          <VirtualSanctuaryScreen
            memorial={memorial}
            onBackToExperience={() => navigateTo("experience")}
            onGoToAltar={() => navigateTo("ancestor-altar")}
            onGoToMemorial={() => navigateTo("memorial")}
            onGoToZen={() => navigateTo("zen")}
          />
        )}

        {screen === "ancestor-altar" && (
          <AncestorAltarScreen
            memorial={memorial}
            onBack={() => navigateTo("sanctuary")}
            onGoToMemorial={() => navigateTo("memorial")}
            isLoggedIn={Boolean(currentUser)}
            onSaveTribute={(text) =>
              handleSavePrivateWish(text, "Tri ân gia tiên")
            }
          />
        )}

        {screen === "memorial" && (
          <MemorialSpaceScreen
            memorial={memorial}
            onBack={() => navigateTo("sanctuary")}
            onCreate={() => navigateTo("memorial-form")}
            onEdit={() => navigateTo("memorial-form")}
            onGoToAltar={() => navigateTo("ancestor-altar")}
          />
        )}

        {screen === "memorial-form" && (
          <MemorialFormScreen
            initialValue={memorial}
            onBack={() => navigateTo("memorial")}
            onSave={(nextMemorial) => {
              const accountId =
                currentUser?.email?.trim().toLowerCase() || "guest";

              try {
                localStorage.setItem(
                  `tltl-memorial-${accountId}`,
                  JSON.stringify(nextMemorial)
                );
              } catch {
                return false;
              }

              setMemorial(nextMemorial);
              if (currentUser) {
                void saveMemorial(nextMemorial).catch(() => {
                  // Local cache keeps the form usable if the API is temporarily unavailable.
                });
              }
              navigateTo("memorial");
              return true;
            }}
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
            onGoToMap={() => navigateTo("culture-map")}
          />
        )}

        {screen === "culture-map" && (
          <CulturalMapScreen
            onBackToCulture={() => navigateTo("culture")}
            onSelectRegion={(region) => {
              navigateTo(
                "region-culture",
                undefined,
                undefined,
                region
              );
            }}
          />
        )}

        {screen === "region-culture" && (
          <RegionCultureScreen
            region={selectedCultureRegion}
            onBack={() => navigateTo("culture-map")}
            onSelectArticle={(id) => {
              setSelectedArticleId(id);
              navigateTo("culture-detail", id);
            }}
            onGoToExperience={() => navigateTo("experience")}
            onGoToRegionalExperience={(kind) => navigateTo(kind)}
          />
        )}

        {(screen === "chau-van" || screen === "sea-prayer" || screen === "southern-culture") && (
          <RegionalExperienceScreen
            key={`${screen}-${currentUser?.email || "guest"}`}
            currentUserEmail={currentUser?.email}
            kind={screen as RegionalExperienceKind}
            onBack={() => {
              const region: CultureRegionSlug =
                screen === "chau-van"
                  ? "north"
                  : screen === "sea-prayer"
                    ? "central"
                    : "south";

              navigateTo(
                "region-culture",
                undefined,
                undefined,
                region
              );
            }}
            onGoToWish={() => navigateTo("wish")}
            onGoToMemorial={() => navigateTo("memorial")}
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
            onGoToExperience={() => navigateTo("experience")}
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
              const createdAt = Date.now();

              const newXam: SavedXinXamItem = {
                id: crypto.randomUUID(),
                drawId: result.drawId,
                stickNumber: result.stickNumber,
                fortuneType:
                  result.fortuneType ||
                  result.sealText ||
                  "Thượng Cát",
                category: result.category || result.topic,
                region: result.region,
                quote: result.quote,
                createdAt,
                date: new Date(createdAt).toLocaleDateString("vi-VN"),
                starred: false,
              };

              if (!currentUser) {
                setPendingSave({
                  type: "xam",
                  item: newXam,
                });

                navigateTo("login");
                return false;
              }

              void saveXam(result)
                .then((remoteItem) => {
                  setUserCornerData((previous) => ({
                    ...previous,
                    xam: [remoteItem, ...previous.xam.filter((item) => item.id !== remoteItem.id)],
                  }));
                })
                .catch(() => {});

              const exists = userCornerData.xam.some(
                (item) =>
                  Boolean(newXam.drawId) &&
                  item.drawId === newXam.drawId
              );

              if (exists) return true;

              const updated: UserCornerData = {
                ...userCornerData,
                xam: [
                  newXam,
                  ...userCornerData.xam,
                ],
              };

              const saved = saveUserCornerData(
                currentUser.email,
                updated
              );

              if (!saved) {
                return false;
              }

              setUserCornerData(updated);
              return true;
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
            onBackToExperience={() => navigateTo("experience")}
            onGoToDiary={() => navigateTo("account")}
            onGoToHome={() => navigateTo("today")}
            onGoToExplore={() => navigateTo("culture")}
            onSaveJournal={(text, topic) =>
              handleSavePrivateWish(text, topic)
            }
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
            onGoToCalendar={() => navigateTo("calendar")}
            onGoToPlan={() => navigateTo("good-days")}
            onGoToMap={() => navigateTo("culture-map")}
          />
        )}

        {screen === "ritual-detail" && (
          <RitualDetailScreen
            currentUserEmail={currentUser?.email}
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
            onBackToExperience={() => navigateTo("experience")}
            onGoToHome={() => navigateTo("today")}
          />
        )}

        {screen === "calendar" && (
          <CulturalCalendarScreen
            key={currentUser?.email || "guest"}
            currentUserEmail={currentUser?.email}
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
            onSaveGratitude={(text) =>
              handleSavePrivateWish(text, "Tri ân & Tưởng niệm")
            }
          />
        )}

        {screen === "forgot" && (
          <ForgotPasswordScreen
            onBackToLogin={() => navigateTo("login")}
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
            onSuccess={handleAuthenticated}
            onGoToRegister={() => navigateTo("register")}
            onGoToForgotPassword={() => navigateTo("forgot")}
            onImmersiveChange={setIsLoginImmersive}
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
            onSuccess={handleAuthenticated}
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
            signal={activeSignal}
            isActionDone={isActionDone}
            isLoggedIn={Boolean(currentUser)}
            isSaved={isCurrentSignalSaved}
            onGoToHome={() => navigateTo("today")}
            onGoToAccount={() => navigateTo("account")}
            onViewSignal={() =>
              navigateTo("result", activeSignal.id)
            }
            onSaveToAccount={handleSaveResult}
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
            onGoToSignalResult={handleOpenSavedSignal}
            onGoToXinXam={() => navigateTo("xinxam")}
            onGoToWish={() => navigateTo("wish")}
            onGoToMood={() => navigateTo("mood")}
            onGoToMoodJourney={() => navigateTo("mood-journey")}
            onGoToNotifications={() => navigateTo("notifications")}
            onGoToHome={() => navigateTo("today")}
            onGoToSettings={() => navigateTo("settings")}
          />
        )}

        {screen === "mood-journey" && (
          <MoodJourneyScreen
            savedSignals={userCornerData.signals}
            onBack={() => navigateTo("account")}
            onGoToMood={() => navigateTo("mood")}
            onGoToSignalResult={handleOpenSavedSignal}
          />
        )}

        {screen === "notifications" && (
          <NotificationScreen
            onBack={() => navigateTo("account")}
            onGoToCalendar={() => navigateTo("calendar")}
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

        {screen === "astrology" && (
          <AstrologyHubScreen
            onBackToExperience={() => navigateTo("experience")}
            onGoToHoroscope={() => navigateTo("horoscope")}
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
            themePreference={themePreference}
            onChangeTheme={handleChangeTheme}
            selectedTopics={selectedTopics}
            onChangeTopics={handleSaveTopics}
            userSettings={userSettings}
            onChangeNotifications={handleChangeNotifications}
            user={currentUser}
            onUpdateProfile={handleUpdateProfile}
            onLogout={handleLogout}
            onClearAllLocalData={() => {
              if (!currentUser) return false;

              const cornerKey = getUserCornerStorageKey(
                currentUser.email
              );

              const calendarKey = getCalendarNotesStorageKey(
                currentUser.email
              );

              const emptyData: UserCornerData = {
                signals: [],
                xam: [],
                wishes: [],
              };

              let previousCorner: string | null;
              let previousCalendar: string | null;

              try {
                previousCorner = localStorage.getItem(
                  cornerKey
                );

                previousCalendar = localStorage.getItem(
                  calendarKey
                );
              } catch {
                return false;
              }

              try {
                localStorage.setItem(
                  cornerKey,
                  JSON.stringify(emptyData)
                );

                localStorage.removeItem(calendarKey);
              } catch {
                // Cố khôi phục nếu chỉ một thao tác thành công.
                try {
                  if (previousCorner === null) {
                    localStorage.removeItem(cornerKey);
                  } else {
                    localStorage.setItem(
                      cornerKey,
                      previousCorner
                    );
                  }

                  if (previousCalendar === null) {
                    localStorage.removeItem(calendarKey);
                  } else {
                    localStorage.setItem(
                      calendarKey,
                      previousCalendar
                    );
                  }
                } catch {
                  // Bộ nhớ vẫn có thể đang chặn thao tác.
                }

                return false;
              }

              setUserCornerData(emptyData);
              setOpenedSavedSignal(null);

              return true;
            }}
          />
        )}
          </ScreenFocus>
        </Suspense>
      </div>

      {/* Universal Footer - Ẩn trên các màn Auth (login, register, forgot) */}
      {!["login", "register", "forgot"].includes(screen) && <AppFooter onNavigate={navigateTo} />}

      <SavedSignalDialog
        entry={openedSavedSignal}
        onClose={() => setOpenedSavedSignal(null)}
      />
    </div>
  );
}
