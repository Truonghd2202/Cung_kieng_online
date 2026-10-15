import { ApiError, apiRequest, beginSessionTransition, getSessionGeneration, isSessionCurrent, refreshAccessTokenState, setAccessToken } from "../lib/api";
import { trackProductEvent } from "./productAnalytics";

export interface UserProfile {
  name: string;
  email: string;
  role?: string;
}

interface ApiUser {
  id: string;
  fullName: string;
  email: string;
  role?: string;
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

const CURRENT_USER_STORAGE_KEY = "tltl-current-user";
const REMEMBER_ME_STORAGE_KEY = "tltl-remember-me";
const SESSION_ACTIVE_KEY = "tltl-session-active";

function toProfile(user: ApiUser): UserProfile {
  return {
    name: user.fullName,
    email: user.email.trim().toLowerCase(),
    role: user.role,
  };
}

export function parseStoredProfile(value: unknown): UserProfile | null {
  if (typeof value !== "object" || value === null || Array.isArray(value)) return null;
  const record = value as Record<string, unknown>;
  if (typeof record.name !== "string" || typeof record.email !== "string") return null;

  const name = record.name.trim();
  const email = record.email.trim().toLowerCase();
  const role = typeof record.role === "string" ? record.role : undefined;
  if (!name || !email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return null;
  return { name, email, role };
}

export function isRememberedSession(): boolean {
  try {
    return localStorage.getItem(REMEMBER_ME_STORAGE_KEY) === "true";
  } catch {
    return false;
  }
}

export function loadStoredUser(): UserProfile | null {
  try {
    const isRemembered = isRememberedSession();
    let raw: string | null = null;
    if (isRemembered) {
      raw = localStorage.getItem(CURRENT_USER_STORAGE_KEY);
    } else {
      // Session-only: only valid within active browser session
      raw = sessionStorage.getItem(CURRENT_USER_STORAGE_KEY);
    }
    if (raw === null) return null;
    const profile = parseStoredProfile(JSON.parse(raw));
    if (
      profile?.email === "annhien@tinlamtamlinh.vn" ||
      profile?.email === "annhien@tinlam.vn"
    ) {
      clearStoredUser();
      return null;
    }
    return profile;
  } catch {
    return null;
  }
}

export function saveStoredProfile(user: UserProfile, rememberMe?: boolean): boolean {
  const profile = parseStoredProfile(user);
  if (!profile || profile.name.length > 120) return false;

  const shouldRemember = rememberMe !== undefined ? rememberMe : isRememberedSession();

  try {
    if (shouldRemember) {
      localStorage.setItem(CURRENT_USER_STORAGE_KEY, JSON.stringify(profile));
      localStorage.setItem(REMEMBER_ME_STORAGE_KEY, "true");
    } else {
      sessionStorage.setItem(CURRENT_USER_STORAGE_KEY, JSON.stringify(profile));
      localStorage.removeItem(CURRENT_USER_STORAGE_KEY);
      localStorage.removeItem(REMEMBER_ME_STORAGE_KEY);
    }
    sessionStorage.setItem(SESSION_ACTIVE_KEY, "true");
    return true;
  } catch {
    return false;
  }
}

export function clearStoredUser() {
  try {
    localStorage.removeItem(CURRENT_USER_STORAGE_KEY);
    localStorage.removeItem(REMEMBER_ME_STORAGE_KEY);
    sessionStorage.removeItem(CURRENT_USER_STORAGE_KEY);
    sessionStorage.removeItem(SESSION_ACTIVE_KEY);
  } catch {
    // Phiên trên máy chủ vẫn được thu hồi ngay cả khi storage bị chặn.
  }
}

function authError(error: unknown): string {
  if (error instanceof ApiError) return error.errors[0]?.message || error.message;
  return "Không thể kết nối tới máy chủ. Vui lòng thử lại.";
}

export async function loginAccount(email?: string, password?: string, rememberMe = false): Promise<AuthResult> {
  const fallback = { name: "", email: email?.trim().toLowerCase() || "" };
  const session = beginSessionTransition();

  try {
    const data = await apiRequest<AuthPayload>("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email: fallback.email, password: password || "", rememberMe }),
    });
    if (!isSessionCurrent(session)) return { success: false, user: fallback, error: "Phiên đăng nhập đã thay đổi. Vui lòng thử lại." };
    setAccessToken(data.accessToken);
    const user = toProfile(data.user);
    saveStoredProfile(user, rememberMe);
    return { success: true, user };
  } catch (error) {
    return { success: false, user: fallback, error: authError(error) };
  }
}

export async function loginWithGoogle(credential: string, rememberMe = false): Promise<AuthResult> {
  const fallback = { name: "", email: "" };
  const session = beginSessionTransition();

  try {
    const data = await apiRequest<AuthPayload>("/auth/google", {
      method: "POST",
      body: JSON.stringify({ credential, rememberMe }),
    });
    if (!isSessionCurrent(session)) return { success: false, user: fallback, error: "Phiên đăng nhập đã thay đổi. Vui lòng thử lại." };
    setAccessToken(data.accessToken);
    const user = toProfile(data.user);
    saveStoredProfile(user, rememberMe);
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
  const session = beginSessionTransition();

  try {
    const data = await apiRequest<AuthPayload>("/auth/register", {
      method: "POST",
      body: JSON.stringify({ fullName: fallback.name, email: fallback.email, password: password || "" }),
    });
    if (!isSessionCurrent(session)) return { success: false, user: fallback, error: "Phiên đăng nhập đã thay đổi. Vui lòng thử lại." };
    setAccessToken(data.accessToken);
    const user = toProfile(data.user);
    saveStoredProfile(user, true);
    trackProductEvent("signup_completed");
    return { success: true, user };
  } catch (error) {
    return { success: false, user: fallback, error: authError(error) };
  }
}

export type RestoreSessionResult =
  | { status: "authenticated"; user: UserProfile }
  | { status: "anonymous"; user: null }
  | { status: "unavailable"; user: null; message: string };

let restoreRequest: { session: number; promise: Promise<RestoreSessionResult> } | null = null;

export function restoreSession(): Promise<RestoreSessionResult> {
  // React StrictMode replays mount effects in development. Reuse the same
  // restore operation so a rotating refresh cookie is not consumed twice.
  const session = getSessionGeneration();
  if (restoreRequest?.session === session) return restoreRequest.promise;

  const promise = restoreSessionFor(session);
  restoreRequest = { session, promise };
  void promise.finally(() => {
    if (restoreRequest?.promise === promise) restoreRequest = null;
  });
  return promise;
}

async function restoreSessionFor(session: number): Promise<RestoreSessionResult> {
  const stored = loadStoredUser();
  if (!stored) {
    // Phiên không được ghi nhớ hoặc trình duyệt vừa mở lại: xóa token dở dang
    if (isSessionCurrent(session)) setAccessToken(null);
    return { status: "anonymous", user: null };
  }

  const refreshed = await refreshAccessTokenState();
  if (!isSessionCurrent(session)) return { status: "anonymous", user: null };
  if (refreshed.status === "invalid") {
    clearStoredUser();
    return { status: "anonymous", user: null };
  }
  if (refreshed.status === "unavailable") {
    return { status: "unavailable", user: null, message: refreshed.error.message };
  }

  try {
    const user = await apiRequest<ApiUser>("/auth/me");
    if (!isSessionCurrent(session)) return { status: "anonymous", user: null };
    const profile = toProfile(user);
    saveStoredProfile(profile);
    return { status: "authenticated", user: profile };
  } catch (error) {
    if (!isSessionCurrent(session)) return { status: "anonymous", user: null };
    setAccessToken(null);
    if (!(error instanceof ApiError) || error.status === 0 || error.status >= 500) {
      return { status: "unavailable", user: null, message: authError(error) };
    }
    clearStoredUser();
    return { status: "anonymous", user: null };
  }
}

export async function logoutAccount(): Promise<{ serverRevoked: boolean }> {
  const session = beginSessionTransition(false);
  await import("./pushService").then((service) => service.disableDevicePush()).catch(() => {});
  if (!isSessionCurrent(session)) return { serverRevoked: false };
  let serverRevoked = false;
  try {
    await apiRequest<never>("/auth/logout", { method: "POST" });
    serverRevoked = true;
  } catch {
    // The local session is still cleared in finally; report that server revocation was not confirmed.
  } finally {
    if (isSessionCurrent(session)) {
      beginSessionTransition();
      clearStoredUser();
    }
  }
  return { serverRevoked };
}

export interface PasswordResetRequestResult {
  deliveryConfigured: boolean;
  deliveryStatus?: "request_received";
}

export async function requestPasswordReset(email: string): Promise<PasswordResetRequestResult> {
  const result = await apiRequest<PasswordResetRequestResult>("/auth/forgot-password", {
    method: "POST",
    body: JSON.stringify({ email: email.trim().toLowerCase() }),
  });
  return result;
}

export async function verifyResetCode(email: string, code: string): Promise<boolean> {
  await apiRequest("/auth/verify-reset-code", {
    method: "POST",
    body: JSON.stringify({ email: email.trim().toLowerCase(), code: code.trim() }),
  });
  return true;
}

export async function resetPassword(email: string, code: string, newPassword: string): Promise<void> {
  await apiRequest("/auth/reset-password", {
    method: "POST",
    body: JSON.stringify({ email: email.trim().toLowerCase(), code: code.trim(), newPassword }),
  });
}
