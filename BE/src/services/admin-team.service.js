const prisma = require("../config/prisma");
const ApiError = require("../utils/api-error");
const { ROLE } = require("../constants/role.constant");

async function listMembers() {
  return prisma.users.findMany({
    where: { role: { in: [ROLE.EDITOR, ROLE.ADMIN] } },
    orderBy: [{ role: "asc" }, { full_name: "asc" }],
    select: { id: true, full_name: true, email: true, role: true, status: true },
  });
}

async function addEditorByEmail(email, actorId) {
  return prisma.$transaction(async (tx) => {
    const before = await tx.users.findUnique({ where: { email: email.trim().toLowerCase() }, select: { id: true, full_name: true, email: true, role: true, status: true } });
    if (!before) throw new ApiError(404, "Không tìm thấy tài khoản bằng email này. Thành viên cần đăng ký tài khoản trước.");
    if (before.role === ROLE.ADMIN) throw new ApiError(422, "Tài khoản này đã là Admin.");
    if (before.role === ROLE.EDITOR) throw new ApiError(409, "Tài khoản này đã có quyền Biên tập viên.");
    if (before.status !== "ACTIVE") throw new ApiError(422, "Chỉ có thể cấp quyền cho tài khoản đang hoạt động.");
    const result = await tx.users.updateMany({ where: { id: before.id, role: ROLE.USER, status: "ACTIVE" }, data: { role: ROLE.EDITOR, updated_at: new Date() } });
    if (!result.count) throw new ApiError(409, "Tài khoản vừa được cập nhật. Tải lại danh sách rồi thử lại.");
    await tx.admin_audit_logs.create({ data: {
      actor_id: actorId,
      action: "TEAM_ROLE_CHANGED",
      target_type: "users",
      target_id: before.id,
      details: { before: { role: ROLE.USER }, after: { role: ROLE.EDITOR } },
    } });
    return { ...before, role: ROLE.EDITOR };
  });
}

async function setEditorialAccess(id, role, actorId) {
  return prisma.$transaction(async (tx) => {
    const before = await tx.users.findUnique({ where: { id }, select: { id: true, full_name: true, email: true, role: true, status: true } });
    if (!before) throw new ApiError(404, "Không tìm thấy tài khoản.");
    if (![ROLE.USER, ROLE.EDITOR].includes(before.role)) {
      throw new ApiError(422, "Không thể thay đổi quyền của tài khoản Admin tại đây.");
    }
    if (before.role === role) return before;
    const result = await tx.users.updateMany({
      where: { id, role: before.role },
      data: { role, updated_at: new Date() },
    });
    if (!result.count) throw new ApiError(409, "Quyền tài khoản vừa được cập nhật. Tải lại danh sách rồi thử lại.");
    await tx.admin_audit_logs.create({ data: {
      actor_id: actorId,
      action: "TEAM_ROLE_CHANGED",
      target_type: "users",
      target_id: id,
      details: { before: { role: before.role }, after: { role } },
    } });
    return tx.users.findUnique({
      where: { id },
      select: { id: true, full_name: true, email: true, role: true, status: true },
    });
  });
}

module.exports = { listMembers, addEditorByEmail, setEditorialAccess };
