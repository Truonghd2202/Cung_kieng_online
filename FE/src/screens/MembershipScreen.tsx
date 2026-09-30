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
  RotateCcw,
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
  const [savedEmail, setSavedEmail] = useState<string | null>(() => {
    try {
      return localStorage.getItem("tltl-membership-interest-email");
    } catch {
      return null;
    }
  });

  const handleRegisterNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanEmail = registeredEmail.trim().toLowerCase();
    if (!cleanEmail) return;

    try {
      localStorage.setItem("tltl-membership-interest-email", cleanEmail);
      setSavedEmail(cleanEmail);
      setRegisteredEmail("");
    } catch {}
  };

  const handleClearInterest = () => {
    try {
      localStorage.removeItem("tltl-membership-interest-email");
      setSavedEmail(null);
    } catch {}
  };

  const featureMatrix = [
    {
      name: "Check-in tâm trạng & Lắng nghe cảm xúc",
      desc: "Lắng nghe tâm tư, nhận thông điệp an yên và câu ca dao ngẫm",
      currentDemo: "✓ Đầy đủ trải nghiệm trên trình duyệt",
      futureVision: "Định hướng bổ sung thêm thống kê & góc nhìn quán chiếu cảm xúc",
      status: "Đang mở trên máy",
      statusColor: "bg-emerald-50 text-emerald-800 border-emerald-200",
    },
    {
      name: "Chiêm nghiệm xin xăm & Gieo keo",
      desc: "Giải tỏa những sự đắn đo, tìm thấu hiểu tinh thần",
      currentDemo: "✓ Không giới hạn lượt trải nghiệm trong bản demo",
      futureVision: "Dự kiến lưu lịch sử xăm đồng bộ khi có tài khoản máy chủ",
      status: "Đang mở trên máy",
      statusColor: "bg-emerald-50 text-emerald-800 border-emerald-200",
    },
    {
      name: "Cẩm nang nghi lễ & Lịch văn hóa",
      desc: "Thông tin ngày sóc vọng, phong tục dân gian và nghi thức tại gia",
      currentDemo: "✓ Tra cứu dữ liệu đã đối chiếu và kiểm chứng",
      futureVision: "Dự kiến mở rộng thêm tập quán chi tiết các vùng miền địa phương",
      status: "Đang mở trên máy",
      statusColor: "bg-emerald-50 text-emerald-800 border-emerald-200",
    },
    {
      name: "Hồ sơ cá nhân 'Góc của tôi'",
      desc: "Không gian lưu lại các thẻ quẻ, lời ước và suy ngẫm riêng tư",
      currentDemo: "✓ Lưu trữ độc lập trên Local Storage của trình duyệt",
      futureVision: "Định hướng hỗ trợ đồng bộ dữ liệu đám mây an toàn",
      status: "Đang mở trên máy",
      statusColor: "bg-indigo-50 text-indigo-800 border-indigo-200",
    },
    {
      name: "Khảo cứu nguồn tư liệu chuyên đề",
      desc: "Bản dịch Hán Nôm, di sản đình làng và phong tục cổ truyền",
      currentDemo: "✓ Bài viết đại cương & tư liệu văn hóa chọn lọc",
      futureVision: "Kế hoạch hợp tác nghiên cứu để bổ sung bản dịch Hán Nôm chi tiết",
      status: "Định hướng dự kiến",
      statusColor: "bg-stone-100 text-stone-700 border-stone-200",
    },
    {
      name: "Quảng cáo thương mại / Pop-up gây phiền",
      desc: "Cam kết không quấy rầy thương mại, không tạo áp lực tài chính",
      currentDemo: "Hoàn toàn KHÔNG có",
      futureVision: "Cam kết duy trì không gian thanh tịnh không quảng cáo",
      status: "Nguyên tắc cốt lõi",
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
            <span className="text-[#9e3b2e] font-semibold">Định hướng hội viên</span>
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
            ĐỊNH HƯỚNG DỰ KIẾN • KHẢO SÁT CỘNG ĐỒNG
          </span>
          <span className="text-xs text-[#9c8980]">
            • Chưa kích hoạt cổng thanh toán • Toàn bộ bản thử nghiệm đang mở miễn phí
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
                Quyền riêng tư trên trình duyệt
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
          {/* Card 1: Current Demo Tier */}
          <Card className="p-6 sm:p-8 rounded-3xl bg-white border border-[#eddcd0] shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#9e3b2e]">
                  BẢN THỬ NGHIỆM HIỆN TẠI
                </span>
                <Badge variant="outline" className="text-xs border-emerald-200 text-emerald-800 bg-emerald-50">
                  Đang mở miễn phí
                </Badge>
              </div>

              <h3 className="font-['Noto_Serif',serif] font-bold text-2xl text-[#2a2220] mb-1">
                Trải nghiệm Demo
              </h3>
              <p className="text-xs text-[#7d6c65] mb-4">Mở đầy đủ cho mọi người dùng</p>

              <div className="p-3.5 rounded-2xl bg-[#faf3ec] border border-[#ecd9cb] text-xs text-[#705e57] leading-relaxed mb-5">
                Toàn bộ các tính năng cốt lõi hiện có trong ứng dụng đều đang hoạt động miễn phí trên trình duyệt của bạn,
                không yêu cầu thanh toán hay giới hạn lượt trải nghiệm.
              </div>

              <div className="space-y-3 text-xs text-[#52433e] mb-6">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Check-in tâm trạng:</strong> Nhận thông điệp an yên và câu ca dao
                    chiêm nghiệm mỗi ngày.
                  </span>
                </div>

                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Rút thẻ quẻ chữ & gieo keo:</strong> Trải nghiệm tự do không giới hạn số lượt trên bản demo.
                  </span>
                </div>

                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Gieo hoa đăng & điều ước:</strong> Lưu lại suy ngẫm riêng trong Góc của tôi trên máy.
                  </span>
                </div>

                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Cẩm nang nghi lễ & Lịch văn hóa:</strong> Tra cứu ý nghĩa ngày sóc vọng và lưu ngày lành cá nhân.
                  </span>
                </div>

                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Chuông tĩnh tâm & Lá số chiêm nghiệm:</strong> Khám phá biểu tượng nạp âm ngũ hành dân gian.
                  </span>
                </div>
              </div>
            </div>

            <Button
              variant="outline"
              onClick={onBackToHome}
              className="w-full py-3.5 rounded-2xl border-[#eddcd0] text-xs font-semibold text-[#5a4942] hover:bg-[#faf4ed] cursor-pointer"
            >
              Tiếp tục sử dụng bản demo
            </Button>
          </Card>

          {/* Card 2: Tam An Membership Vision */}
          <Card className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#fffdfa] to-[#fbf2ea] border-2 border-[#9e3b2e]/30 shadow-md flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-[#9e3b2e] text-white text-[10px] font-bold uppercase tracking-wider px-3.5 py-1 rounded-bl-xl shadow-xs">
              Định hướng dự kiến
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#9e3b2e]">
                  Ý TƯỞNG TƯƠNG LAI
                </span>
              </div>

              <h3 className="font-['Noto_Serif',serif] font-bold text-2xl text-[#2a2220] mb-1">
                Gói hội viên Tâm An
              </h3>
              <p className="text-xs text-[#8c7b74] mb-4">(Đang khảo sát ý kiến cộng đồng - Chưa kích hoạt)</p>

              <div className="p-3.5 rounded-2xl bg-[#faede2] border border-[#ebd5c3] text-xs text-[#705e57] leading-relaxed mb-5">
                Dành cho việc thăm dò nhu cầu nghiên cứu phong thổ và lưu trữ lâu dài. Chưa chốt chính sách đóng góp,
                hiện tại toàn bộ dự án chưa thu bất kỳ chi phí nào.
              </div>

              <div className="space-y-3 text-xs text-[#52433e] mb-6">
                <div className="flex items-start gap-2.5">
                  <Sparkles className="w-4 h-4 text-[#9e3b2e] shrink-0 mt-0.5" />
                  <span>
                    <strong>Nội dung văn hóa chuyên sâu:</strong> Kế hoạch khảo cứu chi tiết về đình làng,
                    phong tục ba miền biên soạn cùng chuyên gia văn hóa.
                  </span>
                </div>

                <div className="flex items-start gap-2.5">
                  <Sparkles className="w-4 h-4 text-[#9e3b2e] shrink-0 mt-0.5" />
                  <span>
                    <strong>Kho tư liệu số hóa di sản:</strong> Dự kiến tiếp cận tư liệu số hóa văn bia, bản dịch nghĩa
                    cổ truyền khi nguồn tư liệu được hoàn tất kiểm chứng.
                  </span>
                </div>

                <div className="flex items-start gap-2.5">
                  <Sparkles className="w-4 h-4 text-[#9e3b2e] shrink-0 mt-0.5" />
                  <span>
                    <strong>Định hướng cá nhân hóa:</strong> Ý tưởng lưu trữ lịch trình nhịp điệu tâm trạng và đồng bộ
                    đa thiết bị khi có hệ thống Backend.
                  </span>
                </div>

                <div className="flex items-start gap-2.5">
                  <Sparkles className="w-4 h-4 text-[#9e3b2e] shrink-0 mt-0.5" />
                  <span>
                    <strong>Không gian tọa đàm lắng đọng:</strong> Định hướng tổ chức các buổi đàm thoại chuyên đề
                    văn hóa mở cho người hữu duyên.
                  </span>
                </div>
              </div>
            </div>

            {/* Email Interest Form for Updates */}
            <div className="pt-2 border-t border-[#ebd5c3]">
              {savedEmail ? (
                <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-[#235832] space-y-1">
                  <div className="font-semibold flex items-center gap-1.5 text-emerald-800">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Đã ghi nhận ý kiến quan tâm: {savedEmail}</span>
                  </div>
                  <p className="text-[11px] text-[#447150] leading-relaxed">
                    (Lưu cục bộ trên trình duyệt bản demo. Khi hệ thống Backend và tính năng gửi tin chính thức vận hành, bạn sẽ nhận được thông báo mới nhất.)
                  </p>
                  <button
                    type="button"
                    onClick={handleClearInterest}
                    className="inline-flex items-center gap-1 text-[11px] text-emerald-700 underline hover:text-emerald-900 mt-1 cursor-pointer"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Thay đổi hoặc hủy email ghi nhận</span>
                  </button>
                </div>
              ) : (
                <form onSubmit={handleRegisterNewsletter} className="space-y-2">
                  <div className="flex gap-2">
                    <input
                      type="email"
                      required
                      value={registeredEmail}
                      onChange={(e) => setRegisteredEmail(e.target.value)}
                      placeholder="Nhập email nếu bạn muốn đóng góp ý kiến..."
                      className="flex-1 px-3.5 py-2.5 rounded-xl border border-[#eddcd0] text-xs outline-none bg-white focus:border-[#9e3b2e]"
                    />
                    <Button
                      type="submit"
                      className="py-2.5 px-4 rounded-xl bg-[#9e3b2e] hover:bg-[#852f24] text-white text-xs font-semibold shrink-0 cursor-pointer"
                    >
                      Ghi nhận quan tâm
                    </Button>
                  </div>
                  <p className="text-[11px] text-[#8e7c75] italic leading-tight text-center">
                    * Form phục vụ khảo sát nhu cầu trong bản demo, chưa kết nối hệ thống gửi email tự động.
                  </p>
                </form>
              )}
              <p className="text-[11px] text-[#9b8982] text-center mt-2 font-medium">
                Hệ thống chưa mở cổng thanh toán • Toàn bộ bản demo hoàn toàn miễn phí
              </p>
            </div>
          </Card>
        </div>

        {/* Feature Comparison Matrix Table */}
        <Card className="p-6 sm:p-8 rounded-3xl bg-white border border-[#eddcd0] shadow-xs mb-10 overflow-hidden">
          <div className="mb-6">
            <h3 className="font-['Noto_Serif',serif] font-bold text-xl sm:text-2xl text-[#2a2220] mb-1">
              Định hướng tính năng dự kiến (Khảo sát nhu cầu cộng đồng)
            </h3>
            <p className="text-xs text-[#806f67]">
              Đối chiếu trung thực giữa tính năng đang hoạt động trong bản thử nghiệm và các định hướng nội dung đang nghiên cứu.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-[#ecd9cb] bg-[#fbf5ee]">
                  <th className="py-3 px-4 font-bold text-[#2a2220]">Tính năng / Giá trị trải nghiệm</th>
                  <th className="py-3 px-4 font-bold text-[#2a2220]">Bản Demo Hiện Tại</th>
                  <th className="py-3 px-4 font-bold text-[#9e3b2e]">Định Hướng Dự Kiến (Tương lai)</th>
                  <th className="py-3 px-4 font-bold text-[#7a675e]">Trạng thái thực tế</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f4e8dc]">
                {featureMatrix.map((row, idx) => (
                  <tr key={idx} className="hover:bg-[#fdfbf8] transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-[#2a2220]">{row.name}</div>
                      <div className="text-[11px] text-[#8e7e77] mt-0.5">{row.desc}</div>
                    </td>
                    <td className="py-3.5 px-4 text-[#55453f] font-medium">{row.currentDemo}</td>
                    <td className="py-3.5 px-4 text-[#9e3b2e] font-semibold">{row.futureVision}</td>
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
                Có. Toàn bộ các giá trị cốt lõi như lắng nghe cảm xúc, gieo điều an yên, xin xăm chiêm nghiệm,
                gieo keo, gõ chuông tĩnh tâm và tra cứu lịch ngày rằm/mùng một luôn miễn phí cho mọi người. Bạn không cần trả bất
                kỳ khoản phí nào để duy trì sự bình yên thường nhật.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#fbf5ee] border border-[#ebdcd0]">
              <div className="font-bold text-[#2a2220] mb-1">
                ② Khi nào gói Tâm An chính thức vận hành và mức đóng góp là bao nhiêu?
              </div>
              <p className="leading-relaxed">
                Hiện tại dự án đang ở giai đoạn lấy ý kiến cộng đồng và hoàn thiện thiết kế giao diện (UI/UX).
                Chưa chốt chính sách đóng góp hay mức phí. Mọi ý tưởng về gói hội viên chỉ nhằm định hướng nghiên cứu và
                duy trì hệ sinh thái văn hóa độc lập trong tương lai.
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
