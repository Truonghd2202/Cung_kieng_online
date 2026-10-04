import React, { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

interface AltarVisualSectionProps {
  quoteText?: string;
  isMuted?: boolean;
  onToggleMute?: () => void;
  className?: string;
}

export const AltarVisualSection: React.FC<AltarVisualSectionProps> = ({
  quoteText = '"Khởi tâm an lạc • Kết duyên thiện lành"',
  isMuted = false,
  onToggleMute,
  className = "w-full lg:w-[56%] xl:w-[60%] h-44 sm:h-56 lg:h-full shrink-0 min-h-[180px] lg:min-h-0",
}) => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [reducedMotion, setReducedMotion] = useState(() => {
    return window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    const syncPreference = () => {
      setReducedMotion(mediaQuery.matches);
    };

    syncPreference();
    mediaQuery.addEventListener("change", syncPreference);

    return () => {
      mediaQuery.removeEventListener("change", syncPreference);
    };
  }, []);

  // Parallax 2.5D theo chuột
  const [parallax, setParallax] = useState({ x: 0, y: 0 });
  const parallaxRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (reducedMotion || document.hidden) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    parallaxRef.current.targetX = x;
    parallaxRef.current.targetY = y;
    setParallax({ x, y });
  };

  const handleMouseLeave = () => {
    parallaxRef.current.targetX = 0;
    parallaxRef.current.targetY = 0;
    setParallax({ x: 0, y: 0 });
  };

  useEffect(() => {
    if (!reducedMotion) return;

    parallaxRef.current = {
      x: 0,
      y: 0,
      targetX: 0,
      targetY: 0,
    };

    setParallax({ x: 0, y: 0 });
  }, [reducedMotion]);

  // Canvas vẽ 2 ngọn đèn dầu lung linh & bụi vàng linh thiêng bay bổng
  useEffect(() => {
    const canvas = canvasRef.current;
    const section = sectionRef.current;
    if (!canvas || !section) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    if (reducedMotion) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      return;
    }

    let animId: number | null = null;
    let disposed = false;
    let width = (canvas.width = section.clientWidth);
    let height = (canvas.height = section.clientHeight);

    // Khởi tạo 42 hạt bụi vàng linh thiêng
    const dustMotes = Array.from({ length: 42 }, () => ({
      x: Math.random(),
      y: Math.random(),
      size: 1.0 + Math.random() * 1.8,
      speedY: 0.00025 + Math.random() * 0.00045,
      pulseSpeed: 0.002 + Math.random() * 0.003,
      seed: Math.random() * 100,
      baseAlpha: 0.28 + Math.random() * 0.45,
    }));

    // Hạt tàn lửa nhỏ bay từ đèn dầu
    const lampSparks: { x: number; y: number; vx: number; vy: number; life: number; maxLife: number; size: number }[] = [];

    const render = (now: number) => {
      animId = null;

      if (disposed || document.hidden) return;
      if (
        section &&
        (canvas.width !== section.clientWidth || canvas.height !== section.clientHeight)
      ) {
        width = canvas.width = section.clientWidth;
        height = canvas.height = section.clientHeight;
      }

      // Làm mượt tọa độ parallax (spring interpolation)
      parallaxRef.current.x += (parallaxRef.current.targetX - parallaxRef.current.x) * 0.08;
      parallaxRef.current.y += (parallaxRef.current.targetY - parallaxRef.current.y) * 0.08;

      const px = parallaxRef.current.x;
      const py = parallaxRef.current.y;

      // Độ dịch chuyển của các vật gắn trên ảnh nền bàn thờ (-16px, -12px)
      const imgShiftX = px * -16;
      const imgShiftY = py * -12;

      ctx.clearRect(0, 0, width, height);

      // Tọa độ hình học trên ảnh gốc 1672 x 941
      const imgNativeW = 1672;
      const imgNativeH = 941;
      const scale = Math.max(width / imgNativeW, height / imgNativeH);
      const imgOffsetX = (width - imgNativeW * scale) / 2;
      const imgOffsetY = (height - imgNativeH * scale) / 2;

      // ==========================================
      // 1. NGỌN LỬA ĐÈN DẦU BẰNG ĐỒNG HAI BÊN BÀN THỜ
      // ==========================================
      const lamps = [
        { x: imgOffsetX + 272 * scale + imgShiftX, y: imgOffsetY + 388 * scale + imgShiftY, seed: 12.3 },
        { x: imgOffsetX + 1400 * scale + imgShiftX, y: imgOffsetY + 388 * scale + imgShiftY, seed: 45.6 },
      ];

      lamps.forEach(({ x: lampX, y: lampY, seed }) => {
        if (lampX < -100 || lampX > width + 100 || lampY < -100 || lampY > height + 100) return;

        const flicker =
          Math.sin(now * 0.008 + seed) * 0.12 +
          Math.cos(now * 0.018 + seed * 2) * 0.07 +
          (Math.random() - 0.5) * 0.04;

        const flameH = (23 + flicker * 6) * scale;
        const flameW = (10 + flicker * 2.2) * scale;
        const tipWobble = Math.sin(now * 0.009 + seed) * 2.4 * scale;

        ctx.save();

        // 1.1 Vầng quang phổ ấm
        const haloR = (62 + flicker * 14) * scale;
        const halo = ctx.createRadialGradient(lampX, lampY - flameH * 0.35, 0, lampX, lampY - flameH * 0.35, haloR);
        halo.addColorStop(0, "rgba(255, 185, 65, 0.44)");
        halo.addColorStop(0.35, "rgba(245, 130, 25, 0.18)");
        halo.addColorStop(0.7, "rgba(200, 75, 12, 0.05)");
        halo.addColorStop(1, "rgba(180, 50, 0, 0)");
        ctx.fillStyle = halo;
        ctx.beginPath();
        ctx.arc(lampX, lampY - flameH * 0.35, haloR, 0, Math.PI * 2);
        ctx.fill();

        // 1.2 Thân ngọn lửa hình giọt nước uốn lượn
        ctx.beginPath();
        ctx.moveTo(lampX - flameW * 0.5, lampY);
        ctx.bezierCurveTo(
          lampX - flameW * 0.65,
          lampY - flameH * 0.4,
          lampX - flameW * 0.25,
          lampY - flameH * 0.75,
          lampX + tipWobble,
          lampY - flameH
        );
        ctx.bezierCurveTo(
          lampX + flameW * 0.25,
          lampY - flameH * 0.75,
          lampX + flameW * 0.65,
          lampY - flameH * 0.4,
          lampX + flameW * 0.5,
          lampY
        );
        ctx.closePath();

        const flameGrad = ctx.createLinearGradient(lampX, lampY, lampX, lampY - flameH);
        flameGrad.addColorStop(0, "rgba(255, 60, 5, 0.95)");
        flameGrad.addColorStop(0.28, "rgba(255, 155, 20, 0.98)");
        flameGrad.addColorStop(0.72, "rgba(255, 230, 95, 0.96)");
        flameGrad.addColorStop(1, "rgba(255, 255, 240, 0.98)");
        ctx.fillStyle = flameGrad;
        ctx.shadowColor = "#ff9800";
        ctx.shadowBlur = 10 * scale;
        ctx.fill();

        // 1.3 Tim lửa trắng sáng bên trong
        const coreH = flameH * 0.48;
        const coreW = flameW * 0.42;
        ctx.beginPath();
        ctx.ellipse(
          lampX + tipWobble * 0.2,
          lampY - coreH * 0.42,
          coreW * 0.5,
          coreH * 0.5,
          0,
          0,
          Math.PI * 2
        );
        const coreGrad = ctx.createRadialGradient(
          lampX + tipWobble * 0.2,
          lampY - coreH * 0.42,
          0,
          lampX + tipWobble * 0.2,
          lampY - coreH * 0.42,
          coreH * 0.5
        );
        coreGrad.addColorStop(0, "rgba(255, 255, 255, 0.98)");
        coreGrad.addColorStop(0.65, "rgba(255, 245, 190, 0.85)");
        coreGrad.addColorStop(1, "rgba(255, 195, 50, 0)");
        ctx.fillStyle = coreGrad;
        ctx.shadowBlur = 4 * scale;
        ctx.fill();

        ctx.restore();

        // Tàn lửa bay lên
        if (Math.random() < 0.02) {
          lampSparks.push({
            x: lampX + tipWobble + (Math.random() - 0.5) * 2 * scale,
            y: lampY - flameH,
            vx: (Math.random() - 0.5) * 0.3 * scale,
            vy: -(0.5 + Math.random() * 0.7) * scale,
            life: 0,
            maxLife: 24 + Math.random() * 20,
            size: (0.7 + Math.random() * 0.8) * scale,
          });
        }
      });

      // Vẽ tàn lửa đèn dầu
      for (let sIdx = lampSparks.length - 1; sIdx >= 0; sIdx--) {
        const sp = lampSparks[sIdx];
        sp.life++;
        if (sp.life >= sp.maxLife) {
          lampSparks.splice(sIdx, 1);
          continue;
        }
        sp.x += sp.vx;
        sp.y += sp.vy;
        const spProgress = sp.life / sp.maxLife;
        const spAlpha = (1 - spProgress) * 0.75;

        ctx.save();
        ctx.beginPath();
        ctx.arc(sp.x, sp.y, sp.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 205, 80, ${spAlpha})`;
        ctx.shadowColor = "#ffb300";
        ctx.shadowBlur = 4;
        ctx.fill();
        ctx.restore();
      }

      // ==========================================
      // 2. BỤI VÀNG LINH THIÊNG (ATMOSPHERIC GOLDEN DUST)
      // Parallax tiền cảnh (+28px, +22px)
      // ==========================================
      const dustShiftX = px * 28;
      const dustShiftY = py * 22;

      dustMotes.forEach((mote) => {
        mote.y -= mote.speedY;
        if (mote.y < -0.05) {
          mote.y = 1.05;
          mote.x = Math.random();
        }

        const moteDrawX = mote.x * width + dustShiftX;
        const moteDrawY = mote.y * height + dustShiftY;

        if (moteDrawX < -20 || moteDrawX > width + 20 || moteDrawY < -20 || moteDrawY > height + 20) return;

        const pulse = 0.5 + 0.5 * Math.sin(now * mote.pulseSpeed + mote.seed);
        const moteAlpha = mote.baseAlpha * pulse;

        ctx.save();
        const moteGrad = ctx.createRadialGradient(moteDrawX, moteDrawY, 0, moteDrawX, moteDrawY, mote.size * 2.6);
        moteGrad.addColorStop(0, `rgba(255, 238, 180, ${moteAlpha})`);
        moteGrad.addColorStop(0.45, `rgba(245, 190, 80, ${moteAlpha * 0.65})`);
        moteGrad.addColorStop(1, "rgba(220, 150, 40, 0)");

        ctx.fillStyle = moteGrad;
        ctx.beginPath();
        ctx.arc(moteDrawX, moteDrawY, mote.size * 2.6, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      animId = requestAnimationFrame(render);
    };

    const stopAnimation = () => {
      if (animId !== null) {
        cancelAnimationFrame(animId);
        animId = null;
      }
    };

    const startAnimation = () => {
      if (disposed || document.hidden || animId !== null) return;

      animId = requestAnimationFrame(render);
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        stopAnimation();
      } else {
        startAnimation();
      }
    };

    document.addEventListener(
      "visibilitychange",
      handleVisibilityChange
    );

    startAnimation();

    return () => {
      disposed = true;
      stopAnimation();

      document.removeEventListener(
        "visibilitychange",
        handleVisibilityChange
      );

      ctx.clearRect(0, 0, canvas.width, canvas.height);
    };
  }, [reducedMotion]);

  return (
    <section
      ref={sectionRef}
      aria-label="Không gian thanh tịnh bàn thờ và lư hương"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative flex flex-col justify-end select-none bg-stone-950 transition-all duration-1000 ease-out motion-reduce:transition-none overflow-hidden ${className}`}
    >
      {/* Nút bật/tắt âm thanh */}
      {onToggleMute && (
        <div className="absolute top-4 right-4 z-40 flex items-center gap-2">
          <button
            type="button"
            onClick={onToggleMute}
            className="p-2.5 rounded-full bg-stone-900/60 hover:bg-stone-900/90 text-stone-200 border border-amber-500/25 backdrop-blur-md shadow-lg transition-all cursor-pointer"
            title={isMuted ? "Bật âm thanh" : "Tắt âm thanh"}
            aria-label={isMuted ? "Bật âm thanh" : "Tắt âm thanh"}
          >
            {isMuted ? (
              <VolumeX className="w-4 h-4 text-stone-400" />
            ) : (
              <Volume2 className="w-4 h-4 text-amber-400" />
            )}
          </button>
        </div>
      )}

      {/* Ảnh nền bàn thờ gia tiên với hiệu ứng Parallax 2.5D */}
      <img
        src="/images/login-altar-scene-v3.png"
        alt="Bàn thờ gia tiên trang nghiêm"
        style={{
          transform: reducedMotion
            ? "scale(1.06)"
            : `scale(1.06) translate3d(${parallax.x * -16}px, ${parallax.y * -12}px, 0)`,
          transition: reducedMotion
            ? "none"
            : "transform 0.18s cubic-bezier(0.2, 0.8, 0.3, 1), filter 1s ease",
        }}
        className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none will-change-transform"
      />

      {/* Lớp phủ ánh đèn dầu lung linh */}
      <div className="absolute inset-0 bg-radial from-amber-500/10 via-transparent to-black/40 pointer-events-none" />

      {/* Canvas vẽ 2 ngọn đèn dầu & bụi vàng linh thiêng */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="absolute inset-0 w-full h-full pointer-events-none z-20"
      />

      {/* Châm ngôn truyền thống tinh tế ở góc dưới trái */}
      {quoteText && (
        <div className="relative z-30 p-6 lg:p-8 hidden sm:block">
          <p className="font-serif italic text-xs lg:text-sm text-amber-200/80 drop-shadow-md">
            {quoteText}
          </p>
        </div>
      )}

      {/* Lớp bóng đổ & đường nẹp chỉ đồng kim phân cách giữa 2 cột */}
      <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-r from-transparent to-black/40 pointer-events-none hidden lg:block z-20" />
      <div className="absolute inset-y-0 right-0 w-[1.5px] bg-gradient-to-b from-transparent via-amber-400/60 to-transparent shadow-[0_0_8px_rgba(251,191,36,0.35)] hidden lg:block z-30 pointer-events-none" />

      {/* Lớp phủ chân bàn thờ */}
      <div className="absolute bottom-0 inset-x-0 h-10 bg-gradient-to-t from-stone-950/80 to-transparent pointer-events-none z-10" />
    </section>
  );
};
