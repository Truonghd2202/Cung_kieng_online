# Tin Lâm Tâm Linh Web

Frontend React 19 + TypeScript + Vite.

## Chạy local

1. Sao chép `.env.example` thành `.env` nếu cần đổi URL backend. Mặc định FE kết nối API tại `http://localhost:4000/api/v1`.
2. Khởi động backend tại cổng `4000`.
3. Chạy `npm run dev`; frontend mặc định ở `http://localhost:3000`.

Môi trường phát hành phải cung cấp `VITE_API_URL` trỏ tới API đã triển khai (ví dụ `https://api.example.com/api/v1`) trước khi build. Bản production không tự gửi request tới `localhost` nếu thiếu cấu hình.

Access token chỉ được giữ trong bộ nhớ. Refresh token do backend cấp bằng cookie `HttpOnly`.
