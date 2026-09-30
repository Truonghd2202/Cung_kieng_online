import React, { useState } from "react";
import {
  ArrowLeft,
  Sparkles,
  BookOpen,
  Info,
  Check,
  RotateCcw,
  Compass,
  Heart,
  HelpCircle,
} from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Badge } from "@/src/components/ui/badge";
import { Card } from "@/src/components/ui/card";

interface XinKeoScreenProps {
  onBackToExperience: () => void;
  onGoToCulture?: () => void;
  onGoToHome?: () => void;
}

type KeoResultType = "nhat-am-nhat-duong" | "nhi-duong" | "nhi-am";

interface KeoOutcome {
  type: KeoResultType;
  title: string;
  subTitle: string;
  statusLabel: string;
  badgeColor: string;
  meaning: string;
  guidance: string;
  piece1: "am" | "duong"; // am = ngua (phang), duong = up (cong)
  piece2: "am" | "duong";
}

const KEO_OUTCOMES: Record<KeoResultType, KeoOutcome> = {
  "nhat-am-nhat-duong": {
    type: "nhat-am-nhat-duong",
    title: "Nhất Âm Nhất Dương",
    subTitle: "Một Ngửa (Âm) • Một Úp (Dương)",
    statusLabel: "Được keo • Hòa hợp",
    badgeColor: "bg-success-soft text-success border border-success/30",
    meaning:
      "Dân gian xem đây là thế đại cát và thông thuận nhất; lòng người và thời thế hòa quyện, âm dương lưỡng nghi tương sinh cân bằng tuyệt hảo.",
    guidance:
      "Tâm trí bạn hiện đã đạt độ trong sáng và chín muồi. Hãy vững tâm tự tin triển khai các dự định thiện lành, từng bước chắc chắn mà không cần hoài nghi hay chùn bước.",
    piece1: "am",
    piece2: "duong",
  },
  "nhi-duong": {
    type: "nhi-duong",
    title: "Nhị Dương (Keo Tiếu)",
    subTitle: "Cùng Sấp • Hai mặt cong úp xuống",
    statusLabel: "Keo cười • Khoan vội",
    badgeColor: "bg-gold-soft text-gold border border-gold/40",
    meaning:
      "Thế quẻ biểu thị nụ cười hiền hậu của tiền nhân, nhắc nhở người hỏi rằng thời cơ chưa hẳn đã trọn vẹn, chớ nên nóng vội hay hấp tấp khởi sự.",
    guidance:
      "Hãy bình tâm quan sát lại nội lực bản thân và các phương án dự phòng. Một nhịp dừng đúng lúc sẽ giúp bạn tránh được những sơ sót không đáng có trên đường dài.",
    piece1: "duong",
    piece2: "duong",
  },
  "nhi-am": {
    type: "nhi-am",
    title: "Nhị Âm (Chưa Ứng)",
    subTitle: "Cùng Ngửa • Hai mặt phẳng ngửa lên",
    statusLabel: "Chưa ứng • Cần tĩnh xét",
    badgeColor: "bg-surface-soft text-muted border border-line",
    meaning:
      "Thế quẻ khuyên người hỏi nên lắng lòng định trí, việc trăn trở hiện thời chưa hội đủ duyên lành hoặc chưa thực sự phù hợp với mục tiêu sâu xa của bạn.",
    guidance:
      "Hãy tạm gác âu lo sang một bên, dành thời gian lắng nghe thêm ý kiến của các bậc tiền bối và tự hỏi bản thân điều gì mới thực sự mang lại an yên bền vững.",
    piece1: "am",
    piece2: "am",
  },
};

// SVG Crescent Moon Divination Piece
const CrescentKeoPiece: React.FC<{
  side: "am" | "duong";
  rotationClass: string;
  isCasting: boolean;
}> = ({ side, rotationClass, isCasting }) => {
  return (
    <div
      className={`relative w-28 sm:w-36 h-20 sm:h-24 transition-all duration-700 select-none ${
        isCasting ? "animate-bounce scale-90 opacity-75" : "scale-100 opacity-100"
      } ${rotationClass}`}
    >
      {/* Realistic Wooden Crescent Shape */}
      <svg
        viewBox="0 0 140 90"
        className="w-full h-full drop-shadow-[0_10px_15px_rgba(0,0,0,0.35)]"
      >
        <defs>
          {/* Convex Lacquer Gradient (Dương) */}
          <linearGradient id="convexWoodGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8d3d27" />
            <stop offset="35%" stopColor="#5c2617" />
            <stop offset="70%" stopColor="#3d180e" />
            <stop offset="100%" stopColor="#220d07" />
          </linearGradient>

          {/* Flat Bamboo/Wood Grain Gradient (Âm) */}
          <linearGradient id="flatWoodGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#d8a474" />
            <stop offset="45%" stopColor="#be8556" />
            <stop offset="85%" stopColor="#9a653c" />
            <stop offset="100%" stopColor="#7a4e2c" />
          </linearGradient>

          {/* Specular Highlight */}
          <linearGradient id="specularGlow" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>
        </defs>

        {side === "duong" ? (
          // DƯƠNG: Curved Convex Back (Úp)
          <g>
            {/* Base Crescent path */}
            <path
              d="M 15,75 C 10,40 45,10 70,10 C 95,10 130,40 125,75 C 105,48 85,38 70,38 C 55,38 35,48 15,75 Z"
              fill="url(#convexWoodGrad)"
              stroke="#2a1008"
              strokeWidth="2"
            />
            {/* Convex curve ridge reflection */}
            <path
              d="M 25,68 C 22,42 48,16 70,16 C 92,16 118,42 115,68 C 102,46 84,36 70,36 C 56,36 38,46 25,68 Z"
              fill="url(#specularGlow)"
              opacity="0.6"
            />
            {/* Subtle wood lacquer shine */}
            <ellipse cx="70" cy="24" rx="22" ry="5" fill="#ffffff" opacity="0.2" />
          </g>
        ) : (
          // ÂM: Planar Flat Face (Ngửa)
          <g>
            {/* Flat Crescent base */}
            <path
              d="M 15,75 C 10,40 45,10 70,10 C 95,10 130,40 125,75 C 105,48 85,38 70,38 C 55,38 35,48 15,75 Z"
              fill="url(#flatWoodGrad)"
              stroke="#543118"
              strokeWidth="2"
            />
            {/* Inner chamfer edge */}
            <path
              d="M 18,72 C 14,42 46,13 70,13 C 94,13 126,42 122,72 C 103,47 84,40 70,40 C 56,40 37,47 18,72 Z"
              fill="none"
              stroke="#f1c79e"
              strokeWidth="1"
              opacity="0.4"
            />
            {/* Ancient bamboo grain lines */}
            <path
              d="M 40,32 Q 55,24 70,24 Q 85,24 100,32"
              fill="none"
              stroke="#6b3f20"
              strokeWidth="1"
              strokeDasharray="2,3"
              opacity="0.5"
            />
            <path
              d="M 48,46 Q 60,39 70,39 Q 80,39 92,46"
              fill="none"
              stroke="#6b3f20"
              strokeWidth="1"
              opacity="0.4"
            />
            {/* Traditional Yin circle marker */}
            <circle cx="70" cy="27" r="4.5" fill="#502812" opacity="0.75" />
            <circle cx="70" cy="27" r="2" fill="#d8a474" opacity="0.9" />
          </g>
        )}
      </svg>

      {/* Subtle indicator caption below piece */}
      <div className="text-center mt-1">
        <span className="text-[11px] font-bold tracking-wider uppercase text-ink/75 bg-surface/80 px-2 py-0.5 rounded-full border border-line">
          {side === "am" ? "Mặt phẳng (Âm)" : "Mặt cong (Dương)"}
        </span>
      </div>
    </div>
  );
};

export const XinKeoScreen: React.FC<XinKeoScreenProps> = ({
  onBackToExperience,
  onGoToCulture,
  onGoToHome,
}) => {
  const [selectedTopic, setSelectedTopic] = useState<string>("binhan");
  const [reflectionText, setReflectionText] = useState("");
  const [isCasting, setIsCasting] = useState(false);
  const [castResult, setCastResult] = useState<KeoOutcome | null>(null);

  const topics = [
    { id: "hoctap", label: "Học tập & Thi cử" },
    { id: "congviec", label: "Công việc & Sự nghiệp" },
    { id: "giadinh", label: "Gia đình & Người thân" },
    { id: "binhan", label: "Bình an & Tâm trí" },
  ];

  const handleCastKeo = () => {
    setIsCasting(true);
    setCastResult(null);

    setTimeout(() => {
      const keys: KeoResultType[] = ["nhat-am-nhat-duong", "nhi-duong", "nhi-am"];
      const picked = keys[Math.floor(Math.random() * keys.length)];
      setCastResult(KEO_OUTCOMES[picked]);
      setIsCasting(false);
    }, 1200);
  };

  return (
    <div className="screen-shell">
      <main className="page-container max-w-6xl">
        {/* Top Breadcrumb & Status Ribbon */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 text-xs text-muted">
          <div className="flex items-center gap-2">
            <button
              onClick={onGoToHome}
              className="hover:text-accent cursor-pointer transition-colors"
            >
              Hôm nay
            </button>
            <span>/</span>
            <button
              onClick={onBackToExperience}
              className="hover:text-accent cursor-pointer transition-colors"
            >
              Trải nghiệm
            </button>
            <span>/</span>
            <span className="text-accent font-semibold">Xin keo âm dương</span>
          </div>

          <button
            onClick={onBackToExperience}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted hover:text-accent transition-colors cursor-pointer self-start sm:self-auto"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Về danh mục trải nghiệm</span>
          </button>
        </div>

        {/* Top Tags */}
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wider bg-surface text-accent border border-line flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-action animate-pulse"></span>
            CHIÊM NGHIỆM DÂN GIAN • LẮNG NGHE TÂM TƯ
          </span>
          <span className="text-xs text-muted">
            • Không gian phản tư tinh thần • Không mang tính phán quyết
          </span>
        </div>

        {/* Header Title Section */}
        <div className="mb-10">
          <h1 className="page-title mb-3">
            Xin keo âm dương
          </h1>
          <p className="text-sm sm:text-base text-ink leading-relaxed max-w-4xl">
            Tục gieo keo (âm dương bối) là nét văn hóa dân gian truyền thống lâu đời của người Việt,
            được tiền nhân xem như phương tiện thanh tịnh để lắng lòng, tự soi tỏ các mối phân vân
            trước khi khởi sự việc lớn. Mọi trải nghiệm tại đây nhằm giúp bạn an định tâm trí,
            hoàn toàn không mang tính mê tín dị đoan.
          </p>
        </div>

        {/* Two Column Layout: Left (Step 1 Form) | Right (Step 2 Sacred Altar) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-12">
          {/* Left Column (5 cols): Step 1 Form */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 sm:p-7 rounded-card bg-surface border border-line shadow-xs">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-accent mb-3">
                <span className="w-5 h-5 rounded-full bg-action text-white flex items-center justify-center text-xs font-bold">
                  1
                </span>
                <span>KHỞI TÂM TỊNH NIỆM</span>
              </div>

              <h2 className="font-display font-bold text-lg text-ink mb-1">
                Chọn phương diện chiêm nghiệm
              </h2>
              <p className="text-sm text-muted leading-relaxed mb-4">
                Hãy định tâm vào một phương diện bạn đang tìm kiếm sự tĩnh trí hoặc muốn được gợi mở góc nhìn:
              </p>

              {/* Topic Buttons Grid */}
              <div className="grid grid-cols-2 gap-2.5 mb-5">
                {topics.map((t) => {
                  const isSelected = selectedTopic === t.id;
                  return (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setSelectedTopic(t.id)}
                      className={`p-3 rounded-panel border text-left text-xs font-semibold transition-all flex items-center justify-between cursor-pointer ${
                        isSelected
                          ? "bg-accent/10 border-accent text-accent shadow-2xs"
                          : "bg-surface border-line text-ink hover:border-accent/40"
                      }`}
                    >
                      <span>{t.label}</span>
                      {isSelected && <Check className="w-3.5 h-3.5 text-accent" />}
                    </button>
                  );
                })}
              </div>

              {/* Reflection Text Input (Optional) */}
              <div>
                <label htmlFor="keo-reflection" className="block text-xs font-semibold text-ink mb-1.5">
                  Nỗi niềm muốn gửi gắm{" "}
                  <span className="font-normal text-muted">(không bắt buộc)</span>
                </label>
                <textarea
                  id="keo-reflection"
                  rows={3}
                  value={reflectionText}
                  onChange={(e) => setReflectionText(e.target.value)}
                  placeholder="Ví dụ: Mong cho dự định sắp tới được hanh thông, lòng bớt âu lo..."
                  className="w-full p-3.5 rounded-panel border border-line focus:border-accent focus:ring-1 focus:ring-accent text-xs outline-none resize-none bg-surface/70 placeholder:text-subtle text-ink leading-relaxed"
                />
                <p className="text-xs text-muted mt-2 leading-relaxed">
                  ⓘ Nội dung bạn viết chỉ nhằm giúp tâm trí tập trung hơn, hệ thống hoàn toàn không lưu trữ nếu chưa có sự đồng ý của bạn.
                </p>
              </div>
            </div>

            {/* Cultural Context Box */}
            <div className="p-5 rounded-panel bg-surface/60 border border-line flex items-start gap-3.5">
              <div className="w-9 h-9 rounded-xl bg-surface border border-line flex items-center justify-center text-accent shrink-0 mt-0.5">
                <BookOpen className="w-4 h-4 text-accent" />
              </div>
              <div className="text-xs">
                <h4 className="font-display font-bold text-sm text-ink mb-1">
                  Triết lý âm dương trong văn hóa Việt
                </h4>
                <p className="text-ink/80 leading-relaxed mb-2.5">
                  Hai mảnh keo gỗ mít hình trăng khuyết thể hiện sự vận động không ngừng của trời đất và lòng người.
                </p>
                {onGoToCulture && (
                  <button
                    onClick={onGoToCulture}
                    className="text-accent font-semibold hover:underline cursor-pointer flex items-center gap-1"
                  >
                    <span>Khảo cứu chuyên sâu về tục gieo keo</span>
                    <span>→</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Right Column (7 cols): Step 2 Sacred Open Altar */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-card bg-surface border border-line shadow-xs">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-accent">
                  <span className="w-5 h-5 rounded-full bg-action text-white flex items-center justify-center text-xs font-bold">
                    2
                  </span>
                  <span>KHAI TÂM ĐỊNH TRÍ • Không gian gieo keo</span>
                </div>
                <Badge variant="outline" className="text-xs border-line text-muted">
                  Trạng thái: {isCasting ? "Đang gieo..." : castResult ? "Đã gieo" : "Tĩnh lặng"}
                </Badge>
              </div>

              {/* Sacred Altar Tray with Ambient Aura */}
              <div className="relative rounded-card overflow-hidden bg-gradient-to-b from-surface-soft/80 via-surface/60 to-surface-soft border border-line p-6 sm:p-12 text-center mb-6">
                {/* Ambient Golden Glow Aura */}
                <div className="absolute inset-0 bg-radial from-amber-500/15 via-orange-500/5 to-transparent pointer-events-none" />

                {/* Circular Stone/Woven Mat Platform */}
                <div className="relative mx-auto max-w-sm rounded-full border border-accent/25 bg-surface/90 backdrop-blur-xs p-8 sm:p-10 shadow-inner">
                  <div className="flex items-center justify-center gap-6 sm:gap-10 py-4">
                    {/* Keo Piece 1 */}
                    <CrescentKeoPiece
                      side={castResult ? castResult.piece1 : "am"}
                      rotationClass={
                        castResult
                          ? castResult.piece1 === "am"
                            ? "rotate-12"
                            : "-rotate-12"
                          : "rotate-6"
                      }
                      isCasting={isCasting}
                    />

                    {/* Keo Piece 2 */}
                    <CrescentKeoPiece
                      side={castResult ? castResult.piece2 : "duong"}
                      rotationClass={
                        castResult
                          ? castResult.piece2 === "am"
                            ? "-rotate-12"
                            : "rotate-12"
                          : "-rotate-6"
                      }
                      isCasting={isCasting}
                    />
                  </div>

                  <div className="h-px w-24 mx-auto bg-line/80 my-3" />
                  <p className="text-xs text-muted italic">
                    Hai mảnh keo gỗ hình trăng khuyết: một mặt cong (Dương / Úp) và một mặt phẳng (Âm / Ngửa)
                  </p>
                </div>
              </div>

              {/* Primary Action Button */}
              <div className="text-center">
                <Button
                  variant="default"
                  size="lg"
                  onClick={handleCastKeo}
                  disabled={isCasting}
                  className="w-full py-4 text-base font-semibold shadow-md bg-action text-white hover:opacity-90 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <Sparkles className="w-5 h-5 shrink-0" />
                  <span>
                    {isCasting
                      ? "Đang gieo keo trong chánh niệm..."
                      : castResult
                      ? "Gieo lại lần khác"
                      : "Gieo keo âm dương"}
                  </span>
                </Button>
                <p className="text-xs text-muted mt-2.5">
                  Chạm để gieo — Hãy hít một hơi thật sâu và buông lỏng tâm trí trước khi bắt đầu
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Step 3: Result Display or Reference of 3 States */}
        <section className="mb-12">
          {castResult ? (
            /* ================= ACTIVE RESULT: SEAMLESS LITERARY ESSAY ================= */
            <div className="p-8 sm:p-12 rounded-card bg-surface border border-accent/30 shadow-card">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-line mb-8">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-accent">
                  <span className="w-5 h-5 rounded-full bg-action text-white flex items-center justify-center text-xs font-bold">
                    3
                  </span>
                  <span>ĐỐI THOẠI NỘI TÂM • KẾT QUẢ CHIÊM NGHIỆM</span>
                </div>
                <Badge className={`text-xs px-3.5 py-1 font-semibold ${castResult.badgeColor}`}>
                  {castResult.statusLabel}
                </Badge>
              </div>

              <div className="max-w-3xl">
                <div className="flex items-baseline gap-3 mb-4">
                  <h3 className="font-display font-bold text-2xl sm:text-3xl text-ink">
                    {castResult.title}
                  </h3>
                  <span className="text-xs text-muted font-medium">({castResult.subTitle})</span>
                </div>

                <p className="text-base sm:text-lg text-ink leading-relaxed mb-6 first-letter:text-4xl first-letter:font-serif first-letter:font-bold first-letter:mr-2.5 first-letter:float-left first-letter:text-accent first-letter:leading-none">
                  {castResult.meaning}
                </p>

                <div className="p-5 sm:p-6 rounded-panel bg-surface-soft border border-line text-sm sm:text-base text-ink leading-relaxed mb-8">
                  <strong className="text-accent font-bold block mb-1">
                    Gợi mở tâm thế hôm nay:
                  </strong>
                  {castResult.guidance}
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <Button
                    variant="default"
                    size="sm"
                    onClick={handleCastKeo}
                    disabled={isCasting}
                    className="gap-2 bg-action text-white cursor-pointer"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Gieo lại lần khác</span>
                  </Button>

                  {onGoToCulture && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={onGoToCulture}
                      className="border-line text-ink hover:text-accent cursor-pointer"
                    >
                      <BookOpen className="w-4 h-4 text-accent" />
                      <span>Đọc bài khảo cứu phong tục</span>
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ) : (
            /* ================= REFERENCE GUIDE (WHEN NOT YET CAST) ================= */
            <div className="p-6 sm:p-8 rounded-card bg-surface border border-line shadow-xs">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-accent mb-3">
                <span className="w-5 h-5 rounded-full bg-action text-white flex items-center justify-center text-xs font-bold">
                  3
                </span>
                <span>BA THẾ KEO DÂN GIAN • Ý NGHĨA BIỂU TƯỢNG</span>
              </div>

              <p className="text-sm text-muted leading-relaxed mb-6">
                Khi bạn gieo, hai mảnh keo sẽ rơi tự nhiên và dừng lại ở một trong ba thế dưới đây. Mỗi thế tượng trưng cho một gợi mở triết lý nhân sinh:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
                {/* Card 1 */}
                <div className="p-5 rounded-panel border border-line bg-surface/80">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-display font-bold text-sm text-ink">
                      Nhất Âm Nhất Dương
                    </h4>
                    <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-success-soft text-success border border-success/30">
                      1 Ngửa + 1 Úp
                    </span>
                  </div>
                  <p className="text-xs text-ink/80 leading-relaxed">
                    Thế thông thuận; lòng người và hoàn cảnh hòa hợp, gợi ý bạn vững tâm tự tin tiến bước với dự định của mình.
                  </p>
                </div>

                {/* Card 2 */}
                <div className="p-5 rounded-panel border border-line bg-surface/80">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-display font-bold text-sm text-ink">
                      Nhị Dương (Keo Tiếu)
                    </h4>
                    <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-gold-soft text-gold border border-gold/40">
                      Cùng Sấp
                    </span>
                  </div>
                  <p className="text-xs text-ink/80 leading-relaxed">
                    Chưa nên vội vàng; nhắc nhở người hỏi nên xem xét lại động cơ nội tại hoặc chuẩn bị thêm phương án chu đáo hơn.
                  </p>
                </div>

                {/* Card 3 */}
                <div className="p-5 rounded-panel border border-line bg-surface/80">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-display font-bold text-sm text-ink">
                      Nhị Âm
                    </h4>
                    <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-surface-soft text-muted border border-line">
                      Cùng Ngửa
                    </span>
                  </div>
                  <p className="text-xs text-ink/80 leading-relaxed">
                    Gợi ý tĩnh tâm suy xét thấu đáo, lắng đọng một nhịp để quan sát toàn cảnh trước khi đưa ra các quyết định hệ trọng.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-panel bg-surface-soft border border-line text-xs text-ink/80 italic leading-relaxed text-center">
                “Mỗi quẻ keo là một chiếc gương soi chiếu để người trẻ chiêm nghiệm lại chính tâm nguyện của mình, hoàn toàn không phải lời phán quyết bất di bất dịch của thần linh hay số phận.”
              </div>
            </div>
          )}
        </section>

        {/* Disclaimer / Transparency Box */}
        <div className="p-4 rounded-panel bg-surface/80 border border-line flex items-start gap-3.5 text-xs text-muted leading-relaxed mb-10">
          <Info className="w-4 h-4 text-accent shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-ink">Lưu ý từ Tin Lắm Tâm Linh: </span>
            Đây là hoạt động tương tác mang tính biểu tượng văn hóa dân gian. Nền tảng tôn trọng tự do tâm thức, không khuyến khích mê tín, không dự đoán tương lai và không bao giờ yêu cầu trả phí để gieo lại.
          </div>
        </div>
      </main>
    </div>
  );
};

