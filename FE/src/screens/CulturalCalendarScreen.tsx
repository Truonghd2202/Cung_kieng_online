import React, { useState } from "react";
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
} from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Badge } from "@/src/components/ui/badge";
import { Card } from "@/src/components/ui/card";
import {
  CalendarEventType,
  CalendarEventItem,
  SAMPLE_CALENDAR_EVENTS,
  getEventsForDay,
} from "../data/calendarData";

interface CulturalCalendarScreenProps {
  onGoToToday: () => void;
  onSelectEvent: (eventId: string) => void;
  onGoToRituals: () => void;
  onGoToCultureDetail?: (articleId: string) => void;
}

export const CulturalCalendarScreen: React.FC<CulturalCalendarScreenProps> = ({
  onGoToToday,
  onSelectEvent,
  onGoToRituals,
  onGoToCultureDetail,
}) => {
  // Calendar month state (fixed demo around October 2024, with ability to cycle)
  const [selectedMonth, setSelectedMonth] = useState(10);
  const [selectedYear, setSelectedYear] = useState(2024);
  const [selectedDay, setSelectedDay] = useState<number>(15);
  const [activeFilter, setActiveFilter] = useState<"all" | "custom" | "festival" | "personal">("all");
  const [showAddModal, setShowAddModal] = useState(false);
  const [newNoteTitle, setNewNoteTitle] = useState("");
  const [newNoteDesc, setNewNoteDesc] = useState("");
  const [personalNotes, setPersonalNotes] = useState<CalendarEventItem[]>([]);

  // Count events
  const allEvents = [...SAMPLE_CALENDAR_EVENTS, ...personalNotes];
  const customCount = allEvents.filter((e) => e.type === "custom").length;
  const festivalCount = allEvents.filter((e) => e.type === "festival").length;
  const personalCount = allEvents.filter((e) => e.type === "personal").length;

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
    setSelectedDay(15);
  };

  const handleAddPersonalNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoteTitle.trim()) return;

    const newNote: CalendarEventItem = {
      id: `personal-${Date.now()}`,
      day: selectedDay,
      month: selectedMonth,
      year: selectedYear,
      type: "personal",
      typeLabel: "Ghi chú cá nhân",
      region: "Cá nhân",
      title: newNoteTitle.trim(),
      shortDesc: newNoteDesc.trim() || "Khoảng lặng dành riêng cho bản thân để lắng lòng.",
      lunarDate: "Dấu mốc tự lưu",
    };

    setPersonalNotes((prev) => [...prev, newNote]);
    setNewNoteTitle("");
    setNewNoteDesc("");
    setShowAddModal(false);
  };

  // Selected Day's events
  const selectedDayEvents = allEvents
    .filter((e) => e.day === selectedDay && e.month === selectedMonth && e.year === selectedYear)
    .filter((e) => (activeFilter === "all" ? true : e.type === activeFilter));

  // Calendar cells definition for October 2024 (starts on Tuesday = day 2 of week)
  // Weeks representation
  const calendarDays = [
    { day: 30, isCurrentMonth: false, month: 9 },
    { day: 1, isCurrentMonth: true, month: 10 },
    { day: 2, isCurrentMonth: true, month: 10, badge: "Mùng một đ..", hasDot: true, type: "custom" },
    { day: 3, isCurrentMonth: true, month: 10 },
    { day: 4, isCurrentMonth: true, month: 10 },
    { day: 5, isCurrentMonth: true, month: 10, badge: "Hội Đền Kiếp..", type: "festival" },
    { day: 6, isCurrentMonth: true, month: 10 },

    { day: 7, isCurrentMonth: true, month: 10 },
    { day: 8, isCurrentMonth: true, month: 10 },
    { day: 9, isCurrentMonth: true, month: 10 },
    { day: 10, isCurrentMonth: true, month: 10 },
    { day: 11, isCurrentMonth: true, month: 10, badge: "Chuẩn bị nếp..", hasDot: true, type: "custom" },
    { day: 12, isCurrentMonth: true, month: 10 },
    { day: 13, isCurrentMonth: true, month: 10 },

    { day: 14, isCurrentMonth: true, month: 10, subText: "Cận rằm" },
    {
      day: 15,
      isCurrentMonth: true,
      month: 10,
      badge: "Ngày Rằm • 3 sự kiện nổi bật",
      isSpecial: true,
      hasDot: true,
      type: "custom",
    },
    { day: 16, isCurrentMonth: true, month: 10 },
    { day: 17, isCurrentMonth: true, month: 10 },
    { day: 18, isCurrentMonth: true, month: 10 },
    { day: 19, isCurrentMonth: true, month: 10 },
    { day: 20, isCurrentMonth: true, month: 10, badge: "Hội làng ven..", type: "festival" },

    { day: 21, isCurrentMonth: true, month: 10 },
    { day: 22, isCurrentMonth: true, month: 10 },
    { day: 23, isCurrentMonth: true, month: 10 },
    { day: 24, isCurrentMonth: true, month: 10 },
    { day: 25, isCurrentMonth: true, month: 10 },
    { day: 26, isCurrentMonth: true, month: 10, badge: "Thăm ông bà", type: "personal" },
    { day: 27, isCurrentMonth: true, month: 10 },

    { day: 28, isCurrentMonth: true, month: 10 },
    { day: 29, isCurrentMonth: true, month: 10 },
    { day: 30, isCurrentMonth: true, month: 10 },
    { day: 31, isCurrentMonth: true, month: 10, badge: "Mùng một cu..", hasDot: true, type: "custom" },
    { day: 1, isCurrentMonth: false, month: 11 },
    { day: 2, isCurrentMonth: false, month: 11 },
    { day: 3, isCurrentMonth: false, month: 11 },
  ];

  return (
    <div className="w-full min-h-screen bg-[#fcf8f2] text-[#2e2624] font-['Be_Vietnam_Pro',sans-serif]">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 pb-20">
        {/* Top Breadcrumb & Status Ribbon */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 text-xs text-[#8a7971]">
          <div className="flex items-center gap-2">
            <span
              onClick={onGoToToday}
              className="hover:text-[#9e3b2e] cursor-pointer transition-colors"
            >
              Hôm nay
            </span>
            <span>/</span>
            <span className="text-[#9e3b2e] font-semibold">Lịch văn hóa</span>
          </div>

          <div className="flex items-center gap-1.5 uppercase font-semibold text-[11px] text-[#938279]">
            <span className="text-[#9e3b2e]">✤</span>
            <span>CHIÊM NGHIỆM THỜI GIAN • TÌM HIỂU & CHUẨN BỊ NẾP SỐNG</span>
          </div>
        </div>

        {/* Header Title Section */}
        <div className="mb-6">
          <div className="text-xs uppercase font-bold tracking-wider text-[#9e3b2e] mb-1.5 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#9e3b2e]"></span>
            <span>DÒNG THỜI GIAN VĂN HÓA</span>
          </div>

          <h1 className="font-['Noto_Serif',serif] font-bold text-3xl sm:text-4xl text-[#2a2220] leading-tight mb-2">
            Lịch văn hóa
          </h1>

          <p className="text-sm sm:text-base text-[#6f5e57] max-w-3xl leading-relaxed">
            Theo dõi nhịp điệu của đất trời, nếp xưa ngày lễ hội và những dấu mốc an yên bạn lưu giữ
            cho riêng mình.
          </p>

          <div className="flex items-center justify-center my-6">
            <div className="h-px w-16 bg-[#e7d8cb]"></div>
            <div className="mx-3 text-[#be8e5a] text-sm">❦</div>
            <div className="h-px w-16 bg-[#e7d8cb]"></div>
          </div>
        </div>

        {/* Main 2-Column Layout matching Image 1 */}
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

                <h2 className="font-['Noto_Serif',serif] font-bold text-xl sm:text-2xl text-[#2a2220] min-w-[180px] text-center">
                  Tháng {selectedMonth}, {selectedYear}
                </h2>

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
                  <span>Về hôm nay</span>
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
              {calendarDays.map((cell, index) => {
                const isSelected = cell.isCurrentMonth && cell.day === selectedDay;
                const dayEvents = cell.isCurrentMonth
                  ? allEvents.filter(
                      (e) => e.day === cell.day && e.month === cell.month && e.year === selectedYear
                    )
                  : [];

                return (
                  <div
                    key={index}
                    onClick={() => {
                      if (cell.isCurrentMonth) {
                        setSelectedDay(cell.day);
                      }
                    }}
                    className={`min-h-[72px] sm:min-h-[88px] p-1.5 sm:p-2 rounded-2xl border transition-all flex flex-col justify-between cursor-pointer ${
                      !cell.isCurrentMonth
                        ? "bg-[#faf6f1]/40 border-transparent text-[#beb0a7] opacity-60"
                        : isSelected
                        ? "bg-[#9e3b2e] border-[#9e3b2e] text-white shadow-md ring-2 ring-[#9e3b2e]/30 scale-[1.02]"
                        : "bg-[#fffdfa] border-[#ecdcd0] hover:border-[#cfb5a3] hover:bg-[#fdfaf6] text-[#2c2220]"
                    }`}
                  >
                    {/* Top Row in cell */}
                    <div className="flex items-center justify-between">
                      <span
                        className={`text-xs sm:text-sm font-bold font-mono ${
                          isSelected ? "text-white" : ""
                        }`}
                      >
                        {cell.day}
                      </span>

                      {/* Small notification dot */}
                      {cell.hasDot && (
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            isSelected ? "bg-amber-300" : "bg-[#9e3b2e]"
                          }`}
                        />
                      )}
                    </div>

                    {/* Subtext or Lunar Indicator */}
                    {cell.subText && (
                      <span
                        className={`text-[9px] font-medium leading-none ${
                          isSelected ? "text-white/80" : "text-[#9d8a82]"
                        }`}
                      >
                        {cell.subText}
                      </span>
                    )}

                    {/* Event Pill Badge inside cell */}
                    {cell.badge && (
                      <div
                        className={`text-[9px] sm:text-[10px] font-semibold px-1 sm:px-1.5 py-0.5 rounded-md truncate mt-1 ${
                          isSelected
                            ? "bg-white/20 text-white font-bold"
                            : cell.type === "festival"
                            ? "bg-[#fef3c7] text-[#92400e]"
                            : cell.type === "personal"
                            ? "bg-[#e0e7ff] text-[#3730a3]"
                            : "bg-[#faede2] text-[#8d3125]"
                        }`}
                        title={cell.badge}
                      >
                        {cell.badge}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Calendar Legend Bar */}
            <div className="mt-6 pt-4 border-t border-[#f3e6da] flex flex-wrap items-center justify-between gap-3 text-xs text-[#8c7b74]">
              <div className="flex items-center gap-4 flex-wrap">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#9e3b2e]"></span>
                  <span>Phong tục truyền thống</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                  <span>Lễ hội dân gian</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-indigo-500"></span>
                  <span>Dấu mốc riêng tôi</span>
                </div>
              </div>

              <span className="italic text-[11px] text-[#9d8d85]">
                * Nhấn vào từng ô để mở rộng sự kiện
              </span>
            </div>
          </div>

          {/* Right Column (4 cols): Selected Day Detail Sidebar */}
          <div className="lg:col-span-4 space-y-5">
            <Card className="p-6 rounded-3xl bg-[#fbf5ee] border border-[#eddcd0] shadow-xs">
              {/* Header with selected day badge */}
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#ebdcd0]">
                <div>
                  <div className="text-[10px] uppercase font-bold tracking-wider text-[#9e3b2e] mb-0.5">
                    CHI TIẾT NGÀY ĐÃ CHỌN
                  </div>
                  <h3 className="font-['Noto_Serif',serif] font-bold text-lg sm:text-xl text-[#2a2220]">
                    {selectedDay === 15 ? "Ngày Rằm (15 Tháng 10)" : `Ngày ${selectedDay} Tháng ${selectedMonth}`}
                  </h3>
                </div>

                <div className="w-10 h-10 rounded-2xl bg-[#faede2] border border-[#ebd4c2] flex items-center justify-center font-bold text-[#9e3b2e] text-base shrink-0 shadow-2xs">
                  {selectedDay}
                </div>
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

                      <button
                        onClick={() => onSelectEvent(event.id)}
                        className="text-xs font-bold text-[#9e3b2e] hover:underline flex items-center gap-1 self-end cursor-pointer"
                      >
                        <span>Xem chi tiết</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))
                ) : (
                  <div className="p-4 rounded-2xl bg-white/80 border border-dashed border-[#e3d1c3] text-center text-xs text-[#8c7b74] py-6">
                    <p className="mb-2">Ngày này chưa có sự kiện nào trong danh mục lọc.</p>
                    <button
                      onClick={() => setShowAddModal(true)}
                      className="text-[#9e3b2e] font-semibold hover:underline cursor-pointer"
                    >
                      + Thêm ghi chú cá nhân
                    </button>
                  </div>
                )}
              </div>

              {/* Ritual Guide Link Widget */}
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

              {/* Khám phá ngày bình yên Box */}
              <div className="p-4 rounded-2xl bg-white/80 border border-[#eddcd0] text-xs text-[#705e57] leading-relaxed mb-4">
                <div className="font-semibold text-[#2c2220] mb-1 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#9e3b2e]" />
                  <span>Khám phá ngày bình yên</span>
                </div>
                <p className="text-[11px] text-[#86756d]">
                  Hôm nay chưa có mục nào trong lịch — bạn có thể thêm ghi chú văn hóa riêng hoặc
                  chuyển sang ngày khác.
                </p>
              </div>

              {/* Transparency Notice Box */}
              <div className="p-3.5 rounded-2xl bg-[#faf3ec] border border-[#ebdcd0] text-[11px] text-[#82716a] leading-relaxed flex items-start gap-2.5">
                <Info className="w-4 h-4 text-[#9e3b2e] shrink-0 mt-0.5" />
                <div>
                  <strong className="font-semibold text-[#2a2220]">Minh bạch thông tin:</strong>{" "}
                  Nội dung mang tính chất gợi ý tìm hiểu văn hóa dân gian và nếp sống truyền thống.
                  Không đại diện cho can chi bói toán, chiêm tinh số mệnh hay mê tín dị đoan.
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Bottom Banner matching Image 1 */}
        <div className="mt-10 rounded-3xl p-5 sm:p-7 bg-[#fbf5ee] border border-[#eddcd0] flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#faede2] border border-[#ebd5c3] flex items-center justify-center text-[#9e3b2e] shrink-0">
              <Flower2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-['Noto_Serif',serif] font-bold text-base sm:text-lg text-[#2a2220] mb-0.5">
                Gìn giữ nếp xưa trong nhịp sống nay
              </h3>
              <p className="text-xs sm:text-sm text-[#6f5e57]">
                Mỗi mùa lễ hội là dịp hội ngộ cội nguồn, mỗi ngày rằm mùng một là lúc trở về với sự
                an hòa tự thân.
              </p>
            </div>
          </div>

          <Button
            onClick={() => setShowAddModal(true)}
            variant="outline"
            className="border-[#dfc4b1] text-xs font-semibold gap-1.5 py-2.5 px-4 shrink-0 bg-white"
          >
            <Plus className="w-3.5 h-3.5 text-[#9e3b2e]" />
            <span>Thêm ngày lưu riêng</span>
          </Button>
        </div>

        {/* Modal: Thêm ngày lưu riêng */}
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
            <Card className="max-w-md w-full p-6 rounded-3xl bg-white border border-[#eddcd0] shadow-2xl animate-in fade-in zoom-in-95 duration-200">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#f3e6da]">
                <h3 className="font-['Noto_Serif',serif] font-bold text-lg text-[#2a2220]">
                  Thêm dấu mốc ngày {selectedDay}/{selectedMonth}
                </h3>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="w-7 h-7 rounded-full text-xs text-[#9d8d85] hover:text-[#2a2220] flex items-center justify-center cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleAddPersonalNote} className="space-y-4 text-xs">
                <div>
                  <label className="block font-semibold text-[#4e403a] mb-1.5">
                    Tên sự kiện / Lời hẹn cá nhân
                  </label>
                  <input
                    type="text"
                    required
                    value={newNoteTitle}
                    onChange={(e) => setNewNoteTitle(e.target.value)}
                    placeholder="Ví dụ: Giỗ cụ, Thăm hỏi cha mẹ, Ăn chay..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#faf3ec]/70 border border-[#eddcd0] text-xs text-[#2e2624] placeholder-[#a6968e] focus:outline-none focus:ring-1 focus:ring-[#9e3b2e]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-[#4e403a] mb-1.5">
                    Ghi chú chi tiết (nếu có)
                  </label>
                  <textarea
                    rows={3}
                    value={newNoteDesc}
                    onChange={(e) => setNewNoteDesc(e.target.value)}
                    placeholder="Nhắc nhở nếp nhà, sự chuẩn bị hoặc tâm niệm gửi gắm..."
                    className="w-full p-3 rounded-xl bg-[#faf3ec]/70 border border-[#eddcd0] text-xs text-[#2e2624] placeholder-[#a6968e] focus:outline-none focus:ring-1 focus:ring-[#9e3b2e]"
                  />
                </div>

                <div className="flex items-center justify-end gap-2.5 pt-2">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowAddModal(false)}
                    className="text-xs text-[#715f57]"
                  >
                    Hủy
                  </Button>
                  <Button
                    type="submit"
                    variant="default"
                    size="sm"
                    className="text-xs font-semibold"
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
