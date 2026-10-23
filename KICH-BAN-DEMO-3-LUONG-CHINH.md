# Kịch bản demo 3 luồng chính — Tin Lắm Tâm Linh

Tài liệu này dùng để dẫn demo sản phẩm theo hành trình người dùng, không trình bày toàn bộ danh sách tính năng. Ba luồng dưới đây được gom theo nhu cầu; các thao tác như xin xăm, xin keo, thiền hay viết lời nguyện là **luồng con**.

## Mục tiêu và cách kể câu chuyện

**Thông điệp demo:** Tin Lắm Tâm Linh giúp người dùng (1) hiểu thêm văn hóa Việt, (2) chiêm nghiệm các thực hành tín ngưỡng theo hướng có bối cảnh và tỉnh táo, và (3) chăm sóc đời sống tinh thần, gìn giữ sự tri ân.

**Người dùng mẫu:** một người ghé thăm lần đầu, chưa cần tạo tài khoản. Dẫn họ từ trang đầu, cho chọn một trải nghiệm, rồi kết thúc bằng lời mời tiếp tục khám phá. Nếu muốn minh họa lưu lịch sử/cá nhân hóa thì mới đăng nhập ở đoạn phụ.

**Thời lượng gợi ý:** 12–15 phút, khoảng 4 phút mỗi luồng và 1–3 phút mở đầu/chuyển đoạn.

## Sơ đồ tổng quan

```text
Trang đầu / Hôm nay
├── 1. Khám phá văn hóa Việt
│   ├── Bài viết văn hóa → nội dung chi tiết
│   ├── Văn hóa ba miền → vùng miền → trải nghiệm địa phương
│   └── Lịch văn hóa → sự kiện → nội dung liên quan
├── 2. Chiêm nghiệm và thực hành tín ngưỡng
│   ├── Xin xăm → chọn chủ đề/vùng → nhận quẻ và lời giải
│   │   └── Xin keo → kết quả gieo và gợi ý tự suy xét
│   ├── Cẩm nang nghi lễ → hướng dẫn chi tiết
│   ├── Ngày tốt / tử vi (nhánh phụ, nếu còn thời gian)
│   └── Không gian tâm linh ảo (nhánh trải nghiệm)
└── 3. Chăm sóc tinh thần và tưởng niệm
    ├── Check-in cảm xúc → chọn bối cảnh → lời gợi mở
    │   └── Hành trình cảm xúc (phù hợp hơn khi đã đăng nhập)
    ├── Thiền ngắn / lời biết ơn / lời nguyện
    └── Không gian gia tiên → góc tưởng niệm (nhánh phụ)
```

Thanh điều hướng FE hiện gom các trang thành “Hôm nay”, “Trải nghiệm”, “Khám phá” và “Góc của tôi”. Vì vậy, khi nói với khán giả, hãy gọi tên **3 luồng sản phẩm** ở trên; khi thao tác trên giao diện, dùng tên menu thực tế để họ theo kịp.

---

## Mở đầu — 45–60 giây

**Điểm bắt đầu:** trang đầu/“Hôm nay” ở trạng thái khách.

**Lời dẫn gợi ý:**

> “Mình sẽ đi qua ba nhu cầu chính: khám phá văn hóa, chiêm nghiệm thực hành tín ngưỡng, và chăm sóc đời sống tinh thần. Mình sẽ bắt đầu như một người dùng mới; tài khoản chỉ cần khi muốn lưu và đồng bộ một số nội dung.”

Cho khán giả thấy các lối vào “Khám phá”, “Trải nghiệm” và “Hôm nay”. Nói ngắn rằng đây là ba điểm xuất phát khác nhau, nhưng các tính năng con có thể dẫn người dùng qua lại giữa chúng.

## Luồng 1 — Khám phá văn hóa Việt (3–4 phút)

### Nhu cầu người dùng

“Tôi muốn tìm hiểu một phong tục, địa danh hoặc sự kiện văn hóa, rồi biết thêm bối cảnh của nó.”

### Đường đi đề xuất

1. Mở menu **Khám phá** → màn hình bài viết văn hóa.
2. Cho thấy cách duyệt nội dung; nếu dữ liệu cho phép, lọc theo vùng/chủ đề hoặc tìm một bài cụ thể.
3. Mở một bài chi tiết. Dẫn khán giả qua tiêu đề, nội dung, hình ảnh và thông tin nguồn/xuất xứ nếu được hiển thị.
4. Quay lại mục Khám phá và mở **Văn hóa ba miền** (bản đồ) hoặc chọn một vùng để vào nội dung địa phương.
5. Nếu còn thời gian, mở **Lịch văn hóa**, chọn một sự kiện để minh họa cách lịch dẫn tới nội dung chi tiết.

### Lời dẫn gợi ý

> “Luồng này đi từ tò mò đến hiểu bối cảnh: người dùng có thể bắt đầu bằng bài viết, vùng miền hoặc thời điểm trong năm. Các nhánh dùng chung mục tiêu khám phá, nên không cần trình bày như ba luồng độc lập.”

### Điểm cần nhấn

- Nội dung văn hóa là điểm vào nhẹ nhàng, không yêu cầu người dùng biết trước mình cần tìm gì.
- Có thể đi theo **chủ đề**, **địa phương** hoặc **lịch sự kiện**.
- Nếu có nhãn nguồn/xuất xứ, hãy dùng nó để minh họa cách sản phẩm đặt nội dung vào bối cảnh.

### Chuyển sang luồng 2

> “Khi đã có bối cảnh văn hóa, người dùng có thể muốn trải nghiệm một thực hành dân gian. Mình chuyển sang luồng chiêm nghiệm.”

---

## Luồng 2 — Chiêm nghiệm và thực hành tín ngưỡng (4–5 phút)

### Nhu cầu người dùng

“Tôi muốn trải nghiệm một thực hành dân gian và nhận gợi ý để tự suy ngẫm, nhưng vẫn hiểu đây là nội dung tham khảo.”

### Nhánh demo chính: xin xăm, nối sang xin keo

1. Mở **Trải nghiệm** → **Xin xăm**.
2. Chọn chủ đề và vùng miền có dữ liệu khả dụng. Chờ trạng thái kiểm tra thư viện; chỉ tiếp tục khi giao diện cho biết có quẻ.
3. Thực hiện thao tác xin xăm theo hướng dẫn trên màn hình.
4. Ở trang kết quả, trình bày các phần quẻ/lời giải và nguồn hoặc thông tin nội dung nếu có.
5. Nhấn **nối quẻ với xin keo** để minh họa việc xin keo là nhánh tiếp nối cùng hành trình, không phải một luồng sản phẩm cấp cao khác.
6. Thực hiện gieo theo giao diện, đọc kết quả và phần diễn giải.
7. Kết thúc bằng cách quay lại Trải nghiệm hoặc Khám phá. Chỉ thử lưu kết quả nếu phiên demo đã đăng nhập và API lưu hoạt động.

### Nhánh phụ nếu không muốn demo thao tác ngẫu nhiên

- Mở **Cẩm nang nghi lễ** → chọn một nghi lễ → xem hướng dẫn chi tiết.
- Hoặc mở **Ngày tốt** / **Tử vi** nếu nội dung đã sẵn sàng và phù hợp thời lượng.
- Không cần trình bày tất cả nhánh. Xin xăm nối xin keo là minh họa đủ rõ cho luồng chính.

### Lời dẫn gợi ý

> “Xin xăm và xin keo là hai thao tác con trong một hành trình chiêm nghiệm. Sản phẩm đưa ra chất liệu văn hóa và lời gợi mở; kết quả không thay thế thông tin thực tế hay quyết định của người dùng.”

### Điểm cần nhấn

- Có bước chọn bối cảnh trước khi thực hiện.
- Kết quả được trình bày cùng phần giải thích/diễn giải, không chỉ là một nhãn tốt–xấu.
- Xin keo có thể nối với lượt xin xăm đang mở; nhánh nối này thể hiện rõ quan hệ giữa hai tính năng.
- Tránh diễn giải quẻ như lời tiên đoán chắc chắn hoặc lời khuyên chuyên môn.

### Chuyển sang luồng 3

> “Ngoài khám phá phong tục, sản phẩm còn có những trải nghiệm hướng vào cảm xúc và sự tri ân trong đời sống thường ngày.”

---

## Luồng 3 — Chăm sóc tinh thần và tưởng niệm (4 phút)

### Nhu cầu người dùng

“Tôi muốn dừng lại, gọi tên cảm xúc, tìm một hoạt động nhẹ nhàng hoặc dành một khoảnh khắc tri ân.”

### Đường đi demo chính: check-in cảm xúc

1. Vào **Hôm nay** → bắt đầu check-in.
2. Chọn một cảm xúc phù hợp với kịch bản demo và một bối cảnh.
3. Có thể nhập ghi chú ngắn, không dùng thông tin cá nhân thật. Với demo nhanh, bỏ qua ghi chú nếu không cần.
4. Gửi check-in và chờ trang kết quả/lời gợi mở.
5. Nhấn mạnh đây là một gợi ý suy ngẫm nhẹ nhàng. Nếu giao diện cho phép, đánh dấu hoàn thành một hành động nhỏ.
6. Mở **Hành trình cảm xúc** như nhánh theo dõi sau này; nếu cần đăng nhập để có lịch sử, chỉ giới thiệu chứ không biến đăng nhập thành điểm nghẽn của demo.

### Nhánh cảm xúc / tri ân (chọn một)

- **Thiền ngắn:** mở một phiên thiền để minh họa hoạt động dừng lại và tập trung.
- **Lời biết ơn:** viết một lời tri ân; có thể trình diễn chế độ trải nghiệm không lưu.
- **Lời nguyện:** viết một mong ước như một hoạt động phản tư.
- **Tưởng niệm:** nếu muốn kết thúc bằng chủ đề gia đình, mở không gian gia tiên/góc tưởng niệm. Chỉ tạo hoặc sửa hồ sơ người thân khi đã chuẩn bị dữ liệu demo phù hợp.

### Lời dẫn gợi ý

> “Luồng này bắt đầu từ trạng thái hiện tại của người dùng, rồi gợi ý một bước nhỏ như hít thở, thiền hoặc viết lời tri ân. Các nhánh tưởng niệm mở rộng trải nghiệm sang việc gìn giữ ký ức và lòng biết ơn.”

### Kết thúc demo

> “Ba luồng bắt đầu từ ba nhu cầu khác nhau: hiểu văn hóa, chiêm nghiệm thực hành, và chăm sóc tinh thần. Người dùng có thể trải nghiệm từng phần như khách; tài khoản là bước bổ sung khi họ muốn lưu, đồng bộ hoặc theo dõi dài hạn.”

---

## Phần phụ — tài khoản, không đưa thành luồng demo bắt buộc

Đăng ký, đăng nhập, quên mật khẩu, cài đặt, hội viên và thanh toán không nằm trong ba luồng kể chuyện chính. Chỉ mở các màn hình này khi cần chứng minh một khả năng cụ thể, chẳng hạn lưu kết quả, lịch sử cá nhân hoặc đồng bộ dữ liệu. Không dành thời gian demo đăng ký/đăng nhập nếu mục tiêu buổi trình diễn là giới thiệu trải nghiệm cốt lõi.

## Chuẩn bị trước buổi demo

### Kiểm tra trải nghiệm

- Mở đúng URL demo và bắt đầu ở trạng thái khách; đóng các tab hoặc overlay không liên quan.
- Kiểm tra backend/API đang hoạt động. Một số màn hình tải bài văn hóa, nghi lễ, lịch, check-in, xin xăm và xin keo từ API.
- Mở trước từng màn hình theo đúng đường đi để phát hiện mục dữ liệu trống, lỗi tải hoặc lựa chọn không khả dụng.
- Với xin xăm, chọn trước tổ hợp vùng/chủ đề có quẻ khả dụng; màn hình có bước kiểm tra khả dụng trước khi cho rút.
- Với check-in, xác nhận API phân tích hoạt động. Trạng thái khách có thể trải nghiệm nhưng lịch sử/lưu trữ có thể yêu cầu đăng nhập.
- Chuẩn bị sẵn một nội dung mẫu không chứa tên, email, thông tin sức khỏe hay chuyện riêng tư thật.
- Nếu demo trên máy chiếu/điện thoại, kiểm tra kích thước màn hình, âm lượng và trạng thái mạng.

### Kế hoạch dự phòng khi API hoặc dữ liệu gặp lỗi

- **Bài viết/lịch/nghi lễ không tải:** chuyển sang nhánh đang hoạt động hoặc dùng ảnh chụp màn hình đã chuẩn bị; nói rõ đang minh họa luồng giao diện.
- **Xin xăm báo không có dữ liệu/lỗi kiểm tra:** đổi sang tổ hợp đã kiểm tra trước. Không bấm rút liên tục hoặc giả vờ đã nhận quẻ.
- **Xin keo lỗi phiên:** quay lại xin xăm và mở từ nút nối quẻ để giữ đúng quan hệ phiên; nếu vẫn lỗi, chuyển sang cẩm nang nghi lễ.
- **Check-in không trả kết quả:** chuyển sang Thiền ngắn hoặc Lời biết ơn để vẫn hoàn thành luồng 3.
- **Lưu cần tài khoản:** bỏ qua thao tác lưu, tiếp tục demo ở chế độ khách; giải thích tài khoản phục vụ nhu cầu lưu và theo dõi dài hạn.

## Danh sách màn hình FE liên quan

| Luồng chính | Màn hình/nhánh FE |
|---|---|
| Khám phá văn hóa Việt | `CultureScreen`, `CultureDetailScreen`, `CulturalMapScreen`, `RegionCultureScreen`, `RegionalExperienceScreen`, `CulturalCalendarScreen`, `EventDetailScreen` |
| Chiêm nghiệm và thực hành tín ngưỡng | `ExperienceScreen`, `XinXamScreen`, `XinKeoScreen`, `RitualGuideScreen`, `RitualDetailScreen`, `GoodDayScreen`, `HoroscopeScreen`, `AstrologyHubScreen`, `VirtualSanctuaryScreen` |
| Chăm sóc tinh thần và tưởng niệm | `TodayScreen`, `MoodCheckInScreen`, `SignalLoadingScreen`, `SignalResultScreen`, `MoodJourneyScreen`, `ZenScreen`, `GratitudeScreen`, `WishScreen`, `AncestorAltarScreen`, `MemorialSpaceScreen`, `MemorialFormScreen` |

> Tên màn hình được ghi theo source FE hiện tại. Tên menu hiển thị có thể khác tên luồng dùng trong kịch bản.
