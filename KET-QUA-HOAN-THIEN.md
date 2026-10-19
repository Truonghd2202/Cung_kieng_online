# Kết quả hoàn thiện kỹ thuật — 19/10/2026

## Phạm vi và trạng thái Git

- Nhánh sửa: `fix/report-2026-10-19-findings`.
- Trước khi sửa, repo ở `main`; working tree chỉ có báo cáo `Danh-gia-tong-the-Tin-Lam-Tam-Linh-2026-10-19.md` do người dùng thêm, chưa theo dõi bởi Git. File đó được giữ nguyên.
- Không commit, push, deploy, chạy migration, seed/import hoặc thao tác database. Không sửa `.env`; không bật bán thật. Đợt tiếp theo chỉ chuẩn bị migration calendar để xem xét, chưa áp dụng lên database.
- Phạm vi sản phẩm được giữ ở ba MVP: đọc/lưu bài văn hóa, đọc hướng dẫn/checklist nghi lễ, check-in/lưu/xem lại lời chiêm nghiệm. Các mục ảnh, hội viên, AI mở rộng và vận hành được ghi nhận riêng nếu cần nhóm xác nhận.

## Đối chiếu từng mục trong báo cáo

| Mục | Kết quả hiện tại và bằng chứng |
|---|---|
| Báo cáo, nhận định ở mục 1–2 | Đây là bối cảnh và mô tả phạm vi của báo cáo, không phải bằng chứng nghiệm thu runtime. Đợt này chỉ chạy các lệnh liệt kê bên dưới; không kết luận sản phẩm hoàn thiện. |
| 3.1 — Mẫu khảo sát | **Còn vướng, cần nhóm xác nhận.** Không sửa hay chọn giữa các số 148/150/154/382. Cần bảng dữ liệu gốc, cách loại phản hồi và mẫu số từng câu. |
| 3.2 — Quy mô thị trường và tuyên bố tăng trưởng | **Còn vướng, cần nhóm xác nhận.** Không xác thực TAM/SAM/SOM, CAGR, Google Trends hoặc ý định trả phí trong đợt code này. |
| 3.3 — Đối thủ và phỏng vấn | **Còn vướng, cần nhóm xác nhận.** Chưa đối chiếu dịch vụ, giá, hồ sơ người tham gia, bản ghi và quyền sử dụng ý kiến. |
| 3.4 — Tài liệu yêu cầu so với code | **Còn vướng.** Code hiện dùng SePay và có thư viện/vật phẩm, nhưng không sửa bộ tài liệu CP1/SRS trong đợt này vì cần chủ dự án chốt cách mô tả trạng thái sản phẩm. |
| A1 — Generator tự gán `VERIFIED_WITH_SOURCE` | **Đã sửa.** Hai script không còn tự gán trạng thái xác minh. Trạng thái tách thành `STRUCTURE_VALID`, `SOURCE_IDENTIFIED`, `SOURCE_CHECKED`, `CONTENT_REVIEWED`; trạng thái phát hành được ghi là không thể biết từ file draft. Hồ sơ người duyệt chỉ được tính nếu có người, thời điểm, bằng chứng và hash trùng phiên bản. `editorial/culture-review-records.json` hiện là `[]`. Chạy generator cho thấy 200 bài có metadata nhận dạng nguồn, 0 có hồ sơ đối chiếu nguồn, 0 có hồ sơ review nội dung. Điều này không kết luận nội dung đúng/sai và không xác nhận có bài đã publish. `editorial/culture-source-audit.md` đã được sinh lại, không còn câu tự tuyên bố 100% verified. |
| A2 — Cổng public bài văn hóa | **Đã sửa trong code.** Truy vấn list/detail yêu cầu `active`, `verified`, `editorial_status=PUBLISHED`, đúng loại public/member; service kiểm tra lại metadata review, provenance, quyền ảnh và hash phiên bản. Member library dùng cùng predicate. List quét tiếp các trang dữ liệu thô để các bản chưa publish không làm mất bản hợp lệ ở trang sau; FE theo `nextOffset`. Test xác nhận trạng thái/hồ sơ/hash không hợp lệ bị từ chối và 100 bản nháp đứng trước bài đã publish vẫn trả được bài publish. Chưa truy vấn database để xác nhận dữ liệu hiện có. |
| A3 — State machine duyệt | **Đã sửa trong code.** Chỉ duyệt được bản `IN_REVIEW`; duyệt chuyển sang `APPROVED`, phát hành là thao tác `active=true` riêng; gửi duyệt và phát hành cùng request bị từ chối. Test transition pass. Audit log vẫn được ghi cùng transaction trong repository. |
| A4 — Sửa/duyệt đồng thời | **Đã thêm kiểm soát phiên bản.** FE gửi `updated_at` khi sửa hoặc duyệt; BE dùng compare-and-set trong cửa sổ 1 ms để tương thích độ chính xác JavaScript/`timestamptz(6)`, đồng thời đẩy timestamp tiến ít nhất 1 ms. API trả 409 nếu phiên bản đã đổi. Unit test mô phỏng update cạnh tranh và xác nhận không ghi audit khi CAS thất bại. **Còn kiểm tra PostgreSQL đồng thời thật** vì không có database test riêng đã được xác nhận trong đợt này. |
| A5 — Tích hợp và triển khai đầu-cuối | **Còn vướng, cần staging riêng.** Chưa kiểm tra OAuth/cookie theo topology thật, email, Gemini, SePay sandbox webhook, Web Push, migration trên DB test, proxy/HTTPS, backup/restore hoặc triển khai SPA. Không gọi dịch vụ ngoài hay database thật. |
| B1 — Bộ lọc văn hóa | **Đã sửa.** Nhóm lọc được tạo từ category của bài public đang tải; thêm vùng `Toàn quốc`, khớp nhãn BE. FE typecheck/build pass. Chưa có kiểm thử trình duyệt bằng dữ liệu production. |
| B2 — Đổi lời thiếu reviewer | **Đã sửa.** `findNextForMoodContext` dùng projection reviewer chung như các truy vấn signal còn lại. Test xác nhận reviewer thật đi cùng kết quả đổi lời. |
| B3 — Phân trang nghi lễ sau khi lọc | **Đã sửa.** BE quét theo thứ tự ổn định `created_at,id`, tiếp tục qua bản không đủ review và trả `nextOffset` theo vị trí dữ liệu thô; FE tiếp tục bằng offset đó. Test fixture có 100 bản không đủ review trước bản hợp lệ và vẫn lấy được bản hợp lệ. Chưa đối chiếu với database thật. |
| B4 — Ảnh chưa được duyệt | **Còn vướng, cần nhóm xác nhận.** Registry hiện có 20 hồ sơ, 0 hồ sơ `reviewStatus=APPROVED`; cổng ảnh vẫn từ chối ảnh chưa đủ hồ sơ. Không tự điền reviewer, nguồn hoặc license. Nhóm cần rà từng ảnh, giấy phép/ngữ cảnh, credit và quyết định ảnh nào được dùng; cũng cần quyết định quản trị ảnh qua admin hay tiếp tục dùng giao diện không ảnh. |
| B5 — Trạng thái hội viên ở footer | **Đã sửa.** Footer lấy `/membership/status`, hiển thị riêng hội viên đang hoạt động, trạng thái đăng ký/gia hạn, khả dụng checkout và chế độ sandbox. Typecheck/build pass. Trạng thái `.env` runtime chưa được đọc; không sửa `.env`. |
| B6 — Định nghĩa analytics | **Đã sửa phần code/copy.** DAU/MAU, retention và daily trend dùng ngày/tháng `Asia/Ho_Chi_Minh`; UI nói rõ MAU tháng lịch, `anonymous_id` và dữ liệu có consent. Unavailable metric không còn nói chưa tích hợp thanh toán; ghi rằng cần nối đơn đã xác nhận với event analytics để tính chuyển đổi. **Còn đối chiếu event và số liệu thật** trên DB test/staging; SQL analytics chưa chạy trên PostgreSQL trong đợt này. |
| C1 — Hiệu năng/cache | **Còn vướng, cần đo trên thiết bị/staging.** Build vẫn báo chunk `OrbitControls` 602.88 kB minified / 150.63 kB gzip; cảnh báo đã có ở build ban đầu và vẫn còn sau sửa. Chưa đo mobile, thời gian tải, WebGL, offline/deployment hoặc stale asset; không refactor/lazy-load mạo hiểm khi chưa có phép đo. |
| C2 — Dữ liệu riêng tư/vận hành | **Còn một phần.** Rate limit đăng nhập vẫn là `Map` theo `req.ip` trong process; chưa đặt trust proxy vì chưa biết topology. API chưa có luồng export/xóa tài khoản; ghi backlog ngoài ba MVP. `.env` hiện không được Git theo dõi theo `git ls-files`; file đó không được đọc hay sửa, nên không kết luận về bí mật trong archive hoặc nơi nhận archive. Nhóm cần xác định archive đã chia sẻ ở đâu và tự xử lý luân chuyển credential nếu cần. |
| Mục 5 — Nguồn và nội dung văn hóa | **Còn vướng, cần người review.** Generator không còn tuyên bố đã đối chiếu; chưa đọc tài liệu gốc hay xác nhận bất kỳ nguồn/claim nào. Nhóm chọn bài pilot, ghi claim–trang/mục–người review và duyệt qua admin. |
| Mục 6 — AI | **Còn vướng, cần kiểm tra chuyên môn và staging.** Không chứng nhận an toàn prompt, phản hồi sức khỏe tinh thần, dữ liệu gửi Gemini hoặc quota/chi phí. Chưa chạy bộ kịch bản AI hoặc gọi Gemini. |
| Mục 7 — Giá và mô hình kinh doanh | **Còn vướng, cần nhóm xác nhận.** Không xác nhận khảo sát chi trả, doanh thu, retention, CAC/LTV hoặc khả năng bán. Không mở bán thật. |
| Mục 8 — Lộ trình | **Chưa coi các đợt pilot/nghiệm thu là hoàn thành.** Đây là việc kế tiếp cần staging, review con người và người dùng thật. |
| Mục 9 — Danh sách nghiệm thu tổng | **Chưa chạy UI đầu-cuối.** Hướng dẫn thao tác theo ba MVP ở cuối file; cần nhóm chạy trên staging/DB test và ghi pass/fail. |
| Mục 10 — Nguồn tham khảo | **Không tái xác minh toàn bộ liên kết.** Liên kết trong báo cáo được giữ làm tài liệu tham khảo, không được xem là chứng cứ đã rà từng claim. |

## Kiểm tra trước và sau sửa

| Kiểm tra | Trước sửa | Sau sửa |
|---|---:|---:|
| FE `npm run lint` (TypeScript `tsc --noEmit`) | Qua | Qua |
| FE `npm run test:unit` | 24/24 | 24/24 |
| FE `npm run build` | Qua; cảnh báo chunk >500 kB | Qua; cảnh báo `OrbitControls` 602.88 kB minified / 150.63 kB gzip còn nguyên |
| FE `npm run check:content` | Script hợp lệ; 0 thẻ đủ điều kiện ở các tổ hợp Quan Âm/Quan Thánh được in | Kết quả giống trước; đây là khoảng trống dữ liệu/điều kiện, không được báo thành coverage đạt |
| FE `npm run check:calendar` | Qua fixture 13/10/2026 | Qua fixture 13/10/2026 |
| FE `npm run check:xam-flow` | 10 kiểm tra qua | 10 kiểm tra qua |
| BE `npm run test:unit` | 118/118 | 132/132 |
| BE `npm run prisma:validate` | Qua | Qua |
| `node scripts/validate-culture-batches.js` | 200 bài / 20 batch; 0 lỗi schema/trùng lặp theo script | Cùng kết quả; đây không phải review nguồn/nội dung |
| `node scripts/compile-audit.js` + `node scripts/generate-audit-file.js` | Generator cũ tự gán xác minh | 200 nguồn được nhận dạng, 0 đối chiếu nguồn có hồ sơ, 0 review nội dung có hồ sơ; sinh báo cáo không tự tuyên bố verified |
| `git diff --check` | — | Qua; chỉ có cảnh báo Git về LF/CRLF ở file báo cáo được sinh lại |

BE unit suite cuối 132/132, bao gồm hồi quy workflow/publication, phân trang bài văn hóa và nghi lễ, reviewer, CAS nội dung và phiên bản lời chiêm nghiệm. Một test mới ban đầu fail vì fixture không đạt điều kiện publishable; fixture đã được sửa thành signal hợp lệ và test đạt. Một lần gọi lệnh kiểm tra chạy nhầm working directory và báo không tìm thấy package; lệnh đã được chạy lại ở đúng thư mục. Một lần gọi qua `npm` bị PowerShell chặn script policy; kiểm tra được chạy lại thành công bằng `npm.cmd`. Những lần gọi lỗi này không làm thay đổi file hoặc trạng thái sản phẩm.

## Chưa chạy được hoặc chưa chạy

- Không chạy full integration suite PostgreSQL, kiểm tra race trên PostgreSQL, hoặc query analytics: chưa xác minh được database test riêng và yêu cầu không chạm database thật.
- Không chạy trình duyệt/manual UI, API trên staging, SePay sandbox E2E, email/OAuth/Gemini/Web Push, backup/restore hoặc test deployment/service worker.
- Không xác nhận trạng thái `.env` runtime; chỉ kiểm tra code default `SEPAY_ENV=sandbox`, `.env.example` giữ `MEMBERSHIP_SALES_ENABLED=false` và `DIGITAL_SALES_ENABLED=false`. Không sửa cờ bán hoặc `.env`.
- Không thẩm định nguồn, quyền ảnh, số khảo sát, số bài publish trong DB hoặc trạng thái review thật.

## Việc nhóm cần xác nhận

1. Xuất và đối soát dữ liệu khảo sát gốc; chốt mẫu số từng câu và đồng bộ báo cáo/slide/requirements. Không chọn số để khớp tài liệu.
2. Chốt nguồn và các tuyên bố TAM/SAM/SOM, CAGR, xu hướng tìm kiếm; lưu cách tính và nhãn giả định.
3. Bổ sung hồ sơ đối thủ/phỏng vấn: dịch vụ cụ thể, ngày/giá, người tham gia, bản ghi/ghi chú và phạm vi được phép trích dẫn.
4. Review nội dung văn hóa theo từng phiên bản: tài liệu thật, claim, locator, người/ngày review và bằng chứng. Chỉ nhập hồ sơ vào `editorial/culture-review-records.json` khi đã có xác nhận thật; generator kiểm hash phiên bản.
5. Chọn ảnh pilot và xác nhận đúng file, chủ thể, nguồn, license/quyền, credit, ngữ cảnh và reviewer; không điền trường dựa trên suy đoán.
6. Kiểm tra trên DB test/staging số bài publish, migrations, reviewer metadata, checklist nghi lễ, coverage check-in và trạng thái thu hồi.
7. Cung cấp staging/DB test và người phụ trách để chạy integration, concurrency, OAuth/cookie topology, email, Gemini, SePay sandbox, Web Push, backup/restore và UI.
8. Xác nhận cấu hình môi trường thanh toán thực tế vẫn sandbox, hai cờ bán vẫn tắt; không dựa riêng vào `.env.example` để kết luận runtime.
9. Xác nhận proxy/deployment topology trước khi cấu hình trust proxy; đánh giá phạm vi export/xóa tài khoản và archive `.env` theo nơi đã chia sẻ.
10. Chạy pilot người dùng và xác nhận giá/quyền lợi/unit economics bằng dữ liệu thật trước mọi quyết định mở bán.

## Hướng dẫn test tổng trên UI theo thứ tự

Chạy các bước trên staging hoặc môi trường phát triển dùng database test riêng. Không chạy migration/seed lên database người dùng thật. Giữ SePay sandbox và cờ bán tắt trong suốt nghiệm thu.

1. **Đăng nhập test và kiểm tra trạng thái:** vào ứng dụng, xác nhận trang tải được và footer báo trạng thái lấy từ máy chủ. Không thực hiện checkout.
2. **Văn hóa:** mở danh sách; thử tìm kiếm có/không dấu; lọc category và từng vùng gồm `Toàn quốc`; mở chi tiết, kiểm nguồn/metadata; lưu bookmark, refresh và mở lại. Bài không publish/review không được xuất hiện ở public API.
3. **Nghi lễ:** mở danh sách và chi tiết; kiểm steps/checklist/prayers; tick, bỏ tick, refresh; đổi tài khoản để xác nhận tiến độ không rò chéo. Trong bộ dữ liệu test, đặt bản thiếu review trước bản đủ điều kiện để kiểm phân trang.
4. **Check-in:** thử từng mood/context được UI cho chọn; kiểm trạng thái không khả dụng nếu thiếu nội dung; tạo check-in, đổi lời và xem reviewer; lưu, mở lại bằng saved ID, refresh và thử retry cùng request. Dùng hai tài khoản test để kiểm ownership.
5. **Admin và phiên bản:** tạo draft, gửi `IN_REVIEW`, thử duyệt; xác nhận phải duyệt rồi phát hành riêng. Mở cùng bản ở hai phiên, lưu ở một phiên rồi thử duyệt/lưu phiên cũ; phiên cũ phải nhận 409 và yêu cầu tải lại.
6. **Responsive/accessibility:** lặp lại ba luồng ở viewport 360/390 px và desktop; dùng keyboard/focus, phóng to chữ, reduced motion, dark/light và mạng chậm. Ghi lỗi cùng thiết bị/trình duyệt/build.
7. **Thanh toán và triển khai:** chỉ khi có staging được nhóm cấp, kiểm tra trạng thái sandbox, footer, service worker và deep link. Không nhập credential production hoặc phát sinh giao dịch thật.

## File thay đổi trong đợt này

| File | Lý do |
|---|---|
| `BE/src/controllers/content.controller.js` | Trả `nextOffset` từ dịch vụ phân trang bài văn hóa và nghi lễ. |
| `BE/src/repositories/admin.repository.js` | Thêm CAS theo `updated_at`, reviewer thật và hash nội dung review; trả conflict khi bản thay đổi. |
| `BE/src/repositories/analytics.repository.js` | Định nghĩa ngày/tháng analytics theo `Asia/Ho_Chi_Minh`; sửa mô tả paid conversion chưa nối event. |
| `BE/src/repositories/content-editor.repository.js` | Chặn ghi đè nội dung bằng phiên bản editor cũ. |
| `BE/src/repositories/content.repository.js` | Bắt buộc PUBLISHED ở public list/detail và tie-break phân trang ổn định. |
| `BE/src/repositories/signal.repository.js` | Bổ sung reviewer projection cho nhánh đổi lời. |
| `BE/src/routes/admin.routes.js` | Trả HTTP 409 cho phiên bản editor cũ. |
| `BE/src/routes/member-library.routes.js` | Dùng cổng xuất bản chung khi list/detail thư viện. |
| `BE/src/services/admin.service.js` | Chuyển lỗi transition/reviewer/version thành phản hồi API phù hợp. |
| `BE/src/services/content.service.js` | Fail closed bài văn hóa và quét tiếp trang nghi lễ sau khi lọc review. |
| `BE/src/services/culture-publication.js` | Predicate publication, hồ sơ review và hash phiên bản thống nhất. |
| `BE/src/services/editorial-workflow.js` | Buộc duyệt từ IN_REVIEW và tách duyệt khỏi phát hành. |
| `BE/src/validators/admin.validator.js` | Yêu cầu `expectedUpdatedAt` cho thao tác duyệt. |
| `BE/src/validators/content-editor.validator.js` | Nhận timestamp phiên bản của editor. |
| `BE/tests/admin.test.js` | Kiểm tra timestamp bắt buộc và conflict CAS khi có cập nhật đồng thời. |
| `BE/tests/content-catalog.test.js` | Kiểm tra phân trang qua bản nghi lễ không đủ review. |
| `BE/tests/culture-publication.test.js` | Kiểm tra status, metadata, hash và phân tách public/member. |
| `BE/tests/editorial-workflow.test.js` | Khóa transition duyệt/phát hành hai bước. |
| `BE/tests/mood-idempotency.unit.test.js` | Khóa reviewer projection của nhánh đổi lời. |
| `FE/src/admin/AdminApp.tsx` | Gửi phiên bản khi duyệt; mô tả đúng định nghĩa analytics. |
| `FE/src/admin/ContentEditor.tsx` | Gửi phiên bản mở khi lưu bản thảo. |
| `FE/src/components/AppFooter.tsx` | Lấy và hiển thị trạng thái hội viên từ BE. |
| `FE/src/data/adminService.ts` | Bổ sung kiểu timestamp và payload phiên bản duyệt. |
| `FE/src/data/contentService.ts` | Theo `nextOffset` khi nạp danh sách bài văn hóa và nghi lễ. |
| `FE/src/screens/CultureScreen.tsx` | Tạo category filter từ dữ liệu và thêm Toàn quốc. |
| `editorial/culture-source-audit.md` | Sinh lại kiểm kê, bỏ tuyên bố tự xác minh và gắn trạng thái theo hồ sơ. |
| `editorial/culture-review-records.json` | Danh sách hồ sơ review ban đầu rỗng, không tự tạo bằng chứng. |
| `scripts/compile-audit.js` | Bỏ phân loại verified theo batch; xuất trạng thái kiểm kê từ hồ sơ. |
| `scripts/generate-audit-file.js` | Bỏ tuyên bố 100% verified, trình bày trạng thái theo phiên bản/hồ sơ. |
| `scripts/culture-review-status.js` | Tính trạng thái cấu trúc/nguồn và chỉ nhận review record khớp hash. |
| `KET-QUA-HOAN-THIEN.md` | Lưu bằng chứng, mục còn vướng, kiểm tra và hướng dẫn UI. |

`Danh-gia-tong-the-Tin-Lam-Tam-Linh-2026-10-19.md` vẫn là file untracked có sẵn trước khi bắt đầu và không bị sửa.

## Bổ sung xử lý trong đợt tiếp theo

| Điểm | Kết quả và bằng chứng |
|---|---|
| `calendar_events.updated_at` | **Đã chuẩn bị, chưa áp dụng.** Schema Prisma thêm `updated_at`; migration `BE/prisma/migrations/20261019120000_calendar_events_updated_at/migration.sql` chỉ thêm cột có default timestamp. Admin list/editor sử dụng cột này làm version/CAS. Cần nhóm áp dụng migration trên DB được phê duyệt trước khi code mới truy vấn cột; đã chạy `prisma validate` và mock repository/editor test, chưa xác minh trên PostgreSQL. |
| Cờ lỗi từ `stateAfterReview` | **Đã sửa trước khi ghi.** `admin.repository.updateReview` và signal admin bắt `reviewRequired`/`reviewAndPublishInOneStep` trước `updateMany`; service trả 422. Regression test xác nhận không update và không tạo audit log khi duyệt sai state hoặc duyệt/phát hành cùng request. |
| Version lời chiêm nghiệm | **Đã thêm xuyên FE–BE.** FE gửi `updated_at` khi lưu và duyệt; API yêu cầu version cho review; service compare-and-set khi lưu/duyệt. Version cũ hoặc race trả 409, không ghi nội dung/trạng thái/audit. Service mock transaction và schema API tests qua; chưa chạy PostgreSQL concurrency test. |
| Tác động cổng publication bài cũ | Bài văn hóa cũ có `active=true`, `verified=true`, `PUBLISHED` nhưng thiếu review record khớp `versionHash`, provenance/quyền sử dụng hoặc reviewer sẽ không xuất hiện qua public/member API. Không có code tự duyệt lại hay sửa dữ liệu. Nhóm cần rà và duyệt lại từng phiên bản qua quy trình admin; số lượng bị ảnh hưởng chưa xác minh trên DB. |

Kiểm tra bổ sung trong đợt tiếp theo: `npm.cmd run prisma:generate` qua (Prisma Client được tạo lại từ schema); `npm.cmd run prisma:validate` qua; BE `npm.cmd run test:unit` qua **132/132**; FE `npm.cmd run lint` (TypeScript) qua; FE `npm.cmd run test:unit` qua **24/24**; FE `npm.cmd run build` qua với cảnh báo chunk `OrbitControls` 602.88 kB minified / 150.63 kB gzip. Migration calendar chỉ được chuẩn bị, không áp dụng. PostgreSQL integration/concurrency, staging và UI manual vẫn chưa chạy.

| File ở lượt bổ sung | Lý do |
|---|---|
| `BE/prisma/schema.prisma` | Khai báo `calendar_events.updated_at` để editor/review có version. |
| `BE/prisma/migrations/20261019120000_calendar_events_updated_at/migration.sql` | Chỉ chuẩn bị thêm cột timestamp; chưa chạy trên database. |
| `BE/src/repositories/admin.repository.js` | Bắt cờ state-machine lỗi trước update; lấy và so sánh version khi duyệt. |
| `BE/src/services/admin.service.js` | Trả 422/409 đúng cho transition không hợp lệ hoặc version cũ. |
| `BE/src/services/signal-admin.service.js` | CAS khi sửa/duyệt signal; lỗi transition trước update; trả 409 khi stale/race. |
| `BE/src/validators/signal-admin.validator.js` | Nhận và yêu cầu version token cho API sửa/duyệt signal. |
| `FE/src/admin/SignalAdminPanel.tsx` | Gửi `updated_at` lúc lưu và duyệt signal. |
| `BE/tests/admin.test.js`, `BE/tests/content-editor.validator.test.js`, `BE/tests/signal-admin.unit.test.js` | Regression tests cho lịch/editor version, 422 trước ghi và 409 cho signal stale/race qua service/validator. |