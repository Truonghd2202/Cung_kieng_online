const safeServerError = "Máy chủ đang gặp sự cố. Vui lòng thử lại sau.";

export function safeAuthErrorMessage(status: number, message?: string): string {
  const candidate = message?.trim() || "";
  const containsServerDetail = /Prisma|PrismaClient|invocation|node_modules|stack trace|\\.js:\d+:\d+/i.test(candidate);
  if (status >= 500 || containsServerDetail) return safeServerError;
  return candidate || "Không thể hoàn tất yêu cầu. Vui lòng thử lại.";
}
