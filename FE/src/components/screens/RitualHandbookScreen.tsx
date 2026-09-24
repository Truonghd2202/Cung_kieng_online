import React, { useState } from 'react';
import type { ScreenType } from '../../types.ts';

interface RitualHandbookScreenProps {
  onNavigate: (screen: ScreenType) => void;
}

export const RitualHandbookScreen: React.FC<RitualHandbookScreenProps> = ({ onNavigate }) => {
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const annualRituals = [
    {
      id: 'tat-nien',
      title: 'Đại Lễ Cúng Tất Niên Chiều 30 Tết',
      region: 'Toàn Quốc',
      time: 'Chiều 30 Tháng Chạp',
      desc: 'Nghi thức tạ ơn thần linh thổ địa cầu may, dâng mâm hương hỏa kính thỉnh lịch đại tiền tổ hồi quy ngự tại gia đình ngày 3 Tết, tẩy...',
      prep: 'Chuẩn bị: 2 - 3 ngày',
      level: 'Cấp độ: Trang Trọng',
      source: 'Nguồn: Việt Nam Phong Tục (Phan Kế Bính)',
      verified: 'Thẩm định: Ban Trị Sự Trưởng Lão (03/2024)',
    },
    {
      id: 'thuong-nguyen',
      title: 'Đại Lễ Thượng Nguyên - Rằm Tháng Giêng',
      region: 'Bắc Bộ & Trung Bộ',
      time: '14 - 15 Tháng Giêng',
      desc: '“Cúng cả năm không bằng Rằm tháng Giêng”. Lễ cầu quốc thái dân an, phụng tạ thần quan và tấu phán, tống tiễn...',
      prep: 'Chuẩn bị: 2 ngày',
      level: 'Cấp độ: Trang Trọng',
      source: 'Nguồn: Thọ Mai Gia Lễ',
      verified: 'Thẩm định: Hội đồng Tộc Biểu',
    },
    {
      id: 'thanh-minh',
      title: 'Tiết Thanh Minh & Tảo Mộ Tiền Tổ',
      region: 'Đại Cố Điển Tộc',
      time: 'Rằm Tháng Ba Âm Lịch',
      desc: '“Thanh minh trong tiết tháng ba”. Con cháu sum tụ san sửa phần mộ, thắp nén tâm hương bồi đắp cội nguồn...',
      prep: 'Chuẩn bị: 1 buổi',
      level: 'Cấp độ: Trọng Họ Niêm',
      source: 'Nguồn: Điển Tế Tộc Quy',
      verified: 'Thẩm định: Ban Trị Sự Trực Lăng',
    },
    {
      id: 'vu-lan',
      title: 'Đại Lễ Vu Lan & Xá Tội Vong Nhân',
      region: 'Toàn Quốc',
      time: '15 Tháng Bảy (Trung Nguyên)',
      desc: 'Hòa hợp nghi thức Vu Lan báo hiếu công đức cù lao cha mẹ và lễ phổ độ tế Trực Lăng xá tội vong linh bạt độ...',
      prep: 'Chuẩn bị: 2 ngày',
      level: 'Cấp độ: Đại Lễ',
      source: 'Nguồn: Phật Giáo & Phong Tục',
      verified: 'Thẩm định: Ban Trị Sự Trưởng Lão',
    },
    {
      id: 'gio-to',
      title: 'Nghi Lễ Giỗ Tổ & Kinh Bái Quốc Tổ',
      region: 'Toàn Lễ & Tộc Lễ',
      time: '10 Tháng Ba Âm Lịch',
      desc: '“Dù ai đi ngược về xuôi / Nhớ ngày Giỗ Tổ mùng mười tháng ba”. Lễ quy hướng cội nguồn dân tộc kết phụng...',
      prep: 'Chuẩn bị: 3 ngày',
      level: 'Cấp độ: Tế Lễ Lớn',
      source: 'Nguồn: Quốc Lễ Truyền Thống',
      verified: 'Thẩm định: Hội đồng Tộc Biểu',
    },
  ];

  const clanRituals = [
    {
      title: 'Lễ Thượng Lương & Cất Nóc Từ Đường',
      badge: 'Kiến Thiết & Trùng Tu',
      time: 'Ngày Hoàng Đạo (Tuy Chọn)',
      desc: 'Nghi lễ đặt xà gồ nóc chính điện nhà thờ họ, tạ ơn thổ thần và khấn nguyện cho công trình kiên cố...',
      prep: 'Chuẩn bị: 3 ngày',
      level: 'Cấp độ: Đại Tế Trọng',
    },
    {
      title: 'Lễ Trùng Tu & Tạ Khánh Thành Từ Đường',
      badge: 'Toàn Quốc',
      time: 'Tiết Thu (15 Tháng Tám Âm)',
      desc: 'Huy động sự đóng góp tài lực của con cháu cả 3 miền, sau quá trình trùng tu ngôi từ đường, cử nghi lễ tạ phụng...',
      prep: 'Chuẩn bị: 5 - 7 ngày',
      level: 'Cấp độ: Tế Nghĩa Lớn',
    },
    {
      title: 'Lễ Đầy Tháng & Thôi Nôi Cho Hậu Duệ',
      badge: 'Khởi Sinh & Toàn Quốc',
      time: 'Tròn 1 Tháng / 1 Năm Sau Sinh',
      desc: 'Tạ ơn 12 bà Mụ và 3 đức ông đã gìn giữ cho cháu bé, làm sớ trình diện tiền tổ gia phả và chúc phúc...',
      prep: 'Chuẩn bị: 1 ngày',
      level: 'Cấp độ: Hân Hoan',
    },
    {
      title: 'Lễ Mừng Thọ Bát Tuần & Cửu Tuần',
      badge: 'Hiếu Kính Trọng Đại',
      time: 'Tháng Giêng (Mùng 2 - Mùng 4)',
      desc: 'Con cháu các chi phái tề tựu chúc thọ mẹ hiền, cha kính; dâng áo gấm, khánh vàng thêu chữ Thọ...',
      prep: 'Chuẩn bị: 1 ngày',
      level: 'Cấp độ: Khánh Hỷ',
    },
    {
      title: 'Lễ Giỗ Đầu (Tiểu Tường) & Giỗ Hết',
      badge: 'Tang Tế',
      time: 'Đúng Ngày Mất Khảo',
      desc: 'Nghi thức trọn vẹn niềm tiếc thương sau tang gia, tế lễ tạ phần mộ và làm lễ trừ phục...',
      prep: 'Chuẩn bị: 1 ngày',
      level: 'Cấp độ: Trang Lễ & Báo Hiếu',
    },
  ];

  const monthlyRituals = [
    {
      title: 'Nghi Thức Cúng Sóc Nhật (Mùng Một)',
      badge: 'Toàn Quốc',
      time: 'Mùng 1 Âm Lịch Hàng Tháng',
      desc: 'Ngày đầu tháng tẩy uế hương án, thắp nén nhang cầu bình an cho gia quyến, tấu xin gia tiên che chở.',
      prep: 'Chuẩn bị: 30 - 45 phút',
      level: 'Cấp độ: Thường Kỳ',
    },
    {
      title: 'Nghi Thức Cúng Vọng Nhật (Ngày Rằm)',
      badge: 'Toàn Quốc',
      time: 'Ngày 15 Hàng Tháng (Trăng Tròn)',
      desc: 'Trăng tròn sáng soi tỏ lòng hiếu kính; dâng mâm hoa quả, trầu cau cầu mong gia đạo viên mãn.',
      prep: 'Chuẩn bị: 45 phút',
      level: 'Cấp độ: Thường Kỳ',
    },
    {
      title: 'Nghi Thức Phụng Thờ Thần Tài & Thổ Địa',
      badge: 'Gia Đình & Kinh Doanh',
      time: 'Mùng 10 Hàng Tháng & Hàng Ngày',
      desc: 'Nét đặc trưng trong thương gia dòng tộc, dâng trà nước thanh khiết và hoa tươi trước khi mở cửa hàng quán.',
      prep: 'Chuẩn bị: 20 phút',
      level: 'Cấp độ: Cầu May',
    },
  ];

  return (
    <div className="w-full min-h-screen bg-[#fcf8f2] text-[#2b1b15] font-sans pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 space-y-6">
        {/* Header Breadcrumb & Top Card */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs border-b border-[#dec9b6]/40 pb-3">
          <div className="flex items-center gap-2 font-medium text-[#8a6f62]">
            <button
              type="button"
              onClick={() => onNavigate('kho-ky-uc')}
              className="hover:text-[#80141d] transition-colors cursor-pointer"
            >
              Nghi Lễ &amp; Văn Khấn
            </button>
            <span>›</span>
            <span className="text-[#80141d] font-semibold">Cẩm Nang Nghi Lễ Di Sản</span>
          </div>

          <div className="px-3 py-1 rounded-full bg-[#faeed9] border border-[#dec9b6] text-xs font-semibold text-[#734c13] flex items-center gap-1.5">
            <span className="material-symbols-outlined text-sm text-[#c9892c]">verified</span>
            <span>Tuân Quy Điển Chung • Bản sao Trích lục Tùng Lăng — Kỷ Sử 2024</span>
          </div>
        </div>

        {/* Title Header */}
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#faefe3] text-[#80141d] text-[11px] font-bold tracking-wider uppercase border border-[#dec9b6]/60">
            <span className="material-symbols-outlined text-sm">temple_buddhist</span>
            <span>Tổng Quan Các Đại Nghi Thức Tế Lễ</span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-[#80141d] tracking-tight">
            Cẩm Nang Nghi Lễ Di Sản
          </h1>
          <p className="text-xs sm:text-sm text-[#6b584d] max-w-4xl leading-relaxed">
            Quy chuẩn hệ thống nghi thức thờ phụng, văn khấn tiền tổ và tế điển cổ truyền qua ba miền
            Bắc - Trung - Nam, gìn trọn phép hiếu đạo và phẩm cách thanh tịnh.
          </p>
        </div>

        {/* Top Tôn Chỉ Lễ Bái Banner */}
        <div className="p-4 sm:p-5 bg-white border border-[#dec9b6] rounded-3xl shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-[#80141d] text-white flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-xl">local_fire_department</span>
            </div>
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-[#80141d]">
                Tôn Chỉ Lễ Bái
              </div>
              <div className="text-xs sm:text-sm font-serif font-bold text-[#2b1b15]">
                Chuẩn Hóa Nghi Lễ Thờ Cúng Phụng Sự: Gìn giữ nếp văn hóa tâm linh thanh tịnh, bài trừ
                mê tín dị đoan và lãng phí.
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => alert('Mở bảng quy chuẩn mật tộc tế điển')}
            className="px-4 py-2 rounded-xl bg-[#faeed9] hover:bg-[#eed9be] text-[#734c13] text-xs font-bold transition-colors border border-[#dec9b6] shrink-0 cursor-pointer"
          >
            Quy Chuẩn: Mật Tộc Tế Điển
          </button>
        </div>

        {/* Search Bar & Region Tabs */}
        <div className="space-y-3 pt-1">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
            <div className="relative flex-1">
              <span className="material-symbols-outlined absolute left-3 top-2.5 text-[#8a6f62] text-lg pointer-events-none">
                search
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm kiếm danh mục nghi lễ, mùa lễ tiết (Tất niên, ngày..."
                className="w-full bg-white border border-[#dec9b6] rounded-xl pl-10 pr-4 py-2 text-xs font-medium text-[#2b1b15] focus:outline-none focus:border-[#80141d]"
              />
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
              {[
                { id: 'all', label: 'Toàn Quốc' },
                { id: 'north', label: 'Phong Tục Bắc Bộ' },
                { id: 'central', label: 'Phong Tục Trung Bộ' },
                { id: 'south', label: 'Phong Tục Nam Bộ' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setSelectedRegion(tab.id)}
                  className={`px-3.5 py-1.5 rounded-full font-medium whitespace-nowrap transition-colors border cursor-pointer ${
                    selectedRegion === tab.id
                      ? 'bg-[#80141d] text-white border-[#80141d] shadow-2xs font-semibold'
                      : 'bg-white text-[#6b584d] border-[#dec9b6] hover:border-[#c9892c]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* 4 Stats Pills */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="p-3 bg-white border border-[#dec9b6] rounded-2xl flex items-center gap-2.5 shadow-2xs">
              <span className="material-symbols-outlined text-lg text-[#80141d]">menu_book</span>
              <div>
                <span className="font-bold text-[#2b1b15]">48+ Biểu Lễ</span>
                <span className="text-[10px] text-[#8a6f62] block">Quy chuẩn phả tộc</span>
              </div>
            </div>

            <div className="p-3 bg-white border border-[#dec9b6] rounded-2xl flex items-center gap-2.5 shadow-2xs">
              <span className="material-symbols-outlined text-lg text-[#c9892c]">auto_stories</span>
              <div>
                <span className="font-bold text-[#2b1b15]">3 Đại Thứ</span>
                <span className="text-[10px] text-[#8a6f62] block">Cổ thư khảo luận</span>
              </div>
            </div>

            <div className="p-3 bg-white border border-[#dec9b6] rounded-2xl flex items-center gap-2.5 shadow-2xs">
              <span className="material-symbols-outlined text-lg text-[#5c4033]">map</span>
              <div>
                <span className="font-bold text-[#2b1b15]">3 Miền</span>
                <span className="text-[10px] text-[#8a6f62] block">Phương ngữ phong thổ</span>
              </div>
            </div>

            <div className="p-3 bg-white border border-[#dec9b6] rounded-2xl flex items-center gap-2.5 shadow-2xs">
              <span className="material-symbols-outlined text-lg text-emerald-700">verified</span>
              <div>
                <span className="font-bold text-[#2b1b15]">100%</span>
                <span className="text-[10px] text-[#8a6f62] block">Trưởng lão thông tri</span>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 1: CHƯƠNG I: TIẾT LỄ BỐN MÙA — Đại Lễ Thường Niên */}
        <div className="space-y-4 pt-2">
          <div className="flex items-center justify-between border-b border-[#dec9b6]/40 pb-2">
            <div className="space-y-0.5">
              <div className="text-[10px] font-bold text-[#80141d] uppercase tracking-wider">
                Chương I: Tiết Lễ Bốn Mùa
              </div>
              <h2 className="font-serif font-bold text-lg text-[#2b1b15]">Đại Lễ Thường Niên</h2>
            </div>
            <span className="px-2.5 py-0.5 rounded-full bg-[#faefe3] text-[#80141d] text-xs font-bold">
              5 nghi lễ xuất hiện trong năm
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {annualRituals.map((r) => (
              <div
                key={r.id}
                className="bg-white rounded-3xl border border-[#dec9b6] p-5 shadow-2xs flex flex-col justify-between space-y-4 hover:shadow-md transition-shadow"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="px-2 py-0.5 rounded-full bg-[#faeed9] text-[#734c13] font-bold border border-[#dec9b6]">
                      {r.region}
                    </span>
                    <span className="text-[#8a6f62]">{r.time}</span>
                  </div>

                  <h3 className="font-serif font-bold text-base text-[#2b1b15] leading-snug">
                    {r.title}
                  </h3>

                  <p className="text-xs text-[#6b584d] leading-relaxed line-clamp-3">{r.desc}</p>

                  <div className="flex items-center gap-3 text-[11px] text-[#4a362f] pt-1">
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-xs text-[#80141d]">
                        schedule
                      </span>
                      <span>{r.prep}</span>
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-xs text-[#c9892c]">star</span>
                      <span>{r.level}</span>
                    </span>
                  </div>
                </div>

                <div className="border-t border-[#dec9b6]/30 pt-3">
                  <button
                    type="button"
                    onClick={() => onNavigate('chi-tiet-nghi-le')}
                    className="w-full py-2 px-3 rounded-xl bg-[#faefe3] hover:bg-[#80141d] hover:text-white text-xs font-bold text-[#80141d] transition-colors flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <span>Xem Chi Tiết Hành Lễ &amp; Văn Khấn</span>
                    <span>→</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Highlight Story Banner: Điển Tích Lễ Nghi Trong Cổ Thư */}
        <div className="p-6 bg-gradient-to-r from-[#faeed9] to-[#faefe3] border border-[#dec9b6] rounded-3xl shadow-2xs flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="text-[10px] font-bold text-[#80141d] uppercase tracking-wider flex items-center gap-1">
              <span className="material-symbols-outlined text-xs">auto_stories</span>
              <span>Điển Tích Lễ Nghi Trong Cổ Thư</span>
            </div>
            <p className="font-serif italic text-sm text-[#2b1b15] leading-relaxed">
              Trích lục từ Việt Nam Phong Tục (1915): “Tế tự cốt ở lòng thành kính, chớ chuộng cỗ
              bàn xa hoa thịt cá bừa bãi. Đèn hương hoa quả tinh khiết, chén nước thanh, khấn bái
              phải minh chính thì trời đất mới đoái thương ban cho con cái vẹn đạo hiếu.”
            </p>
            <div className="flex flex-wrap items-center gap-4 text-xs pt-1 text-[#4a362f]">
              <span className="font-bold text-[#80141d]">TÂM NGUYỆN: Thành Kính</span>
              <span>•</span>
              <span className="font-bold text-[#734c13]">TRIẾT LÝ: Tận Tụy</span>
              <span>•</span>
              <span className="font-bold text-emerald-800">BẢO CHỨNG: Chính Thống</span>
            </div>
          </div>

          <div className="relative rounded-2xl overflow-hidden border border-[#dec9b6] shadow-sm w-full lg:w-72 h-36 shrink-0 group">
            <img
              src="/images/hero_family.jpg"
              alt="Gia Phong Trực Lăng"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end p-3 text-white">
              <div className="text-[10px] font-serif font-bold">Gia Phong Trực Lăng</div>
              <div className="text-[9px] text-white/80">Lập mộc bản từ đường lưu truyền năm Giáp Tý</div>
            </div>
          </div>
        </div>

        {/* SECTION 2: CHƯƠNG II: CỐT TỦY DÒNG HỌ — Nghi Lễ Gia Tộc & Hiếu Kính */}
        <div className="space-y-4 pt-2">
          <div className="flex items-center justify-between border-b border-[#dec9b6]/40 pb-2">
            <div className="space-y-0.5">
              <div className="text-[10px] font-bold text-[#80141d] uppercase tracking-wider">
                Chương II: Cốt Tủy Dòng Họ
              </div>
              <h2 className="font-serif font-bold text-lg text-[#2b1b15]">
                Nghi Lễ Gia Tộc &amp; Hiếu Kính
              </h2>
            </div>
            <span className="px-2.5 py-0.5 rounded-full bg-[#faefe3] text-[#80141d] text-xs font-bold">
              5 Điều Khoản Tộc Quy Giữ Gìn Trong Họ
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {clanRituals.map((r, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl border border-[#dec9b6] p-5 shadow-2xs flex flex-col justify-between space-y-4 hover:shadow-md transition-shadow"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="px-2 py-0.5 rounded-full bg-[#faefe3] text-[#80141d] font-bold border border-[#dec9b6]">
                      {r.badge}
                    </span>
                    <span className="text-[#8a6f62]">{r.time}</span>
                  </div>

                  <h3 className="font-serif font-bold text-base text-[#2b1b15] leading-snug">
                    {r.title}
                  </h3>

                  <p className="text-xs text-[#6b584d] leading-relaxed line-clamp-3">{r.desc}</p>

                  <div className="flex items-center gap-3 text-[11px] text-[#4a362f] pt-1">
                    <span>{r.prep}</span>
                    <span>•</span>
                    <span className="font-semibold text-[#80141d]">{r.level}</span>
                  </div>
                </div>

                <div className="border-t border-[#dec9b6]/30 pt-3">
                  <button
                    type="button"
                    onClick={() => onNavigate('chi-tiet-nghi-le')}
                    className="w-full py-2 px-3 rounded-xl bg-[#faefe3] hover:bg-[#80141d] hover:text-white text-xs font-bold text-[#80141d] transition-colors flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <span>Xem Chi Tiết Hành Lễ &amp; Văn Khấn</span>
                    <span>→</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 3: CHƯƠNG III: PHỤNG THỜ HẰNG NGÀY — Nghi Thức Cúng Rằm & Mùng Một Hàng Tháng */}
        <div className="space-y-4 pt-2">
          <div className="flex items-center justify-between border-b border-[#dec9b6]/40 pb-2">
            <div className="space-y-0.5">
              <div className="text-[10px] font-bold text-[#80141d] uppercase tracking-wider">
                Chương III: Phụng Thờ Hằng Ngày
              </div>
              <h2 className="font-serif font-bold text-lg text-[#2b1b15]">
                Nghi Thức Cúng Rằm &amp; Mùng Một Hàng Tháng
              </h2>
            </div>
            <span className="px-2.5 py-0.5 rounded-full bg-[#faefe3] text-[#80141d] text-xs font-bold">
              Lễ Thường Niên Tịnh Tâm Gia Đạo
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {monthlyRituals.map((r, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl border border-[#dec9b6] p-5 shadow-2xs flex flex-col justify-between space-y-4 hover:shadow-md transition-shadow"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="px-2 py-0.5 rounded-full bg-[#faeed9] text-[#734c13] font-bold border border-[#dec9b6]">
                      {r.badge}
                    </span>
                    <span className="text-[#8a6f62]">{r.time}</span>
                  </div>

                  <h3 className="font-serif font-bold text-base text-[#2b1b15] leading-snug">
                    {r.title}
                  </h3>

                  <p className="text-xs text-[#6b584d] leading-relaxed line-clamp-3">{r.desc}</p>

                  <div className="flex items-center gap-3 text-[11px] text-[#4a362f] pt-1">
                    <span>{r.prep}</span>
                    <span>•</span>
                    <span className="font-semibold text-[#80141d]">{r.level}</span>
                  </div>
                </div>

                <div className="border-t border-[#dec9b6]/30 pt-3">
                  <button
                    type="button"
                    onClick={() => onNavigate('chi-tiet-nghi-le')}
                    className="w-full py-2 px-3 rounded-xl bg-[#faefe3] hover:bg-[#80141d] hover:text-white text-xs font-bold text-[#80141d] transition-colors flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <span>Xem Chi Tiết Hành Lễ &amp; Văn Khấn</span>
                    <span>→</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Banner */}
        <div className="p-5 bg-white border border-[#dec9b6] rounded-3xl shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-[#80141d] text-white flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-2xl">verified_user</span>
            </div>
            <div className="space-y-0.5">
              <h4 className="font-serif font-bold text-sm text-[#2b1b15]">
                Ban Thẩm Định &amp; Hội Đồng Trưởng Lão Trực Lăng
              </h4>
              <p className="text-xs text-[#6b584d]">
                Quy chuẩn 12 biểu lễ tâm linh toàn tộc đã hoàn tất và ban hành trực tiếp tới 7 chi
                phái.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <button
              type="button"
              onClick={() => alert('Đang tải cẩm nang toàn tập PDF...')}
              className="px-4 py-2 rounded-xl bg-[#faefe3] hover:bg-[#eed9be] text-[#734c13] text-xs font-bold transition-colors border border-[#dec9b6] flex items-center gap-1.5 cursor-pointer"
            >
              <span className="material-symbols-outlined text-sm">download</span>
              <span>Tải Toàn Tập PDF</span>
            </button>
            <button
              type="button"
              onClick={() => alert('Mở tra cứu tự điển ý điển lễ...')}
              className="px-4 py-2 rounded-xl bg-[#80141d] hover:bg-[#681017] text-white text-xs font-bold transition-all shadow-sm flex items-center gap-1.5 cursor-pointer"
            >
              <span className="material-symbols-outlined text-sm">book</span>
              <span>Tự Điển Ý Điển Lễ</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default RitualHandbookScreen;
