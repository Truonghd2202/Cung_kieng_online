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
    subTitle: "1 Ngửa (Âm) + 1 Úp (Dương)",
    statusLabel: "Được keo • Hòa hợp",
    badgeColor: "bg-emerald-50 text-emerald-800 border-emerald-200",
    meaning:
      "Dân gian thường xem là thế thông thuận; lòng người và hoàn cảnh hòa hợp, âm dương cân bằng tương sinh.",
    guidance:
      "Gợi ý bạn vững tâm, giữ tinh thần sáng suốt và tự tin từng bước triển khai dự tính tốt đẹp của mình.",
    piece1: "am",
    piece2: "duong",
  },
  "nhi-duong": {
    type: "nhi-duong",
    title: "Nhị Dương (Tiếu)",
    subTitle: "Cùng Sấp (2 mặt Cong úp xuống)",
    statusLabel: "Keo cười • Cười vui",
    badgeColor: "bg-amber-50 text-amber-800 border-amber-200",
    meaning:
      "Biểu thị sự hóm hỉnh, khuyên người hỏi chưa nên vội vàng hay hấp tấp trong thời điểm này.",
    guidance:
      "Nhắc nhở bạn nên lắng lòng xem xét lại động cơ nội tại hoặc chuẩn bị thêm các phương án dự phòng chu đáo hơn.",
    piece1: "duong",
    piece2: "duong",
  },
  "nhi-am": {
    type: "nhi-am",
    title: "Nhị Âm",
    subTitle: "Cùng Ngửa (2 mặt Phẳng ngửa lên)",
    statusLabel: "Chưa ứng • Cần xét lại",
    badgeColor: "bg-stone-100 text-stone-800 border-stone-300",
    meaning:
      "Gợi ý nên tĩnh tâm suy xét thấu đáo, hiện thời hoàn cảnh chưa thực sự chín muồi để khởi sự.",
    guidance:
      "Hãy lùi lại một nhịp để quan sát toàn cảnh, trao đổi thêm với người có kinh nghiệm trước khi đưa ra quyết định hệ trọng.",
    piece1: "am",
    piece2: "am",
  },
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
      // Random result
      const picked = keys[Math.floor(Math.random() * keys.length)];
      setCastResult(KEO_OUTCOMES[picked]);
      setIsCasting(false);
    }, 1200);
  };

  return (
    <div className="w-full min-h-screen bg-[#fcf8f2] text-[#2e2624] font-['Be_Vietnam_Pro',sans-serif]">
      <main className="max-w-6xl mx-auto px-4 sm:px-6 pt-6 pb-20">
        {/* Top Breadcrumb & Status Ribbon */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 text-xs text-[#8a7971]">
          <div className="flex items-center gap-2">
            <button
              onClick={onGoToHome}
              className="hover:text-[#9e3b2e] cursor-pointer transition-colors"
            >
              Hôm nay
            </button>
            <span>/</span>
            <button
              onClick={onBackToExperience}
              className="hover:text-[#9e3b2e] cursor-pointer transition-colors"
            >
              Trải nghiệm
            </button>
            <span>/</span>
            <span className="text-[#9e3b2e] font-semibold">Xin keo âm dương</span>
          </div>

          <button
            onClick={onBackToExperience}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#82716a] hover:text-[#9e3b2e] transition-colors cursor-pointer self-start sm:self-auto"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Về danh mục trải nghiệm</span>
          </button>
        </div>

        {/* Top Tags */}
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wider bg-[#fef3e2] text-[#8a5a22] border border-[#f6d8a8] flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#c97a2b] animate-pulse"></span>
            CHIÊM NGHIỆM DÂN GIAN • LẮNG NGHE TÂM TƯ
          </span>
          <span className="text-xs text-[#9c8980]">
            • Nội dung văn hóa minh họa • Không mang tính phán quyết
          </span>
        </div>

        {/* Header Title Section */}
        <div className="mb-10">
          <h1 className="font-['Noto_Serif',serif] font-bold text-3xl sm:text-4xl lg:text-[42px] leading-tight mb-3 bg-gradient-to-r from-[#2a1815] via-[#8a252c] to-[#2a1815] dark:from-[#f7ede6] dark:via-[#ff9ca4] dark:to-[#f7ede6] bg-clip-text text-transparent">
            Xin keo âm dương
          </h1>
          <p className="text-sm sm:text-base text-[#6a5951] dark:text-[#cbb8af] leading-relaxed max-w-4xl">
            Tục gieo keo (âm dương bối) là một nét văn hóa dân gian truyền thống lâu đời của người Việt,
            từng được tiền nhân dùng như phương tiện tĩnh tại để lắng lòng, tự soi tỏ các mối phân vân
            trước khi khởi sự việc lớn. Trải nghiệm tại đây hoàn toàn mang tính chất phản tư tinh thần
            và chiêm nghiệm văn hóa, không phải lời phán quyết thần linh hay dự đoán số mệnh tuyệt đối.
          </p>
        </div>

        {/* Two Column Layout: Left (Step 1 + Info) | Right (Step 2 + Keo Visual) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-8">
          {/* Left Column (5 cols): Step 1 Form */}
          <div className="lg:col-span-5 space-y-6">
            <Card className="p-6 rounded-3xl bg-white border border-[#eddcd0] shadow-xs">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#9e3b2e] mb-3">
                <span className="w-5 h-5 rounded-full bg-[#9e3b2e] text-white flex items-center justify-center text-[11px] font-bold">
                  1
                </span>
                <span>KHỞI TÂM TỊNH NIỆM</span>
              </div>

              <h3 className="font-['Noto_Serif',serif] font-bold text-lg text-[#2a2220] mb-1">
                Chọn chủ đề chiêm nghiệm
              </h3>
              <p className="text-xs text-[#7d6c64] leading-relaxed mb-4">
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
                      className={`p-3 rounded-2xl border text-left text-xs font-semibold transition-all flex items-center justify-between cursor-pointer ${
                        isSelected
                          ? "bg-[#faece1] border-[#9e3b2e] text-[#9e3b2e] shadow-2xs"
                          : "bg-[#fffdfa] border-[#eddcd0] text-[#55453f] hover:border-[#dfc4b1]"
                      }`}
                    >
                      <span>{t.label}</span>
                      {isSelected && <Check className="w-3.5 h-3.5 text-[#9e3b2e]" />}
                    </button>
                  );
                })}
              </div>

              {/* Reflection Text Input (Optional) */}
              <div>
                <label className="block text-xs font-semibold text-[#55453f] mb-1">
                  Điều bạn đang trăn trở hoặc muốn gửi gắm{" "}
                  <span className="font-normal text-[#9b8a82]">(không bắt buộc)</span>
                </label>
                <textarea
                  rows={3}
                  value={reflectionText}
                  onChange={(e) => setReflectionText(e.target.value)}
                  placeholder="Ví dụ: Mong cho dự định sắp tới được hanh thông, lòng bớt âu lo... (Bạn có thể để trống)"
                  className="w-full p-3 rounded-xl border border-[#ebd8cb] focus:border-[#9e3b2e] focus:ring-1 focus:ring-[#9e3b2e] text-xs outline-none resize-none bg-[#fffdfb] placeholder-[#ad9d96]"
                />
                <p className="text-[11px] text-[#917f77] mt-1.5 leading-relaxed">
                  ⓘ Nội dung bạn viết chỉ nhằm giúp tâm trí bạn tập trung hơn, hệ thống hoàn toàn
                  không lưu trữ nếu chưa có sự đồng ý của bạn.
                </p>
              </div>
            </Card>

            {/* Cultural Context Box */}
            <Card className="p-5 rounded-3xl bg-[#fbf5ee] border border-[#ebd5c3] shadow-xs">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#faede2] border border-[#ebd5c3] flex items-center justify-center text-[#9e3b2e] shrink-0">
                  <BookOpen className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-['Noto_Serif',serif] font-bold text-sm text-[#2a2220] mb-1">
                    Tìm hiểu về tập tục xin keo trong văn hóa Việt
                  </h4>
                  <p className="text-xs text-[#705e57] leading-relaxed mb-3">
                    Lịch sử hình thành, triết lý âm dương lưỡng nghi trong đời sống tâm thức làng quê
                    và cách người xưa gửi gắm niềm tin mộc mạc.
                  </p>
                  <div className="flex items-center gap-4 text-xs font-semibold">
                    {onGoToCulture && (
                      <button
                        onClick={onGoToCulture}
                        className="text-[#9e3b2e] hover:underline cursor-pointer"
                      >
                        Đọc bài văn hóa →
                      </button>
                    )}
                    <button
                      onClick={onBackToExperience}
                      className="text-[#7d6c64] hover:text-[#2a2220] cursor-pointer"
                    >
                      Trở về Trải nghiệm
                    </button>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Right Column (7 cols): Step 2 Interactive Casting Area */}
          <div className="lg:col-span-7">
            <Card className="p-6 sm:p-8 rounded-3xl bg-white border border-[#eddcd0] shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#9e3b2e]">
                  <span className="w-5 h-5 rounded-full bg-[#9e3b2e] text-white flex items-center justify-center text-[11px] font-bold">
                    2
                  </span>
                  <span>KHAI TÂM ĐỊNH TRÍ • Khu vực tương tác gieo keo</span>
                </div>
                <Badge variant="outline" className="text-[11px] border-[#eedcd0] text-[#8c7b74]">
                  Trạng thái: {isCasting ? "Đang gieo..." : castResult ? "Đã gieo" : "Tĩnh lặng"}
                </Badge>
              </div>

              {/* Wooden Keo Illustration Box */}
              <div className="relative rounded-2xl overflow-hidden bg-gradient-to-b from-[#f7f0e7] to-[#ede3d7] border border-[#e4d4c7] p-8 sm:p-12 text-center mb-6">
                <div
                  className={`flex items-center justify-center gap-6 sm:gap-10 py-6 transition-all duration-700 ${
                    isCasting ? "animate-bounce scale-95 opacity-70" : "scale-100 opacity-100"
                  }`}
                >
                  {/* Keo Piece 1 */}
                  <div className="flex flex-col items-center gap-2">
                    <div
                      className={`w-28 sm:w-36 h-14 sm:h-18 rounded-[50px/25px] shadow-lg transition-transform duration-500 border border-[#a66a38] flex items-center justify-center ${
                        castResult
                          ? castResult.piece1 === "am"
                            ? "bg-gradient-to-b from-[#e3bf96] to-[#c79b6d] rotate-12"
                            : "bg-gradient-to-b from-[#8f4b1d] to-[#6a320f] -rotate-12"
                          : "bg-gradient-to-b from-[#e3bf96] to-[#c79b6d] rotate-6"
                      }`}
                    >
                      <span className="text-[11px] font-bold text-[#45230e]/80 uppercase">
                        {castResult
                          ? castResult.piece1 === "am"
                            ? "Âm (Ngửa)"
                            : "Dương (Úp)"
                          : "Mặt phẳng (Âm)"}
                      </span>
                    </div>
                  </div>

                  {/* Keo Piece 2 */}
                  <div className="flex flex-col items-center gap-2">
                    <div
                      className={`w-28 sm:w-36 h-14 sm:h-18 rounded-[50px/25px] shadow-lg transition-transform duration-500 border border-[#a66a38] flex items-center justify-center ${
                        castResult
                          ? castResult.piece2 === "am"
                            ? "bg-gradient-to-b from-[#e3bf96] to-[#c79b6d] -rotate-12"
                            : "bg-gradient-to-b from-[#8f4b1d] to-[#6a320f] rotate-12"
                          : "bg-gradient-to-b from-[#8f4b1d] to-[#6a320f] -rotate-6"
                      }`}
                    >
                      <span className="text-[11px] font-bold text-amber-100/90 uppercase">
                        {castResult
                          ? castResult.piece2 === "am"
                            ? "Âm (Ngửa)"
                            : "Dương (Úp)"
                          : "Mặt cong (Dương)"}
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-[#7a6860] italic">
                  Hai miếng keo bằng gỗ mít hoặc tre mộc: một mặt cong (Dương / Úp) và một mặt phẳng
                  (Âm / Ngửa)
                </p>
              </div>

              {/* Action Button to Cast */}
              <div className="text-center">
                <Button
                  variant="default"
                  size="lg"
                  onClick={handleCastKeo}
                  disabled={isCasting}
                  className="w-full py-4 text-base font-semibold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
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
                <p className="text-xs text-[#8c7b74] dark:text-[#a08b83] mt-2.5">
                  Chạm để gieo — Hãy hít một hơi thật sâu trước khi bắt đầu
                </p>
              </div>
            </Card>
          </div>
        </div>

        {/* Step 3: Result Display or Reference of 3 States */}
        <Card className="p-6 sm:p-8 rounded-3xl bg-white border border-[#eddcd0] shadow-xs mb-8">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#f3e6da]">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#9e3b2e]">
              <span className="w-5 h-5 rounded-full bg-[#9e3b2e] text-white flex items-center justify-center text-[11px] font-bold">
                3
              </span>
              <span>ĐỐI THOẠI NỘI TÂM • Kết quả chiêm nghiệm</span>
            </div>
            <Badge
              variant="outline"
              className={`text-xs ${
                castResult
                  ? "bg-emerald-50 text-emerald-800 border-emerald-300 font-bold"
                  : "text-[#8c7b74] border-[#eedcd0]"
              }`}
            >
              {castResult ? `KẾT QUẢ: ${castResult.title.toUpperCase()}` : "TRẠNG THÁI: CHƯA GIEO"}
            </Badge>
          </div>

          {castResult ? (
            /* Active Result Showcase */
            <div className="p-6 rounded-2xl bg-[#fbf5ee] border border-[#eedcd0] animate-fadeIn mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2.5">
                  <h3 className="font-['Noto_Serif',serif] font-bold text-2xl text-[#2a2220]">
                    {castResult.title}
                  </h3>
                  <span className="text-xs text-[#7e6d65] font-medium">({castResult.subTitle})</span>
                </div>
                <Badge className={`text-xs px-3 py-1 font-semibold ${castResult.badgeColor}`}>
                  {castResult.statusLabel}
                </Badge>
              </div>

              <p className="text-sm sm:text-base text-[#4a3b34] leading-relaxed mb-3">
                {castResult.meaning}
              </p>

              <div className="p-4 rounded-xl bg-white border border-[#eddcd0] text-xs sm:text-sm text-[#5d4a43] leading-relaxed font-medium">
                <span className="text-[#9e3b2e] font-bold">Lời gợi mở tâm thế: </span>
                {castResult.guidance}
              </div>
            </div>
          ) : (
            <p className="text-xs sm:text-sm text-[#73625a] leading-relaxed mb-6">
              Khi bạn gieo, hai miếng keo sẽ rơi ngẫu nhiên và dừng lại ở một trong ba thế dân gian
              dưới đây. Mỗi thế tượng trưng cho một gợi mở triết lý tự nhiên:
            </p>
          )}

          {/* 3 Keo Outcomes Reference Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {/* Card 1 */}
            <div
              className={`p-4 rounded-2xl border transition-all ${
                castResult?.type === "nhat-am-nhat-duong"
                  ? "bg-[#faece1] border-[#9e3b2e] ring-2 ring-[#9e3b2e]/20"
                  : "bg-[#fffdfa] border-[#ecdcd0]"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-['Noto_Serif',serif] font-bold text-sm text-[#2a2220]">
                  Nhất Âm Nhất Dương
                </h4>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                  1 Ngửa + 1 Úp
                </span>
              </div>
              <p className="text-xs text-[#6e5d56] leading-relaxed">
                Dân gian thường xem là thế thông thuận; lòng người và hoàn cảnh hòa hợp, gợi ý bạn vững
                tâm tự tin tiến bước với dự tính của mình.
              </p>
            </div>

            {/* Card 2 */}
            <div
              className={`p-4 rounded-2xl border transition-all ${
                castResult?.type === "nhi-duong"
                  ? "bg-[#faece1] border-[#9e3b2e] ring-2 ring-[#9e3b2e]/20"
                  : "bg-[#fffdfa] border-[#ecdcd0]"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-['Noto_Serif',serif] font-bold text-sm text-[#2a2220]">
                  Nhị Dương (Tiếu)
                </h4>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
                  Cùng Sấp
                </span>
              </div>
              <p className="text-xs text-[#6e5d56] leading-relaxed">
                Biểu thị sự hóm hỉnh, chưa nên vội vàng; nhắc nhở người hỏi nên xem xét lại động cơ
                nội tại hoặc chuẩn bị các phương án chu đáo hơn.
              </p>
            </div>

            {/* Card 3 */}
            <div
              className={`p-4 rounded-2xl border transition-all ${
                castResult?.type === "nhi-am"
                  ? "bg-[#faece1] border-[#9e3b2e] ring-2 ring-[#9e3b2e]/20"
                  : "bg-[#fffdfa] border-[#ecdcd0]"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-['Noto_Serif',serif] font-bold text-sm text-[#2a2220]">
                  Nhị Âm
                </h4>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-stone-100 text-stone-800 border border-stone-200">
                  Cùng Ngửa
                </span>
              </div>
              <p className="text-xs text-[#6e5d56] leading-relaxed">
                Gợi ý nên tĩnh tâm suy xét thấu đáo, lắng đọng một nhịp để quan sát toàn cảnh trước khi
                đưa ra các quyết định hệ trọng.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#faf3ec] border border-[#ebdcd0] text-xs text-[#705e57] italic leading-relaxed text-center">
            “Mỗi quẻ keo là một chiếc gương soi chiếu để người trẻ chiêm nghiệm lại chính quyết định
            của mình, hoàn toàn không phải lời phán quyết bất di bất dịch của thần linh hay số phận.”
          </div>
        </Card>

        {/* Disclaimer / Transparency Box */}
        <div className="p-4 rounded-2xl bg-[#faede2]/80 border border-[#ecd9cb] flex items-start gap-3.5 text-xs text-[#73635b] leading-relaxed mb-10">
          <Info className="w-4 h-4 text-[#9e3b2e] shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-[#382b26]">Lưu ý từ Tin Lắm Tâm Linh: </span>
            Đây là hoạt động tương tác mang tính biểu tượng văn hóa dân gian. Nền tảng tôn trọng tự do
            tâm thức, không khuyến khích mê tín, không dự đoán tương lai và không bao giờ yêu cầu trả phí để gieo lại.
          </div>
        </div>

        {/* Bottom Calm Banner */}
        <div className="text-center pt-8 border-t border-[#ecdcd0]">
          <p className="font-['Noto_Serif',serif] italic font-semibold text-xl text-[#9e3b2e] mb-1">
            “Tâm bình thế giới bình, lòng an vạn sự tỏ”
          </p>
          <span className="text-xs uppercase tracking-widest text-[#95837b] font-semibold">
            NƠI LƯU GIỮ NÉT ĐẸP TÂM THỨC VÀ CHIÊM NGHIỆM VĂN HÓA DÂN GIAN VIỆT
          </span>
        </div>
      </main>
    </div>
  );
};
