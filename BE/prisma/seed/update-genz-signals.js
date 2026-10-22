const prisma = require('../../src/config/prisma');
const { signalContentHash, removeLegacyEditorialState, parseSignalContent } = require('../../src/services/signal-publication');

const GENZ_POETIC_DICTIONARY = {
  // 1. UNSTABLE - Chênh vênh
  'UNSTABLE::study': {
    line1: 'Đường học dẫu dài, cứ bắt đầu từ việc nhỏ.',
    line2: 'Giữ lòng bình tĩnh, lối đi tự khắc tỏ tường.',
    advice: 'Đừng để cả kỳ thi hay cả chồng sách làm bạn ngợp. Mở một trang sách hoặc làm một bài tập nhỏ trước, bạn sẽ thấy mọi thứ bớt rối ngay.'
  },
  'UNSTABLE::work': {
    line1: 'Bao nhiêu áp lực ngoài kia, xin dừng một nhịp gỡ từng việc thôi.',
    line2: 'Tâm an giữ vững nụ cười, đường đi nước bước tự nhiên hanh thông.',
    advice: 'Ghi ra giấy 3 việc quan trọng nhất hôm nay và tập trung làm từng việc một. Bạn không cần phải giải quyết hết mọi thứ cùng lúc.'
  },
  'UNSTABLE::family': {
    line1: 'Mái nhà dẫu có bão giông, người thương vẫn đợi ấm nồng cơm canh.',
    line2: 'Một câu thăm hỏi ngọt lành, chênh vênh phút chốc hóa thành bình yên.',
    advice: 'Khi thấy chông chênh, hãy gọi điện về nhà hoặc nhắn một tin hỏi thăm bố mẹ. Cội nguồn gia đình luôn là bến đỗ bình an nhất.'
  },
  'UNSTABLE::relationship': {
    line1: 'Thương người trước phải thương mình, chớ vì hụt hẫng đánh rơi nụ cười.',
    line2: 'Duyên lành cần đợi đúng thời, lòng an tĩnh lại rạng ngời mai sau.',
    advice: 'Lắng nghe cảm xúc của chính mình trước khi cố làm hài lòng ai đó. Bạn xứng đáng được tôn trọng và yêu thương đúng cách.'
  },
  'UNSTABLE::general': {
    line1: 'Gió nổi mây trôi trời lại sáng, chênh vênh giây phút chớ vội lo.',
    line2: 'Thở sâu một nhịp dịu lòng, khó khăn rồi cũng tự trôi qua dần.',
    advice: 'Nhắm mắt lại, hít vào một hơi thật sâu và thở ra thật chậm. Cảm giác chông chênh chỉ là tạm thời, bạn vẫn đang làm rất tốt.'
  },

  // 2. PEACEFUL - An yên
  'PEACEFUL::study': {
    line1: 'Tâm trí thảnh thơi học điều mình thích, mỗi trang sách mở rạng niềm vui.',
    line2: 'Chẳng cần so sánh cùng ai, bước chân vững chãi tương lai rạng ngời.',
    advice: 'Tận dụng lúc đầu óc đang sáng suốt và thoải mái này để học sâu hơn về lĩnh vực mà bạn thực sự đam mê.'
  },
  'PEACEFUL::work': {
    line1: 'Làm việc thuận duyên lòng nhẹ nhõm, gặt hái an vui giữa bộn bề.',
    line2: 'Cứ kiên trì với đam mê, quả ngọt ắt đến trọn bề ước mong.',
    advice: 'Duy trì nhịp làm việc thư thái này. Làm tốt từng việc nhỏ với sự tận tâm sẽ đem lại kết quả bất ngờ.'
  },
  'PEACEFUL::family': {
    line1: 'Bếp ấm cơm ngon thơm hương thảo, nhà là nơi để ta trở về.',
    line2: 'Tiếng cười rộn rã sum vầy, an yên trọn vẹn tràn đầy yêu thương.',
    advice: 'Dành trọn vẹn buổi tối nay bên người thân mà không dán mắt vào điện thoại. Khoảnh khắc sum vầy là liều thuốc chữa lành quý giá nhất.'
  },
  'PEACEFUL::relationship': {
    line1: 'Bình yên ở cạnh bên nhau, không cần ồn ã vẫn sâu nghĩa tình.',
    line2: 'Cùng nhau chia sẻ tâm tình, nâng niu từng phút yên bình tháng năm.',
    advice: 'Tình yêu đẹp là tình yêu mang lại cảm giác bình yên trong lòng. Hãy trân trọng người đang mang đến cho bạn cảm giác an tâm này.'
  },
  'PEACEFUL::general': {
    line1: 'Một tách trà thơm chiều êm ả, nghe lòng lắng lại những âu lo.',
    line2: 'Sống trọn cho từng phút giây, an yên hạnh phúc đong đầy quanh ta.',
    advice: 'Đặt tay lên ngực và tự cảm ơn bản thân vì đã nỗ lực đi đến ngày hôm nay. Hãy tận hưởng trọn vẹn sự bình yên này.'
  },

  // 3. WORRIED - Băn khoăn
  'WORRIED::study': {
    line1: 'Chưa hiểu bài sâu chớ vội ngại, hỏi người đi trước rạng đường ngay.',
    line2: 'Băn khoăn là bước tiến dài, mở ra hiểu biết cho ngày mai sau.',
    advice: 'Băn khoăn nghĩa là bạn đang chịu học hỏi và muốn tiến bộ. Đừng ngại hỏi thầy cô hay bạn bè về điều mình chưa hiểu.'
  },
  'WORRIED::work': {
    line1: 'Đứng trước nhiều lựa chọn khó, hãy nghe con tim mách bảo đường đi.',
    line2: 'Chân thành vững bước kiên trì, khó khăn rồi sẽ tan đi nhẹ nhàng.',
    advice: 'Ghi ra giấy các phương án và cân nhắc xem điều nào phù hợp với giá trị sống của bạn nhất. Quyết định sẽ sáng rõ hơn.'
  },
  'WORRIED::family': {
    line1: 'Chuyện nhà có chút hiểu lầm, ngồi lại trò chuyện tỏ lòng cùng nhau.',
    line2: 'Lắng nghe để hiểu người thân, bao dung vun đắp yêu thương tròn đầy.',
    advice: 'Thay vì giữ bực bội trong lòng, hãy tìm một thời điểm thích hợp để nhẹ nhàng chia sẻ cảm xúc của mình với gia đình.'
  },
  'WORRIED::relationship': {
    line1: 'Tình cảm có lúc rối bời, đừng vội suy đoán những lời vu vơ.',
    line2: 'Cứ trao nhau chữ chân tình, thẳng thắn chia sẻ lòng mình an yên.',
    advice: 'Đừng tự nghĩ ngợi một mình. Một cuộc trò chuyện thẳng thắn và dịu dàng sẽ giải tỏa phần lớn hiểu lầm giữa hai người.'
  },
  'WORRIED::general': {
    line1: 'Sương mai giăng lối chưa tỏ lối, bình tâm đợi nắng ấm chan hòa.',
    line2: 'Lòng tĩnh nhìn thấu sự đời, đường đi ắt sáng rạng ngời tương lai.',
    advice: 'Khi lòng còn rối bời, đừng vội đưa ra quyết định lớn. Hãy ngủ một giấc thật ngon, ngày mai mọi thứ sẽ sáng rõ hơn.'
  },

  // 4. IMPATIENT - Nôn nóng
  'IMPATIENT::study': {
    line1: 'Học hành là chặng đường dài, kiên trì từng bước tương lai rạng ngời.',
    line2: 'Chớ vội nôn nóng một thời, kiến thức tích lũy muôn lời nở hoa.',
    advice: 'Muốn học giỏi không thể xong trong một đêm. Hãy chia nhỏ bài học thành từng phần 25 phút và kiên nhẫn tích lũy.'
  },
  'IMPATIENT::work': {
    line1: 'Cây đợi trổ hoa cần nắng ấm, trái chờ chín ngọt đợi ngày thu.',
    line2: 'Làm tốt việc nhỏ hôm nay, thành quả lớn sẽ trong tay sớm ngày.',
    advice: 'Hạ nhịp thở xuống và tập trung làm thật chỉn chu công việc trước mắt. Nôn nóng chỉ khiến bạn dễ mắc sai sót hơn.'
  },
  'IMPATIENT::family': {
    line1: 'Lời nóng giận buông lòng đau xót, nhẫn nhịn một câu ấm cửa nhà.',
    line2: 'Gia đình gắn bó thiết tha, hòa nhã chia sẻ vượt qua muộn phiền.',
    advice: 'Khi cảm thấy bực bội, hãy hít thở 3 hơi thật sâu và đi uống một ngụm nước trước khi nói chuyện với người thân.'
  },
  'IMPATIENT::relationship': {
    line1: 'Tình cảm nuôi dưỡng dài lâu, chớ vội hối thúc cho sầu thêm sâu.',
    line2: 'Chậm lại để hiểu nhau hơn, chân thành gắn kết keo sơn tháng ngày.',
    advice: 'Mối quan hệ tốt cần thời gian để phát triển tự nhiên. Đừng vội vàng đòi hỏi câu trả lời hay kết quả ngay lập tức.'
  },
  'IMPATIENT::general': {
    line1: 'Chậm lại một nhịp thở êm, ngắm nhìn cuộc sống dịu êm quanh mình.',
    line2: 'Vội vã chi với nhịp đời, bình tâm ta thấy muôn lời bình an.',
    advice: 'Rót cho mình một cốc nước ấm, thả lỏng bờ vai và uống từng ngụm nhỏ. Cảm nhận cơ thể đang chậm rãi dịu lại.'
  },

  // 5. GRATEFUL - Biết ơn
  'GRATEFUL::study': {
    line1: 'Biết ơn thầy bạn bên đời, trao truyền kiến thức rạng ngời tương lai.',
    line2: 'Trân quý từng buổi học hay, mở mang trí óc từng ngày vươn xa.',
    advice: 'Gửi một tin nhắn cảm ơn người thầy hoặc người bạn đã giúp đỡ bạn hiểu bài học trong tuần này.'
  },
  'GRATEFUL::work': {
    line1: 'Biết ơn công việc mỗi ngày, ơn người đồng đội chung tay sát kề.',
    line2: 'Cùng nhau chia sẻ buồn vui, vững bước đi tới rạng ngời tương lai.',
    advice: 'Nói lời cảm ơn đến một đồng nghiệp đã hỗ trợ bạn, hoặc đơn giản là trân trọng công việc đang giúp bạn trưởng thành.'
  },
  'GRATEFUL::family': {
    line1: 'Công cha nghĩa mẹ sinh thành, cả đời nuôi nấng ngọt lành vì con.',
    line2: 'Tấm lòng hiếu thảo vuông tròn, gia đình êm ấm sắc son một đời.',
    advice: 'Làm một việc nhỏ giúp đỡ gia đình hôm nay, như dọn dẹp hoặc mua một món ăn vặt mà bố mẹ thích.'
  },
  'GRATEFUL::relationship': {
    line1: 'Cảm ơn người bước vào đời, cùng ta chia sẻ nụ cười niềm vui.',
    line2: 'Bên nhau qua những bùi ngùi, chân tình trao gửi ngọt bùi mai sau.',
    advice: 'Nói với người bạn yêu quý một điều mà bạn cảm thấy biết ơn khi có họ bên cạnh trong cuộc sống.'
  },
  'GRATEFUL::general': {
    line1: 'Cảm ơn ngày mới ban cho, bình an thức giấc chẳng lo nghĩ nhiều.',
    line2: 'Cuộc đời tươi đẹp bao nhiêu, trao đi yêu mến nhận nhiều an vui.',
    advice: 'Nghĩ về 3 điều giản dị mà bạn thấy may mắn hôm nay: một bữa ăn ấm bụng, một chiếc giường êm, và một tâm hồn lành lặn.'
  },

  // 6. NEED_SUPPORT - Cần điểm tựa
  'NEED_SUPPORT::study': {
    line1: 'Đường học gập ghềnh chớ lo, tìm người cùng bước lắng lo vơi dần.',
    line2: 'Mở lòng đón nhận sẻ chia, bạn bè thầy cô sớm khuya đồng hành.',
    advice: 'Nhờ vả sự giúp đỡ khi chưa hiểu bài không phải là kém cỏi, mà là dũng cảm. Hãy hỏi người bạn tin tưởng nhé.'
  },
  'NEED_SUPPORT::work': {
    line1: 'Gánh nặng vai mỏi xin chia bớt, tìm người đồng chí sẻ chia cùng.',
    line2: 'Chung sức vượt mọi chông gai, việc khó rồi cũng hóa mây nhẹ nhàng.',
    advice: 'Chủ động trao đổi với cấp trên hoặc đồng đội về khối lượng công việc hiện tại. Đừng cố gồng gánh một mình đến kiệt sức.'
  },
  'NEED_SUPPORT::family': {
    line1: 'Đi khắp muôn nẻo đường đời, chẳng đâu ấm áp bằng nơi quê nhà.',
    line2: 'Về nhà tựa mái ấm xưa, bao nhiêu mỏi mệt nắng mưa tan dần.',
    advice: 'Hãy về nhà hoặc gọi điện cho người thân mà bạn cảm thấy an tâm nhất. Tình thương gia đình sẽ sạc đầy năng lượng cho bạn.'
  },
  'NEED_SUPPORT::relationship': {
    line1: 'Cần một ánh mắt chở che, cần một cái ôm vỗ về sớm hôm.',
    line2: 'Cùng nhau bước qua nỗi buồn, tay nắm chặt tay ấm nồng tình thương.',
    advice: 'Hãy thành thật nói với người thương rằng hôm nay bạn thấy yếu lòng và chỉ cần một cái ôm dịu dàng không phán xét.'
  },
  'NEED_SUPPORT::general': {
    line1: 'Có những ngày mỏi rã rời, cho phép mình nghỉ một thời thảnh thơi.',
    line2: 'Tựa vào hơi thở buông lơi, đất mẹ nâng đỡ sáng ngời tâm can.',
    advice: 'Ngồi tựa lưng vào ghế hoặc nằm xuống thư giãn, thả lỏng toàn bộ cơ thể. Bạn được phép nghỉ ngơi khi đã quá mệt.'
  },

  // 7. PRESSURED - Áp lực
  'PRESSURED::study': {
    line1: 'Học để mở rộng tầm nhìn, chớ vì ganh đua mà phiền lòng đau.',
    line2: 'Buông bớt áp lực điểm thi, nỗ lực hết sức sợ gì ngày mai.',
    advice: 'Điểm số không định nghĩa toàn bộ giá trị con người bạn. Hãy tập trung làm tốt nhất có thể và học vì sự hiểu biết của chính mình.'
  },
  'PRESSURED::work': {
    line1: 'Danh vọng tiền tài ngoài thân, giữ cho sức khỏe tinh thần bình an.',
    line2: 'Buông bớt những việc nặng mang, thong dong tự tại nhẹ nhàng bước đi.',
    advice: 'Học cách từ chối những việc vượt quá giới hạn chịu đựng. Sức khỏe tinh thần của bạn mới là thứ quan trọng nhất.'
  },
  'PRESSURED::family': {
    line1: 'Kỳ vọng đè nặng trên vai, ngồi lại chia sẻ tỏ bày cùng nhau.',
    line2: 'Bố mẹ mong con bình an, chữ hiếu cốt ở tấm lòng thảnh thơi.',
    advice: 'Nhẹ nhàng chia sẻ với bố mẹ về những áp lực bạn đang gánh vác. Thấu hiểu sẽ giúp hóa giải những kỳ vọng đè nặng.'
  },
  'PRESSURED::relationship': {
    line1: 'Yêu thương đâu phải gồng mình, cứ là chính bạn chân tình bên nhau.',
    line2: 'Không cần hoàn hảo sắc màu, thấu hiểu khuyết điểm cùng nhau trưởng thành.',
    advice: 'Người yêu bạn thật lòng sẽ trân trọng cả những lúc bạn vụng về, mỏi mệt. Đừng tự ép mình phải luôn hoàn hảo.'
  },
  'PRESSURED::general': {
    line1: 'Thở ra buông hết muộn phiền, hít vào năng lượng dịu hiền trong veo.',
    line2: 'Gánh nặng rơi xuống theo dòng, lòng an thanh thản nhẹ lòng mây bay.',
    advice: 'Thả lỏng hai vai, nhắm mắt lại và thở dài một hơi thật mạnh. Đẩy hết mọi căng thẳng đang tích tụ trong lồng ngực ra ngoài.'
  },

  // 8. LONELY - Cô đơn
  'LONELY::study': {
    line1: 'Một mình đèn khuya học bài, đừng buồn vì bước đường dài cô đơn.',
    line2: 'Vượt qua khoảng lặng hôm nay, tương lai rực rỡ đón tay chào mời.',
    advice: 'Khoảng thời gian một mình học tập này đang tôi luyện sự bản lĩnh cho bạn. Bạn đang xây dựng tương lai vững chắc cho chính mình.'
  },
  'LONELY::work': {
    line1: 'Một mình giữa chốn đông người, giữ tâm vững chãi nụ cười an vui.',
    line2: 'Tự mình soi sáng đường đi, mạnh mẽ vững bước ngại chi sự đời.',
    advice: 'Tự thưởng cho bản thân một món quà nhỏ hoặc đồ uống yêu thích sau giờ làm. Bạn chính là chỗ dựa đáng tin cậy nhất của mình.'
  },
  'LONELY::family': {
    line1: 'Xa nhà nhớ dáng mẹ cha, nỗi niềm gửi gắm phương xa ấm nồng.',
    line2: 'Một lời nhắn gửi qua sông, sợi dây gắn kết trong lòng không phai.',
    advice: 'Nhắn một tin nhắn ngắn vào nhóm chat gia đình. Dù ở xa, sự quan tâm giản dị sẽ giúp bạn không còn cảm thấy lẻ loi.'
  },
  'LONELY::relationship': {
    line1: 'Độc thân đâu phải là buồn, tự do tự tại ngắm muôn sắc đời.',
    line2: 'Biết yêu quý lấy thân mình, duyên lành tự đến trọn tình mai sau.',
    advice: 'Tận hưởng khoảng thời gian độc thân để chăm sóc bản thân và theo đuổi sở thích. Người tuyệt vời sẽ xuất hiện vào lúc thích hợp.'
  },
  'LONELY::general': {
    line1: 'Cô đơn là lúc ta về, lắng nghe tiếng nói bộn bề trong tâm.',
    line2: 'Kết nối sâu với chính mình, an yên tỏa sáng rạng ngời muôn nơi.',
    advice: 'Bật một bài nhạc nhẹ nhàng, ngồi uống trà hoặc viết nhật ký. Học cách làm bạn với chính mình là một siêu năng lực.'
  },

  // 9. HAPPY - Vui vẻ
  'HAPPY::study': {
    line1: 'Hiểu bài lòng thấy hân hoan, niềm vui học tập ngập tràn sớm mai.',
    line2: 'Mỗi ngày tích lũy điều hay, tự tin cất bước tương lai rạng ngời.',
    advice: 'Chia sẻ niềm vui hiểu bài này với bạn bè hoặc đánh dấu lại trang sách hay để lưu giữ cảm giác hào hứng này.'
  },
  'HAPPY::work': {
    line1: 'Việc xong lòng nhẹ như mây, nụ cười rạng rỡ đong đầy an vui.',
    line2: 'San sẻ thành quả ngọt bùi, cùng nhau tiến bước nụ cười nở hoa.',
    advice: 'Tự hào về những gì bạn đã làm được hôm nay. Hãy tự khen thưởng bản thân vì một ngày làm việc hiệu quả!'
  },
  'HAPPY::family': {
    line1: 'Tiếng cười rộn rã trong nhà, sum vầy ấm cúng thiết tha nghĩa tình.',
    line2: 'Bên nhau chia sẻ tâm tình, gia đình hạnh phúc rạng ngời mai sau.',
    advice: 'Chụp lại một tấm ảnh vui vẻ cùng người thân hoặc kể cho bố mẹ nghe một câu chuyện vui bạn gặp hôm nay.'
  },
  'HAPPY::relationship': {
    line1: 'Hai trái tim cùng hòa nhịp, nụ cười rạng rỡ ánh nhìn đắm say.',
    line2: 'Bên nhau qua tháng năm dài, nắm tay đi tới tương lai sáng ngời.',
    advice: 'Gửi một lời nhắn yêu thương hoặc làm một hành động nhỏ bất ngờ cho người ấy để nhân đôi niềm hạnh phúc.'
  },
  'HAPPY::general': {
    line1: 'Lòng vui cảnh sắc cũng tươi, cỏ cây hoa lá mỉm cười đón ta.',
    line2: 'Giữ trọn năng lượng chan hòa, lan tỏa hạnh phúc tới muôn nẻo đường.',
    advice: 'Mỉm cười với những người bạn gặp hôm nay. Năng lượng tích cực của bạn có sức lan tỏa và chữa lành rất mạnh mẽ.'
  },

  // 10. OTHER - Mông lung
  'OTHER::study': {
    line1: 'Chưa rõ lối đi tương lai, xin đừng hoảng sợ chớ ngại mông lung.',
    line2: 'Cứ làm tốt việc trước mắt, con đường phía trước tự nhiên mở ra.',
    advice: 'Không ai biết trước 100% tương lai. Hãy tập trung làm tốt bài tập và kỳ thi hôm nay, từng bước đi sẽ dần sáng tỏ.'
  },
  'OTHER::work': {
    line1: 'Ngã rẽ cuộc đời nhiều lối, chưa rõ hướng đi cứ chậm bước dừng.',
    line2: 'Lắng nghe sở thích trong tâm, lối đi đúng đắn sẽ dần hiện ra.',
    advice: 'Viết ra 3 việc bạn thấy hào hứng nhất khi làm. Lắng nghe sở thích tự nhiên sẽ giúp bạn định hình con đường sự nghiệp rõ ràng hơn.'
  },
  'OTHER::family': {
    line1: 'Chuyện nhà đôi lúc rối bời, thời gian sẽ giúp tỏ tường mọi điều.',
    line2: 'Cứ giữ trọn chữ thảo thơm, yêu thương gắn kết ấm nồng gia phong.',
    advice: 'Không cần ép mình phải giải quyết mọi mâu thuẫn gia đình ngay lập tức. Giữ sự bình tĩnh và tôn trọng là chìa khóa tốt nhất.'
  },
  'OTHER::relationship': {
    line1: 'Mông lung cảm xúc chưa tỏ, chớ vội vàng trao vội những hẹn thề.',
    line2: 'Cứ cho nhau thời gian hiểu, tình cảm chín muồi mới đậm sâu.',
    advice: 'Đừng vội đặt tên hay ràng buộc cho mối quan hệ khi bạn chưa thực sự chắc chắn. Hãy để cảm xúc phát triển tự nhiên.'
  },
  'OTHER::general': {
    line1: 'Sương mai giăng kín mây mờ, chớ ngại mông lung giữa dòng đời trôi.',
    line2: 'Giữ tâm trong sáng thiện lành, mây tan nắng ấm trời xanh lại về.',
    advice: 'Cảm giác mông lung là hoàn toàn bình thường ở tuổi đôi mươi. Hãy xem đây là khoảng lặng cần thiết để bạn tìm hiểu sâu hơn về chính mình.'
  }
};

(async () => {
  const allSignals = await prisma.signals.findMany();
  console.log('Mass upgrading 106 signals for Gen Z tone of voice...');

  let count = 0;
  for (const signal of allSignals) {
    const key = signal.mood + '::' + signal.context_key;
    const poeticData = GENZ_POETIC_DICTIONARY[key] || GENZ_POETIC_DICTIONARY[signal.mood + '::general'] || {
      line1: 'Thở sâu một nhịp dịu lòng, khó khăn rồi cũng tự trôi qua dần.',
      line2: 'Giữ tâm trong sáng thiện lành, mây tan nắng ấm trời xanh lại về.',
      advice: 'Hít thở sâu và lắng lại tâm mình. Mọi điều tốt đẹp đều bắt đầu từ một nội tâm an tĩnh.'
    };

    const parsed = parseSignalContent(signal.content);
    if (!parsed) continue;

    parsed.poem = {
      line1: poeticData.line1,
      line2: poeticData.line2,
      subtext: 'Lời gợi mở chiêm nghiệm đương đại · Đồng hành cùng tâm an.'
    };
    parsed.reflection = {
      ...parsed.reflection,
      advice: poeticData.advice
    };
    parsed.guestPreview = {
      title: 'MẠCH NGUỒN AN LÀNH',
      message: poeticData.line1
    };
    if (parsed.loadingFacts) {
      parsed.loadingFacts.thoughtContent = poeticData.line1;
    }

    const cleanContent = JSON.stringify(removeLegacyEditorialState(parsed));

    const candidateForHash = {
      id: signal.id,
      source: signal.source,
      mood: signal.mood,
      context_key: signal.context_key,
      title: signal.title,
      category: signal.category,
      advice: poeticData.advice,
      region: signal.region,
      content: parseSignalContent(cleanContent),
    };
    const hash = signalContentHash(candidateForHash);

    await prisma.signals.update({
      where: { id: signal.id },
      data: {
        content: cleanContent,
        advice: poeticData.advice,
        approved_content_hash: hash,
        updated_at: new Date(),
      }
    });
    count++;
  }

  console.log('Successfully upgraded', count, 'signals to Gen Z tone of voice!');
  process.exit(0);
})();
