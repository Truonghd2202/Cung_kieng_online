import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { Water } from "three/examples/jsm/objects/Water.js";
import { AppDialog } from "./AppDialog";
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
import { getDemoRoyalLanternStock, useRoyalLantern } from "../data/inventoryService";
import { isDemoMode } from "../data/demoMode";
import { disposeThreeScene } from "./threeSceneUtils";

interface FloatingLantern {
  group: THREE.Group;
  light: THREE.PointLight;
  flame: THREE.Mesh;
  initialX: number;
  speed: number;
  bobPhase: number;
  message: string;
}

interface SouthernRiverSceneProps {
  initialWish?: string;
  currentUserEmail?: string;
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
  initialWish,
  currentUserEmail,
}: SouthernRiverSceneProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState("");
  const [lanternCount, setLanternCount] = useState(0);
  const [sessionWishes, setSessionWishes] = useState<string[]>([]);
  const [customWish, setCustomWish] = useState("");
  const [showInputModal, setShowInputModal] = useState(false);
  const [selectedLanternWish, setSelectedLanternWish] = useState<string | null>(null);

  const [lanternStyle, setLanternStyle] =
    useState<"standard" | "royal">("standard");

  const [usingRoyal, setUsingRoyal] = useState(false);
  const [royalError, setRoyalError] = useState("");

  const royalLockRef = useRef(false);
  const aliveRef = useRef(false);

  useEffect(() => {
    aliveRef.current = true;

    return () => {
      aliveRef.current = false;
    };
  }, []);

  const releaseLanternRef = useRef<
    ((message: string, royal?: boolean) => void) | null
  >(null);
  const resetSceneRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host || !host.clientWidth || !host.clientHeight) return;

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

    setError("");

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(host.clientWidth, host.clientHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.shadowMap.enabled = false;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;

    const canvas = renderer.domElement;
    canvas.style.display = "block";
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    host.appendChild(canvas);

    // Không gian đêm Cửu Long huyền ảo
    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#8ba8a3");
    scene.fog = new THREE.FogExp2("#829c94", 0.018);

    // Camera
    const camera = new THREE.PerspectiveCamera(
      46,
      host.clientWidth / host.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 6.2, 16);

    // Controls
    const controls = new OrbitControls(camera, canvas);
    controls.enablePan = false;
    controls.minDistance = 8;
    controls.maxDistance = 24;
    controls.maxPolarAngle = Math.PI / 2 - 0.04;
    controls.minPolarAngle = 0.2;
    controls.enableDamping = true;
    controls.autoRotate = false;
    
    controls.target.set(0, 1, -3);
    controls.update();

    resetSceneRef.current = () => {
      camera.position.set(0, 6.2, 16);
      controls.target.set(0, 1, -3);
      controls.update();
    };

    // ==========================================
    // 1. ÁNH TRĂNG RẰM & BẦU TRỜI ĐÊM HUYỀN ẢO
    // ==========================================
    const ambientLight = new THREE.HemisphereLight("#e1eee0", "#594938", 2.1);
    scene.add(ambientLight);

    // Ánh trăng chiếu rọi từ trên cao
    const moonLight = new THREE.DirectionalLight("#d4ebf8", 2.5);
    moonLight.position.set(-10, 16, -12);
    scene.add(moonLight);

    // Vầng trăng tròn rực rỡ treo trên nền trời
    const moonGeo = new THREE.SphereGeometry(1.6, 32, 32);
    const moonMat = new THREE.MeshBasicMaterial({ color: "#fffbe6" });
    const moon = new THREE.Mesh(moonGeo, moonMat);
    moon.position.set(-9, 13, -28);
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
    const starCount = 90;
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
      size: 0.1,
      transparent: true,
      opacity: 0.45,
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
      sunColor: 0xffd7a0, // Phản xạ ánh trăng vàng óng ánh
      waterColor: 0x164954, // Nước sông đêm phù sa sâu lắng
      distortionScale: 1.7, // Sóng lăn tăn nhẹ nhàng
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
        color: "#574331",
        roughness: 0.95,
      });
      const bank = new THREE.Mesh(bankGeo, bankMat);
      bank.position.set(side * (riverWidth / 2 + 11), -0.05, 0);
      scene.add(bank);

      // Những tán lá dừa nước xòe cong mềm mại
      for (let z = -18; z <= 12; z += 4.5) {
        const palmGroup = new THREE.Group();
        const trunkGeo = new THREE.CylinderGeometry(0.12, 0.2, 2.7, 9);
        trunkGeo.rotateZ(side * 0.25);
        const trunk = new THREE.Mesh(trunkGeo, bambooMat);
        trunk.position.y = 1.35;
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

        palmGroup.position.set(side * (riverWidth / 2 + 3.4 + Math.random() * 1.2), 0, z);
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
    const fireflyCount = 20;
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
      mesh.scale.setScalar(0.65);
      const bx = (Math.random() - 0.5) * 8;
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

    const createLotusLantern = (
      message: string,
      posX: number,
      posZ: number,
      royal = false
    ): FloatingLantern => {
      const group = new THREE.Group();

      // Đế lá sen xanh biếc
      const baseGeo = new THREE.CylinderGeometry(0.43, 0.39, 0.055, 32);
      const baseMat = new THREE.MeshStandardMaterial({ color: royal ? "#42663a" : "#245d3d", roughness: 0.48 });
      const base = new THREE.Mesh(baseGeo, baseMat);
      base.position.y = 0.02;
      group.add(base);

      const leafGeo = new THREE.SphereGeometry(1, 16, 10);
      const leafMaterial = new THREE.MeshStandardMaterial({ color: "#39754a", roughness: 0.42 });
      for (let i = 0; i < 6; i++) {
        const angle = (i / 6) * Math.PI * 2;
        const leaf = new THREE.Mesh(leafGeo, leafMaterial);
        leaf.scale.set(0.2, 0.035, 0.34);
        leaf.position.set(Math.cos(angle) * 0.28, 0.035, Math.sin(angle) * 0.28);
        leaf.rotation.y = angle - Math.PI / 2;
        group.add(leaf);
      }

      const petalGeo = new THREE.SphereGeometry(1, 18, 12);
      const petalLayers = [
        { count: 9, radius: 0.25, y: 0.105, sx: 0.18, sy: 0.065, sz: 0.34, color: royal ? "#f6c85f" : "#e95d9a", emissive: royal ? "#6a3216" : "#641b43" },
        { count: 8, radius: 0.18, y: 0.145, sx: 0.15, sy: 0.06, sz: 0.29, color: royal ? "#ffe18a" : "#f58ab6", emissive: royal ? "#8a4a16" : "#7e2450" },
        { count: 6, radius: 0.105, y: 0.18, sx: 0.115, sy: 0.05, sz: 0.22, color: royal ? "#fff0b5" : "#ffc0d5", emissive: royal ? "#a76a20" : "#8b3158" },
      ];
      petalLayers.forEach((layer, layerIndex) => {
        const material = new THREE.MeshPhysicalMaterial({ color: layer.color, emissive: layer.emissive, emissiveIntensity: 0.16, roughness: 0.3, clearcoat: 0.42, clearcoatRoughness: 0.24, side: THREE.DoubleSide });
        for (let i = 0; i < layer.count; i++) {
          const angle = (i / layer.count) * Math.PI * 2 + layerIndex * 0.2;
          const petal = new THREE.Mesh(petalGeo, material);
          petal.scale.set(layer.sx, layer.sy, layer.sz);
          petal.position.set(Math.cos(angle) * layer.radius, layer.y, Math.sin(angle) * layer.radius);
          petal.rotation.set(-0.24 - layerIndex * 0.07, angle - Math.PI / 2, Math.cos(angle * 2) * 0.08);
          group.add(petal);
        }
      });

      const candleGeo = new THREE.CylinderGeometry(0.105, 0.12, 0.055, 20);
      const candleMat = new THREE.MeshStandardMaterial({ color: royal ? "#e9bf72" : "#f2d78c", roughness: 0.38, metalness: 0.18 });
      const candle = new THREE.Mesh(candleGeo, candleMat);
      candle.position.y = 0.19;
      group.add(candle);

      const glowCanvas = document.createElement("canvas");
      glowCanvas.width = 128;
      glowCanvas.height = 128;
      const glowContext = glowCanvas.getContext("2d")!;
      const glowGradient = glowContext.createRadialGradient(64, 64, 2, 64, 64, 64);
      glowGradient.addColorStop(0, "rgba(255, 245, 195, 0.9)");
      glowGradient.addColorStop(0.2, "rgba(255, 176, 70, 0.42)");
      glowGradient.addColorStop(1, "rgba(255, 115, 35, 0)");
      glowContext.fillStyle = glowGradient;
      glowContext.fillRect(0, 0, 128, 128);
      const glowTexture = new THREE.CanvasTexture(glowCanvas);
      glowTexture.colorSpace = THREE.SRGBColorSpace;
      const glow = new THREE.Sprite(new THREE.SpriteMaterial({ map: glowTexture, color: royal ? "#ffd477" : "#ffc16c", transparent: true, opacity: 0.68, depthWrite: false, blending: THREE.AdditiveBlending }));
      glow.position.y = 0.31;
      glow.scale.set(0.9, 0.9, 1);
      group.add(glow);

      const flameGeo = new THREE.SphereGeometry(0.055, 16, 12);
      const flameMat = new THREE.MeshBasicMaterial({ color: royal ? "#fff0b0" : "#fff4cf" });
      const flame = new THREE.Mesh(flameGeo, flameMat);
      flame.scale.set(0.72, 1.65, 0.72);
      flame.position.y = 0.34;
      group.add(flame);

      const light = new THREE.PointLight(royal ? "#ffcf70" : "#ffad57", 2.2, 4.5, 1.8);
      light.position.y = 0.32;
      group.add(light);

      group.position.set(posX, 0.05, posZ);
      group.userData = { message };
      scene.add(group);

      return {
        group,
        light,
        flame,
        initialX: posX,
        speed: 0.28 + Math.random() * 0.18,
        bobPhase: Math.random() * Math.PI * 2,
        message,
      };
    };

    releaseLanternRef.current = (
      message: string,
      royal = false
    ) => {
      const spawnX = (Math.random() - 0.5) * 4.2;
      const spawnZ = 6.5;

      const newLantern = createLotusLantern(
        message,
        spawnX,
        spawnZ,
        royal
      );

      lanterns.unshift(newLantern);
      setLanternCount(lanterns.length);
      setSessionWishes((wishes) => [...wishes, message]);
      controls.target.set(spawnX * 0.3, 0.4, spawnZ - 2);
    };
    setReady(true);

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

      const delta = Math.min(clock.getDelta(), 0.05);
      const time = clock.elapsedTime;

      // 1. Chuyển động sóng nước quang học Physical Water Shader
      water.material.uniforms["time"].value += delta;

      // 2. Xuồng ba lá nhấp nhô theo con nước dập dềnh
      sampanGroup.position.y = 0.05 + Math.sin(time * 1.5) * 0.04;
      sampanGroup.rotation.z = Math.sin(time * 1.2) * 0.03;
      sampanGroup.rotation.x = -0.55 + Math.cos(time * 1.1) * 0.02;

      // 3. Hoa lục bình trôi dạt lững lờ
      waterHyacinths.forEach((item) => {
        item.hyGroup.position.z -= item.speed * delta;
        if (item.hyGroup.position.z < -16) {
          item.hyGroup.position.z = 10;
          item.hyGroup.position.x = (Math.random() - 0.5) * 8;
        }
        item.hyGroup.position.y = 0.02 + Math.sin(time * 2.0) * 0.02;
      });

      // 4. Hoa đăng trôi xuôi dòng & Ánh nến lung linh
      lanterns.forEach((lantern) => {
        lantern.group.position.z -= lantern.speed * delta;

        if (lantern.group.position.z < -16) {
          lantern.group.position.z = -16;
          lantern.group.position.x = lantern.initialX;
        }

        lantern.group.position.y =
          0.05 + Math.sin(time * 2.4 + lantern.bobPhase) * 0.035;
        lantern.group.rotation.y += delta * 0.18;
        lantern.group.rotation.z = Math.sin(time * 1.9 + lantern.bobPhase) * 0.03;

        // Ánh lửa nến nhấp nháy tự nhiên
        lantern.light.intensity = 2.1 + Math.sin(time * 9 + lantern.bobPhase) * 0.35;
        lantern.flame.scale.y = 1.55 + (Math.sin(time * 11 + lantern.bobPhase) + 1) * 0.12;
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

    const handleContextLost = (event: Event) => {
      event.preventDefault();
      releaseLanternRef.current = null;
      setReady(false);
      setError(
        "Cảnh 3D đã bị gián đoạn. Hãy tải lại trang để mở lại cảnh."
      );
    };

    canvas.addEventListener(
      "webglcontextlost",
      handleContextLost
    );

    animate();

    const handleResize = () => {
      if (!host || !host.clientWidth || !host.clientHeight) return;
      camera.aspect = host.clientWidth / host.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(host.clientWidth, host.clientHeight);
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(host);
    handleResize();

    return () => {
      releaseLanternRef.current = null;

      canvas.removeEventListener(
        "webglcontextlost",
        handleContextLost
      );
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      canvas.removeEventListener("click", handleCanvasClick);
      controls.dispose();
      disposeThreeScene(scene);
      renderer.dispose();
      if (host.contains(canvas)) {
        host.removeChild(canvas);
      }
    };
  }, []);

  const autoReleasedWishRef = useRef(false);

  useEffect(() => {
    const message = initialWish?.trim();
    if (!ready || !message || autoReleasedWishRef.current) return;
    if (!releaseLanternRef.current) return;

    releaseLanternRef.current(message);
    autoReleasedWishRef.current = true;
  }, [initialWish, ready]);

  const handleRelease = async () => {
    const text = customWish.trim();

    if (
      !text ||
      !ready ||
      !releaseLanternRef.current ||
      royalLockRef.current
    ) {
      return;
    }

    setRoyalError("");

    if (lanternStyle === "standard") {
      releaseLanternRef.current(text);
      setCustomWish("");
      setShowInputModal(false);
      return;
    }

    if (!currentUserEmail && !isDemoMode()) {
      setRoyalError(
        "Hãy đăng nhập để dùng đèn trong kho. Đèn thường vẫn miễn phí."
      );
      return;
    }

    royalLockRef.current = true;
    setUsingRoyal(true);

    const accountEmail = currentUserEmail ?? "demo@tinlamtamlinh.local";
    const storageKey =
      `tltl-royal-lantern-request:${accountEmail.trim().toLowerCase()}`;

    try {
      // Chỉ lưu mã thao tác; không lưu lời viết.
      // Nếu không giữ được mã thì chưa gọi API trừ lượt.
      let requestId = sessionStorage.getItem(storageKey);

      if (
        !requestId ||
        !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
          requestId
        )
      ) {
        requestId = crypto.randomUUID();
      }

      sessionStorage.setItem(storageKey, requestId);

      await useRoyalLantern(requestId);

      if (!aliveRef.current) return;

      if (!releaseLanternRef.current) {
        throw new Error(
          "Lượt dùng đã được ghi nhận nhưng cảnh bị gián đoạn. Tải lại trang và thử dùng đèn lần nữa trong cùng tab để khôi phục bằng mã cũ."
        );
      }

      releaseLanternRef.current(text, true);

      // Chỉ bỏ mã khi đã thêm đèn vào cảnh.
      sessionStorage.removeItem(storageKey);

      setCustomWish("");
      setShowInputModal(false);
    } catch (reason) {
      if (!aliveRef.current) return;

      setRoyalError(
        reason instanceof Error
          ? reason.message
          : "Chưa hoàn tất lượt đèn. Hãy thử lại trong cùng tab."
      );
    } finally {
      royalLockRef.current = false;

      if (aliveRef.current) {
        setUsingRoyal(false);
      }
    }
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
          <span>CẢNH QUAN 3D LẤY CẢM HỨNG TỪ SÔNG NƯỚC NAM BỘ</span>
        </span>
        <span className="hidden sm:inline-block text-[11px] text-stone-300 bg-black/50 px-2.5 py-0.5 rounded-full backdrop-blur-sm">
          {lanternCount === 0
            ? "Chưa thắp hoa đăng trong phiên này"
            : `${lanternCount} hoa đăng đã thắp trong phiên này`}
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
        <div role="status" className="absolute inset-x-4 top-16 max-w-md mx-auto p-4 rounded-2xl bg-black/85 border border-emerald-500/50 text-white backdrop-blur-md shadow-2xl animate-fade-in z-20">
          <div className="flex items-center justify-between gap-2 mb-1.5">
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-300 flex items-center gap-1">
              <span>🌸</span>
              <span>LỜI NGUYỆN BẠN ĐÃ THẮP TRONG PHIÊN NÀY</span>
            </span>
            <button
              type="button"
              aria-label="Đóng lời nguyện đang xem"
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
            <span>Chỉ hiển thị trong cảnh đang mở</span>
            <button
              type="button"
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
          <span>Hoa đăng do bạn tự thắp chỉ hiển thị trong cảnh đang mở; không được chia sẻ công khai.</span>
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

      {sessionWishes.length > 0 && (
        <section aria-labelledby="session-lanterns-title" className="border-t border-emerald-900/40 bg-[#07111d] p-4 text-white">
          <h2 id="session-lanterns-title" className="text-sm font-semibold text-emerald-200">
            Hoa đăng trong phiên này ({sessionWishes.length})
          </h2>
          <ul className="mt-2 flex flex-wrap gap-2">
            {sessionWishes.map((wish, index) => (
              <li key={`${index}:${wish}`}>
                <button
                  type="button"
                  aria-pressed={selectedLanternWish === wish}
                  onClick={() => setSelectedLanternWish(wish)}
                  className="min-h-11 max-w-full rounded-lg border border-emerald-500/30 px-3 py-2 text-left text-xs text-emerald-50 hover:bg-emerald-900/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-300"
                >
                  Hoa đăng {index + 1}: {wish}
                </button>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Modal Popup Nhập lời nguyện thả hoa đăng */}
      {showInputModal && (
        <AppDialog
          labelledBy="lantern-dialog-title"
          onClose={() => {
            if (!usingRoyal) setShowInputModal(false);
          }}
          className="max-w-sm border-emerald-500/40 bg-[#071626] p-5 text-white"
        >
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 id="lantern-dialog-title" className="font-display text-base font-bold text-emerald-300 flex items-center gap-1.5">
                <span>🏮</span>
                <span>Thả hoa đăng cầu an trên sông</span>
              </h2>
              <button
                type="button"
                aria-label="Đóng hộp thoại thả hoa đăng"
                onClick={() => {
                  if (!usingRoyal) setShowInputModal(false);
                }}
                className="text-stone-400 hover:text-white text-sm cursor-pointer"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-stone-300 leading-relaxed">
              Viết lời chúc lành hoặc tâm nguyện của riêng bạn. Nội dung chỉ hiển thị trong cảnh đang mở, không được lưu hoặc chia sẻ công khai.
            </p>

            <fieldset
              disabled={usingRoyal}
              className="space-y-2 text-sm"
            >
              <legend className="mb-2 font-semibold">
                Chọn loại đèn
              </legend>

              <label className="flex min-h-11 items-center gap-2">
                <input
                  type="radio"
                  name="lantern-style"
                  checked={lanternStyle === "standard"}
                  onChange={() => setLanternStyle("standard")}
                />
                Đèn thường — miễn phí
              </label>

              <label className="flex min-h-11 items-center gap-2">
                <input
                  type="radio"
                  name="lantern-style"
                  checked={lanternStyle === "royal"}
                  onChange={() => setLanternStyle("royal")}
                />
                Đèn hoàng gia — dùng 1 lượt trong kho
              </label>
            </fieldset>

            {lanternStyle === "royal" && (
              <p className="text-xs leading-relaxed text-stone-300">
                {isDemoMode()
                  ? `Hội viên demo đã đăng ký · còn ${getDemoRoyalLanternStock()} lượt đèn hoàng gia trong kho. Lượt dùng chỉ lưu trên trình duyệt.`
                  : "Đèn hoàng gia dùng một lượt trong kho hội viên. Mỗi năm hội viên Tâm An được tặng một lượt."}
              </p>
            )}

            {royalError && (
              <p role="alert" className="text-sm text-amber-200">
                {royalError}
              </p>
            )}

            <label htmlFor="lantern-wish-content" className="block text-xs font-semibold text-emerald-100">
              Lời chúc hoặc tâm nguyện
            </label>
            <textarea
              id="lantern-wish-content"
              rows={3}
              maxLength={280}
              value={customWish}
              disabled={usingRoyal}
              onChange={(e) => setCustomWish(e.target.value)}
              placeholder="VD: Cầu cho gia đạo bình an, cha mẹ mạnh khỏe, mọi sự hanh thông thuận lợi…"
              className="w-full rounded-xl border border-emerald-500/30 bg-black/50 p-2.5 text-xs text-white placeholder:text-stone-500 focus:outline-none focus:ring-1 focus:ring-emerald-400 leading-relaxed"
            />
            <p className="text-right text-[11px] text-stone-400" aria-live="polite">
              {customWish.length}/280 ký tự
            </p>

            <div className="flex items-center justify-end gap-2 pt-1">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => {
                  if (!usingRoyal) setShowInputModal(false);
                }}
                className="text-xs text-stone-400 hover:text-white cursor-pointer"
              >
                Hủy
              </Button>
              <Button
                type="button"
                size="sm"
                onClick={() => void handleRelease()}
                disabled={
                  usingRoyal ||
                  !ready ||
                  !customWish.trim()
                }
                className="text-xs rounded-xl bg-gradient-to-r from-emerald-600 to-amber-600 hover:from-emerald-500 hover:to-amber-500 text-white font-semibold cursor-pointer gap-1.5 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Send className="w-3 h-3" />
                <span>
                  {usingRoyal ? "Đang xác nhận lượt…" : "Thả đèn"}
                </span>
              </Button>
            </div>
          </div>
        </AppDialog>
      )}

      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/80 text-xs text-stone-400 p-4 text-center">
          {error}
        </div>
      )}
    </div>
  );
}
