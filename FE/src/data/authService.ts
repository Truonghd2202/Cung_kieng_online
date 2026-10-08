import { ApiError, apiRequest, refreshAccessToken, setAccessToken } from "../lib/api";

export interface UserProfile {
  name: string;
  email: string;
}

interface ApiUser {
  id: string;
  fullName: string;
  email: string;
}

interface AuthPayload {
  user: ApiUser;
  accessToken: string;
}

export interface AuthResult {
  success: boolean;
  user: UserProfile;
  error?: string;
}

export const DEMO_USER: UserProfile = {
  name: "An Nhiên",
  email: "annhien@tinlamtamlinh.vn",
};

const CURRENT_USER_STORAGE_KEY = "tltl-current-user";

function toProfile(user: ApiUser): UserProfile {
  return { name: user.fullName, email: user.email.trim().toLowerCase() };
}

export function parseLocalDemoProfile(value: unknown): UserProfile | null {
  if (typeof value !== "object" || value === null || Array.isArray(value)) return null;
  const record = value as Record<string, unknown>;
  if (typeof record.name !== "string" || typeof record.email !== "string") return null;

  const name = record.name.trim();
  const email = record.email.trim().toLowerCase();
  if (!name || !email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return null;
  return { name, email };
}

export function loadCurrentDemoUser(): UserProfile | null {
  try {
    const raw = localStorage.getItem(CURRENT_USER_STORAGE_KEY);
    return raw === null ? null : parseLocalDemoProfile(JSON.parse(raw));
  } catch {
    return null;
  }
}

// Giữ tên export cũ để các màn hình Phase 2 chưa phải đổi đồng thời.
export function saveLocalDemoAccount(user: UserProfile): boolean {
  const profile = parseLocalDemoProfile(user);
  if (!profile || profile.name.length > 120) return false;

  try {
    localStorage.setItem(CURRENT_USER_STORAGE_KEY, JSON.stringify(profile));
    return true;
  } catch {
    return false;
  }
}

export function clearStoredUser() {
  try {
    localStorage.removeItem(CURRENT_USER_STORAGE_KEY);
  } catch {
    // Phiên trên máy chủ vẫn được thu hồi ngay cả khi storage bị chặn.
  }
}

function authError(error: unknown): string {
  if (error instanceof ApiError) return error.errors[0]?.message || error.message;
  return "Không thể kết nối tới máy chủ. Vui lòng thử lại.";
}

export async function loginAccount(email?: string, password?: string): Promise<AuthResult> {
  const fallback = { name: "", email: email?.trim().toLowerCase() || "" };

  try {
    const data = await apiRequest<AuthPayload>("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email: fallback.email, password: password || "" }),
    });
    setAccessToken(data.accessToken);
    const user = toProfile(data.user);
    saveLocalDemoAccount(user);
    return { success: true, user };
  } catch (error) {
    return { success: false, user: fallback, error: authError(error) };
  }
}

export async function registerAccount(
  name?: string,
  email?: string,
  password?: string,
): Promise<AuthResult> {
  const fallback = { name: name?.trim() || "", email: email?.trim().toLowerCase() || "" };

  try {
    const data = await apiRequest<AuthPayload>("/auth/register", {
      method: "POST",
      body: JSON.stringify({ fullName: fallback.name, email: fallback.email, password: password || "" }),
    });
    setAccessToken(data.accessToken);
    const user = toProfile(data.user);
    saveLocalDemoAccount(user);
    return { success: true, user };
  } catch (error) {
    return { success: false, user: fallback, error: authError(error) };
  }
}

export async function restoreSession(): Promise<UserProfile | null> {
  const token = await refreshAccessToken();
  if (!token) {
    clearStoredUser();
    return null;
  }

  try {
    const user = await apiRequest<ApiUser>("/auth/me");
    const profile = toProfile(user);
    saveLocalDemoAccount(profile);
    return profile;
  } catch {
    setAccessToken(null);
    clearStoredUser();
    return null;
  }
}

export async function logoutAccount(): Promise<void> {
  try {
    await apiRequest<never>("/auth/logout", { method: "POST" });
  } catch {
    // Luôn xóa phiên phía client nếu máy chủ tạm thời không phản hồi.
  } finally {
    setAccessToken(null);
    clearStoredUser();
  }
}
