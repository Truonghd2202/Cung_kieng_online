import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { Water } from "three/examples/jsm/objects/Water.js";
import { Button } from "./ui/button";
import {
  Sparkles,
  Send,
  RotateCcw,
  Compass,
  Eye,
  Heart,
  Volume2,
  Moon,
} from "lucide-react";

interface SouthernRiverSceneProps {
  wishText?: string;
  onWishReleased?: (wish: string) => void;
}

interface FloatingLantern {
  group: THREE.Group;
  light: THREE.PointLight;
  initialX: number;
  speed: number;
  bobPhase: number;
  message: string;
}

// Tạo Procedural Normal Map cho dòng sông trôi êm ả
function createRiverNormalTexture(): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext("2d")!;
  const imgData = ctx.createImageData(512, 512);
  const data = imgData.data;

  for (let y = 0; y < 512; y++) {
    for (let x = 0; x < 512; x++) {
      const idx = (y * 512 + x) * 4;
      // Tỉ lệ sóng sông lăn tăn thuôn dài theo chiều dòng chảy (trục v)
      const u = (x / 512) * Math.PI * 14;
      const v = (y / 512) * Math.PI * 6;

      const dx =
        Math.cos(u * 1.5 + v * 0.5) * 1.2 -
        Math.sin(v * 1.8 - u * 0.4) * 0.8 +
        Math.cos(u * 3.8 + v * 1.2) * 1.0;
      const dy =
        Math.cos(u * 1.5 + v * 0.5) * 0.5 +
        Math.cos(v * 1.8 - u * 0.4) * 1.8 +
        Math.sin(u * 3.8 + v * 1.2) * 0.6;

      let nx = -dx * 0.12;
      let ny = -dy * 0.12;
      let nz = 1.0;
      const len = Math.sqrt(nx * nx + ny * ny + nz * nz);
      nx /= len;
      ny /= len;
      nz /= len;

      data[idx] = Math.floor((nx * 0.5 + 0.5) * 255);
      data[idx + 1] = Math.floor((ny * 0.5 + 0.5) * 255);
      data[idx + 2] = Math.floor((nz * 0.5 + 0.5) * 255);
      data[idx + 3] = 255;
    }
  }

  ctx.putImageData(imgData, 0, 0);

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  return texture;
}

export function SouthernRiverScene({
  wishText = "",
  onWishReleased,
}: SouthernRiverSceneProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState("");
  const [lanternCount, setLanternCount] = useState(6);
  const [customWish, setCustomWish] = useState("");
  const [showInputModal, setShowInputModal] = useState(false);
  const [selectedLanternWish, setSelectedLanternWish] = useState<string | null>(null);

  const releaseLanternRef = useRef<((msg: string) => void) | null>(null);
  const resetSceneRef = useRef<(() => void) | null>(null);

  const initialWishes = [
    "Cầu cho cha mẹ dồi dào sức khỏe, gia đạo an khang.",
    "Nguyện cho tâm luôn bình an giữa sóng gió cuộc đời.",
    "Cầu mùa màng tươi tốt, bà con xóm giềng thuận hòa ấm êm.",
    "Cầu chuyến đi xa vạn dặm bình an, thuận buồm xuôi gió.",
    "Gửi chút ân tình tri ân tổ tiên khai khẩn đất phương Nam.",
    "Cầu con cháu học hành tiến tới, hiếu nghĩa vẹn tròn.",
  ];

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
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;

    const canvas = renderer.domElement;
    canvas.style.display = "block";
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    host.appendChild(canvas);

    // Không gian đêm Cửu Long huyền ảo
    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#040a14");
    scene.fog = new THREE.FogExp2("#040a14", 0.038);

    // Camera
    const camera = new THREE.PerspectiveCamera(
      46,
      host.clientWidth / host.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 4.2, 9.5);

    // Controls
    const controls = new OrbitControls(camera, canvas);
    controls.enablePan = false;
    controls.minDistance = 4.0;
    controls.maxDistance = 18;
    controls.maxPolarAngle = Math.PI / 2 - 0.04;
    controls.minPolarAngle = 0.2;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.35;
    controls.target.set(0, 0.6, -1);
    controls.update();

    resetSceneRef.current = () => {
      camera.position.set(0, 4.2, 9.5);
      controls.target.set(0, 0.6, -1);
      controls.update();
    };

    // ==========================================
    // 1. ÁNH TRĂNG RẰM & BẦU TRỜI ĐÊM HUYỀN ẢO
    // ==========================================
    const ambientLight = new THREE.AmbientLight("#0d1f30", 2.2);
    scene.add(ambientLight);

    // Ánh trăng chiếu rọi từ trên cao
    const moonLight = new THREE.DirectionalLight("#d4ebf8", 2.5);
    moonLight.position.set(-10, 16, -12);
    scene.add(moonLight);

    // Vầng trăng tròn rực rỡ treo trên nền trời
    const moonGeo = new THREE.SphereGeometry(1.6, 32, 32);
    const moonMat = new THREE.MeshBasicMaterial({ color: "#fffbe6" });
    const moon = new THREE.Mesh(moonGeo, moonMat);
    moon.position.set(-14, 14, -28);
    scene.add(moon);

    // Quầng sáng quanh mặt trăng (Moon Halo)
    const haloGeo = new THREE.PlaneGeometry(8, 8);
    const haloCanvas = document.createElement("canvas");
    haloCanvas.width = 128;
    haloCanvas.height = 128;
    const hctx = haloCanvas.getContext("2d")!;
    const hgrad = hctx.createRadialGradient(64, 64, 12, 64, 64, 64);
    hgrad.addColorStop(0, "rgba(255, 252, 210, 0.55)");
    hgrad.addColorStop(0.4, "rgba(180, 220, 255, 0.2)");
    hgrad.addColorStop(1, "rgba(0, 0, 0, 0)");
    hctx.fillStyle = hgrad;
    hctx.fillRect(0, 0, 128, 128);
    const haloTex = new THREE.CanvasTexture(haloCanvas);
    const haloMat = new THREE.MeshBasicMaterial({
      map: haloTex,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const haloMesh = new THREE.Mesh(haloGeo, haloMat);
    haloMesh.position.copy(moon.position);
    haloMesh.position.z += 0.2;
    scene.add(haloMesh);

    // Bầu trời sao lấp lánh
    const starCount = 300;
    const starGeo = new THREE.BufferGeometry();
    const starPos = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
      starPos[i * 3] = (Math.random() - 0.5) * 60;
      starPos[i * 3 + 1] = 6 + Math.random() * 25;
      starPos[i * 3 + 2] = -10 - Math.random() * 35;
    }
    starGeo.setAttribute("position", new THREE.BufferAttribute(starPos, 3));
    const starMat = new THREE.PointsMaterial({
      color: "#e0f2fe",
      size: 0.2,
      transparent: true,
      opacity: 0.85,
    });
    const starMesh = new THREE.Points(starGeo, starMat);
    scene.add(starMesh);

    // ==========================================
    // 2. DÒNG NƯỚC SÔNG CỬU LONG QUANG HỌC (WATER SHADER)
    // ==========================================
    const waterGeometry = new THREE.PlaneGeometry(300, 300);
    const riverNormals = createRiverNormalTexture();

    const sunDir = new THREE.Vector3(-10, 16, -12).normalize();

    const water = new Water(waterGeometry, {
      textureWidth: 512,
      textureHeight: 512,
      waterNormals: riverNormals,
      sunDirection: sunDir,
      sunColor: 0xfffae0, // Phản xạ ánh trăng vàng óng ánh
      waterColor: 0x05141e, // Nước sông đêm phù sa sâu lắng
      distortionScale: 2.6, // Sóng lăn tăn nhẹ nhàng
      fog: scene.fog !== undefined,
    });
    water.rotation.x = -Math.PI / 2;
    water.position.y = 0;
    scene.add(water);

    // ==========================================
    // 3. CHIẾC XUỒNG BA LÁ NAM BỘ NEO BÊN BẾN NƯỚC
    // ==========================================
    const sampanGroup = new THREE.Group();

    // Thân xuồng ba lá thon nhọn hai đầu
    const sampanShape = new THREE.Shape();
    sampanShape.moveTo(-2.8, 0);
    sampanShape.quadraticCurveTo(-1.5, -0.65, 0, -0.75);
    sampanShape.quadraticCurveTo(1.5, -0.65, 2.8, 0);
    sampanShape.quadraticCurveTo(1.6, 0.65, 0, 0.75);
    sampanShape.quadraticCurveTo(-1.6, 0.65, -2.8, 0);

    const sampanGeo = new THREE.ExtrudeGeometry(sampanShape, {
      depth: 0.65,
      bevelEnabled: true,
      bevelSegments: 3,
      steps: 1,
      bevelSize: 0.08,
      bevelThickness: 0.12,
    });
    sampanGeo.rotateX(Math.PI / 2);
    sampanGeo.rotateZ(Math.PI / 2);

    const woodMat = new THREE.MeshStandardMaterial({
      color: "#422818", // Gỗ sao miền Tây
      roughness: 0.75,
      metalness: 0.1,
    });
    const sampanHull = new THREE.Mesh(sampanGeo, woodMat);
    sampanHull.position.y = 0.12;
    sampanGroup.add(sampanHull);

    // Cây sào tre cắm neo cạnh xuồng
    const poleGeo = new THREE.CylinderGeometry(0.04, 0.05, 4.2, 8);
    poleGeo.rotateZ(0.12);
    const bambooMat = new THREE.MeshStandardMaterial({ color: "#655030", roughness: 0.8 });
    const pole = new THREE.Mesh(poleGeo, bambooMat);
    pole.position.set(-1.1, 1.8, 0.8);
    sampanGroup.add(pole);

    // Chiếc dầm chèo gỗ gác ngang khoang xuồng
    const oarGeo = new THREE.CylinderGeometry(0.03, 0.03, 3.2, 8);
    oarGeo.rotateZ(Math.PI / 3);
    const oar = new THREE.Mesh(oarGeo, woodMat);
    oar.position.set(0.2, 0.45, 0.1);
    sampanGroup.add(oar);

    // Đèn dầu bão treo mũi xuồng phát sáng ấm áp
    const lanternGlassGeo = new THREE.CylinderGeometry(0.1, 0.12, 0.28, 12);
    const lanternGlassMat = new THREE.MeshBasicMaterial({ color: "#fef08a" });
    const lanternGlass = new THREE.Mesh(lanternGlassGeo, lanternGlassMat);
    lanternGlass.position.set(-2.5, 0.65, 0);
    sampanGroup.add(lanternGlass);

    const sampanLight = new THREE.PointLight("#ff9922", 2.2, 8);
    sampanLight.position.set(-2.5, 0.7, 0);
    sampanGroup.add(sampanLight);

    sampanGroup.position.set(4.2, 0, -2.5);
    sampanGroup.rotation.y = -0.55;
    scene.add(sampanGroup);

    // ==========================================
    // 4. RẶNG DỪA NƯỚC & HOA LỤC BÌNH TRÔI SÔNG
    // ==========================================
    // Bờ đất phù sa 2 bên
    const riverWidth = 14;
    [-1, 1].forEach((side) => {
      const bankGeo = new THREE.PlaneGeometry(16, 50);
      bankGeo.rotateX(-Math.PI / 2);
      const bankMat = new THREE.MeshStandardMaterial({
        color: "#1a120b",
        roughness: 0.95,
      });
      const bank = new THREE.Mesh(bankGeo, bankMat);
      bank.position.set(side * (riverWidth / 2 + 8), -0.05, 0);
      scene.add(bank);

      // Những tán lá dừa nước xòe cong mềm mại
      for (let z = -18; z <= 12; z += 4.5) {
        const palmGroup = new THREE.Group();
        const trunkGeo = new THREE.CylinderGeometry(0.1, 0.16, 1.8, 8);
        trunkGeo.rotateZ(side * 0.25);
        const trunk = new THREE.Mesh(trunkGeo, bambooMat);
        trunk.position.y = 0.9;
        palmGroup.add(trunk);

        // 5 tàu lá dừa nước uốn cong
        for (let l = 0; l < 5; l++) {
          const leafCurve = new THREE.QuadraticBezierCurve3(
            new THREE.Vector3(0, 1.6, 0),
            new THREE.Vector3(-side * (1.2 + l * 0.3), 3.2, (l - 2) * 0.8),
            new THREE.Vector3(-side * (2.8 + l * 0.4), 1.8, (l - 2) * 1.2)
          );
          const leafGeo = new THREE.TubeGeometry(leafCurve, 12, 0.06, 6, false);
          const leafMat = new THREE.MeshStandardMaterial({
            color: l % 2 === 0 ? "#132717" : "#1a3820",
            roughness: 0.85,
          });
          const leaf = new THREE.Mesh(leafGeo, leafMat);
          palmGroup.add(leaf);
        }

        palmGroup.position.set(side * (riverWidth / 2 - 0.5 + Math.random() * 1.5), 0, z);
        scene.add(palmGroup);
      }
    });

    // Cụm hoa lục bình trôi bồng bềnh
    const waterHyacinths: Array<{ hyGroup: THREE.Group; speed: number }> = [];
    for (let i = 0; i < 6; i++) {
      const hyGroup = new THREE.Group();
      // Lá lục bình tròn xòe
      for (let j = 0; j < 6; j++) {
        const leafAngle = (j / 6) * Math.PI * 2;
        const leafGeo = new THREE.SphereGeometry(0.12, 8, 6);
        leafGeo.scale(1, 0.2, 1.3);
        const leafMat = new THREE.MeshStandardMaterial({ color: "#166534", roughness: 0.6 });
        const leaf = new THREE.Mesh(leafGeo, leafMat);
        leaf.position.set(Math.cos(leafAngle) * 0.18, 0.03, Math.sin(leafAngle) * 0.18);
        hyGroup.add(leaf);
      }
      // Nụ hoa tím biếc
      const flowerGeo = new THREE.ConeGeometry(0.08, 0.22, 6);
      const flowerMat = new THREE.MeshStandardMaterial({ color: "#c084fc", roughness: 0.5 });
      const flower = new THREE.Mesh(flowerGeo, flowerMat);
      flower.position.y = 0.14;
      hyGroup.add(flower);

      hyGroup.position.set(
        (Math.random() - 0.5) * 8,
        0.02,
        (Math.random() - 0.5) * 20
      );
      scene.add(hyGroup);
      waterHyacinths.push({ hyGroup, speed: 0.15 + Math.random() * 0.1 });
    }

    // ==========================================
    // 5. ĐOM ĐÓM LẬP LÒE TRÊN MẶT SÔNG
    // ==========================================
    const fireflyCount = 40;
    const fireflies: Array<{
      mesh: THREE.Mesh;
      baseX: number;
      baseY: number;
      baseZ: number;
      speed: number;
      phase: number;
    }> = [];

    const fireflyGeo = new THREE.SphereGeometry(0.04, 8, 8);
    const fireflyMat = new THREE.MeshBasicMaterial({ color: "#bef264" });

    for (let i = 0; i < fireflyCount; i++) {
      const mesh = new THREE.Mesh(fireflyGeo, fireflyMat);
      const bx = (Math.random() - 0.5) * 12;
      const by = 0.4 + Math.random() * 1.8;
      const bz = (Math.random() - 0.5) * 20;
      mesh.position.set(bx, by, bz);
      scene.add(mesh);
      fireflies.push({
        mesh,
        baseX: bx,
        baseY: by,
        baseZ: bz,
        speed: 0.6 + Math.random() * 0.8,
        phase: Math.random() * Math.PI * 2,
      });
    }

    // ==========================================
    // 6. DÒNG HOA ĐĂNG HOA SEN PHÁT SÁNG LUNG LINH
    // ==========================================
    const lanterns: FloatingLantern[] = [];

    const createLotusLantern = (message: string, posX: number, posZ: number): FloatingLantern => {
      const group = new THREE.Group();

      // Đế lá sen xanh biếc
      const baseGeo = new THREE.CylinderGeometry(0.35, 0.3, 0.04, 16);
      const baseMat = new THREE.MeshStandardMaterial({
        color: "#14532d",
        roughness: 0.6,
      });
      const base = new THREE.Mesh(baseGeo, baseMat);
      base.position.y = 0.02;
      group.add(base);

      // Cánh hoa sen kép xếp so le (Tầng ngoài & Tầng trong)
      const outerPetalMat = new THREE.MeshStandardMaterial({
        color: "#f472b6",
        emissive: "#9d174d",
        emissiveIntensity: 0.4,
        roughness: 0.35,
      });

      for (let i = 0; i < 8; i++) {
        const angle = (i / 8) * Math.PI * 2;
        const petalGeo = new THREE.ConeGeometry(0.14, 0.32, 6);
        const petal = new THREE.Mesh(petalGeo, outerPetalMat);
        petal.position.set(Math.cos(angle) * 0.24, 0.14, Math.sin(angle) * 0.24);
        petal.rotation.x = Math.PI / 4;
        petal.rotation.y = angle;
        group.add(petal);
      }

      const innerPetalMat = new THREE.MeshStandardMaterial({
        color: "#fb7185",
        emissive: "#e11d48",
        emissiveIntensity: 0.6,
        roughness: 0.3,
      });
      for (let i = 0; i < 6; i++) {
        const angle = (i / 6) * Math.PI * 2 + 0.35;
        const petalGeo = new THREE.ConeGeometry(0.12, 0.26, 6);
        const petal = new THREE.Mesh(petalGeo, innerPetalMat);
        petal.position.set(Math.cos(angle) * 0.16, 0.16, Math.sin(angle) * 0.16);
        petal.rotation.x = Math.PI / 5;
        petal.rotation.y = angle;
        group.add(petal);
      }

      // Ngọn nến vàng ở tâm nhụy
      const candleGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.18, 12);
      const candleMat = new THREE.MeshStandardMaterial({ color: "#fef08a" });
      const candle = new THREE.Mesh(candleGeo, candleMat);
      candle.position.y = 0.14;
      group.add(candle);

      // Ngọn lửa nến tỏa sáng lung linh
      const flameGeo = new THREE.SphereGeometry(0.05, 12, 12);
      flameGeo.scale(0.8, 1.8, 0.8);
      const flameMat = new THREE.MeshBasicMaterial({ color: "#ffaa22" });
      const flame = new THREE.Mesh(flameGeo, flameMat);
      flame.position.y = 0.26;
      group.add(flame);

      // PointLight tỏa ánh sáng vàng cam ấm áp phản chiếu lên mặt nước Water Shader
      const light = new THREE.PointLight("#ff9922", 2.6, 6, 1.4);
      light.position.y = 0.28;
      group.add(light);

      group.position.set(posX, 0.05, posZ);
      group.userData = { message };
      scene.add(group);

      return {
        group,
        light,
        initialX: posX,
        speed: 0.28 + Math.random() * 0.18,
        bobPhase: Math.random() * Math.PI * 2,
        message,
      };
    };

    const seedPositions = [
      { x: -1.6, z: 2.5, msg: initialWishes[0] },
      { x: 0.6, z: 1.0, msg: initialWishes[1] },
      { x: -0.8, z: -1.5, msg: initialWishes[2] },
      { x: 1.8, z: -3.8, msg: initialWishes[3] },
      { x: -2.2, z: -6.2, msg: initialWishes[4] },
      { x: 0.8, z: -9.0, msg: initialWishes[5] },
    ];

    seedPositions.forEach((pos) => {
      lanterns.push(createLotusLantern(pos.msg, pos.x, pos.z));
    });

    releaseLanternRef.current = (message: string) => {
      const spawnX = (Math.random() - 0.5) * 4.2;
      const spawnZ = 4.2;
      const newLantern = createLotusLantern(message, spawnX, spawnZ);
      lanterns.unshift(newLantern);
      setLanternCount(lanterns.length);
      controls.target.set(spawnX * 0.3, 0.4, spawnZ - 2);
    };

    // ==========================================
    // 7. RAYCASTER NHẤP HOA ĐĂNG XEM LỜI NGUYỆN
    // ==========================================
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const handleCanvasClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(
        lanterns.map((l) => l.group),
        true
      );

      if (intersects.length > 0) {
        let parentGroup: THREE.Object3D | null = intersects[0].object;
        while (parentGroup && !parentGroup.userData.message && parentGroup.parent) {
          parentGroup = parentGroup.parent;
        }
        if (parentGroup && parentGroup.userData.message) {
          setSelectedLanternWish(parentGroup.userData.message);
        }
      }
    };

    canvas.addEventListener("click", handleCanvasClick);

    // ==========================================
    // 8. ANIMATION LOOP: WATER SHADER & CHUYỂN ĐỘNG DÒNG CHẢY
    // ==========================================
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const time = clock.getElapsedTime();

      // 1. Chuyển động sóng nước quang học Physical Water Shader
      water.material.uniforms["time"].value += 1.0 / 60.0;

      // 2. Xuồng ba lá nhấp nhô theo con nước dập dềnh
      sampanGroup.position.y = 0.05 + Math.sin(time * 1.5) * 0.04;
      sampanGroup.rotation.z = Math.sin(time * 1.2) * 0.03;
      sampanGroup.rotation.x = -0.55 + Math.cos(time * 1.1) * 0.02;

      // 3. Hoa lục bình trôi dạt lững lờ
      waterHyacinths.forEach((item) => {
        item.hyGroup.position.z -= item.speed * 0.015;
        if (item.hyGroup.position.z < -16) {
          item.hyGroup.position.z = 10;
          item.hyGroup.position.x = (Math.random() - 0.5) * 8;
        }
        item.hyGroup.position.y = 0.02 + Math.sin(time * 2.0) * 0.02;
      });

      // 4. Hoa đăng trôi xuôi dòng & Ánh nến lung linh
      lanterns.forEach((lantern) => {
        lantern.group.position.z -= lantern.speed * 0.018;

        if (lantern.group.position.z < -16) {
          lantern.group.position.z = 5.0;
          lantern.group.position.x = (Math.random() - 0.5) * 4.5;
        }

        lantern.group.position.y =
          0.05 + Math.sin(time * 2.4 + lantern.bobPhase) * 0.035;
        lantern.group.rotation.y += 0.003;
        lantern.group.rotation.z = Math.sin(time * 1.9 + lantern.bobPhase) * 0.03;

        // Ánh lửa nến nhấp nháy tự nhiên
        lantern.light.intensity = 2.4 + Math.sin(time * 9 + lantern.bobPhase) * 0.5;
      });

      // 5. Đom đóm bay lượn
      fireflies.forEach((ff) => {
        ff.mesh.position.x = ff.baseX + Math.sin(time * ff.speed + ff.phase) * 0.5;
        ff.mesh.position.y = ff.baseY + Math.cos(time * ff.speed * 1.3 + ff.phase) * 0.25;
        ff.mesh.position.z = ff.baseZ + Math.sin(time * ff.speed * 0.8 + ff.phase) * 0.4;
      });

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
      canvas.removeEventListener("click", handleCanvasClick);
      controls.dispose();
      waterGeometry.dispose();
      riverNormals.dispose();
      renderer.dispose();
      if (host.contains(canvas)) {
        host.removeChild(canvas);
      }
    };
  }, []);

  const handleRelease = () => {
    const textToRelease = customWish.trim() || wishText.trim() || "Cầu vạn sự bình an, gia đạo thuận hòa.";
    if (releaseLanternRef.current) {
      releaseLanternRef.current(textToRelease);
      if (onWishReleased) onWishReleased(textToRelease);
    }
    setCustomWish("");
    setShowInputModal(false);
  };

  return (
    <div className="relative w-full rounded-2xl overflow-hidden border border-emerald-500/40 bg-[#040a14] shadow-xl group">
      {/* 3D Canvas Host */}
      <div
        ref={hostRef}
        className="w-full h-80 sm:h-96 md:h-[430px] cursor-grab active:cursor-grabbing"
      />

      {/* Top HUD Badge */}
      <div className="absolute top-3.5 left-4 pointer-events-none flex items-center gap-2">
        <span className="px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-black/65 text-emerald-300 border border-emerald-500/40 backdrop-blur-md flex items-center gap-2 shadow-sm">
          <Moon className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
          <span>SÔNG NƯỚC NAM BỘ 3D · ĐÊM HOA ĐĂNG CỬU LONG CHÂN THỰC</span>
        </span>
        <span className="hidden sm:inline-block text-[11px] text-stone-300 bg-black/50 px-2.5 py-0.5 rounded-full backdrop-blur-sm">
          {lanternCount} ngọn đăng đang trôi
        </span>
      </div>

      {/* Top Right Controls */}
      <div className="absolute top-3.5 right-4 flex items-center gap-2">
        <button
          type="button"
          onClick={() => {
            if (resetSceneRef.current) resetSceneRef.current();
          }}
          title="Đặt lại góc nhìn"
          className="p-2 rounded-xl bg-black/60 hover:bg-black/80 text-stone-300 hover:text-white border border-white/10 backdrop-blur-md transition-all cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      {/* Modal Tooltip khi nhấp vào hoa đăng */}
      {selectedLanternWish && (
        <div className="absolute inset-x-4 top-16 max-w-md mx-auto p-4 rounded-2xl bg-black/85 border border-emerald-500/50 text-white backdrop-blur-md shadow-2xl animate-fade-in z-20">
          <div className="flex items-center justify-between gap-2 mb-1.5">
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-300 flex items-center gap-1">
              <span>🌸</span>
              <span>LỜI NGUYỆN TỪ HOA ĐĂNG TRÊN SÔNG</span>
            </span>
            <button
              onClick={() => setSelectedLanternWish(null)}
              className="text-stone-400 hover:text-white text-xs p-1 cursor-pointer"
            >
              ✕
            </button>
          </div>
          <p className="font-display italic text-sm text-emerald-100 leading-relaxed">
            “{selectedLanternWish}”
          </p>
          <div className="mt-2 pt-2 border-t border-white/10 flex justify-between items-center text-[10px] text-stone-400">
            <span>Ân tình sông nước Cửu Long</span>
            <button
              onClick={() => setSelectedLanternWish(null)}
              className="text-emerald-400 hover:underline cursor-pointer"
            >
              Đóng
            </button>
          </div>
        </div>
      )}

      {/* Bottom Floating Bar */}
      <div className="absolute bottom-3.5 inset-x-4 flex flex-col sm:flex-row items-center justify-between gap-2.5 bg-black/60 border border-white/10 p-2.5 sm:px-4 rounded-2xl backdrop-blur-md">
        <div className="text-xs text-stone-200 flex items-center gap-2">
          <span className="text-emerald-400 font-bold">✦</span>
          <span>Dùng chuột/ngón tay xoay chiêm ngưỡng xuồng ba lá, rặng dừa nước và nhấp hoa đăng để đọc tâm nguyện</span>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <Button
            type="button"
            size="sm"
            onClick={() => setShowInputModal(true)}
            className="rounded-xl bg-gradient-to-r from-emerald-700 to-amber-600 hover:from-emerald-600 hover:to-amber-500 text-white font-semibold text-xs min-h-9 px-4 cursor-pointer gap-1.5 shadow-md"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-200 animate-pulse" />
            <span>Thả thêm hoa đăng</span>
          </Button>
        </div>
      </div>

      {/* Modal Popup Nhập lời nguyện thả hoa đăng */}
      {showInputModal && (
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-30 animate-fade-in">
          <div className="w-full max-w-sm rounded-2xl border border-emerald-500/40 bg-[#071626] p-5 shadow-2xl text-white space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-display text-base font-bold text-emerald-300 flex items-center gap-1.5">
                <span>🏮</span>
                <span>Thả hoa đăng cầu an trên sông</span>
              </span>
              <button
                type="button"
                onClick={() => setShowInputModal(false)}
                className="text-stone-400 hover:text-white text-sm cursor-pointer"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-stone-300 leading-relaxed">
              Viết lời chúc lành hoặc tâm nguyện để thắp sáng thêm một ngọn hoa đăng trên dòng sông phương Nam:
            </p>

            <textarea
              rows={3}
              value={customWish}
              onChange={(e) => setCustomWish(e.target.value)}
              placeholder="VD: Cầu cho gia đạo bình an, cha mẹ mạnh khỏe, mọi sự hanh thông thuận lợi…"
              className="w-full rounded-xl border border-emerald-500/30 bg-black/50 p-2.5 text-xs text-white placeholder:text-stone-500 focus:outline-none focus:ring-1 focus:ring-emerald-400 leading-relaxed"
            />

            <div className="flex items-center justify-end gap-2 pt-1">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setShowInputModal(false)}
                className="text-xs text-stone-400 hover:text-white cursor-pointer"
              >
                Hủy
              </Button>
              <Button
                type="button"
                size="sm"
                onClick={handleRelease}
                className="text-xs rounded-xl bg-gradient-to-r from-emerald-600 to-amber-600 hover:from-emerald-500 hover:to-amber-500 text-white font-semibold cursor-pointer gap-1.5"
              >
                <Send className="w-3 h-3" />
                <span>Thả đèn ngay</span>
              </Button>
            </div>
          </div>
        </div>
      )}

      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/80 text-xs text-stone-400 p-4 text-center">
          {error}
        </div>
      )}
    </div>
  );
}
