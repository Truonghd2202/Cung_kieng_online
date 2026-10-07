import React from "react";
import {
  Sparkles,
  ShieldCheck,
  Compass,
  HeartHandshake,
  ArrowRight,
} from "lucide-react";
import { NavScreen } from "./AppHeader";
import "../styles/AppFooter.css";

interface AppFooterProps {
  onNavigate?: (screen: NavScreen) => void;
}

export const AppFooter: React.FC<AppFooterProps> = ({ onNavigate }) => {
  return (
    <footer className="heritage-footer" role="contentinfo">
      {/* Họa tiết hoa sen mờ dập chìm góc nền */}
      <svg
        className="heritage-footer__watermark"
        viewBox="0 0 100 100"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M50 15 C35 30 20 45 20 65 C20 80 35 90 50 90 C65 90 80 80 80 65 C80 45 65 30 50 15 Z" />
        <path d="M50 25 C40 38 30 50 30 65 C30 76 40 84 50 85 C60 84 70 76 70 65 C70 50 60 38 50 25 Z" opacity="0.6" />
      </svg>

      {/* Lưới 3 cột chính đẳng cấp */}
      <div className="heritage-footer__grid">
        {/* ===================================================================
            CỘT 1: NHẬN DIỆN THƯƠNG HIỆU & TRIẾT LÝ
            =================================================================== */}
        <div className="heritage-footer__brand-col">
          <div className="heritage-footer__brand-group">
            <svg
              className="heritage-footer__lamp-icon"
              viewBox="0 0 40 40"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.3"
              aria-hidden="true"
            >
              <path d="M20 5c-3 4-5 8-5 13 0 5 2.5 8 5 9 2.5-1 5-4 5-9 0-5-2-9-5-13Z" />
              <path d="M12 25c1.5 2 4 4 8 4s6.5-2 8-4" />
              <path d="M16 29c1 2.5 2.5 4 4 4s3-1.5 4-4" />
              <path d="M14 33h12" />
              <circle cx="20" cy="18" r="2" fill="currentColor" />
            </svg>
            <span className="heritage-footer__brand-title">Tin Lắm Tâm Linh</span>
            <span className="heritage-footer__seal" title="Dấu ấn Tâm">
              心
            </span>
          </div>

          <blockquote className="heritage-footer__quote">
            “Tâm bình thế giới bình, lòng an vạn sự tỏ.”
          </blockquote>

          <p className="heritage-footer__desc">
            Trạm dừng tĩnh tại kết nối kho tàng văn hóa dân gian Việt với nhịp sống số hiện đại,
            mang đến điểm tựa tinh thần nhẹ nhàng và nâng niu tâm hồn người trẻ.
          </p>

          <div className="heritage-footer__badge">
            <ShieldCheck className="w-3.5 h-3.5 text-accent" aria-hidden="true" />
            <span>Phi mê tín dị đoan · Tự nguyện · Không phán xét</span>
          </div>
        </div>

        {/* ===================================================================
            CỘT 2: KHÔNG GIAN TRẢI NGHIỆM & DI SẢN
            =================================================================== */}
        <div className="heritage-footer__links-col">
          <h3 className="heritage-footer__col-title">
            <Compass className="heritage-footer__col-title-icon" aria-hidden="true" />
            <span>Không gian Trải nghiệm</span>
          </h3>

          <ul className="heritage-footer__links-list">
            <li>
              <button
                type="button"
                onClick={() => onNavigate?.("today")}
                className="heritage-footer__link-btn"
              >
                <span className="heritage-footer__link-bullet" />
                <span>Lắng nghe cảm xúc (Hôm nay)</span>
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => onNavigate?.("xinxam")}
                className="heritage-footer__link-btn"
              >
                <span className="heritage-footer__link-bullet" />
                <span>Xin xăm Quan Âm & Quan Thánh</span>
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => onNavigate?.("wish")}
                className="heritage-footer__link-btn"
              >
                <span className="heritage-footer__link-bullet" />
                <span>Thả đèn hoa đăng số cầu an</span>
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => onNavigate?.("gratitude")}
                className="heritage-footer__link-btn"
              >
                <span className="heritage-footer__link-bullet" />
                <span>Tri ân cội nguồn & Gia tiên</span>
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => onNavigate?.("culture")}
                className="heritage-footer__link-btn"
              >
                <span className="heritage-footer__link-bullet" />
                <span>Khám phá di sản ba miền</span>
              </button>
            </li>
          </ul>
        </div>

        {/* ===================================================================
            CỘT 3: ĐỒNG HÀNH & GIEO DUYÊN (GÓI TÂM AN & CỘNG ĐỒNG)
            =================================================================== */}
        <div className="heritage-footer__partnership-col">
          <h3 className="heritage-footer__col-title">
            <HeartHandshake className="heritage-footer__col-title-icon" aria-hidden="true" />
            <span>Đồng hành & Gieo duyên</span>
          </h3>

          {/* Thẻ Gói Tâm An diễn đạt tinh tế, tôn nghiêm */}
          <div className="heritage-footer__membership-card">
            <div className="heritage-footer__membership-tag">
              <Sparkles className="w-3 h-3 text-amber-600" />
              <span>Góp quỹ số hóa di sản</span>
            </div>
            <h4 className="heritage-footer__membership-heading">Gói Tâm An</h4>
            <p className="heritage-footer__membership-text">
              Chung tay bảo tồn, số hóa các giá trị nghi lễ và phát triển không gian an trú thiện lành.
            </p>
            <button
              type="button"
              onClick={() => onNavigate?.("membership")}
              className="heritage-footer__membership-cta"
            >
              <span>Tìm hiểu & Gieo duyên</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <ul className="heritage-footer__links-list">
            <li>
              <button
                type="button"
                onClick={() => onNavigate?.("account")}
                className="heritage-footer__link-btn"
              >
                <span className="heritage-footer__link-bullet" />
                <span>Góc lưu giữ của tôi</span>
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => onNavigate?.("guest")}
                className="heritage-footer__link-btn"
              >
                <span className="heritage-footer__link-bullet" />
                <span>Trang giới thiệu chung</span>
              </button>
            </li>
          </ul>
        </div>
      </div>

      {/* Nẹp viền chỉ vàng đồng mảnh trang nghiêm */}
      <div className="heritage-footer__golden-line" aria-hidden="true" />

      {/* Dải chân trang cuối cùng */}
      <div className="heritage-footer__bottom">
        <p className="heritage-footer__copyright">
          © {new Date().getFullYear()} <strong>Tin Lắm Tâm Linh</strong>. 
        </p>
        <p className="heritage-footer__aesthetics">
          Tiếp nối tinh hoa mỹ học Dó &amp; Gốm Việt đương đại.
        </p>
      </div>
    </footer>
  );
};
