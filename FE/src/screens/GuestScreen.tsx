import React, { useState, useRef, useEffect } from "react";
import {
  ArrowRight,
  BookOpen,
  Compass,
  Flower2,
  Heart,
  ScrollText,
  ShieldCheck,
  Sparkles,
  SunMedium,
  Bell,
  Sparkle,
} from "lucide-react";
import "../styles/GuestScreen.css";

interface GuestScreenProps {
  onSelectMood: () => void;
  onGoToCulture: () => void;
  onGoToExperience: () => void;
}

interface MoodPreviewData {
  label: string;
  icon: string;
  quote: string;
  action: string;
}

// 5 trạng thái cảm xúc tiêu biểu kèm thông điệp ca dao vỗ về tức thì
const MOOD_TEASER_CHIPS: MoodPreviewData[] = [
  {
    label: "Chênh vênh",
    icon: "🌱",
    quote: "“Gió đưa cành trúc la đà — Lòng yên một khắc, sự đời nhẹ buông.”",
    action: "Uống một ngụm nước ấm, thở chậm ba nhịp",
  },
  {
    label: "Áp lực",
    icon: "🍃",
    quote: "“Nước chảy đá mòn, kiên tâm ắt phẳng lặng — Đừng gánh cả bầu trời trên vai.”",
    action: "Thả lỏng đôi vai, nhắm mắt tĩnh tại 30 giây",
  },
  {
    label: "Mông lung",
    icon: "☁️",
    quote: "“Đường xa vạn dặm khởi từ một bước chân — Cứ đi ắt tới bến bình minh.”",
    action: "Viết ra một điều nhỏ bé khiến bạn thấy biết ơn",
  },
  {
    label: "Cần động viên",
    icon: "☀️",
    quote: "“Mưa thuận gió hòa, hạt mầm thiện lành ắt sẽ trổ hoa rực rỡ.”",
    action: "Mỉm cười với chính mình trước gương",
  },
  {
    label: "Bình yên",
    icon: "🌸",
    quote: "“Tâm an vạn sự an — Tận hưởng khoảnh khắc hiện tại tròn đầy.”",
    action: "Dành trọn vẹn một phút lắng nghe hơi thở",
  },
];

interface SteamParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  maxAlpha: number;
  age: number;
  maxAge: number;
  swirl: number;
}

export const GuestScreen: React.FC<GuestScreenProps> = ({
  onSelectMood,
  onGoToCulture,
  onGoToExperience,
}) => {
  const [activeMoodIndex, setActiveMoodIndex] = useState<number>(0);
  const [bellRinging, setBellRinging] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const steamParticlesRef = useRef<SteamParticle[]>([]);
  const audioElementRef = useRef<HTMLAudioElement | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Web Audio chuông thiền ngân 5 tần số hài hòa
  const playSynthesizedBell = (ctx: AudioContext, now: number) => {
    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0.001, now);
    masterGain.gain.linearRampToValueAtTime(0.3, now + 0.05);
    masterGain.gain.exponentialRampToValueAtTime(0.0001, now + 8.5);
    masterGain.connect(ctx.destination);

    const freqs = [216, 432, 648, 864, 1296];
    const decays = [8.5, 6.2, 4.8, 3.5, 2.2];
    const amps = [0.4, 0.25, 0.15, 0.08, 0.04];

    freqs.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, now);
      gain.gain.setValueAtTime(amps[idx], now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + decays[idx]);
      osc.connect(gain);
      gain.connect(masterGain);
      osc.start(now);
      osc.stop(now + decays[idx]);
    });
  };

  const playZenBellSound = () => {
    try {
      const audio = new Audio("/audio/meditation-bowl.mp3");
      audio.volume = 0.8;
      audioElementRef.current = audio;

      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          try {
            const AudioCtx =
              window.AudioContext ||
              (window as unknown as { webkitAudioContext: typeof AudioContext })
                .webkitAudioContext;
            if (AudioCtx) {
              const ctx = new AudioCtx();
              audioCtxRef.current = ctx;
              playSynthesizedBell(ctx, ctx.currentTime);
            }
          } catch {}
        });
      }
    } catch {
      try {
        const AudioCtx =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext })
            .webkitAudioContext;
        if (AudioCtx) {
          const ctx = new AudioCtx();
          audioCtxRef.current = ctx;
          playSynthesizedBell(ctx, ctx.currentTime);
        }
      } catch {}
    }
  };

  const handleRingBell = () => {
    setBellRinging(true);
    playZenBellSound();
    setTimeout(() => setBellRinging(false), 900);
  };

  // Canvas hiệu ứng hơi khói trà bốc lên nhẹ nhàng từ chén trà
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number | null = null;
    let disposed = false;

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = parent.clientWidth;
      const h = parent.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener("resize", resize);

    let lastTime = performance.now();

    const render = (now: number) => {
      if (disposed) return;
      const dt = lastTime > 0 ? Math.min((now - lastTime) / 1000, 0.05) : 0.016;
      lastTime = now;

      const parent = canvas.parentElement;
      const w = parent ? parent.clientWidth : 380;
      const h = parent ? parent.clientHeight : 420;

      ctx.clearRect(0, 0, w, h);

      // Điểm bốc khói từ miệng chén trà (ở khoảng tâm ngang và 54% chiều dọc)
      const mouthX = w * 0.505;
      const mouthY = h * 0.54;

      // Sinh hạt khói trà mềm mại
      if (steamParticlesRef.current.length < 24 && Math.random() < 0.4) {
        steamParticlesRef.current.push({
          x: mouthX + (Math.random() - 0.5) * 28,
          y: mouthY + (Math.random() - 0.5) * 8,
          vx: (Math.random() - 0.5) * 6,
          vy: -18 - Math.random() * 14,
          radius: 6 + Math.random() * 6,
          alpha: 0,
          maxAlpha: 0.22 + Math.random() * 0.12,
          age: 0,
          maxAge: 3.5 + Math.random() * 1.5,
          swirl: 0.8 + Math.random() * 1.2,
        });
      }

      // Cập nhật và vẽ các vệt khói trà
      for (let i = steamParticlesRef.current.length - 1; i >= 0; i--) {
        const p = steamParticlesRef.current[i];
        p.age += dt;
        if (p.age >= p.maxAge) {
          steamParticlesRef.current.splice(i, 1);
          continue;
        }

        const life = p.age / p.maxAge;
        if (life < 0.25) {
          p.alpha = (life / 0.25) * p.maxAlpha;
        } else {
          p.alpha = (1 - (life - 0.25) / 0.75) * p.maxAlpha;
        }

        p.radius += dt * 8;
        p.x += (p.vx + Math.sin(p.age * p.swirl) * 8) * dt;
        p.y += p.vy * dt;

        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius);
        grad.addColorStop(0, `rgba(255, 252, 246, ${p.alpha * 0.9})`);
        grad.addColorStop(0.5, `rgba(245, 235, 220, ${p.alpha * 0.45})`);
        grad.addColorStop(1, "rgba(235, 220, 200, 0)");

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      disposed = true;
      if (animId !== null) cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      if (audioElementRef.current) {
        audioElementRef.current.pause();
        audioElementRef.current = null;
      }
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {});
        audioCtxRef.current = null;
      }
    };
  }, []);

  const activeMood = MOOD_TEASER_CHIPS[activeMoodIndex] || MOOD_TEASER_CHIPS[0];

  return (
    <div className="screen-shell relative overflow-hidden">
      {/* Vầng sáng nền mang sắc ấm mỹ học truyền thống */}
      <div
        className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[42rem] sm:w-[56rem] h-[28rem] rounded-full bg-gradient-to-b from-accent/10 via-gold/5 to-transparent blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute top-1/3 -right-24 w-80 h-80 rounded-full bg-gold/8 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-1/4 -left-20 w-80 h-80 rounded-full bg-accent/6 blur-3xl"
        aria-hidden="true"
      />

      <main className="page-container max-w-6xl relative z-10 py-6 sm:py-10">
        {/* ========================================================= */}
        {/* 1. HERO SECTION (GIỚI THIỆU & 2 LUỒNG CHÍNH ĐỘC LẬP)      */}
        {/* ========================================================= */}
        <section
          aria-labelledby="guest-intro-title"
          className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center"
        >
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Hàng định vị: Pill Badge + Nút Thỉnh chuông an yên */}
            <div className="flex flex-wrap items-center gap-3 mb-5">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent/8 border border-accent/20 text-accent font-medium text-xs sm:text-sm tracking-wide shadow-xs backdrop-blur-xs">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
                </span>
                <Flower2 className="w-4 h-4 text-accent" aria-hidden="true" />
                <span>Văn hóa Việt · Trạm dừng tĩnh tại cho tâm hồn</span>
              </div>

              {/* Nút Thỉnh chuông thiền ngay đầu trang */}
              <button
                type="button"
                onClick={handleRingBell}
                className={`guest-zen-bell-btn ${
                  bellRinging ? "guest-zen-bell-btn--ringing" : ""
                }`}
                title="Thỉnh một tiếng chuông tĩnh tâm"
                aria-label="Thỉnh chuông tĩnh tâm"
              >
                <Bell
                  className={`w-3.5 h-3.5 text-amber-700 ${
                    bellRinging ? "animate-bounce" : ""
                  }`}
                />
                <span>Thỉnh chuông an yên</span>
              </button>
            </div>

            {/* Tiêu đề chính kèm Dấu Triện Son "An" (安) */}
            <h1
              id="guest-intro-title"
              tabIndex={-1}
              className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold text-ink leading-[1.18] tracking-tight mb-4 outline-none focus:outline-none focus-visible:outline-none focus:ring-0"
            >
              <span className="guest-seal-title" title="Dấu ấn An">
                安
              </span>
              <span>Chạm một chút văn hóa.</span>
              <span className="block mt-2 bg-gradient-to-r from-accent via-coral-warm to-gold bg-clip-text text-transparent pb-1">
                Dành một chút cho mình.
              </span>
            </h1>

            {/* Họa tiết hoa văn truyền thống */}
            <div className="flex items-center gap-3 my-2 mb-5" aria-hidden="true">
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-accent/40" />
              <div className="w-1.5 h-1.5 rotate-45 bg-accent/70" />
              <div className="h-px w-32 bg-accent/30" />
              <div className="w-1.5 h-1.5 rotate-45 bg-accent/70" />
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-accent/40" />
            </div>

            {/* Đoạn mở đầu định vị */}
            <p className="text-base sm:text-lg text-muted leading-relaxed max-w-xl mb-7">
              <strong className="font-semibold text-ink">Tin Lắm Tâm Linh</strong>{" "}
              kết nối kho tàng văn hóa dân gian Việt với nhịp sống số hiện đại,
              mang đến điểm tựa tinh thần nhẹ nhàng và những câu chuyện cội nguồn
              gần gũi cho người trẻ.
            </p>

            {/* Hai nút hành động: CTA đỏ trầm son ánh kim + Nút viền đồng */}
            <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
              <button
                type="button"
                onClick={onSelectMood}
                className="guest-primary-btn group"
              >
                <span className="guest-primary-sheen" />
                <ButtonOrnament className="w-6 h-4 text-amber-200/80 shrink-0" />
                <span>Chọn tâm trạng hôm nay</span>
                <ArrowRight
                  className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </button>

              <button
                type="button"
                onClick={onGoToCulture}
                className="guest-secondary-btn group"
              >
                <BookOpen
                  className="w-4 h-4 text-accent transition-transform duration-300 group-hover:scale-110"
                  aria-hidden="true"
                />
                <span>Khám phá văn hóa</span>
              </button>
            </div>

            {/* Các cam kết cốt lõi: Tự nguyện & Không áp đặt */}
            <div className="mt-7 pt-5 border-t border-line/60 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs sm:text-sm text-muted">
              <span className="inline-flex items-center gap-1.5 font-medium text-ink">
                <Sparkles className="w-3.5 h-3.5 text-gold" aria-hidden="true" />
                Không cần đăng nhập
              </span>
              <span className="inline-flex items-center gap-1.5">
                <SunMedium className="w-3.5 h-3.5 text-accent" aria-hidden="true" />
                Tự do trải nghiệm
              </span>
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-success" aria-hidden="true" />
                Không hù dọa · Phi mê tín
              </span>
            </div>
          </div>

          {/* Cụm thị giác chén trà: KHÓI TRÀ SỐNG ĐỘNG + VẦNG HÀO QUANG THỞ */}
          <div className="lg:col-span-5 relative flex justify-center">
            {/* Vầng hào quang thở phía sau */}
            <div className="guest-breathing-aura" aria-hidden="true" />

            <figure className="guest-tea-figure relative w-full max-w-sm sm:max-w-md lg:max-w-none">
              {/* Khung vòm Indochine mộc mạc bo cong trên */}
              <div className="relative overflow-hidden rounded-t-[10rem] rounded-b-2xl border border-line/80 bg-surface shadow-lg">
                <img
                  src="/images/tea_bowl.jpg"
                  alt="Chén trà ấm trong không gian yên tĩnh truyền thống"
                  decoding="async"
                  className="w-full h-72 sm:h-80 lg:h-[26rem] object-cover transition-transform duration-700 hover:scale-103"
                />

                {/* Canvas làn hơi khói trà bốc lên nhẹ nhàng */}
                <canvas ref={canvasRef} className="guest-tea-steam-canvas" />
              </div>

              {/* Chú thích trang nhã đặt dưới ảnh */}
              <figcaption className="mt-3 text-sm text-muted text-center sm:text-left flex items-center justify-center sm:justify-start gap-1.5">
                <Sparkle className="w-3 h-3 text-amber-600/70" />
                <span>Một khoảng dừng nhỏ giữa nhịp sống thường ngày.</span>
              </figcaption>
            </figure>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 2. CHẠM CẢM XÚC NHANH (INTERACTIVE MOOD TEASER 10/10)      */}
        {/* ========================================================= */}
        <section
          aria-labelledby="mood-teaser-title"
          className="mt-14 sm:mt-20 rounded-3xl border border-line/80 bg-gradient-to-br from-surface via-surface-soft/40 to-surface p-6 sm:p-8 shadow-xs relative overflow-hidden"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-accent mb-2">
                <Heart className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Góc lắng đọng cảm xúc</span>
              </div>

              <h2
                id="mood-teaser-title"
                className="font-display text-2xl sm:text-3xl font-semibold text-ink tracking-tight mb-2"
              >
                Hôm nay bạn đang cảm thấy thế nào?
              </h2>

              <p className="text-sm sm:text-base text-muted max-w-2xl leading-relaxed">
                Rê chuột vào một cảm xúc để nhận lời ca dao vỗ về ngay tại chỗ,
                hoặc nhấn vào để bắt đầu buổi check-in an lòng.
              </p>
            </div>

            <button
              type="button"
              onClick={onSelectMood}
              className="guest-secondary-btn shrink-0 w-full sm:w-auto text-sm"
            >
              <span>Vào check-in tâm trạng</span>
              <ArrowRight className="w-4 h-4 text-accent" />
            </button>
          </div>

          {/* Các nút chip cảm xúc */}
          <div className="mt-6 pt-5 border-t border-line/60 flex flex-wrap items-center gap-2.5">
            <span className="text-xs font-medium text-subtle mr-1">
              Gợi ý cảm xúc:
            </span>
            {MOOD_TEASER_CHIPS.map((chip, index) => {
              const isSelected = activeMoodIndex === index;
              return (
                <button
                  key={chip.label}
                  type="button"
                  onMouseEnter={() => setActiveMoodIndex(index)}
                  onClick={onSelectMood}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border text-xs sm:text-sm font-medium transition-all cursor-pointer shadow-xs active:scale-95 ${
                    isSelected
                      ? "border-accent bg-accent text-on-accent shadow-sm scale-102"
                      : "border-line bg-surface hover:border-accent/60 hover:bg-accent-soft/40 text-ink"
                  }`}
                >
                  <span>{chip.icon}</span>
                  <span>{chip.label}</span>
                </button>
              );
            })}
          </div>

          {/* Hộp xem trước ca dao vỗ về tức thì (Micro-quote preview) */}
          {activeMood && (
            <div className="guest-mood-preview-box mt-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <p className="guest-mood-quote-text m-0">
                  {activeMood.quote}
                </p>
                <div className="guest-mood-action-tag shrink-0">
                  <Flower2 className="w-3.5 h-3.5 text-accent" />
                  <span>{activeMood.action}</span>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* ========================================================= */}
        {/* 3. BA TRỤ CỘT HỆ SINH THÁI — CHẤT LIỆU THẺ BÀI CỔ PHONG     */}
        {/* ========================================================= */}
        <section
          aria-labelledby="guest-pillars-title"
          className="mt-14 sm:mt-20"
        >
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-7">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-accent mb-2">
                <Compass className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Không gian trải nghiệm</span>
              </div>
              <h2
                id="guest-pillars-title"
                className="font-display text-2xl sm:text-3xl font-semibold text-ink tracking-tight"
              >
                Khám phá hệ sinh thái Tin Lắm Tâm Linh
              </h2>
            </div>
            <p className="text-sm sm:text-base text-muted max-w-md">
              Hai luồng tiếp cận tự do: khởi đầu từ cảm xúc cá nhân hoặc trực
              tiếp khám phá di sản và nghi thức dân gian.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Trụ cột 1: Đồng hành cảm xúc (Mood check-in) */}
            <article
              role="button"
              tabIndex={0}
              onClick={onSelectMood}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onSelectMood();
                }
              }}
              className="guest-pillar-card group cursor-pointer"
            >
              <div className="guest-pillar-accent-line bg-gradient-to-r from-accent to-coral-warm" />
              <CornerOrnament className="guest-pillar-corner guest-pillar-corner--tl" />
              <CornerOrnament className="guest-pillar-corner guest-pillar-corner--br" />

              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-on-accent transition-all duration-300 shadow-xs">
                    <Heart className="w-6 h-6" aria-hidden="true" />
                  </div>
                  <span className="text-xs font-medium text-accent bg-accent/8 px-2.5 py-1 rounded-full border border-accent/15">
                    Đồng hành cảm xúc
                  </span>
                </div>

                <h3 className="font-display text-xl sm:text-2xl font-semibold text-ink mb-2.5 group-hover:text-accent transition-colors duration-200">
                  Lắng nghe mình
                </h3>

                <p className="text-sm sm:text-base text-muted leading-relaxed mb-4">
                  Gửi gắm tâm sự khi áp lực, chênh vênh. Nhận lời khuyên từ ca
                  dao, tục ngữ và thông điệp tích cực cá nhân hóa cho ngày hôm nay.
                </p>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  <span className="text-[11px] font-medium text-subtle bg-surface-soft px-2 py-0.5 rounded-md">
                    Check-in tâm trạng
                  </span>
                  <span className="text-[11px] font-medium text-subtle bg-surface-soft px-2 py-0.5 rounded-md">
                    Ca dao tục ngữ
                  </span>
                  <span className="text-[11px] font-medium text-subtle bg-surface-soft px-2 py-0.5 rounded-md">
                    Hành động an yên
                  </span>
                </div>
              </div>

              <div className="pt-4 border-t border-line/60 flex items-center justify-between text-sm font-semibold text-accent group-hover:text-accent-strong">
                <span>Khởi tâm lắng nghe</span>
                <ArrowRight
                  className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5"
                  aria-hidden="true"
                />
              </div>
            </article>

            {/* Trụ cột 2: Di sản văn hóa ba miền */}
            <article
              role="button"
              tabIndex={0}
              onClick={onGoToCulture}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onGoToCulture();
                }
              }}
              className="guest-pillar-card group cursor-pointer"
            >
              <div className="guest-pillar-accent-line bg-gradient-to-r from-gold to-amber-400" />
              <CornerOrnament className="guest-pillar-corner guest-pillar-corner--tl" />
              <CornerOrnament className="guest-pillar-corner guest-pillar-corner--br" />

              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-xl bg-gold/10 border border-gold/25 flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-on-accent transition-all duration-300 shadow-xs">
                    <BookOpen className="w-6 h-6" aria-hidden="true" />
                  </div>
                  <span className="text-xs font-medium text-gold bg-gold/10 px-2.5 py-1 rounded-full border border-gold/20">
                    Di sản ba miền
                  </span>
                </div>

                <h3 className="font-display text-xl sm:text-2xl font-semibold text-ink mb-2.5 group-hover:text-gold transition-colors duration-200">
                  Hiểu thêm văn hóa
                </h3>

                <p className="text-sm sm:text-base text-muted leading-relaxed mb-4">
                  Dạo bước qua kho tàng văn hóa Bắc, Trung, Nam: Tín ngưỡng Thờ
                  Mẫu & điệu hát Chầu Văn, di sản Cố đô, tục thờ cá Ông và sông
                  nước miệt vườn.
                </p>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  <span className="text-[11px] font-medium text-subtle bg-surface-soft px-2 py-0.5 rounded-md">
                    Thờ Mẫu & Chầu Văn
                  </span>
                  <span className="text-[11px] font-medium text-subtle bg-surface-soft px-2 py-0.5 rounded-md">
                    Cố đô & Biển cả
                  </span>
                  <span className="text-[11px] font-medium text-subtle bg-surface-soft px-2 py-0.5 rounded-md">
                    Văn hóa sông nước
                  </span>
                </div>
              </div>

              <div className="pt-4 border-t border-line/60 flex items-center justify-between text-sm font-semibold text-gold group-hover:text-amber-800 dark:group-hover:text-amber-300">
                <span>Vào dạo cảnh di sản</span>
                <ArrowRight
                  className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5"
                  aria-hidden="true"
                />
              </div>
            </article>

            {/* Trụ cột 3: Trải nghiệm thực hành số */}
            <article
              role="button"
              tabIndex={0}
              onClick={onGoToExperience}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onGoToExperience();
                }
              }}
              className="guest-pillar-card group cursor-pointer"
            >
              <div className="guest-pillar-accent-line bg-gradient-to-r from-success to-emerald-400" />
              <CornerOrnament className="guest-pillar-corner guest-pillar-corner--tl" />
              <CornerOrnament className="guest-pillar-corner guest-pillar-corner--br" />

              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-xl bg-success/10 border border-success/25 flex items-center justify-center text-success group-hover:bg-success group-hover:text-white transition-all duration-300 shadow-xs">
                    <ScrollText className="w-6 h-6" aria-hidden="true" />
                  </div>
                  <span className="text-xs font-medium text-success bg-success/10 px-2.5 py-1 rounded-full border border-success/20">
                    Tương tác trực tiếp
                  </span>
                </div>

                <h3 className="font-display text-xl sm:text-2xl font-semibold text-ink mb-2.5 group-hover:text-success transition-colors duration-200">
                  Thực hành tâm an
                </h3>

                <p className="text-sm sm:text-base text-muted leading-relaxed mb-4">
                  Xin xăm văn hóa truyền thống (Quan Âm, Quan Thánh), thả hoa
                  đăng số gửi gắm điều ước thiện lành, hoặc thắp nén nhang lòng tri
                  ân tổ tiên.
                </p>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  <span className="text-[11px] font-medium text-subtle bg-surface-soft px-2 py-0.5 rounded-md">
                    Xăm Quan Âm / Quan Thánh
                  </span>
                  <span className="text-[11px] font-medium text-subtle bg-surface-soft px-2 py-0.5 rounded-md">
                    Đèn hoa đăng số
                  </span>
                  <span className="text-[11px] font-medium text-subtle bg-surface-soft px-2 py-0.5 rounded-md">
                    Tri ân gia tiên
                  </span>
                </div>
              </div>

              <div className="pt-4 border-t border-line/60 flex items-center justify-between text-sm font-semibold text-success group-hover:text-emerald-800 dark:group-hover:text-emerald-300">
                <span>Vào phòng trải nghiệm</span>
                <ArrowRight
                  className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5"
                  aria-hidden="true"
                />
              </div>
            </article>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 4. CAM KẾT VĂN HÓA & TRIẾT LÝ SẢN PHẨM (MỤC I.4 REQUIREMENTS)*/}
        {/* ========================================================= */}
        <div className="mt-14 pt-7 border-t border-line/60 flex items-start sm:items-center gap-3.5 text-xs sm:text-sm text-muted">
          <ShieldCheck
            className="w-5 h-5 text-accent shrink-0 mt-0.5 sm:mt-0"
            aria-hidden="true"
          />
          <p className="leading-relaxed">
            <strong className="text-ink font-semibold">
              Triết lý văn hóa văn minh:
            </strong>{" "}
            “Tôn trọng văn hóa gốc – Chạm cảm xúc trẻ – Nuôi dưỡng tinh thần tích
            cực”. Trải nghiệm hoàn toàn tự nguyện; không mang tính mê tín dị
            đoan, không phán xét, không hù dọa và không quyết định thay bạn.
          </p>
        </div>
      </main>
    </div>
  );
};

/** Hoa văn góc cổ phong cho các thẻ trụ cột */
const CornerOrnament: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M4 20V8a4 4 0 0 1 4-4h12" />
    <circle cx="8" cy="8" r="1.5" fill="currentColor" />
  </svg>
);

/** Hoa văn mây cuộn vàng 2 đầu nút bấm */
const ButtonOrnament: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 30 20"
    fill="none"
    stroke="currentColor"
    strokeWidth="1"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M2 3v14" />
    <path d="M2 10h4" />
    <path d="M9 10c0-2.6 2-4.4 4.4-4.4 2.2 0 3.8 1.6 3.8 3.6 0 1.6-1.2 2.8-2.7 2.8-1.2 0-2.1-.9-2.1-2 0-.9.7-1.6 1.6-1.6" />
    <path d="M17.2 9.2c1.2-2.6 3.6-3.8 6-3.2 1.8.5 3 2 3 3.6" />
  </svg>
);
