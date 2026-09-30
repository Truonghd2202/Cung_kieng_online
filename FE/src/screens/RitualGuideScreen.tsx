import React, { useState, useMemo } from "react";
import {
  Search,
  BookOpen,
  Sparkles,
  Heart,
  Clock,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Flower2,
  Calendar,
  Compass,
} from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Badge } from "@/src/components/ui/badge";
import { Card } from "@/src/components/ui/card";
import {
  RITUAL_GUIDES,
  RitualOccasionKey,
  RitualRegionKey,
  RitualGuideItem,
} from "../data/ritualData";

interface RitualGuideScreenProps {
  onSelectRitual: (id: string) => void;
  onGoToCulture?: () => void;
}

export const RitualGuideScreen: React.FC<RitualGuideScreenProps> = ({
  onSelectRitual,
  onGoToCulture,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOccasion, setSelectedOccasion] = useState<RitualOccasionKey>("all");
  const [selectedRegion, setSelectedRegion] = useState<RitualRegionKey>("all");

  const OCCASIONS: { key: RitualOccasionKey; label: string }[] = [
    { key: "all", label: "Tất cả" },
    { key: "Rằm", label: "Rằm" },
    { key: "Mùng một", label: "Mùng một" },
    { key: "Tết Nguyên Đán", label: "Tết Nguyên Đán" },
    { key: "Dịp gia đình", label: "Dịp gia đình (Giỗ chạp, Chuyển nhà)" },
  ];

  const REGIONS: { key: RitualRegionKey; label: string }[] = [
    { key: "all", label: "Tất cả vùng miền" },
    { key: "Bắc Bộ", label: "Bắc Bộ" },
    { key: "Trung Bộ", label: "Trung Bộ" },
    { key: "Nam Bộ", label: "Nam Bộ" },
    { key: "Thích ứng đa vùng", label: "Thích ứng đa vùng" },
  ];

  const filteredItems = useMemo(() => {
    return RITUAL_GUIDES.filter((item) => {
      // Occasion filter
      if (selectedOccasion !== "all" && item.occasion !== selectedOccasion) {
        return false;
      }
      // Region filter
      if (selectedRegion !== "all" && item.region !== selectedRegion) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = item.title.toLowerCase().includes(q);
        const matchesDesc = item.desc.toLowerCase().includes(q);
        const matchesOccasion = item.occasion.toLowerCase().includes(q);
        if (!matchesTitle && !matchesDesc && !matchesOccasion) {
          return false;
        }
      }
      return true;
    });
  }, [searchQuery, selectedOccasion, selectedRegion]);

  return (
    <div className="screen-shell">
      <main className="page-container max-w-6xl">
        {/* Top Breadcrumb & Tag */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 text-xs text-muted">
          <div className="flex items-center gap-2">
            <span
              onClick={onGoToCulture}
              className="hover:text-accent cursor-pointer transition-colors"
            >
              Khám phá
            </span>
            <span>/</span>
            <span className="text-accent font-semibold">Cẩm nang nghi lễ</span>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 uppercase font-semibold text-xs text-muted">
              <span className="w-2 h-2 rounded-full bg-action inline-block"></span>
              <span>THƯ VIỆN NGHI THỨC GIA ĐÌNH • BẢN SẮC & THÍCH ỨNG</span>
            </div>
          </div>
        </div>

        {/* Khám phá Sub-tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-6">
          {onGoToCulture && (
            <button
              onClick={onGoToCulture}
              className="px-4 py-2 rounded-full bg-surface border border-line text-ink hover:border-accent hover:text-accent text-xs font-medium transition-all cursor-pointer"
            >
              Di sản & Điển tích dân gian
            </button>
          )}
          <button className="px-4 py-2 rounded-full bg-action text-white text-xs font-semibold shadow-2xs">
            Cẩm nang nghi lễ tại gia (Mới)
          </button>
        </div>

        {/* Header Title Section */}
        <div className="mb-8">
          <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-accent mb-2">
            <BookOpen className="w-4 h-4" />
            <span>HỒ SƠ KHẢO CỨU & THỰC HÀNH TẠI GIA</span>
          </div>

          <h1 className="page-title mb-3">
            Cẩm nang nghi lễ tại gia
          </h1>
          <p className="text-sm sm:text-base text-ink leading-relaxed max-w-3xl">
            Thư viện mở hỗ trợ người trẻ tìm hiểu cội nguồn và tự chuẩn bị các nếp phong tục
            truyền thống tại nhà. Tinh giản, trang trọng, tôn trọng hoàn cảnh sống hiện đại mà
            vẫn giữ vẹn tâm tình hiếu kính.
          </p>
        </div>

        {/* Search & Filter Toolbar */}
        <div className="py-6 border-y border-line mb-10 space-y-5">
          {/* Search Row */}
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm kiếm nghi thức, ngày lễ, lễ vật giản dị (ví dụ: ngày rằm, mùng một, giỗ, tết)..."
                className="w-full pl-11 pr-4 py-3 rounded-panel bg-surface border border-line text-sm text-ink placeholder:text-subtle focus:outline-none focus:ring-2 focus:ring-accent/30 transition-all"
              />
            </div>
            <Button
              variant="default"
              size="lg"
              className="px-6 py-3 rounded-panel text-sm font-semibold shrink-0 gap-1.5"
            >
              <span>Tìm</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>

          {/* Filter: Theo Dịp */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="font-semibold text-muted flex items-center gap-1 mr-1">
              <Calendar className="w-3.5 h-3.5" />
              <span>Theo Dịp:</span>
            </span>
            {OCCASIONS.map((occ) => {
              const isActive = selectedOccasion === occ.key;
              return (
                <button
                  key={occ.key}
                  onClick={() => setSelectedOccasion(occ.key)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                    isActive
                      ? "bg-action text-white shadow-2xs font-semibold"
                      : "bg-surface border border-line text-ink hover:border-line"
                  }`}
                >
                  {occ.label}
                </button>
              );
            })}
          </div>

          {/* Filter: Vùng Miền */}
          <div className="flex flex-wrap items-center gap-2 text-xs pt-1 border-t border-line/70">
            <span className="font-semibold text-muted flex items-center gap-1 mr-1">
              <Compass className="w-3.5 h-3.5" />
              <span>Vùng miền:</span>
            </span>
            {REGIONS.map((reg) => {
              const isActive = selectedRegion === reg.key;
              return (
                <button
                  key={reg.key}
                  onClick={() => setSelectedRegion(reg.key)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                    isActive
                      ? "bg-action text-on-action shadow-2xs font-semibold"
                      : "bg-surface border border-line text-ink hover:border-line"
                  }`}
                >
                  {reg.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* 6 Cards Grid (3 Columns) */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {filteredItems.map((item) => {
              const isHighlight = item.id === "chuan-bi-ngay-ram";
              return (
                <Card
                  key={item.id}
                  className={`rounded-panel overflow-hidden flex flex-col justify-between transition-colors duration-200 ${
                    isHighlight
                      ? "bg-surface border-accent/40"
                      : "bg-surface border-line"
                  }`}
                >
                  <div>
                    {/* Image Banner */}
                    <div className="relative h-52 w-full overflow-hidden bg-surface">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

                      {/* Top Badges */}
                      <div className="absolute top-3 left-3 flex items-center gap-1.5 flex-wrap">
                        {item.badge && (
                          <span
                            className={`px-2.5 py-1 rounded-full text-xs font-bold tracking-wide uppercase ${
                              item.badgeType === "featured"
                                ? "bg-action text-white shadow-2xs"
                                : item.badgeType === "family"
                                ? "bg-action text-on-action"
                                : "bg-surface/95 text-accent"
                            }`}
                          >
                            {item.badge}
                          </span>
                        )}
                        {item.subBadgeOccasion && (
                          <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-black/50 text-white backdrop-blur-xs">
                            {item.subBadgeOccasion}
                          </span>
                        )}
                      </div>

                      {/* Bottom-right Tag on Image */}
                      <div className="absolute bottom-3 right-3">
                        <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-black/60 text-white/90 backdrop-blur-xs border border-white/20">
                          {item.tagOnImage}
                        </span>
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="p-5">
                      {/* Meta line */}
                      <div className="flex items-center gap-2 text-xs text-muted mb-2 font-medium">
                        <span>{item.stepsCount}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-accent" />
                          <span>{item.timeEstimate}</span>
                        </span>
                      </div>

                      {/* Title */}
                      <h2
                        onClick={() => onSelectRitual(item.id)}
                        className="font-display font-bold text-xl text-ink leading-snug mb-2 hover:text-accent transition-colors cursor-pointer"
                      >
                        {item.title}
                      </h2>

                      {/* Description */}
                      <p className="text-sm text-ink leading-relaxed line-clamp-3">
                        {item.desc}
                      </p>
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div className="px-5 pb-5 pt-3 border-t border-line flex items-center justify-between gap-2">
                    <span className="text-xs uppercase font-bold tracking-wider text-muted truncate">
                      {item.tagPill}
                    </span>

                    <button
                      onClick={() => onSelectRitual(item.id)}
                      className={`inline-flex items-center gap-1 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                        isHighlight
                          ? "bg-action text-white hover:bg-action shadow-2xs"
                          : "text-accent hover:bg-surface border border-transparent hover:border-line"
                      }`}
                    >
                      <span>{item.actionText}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </Card>
              );
            })}
          </div>
        ) : (
          <div className="p-12 text-center rounded-card bg-surface border border-line mb-16">
            <p className="text-base text-muted mb-4">
              Không tìm thấy nghi thức phù hợp với bộ lọc đã chọn.
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSearchQuery("");
                setSelectedOccasion("all");
                setSelectedRegion("all");
              }}
            >
              Đặt lại bộ lọc
            </Button>
          </div>
        )}

        {/* Philosophy Pledge Banner */}
        <Card className="p-6 sm:p-7 rounded-card bg-surface/70 border border-line mb-12 shadow-2xs">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-panel bg-surface border border-line flex items-center justify-center text-accent shrink-0 mt-0.5">
                <Flower2 className="w-6 h-6" />
              </div>
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-accent mb-1.5 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4" />
                  <span>NGUYÊN TẮC TÙY DUYÊN & TÂM THÀNH LÀM TRỌNG</span>
                </div>
                <p className="text-sm text-ink leading-relaxed max-w-3xl">
                  Tập tục tín ngưỡng dân gian Việt Nam thiên biến vạn hóa theo từng nếp nhà,
                  dòng họ và phong thổ ba miền. <strong>Tin Lắm Tâm Linh</strong> tuyệt đối không
                  tự tạo văn khấn, không áp đặt bất kỳ nghi thức nào là “chuẩn duy nhất” hay mang
                  tính bắt buộc. Người trẻ có thể linh hoạt gia giảm lễ vật phù hợp điều kiện căn
                  hộ, tài chính và thời gian thực tế. Sự thanh tịnh và lòng hiếu kính chính là cốt
                  lõi của mọi nghi lễ.
                </p>
              </div>
            </div>

            <Button
              variant="outline"
              size="sm"
              className="shrink-0 bg-surface border-line hover:bg-surface text-xs font-semibold text-accent"
            >
              <span>Đọc Quy ước An yên</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </Button>
          </div>
        </Card>

        {/* Classical Bottom Quote */}
        <div className="text-center pt-6 border-t border-line">
          <div className="text-xs uppercase tracking-widest text-muted font-medium">
            © {new Date().getFullYear()} Tin Lắm Tâm Linh • Chiêm nghiệm dân gian đương đại
          </div>
        </div>
      </main>
    </div>
  );
};
