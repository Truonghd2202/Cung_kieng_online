export interface UserProfile {
  name: string;
  email: string;
}

/**
 * TÀI KHOẢN MẪU DEMO CÔNG KHAI:
 * Dùng để tham quan nhanh giao diện với dữ liệu có sẵn (quẻ xăm, điều ước, góc bình an).
 */
export const DEMO_USER: UserProfile = {
  name: "An Nhiên",
  email: "annhien@tinlamtamlinh.vn",
};

export const LOCAL_ACCOUNTS_STORAGE_KEY = "tltl_local_demo_accounts";

export function parseLocalDemoProfile(
  value: unknown
): UserProfile | null {
  if (
    typeof value !== "object" ||
    value === null ||
    Array.isArray(value)
  ) {
    return null;
  }

  const record = value as Record<string, unknown>;

  if (
    typeof record.name !== "string" ||
    typeof record.email !== "string"
  ) {
    return null;
  }

  const name = record.name.trim();
  const email = record.email.trim().toLowerCase();

  if (
    !name ||
    !email ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  ) {
    return null;
  }

  return { name, email };
}

export function loadCurrentDemoUser(): UserProfile | null {
  try {
    const raw = localStorage.getItem("tltl-current-user");

    if (raw === null) return null;

    const parsed: unknown = JSON.parse(raw);

    return parseLocalDemoProfile(parsed);
  } catch {
    return null;
  }
}

function parseLocalDemoAccounts(
  value: unknown
): UserProfile[] {
  if (!Array.isArray(value)) return [];

  const accounts: UserProfile[] = [];

  for (const item of value) {
    const profile = parseLocalDemoProfile(item);

    if (!profile) continue;

    const alreadyExists = accounts.some(
      (account) => account.email === profile.email
    );

    if (!alreadyExists) {
      accounts.push(profile);
    }
  }

  return accounts;
}

function isCompleteLocalDemoAccounts(
  value: unknown
): boolean {
  return (
    Array.isArray(value) &&
    value.every(
      (item) => parseLocalDemoProfile(item) !== null
    )
  );
}

export function getLocalDemoAccounts(): UserProfile[] {
  try {
    const raw = localStorage.getItem(
      LOCAL_ACCOUNTS_STORAGE_KEY
    );

    if (raw === null) {
      return [{ ...DEMO_USER }];
    }

    const parsed: unknown = JSON.parse(raw);

    return parseLocalDemoAccounts(parsed);
  } catch {
    return [];
  }
}

export function saveLocalDemoAccount(
  user: UserProfile
): boolean {
  const profile = parseLocalDemoProfile(user);

  if (!profile || profile.name.length > 80) {
    return false;
  }

  try {
    const previousRaw = localStorage.getItem(
      LOCAL_ACCOUNTS_STORAGE_KEY
    );

    let accounts: UserProfile[];

    if (previousRaw === null) {
      accounts = [{ ...DEMO_USER }];
    } else {
      let parsed: unknown;

      try {
        parsed = JSON.parse(previousRaw);
      } catch {
        parsed = undefined;
      }

      if (!isCompleteLocalDemoAccounts(parsed)) {
        const backupKey =
          `${LOCAL_ACCOUNTS_STORAGE_KEY}-recovery-${crypto.randomUUID()}`;

        // Sao lưu nguyên văn trước khi ghi đè.
        // Nếu sao lưu lỗi, hàm dừng và trả false.
        localStorage.setItem(backupKey, previousRaw);
      }

      accounts = parseLocalDemoAccounts(parsed);
    }

    const index = accounts.findIndex(
      (account) => account.email === profile.email
    );

    const updatedAccounts = [...accounts];

    if (index >= 0) {
      updatedAccounts[index] = profile;
    } else {
      updatedAccounts.push(profile);
    }

    localStorage.setItem(
      LOCAL_ACCOUNTS_STORAGE_KEY,
      JSON.stringify(updatedAccounts)
    );

    return true;
  } catch {
    return false;
  }
}

/**
 * Tìm tài khoản demo cục bộ theo email.
 */
export function findLocalDemoAccount(
  email: string
): UserProfile | undefined {
  const normalizedEmail = email.trim().toLowerCase();

  const targetEmail =
    normalizedEmail === "annhien"
      ? DEMO_USER.email
      : normalizedEmail;

  const storedAccount = getLocalDemoAccounts().find(
    (account) => account.email === targetEmail
  );

  if (storedAccount) return storedAccount;

  return targetEmail === DEMO_USER.email
    ? { ...DEMO_USER }
    : undefined;
}

/**
 * Trả về thông tin tài khoản demo công khai dùng cho bản thử nghiệm UI
 */
export function getDemoUser(customName?: string): UserProfile {
  return {
    name: customName?.trim() || DEMO_USER.name,
    email: DEMO_USER.email,
  };
}

/**
 * Đăng nhập hồ sơ demo cục bộ độc lập theo email:
 * - Nếu nhập email của An Nhiên: vào tài khoản mẫu có sẵn dữ liệu.
 * - Nếu nhập email khác: đăng nhập vào không gian độc lập của email đó (lấy tên đã đăng ký hoặc tạo mới từ email).
 * - Lưu ý: Chưa có xác thực mật khẩu qua Backend/Máy chủ tập trung.
 */
export function loginAccount(
  email?: string,
  _password?: string
): { success: boolean; user: UserProfile; error?: string } {
  const cleanEmail = email?.trim().toLowerCase() || "";
  if (!cleanEmail) {
    return {
      success: false,
      user: DEMO_USER,
      error: "Vui lòng nhập địa chỉ email để đăng nhập.",
    };
  }

  // Kiểm tra định dạng email cơ bản
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(cleanEmail) && cleanEmail !== "annhien") {
    return {
      success: false,
      user: DEMO_USER,
      error: "Định dạng email chưa hợp lệ (ví dụ: tenban@domain.com).",
    };
  }


  // Tìm trong danh sách tài khoản demo đã lưu
  const existing = findLocalDemoAccount(cleanEmail);
  if (existing) {
    return { success: true, user: existing };
  }

  // Nếu người dùng nhập email mới chưa từng đăng ký ở máy này, khởi tạo hồ sơ demo cục bộ mới
  const rawPrefix = cleanEmail.split("@")[0] || "Bạn Mới";
  const formattedName = rawPrefix.charAt(0).toUpperCase() + rawPrefix.slice(1);
  const newUser: UserProfile = {
    name: formattedName,
    email: cleanEmail,
  };
  const saved = saveLocalDemoAccount(newUser);

  if (!saved) {
    return {
      success: false,
      user: DEMO_USER,
      error:
        "Chưa lưu được hồ sơ trên trình duyệt này. Bạn hãy thử lại.",
    };
  }

  return {
    success: true,
    user: newUser,
  };
}

/**
 * Khởi tạo hồ sơ demo cục bộ độc lập theo email:
 * - Lưu trữ riêng biệt theo email của người dùng.
 * - Không bị gán cứng vào An Nhiên.
 */
export function registerAccount(
  name?: string,
  email?: string,
  _password?: string
): { success: boolean; user: UserProfile; error?: string } {
  const cleanEmail = email?.trim().toLowerCase() || "";
  if (!cleanEmail) {
    return {
      success: false,
      user: DEMO_USER,
      error: "Vui lòng nhập địa chỉ email để tạo hồ sơ.",
    };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(cleanEmail)) {
    return {
      success: false,
      user: DEMO_USER,
      error: "Định dạng email chưa hợp lệ (ví dụ: tenban@domain.com).",
    };
  }

  const cleanName = name?.trim() || cleanEmail.split("@")[0] || "Người Bạn Mới";
  const newUser: UserProfile = {
    name: cleanName,
    email: cleanEmail,
  };

  const saved = saveLocalDemoAccount(newUser);

  if (!saved) {
    return {
      success: false,
      user: DEMO_USER,
      error:
        "Chưa lưu được hồ sơ trên trình duyệt này. Bạn hãy thử lại.",
    };
  }

  return {
    success: true,
    user: newUser,
  };
}

/**
 * Đăng nhập mạng xã hội (Sắp có khi kết nối Backend OAuth)
 */
export function loginWithSocial(
  provider: "Google" | "Apple"
): { success: boolean; user: UserProfile } {
  return {
    success: true,
    user: {
      name: `Khách (${provider})`,
      email: `guest-${provider.toLowerCase()}@tinlamtamlinh.vn`,
    },
  };
}
