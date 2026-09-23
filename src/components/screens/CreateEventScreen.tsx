import React, { useState } from 'react';
import type { ScreenType } from '@/src/types.ts';

interface CreateEventScreenProps {
  onNavigate: (screen: ScreenType) => void;
}

export const CreateEventScreen: React.FC<CreateEventScreenProps> = ({ onNavigate }) => {
  const [eventType, setEventType] = useState<'gio_chap' | 'mung_tho' | 'hop_ho' | 'cot_moc'>('gio_chap');
  const [eventTitle, setEventTitle] = useState('Lễ Giỗ Thường Cụ Bà Đỗ Thị Nhàn (Đời thứ 10)');
  const [cycleType, setCycleType] = useState<'am_lich' | 'duong_lich' | 'mot_lan'>('am_lich');
  const [lunarDay, setLunarDay] = useState('22');
  const [lunarMonth, setLunarMonth] = useState('9');
  const [lunarYear] = useState('Giáp Thìn');
  const [solarDate] = useState('24 / 10');
  const [ceremonyTime, setCeremonyTime] = useState('09:30 AM');
  const [locationType, setLocationType] = useState<'tu_duong' | 'truong_chi' | 'online'>('tu_duong');
  const [address, setAddress] = useState(
    'Từ đường Nguyễn Tộc, Thôn Lăng Thượng, Xã Ninh Nhất, TP Ninh Bình, Tỉnh Ninh Bình'
  );
  const [selectedPrayer, setSelectedPrayer] = useState(
    'Văn khấn cúng Giỗ Thường (Hàng cát tiền nhân, dòng tộc từ đường chi tộc - Bản Bắc Bộ)'
  );
  const [offeringsNote, setOfferingsNote] = useState(
    'Ví dụ: 3 mâm cỗ mặn truyền thống (thịt thó lợn hấp lá chanh, xôi gấc hạt sen, canh măng mực, giò lụa, nem rán,...). Ban nữ công chuẩn bị trầu cau têm cánh phượng và ngũ quả...'
  );
  const [privacy, setPrivacy] = useState<'noi_bo' | 'cong_khai' | 'truong_toc'>('noi_bo');
  const [audience, setAudience] = useState<'all' | 'ban_tri_su'>('all');
  const [remind14, setRemind14] = useState(true);
  const [remind7, setRemind7] = useState(true);
  const [remind1, setRemind1] = useState(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setToastMessage('Đã khởi tạo sự kiện giỗ chạp và đồng bộ vào Lịch Gia Tộc!');
    setTimeout(() => {
      onNavigate('family-calendar');
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#f7eee2] text-[#2b1b15] py-5 px-3 sm:px-6 lg:px-8">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-[#2b1b15] text-[#fdf9f4] px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-in fade-in border border-[#c9892c]">
          <span className="material-symbols-outlined text-[#c9892c]">verified</span>
          <span className="text-sm font-medium">{toastMessage}</span>
        </div>
      )}

      <div className="max-w-[1440px] mx-auto space-y-5">
        {/* =========================================================
            BREADCRUMB
            ========================================================= */}
        <div className="flex items-center gap-2 text-[12px] text-[#8a6f62]">
          <button
            type="button"
            onClick={() => onNavigate('today')}
            className="hover:text-[#80141d] transition-colors"
          >
            Từ Đường Chi Trực Lăng
          </button>
          <span>/</span>
          <button
            type="button"
            onClick={() => onNavigate('family-calendar')}
            className="hover:text-[#80141d] transition-colors"
          >
            Lịch Gia Tộc &amp; Giỗ Chạp
          </button>
          <span>/</span>
          <span className="text-[#80141d] font-bold">Khởi Tạo Sự Kiện Mới</span>
        </div>

        {/* =========================================================
            TOP HEADER HERO BANNER
            ========================================================= */}
        <div className="rounded-2xl border border-[#dec9b6] bg-[#fdf9f4] p-5 sm:p-7 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div>
            <span className="inline-block px-2.5 py-0.5 rounded-md bg-[#80141d]/10 text-[#80141d] text-[10px] font-bold uppercase tracking-wider mb-2">
              CẨM NANG LỄ GIA TỘC KHOA GIÁP THÌN 2024
            </span>
            <h1 className="font-serif text-[24px] sm:text-[28px] font-bold text-[#80141d] leading-tight">
              Thêm Sự Kiện Gia Tộc Mới
            </h1>
            <p className="mt-1 text-[12.5px] sm:text-[13px] text-[#715b50] max-w-3xl leading-relaxed">
              Khởi tạo ngày giỗ, lễ kỷ niệm, mừng thọ hoặc ngày họp họ để hệ thống tự động đồng bộ lịch Âm - Dương và nhắc nhở con cháu chu toàn phụng sự tổ tiên.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto shrink-0">
            <button
              type="button"
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#faefe3] border border-[#dec9b6] text-[#80141d] text-[12px] font-bold shadow-2xs"
            >
              <span className="material-symbols-outlined text-[17px]">visibility</span>
              <span>Tạo mới sự kiện</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setToastMessage('Đang tải cấu trúc sự kiện mẫu cổ truyền...');
                setTimeout(() => setToastMessage(null), 2500);
              }}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-[#dec9b6] bg-[#fdf9f4] text-[#543e34] hover:bg-[#faefe3] hover:text-[#80141d] text-[12px] font-semibold transition-colors shadow-2xs"
            >
              <span className="material-symbols-outlined text-[17px]">edit_note</span>
              <span>Chỉnh sửa sự kiện mẫu</span>
            </button>
          </div>
        </div>

        {/* =========================================================
            BỐ CỤC CHÍNH: FORM TRÁI (8 COLS) + SIDEBAR PHẢI (4 COLS)
            ========================================================= */}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          {/* CỘT TRÁI (8 COLS): 5 PHẦN NỘI DUNG CHÍNH */}
          <div className="lg:col-span-8 space-y-5">
            {/* -----------------------------------------------------
                MỤC 01: LOẠI SỰ KIỆN PHỤNG SỰ
                ----------------------------------------------------- */}
            <div className="rounded-2xl border border-[#dec9b6] bg-[#fdf9f4] p-5 sm:p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#ebdcd0]">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#80141d] text-white font-bold text-[11px]">
                    01
                  </span>
                  <h2 className="font-serif text-[16px] font-bold text-[#80141d]">
                    Loại Sự Kiện Phụng Sự
                  </h2>
                </div>
                <span className="text-[11px] text-[#8a6f62]">
                  Chọn phân loại để áp dụng nghi thức lễ và biểu mẫu bài vị tương ứng
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* 1. Giỗ Chạp & Kỵ Nhật */}
                <div
                  onClick={() => setEventType('gio_chap')}
                  className={`p-4 rounded-xl border-2 transition-all cursor-pointer relative ${
                    eventType === 'gio_chap'
                      ? 'border-[#80141d] bg-[#fdf9f4] shadow-xs'
                      : 'border-[#ebdcd0] bg-white hover:border-[#dec9b6] hover:bg-[#faf4ed]'
                  }`}
                >
                  <span className="absolute top-3 right-3 text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#80141d] text-white">
                    KHUYÊN DÙNG
                  </span>
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#80141d]/10 text-[#80141d] mb-2.5">
                    <span className="material-symbols-outlined text-[22px]">temple_buddhist</span>
                  </div>
                  <h3 className="font-serif text-[14.5px] font-bold text-[#2b1b15] mb-1">
                    Giỗ Chạp &amp; Kỵ Nhật
                  </h3>
                  <p className="text-[11.5px] text-[#715b50] leading-relaxed">
                    Giỗ đầu, giỗ hết, giỗ thường của tiền nhân và tiền linh các đời.
                  </p>
                  <div className="mt-2 text-[10.5px] text-[#80141d] font-semibold flex items-center gap-1">
                    <span className="material-symbols-outlined text-[13px]">link</span>
                    <span>Tự động kết nối bài văn khấn kỵ nhật</span>
                  </div>
                </div>

                {/* 2. Sinh Nhật & Mừng Thọ */}
                <div
                  onClick={() => setEventType('mung_tho')}
                  className={`p-4 rounded-xl border transition-all cursor-pointer ${
                    eventType === 'mung_tho'
                      ? 'border-2 border-[#80141d] bg-[#fdf9f4] shadow-xs'
                      : 'border-[#ebdcd0] bg-white hover:border-[#dec9b6] hover:bg-[#faf4ed]'
                  }`}
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#c9892c]/15 text-[#c9892c] mb-2.5">
                    <span className="material-symbols-outlined text-[22px]">cake</span>
                  </div>
                  <h3 className="font-serif text-[14.5px] font-bold text-[#2b1b15] mb-1">
                    Sinh Nhật &amp; Mừng Thọ
                  </h3>
                  <p className="text-[11.5px] text-[#715b50] leading-relaxed">
                    Lễ thọ 70, 80, 90 tuổi, ngày đoàn viên chúc phúc cho bậc cao niên.
                  </p>
                </div>

                {/* 3. Họp Họ & Khánh Thành Từ Đường */}
                <div
                  onClick={() => setEventType('hop_ho')}
                  className={`p-4 rounded-xl border transition-all cursor-pointer ${
                    eventType === 'hop_ho'
                      ? 'border-2 border-[#80141d] bg-[#fdf9f4] shadow-xs'
                      : 'border-[#ebdcd0] bg-white hover:border-[#dec9b6] hover:bg-[#faf4ed]'
                  }`}
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#d9825b]/15 text-[#a35c34] mb-2.5">
                    <span className="material-symbols-outlined text-[22px]">groups</span>
                  </div>
                  <h3 className="font-serif text-[14.5px] font-bold text-[#2b1b15] mb-1">
                    Họp Họ &amp; Khánh Thành Từ Đường
                  </h3>
                  <p className="text-[11.5px] text-[#715b50] leading-relaxed">
                    Tế xuân, tế thu, đại hội gia tộc hoặc tu bổ từ đường dòng họ.
                  </p>
                </div>

                {/* 4. Cột Mốc & Điển Tích Dòng Tộc */}
                <div
                  onClick={() => setEventType('cot_moc')}
                  className={`p-4 rounded-xl border transition-all cursor-pointer ${
                    eventType === 'cot_moc'
                      ? 'border-2 border-[#80141d] bg-[#fdf9f4] shadow-xs'
                      : 'border-[#ebdcd0] bg-white hover:border-[#dec9b6] hover:bg-[#faf4ed]'
                  }`}
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#5b392d]/15 text-[#5b392d] mb-2.5">
                    <span className="material-symbols-outlined text-[22px]">history_edu</span>
                  </div>
                  <h3 className="font-serif text-[14.5px] font-bold text-[#2b1b15] mb-1">
                    Cột Mốc &amp; Điển Tích Dòng Tộc
                  </h3>
                  <p className="text-[11.5px] text-[#715b50] leading-relaxed">
                    Kỷ niệm ngày cụ Thủy Tổ lập ấp, vinh danh con cháu đỗ đạt khoa bảng.
                  </p>
                </div>
              </div>
            </div>

            {/* -----------------------------------------------------
                MỤC 02: TÊN & DANH XƯNG SỰ KIỆN
                ----------------------------------------------------- */}
            <div className="rounded-2xl border border-[#dec9b6] bg-[#fdf9f4] p-5 sm:p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#ebdcd0]">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#80141d] text-white font-bold text-[11px]">
                    02
                  </span>
                  <h2 className="font-serif text-[16px] font-bold text-[#80141d]">
                    Tên &amp; Danh Xưng Sự Kiện
                  </h2>
                </div>
                <span className="text-[11px] text-[#8a6f62]">
                  Liên kết chính xác với tiền nhân để cập nhật dữ liệu phả hệ
                </span>
              </div>

              <div className="space-y-3.5">
                <div>
                  <label className="block text-[12px] font-bold text-[#2b1b15] mb-1.5">
                    Tiêu Đề / Danh Xưng Lễ Cúng <span className="text-[#80141d]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={eventTitle}
                    onChange={(e) => setEventTitle(e.target.value)}
                    className="w-full h-11 px-4 rounded-xl border border-[#dec9b6] bg-white text-[13px] font-medium text-[#2b1b15] focus:outline-none focus:border-[#80141d] shadow-2xs"
                  />
                </div>

                {/* Liên Kết Nhân Vật Trong Cây Gia Phả */}
                <div className="rounded-xl border border-[#ebdcd0] bg-[#faf4ed] p-3.5 space-y-2.5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <span className="text-[12px] font-bold text-[#2b1b15]">
                      Liên Kết Nhân Vật Trong Cây Gia Phả
                    </span>
                    <span className="text-[11px] text-[#8a6f62]">
                      Tự động đồng bộ ngày sinh/tử, danh hiệu thụy, chi nhánh và vị trí mộ phần phụng tự
                    </span>
                  </div>

                  {/* Input Search + Button Mở Phả Hệ */}
                  <div className="flex items-center gap-2">
                    <div className="relative flex-1">
                      <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[17px] text-[#8a6f62]">
                        search
                      </span>
                      <input
                        type="text"
                        readOnly
                        value="Cụ Bà Đỗ Thị Nhàn - Nhánh 2 - Đời thứ 10 (Chánh thất Cụ Nguyễn Trực An)"
                        className="w-full h-10 pl-9 pr-3 rounded-lg border border-[#dec9b6] bg-white text-[12px] font-medium text-[#2b1b15] shadow-2xs cursor-pointer"
                        onClick={() => onNavigate('cay-pha-he-25d')}
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => onNavigate('cay-pha-he-25d')}
                      className="flex items-center gap-1 h-10 px-3.5 rounded-lg border border-[#dec9b6] bg-[#fdf9f4] text-[#80141d] hover:bg-[#faefe3] text-[12px] font-bold whitespace-nowrap shadow-2xs transition-colors"
                    >
                      <span className="material-symbols-outlined text-[16px]">account_tree</span>
                      <span>Mở Phả Hệ</span>
                    </button>
                  </div>

                  {/* Thẻ Thông Tin Tiền Nhân Được Liên Kết */}
                  <div className="flex items-center gap-3 rounded-lg border border-[#ebdcd0] bg-white p-2.5 shadow-2xs">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#8b4513] text-white font-serif font-bold text-[14px]">
                      Đ
                    </div>
                    <div className="flex-1 min-w-0 leading-tight">
                      <div className="flex items-center gap-2 flex-wrap">
                        <strong className="text-[13px] font-serif font-bold text-[#2b1b15]">
                          Đỗ Thị Nhàn
                        </strong>
                        <span className="text-[11px] text-[#715b50]">
                          Tự: Từ Uyên
                        </span>
                        <span className="text-[9.5px] font-bold px-1.5 py-0.2 rounded bg-[#faefe3] text-[#80141d] border border-[#ebdcd0]">
                          Án Táng Tại
                        </span>
                      </div>
                      <div className="flex items-center gap-3 mt-1 text-[11px] text-[#8a6f62] flex-wrap">
                        <span>Sinh: 1912 • Mất: 22/09 Âm Lịch (Quý Hợi 1983)</span>
                        <span>•</span>
                        <span className="text-[#543e34]">Nghĩa trang dòng họ Đồng Bảng, Mộ số 15-B</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* -----------------------------------------------------
                MỤC 03: THỜI GIAN & CHU KỲ LỊCH CỔ TRUYỀN
                ----------------------------------------------------- */}
            <div className="rounded-2xl border border-[#dec9b6] bg-[#fdf9f4] p-5 sm:p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#ebdcd0]">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#80141d] text-white font-bold text-[11px]">
                    03
                  </span>
                  <h2 className="font-serif text-[16px] font-bold text-[#80141d]">
                    Thời Gian &amp; Chu Kỳ Lịch Cổ Truyền
                  </h2>
                </div>
                <span className="text-[11px] text-[#8a6f62]">
                  Thuật toán quy đổi Âm Dương Lịch và tra cứu tiết khí hoàng đạo
                </span>
              </div>

              {/* Tabs Chu Kỳ Lặp Lại */}
              <div className="space-y-3">
                <span className="block text-[11.5px] font-bold text-[#715b50]">
                  Chu Kỳ Lặp Lại Của Sự Kiện
                </span>
                <div className="flex items-center gap-2 flex-wrap">
                  <button
                    type="button"
                    onClick={() => setCycleType('am_lich')}
                    className={`px-4 py-2 rounded-xl text-[12px] font-bold transition-all shadow-2xs ${
                      cycleType === 'am_lich'
                        ? 'bg-[#80141d] text-white'
                        : 'border border-[#dec9b6] bg-white text-[#543e34] hover:bg-[#faefe3]'
                    }`}
                  >
                    Lặp lại hàng năm (Âm Lịch)
                  </button>
                  <button
                    type="button"
                    onClick={() => setCycleType('duong_lich')}
                    className={`px-4 py-2 rounded-xl text-[12px] font-bold transition-all shadow-2xs ${
                      cycleType === 'duong_lich'
                        ? 'bg-[#80141d] text-white'
                        : 'border border-[#dec9b6] bg-white text-[#543e34] hover:bg-[#faefe3]'
                    }`}
                  >
                    Theo Dương Lịch
                  </button>
                  <button
                    type="button"
                    onClick={() => setCycleType('mot_lan')}
                    className={`px-4 py-2 rounded-xl text-[12px] font-bold transition-all shadow-2xs ${
                      cycleType === 'mot_lan'
                        ? 'bg-[#80141d] text-white'
                        : 'border border-[#dec9b6] bg-white text-[#543e34] hover:bg-[#faefe3]'
                    }`}
                  >
                    Chỉ diễn ra một lần
                  </button>
                </div>
              </div>

              {/* Cụm Chuyển Đổi Âm - Dương Lịch */}
              <div className="grid grid-cols-1 md:grid-cols-11 gap-3 items-center">
                {/* Hộp Âm Lịch (5 cols) */}
                <div className="md:col-span-5 rounded-xl border border-[#ebdcd0] bg-[#faefe3] p-4 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#80141d] flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px]">notifications</span>
                      NGÀY ÂM LỊCH PHỤNG THỜ
                    </span>
                    <span className="text-[9px] font-semibold text-[#8a6f62]">
                      Ưu tiên ngày kỵ
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div>
                      <span className="block text-[10px] text-[#715b50]">Ngày (Âm)</span>
                      <input
                        type="text"
                        value={lunarDay}
                        onChange={(e) => setLunarDay(e.target.value)}
                        className="w-full text-center font-serif text-[20px] font-bold text-[#80141d] bg-transparent border-b border-[#dec9b6] focus:outline-none"
                      />
                    </div>
                    <div>
                      <span className="block text-[10px] text-[#715b50]">Tháng (Âm)</span>
                      <input
                        type="text"
                        value={lunarMonth}
                        onChange={(e) => setLunarMonth(e.target.value)}
                        className="w-full text-center font-serif text-[20px] font-bold text-[#80141d] bg-transparent border-b border-[#dec9b6] focus:outline-none"
                      />
                    </div>
                    <div>
                      <span className="block text-[10px] text-[#715b50]">Năm Kỷ Niệm</span>
                      <div className="font-serif text-[15px] font-bold text-[#2b1b15] mt-1">
                        {lunarYear}
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-[#dec9b6]/60 text-[10.5px] text-[#715b50] flex items-center justify-between">
                    <span>Tiết khí: Sương Giáng (Thu Tàn)</span>
                    <span className="font-semibold text-[#80141d]">Ngày: Đinh Dậu • Hoàng Đạo</span>
                  </div>
                </div>

                {/* Mũi tên chuyển đổi hai chiều (1 col) */}
                <div className="md:col-span-1 flex justify-center text-[#8a6f62]">
                  <span className="material-symbols-outlined text-[24px]">sync_alt</span>
                </div>

                {/* Hộp Dương Lịch (5 cols) */}
                <div className="md:col-span-5 rounded-xl border border-[#ebdcd0] bg-white p-4 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#715b50]">
                      DƯƠNG LỊCH NĂM 2024
                    </span>
                    <span className="text-[10.5px] font-bold text-[#80141d]">
                      Thứ Năm, 2024
                    </span>
                  </div>

                  <div className="font-serif text-[26px] font-bold text-[#2b1b15] leading-none py-1">
                    {solarDate}
                  </div>

                  <div className="pt-2 border-t border-[#ebdcd0] text-[10.5px] text-[#8a6f62] leading-tight">
                    Số liệu đồng bộ hoàn toàn từ ngày nhuận theo Khâm Thiên Giám.
                  </div>
                </div>
              </div>

              {/* Giờ Cúng & Can Chi Giờ */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div>
                  <label className="block text-[11.5px] font-bold text-[#2b1b15] mb-1">
                    Giờ Cúng &amp; Khởi Lễ Truyền Thống
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={ceremonyTime}
                      onChange={(e) => setCeremonyTime(e.target.value)}
                      className="w-full h-10 pl-3.5 pr-9 rounded-xl border border-[#dec9b6] bg-white text-[12.5px] font-semibold text-[#2b1b15] shadow-2xs"
                    />
                    <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-[18px] text-[#8a6f62]">
                      schedule
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-[11.5px] font-bold text-[#2b1b15] mb-1">
                    Can Chi Giờ &amp; Khung Nghi Thức
                  </label>
                  <div className="flex items-center justify-between h-10 px-3.5 rounded-xl border border-[#dec9b6] bg-[#faefe3]">
                    <strong className="font-serif text-[13px] font-bold text-[#80141d]">
                      Giờ: Ất Tỵ (09:00 - 11:00)
                    </strong>
                    <span className="text-[9.5px] font-bold px-2 py-0.5 rounded bg-[#c9892c]/20 text-[#80141d] border border-[#c9892c]/30">
                      Giờ Hoàng Đạo Cát Tượng
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* -----------------------------------------------------
                MỤC 04: ĐỊA ĐIỂM & KHÔNG GIAN PHỤNG THỜ
                ----------------------------------------------------- */}
            <div className="rounded-2xl border border-[#dec9b6] bg-[#fdf9f4] p-5 sm:p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#ebdcd0]">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#80141d] text-white font-bold text-[11px]">
                    04
                  </span>
                  <h2 className="font-serif text-[16px] font-bold text-[#80141d]">
                    Địa Điểm &amp; Không Gian Phụng Thờ
                  </h2>
                </div>
                <span className="text-[11px] text-[#8a6f62]">
                  Quy định từ đường thờ phụng hoặc địa điểm họp mặt của chi phái
                </span>
              </div>

              {/* 3 Thẻ Địa Điểm */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div
                  onClick={() => setLocationType('tu_duong')}
                  className={`p-3.5 rounded-xl border text-center transition-all cursor-pointer ${
                    locationType === 'tu_duong'
                      ? 'border-2 border-[#80141d] bg-white shadow-xs'
                      : 'border-[#ebdcd0] bg-white hover:border-[#dec9b6]'
                  }`}
                >
                  <span className="material-symbols-outlined text-[24px] text-[#80141d] mb-1">
                    temple_buddhist
                  </span>
                  <strong className="block text-[13px] font-serif font-bold text-[#2b1b15]">
                    Tại Từ Đường Dòng Họ
                  </strong>
                  <span className="text-[11px] text-[#715b50]">
                    Chi Trực Lăng, Thừa Thiên
                  </span>
                </div>

                <div
                  onClick={() => setLocationType('truong_chi')}
                  className={`p-3.5 rounded-xl border text-center transition-all cursor-pointer ${
                    locationType === 'truong_chi'
                      ? 'border-2 border-[#80141d] bg-white shadow-xs'
                      : 'border-[#ebdcd0] bg-white hover:border-[#dec9b6]'
                  }`}
                >
                  <span className="material-symbols-outlined text-[24px] text-[#c9892c] mb-1">
                    cottage
                  </span>
                  <strong className="block text-[13px] font-serif font-bold text-[#2b1b15]">
                    Nhà Bác Trưởng Chi
                  </strong>
                  <span className="text-[11px] text-[#715b50]">
                    Bàn thờ chính của trưởng nam
                  </span>
                </div>

                <div
                  onClick={() => setLocationType('online')}
                  className={`p-3.5 rounded-xl border text-center transition-all cursor-pointer ${
                    locationType === 'online'
                      ? 'border-2 border-[#80141d] bg-white shadow-xs'
                      : 'border-[#ebdcd0] bg-white hover:border-[#dec9b6]'
                  }`}
                >
                  <span className="material-symbols-outlined text-[24px] text-[#a35c34] mb-1">
                    co_present
                  </span>
                  <strong className="block text-[13px] font-serif font-bold text-[#2b1b15]">
                    Phòng Tưởng Niệm Số
                  </strong>
                  <span className="text-[11px] text-[#715b50]">
                    Họp trực tuyến cho con cháu ở xa
                  </span>
                </div>
              </div>

              {/* Input Địa Chỉ */}
              <div>
                <label className="block text-[11.5px] font-bold text-[#2b1b15] mb-1.5">
                  Địa Chỉ Cụ Thể &amp; Chỉ Dẫn Đường Đi
                </label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full h-11 px-4 rounded-xl border border-[#dec9b6] bg-white text-[12.5px] font-medium text-[#2b1b15] focus:outline-none focus:border-[#80141d] shadow-2xs"
                />
              </div>

              {/* Khung Bản Đồ Chỉ Đường */}
              <div className="relative h-44 rounded-xl overflow-hidden border border-[#dec9b6] bg-[#ebe2d6]">
                <img
                  src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=900"
                  alt="Bản đồ chỉ đường"
                  className="h-full w-full object-cover opacity-85 sepia-[0.25]"
                />
                <div className="absolute inset-0 bg-radial from-transparent via-[#2b1b15]/15 to-[#2b1b15]/40" />

                {/* Badge Vị Trí GPS Trên Bản Đồ */}
                <div className="absolute bottom-3 left-3 bg-[#fdf9f4]/95 backdrop-blur-xs px-3 py-1.5 rounded-lg border border-[#dec9b6] text-[11px] font-bold text-[#80141d] flex items-center gap-1.5 shadow-md">
                  <span className="material-symbols-outlined text-[16px] text-red-600">location_on</span>
                  <span>Định vị GPS: Nhà Thờ Họ Nguyễn (Chi Trực Lăng)</span>
                </div>

                <button
                  type="button"
                  onClick={() => setToastMessage('Đang mở bản đồ chỉ đường Google Maps...')}
                  className="absolute bottom-3 right-3 bg-[#80141d] text-white px-3 py-1.5 rounded-lg text-[11px] font-bold shadow-md hover:bg-[#681017] transition-all"
                >
                  Mở Bản Đồ Chỉ Đường
                </button>
              </div>
            </div>

            {/* -----------------------------------------------------
                MỤC 05: VĂN KHẤN CỔ TRUYỀN & LỄ VẬT
                ----------------------------------------------------- */}
            <div className="rounded-2xl border border-[#dec9b6] bg-[#fdf9f4] p-5 sm:p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#ebdcd0]">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#80141d] text-white font-bold text-[11px]">
                    05
                  </span>
                  <h2 className="font-serif text-[16px] font-bold text-[#80141d]">
                    Văn Khấn Cổ Truyền &amp; Lễ Vật
                  </h2>
                </div>
                <span className="text-[11px] text-[#8a6f62]">
                  Chọn đúng bài văn khấn ngày kỵ nhật và phân công chuẩn bị phẩm vật dâng hương
                </span>
              </div>

              {/* Dropdown Chọn Văn Khấn */}
              <div>
                <label className="block text-[11.5px] font-bold text-[#2b1b15] mb-1.5">
                  Bài Văn Khấn Đính Kèm (Kho tàng 54 bài văn khấn chuẩn cổ truyền Bắc - Trung - Nam)
                </label>
                <div className="relative">
                  <select
                    value={selectedPrayer}
                    onChange={(e) => setSelectedPrayer(e.target.value)}
                    className="w-full h-11 px-4 pr-10 rounded-xl border border-[#dec9b6] bg-white text-[12.5px] font-medium text-[#2b1b15] focus:outline-none focus:border-[#80141d] appearance-none shadow-2xs cursor-pointer"
                  >
                    <option>
                      Văn khấn cúng Giỗ Thường (Hàng cát tiền nhân, dòng tộc từ đường chi tộc - Bản Bắc Bộ)
                    </option>
                    <option>
                      Văn khấn cúng Đại Tế Vu Lan Báo Hiếu Gia Tộc (Bản Cổ Truyền Miền Trung)
                    </option>
                    <option>
                      Văn khấn Tạ Mộ &amp; Lễ Thanh Minh Tổ Tiên
                    </option>
                  </select>
                  <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-[20px] text-[#715b50] pointer-events-none">
                    keyboard_arrow_down
                  </span>
                </div>
              </div>

              {/* Hộp Trích Đoạn Văn Khấn Chuẩn Bị Xướng Lễ */}
              <div className="rounded-xl border border-[#dec9b6] bg-[#faefe3] p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <strong className="text-[12px] font-serif font-bold text-[#80141d]">
                    Trích Đoạn Văn Khấn Chuẩn Bị Xướng Lễ
                  </strong>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-white text-[#80141d] border border-[#dec9b6]">
                    In Bản Điệp Văn Cổ Lễ
                  </span>
                </div>
                <blockquote className="text-[12px] italic text-[#4a352a] leading-relaxed font-serif">
                  &ldquo;Nam mô A Di Đà Phật! (3 lần)... Con kính lạy chín phương Trời, mười phương Chư Phật... Con kính lạy Đức Thần Linh, Thổ Công cai quản bản xứ... Hôm nay ngày 22 tháng 09 năm Giáp Thìn, nhân con cháu Chi Trực Lăng kính dâng hương hoa phẩm vật. Thiết tha kính thỉnh cụ bà Đỗ Thị Nhàn húy Từ Uyên lai lâm chứng giám...&rdquo;
                </blockquote>
              </div>

              {/* Ghi Chú Sắm Lễ */}
              <div>
                <label className="block text-[11.5px] font-bold text-[#2b1b15] mb-1.5">
                  Ghi Chú Sắm Lễ &amp; Phẩm Oản Truyền Thống
                </label>
                <textarea
                  rows={3}
                  value={offeringsNote}
                  onChange={(e) => setOfferingsNote(e.target.value)}
                  className="w-full p-3.5 rounded-xl border border-[#dec9b6] bg-white text-[12px] text-[#2b1b15] focus:outline-none focus:border-[#80141d] shadow-2xs leading-relaxed"
                />
              </div>
            </div>
          </div>

          {/* =======================================================
              CỘT PHẢI (4 COLS): NHẮC NHỞ, BẢO MẬT & TÀI LIỆU
              ======================================================= */}
          <div className="lg:col-span-4 space-y-5">
            {/* THẺ 1: NHẮC NHỞ CON CHÁU */}
            <div className="rounded-2xl border border-[#dec9b6] bg-[#fdf9f4] p-5 shadow-xs space-y-4">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#80141d] text-[20px]">
                  notifications_active
                </span>
                <h3 className="font-serif text-[15px] font-bold text-[#80141d]">
                  Nhắc Nhở Con Cháu
                </h3>
              </div>
              <p className="text-[11.5px] text-[#715b50] leading-snug">
                Tự động gửi thông điệp phụng sự qua kênh Zalo Official Account và Tin nhắn SMS gia tộc.
              </p>

              <div className="space-y-3 pt-1">
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={remind14}
                    onChange={(e) => setRemind14(e.target.checked)}
                    className="mt-0.5 h-4 w-4 rounded border-[#dec9b6] text-[#80141d] focus:ring-[#80141d]"
                  />
                  <div className="leading-tight">
                    <strong className="block text-[12px] font-bold text-[#2b1b15]">
                      Trước 14 ngày
                    </strong>
                    <span className="text-[11px] text-[#8a6f62]">
                      Để ban hoàn tất lễ ước gia đình họp bàn sắm lễ, phân công làm cỗ
                    </span>
                  </div>
                </label>

                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={remind7}
                    onChange={(e) => setRemind7(e.target.checked)}
                    className="mt-0.5 h-4 w-4 rounded border-[#dec9b6] text-[#80141d] focus:ring-[#80141d]"
                  />
                  <div className="leading-tight">
                    <strong className="block text-[12px] font-bold text-[#2b1b15]">
                      Trước 7 ngày
                    </strong>
                    <span className="text-[11px] text-[#8a6f62]">
                      Để con cháu làm ăn ở phương xa sắp xếp công việc, đặt vé tàu xe về nguồn
                    </span>
                  </div>
                </label>

                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={remind1}
                    onChange={(e) => setRemind1(e.target.checked)}
                    className="mt-0.5 h-4 w-4 rounded border-[#dec9b6] text-[#80141d] focus:ring-[#80141d]"
                  />
                  <div className="leading-tight">
                    <strong className="block text-[12px] font-bold text-[#2b1b15]">
                      Trước 1 ngày
                    </strong>
                    <span className="text-[11px] text-[#8a6f62]">
                      Nhắc nhở kiểm tra hương đăng trà quả, dọn bàn thờ và phòng phụng tự
                    </span>
                  </div>
                </label>
              </div>

              <div className="pt-3 border-t border-[#ebdcd0] space-y-2">
                <span className="block text-[11px] font-bold uppercase tracking-wider text-[#8a6f62]">
                  Đối Tượng Nhận Thông Báo
                </span>
                <label className="flex items-center gap-2 cursor-pointer text-[12px] font-semibold text-[#2b1b15]">
                  <input
                    type="radio"
                    name="audience"
                    checked={audience === 'all'}
                    onChange={() => setAudience('all')}
                    className="text-[#80141d] focus:ring-[#80141d]"
                  />
                  <span>Toàn bộ 148 thành viên trong cây gia phả</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer text-[12px] font-medium text-[#715b50]">
                  <input
                    type="radio"
                    name="audience"
                    checked={audience === 'ban_tri_su'}
                    onChange={() => setAudience('ban_tri_su')}
                    className="text-[#80141d] focus:ring-[#80141d]"
                  />
                  <span>Chỉ Ban Trị Sự và con cháu nội tộc</span>
                </label>
              </div>
            </div>

            {/* THẺ 2: QUYỀN RIÊNG TƯ SỰ KIỆN */}
            <div className="rounded-2xl border border-[#dec9b6] bg-[#fdf9f4] p-5 shadow-xs space-y-3.5">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#80141d] text-[20px]">
                  lock
                </span>
                <h3 className="font-serif text-[15px] font-bold text-[#80141d]">
                  Quyền Riêng Tư Sự Kiện
                </h3>
              </div>

              <div className="space-y-2.5">
                <label className="flex items-start gap-2.5 p-3 rounded-xl border border-[#80141d] bg-[#faefe3] cursor-pointer">
                  <input
                    type="radio"
                    name="privacy"
                    checked={privacy === 'noi_bo'}
                    onChange={() => setPrivacy('noi_bo')}
                    className="mt-0.5 text-[#80141d] focus:ring-[#80141d]"
                  />
                  <div className="leading-tight">
                    <strong className="block text-[12px] font-bold text-[#80141d]">
                      Nội Bộ Chi Phái
                    </strong>
                    <span className="text-[10.5px] text-[#715b50]">
                      Chỉ con cháu thuộc chi Trực Lăng mới nhìn thấy và tham gia xác nhận
                    </span>
                  </div>
                </label>

                <label className="flex items-start gap-2.5 p-3 rounded-xl border border-[#ebdcd0] bg-white cursor-pointer hover:border-[#dec9b6]">
                  <input
                    type="radio"
                    name="privacy"
                    checked={privacy === 'cong_khai'}
                    onChange={() => setPrivacy('cong_khai')}
                    className="mt-0.5 text-[#80141d] focus:ring-[#80141d]"
                  />
                  <div className="leading-tight">
                    <strong className="block text-[12px] font-bold text-[#2b1b15]">
                      Công Khai Cho Khách Quý &amp; Thông Gia
                    </strong>
                    <span className="text-[10.5px] text-[#8a6f62]">
                      Gửi thư mời điện tử trang trọng tới họ ngoại và bằng hữu
                    </span>
                  </div>
                </label>

                <label className="flex items-start gap-2.5 p-3 rounded-xl border border-[#ebdcd0] bg-white cursor-pointer hover:border-[#dec9b6]">
                  <input
                    type="radio"
                    name="privacy"
                    checked={privacy === 'truong_toc'}
                    onChange={() => setPrivacy('truong_toc')}
                    className="mt-0.5 text-[#80141d] focus:ring-[#80141d]"
                  />
                  <div className="leading-tight">
                    <strong className="block text-[12px] font-bold text-[#2b1b15]">
                      Chỉ Trưởng Tộc &amp; Thư Ký Quản Lý
                    </strong>
                    <span className="text-[10.5px] text-[#8a6f62]">
                      Lưu hồ sơ nội bộ chưa công bố thời gian cử hành
                    </span>
                  </div>
                </label>
              </div>

              <p className="text-[10.5px] text-[#8a6f62] italic pt-2 border-t border-[#ebdcd0]">
                Sự kiện sẽ được ghi nhận vào Sổ Kỷ Niệm Gia Tộc sau khi xác nhận hoàn tất.
              </p>
            </div>

            {/* THẺ 3: TÀI LIỆU & HÌNH ẢNH GỐC */}
            <div className="rounded-2xl border border-[#dec9b6] bg-[#fdf9f4] p-5 shadow-xs space-y-3.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#80141d] text-[20px]">
                    photo_library
                  </span>
                  <h3 className="font-serif text-[15px] font-bold text-[#80141d]">
                    Tài Liệu &amp; Hình Ảnh Gốc
                  </h3>
                </div>
                <span className="text-[11px] text-[#8a6f62]">Tối đa 10 ảnh</span>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden border border-[#dec9b6] bg-[#2b1b15] shadow-2xs group">
                  <img
                    src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=300"
                    alt="Chân dung cụ"
                    className="w-full h-full object-cover sepia-[0.3]"
                  />
                  <span className="absolute bottom-1 inset-x-1 text-center bg-black/70 backdrop-blur-xs text-[9.5px] text-white py-0.5 rounded font-medium">
                    Chân Dung Cụ
                  </span>
                </div>

                <div className="relative aspect-[4/3] rounded-xl overflow-hidden border border-[#dec9b6] bg-[#2b1b15] shadow-2xs group">
                  <img
                    src="https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&q=80&w=300"
                    alt="Ảnh bàn thờ"
                    className="w-full h-full object-cover sepia-[0.3]"
                  />
                  <span className="absolute bottom-1 inset-x-1 text-center bg-black/70 backdrop-blur-xs text-[9.5px] text-white py-0.5 rounded font-medium">
                    Ảnh Bàn Thờ
                  </span>
                </div>
              </div>

              {/* Upload Dropzone */}
              <div
                onClick={() => setToastMessage('Đã mở bộ chọn tệp tài liệu di chúc, văn phong...')}
                className="p-4 rounded-xl border-2 border-dashed border-[#dec9b6] bg-white text-center hover:border-[#80141d] hover:bg-[#faefe3] transition-all cursor-pointer shadow-2xs"
              >
                <span className="material-symbols-outlined text-[26px] text-[#c9892c] mb-1">
                  cloud_upload
                </span>
                <div className="text-[12px] font-bold text-[#2b1b15]">
                  Tải thêm di chúc, văn phong hoặc ảnh xưa
                </div>
                <div className="text-[10.5px] text-[#8a6f62] mt-0.5">
                  Kéo thả file tài liệu PDF, JPG, PNG scan
                </div>
              </div>
            </div>
          </div>

          {/* =========================================================
              BOTTOM ACTION BAR
              ========================================================= */}
          <div className="lg:col-span-12 flex flex-col sm:flex-row items-center justify-between gap-4 pt-5 border-t border-[#dec9b6]">
            <div className="flex items-center gap-2.5 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => onNavigate('family-calendar')}
                className="px-4 py-2.5 rounded-xl border border-[#dec9b6] bg-white text-[#543e34] hover:bg-[#faefe3] hover:text-[#80141d] text-[12.5px] font-bold transition-colors shadow-2xs"
              >
                ✕ Hủy Bỏ / Quay Lại
              </button>
              <button
                type="button"
                onClick={() => {
                  setToastMessage('Đã lưu bản nháp sự kiện giỗ chạp.');
                  setTimeout(() => setToastMessage(null), 2500);
                }}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-[#dec9b6] bg-white text-[#543e34] hover:bg-[#faefe3] text-[12.5px] font-bold transition-colors shadow-2xs"
              >
                <span className="material-symbols-outlined text-[17px]">save</span>
                <span>Lưu Bản Nháp</span>
              </button>
            </div>

            <div className="flex items-center gap-4 w-full sm:w-auto justify-end">
              <div className="hidden md:flex flex-col items-end text-right leading-tight">
                <span className="text-[10px] font-bold text-[#c9892c] uppercase tracking-wider">
                  SẴN SÀNG ĐỒNG BỘ
                </span>
                <span className="text-[11.5px] font-semibold text-[#80141d]">
                  Lịch Âm: 22/09 Giáp Thìn • Chi Trực Lăng
                </span>
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto px-7 py-3 rounded-xl bg-[#80141d] text-white font-bold text-[13px] shadow-md hover:bg-[#681017] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
              >
                <span>Hoàn Tất &amp; Lưu Sự Kiện Gia Tộc</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>
            </div>
          </div>
        </form>

        {/* =========================================================
            FOOTER DISCLAIMER
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
