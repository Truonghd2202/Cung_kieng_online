import React, { useState } from 'react';
import type { ScreenType } from '@/src/types.ts';

interface FamilyCalendarScreenProps {
  onNavigate: (screen: ScreenType) => void;
}

type FilterCategory = 'all' | 'gio-chap' | 'sinh-nhat' | 'hop-ho' | 'cot-moc';
type ViewMode = 'month' | 'week' | 'agenda';

interface CalendarEvent {
  id: string;
  solarDay: number;
  solarMonth: number;
  lunarDay: number;
  lunarMonth: number;
  lunarYearName: string;
  solarDateStr: string;
  title: string;
  category: FilterCategory;
  categoryLabel: string;
  time?: string;
  location?: string;
  host?: string;
  offerings?: string;
  note?: string;
  isImportant?: boolean;
}

export const FamilyCalendarScreen: React.FC<FamilyCalendarScreenProps> = ({ onNavigate }) => {
  const [selectedFilter, setSelectedFilter] = useState<FilterCategory>('all');
  const [viewMode, setViewMode] = useState<ViewMode>('month');
  const [selectedDay, setSelectedDay] = useState<number>(17); // 14 Tháng 7 Âm lịch

  // Danh sách sự kiện trong tháng 7 Âm lịch (Tháng 8/2024 Dương lịch)
  const calendarEvents: CalendarEvent[] = [
    {
      id: 'e1',
      solarDay: 1,
      solarMonth: 8,
      lunarDay: 27,
      lunarMonth: 6,
      lunarYearName: 'Giáp Thìn',
      solarDateStr: 'Thứ Năm, 01/08/2024',
      title: 'Họp Tiểu Ban Từ Đường',
      category: 'hop-ho',
      categoryLabel: 'Họp Họ & Việc Chi Tộc',
      time: '19:30 - 21:00',
      location: 'Từ Đường Chi Trực Lăng',
      host: 'Trưởng Ban Xây Dựng',
    },
    {
      id: 'e2',
      solarDay: 4,
      solarMonth: 8,
      lunarDay: 1,
      lunarMonth: 7,
      lunarYearName: 'Giáp Thìn',
      solarDateStr: 'Chủ Nhật, 04/08/2024',
      title: 'Lễ Sóc Mồng 1 Tháng 7',
      category: 'gio-chap',
      categoryLabel: 'Giỗ Chạp & Tế Tự',
      time: '07:00 - 09:00',
      location: 'Chánh Điện Từ Đường',
      isImportant: true,
    },
    {
      id: 'e3',
      solarDay: 8,
      solarMonth: 8,
      lunarDay: 5,
      lunarMonth: 7,
      lunarYearName: 'Giáp Thìn',
      solarDateStr: 'Thứ Năm, 08/08/2024',
      title: 'Mừng thọ Cụ Bà 90 tuổi',
      category: 'sinh-nhat',
      categoryLabel: 'Sinh Nhật & Mừng Thọ',
      time: '11:00 - 13:30',
      location: 'Tư gia Nhánh 2',
    },
    {
      id: 'e4',
      solarDay: 10,
      solarMonth: 8,
      lunarDay: 7,
      lunarMonth: 7,
      lunarYearName: 'Giáp Thìn',
      solarDateStr: 'Thứ Bảy, 10/08/2024',
      title: 'Kỷ Niệm Sắc Phong 1885',
      category: 'cot-moc',
      categoryLabel: 'Cột Mốc & Điển Tích',
      time: '09:00 - 11:00',
      location: 'Nhà Thờ Tổ',
      isImportant: true,
    },
    {
      id: 'e5',
      solarDay: 14,
      solarMonth: 8,
      lunarDay: 11,
      lunarMonth: 7,
      lunarYearName: 'Giáp Thìn',
      solarDateStr: 'Thứ Tư, 14/08/2024',
      title: 'Khảo sát tôn tạo hậu điện',
      category: 'hop-ho',
      categoryLabel: 'Họp Họ & Việc Chi Tộc',
      time: '15:00 - 17:00',
    },
    {
      id: 'e6',
      solarDay: 17,
      solarMonth: 8,
      lunarDay: 14,
      lunarMonth: 7,
      lunarYearName: 'Giáp Thìn',
      solarDateStr: 'Thứ Bảy, ngày 17 tháng 08 năm 2024',
      title: 'Lễ Khai Mạc Tuần Đại Tế Vu Lan Báo Hiếu',
      category: 'gio-chap',
      categoryLabel: 'Đại Lễ Tế Tự',
      time: '08:30 - 11:30 (Giờ Tỵ)',
      location: 'Nhà Thờ Tổ - Chi Trực Lăng (Hương Trà, TT-Huế)',
      host: 'Chủ tế: Ông Nguyễn Trực Viễn (Trưởng Tộc)',
      offerings: 'Tam sênh, hương hoa trà quả',
      isImportant: true,
    },
    {
      id: 'e7',
      solarDay: 17,
      solarMonth: 8,
      lunarDay: 14,
      lunarMonth: 7,
      lunarYearName: 'Giáp Thìn',
      solarDateStr: 'Thứ Bảy, ngày 17 tháng 08 năm 2024',
      title: 'Chuẩn Bị Lễ Vật Tiền Hiền & Đóng Gói Phẩm Oản',
      category: 'hop-ho',
      categoryLabel: 'Hậu Cần & Việc Họ',
      time: '16:00 - 18:30 (Giờ Thân - Dậu)',
      location: 'Tả Hữu Vu & Bếp Tộc đường',
      host: 'Ban Hậu Cần Chi Phái 3 phụ trách (12 người)',
    },
    {
      id: 'e8',
      solarDay: 18,
      solarMonth: 8,
      lunarDay: 15,
      lunarMonth: 7,
      lunarYearName: 'Giáp Thìn',
      solarDateStr: 'Chủ Nhật, 18/08/2024',
      title: 'Chính Giỗ Cụ Cố Nguyễn Phúc Tự',
      category: 'gio-chap',
      categoryLabel: 'Đại Giỗ Gia Tộc',
      time: '09:00 - 14:00',
      location: 'Nhà Thờ Tổ',
      note: 'Dự kiến 35 mâm cỗ',
      isImportant: true,
    },
    {
      id: 'e9',
      solarDay: 24,
      solarMonth: 8,
      lunarDay: 21,
      lunarMonth: 7,
      lunarYearName: 'Giáp Thìn',
      solarDateStr: 'Thứ Bảy, 24/08/2024',
      title: 'Họp Hội Đồng Gia Tộc Mở Rộng',
      category: 'hop-ho',
      categoryLabel: 'Họp Họ & Việc Chi Tộc',
      time: '14:00 - 17:00',
    },
    {
      id: 'e10',
      solarDay: 30,
      solarMonth: 8,
      lunarDay: 27,
      lunarMonth: 7,
      lunarYearName: 'Giáp Thìn',
      solarDateStr: 'Thứ Sáu, 30/08/2024',
      title: 'Giỗ Bà Cô Năm (Chi 2)',
      category: 'gio-chap',
      categoryLabel: 'Giỗ Chạp Chi Tộc',
      time: '10:30 - 13:00',
      isImportant: true,
    },
  ];

  // 35 ô lịch tháng 8/2024 (Bắt đầu từ Thứ 2 ngày 29/7 đến Chủ Nhật ngày 1/9)
  const monthDays = [
    { solar: 29, lunar: '24/6', canChi: 'Ất Mão', isCurrentMonth: false },
    { solar: 30, lunar: '25/6', canChi: 'Bính Thìn', isCurrentMonth: false },
    { solar: 31, lunar: '26/6', canChi: 'Đinh Tỵ', isCurrentMonth: false },
    { solar: 1, lunar: '27/6', canChi: 'Mậu Ngọ', isCurrentMonth: true },
    { solar: 2, lunar: '28/6', canChi: 'Kỷ Mùi', isCurrentMonth: true },
    { solar: 3, lunar: '29/6', canChi: 'Canh Thân', isCurrentMonth: true },
    { solar: 4, lunar: '01/7', canChi: 'Tân Dậu', isCurrentMonth: true, isSpecialLunar: true, specialText: 'Lễ Sóc Mồng 1' },

    { solar: 5, lunar: '2/7', canChi: 'Nhâm Tuất', isCurrentMonth: true },
    { solar: 6, lunar: '3/7', canChi: 'Quý Hợi', isCurrentMonth: true },
    { solar: 7, lunar: '4/7', canChi: 'Giáp Tý', isCurrentMonth: true },
    { solar: 8, lunar: '5/7', canChi: 'Ất Sửu', isCurrentMonth: true },
    { solar: 9, lunar: '6/7', canChi: 'Bính Dần', isCurrentMonth: true },
    { solar: 10, lunar: '7/7', canChi: 'Đinh Mão', isCurrentMonth: true },
    { solar: 11, lunar: '8/7', canChi: 'Mậu Thìn', isCurrentMonth: true },

    { solar: 12, lunar: '9/7', canChi: 'Kỷ Tỵ', isCurrentMonth: true },
    { solar: 13, lunar: '10/7', canChi: 'Canh Ngọ', isCurrentMonth: true },
    { solar: 14, lunar: '11/7', canChi: 'Tân Mùi', isCurrentMonth: true },
    { solar: 15, lunar: '12/7', canChi: 'Nhâm Thân', isCurrentMonth: true },
    { solar: 16, lunar: '13/7', canChi: 'Quý Dậu', isCurrentMonth: true },
    { solar: 17, lunar: '14/7 ÂL', canChi: 'Giáp Tuất (Lập Thu)', isCurrentMonth: true, isSelectedDefault: true },
    { solar: 18, lunar: '15/7 ÂL', canChi: 'Ất Hợi', isCurrentMonth: true, isFullMoon: true },

    { solar: 19, lunar: '16/7', canChi: 'Bính Tý', isCurrentMonth: true },
    { solar: 20, lunar: '17/7', canChi: 'Đinh Sửu', isCurrentMonth: true },
    { solar: 21, lunar: '18/7', canChi: 'Mậu Dần', isCurrentMonth: true },
    { solar: 22, lunar: '19/7', canChi: 'Kỷ Mão', isCurrentMonth: true },
    { solar: 23, lunar: '20/7', canChi: 'Canh Thìn', isCurrentMonth: true },
    { solar: 24, lunar: '21/7', canChi: 'Tân Tỵ', isCurrentMonth: true },
    { solar: 25, lunar: '22/7', canChi: 'Nhâm Ngọ', isCurrentMonth: true },

    { solar: 26, lunar: '23/7', canChi: 'Quý Mùi', isCurrentMonth: true },
    { solar: 27, lunar: '24/7', canChi: 'Giáp Thân', isCurrentMonth: true },
    { solar: 28, lunar: '25/7', canChi: 'Ất Dậu', isCurrentMonth: true },
    { solar: 29, lunar: '26/7', canChi: 'Bính Tuất', isCurrentMonth: true },
    { solar: 30, lunar: '27/7', canChi: 'Đinh Hợi', isCurrentMonth: true },
    { solar: 31, lunar: '28/7', canChi: 'Mậu Tý', isCurrentMonth: true },
    { solar: 1, lunar: '29/7', canChi: 'Kỷ Sửu', isCurrentMonth: false },
  ];

  // Lọc sự kiện theo ngày được chọn
  const selectedEvents = calendarEvents.filter(
    (e) => e.solarDay === selectedDay && (selectedFilter === 'all' || e.category === selectedFilter)
  );

  return (
    <div className="min-h-screen bg-[#f7eee2] text-[#2b1b15] py-4 px-3 sm:px-5 lg:px-6">
      <div className="max-w-[1560px] mx-auto space-y-4">
        {/* =========================================================
            THANH ĐIỀU HƯỚNG THÁNG & CHẾ ĐỘ XEM TRÊN CÙNG
            ========================================================= */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          {/* Cụm Chọn Tháng Âm Lịch */}
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            <div className="flex items-center rounded-2xl border border-[#dec9b6] bg-[#fdf9f4] px-4 py-2.5 shadow-2xs">
              <button
                type="button"
                className="flex h-7 w-7 items-center justify-center rounded-lg text-[#8a6f62] hover:bg-[#faefe3] hover:text-[#80141d] transition-colors"
                title="Tháng trước"
              >
                <span className="material-symbols-outlined text-[20px]">chevron_left</span>
              </button>

              <div className="px-3 sm:px-5 text-center leading-tight">
                <h1 className="font-serif text-[16px] sm:text-[18px] font-bold text-[#80141d]">
                  Tháng 7 Âm Lịch (Tháng Cô Hồn • Đại Lễ Vu Lan)
                </h1>
                <p className="mt-0.5 text-[11px] sm:text-[11.5px] font-medium text-[#715b50]">
                  Tháng 8 - 9 Dương Lịch 2024 • Năm Giáp Thìn
                </p>
              </div>

              <button
                type="button"
                className="flex h-7 w-7 items-center justify-center rounded-lg text-[#8a6f62] hover:bg-[#faefe3] hover:text-[#80141d] transition-colors"
                title="Tháng tiếp theo"
              >
                <span className="material-symbols-outlined text-[20px]">chevron_right</span>
              </button>
            </div>

            {/* Nút Về Hôm Nay */}
            <button
              type="button"
              onClick={() => setSelectedDay(17)}
              className="h-10 px-4 rounded-xl border border-[#dec9b6] bg-[#fdf9f4] text-[12.5px] font-bold text-[#4a352a] hover:border-[#80141d] hover:bg-[#faefe3] hover:text-[#80141d] transition-all shadow-2xs whitespace-nowrap"
            >
              Về Hôm Nay
            </button>
          </div>

          {/* Cụm Chế độ xem & Thêm sự kiện mới */}
          <div className="flex items-center gap-2.5 shrink-0 self-end lg:self-auto">
            {/* Bộ chuyển đổi chế độ xem */}
            <div className="flex items-center rounded-xl border border-[#dec9b6] bg-[#fdf9f4] p-1 shadow-2xs">
              <button
                type="button"
                onClick={() => setViewMode('month')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] font-bold transition-all ${
                  viewMode === 'month'
                    ? 'bg-[#80141d] text-white shadow-xs'
                    : 'text-[#543e34] hover:bg-[#faefe3]'
                }`}
              >
                <span className="material-symbols-outlined text-[16px]">grid_view</span>
                <span>Theo Tháng</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode('week')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] font-bold transition-all ${
                  viewMode === 'week'
                    ? 'bg-[#80141d] text-white shadow-xs'
                    : 'text-[#543e34] hover:bg-[#faefe3]'
                }`}
              >
                <span className="material-symbols-outlined text-[16px]">view_week</span>
                <span>Theo Tuần</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode('agenda')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] font-bold transition-all ${
                  viewMode === 'agenda'
                    ? 'bg-[#80141d] text-white shadow-xs'
                    : 'text-[#543e34] hover:bg-[#faefe3]'
                }`}
              >
                <span className="material-symbols-outlined text-[16px]">format_list_bulleted</span>
                <span>Lịch Trình</span>
              </button>
            </div>

            {/* Nút Thêm Sự Kiện Mới */}
            <button
              type="button"
              onClick={() => onNavigate('them-su-kien')}
              className="flex items-center gap-1.5 h-10 px-4 rounded-xl bg-[#80141d] text-white text-[12.5px] font-bold hover:bg-[#681017] transition-all shadow-2xs active:scale-[0.98] whitespace-nowrap"
            >
              <span className="material-symbols-outlined text-[17px]">add_circle</span>
              <span>Thêm Sự Kiện Mới</span>
            </button>
          </div>
        </div>

        {/* =========================================================
            THANH BỘ LỌC PHÂN LOẠI SỰ VỤ
            ========================================================= */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1 text-xs">
          <div className="flex items-center gap-1.5 font-bold text-[#715b50] mr-1 shrink-0">
            <span className="material-symbols-outlined text-[16px]">filter_list</span>
            <span>Phân loại sự vụ:</span>
          </div>

          <button
            type="button"
            onClick={() => setSelectedFilter('all')}
            className={`px-3 py-1.5 rounded-full font-bold transition-all shrink-0 ${
              selectedFilter === 'all'
                ? 'bg-[#2b1b15] text-white shadow-xs'
                : 'bg-[#fdf9f4] border border-[#dec9b6] text-[#543e34] hover:border-[#80141d]'
            }`}
          >
            Tất cả 18
          </button>

          <button
            type="button"
            onClick={() => setSelectedFilter('gio-chap')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full font-semibold transition-all shrink-0 ${
              selectedFilter === 'gio-chap'
                ? 'bg-[#80141d] text-white shadow-xs'
                : 'bg-[#fdf9f4] border border-[#dec9b6] text-[#543e34] hover:border-[#80141d]'
            }`}
          >
            <span className="h-2 w-2 rounded-full bg-[#80141d]" />
            <span>Giỗ Chạp &amp; Tế Tự 6</span>
          </button>

          <button
            type="button"
            onClick={() => setSelectedFilter('sinh-nhat')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full font-semibold transition-all shrink-0 ${
              selectedFilter === 'sinh-nhat'
                ? 'bg-[#c9892c] text-white shadow-xs'
                : 'bg-[#fdf9f4] border border-[#dec9b6] text-[#543e34] hover:border-[#80141d]'
            }`}
          >
            <span className="h-2 w-2 rounded-full bg-[#c9892c]" />
            <span>Sinh Nhật &amp; Mừng Thọ 5</span>
          </button>

          <button
            type="button"
            onClick={() => setSelectedFilter('hop-ho')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full font-semibold transition-all shrink-0 ${
              selectedFilter === 'hop-ho'
                ? 'bg-[#a35c34] text-white shadow-xs'
                : 'bg-[#fdf9f4] border border-[#dec9b6] text-[#543e34] hover:border-[#80141d]'
            }`}
          >
            <span className="h-2 w-2 rounded-full bg-[#d9825b]" />
            <span>Họp Họ &amp; Việc Chi Tộc 4</span>
          </button>

          <button
            type="button"
            onClick={() => setSelectedFilter('cot-moc')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full font-semibold transition-all shrink-0 ${
              selectedFilter === 'cot-moc'
                ? 'bg-[#5b392d] text-white shadow-xs'
                : 'bg-[#fdf9f4] border border-[#dec9b6] text-[#543e34] hover:border-[#80141d]'
            }`}
          >
            <span className="h-2 w-2 rounded-full bg-[#5b392d]" />
            <span>Cột Mốc &amp; Điển Tích 3</span>
          </button>
        </div>

        {/* =========================================================
            BỐ CỤC 2 CỘT: BÊN TRÁI LÀ LỊCH THÁNG - BÊN PHẢI LÀ CHI TIẾT
            ========================================================= */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 items-start">
          {/* =======================================================
              CỘT TRÁI (8/12): LƯỚI LỊCH THÁNG 7 ÂM LỊCH
              ======================================================= */}
          <div className="xl:col-span-8 rounded-2xl border border-[#dec9b6] bg-[#fdf9f4] p-3 sm:p-4 shadow-xs">
            {/* Tiêu đề Thứ trong tuần */}
            <div className="grid grid-cols-7 gap-1.5 sm:gap-2 mb-2 text-center">
              {['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'Chủ Nhật'].map((day, idx) => (
                <div
                  key={day}
                  className={`py-2 text-[12px] sm:text-[13px] font-serif font-bold ${
                    idx === 6 ? 'text-[#80141d] dark:text-[#ffa0a8]' : 'text-[#4a352a] dark:text-white'
                  }`}
                >
                  {day}
                </div>
              ))}
            </div>

            {/* Lưới 35 ô ngày */}
            <div className="grid grid-cols-7 gap-1.5 sm:gap-2">
              {monthDays.map((d, index) => {
                const dayEvents = calendarEvents.filter(
                  (e) => e.solarDay === d.solar && d.isCurrentMonth
                );
                const isSelected = selectedDay === d.solar && d.isCurrentMonth;
                const hasSelectedEvent = dayEvents.length > 0;

                return (
                  <button
                    key={`${d.solar}-${d.canChi}-${index}`}
                    type="button"
                    onClick={() => d.isCurrentMonth && setSelectedDay(d.solar)}
                    className={`calendar-day-cell relative min-h-[96px] sm:min-h-[105px] rounded-xl p-1.5 sm:p-2 text-left transition-all flex flex-col justify-between border cursor-pointer ${
                      !d.isCurrentMonth
                        ? 'other-month opacity-40 bg-[#f9f2e9] border-[#e8dacd] dark:bg-[#150608] dark:border-[#2d0b10]'
                        : isSelected
                        ? 'selected bg-[#faefe3] border-2 border-[#80141d] shadow-sm ring-1 ring-[#80141d]/30 dark:bg-[#3d141a] dark:border-[#ffa0a8]'
                        : 'bg-[#fffefc] border-[#ebdcd0] hover:border-[#c9892c] hover:bg-[#faf4ed] dark:bg-[#200a0e] dark:border-[#3d141a] dark:hover:bg-[#2e0e14]'
                    }`}
                  >
                    {/* Hàng trên: Ngày Dương & Ngày Âm */}
                    <div className="flex items-start justify-between w-full">
                      <span
                        className={`text-[13px] sm:text-[14px] font-bold leading-none ${
                          isSelected
                            ? 'flex h-5.5 w-5.5 items-center justify-center rounded-full bg-[#80141d] text-white text-[12px]'
                            : d.solar === 4 && d.isCurrentMonth
                            ? 'text-[#80141d] dark:text-[#ffa0a8]'
                            : 'text-[#2b1b15] dark:text-white'
                        }`}
                      >
                        {d.solar}
                      </span>
                      <span
                        className={`text-[10px] sm:text-[11px] font-semibold leading-none ${
                          d.isSpecialLunar || d.isFullMoon || isSelected
                            ? 'text-[#80141d] font-bold dark:text-[#ffa0a8]'
                            : 'text-[#8a6f62] dark:text-[#dec9b6]'
                        }`}
                      >
                        {d.lunar}
                      </span>
                    </div>

                    {/* Vùng sự kiện nằm ở giữa ô */}
                    <div className="my-1 space-y-1 w-full min-h-[26px]">
                      {d.isSpecialLunar && (
                        <div className="rounded px-1.5 py-0.5 bg-[#80141d] text-white text-[9px] font-bold truncate">
                          {d.specialText}
                        </div>
                      )}

                      {/* Các sự kiện đặc thù */}
                      {d.solar === 1 && d.isCurrentMonth && (
                        <div className="rounded px-1 py-0.5 bg-[#faefe3] border border-[#e8cbb4] text-[#a35c34] dark:bg-[#2a0e13] dark:border-[#4d161d] dark:text-[#f5c278] text-[9px] font-semibold truncate">
                          Họp Tiểu Ban Từ...
                        </div>
                      )}
                      {d.solar === 8 && d.isCurrentMonth && (
                        <div className="rounded px-1 py-0.5 bg-[#fdf2e8] border border-[#f0d3bc] text-[#c9892c] dark:bg-[#2a0e13] dark:border-[#4d161d] dark:text-[#f5c278] text-[9px] font-semibold truncate">
                          Mừng thọ Cụ Bà...
                        </div>
                      )}
                      {d.solar === 10 && d.isCurrentMonth && (
                        <div className="rounded px-1 py-0.5 bg-[#5b392d] text-white text-[9px] font-semibold truncate">
                          Kỷ Niệm Sắc Pho...
                        </div>
                      )}
                      {d.solar === 14 && d.isCurrentMonth && (
                        <div className="rounded px-1 py-0.5 bg-[#faefe3] text-[#8a6f62] dark:bg-[#2a0e13] dark:text-[#dec9b6] text-[9px] font-medium truncate">
                          Khảo sát tôn tạo...
                        </div>
                      )}
                      {d.solar === 17 && d.isCurrentMonth && (
                        <div className="space-y-0.5">
                          <div className="rounded px-1.5 py-0.5 bg-[#80141d] text-white text-[9px] font-bold truncate">
                            Khai Mạc Tuần ...
                          </div>
                          <span className="block text-[8px] text-[#80141d] dark:text-[#ffa0a8] font-medium truncate">
                            Lễ vật tiền hiền
                          </span>
                        </div>
                      )}
                      {d.solar === 18 && d.isCurrentMonth && (
                        <div className="space-y-0.5">
                          <div className="rounded px-1.5 py-0.5 bg-[#5b191d] text-white text-[9px] font-bold truncate">
                            Giỗ Cụ Cố Phúc...
                          </div>
                          <span className="block text-[8px] text-[#a35c34] dark:text-[#f5c278] font-medium truncate">
                            Lễ Vu Lan Đại Báo...
                          </span>
                        </div>
                      )}
                      {d.solar === 24 && d.isCurrentMonth && (
                        <div className="rounded px-1 py-0.5 bg-[#faefe3] border border-[#e8cbb4] text-[#a35c34] dark:bg-[#2a0e13] dark:border-[#4d161d] dark:text-[#f5c278] text-[9px] font-semibold truncate">
                          Họp Hội Đồng Gi...
                        </div>
                      )}
                      {d.solar === 30 && d.isCurrentMonth && (
                        <div className="rounded px-1.5 py-0.5 bg-[#80141d] text-white text-[9px] font-bold truncate">
                          Giỗ Bà Cô Năm
                        </div>
                      )}
                    </div>

                    {/* Hàng dưới: Can Chi ngày */}
                    <div className="text-[9px] sm:text-[9.5px] text-[#715b50] dark:text-[#dec9b6] truncate leading-none">
                      {d.canChi}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Chú giải dưới đáy lịch */}
            <div className="mt-4 pt-3 border-t border-[#ebdcd0] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11.5px] text-[#715b50]">
              <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
                <span className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#80141d]" />
                  <span>Giỗ chạp / Tế tự</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#c9892c]" />
                  <span>Sinh nhật / Mừng thọ</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#d9825b]" />
                  <span>Việc họ &amp; Họp chi</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#5b392d]" />
                  <span>Điển tích / Sắc phong</span>
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-[11px] italic text-[#8a6f62]">
                <span className="material-symbols-outlined text-[15px]">schedule</span>
                <span>Lịch Âm cập nhật chính xác theo lịch thiên văn Khâm Thiên Giám truyền thống</span>
              </div>
            </div>
          </div>

          {/* =======================================================
              CỘT PHẢI (4/12): THÔNG TIN NGÀY ĐƯỢC CHỌN & SỰ VỤ
              ======================================================= */}
          <div className="xl:col-span-4 space-y-4">
            {/* Panel Ngày Được Chọn */}
            <div className="rounded-2xl border border-[#dec9b6] bg-[#fdf9f4] p-4 sm:p-5 shadow-xs space-y-4">
              {/* Header Panel */}
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="inline-block px-2.5 py-0.5 rounded-md bg-[#80141d]/10 text-[#80141d] text-[10px] font-bold uppercase tracking-wider">
                    NGÀY ĐƯỢC CHỌN
                  </span>
                  <h2 className="mt-1.5 font-serif text-[24px] sm:text-[28px] font-bold text-[#80141d] leading-none">
                    {selectedDay === 17 ? '14 Tháng 7 Âm Lịch' : `Ngày ${selectedDay} Tháng 8 Dương Lịch`}
                  </h2>
                  <p className="mt-1 text-[12.5px] font-semibold text-[#543e34]">
                    {selectedDay === 17
                      ? 'Thứ Bảy, ngày 17 tháng 08 năm 2024'
                      : `Dương lịch: Ngày ${selectedDay}/08/2024`}
                  </p>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-[10px] uppercase font-bold text-[#8a6f62]">TIẾT KHÍ</span>
                  <div className="font-serif text-[18px] font-bold text-[#2b1b15] leading-none mt-0.5">
                    Lập Thu
                  </div>
                </div>
              </div>

              {/* Can Chi Ngày & Tháng */}
              <div className="grid grid-cols-2 gap-2 text-center">
                <div className="rounded-xl border border-[#ebdcd0] bg-[#f7eee2] dark:bg-[#1e090c] dark:border-[#3d141a] p-2">
                  <span className="block text-[9.5px] text-[#8a6f62] dark:text-[#dec9b6] font-bold uppercase">
                    Can Chi Ngày
                  </span>
                  <strong className="mt-0.5 block font-serif text-[13.5px] font-bold text-[#2b1b15] dark:text-white">
                    Giáp Tuất
                  </strong>
                </div>
                <div className="rounded-xl border border-[#ebdcd0] bg-[#f7eee2] dark:bg-[#1e090c] dark:border-[#3d141a] p-2">
                  <span className="block text-[9.5px] text-[#8a6f62] dark:text-[#dec9b6] font-bold uppercase">
                    Can Chi Tháng
                  </span>
                  <strong className="mt-0.5 block font-serif text-[13.5px] font-bold text-[#2b1b15] dark:text-white">
                    Nhâm Thân
                  </strong>
                </div>
              </div>

              {/* Giờ Hoàng Đạo Truyền Thống */}
              <div className="rounded-xl border border-[#ebdcd0] bg-[#faf3ea] dark:bg-[#1e090c] dark:border-[#3d141a] p-2.5">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10.5px] font-bold text-[#715b50] dark:text-white/80">
                    Giờ Hoàng Đạo Truyền Thống:
                  </span>
                  <span className="px-1.5 py-0.2 rounded bg-[#c9892c]/20 text-[#80141d] dark:bg-[#402a10] dark:text-[#f5c278] font-bold text-[9.5px]">
                    Cát Nhật
                  </span>
                </div>
                <div className="text-[11px] text-[#543e34] dark:text-white/80 leading-relaxed font-medium">
                  <span className="font-bold text-[#80141d] dark:text-[#ffa0a8]">Tý</span> (23-01) •{' '}
                  <span className="font-bold text-[#80141d] dark:text-[#ffa0a8]">Dần</span> (03-05) •{' '}
                  <span className="font-bold text-[#80141d] dark:text-[#ffa0a8]">Mão</span> (05-07) •{' '}
                  <span className="font-bold text-[#80141d] dark:text-[#ffa0a8]">Ngọ</span> (11-13) •{' '}
                  <span className="font-bold text-[#80141d] dark:text-[#ffa0a8]">Mùi</span> (13-15) •{' '}
                  <span className="font-bold text-[#80141d] dark:text-[#ffa0a8]">Dậu</span> (17-19)
                </div>
              </div>

              {/* Trạng thái nhắc nhở SMS/Zalo */}
              <div className="flex items-center gap-2.5 rounded-xl border border-[#dec9b6] bg-[#faefe3] dark:bg-[#1e090c] dark:border-[#3d141a] p-2.5 text-[11.5px] text-[#543e34] dark:text-white/85">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#80141d] text-white">
                  <span className="material-symbols-outlined text-[14px]">send</span>
                </span>
                <div className="leading-tight">
                  <strong className="block text-[#80141d] dark:text-[#ffa0a8] font-bold text-[11px]">
                    Đã gửi tin nhắn nhắc giỗ dòng họ
                  </strong>
                  <span className="text-[10px] text-[#715b50] dark:text-[#dec9b6]">
                    SMS/Zalo đã chuyển tới 142 thành viên gia tộc
                  </span>
                </div>
              </div>

              {/* Danh sách Sự Cố & Nghi Lễ Trong Ngày */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-[15px] font-bold text-[#2b1b15]">
                    Sự Cố &amp; Nghi Lễ Trong Ngày
                  </h3>
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-[#80141d]/10 text-[#80141d]">
                    {selectedEvents.length} sự vụ
                  </span>
                </div>

                {selectedEvents.length > 0 ? (
                  selectedEvents.map((ev, index) => (
                    <div
                      key={ev.id}
                      className="rounded-xl border border-[#ebdcd0] bg-white p-3.5 shadow-2xs space-y-2 hover:border-[#80141d] transition-colors"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <span
                          className={`text-[9.5px] font-bold px-2 py-0.5 rounded-md ${
                            ev.isImportant
                              ? 'bg-[#80141d] text-white'
                              : 'bg-[#faefe3] text-[#80141d]'
                          }`}
                        >
                          {ev.categoryLabel}
                        </span>
                        <div className="flex items-center gap-1 text-[#8a6f62]">
                          <button
                            type="button"
                            className="p-1 hover:text-[#80141d]"
                            title="Chỉnh sửa"
                          >
                            <span className="material-symbols-outlined text-[15px]">edit</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => onNavigate('chi-tiet-gio-chap')}
                            className="p-1 hover:text-[#80141d]"
                            title="Xem chi tiết"
                          >
                            <span className="material-symbols-outlined text-[15px]">open_in_new</span>
                          </button>
                        </div>
                      </div>

                      <h4 className="font-serif text-[14.5px] font-bold text-[#80141d] leading-snug">
                        {ev.title}
                      </h4>

                      <div className="space-y-1 text-[11.5px] text-[#543e34]">
                        {ev.time && (
                          <div className="flex items-center gap-1.5">
                            <span className="material-symbols-outlined text-[15px] text-[#8a6f62]">
                              schedule
                            </span>
                            <span>{ev.time}</span>
                          </div>
                        )}
                        {ev.location && (
                          <div className="flex items-center gap-1.5">
                            <span className="material-symbols-outlined text-[15px] text-[#8a6f62]">
                              location_on
                            </span>
                            <span>{ev.location}</span>
                          </div>
                        )}
                        {ev.host && (
                          <div className="flex items-center gap-1.5">
                            <span className="material-symbols-outlined text-[15px] text-[#8a6f62]">
                              person
                            </span>
                            <span>{ev.host}</span>
                          </div>
                        )}
                        {ev.offerings && (
                          <div className="flex items-center justify-between text-[11px] pt-1 border-t border-[#ebdcd0]/70">
                            <span className="text-[#715b50]">
                              <strong>Lễ vật:</strong> {ev.offerings}
                            </span>
                            <button
                              type="button"
                              onClick={() => onNavigate('cam-nang-nghi-le')}
                              className="text-[#80141d] font-bold hover:underline"
                            >
                              Xem văn khấn →
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="rounded-xl border border-dashed border-[#dec9b6] bg-[#faefe3]/50 p-6 text-center text-[#8a6f62] text-[12px]">
                    <span className="material-symbols-outlined text-[28px] opacity-60 block mb-1">
                      event_available
                    </span>
                    Không có nghi lễ trọng đại nào được xếp vào ngày này.
                  </div>
                )}
              </div>

              {/* 2 Nút Thao Tác Bên Dưới Panel */}
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#ebdcd0]">
                <button
                  type="button"
                  onClick={() => onNavigate('cam-nang-nghi-le')}
                  className="flex items-center justify-center gap-1.5 h-9 rounded-xl border border-[#dec9b6] bg-[#fdf9f4] text-[#543e34] text-[12px] font-bold hover:border-[#80141d] hover:bg-[#faefe3] hover:text-[#80141d] transition-all"
                >
                  <span className="material-symbols-outlined text-[16px]">menu_book</span>
                  <span>Tra Cứu Điển Lễ</span>
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate('them-su-kien')}
                  className="flex items-center justify-center gap-1.5 h-9 rounded-xl bg-[#80141d] text-white text-[12px] font-bold hover:bg-[#681017] transition-all shadow-2xs"
                >
                  <span className="material-symbols-outlined text-[16px]">add</span>
                  <span>Ghi Nhận Việc Mới</span>
                </button>
              </div>
            </div>

            {/* Giỗ Chạp Trọng Đại Sắp Tới */}
            <div className="rounded-2xl border border-[#dec9b6] bg-[#fdf9f4] p-4 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px] text-[#80141d]">
                    notifications_active
                  </span>
                  <h3 className="font-serif text-[14px] font-bold text-[#80141d]">
                    Giỗ Chạp Trọng Đại Sắp Tới
                  </h3>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-[#80141d] text-white text-[10px] font-bold">
                  Còn 1 ngày
                </span>
              </div>

              <div
                onClick={() => onNavigate('chi-tiet-gio-chap')}
                className="flex items-center gap-3 rounded-xl border border-[#ebdcd0] bg-white p-3 hover:border-[#80141d] cursor-pointer transition-all shadow-2xs"
              >
                {/* Ảnh Chân Dung Cụ Cố */}
                <div className="relative h-14 w-14 shrink-0 rounded-lg overflow-hidden border border-[#dec9b6] bg-[#2b1b15]">
                  <img
                    src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200"
                    alt="Cụ Cố Nguyễn Phúc Tự"
                    className="h-full w-full object-cover sepia-[0.35]"
                  />
                  <div className="absolute inset-0 bg-radial from-transparent to-black/40" />
                </div>

                <div className="flex-1 min-w-0">
                  <h4 className="font-serif text-[14px] font-bold text-[#2b1b15] truncate">
                    Cụ Cố Nguyễn Phúc Tự
                  </h4>
                  <p className="text-[10.5px] text-[#8a6f62]">
                    Đời thứ 8 • Chi Trực Lăng
                  </p>
                  <p className="mt-1 text-[11px] font-bold text-[#80141d]">
                    Chính Giỗ: Ngày Rằm 15/7 Âm Lịch
                  </p>
                  <p className="text-[10px] text-[#715b50] truncate">
                    Dự kiến 35 mâm cỗ tại Nhà Thờ Họ tộc.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================
            THANH FOOTER CAM KẾT BẢO MẬT & DI SẢN BÊN DƯỚI
            ========================================================= */}
        <div className="pt-4 border-t border-[#ebdcd0] flex flex-col sm:flex-row items-center justify-between gap-2 text-[11.5px] text-[#8a6f62]">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[16px] text-emerald-700">verified_user</span>
            <span>Không gian lưu trữ phả hệ khép kín &amp; bảo mật đời đời cho đại gia đình</span>
          </div>
          <div>
            Thích Cúng Kiếng • Kính ngưỡng tổ tiên • Gìn giữ ký ức — Nối cội nguồn
          </div>
        </div>
      </div>
    </div>
  );
};