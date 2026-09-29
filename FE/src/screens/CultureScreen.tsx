import React, { useState, useMemo } from "react";
import {
  Search,
  Compass,
  Tag,
  RotateCcw,
  Eye,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  BookOpen,
} from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Badge } from "@/src/components/ui/badge";
import { Card } from "@/src/components/ui/card";
import {
  CULTURE_ARTICLES,
  RegionKey,
  CultureCategoryKey,
} from "../data/cultureData";

interface CultureScreenProps {
  onSelectArticle: (id: string) => void;
  onGoToHome: () => void;
  onGoToRituals?: () => void;
  onGoToCalendar?: () => void;
}

export const CultureScreen: React.FC<CultureScreenProps> = ({
  onSelectArticle,
  onGoToHome,
  onGoToRituals,
  onGoToCalendar,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRegion, setSelectedRegion] = useState<string>("all");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [forceEmptyState, setForceEmptyState] = useState(false);

  const REGIONS: { key: string; label: string }[] = [
    { key: "all", label: "Tất cả vùng miền" },
    { key: "Bắc Bộ", label: "Bắc Bộ (Đình làng, Quan họ, Tứ Phủ)" },
    { key: "Trung Bộ", label: "Trung Bộ (Xứ Huế, Miền biển, Cầu Ngư)" },
    { key: "Nam Bộ", label: "Nam Bộ (Phù sa sông nước, Bà Chúa Xứ)" },
  ];

  const CATEGORIES: { key: string; label: string }[] = [
    { key: "all", label: "Tất cả chủ đề" },
    { key: "Lễ hội truyền thống", label: "Lễ hội truyền thống" },
    { key: "Phong tục & Nghi lễ", label: "Phong tục & Nghi lễ tập quán" },
    { key: "Điển tích xưa", label: "Điển tích & Tích xưa" },
    { key: "Không gian tín ngưỡng", label: "Không gian tín ngưỡng (Đình, Đền, Miếu)" },
  ];

  const filteredArticles = useMemo(() => {
    if (forceEmptyState) return [];

    return CULTURE_ARTICLES.filter((article) => {
      // Region filter
      if (selectedRegion !== "all" && article.region !== selectedRegion) {
        return false;
      }
      // Category filter
      if (selectedCategory !== "all" && article.category !== selectedCategory) {
        return false;
      }
      // Search filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchTitle = article.title.toLowerCase().includes(q);
        const matchSubtitle = article.subtitle.toLowerCase().includes(q);
        const matchExcerpt = article.excerpt.toLowerCase().includes(q);
        const matchRegion = article.region.toLowerCase().includes(q);
        return matchTitle || matchSubtitle || matchExcerpt || matchRegion;
      }
      return true;
    });
  }, [selectedRegion, selectedCategory, searchQuery, forceEmptyState]);

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedRegion("all");
    setSelectedCategory("all");
    setForceEmptyState(false);
  };

  return (
    <div className="w-full min-h-screen bg-[#fcf8f2] text-[#2e2624] font-['Be_Vietnam_Pro',sans-serif]">
      <main className="max-w-6xl mx-auto px-4 sm:px-6 pt-6 pb-20">
        {/* Breadcrumb & Top Tag */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6 text-xs text-[#8c7a72]">
          <div className="flex items-center gap-2">
            <button
              onClick={onGoToHome}
              className="hover:text-[#9e3b2e] cursor-pointer transition-colors"
            >
              Trang chủ
            </button>
            <span>›</span>
            <span className="text-[#9e3b2e] font-semibold">Khám phá văn hóa</span>
          </div>

          <div className="flex items-center gap-2 uppercase font-medium tracking-wider text-[11px] text-[#938279]">
            <span className="text-[#9e3b2e]">✦</span>
            <span>KHO TÀNG DÂN GIAN • GÓC NHÌN VĂN HÓA & ĐỜI SỐNG TÂM LINH</span>
          </div>
        </div>

        {/* Khám phá Sub-tabs */}
        <div className="flex items-center gap-2 mb-6">
          <button className="px-4 py-2 rounded-full bg-[#9e3b2e] text-white text-xs font-semibold shadow-2xs">
            Di sản & Điển tích dân gian
          </button>
          {onGoToRituals && (
            <button
              onClick={onGoToRituals}
              className="px-4 py-2 rounded-full bg-white border border-[#eddcd0] text-[#6d5c55] hover:border-[#9e3b2e] hover:text-[#9e3b2e] text-xs font-medium transition-all cursor-pointer"
            >
              Cẩm nang nghi lễ tại gia (Mới)
            </button>
          )}
          {onGoToCalendar && (
            <button
              onClick={onGoToCalendar}
              className="px-4 py-2 rounded-full bg-white border border-[#eddcd0] text-[#6d5c55] hover:border-[#9e3b2e] hover:text-[#9e3b2e] text-xs font-medium transition-all cursor-pointer"
            >
              Lịch văn hóa & Tiết khí (Mới)
            </button>
          )}
        </div>

        {/* Hero Banner Card */}
        <div className="relative rounded-3xl p-8 sm:p-12 mb-8 overflow-hidden bg-gradient-to-br from-[#faece1] via-[#fbf1e7] to-[#faece1] border border-[#ebd6c5] shadow-xs">
          {/* Watermark sacred geometric motif */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 w-64 h-64 sm:w-80 sm:h-80 pointer-events-none opacity-25">
            <svg
              className="w-full h-full text-[#9e3b2e] stroke-current fill-none"
              viewBox="0 0 100 100"
            >
              <circle cx="50" cy="50" r="48" strokeWidth="0.8" />
              <circle cx="50" cy="50" r="38" strokeWidth="0.6" strokeDasharray="2 3" />
              <circle cx="50" cy="50" r="24" strokeWidth="0.8" />
              <path
                d="M50 2 L50 98 M2 50 L98 50 M16 16 L84 84 M16 84 L84 16"
                strokeWidth="0.5"
                strokeOpacity="0.7"
              />
            </svg>
          </div>

          <div className="relative max-w-2xl">
            <div className="mb-3">
              <Badge
                variant="terracotta"
                className="px-3 py-1 text-xs font-semibold uppercase tracking-wider bg-[#faede2] text-[#9e3b2e] border-[#ebd7c8]"
              >
                Tập tuyển thư tịch dân gian
              </Badge>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-[40px] font-['Noto_Serif',serif] font-bold text-[#2a2220] leading-tight mb-4">
              Khám phá phong thổ & nét thiêng dân gian
            </h1>

            <p className="text-sm sm:text-base text-[#6f5e57] leading-relaxed">
              Tìm hiểu chiều sâu tập tục, huyền tích và không gian tín ngưỡng ba miền dưới
              góc nhìn văn hóa, nhân bản và lịch sử thuần khiết của người Việt.
            </p>
          </div>
        </div>

        {/* Search & Filter Container Card */}
        <Card className="p-6 sm:p-7 rounded-3xl bg-white border border-[#eddcd0] mb-8 shadow-xs space-y-5">
          {/* Search Input Box */}
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (forceEmptyState) setForceEmptyState(false);
              }}
              placeholder="Tìm kiếm lễ hội, phong tục, điển tích dân gian, đền miếu xưa..."
              className="w-full pl-11 pr-14 py-3 rounded-2xl bg-[#faf3ec]/70 border border-[#eddcd0] text-sm text-[#2e2624] placeholder-[#a29289] focus:outline-none focus:ring-1 focus:ring-[#9e3b2e]"
            />
            <Search className="w-5 h-5 text-[#9e8b82] absolute left-3.5 top-3.5" />
            <span className="hidden sm:inline-block absolute right-3.5 top-3.5 px-2 py-0.5 rounded-md bg-[#ede0d4] text-[11px] font-mono text-[#85736b]">
              ⌘K
            </span>
          </div>

          {/* Region Filters Row */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 pt-1 border-t border-[#f4e8dc]">
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#7e6c64] min-w-[130px]">
              <Compass className="w-4 h-4 text-[#9e3b2e]" />
              <span>Vùng miền:</span>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {REGIONS.map((r) => {
                const isActive = selectedRegion === r.key && !forceEmptyState;
                return (
                  <button
                    key={r.key}
                    onClick={() => {
                      setSelectedRegion(r.key);
                      setForceEmptyState(false);
                    }}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                      isActive
                        ? "bg-[#9e3b2e] text-white shadow-2xs font-semibold"
                        : "bg-[#fbf4ed] text-[#715f57] border border-[#ecd9cb] hover:border-[#dfc3af]"
                    }`}
                  >
                    {r.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Category Filters Row */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 pt-1 border-t border-[#f4e8dc]">
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#7e6c64] min-w-[130px]">
              <Tag className="w-4 h-4 text-[#9e3b2e]" />
              <span>Chủ đề văn hóa:</span>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {CATEGORIES.map((c) => {
                const isActive = selectedCategory === c.key && !forceEmptyState;
                return (
                  <button
                    key={c.key}
                    onClick={() => {
                      setSelectedCategory(c.key);
                      setForceEmptyState(false);
                    }}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                      isActive
                        ? "bg-[#9e3b2e] text-white shadow-2xs font-semibold"
                        : "bg-[#fbf4ed] text-[#715f57] border border-[#ecd9cb] hover:border-[#dfc3af]"
                    }`}
                  >
                    {c.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Filter Status Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-[#f4e8dc] text-xs text-[#8c7b74]">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#9e3b2e]"></span>
              <span>
                Hiển thị <strong>{filteredArticles.length}</strong> chuyên đề văn hóa
                chọn lọc
              </span>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={() => setForceEmptyState(!forceEmptyState)}
                className="flex items-center gap-1 text-[#8b7972] hover:text-[#9e3b2e] cursor-pointer transition-colors"
                title="Bật/tắt trạng thái không có kết quả để kiểm tra giao diện"
              >
                <Eye className="w-3.5 h-3.5 text-[#9e3b2e]" />
                <span>
                  {forceEmptyState ? "Tắt thử nghiệm Empty" : "Thử nghiệm: Trạng thái trống (Empty State)"}
                </span>
              </button>

              <button
                onClick={handleResetFilters}
                className="flex items-center gap-1 text-[#8b7972] hover:text-[#9e3b2e] cursor-pointer transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Đặt lại bộ lọc</span>
              </button>
            </div>
          </div>
        </Card>

        {/* Articles Grid or Empty State */}
        {filteredArticles.length === 0 ? (
          <Card className="p-12 text-center rounded-3xl bg-white border border-[#eddcd0] max-w-lg mx-auto shadow-xs my-10">
            <div className="w-14 h-14 mx-auto rounded-full bg-[#faede2] text-[#9e3b2e] flex items-center justify-center mb-4">
              <BookOpen className="w-6 h-6" />
            </div>
            <h3 className="font-['Noto_Serif',serif] font-bold text-xl text-[#2a2220] mb-2">
              Chưa tìm thấy chuyên đề phù hợp
            </h3>
            <p className="text-sm text-[#786760] leading-relaxed mb-6">
              Không có bài viết nào khớp với từ khóa hoặc bộ lọc hiện tại. Bạn có thể thử tìm
              từ khóa khác hoặc đặt lại bộ lọc.
            </p>
            <Button variant="default" size="pill" onClick={handleResetFilters}>
              Đặt lại tất cả bộ lọc
            </Button>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {filteredArticles.map((article) => (
              <Card
                key={article.id}
                onClick={() => onSelectArticle(article.id)}
                className="rounded-3xl overflow-hidden bg-white border border-[#eddcd0] hover:border-[#dfc3af] hover:shadow-md transition-all duration-300 flex flex-col justify-between group cursor-pointer"
              >
                <div>
                  {/* Photo with Overlay Badges */}
                  <div className="relative h-52 sm:h-56 overflow-hidden bg-[#faede2]">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />

                    <div className="absolute top-3 left-3 flex flex-wrap items-center gap-1.5">
                      <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-xs text-[11px] font-semibold text-white tracking-wide border border-white/20">
                        {article.region}
                      </span>
                      <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-xs text-[11px] font-medium text-white/95 border border-white/20">
                        {article.category}
                      </span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6">
                    <h3 className="font-['Noto_Serif',serif] font-bold text-lg sm:text-xl text-[#2a2220] leading-snug mb-2.5 group-hover:text-[#9e3b2e] transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-sm text-[#6f5e57] leading-relaxed line-clamp-3">
                      {article.excerpt}
                    </p>
                  </div>
                </div>

                {/* Card Footer */}
                <div className="px-6 py-4 border-t border-[#f4e8dc] flex items-center justify-between text-xs text-[#8c7b74]">
                  <span className="italic truncate max-w-[170px] text-[#96847c]">
                    Nội dung minh họa – chờ kiểm chứng
                  </span>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectArticle(article.id);
                    }}
                    className="text-[#9e3b2e] font-semibold flex items-center gap-1 hover:underline cursor-pointer"
                  >
                    <span>Tìm hiểu</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Editorial Principles Callout Banner */}
        <div className="p-5 sm:p-6 rounded-3xl bg-[#fbece1]/80 border border-[#ecd5c4] flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-16 shadow-2xs">
          <div className="flex items-start sm:items-center gap-3.5">
            <div className="w-10 h-10 rounded-2xl bg-[#faede2] border border-[#e5cdbc] flex items-center justify-center text-[#9e3b2e] flex-shrink-0">
              <ShieldCheck className="w-5 h-5 text-[#9e3b2e]" />
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-[#9e3b2e] mb-0.5">
                NGUYÊN TẮC BIÊN TẬP & BẢO TỒN • Về nội dung văn hóa
              </div>
              <p className="text-xs sm:text-sm text-[#73615a] leading-relaxed max-w-2xl">
                Tổng hợp từ góc nhìn văn hóa học, nhân học và di sản tập tục dân gian Việt Nam.
                Các bài viết hiện là nội dung minh họa, đang được biên tập và kiểm chứng nguồn
                trước khi công bố.
              </p>
            </div>
          </div>

          <div className="px-3.5 py-1.5 rounded-full bg-white/90 border border-[#edd6c7] text-xs font-medium text-[#883227] flex-shrink-0 self-start sm:self-auto shadow-2xs">
            Bản quyền tư liệu Tin Lắm Tâm Linh
          </div>
        </div>

        {/* Bottom Serif Motto */}
        <div className="text-center pt-8 border-t border-[#eddcd0]">
          <p className="font-['Noto_Serif',serif] italic font-semibold text-lg sm:text-xl text-[#9e3b2e] mb-1.5">
            “Tâm bình thế giới bình, lòng an vạn sự tỏ.”
          </p>
          <div className="text-xs uppercase tracking-widest text-[#938279] font-medium">
            Thông điệp của Tin Lắm Tâm Linh
          </div>
        </div>
      </main>
    </div>
  );
};
