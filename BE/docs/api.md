
# API contract

Base URL local: `http://localhost:4000/api`.

## Response

Thành công:

```json
{ "success": true, "message": "Success", "data": {} }
```

Thất bại:

```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [{ "field": "email", "message": "Email is invalid" }]
}
```

## Authentication

- `POST /auth/register`: `{ "fullName", "email", "password" }`
- `POST /auth/login`: `{ "email", "password" }`
- `POST /auth/refresh`: dùng refresh cookie, trả access token mới
- `POST /auth/logout`: thu hồi refresh token hiện tại
- `POST /auth/logout-all`: yêu cầu Bearer access token
- `GET /auth/me`: yêu cầu Bearer access token
- `PATCH /auth/change-password`: `{ "currentPassword", "newPassword" }`

Password tối thiểu 8 ký tự, có chữ hoa, chữ thường và chữ số. Access token được gửi bằng `Authorization: Bearer <token>`; refresh token chỉ tồn tại trong cookie `HttpOnly` tại `/api/auth`.

## Hồ sơ và cài đặt

Tất cả endpoint dưới đây yêu cầu Bearer access token:

- `GET /users/me`: lấy hồ sơ hiện tại
- `PATCH /users/me`: cập nhật `fullName`, `dateOfBirth`, `gender`, `phone`, `bio`
- `GET /users/me/settings`: lấy theme, locale và tùy chọn thông báo
- `PATCH /users/me/settings`: cập nhật một hoặc nhiều trường `theme`, `locale`, `emailNotifications`, `pushNotifications`
- `GET /users/me/topics`: lấy danh sách chủ đề quan tâm
- `PUT /users/me/topics`: thay thế danh sách bằng `{ "topics": ["cadao", "xinxam"] }`

Các chủ đề hợp lệ: `cadao`, `xinxam`, `bamien`, `nghile`, `trian`.
