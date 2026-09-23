import React, { useState } from 'react';
import type { ScreenType } from '@/src/types.ts';

interface MemoryArchiveScreenProps {
  onNavigate: (screen: ScreenType) => void;
}

interface ArchiveItem {
  id: string;
  category: 'family' | 'portrait' | 'relics' | 'audio';
  title: string;
  subtitle: string;
  description: string;
  yearTag: string;
  tags: string[];
  image?: string;
  isAudio?: boolean;
  audioDuration?: string;
  prays: number;
  extraMeta: string;
}

export const MemoryArchiveScreen: React.FC<MemoryArchiveScreenProps> = ({ onNavigate }) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'family' | 'portrait' | 'relics' | 'audio'>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'timeline'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioProgress, setAudioProgress] = useState(38);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showAdvancedFilter, setShowAdvancedFilter] = useState(false);

  // Likes / Prays state for interactive worship
  const [prayedItems, setPrayedItems] = useState<Record<string, number>>({
    item1: 48,
    item2: 102,
    item3: 89,
    item4: 156,
    item5: 42,
    item6: 180,
  });

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handlePray = (id: string, name: string) => {
    setPrayedItems((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
    showToast(`Đã dâng một nén tâm hương bái vọng trước "${name}"!`);
  };

  const toggleAudio = () => {
    setIsPlayingAudio(!isPlayingAudio);
    if (!isPlayingAudio) {
      showToast('Đang phát trích đoạn: Lời Dặn Con Cháu Của Cụ Cố (Thu âm 1985)');
    }
  };

  // 6 Primary Heritage Cards
  const archiveItems: ArchiveItem[] = [
    {
      id: 'item1',
      category: 'family',
      title: 'Ảnh Đại Gia Đình Đoàn Viên Tết Giáp Dần 1974',
      subtitle: 'Cụ Cố Viên (Đời 10) • Cụ Bà Nhẫn • Sân Từ Đường',
      description: 'Khoảnh khắc sum họp đông đủ 4 thế hệ trước thềm năm mới Giáp Dần. Bức ảnh được chụp bằng máy ảnh cơ phương Tây lưu giữ hơn 50 năm.',
      yearTag: 'Tết Giáp Dần 1974',
      tags: ['Phục chế AI 4K', 'Nội bộ Chi Trực Lãng'],
      image: '/images/hero_family.jpg',
      prays: prayedItems.item1,
      extraMeta: '12 lời kể',
    },
    {
      id: 'item2',
      category: 'relics',
      title: 'Bản Dập Sắc Phong Niên Hiệu Tự Đức',
      subtitle: 'Bảo Tồn Cấp Gia Tộc • Bản gốc tại Thượng Điện',
      description: 'Sắc phong tứ cho Tiền tổ Đời thứ 7 phong tặng chức vụ Hàn Lâm Viện Thị Giảng Học Sĩ, bảo tồn nguyên vẹn triện son ấn kiếm triều đình.',
      yearTag: 'Niên hiệu Tự Đức (1860)',
      tags: ['Kỷ vật số 3D', 'Toàn dòng họ'],
      image: '/images/relic_book.jpg',
      prays: prayedItems.item2,
      extraMeta: 'Mô hình 360°',
    },
    {
      id: 'item3',
      category: 'audio',
      title: 'Ghi Âm Lời Dặn Con Cháu Về Gia Phong Của Cụ Cố',
      subtitle: 'Âm thanh nguyên bản • Thu thanh mùa Thu 1985',
      description: 'Lời tâm sự mộc mạc và căn dặn việc phụng sự đạo hiếu, gìn giữ đất tổ và đùm bọc các chi nhánh tha hương khi lập nghiệp.',
      yearTag: 'Thu Thu 1985',
      tags: ['Toàn dòng họ', 'TDK 1985'],
      isAudio: true,
      audioDuration: '04:32',
      prays: prayedItems.item3,
      extraMeta: '320 lượt nghe',
    },
    {
      id: 'item4',
      category: 'portrait',
      title: 'Chân Dung Cụ Cố Nguyễn Văn Phúc',
      subtitle: 'Sinh: 1902 - Tạ thế: 1988 • Kỵ nhật: 14 tháng Bảy',
      description: 'Nguyên Cả Trưởng Đời thứ 11, người có công duy trì hương hỏa và cứu tế bà con họ hàng qua nạn đói năm 1945. Bản ảnh phục chế từ ảnh gốc giấy rọi.',
      yearTag: 'Đời Thứ 11',
      tags: ['Phục chế màu lụa', 'Chân dung thờ tự'],
      image: '/images/ancestor_portrait.jpg',
      prays: prayedItems.item4,
      extraMeta: 'Đã xác minh gia phả',
    },
    {
      id: 'item5',
      category: 'family',
      title: 'Lễ Mừng Thọ Lục Tuần Cụ Ông 1968',
      subtitle: 'Sự kiện đại lễ mừng thọ • Nam Định Cố Trạch',
      description: 'Tư liệu lịch sử gia đình ghi dấu thời điểm kháng chiến, con cháu sum vầy tổ chức lễ thượng thọ giản dị thắm đượm tình thân.',
      yearTag: 'Đông 1968',
      tags: ['Nội bộ Chi Trực Lãng'],
      image: '/images/hero_family.jpg',
      prays: prayedItems.item5,
      extraMeta: '510 lượt xem',
    },
    {
      id: 'item6',
      category: 'relics',
      title: 'Tráp Sơn Mài Khảm Xà Cừ Đựng Kim Phả',
      subtitle: 'Bảo tồn vật lý nghiêm ngặt • Trưởng tộc thủ quản',
      description: 'Kỷ vật thiêng liêng dùng để cất giữ bộ sách đồng khắc chữ Hán lưu giữ phả hệ truyền đời của dòng họ từ thế kỷ XIX.',
      yearTag: 'Niên hiệu Tự Đức',
      tags: ['Riêng Ban Quản Trị', 'Bảo vật đời thứ 9'],
      image: '/images/relic_box.jpg',
      prays: prayedItems.item6,
      extraMeta: 'Kiểm định 2024',
    },
  ];

  // Filtering logic
  const filteredItems = archiveItems.filter((item) => {
    const matchCategory = activeFilter === 'all' || item.category === activeFilter;
    const matchQuery =
      searchQuery.trim() === '' ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.yearTag.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchQuery;
  });

  return (
    <div className="min-h-screen bg-[#f7eee2] text-[#2b1b15] py-6 px-4 sm:px-6 lg:px-10">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-[#2b1b15] text-[#fdf9f4] px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border border-[#c9892c] animate-in fade-in slide-in-from-top-4">
          <span className="material-symbols-outlined text-[#c9892c]">verified</span>
          <span className="text-[13px] font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Modal: Đóng Góp Ký Ức Mới */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-2xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-3xl p-6 shadow-2xl border-2 border-[#dec9b6] space-y-4 animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-[#ebdcd0]">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#80141d]">upload_file</span>
                <h3 className="font-serif font-bold text-[18px] text-[#2b1b15]">
                  Đóng Góp Ký Ức &amp; Di Vật Mới
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowUploadModal(false)}
                className="h-8 w-8 rounded-full bg-[#faefe3] hover:bg-[#ebdcd0] flex items-center justify-center text-[#543e34] cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            <div className="space-y-3.5 text-[12.5px] text-[#543e34]">
              <div>
                <label className="block font-bold text-[#2b1b15] mb-1">Tên ký ức / Kỷ vật gia tộc *</label>
                <input
                  type="text"
                  placeholder="Ví dụ: Bức ảnh lễ thượng thọ năm 1970..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#faefe3]/50 border border-[#dec9b6] focus:border-[#80141d] outline-hidden text-[13px]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-[#2b1b15] mb-1">Niên đại / Năm ước lượng</label>
                  <input
                    type="text"
                    placeholder="Ví dụ: 1965 hoặc Canh Tuất"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#faefe3]/50 border border-[#dec9b6] focus:border-[#80141d] outline-hidden text-[13px]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-[#2b1b15] mb-1">Phân loại di vật</label>
                  <select className="w-full px-3.5 py-2.5 rounded-xl bg-[#faefe3]/50 border border-[#dec9b6] focus:border-[#80141d] outline-hidden text-[13px]">
                    <option>Ảnh gia đình xưa</option>
                    <option>Chân dung thờ tự</option>
                    <option>Sắc phong &amp; Bút tích</option>
                    <option>Băng ghi âm giọng nói</option>
                    <option>Đồ đồng / Đồ gỗ cổ</option>
                  </select>
                </div>
              </div>

              {/* Upload Dropzone */}
              <div className="p-6 rounded-2xl border-2 border-dashed border-[#dec9b6] bg-[#faefe3]/30 text-center space-y-2">
                <span className="material-symbols-outlined text-[32px] text-[#c9892c]">cloud_upload</span>
                <div className="font-bold text-[#2b1b15]">Kéo thả ảnh hoặc tệp quét độ phân giải cao</div>
                <div className="text-[11px] text-[#8a6f62]">Hỗ trợ JPG, PNG, PDF, MP3 (Tối đa 100MB)</div>
                <button
                  type="button"
                  className="px-3.5 py-1.5 rounded-lg bg-white border border-[#dec9b6] text-[#80141d] font-bold text-[11px] hover:bg-[#faefe3]"
                >
                  Chọn tệp từ máy tính
                </button>
              </div>
            </div>

            <div className="pt-2 flex justify-end gap-2.5">
              <button
                type="button"
                onClick={() => setShowUploadModal(false)}
                className="px-4 py-2 rounded-xl border border-[#dec9b6] text-[#543e34] font-semibold text-[12.5px] hover:bg-[#faefe3]"
              >
                Hủy bỏ
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowUploadModal(false);
                  showToast('Đã gửi ký ức mới vào phòng chờ kiểm định của Trưởng tộc!');
                }}
                className="px-5 py-2 rounded-xl bg-[#80141d] text-white font-bold text-[12.5px] shadow-sm hover:bg-[#681017]"
              >
                Gửi Đóng Góp Ký Ức
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-[1240px] mx-auto space-y-6">
        {/* =========================================================
            TOP BANNER: TIÊU ĐỀ & NÚT HÀNH ĐỘNG CHÍNH
            ========================================================= */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2">
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#c9892c] uppercase tracking-wider">
              <span className="material-symbols-outlined text-[15px] text-[#80141d]">temple_buddhist</span>
              <span>BẢO VIỆN KÝ ỨC – ĐẠI TỘC NGUYỄN PHÚC ANH • CHI PHÁI TAM ĐẲNG</span>
            </div>
            <h1 className="font-serif font-bold text-[28px] sm:text-[34px] text-[#80141d] tracking-tight leading-tight">
              Kho Ký Ức &amp; Di Vật Gia Tộc
            </h1>
            <p className="text-[13px] text-[#6b584d] max-w-2xl leading-relaxed">
              Lưu giữ muôn thuở những thước phim thời gian, ảnh xưa phục chế và kỷ vật thiêng liêng của tiền nhân.
            </p>
          </div>

          <div className="flex items-center gap-2.5 shrink-0 self-start md:self-auto">
            {/* Nút đóng góp */}
            <button
              type="button"
              onClick={() => setShowUploadModal(true)}
              className="px-4 py-2.5 rounded-xl border border-[#f0c2bc] bg-[#fdeee9] hover:bg-[#fadbd7] text-[#80141d] font-bold text-[12.5px] transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
            >
              <span className="material-symbols-outlined text-[17px]">add_circle</span>
              <span>Đóng góp ký ức mới</span>
            </button>

            {/* Nút phục chế AI */}
            <button
              type="button"
              onClick={() => onNavigate('phuc-che-ai')}
              className="px-4 py-2.5 rounded-xl bg-[#80141d] hover:bg-[#681017] text-white font-bold text-[12.5px] transition-colors flex items-center gap-1.5 cursor-pointer shadow-md"
            >
              <span className="material-symbols-outlined text-[17px]">auto_fix_high</span>
              <span>Phục chế ảnh AI mới</span>
            </button>
          </div>
        </div>

        {/* =========================================================
            SEARCH, VIEW MODE & FILTER PILLS
            ========================================================= */}
        <div className="space-y-3">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-3">
            {/* Ô tìm kiếm có ⌘ K */}
            <div className="relative w-full lg:max-w-xl">
              <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8a6f62] text-[18px]">
                search
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm theo tên tiền nhân, năm chụp, sự kiện, địa danh (vd: Cụ Cố Viên, Giáp Dần 1974, Nam Định...)"
                className="w-full pl-10 pr-14 py-2.5 rounded-2xl bg-white border border-[#dec9b6] focus:border-[#80141d] text-[13px] text-[#2b1b15] shadow-2xs outline-hidden"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 px-2 py-0.5 rounded-md bg-[#faefe3] border border-[#dec9b6] text-[10.5px] font-mono text-[#8a6f62] pointer-events-none">
                ⌘ K
              </span>
            </div>

            {/* Chế độ xem & Thống kê */}
            <div className="flex items-center gap-2 w-full lg:w-auto justify-end text-[12px]">
              <button
                type="button"
                onClick={() => setViewMode('grid')}
                className={`px-3 py-1.5 rounded-xl border flex items-center gap-1.5 font-bold transition-all cursor-pointer ${
                  viewMode === 'grid'
                    ? 'bg-[#fdeee9] border-[#f0c2bc] text-[#80141d] shadow-2xs'
                    : 'bg-white border-[#dec9b6] text-[#543e34] hover:bg-[#faefe3]'
                }`}
              >
                <span className="material-symbols-outlined text-[15px]">grid_view</span>
                <span>Dạng Lưới Thư Viện</span>
              </button>

              <button
                type="button"
                onClick={() => setViewMode('timeline')}
                className={`px-3 py-1.5 rounded-xl border flex items-center gap-1.5 font-bold transition-all cursor-pointer ${
                  viewMode === 'timeline'
                    ? 'bg-[#fdeee9] border-[#f0c2bc] text-[#80141d] shadow-2xs'
                    : 'bg-white border-[#dec9b6] text-[#543e34] hover:bg-[#faefe3]'
                }`}
              >
                <span className="material-symbols-outlined text-[15px]">timeline</span>
                <span>Dạng Dòng Thời Gian</span>
              </button>

              <span className="px-3 py-1.5 rounded-xl bg-[#fef3dd] border border-[#f5dfb3] text-[#b3731a] font-bold flex items-center gap-1">
                <span className="material-symbols-outlined text-[15px]">inventory_2</span>
                <span>128 Di Sản Lưu Trữ</span>
              </span>
            </div>
          </div>

          {/* Hàng bộ lọc Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 text-[12px]">
            <button
              type="button"
              onClick={() => setActiveFilter('all')}
              className={`px-3.5 py-1.5 rounded-full font-bold transition-all whitespace-nowrap cursor-pointer ${
                activeFilter === 'all'
                  ? 'bg-[#80141d] text-white shadow-xs'
                  : 'bg-white text-[#543e34] border border-[#dec9b6] hover:bg-[#faefe3]'
              }`}
            >
              Tất cả ký ức (128)
            </button>

            <button
              type="button"
              onClick={() => setActiveFilter('family')}
              className={`px-3.5 py-1.5 rounded-full font-bold transition-all whitespace-nowrap cursor-pointer ${
                activeFilter === 'family'
                  ? 'bg-[#80141d] text-white shadow-xs'
                  : 'bg-white text-[#543e34] border border-[#dec9b6] hover:bg-[#faefe3]'
              }`}
            >
              Ảnh gia đình xưa (64)
            </button>

            <button
              type="button"
              onClick={() => setActiveFilter('portrait')}
              className={`px-3.5 py-1.5 rounded-full font-bold transition-all whitespace-nowrap cursor-pointer ${
                activeFilter === 'portrait'
                  ? 'bg-[#80141d] text-white shadow-xs'
                  : 'bg-white text-[#543e34] border border-[#dec9b6] hover:bg-[#faefe3]'
              }`}
            >
              Chân dung thờ tự (32)
            </button>

            <button
              type="button"
              onClick={() => setActiveFilter('relics')}
              className={`px-3.5 py-1.5 rounded-full font-bold transition-all whitespace-nowrap cursor-pointer ${
                activeFilter === 'relics'
                  ? 'bg-[#80141d] text-white shadow-xs'
                  : 'bg-white text-[#543e34] border border-[#dec9b6] hover:bg-[#faefe3]'
              }`}
            >
              Di vật &amp; Sắc phong (18)
            </button>

            <button
              type="button"
              onClick={() => setActiveFilter('audio')}
              className={`px-3.5 py-1.5 rounded-full font-bold transition-all whitespace-nowrap cursor-pointer ${
                activeFilter === 'audio'
                  ? 'bg-[#80141d] text-white shadow-xs'
                  : 'bg-white text-[#543e34] border border-[#dec9b6] hover:bg-[#faefe3]'
              }`}
            >
              Băng ghi âm giọng nói (14)
            </button>

            <button
              type="button"
              onClick={() => setShowAdvancedFilter(!showAdvancedFilter)}
              className="px-3.5 py-1.5 rounded-full font-bold bg-white text-[#543e34] border border-[#dec9b6] hover:bg-[#faefe3] flex items-center gap-1 cursor-pointer whitespace-nowrap ml-auto"
            >
              <span className="material-symbols-outlined text-[14px]">tune</span>
              <span>Lọc Nâng Cao</span>
            </button>
          </div>

          {/* Bộ lọc mở rộng (nếu bật) */}
          {showAdvancedFilter && (
            <div className="p-4 rounded-2xl bg-white border border-[#dec9b6] grid grid-cols-1 sm:grid-cols-3 gap-3 text-[12px] animate-in fade-in">
              <div>
                <label className="block font-semibold text-[#543e34] mb-1">Theo thế hệ</label>
                <select className="w-full px-3 py-1.5 rounded-xl bg-[#faefe3]/50 border border-[#dec9b6]">
                  <option>Tất cả thế hệ (Đời 8 - Đời 13)</option>
                  <option>Đời 8 - 10 (Tiền bối sơ khởi)</option>
                  <option>Đời 11 - 12 (Đương đại)</option>
                </select>
              </div>
              <div>
                <label className="block font-semibold text-[#543e34] mb-1">Theo thời kỳ lịch sử</label>
                <select className="w-full px-3 py-1.5 rounded-xl bg-[#faefe3]/50 border border-[#dec9b6]">
                  <option>Tất cả các thời kỳ</option>
                  <option>Thời Nguyễn (Niên hiệu Tự Đức)</option>
                  <option>Thời kỳ kháng chiến (1945 - 1975)</option>
                  <option>Thời kỳ Đổi mới (sau 1986)</option>
                </select>
              </div>
              <div>
                <label className="block font-semibold text-[#543e34] mb-1">Mức độ bảo mật</label>
                <select className="w-full px-3 py-1.5 rounded-xl bg-[#faefe3]/50 border border-[#dec9b6]">
                  <option>Tất cả quyền truy cập</option>
                  <option>Công khai toàn dòng họ</option>
                  <option>Nội bộ Chi Trực Lãng</option>
                  <option>Riêng Ban Quản Trị</option>
                </select>
              </div>
            </div>
          )}
        </div>

        {/* =========================================================
            SECTION 1: ALBUM GIA ĐÌNH TIÊU BIỂU (4 CARDS)
            ========================================================= */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between">
            <h2 className="font-serif font-bold text-[18px] text-[#2b1b15] flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#80141d]"></span>
              <span>Album Gia Đình Tiêu Biểu</span>
            </h2>
            <button
              type="button"
              onClick={() => onNavigate('tuyen-tap-album')}
              className="text-[12.5px] font-bold text-[#80141d] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>Xem toàn bộ Album (8)</span>
              <span className="material-symbols-outlined text-[15px]">arrow_forward</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {/* Album 1 */}
            <div
              onClick={() => onNavigate('tuyen-tap-album')}
              className="group bg-white rounded-2xl overflow-hidden border border-[#dec9b6] hover:border-[#80141d] shadow-2xs hover:shadow-md transition-all cursor-pointer"
            >
              <div className="relative aspect-[4/3] bg-[#faefe3] overflow-hidden">
                <img
                  src="/images/hero_family.jpg"
                  alt="Lễ Giỗ & Đại Tế"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute bottom-2.5 left-2.5 bg-black/70 backdrop-blur-xs text-white text-[10.5px] font-medium px-2.5 py-0.5 rounded-full">
                  28 tư liệu
                </span>
              </div>
              <div className="p-3.5 space-y-1">
                <h3 className="font-serif font-bold text-[14px] text-[#2b1b15] group-hover:text-[#80141d] transition-colors truncate">
                  Lễ Giỗ &amp; Đại Tế Qua Các Thời Kỳ
                </h3>
                <p className="text-[11px] text-[#6b584d] line-clamp-2 leading-relaxed">
                  Từ năm Giáp Ngọ 1954 đến Xuân Ất Mùi ghi nhận các kỳ tế tự trang nghiêm tại Từ Đường.
                </p>
              </div>
            </div>

            {/* Album 2 */}
            <div
              onClick={() => onNavigate('tuyen-tap-album')}
              className="group bg-white rounded-2xl overflow-hidden border border-[#dec9b6] hover:border-[#80141d] shadow-2xs hover:shadow-md transition-all cursor-pointer"
            >
              <div className="relative aspect-[4/3] bg-[#faefe3] overflow-hidden">
                <img
                  src="/images/relic_box.jpg"
                  alt="Từ Đường & Cố Trạch"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute bottom-2.5 left-2.5 bg-black/70 backdrop-blur-xs text-white text-[10.5px] font-medium px-2.5 py-0.5 rounded-full">
                  19 tư liệu
                </span>
              </div>
              <div className="p-3.5 space-y-1">
                <h3 className="font-serif font-bold text-[14px] text-[#2b1b15] group-hover:text-[#80141d] transition-colors truncate">
                  Từ Đường &amp; Cố Trạch Nam Định
                </h3>
                <p className="text-[11px] text-[#6b584d] line-clamp-2 leading-relaxed">
                  Bản vẽ kiến trúc, cảnh quan và tu tạo qua các thế hệ dòng họ tại làng Trực Lãng.
                </p>
              </div>
            </div>

            {/* Album 3 */}
            <div
              onClick={() => onNavigate('tuyen-tap-album')}
              className="group bg-white rounded-2xl overflow-hidden border border-[#dec9b6] hover:border-[#80141d] shadow-2xs hover:shadow-md transition-all cursor-pointer"
            >
              <div className="relative aspect-[4/3] bg-[#faefe3] overflow-hidden">
                <img
                  src="/images/ancestor_portrait.jpg"
                  alt="Chân Dung Tiền Nhân"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute bottom-2.5 left-2.5 bg-black/70 backdrop-blur-xs text-white text-[10.5px] font-medium px-2.5 py-0.5 rounded-full">
                  24 tư liệu
                </span>
              </div>
              <div className="p-3.5 space-y-1">
                <h3 className="font-serif font-bold text-[14px] text-[#2b1b15] group-hover:text-[#80141d] transition-colors truncate">
                  Chân Dung Tiền Nhân Đời 8 - 10
                </h3>
                <p className="text-[11px] text-[#6b584d] line-clamp-2 leading-relaxed">
                  Đầy đủ phục chế màu lụa và thư mục ảnh thờ truyền thống của tiền hiền chi phái.
                </p>
              </div>
            </div>

            {/* Album 4 */}
            <div
              onClick={() => onNavigate('tuyen-tap-album')}
              className="group bg-white rounded-2xl overflow-hidden border border-[#dec9b6] hover:border-[#80141d] shadow-2xs hover:shadow-md transition-all cursor-pointer"
            >
              <div className="relative aspect-[4/3] bg-[#faefe3] overflow-hidden">
                <img
                  src="/images/relic_book.jpg"
                  alt="Kỷ Vật & Bút Tích"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute bottom-2.5 left-2.5 bg-black/70 backdrop-blur-xs text-white text-[10.5px] font-medium px-2.5 py-0.5 rounded-full">
                  12 tư liệu
                </span>
              </div>
              <div className="p-3.5 space-y-1">
                <h3 className="font-serif font-bold text-[14px] text-[#2b1b15] group-hover:text-[#80141d] transition-colors truncate">
                  Kỷ Vật &amp; Bút Tích Cổ Bản
                </h3>
                <p className="text-[11px] text-[#6b584d] line-clamp-2 leading-relaxed">
                  Sắc phong, câu đối đại tự và bút ký gia huấn Nôm truyền đời gìn giữ.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================
            SECTION 2: DI CẢO & KỶ VẬT ĐƯƠNG LƯU TRỮ (6 CARDS)
            ========================================================= */}
        <div className="space-y-4 pt-4">
          <div className="flex items-center justify-between">
            <h2 className="font-serif font-bold text-[18px] text-[#2b1b15] flex items-center gap-2">
              <span className="material-symbols-outlined text-[20px] text-[#80141d]">menu_book</span>
              <span>Di Cảo &amp; Kỷ Vật Đương Lưu Trữ</span>
            </h2>
            <div className="text-[12px] text-[#8a6f62] flex items-center gap-1">
              <span>Sắp xếp:</span>
              <span className="font-bold text-[#80141d] cursor-pointer">Thời Gian (Mới Nhất) ▾</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-3xl overflow-hidden border border-[#dec9b6] shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Nếu là Card Audio */}
                  {item.isAudio ? (
                    <div className="p-5 bg-[#211a17] text-white space-y-3 relative">
                      <div className="flex items-center justify-between">
                        <span className="bg-[#c9892c]/20 text-[#e8b56f] text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-[#c9892c]/30">
                          {item.tags.join(' • ')}
                        </span>
                        <span className="text-[11px] text-white/70">Thời lượng {item.audioDuration}</span>
                      </div>

                      {/* Equalizer Waveform Bars */}
                      <div className="flex items-center justify-between gap-1 py-3 px-2">
                        {[25, 45, 65, 30, 85, 95, 55, 70, 85, 40, 90, 75, 80, 35, 60, 45, 70, 50, 30].map(
                          (h, idx) => (
                            <span
                              key={idx}
                              style={{ height: `${h * 0.42}px` }}
                              className={`w-1 rounded-full transition-all duration-300 ${
                                isPlayingAudio && idx <= Math.floor((audioProgress / 100) * 19)
                                  ? 'bg-[#c9892c]'
                                  : 'bg-white/25'
                              }`}
                            ></span>
                          )
                        )}
                      </div>

                      {/* Play Button & Time Counter */}
                      <div className="flex items-center justify-between pt-1">
                        <button
                          type="button"
                          onClick={toggleAudio}
                          className="w-10 h-10 rounded-full bg-[#c9892c] hover:bg-[#b07420] text-[#211a17] flex items-center justify-center font-bold shadow-md hover:scale-105 transition-all cursor-pointer"
                        >
                          <span className="material-symbols-outlined text-[22px]">
                            {isPlayingAudio ? 'pause' : 'play_arrow'}
                          </span>
                        </button>
                        <span className="text-[11px] font-mono text-white/80">01:45 / 04:32</span>
                      </div>
                    </div>
                  ) : (
                    /* Nếu là Card Hình Ảnh Thường */
                    <div className="relative aspect-[16/10] bg-[#faefe3] overflow-hidden group">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      {/* Huy hiệu trên ảnh */}
                      <div className="absolute top-3 left-3 flex gap-1.5 flex-wrap">
                        {item.tags.map((tag, tIdx) => (
                          <span
                            key={tIdx}
                            className={`text-[10px] font-bold px-2 py-0.5 rounded-full shadow-xs ${
                              tIdx === 0
                                ? 'bg-[#80141d] text-white'
                                : 'bg-black/60 backdrop-blur-xs text-white font-medium'
                            }`}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      {/* Huy hiệu góc phải dưới */}
                      <span className="absolute bottom-2.5 right-2.5 bg-black/75 backdrop-blur-xs text-[#faefe3] text-[10.5px] font-serif font-bold px-2.5 py-0.5 rounded-md border border-white/20">
                        {item.yearTag}
                      </span>
                    </div>
                  )}

                  {/* Phần nội dung chi tiết */}
                  <div className="p-5 space-y-2">
                    <div className="text-[11px] text-[#c9892c] font-semibold truncate">
                      {item.subtitle}
                    </div>
                    <h3 className="font-serif font-bold text-[15px] text-[#2b1b15] leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-[12px] text-[#6b584d] line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Footer card */}
                <div className="px-5 pb-4 pt-2.5 flex items-center justify-between border-t border-[#ebdcd0] text-[11.5px]">
                  <button
                    type="button"
                    onClick={() => handlePray(item.id, item.title)}
                    className="flex items-center gap-1.5 text-[#543e34] hover:text-[#80141d] transition-colors cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[16px] text-[#80141d]">favorite</span>
                    <span className="font-bold text-[#80141d]">{item.prays}</span>
                    <span>Bái vọng</span>
                    <span className="text-[#dec9b6]">•</span>
                    <span className="text-[#8a6f62]">{item.extraMeta}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => onNavigate('chi-tiet-di-vat')}
                    className="text-[#80141d] hover:underline font-bold transition-colors flex items-center gap-0.5 cursor-pointer"
                  >
                    <span>Chi tiết tư liệu</span>
                    <span className="material-symbols-outlined text-[15px]">chevron_right</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* =========================================================
            BOTTOM HERITAGE SECURITY FOOTER BANNER
            ========================================================= */}
        <div className="p-6 rounded-3xl bg-white border border-[#dec9b6] shadow-2xs space-y-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
            <div className="space-y-1">
              <div className="font-serif font-bold text-[#80141d] text-[16px]">
                Thích Cúng Kiếng • Bảo Tàng Di Sản Số Dòng Họ
              </div>
              <p className="text-[12px] text-[#6b584d] max-w-2xl leading-relaxed">
                Không gian thiêng liêng gìn giữ gia phả, ký ức hình ảnh và truyền thống văn hóa phụng sự tổ tiên của các dòng họ Việt Nam.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 text-[11.5px] text-[#543e34] font-semibold shrink-0">
              <span className="flex items-center gap-1 text-[#80141d]">
                <span className="material-symbols-outlined text-[16px]">lock</span>
                <span>Bảo Mật Kép AES-256</span>
              </span>
              <span className="flex items-center gap-1 text-[#c9892c]">
                <span className="material-symbols-outlined text-[16px]">verified_user</span>
                <span>Quyền Sở Hữu Thuộc Dòng Họ 100%</span>
              </span>
              <span className="flex items-center gap-1 text-[#80141d]">
                <span className="material-symbols-outlined text-[16px]">auto_fix_high</span>
                <span>Phục Chế Ảnh Kỹ Thuật Số AI</span>
              </span>
            </div>
          </div>

          <div className="pt-3 border-t border-[#ebdcd0] flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-[#8a6f62]">
            <div>
              © 2025 Thích Cúng Kiếng. Tôn kính phụng sự đạo nghĩa nguồn cội.
            </div>
            <div className="flex items-center gap-4 font-medium">
              <span className="hover:text-[#80141d] cursor-pointer">Quy ước bảo tồn gia phong</span>
              <span>•</span>
              <span className="hover:text-[#80141d] cursor-pointer">Chính sách lưu trữ kỷ vật</span>
              <span>•</span>
              <span className="hover:text-[#80141d] cursor-pointer">Hỗ trợ Ban Phụng Sự</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
