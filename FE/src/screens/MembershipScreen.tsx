import React, { useState } from "react";
import { UnverifiedImage } from "../components/UnverifiedImage";
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
import type {
  Status as MembershipStatus,
} from "../components/MembershipCheckout";
import { MemberLibrary } from "../components/MemberLibrary";
import { DigitalShop } from "../components/DigitalShop";
import { DigitalInventory } from "../components/DigitalInventory";
import { PaymentHistory } from "../components/PaymentHistory";
import { PartnershipPanel } from "../components/PartnershipPanel";
import { PartnerGifts } from "../components/PartnerGifts";
import type { MembershipTerm } from "../data/membershipIntent";

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
  const [membershipStatus, setMembershipStatus] =
    useState<MembershipStatus | null>(null);

  const membershipAvailability = !membershipStatus
    ? "Chưa xác định trạng thái thanh toán"
    : !membershipStatus.salesEnabled
      ? "Chưa mở đăng ký và gia hạn"
      : !membershipStatus.checkoutAvailable
        ? "Thanh toán đang tạm thời không khả dụng"
        : membershipStatus.paymentEnvironment === "sandbox"
          ? "Đang mở thanh toán thử nghiệm"
          : "Đang mở đăng ký và gia hạn";

  const membershipPriceLabel = membershipStatus
    ? membershipStatus.plans
        .map(
          (plan) =>
            `${plan.name}: ${plan.price.toLocaleString("vi-VN")}đ`
        )
        .join(" · ")
    : "Giá và trạng thái được tải từ máy chủ";

  const featureMatrix = [
    {
      name: "Check-in tâm trạng & Lắng nghe cảm xúc",
      desc: "Lắng nghe tâm tư và nhận lời gợi mở an yên để chiêm nghiệm",
      currentStatus: "Đang hoạt động",
      futureVision: "Định hướng bổ sung thống kê nhịp điệu tâm hồn",
      status: "Đang mở miễn phí",
      statusColor: "bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 border-emerald-500/30",
    },
    {
      name: "Chiêm nghiệm xin xăm & Gieo keo",
      desc: "Giải tỏa những đắn đo, tìm thấu hiểu tinh thần",
      currentStatus: "Gieo keo đang hoạt động; thư viện xin xăm chờ thẩm định nội dung và quyền sử dụng",
      futureVision: "Đồng bộ lịch sử quẻ xăm đa thiết bị an toàn",
      status: "Đang mở miễn phí",
      statusColor: "bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 border-emerald-500/30",
    },
    {
      name: "Cẩm nang nghi lễ & Lịch văn hóa nếp nhà",
      desc: "Thông tin ngày sóc vọng, phong tục dân gian và nghi thức tại gia",
      currentStatus: "Lịch âm/dương và ghi chú cá nhân đang hoạt động; cẩm nang chờ duyệt",
      futureVision: "Mở rộng tập quán chi tiết các làng xã truyền thống",
      status: "Đang mở miễn phí",
      statusColor: "bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 border-emerald-500/30",
    },
    {
      name: "Hồ sơ cá nhân 'Góc của tôi'",
      desc: "Không gian lưu lại các thẻ quẻ, lời ước và suy ngẫm riêng tư",
      currentStatus: "Bộ nhớ mã hóa trên thiết bị và dữ liệu đồng bộ theo tài khoản",
      futureVision: "Bảo mật mã hóa đầu cuối và đồng bộ đám mây",
      status: "Đang mở miễn phí",
      statusColor: "bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 border-emerald-500/30",
    },
    {
      name: "Khảo cứu nguồn tư liệu chuyên đề",
      desc: "Bản dịch Hán Nôm, di sản đình làng và phong tục cổ truyền",
      currentStatus: "Kho bài nghiên cứu chuyên sâu chưa hoàn tất",
      futureVision: "Số hóa tư liệu văn bia Hán Nôm cùng chuyên gia Viện nghiên cứu",
      status: "Kế hoạch nghiên cứu",
      statusColor: "bg-amber-500/15 text-amber-800 dark:text-amber-300 border-amber-500/30",
    },
    {
      name: "Quảng cáo thương mại / Pop-up gây phiền",
      desc: "Cam kết không quấy rầy thương mại, không tạo áp lực tài chính",
      currentStatus: "Hiện không hiển thị quảng cáo",
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
                Các trải nghiệm hiện có để tham khảo. Bạn không cần tin theo hay làm theo; nội dung không dùng nỗi sợ vận hạn hoặc điềm gở để thuyết phục.
              </p>

              <div className="flex items-center gap-4 text-xs font-semibold text-stone-600 dark:text-stone-400 flex-wrap pt-2">
                <span className="flex items-center gap-1.5 text-emerald-800 dark:text-emerald-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  {membershipAvailability}
                </span>
                <span className="flex items-center gap-1.5 text-amber-800 dark:text-amber-300">
                  <Sparkles className="w-4 h-4 text-amber-600" />
                  AI không tính lá số cá nhân
                </span>
                <span className="flex items-center gap-1.5 text-stone-700 dark:text-stone-300">
                  <Lock className="w-4 h-4 text-stone-500" />
                  Checklist lưu tiến độ trên thiết bị
                </span>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-2xl overflow-hidden border border-line shadow-xs relative aspect-16/10 bg-surface-soft">
                <UnverifiedImage
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
                Các tính năng cơ bản hiện có được dùng miễn phí.
                Hội viên Tâm An bổ sung diễn giải AI theo năm và quyền
                đọc các bài đã phát hành trong thư viện hội viên.
                Trạng thái đăng ký được hiển thị bên dưới.
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
                    <strong>Gieo keo:</strong> Trải nghiệm gieo ngẫu nhiên để chiêm nghiệm; thư viện xin xăm chưa phát hành vì chưa có bộ thẻ đủ nguồn và quyền sử dụng.
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
                    <strong>Lịch nếp nhà:</strong> Tra cứu ngày âm/dương và ghi chú cá nhân. Cẩm nang nghi lễ và tra cứu ngày lành chỉ mở sau khi tư liệu được thẩm định.
                  </span>
                </div>

                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Khoảng nghỉ tĩnh tâm:</strong> Dùng phiên thở ngắn và âm thanh tổng hợp. Luận giải ngày sinh chưa được phát hành.
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
          <Card className="p-6 sm:p-8 rounded-3xl bg-surface border-2 border-amber-500/40 shadow-md">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted">
              HỘI VIÊN TÂM AN
            </p>

            <h2 className="mt-2 font-display text-2xl font-bold text-ink">
              Đồng hành cùng nếp sống văn hóa
            </h2>

            <p className="mt-3 text-sm font-semibold text-ink">
              {membershipPriceLabel}
            </p>

            <p className="mt-2 text-sm text-muted">
              {membershipAvailability}
            </p>

            <ul className="mt-5 list-disc space-y-3 pl-5 text-sm text-ink">
              <li>
                Diễn giải AI theo năm để tự suy ngẫm về công việc,
                quan hệ và chăm sóc bản thân.
              </li>
              <li>
                Đọc các bài đã phát hành trong thư viện hội viên.
                Danh sách bài hiện có được hiển thị bên dưới.
              </li>
              <li>
                Gói năm tặng một lượt đèn hoa đăng trang trí và
                bình sen ngọc dùng trong cảnh tưởng niệm.
              </li>
            </ul>

            <p className="mt-5 text-sm text-muted">
              Gia hạn thủ công, không tự động trừ tiền. Quyền lợi
              chỉ được kích hoạt sau khi máy chủ xác nhận thanh toán.
              Vật phẩm trang trí không làm lời nguyện có hiệu lực hơn.
            </p>

            <p className="mt-3 text-sm text-muted">
              Xem hạn hội viên, giới hạn AI và thao tác đăng ký
              trong phần trạng thái hội viên bên dưới.
            </p>
          </Card>
        </div>

        {/* Feature Comparison Matrix Table */}
        <section className="membership-matrix-frame mb-10 p-6 sm:p-8 rounded-3xl bg-surface border border-line shadow-xs">
          <div className="mb-6">
            <h3 className="font-display font-bold text-xl sm:text-2xl text-ink mb-1">
              So Sánh Tính Năng Trực Quan
            </h3>
            <p className="text-xs text-stone-500">
              Trạng thái hiện tại và các quyền lợi dự kiến được tách riêng để tránh hiểu nhầm về tính năng hoặc khoản phí.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-line text-stone-500 uppercase text-[10px] tracking-wider font-bold">
                  <th className="py-3 px-3">Tính năng / Giá trị trải nghiệm</th>
                  <th className="py-3 px-3">Tình trạng hiện tại</th>
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
                    <td className="py-3.5 px-3 text-ink font-medium">{row.currentStatus}</td>
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
          onStatusChange={setMembershipStatus}
        />

        <MemberLibrary
          key={currentUserEmail || "guest"}
          email={currentUserEmail}
        />

        <DigitalShop
          key={currentUserEmail || "guest"}
          email={currentUserEmail}
        />

        <DigitalInventory
          key={currentUserEmail || "guest"}
          email={currentUserEmail}
        />

        <PaymentHistory
          key={currentUserEmail || "guest"}
          email={currentUserEmail}
        />

        <PartnerGifts />

        {currentUserEmail ? (
          <PartnershipPanel key={currentUserEmail} />
        ) : (
          <p className="my-6 text-sm text-muted">
            Đăng nhập để gửi và theo dõi đề xuất hợp tác.
          </p>
        )}
      </main>
    </div>
  );
};
