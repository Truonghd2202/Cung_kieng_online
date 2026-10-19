# Bổ sung sản phẩm

Ngày thực hiện: 2026-10-19  
Nhánh: `feature/ai-transparency-mood-history-membership`

## Chức năng đã làm và file thay đổi

### Minh bạch AI và dữ liệu

- `FE/src/screens/MoodCheckInScreen.tsx`: giải thích tại luồng check-in rằng chỉ cảm xúc và bối cảnh được gửi cho Google Gemini khi chọn bối cảnh cụ thể và Gemini đã cấu hình; ghi chú và lịch sử không gửi cho Gemini. Bối cảnh chung hoặc Gemini không khả dụng dùng nội dung biên tập sẵn. Nêu phạm vi xóa dữ liệu phía ứng dụng trong Cài đặt.
- `FE/src/components/YearlyReading.tsx`: đặt phần giải thích ngay cạnh chức năng tạo nội dung. Nêu dữ liệu gửi (ngày sinh và năm đã chọn), nhà cung cấp Gemini, dữ liệu không gửi kèm, dữ liệu được lưu, giới hạn lượt, giới hạn diễn giải và phạm vi xóa trong ứng dụng. Ghi rõ ứng dụng không có chức năng xóa yêu cầu ở phía Gemini.
- Không thêm lời hứa mã hóa đầu cuối, an toàn tuyệt đối, chẩn đoán hay dự đoán cuộc đời. Không thêm gửi nhật ký/check-in sang AI.

### Tổng kết cảm xúc

- `BE/src/validators/mood.validator.js`, `BE/src/routes/mood.routes.js`, `BE/src/controllers/mood.controller.js`, `BE/src/services/mood.service.js`, `BE/src/repositories/mood.repository.js`: thêm `GET /mood/check-ins/history` với kỳ tuần/tháng, ngày neo, bộ lọc cảm xúc và phân trang. Truy vấn giới hạn theo `user_id`; nhóm thống kê tính trên toàn kỳ trước khi phân trang. Tuần bắt đầu thứ Hai; ranh giới và nhóm ngày dùng múi giờ `Asia/Ho_Chi_Minh`.
- Phạm vi thống nhất là **mọi check-in còn được lưu của tài khoản**, bất kể kết quả đã bấm lưu vào sổ tay hay chưa. Phân bố và tổng lượt tính toàn bộ cảm xúc trong kỳ; bộ lọc chỉ lọc danh sách, không làm thay đổi số tổng hoặc phân bố. Ngày không có check-in không được chuyển thành cảm xúc.
- `FE/src/components/MoodHistoryPanel.tsx`, `FE/src/screens/MoodJourneyScreen.tsx`, `FE/src/App.tsx`: thêm chuyển tuần/tháng, lọc danh sách, phân trang, trạng thái tải/lỗi và nút thử lại. Lỗi API không hiển thị số liệu mặc định. Danh sách “Lời chiêm nghiệm đã lưu” hiện hữu vẫn riêng với lịch sử check-in.
- `BE/tests/mood-idempotency.unit.test.js`: kiểm tra ranh giới tuần Việt Nam, scope tài khoản, bộ lọc/phân trang, tổng hợp trước phân trang và thống kê theo ngày.

### Quyền lợi hội viên

- `BE/src/services/payment.service.js`: trả bảng Free/Premium và trạng thái khả dụng từ cùng API hội viên, dùng giới hạn AI đang áp dụng trong service.
- `BE/src/services/horoscope.service.js`, `BE/src/controllers/payment.controller.js`: trả số bản thành công, lượt đang xử lý, số lần gọi (kể cả lỗi), số còn lại và thời điểm có thể dùng tiếp. Đếm theo cửa sổ trượt 24 giờ; lượt `PENDING` chỉ giữ suất trong 10 phút như cơ chế tạo hiện tại.
- `FE/src/components/MembershipCheckout.tsx`, `FE/src/screens/MembershipScreen.tsx`: hiển thị giá, bảng quyền lợi, hạn dùng và quota từ API BE. Quyền chưa khả dụng ghi rõ trạng thái hiện tại.
- `FE/src/components/AppFooter.tsx`, `FE/src/screens/AccountScreen.tsx`: cùng tải API trạng thái hội viên và hiển thị gói, hạn dùng khi có, cùng quota AI.
- `FE/src/screens/HoroscopeScreen.tsx`, `FE/src/components/YearlyReading.tsx`: dùng quota BE và làm mới sau yêu cầu tạo nội dung.
- Không thêm thời gian dùng thử hoặc quyền AI không giới hạn. Không đổi cờ bán hàng, cấu hình checkout hoặc môi trường sandbox.

## Kiểm tra đã chạy

| Kiểm tra | Ban đầu trước sửa | Sau sửa |
|---|---:|---:|
| FE `npm run lint` (TypeScript `tsc --noEmit`) | Đạt | Đạt |
| FE `npm run build` | Đạt; cảnh báo chunk JavaScript lớn hơn 500 kB | Đạt; cảnh báo chunk lớn vẫn còn |
| FE `npm run test:unit` | 24 đạt, 0 lỗi | 24 đạt, 0 lỗi |
| BE `npm run test:unit` | 132 đạt, 0 lỗi | 137 đạt, 0 lỗi |
| `git diff --check` | — | Đạt; Git có cảnh báo chuyển LF sang CRLF với file `editorial/culture-source-audit.md` đã thay đổi từ trước |

Năm kiểm thử BE mới kiểm tra repository lịch sử, service tính tổng hợp theo tuần/tháng, quota AI, quyền lợi hội viên BE và tổ hợp dữ liệu tại membership controller. Các kiểm thử dùng mock cho truy vấn mới; không kết nối hoặc ghi vào cơ sở dữ liệu.

## Phần còn vướng / cần nhóm xác nhận

- Chưa chạy kiểm thử trực tiếp trên trình duyệt; giao diện cần được nhóm demo theo thứ tự bên dưới.
- Chưa chạy kiểm thử HTTP end-to-end cho endpoint lịch sử hoặc `/membership/status`; các kiểm thử mới gọi trực tiếp tầng repository/service bằng mock. Kiểm tra truy vấn dữ liệu thật cần môi trường DB test riêng.
- Chưa xác minh chính sách lưu/xóa dữ liệu của Google Gemini. Ứng dụng xóa được bản ghi phía tài khoản qua chức năng xóa dữ liệu cá nhân, nhưng code không điều khiển việc xóa dữ liệu phía nhà cung cấp. Nhóm cần xác nhận chính sách áp dụng và cập nhật thông báo quyền riêng tư nếu cần.
- Thư viện xin xăm vẫn không khả dụng cho tới khi nhóm xác nhận bộ nội dung và quyền sử dụng; trạng thái này được trả trong bảng quyền lợi, không tự mở tính năng.
- Trạng thái khả dụng của bài thư viện hội viên tiếp tục phụ thuộc nội dung đã phát hành và quyền truy cập BE.
- Build tiếp tục báo một số chunk trên 500 kB; không nằm trong phạm vi này.
- Chưa chạy kiểm tra tích hợp với database test riêng đã xác nhận. Không chạy migration, seed, import hoặc ghi DB thật; thay đổi này không yêu cầu migration.

## Hướng dẫn demo UI

1. **Minh bạch AI:** đăng nhập tài khoản thử nghiệm, mở Check-in cảm xúc và mở mục “AI và dữ liệu trong lời gợi mở này”. Chọn cảm xúc cùng một bối cảnh cụ thể để xem lời gợi mở. Nếu Gemini chưa cấu hình/khả dụng, xác nhận giao diện dùng nội dung biên tập sẵn. Tiếp đó mở “Chiêm nghiệm theo năm”, xem phần dữ liệu AI, giới hạn và yêu cầu đồng ý trước khi tạo. Không dùng ngày sinh thật khi demo.
2. **Tổng kết cảm xúc:** thực hiện một số check-in thử nghiệm ở các cảm xúc khác nhau, có thể để trống ghi chú hoặc ghi chú thử. Mở Góc của tôi → “Nhìn lại lời chiêm nghiệm”. Chuyển tuần/tháng, dùng nút khoảng trước/sau và lọc một cảm xúc. Đối chiếu tổng/phân bố với các check-in của tài khoản; kiểm tra danh sách nhiều trang nếu dữ liệu đủ. Ngày không có check-in phải để trống, không được tính thành cảm xúc.
3. **Hội viên:** mở trang Hội viên, đối chiếu bảng Free/Premium và giá/trạng thái. Trong cùng phiên, so trạng thái ở banner chân trang và Góc của tôi. Tài khoản Free cần hiện quyền AI theo năm chưa khả dụng; tài khoản hội viên thử nghiệm nếu có cần hiện hạn dùng và quota. Không tạo giao dịch thật; trạng thái thanh toán tiếp tục sandbox và phụ thuộc cờ cấu hình hiện tại.

## Ghi chú Git

- Công việc được làm trên nhánh riêng nêu đầu tài liệu. Các thay đổi đã có từ trước khi bắt đầu vẫn được giữ nguyên trong working tree; một số file dùng chung như `FE/src/App.tsx` và `FE/src/components/AppFooter.tsx` có cả thay đổi cũ và bổ sung lần này. Không commit, push hoặc deploy.
