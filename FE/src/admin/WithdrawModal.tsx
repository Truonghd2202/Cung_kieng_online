import React, { useState, useEffect, useRef } from "react";
import { RotateCcw, X, AlertCircle, CheckCircle2, Sparkles } from "lucide-react";

interface WithdrawModalProps {
  isOpen: boolean;
  itemTitle: string;
  itemTypeLabel?: string;
  onClose: () => void;
  onConfirm: (reason: string) => Promise<void>;
}

const COMMON_REASONS = [
  "Bổ sung nguồn tư liệu HTTPS",
  "Chỉnh sửa câu từ, lỗi chính tả",
  "Cập nhật ảnh minh họa chuẩn",
  "Cập nhật lại các bước nghi thức",
  "Đính chính thông tin ngày lễ",
];

export function WithdrawModal({
  isOpen,
  itemTitle,
  itemTypeLabel = "nội dung",
  onClose,
  onConfirm,
}: WithdrawModalProps) {
  const [reason, setReason] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (isOpen) {
      setReason("");
      setError("");
      setSubmitting(false);
      setTimeout(() => textareaRef.current?.focus(), 80);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !submitting) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, submitting]);

  if (!isOpen) return null;

  const isLengthValid = reason.trim().length >= 8;

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!isLengthValid || submitting) return;
    setSubmitting(true);
    setError("");
    try {
      await onConfirm(reason.trim());
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Không thể rút về bản nháp. Vui lòng thử lại.");
    } finally {
      setSubmitting(false);
    }
  };

  const applyPreset = (preset: string) => {
    setReason((prev) => {
      if (!prev.trim()) return preset;
      if (prev.includes(preset)) return prev;
      return `${prev.trim()}; ${preset}`;
    });
    textareaRef.current?.focus();
  };

  return (
    <div
      className="admin-review-overlay admin-withdraw-overlay"
      style={{ zIndex: 100 }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="withdraw-modal-title"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget && !submitting) onClose();
      }}
    >
      <div
        className="admin-withdraw-modal-card"
        style={{
          width: "min(520px, 94vw)",
          background: "var(--admin-surface)",
          border: "1px solid var(--admin-line-gold)",
          borderRadius: 20,
          padding: "26px 28px",
          boxShadow: "var(--shadow-lg)",
          display: "flex",
          flexDirection: "column",
          animation: "adminModalScale 0.22s ease-out",
          position: "relative",
        }}
      >
        {/* Nút đóng nhanh góc trên */}
        <button
          type="button"
          onClick={onClose}
          disabled={submitting}
          className="admin-icon-button"
          style={{ position: "absolute", top: 16, right: 16 }}
          aria-label="Đóng hộp thoại"
        >
          <X size={18} />
        </button>

        {/* Biểu tượng và tiêu đề */}
        <div style={{ display: "flex", alignItems: "flex-start", gap: 14, marginBottom: 14 }}>
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: 14,
              background: "rgba(245, 158, 11, 0.12)",
              border: "1px solid rgba(245, 158, 11, 0.3)",
              color: "#f59e0b",
              display: "grid",
              placeItems: "center",
              flexShrink: 0,
            }}
          >
            <RotateCcw size={22} />
          </div>
          <div style={{ paddingRight: 24 }}>
            <h3
              id="withdraw-modal-title"
              style={{
                margin: 0,
                fontSize: 18,
                fontWeight: 700,
                color: "var(--admin-heading)",
                lineHeight: 1.35,
              }}
            >
              Rút {itemTypeLabel} về bản nháp
            </h3>
            <p
              style={{
                margin: "4px 0 0",
                fontSize: 13,
                color: "var(--admin-muted)",
                lineHeight: 1.45,
              }}
            >
              Chuyển{" "}
              <strong style={{ color: "var(--admin-heading)" }}>"{itemTitle}"</strong>{" "}
              về trạng thái bản nháp để chỉnh sửa trước khi gửi duyệt lại.
            </p>
          </div>
        </div>

        {/* Gợi ý lý do nhanh */}
        <div style={{ marginBottom: 14 }}>
          <span
            style={{
              display: "flex",
              alignItems: "center",
              gap: 5,
              fontSize: 12,
              fontWeight: 650,
              color: "var(--admin-gold)",
              marginBottom: 8,
            }}
          >
            <Sparkles size={13} />
            <span>Gợi ý lý do thường gặp (Bấm để chọn):</span>
          </span>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {COMMON_REASONS.map((preset) => (
              <button
                key={preset}
                type="button"
                onClick={() => applyPreset(preset)}
                style={{
                  padding: "4px 10px",
                  fontSize: 11.5,
                  borderRadius: 8,
                  border: "1px solid var(--admin-line)",
                  background: "var(--admin-surface-muted)",
                  color: "var(--admin-ink)",
                  cursor: "pointer",
                  transition: "all 0.15s ease",
                  textAlign: "left",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "var(--admin-gold)";
                  e.currentTarget.style.color = "var(--admin-gold)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--admin-line)";
                  e.currentTarget.style.color = "var(--admin-ink)";
                }}
              >
                + {preset}
              </button>
            ))}
          </div>
        </div>

        {/* Khu vực nhập lý do */}
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 14 }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 6,
              }}
            >
              <label
                htmlFor="withdraw-reason-input"
                style={{
                  fontSize: 12.5,
                  fontWeight: 600,
                  color: "var(--admin-heading)",
                }}
              >
                Chi tiết lý do rút bài <span style={{ color: "#ef4444" }}>*</span>
              </label>
              <span
                style={{
                  fontSize: 11.5,
                  fontWeight: 600,
                  color: isLengthValid ? "#10b981" : "var(--admin-muted)",
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                }}
              >
                {isLengthValid && <CheckCircle2 size={12} />}
                {reason.trim().length}/8 ký tự tối thiểu
              </span>
            </div>
            <textarea
              id="withdraw-reason-input"
              ref={textareaRef}
              rows={3}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Nêu rõ lý do cần chỉnh sửa (ví dụ: Cần cập nhật thêm tài liệu nguồn HTTPS và biên tập lại đoạn mở đầu...)"
              style={{
                width: "100%",
                padding: "10px 12px",
                borderRadius: 10,
                border: `1px solid ${isLengthValid ? "var(--admin-line-gold)" : "var(--admin-line)"}`,
                background: "var(--admin-surface-muted)",
                color: "var(--admin-ink)",
                fontSize: 13,
                fontFamily: "inherit",
                resize: "vertical",
                minHeight: 74,
                boxSizing: "border-box",
                outline: "none",
                lineHeight: 1.5,
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
                  e.preventDefault();
                  void handleSubmit();
                }
              }}
            />
          </div>

          {error && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "8px 12px",
                borderRadius: 8,
                background: "rgba(239, 68, 68, 0.1)",
                border: "1px solid rgba(239, 68, 68, 0.3)",
                color: "#ef4444",
                fontSize: 12.5,
                marginBottom: 14,
              }}
            >
              <AlertCircle size={15} style={{ flexShrink: 0 }} />
              <span>{error}</span>
            </div>
          )}

          {/* Nút hành động */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 10 }}>
            <button
              type="button"
              className="admin-secondary-button"
              onClick={onClose}
              disabled={submitting}
            >
              Hủy bỏ
            </button>
            <button
              type="submit"
              className="admin-primary-button"
              disabled={!isLengthValid || submitting}
              style={{
                background: isLengthValid ? "#b45309" : undefined,
                borderColor: isLengthValid ? "rgba(180, 83, 9, 0.6)" : undefined,
                opacity: isLengthValid && !submitting ? 1 : 0.6,
              }}
            >
              <RotateCcw size={14} />
              <span>{submitting ? "Đang rút bài…" : "Xác nhận rút bài"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
