import React, { useState } from 'react';
import type { ScreenType } from '../../types.ts';

interface ClanChronicleTimelineScreenProps {
  onNavigate: (screen: ScreenType) => void;
}

export const ClanChronicleTimelineScreen: React.FC<ClanChronicleTimelineScreenProps> = ({
  onNavigate,
}) => {
  const [selectedEra, setSelectedEra] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  return (
    <div className="w-full min-h-screen bg-[#fcf8f2] text-[#2b1b15] font-sans pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 space-y-6">
        {/* Breadcrumb & Top Actions */}
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
            <span className="text-[#80141d] font-semibold">Biên Niên Sử Cột Mốc</span>
            <span>›</span>
            <span className="text-[#6b584d]">Chi Trực Lăng</span>
          </div>

          <div className="flex items-center gap-2 text-xs text-[#8a6f62]">
            <span>Bảo chứng: Ban Trị Sự Đại Tộc</span>
            <span>•</span>
            <span className="text-[#80141d] font-semibold">Cập nhật: Tiết Đông Chí 2024</span>
          </div>
        </div>

        {/* Title Header with Add Button */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#faefe3] text-[#80141d] text-[11px] font-bold tracking-wider uppercase border border-[#dec9b6]/60">
              <span className="material-symbols-outlined text-sm">history</span>
              <span>Kỷ Phả &amp; Điển Cố Tiền Liệt</span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-[#80141d] tracking-tight">
              Dòng Thời Gian Cột Mốc &amp; Dấu Ấn Tiền Nhân
            </h1>
            <p className="text-xs sm:text-sm text-[#6b584d] max-w-4xl leading-relaxed">
              Biên niên sử số hóa lưu giữ từng biến cố, vinh hiển và dấu mốc định cư của Đại Tộc
              Nguyễn Phục Anh qua 5 thế kỷ. Mọi tư liệu đều được đối chiếu cẩn trọng với sắc phong,
              văn bia và thủ bản gia ký tại Từ Đường.
            </p>
          </div>

          <button
            type="button"
            onClick={() => onNavigate('them-cot-moc')}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#80141d] hover:bg-[#681017] text-white font-bold text-xs shadow-sm transition-all cursor-pointer shrink-0"
          >
            <span className="material-symbols-outlined text-sm">add</span>
            <span>+ Khởi Ghi Cột Mốc Mới</span>
          </button>
        </div>

        {/* Search Bar & Era Tabs */}
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
                placeholder="Tìm kiếm niên hiệu, nhân vật, sự kiện, văn bia..."
                className="w-full bg-white border border-[#dec9b6] rounded-xl pl-10 pr-4 py-2 text-xs font-medium text-[#2b1b15] focus:outline-none focus:border-[#80141d]"
              />
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => alert('Mở bộ lọc thể loại điển cố...')}
                className="px-3.5 py-2 rounded-xl bg-white border border-[#dec9b6] text-xs font-semibold text-[#4a362f] hover:bg-[#faefe3] transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
              >
                <span className="material-symbols-outlined text-sm">filter_alt</span>
                <span>Lọc Thể Loại ▾</span>
              </button>
              <button
                type="button"
                onClick={() => alert('Đang tạo và tải bản in PDF phả ký...')}
                className="px-3.5 py-2 rounded-xl bg-white border border-[#dec9b6] text-xs font-semibold text-[#4a362f] hover:bg-[#faefe3] transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
              >
                <span className="material-symbols-outlined text-sm">picture_as_pdf</span>
                <span>Xuất Gia Phả PDF</span>
              </button>
            </div>
          </div>

          {/* Era Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
            {[
              { id: 'all', label: 'Tất cả niên thời kỳ (1682 - 2024)' },
              { id: 'origin', label: 'Thời Khởi Dựng (1682 - 1800)' },
              { id: 'nguyen', label: 'Thời Triều Nguyễn & Cận Đại (1801 - 1945)' },
              { id: 'war', label: 'Thời Kháng Chiến & Đổi Mới (1946 - 2000)' },
              { id: 'modern', label: 'Thời Hiện Đại (2001 - Nay)' },
            ].map((era) => {
              const isActive = selectedEra === era.id;
              return (
                <button
                  key={era.id}
                  type="button"
                  onClick={() => setSelectedEra(era.id)}
                  className={`px-3.5 py-1.5 rounded-full font-medium whitespace-nowrap transition-colors border cursor-pointer ${
                    isActive
                      ? 'bg-[#80141d] text-white border-[#80141d] shadow-2xs font-semibold'
                      : 'bg-white text-[#6b584d] border-[#dec9b6] hover:border-[#c9892c]'
                  }`}
                >
                  {era.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* 2 Columns: Timeline (8 cols) + Right Info Widgets (4 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-2">
          {/* Timeline Column */}
          <div className="lg:col-span-8 relative">
            {/* Timeline Vertical Line */}
            <div className="absolute left-4 top-4 bottom-4 w-0.5 bg-[#dec9b6]" />

            <div className="space-y-8 pl-10 relative">
              {/* Item 1: 2024 */}
              <div className="relative">
                <div className="absolute -left-[30px] top-1.5 w-4 h-4 rounded-full bg-[#80141d] border-2 border-white shadow-sm ring-4 ring-[#faeed9]" />

                <div className="bg-white rounded-3xl border border-[#dec9b6] p-6 shadow-2xs space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-serif font-bold text-base text-[#80141d]">2024</span>
                      <span className="px-2 py-0.5 rounded-md bg-[#faeed9] text-[#734c13] text-[10px] font-bold border border-[#dec9b6]">
                        Giáp Thìn
                      </span>
                      <span className="px-2 py-0.5 rounded-md bg-[#faefe3] text-[#80141d] text-[10px] font-bold border border-[#dec9b6]">
                        Kỷ niệm trùng tu Khởi công Thư Viện
                      </span>
                    </div>
                    <span className="text-[11px] text-[#8a6f62]">Lễ Thượng Lương</span>
                  </div>

                  <h3 className="font-serif font-bold text-base text-[#2b1b15] leading-snug">
                    Khởi công xây dựng Thư viện Di sản số dòng họ Nguyễn Trực
                  </h3>

                  <p className="text-xs text-[#6b584d] leading-relaxed">
                    Được sự đồng thuận của toàn bộ 7 chi phái, Đại Tộc Nguyễn Phục Anh chính thức
                    đặt đá khởi công dự án số hóa toàn bộ kho tàng sắc phong, văn tự cổ chữ Hán Nôm
                    và gia phả các đời; đồng thời xây dựng tại khuôn viên phía đông nhà thờ đường
                    chi Trực Lăng.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="rounded-2xl overflow-hidden border border-[#dec9b6] relative h-36">
                      <img
                        src="/images/hero_family.jpg"
                        alt="Lễ dâng trà"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/60 text-white text-[10px]">
                        Lễ dâng trà kính cáo
                      </div>
                    </div>
                    <div className="rounded-2xl overflow-hidden border border-[#dec9b6] relative h-36">
                      <img
                        src="/images/ancestor_portrait.jpg"
                        alt="Hội nghị thẩm định"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/60 text-white text-[10px]">
                        Hội nghị thẩm định bản số
                      </div>
                    </div>
                  </div>

                  {/* Document Box */}
                  <div className="p-3 bg-[#faefe3]/60 border border-[#dec9b6] rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-2.5">
                      <span className="material-symbols-outlined text-[#80141d] text-2xl">
                        description
                      </span>
                      <div>
                        <div className="font-bold text-[#2b1b15]">
                          Ban_Giao_Hoi_Dong_Toc_Bieu_2024.pdf
                        </div>
                        <div className="text-[10px] text-[#8a6f62]">
                          Tư liệu đính kèm: 42 trang — Đã xác thực số — 12.8 MB
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => onNavigate('phan-tich-but-tich')}
                      className="px-3.5 py-1.5 rounded-lg bg-white border border-[#dec9b6] text-xs font-semibold text-[#80141d] hover:bg-[#faefe3] transition-colors cursor-pointer shrink-0"
                    >
                      Xem Văn Bản
                    </button>
                  </div>
                </div>
              </div>

              {/* Item 2: 1999 */}
              <div className="relative">
                <div className="absolute -left-[30px] top-1.5 w-4 h-4 rounded-full bg-[#c9892c] border-2 border-white shadow-sm ring-4 ring-[#faeed9]" />

                <div className="bg-white rounded-3xl border border-[#dec9b6] p-6 shadow-2xs space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-serif font-bold text-base text-[#80141d]">1999</span>
                      <span className="px-2 py-0.5 rounded-md bg-[#faeed9] text-[#734c13] text-[10px] font-bold border border-[#dec9b6]">
                        Kỷ Mão
                      </span>
                      <span className="px-2 py-0.5 rounded-md bg-[#faefe3] text-[#80141d] text-[10px] font-bold border border-[#dec9b6]">
                        Đại lễ khánh thành nhà thờ họ
                      </span>
                    </div>
                    <span className="text-[11px] text-[#8a6f62]">Tiết Trung Thu (15/8 Âm Lịch)</span>
                  </div>

                  <h3 className="font-serif font-bold text-base text-[#2b1b15] leading-snug">
                    Đại lễ Khánh thành Từ đường chi phái Trực Lăng sau 3 năm trùng tu quy mô lớn
                  </h3>

                  <p className="text-xs text-[#6b584d] leading-relaxed">
                    Sau hơn 3 năm vận động công đức bà con nội ngoại các miền và kiều bào hải ngoại,
                    ngôi Từ đường 5 gian 2 chái bằng gỗ lim đã hoàn tất việc dựng lại đúng quy cách cổ
                    truyền thời Hậu Lê. Văn bia đá sa thạch cao 1m80 được khắc dựng lại trên đường
                    ghi danh 208 vị tiền công.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="rounded-2xl overflow-hidden border border-[#dec9b6] relative h-36">
                      <img
                        src="/images/relic_medals.jpg"
                        alt="Tế lễ khánh thành"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/60 text-white text-[10px]">
                        Tế lễ khánh thành 1999
                      </div>
                    </div>

                    <div className="p-4 bg-[#fdfaf5] border border-[#dec9b6] rounded-2xl flex flex-col justify-between text-xs space-y-2">
                      <div className="space-y-1">
                        <div className="text-[10px] font-bold text-[#80141d] uppercase tracking-wider">
                          Trích Văn Bia Khắc Sáng Cổ Tự
                        </div>
                        <p className="font-serif italic text-xs text-[#2b1b15] leading-relaxed">
                          “Cây có cội mới nở cành xanh lá, nước có nguồn mới biển rộng sông dài.
                          Nghìn năm cội đức tiền tổ vun đắp, vạn thuở con cháu bái đáp lưu hương.”
                        </p>
                      </div>
                      <div className="text-[10px] text-[#8a6f62]">
                        Khắc bia: Do Trưởng Tộc Nguyễn Trực Viễn (Đời thứ 10)
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Item 3: 1954 */}
              <div className="relative">
                <div className="absolute -left-[30px] top-1.5 w-4 h-4 rounded-full bg-[#80141d] border-2 border-white shadow-sm ring-4 ring-[#faeed9]" />

                <div className="bg-white rounded-3xl border border-[#dec9b6] p-6 shadow-2xs space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-serif font-bold text-base text-[#80141d]">1954</span>
                      <span className="px-2 py-0.5 rounded-md bg-[#faeed9] text-[#734c13] text-[10px] font-bold border border-[#dec9b6]">
                        Giáp Ngọ
                      </span>
                      <span className="px-2 py-0.5 rounded-md bg-[#faefe3] text-[#80141d] text-[10px] font-bold border border-[#dec9b6]">
                        Gìn trọn hoành phi Cụ Cố
                      </span>
                    </div>
                    <span className="text-[11px] text-[#8a6f62]">Mùa Thu 1954</span>
                  </div>

                  <h3 className="font-serif font-bold text-base text-[#2b1b15] leading-snug">
                    Đoàn tụ gia đình và phục dựng lại hoành phi câu đối sau thời gian sơ tán
                  </h3>

                  <p className="text-xs text-[#6b584d] leading-relaxed">
                    Hòa bình lập lại, các gia đình từ vùng tản cư Thái Bình, Hà Nam hồi quy trở về bản
                    quán Trực Ninh cổ. Dãy đại tự cổ "Ẩm Thủy Tư Nguyên" chôn giấu dưới đáy chum gạo
                    suốt 8 năm chiến tranh được đào lên nguyên vẹn, sơn son thếp vàng lại và treo
                    lên gian giữa.
                  </p>

                  <div className="p-4 bg-[#faefe3]/70 border-l-4 border-[#80141d] rounded-r-2xl space-y-1.5">
                    <div className="flex items-center justify-between text-[10px] font-bold text-[#80141d] uppercase tracking-wider">
                      <span>Ghi Chép Từ Nhật Ký Chi Tộc 1954</span>
                      <span className="text-[#8a6f62]">Địa danh: Đồn điền Lệ Trực</span>
                    </div>
                    <p className="font-serif italic text-xs text-[#2b1b15] leading-relaxed">
                      “... Tạ ơn tiền nhân che chở, ngôi làng vẫn còn dẫu bom đạn nghiêng ngả, điều
                      trân quý nhất là bốn tấm hoành phi độc bản dẫu nằm sâu dưới bùn đất xóm chùa
                      vẫn nguyên màu vàng óng tựa lòng son...”
                    </p>
                  </div>
                </div>
              </div>

              {/* Item 4: 1932 */}
              <div className="relative">
                <div className="absolute -left-[30px] top-1.5 w-4 h-4 rounded-full bg-[#c9892c] border-2 border-white shadow-sm ring-4 ring-[#faeed9]" />

                <div className="bg-white rounded-3xl border border-[#dec9b6] p-6 shadow-2xs space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-serif font-bold text-base text-[#80141d]">1932</span>
                      <span className="px-2 py-0.5 rounded-md bg-[#faeed9] text-[#734c13] text-[10px] font-bold border border-[#dec9b6]">
                        Nhâm Thân
                      </span>
                      <span className="px-2 py-0.5 rounded-md bg-[#faefe3] text-[#80141d] text-[10px] font-bold border border-[#dec9b6]">
                        Kỳ Khoa Cử Cuối Cùng
                      </span>
                    </div>
                    <span className="text-[11px] text-[#8a6f62]">
                      Khoa thi Hương cuối thời kỳ giao thời
                    </span>
                  </div>

                  <h3 className="font-serif font-bold text-base text-[#2b1b15] leading-snug">
                    Cụ Nguyễn Văn Phúc đỗ Sơ khảo Hán học tại Trường Quốc học Nam Định
                  </h3>

                  <p className="text-xs text-[#6b584d] leading-relaxed">
                    Cụ Cố Nguyễn Văn Phúc (Đời thứ 8) được vinh danh trong kỳ sát hạch kinh điển Hán
                    học và Pháp văn. Sau này cụ gắn bó trọn đời phụng sự việc họ, mở trường dạy chữ
                    miễn phí cho con em nghèo trong làng ven bờ đê sông Đáy.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="rounded-2xl overflow-hidden border border-[#dec9b6] relative h-36">
                      <img
                        src="/images/ancestor_portrait.jpg"
                        alt="Cụ Cố thời trẻ"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/60 text-white text-[10px]">
                        Cụ Cố Nguyễn Văn Phúc thời trẻ
                      </div>
                    </div>
                    <div className="rounded-2xl overflow-hidden border border-[#dec9b6] relative h-36">
                      <img
                        src="/images/relic_book.jpg"
                        alt="Bằng tốt nghiệp"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/60 text-white text-[10px]">
                        Bản scan bằng tốt nghiệp cổ
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Item 5: 1865 */}
              <div className="relative">
                <div className="absolute -left-[30px] top-1.5 w-4 h-4 rounded-full bg-[#80141d] border-2 border-white shadow-sm ring-4 ring-[#faeed9]" />

                <div className="bg-white rounded-3xl border border-[#dec9b6] p-6 shadow-2xs space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-serif font-bold text-base text-[#80141d]">1865</span>
                      <span className="px-2 py-0.5 rounded-md bg-[#faeed9] text-[#734c13] text-[10px] font-bold border border-[#dec9b6]">
                        Tự Đức thứ 18
                      </span>
                      <span className="px-2 py-0.5 rounded-md bg-[#faefe3] text-[#80141d] text-[10px] font-bold border border-[#dec9b6]">
                        Sắc Phong Hoàng Triều
                      </span>
                    </div>
                    <span className="text-[11px] text-[#8a6f62]">Tháng 8 Canh Tuất</span>
                  </div>

                  <h3 className="font-serif font-bold text-base text-[#2b1b15] leading-snug">
                    Tiếp nhận Sắc phong triều đình ban cho Tổ tiên vì công lao trị thủy đắp đê sông
                    Đáy
                  </h3>

                  <p className="text-xs text-[#6b584d] leading-relaxed">
                    Vua Tự Đức ngự ban sắc phong ghi nhận công tôn Tiền nhân Nguyễn Trực Nghiêm sung
                    trợ dân đồn điền đắp ngày đêm hộ đê ngăn đợt nước lũ lớn tại ngã ba sông Đáy, bảo
                    toàn mùa màng và xóm làng khỏi trận lụt can qua mùa thu năm Ất Sửu. Sắc phong
                    giấy hoàng chỉ viền rồng vẹn sắc son nguyên gốc hiện phụng thờ tại Từ đường.
                  </p>

                  <div className="p-4 bg-[#faefe3]/50 border border-[#dec9b6] rounded-2xl flex flex-col sm:flex-row items-center gap-4">
                    <img
                      src="/images/relic_box.jpg"
                      alt="Sắc phong"
                      className="w-24 h-24 rounded-xl object-cover border border-[#dec9b6] shrink-0"
                    />
                    <div className="space-y-1.5 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-[#80141d]">
                          Di vật Cổ: Truyền Hạng Nhất
                        </span>
                        <span className="text-[10px] text-[#8a6f62]">Mã bảo vật: SP-1865-TE</span>
                      </div>
                      <p className="text-[11px] text-[#6b584d] leading-relaxed">
                        Tiếp nhận trực tiếp sắc phong cổ rồng lượn quy phụng &amp; Dấu tiếp giáp sắc
                        phong vua nguyên bản. Tình trạng bảo tồn: 92% (Được bao bọc trong túi lĩnh
                        sợi chứa chống ẩm chuyên dụng).
                      </p>
                      <div className="flex items-center gap-2 pt-1">
                        <button
                          type="button"
                          onClick={() => onNavigate('chi-tiet-gia-bao')}
                          className="px-3 py-1 rounded-lg bg-white border border-[#dec9b6] text-[11px] font-semibold text-[#4a362f] hover:bg-[#faefe3] cursor-pointer"
                        >
                          Xem Ảnh Lập Phân Giải Cao
                        </button>
                        <button
                          type="button"
                          onClick={() => onNavigate('phan-tich-but-tich')}
                          className="px-3 py-1 rounded-lg bg-[#80141d] text-white text-[11px] font-semibold hover:bg-[#681017] cursor-pointer"
                        >
                          Bản Dịch Nghĩa Chữ Nho
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Ancient Founder Box */}
            <div className="mt-8 p-5 bg-[#faefe3]/80 border border-[#dec9b6] rounded-3xl text-center space-y-1.5">
              <span className="w-8 h-8 rounded-full bg-[#80141d] text-white flex items-center justify-center mx-auto text-sm">
                temple_buddhist
              </span>
              <div className="font-serif font-bold text-sm text-[#80141d]">
                Thời Khởi Tổ: 1682 (Nhâm Tuất)
              </div>
              <p className="text-xs text-[#6b584d] max-w-lg mx-auto leading-relaxed">
                Cụ Khởi Tổ Nguyễn Phúc Khởi cùng nghĩa quân dừng chân khẩn hoang lập ấp tại vùng đất
                Trực Lăng, biến vùng bãi bồi ven biển thành điền trang trù phú cho tiền nhân.
              </p>
            </div>
          </div>

          {/* Right Column: Widgets */}
          <div className="lg:col-span-4 space-y-6">
            {/* Widget 1: Thống Kê Biên Niên */}
            <div className="bg-white rounded-3xl border border-[#dec9b6] p-5 shadow-2xs space-y-4">
              <div className="flex items-center justify-between border-b border-[#dec9b6]/30 pb-2.5">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#80141d] text-base">
                    auto_graph
                  </span>
                  <h3 className="font-serif font-bold text-xs uppercase tracking-wider text-[#2b1b15]">
                    Thống Kê Biên Niên
                  </h3>
                </div>
                <span className="text-[10px] font-bold text-[#8a6f62]">Toàn Tộc</span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-[#faefe3]/50 border border-[#dec9b6] rounded-2xl text-center">
                  <div className="text-3xl font-serif font-bold text-[#80141d]">5</div>
                  <div className="text-[10px] text-[#6b584d] mt-0.5">
                    Thế kỷ Truyền Thừa qua các mốc qua
                  </div>
                </div>
                <div className="p-3 bg-[#faefe3]/50 border border-[#dec9b6] rounded-2xl text-center">
                  <div className="text-3xl font-serif font-bold text-[#80141d]">48</div>
                  <div className="text-[10px] text-[#6b584d] mt-0.5">
                    Cột mốc Trọng đại Đã được chứng thực
                  </div>
                </div>
              </div>

              {/* Progress bars */}
              <div className="space-y-2.5 pt-1 text-xs">
                <div className="text-[10px] font-bold text-[#8a6f62] uppercase tracking-wider">
                  Phân bổ tư liệu qua các triều đại:
                </div>

                <div>
                  <div className="flex justify-between text-[11px] py-0.5">
                    <span className="text-[#2b1b15]">Khởi Dựng (1682 - 1800)</span>
                    <span className="font-bold text-[#80141d]">12%</span>
                  </div>
                  <div className="w-full h-1.5 bg-[#faefe3] rounded-full overflow-hidden">
                    <div className="h-full bg-[#80141d] rounded-full w-[12%]" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[11px] py-0.5">
                    <span className="text-[#2b1b15]">Triều Nguyễn (1801 - 1945)</span>
                    <span className="font-bold text-[#c9892c]">32%</span>
                  </div>
                  <div className="w-full h-1.5 bg-[#faefe3] rounded-full overflow-hidden">
                    <div className="h-full bg-[#c9892c] rounded-full w-[32%]" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[11px] py-0.5">
                    <span className="text-[#2b1b15]">Kháng Chiến (1946 - 2000)</span>
                    <span className="font-bold text-[#5c4033]">34%</span>
                  </div>
                  <div className="w-full h-1.5 bg-[#faefe3] rounded-full overflow-hidden">
                    <div className="h-full bg-[#5c4033] rounded-full w-[34%]" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[11px] py-0.5">
                    <span className="text-[#2b1b15]">Hiện Đại (2001 - Nay)</span>
                    <span className="font-bold text-emerald-700">18%</span>
                  </div>
                  <div className="w-full h-1.5 bg-[#faefe3] rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-700 rounded-full w-[18%]" />
                  </div>
                </div>
              </div>
            </div>

            {/* Widget 2: Tháng Này Năm Xưa */}
            <div className="bg-white rounded-3xl border border-[#dec9b6] p-5 shadow-2xs space-y-3">
              <div className="flex items-center justify-between border-b border-[#dec9b6]/30 pb-2">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#80141d] text-base">today</span>
                  <h3 className="font-serif font-bold text-xs uppercase tracking-wider text-[#2b1b15]">
                    Tháng Này Năm Xưa
                  </h3>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-[#faefe3] text-[#80141d] text-[9px] font-bold">
                  CÙNG THỜI KỲ
                </span>
              </div>

              <div className="text-[10px] font-bold text-[#80141d] uppercase tracking-wider">
                24 Tháng Chạp năm 1912 (112 NĂM TRƯỚC)
              </div>
              <p className="text-xs text-[#6b584d] leading-relaxed">
                Lễ Thượng Lương (gác đòn dông) ngôi Từ đường Tiền tế Chi Trực Lăng. Toàn bộ đinh
                đồng tụ họp 8 người nhắc chỏm bồi mình của quả cầu thời đao an vị gia tộc hưng
                thịnh lưu truyền từ ngày nay.
              </p>

              <button
                type="button"
                onClick={() => onNavigate('tu-sach-gia-phong')}
                className="text-xs font-bold text-[#80141d] hover:underline flex items-center gap-1 cursor-pointer pt-1"
              >
                <span>Đọc toàn bộ tư liệu sự kiện</span>
                <span>→</span>
              </button>
            </div>

            {/* Widget 3: Lưu Trữ Văn Bản Gốc */}
            <div className="bg-white rounded-3xl border border-[#dec9b6] p-5 shadow-2xs space-y-3.5">
              <div className="flex items-center gap-2 border-b border-[#dec9b6]/30 pb-2.5">
                <span className="material-symbols-outlined text-[#80141d] text-base">archive</span>
                <h3 className="font-serif font-bold text-xs uppercase tracking-wider text-[#2b1b15]">
                  Lưu Trữ Văn Bản Gốc
                </h3>
              </div>

              <div className="space-y-1">
                <div className="text-[11px] font-bold text-[#80141d]">
                  Di sản Tự viện Hậu Duệ (Tủ Đồ Cổ)
                </div>
                <p className="text-[11px] text-[#6b584d] leading-relaxed">
                  Các bản vật gốc, sắc phong và bản dập văn bia được bảo quản trang trọng tại Căn
                  Thất Hậu Lăng — Nhà Từ Đường Đại Tộc Nguyễn Phục Anh (Thôn Trực Lăng, Nam Định).
                </p>
              </div>

              <div className="space-y-2 text-xs text-[#2b1b15]">
                <div className="flex items-start gap-2">
                  <span className="text-[#c9892c]">✓</span>
                  <span className="text-[11px]">Quy chế tiếp cận tư liệu mật</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-[#c9892c]">✓</span>
                  <span className="text-[11px]">
                    Chỉ mở tiếp xúc vật xưng khi giỗ tổ mồng 10 tháng Giêng.
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-[#c9892c]">✓</span>
                  <span className="text-[11px]">
                    Thành viên nội tộc có giấy giới thiệu của Ban Trị Sự dòng họ.
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-[#c9892c]">✓</span>
                  <span className="text-[11px]">
                    Bản số hóa chuẩn xác được tra cứu tự do qua ứng dụng.
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => alert('Mở phụ lục chứng thực...')}
                  className="py-2 px-2.5 rounded-xl border border-[#dec9b6] bg-[#fdfaf5] hover:bg-[#faefe3] text-[10px] font-semibold text-[#4a362f] transition-colors cursor-pointer text-center"
                >
                  Phụ lục: Cụ Thao ký
                </button>
                <button
                  type="button"
                  onClick={() => alert('Đặt lịch đến thăm từ đường trực tiếp')}
                  className="py-2 px-2.5 rounded-xl bg-[#80141d] hover:bg-[#681017] text-[10px] font-bold text-white transition-colors cursor-pointer text-center"
                >
                  Lên Lịch Đến Tự
                </button>
              </div>
            </div>

            {/* Widget 4: Bổ Sung Điển Cố Chi Tộc */}
            <div className="p-5 bg-[#faefe3]/70 border border-[#dec9b6] rounded-3xl space-y-3">
              <h3 className="font-serif font-bold text-xs uppercase tracking-wider text-[#80141d]">
                Bổ Sung Điển Cố Chi Tộc
              </h3>
              <p className="text-[11px] text-[#6b584d] leading-relaxed">
                Nếu gia đình quý vị nắm lưu giữ thư tịch cổ, ảnh gia đình thời chiến hoặc câu chuyện
                truyền khẩu về tiền nhân, xin vui lòng gửi về Hội đồng Biên tập để cẩn duyệt số hóa
                phả ký.
              </p>
              <button
                type="button"
                onClick={() => onNavigate('them-cot-moc')}
                className="w-full py-2.5 px-3 rounded-xl bg-[#faeed9] border border-[#dec9b6] hover:bg-[#eed9be] text-xs font-bold text-[#734c13] transition-colors cursor-pointer text-center"
              >
                Gửi Trình Sự Kiện Cần Khảo Cứu
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ClanChronicleTimelineScreen;
