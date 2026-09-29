import React, { useState } from "react";
import {
  ArrowLeft,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Lock,
  Heart,
  BookOpen,
  Info,
  HelpCircle,
  Clock,
  ArrowRight,
  Check,
} from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Badge } from "@/src/components/ui/badge";
import { Card } from "@/src/components/ui/card";

interface MembershipScreenProps {
  onBackToHome: () => void;
  onGoToExperience?: () => void;
}

export const MembershipScreen: React.FC<MembershipScreenProps> = ({
  onBackToHome,
  onGoToExperience,
}) => {
  const [registeredEmail, setRegisteredEmail] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);

  const handleRegisterNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!registeredEmail.trim()) return;
    setIsRegistered(true);
    setTimeout(() => {
      setIsRegistered(false);
      setRegisteredEmail("");
    }, 4000);
  };

  const featureMatrix = [
    {
      name: "Check-in tâm trạng & Lắng nghe cảm xúc",
      desc: "Gửi nhận câu ca dao ngẫm, nhận tín hiệu an yên hàng ngày",
      free: "✓ Đầy đủ trải nghiệm",
      premium: "Đầy đủ + Biểu đồ xu hướng",
      status: "Đã có trong bản demo",
      statusColor: "bg-emerald-50 text-emerald-800 border-emerald-200",
    },
    {
      name: "Chiêm nghiệm xin xăm & Gieo keo",
      desc: "Giải tỏa những sự đắn đo, tìm thấu hiểu tinh thần",
      free: "Mỗi ngày 1 lần rút",
      premium: "Không giới hạn & Lưu sổ xăm",
      status: "Đã có trong bản demo",
      statusColor: "bg-emerald-50 text-emerald-800 border-emerald-200",
    },
    {
      name: "Đọc cẩm nang & Lịch văn hóa",
      desc: "Thông tin ngày sóc vọng, Lễ hội dân gian và nghi thức tại gia",
      free: "Nghi lễ sóc vọng căn bản",
      premium: "Toàn bộ 63 tỉnh & Tập quán chi tiết",
      status: "Có bản sơ lược trong demo",
      statusColor: "bg-amber-50 text-amber-800 border-amber-200",
    },
    {
      name: "Hồ sơ cá nhân 'Góc của tôi'",
      desc: "Không gian lưu lại các thẻ quẻ, lời ước và suy ngẫm riêng tư",
      free: "Lưu trên bộ nhớ máy (Local)",
      premium: "Đồng bộ đám mây bảo mật",
      status: "Đang cao cấp hóa",
      statusColor: "bg-indigo-50 text-indigo-800 border-indigo-200",
    },
    {
      name: "Khảo cứu nguồn tư liệu chuyên gia",
      desc: "Bản dịch Hán Nôm, bản dập văn bia, chuyên đề điền dã di sản",
      free: "Tóm lược đại cương",
      premium: "Toàn văn khảo cứu độc quyền",
      status: "Dự kiến phát triển",
      statusColor: "bg-stone-100 text-stone-700 border-stone-200",
    },
    {
      name: "Quảng cáo hiển thị / Thông báo gây phiền",
      desc: "Cam kết không quấy rầy thương mại, pop-up áp lực",
      free: "Hoàn toàn KHÔNG có",
      premium: "Hoàn toàn KHÔNG có",
      status: "Cam kết suốt đời",
      statusColor: "bg-rose-50 text-rose-800 border-rose-200",
    },
  ];

  return (
    <div className="w-full min-h-screen bg-[#fcf8f2] text-[#2e2624] font-['Be_Vietnam_Pro',sans-serif]">
      <main className="max-w-6xl mx-auto px-4 sm:px-6 pt-6 pb-20">
        {/* Top Breadcrumb & Status Ribbon */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 text-xs text-[#8a7971]">
          <div className="flex items-center gap-2">
            <button
              onClick={onBackToHome}
              className="hover:text-[#9e3b2e] cursor-pointer transition-colors"
            >
              Hôm nay
            </button>
            <span>/</span>
            <span className="text-[#9e3b2e] font-semibold">Gói hội viên Tâm An</span>
          </div>

          <button
            onClick={onBackToHome}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#82716a] hover:text-[#9e3b2e] transition-colors cursor-pointer self-start sm:self-auto"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Quay lại trang chủ</span>
          </button>
        </div>

        {/* Top Badges */}
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wider bg-[#fef3e2] text-[#8a5a22] border border-[#f6d8a8] flex items-center gap-1.5">
            <Heart className="w-3.5 h-3.5 text-[#c97a2b]" />
            MÔ HÌNH DỰ KIẾN • ĐỒNG HÀNH BỀN VỮNG
          </span>
          <span className="text-xs text-[#9c8980]">
            • Tài liệu giới thiệu định hướng dịch vụ • Chưa kích hoạt cổng thanh toán
          </span>
        </div>

        {/* Header Title Section & Top Illustration */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-10">
          <div className="lg:col-span-7">
            <h1 className="font-['Noto_Serif',serif] font-bold text-3xl sm:text-4xl lg:text-[40px] text-[#2a2220] leading-tight mb-3">
              Nuôi dưỡng tâm an qua chiều sâu văn hóa Việt
            </h1>
            <p className="text-sm sm:text-base text-[#68574f] leading-relaxed mb-4">
              Tin Lắm Tâm Linh hướng tới việc tạo dựng một không gian an trú tâm hồn, nơi bạn có thể
              chạm vào kho tàng tri thức dân gian một cách chuẩn mực, thấu đáo và tinh tế nhất. Chúng tôi
              không bao giờ dùng nỗi sợ vận hạn, điềm gở hay sự hoang mang để thúc đẩy hội viên. Mọi giá
              trị phát triển đều đặt trên sự tôn trọng tự do tinh thần và tự soi tỏ của mỗi cá nhân.
            </p>
            <div className="flex items-center gap-4 text-xs font-semibold text-[#8c7b73] flex-wrap">
              <span className="flex items-center gap-1">
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                100% Không quảng cáo trục lợi
              </span>
              <span className="flex items-center gap-1">
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                Bảo tồn tri thức độc lập
              </span>
              <span className="flex items-center gap-1">
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                Quyền riêng tư tuyệt đối
              </span>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-3xl overflow-hidden border border-[#eddcd0] shadow-xs relative aspect-16/10 bg-[#241c19]">
              <img
                src="/images/tea_bowl.jpg"
                alt="Nhâm nhi tách trà thơm và tìm hiểu nếp xưa dân tộc"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-3 left-4 right-4 text-xs text-white/90 italic flex items-center justify-between">
                <span>Khoảnh khắc nhâm nhi tách trà thơm và tìm hiểu nếp xưa dân tộc</span>
              </div>
            </div>
          </div>
        </div>

        {/* 2 Primary Plans Comparison: Free vs Tam An */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {/* Card 1: Free Tier */}
          <Card className="p-6 sm:p-8 rounded-3xl bg-white border border-[#eddcd0] shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#9e3b2e]">
                  NỀN TẢNG MỞ
                </span>
                <span className="text-xs text-[#8c7b74]">Cộng đồng</span>
              </div>

              <h3 className="font-['Noto_Serif',serif] font-bold text-2xl text-[#2a2220] mb-1">
                Trải nghiệm Miễn phí
              </h3>
              <p className="text-xs text-[#7d6c65] mb-4">Trọn đời cho cộng đồng</p>

              <div className="p-3.5 rounded-2xl bg-[#faf3ec] border border-[#ecd9cb] text-xs text-[#705e57] leading-relaxed mb-5">
                Dành cho tất cả mọi người cần một nhịp thở chậm giữa nhịp sống hối hả. Miễn phí toàn bộ
                các giá trị cốt lõi nền tảng.
              </div>

              <div className="space-y-3 text-xs text-[#52433e] mb-6">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Check-in tâm trạng hàng ngày:</strong> Nhận thông điệp an yên và câu ca dao
                    chiêm nghiệm mỗi sớm mai.
                  </span>
                </div>

                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Rút thẻ quẻ chữ & gieo keo:</strong> Khám phá ý nghĩa các tích xưa dân gian ba miền.
                  </span>
                </div>

                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Gửi gắm điều ước:</strong> Gieo hoa đăng vô vi và lưu nhật ký biểu tượng cá nhân.
                  </span>
                </div>

                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Cẩm nang nghi lễ & Lịch văn hóa:</strong> Tra cứu ý nghĩa ngày rằm, mùng một và tiết khí.
                  </span>
                </div>

                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Chuông tĩnh tâm an định:</strong> Nhịp thở lắng đọng 3 phút an trú thân tâm.
                  </span>
                </div>
              </div>
            </div>

            <Button
              variant="outline"
              onClick={onBackToHome}
              className="w-full py-3.5 rounded-2xl border-[#eddcd0] text-xs font-semibold text-[#5a4942] hover:bg-[#faf4ed]"
            >
              Tiếp tục dùng bản miễn phí
            </Button>
          </Card>

          {/* Card 2: Tam An Membership */}
          <Card className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#fffdfa] to-[#fbf2ea] border-2 border-[#9e3b2e]/30 shadow-md flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-[#9e3b2e] text-white text-[10px] font-bold uppercase tracking-wider px-3.5 py-1 rounded-bl-xl shadow-xs">
              Mô hình tương lai
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#9e3b2e]">
                  ĐỊNH HƯỚNG CHUYÊN SÂU
                </span>
              </div>

              <h3 className="font-['Noto_Serif',serif] font-bold text-2xl text-[#2a2220] mb-1">
                Gói hội viên Tâm An
              </h3>
              <p className="text-xs text-[#8c7b74] mb-4">(Mô hình dự kiến trong tương lai)</p>

              <div className="p-3.5 rounded-2xl bg-[#faede2] border border-[#ebd5c3] text-xs text-[#705e57] leading-relaxed mb-5">
                Dành cho người mong muốn đào sâu căn cốt phong thổ và lưu trữ hành trình nội tâm lâu dài.
                Mức phí tượng trưng bảo trợ nghiên cứu: tương đương một ấm trà mạn mỗi tháng.
              </div>

              <div className="space-y-3 text-xs text-[#52433e] mb-6">
                <div className="flex items-start gap-2.5">
                  <Sparkles className="w-4 h-4 text-[#9e3b2e] shrink-0 mt-0.5" />
                  <span>
                    <strong>Nội dung văn hóa chuyên sâu:</strong> Khảo cứu chi tiết về đình làng, tín
                    ngưỡng Tứ Phủ, phong tục ba miền Bắc - Trung - Nam biên soạn cùng chuyên gia.
                  </span>
                </div>

                <div className="flex items-start gap-2.5">
                  <Sparkles className="w-4 h-4 text-[#9e3b2e] shrink-0 mt-0.5" />
                  <span>
                    <strong>Kho tư liệu kiểm chứng:</strong> Tiếp cận nguyên bản văn bia Hán Nôm cổ,
                    bản dịch nghĩa và ảnh chụp thực địa sắc nét.
                  </span>
                </div>

                <div className="flex items-start gap-2.5">
                  <Sparkles className="w-4 h-4 text-[#9e3b2e] shrink-0 mt-0.5" />
                  <span>
                    <strong>Trải nghiệm cá nhân hóa sâu sắc:</strong> Bản đồ nhịp điệu tâm trạng theo
                    từng tháng âm lịch, ghi chú gia đình và lịch lễ nghi phong thổ riêng biệt.
                  </span>
                </div>

                <div className="flex items-start gap-2.5">
                  <Sparkles className="w-4 h-4 text-[#9e3b2e] shrink-0 mt-0.5" />
                  <span>
                    <strong>Không gian đàm thoại lắng đọng:</strong> Tham gia các buổi trò chuyện
                    chuyên đề văn hóa không giới hạn lượt trải nghiệm.
                  </span>
                </div>
              </div>
            </div>

            {/* Email Registration for Updates */}
            <div>
              {isRegistered ? (
                <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs text-center font-medium animate-fadeIn">
                  ✓ Cảm ơn bạn! Chúng tôi sẽ gửi thông báo khi gói Tâm An chính thức hoàn thiện.
                </div>
              ) : (
                <form onSubmit={handleRegisterNewsletter} className="flex gap-2">
                  <input
                    type="email"
                    required
                    value={registeredEmail}
                    onChange={(e) => setRegisteredEmail(e.target.value)}
                    placeholder="Nhập email của bạn để nhận tin..."
                    className="flex-1 px-3.5 py-2.5 rounded-xl border border-[#eddcd0] text-xs outline-none bg-white focus:border-[#9e3b2e]"
                  />
                  <Button
                    type="submit"
                    className="py-2.5 px-4 rounded-xl bg-[#9e3b2e] hover:bg-[#852f24] text-white text-xs font-semibold shrink-0 cursor-pointer"
                  >
                    Đăng ký nhận tin
                  </Button>
                </form>
              )}
              <p className="text-[11px] text-[#9b8982] text-center mt-2">
                Hệ thống chưa mở cổng thanh toán • Không có chi phí phát sinh
              </p>
            </div>
          </Card>
        </div>

        {/* Feature Comparison Matrix Table */}
        <Card className="p-6 sm:p-8 rounded-3xl bg-white border border-[#eddcd0] shadow-xs mb-10 overflow-hidden">
          <div className="mb-6">
            <h3 className="font-['Noto_Serif',serif] font-bold text-xl sm:text-2xl text-[#2a2220] mb-1">
              Minh bạch tính năng & Lộ trình phát triển
            </h3>
            <p className="text-xs text-[#806f67]">
              Đối chiếu rõ ràng giữa trải nghiệm hiện tại trên bản thử nghiệm và các định hướng nội dung chuyên sâu.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-[#ecd9cb] bg-[#fbf5ee]">
                  <th className="py-3 px-4 font-bold text-[#2a2220]">Tính năng / Giá trị trải nghiệm</th>
                  <th className="py-3 px-4 font-bold text-[#2a2220]">Bản Miễn phí</th>
                  <th className="py-3 px-4 font-bold text-[#9e3b2e]">Gói Tâm An (Dự kiến)</th>
                  <th className="py-3 px-4 font-bold text-[#7a675e]">Trạng thái hệ thống</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f4e8dc]">
                {featureMatrix.map((row, idx) => (
                  <tr key={idx} className="hover:bg-[#fdfbf8] transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-[#2a2220]">{row.name}</div>
                      <div className="text-[11px] text-[#8e7e77] mt-0.5">{row.desc}</div>
                    </td>
                    <td className="py-3.5 px-4 text-[#55453f] font-medium">{row.free}</td>
                    <td className="py-3.5 px-4 text-[#9e3b2e] font-semibold">{row.premium}</td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`text-[10px] font-semibold px-2.5 py-0.5 rounded-full border ${row.statusColor}`}
                      >
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* 3 Immutable Ethical Principles */}
        <div className="p-6 rounded-3xl bg-[#faf4ed] border border-[#ebdcd0] mb-10">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#9e3b2e] mb-4">
            <ShieldCheck className="w-4 h-4 text-[#9e3b2e]" />
            <span>Ba nguyên tắc đạo đức bất di bất dịch</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-[#68564f] leading-relaxed">
            <div className="p-4 rounded-2xl bg-white border border-[#ecd9cb]">
              <div className="font-bold text-[#2a2220] mb-1 flex items-center gap-1.5 text-rose-700">
                <span>🚫 Không thương mại hóa nỗi sợ</span>
              </div>
              Chúng tôi không quy định hạn hán xui xẻo, không đe dọa tâm lý hay đưa ra các phép giải hạn đắt đỏ.
              Tâm linh chân chính là hướng thiện và soi mình, không phải sợ hãi.
            </div>

            <div className="p-4 rounded-2xl bg-white border border-[#ecd9cb]">
              <div className="font-bold text-[#2a2220] mb-1 flex items-center gap-1.5 text-amber-700">
                <span>📖 Tự nguyện & Minh bạch nguồn cội</span>
              </div>
              Chưa thu bất kỳ đồng phí nào khi chưa hoàn thiện hệ thống giá trị thực tế và luôn có sự kiểm duyệt
              từ các nhà nghiên cứu Hán Nôm và văn hóa dân gian.
            </div>

            <div className="p-4 rounded-2xl bg-white border border-[#ecd9cb]">
              <div className="font-bold text-[#2a2220] mb-1 flex items-center gap-1.5 text-indigo-700">
                <span>🔒 Tôn trọng sự riêng tư tâm khảm</span>
              </div>
              Những dòng suy tư, nhật ký tâm trạng trong Góc của tôi là bí mật của bạn. Chúng tôi không bao
              giờ phân tích dữ liệu tâm tư cá nhân để chạy quảng cáo hay cung cấp cho bên thứ ba.
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <Card className="p-6 sm:p-8 rounded-3xl bg-white border border-[#eddcd0] shadow-xs mb-10">
          <h3 className="font-['Noto_Serif',serif] font-bold text-xl text-[#2a2220] mb-4">
            Giải đáp thắc mắc
          </h3>

          <div className="space-y-4 text-xs text-[#62514a]">
            <div className="p-4 rounded-2xl bg-[#fbf5ee] border border-[#ebdcd0]">
              <div className="font-bold text-[#2a2220] mb-1">
                ① Tôi có thể sử dụng Tin Lắm Tâm Linh hoàn toàn miễn phí không?
              </div>
              <p className="leading-relaxed">
                Có. Toàn bộ các giá trị cốt lõi như lắng nghe cảm xúc, gieo điều an yên, xin xăm chiêm nghiệm mỗi ngày,
                gõ chuông tĩnh tâm và tra cứu lịch ngày rằm/mùng một luôn miễn phí cho mọi người. Bạn không cần trả bất
                kỳ khoản phí nào để duy trì sự bình yên thường nhật.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#fbf5ee] border border-[#ebdcd0]">
              <div className="font-bold text-[#2a2220] mb-1">
                ② Khi nào gói Tâm An chính thức vận hành và mức đóng góp là bao nhiêu?
              </div>
              <p className="leading-relaxed">
                Hiện tại dự án đang ở giai đoạn hoàn thiện thiết kế giao diện (UI/UX) và thẩm định nguồn văn hóa dân gian độc lập.
                Mức đóng góp dự kiến sẽ rất nhỏ (tương đương tách trà sen mỗi tháng) và chỉ nhằm duy trì máy chủ, chi trả thù lao
                dịch thuật bản cổ và quỹ bảo tồn tư liệu thực địa. Thông tin chính thức sẽ được gửi đến những người hữu duyên quan tâm.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#fbf5ee] border border-[#ebdcd0]">
              <div className="font-bold text-[#2a2220] mb-1">
                ③ Tin Lắm Tâm Linh có bảo mật nội dung tôi viết trong 'Góc của tôi' không?
              </div>
              <p className="leading-relaxed">
                Trong bản thử nghiệm hiện tại, toàn bộ dữ liệu chỉ lưu trực tiếp trên bộ nhớ trình duyệt máy tính cá nhân của bạn
                (Local Storage). Hệ thống không truyền tải thông tin này về máy chủ trung tâm. Bạn hoàn toàn làm chủ những suy ngẫm
                riêng của mình.
              </p>
            </div>
          </div>
        </Card>

        {/* Bottom Banner */}
        <div className="text-center pt-8 border-t border-[#ecdcd0]">
          <p className="font-['Noto_Serif',serif] italic font-semibold text-xl text-[#9e3b2e] mb-1">
            “Tâm bình thế giới bình, lòng an vạn sự tỏ”
          </p>
          <span className="text-xs uppercase tracking-widest text-[#95837b] font-semibold">
            NƠI LƯU GIỮ NÉT ĐẸP TÂM THỨC VÀ CHIÊM NGHIỆM VĂN HÓA DÂN GIAN VIỆT
          </span>
        </div>
      </main>
    </div>
  );
};
