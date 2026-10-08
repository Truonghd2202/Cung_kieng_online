import React, { useEffect, useState } from "react";
import { NavScreen } from "./AppHeader";
import { DailyProverb, loadDailyProverb } from "../data/contentService";

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

export const AppFooter: React.FC<AppFooterProps> = ({ onNavigate }) => {
  const [dailyProverb, setDailyProverb] = useState<DailyProverb | null>(null);
  const [proverbLoadFailed, setProverbLoadFailed] = useState(false);

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

  return <footer className="site-footer">
    <div className="site-footer__inner">
      <div className="site-footer__message">
        {dailyProverb ? (
          <>
            <blockquote className="site-footer__quote">“{dailyProverb.content}”</blockquote>
            <p className="site-footer__tagline">{dailyProverb.meaning}</p>
            <p className="site-footer__tagline">
              Nguồn: <a href={dailyProverb.source.url} target="_blank" rel="noreferrer">VIVID</a>
              {` • Câu ${dailyProverb.sequence}/${dailyProverb.cycleLength}`}
            </p>
          </>
        ) : (
          <p className="site-footer__tagline">
            {proverbLoadFailed ? "Chưa thể tải câu hôm nay." : "Đang tải câu hôm nay…"}
          </p>
        )}
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
  </footer>;
};
