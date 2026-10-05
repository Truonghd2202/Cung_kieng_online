import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { AppHeader, NavScreen } from "./components/AppHeader";
import { AppFooter } from "./components/AppFooter";
import { ScreenFocus } from "./components/ScreenFocus";
import { SavedSignalDialog } from "./components/SavedSignalDialog";
import { useTheme } from "./hooks/useTheme";
import { useLocalDay } from "./hooks/useLocalDay";
import type { MemorialRecord } from "./screens/MemorialSpaceScreen";
import type { CultureRegionSlug } from "./screens/CulturalMapScreen";
import type { RegionalExperienceKind } from "./screens/RegionalExperienceScreen";
import { GuestScreen } from "./screens/GuestScreen";
import { TodayScreen } from "./screens/TodayScreen";
import type { WishTopic } from "./screens/WishScreen";
import type { SavedSignalItem, SavedXinXamItem, SavedWishItem } from "./screens/AccountScreen";
import type { XinXamDrawResult } from "./screens/XinXamScreen";
import {
  MoodKey,
  getSignalById,
  getDefaultSignalForMood,
  getNextSignalForMood,
  getSignalForMoodContext,
  type MoodContextKey,
} from "./data/demoSignals";
import {
  readMembershipIntent,
  writeMembershipIntent,
  clearMembershipIntent,
} from "./data/membershipIntent";

import { Trash2, Calendar, BookOpen, ArrowRight, Flower2, Sparkles } from "lucide-react";
import {
  loadCurrentDemoUser,
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
  getTraditionalXamStorageKey,
  TRADITIONAL_XAM_CHANGED_EVENT,
  saveTraditionalXam,
  type TraditionalXamSaveRequest,
} from "./data/savedTraditionalXam";
import { TRADITIONAL_XAM_COLLECTIONS } from "./data/traditionalXamData";
import { getPublishableTraditionalSticks } from "./data/traditionalXamEligibility";
import {
  readPendingTraditionalXam,
  writePendingTraditionalXam,
  clearPendingTraditionalXam,
} from "./data/pendingTraditionalXam";

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

export const getUserCornerStorageKey = (email?: string | null) => {
  const accountId = email ? email.trim().toLowerCase() : "guest";
  return `tltl-user-corner-${accountId}`;
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
  "Áp lực",
  "Cô đơn",
  "Vui vẻ",
  "Mông lung",
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

const USER_CORNER_CHANGED_EVENT = "tltl-user-corner-change";

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

    window.dispatchEvent(
      new Event(USER_CORNER_CHANGED_EVENT)
    );

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
      validSavedMoods.includes(savedMood as MoodKey)
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

type PrivateWishOrigin =
  | "wish"
  | "gratitude"
  | "ancestor-altar";

export type PendingSave =
  | { type: "signal"; item: SavedSignalItem }
  | { type: "xam"; item: SavedXinXamItem }
  | {
      type: "traditional-xam";
      item: TraditionalXamSaveRequest;
    }
  | {
      type: "wish";
      item: SavedWishItem;
      origin: PrivateWishOrigin;
    };

type ReturnedWishDraft = {
  origin: PrivateWishOrigin;
  content: string;
  category: string;
};

type WishHistorySnapshot = {
  account: string;
  draft: ReturnedWishDraft;
};

type XamHistorySnapshot = {
  account: string;
  draw: XinXamDrawResult;
};

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

interface ReflectionSnapshot {
  id: string;
  account: string;
  signalId: string;
  journal: string;
}

const getReflectionAccount = (email?: string | null) =>
  email?.trim().toLowerCase() || "guest";

export default function App() {
  const todayDateString = useLocalDay();

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
  const [resultJournalText, setResultJournalText] = useState("");

  const reflectionSnapshotsRef = useRef(
    new Map<string, ReflectionSnapshot>()
  );

  const activeReflectionIdRef = useRef<string | null>(null);

  const createReflectionSnapshot = (
    signalId: string,
    journal: string,
    email: string | null | undefined
  ): string => {
    const id = crypto.randomUUID();

    reflectionSnapshotsRef.current.set(id, {
      id,
      account: getReflectionAccount(email),
      signalId,
      journal,
    });

    activeReflectionIdRef.current = id;
    setResultJournalText(journal);

    return id;
  };
  const {
    dark,
    themePreference,
    setThemePreference,
    toggleTheme,
  } = useTheme();

  const [currentUser, setCurrentUser] = useState<UserProfile | null>(initialUser);
  const [pendingSave, setPendingSave] =
    useState<PendingSave | null>(() => {
      const path = window.location.pathname;

      const inAuthenticationFlow =
        path === "/login" ||
        path === "/register" ||
        path === "/forgot";

      if (!inAuthenticationFlow) return null;

      const request = readPendingTraditionalXam();

      return request
        ? {
            type: "traditional-xam",
            item: request,
          }
        : null;
    });
  const [returnedWishDraft, setReturnedWishDraft] =
    useState<ReturnedWishDraft | null>(null);
  const [returnedXamDraw, setReturnedXamDraw] =
    useState<XinXamDrawResult | null>(null);

  const wishHistorySnapshotsRef = useRef(
    new Map<string, WishHistorySnapshot>()
  );

  const [wishRestoreVersion, setWishRestoreVersion] = useState(0);

  const xamHistorySnapshotsRef = useRef(
    new Map<string, XamHistorySnapshot>()
  );

  const [xamRestoreVersion, setXamRestoreVersion] = useState(0);
  const [isLoginImmersive, setIsLoginImmersive] = useState(false);

  useEffect(() => {
    if (screen !== "login") {
      setIsLoginImmersive(false);
    }
  }, [screen]);

  // Lưu và đồng bộ chủ đề yêu thích theo từng tài khoản
  const [selectedTopics, setSelectedTopics] = useState<string[]>(initialSession.topics);

  // Check-in theo tài khoản
  const [isCheckedIn, setIsCheckedIn] = useState<boolean>(initialSession.checkedIn);

  useEffect(() => {
    const session = loadUserSessionState(
      currentUser,
      todayDateString
    );

    setIsCheckedIn(session.checkedIn);
  }, [todayDateString, currentUser?.email]);

  // Mood theo tài khoản
  const [selectedMood, setSelectedMood] = useState<MoodKey>(() => {
    if (initialUrlSignal) {
      return initialUrlSignal.mood;
    }
    return initialSession.mood;
  });

  const [draftMoodContext, setDraftMoodContext] =
    useState<MoodContextKey>("general");

  // Current signal theo tài khoản
  const [currentSignalId, setCurrentSignalId] = useState<string>(() => {
    if (initialUrlSignal) {
      return initialUrlSignal.id;
    }
    return initialSession.signalId;
  });

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

  useEffect(() => {
    const refresh = () => {
      setUserCornerData(
        loadUserCornerData(currentUser)
      );
    };

    const handleStorage = (event: StorageEvent) => {
      if (event.storageArea !== window.localStorage) return;

      const key = getUserCornerStorageKey(
        currentUser?.email
      );

      if (event.key === key || event.key === null) {
        refresh();
      }
    };

    refresh();

    window.addEventListener("storage", handleStorage);
    window.addEventListener(
      USER_CORNER_CHANGED_EVENT,
      refresh
    );

    return () => {
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener(
        USER_CORNER_CHANGED_EVENT,
        refresh
      );
    };
  }, [currentUser?.email]);

  const [openedSavedSignal, setOpenedSavedSignal] =
    useState<SavedSignalItem | null>(null);

  const previousScreenRef = useRef<NavScreen>(screen);

  useEffect(() => {
    const previousScreen = previousScreenRef.current;

    const startsNewCheckIn =
      screen === "mood" &&
      previousScreen !== "mood" &&
      previousScreen !== "loading";

    if (startsNewCheckIn) {
      setJournalText("");
    }

    previousScreenRef.current = screen;
  }, [screen]);

  useEffect(() => {
    if (!returnedWishDraft) return;

    // Chỉ dọn sau khi đã trở về đúng màn hình nhận bản nháp.
    if (screen === returnedWishDraft.origin) {
      setReturnedWishDraft(null);
    }
  }, [screen, returnedWishDraft]);

  useEffect(() => {
    if (screen === "xinxam" && returnedXamDraw) {
      // Màn xăm đã nhận snapshot vào state lúc mount.
      setReturnedXamDraw(null);
    }
  }, [screen, returnedXamDraw]);

  useEffect(() => {
    const inAuthenticationFlow =
      screen === "login" ||
      screen === "register" ||
      screen === "forgot";

    if (!inAuthenticationFlow) {
      clearPendingTraditionalXam();

      if (pendingSave) {
        setPendingSave(null);
      }

      return;
    }

    if (pendingSave?.type === "traditional-xam") {
      writePendingTraditionalXam(pendingSave.item);
    } else {
      clearPendingTraditionalXam();
    }
  }, [screen, pendingSave]);

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
    const currentParams = new URLSearchParams(
      window.location.search
    );

    if (
      window.location.pathname === "/result" &&
      !currentParams.get("signalId")
    ) {
      window.history.replaceState(
        {
          ...window.history.state,
          screen: "result",
          signalId: activeSignal.id,
          mood: selectedMood,
        },
        "",
        `/result?signalId=${encodeURIComponent(activeSignal.id)}`
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
        reflectionId?: string;
        articleId?: string;
        ritualId?: string;
        mood?: MoodKey;
        xamSnapshotId?: string;
        wishSnapshotId?: string;
      } | null;

      if (
        path === "wish" ||
        path === "gratitude" ||
        path === "ancestor-altar"
      ) {
        const snapshot = state?.wishSnapshotId
          ? wishHistorySnapshotsRef.current.get(state.wishSnapshotId)
          : undefined;

        const account = currentUser?.email || "guest";

        const canRestore =
          snapshot?.account === account &&
          snapshot.draft.origin === path;

        setReturnedWishDraft(
          canRestore && snapshot
            ? { ...snapshot.draft }
            : null
        );

        setWishRestoreVersion((version) => version + 1);
      }

      if (path === "xinxam") {
        const snapshot = state?.xamSnapshotId
          ? xamHistorySnapshotsRef.current.get(state.xamSnapshotId)
          : undefined;

        const account = currentUser?.email || "guest";

        setReturnedXamDraw(
          snapshot?.account === account
            ? { ...snapshot.draw }
            : null
        );

        // Khởi tạo lại state của màn xăm, kể cả khi Back/Forward
        // giữa hai mục lịch sử đều có đường dẫn /xinxam.
        setXamRestoreVersion((version) => version + 1);
      }

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

      if (path === "result") {
        const reflectionId = state?.reflectionId;

        const snapshot = reflectionId
          ? reflectionSnapshotsRef.current.get(reflectionId)
          : undefined;

        const expectedSignalId =
          params.get("signalId") || state?.signalId;

        const canRestore =
          snapshot !== undefined &&
          snapshot.account ===
            getReflectionAccount(currentUser?.email) &&
          snapshot.signalId === expectedSignalId;

        if (canRestore) {
          activeReflectionIdRef.current = snapshot.id;
          setResultJournalText(snapshot.journal);

          const signal = getSignalById(snapshot.signalId);

          if (signal) {
            setCurrentSignalId(signal.id);
            setSelectedMood(signal.mood);
          }
        } else {
          // URL chia sẻ hoặc snapshot không còn:
          // không lấy nhật ký của lượt đang đọc trước đó.
          activeReflectionIdRef.current = null;
          setResultJournalText("");
        }
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

  const recordWishHistorySnapshot = (
    origin: PrivateWishOrigin,
    content: string | null,
    category: string
  ) => {
    // Tránh ghi nhầm vào màn đăng nhập khi component vừa bị gỡ.
    if (window.location.pathname !== `/${origin}`) return;

    const previousState = window.history.state ?? {};

    const existingId =
      typeof previousState.wishSnapshotId === "string"
        ? previousState.wishSnapshotId
        : undefined;

    if (content === null || !content.trim()) {
      if (existingId) {
        wishHistorySnapshotsRef.current.delete(existingId);
      }

      const nextState = { ...previousState };
      delete nextState.wishSnapshotId;

      window.history.replaceState(
        nextState,
        "",
        window.location.href
      );

      return;
    }

    const account = currentUser?.email || "guest";

    const existingSnapshot = existingId
      ? wishHistorySnapshotsRef.current.get(existingId)
      : undefined;

    const snapshotId =
      existingId &&
      existingSnapshot?.account === account &&
      existingSnapshot.draft.origin === origin
        ? existingId
        : crypto.randomUUID();

    wishHistorySnapshotsRef.current.set(snapshotId, {
      account,
      draft: {
        origin,
        content,
        category,
      },
    });

    window.history.replaceState(
      {
        ...previousState,
        wishSnapshotId: snapshotId,
      },
      "",
      window.location.href
    );
  };

  const recordXamHistorySnapshot = (
    draw: XinXamDrawResult | null
  ) => {
    // Không cập nhật nhầm mục đăng nhập nếu màn xăm vừa bị gỡ.
    if (window.location.pathname !== "/xinxam") return;

    const previousState = window.history.state ?? {};

    if (!draw) {
      const nextState = { ...previousState };
      delete nextState.xamSnapshotId;

      window.history.replaceState(
        nextState,
        "",
        window.location.href
      );

      return;
    }

    const account = currentUser?.email || "guest";
    const existingId =
      typeof previousState.xamSnapshotId === "string"
        ? previousState.xamSnapshotId
        : undefined;

    const existingSnapshot = existingId
      ? xamHistorySnapshotsRef.current.get(existingId)
      : undefined;

    const snapshotId =
      existingId && existingSnapshot?.account === account
        ? existingId
        : crypto.randomUUID();

    xamHistorySnapshotsRef.current.set(snapshotId, {
      account,
      draw: { ...draw },
    });

    window.history.replaceState(
      {
        ...previousState,
        xamSnapshotId: snapshotId,
      },
      "",
      window.location.href
    );
  };

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
    let resolvedReflectionId: string | undefined;

    if (targetScreen === "result") {
      resolvedSignalId =
        signalIdParam || currentSignalId || activeSignal.id;

      url = `/result?signalId=${encodeURIComponent(
        resolvedSignalId
      )}`;

      const reflectionId = activeReflectionIdRef.current;

      const snapshot = reflectionId
        ? reflectionSnapshotsRef.current.get(reflectionId)
        : undefined;

      const matchesCurrentResult =
        snapshot !== undefined &&
        snapshot.signalId === resolvedSignalId &&
        snapshot.account ===
          getReflectionAccount(effectiveUser?.email);

      if (matchesCurrentResult) {
        resolvedReflectionId = snapshot.id;
        setResultJournalText(snapshot.journal);
      } else {
        activeReflectionIdRef.current = null;
        setResultJournalText("");
      }
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
      reflectionId: resolvedReflectionId,
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
    return true;
  };

  const handleSubmitMood = (
    contextKey: MoodContextKey
  ) => {
    setDraftMoodContext(contextKey);

    const resetSucceeded = handleToggleAction(false);

    if (!resetSucceeded) return;

    const nextSignal = getSignalForMoodContext(
      selectedMood,
      contextKey
    );

    createReflectionSnapshot(
      nextSignal.id,
      journalText.trim(),
      currentUser?.email
    );

    setCurrentSignalId(nextSignal.id);
    navigateTo("loading");
  };

  const handleFinishLoading = (): boolean => {
    const email = currentUser?.email;

    const writes = [
      {
        key: getAccountScopedKey("tltl-last-checkin-date", email),
        value: todayDateString,
      },
      {
        key: getAccountScopedKey("tltl-today-mood", email),
        value: selectedMood,
      },
      {
        key: getAccountScopedKey("tltl-current-signal-id", email),
        value: activeSignal.id,
      },
    ];

    const previous = new Map<string, string | null>();
    const completedKeys: string[] = [];

    // Đọc đủ trạng thái cũ trước khi bắt đầu ghi.
    try {
      for (const write of writes) {
        previous.set(
          write.key,
          localStorage.getItem(write.key),
        );
      }
    } catch {
      return false;
    }

    try {
      for (const write of writes) {
        localStorage.setItem(write.key, write.value);
        completedKeys.push(write.key);
      }
    } catch {
      // Thử khôi phục các kho đã ghi thành công.
      for (const key of completedKeys.reverse()) {
        try {
          const oldValue = previous.get(key);

          if (oldValue === null) {
            localStorage.removeItem(key);
          } else if (oldValue !== undefined) {
            localStorage.setItem(key, oldValue);
          }
        } catch {
          // Không bảo đảm khôi phục nếu bộ nhớ tiếp tục bị chặn.
        }
      }

      return false;
    }

    setIsCheckedIn(true);
    navigateTo("result", activeSignal.id);

    return true;
  };

  const handleRefreshSignal = (
    contextKey?: MoodContextKey
  ) => {
    const nextSignal =
      contextKey === undefined
        ? getNextSignalForMood(
            activeSignal.id,
            activeSignal.mood
          )
        : getSignalForMoodContext(
            activeSignal.mood,
            contextKey
          );

    if (nextSignal.id === activeSignal.id) return;

    const signalKey = getAccountScopedKey(
      "tltl-current-signal-id",
      currentUser?.email
    );

    const actionKey = getAccountScopedKey(
      "tltl-action-done-date",
      currentUser?.email
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

    if (contextKey !== undefined) {
      setDraftMoodContext(contextKey);
    }

    setIsActionDone(false);
    setSelectedMood(nextSignal.mood);
    setCurrentSignalId(nextSignal.id);

    const reflectionId = createReflectionSnapshot(
      nextSignal.id,
      resultJournalText,
      currentUser?.email
    );

    window.history.replaceState(
      {
        screen: "result",
        signalId: nextSignal.id,
        mood: nextSignal.mood,
        reflectionId,
      },
      "",
      `/result?signalId=${encodeURIComponent(nextSignal.id)}`
    );
  };

  const handleSaveResult = () => {
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
      journal: resultJournalText.trim() || undefined,
      poemLine1: activeSignal.poem.line1,
      poemLine2: activeSignal.poem.line2,
      actionTitle: activeSignal.action.title,
      starred: false,
    };

    if (!currentUser) {
      clearMembershipIntent();
      setPendingSave({
        type: "signal",
        item: newEntry,
      });

      navigateTo("login");
      return;
    }

    const saved = commitCornerData(
      (latest) => {
        const exists = latest.signals.some((entry) =>
          isSameSavedReflection(entry, newEntry)
        );

        if (exists) return latest;

        return {
          ...latest,
          signals: [
            newEntry,
            ...latest.signals,
          ],
        };
      },
      false
    );

    if (!saved) {
      window.alert(
        "Chưa lưu được lời chiêm nghiệm. Bạn hãy thử lại."
      );
    }
  };

  const handleSimulatedLogin = (
    name?: string,
    email?: string
  ): boolean => {
    const user: UserProfile = {
      name: name?.trim() || "An Nhiên",
      email: email?.trim().toLowerCase() ||
        "annhien@tinlamtamlinh.vn",
    };

    // Giữ nội dung đang chờ trước khi cập nhật state.
    const pending = pendingSave;
    const membershipIntent =
      pending === null
        ? readMembershipIntent()
        : null;

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
      if (pending && pending.type !== "traditional-xam") {
        const saved = saveUserCornerData(user.email, nextData);

        if (!saved) {
          throw new Error("Không thể lưu nội dung đang chờ.");
        }
      }

      if (pending?.type === "traditional-xam") {
        const request = pending.item;

        const collection = TRADITIONAL_XAM_COLLECTIONS.find(
          (item) => item.id === request.collectionId
        );

        if (
          collection?.editionLabel !== request.editionLabel
        ) {
          throw new Error("Bản tư liệu của thẻ đã thay đổi.");
        }

        const saved = saveTraditionalXam(
          user.email,
          request.collectionId,
          request.topic,
          request.stickId
        );

        if (!saved) {
          throw new Error("Chưa lưu được thẻ truyền thống.");
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
      return false;
    }

    clearPendingTraditionalXam();
    xamHistorySnapshotsRef.current.clear();
    wishHistorySnapshotsRef.current.clear();
    setReturnedWishDraft(null);
    setReturnedXamDraw(null);

    const userSession = loadUserSessionState(
      user,
      todayDateString
    );

    setCurrentUser(user);
    setUserCornerData(nextData);
    setSelectedTopics(userSession.topics);

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
      setJournalText("");
      createReflectionSnapshot(
        savedSignal.id,
        pending.item.journal || "",
        user.email
      );

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

      navigateTo("result", savedSignal.id, user);
      return true;
    }

    // Đăng nhập thông thường hoặc lưu xăm/lời nguyện:
    // khôi phục trạng thái riêng của tài khoản.
    setIsCheckedIn(userSession.checkedIn);
    setSelectedMood(userSession.mood);
    setIsActionDone(userSession.actionDone);
    setCurrentSignalId(userSession.signalId);
    setJournalText("");
    setResultJournalText("");
    activeReflectionIdRef.current = null;
    reflectionSnapshotsRef.current.clear();
    setPendingSave(null);

    navigateTo(
      membershipIntent ? "membership" : "account",
      undefined,
      user
    );
    return true;
  };

  const handleLogout = () => {
    clearMembershipIntent();
    clearPendingTraditionalXam();
    try {
      localStorage.removeItem("tltl-current-user");
    } catch {
      window.alert(
        "Chưa đăng xuất được vì trình duyệt đang chặn thao tác bộ nhớ. Bạn hãy thử lại."
      );
      return;
    }

    const guestSession = loadUserSessionState(
      null,
      todayDateString
    );

    setCurrentUser(null);

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
    setDraftMoodContext("general");

    setJournalText("");
    setResultJournalText("");
    activeReflectionIdRef.current = null;
    reflectionSnapshotsRef.current.clear();
    xamHistorySnapshotsRef.current.clear();
    wishHistorySnapshotsRef.current.clear();
    setReturnedWishDraft(null);
    setReturnedXamDraw(null);
    setPendingSave(null);

    // Truyền null rõ ràng để không dùng hồ sơ của lần render cũ.
    navigateTo("guest", undefined, null);
  };

  const handleUpdateProfile = (
    updated: { name: string; email?: string }
  ): boolean => {
    if (!currentUser) return false;

    const cleanName = updated.name.trim();

    if (!cleanName || cleanName.length > 80) {
      return false;
    }

    const updatedUser: UserProfile = {
      ...currentUser,
      name: cleanName,
    };

    const sessionKey = "tltl-current-user";
    let previousSession: string | null;

    try {
      previousSession = localStorage.getItem(sessionKey);

      localStorage.setItem(
        sessionKey,
        JSON.stringify(updatedUser)
      );
    } catch {
      return false;
    }

    // Dùng hàm trả boolean đã sửa ở đợt trước.
    const saved = saveLocalDemoAccount(updatedUser);

    if (!saved) {
      // Khôi phục hồ sơ phiên trước nếu lưu danh sách thất bại.
      try {
        if (previousSession === null) {
          localStorage.removeItem(sessionKey);
        } else {
          localStorage.setItem(sessionKey, previousSession);
        }
      } catch {
        // Không báo thành công nếu khôi phục cũng thất bại.
      }

      return false;
    }

    setCurrentUser(updatedUser);
    return true;
  };

  const handleSaveTopics = (topics: string[]): boolean => {
    const nextTopics = sanitizeCulturalTopics(topics);

    try {
      localStorage.setItem(
        getAccountScopedKey(
          "tltl-selected-topics",
          currentUser?.email
        ),
        JSON.stringify(nextTopics)
      );
    } catch {
      return false;
    }

    setSelectedTopics(nextTopics);
    return true;
  };

  const commitCornerData = (
    update: (latest: UserCornerData) => UserCornerData,
    showErrorAlert = true
  ): boolean => {
    if (!currentUser) return false;

    try {
      const latest = loadUserCornerData(currentUser);
      const updated = update(latest);

      const saved = saveUserCornerData(
        currentUser.email,
        updated
      );

      if (!saved) {
        throw new Error("Không lưu được dữ liệu.");
      }

      setUserCornerData(updated);
      return true;
    } catch {
      if (showErrorAlert) {
        window.alert(
          "Chưa lưu được thay đổi. Nội dung vẫn được giữ; bạn hãy thử lại."
        );
      }

      return false;
    }
  };

  const handleDeleteSignal = (id: string): boolean => {
    const saved = commitCornerData(
      (latest) => ({
        ...latest,
        signals: latest.signals.filter(
          (item) => item.id !== id
        ),
      }),
      false
    );

    if (saved && openedSavedSignal?.id === id) {
      setOpenedSavedSignal(null);
    }

    return saved;
  };

  const handleDeleteXam = (id: string): boolean =>
    commitCornerData(
      (latest) => ({
        ...latest,
        xam: latest.xam.filter(
          (item) => item.id !== id
        ),
      }),
      false
    );

  const handleDeleteWish = (id: string): boolean =>
    commitCornerData(
      (latest) => ({
        ...latest,
        wishes: latest.wishes.filter(
          (item) => item.id !== id
        ),
      }),
      false
    );

  const handleToggleStarSignal = (id: string) => {
    commitCornerData((latest) => ({
      ...latest,
      signals: latest.signals.map((item) =>
        item.id === id
          ? { ...item, starred: !item.starred }
          : item
      ),
    }));
  };

  const handleToggleStarXam = (id: string) => {
    commitCornerData((latest) => ({
      ...latest,
      xam: latest.xam.map((item) =>
        item.id === id
          ? { ...item, starred: !item.starred }
          : item
      ),
    }));
  };

  const handleToggleStarWish = (id: string) => {
    commitCornerData((latest) => ({
      ...latest,
      wishes: latest.wishes.map((item) =>
        item.id === id
          ? { ...item, starred: !item.starred }
          : item
      ),
    }));
  };

  const handleSavePrivateWish = (
    content: string,
    category: string,
    origin: PrivateWishOrigin
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
      recordWishHistorySnapshot(
        origin,
        content,
        category
      );

      setReturnedWishDraft({
        origin,
        content: cleanContent,
        category,
      });

      clearMembershipIntent();
      setPendingSave({
        type: "wish",
        item: newWish,
        origin,
      });

      navigateTo("login");
      return false;
    }

    return commitCornerData(
      (latest) => ({
        ...latest,
        wishes: [
          newWish,
          ...latest.wishes,
        ],
      }),
      false
    );
  };


  const handleSaveDayToCalendar = (dayData: {
    title: string;
    day: number;
    month: number;
    year: number;
  }): boolean => {
    const title = dayData.title.trim();

    if (
      !title ||
      title.length > 120 ||
      !Number.isInteger(dayData.year) ||
      !Number.isInteger(dayData.month) ||
      !Number.isInteger(dayData.day) ||
      dayData.year < 1900 ||
      dayData.year > 2100
    ) {
      return false;
    }

    const selectedDate = new Date(
      dayData.year,
      dayData.month - 1,
      dayData.day,
    );

    if (
      selectedDate.getFullYear() !== dayData.year ||
      selectedDate.getMonth() !== dayData.month - 1 ||
      selectedDate.getDate() !== dayData.day
    ) {
      return false;
    }

    try {
      const currentList = loadCalendarPersonalNotes(
        currentUser?.email
      );

      const exists = currentList.some(
        (note) =>
          note.title === title &&
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
        title,
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

      return saveCalendarPersonalNotes(
        currentUser?.email,
        [newNote, ...currentList]
      );
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
          journal: resultJournalText,
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
          onToggleDark={toggleTheme}
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
            currentUserEmail={currentUser?.email}
            onGoToReminders={() => navigateTo("notifications")}
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
            onGoToXinXam={() => navigateTo("xinxam")}
            onGoToRituals={() => navigateTo("rituals")}
            onGoToGratitude={() => navigateTo("gratitude")}
            onGoToCultureMap={() => navigateTo("culture-map")}
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
            contextKey={draftMoodContext}
            onChangeContext={setDraftMoodContext}
          />
        )}

        {screen === "loading" && (
          <SignalLoadingScreen
            signal={activeSignal}
            onFinishLoading={handleFinishLoading}
            onCancel={() => navigateTo("mood")}
          />
        )}

        {screen === "result" && (
          <SignalResultScreen
            journalText={resultJournalText}
            mood={selectedMood}
            signal={activeSignal}
            isActionDone={isActionDone}
            onToggleAction={handleToggleAction}
            onGoToCompletion={() => navigateTo("saved")}
            onSaveToAccount={handleSaveResult}
            onRefreshSignal={() => handleRefreshSignal()}
            onChangeContext={(contextKey) => {
              handleRefreshSignal(contextKey);
            }}
            onOpenCultureArticle={(articleId) => {
              setSelectedArticleId(articleId);
              navigateTo("culture-detail", articleId);
            }}
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
            key={currentUser?.email || "guest"}
            currentUserEmail={currentUser?.email}
            onGoToLogin={() => navigateTo("login")}
            memorial={memorial}
            onBackToExperience={() => navigateTo("experience")}
            onGoToAltar={() => navigateTo("ancestor-altar")}
            onGoToMemorial={() => navigateTo("memorial")}
            onGoToZen={() => navigateTo("zen")}
          />
        )}

        {screen === "ancestor-altar" && (
          <AncestorAltarScreen
            key={`ancestor-altar-${wishRestoreVersion}`}
            onDraftChange={(content) =>
              recordWishHistorySnapshot(
                "ancestor-altar",
                content,
                "Tri ân & Tưởng niệm"
              )
            }
            memorial={memorial}
            onBack={() => navigateTo("sanctuary")}
            onGoToMemorial={() => navigateTo("memorial")}
            onGoToReminders={() => navigateTo("notifications")}
            isLoggedIn={Boolean(currentUser)}
            onSaveTribute={(text) =>
              handleSavePrivateWish(
                text,
                "Tri ân gia tiên",
                "ancestor-altar"
              )
            }
            initialContent={
              returnedWishDraft?.origin === "ancestor-altar"
                ? returnedWishDraft.content
                : ""
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
            onGoToReminders={() => navigateTo("notifications")}
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
            currentUserEmail={currentUser?.email}
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
            key={`xam-${xamRestoreVersion}`}
            initialDraw={returnedXamDraw}
            onSnapshotChange={recordXamHistorySnapshot}
            onBackToExperienceHome={() => navigateTo("experience")}
            onGoToArticle={(articleId) => {
              setSelectedArticleId(articleId);
              navigateTo("culture-detail", articleId);
            }}
            onSaveToAccount={(result) => {
              recordXamHistorySnapshot(result);

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
                setReturnedXamDraw({ ...result });

                clearMembershipIntent();
                setPendingSave({
                  type: "xam",
                  item: newXam,
                });

                navigateTo("login");
                return false;
              }

              return commitCornerData(
                (latest) => {
                  const exists = latest.xam.some(
                    (item) =>
                      Boolean(newXam.drawId) &&
                      item.drawId === newXam.drawId
                  );

                  if (exists) return latest;

                  return {
                    ...latest,
                    xam: [
                      newXam,
                      ...latest.xam,
                    ],
                  };
                },
                false
              );
            }}
            onGoToLogin={() => navigateTo("login")}
            onGoToExplore={() => navigateTo("culture")}
            onGoToWish={() => navigateTo("wish")}
            isLoggedIn={!!currentUser}
            savedXamList={userCornerData.xam}
            currentUserEmail={currentUser?.email}
            onRequestTraditionalSave={(request) => {
              const collection = TRADITIONAL_XAM_COLLECTIONS.find(
                (item) => item.id === request.collectionId
              );

              const eligible = getPublishableTraditionalSticks(
                request.collectionId,
                request.topic
              ).some((item) => item.id === request.stickId);

              if (
                !eligible ||
                collection?.editionLabel !== request.editionLabel
              ) {
                window.alert(
                  "Thẻ hiện chưa đủ điều kiện lưu. Bạn hãy kiểm tra lại nội dung."
                );
                return;
              }

              const persisted = writePendingTraditionalXam(request);

              if (!persisted) {
                window.alert(
                  "Trình duyệt chưa giữ được yêu cầu khi tải lại trang. " +
                  "Bạn vẫn có thể đăng nhập và lưu trong phiên hiện tại."
                );
              }

              clearMembershipIntent();
              setPendingSave({
                type: "traditional-xam",
                item: { ...request },
              });

              navigateTo("login");
            }}
          />
        )}

        {screen === "wish" && (
          <WishScreen
            key={`wish-${wishRestoreVersion}`}
            onDraftChange={(content, category) =>
              recordWishHistorySnapshot("wish", content, category)
            }
            onBackToExperience={() => navigateTo("experience")}
            onGoToDiary={() => navigateTo("account")}
            onGoToHome={() => navigateTo("today")}
            onGoToExplore={() => navigateTo("culture")}
            onSaveJournal={(text, topic) =>
              handleSavePrivateWish(text, topic, "wish")
            }
            isLoggedIn={!!currentUser}
            initialContent={
              returnedWishDraft?.origin === "wish"
                ? returnedWishDraft.content
                : ""
            }
            initialCategory={
              returnedWishDraft?.origin === "wish"
                ? returnedWishDraft.category
                : "Bình an"
            }
          />
        )}

        {screen === "rituals" && (
          <RitualGuideScreen
            currentUserEmail={currentUser?.email}
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
            onGoToHome={() => navigateTo("today")}
          />
        )}

        {screen === "gratitude" && (
          <GratitudeScreen
            key={`gratitude-${wishRestoreVersion}`}
            onDraftChange={(content) =>
              recordWishHistorySnapshot(
                "gratitude",
                content,
                "Tri ân & Tưởng niệm"
              )
            }
            onBackToExperience={() => navigateTo("experience")}
            onBackToHome={() => navigateTo("today")}
            onGoToCulture={() => navigateTo("culture")}
            user={currentUser}
            onSaveGratitude={(text) =>
              handleSavePrivateWish(
                text,
                "Tri ân & Tưởng niệm",
                "gratitude"
              )
            }
            initialContent={
              returnedWishDraft?.origin === "gratitude"
                ? returnedWishDraft.content
                : ""
            }
            initialSaveMode={
              returnedWishDraft?.origin === "gratitude"
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
              const pending = pendingSave;

              clearPendingTraditionalXam();
              // Hủy yêu cầu tự lưu khi đăng nhập.
              setPendingSave(null);

              if (pending?.type === "signal") {
                navigateTo("result", pending.item.signalId);
                return;
              }

              if (pending?.type === "xam") {
                navigateTo("xinxam");
                return;
              }

              if (pending?.type === "traditional-xam") {
                const request = pending.item;

                navigateTo("xinxam");

                window.history.replaceState(
                  {
                    ...window.history.state,
                    traditionalXam: {
                      entryId: crypto.randomUUID(),
                      account: "guest",
                      collectionId: request.collectionId,
                      topic: request.topic,
                      stickId: request.stickId,
                    },
                  },
                  "",
                  window.location.href
                );

                return;
              }

              if (pending?.type === "wish") {
                setReturnedWishDraft({
                  origin: pending.origin,
                  content: pending.item.content,
                  category: pending.item.category,
                });

                navigateTo(pending.origin);
                return;
              }

              if (readMembershipIntent()) {
                navigateTo("membership");
                return;
              }

              navigateTo("guest");
            }}
            onSuccess={handleSimulatedLogin}
            onGoToRegister={() => navigateTo("register")}
            onGoToForgotPassword={() => navigateTo("forgot")}
            onImmersiveChange={setIsLoginImmersive}
            pendingSignalMood={
              pendingSave?.type === "signal"
                ? `Tín hiệu "${pendingSave.item.mood}"`
                : pendingSave?.type === "xam"
                ? `Thẻ xăm số ${pendingSave.item.stickNumber} (${pendingSave.item.fortuneType})`
                : pendingSave?.type === "traditional-xam"
                ? `Thẻ xăm truyền thống — ${
                    pendingSave.item.collectionId === "quan-am"
                      ? "Quan Âm"
                      : "Quan Thánh"
                  }`
                : pendingSave?.type === "wish"
                ? `Điều ước ${pendingSave.item.category}`
                : undefined
            }
          />
        )}

        {screen === "register" && (
          <RegisterScreen
            onBack={() => navigateTo("login")}
            onSuccess={() => {
              // Đăng ký thành công -> tự chuyển qua trang Đăng nhập (không cắm nhang)
              navigateTo("login");
            }}
            onGoToLogin={() => navigateTo("login")}
            pendingSignalMood={
              pendingSave?.type === "signal"
                ? `Tín hiệu "${pendingSave.item.mood}"`
                : pendingSave?.type === "xam"
                ? `Thẻ xăm số ${pendingSave.item.stickNumber} (${pendingSave.item.fortuneType})`
                : pendingSave?.type === "traditional-xam"
                ? `Thẻ xăm truyền thống — ${
                    pendingSave.item.collectionId === "quan-am"
                      ? "Quan Âm"
                      : "Quan Thánh"
                  }`
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
            key={currentUser?.email || "guest"}
            currentUserEmail={currentUser?.email}
            onBack={() =>
              navigateTo(currentUser ? "account" : "experience")
            }
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
            currentUserEmail={currentUser?.email}
            onGoToLogin={(term) => {
              const saved = writeMembershipIntent(term);

              if (!saved) {
                window.alert(
                  "Chưa giữ được lựa chọn hội viên. Bạn hãy thử lại."
                );
                return;
              }

              // Hai yêu cầu đăng nhập không được dùng chung.
              clearPendingTraditionalXam();
              setPendingSave(null);

              navigateTo("login");
            }}
          />
        )}

        {screen === "settings" && (
          <SettingsScreen
            onBackToAccount={() => navigateTo("account")}
            onGoToHome={() => navigateTo("today")}
            onGoToReminders={() => navigateTo("notifications")}
            themePreference={themePreference}
            onChangeTheme={setThemePreference}
            selectedTopics={selectedTopics}
            onChangeTopics={handleSaveTopics}
            user={currentUser}
            onUpdateProfile={handleUpdateProfile}
            onLogout={handleLogout}
            onClearAllLocalData={() => {
              if (!currentUser) return false;

              const emptyData: UserCornerData = {
                signals: [],
                xam: [],
                wishes: [],
              };

              const accountId = currentUser.email.trim().toLowerCase();

              const writes = [
                {
                  key: getUserCornerStorageKey(currentUser.email),
                  value: JSON.stringify(emptyData),
                },
                {
                  key: getCalendarNotesStorageKey(currentUser.email),
                  value: "[]",
                },
                {
                  key: getTraditionalXamStorageKey(currentUser.email),
                  value: "[]",
                },
                {
                  key: `tltl-membership-demo-${accountId}`,
                  value: "null",
                },
                {
                  key: `tltl-digital-items-${accountId}`,
                  value: JSON.stringify({
                    owned: [],
                    decoration: null,
                  }),
                },
                {
                  key: `tltl-ritual-drafts-${accountId}`,
                  value: "[]",
                },
                ...[
                  "chau-van",
                  "sea-prayer",
                  "southern-culture",
                ].map((kind) => ({
                  key: `tltl-regional-note-${accountId}-${kind}`,
                  value: "",
                })),
              ];

              const regionalSessionKeys = [
                "chau-van",
                "sea-prayer",
                "southern-culture",
              ].map(
                (kind) =>
                  `tltl-regional-note-${accountId}-${kind}`
              );
              const previous = new Map<string, string | null>();
              const previousSession = new Map<string, string | null>();
              const completedKeys: string[] = [];
              const completedSessionKeys: string[] = [];

              const notifyStores = () => {
                window.dispatchEvent(
                  new Event(USER_CORNER_CHANGED_EVENT),
                );

                window.dispatchEvent(
                  new Event("tltl-reminders-change"),
                );

                window.dispatchEvent(
                  new Event(TRADITIONAL_XAM_CHANGED_EVENT),
                );

                window.dispatchEvent(
                  new Event("tltl-digital-items-change"),
                );
              };

              // Đọc đủ bản cũ trước khi bắt đầu thay đổi dữ liệu.
              try {
                for (const write of writes) {
                  previous.set(
                    write.key,
                    localStorage.getItem(write.key)
                  );
                }

                for (const key of regionalSessionKeys) {
                  previousSession.set(
                    key,
                    sessionStorage.getItem(key)
                  );
                }
              } catch {
                return false;
              }

              try {
                for (const write of writes) {
                  localStorage.setItem(write.key, write.value);
                  completedKeys.push(write.key);
                }

                for (const key of regionalSessionKeys) {
                  sessionStorage.removeItem(key);
                  completedSessionKeys.push(key);
                }
              } catch {
                // Khôi phục các ghi chú phiên đã xóa thành công.
                for (const key of completedSessionKeys.reverse()) {
                  try {
                    const oldValue = previousSession.get(key);

                    if (oldValue === null) {
                      sessionStorage.removeItem(key);
                    } else if (oldValue !== undefined) {
                      sessionStorage.setItem(key, oldValue);
                    }
                  } catch {
                    // Trình duyệt có thể tiếp tục chặn sessionStorage.
                  }
                }

                // Khôi phục các kho đã ghi thành công.
                // Thử từng kho riêng để một lỗi không chặn các kho còn lại.
                for (const key of completedKeys.reverse()) {
                  try {
                    const oldValue = previous.get(key);

                    if (oldValue === null) {
                      localStorage.removeItem(key);
                    } else if (oldValue !== undefined) {
                      localStorage.setItem(key, oldValue);
                    }
                  } catch {
                    // Không thể bảo đảm khôi phục nếu trình duyệt
                    // tiếp tục chặn thao tác lưu trữ.
                  }
                }

                notifyStores();

                setUserCornerData(
                  loadUserCornerData(currentUser)
                );
                setOpenedSavedSignal(null);

                // Cài đặt hiển thị lỗi, không báo xóa thành công.
                return false;
              }

              notifyStores();

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
