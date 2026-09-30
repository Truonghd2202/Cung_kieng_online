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

/**
 * Lấy danh sách các tài khoản demo đã lưu trên trình duyệt máy này.
 */
export function getLocalDemoAccounts(): UserProfile[] {
  try {
    const raw = localStorage.getItem(LOCAL_ACCOUNTS_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch {}
  return [DEMO_USER];
}

/**
 * Lưu hoặc cập nhật một tài khoản demo cục bộ vào localStorage.
 */
export function saveLocalDemoAccount(user: UserProfile): void {
  try {
    const accounts = getLocalDemoAccounts();
    const index = accounts.findIndex(
      (a) => a.email.toLowerCase() === user.email.toLowerCase()
    );
    if (index >= 0) {
      accounts[index] = user;
    } else {
      accounts.push(user);
    }
    localStorage.setItem(LOCAL_ACCOUNTS_STORAGE_KEY, JSON.stringify(accounts));
  } catch {}
}

/**
 * Tìm tài khoản demo cục bộ theo email.
 */
export function findLocalDemoAccount(email: string): UserProfile | undefined {
  const normEmail = email.trim().toLowerCase();
  if (normEmail === DEMO_USER.email.toLowerCase() || normEmail === "annhien") {
    return DEMO_USER;
  }
  const accounts = getLocalDemoAccounts();
  return accounts.find((a) => a.email.toLowerCase() === normEmail);
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

  if (cleanEmail === DEMO_USER.email.toLowerCase() || cleanEmail === "annhien") {
    return { success: true, user: DEMO_USER };
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
  saveLocalDemoAccount(newUser);

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

  saveLocalDemoAccount(newUser);
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
