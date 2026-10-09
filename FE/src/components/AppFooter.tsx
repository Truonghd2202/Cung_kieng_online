import React, { useEffect, useState } from "react";
import { NavScreen } from "./AppHeader";
import { DailyProverb, loadDailyProverb } from "../data/contentService";
import {
  Sparkles,
  ShieldCheck,
  ArrowRight,
  BookOpen,
  Compass,
  Heart,
  Crown,
  Flower2,
  Calendar,
  ScrollText,
} from "lucide-react";

interface AppFooterProps {
  onNavigate?: (screen: NavScreen) => void;
}

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

  const goTo = (screen: NavScreen) => {
    if (onNavigate) {
      onNavigate(screen);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className="site-footer" role="contentinfo">
      {/* 1. THẺ NỔI BẬT: GÓI TÂM AN (PROMINENT MEMBERSHIP CTA) */}
      <div className="footer-membership-banner">
        <div className="footer-membership-card">
          <div className="footer-membership-left">
            <div className="footer-membership-badge">
              <Crown className="w-3.5 h-3.5 text-amber-300" />
              <span>ĐẶC QUYỀN HỘI VIÊN · GÓI TÂM AN</span>
            </div>
            <h3 className="footer-membership-title">
              Nuôi dưỡng an yên mỗi ngày cùng Tín Lam Premium
            </h3>
            <p className="footer-membership-desc">
              Mở khóa trọn bộ phân tích chiêm nghiệm chuyên sâu, sổ tay nhật ký phản tư không giới hạn và không gian lưu giữ gia phả ký ức gia tiên.
            </p>
          </div>
          <button
            type="button"
            onClick={() => goTo("membership")}
            className="footer-membership-btn group"
            id="footer-membership-cta"
          >
            <Sparkles className="w-4 h-4 text-amber-200" />
            <span>Khám phá Gói Tâm An</span>
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
              Tín Lắm Tâm Linh
            </span>
          </div>
          <p className="footer-brand-desc">
            Điểm tựa tinh thần &amp; khơi nguồn tri thức di sản Việt đương đại. Kết hợp mỹ học Giấy Dó, Gốm cổ và công nghệ chiêm nghiệm phi mê tín.
          </p>
          <p className="text-[11px] text-muted/70 mt-1.5 italic">
            100% Phi mê tín dị đoan · Dữ liệu bảo chứng học thuật
          </p>
        </div>

        {/* Cột 2: Thực Hành Tâm An */}
        <div className="footer-nav-col">
          <h4 className="footer-nav-title">
            <Compass className="w-3.5 h-3.5 text-accent" />
            <span>Thực hành Tâm An</span>
          </h4>
          <ul className="footer-nav-list">
            <li>
              <button type="button" onClick={() => goTo("today")} className="footer-link">
                Điểm neo ngày mới
              </button>
            </li>
            <li>
              <button type="button" onClick={() => goTo("mood")} className="footer-link">
                Ghi nhận cảm xúc
              </button>
            </li>
            <li>
              <button type="button" onClick={() => goTo("xinxam")} className="footer-link">
                Xin xăm Quan Âm
              </button>
            </li>
            <li>
              <button type="button" onClick={() => goTo("xinkeo")} className="footer-link">
                Gieo keo Âm Dương
              </button>
            </li>
            <li>
              <button type="button" onClick={() => goTo("wish")} className="footer-link">
                Cây nguyện ước
              </button>
            </li>
            <li>
              <button type="button" onClick={() => goTo("zen")} className="footer-link">
                Thiền &amp; Chuông xoay
              </button>
            </li>
            <li>
              <button type="button" onClick={() => goTo("sanctuary")} className="footer-link">
                Gian thờ gia tiên
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
                Thư viện 14 Di sản 3 miền
              </button>
            </li>
            <li>
              <button type="button" onClick={() => goTo("culture-map")} className="footer-link">
                Bản đồ văn hóa vùng miền
              </button>
            </li>
            <li>
              <button type="button" onClick={() => goTo("rituals")} className="footer-link">
                Cẩm nang nghi lễ &amp; Văn khấn
              </button>
            </li>
            <li>
              <button type="button" onClick={() => goTo("calendar")} className="footer-link">
                Lịch tiết khí &amp; Ngày sóc vọng
              </button>
            </li>
            <li>
              <button type="button" onClick={() => goTo("good-days")} className="footer-link">
                Tra cứu ngày lành xuất hành
              </button>
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
                  <span>• Ngày {dailyProverb.sequence}/365</span>
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
            © {new Date().getFullYear()} Tín Lam Tâm Linh. Dự án Khởi nghiệp Đổi mới Sáng tạo EXE101 · Đại học FPT.
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
