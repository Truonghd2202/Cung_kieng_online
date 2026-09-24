export type ScreenType =
  | 'guest-landing'
  | 'today'
  | 'family-calendar'
  | 'platform-features'
  | 'privacy-security'
  | 'pricing'
  | 'login'
  | 'register'
  | 'forgot-password'
  | 'reset-password'
  | 'chon-khong-gian'
  | 'khoi-tao-gia-toc'
  | 'thiet-lap-gia-dinh'
  | 'them-su-kien'
  | 'chi-tiet-gio-chap'
  | 'tong-quan-pha-he'
  | 'cay-pha-he-25d'
  | 'ho-so-tien-nhan'
  | 'them-thanh-vien'
  | 'kho-ky-uc'
  | 'phuc-che-ai'
  | 'chi-tiet-di-vat'
  | 'tuyen-tap-album'
  | 'hoan-tat-phuc-che'
  | 'dang-phuc-che'
  | 'lich-su-phuc-che'
  | 'bao-tang-gia-bao'
  | 'hien-tang-gia-bao'
  | 'chi-tiet-gia-bao'
  | 'phan-tich-but-tich'
  | 'cay-ky-niem'
  | 'them-cot-moc'
  | 'tu-sach-gia-phong'
  | 'bien-nien-su'
  | 'cau-chuyen-gia-phong'
  | 'khong-gian-tuong-niem-3d'
  | 'ho-so-huong-linh'
  | 'thap-huong-tri-an'
  | 'cam-nang-nghi-le'
  | 'chi-tiet-nghi-le'
  // === MODULE CÀI ĐẶT & QUẢN TRỊ GIA TỘC & TÀI KHOẢN CÁ NHÂN ===
  | 'ma-tran-phan-quyen'
  | 'quan-ly-thanh-vien'
  | 'moi-thanh-vien'
  | 'thong-bao-gia-toc'
  | 'ho-so-ca-nhan'
  | 'bao-mat-tai-khoan'
  | 'goi-dich-vu-ngan-quy'
  // === MODULE ĐIỀU HÀNH TRUNG ƯƠNG & QUẢN TRỊ VIÊN TỐI CAO (SUPER ADMIN) ===
  | 'admin-dang-nhap'
  | 'admin-tong-quan'
  | 'admin-nguoi-dung'
  | 'admin-chi-tiet-nguoi-dung'
  | 'admin-khong-gian-gia-toc'
  | 'admin-chi-tiet-khong-gian'
  | 'admin-van-hanh-ai'
  | 'admin-tham-dinh-ai'
  | 'admin-kiem-duyet'
  | 'admin-cms-cam-nang'
  | 'admin-nhat-ky-audit'
  | 'admin-cai-dat-he-thong';

export type UserRole = 'guest' | 'user';

export interface ClanData {
  spaceName: string;
  surname: string;
  branch: string;
  provinceOrigin: string;
  villageAncestral: string;
  repName: string;
  repRole: string;
  repPhone: string;
  motto: string;
  privacyLevel: 'closed' | 'branch' | 'elder';
}

