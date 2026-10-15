# ĐỀ ÁN KHỞI NGHIỆP EXE101 - FPT UNIVERSITY
# TÀI LIỆU YÊU CẦU DỰ ÁN TỔNG HỢP (SRS) & KỊCH BẢN DEMO THỰC CHIẾN TOP 1
## DỰ ÁN: "TIN LẮM TÂM LINH" (THƯƠNG HIỆU: THÍCH CÚNG KIẾNG)
### HỆ SINH THÁI SỐ BẢO TỒN VĂN HÓA TÍN NGƯỠNG & ĐỒNG HÀNH TINH THẦN CHO THẾ HỆ TRẺ VIỆT NAM


## PHẠM VI MVP VÀ TRẠNG THÁI TRIỂN KHAI (CẬP NHẬT 13/10/2026)

Tài liệu này giữ cả tầm nhìn sản phẩm và yêu cầu tương lai. Mã nguồn có một số cảnh 3D/WebGL ở bàn thờ và trải nghiệm vùng miền, nhưng các cảnh đó nằm ngoài ba luồng MVP đã chốt và không đồng nghĩa các luồng 3D đã hoàn thiện. Xin xăm 3D, tích hợp hoa đăng từ `WishScreen`, gói năm 199.000đ, thư viện hội viên độc quyền và các quyền lợi Premium ngoài diễn giải AI là **lộ trình**, chưa phải chức năng đã bàn giao. Gói hội viên chưa thể mua/kích hoạt; các khoản giá và vật phẩm trong phần mô hình kinh doanh là giả định đề xuất.

**Ba luồng MVP được chốt trong tài liệu này:** (1) khám phá văn hóa → đọc/lưu/xem lại bài; (2) hướng dẫn nghi lễ → checklist/lưu tiến độ; (3) check-in → nhận/lưu/xem lại lời chiêm nghiệm. Kho FE hiện có 14 mục nội dung văn hóa; chưa có bộ hơn 200 bài được bàn giao và thẩm định. Các con số 200+ là mục tiêu roadmap, không phải nội dung đã có. Mỗi nội dung phải có nguồn hoặc ghi rõ do nhóm biên soạn; trích dẫn văn hóa cần được đối chiếu và tài sản phải có căn cứ quyền phù hợp trước khi phát hành. Nội dung chưa đạt điều kiện không được giới thiệu là đã xác minh. Các luồng xin xăm, xin keo, điều ước/hoa đăng, không gian thờ 3D, lịch/nhắc giỗ, hội viên và các phân hệ khác chưa thuộc ba luồng MVP đã chốt; xem roadmap. Chức năng hỗ trợ MVP gồm đăng ký, đăng nhập, khôi phục phiên, quản lý nội dung đã lưu, xóa nội dung cá nhân và quản trị/duyệt nội dung. Tử vi AI hiện chỉ tạo diễn giải để suy ngẫm, không tính lá số. SMTP, Gemini và VAPID đã có giá trị cấu hình trong BE/.env nhưng chưa được xác thực hoặc kiểm thử hoạt động thực tế. Thông tin merchant VNPay và hotline chính thức của trường chưa được cấu hình nên chưa thể kiểm thử các tích hợp này.

Các yêu cầu ngoài ba luồng MVP được chốt ở trên là **roadmap**; việc một màn hình hoặc thành phần đã tồn tại trong mã nguồn không tự động đưa nó vào phạm vi MVP. Gói hội viên chỉ có thể triển khai sau khi cấu hình và kiểm thử thanh toán.

---

* **Môn học:** EXE101 – Khởi nghiệp (Experiential Entrepreneurship) – FPT University
* **Tên đề án:** Tin Lắm Tâm Linh (Thích Cúng Kiếng)
* **Phiên bản tài liệu:** v4.0 – Master Edition (Tối ưu hóa điểm số Top 1 & Bảo vệ trước Hội đồng)
* **Mục tiêu tài liệu:** Cung cấp đầy đủ toàn bộ chứng cứ khoa học, khảo sát thực nghiệm thị trường, bảng đặc tả yêu cầu phần mềm chuẩn IEEE/Agile (User Stories & Acceptance Criteria), Kiến trúc dữ liệu/API, Sơ đồ luồng nghiệp vụ chi tiết, Mô hình tài chính Unit Economics và Kịch bản Demo trực tiếp 7 phút có phương án dự phòng (Contingency Plan) để chinh phục điểm tuyệt đối từ Giảng viên và Ban Giám khảo.

---

## MỤC LỤC TỔNG QUAN

1. [I. TỔNG QUAN ĐỀ ÁN KHỞI NGHIỆP & KHẢO SÁT THỰC NGHIỆM](#i-tổng-quan-đề-án-khởi-nghiệp--khảo-sát-thực-nghiệm)
   - 1. Tên dự án, Slogan và Định vị thương hiệu
   - 2. Bằng chứng thị trường & Dữ liệu khảo sát thực tế (Customer Discovery Survey)
   - 3. Nỗi đau cốt lõi của khách hàng (Problem Statement)
   - 4. Giải pháp đột phá (Solution) & Tuyên ngôn giá trị (UVP)
   - 5. Bảng Lean Canvas khởi nghiệp chuẩn FPTU
2. [II. PHÂN TÍCH THỊ TRƯỜNG, ĐỐI THỦ & KHÁCH HÀNG MỤC TIÊU](#ii-phân-tích-thị-trường-đối-thủ--khách-hàng-mục-tiêu)
   - 1. Chân dung khách hàng trọng tâm (3 Personas chuyên sâu)
   - 2. Định lượng quy mô thị trường (TAM - SAM - SOM)
   - 3. Ma trận phân tích đối thủ cạnh tranh (Competitive Matrix)
   - 4. Lợi thế cạnh tranh bất công (Unfair Advantage)
3. [III. KIẾN TRÚC KỸ THUẬT & DỮ LIỆU HỆ THỐNG](#iii-kiến-trúc-kỹ-thuật--dữ-liệu-hệ-thống)
   - 1. Kiến trúc phân tầng (Multi-tier Architecture)
   - 2. Frontend & Đồ họa tương tác WebGL Canvas
   - 3. Backend RESTful API & Mô hình dữ liệu Prisma ORM (ERD Data Dictionary)
   - 4. Bảng thông số kỹ thuật các Endpoint API chính (API Contracts)
   - 5. Trí tuệ nhân tạo (Sentiment Context & AI Matching Engine)
   - 6. Cơ chế Offline-first, Bộ đệm LocalStorage & Bảo mật dữ liệu
4. [IV. ĐẶC TẢ YÊU CẦU CHỨC NĂNG CHUẨN AGILE/SRS (8 MODULES)](#iv-đặc-tả-yêu-cầu-chức-năng-chuẩn-agilesrs-8-modules)
   - Ma trận phân loại ưu tiên tính năng MoSCoW
   - Module 1: Mood Check-in & Tín Hiệu Vũ Trụ Bản Sắc Việt
   - Module 2: Chiêm Nghiệm, Xin Xăm & Xin Keo Tương Tác 2D/3D
   - Module 3: Hòm Thư Điều Ước & Thả Hoa Đăng Số
   - Module 4: Zen Space – Không Gian Tĩnh Lặng & Chánh Niệm
   - Module 5: Virtual Sanctuary – Điện Thờ 3D & Nén Nhang Lòng Tri Ân Gia Tiên
   - Module 6: Bản Đồ Di Sản Ba Miền & Kho Tri Thức Văn Hóa Dân Gian
   - Module 7: Hướng Dẫn Nghi Lễ & Checklist
   - Module 8: Chiêm Tinh, Tử Vi AI, Gói Hội Viên "Tâm An" & Quản Lý Hồ Sơ
5. [V. SƠ ĐỒ LUỒNG TRẢI NGHIỆM CHI TIẾT (END-TO-END MERMAID FLOWS)](#v-sơ-đồ-luồng-trải-nghiệm-chi-tiết-end-to-end-mermaid-flows)
   - Flow 1 (MVP 3): Check-in & Lưu/Xem Lại Lời Chiêm Nghiệm
   - Flow 2 (Roadmap): Luồng Xin Xăm & Xin Keo Âm Dương
   - Flow 3 (MVP 1): Khám Phá Văn Hóa → Đọc/Lưu Bài
   - Flow 4 (Roadmap): Bàn Thờ Gia Tiên, Thắp Nhang Ảo & Nhắc Giỗ Chạp
   - Flow 5 (MVP 2): Hướng Dẫn Nghi Lễ → Checklist
   - Flow 6 (Roadmap): Luồng dự kiến cho Hội viên & Quản Lý Góc Tâm An
6. [VI. KỊCH BẢN DEMO THỰC CHIẾN PITCHING ĐẠT ĐIỂM TỐI ĐA (7-MINUTE SCRIPT)](#vi-kịch-bản-demo-thực-chiến-pitching-đạt-điểm-tối-đa-7-minute-script)
   - Phân vai, Thiết lập sân khấu & Danh mục thiết bị chuẩn bị
   - Chi tiết từng phút kịch bản (0:00 - 7:00) kèm thao tác và lời thoại "chạm cảm xúc"
   - Kế hoạch B (Technical Contingency Plan) phòng ngừa rủi ro mất mạng phòng thi
7. [VII. MÔ HÌNH KINH DOANH, ĐƠN VỊ KINH TẾ & TÀI CHÍNH](#vii-mô-hình-kinh-doanh-đơn-vị-kinh-tế--tài-chính)
   - 1. Phân tích kinh tế đơn vị (Unit Economics: CAC, LTV, ARPU, Payback Period)
   - 2. Các nguồn doanh thu cốt lõi (Revenue Breakdown)
   - 3. Bảng dự phóng tài chính 12 tháng (P&L Forecast)
   - 4. Điểm hòa vốn và độ nhạy tài chính (Break-even Sensitivity)
8. [VIII. CHIẾN LƯỢC GO-TO-MARKET (GTM) & ĐO LƯỜNG TĂNG TRƯỞNG](#viii-chiến-lược-go-to-market-gtm--đo-lường-tăng-trưởng)
   - 1. Chiến lược thâm nhập Campus FPTU & Viral Loop TikTok/Threads
   - 2. Lộ trình phát triển 3 giai đoạn (Roadmap)
   - 3. Bộ chỉ số đo lường sản phẩm (Pirate Metrics: AARRR Framework)
9. [IX. BỘ NGUYÊN TẮC ĐẠO ĐỨC & QUẢN TRỊ RỦI RO PHÁP LÝ](#ix-bộ-nguyên-tắc-đạo-đức--quản-trị-rủi-ro-pháp-lý)
   - 1. Tuyên ngôn phòng chống mê tín dị đoan và thương mại hóa nỗi sợ
   - 2. Quản trị bản quyền nội dung & Thẩm định văn hóa dân gian
   - 3. Bảo vệ dữ liệu cá nhân & An toàn tâm lý học đường
10. [X. BỘ 10 CÂU HỎI & ĐÁP ÁN PHẢN BIỆN "SÁT HẠCH" CỦA HỘI ĐỒNG EXE101](#x-bộ-10-câu-hỏi--đáp-án-phản-biện-sát-hạch-của-hội-đồng-exe101)

---

## I. TỔNG QUAN ĐỀ ÁN KHỞI NGHIỆP & KHẢO SÁT THỰC NGHIỆM

### 1. Tên dự án, Slogan và Định vị thương hiệu

* **Tên đề án khởi nghiệp:** **TIN LẮM TÂM LINH**
* **Tên ứng dụng người dùng:** **Thích Cúng Kiếng**
* **Slogan định vị:** *"Chạm nét linh thiêng – An yên nếp sống trẻ"*
* **Định vị cốt lõi (tầm nhìn):** Nền tảng số đa phương tiện kết hợp **Sức khỏe tinh thần (Mental Wellness)** và **Chuyển đổi số di sản văn hóa tín ngưỡng dân gian ba miền (Cultural Heritage Digitization)**; MVP hiện có một số cảnh WebGL, còn các luồng tương tác 3D và AI cần được đánh giá theo từng tính năng/cấu hình.

```
       [TÂM LINH TRUYỀN THỐNG VIỆT NAM]
      (Đạo Mẫu, Tiền nhân, Lễ nghi, Triết lý)
                     ▲
                     │   Hệ sinh thái:
                     │   TIN LẮM TÂM LINH
                     ▼
        [CÔNG NGHỆ SỐ HIỆN ĐẠI] ────────► [ĐỒNG HÀNH TINH THẦN GEN Z]
        (3D WebGL, Trí tuệ AI)            (Thấu cảm, Chữa lành, Tích cực)
```

---

### 2. Bằng chứng thị trường & Dữ liệu khảo sát thực tế (Customer Discovery Survey)

Theo kết quả kiểm đếm hiện có, khảo sát ghi nhận **148 lượt phản hồi và 144 email duy nhất**. Nhóm đang rà soát các phản hồi trùng; trong thời gian này có thể trình bày thống kê mô tả trên 148 lượt, ghi rõ dữ liệu chưa khử trùng và mẫu số của từng tỷ lệ. Sau khi thống nhất quy tắc làm sạch, nhóm sẽ công bố thêm kết quả đã làm sạch. Con số email duy nhất là kết quả khử trùng theo email, không mặc định đồng nghĩa với số người trả lời hợp lệ; không suy rộng mẫu khảo sát thành đại diện cho toàn bộ người trẻ Việt Nam.

---

### 3. Nỗi đau cốt lõi của khách hàng (Problem Statement)

1. **Khủng hoảng hiện sinh của thế hệ số (Quarter-life Crisis):**
   - Gen Z đối mặt với áp lực cạnh tranh khốc liệt, peer-pressure (áp lực đồng trang lứa), sợ tụt hậu (FOMO) và sự đứt gãy kết nối cảm xúc gia đình. Khi bế tắc, họ cần lời an ủi tức thời, không phán xét.
2. **Sự xa cách với cội nguồn văn hóa bản địa:**
   - Người trẻ sống trọ xa nhà, du học sinh không có điều kiện lập bàn thờ. Khi đến ngày Giỗ, Tết, Rằm, họ muốn tỏ lòng hiếu kính nhưng lực bất tòng tâm.
   - Các nghi thức truyền thống bị xem là cổ hủ, rườm rà do thiếu phương thức truyền đạt hiện đại, trực quan.
3. **Vấn nạn thương mại hóa nỗi sợ hãi & Mê tín dị đoan:**
   - Nhiều kênh tâm linh trên mạng lợi dụng tâm lý bất an để trục lợi: ép cúng giải hạn hàng triệu đồng, bói toán hù dọa điều xui xẻo, gây khủng hoảng tâm lý trầm trọng cho người trẻ.

---

### 4. Giải pháp đột phá (Solution) & Tuyên ngôn giá trị (UVP)

**Tầm nhìn giải pháp (định hướng, không phải danh sách chức năng MVP đã bàn giao):** **Tin Lắm Tâm Linh** hướng tới giải quyết 3 nỗi đau trên bằng cách tiếp cận **"Tín ngưỡng vị nhân sinh – Tinh giản và Nhân bản"**:

* **Chữa lành bằng văn hóa Việt:** Biến ca dao, tục ngữ, tích xưa thành lời động viên tâm lý ấm áp thông qua tính năng *Mood Check-in*.
* **Số hóa nghi thức:** Hướng tới cẩm nang mâm cúng, văn khấn có nguồn và được thẩm định, checklist đồ lễ và chế độ đọc trang nghiêm.
* **Trải nghiệm tương tác:** Một số cảnh 3D/WebGL bàn thờ và vùng miền đã có; xin xăm 3D và âm thanh chuông 432Hz vẫn là yêu cầu/lộ trình, chưa được xác nhận trong MVP.
* **Bảo tàng số 3 miền:** Đưa người trẻ khám phá di sản Đạo Mẫu Bắc Bộ, văn hóa biển miền Trung, lễ hội Vía Bà phương Nam một cách tự hào, văn minh.

**Tuyên ngôn giá trị (UVP):**
> *"Điểm tựa tinh thần an yên của thế hệ trẻ Việt Nam – Nơi công nghệ đưa di sản tín ngưỡng cha ông vào nhịp sống hiện đại, không hù dọa, không phán xét, thuần túy nuôi dưỡng bình an và lòng biết ơn cội nguồn."*

---

### 5. Bảng Lean Canvas khởi nghiệp chuẩn FPTU

| Thành phần Canvas | Nội dung đề án "Tin Lắm Tâm Linh" |
| :--- | :--- |
| **1. Vấn đề (Problem)** | - Gen Z căng thẳng, cô đơn, chông chênh trước các bước ngoặt cuộc sống.<br>- Thiếu kiến thức phong tục truyền thống; sinh viên sống trọ không có không gian cúng kiếng.<br>- Mê tín dị đoan ngoài xã hội thao túng tâm lý, trục lợi tài chính. |
| **2. Phân khúc khách hàng (Customer Segments)** | - *Chính yếu:* Sinh viên đại học (18–22 tuổi) tại FPTU, RMIT, HUB, UEH, VNU...<br>- *Thứ cấp:* Người trẻ mới đi làm (23–28 tuổi) chịu áp lực công việc đô thị.<br>- *Mở rộng:* Du học sinh, kiều bào xa quê muốn hướng về cội nguồn gia tiên. |
| **3. Tuyên ngôn giá trị độc nhất (UVP, mục tiêu)** | *"Hệ sinh thái tâm linh số bản sắc Việt – Điểm tựa tinh thần an yên, kết nối cội nguồn bằng trải nghiệm số và AI có trách nhiệm."* Đây là định vị đề xuất, không phải cam kết mọi công nghệ đã hoàn tất. |
| **4. Giải pháp (Solution, gồm MVP và hướng phát triển)** | - MVP gồm đúng ba luồng: khám phá văn hóa → đọc/lưu/xem lại bài; hướng dẫn nghi lễ → checklist/lưu tiến độ; check-in → nhận/lưu/xem lại lời chiêm nghiệm.<br>- Nội dung văn hóa và lời chiêm nghiệm cần nêu nguồn/trạng thái kiểm chứng phù hợp; chưa đạt điều kiện phát hành thì không giới thiệu là đã xác minh.<br>- Các phân hệ và mở rộng ngoài ba luồng này được ghi trong roadmap. |
| **5. Kênh tiếp cận (Channels)** | - Trực tiếp tại Campus: QR code chiến dịch mùa thi, CLB Văn hóa, sự kiện Vu Lan/Tết.<br>- Trực tuyến: Kênh TikTok/Threads viral "Tín hiệu vũ trụ dân gian", Instagram Aesthetic.<br>- Hợp tác: Hội sinh viên, các bảo tàng, làng nghề thủ công truyền thống. |
| **6. Dòng doanh thu (giả định mô hình, chưa phát sinh trong MVP)** | - Đề xuất gói hội viên "Tâm An" (29k/tháng hoặc 199k/năm); chưa mở thanh toán/kích hoạt.<br>- Vật phẩm số trang trí (9k–49k) là ý tưởng; chưa bán trong MVP.<br>- Hợp tác B2B/quà tặng văn hóa là hướng khảo sát, chưa phải doanh thu hiện có. |
| **7. Cơ cấu chi phí (Cost Structure)** | - Hạ tầng máy chủ Cloud, Database, CDN tài nguyên 3D/Audio: ~25%.<br>- Chi phí Marketing, Campus Tour & Vận hành cộng đồng: ~40%.<br>- Chi phí Nghiên cứu, Cố vấn văn hóa & Bản quyền tư liệu: ~20%.<br>- Quản lý vận hành & Chi phí dự phòng: ~15%. |
| **8. Chỉ số then chốt (Key Metrics)** | - DAU / MAU (Daily/Monthly Active Users).<br>- Retention Rate mục tiêu (D1 > 45%, D7 > 35%, D30 > 22%), cần kiểm chứng.<br>- Tỷ lệ chuyển đổi Freemium -> Premium mục tiêu (> 4.8%), cần kiểm chứng.<br>- LTV / CAC chưa chốt; cần mô hình và dữ liệu phù hợp. |
| **9. Lợi thế cần xây dựng (chưa phải lợi thế đã được chứng minh)** | - Xây dựng kho ngữ liệu văn hóa dân gian có nguồn và được chuyên gia thẩm định; hiện nội dung còn cần rà soát.<br>- Mở rộng, đo hiệu năng các cảnh WebGL trên thiết bị thực; hiện chỉ một số cảnh 3D đã có, chưa có số đo chứng minh chạy mượt trên mọi thiết bị. |

---

## II. PHÂN TÍCH THỊ TRƯỜNG, ĐỐI THỦ & KHÁCH HÀNG MỤC TIÊU

### 1. Chân dung khách hàng trọng tâm (3 Personas chuyên sâu)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ PERSONA 1: NGUYỄN AN NHIÊN (20 tuổi) - Sinh viên Đại học FPT TP.HCM         │
├─────────────────────────────────────────────────────────────────────────────┤
│ • Tính cách: Hướng nội, thích chiêm nghiệm, nhạy cảm với áp lực học tập.   │
│ • Hoàn cảnh: Ở trọ tại Quận 9, xa gia đình ở miền Trung.                   │
│ • Pain point: Hay thức khuya lo lắng về điểm số, đồ án, mất ngủ.            │
│ • Thói quen: Lướt TikTok xem bói bài Tarot trước khi đi ngủ.                │
│ • Giá trị tìm kiếm: Lời an ủi nhẹ nhàng, không giáo điều, mang lại bình an.│
└─────────────────────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────────────────────┐
│ PERSONA 2: TRẦN MINH KHANG (25 tuổi) - Kỹ sư phần mềm tại Cầu Giấy, Hà Nội  │
├─────────────────────────────────────────────────────────────────────────────┤
│ • Tính cách: Yêu công nghệ, tự hào dân tộc, thích tìm hiểu cội nguồn.       │
│ • Hoàn cảnh: Bận rộn làm việc 10 tiếng/ngày, ít có thời gian về quê.       │
│ • Pain point: Muốn cúng Rằm/Mùng Một tại căn hộ nhưng không biết chuẩn bị.  │
│ • Thói quen: Thích nghe nhạc dân gian đương đại, tìm hiểu lịch sử.         │
│ • Giá trị tìm kiếm: Cẩm nang mâm cúng & văn khấn chuẩn mực, lịch hoàng đạo. │
└─────────────────────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────────────────────┐
│ PERSONA 3: LÊ MAI PHƯƠNG (23 tuổi) - Du học sinh tại Melbourne, Úc          │
├─────────────────────────────────────────────────────────────────────────────┤
│ • Tính cách: Tình cảm, gắn bó sâu sắc với gia đình.                         │
│ • Hoàn cảnh: Sống xa nhà 3 năm, không thể về quê vào các dịp Giỗ chạp.      │
│ • Pain point: Day dứt vì không thể thắp nhang cho ông bà đã khuất.          │
│ • Thói quen: Gọi điện về nhà mỗi cuối tuần, nhớ món ăn và nếp nhà quê hương.│
│ • Giá trị tìm kiếm: Bàn thờ gia tiên số, thắp nén nhang lòng, sổ nhắc giỗ. │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

### 2. Định lượng quy mô thị trường (TAM - SAM - SOM)

* **TAM (Total Addressable Market):** 22.400.000 người.
  - *Căn cứ:* Toàn bộ dân số thuộc thế hệ Gen Z và Millennials trẻ (16–32 tuổi) tại Việt Nam sở hữu điện thoại thông minh và có kết nối Internet (Theo số liệu Tổng cục Thống kê và Báo cáo We Are Social 2024).
* **SAM (Serviceable Addressable Market):** 7.800.000 người (Chiếm ~35% TAM).
  - *Căn cứ:* Tập trung vào nhóm người trẻ đô thị có thói quen sử dụng các ứng dụng sức khỏe tinh thần, chiêm tinh, Tarot hoặc quan tâm đến phong tục tâm linh truyền thống.
* **SOM (Serviceable Obtainable Market - Mục tiêu 12 tháng):** 150.000 MAU.
  - *Căn cứ:* Bắt đầu từ 40.000 sinh viên thuộc Hệ sinh thái Giáo dục FPT trên toàn quốc, lan tỏa sang các trường đại học đối tác tại TP.HCM, Hà Nội, Đà Nẵng, Cần Thơ; kỳ vọng đạt **7.500 Paid Subscribers** (Tỷ lệ chuyển đổi 5.0%).

---

### 3. Ma trận phân tích đối thủ cạnh tranh (Competitive Matrix)

| Tiêu chí so sánh | Tin Lắm Tâm Linh | Ứng dụng Tarot/Chiêm tinh ngoại (Co-Star, The Pattern) | Trang Web Cúng Bái/Văn Khấn Truyền Thống | Ứng dụng Thiền & Chánh niệm (Headspace, Calm) |
| :--- | :---: | :---: | :---: | :---: |
| **Bản sắc văn hóa Việt Nam** | ⭐⭐⭐⭐⭐ (100% Thuần Việt) | ⭐ (Hoàn toàn Tây phương) | ⭐⭐⭐⭐ (Văn hóa truyền thống) | ⭐ (Trung lập quốc tế) |
| **Tính năng Thấu cảm / Chữa lành** | ⭐⭐⭐⭐⭐ (Ca dao, lời khuyên tích cực) | ⭐⭐⭐ (Chiêm tinh phức tạp, dễ gây hoang mang) | ❌ (Không có) | ⭐⭐⭐⭐⭐ (Chuyên sâu thiền định) |
| **Tương tác 3D WebGL (so sánh theo tầm nhìn)** | Mục tiêu: ⭐⭐⭐⭐⭐; mã nguồn có một số cảnh bàn thờ/vùng miền ngoài phạm vi MVP; chưa có xin xăm 3D | ⭐ (Chỉ có hình 2D tĩnh) | ❌ (Chỉ có văn bản thô) | ⭐⭐ (Đồ họa 2D tối giản) |
| **Bàn thờ gia tiên số & Nhắc giỗ** | ⭐⭐⭐⭐⭐ (Có sổ giỗ, thắp nhang lòng) | ❌ (Không có) | ❌ (Không có) | ❌ (Không có) |
| **Mức độ minh bạch, không mê tín** | ⭐⭐⭐⭐⭐ (Cam kết không hù dọa) | ⭐⭐⭐ (Phụ thuộc diễn giải) | ⭐⭐ (Nhiều quảng cáo mê tín) | ⭐⭐⭐⭐⭐ (Khoa học tâm lý) |
| **Chi phí phù hợp sinh viên** | ⭐⭐⭐⭐⭐ (Freemium + 29k/tháng) | ⭐⭐ (Đắt: 150k - 250k/tháng) | ⭐⭐⭐⭐⭐ (Miễn phí nhưng nhiều rác) | ⭐ (Rất đắt: 300k+/tháng) |

---

### 4. Lợi thế cạnh tranh bất công (Unfair Advantage)

1. **Kho ngữ liệu bản địa hóa sâu sắc:** Được chọn lọc từ điển tích lịch sử, ca dao tục ngữ và hệ thống văn khấn cổ truyền có bản quyền và thẩm định chuyên môn; dịch chuyển ngôn ngữ sang phong cách thấu cảm Gen Z.
2. **Mục tiêu công nghệ:** Mở rộng tương tác WebGL trên trình duyệt di động và đo hiệu năng thực tế; MVP chưa có benchmark hỗ trợ cam kết tải dưới 1,5 giây trên thiết bị/mạng bất kỳ.
3. **Mạng lưới Campus FPTU khởi đầu:** Kênh tiếp cận trực tiếp hàng chục ngàn sinh viên công nghệ và kinh doanh – những người lan tỏa mạnh mẽ nhất trên mạng xã hội.

---

## III. KIẾN TRÚC KỸ THUẬT & DỮ LIỆU HỆ THỐNG

### 1. Kiến trúc phân tầng (Multi-tier Architecture)

Frontend: React 19, TypeScript, Vite, Tailwind CSS.

Backend: Node.js, Express, Zod validation, JWT authentication và các middleware bảo mật/rate limit hiện có.

Database: PostgreSQL, Prisma ORM.

Tích hợp: Google login, SMTP, Gemini, VNPay và Web Push.

Trạng thái cấu hình và kiểm thử được ghi riêng cho từng dịch vụ:

| Dịch vụ | Cấu hình | Kiểm thử thực tế |
| :--- | :--- | :--- |
| Google login | Chưa xác minh cấu hình | Chưa xác minh hoạt động thực tế. |
| SMTP | Có giá trị cấu hình trong `BE/.env` | Chưa xác thực/kiểm thử hoạt động thực tế. |
| Gemini | Có giá trị cấu hình trong `BE/.env` | Chưa xác thực/kiểm thử hoạt động thực tế. |
| VNPay | Thông tin merchant chưa được cấu hình | Chưa thể kiểm thử checkout. |
| Web Push | Có giá trị VAPID trong `BE/.env` | Chưa xác thực/kiểm thử hoạt động thực tế. |

---

### 2. Mô hình thực thể dữ liệu Prisma ORM (ERD Data Dictionary)

Hệ thống được thiết kế theo cấu trúc cơ sở dữ liệu quan hệ chặt chẽ trong `BE/prisma/schema.prisma`:

Đoạn dưới là mô hình khái niệm minh họa. Schema triển khai chính thức nằm trong `BE/prisma/schema.prisma`; không sử dụng đoạn minh họa này làm migration. Hội viên được quản lý bằng subscription, không phải role PREMIUM.

```prisma
// 1. Thực thể Người dùng
model User {
  id              String           @id @default(uuid())
  email           String           @unique
  passwordHash    String
  fullName        String
  role            Role             @default(USER) // USER, ADMIN
  membershipPlan  MembershipPlan?  @relation(fields: [membershipId], references: [id])
  membershipId    String?
  savedSignals    SavedSignal[]
  savedXams       SavedXam[]
  wishes          Wish[]
  memorials       MemorialRecord[]
  createdAt       DateTime         @default(now())
  updatedAt       DateTime         @updatedAt
}

// 2. Thực thể Tín hiệu Tâm trạng đã lưu
model SavedSignal {
  id           String   @id @default(uuid())
  userId       String
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  moodKey      String   // An yên, Chông chênh, Áp lực...
  contextKey   String   // Thi cử, Sự nghiệp, Tình duyên...
  poemLine1    String   // Câu thơ 1
  poemLine2    String   // Câu thơ 2
  actionAdvice String   // Hành động chánh niệm
  journalNote  String?  // Ghi chú tâm sự cá nhân
  isStarred    Boolean  @default(false)
  createdAt    DateTime @default(now())
}

// 3. Thực thể Quẻ Xăm đã gieo
model SavedXam {
  id           String   @id @default(uuid())
  userId       String
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  stickNumber  String   // Số quẻ (01 - 100)
  fortuneType  String   // Thượng Cát, Trung Cát, Hạ Bình
  category     String   // Cầu an, Công danh, Gia đạo
  region       String   // Bắc Bộ, Trung Bộ, Nam Bộ
  keoResult    String?  // Nhất âm nhất dương, Nhị dương, Nhị âm
  quote        String   // Lời thơ quẻ
  explanation  String   // Luận giải chi tiết
  createdAt    DateTime @default(now())
}

// 4. Thực thể Hòm thư Điều ước & Hoa đăng
model Wish {
  id           String   @id @default(uuid())
  userId       String
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  topic        String   // Gia đạo, Tình cảm, Công danh...
  content      String   // Nội dung lời ước
  isSealed     Boolean  @default(true) // Niêm phong bí mật
  isLantern    Boolean  @default(false) // Thả hoa đăng số
  createdAt    DateTime @default(now())
}

// 5. Thực thể Bàn thờ Gia tiên & Tưởng niệm
model MemorialRecord {
  id           String    @id @default(uuid())
  userId       String
  user         User      @relation(fields: [userId], references: [id], onDelete: Cascade)
  fullName     String    // Họ tên người đã khuất
  relationship String    // Quan hệ: Ông, Bà, Cha, Mẹ...
  birthYear    Int?
  deathDate    DateTime  // Ngày mất (để nhắc giỗ âm lịch)
  avatarUrl    String?   // Di ảnh
  notes        String?   // Kỷ vật, lời dặn
  lastIncense  DateTime? // Lần thắp nhang gần nhất
  createdAt    DateTime  @default(now())
}
```

---

### 3. Bảng thông số kỹ thuật các Endpoint API chính (API Contracts)

| Method | Endpoint Route | Mô tả chức năng | Quyền truy cập |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/v1/auth/register` | Đăng ký tài khoản sinh viên/người dùng | Public |
| `POST` | `/api/v1/auth/login` | Đăng nhập nhận JWT Token | Public |
| `POST` | `/api/v1/mood/analyze-signal` | Gửi tâm trạng + ngữ cảnh -> Nhận tín hiệu ca dao | Public / User |
| `POST` | `/api/v1/mood/save-signal` | Lưu tín hiệu vào Góc Tâm An | Authenticated |
| `POST` | `/api/v1/xam/draw` | Rút xăm — ngoài MVP | Public / User |
| `POST` | `/api/v1/xam/toss-keo` | Gieo keo — cần đăng nhập, ngoài MVP | Authenticated |
| `POST` | `/api/v1/wishes` | Tạo điều ước / Thả đèn hoa đăng số | Authenticated |
| `GET` | `/api/v1/memorials` | Lấy danh sách hồ sơ bàn thờ gia tiên & ngày giỗ | Authenticated |
| `POST` | `/api/v1/memorials/:id/incense` | Thao tác thắp nén nhang lòng tri ân | Authenticated |
| `GET` | `/api/v1/content/rituals/:slug` | Chi tiết nghi lễ | Public |
| `POST` | `/api/v1/membership/checkout` | Checkout hội viên — ngoài MVP | Authenticated |

---

## IV. ĐẶC TẢ YÊU CẦU CHỨC NĂNG CHUẨN AGILE/SRS (8 MODULES)

### Ma trận phân loại ưu tiên tính năng MoSCoW

* **MVP:** Ba luồng: khám phá văn hóa → đọc/lưu/xem lại bài; hướng dẫn nghi lễ → checklist/lưu tiến độ; check-in → nhận/lưu/xem lại lời chiêm nghiệm.
* **Điều kiện phát hành MVP:** Nội dung dùng trong ba luồng phải có nguồn hoặc ghi rõ do nhóm biên soạn; trích dẫn văn hóa phải được đối chiếu; tài sản được sử dụng phải có căn cứ quyền phù hợp. Nội dung chưa đạt điều kiện không được giới thiệu là đã xác minh.
* **Chức năng hỗ trợ MVP:** Đăng ký, đăng nhập, khôi phục phiên, quản lý nội dung đã lưu, xóa nội dung cá nhân và quản trị/duyệt nội dung.
* **Roadmap:** Mở rộng kho nội dung; bản đồ và trải nghiệm vùng miền nâng cao; xin xăm/xin keo; hoa đăng; không gian thờ; lịch/nhắc giỗ; Zen; hội viên, thanh toán và các tính năng AI mở rộng.
* Các thành phần roadmap có thể đã tồn tại trong mã nguồn. Trạng thái triển khai được ghi riêng, không đồng nghĩa chúng đã được nghiệm thu hoặc phát hành.
* **Could Have (mở rộng sau roadmap nền tảng):** Luận giải tử vi chuyên sâu bằng AI, âm nhạc Chầu Văn tương tác 360 độ, đố vui văn hóa nhận quà.
* **Won't Have (Tuyệt đối không làm):** Bói toán hù dọa tang tóc, Dịch vụ cúng sao giải hạn thu tiền triệu, Mua bán bùa ngải.

---

### Module 1: Mood Check-in & Tín Hiệu Vũ Trụ Bản Sắc Việt
* **Phạm vi:** Một phần của luồng MVP 3: check-in → nhận/lưu/xem lại lời chiêm nghiệm.
* **Màn hình:** `MoodCheckInScreen`, `SignalLoadingScreen`, `SignalResultScreen`, `MoodJourneyScreen`.
* **User Story:**
  > *Là một sinh viên đang gặp áp lực thi cử,*
  > *Tôi muốn check-in tâm trạng và nhận một thông điệp dân gian ý nghĩa,*
  > *Để tôi được an ủi tinh thần và có thêm động lực vượt qua khó khăn.*
* **Acceptance Criteria:**
  - Người dùng chọn một cảm xúc và một chủ đề; ghi chú cá nhân là tùy chọn.
  - Khi gửi, giao diện hiển thị trạng thái đang xử lý và ngăn gửi trùng.
  - Khi thành công, hiển thị lời chiêm nghiệm và một hành động thực tế phù hợp. Nội dung biên soạn, trích dẫn dân gian và phần AI phải được phân biệt rõ.
  - Trích dẫn dân gian chỉ được hiển thị khi đã có nguồn và được đối chiếu; không bắt buộc mọi kết quả phải là bài ca dao hai câu.
  - Người chưa đăng nhập có thể nhận kết quả; khi muốn lưu thì đăng nhập và tiếp tục thao tác lưu.
  - Chỉ thông báo lưu thành công sau khi máy chủ xác nhận.
  - Người dùng có thể mở lại và xóa bản ghi đã lưu; không truy cập được dữ liệu của tài khoản khác.
  - F5 hoặc mở đường dẫn kết quả phải tải lại nội dung tương ứng nếu nội dung còn khả dụng. Nếu nội dung đã bị thu hồi, hiển thị thông báo phù hợp.
  - Khi API lỗi hoặc timeout, hiển thị lỗi và cho phép thử lại; không dùng dữ liệu mẫu để báo thành công.
  - Thời gian phản hồi được đo trong kiểm thử; chưa cam kết tối đa 2,5 giây khi chưa xác định điều kiện thiết bị, mạng và dịch vụ AI.

---

### Module 2: Chiêm Nghiệm, Xin Xăm & Xin Keo Tương Tác 2D/3D
* **Trạng thái phạm vi:** Roadmap; không thuộc ba luồng MVP đã chốt.
* **Màn hình:** `XinXamScreen`, `XinKeoScreen`.
* **User Story:**
  > *Là một người trẻ đang đứng trước quyết định quan trọng,*
  > *Tôi muốn tự tay lắc ống xăm và xin keo âm dương trên màn hình,*
  > *Để cảm nhận nét đẹp phong tục truyền thống và có thêm góc nhìn chiêm nghiệm tích cực.*
* **Acceptance Criteria:**
  - **Given:** Người dùng đang ở màn hình `XinXamScreen`.
  - **When:** Người dùng chạm giữ hoặc di chuột lắc ống xăm liên tục trong 1.5 giây.
  - **Then:** Phát âm thanh va chạm thẻ tre lách cách; 1 thẻ xăm rơi ra với số quẻ ngẫu nhiên (1–100) và xếp loại (*Thượng Cát, Trung Cát, Hạ Bình*).
  - **When:** Người dùng bấm *"Xin keo chứng quẻ"*.
  - **Then:** Hệ thống chuyển sang `XinKeoScreen`, mô phỏng gieo 2 đồng xu với 3 kết quả xác thực: *Nhất âm nhất dương (Được quẻ), Nhị dương (Chưa đặng), Nhị âm (Chưa thuận)*.

---

### Module 3: Hòm Thư Điều Ước & Thả Hoa Đăng Số
* **Trạng thái phạm vi:** Roadmap; không thuộc ba luồng MVP đã chốt.
* **Màn hình:** `WishScreen`.
* **Trạng thái:** lưu lời nguyện có BE mã hóa; hiệu ứng buông bỏ trong Wish chưa nối với cảnh hoa đăng WebGL. Các yêu cầu sau đây mô tả đích sản phẩm, trừ các gạch đầu dòng ghi rõ hiện trạng.
* **User Story:**
  > *Là một người có nỗi lòng thầm kín không dám chia sẻ cùng ai,*
  > *Tôi muốn viết điều ước và thả đèn hoa đăng số trên dòng sông ảo,*
  > *Để tôi được trút bỏ muộn phiền và gửi gắm hy vọng bình an.*
* **Acceptance Criteria:**
  - Cho phép chọn chủ đề nguyện ước: *Gia đạo, Công danh, Tình duyên, Bình an*.
  - Luồng hiện tại: chế độ nhật ký lưu lời nguyện vào tài khoản qua BE; BE mã hóa nội dung trước khi ghi cơ sở dữ liệu, không phải mã hóa đầu cuối.
  - Chế độ buông bỏ hiện chỉ xóa nội dung khỏi biểu mẫu và chạy hiệu ứng minh họa; chưa tạo bản ghi hoa đăng, chưa gắn lời nguyện với cảnh WebGL. Cảnh sông nước 3D ở trải nghiệm vùng miền là luồng riêng.
  - **Roadmap:** tích hợp lựa chọn thả hoa đăng vào Wish, quy định rõ nội dung có được lưu/chia sẻ hay không và xin xác nhận trước khi gửi lên cảnh công khai.

---

### Module 4: Zen Space – Không Gian Tĩnh Lặng & Chánh Niệm
* **Trạng thái phạm vi:** Roadmap; không thuộc ba luồng MVP đã chốt.
* **Màn hình:** `ZenScreen`.
* **User Story:**
  > *Là một người đang bị quá tải thông tin và căng thẳng tột độ,*
  > *Tôi muốn gõ chuông xoay và thở theo nhịp chánh niệm,*
  > *Để lấy lại sự tĩnh lặng và tái tạo năng lượng tích cực.*
* **Acceptance Criteria:**
  - Tích hợp âm thanh chuông xoay Tây Tạng / chuông đồng vang ngân chuẩn tần số 432Hz qua Web Audio API.
  - Vòng tròn nhịp thở động hướng dẫn phương pháp thở chánh niệm 4-7-8 (Hít vào 4s - Giữ hơi 7s - Thở ra 8s).

---

### Module 5: Virtual Sanctuary – Điện Thờ 3D & Nén Nhang Lòng Tri Ân Gia Tiên
* **Trạng thái phạm vi:** Roadmap; không thuộc ba luồng MVP đã chốt.
* **Màn hình:** `VirtualSanctuaryScreen`, `AncestorAltarScreen`, `MemorialSpaceScreen`, `MemorialFormScreen`, `GratitudeScreen`.
* **User Story:**
  > *Là một người con sống xa quê hương trong phòng trọ chật hẹp,*
  > *Tôi muốn lập bàn thờ gia tiên số và thắp nén nhang ảo vào ngày giỗ ông bà,*
  > *Để tôi giữ trọn đạo hiếu cội nguồn dù ở bất cứ nơi đâu.*
* **Acceptance Criteria:**
  - Cho phép thêm/sửa/xóa hồ sơ người thân đã khuất: Tên, quan hệ, năm sinh, ngày mất âm lịch, di ảnh.
  - Chạm vào cây hương trên màn hình: Kích hoạt hiệu ứng tàn hương đỏ rực, khói trầm lan tỏa và tiếng chuông ngân.
  - Tự động thông báo (Push Notification / Local Alert) trước 3 ngày đến ngày Giỗ chạp của người thân.

---

### Module 6: Bản Đồ Di Sản Ba Miền & Kho Tri Thức Văn Hóa Dân Gian
* **Phạm vi:** Luồng MVP 1 là khám phá văn hóa → đọc/lưu bài. Bản đồ/hiệu ứng mở rộng và thư viện lớn thuộc roadmap.
* **Màn hình:** `CulturalMapScreen`, `RegionCultureScreen`, `RegionalExperienceScreen`, `CultureScreen`, `CultureDetailScreen`.
* **User Story:**
  > *Là người trẻ quan tâm văn hóa tín ngưỡng Việt Nam, tôi muốn tìm và đọc bài viết ngắn có nguồn rõ ràng, để hiểu nội dung và lưu lại khi cần.*
* **Acceptance Criteria:**
  - Duyệt và tìm kiếm bài theo chủ đề/vùng miền.
  - Mở bài để đọc nội dung, nguồn, phạm vi áp dụng và trạng thái biên tập.
  - Nội dung chưa đủ điều kiện phát hành không xuất hiện như bài đã xác minh.
  - Lưu, mở lại và bỏ lưu bài.
  - MVP lưu bookmark trên trình duyệt theo phạm vi người dùng; chưa cam kết đồng bộ bookmark giữa các thiết bị.
  - Bài bị thu hồi hoặc đường dẫn không tồn tại phải có thông báo phù hợp.
  - Bản đồ, âm thanh và trải nghiệm vùng miền nâng cao thuộc roadmap.
  - **Roadmap, chưa bàn giao:** xây dựng thư viện hơn 200 bài viết nghiên cứu có nguồn, quyền sử dụng và thẩm định; MVP hiện có 14 mục bài phía FE, chưa có mục được ghi nhận đã duyệt.

---

### Module 7: Hướng Dẫn Nghi Lễ & Checklist
* **Phạm vi:** Luồng MVP 2 là hướng dẫn nghi lễ → checklist. Lịch, tra cứu ngày và các phần mở rộng khác thuộc roadmap.
* **Màn hình:** `CulturalCalendarScreen`, `GoodDayScreen`, `EventDetailScreen`, `RitualGuideScreen`, `RitualDetailScreen`.
* **User Story:**
  > *Là người lần đầu chuẩn bị một dịp lễ trong gia đình, tôi muốn đọc hướng dẫn và đánh dấu checklist, để chuẩn bị phù hợp với nếp nhà và điều kiện của mình.*
* **Acceptance Criteria:**
  - Chọn và mở một hướng dẫn được phép phát hành.
  - Hiển thị nguồn, phạm vi địa phương/gia đình và các phần tùy chọn; không giới thiệu một cách thực hành là chuẩn chung toàn quốc.
  - Đánh dấu hoặc bỏ đánh dấu từng mục checklist.
  - Lưu tiến độ trên trình duyệt theo người dùng và từng hướng dẫn; mở lại vẫn giữ tiến độ khi dữ liệu trình duyệt còn tồn tại.
  - Cho phép đặt lại checklist.
  - Không cam kết đồng bộ checklist giữa các thiết bị trong MVP.
  - Văn khấn chỉ xuất hiện khi đủ căn cứ nội dung và quyền sử dụng phù hợp.
  - Lịch âm dương, tra cứu ngày và chế độ đọc nâng cao thuộc roadmap.

---

### Module 8: Chiêm Tinh, Tử Vi AI, Gói Hội Viên "Tâm An" & Quản Lý Hồ Sơ
* **Trạng thái phạm vi:** Roadmap, ngoại trừ chức năng xem lại lời chiêm nghiệm đã lưu thuộc luồng MVP 3.
* **Màn hình:** `AstrologyHubScreen`, `HoroscopeScreen`, `MembershipScreen`, `AccountScreen`, `SettingsScreen`, `NotificationScreen`.
* **Trạng thái:** checkout VNPay và kích hoạt hội viên chưa khả dụng; `MembershipScreen` hiện nhận email quan tâm. User story/quyền lợi trả phí bên dưới là mục tiêu roadmap, không phải dịch vụ có thể mua ở MVP.
* **User Story:**
  > *Là một người dùng trung thành của ứng dụng,*
  > *Tôi muốn nâng cấp gói hội viên Tâm An và quản lý toàn bộ kỷ niệm tâm linh,*
  > *Để nhận luận giải tử vi định hướng trọn năm và lưu giữ mọi khoảnh khắc an yên.*
* **Acceptance Criteria:**
  - **Roadmap:** cho phép đăng ký/quản lý gói Premium "Tâm An" sau khi checkout, webhook và cấp quyền lợi được triển khai/kiểm thử (mức giá đề xuất 29.000 VNĐ/tháng).
  - Quản lý kho tín hiệu đã lưu, lịch sử quẻ xăm, hòm thư điều ước bí mật và sổ giỗ cá nhân trong `AccountScreen`.

---

## V. SƠ ĐỒ LUỒNG TRẢI NGHIỆM CHI TIẾT (END-TO-END MERMAID FLOWS)

### Flow 1 (MVP 3): Check-in & Lưu/Xem Lại Lời Chiêm Nghiệm

```mermaid
flowchart TD
    Start([Khởi động App]) --> CheckAuth{Người dùng đăng nhập?}
    CheckAuth -- Chưa --> Guest[Màn hình GuestScreen: Khám phá nhanh]
    CheckAuth -- Rồi --> Today[Màn hình TodayScreen: Bảng tin Hôm Nay]
    
    Guest --> ClickMood[Nhấn nút 'Lắng nghe tâm trạng']
    Today --> ClickMood
    
    ClickMood --> MoodScreen[Màn hình MoodCheckInScreen]
    MoodScreen --> SelectMood[Chọn cảm xúc: Áp lực / Chông chênh / An yên...]
    SelectMood --> SelectContext[Chọn bối cảnh: Thi cử / Công việc / Tình cảm]
    SelectContext --> InputNote{Có muốn thêm ghi chú cá nhân?}
    InputNote -- Có --> AddNote[Nhập ghi chú tùy chọn]
    InputNote -- Không --> ClickSend[Nhấn 'Nhận tín hiệu']
    AddNote --> ClickSend
    ClickSend --> Loading[Hiển thị trạng thái xử lý, ngăn gửi trùng]
    Loading --> Result[Hiển thị lời chiêm nghiệm đã phân loại và hành động thực tế]
    Result --> SaveChoice{Muốn lưu kết quả?}
    SaveChoice -- Chưa đăng nhập --> Login[Đăng nhập rồi tiếp tục lưu]
    SaveChoice -- Đã đăng nhập --> Save[Gửi yêu cầu lưu]
    Login --> Save
    Save --> Confirm[Chỉ báo lưu thành công sau xác nhận từ máy chủ]
    Confirm --> Saved[Mở lại hoặc xóa bản ghi đã lưu]
    SaveChoice -- Không --> Today([Kết thúc])
```

---

### Flow 2 (Roadmap): Luồng Xin Xăm & Xin Keo Âm Dương

```mermaid
flowchart TD
    A([Người dùng chọn 'Xin Xăm']) --> B[Màn hình XinXamScreen]
    B --> C[Tĩnh tâm, hít thở sâu, định hình tâm nguyện]
    C --> D[Chạm giữ ống xăm 3D trên màn hình để lắc]
    
    D --> E[Mô phỏng vật lý va chạm thẻ tre lách cách]
    E --> F[Một thẻ xăm rơi ra: Quẻ số 12 - Trung Cát]
    
    F --> G{Muốn gieo keo âm dương chứng quẻ?}
    G -- Có --> H[Chuyển sang XinKeoScreen]
    H --> I[Chạm nút gieo 2 đồng xu cổ]
    I --> J{Kết quả gieo keo}
    J -- Nhất âm nhất dương --> K[Kết quả mô phỏng một âm, một dương; không xác nhận quyết định hay dự báo tương lai]
    J -- Nhị dương / Nhị âm --> L[Chưa được: Khuyên người dùng tịnh tâm gieo lại]
    
    K --> M[Đọc bài thơ chữ Hán - Việt & Điển tích lịch sử]
    G -- Bỏ qua --> M
    
    M --> N[Xem lời khuyên định hướng cuộc sống nhân văn]
    N --> O[Lưu quẻ thẻ vào kho cá nhân / Chia sẻ]
    O --> P([Kết thúc chiêm nghiệm])
```

---

### Flow 3 (MVP 1): Khám Phá Văn Hóa → Đọc/Lưu Bài

```mermaid
flowchart TD
    A([Người dùng mở Khám phá văn hóa]) --> B[CultureScreen: Duyệt chủ đề/bài hiện có]
    B --> C[Chọn một bài văn hóa]
    C --> D[CultureDetailScreen: Đọc nội dung và thông tin nguồn/trạng thái]
    D --> E{Muốn lưu bài?}
    E -- Có --> F[Lưu bài vào danh sách đã lưu]
    E -- Chưa --> G([Kết thúc đọc])
    F --> H[Xem lại bài trong danh sách đã lưu]
```

---

### Flow 4 (Roadmap): Bàn Thờ Gia Tiên, Thắp Nhang Ảo & Nhắc Giỗ Chạp

```mermaid
flowchart TD
    A([Truy cập 'Bàn Thờ Gia Tiên']) --> B[AncestorAltarScreen]
    B --> C{Đã tạo hồ sơ người thân chưa?}
    
    C -- Chưa --> D[Mở MemorialFormScreen: Nhập tên, năm mất, di ảnh]
    D --> E[Lưu bản ghi tưởng niệm vào hệ thống]
    E --> F[MemorialSpaceScreen: Không gian bàn thờ ấm cúng]
    
    C -- Đã có --> F
    
    F --> G{Hành động tri ân}
    G -- Thắp nén nhang lòng --> H[Chạm vào nén nhang: Khói trầm bốc lên & Chuông ngân vang]
    G -- Dâng lễ vật số --> I[Dâng chén nước thanh tịnh, đĩa sen ngát hương]
    G -- Viết tâm thư --> J[Gửi gắm lời tâm sự, tri ân người thân đã khuất]
    G -- Cài đặt nhắc giỗ --> K[Tự động đồng bộ lịch âm: Báo trước 3 ngày giỗ chạp]
    
    H --> L[Cảm nhận sự ấm áp, bình an và trọn đạo hiếu]
    I --> L
    J --> L
    K --> L
    L --> M([Hoàn tất viếng bàn thờ gia tiên])
```

---

### Flow 5 (MVP 2): Hướng Dẫn Nghi Lễ → Checklist

```mermaid
flowchart TD
    A([Người dùng mở Hướng dẫn nghi lễ]) --> B[RitualGuideScreen: Chọn hướng dẫn hiện có]
    B --> C[RitualDetailScreen: Đọc hướng dẫn và xem trạng thái nội dung]
    C --> D[Mở checklist chuẩn bị]
    D --> E[Đánh dấu từng mục đã chuẩn bị]
    E --> F([Lưu tiến độ checklist và kết thúc])
```

---

### Flow 6 (Roadmap): Luồng dự kiến cho Hội viên & Quản Lý Góc Tâm An

> **Trạng thái MVP:** chưa có checkout VNPay khả dụng, chưa ghi nhận thanh toán và chưa kích hoạt quyền lợi hội viên. `MembershipScreen` hiện nhận email quan tâm; sơ đồ dưới đây là luồng mục tiêu sau khi tích hợp thanh toán và kiểm thử quyền lợi.

```mermaid
flowchart TD
    A([Người dùng mở định hướng Hội viên]) --> B[Mở MembershipScreen: Gói Tâm An]
    B --> C[Xem quyền lợi hiện có và mục tiêu roadmap]
    C --> D{Chọn chu kỳ thanh toán}
    
    D -- Gói Tháng: 29.000 VNĐ --> E[Cổng thanh toán MoMo / VNPay / QR Code]
    D -- Gói Năm: 199.000 VNĐ --> E
    
    E --> F[Webhook xác nhận thanh toán sau khi tích hợp]
    F --> G[Kích hoạt quyền lợi đã triển khai và công bố]
    G --> H[AccountScreen: Quản lý Góc Tâm An, xem toàn bộ kho lưu trữ]
```

---

## VI. KỊCH BẢN DEMO THỰC CHIẾN PITCHING ĐẠT ĐIỂM TỐI ĐA (7-MINUTE SCRIPT)

### Phân vai & Chuẩn bị kỹ thuật
* **Speaker 1 (Founder / Presenter):** Thuyết trình tổng quan, dẫn dắt cảm xúc, nêu bật Problem-Solution Fit và mô hình kinh doanh.
* **Speaker 2 (Demo Lead / Product Owner):** Thao tác máy tính/máy chiếu mượt mà, đồng bộ 100% với lời nói của Speaker 1, sẵn sàng bật các tính năng wow.
* **Môi trường demo:** Laptop kết nối máy chiếu Full HD, trình duyệt mở sẵn Tab `http://localhost:5173` ở chế độ Fullscreen (F11), loa ngoài bật âm lượng vừa phải để nghe rõ tiếng chuông ngân và thẻ tre.

---

### Kịch bản chi tiết từng phút (Tổng thời lượng: 7 Phút)

#### ⏱️ Phút 0:00 – 0:45: Hook mở đầu – Chạm đúng nỗi đau thực tế
* **Màn hình:** `GuestScreen` (Giao diện chào mừng, đồ họa hoài cổ tinh tế).
* **Lời thoại Founder:**
  > *"Kính thưa Hội đồng Thẩm định! Khi một bạn sinh viên Gen Z đứng trước kỳ thi tốt nghiệp, áp lực tìm việc hay cảm thấy chênh vênh giữa căn phòng trọ xa nhà, bạn ấy cần một nơi có thể khám phá văn hóa, tìm hướng dẫn nghi lễ dễ theo dõi và nhận lời chiêm nghiệm tích cực. Khảo sát hiện ghi nhận 148 lượt phản hồi và 144 email duy nhất. Trong khi rà soát phản hồi trùng, nhóm trình bày thống kê mô tả trên 148 lượt, ghi rõ dữ liệu chưa khử trùng và mẫu số từng tỷ lệ; kết quả đã làm sạch sẽ được cập nhật sau khi thống nhất quy tắc xử lý.*
  >
  > *Đó là lý do chúng em mang đến **'Tin Lắm Tâm Linh'** – Hệ sinh thái số tiên phong kết hợp giữa Chữa lành tinh thần và Bảo tồn di sản văn hóa tín ngưỡng dân gian. Xin mời thầy cô cùng bước vào trải nghiệm trực tiếp sản phẩm của chúng em!"*

---

#### ⏱️ Phút 0:45 – 2:00: Demo Luồng 1 – Khám Phá Văn Hóa & Lưu Bài
* **Thao tác Demo Lead:**
  1. Mở `CultureScreen` và chọn một chủ đề văn hóa.
  2. Mở một bài trong `CultureDetailScreen`, chỉ rõ nguồn/trạng thái nội dung đang hiển thị.
  3. Lưu bài và mở lại từ danh sách đã lưu.
* **Lời thoại Founder:**
  > *"Luồng đầu tiên đưa người dùng đến nội dung văn hóa, cho phép đọc bài, xem thông tin nguồn/trạng thái và lưu lại để xem sau. Kho nội dung sẽ được mở rộng khi từng bài hoàn tất kiểm chứng và quyền sử dụng."*

---

#### ⏱️ Phút 2:00 – 3:15: Demo Luồng 2 – Hướng Dẫn Nghi Lễ & Checklist
* **Thao tác Demo Lead:**
  1. Mở `RitualGuideScreen` và chọn một hướng dẫn có sẵn.
  2. Xem các bước hướng dẫn và trạng thái nội dung.
  3. Mở checklist, đánh dấu một mục đã chuẩn bị.
* **Lời thoại Founder:**
  > *"Luồng thứ hai giúp người dùng xem hướng dẫn nghi lễ và theo dõi các bước chuẩn bị bằng checklist. Nội dung được giới thiệu theo đúng trạng thái biên tập và thẩm định hiện có."*

---

#### ⏱️ Phút 3:15 – 4:30: Demo Luồng 3 – Check-in & Lưu Lời Chiêm Nghiệm
* **Thao tác Demo Lead:**
  1. Mở `MoodCheckInScreen`, chọn cảm xúc và chủ đề rồi nhận lời chiêm nghiệm.
  2. Lưu kết quả.
  3. Mở danh sách đã lưu để xem lại kết quả vừa nhận.
* **Lời thoại Founder:**
  > *"Luồng thứ ba cho người dùng check-in, nhận một lời chiêm nghiệm, lưu lại và xem lại sau. Đây là nội dung gợi mở để suy ngẫm, không dự đoán tương lai hay thay thế hỗ trợ chuyên môn."*

---

#### ⏱️ Phút 4:30 – 6:30: Tóm Tắt Phạm Vi MVP & Roadmap
* **Thao tác Demo Lead:** Tóm tắt ba luồng vừa trình diễn; nêu các phần đang nằm trong roadmap theo mục VIII.2.
* **Lời thoại Founder:**
  > *"MVP tập trung vào ba việc: khám phá và lưu bài văn hóa, làm theo checklist hướng dẫn nghi lễ, và check-in để nhận rồi xem lại lời chiêm nghiệm. Các phân hệ mở rộng như xin xăm, không gian thờ 3D, hội viên và thanh toán sẽ được xem xét trong roadmap sau khi hoàn thiện nội dung, kiểm thử tích hợp và xác nhận điều kiện phát hành."*

---

#### ⏱️ Phút 6:30 – 7:00: Kết Luận Call To Action & Khẳng Định Tinh Thần Khởi Nghiệp FPTU
* **Thao tác Demo Lead:** Quay trở lại màn hình chính `TodayScreen` trang nhã, ấn tượng.
* **Lời thoại Founder:**
  > *"Dự án 'Tin Lắm Tâm Linh' của chúng em không chỉ là một đồ án môn học EXE101, mà là một sứ mệnh thực sự: **Dùng công nghệ của thế hệ trẻ hôm nay để thắp sáng và bảo tồn bản sắc ngàn đời của cha ông ngày hôm qua.***
  >
  > *MVP đã có các luồng giao diện và API để trình diễn, nhưng vẫn cần hoàn thiện dữ liệu, cấu hình tích hợp và kiểm thử trước khi mở rộng người dùng. Chúng em xin chân thành cảm ơn quý thầy cô và mong nhận được góp ý để tiếp tục hoàn thiện sản phẩm!"*

---

### Kế hoạch B (Technical Contingency Plan) phòng ngừa rủi ro mất mạng
 1. **Rủi ro rớt mạng Wi-Fi trường:** Ứng dụng hiện cache shell và tài nguyên công khai sau khi đã tải, đồng thời giữ một số dữ liệu khách trên `LocalStorage`. API, phiên tài khoản, nội dung lazy chưa mở và các thao tác cần máy chủ không được đảm bảo offline. Không trình bày tính năng như hoạt động 100% offline; chỉ demo các phần đã tải và kiểm tra trước, đồng thời nói rõ khi cần kết nối.
2. **Rủi ro thiết bị:** Luôn chuẩn bị sẵn 2 máy tính chạy sẵn mã nguồn và 1 điện thoại di động mở sẵn bản Web di động để thay thế ngay lập tức trong 5 giây nếu máy chính gặp sự cố kỹ thuật.

---

## VII. MÔ HÌNH KINH DOANH, ĐƠN VỊ KINH TẾ & TÀI CHÍNH

> Các mức giá, tỷ lệ chuyển đổi, doanh thu, chi phí và dự báo dưới đây là giả định trong đề án; chưa phản ánh giao dịch hoặc kết quả kinh doanh thực tế của MVP.

### 1. Phân tích kinh tế đơn vị (Unit Economics)

* **CAC (Customer Acquisition Cost):** **11.200 VNĐ / người dùng mới**.
  - Tận dụng mạng lưới sinh viên Campus FPT và video ngắn viral tự nhiên trên TikTok/Threads nên chi phí kéo người dùng cực kỳ thấp.
* **ARPU:** Chưa chốt. Nếu ARPPU là **35.000đ/tháng** và tỷ lệ người trả phí là **5%**, doanh thu từ nhóm trả phí tương ứng **1.750đ/người hoạt động/tháng**. Các nguồn doanh thu khác phải được tính và giải thích riêng.
* **ARPPU (Average Revenue Per Paying User):** **35.000 VNĐ / người dùng trả phí** (kết hợp Subscription + mua vật phẩm số).
* **LTV (Customer Lifetime Value - Vòng đời 12 tháng):** **172.000 VNĐ / Paying User**.
* **LTV/CAC và thời gian hoàn vốn:** Chưa chốt, cần mô hình sử dụng cùng nhóm khách hàng, có chi phí phục vụ, tỷ lệ gia hạn và churn.

---

### 2. Các nguồn doanh thu cốt lõi (Revenue Breakdown)

```
                       CƠ CẤU DOANH THU NĂM THỨ NHẤT
                      ┌────────────────────────────┐
                      │ Subscription "Tâm An": 60% │
                      │ Vật phẩm số (Micro):   25% │
                      │ Tài trợ B2B & Merch:   15% │
                      └────────────────────────────┘
```

1. **Gói Hội Viên B2C Subscription "Tâm An" (60% Doanh thu):**
   - Gói Tháng: 29.000 VNĐ/tháng.
   - Gói Năm: 199.000 VNĐ/năm (Tặng kèm đèn hoa đăng hoàng gia và bình sen ngọc).
2. **Vật phẩm số trang trí In-app Micro-transactions (25% Doanh thu):**
   - Đèn hoa đăng đại lễ: 9.000 VNĐ / lượt thả.
   - Bình hoa sen vàng, lư trầm hương phong thủy vĩnh viễn: 19.000 – 49.000 VNĐ.
3. **B2B Hợp tác & Quà tặng Văn hóa (15% Doanh thu):**
   - Liên kết bán hộp quà Tết văn hóa cùng các làng nghề thủ công (gốm Bát Tràng, trầm hương Quảng Nam).

---

### 3. Bảng dự phóng tài chính 12 tháng (P&L Forecast)

| Chỉ số tài chính (VNĐ) | Quý 1 | Quý 2 | Quý 3 | Quý 4 | Tổng Năm 1 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Tổng số người dùng (MAU)** | 15.000 | 45.000 | 90.000 | 150.000 | **150.000** |
| **Paid Subscribers (Tỷ lệ %)** | 450 (3.0%) | 1.800 (4.0%) | 4.050 (4.5%) | 7.500 (5.0%) | **7.500** |
| **Doanh thu Subscription** | 26.100.000 | 104.400.000 | 234.900.000 | 435.000.000 | **800.400.000** |
| **Doanh thu Vật phẩm số** | 10.500.000 | 38.250.000 | 85.500.000 | 165.000.000 | **299.250.000** |
| **Doanh thu B2B & Hợp tác** | 5.000.000 | 20.000.000 | 50.000.000 | 105.000.000 | **180.000.000** |
| **TỔNG DOANH THU (A)** | **41.600.000** | **162.650.000** | **370.400.000** | **705.000.000** | **1.279.650.000** |
| **Chi phí Máy chủ, Cloud, AI** | 18.000.000 | 36.000.000 | 65.000.000 | 110.000.000 | **229.000.000** |
| **Chi phí Marketing & Campus** | 25.000.000 | 50.000.000 | 90.000.000 | 140.000.000 | **305.000.000** |
| **Chi phí Nội dung & Bản quyền**| 15.000.000 | 25.000.000 | 35.000.000 | 50.000.000 | **125.000.000** |
| **Chi phí Vận hành & Khác** | 12.000.000 | 20.000.000 | 30.000.000 | 45.000.000 | **107.000.000** |
| **TỔNG CHI PHÍ (B)** | **70.000.000** | **131.000.000** | **220.000.000** | **345.000.000** | **766.000.000** |
| **LỢI NHUẬN RÒNG (A - B)** | **-28.400.000** | **+31.650.000** | **+150.400.000** | **+360.000.000** | **+513.650.000** |

* **Điểm hòa vốn (Break-even):** Thời điểm hòa vốn sẽ được tính lại từ bảng dòng tiền theo tháng; bảng quý hiện tại chưa đủ cơ sở xác nhận tháng hòa vốn.
* **Tỷ suất lợi nhuận ròng (Net Profit Margin):** Đạt **40.1%** vào cuối năm thứ 1.

---

## VIII. CHIẾN LƯỢC GO-TO-MARKET (GTM) & ĐO LƯỜNG TĂNG TRƯỞNG

### 1. Chiến lược thâm nhập Campus FPTU & Viral Loop TikTok/Threads

```
       [TIẾP CẬN TỰ NHIÊN]
   Video TikTok "Tín hiệu ca dao"
               │
               ▼
       [TRẢI NGHIỆM MIỄN PHÍ]
  Quét mã QR Campus / Vào App check-in
               │
               ▼
        [CHIA SẺ CẢM XÚC]
  Chia sẻ quẻ xăm / Tín hiệu lên Story
               │
               ▼
        [CHUYỂN ĐỔI HỘI VIÊN]
  Nâng cấp "Tâm An" để xem tử vi AI
```

* **Campus Activation (Offline-to-Online):**
  - Đặt các standee có mã QR tại Thư viện và Hội trường Đại học FPT với thông điệp: *"Quét mã nhận tín hiệu vũ trụ ca dao – Vượt qua kỳ thi bình an"*.
  - Tặng bookmark vật lý in câu đối dân gian độc quyền khi sinh viên đăng ký tài khoản.
* **Organic Viral Loop (Online):**
  - Định dạng video ngắn: *"Tín hiệu vũ trụ hôm nay dành riêng cho bạn từ kho tàng ca dao tục ngữ"*. Nhạc nền êm dịu, hình ảnh đẹp mắt kích thích người xem chia sẻ lên Instagram Story và Threads.

---

### 2. Lộ trình phát triển 3 giai đoạn (Roadmap)

| Giai đoạn | Phạm vi dự kiến | Điều kiện hoàn thành |
| :--- | :--- | :--- |
| **1. Chốt MVP** | Ba luồng: khám phá văn hóa → đọc/lưu bài; hướng dẫn nghi lễ → checklist; check-in → nhận/lưu/xem lại lời chiêm nghiệm. | Rà trùng khảo sát; xác nhận trạng thái và nguồn nội dung; hoàn thiện, rà soát ba luồng trước khi công bố bản MVP. |
| **2. Hoàn thiện nội dung và trải nghiệm** | Mở rộng kho bài có nguồn/quyền sử dụng/thẩm định; bổ sung lịch văn hóa, tra cứu ngày, nội dung nghi lễ; hoàn thiện trải nghiệm chánh niệm, xin xăm/xin keo, hồ sơ tưởng niệm và nhắc giỗ. | Nội dung có hồ sơ nguồn và phê duyệt phù hợp; từng tính năng được kiểm thử và mô tả đúng khả năng thực tế. |
| **3. Mở rộng tích hợp và mô hình kinh doanh** | Hoa đăng kết nối trải nghiệm 3D, các cảnh WebGL/âm thanh nâng cao, AI mở rộng, hội viên, thanh toán, vật phẩm số và hợp tác B2B. | Tích hợp được cấu hình/kiểm thử; quyền lợi, quyền riêng tư, bản quyền và giả định kinh doanh được xác minh trước khi phát hành. |

Các mốc trên là thứ tự dự kiến, chưa phải cam kết thời hạn. Trong khi rà trùng, có thể trình bày thống kê mô tả trên 148 lượt phản hồi nếu ghi rõ dữ liệu chưa khử trùng và mẫu số từng tỷ lệ; kết quả làm sạch sẽ được công bố sau khi thống nhất quy tắc xử lý.

---

### 3. Bộ chỉ số đo lường sản phẩm (AARRR Framework)

* **Acquisition (Thu hút):** Đạt 150.000 người dùng đăng ký sau 12 tháng.
* **Activation (mục tiêu cần kiểm chứng):** Tỷ lệ người dùng hoàn thành ít nhất một trong ba luồng MVP trong 24 giờ đầu.
* **Retention (Giữ chân):** Day-1 Retention đạt 45%, Day-7 đạt 35%, Day-30 đạt 22%.
* **Revenue (Doanh thu):** Tỷ lệ chuyển đổi người dùng trả phí đạt 5.0%.
* **Referral (Lan tỏa):** Hệ số lan tỏa K-factor đạt > 1.2 (Mỗi người dùng mời thêm trung bình 1.2 bạn bè).

---

## IX. BỘ NGUYÊN TẮC ĐẠO ĐỨC & QUẢN TRỊ RỦI RO PHÁP LÝ

### 1. Tuyên ngôn phòng chống mê tín dị đoan và thương mại hóa nỗi sợ

* **Nguyên tắc "Tâm An Vạn Sự An":** Mọi luận giải quẻ thẻ và chiêm tinh đều tập trung vào việc tu dưỡng tâm tính, nỗ lực học tập và làm việc thiện lành.
* **Bộ lọc từ ngữ cấm (Blacklist):** Hệ thống cấm tuyệt đối các thuật ngữ gây hoang mang, hù dọa: *"tai nạn đẫm máu"*, *"chết chóc"*, *"vong bám"*, *"tam tai tán gia bại sản"*, *"phải giải hạn tiền triệu"*.
* **Tự nguyện 100%:** Mọi hoạt động thắp nhang, thả hoa đăng đều là tự nguyện, không gắn với bất kỳ nghĩa vụ tâm linh ép buộc nào.

### 2. Quản trị bản quyền nội dung & Thẩm định văn hóa dân gian

* Hợp tác với các giảng viên bộ môn Văn hóa và các nhà nghiên cứu Hán Nôm để thẩm định các bài văn khấn cổ truyền và điển tích lịch sử.
* Tuân thủ nghiêm ngặt Luật An ninh mạng và các quy định của Bộ Thông tin & Truyền thông về ứng dụng thông tin số.

### 3. Bảo vệ dữ liệu cá nhân & An toàn tâm lý học đường

* Người dùng có thể xóa nội dung cá nhân trong phạm vi tính năng công bố; tài khoản và chứng từ thanh toán được xử lý riêng.
* Chỉ hiển thị liên hệ hỗ trợ của trường khi đã xác minh và cấu hình; nhận diện từ khóa không phải chẩn đoán tâm lý.

---

## X. BỘ 10 CÂU HỎI & ĐÁP ÁN PHẢN BIỆN "SÁT HẠCH" CỦA HỘI ĐỒNG EXE101

### ❓ Câu 1: Dự án này có cổ súy mê tín dị đoan trong môi trường đại học không?
> **Đáp án:** Dạ thưa Hội đồng, ứng dụng không xem bói để phán đoán tương lai hay hù dọa vận hạn. Nội dung hướng tới lời gợi mở hỗ trợ tự suy ngẫm; không thay thế dịch vụ chăm sóc sức khỏe tinh thần. Trích dẫn văn hóa chỉ được dùng khi có nguồn và đã được đối chiếu.

### ❓ Câu 2: Đối thủ cạnh tranh là ai? Người dùng có thể tra văn khấn miễn phí trên Google, tại sao phải dùng app của các bạn?
> **Đáp án:** MVP tập trung vào ba luồng: khám phá văn hóa để đọc/lưu bài, xem hướng dẫn nghi lễ và checklist, check-in để nhận/lưu/xem lại lời chiêm nghiệm. Nội dung cần hiển thị đúng trạng thái nguồn và thẩm định; các phân hệ mở rộng nằm trong roadmap. Chúng em không khẳng định nội dung luôn chuẩn mực hoặc tiện lợi hơn mọi nguồn tra cứu; giá trị hướng tới là trải nghiệm có ngữ cảnh và minh bạch trạng thái kiểm chứng.

### ❓ Câu 3: Mức giá 29.000 VNĐ/tháng có khả thi với sinh viên không?
> **Đáp án:** 29.000 VNĐ/tháng là mức giá giả định cần kiểm chứng bằng khảo sát và thử nghiệm thực tế. Gói chưa mở thanh toán; diễn giải AI theo năm, không gian 3D riêng và thư viện độc quyền chưa phải quyền lợi có thể mua ở MVP. Trong thời gian rà trùng, thống kê mô tả cần ghi rõ mẫu số và trạng thái dữ liệu chưa khử trùng; không suy rộng cho toàn bộ người trẻ Việt Nam.

### ❓ Câu 4: Các bạn làm thế nào để đạt 15.000 người dùng đầu tiên mà không tốn nhiều tiền Marketing?
> **Đáp án:** Dạ, chúng em tận dụng 2 kênh tiếp cận chi phí 0 đồng:
> 1. **Campus Network:** Triển khai trực tiếp tại Đại học FPT thông qua chiến dịch *"Quét mã nhận tín hiệu may mắn mùa thi cử"* phối hợp với các câu lạc bộ sinh viên.
> 2. **Organic Viral Content:** Format *"Tín hiệu vũ trụ từ ca dao tục ngữ"* hiện là xu hướng cực kỳ viral trên TikTok và Threads, giúp chúng em kéo lưu lượng người dùng tự nhiên khổng lồ về ứng dụng mà không cần chạy quảng cáo đắt đỏ.

### ❓ Câu 5: Bàn thờ gia tiên số có làm mất đi tính trang nghiêm truyền thống của phong tục cúng bái không?
> **Đáp án:** Đây là một ý tưởng trong roadmap, không thuộc ba luồng MVP hiện tại và không nhằm thay thế bàn thờ truyền thống. Nếu triển khai, trải nghiệm số sẽ mang tính tưởng niệm tự nguyện; nhóm cần rà soát với người dùng và cố vấn văn hóa để bảo đảm cách thể hiện phù hợp.

### ❓ Câu 6: Dữ liệu tâm sự riêng tư của người dùng được bảo mật như thế nào?
> **Đáp án:** Dạ, an toàn dữ liệu là ưu tiên. Ghi chú lưu trên máy chủ được mã hóa AES-256-GCM bằng khóa cấu hình ở backend; các thao tác backend được phân quyền có thể giải mã, nên đây chưa phải mã hóa đầu cuối. Cache riêng tư trên trình duyệt được mã hóa AES-GCM và phân vùng theo tài khoản. Người dùng có thể xóa nội dung cá nhân trong phạm vi tính năng công bố; tài khoản và chứng từ thanh toán được xử lý riêng. Dịch vụ AI chỉ nhận tâm trạng và chủ đề, không nhận nội dung tâm sự.

### ❓ Câu 7: Đội ngũ đã thực sự xây dựng được sản phẩm chưa hay đây chỉ là ý tưởng trên giấy?
> **Đáp án:** Dạ kính thưa Hội đồng, nhóm đã xây dựng sản phẩm có thể chạy thử nhưng chưa hoàn thiện toàn bộ tầm nhìn. Phạm vi MVP được chốt gồm ba luồng: khám phá văn hóa → đọc/lưu bài; hướng dẫn nghi lễ → checklist; check-in → nhận/lưu/xem lại lời chiêm nghiệm. Các phân hệ xin xăm/xin keo, không gian thờ, hoa đăng, lịch/nhắc giỗ, hội viên và mở rộng 3D/AI nằm trong roadmap; nội dung chỉ được giới thiệu theo đúng trạng thái nguồn và thẩm định.

### ❓ Câu 8: Rủi ro lớn nhất về mặt pháp lý và tôn giáo của dự án là gì và cách phòng tránh?
> **Đáp án:** Dạ, rủi ro lớn nhất là bị hiểu lầm là tổ chức tôn giáo hoặc cổ súy mê tín. Để kiểm soát rủi ro này, chúng em định vị rõ ràng: Đây là **Nền tảng chuyển đổi số văn hóa dân gian và hỗ trợ sức khỏe tinh thần**, không đại diện cho bất kỳ tổ chức tôn giáo cụ thể nào. Đồng thời, nhóm đặt quy trình thẩm định chuyên môn và rà soát ngôn từ làm điều kiện phát hành; chưa tuyên bố toàn bộ tư liệu đã được hội đồng chuyên gia duyệt khi chưa có hồ sơ xác nhận.

### ❓ Câu 9: Tại sao người dùng không xóa app sau khi xin xăm xong (Vấn đề Churn Rate)?
> **Đáp án:** Luồng check-in, lưu và xem lại lời chiêm nghiệm thuộc phạm vi MVP. Nhắc ngày lễ/giỗ và hành trình tâm trạng mở rộng là ý tưởng roadmap cần được kiểm chứng bằng hành vi sử dụng thực tế trước khi đặt mục tiêu giữ chân.

### ❓ Câu 10: Kế hoạch mở rộng (Scalability) của dự án sau môn học EXE101 là gì?
> **Đáp án:** Dạ, sau khi hoàn thành xuất sắc môn EXE101 tại trường, nhóm sẽ:
> 1. Đóng gói ứng dụng di động hoàn chỉnh đưa lên Apple App Store và Google Play Store.
> 2. Mở rộng từ Đại học FPT sang các trường đại học đối tác tại TP.HCM và Hà Nội.
> 3. Nộp hồ sơ tham gia các cuộc thi Khởi nghiệp Sinh viên cấp Quốc gia (SV-Startup, Startup Wheel) để kêu gọi vốn hạt giống (Pre-seed) phát triển thành một doanh nghiệp khởi nghiệp thực thụ.

---

## XI. LỜI KẾT & CAM KẾT HÀNH ĐỘNG CỦA ĐỘI NGŨ KHỞI NGHIỆP

Đề án **"Tin Lắm Tâm Linh" (Thích Cúng Kiếng)** được kiến tạo từ niềm tin sâu sắc rằng: *Văn hóa cội nguồn chính là điểm tựa tinh thần vững chãi nhất cho người trẻ giữa nhịp sống số đầy biến động.* Đội ngũ sinh viên FPT University cam kết dốc trọn trí tuệ, năng lực công nghệ và đạo đức nghề nghiệp để đưa dự án vươn lên vị trí **Top 1 đề án xuất sắc nhất môn học EXE101**, tạo tiền đề vững chắc cho hành trình khởi nghiệp thực chiến trong tương lai.

---
*Tài liệu quy chuẩn phục vụ công tác đánh giá và chấm thi Chung kết môn học EXE101 – FPT University.*
