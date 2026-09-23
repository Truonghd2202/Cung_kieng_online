import React, { useState } from 'react';
import type { ScreenType } from '../../types.ts';

interface FamilyTraditionLibraryScreenProps {
  onNavigate: (screen: ScreenType) => void;
}

export const FamilyTraditionLibraryScreen: React.FC<FamilyTraditionLibraryScreenProps> = ({
  onNavigate,
}) => {
  const [selectedTab, setSelectedTab] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);

  const stories = [
    {
      id: 'story-1',
      badgeCategory: 'Điển Tích Vượt Khó',
      badgeSub: 'Năm Đói Ất Dậu 1945',
      image: '/images/hero_family.jpg',
      imageTag: 'Ghi âm lời kể: 04:18',
      themeSub: 'ĐẠO NGHĨA CỨU NGƯỜI • CHỮ TÍN DÒNG HỌ',
      title: 'Chuyện Cụ Cố bán lúa cứu đói xóm trên năm 1945',
      snippet:
        'Giữa cơn đói Ất Dậu khốc liệt, Cụ Cố quyết định mở toang kho thóc dự trữ ba vụ của gia đình, không màng bạc vàng đổi chác, chia...',
      author: 'Cụ Cố Nguyễn Trực Khang (Chi Giáp Nhất - Đời thứ 8)',
      avatar: '/images/ancestor_portrait.jpg',
      avatarBg: 'bg-[#80141d] text-white',
      avatarInitial: 'K',
    },
    {
      id: 'story-2',
      badgeCategory: 'Gương Hiếu Học Đỗ Đạt',
      badgeSub: 'Thời Tự Trị 1968',
      image: '/images/relic_book.jpg',
      imageTag: 'Kỷ vật trong Tàng bảo: NTG-04',
      themeSub: 'BÚT NGHIÊN LẬP NGHIỆP • TIẾT THẢO THANH BẦN',
      title: 'Chiếc đèn dầu và 12 năm dùi mài kinh sử của Bác Trực An',
      snippet:
        'Dưới căn hầm chữ A rung chuyển bởi bom đạn sơ tán vùng trung du Phú Thọ, ngọn đèn dầu hỏa được che kín bốn bề bằng vỏ bưởi khô...',
      author: 'GS. Nguyễn Trực An (Chi Ba - Viện sĩ Hàn Lâm)',
      avatar: '/images/ancestor_portrait.jpg',
      avatarBg: 'bg-[#faeed9] text-[#734c13]',
      avatarInitial: 'A',
    },
    {
      id: 'story-3',
      badgeCategory: 'Ký Ức Làng Quê & Nếp Sống',
      badgeSub: '',
      image: '/images/hero_family.jpg',
      imageTag: 'Nếp nhà truyền thừa: 29 Tháng Chạp',
      themeSub: 'PHONG VỊ ĐOAN VIÊN • GÌN GIỮ GIA PHONG',
      title: 'Lời răn của Cụ Bà về nếp gói bánh chưng ngày 29 Tết',
      snippet:
        '“Lá dong phải lau khô từng phiến, nếp cái hoa vàng giã đượm hương đồng. Vuông vức chiếc bánh là khuôn phép mẹ dạy con gái, thẳng...',
      author: 'Cụ Bà Lê Thị Thoa (Chính Thất Đời thứ 9)',
      avatar: '/images/hero_family.jpg',
      avatarBg: 'bg-[#faefe3] text-[#80141d]',
      avatarInitial: 'T',
    },
    {
      id: 'story-4',
      badgeCategory: 'Gia Huấn Tiền Nhân',
      badgeSub: 'Thành Cổ 1972',
      image: '/images/relic_box.jpg',
      imageTag: 'Di thư Liệt sĩ Khâm táng',
      themeSub: 'CHỮ TRUNG VỚI NƯỚC • CHỮ HIẾU VỚI NHÀ',
      title: 'Bức thư gửi từ chiến trường Quảng Trị 1972: Giữ gìn trọn vẹn chữ Trung',
      snippet:
        'Nét chữ mực Cửu Long nghiêng vội trong lán khói lửa bom gầm: "Con ra trận vì sự bình yên của non sông, nhưng từng bài học Cần Kiệm...',
      author: 'Liệt sĩ Nguyễn Trực Cường (Chi Hai - Đời thứ 10)',
      avatar: '/images/relic_medals.jpg',
      avatarBg: 'bg-[#80141d] text-white',
      avatarInitial: 'C',
    },
    {
      id: 'story-5',
      badgeCategory: 'Gia Ước & Tộc Quy',
      badgeSub: 'Khoán Ước 1928',
      image: '/images/ancestor_portrait.jpg',
      imageTag: 'Khoán thư Mộc bản còn nguyên vẹn',
      themeSub: 'HÒA MỤC TỔNG TỘC • CÔNG BẰNG MINH BẠCH',
      title: 'Gia ước về việc chia sẻ ruộng hương hỏa công bằng giữa các chi phái (1928)',
      snippet:
        'Văn bản đồng thuận 18 chữ ký của các cụ đầu họ, thiết lập nguyên tắc hoa lợi ba mẫu ruộng tế không chia theo giàu nghèo mà dành toà...',
      author: 'Hội Đồng Tộc Biểu (Ký kết tại Từ Đường Tổ)',
      avatar: '/images/ancestor_portrait.jpg',
      avatarBg: 'bg-[#5c4033] text-white',
      avatarInitial: 'H',
    },
    {
      id: 'story-6',
      badgeCategory: 'Ký Ức & Tình Mẫu Tử',
      badgeSub: 'Thời Kháng Chiến 9 Năm',
      image: '/images/relic_medals.jpg',
      imageTag: 'Ký ức dân gian lưu truyền',
      themeSub: 'ĐỨC HY SINH • Ý CHÍ VƯỢT GIAN KHÓ',
      title: 'Bát canh rau tập tàng nuôi đàn con đỗ tú tài',
      snippet:
        'Những mùa giáp hạt trơ trọi gốc rạ, bàn tay Mẹ gom từng đọt rau dền gai, rau sam ven bờ đê nấu nồi canh loãng nhưng hớt phần cơm...',
      author: 'Bà Nguyễn Thị Diệu (Dâu Nam - Làng Cổ Đà)',
      avatar: '/images/hero_family.jpg',
      avatarBg: 'bg-[#faefe3] text-[#80141d]',
      avatarInitial: 'D',
    },
  ];

  return (
    <div className="w-full min-h-screen bg-[#fcf8f2] text-[#2b1b15] font-sans pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 space-y-6">
        {/* Breadcrumb & Top Indicator */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs border-b border-[#dec9b6]/40 pb-3">
          <div className="flex items-center gap-2 font-medium text-[#8a6f62]">
            <button
              type="button"
              onClick={() => onNavigate('kho-ky-uc')}
              className="hover:text-[#80141d] transition-colors cursor-pointer"
            >
              Gia Phong &amp; Nếp Nhà
            </button>
            <span>›</span>
            <span className="text-[#80141d] font-semibold">Thư Viện Giá Trị Gia Đình</span>
          </div>

          <div className="flex items-center gap-2 text-[#8a6f62] text-xs">
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-sm text-[#c9892c]">history_edu</span>
              <span>Lưu trữ chính phả Chi Trực Lăng</span>
            </span>
            <span>•</span>
            <span className="text-[#80141d] font-semibold">Cập nhật: Tiết Đại Hàn 2025</span>
          </div>
        </div>

        {/* Title Header */}
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#faefe3] text-[#80141d] text-[11px] font-bold tracking-wider uppercase border border-[#dec9b6]/60">
            <span className="material-symbols-outlined text-sm">auto_stories</span>
            <span>Tùng Thư Di Dưỡng Đạo Đức</span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-[#2b1b15] tracking-tight">
            Tủ Sách Gia Phong &amp; Giá Trị Cốt Lõi Đại Tộc
          </h1>
          <p className="text-xs sm:text-sm text-[#6b584d] max-w-4xl leading-relaxed">
            Chắt lọc tinh hoa từ gia huấn ngàn xưa, nuôi dưỡng nhân cách và gìn giữ đạo hiếu cho các
            thế hệ con cháu hôm nay và mai sau. Mỗi trang biên niên là một ngọn đuốc truyền thừa tâm
            đức tiền tổ.
          </p>
        </div>

        {/* Section: TỨ ĐẠI GIA HUẤN CỤ TỔ TRUYỀN DẠY */}
        <div className="bg-white rounded-3xl border border-[#dec9b6] p-6 sm:p-7 shadow-2xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#dec9b6]/30 pb-3">
            <div>
              <div className="text-[10px] font-bold text-[#80141d] uppercase tracking-wider">
                Bản Dịch Khảo Chứng Từ Mộc Bản Khắc Định Nguyên Bản
              </div>
              <h2 className="font-serif font-bold text-lg text-[#2b1b15]">
                Tứ Đại Gia Huấn Cụ Tổ Truyền Dạy
              </h2>
            </div>

            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-lg bg-[#fdfaf5] border border-[#dec9b6] text-xs font-medium text-[#6b584d]">
                Trang Thư Phả Ký: Bản số 01 - Tế Mộc
              </span>
              <button
                type="button"
                onClick={() => alert('Đang mở bản scan mộc bản cổ...')}
                className="px-3.5 py-1 rounded-lg bg-[#80141d] hover:bg-[#681017] text-white text-xs font-bold transition-colors cursor-pointer"
              >
                Đọc Bản Mộc
              </button>
            </div>
          </div>

          {/* 4 Virtue Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Card 1 */}
            <div className="p-4 bg-[#fdfaf5] border border-[#dec9b6] rounded-2xl flex flex-col justify-between space-y-3 hover:border-[#80141d] transition-all">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif font-bold text-sm text-[#2b1b15]">
                    01. Thành Tín Vi Bản
                  </h3>
                  <span className="px-2 py-0.5 rounded-full bg-[#faeed9] text-[#734c13] text-[9px] font-bold border border-[#dec9b6]">
                    Chân Tâm
                  </span>
                </div>
                <p className="text-xs text-[#6b584d] leading-relaxed">
                  Lấy chân thành và chữ tín làm nền tảng đối nhân xử thế. Lời đã hứa nặng tựa thái
                  sơn, trước sau như một dẫu gian khó trăm bề.
                </p>
              </div>
              <button
                type="button"
                onClick={() => onNavigate('cau-chuyen-gia-phong')}
                className="text-[11px] font-bold text-[#80141d] hover:underline flex items-center gap-1 cursor-pointer pt-2 border-t border-[#dec9b6]/30"
              >
                <span>Trí tuệ chỉ dạy: Chiêm nghiệm</span>
                <span>→</span>
              </button>
            </div>

            {/* Card 2 */}
            <div className="p-4 bg-[#fdfaf5] border border-[#dec9b6] rounded-2xl flex flex-col justify-between space-y-3 hover:border-[#80141d] transition-all">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif font-bold text-sm text-[#2b1b15]">
                    02. Cần Kiệm Trì Gia
                  </h3>
                  <span className="px-2 py-0.5 rounded-full bg-[#faefe3] text-[#80141d] text-[9px] font-bold border border-[#dec9b6]">
                    Tích Phúc
                  </span>
                </div>
                <p className="text-xs text-[#6b584d] leading-relaxed">
                  Siêng năng lao động, chi dùng đúng mực, tích đức cho con cháu. Phú quý không kiêu
                  sa, thanh bần giữ trọn tiết tháo thanh bạch.
                </p>
              </div>
              <button
                type="button"
                onClick={() => onNavigate('cau-chuyen-gia-phong')}
                className="text-[11px] font-bold text-[#80141d] hover:underline flex items-center gap-1 cursor-pointer pt-2 border-t border-[#dec9b6]/30"
              >
                <span>Hưng nghiệp trường tồn: Chiêm nghiệm</span>
                <span>→</span>
              </button>
            </div>

            {/* Card 3 */}
            <div className="p-4 bg-[#fdfaf5] border border-[#dec9b6] rounded-2xl flex flex-col justify-between space-y-3 hover:border-[#80141d] transition-all">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif font-bold text-sm text-[#2b1b15]">
                    03. Hiếu Đễ Thuận Hòa
                  </h3>
                  <span className="px-2 py-0.5 rounded-full bg-[#faeed9] text-[#734c13] text-[9px] font-bold border border-[#dec9b6]">
                    Cội Nguồn
                  </span>
                </div>
                <p className="text-xs text-[#6b584d] leading-relaxed">
                  Kính trên nhường dưới, anh em hòa mục, dòng tộc hưng thịnh. Cội rễ sâu thì cành lá
                  mới tốt tươi, phụng dưỡng mẹ cha vẹn nghĩa tình.
                </p>
              </div>
              <button
                type="button"
                onClick={() => onNavigate('cau-chuyen-gia-phong')}
                className="text-[11px] font-bold text-[#80141d] hover:underline flex items-center gap-1 cursor-pointer pt-2 border-t border-[#dec9b6]/30"
              >
                <span>Đạo hiếu vi tiên: Chiêm nghiệm</span>
                <span>→</span>
              </button>
            </div>

            {/* Card 4 */}
            <div className="p-4 bg-[#fdfaf5] border border-[#dec9b6] rounded-2xl flex flex-col justify-between space-y-3 hover:border-[#80141d] transition-all">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif font-bold text-sm text-[#2b1b15]">
                    04. Tri Thức Lập Thân
                  </h3>
                  <span className="px-2 py-0.5 rounded-full bg-[#faefe3] text-[#80141d] text-[9px] font-bold border border-[#dec9b6]">
                    Khai Sáng
                  </span>
                </div>
                <p className="text-xs text-[#6b584d] leading-relaxed">
                  Lấy bút nghiên tri thức làm rạng danh tiền tổ. Đèn sách cùng như dồi cơm, học để
                  mở mang lương tri, phụng sự quê hương xứ sở.
                </p>
              </div>
              <button
                type="button"
                onClick={() => onNavigate('cau-chuyen-gia-phong')}
                className="text-[11px] font-bold text-[#80141d] hover:underline flex items-center gap-1 cursor-pointer pt-2 border-t border-[#dec9b6]/30"
              >
                <span>Văn hiến thế gia: Chiêm nghiệm</span>
                <span>→</span>
              </button>
            </div>
          </div>
        </div>

        {/* Search Bar & Era Tabs */}
        <div className="space-y-3">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
            <div className="relative flex-1">
              <span className="material-symbols-outlined absolute left-3 top-2.5 text-[#8a6f62] text-lg pointer-events-none">
                search
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm kiếm theo phẩm hạnh (Hiếu, Nghĩa, Cần, Chữ Tín), tên tiền nhân hoặc bài học..."
                className="w-full bg-white border border-[#dec9b6] rounded-xl pl-10 pr-4 py-2 text-xs font-medium text-[#2b1b15] focus:outline-none focus:border-[#80141d]"
              />
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => alert('Đang sắp xếp theo niên đại phả hệ')}
                className="px-3 py-2 rounded-xl bg-white border border-[#dec9b6] text-xs font-medium text-[#4a362f] hover:bg-[#faefe3] transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <span className="material-symbols-outlined text-sm">sort</span>
                <span>Thứ tự: Niên đại phả hệ ▾</span>
              </button>
              <button
                type="button"
                onClick={() => alert('Mở danh sách bài học theo chuyên đề')}
                className="p-2 rounded-xl bg-white border border-[#dec9b6] text-[#4a362f] hover:bg-[#faefe3] cursor-pointer"
              >
                <span className="material-symbols-outlined text-base">apps</span>
              </button>
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
            {[
              { id: 'all', label: 'Tất cả câu chuyện (28)' },
              { id: 'precepts', label: 'Gia huấn tiền nhân (8)' },
              { id: 'hardship', label: 'Điển tích vượt khó (6)' },
              { id: 'village', label: 'Ký ức làng quê & nếp sống (7)' },
              { id: 'scholar', label: 'Gương hiếu học đỗ đạt (7)' },
            ].map((tab) => {
              const isActive = selectedTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setSelectedTab(tab.id)}
                  className={`px-3.5 py-1.5 rounded-full font-medium whitespace-nowrap transition-colors border cursor-pointer ${
                    isActive
                      ? 'bg-[#80141d] text-white border-[#80141d] shadow-2xs font-semibold'
                      : 'bg-white text-[#6b584d] border-[#dec9b6] hover:border-[#c9892c]'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* 6 Story Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-1">
          {stories.map((story) => (
            <div
              key={story.id}
              className="bg-white rounded-3xl border border-[#dec9b6] overflow-hidden shadow-2xs flex flex-col justify-between hover:shadow-md transition-shadow group"
            >
              {/* Photo Area */}
              <div className="relative h-44 overflow-hidden">
                <img
                  src={story.image}
                  alt={story.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {/* Badges on image */}
                <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#80141d] text-white text-[10px] font-bold shadow-xs">
                    {story.badgeCategory}
                  </span>
                  {story.badgeSub && (
                    <span className="px-2 py-0.5 rounded-full bg-black/60 text-white text-[9px] backdrop-blur-xs">
                      {story.badgeSub}
                    </span>
                  )}
                </div>

                <div className="absolute bottom-2.5 left-2.5 px-2.5 py-1 rounded-full bg-black/65 text-white text-[10px] font-semibold backdrop-blur-xs flex items-center gap-1">
                  <span className="material-symbols-outlined text-xs text-[#faeed9]">
                    headphones
                  </span>
                  <span>{story.imageTag}</span>
                </div>
              </div>

              {/* Story Content */}
              <div className="p-5 space-y-2.5 flex-1 flex flex-col justify-between">
                <div className="space-y-1.5">
                  <div className="text-[10px] font-bold text-[#80141d] uppercase tracking-wider">
                    {story.themeSub}
                  </div>
                  <h3 className="font-serif font-bold text-sm text-[#2b1b15] leading-snug group-hover:text-[#80141d] transition-colors">
                    {story.title}
                  </h3>
                  <p className="text-xs text-[#6b584d] leading-relaxed line-clamp-3">
                    {story.snippet}
                  </p>
                </div>

                {/* Author footer */}
                <div className="flex items-center justify-between pt-3 border-t border-[#dec9b6]/30">
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-[10px] ${story.avatarBg}`}
                    >
                      {story.avatarInitial}
                    </div>
                    <span className="text-[11px] text-[#4a362f] font-medium truncate max-w-[190px]">
                      {story.author}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => onNavigate('cau-chuyen-gia-phong')}
                    className="w-7 h-7 rounded-full bg-[#faefe3] border border-[#dec9b6] text-[#80141d] hover:bg-[#80141d] hover:text-white flex items-center justify-center text-xs transition-colors cursor-pointer shrink-0"
                  >
                    →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 text-xs text-[#8a6f62]">
          <span>Hiển thị 6 trên tổng số 28 câu chuyện gia phong</span>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              className="px-2.5 py-1 rounded-lg border border-[#dec9b6] bg-white hover:bg-[#faefe3] cursor-pointer"
            >
              ‹
            </button>
            <button
              type="button"
              className={`w-7 h-7 rounded-lg font-bold ${
                currentPage === 1
                  ? 'bg-[#80141d] text-white'
                  : 'bg-white border border-[#dec9b6] hover:bg-[#faefe3]'
              }`}
            >
              1
            </button>
            <button
              type="button"
              className="w-7 h-7 rounded-lg bg-white border border-[#dec9b6] hover:bg-[#faefe3] cursor-pointer"
            >
              2
            </button>
            <button
              type="button"
              className="w-7 h-7 rounded-lg bg-white border border-[#dec9b6] hover:bg-[#faefe3] cursor-pointer"
            >
              3
            </button>
            <button
              type="button"
              onClick={() => setCurrentPage((prev) => Math.min(3, prev + 1))}
              className="px-2.5 py-1 rounded-lg border border-[#dec9b6] bg-white hover:bg-[#faefe3] cursor-pointer"
            >
              ›
            </button>
          </div>
        </div>

        {/* Bottom CTA Banner: Đóng Góp Câu Chuyện Giáo Dục Con Cháu */}
        <div className="bg-[#faefe3]/70 border border-[#dec9b6] rounded-3xl p-6 sm:p-7 shadow-2xs space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1.5">
              <div className="text-[10px] font-bold text-[#80141d] uppercase tracking-wider">
                Đóng Góp Bồi Đắp Di Sản Gia Tộc
              </div>
              <h2 className="font-serif font-bold text-lg text-[#2b1b15]">
                Đóng Góp Câu Chuyện Giáo Dục Con Cháu
              </h2>
              <p className="text-xs text-[#6b584d] max-w-2xl leading-relaxed">
                Mỗi lời dặn dò của ông bà, mỗi biến cố vượt khó của cha anh đều là bài học nhân cách
                vô giá. Hãy ghi lại để tủ sách gia phong của Đại tộc mãi là điểm tựa tâm hồn cho con
                cháu muôn đời sau.
              </p>
            </div>

            <div className="flex items-center gap-2.5 shrink-0">
              <button
                type="button"
                onClick={() => onNavigate('them-cot-moc')}
                className="px-4 py-2.5 rounded-xl bg-[#80141d] hover:bg-[#681017] text-white text-xs font-bold transition-all shadow-sm cursor-pointer whitespace-nowrap"
              >
                Kể Lại Chuyện Gia Đình
              </button>
              <button
                type="button"
                onClick={() => alert('Mở bảng quy chuẩn thẩm định điển tích...')}
                className="px-4 py-2.5 rounded-xl bg-[#faeed9] border border-[#dec9b6] text-[#734c13] hover:bg-[#eed9be] text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap"
              >
                Quy Chuẩn Thẩm Định
              </button>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-6 pt-3 border-t border-[#dec9b6]/40 text-xs text-[#6b584d]">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-sm text-[#80141d]">lock</span>
              <span>Lưu truyền nội bộ chi phái</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-sm text-[#c9892c]">verified</span>
              <span>Ban Trị Sự khảo chứng</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-sm text-[#5c4033]">mic</span>
              <span>Hỗ trợ biên ghi âm trực tiếp</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default FamilyTraditionLibraryScreen;
