import React, { useState } from 'react';
import type { ScreenType } from '../../types.ts';

interface RitualDetailScreenProps {
  onNavigate: (screen: ScreenType) => void;
}

interface ChecklistItem {
  id: string;
  category: 'offerings' | 'feast';
  name: string;
  desc: string;
  checked: boolean;
}

const initialChecklist: ChecklistItem[] = [
  // Lễ vật dâng hương hoa quả (5 items)
  {
    id: 'c1',
    category: 'offerings',
    name: 'Mâm Ngũ Quả Đủ Ngũ Sắc (Chuối xanh, bưởi cuống lá, quýt, phật thủ, ớt/hồng)',
    desc: 'Nải chuối tiêu còn râu, quả cong đều như bàn tay Phật che chở.',
    checked: true,
  },
  {
    id: 'c2',
    category: 'offerings',
    name: 'Hoa tươi thuần khiết (Bình hoa huệ ta trắng ngát hoặc hoa lay-ơn đỏ thắm)',
    desc: 'Tránh các loại hoa cúc tạp hoặc hoa ngoại lai không mùi vị thanh tao.',
    checked: true,
  },
  {
    id: 'c3',
    category: 'offerings',
    name: 'Trầu cau tươm tất (1 quả cau nguyên núm + 3 lá trầu quết vôi khử từ)',
    desc: 'Đựng trên đĩa đồng thau hoặc gốm men lam truyền thống.',
    checked: true,
  },
  {
    id: 'c4',
    category: 'offerings',
    name: 'Trà ướp sen cổ truyền & Rượu nếp cái hoa vàng',
    desc: 'Ba chén rượu con đặt trên đài xót, một ấm trà nóng lúc thắp hương.',
    checked: true,
  },
  {
    id: 'c5',
    category: 'offerings',
    name: 'Vàng mã truyền thống tối giản (Tập vàng thiếc, đinh tiền giấy cổ)',
    desc: 'Chỉ dùng lượng tượng trưng, tuyệt đối không lạm dụng hình nhân hiện đại.',
    checked: true,
  },
  // Mâm cỗ mặn thuần Việt (6 items)
  {
    id: 'c6',
    category: 'feast',
    name: 'Gà Trống Thiến Luộc ngậm hoa hồng thắm',
    desc: 'Da vàng bóng quết mỡ nghệ, mào thẳng đỏ, chân co gập gọn trong nhỏ.',
    checked: true,
  },
  {
    id: 'c7',
    category: 'feast',
    name: 'Bánh Chưng Gấc đỏ son truyền thống',
    desc: 'Gói vuông vức 4 góc, lạt tre giang chẻ óng mượt, màu gấc tượng trưng hoan hỷ.',
    checked: true,
  },
  {
    id: 'c8',
    category: 'feast',
    name: 'Canh Măng Mực Làng Bát Tràng (Hoặc Canh bóng thả ngũ sắc)',
    desc: 'Nước dùng thanh trong, măng xé sợi cước óng ả, vị ngọt ấm nồng.',
    checked: false,
  },
  {
    id: 'c9',
    category: 'feast',
    name: 'Đĩa Nem Rán Hà Thành giòn rụm & Dưa hành củ muối trắng',
    desc: 'Nhân tôm thịt, mộc nhĩ nấm hương, ăn kèm củ hành muối chua dịu khử ngấy.',
    checked: false,
  },
  {
    id: 'c10',
    category: 'feast',
    name: 'Xôi Vò Hoàng Phố óng vàng đỗ xanh',
    desc: 'Từng hạt nếp tơi xốp quyện bột đậu mịn thơm ngậy.',
    checked: false,
  },
  {
    id: 'c11',
    category: 'feast',
    name: 'Giò Lụa Ước Lễ & Giò Hoa Cắt Tỉa Khéo Léo',
    desc: 'Khoanh giò cắt thành 6 hoặc 8 cánh hoa cân đối trên đĩa hoa biên.',
    checked: false,
  },
];

export const RitualDetailScreen: React.FC<RitualDetailScreenProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'checklist' | 'steps' | 'prayer'>('checklist');
  const [selectedDialect, setSelectedDialect] = useState<'north' | 'central' | 'south'>('north');
  const [checklist, setChecklist] = useState<ChecklistItem[]>(initialChecklist);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const toggleCheck = (id: string) => {
    setChecklist((prev) =>
      prev.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item))
    );
  };

  const checkedCount = checklist.filter((item) => item.checked).length;
  const totalCount = checklist.length;
  const percentage = Math.round((checkedCount / totalCount) * 100);

  return (
    <div className="w-full min-h-screen bg-[#fcf8f2] text-[#2b1b15] font-sans pb-16">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-[#80141d] text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 border border-[#c9892c]/50 animate-fade-in text-xs font-semibold">
          <span className="material-symbols-outlined text-[#faeed9] text-base">verified</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-5 space-y-6">
        {/* Top Breadcrumb & Archive Code */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs border-b border-[#dec9b6]/50 pb-3">
          <div className="flex items-center gap-2 text-[#8a6f62]">
            <button
              type="button"
              onClick={() => onNavigate('cam-nang-nghi-le')}
              className="hover:text-[#80141d] transition-colors cursor-pointer"
            >
              Nghi Lễ &amp; Văn Khấn
            </button>
            <span>&gt;</span>
            <button
              type="button"
              onClick={() => onNavigate('cam-nang-nghi-le')}
              className="hover:text-[#80141d] transition-colors cursor-pointer"
            >
              Cẩm Nang Nghi Lễ
            </button>
            <span>&gt;</span>
            <span className="text-[#80141d] font-bold">
              Đại Lễ Cúng Tất Niên Chiều 30 Tết (Phong Tục Bắc Bộ)
            </span>
          </div>

          <div className="flex items-center gap-2 text-[11px] text-[#8a6f62]">
            <span className="material-symbols-outlined text-sm text-[#c9892c]">verified</span>
            <span>Văn bản Khảo chứng Thư viện gia tộc Kỷ • Mã số lễ: NL-30TET-01</span>
          </div>
        </div>

        {/* Hero Title Header Area */}
        <div className="relative pt-2 pb-1">
          {/* Subtle Traditional Circular Watermark SVG on Top Right */}
          <div className="absolute right-0 top-0 w-36 h-36 opacity-10 pointer-events-none hidden md:block">
            <svg viewBox="0 0 100 100" className="w-full h-full text-[#80141d] fill-current">
              <circle cx="50" cy="50" r="46" fill="none" stroke="currentColor" strokeWidth="2" />
              <circle cx="50" cy="50" r="38" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
              <circle cx="50" cy="50" r="28" fill="none" stroke="currentColor" strokeWidth="1.5" />
              <circle cx="50" cy="50" r="14" fill="none" stroke="currentColor" strokeWidth="1" />
              <path d="M50 4 L50 96 M4 50 L96 50" stroke="currentColor" strokeWidth="0.8" />
            </svg>
          </div>

          <div className="space-y-3 max-w-4xl">
            {/* Badges Row */}
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="px-3 py-1 rounded-full bg-[#80141d] text-white text-[11px] font-bold tracking-wider shadow-2xs">
                ĐẠI LỄ TRỌNG NIÊN
              </span>
              <span className="px-3 py-1 rounded-full bg-white border border-[#dec9b6] text-[#4a362f] text-[11px] font-medium flex items-center gap-1 shadow-2xs">
                <span className="material-symbols-outlined text-xs text-[#80141d]">schedule</span>
                <span>Giờ Tốt: Giờ Mùi (13h-15h) &amp; Giờ Thân (15h-17h)</span>
              </span>
              <span className="px-3 py-1 rounded-full bg-[#faeed9] border border-[#dec9b6] text-[#734c13] text-[11px] font-bold shadow-2xs">
                Chiều 30 Tháng Chạp
              </span>
            </div>

            {/* Main Title */}
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#2b1b15] leading-tight">
              Đại Lễ Cúng Tất Niên Tiễn Năm Cũ, Đón Tổ Tiên Chiều 30 Tết
            </h1>

            {/* Subtitle */}
            <p className="text-xs sm:text-sm text-[#6b584d] leading-relaxed max-w-3xl">
              Nghi thức thiêng liêng nhất khép lại năm cũ, tẩy trần bao sái từ đường, dâng mâm hương hỏa kính thỉnh lịch đại tiền tổ hồi quy ngự tại gia đình, chứng giám lòng thành thơm thảo và cùng con cháu sum vầy ba ngày Tết nguyên đán.
            </p>
          </div>
        </div>

        {/* 4 Metadata Boxes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Box 1 */}
          <div className="p-3.5 bg-white border border-[#dec9b6] rounded-2xl shadow-2xs flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#faefe3] text-[#80141d] flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-xl">explore</span>
            </div>
            <div>
              <div className="text-[10px] text-[#8a6f62] uppercase tracking-wider font-semibold">
                Vùng Miền Chuẩn Định
              </div>
              <div className="text-xs font-serif font-bold text-[#2b1b15]">
                Kinh Kỳ &amp; Bắc Bộ Xưa
              </div>
              <div className="text-[10px] text-[#8a6f62]">Hỗ trợ so sánh dị biệt</div>
            </div>
          </div>

          {/* Box 2 */}
          <div className="p-3.5 bg-white border border-[#dec9b6] rounded-2xl shadow-2xs flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#faefe3] text-[#80141d] flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-xl">menu_book</span>
            </div>
            <div>
              <div className="text-[10px] text-[#8a6f62] uppercase tracking-wider font-semibold">
                Nguồn Gốc Điển Tích
              </div>
              <div className="text-xs font-serif font-bold text-[#2b1b15]">
                Việt Nam Phong Tục
              </div>
              <div className="text-[10px] text-[#8a6f62]">sách Lễ Phục Anh Tộc Tự (1915)</div>
            </div>
          </div>

          {/* Box 3 */}
          <div className="p-3.5 bg-white border border-[#dec9b6] rounded-2xl shadow-2xs flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#faefe3] text-[#80141d] flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-xl">person</span>
            </div>
            <div>
              <div className="text-[10px] text-[#8a6f62] uppercase tracking-wider font-semibold">
                Người Thẩm Định
              </div>
              <div className="text-xs font-serif font-bold text-[#2b1b15]">
                GS. Hà Thúc Liêm
              </div>
              <div className="text-[10px] text-[#8a6f62]">Cụ Nguyễn Trực Viễn (Trưởng tộc)</div>
            </div>
          </div>

          {/* Box 4 */}
          <div className="p-3.5 bg-white border border-[#dec9b6] rounded-2xl shadow-2xs flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#faefe3] text-[#80141d] flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-xl">history_edu</span>
            </div>
            <div>
              <div className="text-[10px] text-[#8a6f62] uppercase tracking-wider font-semibold">
                Hiệu Đính Lần Cuối
              </div>
              <div className="text-xs font-serif font-bold text-[#2b1b15]">
                16 Tháng Chạp Giáp Thìn
              </div>
              <div className="text-[10px] text-[#8a6f62]">Tháng 01/2025 • Chuẩn Tộc Hội</div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs & Dialect Selector */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pt-1">
          {/* Main 3 Tabs */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setActiveTab('checklist')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'checklist'
                  ? 'bg-[#80141d] text-white shadow-xs'
                  : 'bg-white border border-[#dec9b6] text-[#4a362f] hover:border-[#80141d]'
              }`}
            >
              <span className="material-symbols-outlined text-sm">checklist</span>
              <span>1. Danh Sách Chuẩn Bị</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('steps')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'steps'
                  ? 'bg-[#80141d] text-white shadow-xs'
                  : 'bg-white border border-[#dec9b6] text-[#4a362f] hover:border-[#80141d]'
              }`}
            >
              <span className="material-symbols-outlined text-sm">format_list_numbered</span>
              <span>2. Các Bước Tiến Hành</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('prayer')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'prayer'
                  ? 'bg-[#80141d] text-white shadow-xs'
                  : 'bg-white border border-[#dec9b6] text-[#4a362f] hover:border-[#80141d]'
              }`}
            >
              <span className="material-symbols-outlined text-sm">menu_book</span>
              <span>3. Bài Văn Khấn Chuẩn</span>
            </button>
          </div>

          {/* Right Dialect Selector */}
          <div className="flex items-center gap-2 text-xs">
            <span className="text-[11px] font-bold text-[#8a6f62] tracking-wider uppercase">
              DỊ BIỆT:
            </span>
            <button
              type="button"
              onClick={() => setSelectedDialect('north')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                selectedDialect === 'north'
                  ? 'bg-white border-2 border-[#80141d] text-[#80141d] shadow-2xs'
                  : 'bg-white/60 border border-[#dec9b6] text-[#6b584d] hover:bg-white'
              }`}
            >
              Bản Xứ (Bắc)
            </button>
            <button
              type="button"
              onClick={() => setSelectedDialect('central')}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                selectedDialect === 'central'
                  ? 'bg-white border-2 border-[#80141d] text-[#80141d] shadow-2xs font-bold'
                  : 'bg-white/60 border border-[#dec9b6] text-[#6b584d] hover:bg-white'
              }`}
            >
              Trung Bộ
            </button>
            <button
              type="button"
              onClick={() => setSelectedDialect('south')}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                selectedDialect === 'south'
                  ? 'bg-white border-2 border-[#80141d] text-[#80141d] shadow-2xs font-bold'
                  : 'bg-white/60 border border-[#dec9b6] text-[#6b584d] hover:bg-white'
              }`}
            >
              Nam Bộ
            </button>
          </div>
        </div>

        {/* Culture Feature Alert Box */}
        <div className="p-4 bg-[#faeed9]/50 border border-[#dec9b6] rounded-2xl flex items-start gap-3 text-xs leading-relaxed">
          <span className="material-symbols-outlined text-base text-[#c9892c] shrink-0 mt-0.5">
            info
          </span>
          <div>
            <span className="font-bold text-[#80141d]">Đặc Trưng Văn Hóa Tất Niên Bắc Bộ: </span>
            <span className="text-[#4a362f]">
              Bắc Bộ chú trọng quy chuẩn "4 bát 6 đĩa" (hoặc 8 bát 8 đĩa ở đại gia đình) để tạo tính cân bằng âm dương ngũ hành. Bát hương và mâm cỗ đặt chuẩn trục thần đạo, chuộng hoa đào bích thắm, hoa huệ trắng và mâm ngũ quả truyền thống (chuối tiêu xanh nâng đỡ bưởi vàng, đào, quýt, hồng).
            </span>
          </div>
        </div>

        {/* TAB 1: DANH SÁCH CHUẨN BỊ */}
        {activeTab === 'checklist' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Column (Items List) */}
            <div className="lg:col-span-7 space-y-5">
              {/* Progress Header Box */}
              <div className="p-4 bg-white border border-[#dec9b6] rounded-2xl shadow-2xs flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#80141d] text-white flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-xl">task_alt</span>
                  </div>
                  <div>
                    <div className="text-xs font-serif font-bold text-[#2b1b15]">
                      Tiến Độ Sắm Sửa Lễ Vật
                    </div>
                    <div className="text-[11px] text-[#8a6f62]">
                      Đã chuẩn bị: <span className="font-bold text-[#80141d]">{checkedCount}</span> / {totalCount} món lễ phẩm
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 w-48 shrink-0">
                  <div className="flex-1 bg-[#faefe3] h-2.5 rounded-full overflow-hidden border border-[#dec9b6]/60">
                    <div
                      className="bg-[#80141d] h-full rounded-full transition-all duration-300"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span className="text-xs font-bold text-[#80141d]">{percentage}%</span>
                </div>
              </div>

              {/* Group 1: Lễ Vật Dâng Hương Hoa Quả */}
              <div className="p-5 bg-white border border-[#dec9b6] rounded-3xl shadow-2xs space-y-3.5">
                <div className="flex items-center justify-between border-b border-[#dec9b6]/40 pb-2.5">
                  <div className="flex items-center gap-2 font-serif font-bold text-sm text-[#2b1b15]">
                    <span className="text-[#80141d] text-base">•</span>
                    <span>Lễ Vật Dâng Hương Hoa Quả</span>
                  </div>
                  <span className="text-[10px] font-bold text-[#c9892c] tracking-wider uppercase">
                    HƯƠNG HOA PHẨM TIẾT
                  </span>
                </div>

                <div className="space-y-2.5">
                  {checklist
                    .filter((item) => item.category === 'offerings')
                    .map((item) => (
                      <div
                        key={item.id}
                        onClick={() => toggleCheck(item.id)}
                        className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 ${
                          item.checked
                            ? 'bg-[#faefe3]/50 border-[#dec9b6]'
                            : 'bg-white border-[#dec9b6]/60 hover:border-[#c9892c]'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={item.checked}
                          onChange={() => {}}
                          className="mt-0.5 w-4 h-4 rounded text-[#80141d] focus:ring-[#80141d] border-[#dec9b6] accent-[#80141d] cursor-pointer"
                        />
                        <div className="space-y-0.5">
                          <div
                            className={`text-xs font-semibold ${
                              item.checked ? 'text-[#2b1b15]' : 'text-[#6b584d]'
                            }`}
                          >
                            {item.name}
                          </div>
                          <div className="text-[11px] text-[#8a6f62] leading-relaxed">
                            {item.desc}
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>

              {/* Group 2: Mâm Cỗ Mặn Thuần Việt */}
              <div className="p-5 bg-white border border-[#dec9b6] rounded-3xl shadow-2xs space-y-3.5">
                <div className="flex items-center justify-between border-b border-[#dec9b6]/40 pb-2.5">
                  <div className="flex items-center gap-2 font-serif font-bold text-sm text-[#2b1b15]">
                    <span className="text-[#80141d] text-base">•</span>
                    <span>Mâm Cỗ Mặn Thuần Việt (4 Bát 6 Đĩa)</span>
                  </div>
                  <span className="text-[10px] font-bold text-[#80141d] tracking-wider uppercase">
                    MỸ VỊ GIA PHẢ
                  </span>
                </div>

                <div className="space-y-2.5">
                  {checklist
                    .filter((item) => item.category === 'feast')
                    .map((item) => (
                      <div
                        key={item.id}
                        onClick={() => toggleCheck(item.id)}
                        className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 ${
                          item.checked
                            ? 'bg-[#faefe3]/50 border-[#dec9b6]'
                            : 'bg-white border-[#dec9b6]/60 hover:border-[#c9892c]'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={item.checked}
                          onChange={() => {}}
                          className="mt-0.5 w-4 h-4 rounded text-[#80141d] focus:ring-[#80141d] border-[#dec9b6] accent-[#80141d] cursor-pointer"
                        />
                        <div className="space-y-0.5">
                          <div
                            className={`text-xs font-semibold ${
                              item.checked ? 'text-[#2b1b15]' : 'text-[#6b584d]'
                            }`}
                          >
                            {item.name}
                          </div>
                          <div className="text-[11px] text-[#8a6f62] leading-relaxed">
                            {item.desc}
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>

            {/* Right Column (Altar Diagram & Philosophy) */}
            <div className="lg:col-span-5 space-y-5">
              {/* Sơ Đồ Bày Biện Ban Thờ */}
              <div className="p-5 bg-white border border-[#dec9b6] rounded-3xl shadow-2xs space-y-4">
                <div className="flex items-center justify-between border-b border-[#dec9b6]/40 pb-2.5">
                  <div className="font-serif font-bold text-sm text-[#2b1b15] flex items-center gap-1.5">
                    <span>Sơ Đồ Bày Biện Ban Thờ</span>
                  </div>
                  <span className="material-symbols-outlined text-base text-[#8a6f62]">
                    schema
                  </span>
                </div>

                {/* Visual Altar Hierarchy Layout Diagram */}
                <div className="space-y-2.5">
                  {/* Layer 1: Khám thờ / Linh vị */}
                  <div className="p-3 rounded-xl bg-[#faefe3] border border-[#dec9b6] text-center shadow-2xs">
                    <span className="text-[11px] font-bold text-[#80141d] uppercase tracking-wider">
                      KHÁM THỜ / LINH VỊ / ẢNH TIỀN TỔ
                    </span>
                  </div>

                  {/* Layer 2: 3 Items Row */}
                  <div className="grid grid-cols-3 gap-2 text-center text-[10px]">
                    <div className="p-2.5 rounded-xl bg-[#faefe3] border border-[#dec9b6] text-[#734c13] font-medium flex flex-col items-center justify-center">
                      <span className="font-bold">Đèn Dầu Tổ</span>
                      <span className="text-[9px] text-[#8a6f62]">(Dương)</span>
                    </div>

                    <div className="p-2.5 rounded-xl bg-[#80141d] text-white font-bold flex flex-col items-center justify-center shadow-xs">
                      <span>Bát Hương</span>
                      <span>Thần Đạo</span>
                    </div>

                    <div className="p-2.5 rounded-xl bg-[#faefe3] border border-[#dec9b6] text-[#734c13] font-medium flex flex-col items-center justify-center">
                      <span className="font-bold">Nến Lưỡng Nghi</span>
                      <span className="text-[9px] text-[#8a6f62]">(Âm)</span>
                    </div>
                  </div>

                  {/* Layer 3: Đài Nước & Lọ hoa */}
                  <div className="p-2.5 rounded-xl bg-[#faefe3]/80 border border-[#dec9b6] text-center text-[11px] text-[#4a362f] font-medium">
                    Đài Nước (3 chung) • Chén Nước Thanh Tịnh • Lọ Hoa Huệ (Đông Bình)
                  </div>

                  {/* Layer 4: Mâm ngũ quả & Mâm cỗ mặn */}
                  <div className="p-2.5 rounded-xl bg-[#faefe3]/80 border border-[#dec9b6] text-center text-[11px] text-[#4a362f] font-medium">
                    Mâm Ngũ Quả (Tây Quả) &amp; Mâm Cỗ Mặn Chiều 30
                  </div>
                </div>

                {/* Explanatory Rule */}
                <p className="text-[11px] text-[#6b584d] leading-relaxed pt-1">
                  Quy tắc bất biến: <strong className="text-[#80141d]">"Đông Bình - Tây Quả"</strong>. Bình hoa đặt hướng tay trái từ ngoài nhìn vào (hướng Đông tượng trưng cho sinh sôi), đĩa quả đặt hướng tay phải (hướng Tây tượng trưng cho kết trái trọn vẹn).
                </p>
              </div>

              {/* Photo & Philosophy Card */}
              <div className="bg-white border border-[#dec9b6] rounded-3xl overflow-hidden shadow-2xs">
                <div className="relative h-44 overflow-hidden group">
                  <img
                    src="/images/hero_family.jpg"
                    alt="Mâm cỗ Tất niên phục dựng chuẩn lối xưa"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute bottom-2 left-2 px-2.5 py-1 bg-black/60 backdrop-blur-xs rounded-lg text-[10px] text-white font-medium">
                    Mâm cỗ Tất niên phục dựng chuẩn lối xưa
                  </div>
                </div>

                <div className="p-5 space-y-2">
                  <div className="font-serif font-bold text-sm text-[#80141d]">
                    Triết Lý "Ngũ Vị Điều Hòa"
                  </div>
                  <p className="text-xs text-[#6b584d] leading-relaxed">
                    Mâm cỗ cúng chiều 30 không chỉ là lòng thành thơm thảo mà còn thể hiện đạo dưỡng sinh của người Việt: đủ ngũ hành Kim - Mộc - Thủy - Hỏa - Thổ, đủ vị chua cay mặn ngọt bùi béo để cầu chúc năm mới gia đạo vạn sự hanh thông viên mãn.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: CÁC BƯỚC TIẾN HÀNH */}
        {activeTab === 'steps' && (
          <div className="p-6 bg-white border border-[#dec9b6] rounded-3xl shadow-2xs space-y-6">
            <div className="flex items-center justify-between border-b border-[#dec9b6]/50 pb-3">
              <div>
                <h3 className="text-base font-serif font-bold text-[#2b1b15]">
                  Trình Tự 5 Bước Thực Hành Lễ Cúng Tất Niên Chuẩn Cổ
                </h3>
                <p className="text-xs text-[#6b584d]">
                  Thực hiện tuần tự từ tẩy trần bàn thờ đến thụ lộc đầu xuân.
                </p>
              </div>
              <span className="px-3 py-1 rounded-full bg-[#faeed9] text-[#734c13] text-xs font-bold border border-[#dec9b6]">
                Nghi Tiết Cổ Truyền
              </span>
            </div>

            <div className="space-y-4">
              {[
                {
                  step: '01',
                  title: 'Bao sái tẩy trần bàn thờ & Bài trí phẩm vật',
                  time: '12h00 - 13h30',
                  desc: 'Dùng nước ngũ vị hương (quế, hồi, đinh hương, gừng, sả) hoặc rượu gừng ấm lau sạch bài vị, di ảnh và đồ đồng. Bày biện mâm cỗ mặn, mâm ngũ quả và hoa tươi theo trục Đông Bình Tây Quả.',
                },
                {
                  step: '02',
                  title: 'Thắp nến lưỡng nghi & Đèn dầu quang minh',
                  time: '14h00',
                  desc: 'Chủ tế mặc áo dài chỉnh tề, rửa tay thanh tịnh, châm lửa vào cặp nến lưỡng nghi và đèn dầu tổ để khai quang ban thờ, cung thỉnh dương khí xua tan u ám.',
                },
                {
                  step: '03',
                  title: 'Dâng hương & Khởi niệm văn khấn Tất niên',
                  time: '14h15',
                  desc: 'Chủ tế châm 3 nén hương trầm, vái 3 vái rồi cắm vào bát hương thần đạo. Toàn gia quyến đứng trang nghiêm phía sau, chủ tế chắp tay xướng đọc bài văn khấn cung thỉnh tiền tổ.',
                },
                {
                  step: '04',
                  title: 'Tuần rượu, trà dâng kính & Lắng nghe tiền nhân',
                  time: '14h45',
                  desc: 'Sau khi khấn xong, chủ tế rót thêm tuần rượu và nước trà ấm. Cả gia đình tĩnh tâm quây quần, con cháu chúc thọ cha mẹ ông bà trong khi hương trầm còn tỏa ngát.',
                },
                {
                  step: '05',
                  title: 'Hóa vàng thiếc & Lễ tạ, tề tựu thụ lộc',
                  time: '15h30',
                  desc: 'Khi tàn 2/3 nén hương, chủ tế vái 3 vái xin phép hóa tập tiền vàng mã tượng trưng, đổ chút rượu cúng lên tro than để vẹn nghĩa tri ân rồi cả gia đình thụ lộc mâm cỗ sum vầy.',
                },
              ].map((s) => (
                <div
                  key={s.step}
                  className="p-4 rounded-2xl bg-[#faefe3]/40 border border-[#dec9b6] flex items-start gap-4 hover:border-[#80141d] transition-colors"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#80141d] text-white font-serif font-bold text-base flex items-center justify-center shrink-0">
                    {s.step}
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-3">
                      <span className="font-serif font-bold text-sm text-[#2b1b15]">
                        {s.title}
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-[#faeed9] text-[#734c13] font-bold">
                        {s.time}
                      </span>
                    </div>
                    <p className="text-xs text-[#6b584d] leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: BÀI VĂN KHẤN CHUẨN */}
        {activeTab === 'prayer' && (
          <div className="p-6 bg-white border border-[#dec9b6] rounded-3xl shadow-2xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#dec9b6]/50 pb-3">
              <div>
                <h3 className="text-base font-serif font-bold text-[#80141d]">
                  Văn Khấn Lễ Cúng Tất Niên Chiều 30 Tết (Bắc Bộ Cổ Bản)
                </h3>
                <p className="text-xs text-[#6b584d]">
                  Trích nguyên bản cổ thư dòng họ • Khảo chính bởi GS. Hà Thúc Liêm
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="px-3 py-1.5 rounded-xl border border-[#dec9b6] hover:bg-[#faefe3] text-xs font-bold text-[#4a362f] flex items-center gap-1.5 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-sm">print</span>
                  <span>In Bản Văn Khấn</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setToastMessage('Đã sao chép toàn văn bài khấn vào clipboard!');
                    setTimeout(() => setToastMessage(null), 3000);
                  }}
                  className="px-3 py-1.5 rounded-xl bg-[#80141d] text-white hover:bg-[#681017] text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-2xs"
                >
                  <span className="material-symbols-outlined text-sm">content_copy</span>
                  <span>Sao Chép</span>
                </button>
              </div>
            </div>

            <div className="p-6 bg-[#fdfaf5] border border-[#dec9b6] rounded-2xl space-y-4 font-serif text-sm leading-relaxed text-[#2b1b15]">
              <div className="text-center font-bold text-[#80141d] text-base">
                NAM MÔ A DI ĐÀ PHẬT! (3 lần, 3 lạy)
              </div>

              <p>
                - Con kính lạy chín phương Trời, mười phương Chư Phật, Chư Phật mười phương.
                <br />
                - Con kính lạy Hoàng thiên Hậu Thổ chư vị Tôn thần.
                <br />
                - Con kính lạy ngài Bản cảnh Thành Hoàng chư vị Đại Vương.
                <br />
                - Con kính lạy ngài Bản xứ Thần linh Thổ địa. Ngài Định phúc Táo quân, các ngài Địa chúa Long mạch Tôn thần và tất cả các vị Thần cai quản trong khu vực này.
                <br />
                - Con kính lạy Tổ tiên nội ngoại, chư vị Hương linh, Tiền tổ Đại Tộc Nguyễn Phúc Anh.
              </p>

              <p>
                Hôm nay là ngày 30 tháng Chạp năm Giáp Thìn, tiết cuối đông, năm cũ sắp qua, năm mới sắp đến, tam dương khai thái, vạn tượng canh tân.
              </p>

              <p>
                Tín chủ con là: <span className="font-sans font-semibold text-[#80141d] underline decoration-dotted">Nguyễn Trực Viễn</span>, cùng toàn thể gia quyến ngụ tại: Thôn Thượng, xã Cảnh Hưng, tỉnh Bắc Ninh.
              </p>

              <p>
                Nhân tiết Tất niên chiều 30 Tết, chúng con thành tâm sắm sửa hương hoa lễ vật, kim ngân trà quả, mâm cỗ mặn thuần lương, dâng lên trước án. Kính cẩn thưa trình: Tiễn đưa năm cũ, đón mừng xuân sang.
              </p>

              <p>
                Chúng con kính thỉnh: Ngài Bản cảnh Thành hoàng Chư vị Đại Vương, ngài Bản xứ Thần linh Thổ địa, ngài Định phúc Táo quân, ngài Phúc đức chính thần... Giáng lâm trước án, thụ hưởng lễ vật, chứng giám lòng thành.
              </p>

              <p>
                Chúng con lại kính thỉnh: Cao Tằng Tổ Khảo, Cao Tằng Tổ Tỷ, Bá thúc huynh đệ, cô di tỷ muội, nội ngoại dâu rể, tổ tiên dòng họ Nguyễn Phúc Anh... Kính xin giáng phó gia đường, đồng lai hâm hưởng. Phù hộ độ trì cho toàn gia quyến bước sang năm mới: Già trẻ bình an, gia đạo hưng thịnh, công danh thăng tiến, tài lộc vẹn toàn, vạn sự hanh thông, con cháu thảo hiền nối dòng rạng rỡ.
              </p>

              <div className="text-center font-bold text-[#80141d] pt-2">
                NAM MÔ A DI ĐÀ PHẬT! (3 lần, 3 lạy)
              </div>
            </div>
          </div>
        )}

        {/* Bottom Section: Lời Khuyên Văn Hóa & Điều Kiêng Kỵ Chiều 30 Tết */}
        <div className="p-6 bg-[#faefe3]/70 border border-[#dec9b6] rounded-3xl shadow-2xs space-y-4">
          <div className="space-y-1">
            <div className="font-serif font-bold text-base text-[#80141d] flex items-center gap-2">
              <span className="material-symbols-outlined text-lg text-[#c9892c]">
                lightbulb
              </span>
              <span>Lời Khuyên Văn Hóa Thanh Tịnh &amp; Điều Kiêng Kỵ Chiều 30 Tết</span>
            </div>
            <p className="text-xs text-[#8a6f62]">
              Đức gia cửu tôn nghiêm, bác bỏ mê tín dị đoan thời quá
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Card 1 */}
            <div className="p-4 bg-white border border-[#dec9b6] rounded-2xl space-y-2 shadow-2xs">
              <div className="flex items-center gap-2 text-[#80141d]">
                <div className="w-8 h-8 rounded-lg bg-[#faefe3] flex items-center justify-center">
                  <span className="material-symbols-outlined text-base">local_fire_department</span>
                </div>
                <span className="font-serif font-bold text-xs">Hạn Chế Đốt Vàng Mã</span>
              </div>
              <p className="text-[11px] text-[#6b584d] leading-relaxed">
                Phúc Anh tộc quy khuyến cáo không mua sắm đốt cháy hàng mã cồng kềnh (nhà lầu, ô tô, tình nhân...). Chỉ dâng tiền giấy thiếc cổ truyền thống tượng trưng. Vừa bảo vệ môi trường, vừa giữ gìn nét tôn nghiêm trong sạch.
              </p>
            </div>

            {/* Card 2 */}
            <div className="p-4 bg-white border border-[#dec9b6] rounded-2xl space-y-2 shadow-2xs">
              <div className="flex items-center gap-2 text-[#80141d]">
                <div className="w-8 h-8 rounded-lg bg-[#faefe3] flex items-center justify-center">
                  <span className="material-symbols-outlined text-base">self_improvement</span>
                </div>
                <span className="font-serif font-bold text-xs">Tâm An Hòa, Tránh Khẩu Nghiệp</span>
              </div>
              <p className="text-[11px] text-[#6b584d] leading-relaxed">
                Trong suốt buổi chiều 30, các thành viên tuyệt đối không to tiếng cãi vã, không nhắc lại nợ nần phiền muộn cũ. Cùng nhau hòa nhã bao sái, nấu bát đĩa, nói lời thơm thảo chúc tụng cha mẹ ông bà để rước năng lượng hỷ lạc.
              </p>
            </div>

            {/* Card 3 */}
            <div className="p-4 bg-white border border-[#dec9b6] rounded-2xl space-y-2 shadow-2xs">
              <div className="flex items-center gap-2 text-[#80141d]">
                <div className="w-8 h-8 rounded-lg bg-[#faefe3] flex items-center justify-center">
                  <span className="material-symbols-outlined text-base">groups</span>
                </div>
                <span className="font-serif font-bold text-xs">Tề Tựu Đông Đủ Bên Mâm Cơm</span>
              </div>
              <p className="text-[11px] text-[#6b584d] leading-relaxed">
                Mâm cỗ Tất niên là bữa cơm gia đình đoàn kết tối cao. Con cháu dù bận rộn cũng xếp việc xa xôi nên thu xếp tề tựu trước giờ thắp hương, cùng thưởng thức lộc và lắng nghe người lớn tuổi ôn lại ký ức cội nguồn tổ tiên.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Global Traditional Footer */}
      <footer className="mt-16 bg-[#faefe3] border-t border-[#dec9b6] pt-12 pb-8 text-[#4a362f]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-[#dec9b6]/60">
            <div className="space-y-3 md:col-span-1">
              <div className="flex items-center gap-2 text-[#80141d] font-serif font-bold text-base">
                <span className="material-symbols-outlined text-xl">temple_buddhist</span>
                <span>Thích Cúng Kiếng</span>
              </div>
              <p className="text-xs text-[#6b584d] leading-relaxed">
                Không gian lưu giữ ký ức, phụng dưỡng tiền tổ và truyền thừa phả hệ tôn nghiêm cho các thế hệ con cháu muôn đời sau.
              </p>
            </div>

            <div className="space-y-2">
              <div className="font-serif font-bold text-xs text-[#80141d] uppercase tracking-wider">
                Di Sản Dòng Tộc
              </div>
              <ul className="text-xs space-y-1.5 text-[#6b584d]">
                <li>
                  <button
                    type="button"
                    onClick={() => onNavigate('cay-ky-niem')}
                    className="hover:text-[#80141d] transition-colors cursor-pointer"
                  >
                    Phả Hệ Chi Phái
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onNavigate('bien-nien-su')}
                    className="hover:text-[#80141d] transition-colors cursor-pointer"
                  >
                    Biên Niên Sử &amp; Cột Mốc
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onNavigate('tu-sach-gia-phong')}
                    className="hover:text-[#80141d] transition-colors cursor-pointer"
                  >
                    Điển Tích &amp; Kỷ Niệm
                  </button>
                </li>
              </ul>
            </div>

            <div className="space-y-2">
              <div className="font-serif font-bold text-xs text-[#80141d] uppercase tracking-wider">
                Lễ Nghi &amp; Tập Tục
              </div>
              <ul className="text-xs space-y-1.5 text-[#6b584d]">
                <li>
                  <button
                    type="button"
                    onClick={() => onNavigate('cam-nang-nghi-le')}
                    className="hover:text-[#80141d] transition-colors cursor-pointer"
                  >
                    Cẩm Nang Giỗ Chạp
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => setActiveTab('prayer')}
                    className="hover:text-[#80141d] transition-colors cursor-pointer"
                  >
                    Kho Văn Khấn Cổ Truyền
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onNavigate('bao-tang-gia-bao')}
                    className="hover:text-[#80141d] transition-colors cursor-pointer"
                  >
                    Bảo Quản Di Vật
                  </button>
                </li>
              </ul>
            </div>

            <div className="space-y-2">
              <div className="font-serif font-bold text-xs text-[#80141d] uppercase tracking-wider">
                Bảo Mật &amp; Phụng Điền
              </div>
              <div className="p-3 bg-white border border-[#dec9b6] rounded-xl space-y-1 text-xs text-[#6b584d]">
                <div className="flex items-center gap-1.5 font-bold text-[#2b1b15]">
                  <span className="material-symbols-outlined text-sm text-[#80141d]">verified_user</span>
                  <span>Mã Hóa AES-256 Kép</span>
                </div>
                <p className="text-[11px] leading-relaxed">
                  Toàn bộ gia phả và dữ liệu phả ký được bảo vệ tuyệt đối.
                </p>
              </div>
            </div>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-[#8a6f62] gap-3">
            <div>© 2026 Thích Cúng Kiếng. Bản quyền thuộc Đại Tộc Nguyễn Phúc Anh.</div>
            <div className="font-serif italic font-bold text-[#80141d]">
              ĐẠO HIẾU LÀ ĐẦU – UỐNG NƯỚC NHỚ NGUỒN
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
