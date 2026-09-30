import React, { useState, useEffect, useMemo } from "react";
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
} from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Badge } from "@/src/components/ui/badge";
import { Card } from "@/src/components/ui/card";
import {
  CalendarEventType,
  CalendarEventItem,
  SAMPLE_CALENDAR_EVENTS,
  getReliableLunarDate,
  getCanChiYear,
  loadCalendarPersonalNotes,
  saveCalendarPersonalNotes,
} from "../data/calendarData";

interface CulturalCalendarScreenProps {
  onGoToToday?: () => void;
  onGoToHome?: () => void;
  onSelectEvent: (eventId: string) => void;
  onGoToRituals?: () => void;
  onGoToCulture?: () => void;
  onGoToGoodDays?: () => void;
  currentUserEmail?: string;
}

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
  const today = useMemo(() => new Date(), []);
  const todayRealDay = today.getDate();
  const todayRealMonth = today.getMonth() + 1;
  const todayRealYear = today.getFullYear();

  // Khởi tạo trạng thái lịch động theo Date hiện tại
  const [selectedYear, setSelectedYear] = useState<number>(todayRealYear);
  const [selectedMonth, setSelectedMonth] = useState<number>(todayRealMonth);
  const [selectedDay, setSelectedDay] = useState<number>(todayRealDay);

  const [activeFilter, setActiveFilter] = useState<"all" | "custom" | "festival" | "personal">("all");
  const [showAddModal, setShowAddModal] = useState(false);
  const [newNoteTitle, setNewNoteTitle] = useState("");
  const [newNoteDesc, setNewNoteDesc] = useState("");

  // Dữ liệu "Ngày tôi lưu": nạp trực tiếp theo tài khoản riêng biệt
  const [personalNotes, setPersonalNotes] = useState<CalendarEventItem[]>(() =>
    loadCalendarPersonalNotes(currentUserEmail)
  );

  // Khi tài khoản đăng nhập thay đổi hoặc đăng xuất, tự động nạp lại đúng dữ liệu lịch
  useEffect(() => {
    setPersonalNotes(loadCalendarPersonalNotes(currentUserEmail));
  }, [currentUserEmail]);

  // Tổng hợp sự kiện: sự kiện lịch sử văn hóa đã kiểm chứng + ngày cá nhân người dùng thực sự lưu
  const allEvents = useMemo(() => {
    return [...SAMPLE_CALENDAR_EVENTS, ...personalNotes];
  }, [personalNotes]);

  const customCount = allEvents.filter((e) => e.type === "custom").length;
  const festivalCount = allEvents.filter((e) => e.type === "festival").length;
  const personalCount = personalNotes.length;

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

  const handleAddPersonalNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoteTitle.trim()) return;

    const lunarInfo = getReliableLunarDate(selectedDay, selectedMonth, selectedYear);
    const lunarStr = lunarInfo
      ? `Ngày ${lunarInfo.lunarDay}/${lunarInfo.lunarMonth} Âm lịch (${lunarInfo.canChiYear})`
      : "Dấu mốc tự lưu";

    const newNote: CalendarEventItem = {
      id: `personal-${Date.now()}`,
      day: selectedDay,
      month: selectedMonth,
      year: selectedYear,
      type: "personal",
      typeLabel: "Ghi chú của tôi",
      region: "Cá nhân",
      title: newNoteTitle.trim(),
      shortDesc: newNoteDesc.trim() || "Dấu mốc nếp nhà bạn ghi nhớ cho riêng mình.",
      lunarDate: lunarStr,
    };

    setPersonalNotes((prev) => {
      const updated = [newNote, ...prev];
      saveCalendarPersonalNotes(currentUserEmail, updated);
      return updated;
    });
    setNewNoteTitle("");
    setNewNoteDesc("");
    setShowAddModal(false);
  };

  const handleDeleteNote = (noteId: string) => {
    setPersonalNotes((prev) => {
      const updated = prev.filter((n) => n.id !== noteId);
      saveCalendarPersonalNotes(currentUserEmail, updated);
      return updated;
    });
  };

  // Các sự kiện hiển thị cho ngày được chọn (hoặc toàn bộ danh sách khi chọn tab "Ngày tôi lưu")
  const selectedDayEvents = useMemo(() => {
    return (
      activeFilter === "personal"
        ? personalNotes
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
          badge = `Rằm tháng ${lunar.lunarMonth}`;
          isSpecial = true;
          type = "custom";
        } else if (lunar.isFirstDay) {
          badge = `Mùng 1/${lunar.lunarMonth} AL`;
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

  // Thông tin âm lịch của ngày đang được chọn trong chi tiết
  const currentSelectedLunar = useMemo(() => {
    return getReliableLunarDate(selectedDay, selectedMonth, selectedYear);
  }, [selectedDay, selectedMonth, selectedYear]);

  // Âm lịch tiêu đề tháng
  const monthHeaderLunar = useMemo(() => {
    return getReliableLunarDate(15, selectedMonth, selectedYear);
  }, [selectedMonth, selectedYear]);

  return (
    <div className="w-full min-h-screen bg-[#fcf8f2] text-[#2e2624] font-['Be_Vietnam_Pro',sans-serif]">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 pb-20">
        {/* Top Breadcrumb & Status Ribbon */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 text-xs text-[#8a7971]">
          <div className="flex items-center gap-2">
            <button
              onClick={onGoToHome || onGoToToday}
              className="hover:text-[#9e3b2e] cursor-pointer transition-colors"
            >
              Hôm nay
            </button>
            <span>/</span>
            <span className="text-[#9e3b2e] font-semibold">Lịch văn hóa</span>
          </div>

          <div className="flex items-center gap-1.5 uppercase font-semibold text-[11px] text-[#938279]">
            <span className="text-[#9e3b2e]">✤</span>
            <span>CHIÊM NGHIỆM THỜI GIAN • ĐỐI CHIẾU ÂM DƯƠNG ĐÃ KIỂM CHỨNG</span>
          </div>
        </div>

        {/* Header Title Section */}
        <div className="mb-6">
          <div className="text-xs uppercase font-bold tracking-wider text-[#9e3b2e] mb-1.5 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#9e3b2e]"></span>
            <span>DÒNG THỜI GIAN VĂN HÓA</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <h1 className="font-['Noto_Serif',serif] font-bold text-3xl sm:text-4xl text-[#2a2220] leading-tight mb-2">
              Lịch văn hóa & Nếp nhà
            </h1>

            <div className="flex items-center gap-2 flex-wrap">
              {onGoToGoodDays && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onGoToGoodDays}
                  className="border-[#e5d4c5] text-[#9e3b2e] hover:bg-[#faede2] text-xs font-semibold gap-1.5 self-start sm:self-auto cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#9e3b2e]" />
                  <span>Tra cứu ngày lành</span>
                </Button>
              )}

              {/* Nút xem nhanh bộ dữ liệu mẫu đã kiểm chứng tháng 10/2024 */}
              {!(selectedYear === 2024 && selectedMonth === 10) && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleViewVerifiedOct2024}
                  className="border-[#dfc3af] bg-[#fbf5ee] text-[#844520] hover:bg-[#faede2] text-xs font-medium gap-1.5 cursor-pointer"
                  title="Xem tư liệu lễ hội & phong tục đã khảo cứu đối chiếu chi tiết tháng 10/2024"
                >
                  <Bookmark className="w-3.5 h-3.5 text-[#9e3b2e]" />
                  <span>Xem tư liệu mẫu (10/2024)</span>
                </Button>
              )}
            </div>
          </div>

          <p className="text-sm sm:text-base text-[#6f5e57] max-w-3xl leading-relaxed">
            Theo dõi nhịp điệu của đất trời, tiết khí thiên nhiên và những mỹ tục truyền thống được
            kiểm chứng theo lịch âm dương thuần Việt.
          </p>

          <div className="flex items-center justify-center my-6">
            <div className="h-px w-16 bg-[#e7d8cb]"></div>
            <div className="mx-3 text-[#be8e5a] text-sm">❦</div>
            <div className="h-px w-16 bg-[#e7d8cb]"></div>
          </div>
        </div>

        {/* Main 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column (8 cols): Calendar Grid & Controls */}
          <div className="lg:col-span-8 bg-white border border-[#eddcd0] rounded-3xl p-5 sm:p-7 shadow-xs">
            {/* Calendar Controls Toolbar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-5 border-b border-[#f3e6da]">
              {/* Month Navigation */}
              <div className="flex items-center gap-3">
                <button
                  onClick={handlePrevMonth}
                  className="w-8 h-8 rounded-full border border-[#eedcd0] flex items-center justify-center text-[#6e5d56] hover:bg-[#faf3ec] transition-colors cursor-pointer"
                  title="Tháng trước"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                <div>
                  <h2 className="font-['Noto_Serif',serif] font-bold text-xl sm:text-2xl text-[#2a2220] min-w-[190px] text-center">
                    Tháng {selectedMonth}, {selectedYear}
                  </h2>
                  <p className="text-[11px] text-[#8e7b73] text-center font-medium">
                    {monthHeaderLunar
                      ? `Tháng ${monthHeaderLunar.lunarMonth} Âm lịch • Năm ${monthHeaderLunar.canChiYear}`
                      : "Lịch Âm Dương thuần Việt"}
                  </p>
                </div>

                <button
                  onClick={handleNextMonth}
                  className="w-8 h-8 rounded-full border border-[#eedcd0] flex items-center justify-center text-[#6e5d56] hover:bg-[#faf3ec] transition-colors cursor-pointer"
                  title="Tháng sau"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>

                <button
                  onClick={handleResetToday}
                  className="ml-2 px-3 py-1.5 rounded-xl border border-[#ecd9cb] text-xs font-semibold text-[#806b63] hover:text-[#9e3b2e] hover:bg-[#faf3ec] transition-colors flex items-center gap-1.5 cursor-pointer"
                  title="Về ngày hiện tại theo thời gian thực"
                >
                  <CalendarIcon className="w-3.5 h-3.5 text-[#9e3b2e]" />
                  <span>Hôm nay ({todayRealDay}/{todayRealMonth})</span>
                </button>
              </div>

              {/* Filter Chips */}
              <div className="flex items-center gap-1.5 flex-wrap">
                <button
                  onClick={() => setActiveFilter("all")}
                  className={`px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                    activeFilter === "all"
                      ? "bg-[#9e3b2e] text-white shadow-2xs"
                      : "bg-[#fcf8f2] border border-[#eddcd0] text-[#715f57] hover:border-[#dfc3af]"
                  }`}
                >
                  ● Tất cả
                </button>

                <button
                  onClick={() => setActiveFilter("custom")}
                  className={`px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                    activeFilter === "custom"
                      ? "bg-[#9e3b2e] text-white shadow-2xs"
                      : "bg-[#fcf8f2] border border-[#eddcd0] text-[#715f57] hover:border-[#dfc3af]"
                  }`}
                >
                  ● Phong tục ({customCount})
                </button>

                <button
                  onClick={() => setActiveFilter("festival")}
                  className={`px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                    activeFilter === "festival"
                      ? "bg-[#9e3b2e] text-white shadow-2xs"
                      : "bg-[#fcf8f2] border border-[#eddcd0] text-[#715f57] hover:border-[#dfc3af]"
                  }`}
                >
                  ● Lễ hội ({festivalCount})
                </button>

                <button
                  onClick={() => setActiveFilter("personal")}
                  className={`px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                    activeFilter === "personal"
                      ? "bg-[#9e3b2e] text-white shadow-2xs"
                      : "bg-[#fcf8f2] border border-[#eddcd0] text-[#715f57] hover:border-[#dfc3af]"
                  }`}
                >
                  ● Ngày tôi lưu ({personalCount})
                </button>
              </div>
            </div>

            {/* Calendar Days of Week Header (Bắt đầu từ Thứ Hai) */}
            <div className="grid grid-cols-7 gap-1 sm:gap-2 text-center text-xs font-bold text-[#8c7a72] mb-3">
              <div>Thứ Hai</div>
              <div>Thứ Ba</div>
              <div>Thứ Tư</div>
              <div>Thứ Năm</div>
              <div>Thứ Sáu</div>
              <div>Thứ Bảy</div>
              <div>Chủ Nhật</div>
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
                  <div
                    key={index}
                    onClick={() => {
                      if (cell.isCurrentMonth) {
                        setSelectedDay(cell.day);
                      }
                    }}
                    className={`min-h-[76px] sm:min-h-[92px] p-1.5 sm:p-2 rounded-2xl border transition-all flex flex-col justify-between cursor-pointer relative ${
                      !cell.isCurrentMonth
                        ? "bg-[#faf6f1]/40 border-transparent text-[#beb0a7] opacity-40 cursor-default"
                        : isSelected
                        ? "bg-[#9e3b2e] border-[#9e3b2e] text-white shadow-md ring-2 ring-[#9e3b2e]/30 scale-[1.02]"
                        : cell.isSpecial
                        ? "bg-[#fffaf4] border-[#e8c7ae] text-[#2c2220] hover:border-[#9e3b2e]"
                        : "bg-[#fffdfa] border-[#ecdcd0] hover:border-[#cfb5a3] hover:bg-[#fdfaf6] text-[#2c2220]"
                    }`}
                  >
                    {/* Top Row: Solar Day Number + Notification Dot */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <span
                          className={`text-xs sm:text-sm font-bold font-mono ${
                            isSelected ? "text-white" : ""
                          }`}
                        >
                          {cell.day}
                        </span>
                        {isRealToday && (
                          <span
                            className={`text-[9px] px-1 rounded-sm uppercase font-bold tracking-tight ${
                              isSelected ? "bg-white text-[#9e3b2e]" : "bg-[#faede2] text-[#9e3b2e]"
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
                              isSelected ? "bg-amber-200" : "bg-indigo-600"
                            }`}
                            title="Có ghi chú của tôi"
                          />
                        )}
                        {cell.hasDot && (
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              isSelected ? "bg-amber-300" : "bg-[#9e3b2e]"
                            }`}
                          />
                        )}
                      </div>
                    </div>

                    {/* Middle: Lunar Day indication (Chỉ hiện khi có dữ liệu đáng tin cậy) */}
                    {cell.lunarText && (
                      <div className="text-[10px] leading-tight font-medium opacity-90">
                        <span className={isSelected ? "text-amber-100" : "text-[#8e7c74]"}>
                          AL: {cell.lunarText}
                        </span>
                        {cell.subText && (
                          <span
                            className={`block text-[9px] italic ${
                              isSelected ? "text-amber-200" : "text-[#b07335]"
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
                        className={`text-[9px] px-1.5 py-0.5 rounded-md truncate font-semibold block text-center ${
                          isSelected
                            ? "bg-white/20 text-white"
                            : cell.isSpecial
                            ? "bg-[#9e3b2e] text-white"
                            : "bg-[#faede2] text-[#9e3b2e] border border-[#ebd6c5]"
                        }`}
                      >
                        {cell.badge}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column (4 cols): Day Detail Panel */}
          <div className="lg:col-span-4 space-y-4">
            <Card className="p-6 rounded-3xl bg-[#fbf5ee] border border-[#ebdcd0] shadow-xs">
              {/* Day Header Info */}
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#ebdcd0]">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#9e3b2e]">
                    {activeFilter === "personal" ? "DANH MỤC LƯU RIÊNG" : "CHI TIẾT NGÀY ĐƯỢC CHỌN"}
                  </span>
                  <h3 className="font-['Noto_Serif',serif] font-bold text-xl sm:text-2xl text-[#2a2220] mt-0.5">
                    {activeFilter === "personal"
                      ? `Các ngày tôi đã lưu (${personalCount})`
                      : `Ngày ${selectedDay} tháng ${selectedMonth}, ${selectedYear}`}
                  </h3>
                  {activeFilter !== "personal" && currentSelectedLunar && (
                    <p className="text-xs text-[#7e6d65] font-medium mt-0.5">
                      Âm lịch: Ngày {currentSelectedLunar.lunarDay} tháng {currentSelectedLunar.lunarMonth} ({currentSelectedLunar.canChiYear})
                      {currentSelectedLunar.solarTerm && ` • Tiết ${currentSelectedLunar.solarTerm}`}
                    </p>
                  )}
                </div>

                <Button
                  onClick={() => setShowAddModal(true)}
                  size="sm"
                  className="rounded-xl text-xs gap-1 py-1.5 px-3 bg-[#9e3b2e] hover:bg-[#852f24] text-white shrink-0 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Ghi chú</span>
                </Button>
              </div>

              {/* Event Cards List */}
              <div className="space-y-3.5 mb-5">
                {selectedDayEvents.length > 0 ? (
                  selectedDayEvents.map((event) => (
                    <div
                      key={event.id}
                      className="p-4 rounded-2xl bg-white border border-[#ebdcd0] hover:border-[#dfc3af] transition-all shadow-2xs flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <Badge
                            variant="secondary"
                            className={`text-[10px] font-semibold px-2 py-0.5 uppercase ${
                              event.type === "festival"
                                ? "bg-amber-50 text-amber-800 border-amber-200"
                                : event.type === "personal"
                                ? "bg-indigo-50 text-indigo-800 border-indigo-200"
                                : "bg-[#faede2] text-[#9e3b2e] border-[#ebd7c8]"
                            }`}
                          >
                            {event.typeLabel}
                          </Badge>
                          <span className="text-[11px] text-[#93827a] font-medium">
                            {event.region}
                          </span>
                        </div>

                        <h4 className="font-['Noto_Serif',serif] font-bold text-sm sm:text-base text-[#2c2220] mb-1.5">
                          {event.title}
                        </h4>

                        <p className="text-xs text-[#705f58] leading-relaxed mb-3">
                          {event.shortDesc}
                        </p>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-[#f4e8dc]">
                        <span className="text-[11px] text-[#8e7d75]">{event.lunarDate}</span>

                        <div className="flex items-center gap-2">
                          {event.type === "personal" && (
                            <button
                              onClick={() => handleDeleteNote(event.id)}
                              className="text-xs text-[#9c8981] hover:text-rose-600 p-1 transition-colors cursor-pointer"
                              title="Xóa ghi chú"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}

                          {event.type !== "personal" && (
                            <button
                              onClick={() => onSelectEvent(event.id)}
                              className="text-xs font-bold text-[#9e3b2e] hover:underline flex items-center gap-1 cursor-pointer"
                            >
                              <span>Xem chi tiết</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-6 rounded-2xl bg-white border border-dashed border-[#e3d1c3] text-center text-xs text-[#8c7b74]">
                    {activeFilter === "personal" ? (
                      <>
                        <p className="font-semibold text-[#4a3b34] mb-1">
                          Bạn chưa lưu ngày văn hóa hay ghi chú cá nhân nào
                        </p>
                        <p className="text-[11px] text-[#7d6c64] mb-3 leading-relaxed">
                          Chọn một ngày trên lịch và bấm "+ Ghi chú" để lưu lại dấu mốc nếp nhà của bạn.
                        </p>
                        <Button
                          onClick={() => setShowAddModal(true)}
                          size="sm"
                          variant="outline"
                          className="text-xs border-[#dfc4b1] text-[#9e3b2e]"
                        >
                          + Thêm ghi chú ngay
                        </Button>
                      </>
                    ) : (
                      <>
                        <p className="font-semibold text-[#3e312b] mb-1">
                          Chưa có sự kiện văn hóa kiểm chứng vào ngày này
                        </p>
                        <p className="text-[11px] text-[#7d6c64] mb-4 leading-relaxed">
                          Hệ thống tuân thủ nguyên tắc chỉ hiển thị phong tục và sự kiện có nguồn tư liệu khảo cứu đáng tin cậy. Bạn có thể lưu dấu mốc cá nhân hoặc tham quan tháng có tư liệu mẫu.
                        </p>
                        <div className="flex flex-wrap items-center justify-center gap-2">
                          <Button
                            onClick={() => setShowAddModal(true)}
                            size="sm"
                            className="rounded-xl text-xs bg-[#9e3b2e] hover:bg-[#852f24] text-white"
                          >
                            + Thêm ghi chú ngày này
                          </Button>
                          {!(selectedYear === 2024 && selectedMonth === 10) && (
                            <Button
                              onClick={handleViewVerifiedOct2024}
                              size="sm"
                              variant="outline"
                              className="rounded-xl text-xs border-[#dfc4b1] text-[#9e3b2e]"
                            >
                              Xem mẫu khảo cứu (10/2024)
                            </Button>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                )}
              </div>

              {/* Ritual Guide Link Widget */}
              {onGoToRituals && (
                <div
                  onClick={onGoToRituals}
                  className="p-4 rounded-2xl bg-gradient-to-br from-[#faede2] to-[#fbf1e7] border border-[#ebd6c5] cursor-pointer hover:border-[#9e3b2e] transition-all mb-4 group shadow-2xs"
                >
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#9e3b2e] mb-1">
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Cẩm nang nghi lễ • Màn 18</span>
                  </div>
                  <p className="text-xs text-[#6e5d56] leading-relaxed group-hover:text-[#2a2220] transition-colors">
                    Bạn cần chuẩn bị cho ngày lễ sắp tới? Khám phá hướng dẫn tinh gọn, mộc mạc tại{" "}
                    <strong className="text-[#9e3b2e] underline">Cẩm nang nghi lễ →</strong>
                  </p>
                </div>
              )}

              {/* Transparency Notice Box */}
              <div className="p-3.5 rounded-2xl bg-[#faf3ec] border border-[#ebdcd0] text-[11px] text-[#82716a] leading-relaxed flex items-start gap-2.5">
                <Info className="w-4 h-4 text-[#9e3b2e] shrink-0 mt-0.5" />
                <div>
                  <strong className="font-semibold text-[#2a2220]">Minh bạch tư liệu:</strong>{" "}
                  Mọi dữ liệu lịch âm dương đều tính theo thuật toán thiên văn học Việt Nam (Hồ Ngọc Đức)
                  và các nguồn khảo cứu văn hóa dân gian chính thống.
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Modal: Thêm ngày lưu riêng */}
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
            <Card className="max-w-md w-full p-6 rounded-3xl bg-white border border-[#eddcd0] shadow-2xl animate-in fade-in zoom-in-95 duration-200">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#f3e6da]">
                <h3 className="font-['Noto_Serif',serif] font-bold text-lg text-[#2a2220]">
                  Thêm ghi chú ngày {selectedDay}/{selectedMonth}/{selectedYear}
                </h3>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="w-7 h-7 rounded-full text-xs text-[#9d8d85] hover:text-[#2a2220] flex items-center justify-center cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleAddPersonalNote} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-[#4e403a] mb-1.5">
                    Tiêu đề dấu mốc / sự kiện nếp nhà:
                  </label>
                  <input
                    type="text"
                    required
                    value={newNoteTitle}
                    onChange={(e) => setNewNoteTitle(e.target.value)}
                    placeholder="Ví dụ: Giỗ cụ cố, Lễ mừng thọ, Họp mặt gia đình..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#eddcd0] text-sm text-[#2a2220] placeholder-[#a6968e] focus:outline-none focus:ring-1 focus:ring-[#9e3b2e] bg-[#faf3ec]/50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#4e403a] mb-1.5">
                    Ghi chú chi tiết (nếu có):
                  </label>
                  <textarea
                    rows={3}
                    value={newNoteDesc}
                    onChange={(e) => setNewNoteDesc(e.target.value)}
                    placeholder="Chuẩn bị lễ vật mộc mạc, dặn dò các thành viên trong gia đình..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#eddcd0] text-sm text-[#2a2220] placeholder-[#a6968e] focus:outline-none focus:ring-1 focus:ring-[#9e3b2e] bg-[#faf3ec]/50 resize-none"
                  />
                </div>

                <div className="p-3 rounded-xl bg-[#fbf5ee] border border-[#ecd9cb] text-[11px] text-[#786962] leading-relaxed">
                  ✦ Dữ liệu ghi chú được lưu trữ cục bộ trên máy của bạn và gắn với ngày {selectedDay}/{selectedMonth}/{selectedYear}.
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setShowAddModal(false)}
                    className="border-[#ecd9cb] text-xs"
                  >
                    Hủy bỏ
                  </Button>
                  <Button
                    type="submit"
                    size="sm"
                    className="bg-[#9e3b2e] hover:bg-[#852f24] text-white text-xs px-4"
                  >
                    Lưu vào lịch
                  </Button>
                </div>
              </form>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
};
