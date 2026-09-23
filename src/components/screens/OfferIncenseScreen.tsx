import React, { useState } from 'react';
import type { ScreenType } from '../../types.ts';

interface OfferIncenseScreenProps {
  onNavigate: (screen: ScreenType) => void;
}

export const OfferIncenseScreen: React.FC<OfferIncenseScreenProps> = ({ onNavigate }) => {
  const [selectedOffering, setSelectedOffering] = useState<string>('incense');
  const [title, setTitle] = useState<string>(
    'Kính báo Cụ Cố: Cháu đích tôn vừa tốt nghiệp Thủ khoa Đại Học Bách Khoa'
  );
  const [prayerContent, setPrayerContent] = useState<string>(
    'Kính cẩn bái lạy Tiền Linh Cụ Cố Nguyễn Văn Phúc! Hôm nay là ngày lành tháng tốt, con cháu thế hệ thứ 11 thành kính tề tựu trước bài vị Cụ Cố. Đốt nén hương trầm thơm ngát, lòng cháu rưng rưng nhớ về những năm tháng Cụ tảo tần vun vén nền tảng gia môn...'
  );
  const [privacy, setPrivacy] = useState<'public' | 'private'>('public');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setToastMessage('Đang dâng lễ phẩm và lưu lời tri ân vào Sổ Tang Đại Tộc...');
    setTimeout(() => {
      setToastMessage('Đã kính cẩn dâng lễ và lưu sổ tang thành công!');
      setTimeout(() => {
        onNavigate('khong-gian-tuong-niem-3d');
      }, 1000);
    }, 900);
  };

  return (
    <div className="w-full min-h-screen bg-[#fcf8f2] text-[#2b1b15] font-sans pb-16">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-[#80141d] text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 border border-[#c9892c]/50 animate-fade-in text-xs font-semibold">
          <span className="material-symbols-outlined text-[#faeed9] text-base">verified</span>
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 space-y-6">
        {/* Breadcrumb & Top Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs border-b border-[#dec9b6]/40 pb-3">
          <div className="flex items-center gap-2 font-medium text-[#8a6f62]">
            <button
              type="button"
              onClick={() => onNavigate('khong-gian-tuong-niem-3d')}
              className="hover:text-[#80141d] transition-colors cursor-pointer"
            >
              Không Gian Tưởng Niệm
            </button>
            <span>›</span>
            <button
              type="button"
              onClick={() => onNavigate('ho-so-huong-linh')}
              className="hover:text-[#80141d] transition-colors cursor-pointer"
            >
              Cụ Cố Nguyễn Văn Phúc
            </button>
            <span>›</span>
            <span className="text-[#80141d] font-semibold">Gửi Lời Tri Ân &amp; Thắp Tâm Hương</span>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="px-3 py-1 rounded-full bg-[#faeed9] text-[#734c13] font-semibold border border-[#dec9b6]">
              Bàn Thờ Trực Tuyến • Hương Hỏa Quanh Năm
            </span>
            <button
              type="button"
              onClick={() => onNavigate('ho-so-huong-linh')}
              className="px-3 py-1 rounded-full bg-white text-[#80141d] font-semibold border border-[#dec9b6] hover:bg-[#faefe3] transition-colors cursor-pointer"
            >
              Xem Sổ Lưu Niệm
            </button>
          </div>
        </div>

        {/* Page Title & Ancestor Counter Banner */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1.5 max-w-3xl">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-[#faefe3] text-[#80141d] text-[10px] font-bold tracking-wider uppercase border border-[#dec9b6]/60">
              <span className="material-symbols-outlined text-sm">local_fire_department</span>
              <span>Nghi Lễ Hiếu Nghĩa Gia Tộc</span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-[#80141d] tracking-tight">
              Kính Dâng Lời Tri Ân &amp; Thắp Nén Tâm Hương
            </h1>
            <p className="text-xs sm:text-sm text-[#6b584d] leading-relaxed">
              Bày tỏ lòng thành kính, báo cáo thành tựu con cháu và gửi gắm những lời tri ân thiêng
              liêng đến đấng sinh thành, tiền tổ nơi cõi vĩnh hằng.
            </p>
          </div>

          {/* Right Banner Counter */}
          <div className="p-3.5 bg-white border border-[#dec9b6] rounded-2xl flex items-center gap-3.5 shadow-2xs shrink-0">
            <div className="w-12 h-12 rounded-xl bg-[#80141d] text-white flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-2xl">temple_buddhist</span>
            </div>
            <div className="space-y-0.5">
              <div className="text-[10px] font-bold text-[#8a6f62] uppercase tracking-wider">
                Hương Hỏa Dâng Lên Cụ
              </div>
              <div className="font-serif font-bold text-lg text-[#80141d] leading-tight">
                1,248 Lần Dâng Kính
              </div>
              <div className="text-[10px] text-[#6b584d]">
                Gần nhất: 12 phút trước • Cháu Nguyễn Minh Hùng
              </div>
            </div>
          </div>
        </div>

        {/* 2 Columns: Left Form (8 cols) + Right Preview & Rules (4 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Form */}
          <form onSubmit={handleSubmit} className="lg:col-span-8 space-y-6">
            {/* Box 1: Thông Tin Người Kính Dâng */}
            <div className="bg-white rounded-3xl border border-[#dec9b6] p-6 shadow-2xs space-y-4">
              <div className="flex items-center justify-between border-b border-[#dec9b6]/30 pb-3">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#80141d] text-base">person</span>
                  <h2 className="font-serif font-bold text-sm text-[#2b1b15]">
                    Thông Tin Người Kính Dâng
                  </h2>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-[10px] font-bold border border-emerald-200">
                  Đã Xác Thực Phả Ký
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-3 bg-[#fdfaf5] border border-[#dec9b6] rounded-2xl space-y-1">
                  <span className="text-[10px] text-[#8a6f62] uppercase font-bold block">
                    Họ và Tên Con Cháu
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm text-[#80141d]">badge</span>
                    <span className="font-bold text-xs text-[#2b1b15]">Nguyễn Trực Viễn</span>
                  </div>
                </div>

                <div className="p-3 bg-[#fdfaf5] border border-[#dec9b6] rounded-2xl space-y-1">
                  <span className="text-[10px] text-[#8a6f62] uppercase font-bold block">
                    Thứ Bậc &amp; Phân Chi Gia Tộc
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm text-[#c9892c]">hub</span>
                    <span className="font-bold text-xs text-[#2b1b15]">
                      Đời Thứ 11 • Chi Trực Lăng
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between text-[11px] text-[#8a6f62] pt-1">
                <span>Danh xưng phụng tư được tự động bảo chứng theo Sổ Phả Ký Trưởng Tộc</span>
                <button
                  type="button"
                  onClick={() => alert('Chọn thành viên đại diện khác')}
                  className="text-[#80141d] font-semibold hover:underline cursor-pointer"
                >
                  Thay đổi người đại diện
                </button>
              </div>
            </div>

            {/* Box 2: Chọn Lễ Phẩm Tâm Linh Kính Dâng */}
            <div className="bg-white rounded-3xl border border-[#dec9b6] p-6 shadow-2xs space-y-4">
              <div className="flex items-center justify-between border-b border-[#dec9b6]/30 pb-3">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#80141d] text-base">
                    volunteer_activism
                  </span>
                  <h2 className="font-serif font-bold text-sm text-[#2b1b15]">
                    Chọn Lễ Phẩm Tâm Linh Kính Dâng
                  </h2>
                </div>
                <span className="text-[11px] text-[#8a6f62] italic">Tùy tâm thành ý nguyện</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  {
                    id: 'incense',
                    title: 'Nén Tâm Hương Trầm',
                    desc: 'Thắp nén hương trầm ngát hương khói tỏa, kết nối đôi bờ âm dương, kính nguyện Cụ an nghỉ bình an.',
                    icon: 'temple_buddhist',
                    color: 'text-[#80141d]',
                  },
                  {
                    id: 'flower',
                    title: 'Đóa Hoa Cúc Vàng',
                    desc: 'Biểu trưng của hiếu hạnh bền bỉ, sự trường thọ thanh cao và lòng tri ân nguồn cội bất diệt.',
                    icon: 'local_florist',
                    color: 'text-[#c9892c]',
                  },
                  {
                    id: 'lamp',
                    title: 'Đèn Dầu Bất Diệt',
                    desc: 'Thắp sáng ngọn đèn tuệ giác, cầu mong anh linh tiền tổ luôn che chở và soi đường dẫn lối cho gia đình.',
                    icon: 'wb_incandescent',
                    color: 'text-amber-600',
                  },
                  {
                    id: 'merit',
                    title: 'Dâng Biểu Báo Công',
                    desc: 'Kính dâng thành tựu khoa bảng, công danh hoặc hạnh phúc viên mãn của thế hệ cháu con lên Cụ.',
                    icon: 'workspace_premium',
                    color: 'text-[#80141d]',
                  },
                ].map((item) => {
                  const isSelected = selectedOffering === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setSelectedOffering(item.id)}
                      className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between space-y-2 ${
                        isSelected
                          ? 'bg-[#faefe3] border-2 border-[#80141d] shadow-2xs'
                          : 'bg-[#fdfaf5] border-[#dec9b6] hover:border-[#c9892c]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className={`material-symbols-outlined text-2xl ${item.color}`}>
                          {item.icon}
                        </span>
                        {isSelected && (
                          <span className="px-2 py-0.5 rounded-full bg-[#80141d] text-white text-[9px] font-bold">
                            Đã Chọn
                          </span>
                        )}
                      </div>
                      <div>
                        <div className="font-serif font-bold text-xs text-[#2b1b15]">
                          {item.title}
                        </div>
                        <p className="text-[11px] text-[#6b584d] leading-relaxed mt-1">
                          {item.desc}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Box 3: Tâm Tình & Lời Khấn Tri Ân */}
            <div className="bg-white rounded-3xl border border-[#dec9b6] p-6 shadow-2xs space-y-4">
              <div className="flex items-center justify-between border-b border-[#dec9b6]/30 pb-3">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#80141d] text-base">draw</span>
                  <h2 className="font-serif font-bold text-sm text-[#2b1b15]">
                    Tâm Tình &amp; Lời Khấn Tri Ân
                  </h2>
                </div>
                <span className="text-[11px] text-[#8a6f62]">Tối đa 120 ký tự</span>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#4a362f] block">
                  Tiêu Đề Lời Tri Ân
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className="w-full bg-[#fdfaf5] border border-[#dec9b6] rounded-xl px-4 py-2.5 text-xs font-medium text-[#2b1b15] focus:outline-none focus:border-[#80141d]"
                />
              </div>

              {/* Tag suggestions */}
              <div className="flex flex-wrap items-center gap-1.5 text-xs">
                <span className="text-[11px] text-[#8a6f62]">Gợi ý chủ đề:</span>
                {['Tạ Ơn Đức Cù Lao', 'Kính Cẩn Báo Công', 'Nguyện Cầu Gia Tộc An Khang'].map(
                  (tag, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setTitle(tag)}
                      className="px-2.5 py-0.5 rounded-md bg-[#faefe3] border border-[#dec9b6] text-[10px] font-semibold text-[#80141d] hover:bg-[#faeed9] cursor-pointer"
                    >
                      {tag}
                    </button>
                  )
                )}
              </div>

              <div className="space-y-1.5 pt-1">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-[#4a362f]">
                    Nội Dung Lời Tâm Tình / Văn Khấn Tri Ân
                  </label>
                  <span className="text-[10px] text-[#80141d] italic">Văn phong trang trọng</span>
                </div>
                <textarea
                  rows={5}
                  value={prayerContent}
                  onChange={(e) => setPrayerContent(e.target.value)}
                  required
                  className="w-full bg-[#fdfaf5] border border-[#dec9b6] rounded-2xl p-4 text-xs italic font-serif text-[#2b1b15] leading-relaxed focus:outline-none focus:border-[#80141d]"
                />
              </div>
            </div>

            {/* Box 4: Đính Kèm Ảnh Kỷ Vật Hoặc Bằng Khen Báo Công */}
            <div className="bg-white rounded-3xl border border-[#dec9b6] p-6 shadow-2xs space-y-4">
              <div className="flex items-center justify-between border-b border-[#dec9b6]/30 pb-3">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#80141d] text-base">
                    attach_file
                  </span>
                  <h2 className="font-serif font-bold text-sm text-[#2b1b15]">
                    Đính Kèm Ảnh Kỷ Vật Hoặc Bằng Khen Báo Công
                  </h2>
                </div>
                <span className="text-[11px] text-[#8a6f62]">Không bắt buộc</span>
              </div>

              <div className="border-2 border-dashed border-[#dec9b6] rounded-2xl p-5 bg-[#fdfaf5] text-center space-y-1.5 hover:border-[#80141d] transition-colors cursor-pointer">
                <span className="material-symbols-outlined text-2xl text-[#c9892c]">
                  upload_file
                </span>
                <div className="font-semibold text-xs text-[#2b1b15]">
                  Kéo thả hình ảnh hoặc <span className="text-[#80141d] underline">chọn từ thiết bị</span>
                </div>
                <p className="text-[10px] text-[#8a6f62]">
                  Đính kèm hình ảnh lễ tốt nghiệp, huân chương, ảnh đại gia đình sum họp hoặc di vật
                  lưu truyền (JPG, PNG, PDF tối đa 25MB)
                </p>
              </div>

              <div className="p-2.5 bg-white border border-[#dec9b6] rounded-xl flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 truncate">
                  <span className="material-symbols-outlined text-[#80141d] text-base">
                    description
                  </span>
                  <span className="text-[11px] text-[#2b1b15] truncate">
                    bang_tot_nghiep_thu_khoa_truc_anh.jpg (3.8 MB • Sẵn sàng tải lên lưu trữ vĩnh viễn)
                  </span>
                </div>
                <button type="button" className="text-[#8a6f62] hover:text-[#80141d] ml-2">
                  ✕
                </button>
              </div>
            </div>

            {/* Box 5: Quyền Riêng Tư & Lưu Trữ Phả Tộc */}
            <div className="bg-white rounded-3xl border border-[#dec9b6] p-6 shadow-2xs space-y-4">
              <div className="flex items-center gap-2 border-b border-[#dec9b6]/30 pb-3">
                <span className="material-symbols-outlined text-[#80141d] text-base">lock</span>
                <h2 className="font-serif font-bold text-sm text-[#2b1b15]">
                  Quyền Riêng Tư &amp; Lưu Trữ Phả Tộc
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setPrivacy('public')}
                  className={`p-3.5 rounded-2xl border text-left cursor-pointer transition-all ${
                    privacy === 'public'
                      ? 'bg-[#faefe3] border-2 border-[#80141d]'
                      : 'bg-[#fdfaf5] border-[#dec9b6]'
                  }`}
                >
                  <div className="flex items-center gap-2 font-bold text-xs text-[#2b1b15]">
                    <span className="w-3.5 h-3.5 rounded-full border border-[#80141d] bg-[#80141d] text-white flex items-center justify-center text-[9px]">
                      ✓
                    </span>
                    <span>Hiển Thị Trong Sổ Lưu Niệm</span>
                  </div>
                  <p className="text-[11px] text-[#6b584d] ml-5 mt-1 leading-relaxed">
                    Mọi thành viên dòng tộc đều có thể đọc, tri ân và cùng nguyện cầu.
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setPrivacy('private')}
                  className={`p-3.5 rounded-2xl border text-left cursor-pointer transition-all ${
                    privacy === 'private'
                      ? 'bg-[#faefe3] border-2 border-[#80141d]'
                      : 'bg-[#fdfaf5] border-[#dec9b6]'
                  }`}
                >
                  <div className="flex items-center gap-2 font-bold text-xs text-[#2b1b15]">
                    <span className="w-3.5 h-3.5 rounded-full border border-[#dec9b6] flex items-center justify-center text-[9px]" />
                    <span>Tâm Nguyện Riêng Tư</span>
                  </div>
                  <p className="text-[11px] text-[#6b584d] ml-5 mt-1 leading-relaxed">
                    Chỉ lưu trữ tâm thư giữa người dâng lễ và tiền tổ, bảo mật tuyệt đối.
                  </p>
                </button>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
                <span className="text-[11px] text-[#8a6f62] flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-sm text-emerald-700">verified</span>
                  <span>Lời tri ân sẽ được lưu vào biên niên sử số hóa của dòng tộc</span>
                </span>

                <button
                  type="submit"
                  className="px-6 py-3 rounded-2xl bg-[#80141d] hover:bg-[#681017] text-white font-serif font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-sm">local_fire_department</span>
                  <span>Kính Cẩn Dâng Lễ &amp; Lưu Sổ Tang</span>
                </button>
              </div>
            </div>
          </form>

          {/* Right Sticky Column: Live Preview & Descendants' Prayers */}
          <div className="lg:col-span-4 space-y-6 sticky top-6">
            {/* Live Preview Card */}
            <div className="bg-white rounded-3xl border border-[#dec9b6] p-5 shadow-2xs space-y-3.5">
              <div className="flex items-center justify-between border-b border-[#dec9b6]/30 pb-2.5">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#80141d] text-base">visibility</span>
                  <h3 className="font-serif font-bold text-xs uppercase tracking-wider text-[#2b1b15]">
                    Thẻ Xem Trước Lễ Phẩm &amp; Tâm Thư
                  </h3>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-[#faefe3] text-[#80141d] text-[9px] font-bold">
                  Hiển Thị Thực Tế
                </span>
              </div>

              {/* Altar Scene with Portrait */}
              <div className="relative rounded-2xl overflow-hidden border border-[#dec9b6] h-48 bg-black">
                <img
                  src="/images/ancestor_portrait.jpg"
                  alt="Cụ Cố"
                  className="w-full h-full object-cover filter contrast-125 brightness-75"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent flex flex-col justify-end p-3.5 text-white">
                  <span className="text-[9px] font-bold uppercase tracking-wider text-[#faeed9] flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                    <span>Nén Tâm Hương Trầm Đang Tỏa Khói</span>
                  </span>
                  <div className="font-serif font-bold text-sm">Cụ Cố Nguyễn Văn Phúc</div>
                  <div className="text-[10px] text-white/75">Sinh: 1912 (Nhâm Tý) — Tạ Thế: 1988 (Mậu Thìn)</div>
                </div>
              </div>

              {/* Preview Content */}
              <div className="space-y-2 text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-[#2b1b15]">Nguyễn Trực Viễn</span>
                  <span className="text-[10px] text-[#8a6f62]">Chi Trực Lăng • Đời thứ 11</span>
                </div>

                <div className="font-serif font-bold text-xs text-[#80141d] leading-snug">
                  {title}
                </div>

                <p className="text-[11px] text-[#6b584d] italic font-serif leading-relaxed line-clamp-3">
                  "{prayerContent}"
                </p>

                {/* Attached Cert Callout */}
                <div className="p-2.5 bg-[#faefe3]/60 border border-[#dec9b6] rounded-xl flex items-center gap-2">
                  <img
                    src="/images/relic_book.jpg"
                    alt="Chứng nhận"
                    className="w-8 h-8 rounded-lg object-cover border border-[#dec9b6]"
                  />
                  <div className="text-[10px]">
                    <div className="font-bold text-[#2b1b15]">Chứng nhận Cử nhân Thủ khoa xuất sắc</div>
                    <div className="text-[#8a6f62]">Lễ phẩm báo công hiển vinh tiền tổ</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Lễ Tiết & Phép Tộc Kính Dâng */}
            <div className="bg-white rounded-3xl border border-[#dec9b6] p-5 shadow-2xs space-y-3">
              <div className="flex items-center gap-2 border-b border-[#dec9b6]/30 pb-2">
                <span className="material-symbols-outlined text-[#c9892c] text-base">rule</span>
                <h3 className="font-serif font-bold text-xs uppercase tracking-wider text-[#2b1b15]">
                  Lễ Tiết &amp; Phép Tộc Kính Dâng
                </h3>
              </div>

              <div className="space-y-2 text-xs text-[#2b1b15]">
                <div className="flex items-start gap-2">
                  <span className="text-emerald-700 font-bold shrink-0 mt-0.5">✓</span>
                  <div>
                    <strong className="text-[#80141d]">Tâm thành ý tịnh:</strong> Dâng lời khấn
                    với phong thái trang nghiêm, từ ngữ kính cẩn, xưng hô đúng thứ bậc trong dòng
                    tộc.
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <span className="text-emerald-700 font-bold shrink-0 mt-0.5">✓</span>
                  <div>
                    <strong className="text-[#80141d]">Báo công hướng thiện:</strong> Kính trình
                    việc học tập, lập nghiệp, hôn nhân hay phước đức làm được để tiền linh hoan hỷ.
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <span className="text-emerald-700 font-bold shrink-0 mt-0.5">✓</span>
                  <div>
                    <strong className="text-[#80141d]">Bảo hộ gia phong:</strong> Tuyệt đối không
                    cầu tài lộc bất chính, mê tín dị đoan làm tổn thương đạo hiếu tiền nhân.
                  </div>
                </div>
              </div>
            </div>

            {/* Tâm Hương Của Con Cháu Gần Xa */}
            <div className="bg-white rounded-3xl border border-[#dec9b6] p-5 shadow-2xs space-y-3">
              <div className="flex items-center justify-between border-b border-[#dec9b6]/30 pb-2">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#80141d] text-base">forum</span>
                  <h3 className="font-serif font-bold text-xs uppercase tracking-wider text-[#2b1b15]">
                    Tâm Hương Của Con Cháu Gần Xa
                  </h3>
                </div>
                <span className="text-[10px] text-[#8a6f62]">Hôm nay: 18 lượt</span>
              </div>

              <div className="space-y-2.5 text-xs">
                <div className="p-3 bg-[#fdfaf5] border border-[#dec9b6] rounded-2xl space-y-1">
                  <div className="flex justify-between text-[10px]">
                    <span className="font-bold text-[#2b1b15]">Nguyễn Thị Thu Trang</span>
                    <span className="text-[#8a6f62]">35 phút trước • Từ Paris</span>
                  </div>
                  <div className="text-[10px] text-[#80141d] font-semibold">
                    🌸 Dâng Đóa Cúc Vàng • Cầu Bình An
                  </div>
                  <p className="text-[11px] text-[#6b584d] italic leading-relaxed">
                    "Dù ở đất khách xa xôi, cháu xin thắp nhánh cúc thơm nhớ Cụ. Nhờ những câu
                    chuyện Cụ kể bản hiền nhà ngày xưa..."
                  </p>
                </div>

                <div className="p-3 bg-[#fdfaf5] border border-[#dec9b6] rounded-2xl space-y-1">
                  <div className="flex justify-between text-[10px]">
                    <span className="font-bold text-[#2b1b15]">Nguyễn Quốc Hùng</span>
                    <span className="text-[#8a6f62]">2 giờ trước • Đời thứ 12</span>
                  </div>
                  <div className="text-[10px] text-[#80141d] font-semibold">
                    📜 Dâng Biểu Báo Công • Khởi Nghiệp Thành Công
                  </div>
                  <p className="text-[11px] text-[#6b584d] italic leading-relaxed">
                    "Kính cáo Cụ Cố, công ty của cháu đã chính thức đón nhận viên thứ 50. Chúng cháu
                    luôn giữ nếp nhà lương thiện như Cụ dạy."
                  </p>
                </div>

                <div className="p-3 bg-[#fdfaf5] border border-[#dec9b6] rounded-2xl space-y-1">
                  <div className="flex justify-between text-[10px]">
                    <span className="font-bold text-[#2b1b15]">Nguyễn Văn Lâm</span>
                    <span className="text-[#8a6f62]">5 giờ trước • Đời thứ 10</span>
                  </div>
                  <div className="text-[10px] text-[#80141d] font-semibold">
                    🕯️ Nén Tâm Hương Trầm • Tạ Lễ Tròn Năm
                  </div>
                  <p className="text-[11px] text-[#6b584d] italic leading-relaxed">
                    "Nhớ ngày giỗ Cụ sắp đến, con cháu ở quê nhà đã dọn dẹp từ đường khang trang, tề
                    tựu đông đủ để phụng dưỡng tiền linh."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default OfferIncenseScreen;
