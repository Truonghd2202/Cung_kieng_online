import React, { useState, useEffect } from "react";
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
} from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Badge } from "@/src/components/ui/badge";
import { Card } from "@/src/components/ui/card";
import {
  CalendarEventType,
  CalendarEventItem,
  SAMPLE_CALENDAR_EVENTS,
  OCTOBER_2024_LUNAR_MAP,
  getEventsForDay,
} from "../data/calendarData";

interface CulturalCalendarScreenProps {
  onGoToToday?: () => void;
  onGoToHome?: () => void;
  onSelectEvent: (eventId: string) => void;
  onGoToRituals?: () => void;
  onGoToCulture?: () => void;
  onGoToGoodDays?: () => void;
}

export const CulturalCalendarScreen: React.FC<CulturalCalendarScreenProps> = ({
  onGoToToday,
  onGoToHome,
  onSelectEvent,
  onGoToRituals,
  onGoToCulture,
  onGoToGoodDays,
}) => {
  // Calendar month state (tháng 10/2024 đã kiểm chứng âm - dương thiên văn học)
  const [selectedMonth, setSelectedMonth] = useState(10);
  const [selectedYear, setSelectedYear] = useState(2024);
  // Mặc định chọn ngày Rằm tháng 9 (ngày 17/10/2024 DL - 15/9 AL)
  const [selectedDay, setSelectedDay] = useState<number>(17);
  const [activeFilter, setActiveFilter] = useState<"all" | "custom" | "festival" | "personal">("all");
  const [showAddModal, setShowAddModal] = useState(false);
  const [newNoteTitle, setNewNoteTitle] = useState("");
  const [newNoteDesc, setNewNoteDesc] = useState("");

  // Dữ liệu "Ngày tôi lưu": lấy từ localStorage thực tế của người dùng, không giữ mục mẫu giả
  const [personalNotes, setPersonalNotes] = useState<CalendarEventItem[]>(() => {
    try {
      const stored = localStorage.getItem("tltl-calendar-personal-notes");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("tltl-calendar-personal-notes", JSON.stringify(personalNotes));
    } catch {}
  }, [personalNotes]);

  // Tổng hợp sự kiện: sự kiện lịch sử văn hóa đã kiểm chứng + ngày cá nhân người dùng thực sự lưu
  const allEvents = [...SAMPLE_CALENDAR_EVENTS, ...personalNotes];
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
  };

  const handleNextMonth = () => {
    if (selectedMonth === 12) {
      setSelectedMonth(1);
      setSelectedYear((prev) => prev + 1);
    } else {
      setSelectedMonth((prev) => prev + 1);
    }
  };

  const handleResetToday = () => {
    setSelectedMonth(10);
    setSelectedYear(2024);
    setSelectedDay(17); // Ngày Rằm tháng 9
  };

  const handleAddPersonalNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoteTitle.trim()) return;

    const lunarInfo = OCTOBER_2024_LUNAR_MAP[selectedDay];
    const lunarStr = lunarInfo
      ? `Ngày ${lunarInfo.lunarDay}/${lunarInfo.lunarMonth} Âm lịch`
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

    setPersonalNotes((prev) => [newNote, ...prev]);
    setNewNoteTitle("");
    setNewNoteDesc("");
    setShowAddModal(false);
  };

  const handleDeleteNote = (noteId: string) => {
    setPersonalNotes((prev) => prev.filter((n) => n.id !== noteId));
  };

  // Các sự kiện hiển thị cho ngày được chọn (hoặc toàn bộ danh sách khi chọn tab "Ngày tôi lưu")
  const selectedDayEvents = (activeFilter === "personal"
    ? personalNotes
    : allEvents.filter((e) => e.day === selectedDay && e.month === selectedMonth && e.year === selectedYear)
  ).filter((e) => (activeFilter === "all" ? true : e.type === activeFilter));

  // Dữ liệu lưới lịch Tháng 10/2024 (ngày 01/10/2024 là Thứ Ba -> Thứ Hai trước đó là ngày 30/9)
  const calendarGridDays = [
    { day: 30, isCurrentMonth: false, month: 9, lunarText: "28/8" },
    { day: 1, isCurrentMonth: true, month: 10, lunarText: "29/8" },
    { day: 2, isCurrentMonth: true, month: 10, lunarText: "30/8", badge: "Hội Katê", type: "festival" },
    { day: 3, isCurrentMonth: true, month: 10, lunarText: "01/9", badge: "Mùng 1/9 AL", hasDot: true, type: "custom" },
    { day: 4, isCurrentMonth: true, month: 10, lunarText: "02/9" },
    { day: 5, isCurrentMonth: true, month: 10, lunarText: "03/9" },
    { day: 6, isCurrentMonth: true, month: 10, lunarText: "04/9" },

    { day: 7, isCurrentMonth: true, month: 10, lunarText: "05/9" },
    { day: 8, isCurrentMonth: true, month: 10, lunarText: "06/9", subText: "Hàn Lộ" },
    { day: 9, isCurrentMonth: true, month: 10, lunarText: "07/9" },
    { day: 10, isCurrentMonth: true, month: 10, lunarText: "08/9" },
    { day: 11, isCurrentMonth: true, month: 10, lunarText: "09/9", badge: "Trùng Cửu 9/9", hasDot: true, type: "festival" },
    { day: 12, isCurrentMonth: true, month: 10, lunarText: "10/9" },
    { day: 13, isCurrentMonth: true, month: 10, lunarText: "11/9" },

    { day: 14, isCurrentMonth: true, month: 10, lunarText: "12/9" },
    { day: 15, isCurrentMonth: true, month: 10, lunarText: "13/9", badge: "Hội Chùa Keo", type: "festival" },
    { day: 16, isCurrentMonth: true, month: 10, lunarText: "14/9", subText: "Cận Rằm" },
    {
      day: 17,
      isCurrentMonth: true,
      month: 10,
      lunarText: "15/9",
      badge: "RẰM THÁNG 9",
      isSpecial: true,
      hasDot: true,
      type: "custom",
    },
    { day: 18, isCurrentMonth: true, month: 10, lunarText: "16/9" },
    { day: 19, isCurrentMonth: true, month: 10, lunarText: "17/9" },
    { day: 20, isCurrentMonth: true, month: 10, lunarText: "18/9" },

    { day: 21, isCurrentMonth: true, month: 10, lunarText: "19/9" },
    { day: 22, isCurrentMonth: true, month: 10, lunarText: "20/9" },
    { day: 23, isCurrentMonth: true, month: 10, lunarText: "21/9", subText: "Sương Giáng" },
    { day: 24, isCurrentMonth: true, month: 10, lunarText: "22/9" },
    { day: 25, isCurrentMonth: true, month: 10, lunarText: "23/9" },
    { day: 26, isCurrentMonth: true, month: 10, lunarText: "24/9" },
    { day: 27, isCurrentMonth: true, month: 10, lunarText: "25/9" },

    { day: 28, isCurrentMonth: true, month: 10, lunarText: "26/9" },
    { day: 29, isCurrentMonth: true, month: 10, lunarText: "27/9" },
    { day: 30, isCurrentMonth: true, month: 10, lunarText: "28/9" },
    { day: 31, isCurrentMonth: true, month: 10, lunarText: "29/9", subText: "Cuối tháng" },
    { day: 1, isCurrentMonth: false, month: 11, lunarText: "01/10" },
    { day: 2, isCurrentMonth: false, month: 11, lunarText: "02/10" },
    { day: 3, isCurrentMonth: false, month: 11, lunarText: "03/10" },
  ];

  const currentSelectedLunar = OCTOBER_2024_LUNAR_MAP[selectedDay];

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
              Lịch văn hóa
            </h1>

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
                  <h2 className="font-['Noto_Serif',serif] font-bold text-xl sm:text-2xl text-[#2a2220] min-w-[180px] text-center">
                    Tháng {selectedMonth}, {selectedYear}
                  </h2>
                  <p className="text-[11px] text-[#8e7b73] text-center font-medium">
                    Tháng 9 Giáp Thìn (Năm Rồng)
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
                >
                  <CalendarIcon className="w-3.5 h-3.5 text-[#9e3b2e]" />
                  <span>Về ngày Rằm (17/10)</span>
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

            {/* Calendar Days of Week Header */}
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
                const isSelected = cell.isCurrentMonth && cell.day === selectedDay;
                const hasPersonalNote = personalNotes.some(
                  (n) => n.day === cell.day && n.month === cell.month
                );

                return (
                  <div
                    key={index}
                    onClick={() => {
                      if (cell.isCurrentMonth) {
                        setSelectedDay(cell.day);
                      }
                    }}
                    className={`min-h-[76px] sm:min-h-[92px] p-1.5 sm:p-2 rounded-2xl border transition-all flex flex-col justify-between cursor-pointer ${
                      !cell.isCurrentMonth
                        ? "bg-[#faf6f1]/40 border-transparent text-[#beb0a7] opacity-50"
                        : isSelected
                        ? "bg-[#9e3b2e] border-[#9e3b2e] text-white shadow-md ring-2 ring-[#9e3b2e]/30 scale-[1.02]"
                        : cell.isSpecial
                        ? "bg-[#fffaf4] border-[#e8c7ae] text-[#2c2220] hover:border-[#9e3b2e]"
                        : "bg-[#fffdfa] border-[#ecdcd0] hover:border-[#cfb5a3] hover:bg-[#fdfaf6] text-[#2c2220]"
                    }`}
                  >
                    {/* Top Row: Solar Day Number + Notification Dot */}
                    <div className="flex items-center justify-between">
                      <span
                        className={`text-xs sm:text-sm font-bold font-mono ${
                          isSelected ? "text-white" : ""
                        }`}
                      >
                        {cell.day}
                      </span>

                      <div className="flex items-center gap-1">
                        {hasPersonalNote && (
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

                    {/* Middle: Lunar Day indication */}
                    <div className="text-[10px] leading-tight font-medium opacity-85">
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

                    {/* Bottom: Event Badge if available */}
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
                      : `Ngày ${selectedDay} tháng ${selectedMonth}`}
                  </h3>
                  {activeFilter !== "personal" && currentSelectedLunar && (
                    <p className="text-xs text-[#7e6d65] font-medium mt-0.5">
                      Âm lịch: Ngày {currentSelectedLunar.lunarDay} tháng {currentSelectedLunar.lunarMonth} (Giáp Thìn)
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
                        <p className="mb-2">Ngày này chưa có sự kiện nào trong danh mục lọc.</p>
                        <button
                          onClick={() => setShowAddModal(true)}
                          className="text-[#9e3b2e] font-semibold hover:underline cursor-pointer"
                        >
                          + Thêm ghi chú cá nhân
                        </button>
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
                  Mọi sự kiện đều được đối chiếu theo Lịch Âm Dương thiên văn học Việt Nam và tài liệu
                  văn hóa dân gian chính thống.
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
                  Thêm ghi chú ngày {selectedDay}/{selectedMonth}/2024
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
                  <label className="block text-xs font-semibold text-[#66544d] mb-1.5">
                    Tên sự kiện / Ghi chú của bạn:
                  </label>
                  <input
                    type="text"
                    required
                    value={newNoteTitle}
                    onChange={(e) => setNewNoteTitle(e.target.value)}
                    placeholder="Ví dụ: Giỗ cụ, Thăm ông bà, Ăn cơm chay..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#eddcd0] text-sm outline-none focus:border-[#9e3b2e] focus:ring-1 focus:ring-[#9e3b2e]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#66544d] mb-1.5">
                    Lời dặn dò hoặc ý nghĩa:
                  </label>
                  <textarea
                    rows={3}
                    value={newNoteDesc}
                    onChange={(e) => setNewNoteDesc(e.target.value)}
                    placeholder="Viết vài dòng nhắc nhở bản thân chuẩn bị nếp nhà hoặc thảnh thơi thân tâm..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#eddcd0] text-sm outline-none focus:border-[#9e3b2e] focus:ring-1 focus:ring-[#9e3b2e] resize-none"
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setShowAddModal(false)}
                    className="rounded-xl text-xs"
                  >
                    Hủy
                  </Button>
                  <Button
                    type="submit"
                    size="sm"
                    className="rounded-xl text-xs bg-[#9e3b2e] text-white hover:bg-[#852f24]"
                  >
                    Lưu vào lịch của tôi
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
