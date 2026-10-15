# Rà soát nội dung MVP và gói bản thảo đợt 4

Phạm vi: nội dung trong source, điều kiện phát hành theo code và bản thảo đề xuất. Tài liệu này **không** xác nhận trạng thái của database nào; không đọc database để suy ra trạng thái đang chạy.

## Kiểm kê source và khả năng phát hành

| Luồng | Nội dung có trong source | Điều kiện phát hành theo code | Việc còn thiếu |
|---|---|---|---|
| Văn hóa | `FE/src/data/cultureData.ts` có 14 bài local. BE seed có 6 mục văn hóa khung với `sections: []`; thêm các dòng danh mục di sản quốc gia có metadata và đường dẫn nguồn trong file dữ liệu seed. | API công khai chỉ trả bài `active=true` và `verified=true`. Các mục seed nói trên được tạo `verified=false`; danh mục di sản chỉ khẳng định metadata của dòng danh mục, không chứng minh nội dung diễn giải hay thực hành. FE hiện lấy nội dung từ API, không dùng 14 bài local làm bản công khai thay thế. | Cần biên tập nội dung đọc được, gắn từng nhận định với nguồn và vị trí cụ thể khi là dữ kiện, tách truyền thuyết/diễn giải, rà quyền nếu bổ sung tài sản. Chưa có căn cứ để nói số bài trong database đang chạy. |
| Nghi lễ | BE seed có 6 hướng dẫn và các bước hướng dẫn; seed không tự xác minh nội dung. Checklist ở cột JSON của nghi lễ, còn nội dung bản thảo cần được nhóm rà. | API công khai cần `active=true` và `verified=true`; code chặn duyệt nếu checklist không có ít nhất một mục ID/nhãn hợp lệ. Nghi lễ `GROUP_AUTHORED` cần người biên soạn, phạm vi, căn cứ quyền, checklist và hồ sơ người/ngày duyệt; không bắt URL ngoài. Nội dung dựa trên tư liệu và văn khấn vẫn cần HTTPS, vị trí đối chiếu và quyền sử dụng phù hợp. | Người hiểu thực hành tại địa phương cần rà tính phù hợp, ích lợi và an toàn; không coi gợi ý là chuẩn chung. Chỉ điền hồ sơ có thật. |
| Check-in | FE và `shared/checkin-catalog.json` mở 10 cảm xúc × 5 ngữ cảnh. `BE/prisma/seed/signal.seed.js` có 16 biến thể chung và 40 biến thể cho 4 ngữ cảnh cụ thể; nội dung là bản thảo nguyên bản, không phải trích dẫn dân gian. | `signals.editorial_status` là nguồn trạng thái biên tập; công khai yêu cầu `active=true`, `PUBLISHED`, người/ngày duyệt và hash phiên bản khớp. Nội dung `in-review`, nháp, bị ẩn/thu hồi hoặc đã sửa sau duyệt không được phân phối. `FE/src/admin` hiện có màn quản lý lời chiêm nghiệm, bao phủ và các bước biên tập/duyệt/phát hành/thu hồi. | Các dòng seed vẫn là bản nháp cho tới khi người thật rà và duyệt qua admin. Không suy trạng thái của database nào từ seed hoặc source. Ma trận bao phủ admin lấy từ toàn bộ tập DB và ô trống thể hiện rõ. |

Không thể kết luận nội dung nào đang có trong database được chạy: thống kê trên chỉ mô tả file seed, mã phát hành và source FE.

## Gói bản thảo

Dữ liệu nằm trong [`mvp-review-drafts.js`](mvp-review-drafts.js). Ba bài văn hóa và hai hướng dẫn nghi lễ được ghi `DRAFT`, không có URL nguồn, tên người duyệt, ngày duyệt hay ảnh. Phần văn hóa mang provenance `GROUP_AUTHORED`; không có câu trích dân gian. Các mô tả thực hành cần được đối chiếu trước khi chuyển sang nội dung được duyệt.

Gói có 50 bản thảo check-in: 10 cảm xúc × 5 lựa chọn ngữ cảnh FE đang mở. Mỗi bản là câu hỏi tự suy ngẫm và hành động nhỏ tùy chọn; metadata là nội dung nguyên bản, không nguồn ngoài, không trích dẫn, không ảnh, `active=false`, `editorialStatus=draft`. Đây không phải kết quả dùng cho người dùng.

### Nhóm cần đọc và xác nhận trước khi bấm duyệt

1. **Ba bài văn hóa:** đọc từng câu như một nhận định cần kiểm chứng; xác nhận phạm vi địa phương và cách phân biệt dữ kiện, truyền thuyết, ký ức cộng đồng, diễn giải của nhóm. Với dữ kiện, bổ sung URL/tên tài liệu/vị trí có thể mở lại. Nếu không tìm được nguồn thì bỏ hoặc viết lại thành góc nhìn biên tập được ghi rõ, không ghi như dữ kiện. Các bản thảo nguyên bản có thể để trống nguồn ngoài; admin vẫn phải xác nhận quyền nội dung. Không có ảnh trong gói; nếu thêm ảnh, phải xác định đúng tài sản và căn cứ quyền trước khi xác nhận.
2. **Hai hướng dẫn nghi lễ:** nhờ người thực hành/hiểu biết tại địa phương rà từng bước, checklist, cách gọi và phần an toàn; kiểm tra ngôn từ không biến gợi ý thành nghĩa vụ hay một chuẩn dùng cho mọi nhà. Với `GROUP_AUTHORED`, xác nhận đúng người/nhóm biên soạn, phạm vi, căn cứ quyền và hồ sơ rà của người thật; không tạo URL/locator. Với hướng dẫn dựa trên tư liệu hoặc văn khấn, đối chiếu nguồn HTTPS, vị trí cụ thể và quyền sử dụng thực tế; thiếu trường nào thì để nháp.
3. **50 lời check-in:** đọc toàn bộ cặp cảm xúc/ngữ cảnh; xác nhận câu chữ tôn trọng, không chẩn đoán, hứa chữa bệnh, phán đoán tương lai hay gây áp lực. Xác nhận mỗi hành động có thể bỏ qua và không thay tư vấn chuyên môn. Nội dung do nhóm tự biên soạn; không gắn nguồn dân gian hoặc chuyển `quotationVerified` thành true. Duyệt qua màn “Lời chiêm nghiệm” sau khi kiểm tra loại nội dung, người biên soạn, căn cứ quyền và ma trận cảm xúc × ngữ cảnh.
4. **Thông tin duyệt:** chỉ người thật đã rà đúng phiên bản mới điền tên và ngày duyệt; ghi chú rà soát và căn cứ nguồn/quyền đúng thực tế. Không điền hộ hoặc dùng giá trị mẫu.

Ghi chú vận hành: trạng thái tín hiệu có thẩm quyền nằm ở cột `signals.editorial_status`; metadata JSON chỉ mô tả loại nội dung, tác giả, căn cứ quyền và nguồn, không được dùng làm trạng thái thay thế. Hiding/showing giữ reviewer/date và hash; sửa nội dung làm mất duyệt; thu hồi đặt inactive và không thể phát hành bằng cách bật hiển thị. Admin không tự điền reviewer, ngày, nguồn hoặc quyền.

## Tương thích tiến độ checklist cũ

Checklist mới được lấy từ BE. Khi ID cũ không còn, FE chỉ ánh xạ tiến độ từ checklist local cùng slug sang checklist BE nếu nhãn đã chuẩn hóa trùng duy nhất; do đó cặp `c1` → `c-1` chỉ được giữ khi nhãn có cùng ý nghĩa và khớp chính xác. ID lịch sử không xác định được nghĩa được giữ trong local storage, không tính vào tổng hoàn thành và có thông báo để người dùng xem lại/đặt lại. FE không tự xóa tiến độ không ánh xạ được. Dữ liệu cũ chỉ lưu ID, không lưu nhãn hoặc phiên bản checklist; vì vậy không thể khôi phục ý nghĩa của ID lạ một cách đáng tin cậy. Nếu không có bản checklist cũ trong source để đối chiếu, người dùng cần rà danh sách và tự đặt lại khi chấp nhận mất tiến độ đó.

Không tạo migration cho thay đổi này: schema checklist JSON hiện tại đã lưu ID ổn định và FE giữ tương thích cục bộ. Không sửa migration đã áp dụng và không reset database.

## Nhập bản thảo an toàn

Importer `BE/scripts/import-mvp-review-drafts.js` mặc định chỉ in số lượng ở chế độ dry-run. Khi được chủ động chạy với `--apply`, importer dùng transaction, chỉ **tạo mới** theo slug/source ổn định và bỏ qua mọi bản ghi đã tồn tại; không cập nhật nội dung do admin sửa hoặc đã duyệt. Bản ghi mới đều không hoạt động và chưa xác minh.

Chạy từ thư mục `BE`:

```powershell
node scripts/import-mvp-review-drafts.js
node scripts/import-mvp-review-drafts.js --apply
```

Lệnh thứ hai chỉ dành cho database test/staging được nhóm xác nhận; chưa chạy trong đợt này. Không cần migration mới cho gói này. Database đang dùng không được suy ra hoặc chọn tự động.
