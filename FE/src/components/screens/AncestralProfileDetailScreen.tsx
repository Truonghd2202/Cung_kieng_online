import React, { useState } from 'react';
import type { ScreenType } from '../../types.ts';

interface AncestralProfileDetailScreenProps {
  onNavigate: (screen: ScreenType) => void;
}

export const AncestralProfileDetailScreen: React.FC<AncestralProfileDetailScreenProps> = ({
  onNavigate,
}) => {
  const [activeTab, setActiveTab] = useState<'bio' | 'photos' | 'teachings' | 'guestbook'>('bio');
  const [incenseCount, setIncenseCount] = useState<number>(1280);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleLightIncense = () => {
    setIncenseCount((prev) => prev + 1);
    setToastMessage('Đã thành tâm dâng nén tâm hương tưởng niệm Cụ Cố!');
    setTimeout(() => setToastMessage(null), 3000);
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
        {/* Breadcrumb & Top Badges */}
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
            <span className="text-[#8a6f62]">Hồ Sơ Hương Linh</span>
            <span>›</span>
            <span className="text-[#80141d] font-semibold">Cụ Cố Nguyễn Văn Phúc</span>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="px-3 py-1 rounded-full bg-[#faeed9] text-[#734c13] font-semibold border border-[#dec9b6]">
              Đời thứ 9 • Chi Trực Lăng
            </span>
            <span className="px-3 py-1 rounded-full bg-white text-emerald-800 font-semibold border border-[#dec9b6] flex items-center gap-1">
              <span className="text-emerald-600">✓</span> Gia phả chứng thực
            </span>
          </div>
        </div>

        {/* Hero Ancestral Card */}
        <div className="bg-white rounded-3xl border border-[#dec9b6] p-6 sm:p-8 shadow-2xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Portrait Column */}
            <div className="lg:col-span-4 flex flex-col items-center space-y-3">
              <div className="p-3 bg-gradient-to-b from-[#faeed9] to-[#eed9be] border-2 border-[#c9892c] rounded-2xl shadow-xl ring-8 ring-[#faefe3] text-center w-full max-w-[260px]">
                <img
                  src="/images/ancestor_portrait.jpg"
                  alt="Cụ Cố Nguyễn Văn Phúc"
                  className="w-full h-64 object-cover rounded-xl filter contrast-125 shadow-inner"
                />
                <div className="font-serif font-bold text-sm text-[#2b1b15] mt-2.5">
                  Cụ Cố Nguyễn Văn Phúc
                </div>
                <div className="text-[10px] text-[#80141d] uppercase tracking-wider font-semibold">
                  Tiền Linh An Nghỉ
                </div>
              </div>

              <div className="px-4 py-1.5 rounded-full bg-[#faefe3] border border-[#dec9b6] text-xs font-bold text-[#80141d] flex items-center gap-1.5">
                <span className="material-symbols-outlined text-sm text-red-600">favorite</span>
                <span>Đã dâng {incenseCount.toLocaleString()} nén tâm hương</span>
              </div>
            </div>

            {/* Ancestor Details Column */}
            <div className="lg:col-span-8 space-y-4">
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="px-2.5 py-0.5 rounded-md bg-[#80141d] text-white font-bold text-[10px]">
                  ĐÃ TẠ THẾ • HƯỞNG THỌ 77 TUỔI
                </span>
                <span className="px-2.5 py-0.5 rounded-md bg-[#fdfaf5] border border-[#dec9b6] text-[#4a362f] text-[10px]">
                  Tên: Minh Thuận
                </span>
                <span className="px-2.5 py-0.5 rounded-md bg-[#fdfaf5] border border-[#dec9b6] text-[#4a362f] text-[10px]">
                  Hiệu: Chân Như Cư Sĩ
                </span>
                <span className="px-2.5 py-0.5 rounded-md bg-[#fdfaf5] border border-[#dec9b6] text-[#4a362f] text-[10px]">
                  Cố Hương: Thôn Thượng, Bắc Ninh
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#2b1b15] tracking-tight">
                Cụ Cố Nguyễn Văn Phúc
              </h1>

              <p className="text-xs sm:text-sm text-[#6b584d] leading-relaxed">
                Nguyên Trưởng Tộc đời thứ 9 Đại Tộc Nguyễn Phục Anh. Người đã có công cất dựng nhà
                thờ họ, gìn giữ gia phả qua binh lửa và truyền dạy nghề làm thuốc nam từ tâm cứu
                người khắp vùng Kinh Bắc.
              </p>

              {/* Dates Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div className="p-3.5 bg-[#fdfaf5] border border-[#dec9b6] rounded-2xl flex items-center gap-3">
                  <span className="material-symbols-outlined text-xl text-[#c9892c]">calendar_today</span>
                  <div className="text-xs">
                    <span className="text-[10px] text-[#8a6f62] uppercase font-bold block">
                      Ngày Hạ Sinh
                    </span>
                    <span className="font-bold text-[#2b1b15]">15 tháng 04, 1912</span>
                    <span className="text-[10px] text-[#8a6f62] block mt-0.5">
                      Tức ngày 29 tháng Hai, Nhâm Tý
                    </span>
                  </div>
                </div>

                <div className="p-3.5 bg-[#fdfaf5] border border-[#dec9b6] rounded-2xl flex items-center gap-3">
                  <span className="material-symbols-outlined text-xl text-[#80141d]">local_fire_department</span>
                  <div className="text-xs">
                    <span className="text-[10px] text-[#8a6f62] uppercase font-bold block">
                      Ngày Giỗ Kỵ (Chính Giỗ)
                    </span>
                    <span className="font-bold text-[#80141d]">15 Tháng Bảy (Âm Lịch)</span>
                    <span className="text-[10px] text-[#8a6f62] block mt-0.5">
                      Tạ thế năm Mậu Thìn (1988)
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons Row */}
              <div className="flex flex-wrap items-center gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => onNavigate('khong-gian-tuong-niem-3d')}
                  className="px-4 py-2.5 rounded-xl bg-[#80141d] hover:bg-[#681017] text-white text-xs font-bold transition-all shadow-sm flex items-center gap-1.5 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-sm">view_in_ar</span>
                  <span>Vào Không Gian Tưởng Niệm 3D →</span>
                </button>
                <button
                  type="button"
                  onClick={handleLightIncense}
                  className="px-4 py-2.5 rounded-xl bg-[#faeed9] hover:bg-[#eed9be] text-[#734c13] text-xs font-bold transition-colors border border-[#dec9b6] flex items-center gap-1.5 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-sm">local_fire_department</span>
                  <span>Thắp Nén Tâm Hương</span>
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate('thap-huong-tri-an')}
                  className="px-3.5 py-2.5 rounded-xl bg-white hover:bg-[#faefe3] text-[#4a362f] text-xs font-semibold transition-colors border border-[#dec9b6] flex items-center gap-1.5 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-sm">rate_review</span>
                  <span>Gửi Lời Tri Ân</span>
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate('cay-ky-niem')}
                  className="px-3.5 py-2.5 rounded-xl bg-white hover:bg-[#faefe3] text-[#4a362f] text-xs font-semibold transition-colors border border-[#dec9b6] flex items-center gap-1.5 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-sm">account_tree</span>
                  <span>Xem Cây Gia Phả</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-[#dec9b6]/40 pb-2 text-xs">
          {[
            { id: 'bio', label: 'Tiểu Sử & Đạo Đức Sáng Ngời', icon: 'auto_stories' },
            { id: 'photos', label: 'Di Ảnh & Kỷ Ức Xưa', icon: 'photo_library' },
            { id: 'teachings', label: 'Di Ngôn & Điển Tích', icon: 'format_quote' },
            { id: 'guestbook', label: 'Sổ Tang & Tri Ân', icon: 'favorite' },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-xl font-bold flex items-center gap-1.5 transition-colors border cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-[#80141d] text-white border-[#80141d] shadow-2xs'
                  : 'bg-white text-[#6b584d] border-[#dec9b6] hover:border-[#c9892c]'
              }`}
            >
              <span className="material-symbols-outlined text-sm">{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* 2 Columns: Main Details (8 cols) + Right Widgets (4 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column */}
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-white rounded-3xl border border-[#dec9b6] p-6 sm:p-8 shadow-2xs space-y-5">
              <div className="flex items-center justify-between border-b border-[#dec9b6]/30 pb-3">
                <div className="space-y-0.5">
                  <h2 className="font-serif font-bold text-base text-[#2b1b15]">
                    Hành Trạng Cuộc Đời &amp; Công Đức Tổ Nghiệp
                  </h2>
                  <div className="text-[11px] text-[#8a6f62]">
                    Chép theo văn bia lưu tại Từ Đường Chi Trực Lăng
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => alert('Đang xuất bản in phả ký...')}
                  className="px-3 py-1.5 rounded-lg border border-[#dec9b6] bg-[#fdfaf5] text-xs font-semibold text-[#4a362f] hover:bg-[#faefe3] flex items-center gap-1 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-sm">print</span>
                  <span>In bản phả ký</span>
                </button>
              </div>

              {/* Biography with drop cap */}
              <p className="text-xs sm:text-sm text-[#2b1b15] leading-relaxed first-letter:float-left first-letter:text-5xl first-letter:font-serif first-letter:font-bold first-letter:text-[#80141d] first-letter:mr-3 first-letter:leading-none">
                Cụ Cố Nguyễn Văn Phúc sinh vào giờ Dần, ngày rằm tháng Tư năm Nhâm Tý (1912) tại
                làng Thượng, tổng Vạn Phúc, xứ Kinh Bắc. Sinh thời, Cụ Cố nổi tiếng là bậc văn phong
                nho nhã, tinh thông chữ Hán, thấu hiểu kinh điển Nho gia lẫn y thuật Đông phương.
                Giữa thời loạn lạc, cụ đem y thuật bốc thuốc cứu tế cho bá tánh trăm họ quanh vùng,
                không màng danh lợi.
              </p>

              <p className="text-xs sm:text-sm text-[#4a362f] leading-relaxed">
                Năm 1954, khi chiến sự dâng cao đe dọa các đền đài trong tổng, Cụ Cố đã đích thân bọc
                cuốn <strong className="text-[#80141d]">"Đại Tộc Nguyễn Gia Kỷ Lược"</strong> bằng
                vải sáp, giấu sâu dưới đáy hương án của từ đường để gìn giữ mạch cội nguồn cho trăm
                vạn con cháu muôn đời sau. Nhờ công đức vô lượng ấy, ngày nay dòng tộc mới tường tận
                nguồn gốc từ thủy tổ đến các chi phái.
              </p>

              {/* Biên Niên Cột Mốc Quan Trọng */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-2 font-serif font-bold text-sm text-[#80141d]">
                  <span className="material-symbols-outlined text-sm">timeline</span>
                  <span>Biên Niên Cột Mốc Quan Trọng</span>
                </div>

                <div className="space-y-3 pl-2 border-l-2 border-[#dec9b6] ml-2 text-xs">
                  <div className="relative pl-4">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#80141d] absolute -left-[5px] top-1" />
                    <div className="flex justify-between font-bold text-[#2b1b15]">
                      <span>Thụ phong Chánh Hương Hội làng Thượng</span>
                      <span className="text-[10px] text-[#8a6f62]">NĂM 1938 (ẤT HỢI)</span>
                    </div>
                    <p className="text-[11px] text-[#6b584d] mt-0.5">
                      Chủ trì tu bổ đình làng, mở lớp dạy chữ Nho và chữ Quốc Ngữ miễn phí cho trẻ em
                      nghèo trong thôn.
                    </p>
                  </div>

                  <div className="relative pl-4">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#c9892c] absolute -left-[5px] top-1" />
                    <div className="flex justify-between font-bold text-[#2b1b15]">
                      <span>Thành lập Phòng Thuốc Nam Tư Lực</span>
                      <span className="text-[10px] text-[#8a6f62]">NĂM 1952 (NHÂM DẦN)</span>
                    </div>
                    <p className="text-[11px] text-[#6b584d] mt-0.5">
                      Phối hợp cùng trạm y tế xã chữa lành bệnh dịch tả cho hơn 300 hộ gia đình mà
                      không lấy một đồng thù lao.
                    </p>
                  </div>

                  <div className="relative pl-4">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#80141d] absolute -left-[5px] top-1" />
                    <div className="flex justify-between font-bold text-[#2b1b15]">
                      <span>Trùng tu Chính Tẩm &amp; Dâng Phả Đồ</span>
                      <span className="text-[10px] text-[#8a6f62]">NĂM 1982 (NHÂM TUẤT)</span>
                    </div>
                    <p className="text-[11px] text-[#6b584d] mt-0.5">
                      Hoàn thành công trình gia phả 12 đời chữ Hán Nôm và trao quyền coi sóc từ
                      đường lại cho thế hệ thứ 10.
                    </p>
                  </div>

                  <div className="relative pl-4">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#5c4033] absolute -left-[5px] top-1" />
                    <div className="flex justify-between font-bold text-[#2b1b15]">
                      <span>Thuận quy Tiên cảnh</span>
                      <span className="text-[10px] text-[#8a6f62]">NĂM 1988 (MẬU THÌN)</span>
                    </div>
                    <p className="text-[11px] text-[#6b584d] mt-0.5">
                      Hưởng thọ 77 tuổi trong vòng tay con cháu nội ngoại quy tụ tề tựu đông đủ.
                    </p>
                  </div>
                </div>
              </div>

              {/* Gia Phong Bốn Chữ Vàng Parchment Banner */}
              <div className="p-4 bg-[#faefe3]/70 border-l-4 border-[#c9892c] rounded-r-2xl space-y-1">
                <div className="font-serif font-bold text-xs text-[#80141d]">
                  Gia Phong Bốn Chữ Vàng: "Cần - Kiệm - Nhân - Hòa"
                </div>
                <p className="text-xs text-[#6b584d] leading-relaxed">
                  Đức hạnh của Cụ Cố được khắc trang trọng tại bức hoành phi chính điện Từ Đường, là
                  kim chỉ nam soi sáng lối đi cho từng con cháu trong họ gìn giữ danh tiếng thanh
                  bạch của tông tộc.
                </p>
              </div>
            </div>

            {/* Big 3D CTA Banner */}
            <div className="bg-[#2b1b15] text-white rounded-3xl p-6 sm:p-7 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6 border-2 border-[#c9892c]/50 relative overflow-hidden">
              <div className="space-y-1.5 max-w-lg z-10">
                <div className="text-[10px] font-bold tracking-widest uppercase text-[#faeed9]">
                  Không Gian Thực Tế Ảo 3D Linh Thiêng
                </div>
                <h3 className="font-serif font-bold text-xl text-white">
                  Bước Vào Gian Thờ 3D Cụ Cố Nguyễn Văn Phúc
                </h3>
                <p className="text-xs text-white/80 leading-relaxed">
                  Trải nghiệm dâng hương thực tế ảo, ngắm nhìn tận mắt không gian hương án, bình
                  phong thế kỷ 20 và nghe tiếng chuông ngân tịnh độ trong khung cảnh tôn nghiêm.
                </p>
              </div>

              <div className="z-10 shrink-0 text-center space-y-1">
                <button
                  type="button"
                  onClick={() => onNavigate('khong-gian-tuong-niem-3d')}
                  className="px-5 py-3 rounded-2xl bg-gradient-to-r from-[#c9892c] to-[#e5a93c] hover:brightness-110 text-[#2b1b15] font-serif font-bold text-xs shadow-xl transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-base">view_in_ar</span>
                  <span>Khởi Động Không Gian 3D</span>
                </button>
                <div className="text-[10px] text-white/60">Hỗ trợ PC, Tablet &amp; Kính VR</div>
              </div>

              <div className="absolute right-0 -bottom-6 text-white/5 select-none text-9xl font-serif pointer-events-none">
                堂
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-4 space-y-6">
            {/* Widget 1: Lễ Kỵ Giỗ Sắp Tới */}
            <div className="bg-white rounded-3xl border border-[#dec9b6] p-5 shadow-2xs space-y-3.5">
              <div className="flex items-center justify-between border-b border-[#dec9b6]/30 pb-2.5">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#80141d] text-base">event</span>
                  <h3 className="font-serif font-bold text-xs uppercase tracking-wider text-[#2b1b15]">
                    Lễ Kỵ Giỗ Sắp Tới
                  </h3>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-[#80141d] text-white text-[9px] font-bold">
                  Chính Lễ
                </span>
              </div>

              <div className="p-3 bg-[#faefe3]/50 border border-[#dec9b6] rounded-2xl text-center space-y-1">
                <div className="text-[10px] uppercase font-bold text-[#8a6f62]">
                  Thời gian đến ngày giỗ Cụ Cố
                </div>
                <div className="text-3xl font-serif font-bold text-[#80141d]">204</div>
                <div className="text-[10px] font-semibold text-[#80141d]">Ngày nữa</div>
                <div className="text-[11px] text-[#6b584d]">15 Tháng Bảy Âm Lịch (Năm Ất Tỵ)</div>
              </div>

              <div className="space-y-2 text-xs">
                <div className="text-[10px] font-bold text-[#8a6f62] uppercase tracking-wider">
                  Phân công ban cúng lễ (Chi Trực Lăng):
                </div>

                <div className="p-2.5 bg-[#fdfaf5] border border-[#dec9b6] rounded-xl flex items-center justify-between">
                  <div>
                    <div className="font-bold text-[#2b1b15]">Chủ tế nghi lễ</div>
                    <div className="text-[10px] text-[#8a6f62]">Trưởng tộc Nguyễn Trực Viễn</div>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                    Đã nhận
                  </span>
                </div>

                <div className="p-2.5 bg-[#fdfaf5] border border-[#dec9b6] rounded-xl flex items-center justify-between">
                  <div>
                    <div className="font-bold text-[#2b1b15]">Mâm cỗ truyền thống</div>
                    <div className="text-[10px] text-[#8a6f62]">Gia đình Bác Phan Nam</div>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                    Đã nhận
                  </span>
                </div>

                <div className="p-2.5 bg-[#fdfaf5] border border-[#dec9b6] rounded-xl flex items-center justify-between">
                  <div>
                    <div className="font-bold text-[#2b1b15]">Đọc văn tế &amp; Khai từ</div>
                    <div className="text-[10px] text-[#8a6f62]">Ban Phụng Điển Tộc</div>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 text-[10px] font-bold">
                    Chờ bổ sung
                  </span>
                </div>
              </div>
            </div>

            {/* Widget 2: Di Vật Truyền Thừa */}
            <div className="bg-white rounded-3xl border border-[#dec9b6] p-5 shadow-2xs space-y-3">
              <div className="flex items-center justify-between border-b border-[#dec9b6]/30 pb-2">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#80141d] text-base">
                    inventory_2
                  </span>
                  <h3 className="font-serif font-bold text-xs uppercase tracking-wider text-[#2b1b15]">
                    Di Vật Truyền Thừa
                  </h3>
                </div>
                <span className="text-[10px] text-[#8a6f62]">2 hiện vật</span>
              </div>

              <div
                onClick={() => onNavigate('chi-tiet-gia-bao')}
                className="p-2.5 bg-[#fdfaf5] border border-[#dec9b6] rounded-2xl flex items-center gap-3 cursor-pointer hover:bg-[#faefe3] transition-colors"
              >
                <img
                  src="/images/relic_box.jpg"
                  alt="Đồng hồ OMEGA"
                  className="w-12 h-12 rounded-xl object-cover border border-[#dec9b6]"
                />
                <div className="text-xs">
                  <div className="font-bold text-[#2b1b15]">Chiếc Đồng Hồ OMEGA 1922</div>
                  <div className="text-[10px] text-[#8a6f62]">Kỷ vật nhận khi đỗ tú tài Tây học</div>
                  <div className="text-[9px] text-[#80141d]">Lưu trữ: Tả gia bảo Từ Đường</div>
                </div>
              </div>

              <div
                onClick={() => onNavigate('phan-tich-but-tich')}
                className="p-2.5 bg-[#fdfaf5] border border-[#dec9b6] rounded-2xl flex items-center gap-3 cursor-pointer hover:bg-[#faefe3] transition-colors"
              >
                <img
                  src="/images/relic_book.jpg"
                  alt="Bản thảo y thuật"
                  className="w-12 h-12 rounded-xl object-cover border border-[#dec9b6]"
                />
                <div className="text-xs">
                  <div className="font-bold text-[#2b1b15]">Bản Thảo Hán Nôm Y Thuật</div>
                  <div className="text-[10px] text-[#8a6f62]">120 bài thuốc trị phong hàn</div>
                  <div className="text-[9px] text-[#80141d]">Lưu trữ: Viện Hán Nôm số hóa</div>
                </div>
              </div>
            </div>

            {/* Widget 3: Vị Trí Mộ Phần Cụ Cố */}
            <div className="bg-white rounded-3xl border border-[#dec9b6] p-5 shadow-2xs space-y-3">
              <div className="flex items-center justify-between border-b border-[#dec9b6]/30 pb-2">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#80141d] text-base">
                    location_on
                  </span>
                  <h3 className="font-serif font-bold text-xs uppercase tracking-wider text-[#2b1b15]">
                    Vị Trí Mộ Phần Cụ Cố
                  </h3>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-[#faeed9] text-[#734c13] text-[9px] font-bold">
                  Lăng Số 04
                </span>
              </div>

              <p className="text-[11px] text-[#6b584d] leading-relaxed">
                Khu lăng mộ tổ Nguyễn Tộc, gò Bát Nhã, Thôn Thượng, xã Cảnh Hưng, Bắc Ninh.
              </p>

              {/* Map Preview */}
              <div className="rounded-2xl overflow-hidden border border-[#dec9b6] relative h-32 bg-amber-50">
                <img
                  src="/images/hero_family.jpg"
                  alt="Bản đồ lăng mộ"
                  className="w-full h-full object-cover filter contrast-125 brightness-95"
                />
                <div className="absolute inset-x-2 bottom-2 p-2 rounded-xl bg-white/95 backdrop-blur-xs border border-[#dec9b6] flex items-center justify-between text-xs">
                  <span className="text-[10px] font-mono text-[#4a362f]">
                    Tọa độ: 21.1294° N, 106.0742° E
                  </span>
                  <button
                    type="button"
                    onClick={() => alert('Mở chỉ đường Google Maps tới lăng mộ...')}
                    className="px-2.5 py-1 rounded-md bg-[#80141d] text-white text-[10px] font-bold cursor-pointer"
                  >
                    Chỉ đường
                  </button>
                </div>
              </div>

              <div className="flex justify-between text-[11px] text-[#8a6f62] pt-1">
                <span>Người trông nom: Bác Ba Lễ</span>
                <span className="font-mono text-[#80141d] font-bold">SĐT: 0912.xxx.789</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AncestralProfileDetailScreen;
