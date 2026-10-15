export function getMoodContentUnavailableMessage(error: unknown): string | null {
  if (!error || typeof error !== "object" || !("status" in error)
    || typeof error.status !== "number" || ![404, 503].includes(error.status)) return null;
  return "Hiện chưa có lời chiêm nghiệm được duyệt cho cảm xúc và ngữ cảnh này. Lượt check-in chưa được lưu; nội dung đang chờ nhóm rà soát.";
}
