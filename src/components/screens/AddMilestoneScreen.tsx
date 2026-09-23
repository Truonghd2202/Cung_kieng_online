import React, { useState } from 'react';
import type { ScreenType } from '../../types.ts';

interface AddMilestoneScreenProps {
  onNavigate: (screen: ScreenType) => void;
}

export const AddMilestoneScreen: React.FC<AddMilestoneScreenProps> = ({ onNavigate }) => {
  const [milestoneName, setMilestoneName] = useState<string>(
    'Cụ Trực Thao Trùng Tu Văn Chỉ & Khánh Thành Từ Đường Chi Giáp'
  );
  const [category, setCategory] = useState<string>('ancestor');
  const [solarDate, setSolarDate] = useState<string>('1924-11-15');
  const [era, setEra] = useState<string>('Khải Định Niên Thứ 9 (Triều Nguyễn)');
  const [member, setMember] = useState<string>(
    'Nguyễn Trực Thao (Đời thứ 8 - Tiền bối khởi nghiệp văn chỉ)'
  );
  const [role, setRole] = useState<string>('Chủ sự / Khởi xướng chính');
  const [location, setLocation] = useState<string>(
    'Từ Đường Đại Tộc, Làng Cự Đà, Tỉnh Nam Định'
  );
  const [selectedLeafIcon, setSelectedLeafIcon] = useState<string>('gold_leaf');
  const [storyNarrative, setStoryNarrative] = useState<string>(
    'Vào mùa đông năm Giáp Tý (1924), cụ Trực Thao đích thân đứng ra hưng công vận động con cháu nội ngoại quy tụ, đóng góp 300 quan tiền cùng 20 mẫu ruộng hương hỏa. Đại lễ khánh thành diễn ra trang nghiêm suốt ba ngày ba đêm, lập bia đá khắc ghi ơn đức tiền nhân để ngàn đời noi gương chí hiếu.'
  );
  const [motto, setMotto] = useState<string>(
    'Ẩm thủy tư nguyên - Tích thiện phụng đức khánh'
  );
  const [scope, setScope] = useState<'clan' | 'branch' | 'head'>('clan');
  const [isCommitted, setIsCommitted] = useState<boolean>(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setToastMessage('Đang truyền gửi cột mốc tới Ban Trị Sự khảo duyệt...');
    setTimeout(() => {
      setToastMessage('Đã gửi cột mốc thành công! Chờ Ban Trị Sự duyệt lên Cây Kỷ Niệm.');
      setTimeout(() => {
        onNavigate('cay-ky-niem');
      }, 1000);
    }, 900);
  };

  return (
    <div className="w-full min-h-screen bg-[#fcf8f2] text-[#2b1b15] font-sans pb-16">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-[#80141d] text-white px-5 py-3.5 rounded-xl shadow-2xl flex items-center gap-3 border border-[#c9892c]/50 animate-fade-in text-sm font-medium">
          <span className="material-symbols-outlined text-[#faeed9] text-xl">verified</span>
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 space-y-6">
        {/* Breadcrumb & Top Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs border-b border-[#dec9b6]/40 pb-3">
          <div className="flex items-center gap-2 font-medium text-[#8a6f62]">
            <button
              type="button"
              onClick={() => onNavigate('kho-ky-uc')}
              className="hover:text-[#80141d] transition-colors cursor-pointer"
            >
              Kho Ký Ức
            </button>
            <span>›</span>
            <button
              type="button"
              onClick={() => onNavigate('bien-nien-su')}
              className="hover:text-[#80141d] transition-colors cursor-pointer"
            >
              Các Mốc Dòng Tộc
            </button>
            <span>›</span>
            <span className="text-[#80141d] font-semibold">Thêm Cột Mốc Mới</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => alert('Đã lưu bản thảo tạm thời!')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-[#dec9b6] text-xs font-semibold text-[#4a362f] hover:bg-[#faefe3] transition-colors cursor-pointer shadow-2xs"
            >
              <span className="material-symbols-outlined text-sm">save</span>
              <span>Lưu Bản Thảo</span>
            </button>
            <button
              type="button"
              onClick={() => alert('Mở tài liệu quy định tộc phả và điển cố')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#faefe3] border border-[#dec9b6] text-xs font-semibold text-[#80141d] hover:bg-[#f5dbcf] transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-sm">menu_book</span>
              <span>Quy Định Tộc Phả</span>
            </button>
          </div>
        </div>

        {/* Page Title & Subtitle */}
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-[#faefe3] text-[#80141d] text-[11px] font-bold tracking-wider uppercase border border-[#dec9b6]/60">
            <span className="material-symbols-outlined text-sm">nature</span>
            <span>Hệ Thống Ký Sự &amp; Phả Đồ Truyền Thống</span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-[#2b1b15] tracking-tight">
            Ghi Nhận Cột Mốc &amp; Dấu Ấn Dòng Tộc Mới
          </h1>
          <p className="text-xs sm:text-sm text-[#6b584d] max-w-4xl leading-relaxed">
            Mỗi cột mốc ghi nhận là một mầm lộc tiếp thêm sinh khí vào Cây Kỷ Niệm, lưu truyền tấm
            gương phụng hiến cho hậu thế muôn đời.
          </p>
        </div>

        {/* Main Grid: Left Form (8 cols) + Right Sticky Sidebar (4 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Form */}
          <form onSubmit={handleSubmit} className="lg:col-span-8 space-y-6">
            {/* 1. Định Danh Cột Mốc Điển Cố */}
            <div className="bg-white rounded-2xl border border-[#dec9b6] p-6 shadow-2xs space-y-4">
              <div className="flex items-center gap-3 border-b border-[#dec9b6]/30 pb-3">
                <span className="w-6 h-6 rounded-full bg-[#80141d] text-white font-bold text-xs flex items-center justify-center">
                  1
                </span>
                <div>
                  <h2 className="text-sm font-serif font-bold text-[#2b1b15]">
                    Định Danh Cột Mốc Điển Cố
                  </h2>
                  <p className="text-[11px] text-[#8a6f62]">
                    Xác định xưng tôn kính và thể loại điển tích trong phả
                  </p>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#4a362f] block">
                  Tên Cột Mốc / Sự Kiện Phụng Sự <span className="text-[#80141d]">*</span>
                </label>
                <input
                  type="text"
                  value={milestoneName}
                  onChange={(e) => setMilestoneName(e.target.value)}
                  required
                  className="w-full bg-[#fdfaf5] border border-[#dec9b6] rounded-xl px-4 py-2.5 text-xs font-medium text-[#2b1b15] focus:outline-none focus:border-[#80141d]"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-[#4a362f] block">
                  Thiết Lập Sự Kiện Khóa Tộc <span className="text-[#80141d]">*</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    {
                      id: 'birth',
                      title: 'Khởi Sinh / Thành Hôn',
                      desc: 'Cột mốc khởi sinh, nạp phước sản duyên',
                    },
                    {
                      id: 'scholar',
                      title: 'Đỗ Đạt / Học Vấn Cao Khảo',
                      desc: 'Khoa bảng, vinh quy song bàng đỗ',
                    },
                    {
                      id: 'ancestor',
                      title: 'Phụng Sự Tổ Tiên & Trùng Tu',
                      desc: 'Xây dựng nhà thờ họ, dâng văn bia, tế tự',
                    },
                    {
                      id: 'charity',
                      title: 'Công Đức Xã Hội',
                      desc: 'Lập quỹ hiếu học, cứu tế, bia vinh quang',
                    },
                    {
                      id: 'memorial',
                      title: 'Tạ Thế & Hưởng Thọ',
                      desc: 'Giá hạc quy tiên, định ngày giỗ, kỷ táng sớn',
                    },
                    {
                      id: 'other',
                      title: 'Đại Điển Cố Khác',
                      desc: 'Di dời di quan, sắc phong hoàng triều',
                    },
                  ].map((cat) => {
                    const isSelected = category === cat.id;
                    return (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => setCategory(cat.id)}
                        className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex items-start gap-3 ${
                          isSelected
                            ? 'bg-[#faefe3] border-2 border-[#80141d] shadow-2xs'
                            : 'bg-[#fdfaf5] border-[#dec9b6] hover:border-[#c9892c]'
                        }`}
                      >
                        <div
                          className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 mt-0.5 ${
                            isSelected
                              ? 'border-[#80141d] bg-[#80141d] text-white text-[10px]'
                              : 'border-[#dec9b6]'
                          }`}
                        >
                          {isSelected && '✓'}
                        </div>
                        <div>
                          <div className="font-bold text-xs text-[#2b1b15]">{cat.title}</div>
                          <div className="text-[10px] text-[#8a6f62] mt-0.5">{cat.desc}</div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* 2. Thời Điểm & Niên Khóa Song Hành */}
            <div className="bg-white rounded-2xl border border-[#dec9b6] p-6 shadow-2xs space-y-4">
              <div className="flex items-center gap-3 border-b border-[#dec9b6]/30 pb-3">
                <span className="w-6 h-6 rounded-full bg-[#80141d] text-white font-bold text-xs flex items-center justify-center">
                  2
                </span>
                <div>
                  <h2 className="text-sm font-serif font-bold text-[#2b1b15]">
                    Thời Điểm &amp; Niên Khóa Song Hành
                  </h2>
                  <p className="text-[11px] text-[#8a6f62]">
                    Quy độ Âm - Dương lịch cổ truyền, tra cứu cùng niên hiệu quốc sử
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#4a362f] block">
                    Ngày Dương Lịch <span className="text-[#80141d]">*</span>
                  </label>
                  <input
                    type="date"
                    value={solarDate}
                    onChange={(e) => setSolarDate(e.target.value)}
                    required
                    className="w-full bg-[#fdfaf5] border border-[#dec9b6] rounded-xl px-4 py-2 text-xs font-medium text-[#2b1b15] focus:outline-none focus:border-[#80141d]"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#4a362f] block">
                    Niên Hiệu Triều Đại / Thời Kỳ
                  </label>
                  <select
                    value={era}
                    onChange={(e) => setEra(e.target.value)}
                    className="w-full bg-[#fdfaf5] border border-[#dec9b6] rounded-xl px-4 py-2 text-xs font-medium text-[#2b1b15] focus:outline-none focus:border-[#80141d]"
                  >
                    <option value="Khải Định Niên Thứ 9 (Triều Nguyễn)">
                      Khải Định Niên Thứ 9 (Triều Nguyễn)
                    </option>
                    <option value="Thời Kỳ Đương Đại (Thế kỷ XX - XXI)">
                      Thời Kỳ Đương Đại (Thế kỷ XX - XXI)
                    </option>
                    <option value="Thời Kháng Chiến & Đổi Mới (1946 - 2000)">
                      Thời Kháng Chiến &amp; Đổi Mới (1946 - 2000)
                    </option>
                    <option value="Thời Triều Nguyễn & Cận Đại (1801 - 1945)">
                      Thời Triều Nguyễn &amp; Cận Đại (1801 - 1945)
                    </option>
                  </select>
                </div>
              </div>

              {/* Automatic Lunar Conversion Parchment Box */}
              <div className="p-4 bg-[#faefe3]/70 border border-[#dec9b6] rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-xl bg-white border border-[#dec9b6] flex flex-col items-center justify-center text-[#80141d] shrink-0 shadow-2xs">
                    <span className="text-base font-bold leading-none">20</span>
                    <span className="text-[9px] uppercase font-bold text-[#8a6f62] mt-0.5">
                      Tháng 10
                    </span>
                  </div>
                  <div className="space-y-0.5">
                    <div className="text-[10px] uppercase font-bold text-[#80141d] tracking-wider">
                      Tự Động Tra Cứu Âm Lịch • Khởi Định Năm
                    </div>
                    <div className="font-serif font-bold text-sm text-[#2b1b15]">
                      Ngày Canh Tuất, Tháng Ất Hợi, Năm Giáp Tý (1924)
                    </div>
                    <div className="text-[10px] text-[#8a6f62]">
                      Độ tương hợp: Giáp Thìn (1704) - (1924), Bản thảo (11h - 13h)
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-start sm:self-center">
                  <span className="px-2.5 py-1 rounded-md bg-white border border-[#dec9b6] text-[10px] font-semibold text-[#4a362f]">
                    Tiết khí: Lập đông
                  </span>
                  <span className="px-2.5 py-1 rounded-md bg-[#80141d] text-[#faeed9] text-[10px] font-bold">
                    Trực Khai — Giờ Hoàng Đạo
                  </span>
                </div>
              </div>
            </div>

            {/* 3. Nhân Vật Định Danh Trên Phả Hệ */}
            <div className="bg-white rounded-2xl border border-[#dec9b6] p-6 shadow-2xs space-y-4">
              <div className="flex items-center gap-3 border-b border-[#dec9b6]/30 pb-3">
                <span className="w-6 h-6 rounded-full bg-[#80141d] text-white font-bold text-xs flex items-center justify-center">
                  3
                </span>
                <div>
                  <h2 className="text-sm font-serif font-bold text-[#2b1b15]">
                    Nhân Vật Định Danh Trên Phả Hệ
                  </h2>
                  <p className="text-[11px] text-[#8a6f62]">
                    Gắn kết trực tiếp với tiền nhân hoặc hậu duệ trên sơ đồ dòng tộc
                  </p>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#4a362f] block">
                  Thành Viên Liên Quan Trực Tiếp <span className="text-[#80141d]">*</span>
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-2.5 text-[#8a6f62] text-base pointer-events-none">
                    search
                  </span>
                  <input
                    type="text"
                    value={member}
                    onChange={(e) => setMember(e.target.value)}
                    className="w-full bg-[#fdfaf5] border border-[#dec9b6] rounded-xl pl-9 pr-4 py-2 text-xs font-medium text-[#2b1b15] focus:outline-none focus:border-[#80141d]"
                  />
                </div>
                <div className="text-[11px] text-emerald-700 flex items-center gap-1 font-medium pt-0.5">
                  <span>✓</span>
                  <span>Đã xác minh và liên kết với hồ sơ Cụ Nguyễn Trực Thao (1886 - 1942)</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#4a362f] block">
                    Vai Trò Trong Cột Mốc
                  </label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full bg-[#fdfaf5] border border-[#dec9b6] rounded-xl px-4 py-2 text-xs font-medium text-[#2b1b15] focus:outline-none focus:border-[#80141d]"
                  >
                    <option value="Chủ sự / Khởi xướng chính">Chủ sự / Khởi xướng chính ▾</option>
                    <option value="Đóng góp tài lực & ruộng đất">Đóng góp tài lực &amp; ruộng đất</option>
                    <option value="Giám sát kiến thiết">Giám sát kiến thiết</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#4a362f] block">
                    Không Gian / Địa Điểm Diễn Ra
                  </label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3 top-2 text-[#8a6f62] text-sm pointer-events-none">
                      location_on
                    </span>
                    <input
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="w-full bg-[#fdfaf5] border border-[#dec9b6] rounded-xl pl-9 pr-4 py-2 text-xs font-medium text-[#2b1b15] focus:outline-none focus:border-[#80141d]"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* 4. Biểu Tượng Chồi Kỷ Niệm Trên Phả Đồ */}
            <div className="bg-white rounded-2xl border border-[#dec9b6] p-6 shadow-2xs space-y-4">
              <div className="flex items-center gap-3 border-b border-[#dec9b6]/30 pb-3">
                <span className="w-6 h-6 rounded-full bg-[#80141d] text-white font-bold text-xs flex items-center justify-center">
                  4
                </span>
                <div>
                  <h2 className="text-sm font-serif font-bold text-[#2b1b15]">
                    Biểu Tượng Chồi Kỷ Niệm Trên Phả Đồ
                  </h2>
                  <p className="text-[11px] text-[#8a6f62]">
                    Chọn phẩm vị hiển thị trang trọng trên nhánh Cây Kỷ Niệm
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                {[
                  { id: 'sprout', name: 'Chồi Khởi Sinh', icon: 'eco' },
                  { id: 'scholar_leaf', name: 'Lá Xanh Học Vấn', icon: 'local_florist' },
                  { id: 'gold_leaf', name: 'Lá Ánh Kim Công Đức', icon: 'stars' },
                  { id: 'flower', name: 'Nụ Hoa Hỷ Sự', icon: 'yard' },
                  { id: 'maple', name: 'Lá Phong Tưởng Niệm', icon: 'park' },
                ].map((item) => {
                  const isSelected = selectedLeafIcon === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setSelectedLeafIcon(item.id)}
                      className={`p-3 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-2 ${
                        isSelected
                          ? 'bg-[#faefe3] border-2 border-[#80141d] shadow-sm'
                          : 'bg-[#fdfaf5] border-[#dec9b6] hover:border-[#c9892c]'
                      }`}
                    >
                      <span
                        className={`material-symbols-outlined text-2xl ${
                          isSelected ? 'text-[#80141d]' : 'text-[#8a6f62]'
                        }`}
                      >
                        {item.icon}
                      </span>
                      <span className="text-[11px] font-bold text-[#2b1b15] leading-tight">
                        {item.name}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="p-3 bg-[#fdfaf5] border border-dashed border-[#dec9b6] rounded-xl text-[11px] text-[#8a6f62] flex items-center gap-2">
                <span className="material-symbols-outlined text-sm text-[#c9892c]">info</span>
                <span>
                  Biểu tượng có mạng giá trị tôn vinh mỹ niệm truyền thống, không mang tính điểm số
                  hay thăng hạng kỹ thuật số.
                </span>
              </div>
            </div>

            {/* 5. Văn Bản Sử Ký & Tư Liệu Chứng Thật */}
            <div className="bg-white rounded-2xl border border-[#dec9b6] p-6 shadow-2xs space-y-4">
              <div className="flex items-center gap-3 border-b border-[#dec9b6]/30 pb-3">
                <span className="w-6 h-6 rounded-full bg-[#80141d] text-white font-bold text-xs flex items-center justify-center">
                  5
                </span>
                <div>
                  <h2 className="text-sm font-serif font-bold text-[#2b1b15]">
                    Văn Bản Sử Ký &amp; Tư Liệu Chứng Thật
                  </h2>
                  <p className="text-[11px] text-[#8a6f62]">
                    Ghi chép tường minh chân thực về điển tích nhân vật và dòng họ
                  </p>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#4a362f] block">
                  Lời Thuật Chi Tiết Sự Kiện (Sử Ký Dòng Họ) <span className="text-[#80141d]">*</span>
                </label>
                <textarea
                  rows={4}
                  value={storyNarrative}
                  onChange={(e) => setStoryNarrative(e.target.value)}
                  required
                  className="w-full bg-[#fdfaf5] border border-[#dec9b6] rounded-xl p-3 text-xs text-[#2b1b15] leading-relaxed focus:outline-none focus:border-[#80141d]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#4a362f] block">
                  Lời Răn Dạy / Điển Tích Truyền Đời Của Cột Mốc
                </label>
                <input
                  type="text"
                  value={motto}
                  onChange={(e) => setMotto(e.target.value)}
                  className="w-full bg-[#fdfaf5] border border-[#dec9b6] rounded-xl px-4 py-2.5 text-xs italic font-serif text-[#80141d] focus:outline-none focus:border-[#80141d]"
                />
              </div>

              {/* Upload Dropzone */}
              <div className="space-y-2 pt-1">
                <label className="text-xs font-semibold text-[#4a362f] block">
                  Chứng Lý &amp; Đồ Hạo (Bản Scan Gia Phả, Trắc Địa, Văn Bia, Băng Ghi Âm Lời Kể)
                </label>
                <div className="border-2 border-dashed border-[#dec9b6] rounded-2xl p-5 bg-[#fdfaf5] text-center space-y-2 hover:border-[#80141d] transition-colors cursor-pointer">
                  <span className="material-symbols-outlined text-3xl text-[#c9892c]">
                    inventory_2
                  </span>
                  <div className="font-semibold text-xs text-[#2b1b15]">
                    Kéo thả tư liệu cổ hoặc{' '}
                    <span className="text-[#80141d] underline">Tải lên từ thiết bị</span>
                  </div>
                  <p className="text-[11px] text-[#8a6f62] max-w-lg mx-auto">
                    Chấp nhận tệp tin định chế văn bản: TIFF, JPG, PDF scan hoặc băng ghi âm MP3,
                    WAV có dung lượng tối đa vĩnh viễn (Tối đa 100MB)
                  </p>
                </div>

                {/* Attached Chips */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                  <div className="p-2.5 bg-white border border-[#dec9b6] rounded-xl flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2 truncate">
                      <span className="material-symbols-outlined text-[#80141d] text-base">
                        description
                      </span>
                      <span className="truncate text-[11px] font-medium text-[#2b1b15]">
                        Ban_ve_thi_cong_khanh_thanh.pdf (4.8 MB)
                      </span>
                    </div>
                    <button type="button" className="text-[#8a6f62] hover:text-[#80141d] ml-2">
                      ✕
                    </button>
                  </div>

                  <div className="p-2.5 bg-white border border-[#dec9b6] rounded-xl flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2 truncate">
                      <span className="material-symbols-outlined text-[#c9892c] text-base">
                        mic
                      </span>
                      <span className="truncate text-[11px] font-medium text-[#2b1b15]">
                        Ghi_am_loi_ke_truc_tiep_cu_lan.mp3 (12.3 MB)
                      </span>
                    </div>
                    <button type="button" className="text-[#8a6f62] hover:text-[#80141d] ml-2">
                      ✕
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* 6. Thẩm Định & Phạm Vi Công Bố */}
            <div className="bg-white rounded-2xl border border-[#dec9b6] p-6 shadow-2xs space-y-4">
              <div className="flex items-center gap-3 border-b border-[#dec9b6]/30 pb-3">
                <span className="w-6 h-6 rounded-full bg-[#80141d] text-white font-bold text-xs flex items-center justify-center">
                  6
                </span>
                <div>
                  <h2 className="text-sm font-serif font-bold text-[#2b1b15]">
                    Thẩm Định &amp; Phạm Vi Công Bố
                  </h2>
                  <p className="text-[11px] text-[#8a6f62]">
                    Phân quyền chi phái và cam kết chuẩn mực phả hệ toàn tộc
                  </p>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#4a362f] block">
                  Cấp Độ Hiển Thị Trong Tộc Phổ
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { id: 'clan', title: 'Toàn Tộc (Đại Chi)', sub: 'Con cháu mở xem' },
                    { id: 'branch', title: 'Nội Bộ Chi Phái', sub: 'Chi Trực Lăng' },
                    { id: 'head', title: 'Trưởng Ngành', sub: 'Ban Trị Sự Tộc' },
                  ].map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setScope(item.id as any)}
                      className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                        scope === item.id
                          ? 'bg-[#faefe3] border-2 border-[#80141d] shadow-2xs'
                          : 'bg-[#fdfaf5] border-[#dec9b6] hover:border-[#c9892c]'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span
                          className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${
                            scope === item.id
                              ? 'border-[#80141d] bg-[#80141d] text-white text-[9px]'
                              : 'border-[#dec9b6]'
                          }`}
                        >
                          {scope === item.id && '✓'}
                        </span>
                        <div className="font-bold text-xs text-[#2b1b15]">{item.title}</div>
                      </div>
                      <div className="text-[10px] text-[#8a6f62] ml-5 mt-0.5">{item.sub}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Commitment Checkbox */}
              <div className="p-3.5 bg-[#faefe3]/60 border border-[#dec9b6] rounded-xl flex items-start gap-2.5">
                <input
                  type="checkbox"
                  id="commit"
                  checked={isCommitted}
                  onChange={(e) => setIsCommitted(e.target.checked)}
                  className="mt-0.5 accent-[#80141d] cursor-pointer"
                />
                <label htmlFor="commit" className="text-xs text-[#4a362f] leading-relaxed cursor-pointer">
                  <strong>Tôn nguyện phụng hiến &amp; minh bạch:</strong> Tôi có đầy đủ minh chứng và
                  đồng ý cam kết mọi thông tin trên đây đều tuân thủ tôn chỉ tộc ước, nếu sai gia
                  phả đính chính xác đáng, không thêu dệt và đồng thuận Ban Trị Sự thẩm tra duyệt
                  trước khi gắn lên Cây Kỷ Niệm.
                </label>
              </div>
            </div>

            {/* Bottom Form Actions */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <button
                type="button"
                onClick={() => onNavigate('bien-nien-su')}
                className="px-4 py-2.5 rounded-xl border border-[#dec9b6] bg-white text-xs font-semibold text-[#8a6f62] hover:bg-[#faefe3] transition-colors cursor-pointer"
              >
                ← Quay Lại Danh Mục
              </button>

              <div className="flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={() => alert('Xem danh sách luận đề chi nhánh...')}
                  className="px-4 py-2.5 rounded-xl border border-[#dec9b6] bg-white text-xs font-semibold text-[#4a362f] hover:bg-[#faefe3] transition-colors cursor-pointer"
                >
                  Xem Luận Đề Chi Nhánh
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#80141d] hover:bg-[#681017] text-white text-xs font-bold transition-all shadow-sm cursor-pointer"
                >
                  Phụng Gửi Duyệt Cột Mốc
                </button>
              </div>
            </div>
          </form>

          {/* Right Sticky Sidebar: Preview & Rules */}
          <div className="lg:col-span-4 space-y-6 sticky top-6">
            {/* Xem Trước Chồi Kỷ Niệm */}
            <div className="bg-white rounded-2xl border border-[#dec9b6] p-5 shadow-2xs space-y-3.5">
              <div className="flex items-center justify-between border-b border-[#dec9b6]/30 pb-2.5">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#80141d] text-base">
                    visibility
                  </span>
                  <h3 className="font-serif font-bold text-xs uppercase tracking-wider text-[#2b1b15]">
                    Xem Trước Chồi Kỷ Niệm
                  </h3>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-[#faeed9] border border-[#dec9b6] text-[#734c13] text-[9px] font-bold">
                  Xuất bản trực tiếp
                </span>
              </div>

              {/* Preview Card */}
              <div className="p-4 bg-[#fdfaf5] border border-[#dec9b6] rounded-xl space-y-2.5">
                <div className="flex items-center justify-between text-[10px]">
                  <span className="px-2 py-0.5 rounded-md bg-[#faefe3] border border-[#dec9b6] font-bold text-[#80141d]">
                    Phụng Sự Tổ Tiên &amp; Trùng Tu
                  </span>
                  <span className="text-[#8a6f62]">Nhánh: Chi Nam Thứ 3</span>
                </div>

                <div className="font-serif font-bold text-sm text-[#2b1b15] leading-snug">
                  {milestoneName}
                </div>

                <div className="text-[10px] text-[#8a6f62] flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-xs">calendar_today</span>
                  <span>20 Tháng 10 Giáp Tý (Âm Lịch) • 15/11/1924 (Dương Lịch)</span>
                </div>

                <div className="p-2.5 bg-white border border-[#dec9b6] rounded-lg space-y-1">
                  <div className="text-[10px] uppercase font-bold text-[#80141d]">
                    Chủ Sự Khởi Thảo:
                  </div>
                  <div className="font-bold text-xs text-[#2b1b15]">
                    Nguyễn Trực Thao (Đời thứ 8)
                  </div>
                  <p className="text-[11px] text-[#6b584d] leading-relaxed line-clamp-3 italic mt-1">
                    "{storyNarrative}"
                  </p>
                </div>

                <div className="flex items-center justify-between text-[10px] text-[#8a6f62] pt-1">
                  <span>✓ Đã đối soát trích văn gia phả</span>
                  <span className="text-[#80141d] font-semibold hover:underline cursor-pointer">
                    Xem trích đoạn lớn
                  </span>
                </div>
              </div>

              <p className="text-[11px] text-[#8a6f62] italic text-center">
                Cột mốc này sẽ tụng mở trên nhánh đời 8 của Cây Kỷ Niệm sau khi được Ban Trị Sự duyệt.
              </p>
            </div>

            {/* Quy Chuẩn Chép Sử Gia Tộc (5 Points) */}
            <div className="bg-white rounded-2xl border border-[#dec9b6] p-5 shadow-2xs space-y-3.5">
              <div className="flex items-center justify-between border-b border-[#dec9b6]/30 pb-2.5">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#c9892c] text-base">rule</span>
                  <h3 className="font-serif font-bold text-xs uppercase tracking-wider text-[#2b1b15]">
                    Quy Chuẩn Chép Sử Gia Tộc
                  </h3>
                </div>
                <span className="text-[10px] text-[#8a6f62]">5 NGUYÊN TẮC BẤT DI DỊCH</span>
              </div>

              <div className="space-y-2.5 text-xs text-[#2b1b15]">
                <div className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-[#faeed9] text-[#734c13] font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                    1
                  </span>
                  <div>
                    <strong className="text-[#80141d]">Tôn Trọng Sự Thật Khách Quan:</strong> Chưa
                    rõ năm sinh, đừng thêu dệt, chép công trạng không phóng đại quá mức, không tự
                    tiện biên niên theo định kiến cá nhân.
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-[#faeed9] text-[#734c13] font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                    2
                  </span>
                  <div>
                    <strong className="text-[#80141d]">Chữ Viết Tôn Nghiêm, Trang Nhã:</strong> Sử
                    dụng ngôn từ kính cẩn, xưng hô đúng vai vế của Tiền tổ (Cụ, Tiên sinh, Trưởng
                    lão, Nhập tịch...).
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-[#faeed9] text-[#734c13] font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                    3
                  </span>
                  <div>
                    <strong className="text-[#80141d]">Tuyệt Đối Không Hư Cấu Mộng Mị:</strong> Loại
                    trừ mọi yếu tố mê tín dị đoan, chỉ ghi nhận những công đức và di ngôn có tác
                    động xây dựng dòng họ hoặc phụng sự xã hội.
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-[#faeed9] text-[#734c13] font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                    4
                  </span>
                  <div>
                    <strong className="text-[#80141d]">Kiểm Chứng Hình Ảnh &amp; Hiện Vật:</strong> Căn
                    cứ văn khố, sắc phong, hình ảnh chụp phải được người có trách nhiệm hoặc trưởng
                    phái chứng nhận nguyên gốc.
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-[#faeed9] text-[#734c13] font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                    5
                  </span>
                  <div>
                    <strong className="text-[#80141d]">Phê Duyệt Công Tâm Ban Trị Sự:</strong> Mọi
                    cột mốc sau khi nộp sẽ được 3 vị cao niên trong Ban Trị Sự xem xét trước khi
                    chính thức gắn lên phả đồ.
                  </div>
                </div>
              </div>

              <div className="text-[11px] text-[#8a6f62] pt-2 border-t border-[#dec9b6]/30 flex justify-between">
                <span>Cần trợ giúp soạn thảo?</span>
                <span className="text-[#80141d] font-semibold hover:underline cursor-pointer">
                  Tra cứu Điền Tộc Chuẩn Quy ›
                </span>
              </div>
            </div>

            {/* Photo Card: Từ Đường Chi Giáp */}
            <div className="rounded-2xl overflow-hidden border border-[#dec9b6] shadow-2xs group bg-white">
              <div className="relative h-36 overflow-hidden">
                <img
                  src="/images/hero_family.jpg"
                  alt="Từ Đường Chi Giáp"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded bg-black/60 text-white text-[9px] font-bold">
                  Tư liệu Lịch sử họ
                </div>
              </div>
              <div className="p-3.5 space-y-1">
                <div className="font-serif font-bold text-xs text-[#2b1b15]">
                  Từ Đường Chi Giáp — Niên Đại 1924
                </div>
                <p className="text-[11px] text-[#6b584d] leading-relaxed">
                  Ảnh chụp quang cảnh từ đường ngày đại lễ khánh thành năm Giáp Tý.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AddMilestoneScreen;
