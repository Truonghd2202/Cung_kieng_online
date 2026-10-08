# Tin Lâm Tâm Linh API

Express 5 API sử dụng PostgreSQL, Prisma và JWT.

## Chạy local

1. Sao chép `.env.example` thành `.env` và cập nhật chuỗi kết nối cùng JWT secret.
2. Chạy `npm run prisma:deploy` để áp dụng migration.
3. Chạy `npm run prisma:seed` để kiểm tra kết nối và nạp seed theo từng phase.
4. Chạy `npm run dev`. API mặc định ở `http://localhost:4000/api`.

## Kiểm tra

- `npm run prisma:validate`
- `npm test`

Hợp đồng API được mô tả tại `docs/api.md`.
