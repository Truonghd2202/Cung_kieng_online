import React, { useState } from 'react';
import type { ScreenType } from '@/src/types.ts';

interface EventDetailScreenProps {
  onNavigate: (screen: ScreenType) => void;
}

export const EventDetailScreen: React.FC<EventDetailScreenProps> = ({ onNavigate }) => {
  const [attendingStatus, setAttendingStatus] = useState<'yes' | 'remote' | null>(null);
  const [attendeeCount, setAttendeeCount] = useState(86);
  const [remoteCount, setRemoteCount] = useState(18);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [showFullPrayer, setShowFullPrayer] = useState(false);

  const handleConfirmAttendance = (status: 'yes' | 'remote') => {
    if (status === 'yes') {
      if (attendingStatus !== 'yes') {
        setAttendeeCount((prev) => prev + 1);
        if (attendingStatus === 'remote') setRemoteCount((prev) => prev - 1);
      }
      setAttendingStatus('yes');
      setToastMessage('Đã xác nhận có mặt dâng hương tại Từ Đường! Ban Hậu cần đã ghi nhận mâm cỗ.');
    } else {
      if (attendingStatus !== 'remote') {
        setRemoteCount((prev) => prev + 1);
        if (attendingStatus === 'yes') setAttendeeCount((prev) => prev - 1);
      }
      setAttendingStatus('remote');
      setToastMessage('Đã gửi tâm hương từ xa! Tên bạn sẽ được xướng danh trong lễ cáo tổ.');
    }
    setTimeout(() => setToastMessage(null), 3500);
  };

  return (
    <div className="min-h-screen bg-[#f7eee2] text-[#2b1b15] py-4 px-3 sm:px-6 lg:px-8 pb-8">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-[#2b1b15] text-[#fdf9f4] px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-in fade-in border border-[#c9892c]">
          <span className="material-symbols-outlined text-[#c9892c]">verified</span>
          <span className="text-sm font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Modal Đọc Toàn Bộ Văn Khấn */}
      {showFullPrayer && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#fdf9f4] max-w-2xl w-full max-h-[85vh] rounded-3xl p-6 sm:p-8 shadow-2xl border-2 border-[#dec9b6] overflow-y-auto space-y-5 animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-[#ebdcd0]">
              <div>
                <span className="text-[10px] font-bold text-[#80141d] uppercase tracking-wider bg-[#faefe3] px-2.5 py-0.5 rounded">
                  CỔ BẢN TRIỀU NGUYỄN • BẢN PHỤNG ĐOÀN CHO TRƯỞNG TỘC
                </span>
                <h3 className="font-serif text-[20px] font-bold text-[#80141d] mt-1">
                  Văn Khấn Lễ Giỗ Cụ Cố Nguyễn Văn Phúc
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowFullPrayer(false)}
                className="h-8 w-8 rounded-full bg-[#faefe3] hover:bg-[#ebdcd0] flex items-center justify-center text-[#543e34]"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            <div className="font-serif text-[13.5px] text-[#2b1b15] space-y-4 leading-relaxed p-5 bg-[#faefe3] rounded-2xl border border-[#ebdcd0]">
              <p className="font-bold text-center text-[#80141d] text-[15px]">
                NAM MÔ A DI ĐÀ PHẬT! (3 lần, 3 lạy)
              </p>
              <p>
                - Con kính lạy chín phương Trời, mười phương Chư Phật, Chư Phật mười phương.<br />
                - Con kính lạy Đức Đương Cảnh Thành Hoàng chư vị Đại Vương cai quản bản xứ.<br />
                - Con kính lạy Ngài Bản Gia Đông Trù Tư Mệnh Táo Phủ Thần Quân.<br />
                - Con kính lạy Liệt Vị Tiền Hiền, Hậu Hiền khai khẩn, khai cơ dòng tộc Nguyễn Phục.
              </p>
              <p className="italic text-[#80141d]">
                Tuế thứ Giáp Thìn niên, thất nguyệt thập ngũ nhật. Việt Nam quốc, Nam Định tỉnh, Nam Trực huyện, Trực Lãng thôn...
              </p>
              <p>
                Hôm nay là tiết Lập Thu, ngày Rằm tháng Bảy năm Giáp Thìn, chính là ngày Cát Kỵ của Hiển Tổ Khảo Cụ Cố Nguyễn Văn Phúc, húy Minh Thuận, hiệu Chân Như Cư Sĩ...
              </p>
              <p>
                Cháu con đệ tử Chi Trực Lãng chúng con thành tâm sắm sửa hương hoa quả phẩm, kim ngân trầu cau, thắp nén tâm hương dâng lên trước án linh sàng. Thiết nghĩ ơn cao đức dày, như núi Thái Sơn, tấc lòng thành kính khó nỗi đáp đền...
              </p>
              <p>
                Cúi xin Thần Linh bản xứ, Tiền linh Cụ Cố giáng lâm trước án, thụ hưởng lễ vật, phù hộ độ trì cho toàn thể gia tiên an khang thịnh vượng, nhân đinh hưng thịnh, con cháu thảo hiền, vạn sự hanh thông.
              </p>
              <p className="text-center font-bold text-[#80141d]">
                Cẩn Cáo! (3 lạy)
              </p>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#ebdcd0]">
              <button
                type="button"
                onClick={() => {
                  setToastMessage('Đang chuẩn bị file in khổ giấy A4 chữ to cho Trưởng tộc xướng lễ...');
                  setTimeout(() => setToastMessage(null), 2500);
                }}
                className="px-4 py-2 rounded-xl border border-[#dec9b6] bg-white text-[#543e34] hover:bg-[#faefe3] text-[12px] font-bold flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-[17px]">print</span>
                <span>In Khổ A4 Chữ To</span>
              </button>
              <button
                type="button"
                onClick={() => setShowFullPrayer(false)}
                className="px-5 py-2 rounded-xl bg-[#80141d] text-white font-bold text-[12px] shadow-xs hover:bg-[#681017]"
              >
                Đóng Văn Khấn
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-[1440px] mx-auto space-y-4">
        {/* =========================================================
            BREADCRUMB & COUNTDOWN BADGE
            ========================================================= */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-[12px] text-[#8a6f62]">
            <button
              type="button"
              onClick={() => onNavigate('family-calendar')}
              className="hover:text-[#80141d] transition-colors"
            >
              Lịch gia tộc
            </button>
            <span>&gt;</span>
            <span className="text-[#8a6f62]">Tháng 7 Âm lịch</span>
            <span>&gt;</span>
            <span className="text-[#80141d] font-bold">
              Lễ Đại Giỗ Cụ Cố Nguyễn Văn Phúc (Đời thứ 11)
            </span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#faefe3] border border-[#ebdcd0] text-[#80141d] text-[11px] font-bold uppercase tracking-wider self-start sm:self-auto shadow-2xs">
            <span className="h-2 w-2 rounded-full bg-[#80141d] animate-ping" />
            <span>KHỞI DẪN SAU 3 NGÀY NỮA</span>
          </div>
        </div>

        {/* =========================================================
            TOP HERO BANNER CARD
            ========================================================= */}
        <div className="rounded-2xl border border-[#dec9b6] bg-[#fdf9f4] p-5 sm:p-7 shadow-xs space-y-4">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-2.5 py-0.5 rounded-full bg-[#80141d] text-white text-[10px] font-bold uppercase tracking-wider">
                  GIỖ THƯỜNG (CHÍNH KỴ • HÀNG NĂM)
                </span>
                <span className="text-[11.5px] font-semibold text-[#c9892c]">
                  • Niên khóa Giáp Thìn 2024
                </span>
              </div>
              <h1 className="font-serif text-[26px] sm:text-[34px] font-bold text-[#80141d] leading-tight tracking-tight">
                Lễ Giỗ Cụ Cố Nguyễn Văn Phúc
              </h1>
              <p className="font-serif text-[15px] font-semibold text-[#2b1b15]">
                Đời thứ 11 – Chi Phái Trực Lãng, Đại Tộc Nguyễn Phục
              </p>
              <p className="text-[12.5px] text-[#715b50] max-w-3xl leading-relaxed">
                Tưởng niệm ngày Cụ Cố quy tiên, toàn thể tử tôn quy tụ về Từ đường Chi tộc phụng tiến hương hoa quả phẩm, kính cáo tổ tông khai tiệc phụng tạ và trùng tu gia phong.
              </p>
            </div>

            {/* Quick Action Button Group */}
            <div className="flex flex-col gap-2 shrink-0 self-start lg:self-auto">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setShowFullPrayer(true)}
                  className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#80141d] text-white font-bold text-[12px] shadow-xs hover:bg-[#681017] transition-all whitespace-nowrap active:scale-[0.98]"
                >
                  <span className="material-symbols-outlined text-[17px]">print</span>
                  <span>In Văn Khấn &amp; Phân Công</span>
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate('them-su-kien')}
                  className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl border border-[#dec9b6] bg-white text-[#543e34] hover:bg-[#faefe3] hover:text-[#80141d] text-[12px] font-bold transition-colors shadow-2xs whitespace-nowrap"
                >
                  <span className="material-symbols-outlined text-[16px]">edit</span>
                  <span>Chỉnh sửa</span>
                </button>
              </div>

              <div className="flex items-center justify-end gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => {
                    setToastMessage('Đã sao chép liên kết thư mời lễ giỗ dòng họ!');
                    setTimeout(() => setToastMessage(null), 2500);
                  }}
                  className="flex items-center gap-1 text-[11.5px] font-semibold text-[#715b50] hover:text-[#80141d] transition-colors"
                >
                  <span className="material-symbols-outlined text-[14px]">share</span>
                  <span>Chia sẻ dòng họ</span>
                </button>
                <span className="text-[#dec9b6]">•</span>
                <button
                  type="button"
                  onClick={() => {
                    setToastMessage('Đã đồng bộ sự kiện vào Google / Apple Calendar!');
                    setTimeout(() => setToastMessage(null), 2500);
                  }}
                  className="flex items-center gap-1 text-[11.5px] font-semibold text-[#715b50] hover:text-[#80141d] transition-colors"
                >
                  <span className="material-symbols-outlined text-[14px]">calendar_add_on</span>
                  <span>Thêm vào Lịch</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================
            BỐ CỤC 2 CỘT: CỘT TRÁI (8 COLS) + CỘT PHẢI (4 COLS)
            ========================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          {/* CỘT TRÁI (8 COLS) */}
          <div className="lg:col-span-8 space-y-5">
            {/* HỘP NGÀY ÂM & NGÀY DƯƠNG */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {/* Box Âm Lịch */}
              <div className="rounded-2xl border border-[#dec9b6] bg-[#faefe3] p-4.5 shadow-2xs flex items-start gap-3.5">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#80141d]/10 text-[#80141d]">
                  <span className="material-symbols-outlined text-[24px]">dark_mode</span>
                </span>
                <div className="leading-tight">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#80141d]">
                    ÂM LỊCH TRUYỀN THỐNG
                  </span>
                  <div className="font-serif text-[24px] font-bold text-[#80141d] mt-1">
                    15 Tháng 7
                  </div>
                  <div className="text-[11.5px] font-medium text-[#715b50] mt-1">
                    Năm Giáp Thìn (Chính Kỵ)
                  </div>
                  <div className="text-[11px] text-[#8a6f62] mt-0.5">
                    Tứ Can Chi: Canh Thân • Tiết Lập Thu
                  </div>
                </div>
              </div>

              {/* Box Dương Lịch */}
              <div className="rounded-2xl border border-[#dec9b6] bg-[#fdf9f4] p-4.5 shadow-2xs flex items-start gap-3.5">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#c9892c]/15 text-[#c9892c]">
                  <span className="material-symbols-outlined text-[24px]">calendar_month</span>
                </span>
                <div className="leading-tight">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#715b50]">
                    DƯƠNG LỊCH THAM CHIẾU
                  </span>
                  <div className="font-serif text-[24px] font-bold text-[#2b1b15] mt-1">
                    18 Tháng 8, 2024
                  </div>
                  <div className="text-[11.5px] font-medium text-[#715b50] mt-1">
                    Chủ Nhật (Ngày nghỉ cuối tuần)
                  </div>
                  <div className="text-[11px] text-[#80141d] font-semibold mt-0.5">
                    Giờ cúng: Giờ Tỵ (09:00 - 11:00)
                  </div>
                </div>
              </div>
            </div>

            {/* KHẮC GIỜ TẾ LỄ (HOÀNG ĐẠO BANNER) */}
            <div className="rounded-xl border border-[#dec9b6] bg-[#faefe3] p-3.5 flex items-center gap-2.5 text-[12px] text-[#543e34]">
              <span className="material-symbols-outlined text-[#c9892c] text-[20px] shrink-0">
                explore
              </span>
              <p className="font-serif leading-relaxed">
                Khắc giờ tế lễ: <strong className="text-[#80141d]">09:15 sáng (chính Giờ Tỵ)</strong> là thời khắc Hoàng Đạo – Kim Quỹ cát tinh phụng tế tổ tiên toàn vẹn phước lành.
              </p>
            </div>

            {/* ĐỊA ĐIỂM & BẢN ĐỒ TỪ ĐƯỜNG */}
            <div className="rounded-2xl border border-[#dec9b6] bg-[#fdf9f4] p-5 shadow-xs space-y-3.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#80141d] text-[20px]">
                    location_on
                  </span>
                  <h3 className="font-serif text-[15.5px] font-bold text-[#80141d]">
                    Từ Đường Chi Tộc Nguyễn Phục
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setToastMessage('Đang mở chỉ đường Google Maps tới Từ Đường Nam Định...')}
                  className="text-[11.5px] font-bold text-[#80141d] hover:underline flex items-center gap-1"
                >
                  <span>Mở Google Maps</span>
                  <span className="material-symbols-outlined text-[14px]">open_in_new</span>
                </button>
              </div>

              <p className="text-[12px] font-medium text-[#543e34]">
                Thôn Trực Lãng, Huyện Nam Trực, Tỉnh Nam Định
              </p>

              {/* Bản Đồ Tương Tác / Minh Họa Chân Thực */}
              <div className="relative h-52 rounded-xl overflow-hidden border border-[#dec9b6] bg-[#eef3f0]">
                {/* SVG Bản Đồ Nam Định / Nam Trực */}
                <svg className="w-full h-full" viewBox="0 0 600 240" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Nền đất & sông */}
                  <rect width="600" height="240" fill="#eaf2ec" />
                  {/* Sông Hồng uốn lượn */}
                  <path d="M 0,40 Q 150,20 280,60 T 600,30 L 600,0 L 0,0 Z" fill="#cde5f5" />
                  <path d="M 0,40 Q 150,20 280,60 T 600,30" stroke="#a3cbe8" strokeWidth="18" fill="none" />
                  {/* Sông Đào Nam Định */}
                  <path d="M 120,45 Q 160,110 240,160 T 360,240" stroke="#badcf2" strokeWidth="12" fill="none" />
                  <text x="180" y="32" fill="#5885a8" fontSize="9" fontWeight="bold" fontFamily="sans-serif">SÔNG HỒNG</text>
                  <text x="175" y="125" fill="#5885a8" fontSize="8" fontFamily="sans-serif" transform="rotate(35 175 125)">Sông Đào</text>

                  {/* Hệ thống đường giao thông Quốc lộ 21 */}
                  <path d="M 40,220 L 160,130 L 290,95 L 420,115 L 560,170" stroke="#f6d38b" strokeWidth="7" fill="none" />
                  <path d="M 40,220 L 160,130 L 290,95 L 420,115 L 560,170" stroke="#f0aa38" strokeWidth="4" fill="none" strokeDasharray="6 3" />
                  <text x="210" y="105" fill="#a05d15" fontSize="8" fontWeight="bold">QL.21</text>

                  {/* Tỉnh lộ & Đường liên thôn */}
                  <path d="M 290,95 L 340,150 L 370,185" stroke="#ffffff" strokeWidth="4" fill="none" />
                  <path d="M 160,130 L 220,180 L 340,150" stroke="#ffffff" strokeWidth="3" fill="none" />
                  <path d="M 340,150 L 460,175" stroke="#ffffff" strokeWidth="3" fill="none" />

                  {/* Các điểm địa danh */}
                  {/* TP Nam Định */}
                  <circle cx="150" cy="80" r="4" fill="#3b82f6" />
                  <text x="158" y="83" fill="#1e3a8a" fontSize="10" fontWeight="bold" fontFamily="sans-serif">TP. Nam Định</text>
                  <circle cx="160" cy="130" r="3" fill="#64748b" />
                  <text x="110" y="145" fill="#475569" fontSize="8">Cầu Đò Quan</text>

                  {/* Nam Trực */}
                  <circle cx="280" cy="115" r="3.5" fill="#15803d" />
                  <text x="290" y="122" fill="#166534" fontSize="10" fontWeight="bold" fontFamily="sans-serif">Nam Trực</text>

                  {/* Cầu Vòi */}
                  <circle cx="220" cy="180" r="2.5" fill="#64748b" />
                  <text x="226" y="183" fill="#64748b" fontSize="8">Cầu Vòi</text>

                  {/* Cổ Lễ */}
                  <circle cx="460" cy="175" r="3" fill="#64748b" />
                  <text x="466" y="179" fill="#475569" fontSize="8.5">Cổ Lễ</text>

                  {/* Điểm nhấn: Từ Đường Chi Tộc Nguyễn Phục tại Thôn Trực Lãng */}
                  <g transform="translate(340, 150)">
                    <circle cx="0" cy="0" r="16" fill="#80141d" opacity="0.15" className="animate-ping" />
                    <circle cx="0" cy="0" r="8" fill="#80141d" opacity="0.3" />
                    <circle cx="0" cy="0" r="4.5" fill="#80141d" />
                    {/* Hộp nhãn vị trí */}
                    <rect x="-90" y="-32" width="180" height="22" rx="4" fill="#80141d" filter="drop-shadow(0px 2px 4px rgba(0,0,0,0.2))" />
                    <polygon points="0,-10 -5,-14 5,-14" fill="#80141d" />
                    <text x="0" y="-17" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
                      Từ Đường Chi Tộc Nguyễn Phục
                    </text>
                  </g>
                  <text x="340" y="175" fill="#80141d" fontSize="9" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
                    Thôn Trực Lãng
                  </text>
                </svg>

                {/* Thanh thông số dưới chân bản đồ */}
                <div className="absolute bottom-2.5 left-3 right-3 flex flex-wrap items-center justify-between gap-2 bg-[#fdf9f4]/95 backdrop-blur-xs px-3.5 py-1.5 rounded-lg border border-[#dec9b6] text-[11px] shadow-sm">
                  <span className="flex items-center gap-1 font-bold text-[#80141d]">
                    <span className="material-symbols-outlined text-[15px]">my_location</span>
                    <span>Tọa độ GPS: 20.3541° N, 106.1850° E</span>
                  </span>
                  <span className="text-[#715b50] font-medium">
                    Xe 16-29 chỗ vào tận sân công hiệu
                  </span>
                </div>
              </div>
            </div>

            {/* CHƯƠNG TRÌNH LỄ TẾ & PHỤNG NGHINH */}
            <div className="rounded-2xl border border-[#dec9b6] bg-[#fdf9f4] p-5 sm:p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#ebdcd0]">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#80141d] text-[20px]">
                    schedule
                  </span>
                  <h3 className="font-serif text-[16px] font-bold text-[#80141d]">
                    Chương Trình Lễ Tế &amp; Phụng Nghinh
                  </h3>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#8a6f62] bg-[#faefe3] px-2.5 py-0.5 rounded border border-[#ebdcd0]">
                  TRANG NGHIÊM &amp; ĐẠO HIẾU
                </span>
              </div>

              {/* Dòng thời gian 4 giai đoạn */}
              <div className="space-y-3.5 relative before:absolute before:inset-0 before:left-2.5 before:w-0.5 before:bg-[#ebdcd0]">
                {/* 1. Đón tiếp */}
                <div className="relative flex items-start gap-3 pl-6">
                  <span className="absolute left-1.5 top-1.5 h-2.5 w-2.5 rounded-full bg-[#80141d] ring-4 ring-[#80141d]/15" />
                  <div className="flex-1 p-3.5 rounded-xl border border-[#ebdcd0] bg-white space-y-1 shadow-2xs">
                    <div className="flex items-center justify-between text-[11.5px]">
                      <strong className="text-[#80141d]">08:00 – 09:00 (60 phút)</strong>
                      <span className="text-[#8a6f62]">Khánh tiết &amp; Hậu cần</span>
                    </div>
                    <h4 className="font-serif text-[13.5px] font-bold text-[#2b1b15]">
                      Đón tiếp Chi phái, Trưởng các chi đệ &amp; Con cháu nội ngoại
                    </h4>
                    <p className="text-[11.5px] text-[#715b50] leading-relaxed">
                      Ban Khánh tiết tiếp đón tại Hậu trường Từ đường. Ghi nhận số giỗ hương chúc, kiểm tra chỉnh tề trang phục phụng tế, dâng trà đầu ngày.
                    </p>
                  </div>
                </div>

                {/* 2. Khởi khóa lễ dâng hương (Khắc trọng lễ) */}
                <div className="relative flex items-start gap-3 pl-6">
                  <span className="absolute left-1.5 top-1.5 h-2.5 w-2.5 rounded-full bg-[#c9892c] ring-4 ring-[#c9892c]/20" />
                  <div className="flex-1 p-3.5 rounded-xl border border-[#c9892c]/50 bg-[#faefe3] space-y-1 shadow-2xs">
                    <div className="flex items-center justify-between text-[11.5px]">
                      <strong className="text-[#80141d]">09:15 – 10:15</strong>
                      <span className="px-2 py-0.5 rounded bg-[#80141d] text-white text-[9.5px] font-bold">
                        Khâu trọng lễ
                      </span>
                    </div>
                    <h4 className="font-serif text-[14px] font-bold text-[#80141d]">
                      Khởi khóa Lễ Dâng Hương &amp; Tuyên Đọc Cổ Văn Khấn
                    </h4>
                    <p className="text-[11.5px] text-[#543e34] leading-relaxed">
                      Bác Trưởng tộc Nguyễn Phục Tường Cảnh chủ trì tuần nhang thứ nhất, tuần rượu, đọc chúc văn gia tiên triều Nguyễn. Bồi tế và chư tôn tử tuần tự phụng bái.
                    </p>
                  </div>
                </div>

                {/* 3. Lễ Tạ Hoá Vàng */}
                <div className="relative flex items-start gap-3 pl-6">
                  <span className="absolute left-1.5 top-1.5 h-2.5 w-2.5 rounded-full bg-[#dec9b6]" />
                  <div className="flex-1 p-3.5 rounded-xl border border-[#ebdcd0] bg-white space-y-1 shadow-2xs">
                    <div className="flex items-center justify-between text-[11.5px]">
                      <strong className="text-[#2b1b15]">10:30 – 11:30</strong>
                      <span className="text-[#80141d] font-bold text-[10.5px]">Lễ Tạ</span>
                    </div>
                    <h4 className="font-serif text-[13.5px] font-bold text-[#2b1b15]">
                      Lễ Tạ Hoá Vàng &amp; Khai Tiệc Thọ Lộc Đồng Gia
                    </h4>
                    <p className="text-[11.5px] text-[#715b50] leading-relaxed">
                      Hóa chúc văn tại đình đồng tiền đường. Toàn thể con cháu tề tựu thụ lộc cỗ truyền thống, chuyện trò sum vầy tình thân cốt nhục.
                    </p>
                  </div>
                </div>

                {/* 4. Họp Mặt Khuyến Học */}
                <div className="relative flex items-start gap-3 pl-6">
                  <span className="absolute left-1.5 top-1.5 h-2.5 w-2.5 rounded-full bg-[#dec9b6]" />
                  <div className="flex-1 p-3.5 rounded-xl border border-[#ebdcd0] bg-white space-y-1 shadow-2xs">
                    <div className="flex items-center justify-between text-[11.5px]">
                      <strong className="text-[#2b1b15]">11:30 – 12:30</strong>
                      <span className="text-[#c9892c] font-bold text-[10.5px]">Học Tảo Biểu</span>
                    </div>
                    <h4 className="font-serif text-[13.5px] font-bold text-[#2b1b15]">
                      Họp Mặt Khuyến Học &amp; Công Bố Quỹ Bảo Tồn Di Sản
                    </h4>
                    <p className="text-[11.5px] text-[#715b50] leading-relaxed">
                      Trao bảng biểu dương khuyến học cho các cháu thế hệ 13, 14 đạt thành tích cao trong học tập, báo cáo tài chính tu tạo nhà thờ tổ.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* BAN TRỊ SỰ & PHÂN CÔNG TÁC VỤ NGÀY GIỖ */}
            <div className="rounded-2xl border border-[#dec9b6] bg-[#fdf9f4] p-5 sm:p-6 shadow-xs space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#ebdcd0]">
                <div>
                  <h3 className="font-serif text-[16px] font-bold text-[#80141d]">
                    Ban Trị Sự &amp; Phân Công Tác Vụ Ngày Giỗ
                  </h3>
                  <p className="text-[11px] text-[#8a6f62]">
                    Sắp xếp những sự chu toàn để công việc tế tự và hiếu lễ diễn ra trang nghiêm, thuận hòa
                  </p>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <div className="text-center">
                    <div className="font-serif font-bold text-[16px] text-[#80141d] leading-none">{attendeeCount}</div>
                    <span className="text-[10px] text-[#715b50]">Báo có mặt</span>
                  </div>
                  <div className="text-center">
                    <div className="font-serif font-bold text-[16px] text-[#2b1b15] leading-none">{remoteCount}</div>
                    <span className="text-[10px] text-[#715b50]">Ở xa bái vọng</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleConfirmAttendance('yes')}
                    className="px-3 py-1.5 rounded-lg bg-[#80141d] text-white text-[11px] font-bold shadow-2xs hover:bg-[#681017] transition-all ml-1"
                  >
                    Báo danh tham dự
                  </button>
                </div>
              </div>

              {/* 3 Cột Ban Trị Sự */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* 1. Ban Tế Tự */}
                <div className="p-3.5 rounded-xl border border-[#ebdcd0] bg-white space-y-2.5">
                  <div className="flex items-center justify-between text-[11.5px] font-bold text-[#80141d]">
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-[15px]">verified</span>
                      Ban Tế Tự
                    </span>
                    <span className="text-[10px] text-[#8a6f62]">4 vị</span>
                  </div>
                  <div className="space-y-1.5 text-[11px]">
                    <div className="p-2 rounded-lg bg-[#faefe3] border border-[#ebdcd0] flex items-center justify-between">
                      <div>
                        <strong className="block text-[#2b1b15]">Nguyễn Phục Tường Cảnh</strong>
                        <span className="text-[10px] text-[#80141d] font-semibold">Chủ Tế (Bác Trưởng Tộc)</span>
                      </div>
                      <span className="material-symbols-outlined text-[#80141d] text-[16px]">check_circle</span>
                    </div>
                    <div className="p-2 rounded-lg bg-[#fdf9f4] border border-[#ebdcd0] flex items-center justify-between">
                      <div>
                        <strong className="block text-[#2b1b15]">Nguyễn Phục Khiêm</strong>
                        <span className="text-[10px] text-[#715b50]">Bồi Tế Hữu</span>
                      </div>
                      <span className="material-symbols-outlined text-[#dec9b6] text-[16px]">check_circle</span>
                    </div>
                    <div className="p-2 rounded-lg bg-[#fdf9f4] border border-[#ebdcd0] flex items-center justify-between">
                      <div>
                        <strong className="block text-[#2b1b15]">Nguyễn Văn Vĩnh</strong>
                        <span className="text-[10px] text-[#715b50]">Chấp Sự Tiền Hương</span>
                      </div>
                      <span className="material-symbols-outlined text-[#dec9b6] text-[16px]">check_circle</span>
                    </div>
                  </div>
                </div>

                {/* 2. Ban Hậu Cần & Cỗ Bàn */}
                <div className="p-3.5 rounded-xl border border-[#ebdcd0] bg-white space-y-2.5">
                  <div className="flex items-center justify-between text-[11.5px] font-bold text-[#80141d]">
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-[15px]">soup_kitchen</span>
                      Ban Hậu Cần &amp; Cỗ Bàn
                    </span>
                    <span className="text-[10px] text-[#8a6f62]">8 Mâm Tiệc</span>
                  </div>
                  <div className="space-y-1.5 text-[11px]">
                    <div className="p-2 rounded-lg bg-[#fdf9f4] border border-[#ebdcd0]">
                      <div className="flex items-center justify-between">
                        <strong className="text-[#2b1b15]">4 Mâm Cỗ Mặn Truyền Thống</strong>
                        <span className="text-[9.5px] text-[#80141d] font-bold">Chính 6 Họ</span>
                      </div>
                      <p className="text-[10px] text-[#715b50] mt-0.5 leading-snug">
                        Gà đồi hấp lá chanh, giò lụa gia truyền Nam Trực, xôi gấc hạt sen, nem thính Trực Lãng, canh măng miến bóng cổ từ.
                      </p>
                    </div>
                    <div className="p-2 rounded-lg bg-[#fdf9f4] border border-[#ebdcd0]">
                      <div className="flex items-center justify-between">
                        <strong className="text-[#2b1b15]">1 Mâm Chay Thanh Tịnh</strong>
                        <span className="text-[9.5px] text-[#c9892c] font-bold">Tảo Đền Phật</span>
                      </div>
                      <p className="text-[10px] text-[#715b50] mt-0.5 leading-snug">
                        Phụ trách: Chị dâu trưởng Nguyễn Thị Mai &amp; Ban Nữ công gia phái.
                      </p>
                    </div>
                  </div>
                </div>

                {/* 3. Ban Tiếp Tân & Kỷ Niệm */}
                <div className="p-3.5 rounded-xl border border-[#ebdcd0] bg-white space-y-2.5">
                  <div className="flex items-center justify-between text-[11.5px] font-bold text-[#80141d]">
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-[15px]">diversity_3</span>
                      Ban Tiếp Tân &amp; Kỷ Niệm
                    </span>
                    <span className="text-[10px] text-[#8a6f62]">Thế hệ trẻ</span>
                  </div>
                  <div className="space-y-1.5 text-[11px]">
                    <div className="p-2 rounded-lg bg-[#fdf9f4] border border-[#ebdcd0]">
                      <strong className="block text-[#2b1b15]">Tiếp nước &amp; Ghi Sổ Lưu Niệm</strong>
                      <p className="text-[10px] text-[#715b50] mt-0.5 leading-snug">
                        Phụ trách: Nguyễn Trực Anh &amp; Nguyễn Mai Hương (Đời 13). Hướng dẫn bãi đỗ xe ô tô tại sân hợp tác xã cũ.
                      </p>
                    </div>
                    <div className="p-2 rounded-lg bg-[#fdf9f4] border border-[#ebdcd0]">
                      <strong className="block text-[#2b1b15]">Chụp ảnh &amp; Tư liệu hóa lưu trữ</strong>
                      <p className="text-[10px] text-[#715b50] mt-0.5 leading-snug">
                        Phụ trách: Nguyễn Phục Tuấn. Đảm nhiệm quay phim, chụp ảnh tư liệu tải thẳng lên Kho Ký Vật.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* KÝ ỨC & HÌNH ẢNH NHỮNG MÙA GIỖ TRƯỚC */}
            <div className="rounded-2xl border border-[#dec9b6] bg-[#fdf9f4] p-5 sm:p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-[#ebdcd0]">
                <div>
                  <h3 className="font-serif text-[16px] font-bold text-[#80141d]">
                    Ký Ức &amp; Hình Ảnh Những Mùa Giỗ Trước
                  </h3>
                  <p className="text-[11px] text-[#8a6f62]">
                    Dòng thời gian kết nối các thế hệ – Tư liệu được toàn tộc đóng góp và lưu trữ trường tồn
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setToastMessage('Đã mở công cụ tải ảnh kỷ niệm mùa giỗ!')}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#dec9b6] bg-white text-[#543e34] hover:bg-[#faefe3] hover:text-[#80141d] text-[11.5px] font-bold shadow-2xs"
                >
                  <span className="material-symbols-outlined text-[16px]">add_photo_alternate</span>
                  <span>Tải Lên Ảnh Kỷ Niệm Mới</span>
                </button>
              </div>

              {/* 3 Thẻ Ảnh Lịch Sử + 1 Thẻ Đóng Góp */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {/* Ảnh 1 */}
                <div className="rounded-xl border border-[#ebdcd0] bg-white overflow-hidden shadow-2xs group">
                  <div className="relative aspect-[4/3] bg-[#2b1b15]">
                    <img
                      src="/images/hero_family.jpg"
                      alt="Giỗ 2023"
                      className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/75 backdrop-blur-xs text-white text-[9px] font-bold">
                      Năm Quý Mão (2023)
                    </span>
                  </div>
                  <div className="p-2.5">
                    <h5 className="font-serif text-[12px] font-bold text-[#2b1b15] truncate">
                      Đại đoàn viên kỷ niệm 35 năm n...
                    </h5>
                    <div className="text-[10px] text-[#8a6f62] flex items-center justify-between mt-1">
                      <span>24 hình ảnh</span>
                      <span>Người chụp: Trực Minh</span>
                    </div>
                  </div>
                </div>

                {/* Ảnh 2 */}
                <div className="rounded-xl border border-[#ebdcd0] bg-white overflow-hidden shadow-2xs group">
                  <div className="relative aspect-[4/3] bg-[#2b1b15]">
                    <img
                      src="/images/relic_book.jpg"
                      alt="Giỗ 2022"
                      className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/75 backdrop-blur-xs text-white text-[9px] font-bold">
                      Năm Nhâm Dần (2022)
                    </span>
                  </div>
                  <div className="p-2.5">
                    <h5 className="font-serif text-[12px] font-bold text-[#2b1b15] truncate">
                      Khóa tế đầu tiên sau trùng tu Từ...
                    </h5>
                    <div className="text-[10px] text-[#8a6f62] flex items-center justify-between mt-1">
                      <span>42 hình ảnh</span>
                      <span>Người chụp: Tường Cảnh</span>
                    </div>
                  </div>
                </div>

                {/* Ảnh 3 */}
                <div className="rounded-xl border border-[#ebdcd0] bg-white overflow-hidden shadow-2xs group">
                  <div className="relative aspect-[4/3] bg-[#2b1b15]">
                    <img
                      src="/images/relic_medals.jpg"
                      alt="Giỗ 1989"
                      className="h-full w-full object-cover sepia-[0.4] group-hover:scale-105 transition-transform duration-300"
                    />
                    <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/75 backdrop-blur-xs text-white text-[9px] font-bold">
                      Năm Kỷ Tỵ (1989) • Tư liệu cổ
                    </span>
                  </div>
                  <div className="p-2.5">
                    <h5 className="font-serif text-[12px] font-bold text-[#2b1b15] truncate">
                      Bản lưu tư liệu lễ giỗ đoạn tang ...
                    </h5>
                    <div className="text-[10px] text-[#8a6f62] flex items-center justify-between mt-1">
                      <span>Bản scan ảnh màu gộp</span>
                      <span>Cho lưu trữ</span>
                    </div>
                  </div>
                </div>

                {/* Upload Dropzone */}
                <div
                  onClick={() => setToastMessage('Đang mở bộ tải lên kỷ vật / hình ảnh gia tộc...')}
                  className="rounded-xl border-2 border-dashed border-[#dec9b6] bg-white p-3 flex flex-col items-center justify-center text-center hover:border-[#80141d] hover:bg-[#faefe3]/40 transition-all cursor-pointer shadow-2xs group"
                >
                  <span className="material-symbols-outlined text-[26px] text-[#c9892c] group-hover:scale-110 transition-transform mb-1">
                    cloud_upload
                  </span>
                  <div className="text-[11.5px] font-bold text-[#2b1b15]">
                    Đóng góp kỷ vật/hình ảnh
                  </div>
                  <div className="text-[9.5px] text-[#8a6f62] mt-1 leading-tight px-1">
                    Kéo thả hình chụp kỷ niệm, clip cúng giỗ hoặc kỷ vật gia tiên
                  </div>
                  <span className="mt-2 text-[9.5px] font-semibold text-[#80141d] bg-[#faefe3] px-2 py-0.5 rounded">
                    Tối đa 100MB / tệp tin
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* =======================================================
              CỘT PHẢI (4 COLS): NGƯỜI ĐƯỢC PHỤNG THỜ & VĂN KHẤN
              ======================================================= */}
          <div className="lg:col-span-4 space-y-5">
            {/* THẺ NGƯỜI ĐƯỢC PHỤNG THỜ */}
            <div className="rounded-2xl border border-[#dec9b6] bg-[#fdf9f4] p-5 shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-[#ebdcd0]">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#80141d] flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">person</span>
                  NGƯỜI ĐƯỢC PHỤNG THỜ
                </span>
                <span className="text-[11px] font-serif text-[#8a6f62]">
                  Hưởng thọ 77 tuổi
                </span>
              </div>

              {/* Chân Dung Cụ Cố */}
              <div className="flex flex-col items-center text-center">
                <div className="relative w-36 h-44 rounded-xl overflow-hidden border-2 border-[#dec9b6] bg-[#2b1b15] shadow-md mb-2.5">
                  <img
                    src="/images/ancestor_portrait.jpg"
                    alt="Cụ Cố Nguyễn Văn Phúc"
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute bottom-1.5 inset-x-2 text-center bg-black/75 backdrop-blur-xs text-[9.5px] font-bold text-white py-0.5 rounded border border-white/20">
                    Di họa phục chế AI
                  </span>
                </div>

                <h3 className="font-serif text-[19px] font-bold text-[#80141d]">
                  Cụ Cố Nguyễn Văn Phúc
                </h3>
                <p className="text-[11.5px] text-[#715b50] font-medium mt-0.5">
                  Tự: Minh Thuận • Hiệu: Chân Như Cư Sĩ
                </p>
                <p className="text-[11px] text-[#8a6f62] mt-0.5">
                  Sinh: 1912 (Nhâm Tý) – Mất: 1988 (Mậu Thìn)
                </p>
                <p className="text-[11.5px] text-[#543e34] leading-relaxed mt-2 text-justify">
                  Bậc tiền bối đời thứ 11 có công gầy dựng cơ sở canh nông thôn Trực Lãng, phụng hiến ruộng tư điền và bảo tồn bản hương ước chi phái qua các...
                </p>
              </div>

              {/* Vị Trí Tế Tự & Mộ Phần */}
              <div className="space-y-1.5 pt-2 border-t border-[#ebdcd0] text-[11px]">
                <div className="flex items-start gap-1.5 text-[#543e34]">
                  <span className="material-symbols-outlined text-[14px] text-[#80141d] shrink-0 mt-0.5">
                    temple_buddhist
                  </span>
                  <span><strong>Vị trí tế tự:</strong> Đệ thập nhất đại tiền tổ – Tả ban Từ đường</span>
                </div>
                <div className="flex items-start gap-1.5 text-[#543e34]">
                  <span className="material-symbols-outlined text-[14px] text-[#80141d] shrink-0 mt-0.5">
                    location_on
                  </span>
                  <span><strong>Mộ phần tọa lạc:</strong> Cánh đồng Đăng Lăng, liên thôn</span>
                </div>
              </div>

              {/* 2 Nút Xem Phả Hệ & Kỷ Vật */}
              <div className="grid grid-cols-2 gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => onNavigate('cay-pha-he-25d')}
                  className="flex items-center justify-center gap-1 h-9 rounded-lg border border-[#dec9b6] bg-white text-[#543e34] hover:bg-[#faefe3] hover:text-[#80141d] text-[11px] font-bold transition-all shadow-2xs"
                >
                  <span className="material-symbols-outlined text-[15px]">account_tree</span>
                  <span>Xem trên Phả Hệ</span>
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate('kho-ky-uc')}
                  className="flex items-center justify-center gap-1 h-9 rounded-lg border border-[#dec9b6] bg-white text-[#543e34] hover:bg-[#faefe3] hover:text-[#80141d] text-[11px] font-bold transition-all shadow-2xs"
                >
                  <span className="material-symbols-outlined text-[15px]">photo_library</span>
                  <span>12 Kỷ Vật &amp; Điển Tích</span>
                </button>
              </div>
            </div>

            {/* THẺ VĂN KHẤN LỄ GIỖ CỔ BẢN */}
            <div className="rounded-2xl border border-[#dec9b6] bg-[#fdf9f4] p-5 shadow-xs space-y-3.5">
              <div className="flex items-center justify-between pb-2 border-b border-[#ebdcd0]">
                <h3 className="font-serif text-[15px] font-bold text-[#80141d] flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[18px]">menu_book</span>
                  <span>Văn Khấn Lễ Giỗ Cổ Bản</span>
                </h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#faefe3] text-[#80141d] border border-[#ebdcd0]">
                  Triều Nguyễn
                </span>
              </div>

              {/* Trích đoạn */}
              <div className="rounded-xl border border-[#dec9b6] bg-[#faefe3] p-3.5 space-y-2">
                <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider">
                  <span className="text-[#80141d]">BẢN PHỤNG ĐOÀN CHO TRƯỞNG TỘC</span>
                  <span className="text-[#8a6f62]">Hán Nôm &amp; Quốc Ngữ</span>
                </div>
                <blockquote className="text-[11.5px] italic text-[#4a352a] leading-relaxed font-serif">
                  &ldquo;Nam mô A Di Đà Phật (3 lần). Cẩn cáo: Tuế thứ Giáp Thìn niên, thất nguyệt thập ngũ nhật. Việt Nam quốc, Nam Định tỉnh, Nam Trực huyện, Trực Lãng thôn... Hiển Tổ Khảo Cụ Cố Nguyễn Văn Phúc, tự Minh Thuận... Cúi xin giáng lâm trước án, thụ hưởng lễ vật, phù hộ độ trì cho toàn thể gia tiên an khang thịnh vượng...&rdquo;
                </blockquote>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setShowFullPrayer(true)}
                  className="flex items-center justify-center gap-1 h-8.5 rounded-lg bg-[#80141d] text-white text-[11px] font-bold shadow-2xs hover:bg-[#681017] transition-all"
                >
                  <span className="material-symbols-outlined text-[15px]">visibility</span>
                  <span>Đọc toàn văn bản</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setToastMessage('Đang kết xuất PDF khổ A4 chữ to cho Trưởng tộc...');
                    setTimeout(() => setToastMessage(null), 2500);
                  }}
                  className="flex items-center justify-center gap-1 h-8.5 rounded-lg border border-[#dec9b6] bg-white text-[#543e34] hover:bg-[#faefe3] text-[11px] font-bold shadow-2xs transition-all"
                >
                  <span className="material-symbols-outlined text-[15px]">picture_as_pdf</span>
                  <span>PDF Chữ To (A4)</span>
                </button>
              </div>

              {/* Chuẩn Bị Sắm Lễ Cúng Tế */}
              <div className="pt-3 border-t border-[#ebdcd0] space-y-2">
                <h4 className="font-serif text-[12.5px] font-bold text-[#2b1b15] flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px] text-[#c9892c]">checklist</span>
                  <span>Chuẩn bị sắm lễ cúng tế</span>
                </h4>
                <div className="space-y-1.5 text-[11px] text-[#543e34]">
                  <div className="flex items-start gap-1.5">
                    <span className="material-symbols-outlined text-[#80141d] text-[14px] shrink-0 mt-0.5">check_circle</span>
                    <span>Hương trầm xứ Nam Định, hoa cúc vàng đại đóa 15 cành thanh khiết.</span>
                  </div>
                  <div className="flex items-start gap-1.5">
                    <span className="material-symbols-outlined text-[#80141d] text-[14px] shrink-0 mt-0.5">check_circle</span>
                    <span>Trầu cau tươi 5 lá 5 quả quết vôi nồng truyền thống cổ lễ.</span>
                  </div>
                  <div className="flex items-start gap-1.5">
                    <span className="material-symbols-outlined text-[#80141d] text-[14px] shrink-0 mt-0.5">check_circle</span>
                    <span>Tiền vàng mã bàn thờ chuẩn phong tục họ Nguyễn không lạm dụng đốt nhiều.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================
            BANNER XÁC NHẬN THAM DỰ ĐẠI GIỖ (CỐ ĐỊNH THEO DÒNG TRANG)
            ========================================================= */}
        <div className="rounded-2xl border border-[#dec9b6] bg-[#fdf9f4] p-4.5 sm:px-6 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#faefe3] border border-[#ebdcd0] text-[#80141d]">
              <span className="material-symbols-outlined text-[20px]">how_to_reg</span>
            </span>
            <div>
              <h4 className="font-serif text-[14px] sm:text-[15px] font-bold text-[#80141d]">
                Bạn có tham dự ngày Đại Giỗ năm nay không?
              </h4>
              <p className="text-[11px] sm:text-[11.5px] text-[#715b50]">
                Phản hồi giúp Ban Hậu cần chuẩn bị mâm cỗ chu đáo nhất
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto shrink-0 justify-end">
            <button
              type="button"
              onClick={() => handleConfirmAttendance('remote')}
              className={`flex-1 sm:flex-none px-4 py-2 rounded-xl text-[12px] font-semibold transition-all border shadow-2xs ${
                attendingStatus === 'remote'
                  ? 'bg-[#c9892c] text-white border-[#c9892c]'
                  : 'border-[#dec9b6] bg-white text-[#543e34] hover:bg-[#faefe3]'
              }`}
            >
              Gửi Tâm Hương Từ Xa
            </button>
            <button
              type="button"
              onClick={() => handleConfirmAttendance('yes')}
              className="flex-1 sm:flex-none px-5 py-2 rounded-xl bg-[#80141d] text-white text-[12px] font-bold shadow-xs hover:bg-[#681017] transition-all flex items-center justify-center gap-1"
            >
              <span>✓</span>
              <span>Xác Nhận Có Mặt</span>
            </button>
          </div>
        </div>

        {/* =========================================================
            FOOTER DISCLAIMER
            ========================================================= */}
        <div className="pt-4 border-t border-[#ebdcd0] flex flex-col sm:flex-row items-center justify-between gap-2 text-[11.5px] text-[#8a6f62]">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[16px] text-[#c9892c]">verified_user</span>
            <span>Không gian lưu trữ phả hệ khép kín &amp; bảo mật đời đời cho đại gia đình</span>
          </div>
          <div>
            Thích Cúng Kiếng • Kính ngưỡng tổ tiên • © Giữ gìn ức – Nối cội nguồn
          </div>
        </div>
      </div>
    </div>
  );
};
