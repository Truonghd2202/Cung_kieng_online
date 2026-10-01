import React, { useState } from "react";
import { ArrowLeft, BookOpen, Check, Compass, Heart, Play, Waves } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Badge } from "@/src/components/ui/badge";
import { Card } from "@/src/components/ui/card";
import { Textarea } from "@/src/components/ui/textarea";

export type RegionalExperienceKind = "chau-van" | "sea-prayer" | "southern-culture";

interface RegionalExperienceScreenProps {
  kind: RegionalExperienceKind;
  onBack: () => void;
  onGoToWish: () => void;
  onGoToMemorial: () => void;
}

const CONTENT: Record<RegionalExperienceKind, {
  region: string;
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  icon: React.ElementType;
}> = {
  "chau-van": {
    region: "Bắc Bộ",
    eyebrow: "Lời ca nghi lễ · Tự soi chiếu",
    title: "Một nhịp chầu văn thật chậm",
    description: "Lắng nghe câu chuyện về chầu văn, đạo Mẫu và không gian đình làng bằng một nhịp đọc tĩnh tại, tôn trọng di sản và người thực hành.",
    image: "/images/temple_bac_bo.jpg",
    icon: BookOpen,
  },
  "sea-prayer": {
    region: "Trung Bộ",
    eyebrow: "Cầu Ngư · Biển nhớ",
    title: "Gửi lời cầu bình an ra biển",
    description: "Một khoảng dừng lấy cảm hứng từ đời sống vạn chài: nhớ ơn biển, giữ sự tỉnh táo và gửi một lời chúc lành đến người đang lên đường.",
    image: "/images/hue_trung_bo.jpg",
    icon: Waves,
  },
  "southern-culture": {
    region: "Nam Bộ",
    eyebrow: "Phù sa · Nghĩa tình",
    title: "Dòng sông kể chuyện nhà",
    description: "Khám phá nếp sống rộng rãi, nghĩa tình của miền sông nước qua ký ức gia đình, mâm cơm và những mùa hoa đăng.",
    image: "/images/mekong_nam_bo.jpg",
    icon: Heart,
  },
};

export const RegionalExperienceScreen: React.FC<RegionalExperienceScreenProps> = ({ kind, onBack, onGoToWish, onGoToMemorial }) => {
  const [note, setNote] = useState("");
  const [started, setStarted] = useState(false);
  const [noteSaved, setNoteSaved] = useState(false);
  const content = CONTENT[kind];
  const Icon = content.icon;

  return (
    <div className="screen-shell">
      <main className="page-container max-w-5xl">
        <div className="flex items-center justify-between gap-3 mb-6 text-xs text-muted">
          <button type="button" onClick={onBack} className="inline-flex items-center gap-1.5 hover:text-accent transition-colors"><ArrowLeft className="w-3.5 h-3.5" /> Vùng văn hóa</button>
          <Badge variant="outline">Trải nghiệm {content.region}</Badge>
        </div>

        <section className="grid lg:grid-cols-[1fr_0.8fr] gap-8 items-center mb-10">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-accent mb-3"><Icon className="w-4 h-4" /> {content.eyebrow}</div>
            <h1 className="page-title mb-4">{content.title}</h1>
            <p className="text-sm sm:text-base text-muted leading-relaxed mb-6">{content.description}</p>
            <div className="flex flex-wrap gap-3">
              {kind === "chau-van" && <Button className="gap-2" onClick={() => setStarted(true)} disabled={started}><Play className="w-4 h-4" /> {started ? "Đã bắt đầu nhịp đọc" : "Bắt đầu nhịp đọc"}</Button>}
              {kind === "sea-prayer" && <Button className="gap-2" onClick={() => setStarted(true)} disabled={started}><Waves className="w-4 h-4" /> {started ? "Đã gửi lời cầu" : "Gửi lời cầu bình an"}</Button>}
              {kind === "southern-culture" && <Button className="gap-2" onClick={onGoToMemorial}><Heart className="w-4 h-4" /> Nhớ về người thân</Button>}
              <Button variant="outline" onClick={onGoToWish}>Gửi gắm một điều ước</Button>
            </div>
          </div>
          <div className="relative h-64 rounded-card overflow-hidden border border-line"><img src={content.image} alt={content.region} className="h-full w-full object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-canvas/90 to-transparent" /><span className="absolute bottom-5 left-5 text-ink font-display text-lg">Một lát cắt văn hóa để lắng lại</span></div>
        </section>

        <div className="grid md:grid-cols-2 gap-5 mb-10">
          <Card className="p-6 bg-surface-soft border-line"><h2 className="font-display text-xl font-bold mb-3">Gợi ý chiêm nghiệm</h2><p className="text-sm text-muted leading-relaxed">Hãy đọc chậm, đặt điện thoại xuống một lúc và giữ lại điều khiến bạn thấy gần gũi nhất. Đây là nội dung văn hóa, không phải lời phán định.</p></Card>
          <Card className="p-6 border-line"><h2 className="font-display text-xl font-bold mb-3">Ghi lại cảm nhận</h2><Textarea value={note} onChange={(event) => setNote(event.target.value)} placeholder="Một hình ảnh, một câu chuyện, một lời muốn gửi..." /><div className="flex justify-end mt-3"><Button variant="outline" size="sm" onClick={() => setNoteSaved(true)} disabled={!note.trim() || noteSaved}>{noteSaved ? <><Check className="w-4 h-4 mr-1.5" /> Đã lưu trong phiên</> : "Lưu cảm nhận"}</Button></div></Card>
        </div>

        <Card className="p-6 sm:p-8 bg-surface-soft border-line mb-12"><div className="flex items-start gap-3"><Compass className="w-5 h-5 text-accent shrink-0 mt-0.5" /><p className="text-sm text-muted leading-relaxed">Tin Lắm Tâm Linh chỉ mở ra một không gian học hỏi và tự soi chiếu. Khi có tư liệu âm thanh phù hợp bản quyền, trải nghiệm này có thể được bổ sung thêm lớp nghe.</p></div></Card>
      </main>
    </div>
  );
};
