import React from "react";
import { NavScreen } from "./AppHeader";

interface AppFooterProps {
  onNavigate?: (screen: NavScreen) => void;
}

const footerLinks: { label: string; screen: NavScreen }[] = [
  { label: "Hôm nay", screen: "today" },
  { label: "Trải nghiệm", screen: "experience" },
  { label: "Khám phá", screen: "culture" },
  { label: "Góc của tôi", screen: "account" },
  { label: "Gói Tâm An", screen: "membership" },
];

export const AppFooter: React.FC<AppFooterProps> = ({ onNavigate }) => (
  <footer className="site-footer">
    <div className="site-footer__inner">
      <div className="site-footer__message">
        <blockquote className="site-footer__quote">
          “Tâm bình thế giới bình, lòng an vạn sự tỏ”
        </blockquote>
        <p className="site-footer__tagline">
          Lời gửi gắm từ cội nguồn dân gian • Gieo đóa an yên cho tâm hồn hiện đại
        </p>
      </div>
      <nav className="site-footer__nav" aria-label="Liên kết cuối trang">
        {footerLinks.map((link) => (
          <button
            key={link.screen}
            type="button"
            onClick={() => onNavigate?.(link.screen)}
            className="site-footer__link"
          >
            {link.label}
          </button>
        ))}
      </nav>
    </div>
    <div className="site-footer__lower">
      <p>
        © {new Date().getFullYear()} Tin Lắm Tâm Linh. Tiếp nối tinh hoa mỹ học Dó &amp; Gốm Việt đương đại.
      </p>
    </div>
  </footer>
);
