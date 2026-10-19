# Đánh giá tổng thể sản phẩm Tin Lắm Tâm Linh

Ngày rà soát: 19/10/2026. Bản code: tin-lam-tam-linh(20261019-063932).zip.

## Kết luận và quyết định đề xuất

Dự án đã vượt giai đoạn ý tưởng và giao diện minh họa: có FE React/TypeScript, API Express, schema PostgreSQL/Prisma, quy trình biên tập, kiểm soát phiên, lưu dữ liệu cá nhân và nền tảng thanh toán. Ba luồng MVP đã có triển khai đáng kể. Tuy nhiên, chưa đủ bằng chứng để nghiệm thu là sản phẩm hoàn chỉnh hoặc mở bán thật.

Khoảng cách còn lại tập trung vào tính nhất quán của quy trình xuất bản, chất lượng và chứng cứ nội dung, kiểm thử với database và dịch vụ thật, sự thống nhất giữa tài liệu và sản phẩm, cùng kiểm chứng người dùng/khả năng chi trả. Chưa cần thêm hàng loạt tính năng để giải quyết các khoảng cách này.

Nên giữ ba luồng đã chốt làm phạm vi nghiệm thu đợt đầu: đọc/lưu bài văn hóa; đọc hướng dẫn/checklist nghi lễ; check-in/nhận/lưu/xem lại lời chiêm nghiệm. Các tính năng ngoài phạm vi này có thể tiếp tục phát triển nhưng cần ghi trạng thái riêng và không trở thành điều kiện làm MVP kéo dài vô hạn.

Không quy đổi thành một phần trăm tổng tùy ý: chưa có danh sách yêu cầu được gán trọng số và dữ liệu nghiệm thu runtime. Build, test unit, thẩm định nội dung và chứng minh giá trị kinh doanh là các loại bằng chứng khác nhau.

## 1. Phạm vi và giới hạn của cuộc rà soát

### Nguồn đã sử dụng

| Nguồn | Vai trò thực tế |
|---|---|
| Checkpoint2-1.docx | Khung hướng dẫn/yêu cầu nghiên cứu Checkpoint 2; không phải báo cáo nghiên cứu đã hoàn thành |
| Checkpoint2-2.docx | Bản nghiên cứu thị trường, biểu đồ khảo sát, phân tích chuyên gia và mô hình 7P |
| ĐánhgiáCheckpoint2.docx | Bản diễn giải nhận xét và đề xuất sửa sản phẩm/kinh doanh; chính tài liệu nói đây không phải rubric chính thức |
| Tin-Lam-Tam-Linh-Requirements-Tong-Hop.md | Bản phát triển lại từ ý tưởng Checkpoint 1 theo xác nhận của chủ dự án; đồng thời chứa SRS, demo, tài chính và roadmap |
| Archive code ngày 19/10 | FE, BE, shared, Prisma/migrations, tests, editorial, scripts và các cấu hình được đóng gói |

Đã giải nén và lập danh mục archive gồm 2.981 mục. FE/src có 177 file, khoảng 73.928 dòng; BE/src có 194 file, khoảng 8.867 dòng, gồm cả file giữ chỗ. Có 28 migration SQL. Đây là số lượng tệp/dòng, không phải thước đo hoàn thiện.

Đã đọc tài liệu văn bản và xem các hình nhúng, kiểm tra cấu trúc nguồn, lần theo các luồng nghiệp vụ và đọc sâu các thành phần có ảnh hưởng trực tiếp đến tính đúng đắn, quyền truy cập, biên tập, thanh toán, lưu/xóa dữ liệu. Đây không phải chứng nhận kiểm toán độc lập từng dòng của hơn 82.000 dòng nguồn, cũng không phải chứng nhận mọi tài sản, trích dẫn và tích hợp đã được xác minh.

Không thay đổi code nghiệp vụ, không import/publish nội dung, không chạy migration lên DB thật, không gửi email/push và không tạo giao dịch. Cài dependencies và generate Prisma Client chỉ phục vụ kiểm tra bản giải nén.

### Bằng chứng chạy kiểm tra

| Kiểm tra | Kết quả | Phạm vi kết luận |
|---|---|---|
| FE `npm run lint` | Qua | TypeScript `tsc --noEmit`; đây không phải bộ ESLint toàn diện |
| FE `npm run build` | Qua | Tạo được production bundle; chưa chứng minh cấu hình triển khai đúng |
| FE `npm run test:unit` | 24/24 qua | Logic được viết test; có test render provenance, không phải kiểm thử trình duyệt đầu-cuối |
| BE `npm run test:unit` | 118/118 qua | Các nhánh unit được chỉ định trong package.json; không bao gồm toàn bộ integration suite |
| Prisma generate/validate | Qua | Client tạo được và schema hợp lệ; không chứng minh DB đã migrate đủ |
| FE check:content | Qua | Liên kết/dữ liệu theo bộ kiểm tra; báo 0 thẻ xăm truyền thống đủ điều kiện ở các tổ hợp được kiểm |
| FE check:calendar | Qua | Fixture của script cho 13/10/2026; không phải kiểm chứng mọi ngày/năm |
| FE check:xam-flow | 10 kiểm tra qua | Logic theo script; không chứng minh nội dung xăm đã được duyệt |
| Validate culture batches | 200 bài, 20 batch; không lỗi schema/trùng slug/tiêu đề theo script | Không phải thẩm định lịch sử, văn hóa hoặc chứng nhận quyền sử dụng |
| Kiểm kê DB ở chế độ chỉ đọc | Không hoàn tất | Kết nối Supabase lỗi DNS `EAI_AGAIN`; chưa lấy được số bài xuất bản, người dùng, hội viên hay migration đang áp dụng |

Test FE ban đầu thiếu Prisma Client do cài dependencies không chạy lifecycle scripts. Sau generate client, chạy lại đạt 24/24. Không coi lỗi thiết lập ban đầu là lỗi chức năng của sản phẩm.

Chưa chạy toàn bộ integration suite với PostgreSQL test: không có PostgreSQL test hoạt động trong môi trường rà soát. Chưa kiểm thử UI trên server đang chạy, thiết bị thật, email, Google OAuth, Gemini, SePay sandbox hoặc Web Push đầu-cuối. Mọi kết luận tương ứng phải giữ nhãn chưa xác nhận.

## 2. Dự án đã đi được những gì

| Mảng | Đã có bằng chứng trong bản gửi | Việc còn lại để nghiệm thu |
|---|---|---|
| Ý tưởng/định vị | Problem, persona, UVP, Lean Canvas, phạm vi MVP, roadmap | Chọn một phân khúc ưu tiên, thống nhất lời hứa sản phẩm và tiêu chí thành công |
| Nghiên cứu thị trường | Biểu đồ khảo sát, hành vi, rào cản niềm tin, đánh giá tính năng; tổng hợp phỏng vấn | Đối chiếu dữ liệu gốc, mẫu số, nguồn tăng trưởng, hồ sơ phỏng vấn và bằng chứng chi trả |
| Auth/tài khoản | Register/login/Google/reset password, JWT, refresh cookie HttpOnly, rotate token, kiểm tra trạng thái tài khoản | Kiểm thử tích hợp và triển khai thật; chứng minh SMTP/OAuth hoạt động |
| Văn hóa | Danh sách từ BE, tìm/lọc FE, trang đọc/nguồn, bookmark; 200 bản thảo | Gia cố cổng public, đồng bộ danh mục, duyệt và xuất bản nội dung thực tế |
| Nghi lễ | API trả steps/checklist/offerings/prayers; provenance, metadata người duyệt; lưu tiến độ local theo tài khoản | Kiểm thử admin→public và nội dung đủ dùng; xử lý phân trang sau lọc |
| Check-in | Catalog chung, chọn mood/context, trả nội dung được phép, lưu snapshot, chữ ký kết quả khách, idempotency, ownership | Sửa nhánh đổi kết quả thiếu reviewer; kiểm coverage nội dung thật và các tình huống tài khoản/mất mạng |
| Admin | CRUD, tìm/lọc/phân trang, trạng thái biên tập, log; ADMIN guard trên BE | Đồng nhất state machine cho mọi loại nội dung và chống chỉnh sửa/duyệt đồng thời |
| Dữ liệu cá nhân | AES-GCM cho một số trường nhạy cảm, lưu private local bằng IndexedDB key, xóa nội dung cá nhân | Mô tả đúng phạm vi mã hóa/lưu trữ; kiểm tra xóa thật và chính sách dữ liệu |
| Xin xăm/xin keo | API rút/lưu, kết quả ký cho khách, kiểm nguồn, gieo keo và lịch sử | Nội dung truyền thống đủ điều kiện; nghiệm thu trải nghiệm riêng, không gọi mọi thứ là xăm 3D hoàn chỉnh |
| Wish/hoa đăng/Zen/3D | Có triển khai tương tác; Wish đã import cảnh SouthernRiverScene; Zen có Web Audio | Đo hiệu năng, kiểm quyền tài sản/âm thanh, kiểm dùng thật; cập nhật Requirements đã cũ |
| Hội viên/thanh toán | SePay checkout/IPN/đối soát, idempotency, kiểm tiền/môi trường, khóa transaction, gia hạn, quota AI | Sandbox E2E, quyền lợi thật, xử lý hỗ trợ/hoàn tiền và chuẩn bị production |
| Vật phẩm/B2B | Inventory, trừ lượt, trang trí, quà gói năm, form đối tác, quà đối tác, audit | Xác nhận trải nghiệm/đối tác và giao dịch thật; không gọi form liên hệ là doanh thu B2B |
| Analytics | Consent, event API, summary, activation/retention theo event, quyền ADMIN | Sửa định nghĩa MAU/múi giờ, kiểm event đủ và dữ liệu bị thiên lệch bởi consent |

Bookmark và checklist lưu trên trình duyệt theo tài khoản là đúng phạm vi MVP ghi trong Requirements. Chưa đồng bộ đa thiết bị không tự động là lỗi thiếu yêu cầu. Muốn đưa thành quyền lợi sản phẩm phải xây backend và migration tương ứng.

## 3. Tài liệu và nghiên cứu cần chỉnh

### 3.1 Thống nhất mẫu khảo sát bằng dữ liệu gốc

Checkpoint2-2 ghi N=150 ở phần 3/3.1, N=154 tại nhiều đoạn và trên ảnh Google Forms. Requirements ghi 148 lượt, 144 email duy nhất. Một tài liệu editorial cũ còn nhắc 382 người. Không thể tự chọn số đúng chỉ bằng các bản mô tả này.

Ảnh Google Forms là bằng chứng có màn hình báo 154 responses, chưa chứng minh tất cả là phản hồi hợp lệ/duy nhất. Email duy nhất cũng chưa tự động tương đương người hợp lệ.

Việc cần làm: xuất bảng gốc, lưu bản bất biến và bản làm sạch; ghi thời điểm chốt; xác định loại trùng/không hợp lệ; công bố số trước/sau và mẫu số từng câu. Sau đó cập nhật đồng bộ CP1, CP2, slide, pitch và editorial. Không tạo thêm phản hồi để khớp một con số mong muốn.

### 3.2 Giảm mức khẳng định về thị trường

Các biểu đồ hiện có hỗ trợ nhận định có nhu cầu và rào cản niềm tin trong mẫu. Chưa đủ để suy ra toàn bộ Gen Z Việt Nam, volume giao dịch, chuyển đổi trả phí hoặc product–market fit.

Biểu đồ The Economist nhúng trong CP2 ghi United States, 13-to-17-year-olds và nguồn Pew Research Centre, khảo sát 2018. Chỉ nên dùng làm bối cảnh quốc tế và nêu đúng đối tượng, không trình như thống kê áp lực của sinh viên Việt Nam 18–24.

Các ảnh Google Trends có dao động/đỉnh mùa vụ và không đồng nhất hướng tăng. Chưa có chuỗi xuất CSV và cách tính để kết luận mọi từ khóa tăng mạnh. Chỉ số quan tâm tìm kiếm không phải quy mô doanh thu và không tự tạo ra CAGR ngành 12–15%.

Mức CAGR 12–15%, TAM 20–25 triệu, SAM 5–7 triệu và SOM 150–200 nghìn cần nguồn/công thức/phạm vi. Nếu chưa có, ghi giả định và tính SOM từ kênh tiếp cận, số người được mời, activation, retention và năng lực phục vụ.

Đoạn “khảo sát chứng minh có dòng tiền giao dịch thực tế” cần sửa: câu trả lời về mức giá là ý định/nhận định, không phải hóa đơn hoặc thanh toán. Bản gửi chưa cung cấp dữ liệu giao dịch để xác nhận kết luận đó.

### 3.3 Đối thủ và phỏng vấn chuyên gia

CP2 vẫn so sánh các nhóm chung như TikTok/web cũ/app phương Tây. Chưa trả lời đủ nhận xét trong bản đánh giá về đối thủ cụ thể và vì sao khách hàng chọn sản phẩm.

Nên chọn 3–5 dịch vụ cụ thể; phân loại trực tiếp/thay thế theo đúng nhu cầu; ghi giá/ngày kiểm tra, chức năng, quyền riêng tư, nguồn nội dung và điểm mạnh/yếu cân bằng. Không dùng “cao tuyệt đối”, “độc quyền” hoặc nhận định tất cả đối thủ đều kém tin cậy khi chưa có chứng cứ.

Tổng hợp phỏng vấn đã có insight dùng được nhưng cần hồ sơ người tham gia, vai trò, thời gian, câu hỏi, bản ghi/ghi chú đã được phép dùng và phát biểu hỗ trợ từng kết luận. Ý kiến Tarot Reader không tự trở thành thẩm định chuyên môn tâm lý, y tế hoặc văn hóa cho toàn sản phẩm.

### 3.4 Đồng bộ CP1/SRS với code mới

Requirements cập nhật 13/10 đã tụt sau bản code 19/10: thanh toán mới dùng SePay; đã có gói tháng/năm, thư viện hội viên, inventory và cảnh hoa đăng kết nối Wish ở mức code. Không còn đúng khi mô tả tất cả chỉ là ô đăng ký email hoặc Wish chưa nối cảnh.

Ngược lại, có code chưa đồng nghĩa đang mở bán. `.env` bản gửi đặt `MEMBERSHIP_SALES_ENABLED=false`, `DIGITAL_SALES_ENABLED=false`, `SEPAY_ENV=sandbox`. Không bật các cờ chỉ để làm tài liệu trông hoàn thành.

Nên tách thành bốn tài liệu ngắn: định vị/giả thuyết kinh doanh; SRS MVP có AC; ma trận trạng thái triển khai/nghiệm thu; roadmap. Bỏ các câu tự bảo đảm “Top 1”, “điểm tuyệt đối” khỏi phần tiêu chí kỹ thuật.

## 4. Các phát hiện kỹ thuật cần xử lý

Ưu tiên A: trước khi mở pilot công khai hoặc thu tiền. Ưu tiên B: trước nghiệm thu tổng. Ưu tiên C: nâng chất lượng vận hành/mở rộng. Mức ưu tiên là đề xuất cho sản phẩm, không phải điểm CVSS hay xác nhận đã xảy ra sự cố.

### A1 Báo cáo 200 bài tự gán trạng thái đã xác minh

**Bằng chứng:** `scripts/generate-audit-file.js` đặt `let status = "VERIFIED_WITH_SOURCE"` cho từng bài. Phần văn bản mẫu còn nói đã trực tiếp đối chiếu toàn bộ. Script không thực hiện việc đọc sách hoặc thẩm định từng claim.

**Tác động:** báo cáo 100% verified có thể bị hiểu là chứng cứ chất lượng trong khi thực tế mới có trường tham chiếu và cấu trúc hợp lệ. Đây là lỗi của quy trình/chứng cứ, không có nghĩa mọi bài đều sai.

**Sửa:** tách `STRUCTURE_VALID`, `SOURCE_IDENTIFIED`, `SOURCE_CHECKED`, `CONTENT_REVIEWED`, `PUBLISHED`; trạng thái thẩm định lấy từ hồ sơ có người/ngày/phiên bản/bằng chứng. Script tổng hợp không được tự tạo sự kiện thẩm định.

**Nghiệm thu:** chạy lại generator không thể biến một bài chưa đối chiếu thành đã xác minh; chọn bất kỳ bài đã duyệt đều truy được bản nguồn và nội dung được duyệt.

### A2 Cổng public bài văn hóa chưa yêu cầu trạng thái xuất bản

**Vị trí:** `BE/src/repositories/content.repository.js`, `listArticles` và `findArticle`.

**Bằng chứng:** truy vấn chỉ yêu cầu `active:true`, `verified:true`, `members_only:false`; thiếu `editorial_status:"PUBLISHED"`. Public DTO cũng không áp lại điều kiện `hasPublishableCultureContent`/hồ sơ review. Luồng dữ liệu chuẩn hiện có thể giữ các cờ đồng bộ, nhưng API public chưa tự bảo vệ khi dữ liệu cũ/import/đồng thời làm chúng lệch nhau.

**Sửa:** một predicate xuất bản thống nhất, dùng ở list/detail/member-library; kiểm đúng phiên bản đã duyệt và provenance. Không để FE chịu trách nhiệm chính về cổng này.

**Nghiệm thu:** bản ghi DRAFT/IN_REVIEW/APPROVED/HIDDEN/REVOKED không bao giờ được trả công khai, kể cả khi cờ active/verified sai; bản published thiếu hồ sơ bắt buộc bị từ chối phù hợp. Chưa xác nhận DB hiện có bản ghi gây lộ.

### A3 State machine duyệt chưa đồng nhất

**Vị trí:** `editorial-workflow.js`, `admin.repository.js:updateReview`; so với `signal-admin.service.js:review`.

**Bằng chứng:** gọi `stateAfterReview` với DRAFT và `verified:true` trả APPROVED. Nhánh nội dung chung không bắt buộc trạng thái trước là IN_REVIEW; nhánh signal có kiểm tra này. Khi patch đồng thời verified/active có thể duyệt và publish trong một bước.

**Sửa:** quy định rõ transition ở BE cho culture/ritual/prayer/calendar/xam; chỉ chấp nhận duyệt phiên bản IN_REVIEW. Nếu sản phẩm chủ ý cho phép duyệt và xuất bản cùng lúc thì phải ghi AC tương ứng, không mô tả là hai bước bắt buộc độc lập.

**Nghiệm thu:** gọi API trực tiếp không đi vòng được quy trình; FE và BE có cùng ma trận transition; mọi thao tác có audit đúng.

### A4 Chỉnh sửa và duyệt đồng thời chưa được khóa theo phiên bản ở nội dung chung

**Bằng chứng:** `content-editor.repository.js:save` và `admin.repository.js:updateReview` đọc bản ghi rồi update theo `id`, không kiểm expected version/content hash của bản được người duyệt xem. Transaction riêng lẻ không loại trừ mọi interleaving ở mức mặc định.

**Rủi ro:** admin A mở bản v1, admin B lưu v2; A có thể duyệt nội dung mới mà chưa xem. Nhánh signal có content hash kiểm khi phát hành, là mẫu tốt hơn nhưng vẫn cần bảo vệ thao tác của người dùng khỏi duyệt nhầm phiên bản.

**Sửa:** thêm version/updated_at hoặc content hash trong request review và điều kiện update; lock bản ghi khi cần. Mâu thuẫn trả 409 và yêu cầu tải lại.

**Nghiệm thu:** test đồng thời bằng PostgreSQL thật cho edit/review/publish; không phiên bản nào được public nếu chưa được người duyệt xác nhận đúng phiên bản đó. Đây là rủi ro xác định từ code, chưa phải race đã tái hiện trên DB thật.

### A5 Chưa có bằng chứng tích hợp và triển khai đầu-cuối

Unit tests hiện qua nhưng không đủ xác nhận migration, transaction concurrency, OAuth redirect/cookie, email, model Gemini, webhook và quyền lợi trả phí.

**Sửa:** dựng staging riêng; migrate database test; chạy full suite, SePay concurrency test và các tình huống UI. Kiểm tra FE production dùng API đúng, SPA rewrite, HTTPS, webhook công khai đúng endpoint, cookie theo topology thực tế, khóa mã hóa được sao lưu và restore thử.

**Nghiệm thu:** có log/ngày/bản build/kết quả từng flow; không thay test DB bằng DB người dùng thật. Với FE/API khác site, phải kiểm cookie SameSite thực tế; không kết luận chỉ từ cấu hình CORS.

### B1 Bộ lọc văn hóa không khớp danh mục 200 bài

**Vị trí:** `FE/src/screens/CultureScreen.tsx:CATEGORIES` và dữ liệu `editorial/culture-batches`.

FE có 5 lựa chọn nhóm ngoài “Tất cả”, còn 200 bài có 11 tên nhóm. Có 146/200 bản thảo thuộc tên nhóm không có lựa chọn tương ứng trên FE, ví dụ Tín ngưỡng dân gian, Nghệ thuật dân gian, Nghề thủ công, Diễn xướng dân gian. Chúng vẫn có thể hiện ở “Tất cả” hoặc tìm kiếm; không phải biến mất khỏi hệ thống.

**Sửa:** catalog category key dùng chung hoặc sinh bộ lọc từ danh mục public; chuẩn hóa nhãn tương đương trước import. Cân nhắc hiển thị Toàn quốc tương ứng 34/200 bài NATIONWIDE.

**Nghiệm thu:** mọi bài public thuộc được ít nhất một lựa chọn nhóm/vùng phù hợp; không phụ thuộc đúng chuỗi tự do do biên tập viên gõ.

### B2 Đổi lời chiêm nghiệm thiếu reviewer include

**Vị trí:** `BE/src/repositories/signal.repository.js:findNextForMoodContext`.

Các query khác có `include:reviewerInclude`, query tìm lời tiếp theo không có. `toPublicSignal` chỉ trả tên/ngày duyệt khi `row.reviewer.full_name` tồn tại. Do đó nút đổi lời có thể trả nội dung publishable nhưng thiếu metadata người duyệt.

**Sửa:** dùng cùng projection/include cho mọi nhánh trả signal; thêm test refresh signal và metadata trên FE.

### B3 Phân trang nghi lễ lọc điều kiện sau khi lấy trang

**Vị trí:** `content.service.js:listRituals` và `FE/src/data/contentService.ts:loadAllItems`.

BE lấy limit/offset trước rồi bỏ các nghi lễ không có reviewMetadata. FE dừng khi số item trả về ít hơn pageSize. Nếu trang đầu có bản không đủ metadata, FE có thể dừng sớm dù phía sau vẫn còn bản hợp lệ.

**Sửa:** đưa eligibility vào truy vấn hoặc trả cursor/hasMore dựa trên dữ liệu gốc và tiếp tục lấy đủ trang hợp lệ. Thêm stable tie-break bằng id khi phân trang.

**Nghiệm thu:** fixture trên 100 nghi lễ, có bản chưa đủ review ở trang đầu, vẫn tải được mọi bản hợp lệ phía sau. Mức ảnh hưởng hiện tại tùy số bản trong DB, chưa xác định.

### B4 Ảnh có nguồn chưa được cổng hiển thị chấp nhận

**Bằng chứng:** registry có 20 hồ sơ, 0 hồ sơ `reviewStatus:"APPROVED"`. `findApprovedImage` còn yêu cầu reviewedBy/reviewedAt/artist/license/nguồn cụ thể. `UnverifiedImage` vì vậy dùng bố cục không ảnh cho những hồ sơ này.

Đây là hành vi bảo vệ đã thiết kế, không phải lý do xóa cổng. Nhưng “đã tải ảnh thật” chưa đồng nghĩa “ảnh đang được hiển thị”. Cổng ảnh global còn độc lập với metadata được duyệt trong admin; cần thống nhất cách quản trị để admin không duyệt xong mà UI vẫn không hiện.

**Sửa:** chọn ít ảnh chủ đạo, đối chiếu đúng tài sản/nguồn/giấy phép/ngữ cảnh, ghi reviewer; cung cấp credit và các nghĩa vụ giấy phép phù hợp. Hoặc chủ động dùng thiết kế không ảnh đẹp. Không tự điền reviewer giả cho đủ trường.

### B5 Thông tin hội viên hiển thị không thống nhất

`MembershipCheckout` lấy trạng thái từ BE, nhưng `AppFooter.tsx` hardcode “chưa mở bán” và “thanh toán và quyền lợi chưa khả dụng”. Hiện sales=false nên chưa mâu thuẫn trạng thái bán; khi bật hoặc với tài khoản hội viên đang hoạt động, copy có thể sai.

**Sửa:** dùng nguồn trạng thái chung cho footer/trang giá/checkout/account; tách “có triển khai”, “đang mở bán”, “đang hoạt động với tài khoản này”. Không thêm cam kết AI không giới hạn/7 ngày trial nếu chưa triển khai và nghiệm thu.

### B6 Analytics cần định nghĩa đúng trước khi dùng bảo vệ đề án

`analytics.repository.js` tính mau theo đầu tháng lịch, không phải rolling 30 ngày; SQL dùng CURRENT_DATE/date_trunc theo timezone DB. Identity chủ yếu anonymous_id theo thiết bị, khác người dùng duy nhất. Consent làm tập dữ liệu chỉ phản ánh nhóm đồng ý tracking. Một chuỗi unavailableMetrics vẫn nói chưa tích hợp thanh toán dù code đã có SePay.

**Sửa:** ghi rõ calendar-month hay rolling-MAU, timezone Asia/Ho_Chi_Minh, identity, cohort và consent coverage; đối chiếu event bằng thao tác thật. Không báo các chỉ số này như số người toàn hệ thống khi định nghĩa khác.

### C1 Hiệu năng và khả năng bảo trì

Build có cảnh báo chunk >500 kB; chunk OrbitControls khoảng 603 kB chưa gzip. App.tsx khoảng 3.484 dòng, nhiều domain/state/effect; archive có các dist cũ và 64 file JS BE trống/giữ chỗ. Không coi số module/tên file là chứng cứ đã làm xong API.

Đo trên mobile thật rồi tối ưu lazy-load cảnh 3D, texture/audio, animation và API. Một số nơi tải toàn bộ nội dung nhiều lần, như related articles; nên API trả danh sách tóm tắt và chỉ tải detail khi mở. Refactor App theo domain sau khi có test bảo vệ luồng, tránh viết lại lớn ngay trước demo.

Service worker cache asset theo cache name cố định; cần kiểm nâng version, asset không hash và offline sau deployment để không giữ nội dung/tài sản cũ. Offline shell không tự đồng nghĩa có dữ liệu offline.

### C2 Dữ liệu riêng tư và vận hành

Có `.env` chứa thông tin kết nối/khóa trong archive. Không có bằng chứng chúng đã bị commit công khai; cũng không được in giá trị vào báo cáo. Nên tạo gói review sạch chỉ có `.env.example`; nếu archive đã gửi ra ngoài nhóm đáng tin, thay các credential liên quan theo dịch vụ.

AES-GCM ở server không phải mã hóa đầu cuối. Chức năng xóa nội dung giữ tài khoản/chứng từ thanh toán; cần ghi rõ UI/chính sách. Chưa thấy flow hoàn chỉnh cho xuất dữ liệu và xóa tài khoản trong API đã mount; đưa vào backlog theo phạm vi sản phẩm công bố.

Rate limit auth dùng Map theo IP trong process, còn API rate limit dùng DB. Khi triển khai sau proxy, cần cấu hình trusted proxy đúng và kiểm nhiều người dùng chung trường/campus không cùng bị khóa. Không bật trust proxy tùy tiện. Theo dõi lỗi dịch vụ/DB, không chỉ có thông báo thành công.

## 5. Riêng bộ 200 bài cần làm gì

Số liệu tự kiểm từ JSON: 200 bài/20 batch; 24 bài có sourceUrl, 176 bài dùng bibliographic reference; 9/200 phần thân đạt 600 đơn vị phân tách bằng khoảng trắng; 200/200 đạt 600 khi cộng cả title/excerpt/headings/body theo script. Đây là cách đếm khoảng trắng, không phải phân tích từ vựng tiếng Việt.

Không bắt buộc kéo dài 191 bài chỉ để đủ 600. Độ dài nên xuất phát từ nhu cầu đọc và tính đầy đủ, không phải tạo câu đệm.

Ví dụ cần xem lại ở `batch-017.json`, slug `le-hoi-ruoc-nuoc-song-hong`: provenance ghép đền Kiếp Bạc với sông Hồng và ghi “Lục Đầu - sông Hồng”. Quyết định 548/QĐ-TTg là văn bản xếp hạng di tích; riêng việc xếp hạng không chứng minh toàn bộ trình tự nghi lễ được mô tả trong bài. Nguồn Bộ VHTTDL và Ủy ban Nhà nước về người Việt Nam ở nước ngoài mô tả hoạt động Kiếp Bạc trên sông Lục Đầu. Cần sửa đúng địa bàn và gắn nguồn hỗ trợ đúng claim, không dùng một quyết định để bao phủ mọi chi tiết.

Không suy từ ví dụ này rằng cả 200 bài đều sai; cũng không suy từ 24 URL cụ thể rằng mọi chi tiết trong 24 bài đã được nguồn xác nhận. Nguồn sách không URL vẫn có thể hợp lệ nếu có đúng tác giả/ấn bản/trang và nhóm thực sự đối chiếu.

Quy trình đề xuất: chọn 10–20 bài tốt nhất cho pilot; ưu tiên bài phục vụ trực tiếp tình huống người dùng; đọc nguồn thật, ghi claim và trang/mục đối chiếu; sửa nhầm lẫn fact/legend/commentary; người có vai trò phù hợp review; import nháp; duyệt và xuất bản qua admin; mở lại public để nghiệm thu. 180–190 bài còn lại giữ backlog, không phải viết lại từ đầu.

Tất cả 200 JSON hiện đặt members_only=false. Chưa thể xem chúng là kho trả phí đã có; thư viện hội viên trong DB thật có thể có dữ liệu riêng nhưng chưa truy vấn được. Không bán quyền đọc thư viện “đã có” trước khi kiểm kê nội dung public/member thực tế.

## 6. AI hiện làm được gì và nên hứa gì

AI check-in hiện nhận mood và context trong prompt; không gửi nguyên nhật ký, không truy cập Facebook/TikTok, không có retrieval từ nguồn văn hóa trong prompt đã đọc. Nội dung văn hóa được BE chọn trước; Gemini tạo thêm reflection và action, tách trong aiExplanation. Nếu không có key, context=general, timeout hoặc output không hợp lệ thì trả lời chiêm nghiệm được biên soạn; không cần AI để ba luồng MVP có giá trị.

Đây là cơ chế tương đối rõ ràng và giảm dữ liệu gửi ra ngoài. Tuy nhiên, không mô tả là chatbot hội thoại thấu hiểu đời sống cá nhân, RAG chuyên gia hay máy tính lá số. AI theo năm có dùng birthDate trong prompt và có giới hạn 3 kết quả/5 lần gọi trong 24h; cần thông báo dữ liệu này trước khi gửi và kiểm quota/chi phí thực tế.

Regex từ cấm và prompt chỉ là một lớp giảm rủi ro, không chứng nhận an toàn tuyệt đối. Nên dùng bộ tình huống kiểm duyệt gồm áp lực học tập, xung đột gia đình, quan hệ không an toàn, yêu cầu dự đoán tai họa, tư vấn tiền bạc và prompt injection; ghi lỗi và cách xử lý. Đánh giá chuyên môn phù hợp khi sản phẩm đưa ra tuyên bố về sức khỏe tinh thần.

## 7. Hoàn thiện mô hình kinh doanh

Hiện code thể hiện giá 29.000đ/tháng, 199.000đ/năm, quyền diễn giải theo năm và các tính năng hội viên/vật phẩm. Giá trong CP2 20–49k và ý tưởng trial/AI không giới hạn không tự trở thành chính sách đang triển khai.

Ba điều cần chứng minh trước mở bán: người dùng hiểu quyền lợi; quyền lợi tồn tại và hoạt động; họ sẵn lòng mua sau khi sử dụng. Một câu trả lời “giá hợp lý” không thay thế mua thật và quay lại dùng.

Nên thử một gói đơn giản với 5–10 người thuộc tệp sau khi họ trải nghiệm miễn phí, ghi họ mua hay từ chối và lý do; chỉ nhận tiền khi các điều kiện giao dịch/quyền lợi đã sẵn sàng. Chưa đủ cơ sở khẳng định AI theo năm là lý do mạnh nhất để trả phí.

Tính lại unit economics theo giá thực thu tháng/năm, tỷ lệ gói, chi phí thanh toán, lượt gọi AI, hoàn tiền, hạ tầng, thời gian biên tập và hỗ trợ. 199.000đ/năm tương đương khoảng 16.583đ/tháng doanh thu bình quân trước chi phí, khác 29.000đ/tháng. Subscription nhận trước cần tách tiền thu với doanh thu phân bổ khi lập kế hoạch.

Bảng tài chính trong Requirements cộng số học nhất quán ở các tổng chính nhưng thiếu công thức liên hệ subscribers, số tháng trả tiền và doanh thu quý. Cần giải thích 450 người × mức giá × thời gian/average paid users thay vì để người đọc tự đoán. Các tỷ lệ doanh thu 60/25/15, retention và 150.000 người là giả định/mục tiêu, không phải kết quả đang có.

## 8. Thứ tự thực hiện để kết thúc được dự án

| Đợt | Việc cần làm | Điều kiện hoàn thành |
|---|---|---|
| 1 Chốt sự thật sản phẩm | Mẫu khảo sát; ma trận phạm vi; đồng bộ SePay/trạng thái bán; sửa generator verified | Mọi con số/claim có nguồn hoặc nhãn giả định; không còn “100% verified” tự sinh |
| 2 Sửa tính đúng đắn | A2–A4, bộ lọc danh mục, reviewer đổi signal, phân trang nghi lễ | Test hồi quy có ý nghĩa và integration PostgreSQL cho race/version |
| 3 Chuẩn bị nội dung pilot | 10–20 bài, 3–5 hướng dẫn thiết thực, đủ signal cho mọi mood/context hiển thị | Có hồ sơ review; public chỉ trả bản hợp lệ; không dẫn người dùng vào luồng rỗng |
| 4 Nghiệm thu đầu-cuối | Auth, ba MVP, admin→public, quyền dữ liệu; dịch vụ ngoài theo phạm vi mở | Có biên bản pass/fail và sửa xong lỗi chặn |
| 5 Pilot và chỉnh UX | 10–15 người thuộc đúng tệp, dùng trên điện thoại; quan sát không hướng dẫn thao tác | Đo hoàn thành, thời gian, lỗi hiểu, lý do quay lại và phiên bản cải tiến |
| 6 Mở thử trả phí | SePay sandbox E2E, quyền lợi đủ, chính sách hỗ trợ, chi phí/giá được chốt | Chỉ mở sau khi test tiền/quyền lợi và kịch bản lỗi đạt; không bắt buộc cho ba MVP |
| 7 Nâng chất lượng dài hạn | Performance, CI, restore backup, logging, refactor theo domain, nội dung mở rộng | Có số đo/kiểm tra phục hồi và người chịu trách nhiệm vận hành |

Các lượng người/bài/hướng dẫn trên là phạm vi thử đề xuất, không phải yêu cầu giảng viên hoặc chứng minh tính đại diện thống kê. Chưa thể hứa số ngày hoàn thành trước khi biết nhân lực và kết quả kiểm thử staging.

## 9. Danh sách nghiệm thu tổng

### Tài khoản và phiên

1. Đăng ký mới, email trùng, mật khẩu/biểu mẫu sai; đăng nhập đúng/sai; đăng xuất.
2. Google login, refresh sau F5, token hết hạn, hai request cùng refresh, hai tab; đổi mật khẩu/reset password.
3. Khi mất mạng không báo nhầm mật khẩu sai hoặc đăng xuất vĩnh viễn; đăng xuất không để request cũ khôi phục phiên.
4. USER vào /admin và gọi admin API trực tiếp đều bị chặn; tài khoản inactive/banned không thao tác được.

### Văn hóa

5. Mở danh sách có dữ liệu; tìm có dấu/không dấu; lọc mọi category/region thực tế.
6. Mở link trực tiếp/F5, đọc nguồn, lưu/bỏ lưu/xem lại trên cùng trình duyệt; storage bị chặn báo đúng.
7. Admin edit/hide/revoke bài đang public; public list/detail đều ngừng trả bản không đủ điều kiện; bookmark cũ xử lý bài bị thu hồi.
8. Preview đúng bản chưa publish; quyền lợi member không truy cập được qua API public.

### Nghi lễ

9. Steps/checklist/prayers đúng BE, không bị local sample ghi đè.
10. Tick/bỏ tick/reset; F5; đổi tài khoản; admin đổi thứ tự/ID checklist; tiến độ không chảy sang tài khoản khác.
11. Nghi lễ thiếu checklist hoặc hồ sơ review không được xuất bản; trang sau vẫn tải đủ khi trước đó có bản không hợp lệ.

### Check-in

12. Mọi mood/context được UI cho chọn đều có nội dung hoặc trạng thái không khả dụng rõ; không hiện giả dữ liệu mẫu.
13. Khách nhận→đăng nhập→lưu vẫn đúng kết quả/ghi chú; đăng nhập bằng hai tài khoản không lẫn dữ liệu.
14. Double click và retry sau timeout không tạo bản trùng; sửa note/different payload với cùng key được xử lý đúng.
15. Đổi lời→metadata reviewer đủ; hoàn thành action chỉ cập nhật sau BE xác nhận đúng check-in.
16. Lưu→mở bằng savedId→F5; AI snapshot được giữ; revoke hiển thị trạng thái thu hồi đúng; xóa bản đang mở không khôi phục bằng cache.
17. Tài khoản B thử ID của A phải bị từ chối; lỗi mạng/401/403/404/503 phân biệt phù hợp.

### Admin và biên tập

18. DRAFT→IN_REVIEW→APPROVED→PUBLISHED; ẩn/hiện giữ approval; edit/revoke vô hiệu approval.
19. Duyệt từ DRAFT hoặc request phiên bản cũ bị chặn; hai admin sửa/duyệt cùng lúc không publish nhầm.
20. Log phân biệt thay đổi visibility với review; thống kê/lọc/pagination chính xác và có tie-break ổn định.

### Thanh toán khi quyết định mở

21. Checkout lặp cùng requestId, mở lại đơn, quay về URL giả/thất bại/hủy; không cấp quyền chỉ vì return URL.
22. IPN sai secret/số tiền/đơn/môi trường bị chặn; IPN đúng lặp/đồng thời chỉ cấp một lần.
23. Hai đơn tranh cùng transaction; hai gia hạn cùng lúc; thanh toán muộn đơn expired/cancelled; mất callback nhưng reconcile thành công.
24. Thư viện và AI đúng entitlement; hết hạn mất quyền phù hợp; quota gồm cả pending/failure đúng thông báo.
25. Quà gói năm, vật phẩm vĩnh viễn trùng, trừ lượt lặp, trang trí đúng sở hữu; refund/void/cảnh báo có người xử lý.

### Vận hành và chất lượng

26. Xóa nội dung cá nhân đúng phạm vi, kiểm DB và trình duyệt; thông báo rõ phần giữ lại.
27. Mobile 360/390px, desktop, dark/light, phóng to chữ, keyboard/focus, reduced motion, mạng chậm, WebGL lỗi.
28. Production build đúng API; deep link rewrite; deployment mới không giữ service worker/assets cũ gây sai.
29. Chạy full suite trên DB test, backup/restore thử và rollback release; lưu kết quả cho đúng phiên bản triển khai.

## 10. Nguồn đối chiếu bổ sung

Các liên kết sau được mở/tìm trong đợt rà soát để kiểm ví dụ nguồn văn hóa, không thay thế thẩm định toàn bộ kho bài:

- Cổng Chính phủ, Quyết định 548/QĐ-TTg ngày 10/5/2012: https://chinhphu.vn/default.aspx?docid=158833&pageid=27160
- Bộ VHTTDL, Bảo tồn và phát huy giá trị Di tích quốc gia đặc biệt Côn Sơn–Kiếp Bạc: https://bvhttdl.gov.vn/Pages/chi-tiet.aspx?url=%2Fbao-ton-va-phat-huy-gia-tri-di-tich-quoc-gia-dac-biet-con-son-kiep-bac-20241204141542499.htm
- Ủy ban Nhà nước về người Việt Nam ở nước ngoài, Đặc sắc lễ hội quân trên sông Lục Đầu: https://scov.gov.vn/ban-sac-van-hoa/dac-sac-le-hoi-quan-tren-song-luc-dau.html
- UNESCO, Then, hồ sơ 01379: https://ich.unesco.org/en/RL/practices-of-then-by-tay-nung-and-thai-ethnic-groups-in-viet-nam-01379
- UNESCO, Lễ hội Bà Chúa Xứ, hồ sơ 01999: https://ich.unesco.org/en/RL/festival-of-ba-chua-x-goddess-at-sam-mountain-01999

Quyết định đề xuất: hoàn thiện và nghiệm thu ba luồng MVP bằng nội dung có thể truy chứng, staging và người dùng thật; sau đó mới quyết định phạm vi mở bán/mở rộng dựa trên kết quả. Không cần viết lại dự án từ đầu và không cần tạo thêm 200 bài để đạt trạng thái đó.
