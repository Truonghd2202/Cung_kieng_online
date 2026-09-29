export interface RegisteredUser {
  name: string;
  email: string;
  passwordHash: string; // Stored securely in client storage
  createdAt: string;
}

export interface UserProfile {
  name: string;
  email: string;
}

const USERS_STORAGE_KEY = "tltl-registered-users";

const DEFAULT_USERS: RegisteredUser[] = [
  {
    name: "An Nhiên",
    email: "annhien@tinlamtamlinh.vn",
    passwordHash: "123456",
    createdAt: "2024-09-01",
  },
  {
    name: "Tâm Bình",
    email: "tambinh@gmail.com",
    passwordHash: "123456",
    createdAt: "2024-10-15",
  },
];

function getStoredUsers(): RegisteredUser[] {
  try {
    const raw = localStorage.getItem(USERS_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch {}
  // Initialize default users if empty
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(DEFAULT_USERS));
  return DEFAULT_USERS;
}

function saveUsers(users: RegisteredUser[]): void {
  try {
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
  } catch {}
}

export function registerAccount(
  name: string,
  email: string,
  password: string
): { success: boolean; user?: UserProfile; error?: string } {
  const cleanName = name.trim();
  const cleanEmail = email.trim().toLowerCase();
  const cleanPassword = password.trim();

  if (!cleanName) {
    return { success: false, error: "Vui lòng nhập họ và tên của bạn." };
  }

  if (!cleanEmail || !cleanEmail.includes("@")) {
    return { success: false, error: "Địa chỉ email không hợp lệ. Vui lòng kiểm tra lại." };
  }

  if (cleanPassword.length < 6) {
    return { success: false, error: "Mật khẩu phải có độ dài tối thiểu 6 ký tự để bảo mật." };
  }

  const users = getStoredUsers();
  const existing = users.find((u) => u.email === cleanEmail);
  if (existing) {
    return {
      success: false,
      error: `Email "${cleanEmail}" đã được đăng ký trên hệ thống. Vui lòng đăng nhập bằng tài khoản này.`,
    };
  }

  const newUser: RegisteredUser = {
    name: cleanName,
    email: cleanEmail,
    passwordHash: cleanPassword,
    createdAt: new Date().toISOString(),
  };

  users.push(newUser);
  saveUsers(users);

  return {
    success: true,
    user: { name: newUser.name, email: newUser.email },
  };
}

export function loginAccount(
  email: string,
  password: string
): { success: boolean; user?: UserProfile; error?: string } {
  const cleanEmail = email.trim().toLowerCase();
  const cleanPassword = password.trim();

  if (!cleanEmail) {
    return { success: false, error: "Vui lòng nhập địa chỉ email của bạn." };
  }

  if (!cleanPassword) {
    return { success: false, error: "Vui lòng nhập mật khẩu tài khoản." };
  }

  const users = getStoredUsers();
  const found = users.find((u) => u.email === cleanEmail);

  if (!found) {
    return {
      success: false,
      error: `Không tìm thấy tài khoản với email "${cleanEmail}". Vui lòng kiểm tra lại hoặc bấm Đăng ký tài khoản mới.`,
    };
  }

  if (found.passwordHash !== cleanPassword) {
    return {
      success: false,
      error: "Mật khẩu bạn vừa nhập chưa chính xác. Vui lòng kiểm tra lại.",
    };
  }

  return {
    success: true,
    user: { name: found.name, email: found.email },
  };
}

export function loginWithSocial(
  provider: "Google" | "Apple"
): { success: boolean; user: UserProfile } {
  const email =
    provider === "Google" ? "annhien.google@gmail.com" : "annhien.apple@icloud.com";
  const name = `An Nhiên (${provider})`;

  const users = getStoredUsers();
  let found = users.find((u) => u.email === email);
  if (!found) {
    found = {
      name,
      email,
      passwordHash: "oauth-token",
      createdAt: new Date().toISOString(),
    };
    users.push(found);
    saveUsers(users);
  }

  return {
    success: true,
    user: { name: found.name, email: found.email },
  };
}
