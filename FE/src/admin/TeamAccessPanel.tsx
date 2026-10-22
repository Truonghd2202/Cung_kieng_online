import { FormEvent, useEffect, useMemo, useState } from "react";
import {
  AlertCircle,
  CheckCircle2,
  Lock,
  Mail,
  Plus,
  RefreshCw,
  Search,
  ShieldAlert,
  ShieldCheck,
  UserCheck,
  UserMinus,
  UserRound,
  UsersRound,
  X,
} from "lucide-react";
import { ApiError, apiRequest } from "../lib/api";

type TeamMember = {
  id: string;
  full_name: string;
  email: string;
  role: "USER" | "EDITOR" | "ADMIN";
  status: string;
};

function getInitials(name: string) {
  if (!name) return "U";
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 1).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function renderStatus(status: string) {
  if (status === "ACTIVE") {
    return (
      <span className="admin-team-status-pill is-active">
        <span className="admin-live-dot" /> Đang hoạt động
      </span>
    );
  }
  if (status === "SUSPENDED" || status === "LOCKED") {
    return (
      <span className="admin-team-status-pill is-locked">
        Tạm khóa
      </span>
    );
  }
  return (
    <span className="admin-team-status-pill is-inactive">
      Chưa kích hoạt
    </span>
  );
}

export function TeamAccessPanel() {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState("");
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [inviteEmail, setInviteEmail] = useState("");
  const [adding, setAdding] = useState(false);
  const [confirmRevokeMember, setConfirmRevokeMember] = useState<TeamMember | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState<"ALL" | "ADMIN" | "EDITOR">("ALL");

  async function loadMembers() {
    setLoading(true);
    setError("");
    try {
      setMembers(await apiRequest<TeamMember[]>("/admin/team-members"));
    } catch (loadError) {
      setError(
        loadError instanceof ApiError
          ? loadError.message
          : "Không thể tải danh sách tài khoản quản trị."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void loadMembers();
  }, []);

  // Tự ẩn thông báo thành công sau 4 giây
  useEffect(() => {
    if (!notice) return;
    const timer = setTimeout(() => setNotice(""), 4000);
    return () => clearTimeout(timer);
  }, [notice]);

  const stats = useMemo(() => {
    const admins = members.filter((m) => m.role === "ADMIN").length;
    const editors = members.filter((m) => m.role === "EDITOR").length;
    return { total: members.length, admins, editors };
  }, [members]);

  const filteredMembers = useMemo(() => {
    return members.filter((m) => {
      if (roleFilter !== "ALL" && m.role !== roleFilter) return false;
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase().trim();
      return (
        m.full_name.toLowerCase().includes(q) ||
        m.email.toLowerCase().includes(q)
      );
    });
  }, [members, roleFilter, searchQuery]);

  async function revokeEditor(member: TeamMember) {
    setSavingId(member.id);
    setError("");
    setNotice("");
    try {
      await apiRequest<TeamMember>(
        `/admin/team-members/${encodeURIComponent(member.id)}`,
        {
          method: "PATCH",
          body: JSON.stringify({ role: "USER" }),
        }
      );
      setMembers((current) => current.filter((item) => item.id !== member.id));
      setNotice(`Đã thu hồi quyền Biên tập viên của ${member.full_name}.`);
      setConfirmRevokeMember(null);
    } catch (saveError) {
      setError(
        saveError instanceof ApiError
          ? saveError.message
          : "Không thể thu hồi quyền tài khoản. Hãy thử lại."
      );
    } finally {
      setSavingId("");
    }
  }

  async function addEditor(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!inviteEmail.trim()) return;
    setAdding(true);
    setError("");
    setNotice("");
    try {
      const member = await apiRequest<TeamMember>("/admin/team-members", {
        method: "POST",
        body: JSON.stringify({ email: inviteEmail.trim() }),
      });
      setMembers((current) => [
        ...current.filter((item) => item.id !== member.id),
        member,
      ]);
      setInviteEmail("");
      setNotice(`Đã cấp quyền Biên tập viên thành công cho ${member.full_name}.`);
    } catch (addError) {
      setError(
        addError instanceof ApiError
          ? addError.message
          : "Không thể cấp quyền Biên tập viên. Vui lòng kiểm tra lại email."
      );
    } finally {
      setAdding(false);
    }
  }

  return (
    <section className="admin-team-panel" aria-label="Quản lý tài khoản nhóm">
      {/* 1. Mini-Deck: Thống kê cơ cấu nhân sự nội bộ */}
      <div className="admin-team-stats-deck">
        <div className="admin-team-stat-card">
          <div className="admin-team-stat-icon is-total">
            <UsersRound size={18} />
          </div>
          <div>
            <span className="admin-team-stat-label">Tổng nhân sự nội bộ</span>
            <strong className="admin-team-stat-val">{stats.total}</strong>
          </div>
        </div>

        <div className="admin-team-stat-card">
          <div className="admin-team-stat-icon is-admin">
            <ShieldCheck size={18} />
          </div>
          <div>
            <span className="admin-team-stat-label">Quản trị viên (Admin)</span>
            <strong className="admin-team-stat-val">{stats.admins}</strong>
          </div>
        </div>

        <div className="admin-team-stat-card">
          <div className="admin-team-stat-icon is-editor">
            <UserCheck size={18} />
          </div>
          <div>
            <span className="admin-team-stat-label">Biên tập viên (Editor)</span>
            <strong className="admin-team-stat-val">{stats.editors}</strong>
          </div>
        </div>
      </div>

      {/* 2. Khối Cấp quyền Biên tập viên */}
      <div className="admin-team-invite-card">
        <div className="admin-team-invite-header">
          <div className="admin-team-invite-icon">
            <UserRound size={20} />
          </div>
          <div className="admin-team-invite-info">
            <h3>Cấp quyền Biên tập viên cho thành viên</h3>
            <p>
              Thành viên cần đăng ký tài khoản trước trên ứng dụng. Biên tập viên có quyền tạo, biên soạn và gửi duyệt 6 kho nội dung văn hóa. Vai trò Quản trị viên (Admin) được cấu hình bảo mật trực tiếp từ hệ thống.
            </p>
          </div>
        </div>

        <form className="admin-team-invite-form" onSubmit={(event) => void addEditor(event)}>
          <div className="admin-team-input-wrapper">
            <Mail size={16} className="admin-team-input-icon" aria-hidden="true" />
            <input
              id="team-editor-email"
              type="email"
              required
              maxLength={255}
              value={inviteEmail}
              onChange={(event) => setInviteEmail(event.target.value)}
              placeholder="nhap-email-thanh-vien@gmail.com"
              aria-label="Email thành viên cần cấp quyền biên tập"
            />
          </div>
          <button
            className="admin-primary-button admin-team-submit-btn"
            type="submit"
            disabled={adding || !inviteEmail.trim()}
          >
            {adding ? (
              <>
                <RefreshCw size={15} className="admin-spin-icon" /> Đang kiểm tra…
              </>
            ) : (
              <>
                <Plus size={16} /> Thêm biên tập viên
              </>
            )}
          </button>
        </form>
      </div>

      {/* 3. Băng thông báo trang nhã (Dismissable) */}
      {error && (
        <div className="admin-alert admin-team-banner is-error" role="alert">
          <div className="admin-team-banner-left">
            <AlertCircle size={16} />
            <span>{error}</span>
          </div>
          <button
            type="button"
            className="admin-team-banner-close"
            onClick={() => setError("")}
            aria-label="Đóng thông báo lỗi"
          >
            <X size={14} />
          </button>
        </div>
      )}

      {notice && (
        <div className="admin-team-banner is-success" role="status">
          <div className="admin-team-banner-left">
            <CheckCircle2 size={16} />
            <span>{notice}</span>
          </div>
          <button
            type="button"
            className="admin-team-banner-close"
            onClick={() => setNotice("")}
            aria-label="Đóng thông báo thành công"
          >
            <X size={14} />
          </button>
        </div>
      )}

      {/* 4. Bộ điều khiển Bảng: Tìm kiếm & Lọc vai trò */}
      <div className="admin-team-table-card">
        <div className="admin-team-table-controls">
          <div className="admin-team-search-bar">
            <Search size={15} className="admin-team-search-icon" aria-hidden="true" />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm theo tên hoặc email…"
              aria-label="Tìm thành viên"
            />
            {searchQuery && (
              <button
                type="button"
                className="admin-search-clear"
                onClick={() => setSearchQuery("")}
                aria-label="Xóa từ khóa tìm kiếm"
              >
                <X size={13} />
              </button>
            )}
          </div>

          <div className="admin-team-filter-tabs">
            <button
              type="button"
              className={`admin-team-filter-tab ${roleFilter === "ALL" ? "is-active" : ""}`}
              onClick={() => setRoleFilter("ALL")}
            >
              Tất cả ({stats.total})
            </button>
            <button
              type="button"
              className={`admin-team-filter-tab ${roleFilter === "ADMIN" ? "is-active" : ""}`}
              onClick={() => setRoleFilter("ADMIN")}
            >
              Quản trị viên ({stats.admins})
            </button>
            <button
              type="button"
              className={`admin-team-filter-tab ${roleFilter === "EDITOR" ? "is-active" : ""}`}
              onClick={() => setRoleFilter("EDITOR")}
            >
              Biên tập viên ({stats.editors})
            </button>
          </div>
        </div>

        {/* 5. Bảng dữ liệu thành viên */}
        {loading ? (
          <div className="admin-loading-card" role="status">
            <RefreshCw size={20} className="admin-spin-icon" /> Đang tải danh sách tài khoản…
          </div>
        ) : (
          <div className="admin-table-wrapper">
            <table className="admin-data-table admin-team-table">
              <thead>
                <tr>
                  <th>Thành viên</th>
                  <th>Email</th>
                  <th>Trạng thái</th>
                  <th>Vai trò phân quyền</th>
                  <th>Hành động</th>
                </tr>
              </thead>
              <tbody>
                {filteredMembers.map((member) => (
                  <tr key={member.id}>
                    <td>
                      <div className="admin-team-member-cell">
                        <span className={`admin-team-avatar ${member.role === "ADMIN" ? "is-admin" : "is-editor"}`}>
                          {getInitials(member.full_name)}
                        </span>
                        <div className="admin-team-member-meta">
                          <strong>{member.full_name}</strong>
                          <small className="admin-team-member-id">{member.id.slice(0, 8)}…</small>
                        </div>
                      </div>
                    </td>
                    <td className="admin-team-email-cell">{member.email}</td>
                    <td>{renderStatus(member.status)}</td>
                    <td>
                      <span className={`admin-role-badge is-${member.role.toLowerCase()}`}>
                        {member.role === "ADMIN" ? <ShieldCheck size={14} /> : <UserRound size={14} />}
                        {member.role === "ADMIN" ? "Quản trị viên" : "Biên tập viên"}
                      </span>
                    </td>
                    <td>
                      {member.role === "ADMIN" ? (
                        <span className="admin-team-locked-note">
                          <Lock size={13} /> Quản trị tối cao (Bảo mật)
                        </span>
                      ) : (
                        <button
                          type="button"
                          className="admin-team-revoke-btn"
                          onClick={() => setConfirmRevokeMember(member)}
                          disabled={savingId === member.id}
                          title={`Thu hồi quyền biên tập của ${member.full_name}`}
                        >
                          <UserMinus size={14} /> Thu hồi quyền
                        </button>
                      )}
                    </td>
                  </tr>
                ))}

                {filteredMembers.length === 0 && (
                  <tr>
                    <td colSpan={5} className="admin-team-empty-cell">
                      {searchQuery || roleFilter !== "ALL"
                        ? "Không tìm thấy tài khoản nào khớp với bộ lọc."
                        : "Chưa có tài khoản nào được phân quyền."}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* 6. Modal xác nhận Thu hồi quyền an toàn (Safety Confirmation Dialog) */}
      {confirmRevokeMember && (
        <div className="admin-review-overlay" role="dialog" aria-modal="true" aria-labelledby="modal-revoke-title">
          <div className="admin-team-modal-card">
            <div className="admin-team-modal-icon">
              <ShieldAlert size={28} />
            </div>
            <h3 id="modal-revoke-title">Xác nhận thu hồi quyền</h3>
            <p>
              Bạn có chắc chắn muốn thu hồi quyền Biên tập viên của{" "}
              <strong>{confirmRevokeMember.full_name}</strong> (
              <em>{confirmRevokeMember.email}</em>)?
            </p>
            <p className="admin-team-modal-sub">
              Sau khi thu hồi, tài khoản này sẽ trở về quyền người dùng tiêu chuẩn và không còn quyền tạo, chỉnh sửa hoặc gửi duyệt nội dung văn hóa nữa.
            </p>
            <div className="admin-team-modal-actions">
              <button
                type="button"
                className="admin-secondary-button"
                onClick={() => setConfirmRevokeMember(null)}
                disabled={savingId === confirmRevokeMember.id}
              >
                Hủy bỏ
              </button>
              <button
                type="button"
                className="admin-team-modal-confirm-btn"
                onClick={() => void revokeEditor(confirmRevokeMember)}
                disabled={savingId === confirmRevokeMember.id}
              >
                {savingId === confirmRevokeMember.id ? (
                  <>
                    <RefreshCw size={14} className="admin-spin-icon" /> Đang thu hồi…
                  </>
                ) : (
                  <>
                    <UserMinus size={15} /> Xác nhận thu hồi
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
