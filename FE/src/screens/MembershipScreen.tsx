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
  Building2,
  Handshake,
  Mail,
} from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Badge } from "@/src/components/ui/badge";
import { Card } from "@/src/components/ui/card";
import { MembershipCheckout } from "../components/MembershipCheckout";
import { BrandPartnershipForm } from "../components/BrandPartnershipForm";
import type { MembershipTerm } from "../data/membershipIntent";
import { registerMembershipInterest, removeMembershipInterest } from "../data/membershipService";
import { trackProductEvent } from "../data/productAnalytics";

interface MembershipScreenProps {
  onBackToHome: () => void;
  onGoToExperience?: () => void;
  currentUserEmail?: string;
  onGoToLogin: (term: MembershipTerm) => void;
}

export const MembershipScreen: React.FC<MembershipScreenProps> = ({
  onBackToHome,
  onGoToExperience,
  currentUserEmail,
  onGoToLogin,
}) => {
  const [registeredEmail, setRegisteredEmail] = useState("");
  const [interestError, setInterestError] = useState("");
  const [isSubmittingInterest, setIsSubmittingInterest] = useState(false);
  const [savedEmail, setSavedEmail] = useState<string | null>(() => {
    try {
      return localStorage.getItem("tltl-membership-interest-email");
    } catch {
      return null;
    }
  });

  const handleRegisterNewsletter = async (e: React.FormEvent) => {
    e.preventDefault();
    setInterestError("");

    const cleanEmail = registeredEmail.trim().toLowerCase();

    if (
      cleanEmail.length > 254 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)
    ) {
      setInterestError("Vui lòng nhập địa chỉ email hợp lệ.");
      return;
    }

    setIsSubmittingInterest(true);
    try {
      await registerMembershipInterest(cleanEmail);
      trackProductEvent("membership_interest_registered");
    } catch {
      setInterestError("Chưa đăng ký được. Bạn hãy kiểm tra kết nối và thử lại.");
      setIsSubmittingInterest(false);
      return;
    }

    try { localStorage.setItem("tltl-membership-interest-email", cleanEmail); } catch { /* The server record is authoritative. */ }

    setSavedEmail(cleanEmail);
    setRegisteredEmail("");
    setIsSubmittingInterest(false);
  };

  const handleClearInterest = async () => {
    setInterestError("");

    if (savedEmail) {
      setIsSubmittingInterest(true);
      try {
        await removeMembershipInterest(savedEmail);
      } catch {
        setInterestError("Chưa xóa được đăng ký trên máy chủ. Bạn hãy thử lại.");
        setIsSubmittingInterest(false);
        return;
      }
    }

    try {
      localStorage.removeItem("tltl-membership-interest-email");
    } catch {
      // The server record has already been removed.
    }

    setSavedEmail(null);
    setRegisteredEmail("");
    setIsSubmittingInterest(false);
  };

  const featureMatrix = [
    {
      name: "Check-in tâm trạng & Lắng nghe cảm xúc",
      desc: "Lắng nghe tâm tư và nhận lời gợi mở an yên để chiêm nghiệm",
      currentDemo: "Đang hoạt động",
      futureVision: "Định hướng bổ sung thống kê nhịp điệu tâm hồn",
      status: "Đang mở miễn phí",
      statusColor: "bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 border-emerald-500/30",
    },
    {
      name: "Chiêm nghiệm xin xăm & Gieo keo",
      desc: "Giải tỏa những đắn đo, tìm thấu hiểu tinh thần",
      currentDemo: "Rút thẻ qua thư viện BE; phần diễn giải tiếng Việt cần thẩm định",
      futureVision: "Đồng bộ lịch sử quẻ xăm đa thiết bị an toàn",
      status: "Đang mở miễn phí",
      statusColor: "bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 border-emerald-500/30",
    },
    {
      name: "Cẩm nang nghi lễ & Lịch văn hóa nếp nhà",
      desc: "Thông tin ngày sóc vọng, phong tục dân gian và nghi thức tại gia",
      currentDemo: "Tra cứu tư liệu có nguồn; trạng thái biên tập được hiển thị",
      futureVision: "Mở rộng tập quán chi tiết các làng xã truyền thống",
      status: "Đang mở miễn phí",
      statusColor: "bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 border-emerald-500/30",
    },
    {
      name: "Hồ sơ cá nhân 'Góc của tôi'",
      desc: "Không gian lưu lại các thẻ quẻ, lời ước và suy ngẫm riêng tư",
      currentDemo: "Cache mã hóa trên thiết bị và dữ liệu đồng bộ theo tài khoản",
      futureVision: "Bảo mật mã hóa đầu cuối và đồng bộ đám mây",
      status: "Đang mở miễn phí",
      statusColor: "bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 border-emerald-500/30",
    },
    {
      name: "Khảo cứu nguồn tư liệu chuyên đề",
      desc: "Bản dịch Hán Nôm, di sản đình làng và phong tục cổ truyền",
      currentDemo: "Kho bài nghiên cứu chuyên sâu chưa hoàn tất",
      futureVision: "Số hóa tư liệu văn bia Hán Nôm cùng chuyên gia Viện nghiên cứu",
      status: "Kế hoạch nghiên cứu",
      statusColor: "bg-amber-500/15 text-amber-800 dark:text-amber-300 border-amber-500/30",
    },
    {
      name: "Quảng cáo thương mại / Pop-up gây phiền",
      desc: "Cam kết không quấy rầy thương mại, không tạo áp lực tài chính",
      currentDemo: "Hoàn toàn KHÔNG có quảng cáo",
      futureVision: "Cam kết duy trì không gian thanh tịnh vĩnh viễn",
      status: "Nguyên tắc cốt lõi",
      statusColor: "bg-red-500/15 text-red-800 dark:text-red-300 border-red-500/30",
    },
  ];

  return (
    <div className="screen-shell">
      <main className="page-container max-w-6xl">
        {/* Top Breadcrumb & Status Ribbon */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 text-xs text-stone-600 dark:text-stone-400">
          <div className="flex items-center gap-2">
            <button
              onClick={onBackToHome}
              className="hover:text-amber-800 dark:hover:text-amber-300 cursor-pointer transition-colors"
            >
              Hôm nay
            </button>
            <span className="text-stone-400">/</span>
            <span className="text-amber-800 dark:text-amber-300 font-semibold">Định hướng hội viên & Hợp tác</span>
          </div>

          <button
            onClick={onBackToHome}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-600 dark:text-stone-400 hover:text-amber-800 dark:hover:text-amber-300 transition-colors cursor-pointer self-start sm:self-auto"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Quay lại trang chủ</span>
          </button>
        </div>

        {/* Hero Magazine Section */}
        <section className="mb-10 p-6 sm:p-10 rounded-3xl border border-amber-500/30 bg-gradient-to-br from-surface via-surface to-amber-500/[0.04] shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-amber-500/10 to-transparent pointer-events-none rounded-bl-full" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-3.5">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold uppercase tracking-widest text-amber-800 dark:text-amber-300">
                  CỘNG ĐỒNG GÌN GIỮ NẾP NHÀ & DI SẢN
                </span>
                <span className="text-xs text-stone-400">·</span>
                <span className="text-xs text-stone-500">Độc Lập & Thanh Tịnh</span>
              </div>

              <h1 className="page-title font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-ink leading-tight">
                Nuôi Dưỡng Tâm An Qua Chiều Sâu Văn Hóa Việt
              </h1>

              <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-relaxed max-w-2xl">
                Tin Lắm Tâm Linh hướng tới việc tạo dựng một không gian an trú tâm hồn, nơi bạn có thể
                chạm vào kho tàng tri thức dân gian một cách chuẩn mực, thấu đáo và tinh tế nhất. Chúng tôi
                không bao giờ dùng nỗi sợ vận hạn, điềm gở hay sự hoang mang để thúc đẩy hội viên. Mọi giá
                trị phát triển đều đặt trên sự tôn trọng tự do tinh thần và sự tự soi tỏ của mỗi cá nhân.
              </p>

              <div className="flex items-center gap-4 text-xs font-semibold text-stone-600 dark:text-stone-400 flex-wrap pt-2">
                <span className="flex items-center gap-1.5 text-emerald-800 dark:text-emerald-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  100% Không quảng cáo trục lợi
                </span>
                <span className="flex items-center gap-1.5 text-amber-800 dark:text-amber-300">
                  <Sparkles className="w-4 h-4 text-amber-600" />
                  Bảo tồn tri thức độc lập
                </span>
                <span className="flex items-center gap-1.5 text-stone-700 dark:text-stone-300">
                  <Lock className="w-4 h-4 text-stone-500" />
                  Bảo mật riêng tư trên máy
                </span>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-2xl overflow-hidden border border-line shadow-xs relative aspect-16/10 bg-surface-soft">
                <img
                  src="/images/tea_bowl.jpg"
                  alt="Nhâm nhi tách trà thơm và tìm hiểu nếp xưa dân tộc"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />
                <div className="absolute bottom-2.5 left-3.5 right-3.5 text-[11px] text-white/90 italic flex items-center justify-between">
                  <span>Khoảnh khắc thưởng trà và lắng lòng ngẫm đạo</span>
                  <span className="text-amber-300">✦</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2 Primary Plans Comparison: Free vs Tam An */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 items-stretch">
          {/* Card 1: Free features currently available */}
          <Card className="p-6 sm:p-8 rounded-3xl bg-surface border border-line shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500">
                  TÍNH NĂNG MIỄN PHÍ
                </span>
                <Badge variant="outline" className="text-xs border-emerald-500/40 text-emerald-800 dark:text-emerald-300 bg-emerald-500/10 font-semibold">
                  Mở hoàn toàn miễn phí
                </Badge>
              </div>

              <h2 className="font-display font-bold text-2xl text-ink mb-1">
                Trải Nghiệm Tự Do
              </h2>
              <p className="text-xs text-stone-500 mb-4">Dành cho mọi người dùng tìm kiếm sự an yên</p>

              <div className="p-3.5 rounded-2xl bg-surface-soft border border-line text-xs text-stone-700 dark:text-stone-300 leading-relaxed mb-5">
                Các tính năng cơ bản hiện có được dùng miễn phí. Diễn giải AI theo năm là quyền lợi dự kiến; hiện chưa mở hội viên, và chỉ có thể chạy khi Gemini được cấu hình.
              </div>

              <div className="space-y-3 text-xs text-stone-700 dark:text-stone-300 mb-6">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Check-in tâm trạng:</strong> Nhận lời gợi mở an yên để chiêm nghiệm mỗi ngày.
                  </span>
                </div>

                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Rút thẻ xăm & Gieo keo:</strong> Khám phá bộ thẻ mẫu cổ truyền theo ba miền Bắc - Trung - Nam.
                  </span>
                </div>

                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                  <strong>Lời nguyện:</strong> Lưu vào Góc của tôi qua tài khoản; thao tác buông bỏ trong Wish chỉ là hiệu ứng biểu tượng.
                  </span>
                </div>

                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Cẩm nang nghi lễ & Lịch nếp nhà:</strong> Xem ngày âm lịch thuần Việt, tra cứu ngày lành đại sự.
                  </span>
                </div>

                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Chuông thiền & Biểu tượng ngày sinh:</strong> Khám phá tứ trụ can chi và bài học ngũ hành.
                  </span>
                </div>
              </div>
            </div>

            <Button
              variant="outline"
              onClick={onBackToHome}
              className="w-full py-3.5 rounded-xl border-line text-xs font-semibold text-ink hover:bg-surface-soft cursor-pointer min-h-11"
            >
              Tiếp tục sử dụng bản tự do
            </Button>
          </Card>

          {/* Card 2: Planned membership offer; checkout is not active */}
          <Card className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-surface via-surface to-amber-500/[0.06] border-2 border-amber-500/40 shadow-md flex flex-col justify-between relative overflow-hidden">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800 dark:text-amber-300">
                  ĐỊNH HƯỚNG HỘI VIÊN
                </span>
                <Badge variant="outline" className="text-xs border-amber-500/40 text-amber-800 dark:text-amber-300 bg-amber-500/10 font-semibold">
                  Dự kiến 29.000đ/tháng
                </Badge>
              </div>

              <h2 className="font-display font-bold text-2xl text-ink mb-1">
                Gói Hội Viên Tâm An · Chưa mở đăng ký
              </h2>
              <p className="text-xs text-stone-500 mb-4">Mức giá đề xuất; thanh toán và kích hoạt quyền lợi chưa khả dụng.</p>

              <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs text-stone-700 dark:text-stone-300 leading-relaxed mb-5">
                Đây là gói dự kiến, chưa thể mua hoặc kích hoạt. Diễn giải AI theo năm chỉ có thể thử khi Gemini được cấu hình; nội dung không phải lá số tử vi. Thư viện độc quyền và quyền lợi 3D chưa khả dụng.
              </div>

              <div className="space-y-3 text-xs text-stone-700 dark:text-stone-300 mb-6">
                <div className="flex items-start gap-2.5">
                  <Sparkles className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                  <span>
                    <strong>Lộ trình · Nội dung văn hóa chuyên sâu:</strong> Kế hoạch khảo cứu chi tiết về đình làng,
                    phong tục ba miền biên soạn cùng các nhà nghiên cứu Hán Nôm.
                  </span>
                </div>

                <div className="flex items-start gap-2.5">
                  <Sparkles className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                  <span>
                    <strong>Lộ trình · Kho tư liệu số hóa di sản:</strong> Tiếp cận tư liệu số hóa văn bia, bản dịch cổ truyền
                    và diễn xướng âm nhạc tâm linh độc quyền.
                  </span>
                </div>

                <div className="flex items-start gap-2.5">
                  <Sparkles className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                  <span>
                    <strong>Lộ trình · Đồng bộ đa thiết bị:</strong> Lưu trữ lịch trình nhịp điệu tâm trạng và góc riêng tư
                    an toàn trên hạ tầng bảo mật cao cấp.
                  </span>
                </div>

                <div className="flex items-start gap-2.5">
                  <Sparkles className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                  <span>
                    <strong>Lộ trình · Tọa đàm văn hóa định kỳ:</strong> Tham gia các buổi đàm thoại chuyên đề văn hóa
                    cùng các học giả và nghệ nhân dân gian.
                  </span>
                </div>
              </div>
            </div>

            {/* Email interest registration */}
            <div className="pt-4 border-t border-line">
              {interestError && (
                <p
                  id="membership-interest-error"
                  role="alert"
                  className="mb-3 text-xs text-red-700 bg-red-500/10 p-2.5 rounded-xl border border-red-500/30"
                >
                  {interestError}
                </p>
              )}

              {savedEmail ? (
                <div
                  role="status"
                  className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/25 space-y-2 text-xs"
                >
                  <div className="flex items-start gap-2 text-emerald-800 dark:text-emerald-300">
                    <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-emerald-600" />
                    <div className="min-w-0">
                      <p className="font-semibold">Đã ghi nhận email quan tâm:</p>
                      <p className="font-mono text-[11px] mt-0.5">{savedEmail}</p>
                    </div>
                  </div>
                  <p className="text-stone-600 dark:text-stone-400 text-[11px]">
                    Cảm ơn tấm lòng của bạn với văn hóa truyền thống!
                  </p>
                  <button
                    type="button"
                    disabled={isSubmittingInterest}
                    onClick={() => void handleClearInterest()}
                    className="inline-flex items-center gap-1.5 text-xs text-emerald-800 dark:text-emerald-300 underline cursor-pointer pt-1"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Xóa email này</span>
                  </button>
                </div>
              ) : (
                <form onSubmit={(event) => void handleRegisterNewsletter(event)} className="space-y-2.5">
                  <label
                    htmlFor="membership-interest-email"
                    className="block text-xs font-semibold text-ink"
                  >
                    Để lại email nếu bạn muốn bày tỏ quan tâm tới gói hội viên:
                  </label>

                  <div className="flex flex-col sm:flex-row gap-2">
                    <input
                      id="membership-interest-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      maxLength={254}
                      required
                      value={registeredEmail}
                      onChange={(e) => {
                        setRegisteredEmail(e.target.value);
                        setInterestError("");
                      }}
                      placeholder="email-cua-ban@domain.com"
                      className="min-w-0 flex-1 px-3.5 py-2.5 rounded-xl border border-line text-xs text-ink bg-surface focus:outline-none focus:ring-2 focus:ring-amber-500/30 min-h-11"
                    />

                    <Button
                      type="submit"
                      disabled={isSubmittingInterest}
                      className="rounded-xl bg-gradient-to-r from-red-800 to-amber-700 hover:from-red-700 hover:to-amber-800 text-white font-semibold text-xs px-4 min-h-11 cursor-pointer shadow-xs shrink-0"
                    >
                      Gửi đăng ký
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </Card>
        </div>

        {/* Feature Comparison Matrix Table */}
        <section className="membership-matrix-frame mb-10 p-6 sm:p-8 rounded-3xl bg-surface border border-line shadow-xs">
          <div className="mb-6">
            <h3 className="font-display font-bold text-xl sm:text-2xl text-ink mb-1">
              So Sánh Tính Năng Trực Quan
            </h3>
            <p className="text-xs text-stone-500">
              Đối chiếu trung thực giữa tính năng đang hoạt động trong bản thử nghiệm và các định hướng nội dung tương lai.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-line text-stone-500 uppercase text-[10px] tracking-wider font-bold">
                  <th className="py-3 px-3">Tính năng / Giá trị trải nghiệm</th>
                  <th className="py-3 px-3">Bản Tự Do Hiện Tại</th>
                  <th className="py-3 px-3">Định Hướng Tâm An</th>
                  <th className="py-3 px-3">Trạng thái</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {featureMatrix.map((row, idx) => (
                  <tr key={idx} className="hover:bg-surface-soft/60 transition-colors">
                    <td className="py-3.5 px-3">
                      <div className="font-semibold text-ink">{row.name}</div>
                      <div className="text-[11px] text-stone-500 mt-0.5">{row.desc}</div>
                    </td>
                    <td className="py-3.5 px-3 text-ink font-medium">{row.currentDemo}</td>
                    <td className="py-3.5 px-3 text-amber-800 dark:text-amber-300 font-medium">{row.futureVision}</td>
                    <td className="py-3.5 px-3">
                      <span className={`inline-flex rounded-lg border px-2.5 py-1 text-[11px] font-semibold ${row.statusColor}`}>
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* 3 Immutable Ethical Principles */}
        <section className="p-6 sm:p-8 rounded-3xl bg-surface border border-line mb-10 shadow-xs">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-300 mb-4">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Ba nguyên tắc đạo đức bất di bất dịch của Tin Lắm Tâm Linh</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-stone-700 dark:text-stone-300 leading-relaxed">
            <div className="p-4 rounded-2xl bg-surface-soft border border-line">
              <div className="font-bold text-red-700 dark:text-red-400 mb-1 flex items-center gap-1.5">
                <span>🚫 Không thương mại hóa nỗi sợ</span>
              </div>
              Chúng tôi không quy định hạn hán xui xẻo, không đe dọa tâm lý hay bán các phép giải hạn đắt đỏ.
              Tâm linh chân chính là hướng thiện và soi mình, không phải sợ hãi.
            </div>

            <div className="p-4 rounded-2xl bg-surface-soft border border-line">
              <div className="font-bold text-amber-700 dark:text-amber-400 mb-1 flex items-center gap-1.5">
                <span>📖 Tự nguyện & Minh bạch nguồn cội</span>
              </div>
              Tính năng cơ bản miễn phí; gói Tâm An tính phí 29.000đ/tháng khi cổng thanh toán sẵn sàng. Nguồn tham khảo và phạm vi áp dụng được công khai để người dùng tự đối chiếu.
            </div>

            <div className="p-4 rounded-2xl bg-surface-soft border border-line">
              <div className="font-bold text-emerald-700 dark:text-emerald-400 mb-1 flex items-center gap-1.5">
                <span>🔒 Tôn trọng sự riêng tư tâm khảm</span>
              </div>
              Những dòng suy tư, nhật ký tâm trạng trong Góc của tôi là bí mật của bạn. Chúng tôi tuyệt đối
              không phân tích dữ liệu tâm tư cá nhân để vụ lợi.
            </div>
          </div>
        </section>

        <MembershipCheckout
          key={currentUserEmail || "guest"}
          email={currentUserEmail}
          onLogin={() => onGoToLogin("monthly")}
        />

        {/* B2B Cultural Brand Partnership Section */}
        <BrandPartnershipForm />
      </main>
    </div>
  );
};
