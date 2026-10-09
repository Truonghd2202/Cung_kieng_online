# Tin Lâm Tâm Linh API

Express 5 API sử dụng PostgreSQL, Prisma và JWT.

## Chạy local

1. Sao chép `.env.example` thành `.env` và cập nhật chuỗi kết nối cùng JWT secret.
2. Chạy `npm run prisma:deploy` để áp dụng migration.
3. Chạy `npm run prisma:seed` để kiểm tra kết nối và nạp seed theo từng phase.
4. Chạy `npm run dev`. API mặc định ở `http://localhost:4000/api`.

### Gửi email đặt lại mật khẩu qua Gmail SMTP

Điền `SMTP_USER` bằng địa chỉ Gmail và `SMTP_PASS` bằng Google App Password (không dùng mật khẩu đăng nhập Gmail). Giữ `SMTP_HOST=smtp.gmail.com` và `SMTP_PORT=465`; có thể để trống `SMTP_FROM_EMAIL` để gửi từ chính tài khoản đó. Tạo App Password trong tài khoản Google sau khi bật xác minh 2 bước. Không commit `.env` hoặc chia sẻ App Password.

## Kiểm tra

- `npm run prisma:validate`
- `npm test`

Hợp đồng API được mô tả tại `docs/api.md`.
