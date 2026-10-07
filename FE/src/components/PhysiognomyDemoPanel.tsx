import { useState, useRef, useEffect } from "react";
import {
  Sparkles,
  Camera,
  Upload,
  Eye,
  RotateCcw,
  ShieldCheck,
  CheckCircle2,
  Info,
  Heart,
  Smile,
  Compass,
} from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Card } from "./ui/card";

// Các mẫu nét tướng điển hình trong văn hóa dân gian
const ARCHETYPE_MODELS = [
  {
    id: "phuc-hau",
    title: "Tướng mạo Phúc Hậu & Khoan Hòa",
    subtitle: "Gương mặt tròn đầy · Ánh mắt từ hòa · Nụ cười an nhiên",
    image: "/images/tea_bowl.jpg",
    tamDinh: {
      thuongDinh: "Vầng trán rộng sáng: Tư duy thoáng đạt, thấu hiểu lẽ đời, trọng tình nghĩa tiền nhân.",
      trungDinh: "Sống mũi đầy đặn: Ý chí tự chủ, đối nhân xử thế hòa nhã, có nội lực bền bỉ.",
      haDinh: "Cằm tròn hậu trọng: Vun vén tổ ấm, hậu vận yên vui, được người thân kính yêu.",
    },
    nguQuan: [
      { name: "Mắt (Giám Sát Quan)", trait: "Ánh mắt ấm áp, tĩnh lặng", meaning: "Tâm hồn bao dung, không toan tính vụn vặt, nhìn nhận cuộc sống tích cực." },
      { name: "Mũi (Thẩm Biện Quan)", trait: "Đầu mũi tròn, cánh mũi kín", meaning: "Biết giữ gìn của cải gia đình, chi tiêu chừng mực, tài lộc bền vững." },
      { name: "Miệng (Xuất Nạp Quan)", trait: "Khóe miệng hướng lên khi cười", meaning: "Lời nói hòa nhã, gieo niềm vui cho mọi người xung quanh." },
      { name: "Tai (Thải Thính Quan)", trait: "Dái tai dày, luân quách rõ", meaning: "Biết lắng nghe, trường thọ, tích tụ phúc đức qua nhiều thế hệ." },
      { name: "Mày (Bảo Thọ Quan)", trait: "Chân mày thanh thoát, mượt mà", meaning: "Hòa thuận anh em, bạn bè quý mến, tâm tính đôn hậu." },
    ],
    zenAdvice: "Giữ tâm thanh tịnh, nụ cười thường trực trên môi là suối nguồn tươi mát nuôi dưỡng tướng mạo ngày một viên mãn.",
  },
  {
    id: "thanh-tu",
    title: "Tướng mạo Thanh Tú & Nho Nhã",
    subtitle: "Mày thanh mắt sáng · Khí chất trầm tĩnh · Học rộng hiểu sâu",
    image: "/images/relic_book.jpg",
    tamDinh: {
      thuongDinh: "Thiên đình cao ráo: Trí tuệ mẫn tiệp, ham học hỏi, yêu chuộng thi ca nghệ thuật.",
      trungDinh: "Mũi thanh tú, sống mũi thẳng: Chính trực, ngay thẳng, giữ gìn danh tiết trong sạch.",
      haDinh: "Cằm thon gọn, thanh thoát: Thích cuộc sống an nhàn, thanh tao, không màng danh lợi đua chen.",
    },
    nguQuan: [
      { name: "Mắt (Giám Sát Quan)", trait: "Mắt sáng trong, đồng tử định", meaning: "Nhìn xa trông rộng, thấu suốt bản chất vấn đề, tấm lòng trong sáng." },
      { name: "Mũi (Thẩm Biện Quan)", trait: "Sống mũi ngay thẳng, nhẵn nhụi", meaning: "Khí phách văn nhân, tự trọng cao, không luồn cúi trước nghịch cảnh." },
      { name: "Miệng (Xuất Nạp Quan)", trait: "Môi đều đặn, sắc môi nhuận", meaning: "Lời ăn tiếng nói nho nhã, có sức thuyết phục, chuộng lẽ phải." },
      { name: "Tai (Thải Thính Quan)", trait: "Vành tai cao ngang chân mày", meaning: "Tiếp thu nhanh nhạy, mẫn tuệ, có khiếu nghiên cứu văn hóa." },
      { name: "Mày (Bảo Thọ Quan)", trait: "Lông mày lưỡi liềm thanh mảnh", meaning: "Tính tình tinh tế, giàu cảm xúc, có lòng trắc ẩn sâu sắc." },
    ],
    zenAdvice: "Dưỡng tâm qua từng trang sách, tách trà; sự khiêm nhường sẽ bồi đắp khí chất thanh cao trường cửu.",
  },
  {
    id: "cuong-nghi",
    title: "Tướng mạo Cương Trực & Kiên Định",
    subtitle: "Cằm vuông vức · Ánh nhìn quả quyết · Bản lĩnh vượt khó",
    image: "/images/den_hung.jpg",
    tamDinh: {
      thuongDinh: "Trán vuông vức, phẳng phiu: Logic sắc sảo, kiên định với mục tiêu đã chọn.",
      trungDinh: "Sống mũi cao gồ nhẹ: Nghị lực phi thường, không ngại gian khó, dấn thân vì việc lớn.",
      haDinh: "Cằm vuông, xương hàm vững: Điểm tựa vững chắc cho gia đình, có trách nhiệm cao.",
    },
    nguQuan: [
      { name: "Mắt (Giám Sát Quan)", trait: "Ánh nhìn tập trung, kiên định", meaning: "Ý chí sắt đá, quyết đoán, nói đi đôi với làm." },
      { name: "Mũi (Thẩm Biện Quan)", trait: "Mũi cao, chuẩn đầu đầy đặn", meaning: "Tự lực cánh sinh, lập nghiệp từ hai bàn tay trắng, giàu nghị lực." },
      { name: "Miệng (Xuất Nạp Quan)", trait: "Môi khép chặt, khóe môi đoan chính", meaning: "Kín đáo, giữ chữ tín như vàng, là chỗ dựa tin cậy của bạn bè." },
      { name: "Tai (Thải Thính Quan)", trait: "Tai áp sát đầu, quách nổi", meaning: "Hành động thực tế, kiên nhẫn, chịu đựng được áp lực lớn." },
      { name: "Mày (Bảo Thọ Quan)", trait: "Lông mày rậm, thế mày vươn cao", meaning: "Dũng cảm, trượng nghĩa, luôn đứng ra bảo vệ kẻ yếu thế." },
    ],
    zenAdvice: "Cương nhu tương tế; lấy sự lắng nghe và nhu hòa làm thuốc điều hòa sự nóng nảy, ấy là đạo dưỡng tướng tối thượng.",
  },
];

export function PhysiognomyDemoPanel() {
  const [selectedModelId, setSelectedModelId] = useState<string>("phuc-hau");
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);
  const [uploadedFileName, setUploadedFileName] = useState<string>("");
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [scanProgress, setScanProgress] = useState<number>(0);
  const [showResult, setShowResult] = useState<boolean>(true);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const currentModel = ARCHETYPE_MODELS.find((m) => m.id === selectedModelId) || ARCHETYPE_MODELS[0];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      alert("Bạn vui lòng chọn file ảnh JPG, PNG hoặc WEBP.");
      return;
    }

    const url = URL.createObjectURL(file);
    setUploadedUrl(url);
    setUploadedFileName(file.name);
    startScan();
  };

  const startScan = () => {
    setIsScanning(true);
    setScanProgress(0);
    setShowResult(false);

    let p = 0;
    const interval = setInterval(() => {
      p += 15;
      if (p >= 100) {
        p = 100;
        clearInterval(interval);
        setIsScanning(false);
        setShowResult(true);
      }
      setScanProgress(p);
    }, 120);
  };

  const handleSelectModel = (id: string) => {
    setSelectedModelId(id);
    setUploadedUrl(null);
    setUploadedFileName("");
    startScan();
  };

  const previewImage = uploadedUrl || currentModel.image;

  return (
    <section
      id="physiognomy-demo-title"
      aria-labelledby="physiognomy-heading"
      className="mt-8 rounded-3xl border border-amber-500/30 bg-surface p-5 sm:p-8 shadow-sm"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 mb-6 border-b border-line">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold uppercase tracking-widest text-amber-800 dark:text-amber-300">
              NHÂN TƯỚNG HỌC Á ĐÔNG
            </span>
            <span className="text-xs text-stone-400">·</span>
            <span className="text-xs text-stone-500">Tam Đình & Ngũ Quan</span>
          </div>
          <h2 id="physiognomy-heading" className="font-display text-xl sm:text-2xl font-bold text-ink mt-1">
            Khảo Cứu Nhân Tướng & Đạo Tu Tâm Dưỡng Tính
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 mt-1 leading-relaxed">
            “Hữu tâm vô tướng, tướng tự tâm sinh” — Xem tướng không phải đoán vận mệnh mà là để soi chiếu tâm hồn và hoàn thiện nếp sống.
          </p>
        </div>

        <Badge variant="outline" className="border-amber-500/40 text-amber-800 dark:text-amber-300 bg-amber-500/10 text-xs px-3 py-1 self-start sm:self-auto font-medium">
          ✦ THỂ NGHIỆM CHIÊM QUAN
        </Badge>
      </div>

      {/* Model Archetype Selector & Upload */}
      <div className="space-y-4 mb-6">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <span className="text-xs font-bold uppercase text-stone-600 dark:text-stone-400">
            1. Chọn hình thái tướng mạo tham chiếu hoặc tải ảnh tự chụp:
          </span>
          <div className="flex items-center gap-2">
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              className="hidden"
              onChange={handleFileUpload}
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => fileInputRef.current?.click()}
              className="rounded-xl border-amber-500/40 text-amber-800 dark:text-amber-300 hover:bg-amber-500/10 text-xs cursor-pointer gap-1.5 min-h-9"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Tải ảnh chân dung của bạn</span>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {ARCHETYPE_MODELS.map((model) => {
            const isSelected = selectedModelId === model.id && !uploadedUrl;
            return (
              <button
                key={model.id}
                type="button"
                onClick={() => handleSelectModel(model.id)}
                className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer relative ${
                  isSelected
                    ? "bg-amber-500/15 border-amber-500 ring-2 ring-amber-400/40 shadow-xs"
                    : "bg-surface border-line hover:border-amber-500/40 hover:bg-surface-soft"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-amber-800 dark:text-amber-300">
                    {model.title.split("&")[0]}
                  </span>
                  {isSelected && (
                    <span className="w-2 h-2 rounded-full bg-amber-600" />
                  )}
                </div>
                <p className="text-[11px] text-stone-600 dark:text-stone-400 leading-snug">
                  {model.subtitle}
                </p>
              </button>
            );
          })}
        </div>

        {uploadedFileName && (
          <div className="flex items-center justify-between p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs">
            <div className="flex items-center gap-2 text-amber-900 dark:text-amber-200">
              <Camera className="w-4 h-4 text-amber-700" />
              <span>Đang khảo cứu ảnh tải lên: <strong>{uploadedFileName}</strong></span>
            </div>
            <button
              type="button"
              onClick={() => {
                setUploadedUrl(null);
                setUploadedFileName("");
              }}
              className="text-stone-500 hover:text-red-600 underline cursor-pointer"
            >
              Bỏ ảnh này
            </button>
          </div>
        )}
      </div>

      {/* Main Analysis View: Scanner Left, Results Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column (5 cols): Face Scanner Visualization */}
        <div className="lg:col-span-5 rounded-3xl border border-amber-500/30 bg-surface-soft p-4 sm:p-5 relative overflow-hidden shadow-xs">
          <div className="relative aspect-3/4 rounded-2xl overflow-hidden bg-stone-900 border border-line">
            <img
              src={previewImage}
              alt="Khuôn mặt khảo cứu nhân tướng"
              className="w-full h-full object-cover opacity-90"
            />

            {/* Golden Ratio Scanner Overlay */}
            {isScanning && (
              <div className="absolute inset-0 bg-amber-950/40 flex flex-col items-center justify-center pointer-events-none">
                <div
                  className="w-full h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent absolute shadow-[0_0_15px_#f59e0b]"
                  style={{ top: `${scanProgress}%`, transition: "top 0.12s linear" }}
                />
                <div className="bg-stone-900/80 px-4 py-2 rounded-xl border border-amber-400/40 text-center">
                  <span className="text-xs font-bold text-amber-300 block">
                    Đang định vị Tam Đình & Ngũ Quan...
                  </span>
                  <span className="text-[10px] text-stone-400">{scanProgress}%</span>
                </div>
              </div>
            )}

            {/* Subtle Overlay Landmarks when not scanning */}
            {!isScanning && (
              <div className="absolute inset-0 pointer-events-none p-4 flex flex-col justify-between text-[10px] text-amber-200/80 font-mono">
                <div className="border-b border-amber-400/30 pb-1 flex justify-between">
                  <span>THƯỢNG ĐÌNH (Trán)</span>
                  <span>✦ 33.3%</span>
                </div>
                <div className="border-b border-amber-400/30 pb-1 flex justify-between">
                  <span>TRUNG ĐÌNH (Mũi · Mắt)</span>
                  <span>✦ 33.3%</span>
                </div>
                <div className="flex justify-between pt-1">
                  <span>HẠ ĐÌNH (Miệng · Cằm)</span>
                  <span>✦ 33.3%</span>
                </div>
              </div>
            )}
          </div>

          <div className="mt-3.5 text-center">
            <Button
              type="button"
              onClick={startScan}
              disabled={isScanning}
              className="w-full rounded-xl bg-gradient-to-r from-red-800 to-amber-700 hover:from-red-700 hover:to-amber-800 text-white font-semibold text-xs py-2.5 min-h-10 cursor-pointer shadow-xs gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{isScanning ? "Đang quét tỉ lệ vàng..." : "Quét lại nét tướng Tam Đình"}</span>
            </Button>
            <span className="text-[11px] text-stone-500 mt-2 block italic">
              * Ảnh được xử lý cục bộ trên thiết bị của bạn, bảo mật tuyệt đối
            </span>
          </div>
        </div>

        {/* Right Column (7 cols): Detailed Analysis Results */}
        <div className="lg:col-span-7 space-y-4">
          {showResult && (
            <>
              {/* Header Analysis */}
              <div className="p-5 rounded-3xl bg-surface border border-amber-500/30 shadow-xs">
                <div className="flex items-center gap-2 pb-2 mb-3 border-b border-line">
                  <Smile className="w-4 h-4 text-amber-700" />
                  <h3 className="font-display font-bold text-base sm:text-lg text-ink">
                    {currentModel.title}
                  </h3>
                </div>

                {/* Tam Dinh Section */}
                <div className="space-y-2 mb-4">
                  <span className="text-[10px] uppercase font-bold text-amber-800 dark:text-amber-300 tracking-wider block">
                    1. Khảo sát Tam Đình (Thiên - Địa - Nhân)
                  </span>

                  <div className="grid grid-cols-1 gap-2 text-xs">
                    <div className="p-3 rounded-xl bg-surface-soft border border-line">
                      <strong className="text-stone-700 dark:text-stone-300">Thượng Đình (Trí lực & Tiền vận): </strong>
                      <span className="text-stone-600 dark:text-stone-400">{currentModel.tamDinh.thuongDinh}</span>
                    </div>

                    <div className="p-3 rounded-xl bg-surface-soft border border-line">
                      <strong className="text-stone-700 dark:text-stone-300">Trung Đình (Nghị lực & Trung vận): </strong>
                      <span className="text-stone-600 dark:text-stone-400">{currentModel.tamDinh.trungDinh}</span>
                    </div>

                    <div className="p-3 rounded-xl bg-surface-soft border border-line">
                      <strong className="text-stone-700 dark:text-stone-300">Hạ Đình (Phúc lộc & Hậu vận): </strong>
                      <span className="text-stone-600 dark:text-stone-400">{currentModel.tamDinh.haDinh}</span>
                    </div>
                  </div>
                </div>

                {/* Ngu Quan Section */}
                <div className="space-y-2 mb-4">
                  <span className="text-[10px] uppercase font-bold text-amber-800 dark:text-amber-300 tracking-wider block">
                    2. Phân tích Ngũ Quan nếp xưa
                  </span>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {currentModel.nguQuan.map((item) => (
                      <div key={item.name} className="p-2.5 rounded-xl bg-surface-soft border border-line">
                        <div className="font-bold text-ink text-[11px] mb-0.5">{item.name}</div>
                        <div className="text-amber-800 dark:text-amber-300 font-semibold text-[11px]">{item.trait}</div>
                        <div className="text-stone-500 text-[10px] mt-0.5 leading-snug">{item.meaning}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Zen Cultivation Advice */}
                <div className="p-3.5 rounded-2xl bg-gradient-to-r from-amber-500/10 to-transparent border border-amber-500/25">
                  <div className="flex items-center gap-1.5 text-xs font-bold uppercase text-amber-800 dark:text-amber-300 mb-1">
                    <Heart className="w-3.5 h-3.5 text-red-600" />
                    <span>Bài học tu tâm dưỡng tướng:</span>
                  </div>
                  <p className="italic text-xs text-stone-700 dark:text-stone-300 leading-relaxed">
                    “{currentModel.zenAdvice}”
                  </p>
                </div>
              </div>
            </>
          )}

          {/* Ethical Disclaimer */}
          <div className="p-4 rounded-2xl bg-surface border border-line text-xs text-stone-500 leading-relaxed flex items-start gap-2.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <strong>Nguyên tắc nhân văn: </strong>
              Nhân tướng học dân gian là nghệ thuật quan sát hành vi, phong thái để tự hoàn thiện chính mình.
              Tuyệt đối không mang tính phán xét ngoại hình, không phân biệt đối xử và không dự đoán tai ương.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
