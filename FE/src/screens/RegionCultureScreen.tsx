import React from "react";
import { ArrowLeft, ArrowRight, BookOpen, Sparkles } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Badge } from "@/src/components/ui/badge";
import { Card } from "@/src/components/ui/card";
import { CULTURE_ARTICLES, RegionKey } from "../data/cultureData";
import type { CultureRegionSlug } from "./CulturalMapScreen";
import type { RegionalExperienceKind } from "./RegionalExperienceScreen";

interface RegionCultureScreenProps { region: CultureRegionSlug; onBack: () => void; onSelectArticle: (id: string) => void; onGoToExperience: () => void; onGoToRegionalExperience: (kind: RegionalExperienceKind) => void; }

const REGION_META: Record<CultureRegionSlug, { title: string; region: RegionKey; image: string; description: string; topics: string[] }> = {
  north: { title: "Bắc Bộ", region: "Bắc Bộ", image: "/images/temple_bac_bo.jpg", description: "Từ mái đình, câu quan họ đến những nếp nhà thân thuộc, Bắc Bộ lưu giữ nhiều lớp ký ức cộng đồng của người Việt.", topics: ["Đạo Mẫu", "Chầu văn", "Xin quẻ đầu năm", "Đình làng"] },
  central: { title: "Trung Bộ", region: "Trung Bộ", image: "/images/hue_trung_bo.jpg", description: "Một miền văn hóa trầm lắng, nơi di sản cố đô gặp đời sống biển và những lời cầu bình an chân thành.", topics: ["Lễ Cầu Ngư", "Cá Ông", "Văn hóa Huế", "Nếp biển"] },
  south: { title: "Nam Bộ", region: "Nam Bộ", image: "/images/mekong_nam_bo.jpg", description: "Phù sa, sông nước và sự rộng rãi trong cách sống tạo nên một sắc thái văn hóa vừa gần gũi vừa phóng khoáng.", topics: ["Vía Bà", "Bà Đen", "Văn hóa sông nước", "Hoa đăng"] },
};

export const RegionCultureScreen: React.FC<RegionCultureScreenProps> = ({
  region,
  onBack,
  onSelectArticle,
  onGoToExperience,
  onGoToRegionalExperience,
}) => {
  const meta = REGION_META[region];
  const articles = CULTURE_ARTICLES.filter(
    (article) => article.region === meta.region
  );
  const regionalExperience: RegionalExperienceKind =
    region === "north"
      ? "chau-van"
      : region === "central"
        ? "sea-prayer"
        : "southern-culture";
  const experienceLabel =
    region === "north"
      ? "Nhịp chầu văn"
      : region === "central"
        ? "Lời cầu ra biển"
        : "Dòng sông kể chuyện nhà";

  return (
    <div className="screen-shell">
      <main className="page-container max-w-6xl">
        <div className="flex items-center justify-between gap-3 mb-6 text-xs text-muted">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-1.5 hover:text-accent transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Văn hóa ba miền
          </button>
          <Badge variant="outline">Góc nhìn văn hóa</Badge>
        </div>

        <section className="grid lg:grid-cols-[1.05fr_0.95fr] gap-8 items-center mb-12">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-accent">
              Miền {meta.title}
            </span>
            <h1 className="page-title mt-2 mb-4">Nét văn hóa {meta.title}</h1>
            <p className="text-sm sm:text-base text-muted leading-relaxed mb-6">
              {meta.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {meta.topics.map((topic) => (
                <Badge key={topic} variant="outline">
                  {topic}
                </Badge>
              ))}
            </div>
          </div>
          <div className="relative h-64 rounded-card overflow-hidden border border-line">
            <img
              src={meta.image}
              alt={meta.title}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-canvas/85 to-transparent" />
            <p className="absolute bottom-5 left-5 right-5 font-display text-lg italic text-ink">
              “Tìm hiểu để thêm gần gũi, không phải để phán định.”
            </p>
          </div>
        </section>

        <section className="mb-12">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-accent" />
              <h2 className="section-title">Bài viết trong vùng</h2>
            </div>
            <span className="text-sm text-muted">
              {articles.length} bài viết
            </span>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            {articles.map((article) => (
              <Card
                key={article.id}
                aria-label={`Đọc bài: ${article.title}`}
                onClick={() => onSelectArticle(article.id)}
                className="group p-6 cursor-pointer hover:bg-surface-soft border-line"
              >
                <Badge variant="terracotta" className="mb-4">
                  {article.category}
                </Badge>
                <h3 className="font-display text-xl font-bold mb-2 group-hover:text-accent">
                  {article.title}
                </h3>
                <p className="text-sm text-muted leading-relaxed mb-5">
                  {article.excerpt}
                </p>
                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
                  Đọc bài{" "}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </Card>
            ))}
          </div>
        </section>

        <Card className="p-6 sm:p-8 bg-surface-soft border-line mb-12">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">
            <div className="flex gap-3">
              <Sparkles className="w-5 h-5 text-accent shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-muted leading-relaxed max-w-2xl mb-3">
                  Bạn muốn đi từ đọc hiểu sang một trải nghiệm tĩnh tại? Hãy chọn
                  một không gian phù hợp với nhịp hôm nay.
                </p>
                <button
                  type="button"
                  onClick={() => onGoToRegionalExperience(regionalExperience)}
                  className="text-sm font-semibold text-accent hover:underline"
                >
                  {experienceLabel}{" "}
                  <ArrowRight className="w-3.5 h-3.5 inline" />
                </button>
              </div>
            </div>
            <Button onClick={onGoToExperience} className="gap-2">
              Mở trải nghiệm <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </Card>
      </main>
    </div>
  );
};
