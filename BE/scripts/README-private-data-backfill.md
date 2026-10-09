# Backfill dữ liệu riêng tư

Script mã hóa các giá trị cũ chưa có tiền tố enc:v1: trong mood_checkins.note và wishes.content bằng AES-256-GCM, giữ nguyên dữ liệu đã mã hóa và bỏ qua nội dung rỗng. Script dùng từng lô và có thể chạy lại.

1. Sao lưu database và cấu hình đúng DATABASE_URL trong BE/.env.
2. Đặt PRIVATE_DATA_KEY thành khóa 32 byte (64 ký tự hex) trong secret manager của môi trường đích và trong BE/.env cục bộ khi cần. Có thể tạo khóa bằng lệnh: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))". Không commit khóa. Nếu dữ liệu đã được mã hóa trước đó, phải dùng đúng khóa cũ; script này không xoay khóa.
3. Chạy dry-run để đếm bản ghi plaintext: npm run data:backfill-private.
4. Sau khi xác nhận đúng database và có backup, chạy: npm run data:backfill-private -- --apply.

Bản chạy thường chỉ đọc số lượng. Chỉ cờ --apply mới ghi database. Không chạy ở production cho đến khi đã xác nhận backup, khóa và DATABASE_URL.
