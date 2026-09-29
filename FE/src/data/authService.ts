export interface UserProfile {
  name: string;
  email: string;
}

export const DEMO_USER: UserProfile = {
  name: "An Nhiên",
  email: "annhien@tinlamtamlinh.vn",
};

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
 * Đăng nhập demo công khai (không lưu mật khẩu dạng plaintext vào localStorage)
 */
export function loginAccount(
  _email?: string,
  _password?: string
): { success: boolean; user: UserProfile } {
  return {
    success: true,
    user: DEMO_USER,
  };
}

/**
 * Đăng ký demo công khai (sẽ triển khai mật khẩu băm & backend ở giai đoạn sau)
 */
export function registerAccount(
  name?: string,
  _email?: string,
  _password?: string
): { success: boolean; user: UserProfile } {
  return {
    success: true,
    user: {
      name: name?.trim() || DEMO_USER.name,
      email: DEMO_USER.email,
    },
  };
}

/**
 * Đăng nhập mạng xã hội (Sắp ra mắt khi kết nối OAuth Backend)
 */
export function loginWithSocial(
  provider: "Google" | "Apple"
): { success: boolean; user: UserProfile } {
  return {
    success: true,
    user: {
      name: `An Nhiên (${provider})`,
      email: DEMO_USER.email,
    },
  };
}
