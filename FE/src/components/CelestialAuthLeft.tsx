import React, { useState, useRef, useEffect } from "react";
import { ArrowLeft } from "lucide-react";

export interface CelestialAuthLeftProps {
  onBack?: () => void;
}

interface SmokeParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  maxRadius: number;
  alpha: number;
  maxAlpha: number;
  age: number;
  maxAge: number;
  swirlSpeed: number;
  seed: number;
}

interface EmberParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  age: number;
  maxAge: number;
  seed: number;
}

/**
 * Cột Trái nghệ thuật tiên cảnh — Giống y chang 100% như LoginScreen:
 * - Tranh tiên cảnh nguyên bản (đã có sẵn chữ thư pháp và lư hương trong tranh)
 * - Nẹp chỉ vàng đồng mỏng ngăn cách hai cột
 * - Canvas 3 nén nhang: khói tỏa nhẹ + đốm than hồng nhấp nháy + tàn lửa li ti vàng óng
 * - Nút quay lại tròn kính mờ giấy dó
 * - Parallax chuột 2.5D
 */
export const CelestialAuthLeft: React.FC<CelestialAuthLeftProps> = ({ onBack }) => {
  const [reducedMotion, setReducedMotion] = useState(() =>
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false
  );

  const [parallax, setParallax] = useState({ x: 0, y: 0 });

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const smokeParticlesRef = useRef<SmokeParticle[]>([]);
  const emberParticlesRef = useRef<EmberParticle[]>([]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncPreference = () => setReducedMotion(mediaQuery.matches);
    syncPreference();
    mediaQuery.addEventListener("change", syncPreference);
    return () => mediaQuery.removeEventListener("change", syncPreference);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reducedMotion) return;
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const normX = (clientX / innerWidth - 0.5) * 2;
    const normY = (clientY / innerHeight - 0.5) * 2;
    setParallax({ x: normX, y: normY });
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number | null = null;
    let disposed = false;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const parent = canvas.parentElement;
      const width = parent ? parent.clientWidth : window.innerWidth * 0.6;
      const height = parent ? parent.clientHeight : window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener("resize", resize);

    let lastTime = performance.now();

    const render = (now: number) => {
      if (disposed) return;
      const dt =
        lastTime > 0 && now > lastTime
          ? Math.min((now - lastTime) / 1000, 0.05)
          : 0.016;
      lastTime = now;

      const parent = canvas.parentElement;
      const width = parent ? parent.clientWidth : window.innerWidth * 0.6;
      const height = parent ? parent.clientHeight : window.innerHeight;

      ctx.clearRect(0, 0, width, height);

      // Điểm phát khói ở Cột Trái: đỉnh 3 nén nhang trong tranh nghệ thuật
      const incenseX = width * 0.505;
      const incenseY = height * 0.566;

      // 1. Sinh khói nhang nhẹ nhàng
      if (smokeParticlesRef.current.length < 32 && Math.random() < 0.45) {
        const offsetAngle = (Math.random() - 0.5) * 0.25;
        smokeParticlesRef.current.push({
          x: incenseX + (Math.random() - 0.5) * 6,
          y: incenseY,
          vx: Math.sin(offsetAngle) * 2.5 + (Math.random() - 0.5) * 1.5,
          vy: -14 - Math.random() * 10,
          radius: 2 + Math.random() * 2,
          maxRadius: 16 + Math.random() * 16,
          alpha: 0,
          maxAlpha: 0.35 + Math.random() * 0.15,
          age: 0,
          maxAge: 3.2 + Math.random() * 1.6,
          swirlSpeed: 0.8 + Math.random() * 1.2,
          seed: Math.random() * 100,
        });
      }

      // 2. Sinh các hạt tàn nhang lấp lánh (Golden sparks / embers) bay lên
      if (emberParticlesRef.current.length < 12 && Math.random() < 0.3) {
        const tipOffsets = [-5.5, 0, 5.5];
        const offsetChosen = tipOffsets[Math.floor(Math.random() * 3)];
        emberParticlesRef.current.push({
          x: incenseX + offsetChosen + (Math.random() - 0.5) * 2,
          y: incenseY - 1,
          vx: (Math.random() - 0.5) * 3,
          vy: -16 - Math.random() * 14,
          radius: 0.8 + Math.random() * 0.8,
          alpha: 0.9,
          age: 0,
          maxAge: 1.6 + Math.random() * 1.2,
          seed: Math.random() * 50,
        });
      }

      // 3. Cập nhật và vẽ khói nhang
      for (let i = smokeParticlesRef.current.length - 1; i >= 0; i--) {
        const p = smokeParticlesRef.current[i];
        p.age += dt;
        if (p.age >= p.maxAge) {
          smokeParticlesRef.current.splice(i, 1);
          continue;
        }

        const lifeRatio = p.age / p.maxAge;
        if (lifeRatio < 0.2) {
          p.alpha = (lifeRatio / 0.2) * p.maxAlpha;
        } else {
          p.alpha = (1 - (lifeRatio - 0.2) / 0.8) * p.maxAlpha;
        }

        p.radius = 2 + (p.maxRadius - 2) * Math.pow(lifeRatio, 0.7);

        const swirl =
          Math.sin(p.age * p.swirlSpeed + p.seed) * (18 * lifeRatio);
        p.x += (p.vx + swirl * 0.2) * dt;
        p.y += p.vy * dt;

        const grad = ctx.createRadialGradient(
          p.x,
          p.y,
          0,
          p.x,
          p.y,
          p.radius
        );
        grad.addColorStop(0, `rgba(255, 252, 245, ${p.alpha * 0.85})`);
        grad.addColorStop(0.45, `rgba(240, 230, 215, ${p.alpha * 0.5})`);
        grad.addColorStop(0.8, `rgba(225, 210, 190, ${p.alpha * 0.18})`);
        grad.addColorStop(1, "rgba(215, 195, 175, 0)");

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      // 4. Cập nhật và vẽ hạt tàn lửa bay
      for (let i = emberParticlesRef.current.length - 1; i >= 0; i--) {
        const eb = emberParticlesRef.current[i];
        eb.age += dt;
        if (eb.age >= eb.maxAge) {
          emberParticlesRef.current.splice(i, 1);
          continue;
        }
        const life = eb.age / eb.maxAge;
        eb.alpha = Math.max(0, 1 - life);
        eb.x += eb.vx * dt + Math.sin(eb.age * 4 + eb.seed) * 0.6;
        eb.y += eb.vy * dt;

        ctx.save();
        ctx.fillStyle = `rgba(255, 215, 100, ${eb.alpha * 0.9})`;
        ctx.shadowColor = "rgba(255, 160, 40, 0.9)";
        ctx.shadowBlur = 4;
        ctx.beginPath();
        ctx.arc(eb.x, eb.y, eb.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // 5. Ba đốm than hồng nhấp nháy tại 3 đầu que nhang
      const tips = [-5.5, 0, 5.5];
      tips.forEach((offset, idx) => {
        const emberPulse = Math.sin(now * 0.004 + idx * 2.1) * 0.25 + 0.75;
        const flicker = (Math.random() - 0.5) * 0.15;
        const currentAlpha = Math.min(1, Math.max(0.4, emberPulse + flicker));

        ctx.save();
        const emberGrad = ctx.createRadialGradient(
          incenseX + offset,
          incenseY,
          0,
          incenseX + offset,
          incenseY,
          4.5
        );
        emberGrad.addColorStop(
          0,
          `rgba(255, 240, 190, ${currentAlpha * 0.95})`
        );
        emberGrad.addColorStop(
          0.3,
          `rgba(255, 140, 40, ${currentAlpha * 0.85})`
        );
        emberGrad.addColorStop(
          0.7,
          `rgba(215, 45, 20, ${currentAlpha * 0.45})`
        );
        emberGrad.addColorStop(1, "rgba(180, 20, 10, 0)");

        ctx.fillStyle = emberGrad;
        ctx.beginPath();
        ctx.arc(incenseX + offset, incenseY, 4.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      if (!reducedMotion) {
        animId = requestAnimationFrame(render);
      }
    };

    animId = requestAnimationFrame(render);

    return () => {
      disposed = true;
      if (animId !== null) cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, [reducedMotion]);

  return (
    <div
      className="split-login-left"
      onMouseMove={handleMouseMove}
      role="region"
      aria-label="Cột nghệ thuật văn hóa tâm linh"
    >
      {/* Nẹp viền chỉ vàng đồng mảnh ở ranh giới giữa 2 cột */}
      <div className="split-golden-divider" aria-hidden="true" />

      {/* Ảnh nền tiên cảnh nghệ thuật chuẩn 1:1 như Login */}
      <img
        src="/images/login-celestial-left.jpg"
        alt="Tin vào những điều tốt lành - Không gian mây ngàn tiên cảnh thanh tịnh"
        className="split-left-bg"
        fetchPriority="high"
        style={{
          transform: reducedMotion
            ? "none"
            : `scale(1.02) translate3d(${parallax.x * -6}px, ${parallax.y * -4}px, 0)`,
        }}
      />

      {/* Canvas khói nhang động bốc lên từ 3 nén nhang */}
      <canvas ref={canvasRef} className="split-left-canvas" aria-hidden="true" />

      {/* Nút Quay lại góc trên bên trái */}
      {onBack && (
        <div className="split-left-back-wrapper">
          <button
            type="button"
            onClick={onBack}
            className="split-back-btn"
            title="Quay lại"
            aria-label="Quay lại"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* Nội dung trợ năng và SEO */}
      <div className="sr-only">
        <h2>Tin vào những điều tốt lành</h2>
        <p>Một không gian để lắng nghe, chiêm nghiệm và kết nối với văn hóa tâm linh Việt.</p>
      </div>
    </div>
  );
};
