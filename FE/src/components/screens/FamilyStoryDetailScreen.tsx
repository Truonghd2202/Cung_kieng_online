import React, { useState } from 'react';
import type { ScreenType } from '../../types.ts';

interface FamilyStoryDetailScreenProps {
  onNavigate: (screen: ScreenType) => void;
}

export const FamilyStoryDetailScreen: React.FC<FamilyStoryDetailScreenProps> = ({
  onNavigate,
}) => {
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const [pledgeName, setPledgeName] = useState<string>('Nguyễn Trực Nam (bạn)');
  const [pledgeBranch, setPledgeBranch] = useState<string>('Đời thứ 12 - Chi 2');
  const [pledgeJob, setPledgeJob] = useState<string>('Kỹ sư mạng & phần cứng');
  const [pledgeContent, setPledgeContent] = useState<string>(
    'Viết lời tâm nguyện giữ trọn chữ Tín trong công việc, giao thương và học tập để xứng danh người con họ Nguyễn Phục...'
  );
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [pledges, setPledges] = useState([
    {
      id: 'p1',
      branchTag: 'ĐỜI THỨ 12 (CHI 2 NHÁNH TRƯỞNG)',
      timeAgo: '15 tháng trước',
      quote:
        '“Đọc câu chuyện mà rơi nước mắt vì tự hào. Nhớ lời dạy của Cụ Cố, tôi luôn nhắc nhở bản thân sống chuẩn mực, liêm khiết trong cương vị lãnh đạo và trung thực với công việc, giữ gìn uy tín danh gia vọng tộc.”',
      author: 'Nguyễn Trực Nam',
      role: 'Phó Giám đốc Viện Công nghệ',
      initial: 'N',
      initialBg: 'bg-[#80141d] text-white',
    },
    {
      id: 'p2',
      branchTag: 'ĐỜI THỨ 13 (NGÀNH THỨ HAI)',
      timeAgo: '11 tháng trước',
      quote:
        '“Chữ Tín của Cụ là ngọn đuốc soi đường. Trong khởi nghiệp công nghệ, triết lý "Thất tín nhất thời, vạn đại nan dung" luôn là tôn chỉ trong kinh doanh, giữ trọn chữ tín với khách hàng và đối tác.”',
      author: 'Nguyễn Thanh Huyền',
      role: 'Giám đốc Điều hành Công ty Y Dược',
      initial: 'H',
      initialBg: 'bg-[#faeed9] text-[#734c13]',
    },
    {
      id: 'p3',
      branchTag: 'ĐỜI THỨ 13 (CHI GIÁP)',
      timeAgo: '08 tháng trước',
      quote:
        '“Dù bôn ba xứ người làm việc ở nước ngoài, tôi luôn ghi tạc lời dạy của Cụ Cố, dặn con cháu gìn giữ nếp nhà, sống chân chính và có trách nhiệm với quê hương dòng họ.”',
      author: 'Nguyễn Trọng Tân',
      role: 'Chuyên viên Tài chính - Berlin',
      initial: 'T',
      initialBg: 'bg-[#5c4033] text-white',
    },
  ]);

  const handlePledgeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pledgeContent.trim()) return;

    const newPledge = {
      id: `p-${Date.now()}`,
      branchTag: `${pledgeBranch.toUpperCase()} • Vừa xong`,
      timeAgo: 'Vừa xong',
      quote: `“${pledgeContent}”`,
      author: pledgeName.replace('(bạn)', '').trim(),
      role: pledgeJob,
      initial: 'B',
      initialBg: 'bg-[#80141d] text-white',
    };

    setPledges([newPledge, ...pledges]);
    setPledgeContent('');
    setToastMessage('Đã khắc ghi lời hứa chữ Tín vào gia huấn điện tử của dòng họ!');
    setTimeout(() => setToastMessage(null), 3000);
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
        {/* Breadcrumb & Subheader */}
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
            <button
              type="button"
              onClick={() => onNavigate('tu-sach-gia-phong')}
              className="hover:text-[#80141d] transition-colors cursor-pointer"
            >
              Thư Viện Gia Trí
            </button>
            <span>›</span>
            <span className="text-[#80141d] font-semibold truncate max-w-md">
              Câu Chuyện: Đồng Hồ Quả Quýt Cụ Nguyễn Văn Phúc
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <button
              type="button"
              onClick={() => alert('Đã lưu bài viết vào mục yêu thích!')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-[#dec9b6] text-xs font-semibold text-[#4a362f] hover:bg-[#faefe3] transition-colors cursor-pointer shadow-2xs"
            >
              <span className="material-symbols-outlined text-sm">bookmark</span>
              <span>Lưu Bài Viết</span>
            </button>
            <button
              type="button"
              onClick={() => alert('Mở chế độ đọc thuần bản in phả ký...')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#faefe3] border border-[#dec9b6] text-xs font-semibold text-[#80141d] hover:bg-[#f5dbcf] transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-sm">print</span>
              <span>Mở Bản Đọc In Ấn</span>
            </button>
          </div>
        </div>

        {/* Title Header */}
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-md bg-[#faefe3] text-[#80141d] text-[10px] font-bold tracking-wider uppercase border border-[#dec9b6]/60">
              Gia Huấn Truyền Đời
            </span>
            <span className="px-2.5 py-0.5 rounded-md bg-[#faeed9] text-[#734c13] text-[10px] font-semibold border border-[#dec9b6]">
              Đã Xác Thực Lịch Sử
            </span>
            <span className="text-[11px] text-[#8a6f62]">• Thời lượng đọc: 7 phút</span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-[#80141d] tracking-tight leading-tight">
            Chiếc Đồng Hồ Quả Quýt Và Lời Răn Về Chữ Tín Trọn Đời
          </h1>

          <p className="text-xs sm:text-sm text-[#6b584d] max-w-4xl leading-relaxed">
            Hành trình vươn qua giông bão năm Nhâm Ngọ 1942, nếp nghĩ và lời dặn khắc cốt ghi tâm
            về đạo đức sản nghiệp và uy tín tiền nhân để bảo vệ vẹn nguyên một lời hẹn ước cứu đói
            dân nghèo.
          </p>
        </div>

        {/* Deep Crimson Motto Box */}
        <div className="p-6 bg-[#80141d] text-white rounded-3xl shadow-md space-y-3 relative overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div className="space-y-1.5 max-w-3xl">
              <div className="text-[10px] font-bold uppercase tracking-widest text-[#faeed9]">
                Lời Tiền Nhân Huấn Dạy Tộc Quy (Tính Nhượng)
              </div>
              <div className="font-serif italic text-xl sm:text-2xl font-bold text-white tracking-tight">
                “Thất tín nhất thời, vạn đại nan dung”
              </div>
              <p className="text-xs sm:text-sm text-white/90 leading-relaxed font-serif">
                — Một lần bất tín, ngàn thu hổ thẹn. Lương quang có thể vơi bớt rồi tích lũy lại, nhưng
                danh tiết gia phong một khi thối rữa thì dòng dõi trăm năm mang tiếng ngàn đời.
              </p>
            </div>

            <div className="p-3 bg-white/10 backdrop-blur-xs border border-white/20 rounded-2xl text-xs space-y-1 shrink-0 self-start">
              <div className="flex items-center gap-1.5 text-[#faeed9] text-[10px] uppercase font-bold tracking-wider">
                <span className="material-symbols-outlined text-sm">key</span>
                <span>Ẩn nơi sau nắp khắc:</span>
              </div>
              <div className="font-bold text-white">"Tín Nghĩa Nhất Tự"</div>
              <div className="text-[10px] text-white/75">
                Khắc sau nắp vỏ của đồng hồ OMEGA chi Trực Lăng (1922)
              </div>
            </div>
          </div>
          <div className="absolute right-3 -bottom-6 text-white/10 select-none text-9xl font-serif pointer-events-none">
            信
          </div>
        </div>

        {/* 4 Metadata Boxes Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="p-3.5 bg-white border border-[#dec9b6] rounded-2xl shadow-2xs">
            <span className="text-[#8a6f62] block text-[10px] uppercase font-bold tracking-wider">
              Nhân vật lịch sử
            </span>
            <span className="font-bold text-xs text-[#2b1b15] block mt-0.5">
              Cụ Cố Nguyễn Văn Phúc
            </span>
            <span className="text-[10px] text-[#80141d]">1896 - 1980 • Đời thứ 10</span>
          </div>

          <div className="p-3.5 bg-white border border-[#dec9b6] rounded-2xl shadow-2xs">
            <span className="text-[#8a6f62] block text-[10px] uppercase font-bold tracking-wider">
              Người kể lại
            </span>
            <span className="font-bold text-xs text-[#2b1b15] block mt-0.5">
              Nguyễn Trực Viễn
            </span>
            <span className="text-[10px] text-[#8a6f62]">Trưởng Tộc Đời 11 • Cháu đích tôn</span>
          </div>

          <div className="p-3.5 bg-white border border-[#dec9b6] rounded-2xl shadow-2xs">
            <span className="text-[#8a6f62] block text-[10px] uppercase font-bold tracking-wider">
              Biến cố lịch sử
            </span>
            <span className="font-bold text-xs text-[#2b1b15] block mt-0.5">
              Thu Mãn Nhâm Ngọ 1942
            </span>
            <span className="text-[10px] text-[#734c13]">Thời kỳ Nạn Đói Ất Dậu cận kề</span>
          </div>

          <div className="p-3.5 bg-white border border-[#dec9b6] rounded-2xl shadow-2xs">
            <span className="text-[#8a6f62] block text-[10px] uppercase font-bold tracking-wider">
              Địa danh sự kiện
            </span>
            <span className="font-bold text-xs text-[#2b1b15] block mt-0.5">
              Bến Đò Sông Vị Hoàng
            </span>
            <span className="text-[10px] text-[#8a6f62]">Tiền Thành Nam, Nam Định</span>
          </div>
        </div>

        {/* Audio Narrator Player Bar */}
        <div className="p-4 bg-white rounded-3xl border border-[#dec9b6] shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsPlayingAudio(!isPlayingAudio)}
              className="w-11 h-11 rounded-full bg-[#80141d] hover:bg-[#681017] text-white flex items-center justify-center shrink-0 shadow-sm transition-transform hover:scale-105 cursor-pointer"
            >
              <span className="material-symbols-outlined text-2xl">
                {isPlayingAudio ? 'pause' : 'play_arrow'}
              </span>
            </button>

            <div className="space-y-0.5">
              <div className="text-[10px] font-bold text-[#80141d] uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
                <span>Giọng Đọc Truyền Cảm — Phát lại từ băng ghi âm năm 1994</span>
              </div>
              <div className="text-xs font-bold text-[#2b1b15]">
                Giọng Kể Trầm Ấm Của Trưởng Tộc Nguyễn Trực Viễn
              </div>
              <div className="text-[10px] text-[#8a6f62]">
                Thời lượng: 07 phút 18 giây • Thu tại Từ Đường Chi Trực Lăng
              </div>
            </div>
          </div>

          {/* Audio Waveform */}
          <div className="flex items-center gap-3 flex-1 max-w-md">
            <span className="text-[11px] font-semibold text-[#80141d]">01:45</span>
            <div className="flex-1 h-3 bg-[#faefe3] rounded-full overflow-hidden flex items-center px-1">
              <div className="h-1.5 bg-[#80141d] rounded-full w-1/4" />
            </div>
            <span className="text-[11px] text-[#8a6f62]">07:18</span>

            <div className="flex items-center gap-1 text-[#8a6f62]">
              <button
                type="button"
                onClick={() => alert('Đang phát lại từ đầu...')}
                className="p-1 hover:text-[#2b1b15] cursor-pointer"
                title="Lặp lại"
              >
                <span className="material-symbols-outlined text-sm">replay</span>
              </button>
              <button
                type="button"
                onClick={() => alert('Chỉnh tốc độ: 1.25x')}
                className="px-1.5 py-0.5 text-[10px] font-bold rounded bg-[#fdfaf5] border border-[#dec9b6] hover:bg-[#faefe3] cursor-pointer"
                title="Tốc độ"
              >
                1.0x
              </button>
            </div>
          </div>
        </div>

        {/* 2 Columns: Main Article (8 cols) + Right Sticky Sidebar (4 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Article Content */}
          <div className="lg:col-span-8 bg-white rounded-3xl border border-[#dec9b6] p-6 sm:p-8 shadow-2xs space-y-6">
            {/* Chapter 1 */}
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-[#dec9b6]/30 pb-2">
                <h2 className="font-serif font-bold text-base text-[#80141d]">
                  Chương 1: Điểm Giằng Gió Trên Vị Hoàng Hà
                </h2>
                <span className="px-2 py-0.5 rounded-full bg-[#faefe3] text-[#80141d] text-[10px] font-bold border border-[#dec9b6]">
                  Bối Cảnh Năm 1942
                </span>
              </div>

              <p className="text-xs sm:text-sm text-[#2b1b15] leading-relaxed first-letter:float-left first-letter:text-5xl first-letter:font-serif first-letter:font-bold first-letter:text-[#80141d] first-letter:mr-3 first-letter:leading-none">
                Mùa thu năm Nhâm Ngọ 1942, ánh trăng lạnh mờ sương mang mối nghèo ngạt vừa lướt
                qua bến sông... Khi ấy, phủ Nam Định trải qua những ngày thắt ruột trước bóng ma đói
                kém chực chờ. Hàng vạn dân quê rồng rắn dắt díu nhau tìm về cửa sông kiếm củ chuối,
                hạt ngô sống qua ngày. Hiệu buôn của Cụ Cố Nguyễn Văn Phúc lúc ấy dẫu còn một lượng
                thóc lúa trong kho, nhưng đối diện với muôn vàn áp lực từ chính quyền bảo hộ và
                những lời chèo kéo trục lợi từ các phường buôn gian manh.
              </p>

              <p className="text-xs sm:text-sm text-[#4a362f] leading-relaxed">
                Bấy giờ có tay thương lái buôn thóc lậu từ mạn Phủ Lý theo thuyền ngược dòng, hay tin
                gạo bốc vọt tới bến, bèn gạ gẫm đưa cho Cụ một đống bạc trắng tương đương dăm ba mùa
                lúa để gom xé chở về Hà Nội đầu cơ với giá cao gấp bốn lần. Trong lúc túng quẫn, lại
                đứng trước bầy tư thuyền so chở đổi trắng thay đen, hai người cháu họ con chú ruột
                đứng ngơ ngác nhìn nhau khuyên Cụ gật đầu nhận bạc để tránh né rủi ro.
              </p>

              {/* Photo: Bến phà Sông Vị Hoàng */}
              <div className="rounded-2xl overflow-hidden border border-[#dec9b6] space-y-2">
                <div className="relative h-60 overflow-hidden">
                  <img
                    src="/images/hero_family.jpg"
                    alt="Bến Phà Sông Vị Hoàng"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-2 left-2 px-3 py-1 rounded-lg bg-black/75 text-white font-serif font-bold text-xs backdrop-blur-xs">
                    Bến phà Vị Hoàng (Nam Định) trong ký ức mùa thu 1942
                  </div>
                </div>
                <div className="p-3 text-[11px] text-[#8a6f62] italic bg-[#fdfaf5]">
                  Tư liệu phục chế từ Trung Tâm Lưu Trữ Quốc Gia I
                </div>
              </div>

              {/* Highlight Quote Box */}
              <div className="p-5 bg-[#faefe3]/70 border-l-4 border-[#c9892c] rounded-r-3xl space-y-2">
                <div className="text-[10px] font-bold uppercase tracking-wider text-[#80141d]">
                  Lời Trần Trục Trước Hương Lý — Tháng 10/1942
                </div>
                <p className="font-serif italic text-sm text-[#2b1b15] leading-relaxed">
                  “Ruộng đất mất đi thì con cháu có thể khai hoang cuốc xới mà gầy dựng lại. Tiền bạc
                  vơi đi thì bớt bát cơm manh áo mà tích lũy hồi sinh. Nhưng chữ Tín một khi đã bị
                  đánh tráo vì mười lăm đồng bạc bẩn, thì danh dự dòng họ muôn đời dẫu gột rửa không
                  bao giờ sạch!”
                </p>
                <div className="text-[11px] text-[#8a6f62] text-right font-medium">
                  — Trích trần chú Cụ Cố Nguyễn Văn Phúc trước hội đồng hương lý xóm đò xóm chợ
                </div>
              </div>
            </div>

            {/* Chapter 2 */}
            <div className="space-y-4 pt-2">
              <h2 className="font-serif font-bold text-base text-[#80141d] border-b border-[#dec9b6]/30 pb-2">
                Chương 2: Chiếc Kim Khắc Bạc Và Chiếc OMEGA Cầm Cố
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
                <div className="sm:col-span-2 space-y-2 text-xs sm:text-sm text-[#4a362f] leading-relaxed">
                  <p>
                    Thuyền men theo đáy cõi vù vào gõ xóc nguồn nước đục. Để thoát hiểm bến chiếu,
                    thuyền sắt cào sơ hóa vào cửa sông ngày và đưa từng bao gạo sang bên kho ứng cứu
                    xóm nhỏ; đỡ đón gạo ở ngáng dội, xóm củi thuyền đỗ ra mưa dâng tràn một làn im
                    ngợp trong đêm.
                  </p>
                  <p>
                    Cụ Cố Phúc không chút đắn đo, liền tháo chiếc đồng hồ quả quýt OMEGA bọc thép Thụy
                    Sĩ — kỷ vật duy nhất thân phụ trao lại khi đỗ đạt khoa Hán học — dẫn lên bàn
                    hương bái lạy: "Một vảy lúa cũng rạng cửa tổ, dẫu rách nát cũng vẹn nghĩa đồng
                    bào."
                  </p>
                </div>

                <div className="rounded-2xl overflow-hidden border border-[#dec9b6] bg-[#fdfaf5] p-2 text-center space-y-1">
                  <img
                    src="/images/ancestor_portrait.jpg"
                    alt="Cụ Cố"
                    className="w-full h-36 object-cover rounded-xl"
                  />
                  <div className="text-[10px] text-[#8a6f62] leading-tight">
                    Cụ Cố Nguyễn Văn Phúc thời trẻ, ký họa chụp lại năm 1942 tại Nam Định
                  </div>
                </div>
              </div>

              {/* Crimson Motto Banner */}
              <div className="p-5 bg-[#80141d] text-white rounded-2xl shadow-md space-y-2 relative overflow-hidden">
                <div className="text-[10px] font-bold uppercase tracking-widest text-[#faeed9]">
                  Lời Dặn Khắc Cốt Ghi Tâm
                </div>
                <p className="font-serif italic text-base leading-relaxed text-white/95">
                  “Con cháu dòng họ Nguyễn Phục dẫu ở chân trời góc biển nào, làm việc lớn cứu đời hay
                  buôn thúng bán bưng việc nhỏ, lời đã thốt ra phải nặng tựa thái sơn.”
                </p>
                <div className="text-xs text-[#faeed9]/80 font-medium">
                  — Lời Cụ dặn tại Từ Đường vào mùa Xuân năm 1968
                </div>
              </div>
            </div>
          </div>

          {/* Right Sticky Sidebar */}
          <div className="lg:col-span-4 space-y-6 sticky top-6">
            {/* Card 1: Kỷ Vật Truyền Thừa */}
            <div className="bg-white rounded-3xl border border-[#dec9b6] p-5 shadow-2xs space-y-3">
              <div className="flex items-center justify-between border-b border-[#dec9b6]/30 pb-2">
                <h3 className="font-serif font-bold text-xs uppercase tracking-wider text-[#2b1b15]">
                  Kỷ Vật Truyền Thừa
                </h3>
                <span className="material-symbols-outlined text-[#80141d] text-base">
                  auto_awesome
                </span>
              </div>

              <div className="relative rounded-2xl overflow-hidden border border-[#dec9b6] group h-36">
                <img
                  src="/images/relic_box.jpg"
                  alt="Đồng hồ OMEGA 1922"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="space-y-1">
                <div className="font-serif font-bold text-sm text-[#80141d]">
                  Đồng Hồ Quả Quýt OMEGA 1922
                </div>
                <div className="text-[11px] font-semibold text-[#2b1b15]">
                  Vỏ thép bọc vàng, mặt men men nung
                </div>
                <p className="text-[11px] text-[#6b584d] leading-relaxed">
                  Hiện vật bảo quản tại gian thờ Tả Từ Đường dòng họ, vẫn hoạt động chính xác và được
                  vệ sinh định kỳ ngày 25 tháng Chạp.
                </p>
              </div>

              <button
                type="button"
                onClick={() => onNavigate('chi-tiet-gia-bao')}
                className="w-full py-2.5 px-3 rounded-xl bg-[#faefe3] border border-[#dec9b6] text-xs font-bold text-[#80141d] hover:bg-[#f5dbcf] transition-colors cursor-pointer flex items-center justify-center gap-1.5"
              >
                <span className="material-symbols-outlined text-sm">view_in_ar</span>
                <span>Chiêm Ngưỡng Hiện Vật 3D Trực Tiếp</span>
              </button>
            </div>

            {/* Card 2: Vị Trí Truyền Thừa Trong Phả Hệ */}
            <div className="bg-white rounded-3xl border border-[#dec9b6] p-5 shadow-2xs space-y-3">
              <div className="flex items-center justify-between border-b border-[#dec9b6]/30 pb-2">
                <h3 className="font-serif font-bold text-xs uppercase tracking-wider text-[#2b1b15]">
                  Vị Trí Truyền Thừa Trong Phả Hệ
                </h3>
                <span className="material-symbols-outlined text-[#80141d] text-base">
                  account_tree
                </span>
              </div>

              <div className="space-y-2 text-xs">
                <div className="p-2.5 bg-[#fdfaf5] border border-[#dec9b6] rounded-xl text-[#6b584d]">
                  Cụ Khởi Tổ Nguyễn Đức Tịnh
                </div>
                <div className="p-2.5 bg-[#80141d] text-white rounded-xl font-bold flex items-center justify-between shadow-2xs">
                  <span>Cụ Cố Nguyễn Văn Phúc (Đời 10)</span>
                  <span className="text-xs">✓</span>
                </div>
                <div className="p-2.5 bg-[#fdfaf5] border border-[#dec9b6] rounded-xl text-[#6b584d]">
                  Ông Nguyễn Trực Danh (1925 - 1999)
                </div>
                <div className="p-2.5 bg-[#fdfaf5] border border-[#dec9b6] rounded-xl text-[#6b584d]">
                  Nguyễn Trực Viễn (Trưởng Tộc Đương Nhiệm)
                </div>
                <div className="p-2.5 bg-[#fdfaf5] border border-[#dec9b6] rounded-xl text-[#8a6f62] italic">
                  Thế hệ con cháu đương đại (Lớp đời thứ 12 &amp; 13)
                </div>
              </div>
            </div>

            {/* Card 3: Hành Động Phả Ký */}
            <div className="bg-white rounded-3xl border border-[#dec9b6] p-5 shadow-2xs space-y-2.5">
              <h3 className="font-serif font-bold text-xs uppercase tracking-wider text-[#2b1b15] border-b border-[#dec9b6]/30 pb-2">
                Hành Động Phả Ký
              </h3>
              <button
                type="button"
                onClick={() => alert('Đang in bản PDF chuẩn gia huấn...')}
                className="w-full py-2.5 px-3 rounded-xl bg-[#80141d] hover:bg-[#681017] text-white text-xs font-bold transition-all shadow-2xs flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span className="material-symbols-outlined text-sm">print</span>
                <span>In Bản PDF Chuẩn Gia Huấn</span>
              </button>
              <button
                type="button"
                onClick={() => alert('Đã sao chép liên kết gửi cho con cháu!')}
                className="w-full py-2 px-3 rounded-xl border border-[#dec9b6] bg-[#fdfaf5] hover:bg-[#faefe3] text-xs font-semibold text-[#4a362f] flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span className="material-symbols-outlined text-sm">share</span>
                <span>Chia Sẻ Bản Kể Đến Con Cháu</span>
              </button>
              <button
                type="button"
                onClick={() => alert('Mở form góp ý câu chuyện...')}
                className="w-full py-2 px-3 rounded-xl border border-[#dec9b6] bg-[#fdfaf5] hover:bg-[#faefe3] text-xs font-semibold text-[#4a362f] flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span className="material-symbols-outlined text-sm">mail</span>
                <span>Đóng Góp Ý Kiến Về Câu Chuyện</span>
              </button>
            </div>

            {/* Card 4: Điển Tích Liên Quan */}
            <div className="bg-white rounded-3xl border border-[#dec9b6] p-5 shadow-2xs space-y-3">
              <h3 className="font-serif font-bold text-xs uppercase tracking-wider text-[#2b1b15] border-b border-[#dec9b6]/30 pb-2">
                Điển Tích Liên Quan
              </h3>
              <div
                onClick={() => onNavigate('cau-chuyen-gia-phong')}
                className="space-y-1 cursor-pointer group"
              >
                <div className="text-xs font-bold text-[#2b1b15] group-hover:text-[#80141d] transition-colors">
                  Bát Cháo Cứu Đói Tràn Trải Năm Đinh Dậu
                </div>
                <div className="text-[10px] text-[#8a6f62]">
                  Đời thứ 8 • Chi Hai &amp; Cụ Khách
                </div>
              </div>

              <div
                onClick={() => onNavigate('cau-chuyen-gia-phong')}
                className="space-y-1 cursor-pointer group pt-2 border-t border-[#dec9b6]/20"
              >
                <div className="text-xs font-bold text-[#2b1b15] group-hover:text-[#80141d] transition-colors">
                  Hồ Mười Thước Lập Vị Sự Thực và Thông Lòng
                </div>
                <div className="text-[10px] text-[#8a6f62]">
                  Năm 1941 • Giai thoại đầm lầy cự đà
                </div>
              </div>

              <div
                onClick={() => onNavigate('cau-chuyen-gia-phong')}
                className="space-y-1 cursor-pointer group pt-2 border-t border-[#dec9b6]/20"
              >
                <div className="text-xs font-bold text-[#2b1b15] group-hover:text-[#80141d] transition-colors">
                  Lời Căn Dặn Khi Phân Chia Ruộng Hương Hỏa
                </div>
                <div className="text-[10px] text-[#8a6f62]">
                  Đời thứ 9 • Chi Giáp &amp; Ban Trị Sự tộc
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section: Lời Hứa Nối Dòng Của Con Cháu (User Modified) */}
        <div className="bg-white rounded-3xl border border-[#dec9b6] p-6 sm:p-8 shadow-2xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#dec9b6]/30 pb-3">
            <div className="space-y-0.5">
              <div className="text-[10px] font-bold text-[#80141d] uppercase tracking-wider">
                Khắc Nguyện Lưu Truyền Tộc Sử
              </div>
              <h2 className="font-serif font-bold text-xl text-[#2b1b15]">
                Lời Hứa Nối Dòng Của Con Cháu
              </h2>
            </div>
            <span className="px-3 py-1 rounded-full bg-[#faefe3] text-[#80141d] text-xs font-bold">
              Tất cả con cháu dòng họ
            </span>
          </div>

          <p className="text-xs text-[#6b584d] max-w-4xl leading-relaxed">
            Nơi con cháu thế hệ thứ 12, 13 ghi lại tâm nguyện noi theo gương sáng tiền nhân, phụng sự
            dòng tộc và phát huy tinh thần trọn vẹn của chữ Tín trong công việc và đời sống.
          </p>

          {/* Form */}
          <form
            onSubmit={handlePledgeSubmit}
            className="p-5 bg-[#fdfaf5] border border-[#dec9b6] rounded-2xl space-y-4"
          >
            <div className="flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-full bg-[#80141d] text-white flex items-center justify-center font-serif font-bold text-sm">
                P
              </span>
              <div>
                <div className="font-bold text-xs text-[#2b1b15]">
                  Ghi Lại Lời Hứa Chữ Tín Của Bạn
                </div>
                <div className="text-[10px] text-[#8a6f62]">
                  Lời hứa này sẽ được lưu trữ vĩnh viễn vào trang gia huấn điện tử của dòng họ.
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <input
                type="text"
                value={pledgeName}
                onChange={(e) => setPledgeName(e.target.value)}
                placeholder="Họ và Tên thành viên"
                className="bg-white border border-[#dec9b6] rounded-xl px-3 py-2 text-xs font-medium text-[#2b1b15] focus:outline-none focus:border-[#80141d]"
              />
              <input
                type="text"
                value={pledgeBranch}
                onChange={(e) => setPledgeBranch(e.target.value)}
                placeholder="Nhánh dòng họ"
                className="bg-white border border-[#dec9b6] rounded-xl px-3 py-2 text-xs font-medium text-[#2b1b15] focus:outline-none focus:border-[#80141d]"
              />
              <input
                type="text"
                value={pledgeJob}
                onChange={(e) => setPledgeJob(e.target.value)}
                placeholder="Nghề nghiệp"
                className="bg-white border border-[#dec9b6] rounded-xl px-3 py-2 text-xs font-medium text-[#2b1b15] focus:outline-none focus:border-[#80141d]"
              />
            </div>

            <textarea
              rows={3}
              value={pledgeContent}
              onChange={(e) => setPledgeContent(e.target.value)}
              className="w-full bg-white border border-[#dec9b6] rounded-xl p-3 text-xs text-[#2b1b15] leading-relaxed focus:outline-none focus:border-[#80141d]"
            />

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-1">
              <span className="text-[11px] text-[#8a6f62] italic">
                Lời hứa sẽ được lưu trữ và có mã số bảo vệ độc bản.
              </span>
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-[#80141d] hover:bg-[#681017] text-white text-xs font-bold transition-all shadow-sm cursor-pointer"
              >
                Khắc Lại Nguyện Phụng
              </button>
            </div>
          </form>

          {/* 3 Pledge Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            {pledges.map((p) => (
              <div
                key={p.id}
                className="p-4 bg-[#fdfaf5] border border-[#dec9b6] rounded-2xl flex flex-col justify-between space-y-3"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-[10px] text-[#8a6f62]">
                    <span className="font-bold text-[#80141d]">{p.branchTag}</span>
                    <span>{p.timeAgo}</span>
                  </div>
                  <p className="text-xs text-[#4a362f] italic leading-relaxed">{p.quote}</p>
                </div>

                <div className="flex items-center gap-2 pt-2 border-t border-[#dec9b6]/30">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-[10px] ${p.initialBg}`}
                  >
                    {p.initial}
                  </div>
                  <div className="text-[11px] leading-tight">
                    <span className="font-bold text-[#2b1b15] block">{p.author}</span>
                    <span className="text-[10px] text-[#8a6f62]">{p.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default FamilyStoryDetailScreen;
