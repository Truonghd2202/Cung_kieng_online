import React, {
  useMemo,
  useState,
  useSyncExternalStore,
} from "react";
import {
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon,
  Sparkles,
  Flower2,
  BookOpen,
  ArrowRight,
  Plus,
  Info,
  CheckCircle2,
  Heart,
  Clock,
  MapPin,
  ExternalLink,
  Trash2,
  Bookmark,
  Sun,
  Compass,
} from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Badge } from "@/src/components/ui/badge";
import { Card } from "@/src/components/ui/card";
import { AppDialog } from "../components/AppDialog";
import { useLocalDay } from "../hooks/useLocalDay";
import {
  CalendarEventType,
  CalendarEventItem,
  SAMPLE_CALENDAR_EVENTS,
  getReliableLunarDate,
  getCanChiYear,
  loadCalendarPersonalNotes,
  saveCalendarPersonalNotes,
  readCalendarNotesRaw,
  parseCalendarPersonalNotes,
  CALENDAR_NOTES_CHANGED_EVENT,
} from "../data/calendarData";
import {
  getCanChiDay,
  getCanChiMonth,
  getTrucForDay,
  getAuspiciousHoursForDay,
  getDailyZenAdvice,
} from "../data/goodDayLookup";

interface CulturalCalendarScreenProps {
  onGoToToday?: () => void;
  onGoToHome?: () => void;
  onSelectEvent: (eventId: string) => void;
  onGoToRituals?: () => void;
  onGoToCulture?: () => void;
  onGoToGoodDays?: () => void;
  currentUserEmail?: string;
}

const subscribeToCalendarNotes = (
  onStoreChange: () => void
) => {
  const handleStorage = (event: StorageEvent) => {
    if (
      event.storageArea === window.localStorage ||
      event.storageArea === null
    ) {
      onStoreChange();
    }
  };

  window.addEventListener("storage", handleStorage);
  window.addEventListener(
    CALENDAR_NOTES_CHANGED_EVENT,
    onStoreChange
  );

  return () => {
    window.removeEventListener("storage", handleStorage);
    window.removeEventListener(
      CALENDAR_NOTES_CHANGED_EVENT,
      onStoreChange
    );
  };
};

const useCalendarPersonalNotes = (email?: string) => {
  const raw = useSyncExternalStore(
    subscribeToCalendarNotes,
    () => readCalendarNotesRaw(email) ?? "[]",
    () => "[]"
  );

  return useMemo(
    () => parseCalendarPersonalNotes(raw),
    [raw]
  );
};

// Tên các thứ trong tuần
const DAYS_OF_WEEK = [
  "Thứ Hai",
  "Thứ Ba",
  "Thứ Tư",
  "Thứ Năm",
  "Thứ Sáu",
  "Thứ Bảy",
  "Chủ Nhật",
];

// Tên thi vị dân gian cho 12 tháng âm lịch
const LUNAR_MONTH_NAMES: Record<number, string> = {
  1: "Tháng Giêng (Xuân Sơ)",
  2: "Tháng Hai (Như Nguyệt)",
  3: "Tháng Ba (Đào Nguyệt)",
  4: "Tháng Tư (Mai Nguyệt)",
  5: "Tháng Năm (Hạ Trọng)",
  6: "Tháng Sáu (Liên Nguyệt)",
  7: "Tháng Bảy (Lan Nguyệt)",
  8: "Tháng Tám (Quế Nguyệt)",
  9: "Tháng Chín (Cúc Nguyệt)",
  10: "Tháng Mười (Dương Nguyệt)",
  11: "Tháng Một (Hà Nguyệt)",
  12: "Tháng Chạp (Tịch Nguyệt)",
};

export const CulturalCalendarScreen: React.FC<CulturalCalendarScreenProps> = ({
  onGoToToday,
  onGoToHome,
  onSelectEvent,
  onGoToRituals,
  onGoToCulture,
  onGoToGoodDays,
  currentUserEmail,
}) => {
  // Lấy thời gian thực tế từ hệ thống (Date)
  const localDay = useLocalDay();

  const today = useMemo(
    () => new Date(),
    [localDay]
  );
  const todayRealDay = today.getDate();
  const todayRealMonth = today.getMonth() + 1;
  const todayRealYear = today.getFullYear();

  // Khởi tạo trạng thái lịch động theo Date hiện tại
  const [selectedYear, setSelectedYear] = useState<number>(todayRealYear);
  const [selectedMonth, setSelectedMonth] = useState<number>(todayRealMonth);
  const [selectedDay, setSelectedDay] = useState<number>(todayRealDay);

  const isSampleMonth =
    selectedYear === 2024 && selectedMonth === 10;

  const [activeFilter, setActiveFilter] = useState<"all" | "custom" | "festival" | "personal">("all");
  const [showAddModal, setShowAddModal] = useState(false);
  const [newNoteTitle, setNewNoteTitle] = useState("");
  const [newNoteDesc, setNewNoteDesc] = useState("");
  const [noteSaveError, setNoteSaveError] = useState("");
  const [noteDeleteError, setNoteDeleteError] = useState("");

  const personalNotes = useCalendarPersonalNotes(currentUserEmail);

  // Tổng hợp sự kiện: sự kiện lịch sử văn hóa đã kiểm chứng + ngày cá nhân người dùng thực sự lưu
  const allEvents = useMemo(() => {
    return [...SAMPLE_CALENDAR_EVENTS, ...personalNotes];
  }, [personalNotes]);

  const eventsInSelectedMonth = allEvents.filter(
    (event) =>
      event.year === selectedYear &&
      event.month === selectedMonth
  );

  const customCount = eventsInSelectedMonth.filter(
    (event) => event.type === "custom"
  ).length;

  const festivalCount = eventsInSelectedMonth.filter(
    (event) => event.type === "festival"
  ).length;

  const personalCount = personalNotes.filter(
    (event) =>
      event.year === selectedYear &&
      event.month === selectedMonth
  ).length;

  const handlePrevMonth = () => {
    if (selectedMonth === 1) {
      setSelectedMonth(12);
      setSelectedYear((prev) => prev - 1);
    } else {
      setSelectedMonth((prev) => prev - 1);
    }
    // Đảm bảo selectedDay không vượt quá số ngày của tháng mới
    setSelectedDay((prev) => {
      const prevM = selectedMonth === 1 ? 12 : selectedMonth - 1;
      const prevY = selectedMonth === 1 ? selectedYear - 1 : selectedYear;
      const maxDays = new Date(prevY, prevM, 0).getDate();
      return Math.min(prev, maxDays);
    });
  };

  const handleNextMonth = () => {
    if (selectedMonth === 12) {
      setSelectedMonth(1);
      setSelectedYear((prev) => prev + 1);
    } else {
      setSelectedMonth((prev) => prev + 1);
    }
    setSelectedDay((prev) => {
      const nextM = selectedMonth === 12 ? 1 : selectedMonth + 1;
      const nextY = selectedMonth === 12 ? selectedYear + 1 : selectedYear;
      const maxDays = new Date(nextY, nextM, 0).getDate();
      return Math.min(prev, maxDays);
    });
  };

  // Nút trở về ngày hôm nay theo Date thực tế
  const handleResetToday = () => {
    const now = new Date();
    setSelectedYear(now.getFullYear());
    setSelectedMonth(now.getMonth() + 1);
    setSelectedDay(now.getDate());
  };

  // Chuyển nhanh đến tháng 10/2024 có bộ tư liệu mẫu đã kiểm chứng
  const handleViewVerifiedOct2024 = () => {
    setSelectedYear(2024);
    setSelectedMonth(10);
    setSelectedDay(17);
  };

  const handleAddPersonalNote = (event: React.FormEvent) => {
    event.preventDefault();
    setNoteSaveError("");

    const cleanTitle = newNoteTitle.trim();

    if (!cleanTitle) {
      setNoteSaveError(
        "Bạn hãy nhập tên ngày hoặc việc muốn ghi nhớ."
      );
      return;
    }

    const lunarInfo = getReliableLunarDate(
      selectedDay,
      selectedMonth,
      selectedYear
    );

    const lunarDate = lunarInfo
      ? `Ngày ${lunarInfo.lunarDay}/${lunarInfo.lunarMonth} Âm lịch (${lunarInfo.canChiYear})`
      : "Dấu mốc tự lưu";

    const newNote: CalendarEventItem = {
      id: crypto.randomUUID(),
      day: selectedDay,
      month: selectedMonth,
      year: selectedYear,
      type: "personal",
      typeLabel: "Nếp nhà tôi lưu",
      region: "Gia đình",
      title: cleanTitle,
      shortDesc:
        newNoteDesc.trim() ||
        "Dấu mốc nếp nhà bạn ghi nhớ cho riêng mình.",
      lunarDate,
    };

    const latestNotes = loadCalendarPersonalNotes(currentUserEmail);
    const updatedNotes = [newNote, ...latestNotes];

    const saved = saveCalendarPersonalNotes(
      currentUserEmail,
      updatedNotes
    );

    if (!saved) {
      setNoteSaveError(
        "Chưa lưu được ghi chú trên trình duyệt này. Nội dung bạn nhập vẫn được giữ; hãy thử lại."
      );
      return;
    }

    setNewNoteTitle("");
    setNewNoteDesc("");
    setNoteSaveError("");
    setShowAddModal(false);
  };

  const handleDeleteNote = (noteId: string) => {
    setNoteDeleteError("");

    const latestNotes = loadCalendarPersonalNotes(currentUserEmail);
    const noteExists = latestNotes.some((note) => note.id === noteId);

    if (!noteExists) return;

    const updatedNotes = latestNotes.filter((note) => note.id !== noteId);

    const saved = saveCalendarPersonalNotes(
      currentUserEmail,
      updatedNotes
    );

    if (!saved) {
      setNoteDeleteError(
        "Chưa xóa được ghi chú. Nội dung vẫn được giữ nguyên; hãy thử lại."
      );
    }
  };

  // Các sự kiện hiển thị cho ngày được chọn (hoặc toàn bộ danh sách khi chọn tab "Ngày tôi lưu")
  const selectedDayEvents = useMemo(() => {
    return (
      activeFilter === "personal"
        ? personalNotes.filter((e) => e.month === selectedMonth && e.year === selectedYear)
        : allEvents.filter(
            (e) => e.day === selectedDay && e.month === selectedMonth && e.year === selectedYear
          )
    ).filter((e) => (activeFilter === "all" ? true : e.type === activeFilter));
  }, [activeFilter, personalNotes, allEvents, selectedDay, selectedMonth, selectedYear]);

  // Sinh lưới ngày ĐỘNG theo tháng và năm đang chọn (Thứ Hai -> Chủ Nhật)
  const calendarGridDays = useMemo(() => {
    const daysInCurrentMonth = new Date(selectedYear, selectedMonth, 0).getDate();
    const prevMonth = selectedMonth === 1 ? 12 : selectedMonth - 1;
    const prevYear = selectedMonth === 1 ? selectedYear - 1 : selectedYear;
    const daysInPrevMonth = new Date(prevYear, prevMonth, 0).getDate();

    // Ngày đầu tiên của tháng: JS getDay() trả về 0 (CN), 1 (T2), ..., 6 (T7)
    // Hệ thống lịch Việt Nam bắt đầu bằng Thứ Hai:
    const firstDayOfWeek = new Date(selectedYear, selectedMonth - 1, 1).getDay();
    const startOffset = (firstDayOfWeek + 6) % 7;

    const grid = [];

    // Các ngày thuộc tháng trước (mờ)
    for (let i = startOffset - 1; i >= 0; i--) {
      const day = daysInPrevMonth - i;
      const lunar = getReliableLunarDate(day, prevMonth, prevYear);
      grid.push({
        day,
        month: prevMonth,
        year: prevYear,
        isCurrentMonth: false,
        lunarText: lunar ? `${lunar.lunarDay}/${lunar.lunarMonth}` : undefined,
        hasDot: false,
        hasPersonalNote: false,
        badge: undefined as string | undefined,
        isSpecial: false,
        subText: undefined as string | undefined,
        type: undefined as CalendarEventType | undefined,
      });
    }

    // Các ngày thuộc tháng hiện tại
    for (let day = 1; day <= daysInCurrentMonth; day++) {
      const lunar = getReliableLunarDate(day, selectedMonth, selectedYear);
      // Tìm sự kiện kiểm chứng hoặc ghi chú khớp ĐÚNG ngày, tháng và năm
      const dayEvents = allEvents.filter(
        (e) => e.day === day && e.month === selectedMonth && e.year === selectedYear
      );
      const hasPersonal = personalNotes.some(
        (n) => n.day === day && n.month === selectedMonth && n.year === selectedYear
      );
      const mainEvent = dayEvents[0];

      let badge: string | undefined = mainEvent?.badge || mainEvent?.title;
      let type: CalendarEventType | undefined = mainEvent?.type;
      let isSpecial = false;
      let subText: string | undefined = lunar?.solarTerm;

      // Nếu ngày đó không có sự kiện văn hóa riêng nhưng là Rằm hoặc Mùng 1:
      if (!badge && lunar) {
        if (lunar.specialBadge) {
          badge = lunar.specialBadge;
          isSpecial = true;
          type = "festival";
        } else if (lunar.isFullMoon) {
          badge = `Rằm ${lunar.lunarMonth}`;
          isSpecial = true;
          type = "custom";
        } else if (lunar.isFirstDay) {
          badge = `Mùng 1/${lunar.lunarMonth}`;
          type = "custom";
        }
      }

      grid.push({
        day,
        month: selectedMonth,
        year: selectedYear,
        isCurrentMonth: true,
        lunarText: lunar ? `${lunar.lunarDay}/${lunar.lunarMonth}` : undefined,
        subText,
        badge,
        isSpecial,
        hasDot: dayEvents.length > 0,
        hasPersonalNote: hasPersonal,
        type,
      });
    }

    // Các ngày thuộc tháng sau để hoàn thiện bảng (35 hoặc 42 ô)
    const nextMonth = selectedMonth === 12 ? 1 : selectedMonth + 1;
    const nextYear = selectedMonth === 12 ? selectedYear + 1 : selectedYear;
    const totalCells = Math.ceil(grid.length / 7) * 7;
    const remaining = totalCells - grid.length;
    for (let day = 1; day <= remaining; day++) {
      const lunar = getReliableLunarDate(day, nextMonth, nextYear);
      grid.push({
        day,
        month: nextMonth,
        year: nextYear,
        isCurrentMonth: false,
        lunarText: lunar ? `${lunar.lunarDay}/${lunar.lunarMonth}` : undefined,
        hasDot: false,
        hasPersonalNote: false,
        badge: undefined,
        isSpecial: false,
        subText: undefined,
        type: undefined,
      });
    }

    return grid;
  }, [selectedYear, selectedMonth, allEvents, personalNotes]);

  // Thông tin ngày đang được chọn cho widget Tờ Lịch Khởi Tâm
  const selectedDateObj = useMemo(() => {
    return new Date(selectedYear, selectedMonth - 1, selectedDay);
  }, [selectedYear, selectedMonth, selectedDay]);

  const selectedDayOfWeekIndex = (selectedDateObj.getDay() + 6) % 7;
  const selectedDayOfWeekName = DAYS_OF_WEEK[selectedDayOfWeekIndex];

  // Thông tin âm lịch của ngày đang được chọn
  const currentSelectedLunar = useMemo(() => {
    return getReliableLunarDate(selectedDay, selectedMonth, selectedYear);
  }, [selectedDay, selectedMonth, selectedYear]);

  // Thông tin Can Chi ngày, Can Chi tháng, Trực, Giờ hoàng đạo và Lời khuyên
  const almanacData = useMemo(() => {
    const canChiDay = getCanChiDay(selectedDateObj);
    const truc = getTrucForDay(selectedDateObj);
    const hours = getAuspiciousHoursForDay(canChiDay.chi);
    const lunarM = currentSelectedLunar?.lunarMonth ?? selectedMonth;
    const lunarY = currentSelectedLunar?.lunarYear ?? selectedYear;
    const canChiMonth = getCanChiMonth(lunarM, lunarY);
    const zenAdvice = getDailyZenAdvice(currentSelectedLunar?.lunarDay ?? selectedDay, truc);

    return {
      canChiDayName: canChiDay.name,
      canChiDayCan: canChiDay.can,
      canChiDayChi: canChiDay.chi,
      canChiMonth,
      truc,
      hours,
      zenAdvice,
    };
  }, [selectedDateObj, currentSelectedLunar, selectedMonth, selectedYear, selectedDay]);

  // Âm lịch tiêu đề tháng
  const monthHeaderLunar = useMemo(() => {
    return getReliableLunarDate(15, selectedMonth, selectedYear);
  }, [selectedMonth, selectedYear]);

  const monthPoeticTitle = monthHeaderLunar
    ? LUNAR_MONTH_NAMES[monthHeaderLunar.lunarMonth] || `Tháng ${monthHeaderLunar.lunarMonth} Âm lịch`
    : `Tháng ${selectedMonth}`;

  return (
    <div className="screen-shell">
      <main className="page-container max-w-7xl">
        {noteDeleteError && (
          <p
            role="alert"
            className="mb-5 rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm leading-relaxed text-red-700"
          >
            {noteDeleteError}
          </p>
        )}

        {/* Top Breadcrumb & Status Ribbon */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 text-xs text-stone-600 dark:text-stone-400">
          <div className="flex items-center gap-2">
            <button
              onClick={onGoToHome || onGoToToday}
              className="hover:text-amber-800 dark:hover:text-amber-300 cursor-pointer transition-colors"
            >
              Hôm nay
            </button>
            <span className="text-stone-400">/</span>
            <span className="text-amber-800 dark:text-amber-300 font-semibold">Lịch văn hóa & Nếp nhà</span>
          </div>

          <div className="flex items-center gap-2">
            <Badge
              variant="outline"
              className="text-xs px-3 py-0.5 border-amber-500/40 text-amber-800 dark:text-amber-300 bg-amber-500/10 font-medium"
            >
              ✤ THUẬN THIÊN Ý · AN GIA TRẠCH · GIỮ NẾP NHÀ
            </Badge>
          </div>
        </div>

        {/* Hero Magazine Section */}
        <section className="mb-8 p-6 sm:p-8 rounded-3xl border border-amber-500/30 bg-gradient-to-br from-surface via-surface to-amber-500/[0.04] shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-amber-500/10 to-transparent pointer-events-none rounded-bl-full" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-3 max-w-3xl">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-widest text-amber-800 dark:text-amber-300">
                  DÒNG THỜI GIAN VĂN HÓA & NẾP SỐNG GIA ĐÌNH
                </span>
                <span className="text-xs text-stone-400">·</span>
                <span className="text-xs text-stone-500">Việt Lịch Thuần Túy</span>
              </div>

              <h1 className="page-title font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-ink leading-tight">
                Lịch Âm Dương & Nếp Sống Gia Đình
              </h1>

              <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-relaxed max-w-2xl">
                Trăng tròn trăng khuyết theo nhịp điệu đất trời. Tra cứu ngày âm dương, chiêm nghiệm tiết khí,
                và ghi lại những mốc son sum họp của nếp nhà bạn.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 shrink-0">
              {onGoToGoodDays && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onGoToGoodDays}
                  className="rounded-xl border-amber-500/50 text-amber-800 dark:text-amber-300 hover:bg-amber-500/15 text-xs font-semibold gap-1.5 cursor-pointer shadow-xs min-h-10 px-4"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  <span>Tra cứu ngày lành</span>
                </Button>
              )}

              <Button
                variant="outline"
                size="sm"
                onClick={handleResetToday}
                className="rounded-xl border-line bg-surface hover:bg-surface-soft text-ink text-xs font-medium gap-1.5 cursor-pointer min-h-10 px-3.5"
                title="Quay về ngày hôm nay theo giờ máy tính"
              >
                <CalendarIcon className="w-3.5 h-3.5 text-amber-700" />
                <span>Hôm nay ({todayRealDay}/{todayRealMonth})</span>
              </Button>

              {!isSampleMonth && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleViewVerifiedOct2024}
                  className="rounded-xl border-amber-500/30 text-stone-700 dark:text-stone-300 hover:bg-surface text-xs font-medium gap-1.5 cursor-pointer min-h-10 px-3.5"
                  title="Mở bộ tư liệu khảo cứu mẫu tháng 10/2024"
                >
                  <Bookmark className="w-3.5 h-3.5 text-amber-700" />
                  <span>Tư liệu mẫu 10/2024</span>
                </Button>
              )}
            </div>
          </div>
        </section>

        {/* Main 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column (8 cols): Calendar Grid & Controls */}
          <div className="lg:col-span-8 min-w-0 bg-surface border border-line rounded-3xl p-4 sm:p-6 shadow-sm">
            {/* Calendar Controls Toolbar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-line">
              {/* Month Navigation */}
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handlePrevMonth}
                  className="w-9 h-9 rounded-full border border-line flex items-center justify-center text-ink hover:bg-surface-soft hover:border-amber-500/40 transition-colors cursor-pointer"
                  title="Tháng trước"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                <div>
                  <h2 className="font-display text-lg sm:text-xl font-bold text-ink flex items-center gap-2">
                    <span>Tháng {selectedMonth}, {selectedYear}</span>
                  </h2>
                  <p className="text-xs text-amber-800 dark:text-amber-300 font-medium">
                    {monthPoeticTitle} • {monthHeaderLunar ? `Năm ${monthHeaderLunar.canChiYear}` : "Âm Lịch Thuần Việt"}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleNextMonth}
                  className="w-9 h-9 rounded-full border border-line flex items-center justify-center text-ink hover:bg-surface-soft hover:border-amber-500/40 transition-colors cursor-pointer"
                  title="Tháng sau"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Filter Chips */}
              <div className="flex items-center gap-1.5 flex-wrap">
                <button
                  type="button"
                  onClick={() => setActiveFilter("all")}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                    activeFilter === "all"
                      ? "bg-amber-800 dark:bg-amber-700 text-white shadow-xs"
                      : "bg-surface border border-line text-stone-700 dark:text-stone-300 hover:border-amber-500/40"
                  }`}
                >
                  Tất cả
                </button>

                <button
                  type="button"
                  onClick={() => setActiveFilter("custom")}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                    activeFilter === "custom"
                      ? "bg-amber-800 dark:bg-amber-700 text-white shadow-xs"
                      : "bg-surface border border-line text-stone-700 dark:text-stone-300 hover:border-amber-500/40"
                  }`}
                >
                  Phong tục ({customCount})
                </button>

                <button
                  type="button"
                  onClick={() => setActiveFilter("festival")}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                    activeFilter === "festival"
                      ? "bg-amber-800 dark:bg-amber-700 text-white shadow-xs"
                      : "bg-surface border border-line text-stone-700 dark:text-stone-300 hover:border-amber-500/40"
                  }`}
                >
                  Lễ hội ({festivalCount})
                </button>

                <button
                  type="button"
                  onClick={() => setActiveFilter("personal")}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                    activeFilter === "personal"
                      ? "bg-amber-800 dark:bg-amber-700 text-white shadow-xs"
                      : "bg-surface border border-line text-stone-700 dark:text-stone-300 hover:border-amber-500/40"
                  }`}
                >
                  Việc tôi lưu ({personalCount})
                </button>
              </div>
            </div>

            {/* Calendar Days of Week Header (Thứ Hai -> Chủ Nhật) */}
            <div className="grid grid-cols-7 gap-1 sm:gap-2 text-center text-xs font-bold text-stone-500 dark:text-stone-400 mb-2 py-1">
              {DAYS_OF_WEEK.map((dayName, idx) => (
                <div
                  key={dayName}
                  className={idx >= 5 ? "text-amber-800 dark:text-amber-300" : ""}
                >
                  {dayName}
                </div>
              ))}
            </div>

            {/* Calendar Days Grid */}
            <div className="grid grid-cols-7 gap-1 sm:gap-2">
              {calendarGridDays.map((cell, index) => {
                const isSelected =
                  cell.isCurrentMonth &&
                  cell.day === selectedDay &&
                  cell.month === selectedMonth &&
                  cell.year === selectedYear;

                const isRealToday =
                  cell.isCurrentMonth &&
                  cell.day === todayRealDay &&
                  cell.month === todayRealMonth &&
                  cell.year === todayRealYear;

                return (
                  <button
                    key={index}
                    type="button"
                    disabled={!cell.isCurrentMonth}
                    aria-pressed={isSelected}
                    aria-label={`Ngày ${cell.day} tháng ${cell.month}${cell.isSpecial ? ", có sự kiện" : ""}`}
                    onClick={() => {
                      if (cell.isCurrentMonth) {
                        setSelectedDay(cell.day);
                      }
                    }}
                    className={`min-w-0 min-h-[82px] sm:min-h-[104px] p-1.5 sm:p-2.5 rounded-2xl text-left border transition-all flex flex-col justify-between cursor-pointer relative ${
                      !cell.isCurrentMonth
                        ? "bg-surface/30 border-transparent text-stone-400/40 opacity-30 cursor-default"
                        : isSelected
                        ? "bg-gradient-to-b from-amber-700 to-amber-900 border-amber-500 text-white shadow-md ring-2 ring-amber-400/40 scale-[1.02] z-10"
                        : isRealToday
                        ? "bg-amber-500/10 border-amber-500/60 text-ink hover:border-amber-600"
                        : cell.isSpecial
                        ? "bg-surface border-amber-500/30 text-ink hover:border-amber-500/70 hover:bg-surface-soft"
                        : "bg-surface border-line hover:border-amber-500/40 hover:bg-surface-soft text-ink"
                    }`}
                  >
                    {/* Top Row: Solar Day Number + Notification Dot */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <span
                          className={`text-xs sm:text-base font-bold font-sans tabular-nums ${
                            isSelected ? "text-white" : ""
                          }`}
                        >
                          {cell.day}
                        </span>
                        {isRealToday && (
                          <span
                            className={`text-[10px] px-1 py-0.2 rounded uppercase font-bold tracking-tight ${
                              isSelected
                                ? "bg-white/20 text-white"
                                : "bg-amber-600 text-white"
                            }`}
                            title="Hôm nay theo thời gian thực"
                          >
                            Nay
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-1">
                        {cell.hasPersonalNote && (
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              isSelected ? "bg-amber-300" : "bg-emerald-500"
                            }`}
                            title="Có ghi chú nếp nhà"
                          />
                        )}
                        {cell.hasDot && (
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              isSelected ? "bg-white" : "bg-red-500"
                            }`}
                            title="Có sự kiện văn hóa"
                          />
                        )}
                      </div>
                    </div>

                    {/* Middle: Lunar Day indication */}
                    {cell.lunarText && (
                      <div className="text-[11px] leading-tight font-medium opacity-90 mt-0.5">
                        <span
                          className={
                            isSelected
                              ? "text-amber-200"
                              : "text-amber-800 dark:text-amber-300 font-semibold"
                          }
                        >
                          {cell.lunarText} AL
                        </span>
                        {cell.subText && (
                          <span
                            className={`block text-[10px] truncate ${
                              isSelected ? "text-white/80" : "text-stone-500"
                            }`}
                          >
                            {cell.subText}
                          </span>
                        )}
                      </div>
                    )}

                    {/* Bottom: Event Badge if reliable */}
                    {cell.badge && (
                      <span
                        className={`text-[10px] px-1.5 py-0.5 rounded-md truncate font-semibold block text-center mt-1 ${
                          isSelected
                            ? "bg-white/25 text-white"
                            : cell.isSpecial
                            ? "bg-amber-500/20 text-amber-800 dark:text-amber-300 border border-amber-500/30"
                            : "bg-surface-soft text-stone-600 dark:text-stone-400 border border-line"
                        }`}
                      >
                        {cell.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Note on Data Transparency */}
            <div className="mt-5 pt-4 border-t border-line flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-stone-500">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-500" />
                <span>Sự kiện văn hóa</span>
                <span className="w-2 h-2 rounded-full bg-emerald-500 ml-2" />
                <span>Ghi chú nếp nhà tôi lưu</span>
              </div>
              <span className="italic">
                * Tính toán âm dương theo thuật toán thiên văn học Việt Nam
              </span>
            </div>
          </div>

          {/* Right Column (4 cols): TỜ LỊCH KHỞI TÂM (DAILY ZEN ALMANAC) */}
          <div className="lg:col-span-4 space-y-5">
            {/* Daily Zen Almanac Card */}
            <div className="rounded-3xl border border-amber-500/40 bg-gradient-to-b from-surface via-surface to-amber-500/[0.04] p-5 sm:p-6 shadow-md relative overflow-hidden">
              {/* Header Nẹp gỗ cổ phong */}
              <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-red-800 via-amber-600 to-red-800" />

              <div className="pt-1 pb-3 text-center border-b border-line">
                <span className="text-[11px] font-bold tracking-widest uppercase text-amber-800 dark:text-amber-300">
                  ✦ TỜ LỊCH KHỞI TÂM · NẾP NHÀ ✦
                </span>
                <h3 className="font-display text-lg font-bold text-ink mt-0.5">
                  {selectedDayOfWeekName}
                </h3>
                <p className="text-xs text-stone-500">
                  Ngày {selectedDay} tháng {selectedMonth} năm {selectedYear} (Dương lịch)
                </p>
              </div>

              {/* Big Solar Day & Lunar Highlight */}
              <div className="my-5 text-center">
                <div className="font-display text-6xl sm:text-7xl font-extrabold text-amber-800 dark:text-amber-300 tracking-tight">
                  {selectedDay}
                </div>

                {currentSelectedLunar && (
                  <div className="mt-3 p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-center">
                    <div className="text-xs font-bold uppercase text-stone-500 tracking-wider">
                      Âm lịch truyền thống
                    </div>
                    <div className="font-display text-lg sm:text-xl font-bold text-amber-900 dark:text-amber-200 mt-0.5">
                      Ngày {currentSelectedLunar.lunarDay} tháng {currentSelectedLunar.lunarMonth}
                    </div>
                    <div className="text-xs text-stone-600 dark:text-stone-400 font-medium mt-1">
                      Năm {currentSelectedLunar.canChiYear} · Tháng {almanacData.canChiMonth}
                    </div>
                    <div className="text-xs text-amber-800 dark:text-amber-300 font-bold mt-0.5">
                      Ngày {almanacData.canChiDayName}
                    </div>
                  </div>
                )}
              </div>

              {/* Almanac Details: Trực, Giờ Hoàng Đạo */}
              <div className="space-y-3 pt-2 text-xs">
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-surface-soft border border-line">
                  <span className="text-stone-500 font-medium">Trực trong ngày:</span>
                  <Badge variant="outline" className="border-amber-500/30 text-amber-800 dark:text-amber-300 font-semibold bg-amber-500/10">
                    Trực {almanacData.truc}
                  </Badge>
                </div>

                <div className="p-3 rounded-xl bg-surface-soft border border-line space-y-1">
                  <div className="flex items-center gap-1.5 text-amber-800 dark:text-amber-300 font-semibold">
                    <Sun className="w-3.5 h-3.5 text-amber-600" />
                    <span>Giờ Hoàng Đạo cát lành:</span>
                  </div>
                  <p className="text-stone-700 dark:text-stone-300 leading-relaxed text-[11px]">
                    {almanacData.hours}
                  </p>
                </div>

                {/* Zen Advice */}
                <div className="p-3 rounded-xl bg-gradient-to-r from-amber-500/10 to-transparent border border-amber-500/20">
                  <span className="text-[10px] uppercase font-bold text-amber-800 dark:text-amber-300 tracking-wider block mb-1">
                    Khởi tâm hôm nay:
                  </span>
                  <p className="italic text-stone-700 dark:text-stone-300 leading-relaxed text-[11px]">
                    “{almanacData.zenAdvice}”
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 pt-4 mt-4 border-t border-line">
                <Button
                  onClick={() => setShowAddModal(true)}
                  className="flex-1 rounded-xl text-xs gap-1 py-2 px-3 bg-gradient-to-r from-red-800 to-amber-700 hover:from-red-700 hover:to-amber-800 text-white font-semibold cursor-pointer shadow-xs min-h-10"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>+ Ghi nhớ việc ngày này</span>
                </Button>

                {onGoToGoodDays && (
                  <Button
                    onClick={onGoToGoodDays}
                    variant="outline"
                    className="rounded-xl text-xs border-amber-500/40 text-amber-800 dark:text-amber-300 hover:bg-amber-500/10 cursor-pointer min-h-10 px-3"
                    title="Tra cứu việc cát lành tương thích"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                  </Button>
                )}
              </div>
            </div>

            {/* Selected Day Events & Personal Notes List */}
            <Card className="p-5 rounded-3xl bg-surface border border-line shadow-xs">
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-line">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 dark:text-amber-300">
                    {activeFilter === "personal" ? "DANH MỤC LƯU RIÊNG" : "DẤU MỐC NGÀY NÀY"}
                  </span>
                  <h4 className="font-display font-bold text-base text-ink mt-0.5">
                    {activeFilter === "personal"
                      ? `Các ngày tôi đã lưu (${personalCount})`
                      : `Sự kiện & Ghi nhớ (${selectedDayEvents.length})`}
                  </h4>
                </div>
              </div>

              <div className="space-y-3">
                {selectedDayEvents.length > 0 ? (
                  selectedDayEvents.map((event) => (
                    <div
                      key={event.id}
                      className="p-3.5 rounded-2xl bg-surface-soft border border-line hover:border-amber-500/40 transition-all shadow-2xs flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <Badge
                            variant="secondary"
                            className={`text-[10px] font-semibold px-2 py-0.5 uppercase ${
                              event.type === "festival"
                                ? "bg-amber-500/15 text-amber-800 dark:text-amber-300 border-amber-500/30"
                                : event.type === "personal"
                                ? "bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 border-emerald-500/30"
                                : "bg-red-500/10 text-red-800 dark:text-red-300 border-red-500/20"
                            }`}
                          >
                            {event.typeLabel}
                          </Badge>
                          <span className="text-[10px] text-stone-500 font-medium">
                            {event.region}
                          </span>
                        </div>

                        <h5 className="font-display font-bold text-sm text-ink mb-1">
                          {event.title}
                        </h5>

                        <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed mb-2.5">
                          {event.shortDesc}
                        </p>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-line text-[11px]">
                        <span className="text-stone-500">{event.lunarDate}</span>

                        <div className="flex items-center gap-2">
                          {event.type === "personal" && (
                            <button
                              onClick={() => handleDeleteNote(event.id)}
                              className="text-stone-400 hover:text-red-600 p-1 transition-colors cursor-pointer"
                              title="Xóa ghi chú này"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}

                          {event.type !== "personal" && (
                            <button
                              onClick={() => onSelectEvent(event.id)}
                              className="font-bold text-amber-800 dark:text-amber-300 hover:underline flex items-center gap-1 cursor-pointer"
                            >
                              <span>Chi tiết</span>
                              <ArrowRight className="w-3 h-3" />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-5 rounded-2xl bg-surface-soft border border-dashed border-line text-center text-xs text-stone-500">
                    <p className="font-medium text-stone-700 dark:text-stone-300 mb-1">
                      Chưa có sự kiện văn hóa trùng ngày này
                    </p>
                    <p className="text-[11px] text-stone-500 mb-3 leading-relaxed">
                      Bạn có thể lưu lại giỗ chạp, họp mặt, sinh nhật hay bất kỳ việc lành nào của gia đình.
                    </p>
                    <Button
                      onClick={() => setShowAddModal(true)}
                      size="sm"
                      variant="outline"
                      className="rounded-xl text-xs border-amber-500/40 text-amber-800 dark:text-amber-300 cursor-pointer min-h-9"
                    >
                      + Thêm ghi chú nếp nhà
                    </Button>
                  </div>
                )}
              </div>

              {/* Ritual Guide Link Widget */}
              {onGoToRituals && (
                <div
                  onClick={onGoToRituals}
                  className="mt-4 p-3.5 rounded-2xl bg-amber-500/[0.06] border border-amber-500/20 cursor-pointer hover:border-amber-500/50 transition-all group shadow-2xs"
                >
                  <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-300 mb-1">
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Cẩm nang nghi lễ nếp nhà</span>
                  </div>
                  <p className="text-xs text-stone-700 dark:text-stone-300 leading-relaxed">
                    Chuẩn bị chu tất cho ngày lễ sắp tới với các hướng dẫn tinh gọn mộc mạc →
                  </p>
                </div>
              )}
            </Card>
          </div>
        </div>

        {/* Modal: Thêm ngày lưu riêng */}
        {showAddModal && (
          <AppDialog
            labelledBy="calendar-note-dialog-title"
            onClose={() => {
              setShowAddModal(false);
              setNoteSaveError("");
            }}
          >
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-line">
              <h3 id="calendar-note-dialog-title" className="font-display font-bold text-lg text-ink">
                Thêm việc nếp nhà · Ngày {selectedDay}/{selectedMonth}/{selectedYear}
              </h3>
              <button
                type="button"
                aria-label="Đóng hộp thoại thêm ghi chú"
                onClick={() => {
                  setShowAddModal(false);
                  setNoteSaveError("");
                }}
                className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-stone-500 transition-colors hover:bg-surface-soft hover:text-ink cursor-pointer"
              >
                <span aria-hidden="true">✕</span>
              </button>
            </div>

            <form onSubmit={handleAddPersonalNote} className="space-y-4">
              {noteSaveError && (
                <p
                  role="alert"
                  className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm leading-relaxed text-red-700"
                >
                  {noteSaveError}
                </p>
              )}
              <div>
                <label htmlFor="calendar-note-title" className="block text-xs font-semibold text-ink mb-1.5">
                  Tên việc muốn nhớ / Dấu mốc nếp nhà:
                </label>
                <input
                  id="calendar-note-title"
                  type="text"
                  autoFocus
                  required
                  value={newNoteTitle}
                  onChange={(e) => setNewNoteTitle(e.target.value)}
                  placeholder="Ví dụ: Giỗ cụ cố, Lễ mừng thọ, Họp mặt gia đình, Mở hàng đầu tháng..."
                  className="w-full min-h-11 px-3.5 py-2.5 rounded-xl border border-line text-sm text-ink placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500/30 bg-surface"
                />
              </div>

              <div>
                <label htmlFor="calendar-note-description" className="block text-xs font-semibold text-ink mb-1.5">
                  Ghi chú chi tiết (nếu có):
                </label>
                <textarea
                  id="calendar-note-description"
                  rows={3}
                  value={newNoteDesc}
                  onChange={(e) => setNewNoteDesc(e.target.value)}
                  placeholder="Chuẩn bị lễ vật mộc mạc, dặn dò các thành viên trong gia đình..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-line text-sm text-ink placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500/30 bg-surface resize-none"
                />
              </div>

              <div className="p-3 rounded-xl bg-amber-500/[0.07] border border-amber-500/20 text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                ✦ Dữ liệu ghi chú được lưu an toàn trên máy của bạn và gắn với ngày {selectedDay}/{selectedMonth}/{selectedYear} ({currentSelectedLunar ? `Ngày ${currentSelectedLunar.lunarDay}/${currentSelectedLunar.lunarMonth} Âm lịch` : ""}).
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setShowAddModal(false);
                    setNoteSaveError("");
                  }}
                  className="rounded-xl border-line text-xs min-h-10 px-4"
                >
                  Hủy bỏ
                </Button>
                <Button
                  type="submit"
                  size="sm"
                  className="rounded-xl bg-gradient-to-r from-red-800 to-amber-700 hover:from-red-700 hover:to-amber-800 text-white font-semibold text-xs px-5 min-h-10 cursor-pointer shadow-xs"
                >
                  Lưu vào lịch
                </Button>
              </div>
            </form>
          </AppDialog>
        )}
      </main>
    </div>
  );
};
