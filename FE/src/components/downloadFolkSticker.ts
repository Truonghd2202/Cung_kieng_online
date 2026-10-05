export async function downloadFolkSticker(): Promise<void> {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 512;

  const context = canvas.getContext("2d");

  if (!context) {
    throw new Error("Thiết bị chưa tạo được ảnh sticker.");
  }

  // Giữ nền trong suốt.
  context.clearRect(0, 0, 512, 512);

  const drawPetal = (
    x: number,
    y: number,
    rotation: number,
    color: string,
  ) => {
    context.save();
    context.translate(x, y);
    context.rotate(rotation);

    context.beginPath();
    context.moveTo(0, 35);
    context.bezierCurveTo(-65, 5, -58, -65, 0, -115);
    context.bezierCurveTo(58, -65, 65, 5, 0, 35);
    context.closePath();

    context.fillStyle = color;
    context.fill();

    context.strokeStyle = "#fff7ed";
    context.lineWidth = 8;
    context.lineJoin = "round";
    context.stroke();

    context.restore();
  };

  // Hình sen do sản phẩm tự vẽ, không lấy từ tư liệu bên ngoài.
  drawPetal(180, 265, -0.8, "#b95f58");
  drawPetal(332, 265, 0.8, "#b95f58");
  drawPetal(215, 240, -0.35, "#d98678");
  drawPetal(297, 240, 0.35, "#d98678");
  drawPetal(256, 220, 0, "#efa899");

  context.beginPath();
  context.ellipse(256, 305, 100, 24, 0, 0, Math.PI * 2);
  context.fillStyle = "#66816b";
  context.fill();
  context.strokeStyle = "#fff7ed";
  context.lineWidth = 8;
  context.stroke();

  context.font = "bold 38px sans-serif";
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.lineJoin = "round";

  context.strokeStyle = "#fff7ed";
  context.lineWidth = 10;
  context.strokeText("Gửi bạn bình an", 256, 380);

  context.fillStyle = "#763b31";
  context.fillText("Gửi bạn bình an", 256, 380);

  const blob = await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob((result) => {
      if (result) {
        resolve(result);
      } else {
        reject(new Error("Chưa tạo được file sticker."));
      }
    }, "image/png");
  });

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  try {
    link.href = url;
    link.download = "tin-lam-tam-linh-gui-ban-binh-an.png";
    document.body.appendChild(link);
    link.click();
  } finally {
    link.remove();

    // Chờ trình duyệt tiếp nhận thao tác tải trước khi thu hồi URL.
    window.setTimeout(() => URL.revokeObjectURL(url), 10000);
  }
}
