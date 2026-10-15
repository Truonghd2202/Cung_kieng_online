# EXE101 và mức sẵn sàng sản phẩm — Tin Lắm Tâm Linh

## Mục đích

Tài liệu này tách hai câu hỏi đang bị trộn lẫn:

1. Dự án chứng minh được điều gì trong khuôn khổ EXE101?
2. Phần mềm/nội dung nào đã đủ điều kiện để mở cho người dùng thật?

Đây là cách đọc tài liệu Requirements hiện có, không phải rubric chính thức của FPTU. Danh mục môn học FPTU gọi EXE101 là *Experiential Entrepreneurship 1* ở học kỳ 7 và ghép tiếp với EXE201 ở học kỳ 8 ([FPTU Learning Materials](https://flm.fpt.edu.vn/compo/detail/2481)). Trang công khai xác nhận tên và bối cảnh môn, không nêu rubric chấm điểm. Muốn kết luận điểm số theo từng tiêu chí cần rubric/brief đúng kỳ học từ giảng viên.

## Cách hiểu đúng trạng thái

- **Bản mẫu để chứng minh giả thuyết:** luồng có thể chạy, dữ liệu thử được ghi rõ là dữ liệu thử, nhóm thu được phản hồi từ người thuộc tệp mục tiêu.
- **MVP có thể thử với người dùng:** chức năng quan trọng hoạt động ổn định trong phạm vi công bố; thu thập phản hồi và bảo vệ dữ liệu phù hợp.
- **Nội dung/feature sẵn sàng xuất bản rộng:** nguồn, độ chính xác, quyền của đúng tài sản được dùng, người duyệt và trạng thái phiên bản đã rõ.

Một feature có thể hữu ích cho phần trình bày/kiểm chứng ý tưởng khi chưa đạt trạng thái xuất bản rộng, miễn là nhóm nói thật về giới hạn và không trình dữ liệu mẫu là dữ liệu đã xác minh.

## Ma trận phạm vi áp dụng cho dự án

| Nhóm việc | Cần chứng minh trong đề án EXE101 | Cần trước khi mở cho người dùng thật | Tình trạng/ghi chú từ Requirements |
|---|---|---|---|
| Vấn đề và người dùng | Có bằng chứng từ đúng nhóm khách hàng rằng vấn đề quan trọng và giải pháp có giá trị; lưu được cách khảo sát/phỏng vấn và kết quả. | Tiếp tục đo hành vi sử dụng, phản hồi, khiếu nại và mức giữ chân. | Tài liệu nêu khảo sát 382 người và các tỷ lệ. Cần đối chiếu phiếu/biểu mẫu, cách lấy mẫu, thời gian, câu hỏi và dữ liệu gốc trước khi gọi đó là chứng cứ khảo sát thật. |
| Persona, UVP, thị trường và đối thủ | Giải thích được phân khúc ưu tiên, nhu cầu, giải pháp thay thế và giả định TAM/SAM/SOM. | Cập nhật bằng dữ liệu thị trường và người dùng sau khi thử nghiệm. | Nội dung trong Requirements là luận điểm/ước tính; mỗi con số cần nguồn hoặc nhãn “giả định”. |
| Prototype/MVP và luồng chính | Một luồng đầu-cuối đại diện cho giá trị cốt lõi có thể chạy; quan sát người thật dùng thử và ghi lại điều đã thay đổi sau phản hồi. | Các luồng đã công bố cần hoạt động ổn định, xử lý lỗi, truy cập, dữ liệu và hỗ trợ người dùng đầy đủ. | Có nhiều module FE/BE; cần chọn luồng trọng tâm và đo thử, không đồng nhất “có màn hình/API” với “đã chứng minh giá trị” hoặc “sẵn sàng vận hành”. |
| Nội dung văn hóa | Có mẫu nội dung đủ tin để minh họa giá trị sản phẩm; phần nháp, ví dụ, giới hạn và nguồn được nói rõ. | Từng bài/thẻ hiển thị như đã xác minh phải có căn cứ, đối chiếu chuyên môn và quyền của tài sản được tái sử dụng. | 14 bài văn hóa FE chưa được ghi nhận là đã duyệt; 0 bộ xin xăm đủ điều kiện. Điều này hạn chế việc tuyên bố kho tư liệu đã xác minh, nhưng không tự nó phủ định khả năng chứng minh prototype. |
| Bản quyền | Trong prototype, dùng nội dung nhóm tự viết và tài sản nhóm tự tạo/được phép dùng; ghi nguồn cho tính liêm chính học thuật. | Kiểm tra quyền cho từng ảnh, bản ghi, bản dịch, phần văn bản/lời bài được sao chép hoặc sử dụng; lưu giấy phép/thỏa thuận khi cần. | Không phải xin phép cho mọi tài liệu chỉ vì đã đọc để nghiên cứu. Trọng tâm là không sao chép tài sản có bản quyền khi chưa rõ điều kiện sử dụng. Tên nguồn và trích dẫn không tự cấp quyền dùng lại. |
| Tính năng xin xăm | Có thể kiểm chứng trải nghiệm với dữ liệu mô phỏng được gắn nhãn rõ, nếu điều kiện lớp cho phép; không trình bày bản dịch AI/fixture là bản thật đã duyệt. | Nếu phát hành bộ xăm thật: đối chiếu đúng bản/địa phương, hoàn thiện bản dịch/diễn giải, quyền liên quan và thẩm định phù hợp. | Dữ liệu hiện chưa đạt cổng nội dung. Tài liệu cũng đánh dấu xin xăm 3D là roadmap; phân biệt luồng 2D hiện có với yêu cầu 3D tương lai. |
| Tử vi/AI | Trình bày chính xác khả năng hiện có và giới hạn; kiểm chứng tác vụ đang tuyên bố. | Nếu cung cấp thật: vận hành dịch vụ AI ổn định, bảo vệ dữ liệu, giảm tác hại và xử lý sự cố. | Requirements xác nhận hiện chỉ tạo diễn giải suy ngẫm, chưa tính lá số; không quảng bá như công cụ lập lá số. |
| Hạ tầng và tích hợp | Demo có thể dùng cấu hình thử, nhưng phải nói rõ sandbox/mock và chỉ chứng minh đúng phần đã chạy. | SMTP, Gemini, VAPID, thanh toán, hotline và các dịch vụ ngoài phải được cấu hình, kiểm tra đầu-cuối trước khi hứa với người dùng. | Requirements tự ghi SMTP/Gemini/VAPID chưa được xác thực; merchant VNPay và hotline trường chưa cấu hình. |
| Mô hình kinh doanh và tài chính | Nêu giả định, cách kiểm tra willingness-to-pay, chi phí và rủi ro; phân biệt dữ liệu thực với dự báo. | Thu tiền thật mới cần hoàn chỉnh checkout, quyền lợi, hoàn tiền, hỗ trợ và nghĩa vụ liên quan. | Checkout/hội viên chưa khả dụng; giá và dự phóng cần trình bày như giả định, không như doanh thu đã có. |
| Bảo mật, riêng tư và an toàn tâm lý | Prototype dùng dữ liệu giả/đã ẩn danh; không đưa thông tin nhạy cảm thật lên màn hình trình bày. | Cần thiết kế và kiểm tra quyền truy cập, xóa/xuất dữ liệu, lưu trữ, đồng thuận, hotline chính thức và ứng phó rủi ro tâm lý. | Hotline chính thức chưa được cấu hình theo Requirements; thông tin mặc định không tương đương tích hợp đã xác minh. |

## Thứ tự công việc hợp lý cho EXE101

1. Đối chiếu yêu cầu lớp với rubric/brief EXE101 đúng kỳ; không suy điểm từ một đề án tự viết.
2. Kiểm tra tính xác thực của chứng cứ khảo sát và các số liệu thị trường; đánh dấu số chưa xác minh là giả định.
3. Chọn một vấn đề và một luồng MVP trọng tâm; chạy thử với nhóm người dùng đúng persona; ghi nhận lỗi, phản hồi và vòng cải tiến.
4. Trong pitch/demo, chỉ tuyên bố trạng thái đã thực sự chạy; gắn nhãn rõ dữ liệu mẫu, tích hợp giả lập và roadmap.
5. Xây backlog hoàn thiện sản phẩm thật sau đó theo mức độ rủi ro và tần suất người dùng gặp, bao gồm các cổng thẩm định nội dung và quyền của tài sản thật sự đưa lên.

## Kết luận cho câu hỏi bản quyền

Bản quyền là một phần kiểm soát đối với nội dung/tài sản, không phải điều kiện phải giải quyết cho toàn bộ mã nguồn, chức năng hay đề án EXE101. Bài đình làng đang rà hiện cần ưu tiên sửa các nhận định khái quát thiếu căn cứ; quyền sử dụng đáng kiểm tra trước nhất là ảnh `temple_bac_bo.jpg` và mọi đoạn văn/âm thanh/ảnh khác lấy từ bên ngoài. Với xin xăm, ngoài quyền còn có độ xác thực của bản gốc, bản dịch và cách diễn giải.
