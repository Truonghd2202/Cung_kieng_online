import React, { useState } from "react";
import {
  AlertTriangle,
  BookOpen,
  Check,
  CheckCircle2,
  Clock,
  Code,
  Copy,
  Edit3,
  ExternalLink,
  Eye,
  FileText,
  ImageIcon,
  MapPin,
  RotateCcw,
  Send,
  ShieldCheck,
  Sparkles,
  Tag,
  X,
  Zap,
} from "lucide-react";
import type { AdminRecord } from "../data/adminService";
import type { Kind } from "./ContentEditor";
import { normalizeContentRecord } from "./contentRecordAdapter";
import { toast } from "../components/ui/Toast";

interface ContentDetailModalProps {
  kind: Kind;
  id: string;
  record: AdminRecord;
  onClose: () => void;
  onApprove?: (kind: Kind, record: AdminRecord) => void;
  onRequestChanges?: (note: string) => Promise<void>;
  onEdit?: (kind: Kind, id: string) => void;
  onWithdraw?: (record: AdminRecord) => void | Promise<void>;
}

export function ContentDetailModal({
  kind,
  id,
  record,
  onClose,
  onApprove,
  onRequestChanges,
  onEdit,
  onWithdraw,
}: ContentDetailModalProps) {
  const [activeTab, setActiveTab] = useState<"preview" | "json">("preview");
  const [copiedJson, setCopiedJson] = useState(false);
  const [copiedId, setCopiedId] = useState(false);
  const [showRejectForm, setShowRejectForm] = useState(false);
  const [changeNote, setChangeNote] = useState("");
  const [submittingNote, setSubmittingNote] = useState(false);
  const [noteError, setNoteError] = useState("");
  const [imageError, setImageError] = useState(false);

  // Extract core metadata
  const title =
    (typeof record.title === "string" && record.title.trim()) ||
    (typeof record.name === "string" && record.name.trim()) ||
    `Mục #${String(record.id).slice(0, 8)}`;

  const slug = typeof record.slug === "string" ? record.slug : "";
  const excerpt =
    (typeof record.excerpt === "string" && record.excerpt.trim()) ||
    (typeof record.summary === "string" && record.summary.trim()) ||
    "";

  const category =
    (typeof record.category === "string" && record.category) ||
    (typeof record.occasion === "string" && record.occasion) ||
    (typeof record.target_type === "string" && record.target_type) ||
    (typeof record.ritual_type === "string" && record.ritual_type) ||
    "";

  const normalizedRecord = normalizeContentRecord(record as Record<string, unknown>);
  const region = normalizedRecord.region;
  const regionLabel: Record<string, string> = {
    NORTH: "Miền Bắc",
    CENTRAL: "Miền Trung",
    SOUTH: "Miền Nam",
    NATIONWIDE: "Toàn quốc",
  };

  const status = String(record.editorial_status || (record.verified ? "APPROVED" : "DRAFT"));
  const statusLabels: Record<string, { label: string; className: string }> = {
    DRAFT: { label: "Bản nháp", className: "is-draft" },
    IN_REVIEW: { label: "Chờ duyệt", className: "is-pending" },
    APPROVED: { label: "Đã duyệt · chưa công khai", className: "is-approved" },
    PUBLISHED: { label: "Đang công khai", className: "is-published" },
    HIDDEN: { label: "Đã ẩn", className: "is-hidden" },
    REVOKED: { label: "Đã thu hồi", className: "is-revoked" },
  };
  const statusInfo = statusLabels[status] || { label: status, className: "is-draft" };

  const imageUrl = typeof record.image_url === "string" ? record.image_url : null;
  const ritualImageProvenance = kind === "rituals" && record.content_provenance && typeof record.content_provenance === "object"
    ? record.content_provenance as Record<string, unknown>
    : {};
  const ritualImageCaption = typeof ritualImageProvenance.imageCaption === "string" ? ritualImageProvenance.imageCaption : "";
  const ritualImageCredit = typeof ritualImageProvenance.imageCredit === "string" ? ritualImageProvenance.imageCredit : "";
  const ritualImageSource = typeof ritualImageProvenance.imageSource === "string" ? ritualImageProvenance.imageSource : "";
  const ritualImageRightsBasis = typeof ritualImageProvenance.imageRightsBasis === "string" ? ritualImageProvenance.imageRightsBasis : "";
  const sourceUrl =
    typeof record.source === "string" && record.source.startsWith("https://")
      ? record.source
      : null;

  // Extract content sections / steps / checklists
  const contentObj =
    record.content && typeof record.content === "object"
      ? (record.content as Record<string, unknown>)
      : {};

  const rawSections = Array.isArray(record.sections)
    ? record.sections
    : Array.isArray(contentObj.sections)
    ? contentObj.sections
    : [];

  const sections = (rawSections as Array<{ title?: string; heading?: string; body?: string }>).map((sec, idx) => ({
    title: (typeof sec.heading === "string" && sec.heading.trim()) ||
           (typeof sec.title === "string" && sec.title.trim()) ||
           `Phần ${idx + 1}`,
    body: (typeof sec.body === "string" && sec.body) || "",
  }));

  const rawSteps = Array.isArray(record.ritual_steps)
    ? record.ritual_steps
    : Array.isArray(record.steps)
    ? record.steps
    : Array.isArray(contentObj.steps)
    ? contentObj.steps
    : [];

  const steps = (
    rawSteps as Array<{
      order?: number | string;
      step_number?: number | string;
      stepNumber?: number | string;
      title?: string;
      description?: string;
      desc?: string;
    }>
  )
    .map((step, idx) => {
      const rawOrder = step.step_number ?? step.stepNumber ?? step.order;
      const order = Number(rawOrder);
      return {
        order: Number.isFinite(order) && order > 0 ? order : idx + 1,
        title:
          (typeof step.title === "string" && step.title.trim()) ||
          `Bước ${Number.isFinite(order) && order > 0 ? order : idx + 1}`,
        description:
          (typeof step.description === "string" && step.description) ||
          (typeof step.desc === "string" && step.desc) ||
          "",
      };
    })
    .sort((left, right) => left.order - right.order);

  const rawChecklists = Array.isArray(record.checklists)
    ? record.checklists
    : Array.isArray(contentObj.checklists)
    ? contentObj.checklists
    : [];

  const checklists = (rawChecklists as Array<{ id?: string; label?: string }>).filter(
    (item) => item && typeof item.label === "string" && item.label.trim().length > 0
  );

  const prayerBody =
    typeof record.body === "string"
      ? record.body
      : typeof record.content === "string"
      ? record.content
      : "";

  const poem = typeof record.poem === "string" ? record.poem : "";
  const meaning = typeof record.meaning === "string" ? record.meaning : "";
  const advice = typeof record.advice === "string" ? record.advice : "";
  const xamType =
    typeof record.xam_type === "string"
      ? record.xam_type.replace(/\s*:\s*/g, " · ")
      : "";
  const stickNumber =
    typeof record.stick_number === "number" || typeof record.stick_number === "string"
      ? String(record.stick_number)
      : "";
  const fortuneLevel = typeof record.fortune_level === "string" ? record.fortune_level : "";
  const calendarType =
    record.calendar === "LUNAR"
      ? "Âm lịch"
      : record.calendar === "SOLAR"
      ? "Dương lịch"
      : "Chưa khai báo";
  const calendarDay =
    typeof record.day === "number" || typeof record.day === "string"
      ? String(record.day)
      : "—";
  const calendarMonth =
    typeof record.month === "number" || typeof record.month === "string"
      ? String(record.month)
      : "—";
  const calendarDescription =
    typeof record.description === "string" ? record.description : "";
  const calendarRegion = region ? regionLabel[region] || region : "Chưa khai báo";

  const { sourceTitle: sourceDoc, sourceLocator, sourceAuthor, bibliography, rightsBasis, reviewerName, reviewNote, rightsConfirmed } = normalizedRecord;

  const hasProvenance = Boolean(
    sourceUrl || sourceDoc || sourceLocator || sourceAuthor || bibliography || rightsBasis || reviewerName || reviewNote
      || (kind === "rituals" && (ritualImageCaption || ritualImageCredit || ritualImageSource || ritualImageRightsBasis)),
  );

  const handleCopyJson = () => {
    void navigator.clipboard.writeText(JSON.stringify(record, null, 2));
    setCopiedJson(true);
    toast.success("Đã sao chép toàn bộ dữ liệu JSON vào bộ nhớ đệm.", "Đã sao chép");
    setTimeout(() => setCopiedJson(false), 2000);
  };

  const handleCopyId = () => {
    void navigator.clipboard.writeText(id);
    setCopiedId(true);
    toast.success(`Đã sao chép ID: ${id}`, "Đã sao chép");
    setTimeout(() => setCopiedId(false), 2000);
  };

  const handleSubmitReject = async () => {
    if (!changeNote.trim() || changeNote.trim().length < 8) {
      setNoteError("Vui lòng nhập lý do cụ thể (tối thiểu 8 ký tự).");
      return;
    }
    setNoteError("");
    setSubmittingNote(true);
    try {
      if (onRequestChanges) {
        await onRequestChanges(changeNote.trim());
      }
      onClose();
    } catch (err) {
      setNoteError(err instanceof Error ? err.message : "Không thể gửi phản hồi.");
    } finally {
      setSubmittingNote(false);
    }
  };

  return (
    <div
      className="admin-review-overlay"
      role="presentation"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <section
        className="admin-detail-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="content-detail-title"
      >
        {/* Modal Header */}
        <header className="admin-detail-header">
          <div className="admin-detail-header-left">
            <div className="admin-detail-top-tags">
              <span className="admin-detail-kind-pill">
                <BookOpen size={13} />
                {kind === "culture"
                  ? "Kho văn hóa"
                  : kind === "rituals"
                  ? "Nghi lễ"
                  : kind === "prayers"
                  ? "Văn khấn"
                  : kind === "xam"
                  ? "Xin xăm"
                  : "Lịch sự kiện"}
              </span>
              <span className={`admin-detail-status-pill ${statusInfo.className}`}>
                {statusInfo.label}
              </span>
              {category && <span className="admin-detail-tag">{category}</span>}
              {region && (
                <span className="admin-detail-tag">
                  <MapPin size={11} />
                  <span>{regionLabel[region] || region}</span>
                </span>
              )}
            </div>
            <h2 id="content-detail-title" className="admin-detail-title">
              {title}
            </h2>
            {slug && <small className="admin-detail-slug">/{slug}</small>}
          </div>

          <div className="admin-detail-header-right">
            <div className="admin-detail-tab-group">
              <button
                type="button"
                className={`admin-detail-tab-btn ${activeTab === "preview" ? "is-active" : ""}`}
                onClick={() => setActiveTab("preview")}
              >
                <Eye size={14} /> Xem bài
              </button>
              <button
                type="button"
                className={`admin-detail-tab-btn ${activeTab === "json" ? "is-active" : ""}`}
                onClick={() => setActiveTab("json")}
              >
                <Code size={14} /> JSON
              </button>
            </div>
            <button
              type="button"
              className="admin-icon-button"
              onClick={onClose}
              aria-label="Đóng"
            >
              <X size={18} />
            </button>
          </div>
        </header>

        {/* Modal Body */}
        <div className="admin-detail-body">
          {activeTab === "preview" ? (
            <div className="admin-detail-preview-container">
              {/* 1. Cover Image */}
              {imageUrl && !imageError && (
                <div className="admin-detail-cover">
                  <img
                    src={imageUrl}
                    alt={title}
                    onError={() => setImageError(true)}
                    className="admin-detail-cover-img"
                  />
                  <div className="admin-detail-cover-caption">
                    <ImageIcon size={13} />
                    <span>Ảnh minh họa tư liệu</span>
                  </div>
                </div>
              )}
              {kind === "rituals" && imageUrl && imageError && (
                <p className="admin-detail-prov-warning" role="status">Không tải được ảnh tổng quan từ đường dẫn đã lưu.</p>
              )}

              {/* 2. Excerpt / Summary */}
              {excerpt && (
                <div className="admin-detail-excerpt-card">
                  <p className="admin-detail-excerpt-text">“{excerpt}”</p>
                </div>
              )}

              {kind === "calendar" && (
                <section className="admin-detail-sections-block" aria-label="Thông tin sự kiện lịch">
                  <h4 className="admin-detail-block-title">
                    <Clock size={15} /> Thông tin sự kiện
                  </h4>
                  <dl className="admin-detail-provenance-grid">
                    <div className="admin-detail-prov-row">
                      <dt className="prov-label">Tên sự kiện:</dt>
                      <dd className="prov-value">{title}</dd>
                    </div>
                    <div className="admin-detail-prov-row">
                      <dt className="prov-label">Ngày / tháng:</dt>
                      <dd className="prov-value">Ngày {calendarDay}, tháng {calendarMonth}</dd>
                    </div>
                    <div className="admin-detail-prov-row">
                      <dt className="prov-label">Hệ lịch:</dt>
                      <dd className="prov-value">{calendarType}</dd>
                    </div>
                    <div className="admin-detail-prov-row">
                      <dt className="prov-label">Vùng:</dt>
                      <dd className="prov-value">{calendarRegion}</dd>
                    </div>
                    <div className="admin-detail-prov-row">
                      <dt className="prov-label">Cách lặp:</dt>
                      <dd className="prov-value">Hằng năm theo ngày / tháng cố định</dd>
                    </div>
                    <div className="admin-detail-prov-row" style={{ gridColumn: "1 / -1" }}>
                      <dt className="prov-label">Mô tả:</dt>
                      <dd className="prov-value" style={{ whiteSpace: "pre-line" }}>
                        {calendarDescription || "Chưa có mô tả."}
                      </dd>
                    </div>
                  </dl>
                </section>
              )}

              {/* 3. Main Content: Sections (Culture) */}
              {sections.length > 0 && (
                <div className="admin-detail-sections-block">
                  <h4 className="admin-detail-block-title">
                    <FileText size={15} /> Nội dung chi tiết ({sections.length} phần)
                  </h4>
                  <div className="admin-detail-sections-list">
                    {sections.map((sec, idx) => (
                      <article className="admin-detail-section-card" key={idx}>
                        <h5 className="admin-detail-section-heading">
                          <span className="admin-detail-section-index">{idx + 1}</span>
                          {sec.title || `Phần ${idx + 1}`}
                        </h5>
                        <div className="admin-detail-section-text">
                          {sec.body ? (
                            sec.body
                              .split("\n\n")
                              .map((paragraph, pIdx) => <p key={pIdx}>{paragraph}</p>)
                          ) : (
                            <p className="admin-muted">Chưa có nội dung cho phần này.</p>
                          )}
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              )}

              {/* 4. Ritual Steps */}
              {steps.length > 0 && (
                <div className="admin-detail-sections-block">
                  <h4 className="admin-detail-block-title">
                    <Sparkles size={15} /> Các bước thực hiện nghi lễ ({steps.length} bước)
                  </h4>
                  <div className="admin-detail-sections-list">
                    {steps.map((st, idx) => (
                      <article className="admin-detail-section-card" key={idx}>
                        <h5 className="admin-detail-section-heading">
                          <span className="admin-detail-section-index">{st.order ?? idx + 1}</span>
                          {st.title || `Bước ${st.order ?? idx + 1}`}
                        </h5>
                        <p className="admin-detail-section-text">{st.description}</p>
                      </article>
                    ))}
                  </div>
                </div>
              )}

              {/* 5. Ritual Checklists */}
              {checklists.length > 0 && (
                <div className="admin-detail-sections-block">
                  <h4 className="admin-detail-block-title">
                    <CheckCircle2 size={15} /> Danh mục sắm lễ & Chuẩn bị ({checklists.length} mục)
                  </h4>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
                      gap: "8px 12px",
                      marginTop: 10,
                    }}
                  >
                    {checklists.map((item, idx) => (
                      <div
                        key={item.id || idx}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 8,
                          padding: "8px 12px",
                          borderRadius: 9,
                          background: "var(--admin-surface-muted)",
                          border: "1px solid var(--admin-line)",
                          fontSize: 13,
                        }}
                      >
                        <Check size={14} style={{ color: "#10b981", flexShrink: 0 }} />
                        <span style={{ color: "var(--admin-heading)" }}>{item.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 6. Prayer Text */}
              {prayerBody && sections.length === 0 && steps.length === 0 && (
                <div className="admin-detail-sections-block">
                  <h4 className="admin-detail-block-title">
                    <FileText size={15} /> Văn bản văn khấn / Lời nguyện
                  </h4>
                  <div className="admin-detail-prayer-card">
                    {prayerBody.split("\n").map((line, lIdx) => (
                      <p key={lIdx}>{line || <br />}</p>
                    ))}
                  </div>
                </div>
              )}

              {/* 6. Xin Xam Poem & Meaning */}
              {kind === "xam" && (xamType || stickNumber || fortuneLevel || poem || meaning || advice) && (
                <div className="admin-detail-sections-block">
                  <h4 className="admin-detail-block-title">
                    <Sparkles size={15} /> Nội dung thẻ xăm
                  </h4>
                  <dl className="admin-detail-provenance-grid" style={{ marginBottom: 12 }}>
                    <div className="admin-detail-prov-row">
                      <dt className="prov-label">Bộ xăm:</dt>
                      <dd className="prov-value">{xamType || "Chưa khai báo"}</dd>
                    </div>
                    <div className="admin-detail-prov-row">
                      <dt className="prov-label">Số thẻ:</dt>
                      <dd className="prov-value">{stickNumber || "Chưa khai báo"}</dd>
                    </div>
                    <div className="admin-detail-prov-row">
                      <dt className="prov-label">Phân loại:</dt>
                      <dd className="prov-value">{fortuneLevel || "Chưa phân loại"}</dd>
                    </div>
                  </dl>
                  {poem && (
                    <div className="admin-detail-prayer-card" style={{ marginBottom: 12 }}>
                      <strong style={{ display: "block", marginBottom: 6, color: "var(--admin-gold)" }}>
                        Lời thơ xăm:
                      </strong>
                      <p style={{ whiteSpace: "pre-line", fontStyle: "italic" }}>{poem}</p>
                    </div>
                  )}
                  {meaning && (
                    <div className="admin-detail-section-card">
                      <h5 className="admin-detail-section-heading">Ý nghĩa & Diễn giải</h5>
                      <p className="admin-detail-section-text">{meaning}</p>
                    </div>
                  )}
                  {advice && (
                    <div className="admin-detail-section-card" style={{ marginTop: 12 }}>
                      <h5 className="admin-detail-section-heading">Lời khuyên</h5>
                      <p className="admin-detail-section-text" style={{ whiteSpace: "pre-line" }}>{advice}</p>
                    </div>
                  )}
                </div>
              )}

              {/* 7. Provenance & Copyright Inspection Card */}
              <div className="admin-detail-provenance-card">
                <div className="admin-detail-provenance-header">
                  <ShieldCheck size={16} style={{ color: "var(--admin-gold)" }} />
                  <strong>Hồ sơ nguồn & Căn cứ thẩm định tư liệu</strong>
                </div>

                {hasProvenance ? (
                  <div className="admin-detail-provenance-grid">
                    {sourceUrl && (
                      <div className="admin-detail-prov-row">
                        <span className="prov-label">Liên kết nguồn (HTTPS):</span>
                        <a
                          href={sourceUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="table-source-link prov-value"
                        >
                          <ExternalLink size={12} /> {sourceUrl}
                        </a>
                      </div>
                    )}
                    {sourceDoc && (
                      <div className="admin-detail-prov-row">
                        <span className="prov-label">Tên tài liệu / Cơ quan:</span>
                        <span className="prov-value">{sourceDoc}</span>
                      </div>
                    )}
                    {sourceLocator && (
                      <div className="admin-detail-prov-row">
                        <span className="prov-label">Trang / Mục trích dẫn:</span>
                        <span className="prov-value">{sourceLocator}</span>
                      </div>
                    )}
                    {sourceAuthor && (
                      <div className="admin-detail-prov-row">
                        <span className="prov-label">{kind === "xam" ? "Tác giả nguyên tác:" : "Tác giả / Tổ chức:"}</span>
                        <span className="prov-value">{sourceAuthor}</span>
                      </div>
                    )}
                    {bibliography && (
                      <div className="admin-detail-prov-row">
                        <span className="prov-label">Thông tin xuất bản:</span>
                        <span className="prov-value">{bibliography}</span>
                      </div>
                    )}
                    {rightsBasis && (
                      <div className="admin-detail-prov-row">
                        <span className="prov-label">Căn cứ quyền nội dung:</span>
                        <span className="prov-value">{rightsBasis}</span>
                      </div>
                    )}
                    {kind === "rituals" && imageUrl && (
                      <>
                        {ritualImageCaption && <div className="admin-detail-prov-row"><span className="prov-label">Chú thích ảnh:</span><span className="prov-value">{ritualImageCaption}</span></div>}
                        {ritualImageCredit && <div className="admin-detail-prov-row"><span className="prov-label">Tác giả / ghi công ảnh:</span><span className="prov-value">{ritualImageCredit}</span></div>}
                        {ritualImageSource && <div className="admin-detail-prov-row"><span className="prov-label">Trang nguồn ảnh:</span>{ritualImageSource.startsWith("https://") ? <a href={ritualImageSource} target="_blank" rel="noreferrer" className="table-source-link prov-value"><ExternalLink size={12} /> {ritualImageSource}</a> : <span className="prov-value">{ritualImageSource}</span>}</div>}
                        {ritualImageRightsBasis && <div className="admin-detail-prov-row"><span className="prov-label">Căn cứ quyền ảnh:</span><span className="prov-value">{ritualImageRightsBasis}</span></div>}
                      </>
                    )}

                    {/* Hồ sơ thẩm định của Ban Quản trị */}
                    {(reviewerName || reviewNote || rightsConfirmed) && (
                      <div
                        style={{
                          gridColumn: "1 / -1",
                          marginTop: 12,
                          padding: "12px 16px",
                          borderRadius: 12,
                          background: "rgba(200, 150, 85, 0.08)",
                          border: "1px solid rgba(200, 150, 85, 0.3)",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 8,
                            marginBottom: 8,
                            color: "var(--admin-gold)",
                            fontWeight: 650,
                            fontSize: 13,
                          }}
                        >
                          <ShieldCheck size={15} />
                          <span>Hồ sơ thẩm định & Phê duyệt tư liệu</span>
                        </div>
                        <div
                          style={{
                            display: "grid",
                            gridTemplateColumns: "145px 1fr",
                            gap: "6px 12px",
                            fontSize: 12.5,
                            alignItems: "baseline",
                          }}
                        >
                          {reviewerName && (
                            <>
                              <span style={{ color: "var(--admin-muted)" }}>Người thẩm định:</span>
                              <strong style={{ color: "var(--admin-heading)" }}>{reviewerName}</strong>
                            </>
                          )}
                          <span style={{ color: "var(--admin-muted)" }}>Kiểm tra bản quyền:</span>
                          <span style={{ color: rightsConfirmed ? "#10b981" : "#f59e0b", fontWeight: 600 }}>
                            {rightsConfirmed ? "✓ Đã đối chiếu & xác nhận quyền sử dụng" : "Chưa xác nhận quyền"}
                          </span>
                          {reviewNote && (
                            <>
                              <span style={{ color: "var(--admin-muted)" }}>Ghi chú thẩm định:</span>
                              <span style={{ color: "var(--admin-heading)", fontStyle: "italic" }}>
                                "{reviewNote}"
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="admin-detail-prov-warning">
                    <AlertTriangle size={15} />
                    <span>Mục này chưa đính kèm tư liệu nguồn đối chiếu hoặc căn cứ bản quyền.</span>
                  </div>
                )}
              </div>

              {/* 8. Reject / Request Changes Inline Box */}
              {showRejectForm && (
                <div className="admin-detail-reject-box">
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <label htmlFor="change-request-note" className="admin-editor-label">
                      <span>Lý do yêu cầu biên tập viên chỉnh sửa *</span>
                    </label>
                    <button
                      type="button"
                      className="admin-link-button"
                      onClick={() => setShowRejectForm(false)}
                    >
                      Hủy yêu cầu
                    </button>
                  </div>
                  <textarea
                    id="change-request-note"
                    className="admin-editor-textarea"
                    rows={3}
                    placeholder="Nêu rõ nội dung, câu từ hoặc nguồn cần bổ sung…"
                    value={changeNote}
                    onChange={(e) => setChangeNote(e.target.value)}
                  />
                  {noteError && <p className="admin-field-feedback is-error">{noteError}</p>}
                  <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, marginTop: 8 }}>
                    <button
                      type="button"
                      className="admin-primary-button"
                      style={{ background: "#b91c1c" }}
                      disabled={submittingNote || changeNote.trim().length < 8}
                      onClick={() => void handleSubmitReject()}
                    >
                      <Send size={14} /> Gửi yêu cầu chỉnh sửa
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* Tab 2: Raw JSON Viewer */
            <div className="admin-detail-json-container">
              <div className="admin-detail-json-toolbar">
                <span className="admin-muted" style={{ fontSize: 12 }}>
                  Mã JSON thô (Dành cho việc kiểm tra kỹ thuật & sao chép ID)
                </span>
                <button type="button" className="admin-secondary-button" onClick={handleCopyJson}>
                  {copiedJson ? <Check size={14} /> : <Copy size={14} />}
                  {copiedJson ? "Đã chép JSON" : "Sao chép toàn bộ"}
                </button>
              </div>
              <pre className="admin-detail-json-pre">{JSON.stringify(record, null, 2)}</pre>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <footer className="admin-detail-footer">
          <div className="admin-detail-footer-meta">
            <button
              type="button"
              className="admin-detail-id-chip"
              onClick={handleCopyId}
              title="Bấm để sao chép ID"
            >
              <span>ID: {String(id).slice(0, 8)}…</span>
              {copiedId ? <Check size={12} /> : <Copy size={12} />}
            </button>
            {record.updated_at && (
              <span className="admin-detail-date-pill">
                <Clock size={12} /> Cập nhật: {new Date(record.updated_at as string).toLocaleDateString("vi-VN")}
              </span>
            )}
          </div>

          <div className="admin-detail-footer-actions">
            <button type="button" className="admin-secondary-button" onClick={onClose}>
              Đóng chi tiết
            </button>

            {(status === "IN_REVIEW" || status === "REVOKED") && !showRejectForm && onRequestChanges && (
              <button
                type="button"
                className="admin-secondary-button"
                style={{ borderColor: "rgba(220, 38, 38, 0.4)", color: "#ef4444" }}
                onClick={() => setShowRejectForm(true)}
              >
                {status === "REVOKED" ? "Đưa trạng thái thu hồi cũ về bản nháp" : "Yêu cầu chỉnh sửa"}
              </button>
            )}

            {onWithdraw && status === "IN_REVIEW" && (
              <button
                type="button"
                className="admin-secondary-button"
                onClick={() => {
                  onClose();
                  void onWithdraw(record);
                }}
              >
                <RotateCcw size={14} />
                <span>Rút yêu cầu duyệt</span>
              </button>
            )}

            {onApprove && status === "IN_REVIEW" && (
              <button
                type="button"
                className="admin-primary-button"
                onClick={() => {
                  onClose();
                  onApprove(kind, record);
                }}
              >
                <Zap size={15} />
                <span>Tiếp tục thẩm định & Duyệt</span>
              </button>
            )}

            {onEdit && status === "DRAFT" && (
              <button
                type="button"
                className="admin-primary-button"
                onClick={() => {
                  onClose();
                  onEdit(kind, id);
                }}
              >
                <Edit3 size={15} />
                <span>Chỉnh sửa bản nháp</span>
              </button>
            )}
          </div>
        </footer>
      </section>
    </div>
  );
}
