import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { Button } from "./ui/button";
import { Flame, RotateCcw, Sparkles, Eye, Volume2, ShieldCheck } from "lucide-react";

// Hàm tạo texture gạch Bát Tràng cổ truyền (Bat Trang Terracotta Tile Texture)
function createBatTrangTileTexture(): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext("2d")!;

  ctx.fillStyle = "#8a3324"; // Màu đỏ gạch nung Bát Tràng
  ctx.fillRect(0, 0, 512, 512);

  const tileSize = 128;
  const gutter = 4;

  for (let y = 0; y < 512; y += tileSize) {
    for (let x = 0; x < 512; x += tileSize) {
      // Độ biến thiên màu sắc giữa từng viên gạch nung thủ công
      const shade = Math.floor((Math.sin(x * 12.3 + y * 45.6) * 0.5 + 0.5) * 25);
      const r = 138 + shade;
      const g = 51 + Math.floor(shade * 0.6);
      const b = 36 + Math.floor(shade * 0.4);

      ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
      ctx.fillRect(x + gutter / 2, y + gutter / 2, tileSize - gutter, tileSize - gutter);

      // Vân xước gạch nung nhẹ
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      for (let i = 0; i < 8; i++) {
        const sx = x + Math.random() * tileSize;
        const sy = y + Math.random() * tileSize;
        ctx.fillRect(sx, sy, Math.random() * 20, 2);
      }
    }
  }

  // Mạch vữa vôi trắng ngà cổ kính
  ctx.strokeStyle = "rgba(220, 210, 195, 0.85)";
  ctx.lineWidth = gutter;
  for (let i = 0; i <= 512; i += tileSize) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i, 512);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(0, i);
    ctx.lineTo(512, i);
    ctx.stroke();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(4, 4);
  return texture;
}

// Tạo texture Hoành Phi "VẠN CỔ ANH LINH" thếp vàng sơn son
function createHoanhPhiTexture(): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 160;
  const ctx = canvas.getContext("2d")!;

  // Nền đỏ thắm sơn son
  ctx.fillStyle = "#70120d";
  ctx.fillRect(0, 0, 512, 160);

  // Viền hoa văn vàng kim
  ctx.strokeStyle = "#eab308";
  ctx.lineWidth = 8;
  ctx.strokeRect(10, 10, 492, 140);
  ctx.lineWidth = 2;
  ctx.strokeRect(18, 18, 476, 124);

  // Đại tự chữ thư pháp Việt
  ctx.fillStyle = "#fde047";
  ctx.font = "bold 34px serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.shadowColor = "rgba(0,0,0,0.8)";
  ctx.shadowBlur = 6;
  ctx.fillText("VẠN  CỔ  ANH  LINH", 256, 80);

  return new THREE.CanvasTexture(canvas);
}

// Tạo texture Câu Đối sơn son thiếp vàng
function createCauDoiTexture(text: string): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 120;
  canvas.height = 512;
  const ctx = canvas.getContext("2d")!;

  ctx.fillStyle = "#66100b";
  ctx.fillRect(0, 0, 120, 512);

  ctx.strokeStyle = "#eab308";
  ctx.lineWidth = 4;
  ctx.strokeRect(6, 6, 108, 500);

  ctx.fillStyle = "#fef08a";
  ctx.font = "bold 20px serif";
  ctx.textAlign = "center";
  ctx.shadowColor = "rgba(0,0,0,0.8)";
  ctx.shadowBlur = 4;

  const chars = text.split("");
  const startY = 40;
  const step = 44;
  chars.forEach((c, idx) => {
    ctx.fillText(c, 60, startY + idx * step);
  });

  return new THREE.CanvasTexture(canvas);
}

export default function NorthernShrineScene() {
  const hostRef = useRef<HTMLDivElement | null>(null);
  const [ready, setReady] = useState(false);
  const [incenseLit, setIncenseLit] = useState(true);
  const [error, setError] = useState("");

  const resetRef = useRef<() => void>(() => {});
  const toggleIncenseRef = useRef<() => void>(() => {});

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: false,
        powerPreference: "high-performance",
      });
    } catch {
      setError("Thiết bị chưa hỗ trợ WebGL.");
      return;
    }

    setReady(true);
    setError("");

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(host.clientWidth, host.clientHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;

    const canvas = renderer.domElement;
    canvas.style.display = "block";
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    host.appendChild(canvas);

    // Không gian phủ điện thâm nghiêm ấm cúng
    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#110a06");
    scene.fog = new THREE.FogExp2("#110a06", 0.05);

    // Camera
    const camera = new THREE.PerspectiveCamera(
      42,
      host.clientWidth / host.clientHeight,
      0.1,
      40
    );
    camera.position.set(0, 2.3, 5.5);

    const controls = new OrbitControls(camera, canvas);
    controls.enablePan = false;
    controls.minDistance = 2.8;
    controls.maxDistance = 8.8;
    controls.maxPolarAngle = Math.PI / 2 - 0.06;
    controls.minPolarAngle = 0.25;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.3;
    controls.target.set(0, 1.35, 0);
    controls.update();

    resetRef.current = () => {
      camera.position.set(0, 2.3, 5.5);
      controls.target.set(0, 1.35, 0);
      controls.update();
    };

    // ==========================================
    // 1. HỆ THỐNG ÁNH SÁNG ẤM CÚNG & NẾN LUNG LINH
    // ==========================================
    const ambientLight = new THREE.AmbientLight("#452312", 2.4);
    scene.add(ambientLight);

    const topWarmLight = new THREE.PointLight("#ffdd99", 2.2, 15);
    topWarmLight.position.set(0, 4.5, 2.5);
    topWarmLight.castShadow = true;
    scene.add(topWarmLight);

    // 2 ngọn đèn nến bàn thờ nhấp nháy ánh sáng ấm
    const candleLeft = new THREE.PointLight("#ff9922", 1.8, 4.5);
    candleLeft.position.set(-1.1, 1.9, 0.2);
    scene.add(candleLeft);

    const candleRight = new THREE.PointLight("#ff9922", 1.8, 4.5);
    candleRight.position.set(1.1, 1.9, 0.2);
    scene.add(candleRight);

    // ==========================================
    // 2. SÀN GẠCH BÁT TRÀNG CỔ & TƯỜNG GỖ LIM
    // ==========================================
    const floorGeo = new THREE.PlaneGeometry(12, 12);
    floorGeo.rotateX(-Math.PI / 2);
    const floorTexture = createBatTrangTileTexture();
    const floorMat = new THREE.MeshStandardMaterial({
      map: floorTexture,
      roughness: 0.65,
      metalness: 0.15,
    });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.receiveShadow = true;
    scene.add(floor);

    // Vách hậu gỗ lim sơn then sẫm màu
    const backWallGeo = new THREE.PlaneGeometry(10, 5.5);
    const woodWallMat = new THREE.MeshStandardMaterial({
      color: "#28120a",
      roughness: 0.75,
      metalness: 0.1,
    });
    const backWall = new THREE.Mesh(backWallGeo, woodWallMat);
    backWall.position.set(0, 2.75, -2.4);
    scene.add(backWall);

    // Bốn Cột Gỗ Lim tròn vân bóng
    const woodPillarMat = new THREE.MeshStandardMaterial({
      color: "#3a170d",
      roughness: 0.55,
      metalness: 0.15,
    });

    [
      [-2.4, -2.2],
      [2.4, -2.2],
      [-2.4, 2.0],
      [2.4, 2.0],
    ].forEach(([x, z]) => {
      const colGeo = new THREE.CylinderGeometry(0.18, 0.22, 5.5, 24);
      const col = new THREE.Mesh(colGeo, woodPillarMat);
      col.position.set(x, 2.75, z);
      col.castShadow = true;
      scene.add(col);

      // Chân tảng đá xanh kê cột
      const baseGeo = new THREE.CylinderGeometry(0.28, 0.32, 0.2, 16);
      const stoneMat = new THREE.MeshStandardMaterial({ color: "#525252", roughness: 0.9 });
      const base = new THREE.Mesh(baseGeo, stoneMat);
      base.position.set(x, 0.1, z);
      scene.add(base);
    });

    // ==========================================
    // 3. HOÀNH PHI & CÂU ĐỐI SƠN SON THẾP VÀNG
    // ==========================================
    // Hoành phi treo chính giữa: "VẠN CỔ ANH LINH"
    const hoanhPhiTex = createHoanhPhiTexture();
    const hoanhPhiGeo = new THREE.PlaneGeometry(2.8, 0.85);
    const hoanhPhiMat = new THREE.MeshStandardMaterial({
      map: hoanhPhiTex,
      roughness: 0.4,
      metalness: 0.25,
    });
    const hoanhPhi = new THREE.Mesh(hoanhPhiGeo, hoanhPhiMat);
    hoanhPhi.position.set(0, 3.8, -2.35);
    scene.add(hoanhPhi);

    // Câu đối bên trái: "ĐỨC LƯU QUANG"
    const cauDoiLeftTex = createCauDoiTexture("CÔNGĐỨCLƯUTRUYỀN");
    const cauDoiGeo = new THREE.PlaneGeometry(0.42, 2.6);
    const cauDoiLeftMat = new THREE.MeshStandardMaterial({
      map: cauDoiLeftTex,
      roughness: 0.4,
    });
    const cauDoiLeft = new THREE.Mesh(cauDoiGeo, cauDoiLeftMat);
    cauDoiLeft.position.set(-1.9, 2.4, -2.35);
    scene.add(cauDoiLeft);

    // Câu đối bên phải
    const cauDoiRightTex = createCauDoiTexture("HIẾUĐỄKẾTHẾVINH");
    const cauDoiRightMat = new THREE.MeshStandardMaterial({
      map: cauDoiRightTex,
      roughness: 0.4,
    });
    const cauDoiRight = new THREE.Mesh(cauDoiGeo, cauDoiRightMat);
    cauDoiRight.position.set(1.9, 2.4, -2.35);
    scene.add(cauDoiRight);

    // ==========================================
    // 4. ÁN THỜ TAM CẤP SƠN SON & BỘ NGŨ SỰ ĐỈNH ĐỒNG
    // ==========================================
    const altarGroup = new THREE.Group();

    // Cấp 1 (Bàn tiền tế chính)
    const tableMat = new THREE.MeshStandardMaterial({
      color: "#5b140e", // Sơn son cánh gián
      roughness: 0.45,
      metalness: 0.15,
    });
    const tableTopGeo = new THREE.BoxGeometry(3.0, 0.12, 1.4);
    const tableTop = new THREE.Mesh(tableTopGeo, tableMat);
    tableTop.position.set(0, 1.15, 0);
    altarGroup.add(tableTop);

    // Y môn vải đỏ viền vàng buông trước bàn thờ
    const apronGeo = new THREE.PlaneGeometry(2.8, 0.95);
    const apronMat = new THREE.MeshStandardMaterial({
      color: "#881313",
      roughness: 0.6,
      side: THREE.DoubleSide,
    });
    const apron = new THREE.Mesh(apronGeo, apronMat);
    apron.position.set(0, 0.62, 0.71);
    altarGroup.add(apron);

    // 4 chân bàn quỳ chạm trổ uy nghi
    const legGeo = new THREE.CylinderGeometry(0.09, 0.08, 1.15, 12);
    [
      [-1.38, 0.58],
      [1.38, 0.58],
      [-1.38, -0.58],
      [1.38, -0.58],
    ].forEach(([x, z]) => {
      const leg = new THREE.Mesh(legGeo, tableMat);
      leg.position.set(x, 0.58, z);
      altarGroup.add(leg);
    });

    // Cấp 2 (Bàn hậu tế cao hơn)
    const upperTableGeo = new THREE.BoxGeometry(2.4, 0.35, 0.65);
    const upperTable = new THREE.Mesh(upperTableGeo, tableMat);
    upperTable.position.set(0, 1.38, -0.38);
    altarGroup.add(upperTable);

    // Vật liệu đồng hun giả cổ (Antique Bronze)
    const bronzeMat = new THREE.MeshStandardMaterial({
      color: "#a16207",
      metalness: 0.88,
      roughness: 0.32,
    });

    // --- ĐỈNH ĐỒNG CỔ NGHÊ CHẦU ---
    const urnGroup = new THREE.Group();
    // Bụng đỉnh đồng hình cầu dẹt
    const urnBodyGeo = new THREE.SphereGeometry(0.28, 20, 16);
    urnBodyGeo.scale(1.1, 0.85, 1);
    const urnBody = new THREE.Mesh(urnBodyGeo, bronzeMat);
    urnBody.position.y = 0.32;
    urnGroup.add(urnBody);

    // Đế đỉnh tam cúc
    const urnBaseGeo = new THREE.CylinderGeometry(0.24, 0.28, 0.12, 16);
    const urnBase = new THREE.Mesh(urnBaseGeo, bronzeMat);
    urnBase.position.y = 0.06;
    urnGroup.add(urnBase);

    // Nắp đỉnh nghê vờn ngọc
    const urnCoverGeo = new THREE.ConeGeometry(0.25, 0.2, 16);
    const urnCover = new THREE.Mesh(urnCoverGeo, bronzeMat);
    urnCover.position.y = 0.54;
    urnGroup.add(urnCover);

    const ngheHeadGeo = new THREE.SphereGeometry(0.06, 12, 12);
    const ngheHead = new THREE.Mesh(ngheHeadGeo, bronzeMat);
    ngheHead.position.y = 0.68;
    urnGroup.add(ngheHead);

    urnGroup.position.set(0, 1.56, -0.38);
    altarGroup.add(urnGroup);

    // --- ĐÔI HẠC NGỰ LƯNG RÙA CHẦU HAI BÊN ---
    [-0.85, 0.85].forEach((sideX) => {
      const craneGroup = new THREE.Group();

      // Rùa đồng đội hạc
      const turtleGeo = new THREE.SphereGeometry(0.14, 12, 8);
      turtleGeo.scale(1.4, 0.5, 1.1);
      const turtle = new THREE.Mesh(turtleGeo, bronzeMat);
      turtle.position.y = 0.05;
      craneGroup.add(turtle);

      // Chân hạc mảnh mai
      const legGeo = new THREE.CylinderGeometry(0.012, 0.012, 0.45, 8);
      const leg = new THREE.Mesh(legGeo, bronzeMat);
      leg.position.y = 0.28;
      craneGroup.add(leg);

      // Mình hạc thanh thoát
      const bodyGeo = new THREE.SphereGeometry(0.09, 12, 10);
      bodyGeo.scale(1.2, 0.8, 0.9);
      const body = new THREE.Mesh(bodyGeo, bronzeMat);
      body.position.set(0, 0.52, 0);
      craneGroup.add(body);

      // Cổ hạc vươn cao ngậm hoa sen
      const neckGeo = new THREE.CylinderGeometry(0.012, 0.012, 0.32, 8);
      neckGeo.rotateZ(sideX > 0 ? -0.15 : 0.15);
      const neck = new THREE.Mesh(neckGeo, bronzeMat);
      neck.position.set(sideX > 0 ? -0.05 : 0.05, 0.72, 0);
      craneGroup.add(neck);

      craneGroup.position.set(sideX, 1.56, -0.38);
      altarGroup.add(craneGroup);
    });

    // --- LƯ HƯƠNG ĐỒNG CHÍNH ĐẶT PHÍA TRƯỚC ---
    const mainIncenseBurner = new THREE.Group();
    const burnerBowlGeo = new THREE.CylinderGeometry(0.24, 0.18, 0.26, 20);
    const burnerBowl = new THREE.Mesh(burnerBowlGeo, bronzeMat);
    burnerBowl.position.y = 0.13;
    mainIncenseBurner.add(burnerBowl);

    // Tai rồng hai bên lư hương
    [-0.26, 0.26].forEach((x) => {
      const earGeo = new THREE.TorusGeometry(0.06, 0.02, 8, 12, Math.PI);
      earGeo.rotateZ(x > 0 ? -Math.PI / 2 : Math.PI / 2);
      const ear = new THREE.Mesh(earGeo, bronzeMat);
      ear.position.set(x, 0.15, 0);
      mainIncenseBurner.add(ear);
    });

    // Tro hương bên trong
    const ashGeo = new THREE.CylinderGeometry(0.22, 0.22, 0.02, 16);
    const ashMat = new THREE.MeshStandardMaterial({ color: "#d1d5db", roughness: 0.95 });
    const ash = new THREE.Mesh(ashGeo, ashMat);
    ash.position.y = 0.25;
    mainIncenseBurner.add(ash);

    mainIncenseBurner.position.set(0, 1.21, 0.22);
    altarGroup.add(mainIncenseBurner);

    // --- ĐÔI ĐÈN NẾN ĐỒNG THẮP SÁNG ---
    [-1.1, 1.1].forEach((x) => {
      const standGroup = new THREE.Group();
      const standGeo = new THREE.CylinderGeometry(0.05, 0.12, 0.5, 12);
      const stand = new THREE.Mesh(standGeo, bronzeMat);
      stand.position.y = 0.25;
      standGroup.add(stand);

      // Thân nến sáp đỏ truyền thống
      const candleGeo = new THREE.CylinderGeometry(0.03, 0.03, 0.24, 12);
      const candleMat = new THREE.MeshStandardMaterial({ color: "#dc2626", roughness: 0.3 });
      const candle = new THREE.Mesh(candleGeo, candleMat);
      candle.position.y = 0.55;
      standGroup.add(candle);

      // Ngọn lửa nến nhấp nháy phát sáng
      const flameGeo = new THREE.SphereGeometry(0.035, 12, 12);
      flameGeo.scale(0.7, 1.6, 0.7);
      const flameMat = new THREE.MeshBasicMaterial({ color: "#fef08a" });
      const flame = new THREE.Mesh(flameGeo, flameMat);
      flame.position.y = 0.7;
      standGroup.add(flame);

      standGroup.position.set(x, 1.21, 0.22);
      altarGroup.add(standGroup);
    });

    // --- MÂM NGŨ QUẢ VÀ CHÉN NƯỚC THANH TỊNH ---
    // Mâm bồng đĩa ngũ quả
    const plateGeo = new THREE.CylinderGeometry(0.24, 0.08, 0.08, 16);
    const ceramicMat = new THREE.MeshStandardMaterial({ color: "#0284c7", roughness: 0.2 });
    const plate = new THREE.Mesh(plateGeo, ceramicMat);
    plate.position.set(-0.6, 1.25, 0.2);
    altarGroup.add(plate);

    // Vài quả chín tươi ngon trên mâm
    const fruitMat1 = new THREE.MeshStandardMaterial({ color: "#ea580c", roughness: 0.4 });
    const fruitMat2 = new THREE.MeshStandardMaterial({ color: "#eab308", roughness: 0.3 });
    const fruit1 = new THREE.Mesh(new THREE.SphereGeometry(0.07, 12, 12), fruitMat1);
    fruit1.position.set(-0.6, 1.35, 0.2);
    altarGroup.add(fruit1);

    const fruit2 = new THREE.Mesh(new THREE.SphereGeometry(0.06, 12, 12), fruitMat2);
    fruit2.position.set(-0.54, 1.34, 0.24);
    altarGroup.add(fruit2);

    // Kỷ ba chén nước thanh tịnh
    const waterTrayGeo = new THREE.BoxGeometry(0.38, 0.04, 0.12);
    const waterTray = new THREE.Mesh(waterTrayGeo, tableMat);
    waterTray.position.set(0.6, 1.23, 0.2);
    altarGroup.add(waterTray);

    [-0.1, 0, 0.1].forEach((cx) => {
      const cupGeo = new THREE.CylinderGeometry(0.025, 0.018, 0.05, 12);
      const cupMat = new THREE.MeshStandardMaterial({ color: "#f8fafc", roughness: 0.1 });
      const cup = new THREE.Mesh(cupGeo, cupMat);
      cup.position.set(0.6 + cx, 1.27, 0.2);
      altarGroup.add(cup);
    });

    scene.add(altarGroup);

    // ==========================================
    // 5. BA NÉN TÂM HƯƠNG & KHÓI TRẦM UỐN LƯỢN
    // ==========================================
    const incenseGroup = new THREE.Group();
    const stickGeo = new THREE.CylinderGeometry(0.008, 0.008, 0.45, 8);
    const stickMat = new THREE.MeshStandardMaterial({ color: "#78350f" });

    const tipGeo = new THREE.SphereGeometry(0.015, 8, 8);
    const tipMat = new THREE.MeshBasicMaterial({ color: "#f97316" });

    [-0.04, 0, 0.04].forEach((x, i) => {
      const stick = new THREE.Mesh(stickGeo, stickMat);
      stick.position.set(x, 0.22, i === 1 ? -0.015 : 0.015);
      incenseGroup.add(stick);

      const tip = new THREE.Mesh(tipGeo, tipMat);
      tip.position.set(x, 0.45, i === 1 ? -0.015 : 0.015);
      incenseGroup.add(tip);
    });

    // Đốm sáng đỏ từ tàn nhang
    const emberLight = new THREE.PointLight("#ff7700", 1.2, 1.5);
    emberLight.position.set(0, 0.45, 0);
    incenseGroup.add(emberLight);

    incenseGroup.position.set(0, 1.45, 0.22);
    scene.add(incenseGroup);

    // Hạt khói trầm uốn lượn bay bổng
    const smokeCount = 28;
    const smokeParticles: THREE.Mesh[] = [];
    const smokeGeo = new THREE.SphereGeometry(0.035, 8, 8);
    const smokeMat = new THREE.MeshBasicMaterial({
      color: "#e2e8f0",
      transparent: true,
      opacity: 0.25,
      depthWrite: false,
    });

    for (let i = 0; i < smokeCount; i++) {
      const smoke = new THREE.Mesh(smokeGeo, smokeMat);
      smoke.position.set(
        (Math.random() - 0.5) * 0.05,
        1.9 + i * 0.065,
        0.22 + (Math.random() - 0.5) * 0.05
      );
      scene.add(smoke);
      smokeParticles.push(smoke);
    }

    let isIncenseLit = true;
    toggleIncenseRef.current = () => {
      isIncenseLit = !isIncenseLit;
      setIncenseLit(isIncenseLit);
      incenseGroup.visible = isIncenseLit;
      smokeParticles.forEach((s) => (s.visible = isIncenseLit));
    };

    // ==========================================
    // 6. ANIMATION LOOP: KHÓI TRẦM & NẾN NHẤP NHÁY
    // ==========================================
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const time = clock.getElapsedTime();

      // Ánh nến lung linh nhấp nháy tự nhiên
      candleLeft.intensity = 1.6 + Math.sin(time * 12) * 0.3 + Math.cos(time * 7) * 0.2;
      candleRight.intensity = 1.6 + Math.cos(time * 11) * 0.3 + Math.sin(time * 9) * 0.2;

      // Khói trầm hương bay bổng theo làn khí
      if (isIncenseLit) {
        smokeParticles.forEach((smoke, idx) => {
          smoke.position.y += 0.007;

          // Uốn lượn hình sin lan tỏa
          const sway = Math.sin(time * 2.2 + idx * 0.4) * (0.04 + idx * 0.008);
          smoke.position.x = sway;
          smoke.position.z = 0.22 + Math.cos(time * 1.8 + idx * 0.4) * (0.03 + idx * 0.006);

          // Càng lên cao hạt khói càng nở rộng và mờ dần
          const progress = (smoke.position.y - 1.9) / 1.8;
          smoke.scale.setScalar(1 + progress * 2.8);

          if (smoke.position.y > 3.6) {
            smoke.position.y = 1.9;
          }
        });
      }

      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!host) return;
      camera.aspect = host.clientWidth / host.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(host.clientWidth, host.clientHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      controls.dispose();
      renderer.dispose();
      if (host.contains(canvas)) {
        host.removeChild(canvas);
      }
    };
  }, []);

  return (
    <div className="relative w-full rounded-2xl overflow-hidden border border-amber-500/40 bg-[#110a06] shadow-xl group">
      {/* 3D Canvas Host */}
      <div
        ref={hostRef}
        className="w-full h-80 sm:h-96 md:h-[430px] cursor-grab active:cursor-grabbing"
      />

      {/* Top HUD Badge */}
      <div className="absolute top-3.5 left-4 pointer-events-none flex items-center gap-2">
        <span className="px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-black/65 text-amber-300 border border-amber-500/40 backdrop-blur-md flex items-center gap-2 shadow-sm">
          <Flame className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
          <span>PHỦ ĐIỆN BẮC BỘ 3D · ĐỈNH ĐỒNG & KHÓI TRẦM LINH THIÊNG</span>
        </span>
      </div>

      {/* Top Right Reset */}
      <div className="absolute top-3.5 right-4 flex items-center gap-2">
        <button
          type="button"
          onClick={() => resetRef.current()}
          title="Đặt lại góc nhìn"
          className="p-2 rounded-xl bg-black/60 hover:bg-black/80 text-stone-300 hover:text-white border border-white/10 backdrop-blur-md transition-all cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      {/* Bottom Floating Bar */}
      <div className="absolute bottom-3.5 inset-x-4 flex flex-col sm:flex-row items-center justify-between gap-2.5 bg-black/60 border border-white/10 p-2.5 sm:px-4 rounded-2xl backdrop-blur-md">
        <div className="text-xs text-stone-200 flex items-center gap-2">
          <span className="text-amber-400 font-bold">✦</span>
          <span>Dùng chuột/ngón tay xoay chiêm bái án thờ tam cấp, đỉnh đồng và đôi hạc</span>
        </div>

        <div className="flex items-center gap-2">
          <Button
            type="button"
            size="sm"
            onClick={() => toggleIncenseRef.current()}
            className={`rounded-xl text-xs h-8 px-3 font-semibold cursor-pointer gap-1.5 ${
              incenseLit
                ? "bg-amber-600 hover:bg-amber-500 text-white"
                : "border border-amber-500/40 text-amber-300 bg-black/40 hover:bg-black/60"
            }`}
          >
            <Flame className="w-3.5 h-3.5 text-amber-200" />
            <span>{incenseLit ? "Dâng nén tâm hương" : "Thắp lại nén hương"}</span>
          </Button>
        </div>
      </div>

      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/80 text-xs text-stone-400 p-4 text-center">
          {error}
        </div>
      )}
    </div>
  );
}
