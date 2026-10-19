import React, { useEffect, useState } from "react";
import { NavScreen } from "./AppHeader";
import { DailyProverb, loadDailyProverb } from "../data/contentService";
import { apiRequest } from "../lib/api";
import {
  Sparkles,
  ArrowRight,
  BookOpen,
  Compass,
  Crown,
  Flower2,
  ScrollText,
} from "lucide-react";

interface AppFooterProps {
  onNavigate?: (screen: NavScreen) => void;
}

interface FooterMembershipStatus {
  salesEnabled: boolean;
  checkoutAvailable: boolean;
  paymentEnvironment: "sandbox" | "production";
  subscription: { started_at: string; expires_at: string } | null;
  aiUsage: { successfulUsed: number; inProgress: number; successfulRemaining: number; successfulLimit: number; attemptsUsed: number; attemptsRemaining: number; providerAttemptLimit: number; nextUsableAt: string | null };
}

export const AppFooter: React.FC<AppFooterProps> = ({ onNavigate }) => {
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
    ? `Có hiệu lực đến ${new Date(membershipStatus.subscription.expires_at).toLocaleDateString("vi-VN")}. AI theo năm: ${membershipStatus.aiUsage.successfulUsed} bản thành công, ${membershipStatus.aiUsage.inProgress} lượt đang xử lý; còn ${membershipStatus.aiUsage.successfulRemaining}/${membershipStatus.aiUsage.successfulLimit} suất và ${membershipStatus.aiUsage.attemptsUsed}/${membershipStatus.aiUsage.providerAttemptLimit} lần gọi đã dùng trong 24 giờ.${membershipStatus.aiUsage.nextUsableAt ? ` Dùng tiếp từ ${new Date(membershipStatus.aiUsage.nextUsableAt).toLocaleString("vi-VN")}.` : ""}`
    : !membershipStatus
      ? "Mở trang hội viên để xem trạng thái trực tiếp từ máy chủ."
      : `${!membershipStatus.salesEnabled ? "Đăng ký và gia hạn chưa được mở. " : !membershipStatus.checkoutAvailable ? "Thanh toán hiện chưa khả dụng. " : membershipStatus.paymentEnvironment === "sandbox" ? "Thanh toán chỉ phục vụ thử nghiệm sandbox. " : ""}Gói Free; AI theo năm cần hội viên đang hiệu lực. Hạn mức 24 giờ hiện ghi nhận ${membershipStatus.aiUsage.successfulUsed} bản thành công, ${membershipStatus.aiUsage.inProgress} đang xử lý và ${membershipStatus.aiUsage.attemptsUsed}/${membershipStatus.aiUsage.providerAttemptLimit} lần gọi.${membershipStatus.aiUsage.nextUsableAt ? ` Dùng tiếp từ ${new Date(membershipStatus.aiUsage.nextUsableAt).toLocaleString("vi-VN")}.` : ""}`;

  const goTo = (screen: NavScreen) => {
    if (onNavigate) {
      onNavigate(screen);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className="site-footer" role="contentinfo">
      {/* Trạng thái gói hội viên */}
      <div className="footer-membership-banner">
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
      </div>

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
            Tin Lắm Tâm Linh là dự án; Thích Cúng Kiếng là tên ứng dụng dành cho người dùng.
          </p>
          <p className="text-[11px] text-muted/70 mt-1.5 italic">
            MVP hiện tập trung vào tư liệu văn hóa, checklist nghi lễ và check-in chiêm nghiệm.
          </p>
        </div>

        {/* Cột 2: Các luồng MVP */}
        <div className="footer-nav-col">
          <h4 className="footer-nav-title">
            <Compass className="w-3.5 h-3.5 text-accent" />
            <span>Luồng hiện có</span>
          </h4>
          <ul className="footer-nav-list">
            <li>
                <button type="button" onClick={() => goTo("culture")} className="footer-link">
                Khám phá tư liệu văn hóa
              </button>
            </li>
            <li>
                <button type="button" onClick={() => goTo("rituals")} className="footer-link">
                Hướng dẫn nghi lễ &amp; checklist
              </button>
            </li>
            <li>
                <button type="button" onClick={() => goTo("mood")} className="footer-link">
                Check-in cảm xúc
              </button>
            </li>
          </ul>
        </div>

        {/* Cột 3: Khám Phá Di Sản */}
        <div className="footer-nav-col">
          <h4 className="footer-nav-title">
            <BookOpen className="w-3.5 h-3.5 text-accent" />
            <span>Khám phá Di sản</span>
          </h4>
          <ul className="footer-nav-list">
            <li>
              <button type="button" onClick={() => goTo("culture")} className="footer-link">
                Tư liệu văn hóa
              </button>
            </li>
            <li>
              <button type="button" onClick={() => goTo("rituals")} className="footer-link">
                Cẩm nang nghi lễ
              </button>
            </li>
            <li>
                <button type="button" onClick={() => goTo("mood")} className="footer-link">Check-in &amp; suy ngẫm</button>
              </li>
          </ul>
        </div>

        {/* Cột 4: Minh Triết Ngày Mới (Dynamic Proverb from VIVID) */}
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
                  <span>• Mục {dailyProverb.sequence}/{dailyProverb.cycleLength}</span>
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
            © {new Date().getFullYear()} Tin Lắm Tâm Linh. Ứng dụng: Thích Cúng Kiếng.
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
              Hỗ trợ sinh viên
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
