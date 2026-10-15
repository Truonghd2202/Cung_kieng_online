import { useState } from "react";

// ==========================================
// 1. MINI SPARKLINE CHART (Dùng cho Metric Cards)
// ==========================================
export function SparklineChart({
  data = [],
  color = "#c89655",
  height = 36,
  width = 110,
}: {
  data?: number[];
  color?: string;
  height?: number;
  width?: number;
}) {
  if (!data || data.length < 2) return null;
  const min = Math.min(...data);
  const max = Math.max(...data, min + 1);
  const padding = 3;

  const points = data.map((val, idx) => {
    const x = padding + (idx / (data.length - 1)) * (width - padding * 2);
    const y = height - padding - ((val - min) / (max - min)) * (height - padding * 2);
    return `${x},${y}`;
  });

  const pathD = `M ${points.join(" L ")}`;
  const areaD = `M ${points[0]} L ${points.join(" L ")} L ${width - padding},${height} L ${padding},${height} Z`;

  return (
    <svg width={width} height={height} className="admin-sparkline-svg" viewBox={`0 0 ${width} ${height}`}>
      <defs>
        <linearGradient id={`sparkGrad-${color.replace(/[^a-zA-Z0-9]/g, "")}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.35" />
          <stop offset="100%" stopColor={color} stopOpacity="0.0" />
        </linearGradient>
      </defs>
      <path d={areaD} fill={`url(#sparkGrad-${color.replace(/[^a-zA-Z0-9]/g, "")})`} />
      <path d={pathD} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      {/* Điểm nút cuối cùng phát sáng */}
      {points.length > 0 && (
        <circle
          cx={points[points.length - 1].split(",")[0]}
          cy={points[points.length - 1].split(",")[1]}
          r="3"
          fill={color}
        />
      )}
    </svg>
  );
}

// ==========================================
// 2. BIỂU ĐỒ DIỆN TÍCH PHÁT SÁNG (Interactive Area/Line Trend Chart)
// ==========================================
export function InteractiveTrendChart({
  title = "Lưu lượng & Tương tác thực tế",
  subtitle = "Hoạt động theo ngày gần nhất",
  data = [],
}: {
  title?: string;
  subtitle?: string;
  data?: Array<{ label: string; value: number; secondary?: number }>;
}) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const width = 640;
  const height = 220;
  const padLeft = 45;
  const padRight = 20;
  const padTop = 20;
  const padBottom = 35;

  const maxVal = Math.max(
    ...(data.length ? data.map((d) => Math.max(d.value, d.secondary || 0)) : [0]),
    100
  );

  const getX = (index: number) =>
    padLeft + (index / Math.max(1, data.length - 1)) * (width - padLeft - padRight);
  const getY = (val: number) =>
    height - padBottom - (val / maxVal) * (height - padTop - padBottom);

  // Line 1: Main (Vàng kim / Gold)
  const ptsMain = data.map((d, i) => `${getX(i)},${getY(d.value)}`);
  const dMain = ptsMain.length ? `M ${ptsMain.join(" L ")}` : "";
  const areaMain = ptsMain.length
    ? `M ${getX(0)},${getY(0)} L ${ptsMain.join(" L ")} L ${getX(data.length - 1)},${getY(0)} Z`
    : "";

  // Line 2: Secondary (Đỏ chu sa / Crimson)
  const ptsSec = data.map((d, i) => `${getX(i)},${getY(d.secondary || 0)}`);
  const dSec = ptsSec.length ? `M ${ptsSec.join(" L ")}` : "";
  const areaSec = ptsSec.length
    ? `M ${getX(0)},${getY(0)} L ${ptsSec.join(" L ")} L ${getX(data.length - 1)},${getY(0)} Z`
    : "";

  return (
    <div className="admin-chart-card">
      <div className="admin-chart-header">
        <div>
          <h4>{title}</h4>
          <span className="admin-chart-sub">{subtitle}</span>
        </div>
        <div className="admin-chart-legend">
          <span className="admin-legend-item">
            <span className="admin-legend-dot gold" /> Lượt truy cập (Visits)
          </span>
          <span className="admin-legend-item">
            <span className="admin-legend-dot crimson" /> Đọc & Gieo quẻ (Engage)
          </span>
        </div>
      </div>

      <div className="admin-svg-container">
        <svg viewBox={`0 0 ${width} ${height}`} className="admin-trend-svg">
          <defs>
            <linearGradient id="chartGradGold" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#c89655" stopOpacity="0.45" />
              <stop offset="90%" stopColor="#c89655" stopOpacity="0.0" />
            </linearGradient>
            <linearGradient id="chartGradCrimson" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#8b252e" stopOpacity="0.35" />
              <stop offset="90%" stopColor="#8b252e" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Grid lines ngang */}
          {[0, 0.33, 0.66, 1].map((pct, i) => {
            const y = height - padBottom - pct * (height - padTop - padBottom);
            const val = Math.round(pct * maxVal);
            return (
              <g key={i}>
                <line x1={padLeft} y1={y} x2={width - padRight} y2={y} stroke="var(--admin-line, rgba(255,255,255,0.08))" strokeDasharray="3 3" />
                <text x={padLeft - 8} y={y + 4} fill="var(--admin-muted, #88786f)" fontSize="10" textAnchor="end">
                  {val.toLocaleString()}
                </text>
              </g>
            );
          })}

          {/* Vùng diện tích */}
          <path d={areaMain} fill="url(#chartGradGold)" />
          <path d={areaSec} fill="url(#chartGradCrimson)" />

          {/* Đường vẽ */}
          <path d={dSec} fill="none" stroke="#8b252e" strokeWidth="2.2" strokeLinecap="round" />
          <path d={dMain} fill="none" stroke="#c89655" strokeWidth="2.8" strokeLinecap="round" />

          {/* Trục X nhãn ngày */}
          {data.map((d, i) => {
            const x = getX(i);
            const y = height - 12;
            const isHovered = hoveredIndex === i;
            return (
              <g key={i} onMouseEnter={() => setHoveredIndex(i)} onMouseLeave={() => setHoveredIndex(null)} style={{ cursor: "pointer" }}>
                <text x={x} y={y} fill={isHovered ? "var(--admin-ink, #fff)" : "var(--admin-muted, #a8998e)"} fontSize="11" textAnchor="middle" fontWeight={isHovered ? "bold" : "normal"}>
                  {d.label}
                </text>

                {/* Điểm nút */}
                <circle cx={x} cy={getY(d.value)} r={isHovered ? "5" : "3.5"} fill="#ffdfa9" stroke="#c89655" strokeWidth="2" />
                <circle cx={x} cy={getY(d.secondary || 0)} r={isHovered ? "4.5" : "3"} fill="#ff99a2" stroke="#8b252e" strokeWidth="1.8" />

                {/* Vạch gióng khi hover */}
                {isHovered && (
                  <line x1={x} y1={padTop} x2={x} y2={height - padBottom} stroke="rgba(200, 150, 85, 0.4)" strokeDasharray="2 2" />
                )}
              </g>
            );
          })}
        </svg>

        {/* Tooltip khi hover */}
        {hoveredIndex !== null && data[hoveredIndex] && (
          <div
            className="admin-chart-tooltip"
            style={{
              left: `${(getX(hoveredIndex) / width) * 100}%`,
              top: `${(getY(data[hoveredIndex].value) / height) * 100}%`,
            }}
          >
            <strong>{data[hoveredIndex].label}</strong>
            <div className="tooltip-line gold">Lượt xem: {data[hoveredIndex].value.toLocaleString("vi-VN")}</div>
            {data[hoveredIndex].secondary !== undefined && (
              <div className="tooltip-line crimson">Tương tác: {data[hoveredIndex].secondary?.toLocaleString("vi-VN")}</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// ==========================================
// 3. BIỂU ĐỒ TRÒN VÀNH KHUYÊN (Interactive Donut Chart)
// ==========================================
export function DonutChart({
  title = "Phân bổ theo Vùng miền",
  data = [],
  size = 170,
  strokeWidth = 24,
}: {
  title?: string;
  data?: Array<{ label: string; value: number; color: string }>;
  size?: number;
  strokeWidth?: number;
}) {
  const [activeSegment, setActiveSegment] = useState<number | null>(null);

  const realTotal = data.reduce((sum, item) => sum + item.value, 0);
  const total = realTotal || 1;
  const radius = (size - strokeWidth) / 2;
  const center = size / 2;
  const circumference = 2 * Math.PI * radius;

  let accumulated = 0;
  const segments = data.map((item, index) => {
    const percent = realTotal > 0 ? item.value / total : 0;
    const strokeDasharray = `${circumference * percent} ${circumference * (1 - percent)}`;
    const strokeDashoffset = -accumulated * circumference;
    accumulated += percent;

    return {
      ...item,
      percent: Math.round(percent * 100),
      strokeDasharray,
      strokeDashoffset,
      index,
    };
  });

  return (
    <div className="admin-donut-card">
      <div className="admin-donut-header">
        <h4>{title}</h4>
      </div>

      <div className="admin-donut-body">
        <div className="admin-donut-svg-wrap" style={{ width: size, height: size }}>
          <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="admin-donut-svg">
            {realTotal === 0 && (
              <circle
                cx={center}
                cy={center}
                r={radius}
                fill="none"
                stroke="var(--admin-line, rgba(200, 150, 85, 0.2))"
                strokeWidth={strokeWidth}
              />
            )}
            {segments.map((seg) => {
              const isActive = activeSegment === seg.index;
              return (
                <circle
                  key={seg.label}
                  cx={center}
                  cy={center}
                  r={radius}
                  fill="none"
                  stroke={seg.color}
                  strokeWidth={isActive ? strokeWidth + 4 : strokeWidth}
                  strokeDasharray={seg.strokeDasharray}
                  strokeDashoffset={seg.strokeDashoffset}
                  className="admin-donut-segment"
                  onMouseEnter={() => setActiveSegment(seg.index)}
                  onMouseLeave={() => setActiveSegment(null)}
                  transform={`rotate(-90 ${center} ${center})`}
                />
              );
            })}
          </svg>

          {/* Tâm Donut */}
          <div className="admin-donut-center">
            {activeSegment !== null && segments[activeSegment] ? (
              <>
                <strong style={{ color: segments[activeSegment].color }}>{segments[activeSegment].percent}%</strong>
                <small>{segments[activeSegment].label}</small>
              </>
            ) : (
              <>
                <strong>{realTotal}</strong>
                <small>{realTotal === 0 ? "Chưa có mục" : "Tổng mục"}</small>
              </>
            )}
          </div>
        </div>

        {/* Legend */}
        <div className="admin-donut-legend">
          {segments.length > 0 ? (
            segments.map((seg) => (
              <div
                key={seg.label}
                className={`admin-donut-legend-item ${activeSegment === seg.index ? "is-active" : ""}`}
                onMouseEnter={() => setActiveSegment(seg.index)}
                onMouseLeave={() => setActiveSegment(null)}
              >
                <span className="donut-dot" style={{ backgroundColor: seg.color }} />
                <span className="donut-name">{seg.label}</span>
                <span className="donut-val">{seg.value}</span>
                <span className="donut-pct">({seg.percent}%)</span>
              </div>
            ))
          ) : (
            <div className="admin-donut-empty-notice" style={{ padding: "12px 0", color: "var(--admin-muted)" }}>
              <small>Chưa ghi nhận dữ liệu</small>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 4. BIỂU ĐỒ CỘT SO SÁNH NỘI DUNG (Content Bar Comparison Chart)
// ==========================================
export function ContentStatusBarChart({
  title = "Trạng thái thẩm định theo danh mục",
  categories = [],
}: {
  title?: string;
  categories?: Array<{ name: string; verified: number; unverified: number }>;
}) {
  const maxTotal = Math.max(...(categories.length ? categories.map((c) => c.verified + c.unverified) : [0]), 1);

  return (
    <div className="admin-barchart-card">
      <div className="admin-barchart-header">
        <h4>{title}</h4>
        <div className="admin-barchart-legend">
          <span className="barchart-legend-item">
            <span className="barchart-dot verified" /> Đã xác minh
          </span>
          <span className="barchart-legend-item">
            <span className="barchart-dot unverified" /> Cần rà soát
          </span>
        </div>
      </div>

      <div className="admin-barchart-list">
        {categories.map((cat) => {
          const total = cat.verified + cat.unverified;
          const pctVerified = Math.round((cat.verified / total) * 100);
          const pctUnverified = 100 - pctVerified;
          const barWidthPercent = (total / maxTotal) * 100;

          return (
            <div className="admin-bar-row" key={cat.name}>
              <div className="admin-bar-label">
                <span>{cat.name}</span>
                <strong>{total} mục</strong>
              </div>
              <div className="admin-bar-track-wrap" style={{ width: `${Math.max(15, barWidthPercent)}%` }}>
                <div className="admin-bar-track">
                  <div
                    className="admin-bar-segment verified"
                    style={{ width: `${pctVerified}%` }}
                    title={`Đã xác minh: ${cat.verified}`}
                  />
                  <div
                    className="admin-bar-segment unverified"
                    style={{ width: `${pctUnverified}%` }}
                    title={`Chờ duyệt: ${cat.unverified}`}
                  />
                </div>
              </div>
              <div className="admin-bar-stats">
                <span className="v-stat">{cat.verified} đạt</span>
                {cat.unverified > 0 && <span className="u-stat">{cat.unverified} chờ</span>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ==========================================
// 5. MINI ANALYTICS BAR DÀNH CHO TRANG NỘI DUNG (Content Deck)
// ==========================================
export function ContentSectionAnalyticsDeck({
  total = 0,
  verifiedCount = 0,
  hasSourceCount = 0,
  activeCount = 0,
  regionCounts = { north: 0, central: 0, south: 0, nation: 0 },
}: {
  total: number;
  verifiedCount: number;
  hasSourceCount: number;
  activeCount: number;
  regionCounts?: { north: number; central: number; south: number; nation: number };
}) {
  const verifiedRate = total > 0 ? Math.round((verifiedCount / total) * 100) : 0;
  const sourceRate = total > 0 ? Math.round((hasSourceCount / total) * 100) : 0;
  const activeRate = total > 0 ? Math.round((activeCount / total) * 100) : 0;

  return (
    <div className="admin-content-deck">
      <div className="admin-deck-stat-card">
        <span className="deck-eyebrow">TỔNG TƯ LIỆU</span>
        <div className="deck-main-num">
          <strong>{total.toLocaleString("vi-VN")}</strong>
          <small>bản ghi</small>
        </div>
        <div className="deck-progress">
          <div className="deck-progress-bar" style={{ width: "100%", background: "#c89655" }} />
        </div>
        <span className="deck-sub">Toàn bộ kho lưu trữ</span>
      </div>

      <div className="admin-deck-stat-card">
        <span className="deck-eyebrow">XÁC MINH NGUỒN</span>
        <div className="deck-main-num">
          <strong>{verifiedRate}%</strong>
          <small>{verifiedCount}/{total}</small>
        </div>
        <div className="deck-progress">
          <div className="deck-progress-bar" style={{ width: `${verifiedRate}%`, background: "#2d7a52" }} />
        </div>
        <span className="deck-sub">{verifiedCount} mục đã đối chiếu nguồn</span>
      </div>

      <div className="admin-deck-stat-card">
        <span className="deck-eyebrow">LIÊN KẾT HTTPS</span>
        <div className="deck-main-num">
          <strong>{sourceRate}%</strong>
          <small>{hasSourceCount}/{total}</small>
        </div>
        <div className="deck-progress">
          <div className="deck-progress-bar" style={{ width: `${sourceRate}%`, background: "#2c6ca8" }} />
        </div>
        <span className="deck-sub">{total - hasSourceCount} mục cần bổ sung URL</span>
      </div>

      <div className="admin-deck-stat-card">
        <span className="deck-eyebrow">TRẠNG THÁI HIỂN THỊ</span>
        <div className="deck-main-num">
          <strong>{activeRate}%</strong>
          <small>{activeCount}/{total}</small>
        </div>
        <div className="deck-progress">
          <div className="deck-progress-bar" style={{ width: `${activeRate}%`, background: "#8b252e" }} />
        </div>
        <span className="deck-sub">{activeCount} mục đang công khai</span>
      </div>

      {/* Mini Regional Donut */}
      <div className="admin-deck-mini-donut">
        <DonutChart
          title="Phân bổ Vùng miền"
          data={[
            { label: "Bắc", value: regionCounts.north || 0, color: "#8b252e" },
            { label: "Trung", value: regionCounts.central || 0, color: "#c89655" },
            { label: "Nam", value: regionCounts.south || 0, color: "#2d7a52" },
            { label: "Toàn quốc", value: regionCounts.nation || 0, color: "#2c6ca8" },
          ]}
          size={96}
          strokeWidth={14}
        />
      </div>
    </div>
  );
}
