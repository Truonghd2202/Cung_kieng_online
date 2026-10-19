# Bàn giao demo tổng

Ngày rà soát: 19/10/2026  
Nhánh: `feature/ai-transparency-mood-history-membership`

## Phạm vi và cách đọc kết quả

Đã đối chiếu báo cáo đánh giá, hai báo cáo trước, Requirements hiện tại và code đang có. Báo cáo này ghi nhận bằng chứng vừa kiểm tra trong working tree; các kết quả trong báo cáo cũ không được dùng thay cho lần kiểm tra hiện tại.

Nhánh đang có nhiều thay đổi chưa commit từ các lượt làm việc trước khi bắt đầu lần rà soát này. Tôi giữ nguyên chúng và không reset, clean, commit, push hay deploy. Trong lần này có chỉnh cổng trả nghi lễ ở BE, bổ sung hồi quy tương ứng, cập nhật các đoạn Requirements đang mô tả sai VNPay/trạng thái hội viên và tạo tài liệu này.

Không ghi/xóa dữ liệu DB thật. Migration lịch chỉ được chuẩn bị; không áp dụng lên DB nào. Cờ bán hàng, checkout và sandbox không bị đổi. Nội dung, ảnh, nguồn, quyền sử dụng và quyết định thẩm định vẫn cần nhóm xác nhận.

## Ma trận yêu cầu, bằng chứng và phần còn vướng

| Yêu cầu / phát hiện | Trạng thái theo code hiện tại | Bằng chứng đã kiểm tra | Còn vướng |
|---|---|---|---|
| Báo cáo 3.1 — số khảo sát | Còn vướng, cần nhóm xác nhận | Không chọn giữa các số trong tài liệu và không tạo số mới. | Đối chiếu bảng phản hồi gốc, cách loại trùng/không hợp lệ, thời điểm chốt và mẫu số từng câu. |
| Báo cáo 3.2 — thị trường, TAM/SAM/SOM, CAGR, ý định chi trả | Còn vướng, cần nhóm xác nhận | Không dùng lại nhận định trong báo cáo như chứng cứ runtime. | Bổ sung nguồn, phép tính, phạm vi đối tượng và nhãn giả định. |
| Báo cáo 3.3 — đối thủ/phỏng vấn | Còn vướng, cần nhóm xác nhận | Không xác minh hồ sơ người tham gia, bản ghi, giá hay quyền dùng trích dẫn. | Nhóm đối chiếu dịch vụ cụ thể và hồ sơ phỏng vấn/cho phép sử dụng. |
| Báo cáo 3.4 — Requirements so với code | Đã chỉnh phần mô tả liên quan phạm vi hiện tại | [Requirements](Tin-Lam-Tam-Linh-Requirements-Tong-Hop.md) đã bỏ mô tả checkout VNPay, cập nhật SePay, status/quota hội viên, tổng kết check-in và disclosure AI; giữ ba MVP riêng. | Toàn bộ đề án/slide/tài liệu kinh doanh chưa được rà từng câu; giá và doanh thu vẫn là giả định. |
| A1 — generator tự gán nội dung là đã xác minh | Đã sửa trong code; nội dung chưa được nhóm thẩm định | `scripts/generate-audit-file.js` lấy trạng thái từ `scripts/culture-review-status.js`; trạng thái nguồn/nội dung chỉ được ghi nhận khi có người, thời điểm, bằng chứng và hash khớp. Draft không cho suy ra trạng thái xuất bản. Đã đọc code, không chạy generator vì generator ghi đè báo cáo editorial đang có thay đổi. | Nhóm cần kiểm chứng từng claim, nguồn, quyền và review thực tế. Không kết luận nội dung nào đúng/sai hoặc đã xuất bản từ draft. |
| A2 — cổng public bài văn hóa | Đã có cổng BE; dữ liệu DB chưa truy vấn | `content.repository` lọc active/verified/PUBLISHED/public; `culture-publication` kiểm hồ sơ, provenance, quyền ảnh và hash; list/detail/member library dùng điều kiện tương ứng. Unit hiện tại có test điều kiện publication và phân trang qua draft. | Chưa kiểm DB để biết bài nào còn hiển thị. Bản đã đánh dấu duyệt trước đây nhưng thiếu metadata/hash hoặc chưa ở PUBLISHED sẽ không được trả ra; không tự duyệt lại hay publish. |
| A3 — state machine và lỗi workflow | Đã xử lý ở service/repository; API trả 422 | `admin.repository.updateReview` kiểm `reviewRequired`, `reviewAndPublishInOneStep`, `approvalRequired` trước lệnh cập nhật/audit; service chuyển thành 422 với thông báo tương ứng. Signal service cũng kiểm transition. Unit xác nhận lỗi không ghi Prisma/audit; yêu cầu duyệt và publish cùng bước bị từ chối. | Cần demo trên staging để xác nhận thông báo trong trình duyệt và quyền admin thực tế. |
| Lỗi bổ sung — `calendar_events.updated_at` | Schema/client được chuẩn bị; cần review migration trước khi triển khai | `BE/prisma/schema.prisma` khai báo `updated_at`; admin list/editor dùng trường này; migration `20261019120000_calendar_events_updated_at` thêm cột. `prisma:validate`, `prisma:generate` và unit calendar CAS đều qua. | Migration chưa chạy. Nếu DB đang dùng chưa có cột thì admin calendar sẽ cần migration được nhóm duyệt và áp dụng trên môi trường phù hợp trước khi dùng. |
| A4 — sửa/duyệt đồng thời và phiên bản lời chiêm nghiệm | Có CAS/version ở BE và FE; concurrency DB chưa kiểm được | FE gửi `expectedUpdatedAt`; repository cập nhật theo phiên bản đọc được; signal save/review từ chối phiên bản cũ bằng 409 trước audit/write. Unit kiểm tra service/repository, validator và CAS conflict. | PostgreSQL test không hoạt động ở cổng test; chưa có concurrency integration thực. Xung đột trên UI chưa được trình duyệt kiểm trực tiếp. |
| Kiểm tra `stateAfterReview` ở các caller | Đã kiểm các caller admin nội dung và signal | `rg` xác nhận caller trong `admin.repository` và `signal-admin.service`; cả hai xử lý kết quả lỗi state machine trước ghi. Tests admin/signal pass. | Không có caller khác được tìm thấy trong `BE/src`. |
| B1 — bộ lọc văn hóa | Đã sửa theo danh sách dữ liệu BE | Category FE được sinh từ các bài BE đang tải; vùng Toàn quốc có nhãn tương ứng. FE typecheck/build và adapter tests qua. | Không có bài public DB để kiểm trực quan nhóm lọc trên dữ liệu thật. |
| B2 — reviewer khi đổi lời chiêm nghiệm | Đã sửa | `findNextForMoodContext` lấy projection reviewer; BE unit xác nhận reviewer thật đi cùng kết quả. |
| B3 — phân trang nghi lễ lọc sau khi lấy trang | Đã sửa cách tiếp tục trang; thêm cổng publication | BE quét tiếp theo offset ổn định; unit fixture có các bản không đạt trước bản hợp lệ. FE load theo `nextOffset`; FE adapter tests qua. | Chưa truy vấn dữ liệu DB thực. |
| Rà soát bổ sung — ritual/prayer chỉ trả nội dung đã phát hành | Đã gia cố trong lần rà soát này | `content.repository` lọc `editorial_status=PUBLISHED` cho guide và prayer; service kiểm lại trạng thái, review metadata và checklist không rỗng. BE unit mới xác nhận repository query và ẩn guide còn APPROVED/chưa PUBLISHED. | Các bản đã duyệt trước đây nhưng chưa publish hoặc thiếu checklist sẽ không hiện cho tới khi nhóm hoàn thiện quy trình đúng. Không tự sửa dữ liệu. |
| B4 — ảnh chưa có hồ sơ quyền/thẩm định | Cổng giữ an toàn; cần nhóm xác minh | Code yêu cầu caption/nguồn/căn cứ quyền trước duyệt ảnh; UI dùng placeholder khi ảnh không đủ metadata. Test publication rights qua. | Nhóm rà từng ảnh, nguồn, license, credit/ngữ cảnh và reviewer thật. Không tự xác nhận ảnh. |
| B5 — nhất quán hội viên ở trang, footer, tài khoản | Đã chuyển dữ liệu quyền lợi/trạng thái sang BE | `/membership/status` trả plans, benefits, subscription và `aiUsage`; trang hội viên, checkout, footer, account và chiêm nghiệm năm đọc cùng API. BE unit kiểm tra benefit/quota và tổ hợp response; FE typecheck/build qua. | Không truy vấn DB/runtime nên chưa biết subscription nào đang có hoặc checkout có khả dụng trong môi trường demo. |
| B6 — định nghĩa analytics | Code có định nghĩa múi giờ/copy tương ứng | BE unit analytics qua; các truy vấn trong code dùng ngày/tháng Việt Nam và phân biệt dữ liệu có consent. | Chưa chạy SQL analytics trên PostgreSQL test và chưa xác nhận event/dữ liệu runtime. |
| C1 — kích thước bundle/hiệu năng | Chưa đo hiệu năng thiết bị | FE production build thành công; chunk `OrbitControls` 602.88 kB minified / 150.63 kB gzip vẫn cảnh báo. | Chưa đo mobile, WebGL, thời gian tải, cache hay mạng yếu. |
| C2 — riêng tư/vận hành | Một phần có trong code, chưa nghiệm thu runtime | FE giải thích dữ liệu AI; BE giới hạn prompt check-in ở mood/context; yearly request gửi ngày sinh/năm sau consent; lịch sử check-in truy vấn theo user ID; private text có test mã hóa server-side. | Chưa xác nhận chính sách lưu dữ liệu Gemini, export/xóa tài khoản, topology proxy/rate-limit hoặc backup/restore. Mã hóa server-side không phải mã hóa đầu cuối. |
| MVP 1 — văn hóa: tìm/đọc/lưu/xem lại | Luồng FE/BE và bookmark theo tài khoản có trong code; nội dung public phụ thuộc gate | FE chỉ gọi content API và không tự thay nội dung local khi API lỗi; adapter tests xác nhận không mượn nội dung/hình local để thay bản BE. BE list/detail có gate. | DB test không chạy được; không xác nhận bài nào public. Sổ review editorial hiện không thay thế review nguồn/ảnh của con người. |
| MVP 2 — nghi lễ/checklist | Luồng đọc và tiến độ checklist local theo user/ritual có trong code | FE unit kiểm ID/checklist BE, account isolation và xử lý localStorage lỗi; BE unit kiểm filter, review, checklist và pagination. | Chưa xác nhận có đủ guide đã phát hành cho demo. Checklist/bookmark không đồng bộ thiết bị theo Requirements. |
| MVP 3 — guest/user check-in, lưu và xem lại | Có nhánh guest nhận kết quả, nhánh user ghi/lưu/xem lại và snapshot | FE tests kiểm lỗi API không thay kết quả cũ, idempotency/action state; BE unit kiểm ownership, token/snapshot, retry idempotent, signal publication và reviewer. | Chưa chạy HTTP/DB/browser E2E. Guest không có lịch sử theo tài khoản cho tới khi đăng nhập/lưu. |
| Mở rộng — minh bạch AI | Đã thêm tại hai điểm sử dụng | `MoodCheckInScreen` nói rõ mood/context gửi Gemini khi nhánh AI được dùng; không gửi ghi chú/lịch sử. `YearlyReading` nêu ngày sinh/năm, Gemini, lưu/xóa phía ứng dụng, consent và giới hạn; không hứa xóa dữ liệu phía Gemini. Code `ai.service` prompt chỉ nhận hai lựa chọn check-in. | Chưa gọi Gemini; chưa xác minh chính sách retention của nhà cung cấp. Không dùng ngày sinh thật khi demo. |
| Mở rộng — tổng kết cảm xúc | Có tuần/tháng, lọc, phân trang, empty/error/retry | BE history lọc theo tài khoản, nhóm mọi check-in trước phân trang và tính ngày bằng `Asia/Ho_Chi_Minh`; `scope=all_check_ins`. FE ghi rõ gồm check-in đã ghi, dù chưa lưu sổ; lỗi API không tạo số liệu. BE unit kiểm tuần thứ Hai/tháng, quyền sở hữu, tổng hợp và quota; FE unit qua. | Chưa có browser/DB E2E để so khớp dữ liệu thực. |
| Mở rộng — quyền lợi và quota | Có response thống nhất, không đổi cờ bán | BE tính 3 bản thành công/đang xử lý và 5 lần gọi mỗi 24 giờ; lỗi tính vào lần gọi, pending giữ slot tối đa 10 phút; trả `nextUsableAt`. FE hiện hạn dùng và số đã dùng/còn lại ở các màn hình. Tests service/controller qua. | Chưa có subscription thật kiểm chứng; gói Free vẫn không có quyền gọi AI theo năm. Quyền lợi xin xăm/thư viện chờ nội dung và quyền được xác nhận. |
| FE/BE, quyền truy cập, thông báo, dữ liệu trả về | Có unit regression ở các ranh giới; HTTP integration còn bị chặn | Mood history route yêu cầu đăng nhập; admin router có auth + ADMIN; saved content/history theo user; API errors có thông điệp 422/409; FE unit kiểm phân biệt 401/error và không retry token cũ qua tài khoản khác. | Không có browser session hoặc backend DB test đang chạy để xác nhận trên HTTP/UI thực. |
| Báo cáo A5 — tích hợp/staging/triển khai | Chưa hoàn tất | DB test riêng đã xác định nhưng kết nối tới `127.0.0.1:55432` bị từ chối; browser inventory rỗng. | Chạy lại full HTTP/DB/concurrency trên PostgreSQL test đang hoạt động; kiểm OAuth/email/Gemini/SePay sandbox/Web Push/HTTPS/cookie/deploy theo môi trường thật. |

## Kết quả kiểm tra đã chạy

| Kiểm tra | Kết quả thực tế |
|---|---|
| FE `npm.cmd run lint` (TypeScript `tsc --noEmit`) | Qua, cả baseline trước sửa và lần sau sửa. |
| FE `npm.cmd run build` | Qua; warning chunk `OrbitControls` 602.88 kB minified / 150.63 kB gzip. |
| FE `npm.cmd run test:unit` | 24/24 qua, trước và sau sửa. Bao gồm session isolation, content adapters, mood error state và ritual checklist. |
| FE `npm.cmd run check:content` | Lệnh chạy xong; nội dung/liên kết hợp lệ theo script nhưng 0 thẻ đủ điều kiện ở các tổ hợp Quan Âm/Quan Thánh mà script in ra. Không coi đây là coverage đạt cho dữ liệu public. |
| FE `npm.cmd run check:calendar` | Qua fixture 13/10/2026, múi giờ Việt Nam. |
| BE `npm.cmd run test:unit` | Ban đầu 137/137 qua; sau sửa cổng ritual 139/139 qua. |
| BE `npm.cmd run prisma:validate` | Schema hợp lệ. |
| BE `npm.cmd run prisma:generate` | Sinh Prisma Client v7.10.0 thành công. |
| `git diff --check` | Qua; Git chỉ cảnh báo `editorial/culture-source-audit.md` sẽ đổi LF sang CRLF khi Git chạm file. |
| BE `npm.cmd test` | Đã thử trên DB test riêng đã xác định. Ca HTTP `complete authentication lifecycle` lỗi khi health query không kết nối được `127.0.0.1:55432`; suite không tiến triển và đã dừng. Không đổi URL sang DB thật, không chạy migration/seed/import. |
| UI browser | Chưa kiểm được. CUA báo không có browser/app khả dụng; tạo tab IAB trả `Browser is not available`. Dev server FE đã chạy với API URL là cổng không phục vụ để tránh DB thật, rồi đã dừng. |

### Kiểm tra chưa chạy được

- Full BE HTTP integration, truy vấn PostgreSQL và concurrency test: `.env.test` xác định riêng `127.0.0.1:55432/tin_lam_test`, khác host/database trong `.env`, nhưng PostgreSQL không lắng nghe tại cổng này. Docker daemon cũng không khả dụng. Không có test thay bằng mock để kết luận tích hợp đã qua.
- Browser/UI demo: không có browser trong phiên CUA; không tạo tài khoản, gửi check-in hay thao tác admin trên server thật.
- Gemini, SMTP, Google login, SePay sandbox webhook/đối soát, Web Push, runtime flags và dữ liệu production: không gọi dịch vụ ngoài hoặc DB thật.
- Migration calendar: chỉ validate/generate schema và đọc migration; chưa apply trên DB test hay DB thật.

## Tác động của cổng publication

- Bài văn hóa chỉ được trả công khai khi active, verified, `PUBLISHED`, đúng loại public/member và vượt hồ sơ provenance/quyền/review hash. Bản từng có cờ verified/approved nhưng thiếu hồ sơ hiện hành sẽ không tự xuất hiện.
- Hướng dẫn nghi lễ và văn khấn công khai phải có trạng thái `PUBLISHED`, review metadata hợp lệ; guide còn cần checklist hợp lệ. Bản chỉ `APPROVED`, chưa publish, bị thu hồi hoặc thiếu checklist sẽ bị ẩn.
- Tín hiệu check-in chỉ được chọn khi trạng thái public và hash nội dung khớp phiên bản duyệt. Sửa bản đã duyệt làm mất approval cũ; cần gửi duyệt, duyệt và publish lại bằng người có thẩm quyền.
- Các cổng này có thể làm giảm hoặc đưa danh sách public về rỗng cho tới khi nhóm hoàn thành review/publish. Không tự review lại, không bỏ cổng để đủ nội dung demo và không sửa DB thật.

## Việc cần con người xác minh — tách khỏi lỗi code

1. Nhóm biên tập/chuyên môn xác nhận từng bài, nghi lễ, lời khấn, tín hiệu: tác giả/nguồn, trang/mục trích dẫn, phạm vi vùng/hoàn cảnh và ngày/người review.
2. Nhóm quyền nội dung xác nhận từng ảnh, nguồn, license, credit, ngữ cảnh dùng và căn cứ quyền; không coi URL tải được là quyền sử dụng.
3. Chủ dự án xác nhận trạng thái các bài đã duyệt trước đây và lập quyết định publish riêng từng bản sau khi kiểm phiên bản. Không tự chuyển sang PUBLISHED.
4. Nhóm thống nhất dữ liệu khảo sát, mẫu số, tiêu chí loại trùng, đối thủ và hồ sơ phỏng vấn; cập nhật slide/đề án sau khi có dữ liệu gốc.
5. Nhóm vận hành xác nhận DB test dùng được, chạy migration calendar trên bản test riêng và kiểm tra migration status trước khi triển khai ở bất kỳ môi trường nào.
6. Nhóm xác nhận policy Gemini/data retention, nội dung privacy notice, quy trình export/xóa tài khoản và người phụ trách yêu cầu xóa phía nhà cung cấp.
7. Chủ dự án xác nhận SePay sandbox, cờ bán hiện hành, tài khoản hội viên thử nghiệm và quyền lợi được công bố. Không bật bán thật.
8. Nhóm kiểm tra tích hợp đăng nhập Google, email, proxy/cookie, push, HTTPS và deploy trên staging.

## Tài khoản và dữ liệu thử cần chuẩn bị

Chuẩn bị trong môi trường staging/DB test riêng; không ghi mật khẩu vào tài liệu hoặc gửi qua demo:

- Một tài khoản guest chưa đăng nhập, một tài khoản Free `User A`, một tài khoản Free khác `User B`, và một tài khoản ADMIN.
- Nếu cần demo quota Premium: một subscription test đang hiệu lực trên DB test với lịch sử quota có kiểm soát; không tạo thanh toán thật. Không seed vào DB thật.
- Một bài văn hóa public có người review/provenance/quyền đã được nhóm xác nhận; một bài draft hoặc revoked để kiểm tra ẩn.
- Một hướng dẫn nghi lễ PUBLISHED có checklist ổn định và review metadata; một bản chưa publish để kiểm tra không xuất hiện.
- Tín hiệu check-in PUBLISHED cho cảm xúc/bối cảnh cần demo; ít nhất vài check-in test ở nhiều cảm xúc, có bản chưa lưu sổ và bản đã lưu ở các tuần/tháng khác nhau.
- Hai phiên admin hoặc hai cửa sổ mở cùng một bản signal để tái hiện xung đột phiên bản. Dùng dữ liệu biên tập giả lập; không thay quyền/nguồn thành dữ liệu giả rồi publish.
- Nếu trình diễn thanh toán trạng thái: merchant/account sandbox của SePay và giao dịch giả lập không có tiền thật; chỉ khi nhóm xác nhận môi trường và flags phù hợp.
- Dùng ngày sinh tổng hợp, không dùng dữ liệu cá nhân thật khi minh họa AI theo năm.

## Kịch bản demo tổng theo thứ tự

Chạy trên staging/DB test được nhóm xác nhận. Nếu API hoặc mạng không khả dụng, dừng thao tác cần server và trình bày lỗi/retry; không thay bằng số liệu mẫu.

1. **Đăng ký/đăng nhập** — Mở đăng ký với tài khoản thử mới, hoàn tất theo quy trình nhóm đã chuẩn bị; đăng xuất rồi đăng nhập lại. Kỳ vọng: phiên được tạo/khôi phục, màn hình tài khoản nhận đúng trạng thái; không trình chiếu thông tin xác thực.
2. **Văn hóa** — Mở Khám phá văn hóa, tìm/lọc theo chủ đề và vùng, mở bài đã được nhóm review, xem provenance/trạng thái, bấm lưu rồi mở danh sách đã lưu. Kỳ vọng: nội dung và nguồn lấy từ BE, bookmark theo tài khoản; bài draft/revoked không có trong public. Nếu không có bài đủ gate, báo đây là chặn dữ liệu review, không bật gate.
3. **Nghi lễ** — Mở hướng dẫn đã PUBLISHED, xem phạm vi/nguồn và checklist, đánh dấu vài việc, rời trang rồi mở lại; thử reset. Kỳ vọng: checklist BE là nguồn nội dung, tiến độ giữ trên trình duyệt theo tài khoản/guide; guide chưa phát hành hoặc thiếu checklist không được trình bày như nội dung đã duyệt.
4. **Check-in khách và user** — Ở guest, chọn cảm xúc/bối cảnh và nhận kết quả; chưa lưu. Đăng nhập User A, thực hiện check-in và lưu lời chiêm nghiệm; mở lại từ sổ tay. Kỳ vọng: guest nhận nội dung public hiện hành; user chỉ thấy bản của mình, response lưu là snapshot của server, không thay bằng nội dung mẫu nếu API lỗi.
5. **Lịch sử cảm xúc** — Với User A có check-in test đã chuẩn bị, mở Góc của tôi → Nhìn lại hành trình; đổi tuần/tháng, lùi/tiến kỳ, lọc cảm xúc và chuyển trang. Kỳ vọng: tổng/phân bố giữ toàn bộ cảm xúc của mọi check-in còn lưu; bộ lọc chỉ đổi danh sách; ngày trống là thiếu dữ liệu; lỗi API hiện thử lại, không hiện số giả.
6. **Minh bạch AI** — Mở disclosure ngay tại check-in; chỉ ra mood/context gửi Gemini khi nhánh AI dùng, không gửi ghi chú/lịch sử. Mở diễn giải theo năm bằng ngày sinh tổng hợp, đọc thông báo và consent trước khi tạo. Kỳ vọng: nếu Gemini khả dụng, chỉ request dữ liệu đã mô tả; nếu không, check-in dùng nội dung biên tập sẵn và yearly báo chưa khả dụng; không trình bày như dự đoán/chẩn đoán.
7. **Hội viên/quota** — Mở bảng Free/Premium, so với footer và tài khoản; đọc hạn dùng, số lượt đã dùng/còn lại và `nextUsableAt` nếu có. Kỳ vọng: các màn hình cùng response BE; Free không được tạo yearly AI; Premium test tuân quota 3 bản/5 lần gọi mỗi 24 giờ; trạng thái sandbox hiển thị đúng. Không thanh toán tiền thật.
8. **Admin xuất bản/thu hồi** — Vào admin bằng ADMIN; thử lưu bản nháp, gửi duyệt, duyệt riêng, rồi publish riêng; kiểm tra public. Thu hồi bản test đã được nhóm xác nhận và kiểm tra public lần nữa. Kỳ vọng: DRAFT không thể duyệt trực tiếp; duyệt+publish một request trả 422; public chỉ thấy bản đủ gate; revoke ẩn bản và ghi audit. Không dùng bài/ảnh chưa được nhóm xác nhận.
9. **Xung đột phiên bản** — Hai cửa sổ admin mở cùng một bản signal, lưu/sửa từ cửa sổ A; từ cửa sổ B gửi bản stale hoặc duyệt version cũ. Kỳ vọng: request B trả 409, không ghi đè bản mới, không duyệt nhầm và không thêm audit cho CAS thất bại; tải lại trước thao tác tiếp.
10. **Cách ly tài khoản** — Lưu một bài/checklist/check-in với User A, đăng xuất rồi đăng nhập User B trên cùng trình duyệt. Kỳ vọng: danh sách server-side của B không chứa bản A; bookmark/checklist local có namespace tài khoản riêng. Kiểm tra lần nữa khi quay lại A.
11. **Mất mạng** — Tắt mạng hoặc chặn API trên môi trường test sau khi tải app. Thử tải lịch sử, lưu bài/check-in và mở nội dung chưa tải. Kỳ vọng: yêu cầu server báo lỗi/thử lại, không thông báo lưu thành công và không sinh số liệu mẫu; chỉ nội dung đã tải/local cache còn xem được. Khôi phục mạng và tải lại để đối chiếu server.

## Danh sách file thay đổi và lý do

Các mục dưới gồm toàn bộ working tree đã có trên nhánh khi bắt đầu lần rà soát này, cộng thay đổi trong lần này. Nhiều file đã dirty từ các lượt trước; không ghi đè hay loại bỏ các thay đổi đó.

### Backend

- `BE/prisma/schema.prisma`, `BE/prisma/migrations/20261019120000_calendar_events_updated_at/migration.sql` — khai báo version calendar và chuẩn bị cột phục vụ editor/CAS; migration chưa áp dụng.
- `BE/src/controllers/content.controller.js`, `mood.controller.js`, `payment.controller.js`; `BE/src/routes/admin.routes.js`, `member-library.routes.js`, `mood.routes.js`; `BE/src/validators/admin.validator.js`, `content-editor.validator.js`, `mood.validator.js`, `signal-admin.validator.js` — response/route/validation cho publication, version, mood history và membership status.
- `BE/src/repositories/admin.repository.js`, `analytics.repository.js`, `content-editor.repository.js`, `content.repository.js`, `mood.repository.js`, `signal.repository.js`; `BE/src/services/admin.service.js`, `content.service.js`, `culture-publication.js`, `editorial-workflow.js`, `horoscope.service.js`, `mood.service.js`, `payment.service.js`, `signal-admin.service.js` — publication gate, pagination, review/version CAS, timezone summary, quota và benefits. Riêng `content.repository.js`/`content.service.js` được gia cố lần này để nghi lễ/văn khấn chỉ trả khi PUBLISHED và guide có checklist.
- `BE/tests/admin.test.js`, `content-catalog.test.js`, `content-editor.validator.test.js`, `content-review-metadata.test.js`, `culture-publication.test.js`, `editorial-workflow.test.js`, `mood-idempotency.unit.test.js`, `payment.test.js`, `signal-admin.unit.test.js` — regression cho gate, workflow, version, pagination, history, quota và membership. Trong lần này cập nhật fixture/thêm kiểm tra repository + public detail nghi lễ.

### Frontend

- `FE/src/App.tsx`, `FE/src/admin/AdminApp.tsx`, `FE/src/admin/ContentEditor.tsx`, `FE/src/admin/SignalAdminPanel.tsx` — route/navigation và thao tác editor/review với version, trạng thái và dữ liệu BE.
- `FE/src/components/AppFooter.tsx`, `MembershipCheckout.tsx`, `YearlyReading.tsx`, `MoodHistoryPanel.tsx`; `FE/src/data/adminService.ts`, `contentService.ts`; `FE/src/screens/AccountScreen.tsx`, `CultureScreen.tsx`, `HoroscopeScreen.tsx`, `MembershipScreen.tsx`, `MoodCheckInScreen.tsx`, `MoodJourneyScreen.tsx` — nội dung MVP, trạng thái/error, minh bạch AI, mood history, quota/quyền lợi và trạng thái hội viên. `MoodHistoryPanel.tsx` là file mới.

### Editorial, scripts và tài liệu

- `editorial/culture-source-audit.md`, `editorial/culture-review-records.json`, `scripts/compile-audit.js`, `scripts/generate-audit-file.js`, `scripts/culture-review-status.js` — trạng thái hồ sơ editorial không tự khẳng định thẩm định/xuất bản.
- `Danh-gia-tong-the-Tin-Lam-Tam-Linh-2026-10-19.md`, `KET-QUA-HOAN-THIEN.md`, `BO-SUNG-SAN-PHAM.md` — báo cáo đầu vào/kết quả các lượt trước, được giữ nguyên làm lịch sử.
- `Tin-Lam-Tam-Linh-Requirements-Tong-Hop.md` — cập nhật trạng thái SePay, AI/history/quota để không còn mô tả VNPay hoặc hội viên sai code hiện tại.
- `BAN-GIAO-DEMO-TONG.md` — tài liệu bàn giao hiện tại.

## Kết luận bàn giao

Các sửa chữa code có thể làm và kiểm tra offline đã được thực hiện trong phạm vi. FE/BE unit, FE build/typecheck và Prisma schema checks qua. PostgreSQL test riêng đã được nhận diện nhưng không hoạt động; browser không có sẵn. Nội dung văn hóa/nghi lễ/ảnh, dữ liệu tài khoản, trạng thái runtime, tích hợp ngoài và UI E2E vẫn cần nhóm xác minh. Vì vậy chưa có bằng chứng để kết luận sản phẩm đã hoàn thiện 100% hoặc sẵn sàng mở bán.
