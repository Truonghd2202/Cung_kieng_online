import React, { useEffect, useState } from "react";
import { NavScreen } from "./AppHeader";
import { DailyProverb, loadDailyProverb } from "../data/contentService";
import { apiRequest } from "../lib/api";
import {
  Sparkles,
  ArrowRight,
  Compass,
  Crown,
  Flower2,
  ScrollText,
} from "lucide-react";

interface AppFooterProps {
  onNavigate?: (screen: NavScreen) => void;
  showMembershipBanner?: boolean;
}

interface FooterMembershipStatus {
  salesEnabled: boolean;
  checkoutAvailable: boolean;
  paymentEnvironment: "sandbox" | "production";
  subscription: { started_at: string; expires_at: string } | null;
  aiUsage: { successfulUsed: number; inProgress: number; successfulRemaining: number; successfulLimit: number; attemptsUsed: number; attemptsRemaining: number; providerAttemptLimit: number; nextUsableAt: string | null };
}

export const AppFooter: React.FC<AppFooterProps> = ({ onNavigate, showMembershipBanner = true }) => {
  const [dailyProverb, setDailyProverb] = useState<DailyProverb | null>(null);
  const [proverbLoadFailed, setProverbLoadFailed] = useState(false);
  const [membershipStatus, setMembershipStatus] = useState<FooterMembershipStatus | null>(null);

  useEffect(() => {
    let active = true;
    loadDailyProverb()
      .then((result) => {
        if (active) setDailyProverb(result);
      })
      .catch(() => {
        if (active) setProverbLoadFailed(true);
      });
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    let active = true;
    apiRequest<FooterMembershipStatus>("/membership/status")
      .then((status) => { if (active) setMembershipStatus(status); })
      .catch(() => { if (active) setMembershipStatus(null); });
    return () => { active = false; };
  }, []);

  const membershipTitle = membershipStatus?.subscription
    ? "Hội viên Tâm An đang hoạt động"
    : !membershipStatus
      ? "Chưa tải được trạng thái hội viên"
      : !membershipStatus.salesEnabled
        ? "Chưa mở đăng ký và gia hạn"
        : !membershipStatus.checkoutAvailable
          ? "Thanh toán đang tạm thời không khả dụng"
          : membershipStatus.paymentEnvironment === "sandbox"
            ? "Thanh toán hội viên đang ở chế độ thử nghiệm"
            : "Đang mở đăng ký và gia hạn";
  const membershipDescription = membershipStatus?.subscription
      ? `Hội viên Tâm An có hiệu lực đến ${new Date(membershipStatus.subscription.expires_at).toLocaleDateString("vi-VN")}. AI theo năm: đã tạo ${membershipStatus.aiUsage.successfulUsed}/${membershipStatus.aiUsage.successfulLimit} bản, còn ${membershipStatus.aiUsage.successfulRemaining}; ${membershipStatus.aiUsage.inProgress} yêu cầu đang xử lý. Trong 24 giờ qua, đã gửi ${membershipStatus.aiUsage.attemptsUsed}/${membershipStatus.aiUsage.providerAttemptLimit} yêu cầu AI (yêu cầu lỗi cũng tính vào giới hạn).${membershipStatus.aiUsage.nextUsableAt ? ` Có thể dùng tiếp từ ${new Date(membershipStatus.aiUsage.nextUsableAt).toLocaleString("vi-VN")}.` : ""}`
    : !membershipStatus
      ? "Mở trang hội viên để xem trạng thái mới nhất."
      : `${!membershipStatus.salesEnabled ? "Đăng ký và gia hạn chưa được mở. " : !membershipStatus.checkoutAvailable ? "Thanh toán hiện chưa khả dụng. " : membershipStatus.paymentEnvironment === "sandbox" ? "Thanh toán đang trong giai đoạn thử nghiệm. " : ""}Bạn đang dùng gói Miễn phí. AI theo năm dành cho hội viên Tâm An. Trong 24 giờ qua: đã tạo ${membershipStatus.aiUsage.successfulUsed}/${membershipStatus.aiUsage.successfulLimit} bản, còn ${membershipStatus.aiUsage.successfulRemaining}; ${membershipStatus.aiUsage.inProgress} yêu cầu đang xử lý; đã gửi ${membershipStatus.aiUsage.attemptsUsed}/${membershipStatus.aiUsage.providerAttemptLimit} yêu cầu AI (yêu cầu lỗi cũng tính vào giới hạn).${membershipStatus.aiUsage.nextUsableAt ? ` Có thể dùng tiếp từ ${new Date(membershipStatus.aiUsage.nextUsableAt).toLocaleString("vi-VN")}.` : ""}`;

  const goTo = (screen: NavScreen) => {
    if (onNavigate) {
      onNavigate(screen);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className="site-footer" role="contentinfo">
      {/* Trạng thái gói hội viên */}
      {showMembershipBanner && <div className="footer-membership-banner">
        <div className="footer-membership-card">
          <div className="footer-membership-left">
            <div className="footer-membership-badge">
              <Crown className="w-3.5 h-3.5 text-amber-300" />
              <span>{membershipStatus?.subscription ? "HỘI VIÊN ĐANG HOẠT ĐỘNG" : membershipStatus?.salesEnabled ? "TRẠNG THÁI GÓI HỘI VIÊN" : "CHƯA MỞ ĐĂNG KÝ"}</span>
            </div>
            <h3 className="footer-membership-title">
              {membershipTitle}
            </h3>
            <p className="footer-membership-desc">
              {membershipDescription}
            </p>
          </div>
          <button
            type="button"
            onClick={() => goTo("membership")}
            className="footer-membership-btn group"
            id="footer-membership-cta"
          >
            <Sparkles className="w-4 h-4 text-amber-200" />
            <span>Xem trạng thái hội viên</span>
            <ArrowRight className="w-4 h-4 text-amber-200 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>
      </div>}

      {/* 2. KHỐI NỘI DUNG CHÍNH (4 CỘT HIỆN ĐẠI) */}
      <div className="site-footer__inner">
        {/* Cột 1: Thương hiệu & Sứ mệnh */}
        <div className="footer-brand-col">
          <div className="flex items-center gap-2.5 mb-3">
            <span className="w-8 h-8 rounded-full bg-accent/20 border border-accent/40 flex items-center justify-center text-accent">
              <Flower2 className="w-4 h-4" />
            </span>
            <span className="font-display text-lg font-bold tracking-wide text-ink">
              Tin Lắm Tâm Linh
            </span>
          </div>
          <p className="footer-brand-desc">
            Khám phá văn hóa Việt, tham khảo nghi lễ và ghi lại cảm xúc.
          </p>
        </div>

        {/* Nội dung chính */}
        <div className="footer-nav-col">
          <h4 className="footer-nav-title">
            <Compass className="w-3.5 h-3.5 text-accent" />
            <span>Khám phá nội dung</span>
          </h4>
          <ul className="footer-nav-list">
            <li>
              <button type="button" onClick={() => goTo("culture")} className="footer-link">
                Bài viết văn hóa
              </button>
            </li>
            <li>
              <button type="button" onClick={() => goTo("rituals")} className="footer-link">
                Hướng dẫn nghi lễ
              </button>
            </li>
            <li>
              <button type="button" onClick={() => goTo("mood")} className="footer-link">
                Ghi lại cảm xúc
              </button>
            </li>
          </ul>
        </div>

        {/* Cột: Minh triết ngày mới */}
        <div className="footer-proverb-col">
          <h4 className="footer-nav-title">
            <ScrollText className="w-3.5 h-3.5 text-accent" />
            <span>Minh triết ngày mới</span>
          </h4>
          <div className="footer-proverb-card">
            {dailyProverb ? (
              <>
                <blockquote className="footer-proverb-quote">
                  “{dailyProverb.content}”
                </blockquote>
                <p className="footer-proverb-meaning">{dailyProverb.meaning}</p>
                <div className="footer-proverb-meta">
                  <span>Nguồn: Ngữ liệu Tục ngữ Việt Nam (VIVID)</span>
                </div>
              </>
            ) : (
              <p className="text-xs text-muted">
                {proverbLoadFailed
                  ? "Chưa thể tải câu hôm nay."
                  : "Đang tải lời cổ nhân…"}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* 3. DÒNG BẢN QUYỀN VÀ PHÁP LÝ (LOWER BAR) */}
      <div className="site-footer__lower">
        <div className="site-footer__lower-inner">
          <p>
            © {new Date().getFullYear()} Tin Lắm Tâm Linh.
          </p>
          <div className="footer-legal-links">
            <button type="button" onClick={() => goTo("account")} className="footer-legal-link">
              Góc của tôi
            </button>
            <span>·</span>
            <button type="button" onClick={() => goTo("membership")} className="footer-legal-link text-accent">
              Gói Tâm An
            </button>
            <span>·</span>
            <button type="button" onClick={() => goTo("today")} className="footer-legal-link">
              Hôm nay
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
