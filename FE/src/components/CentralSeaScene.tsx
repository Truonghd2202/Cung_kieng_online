import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { Water } from "three/examples/jsm/objects/Water.js";
import { Sky } from "three/examples/jsm/objects/Sky.js";
import { Button } from "./ui/button";
import {
  Waves,
  RotateCcw,
  Sun,
  Sunset,
  Volume2,
  VolumeX,
  Compass,
} from "lucide-react";

// Hàm tạo Procedural Normal Map cho sóng biển chuyển động tự nhiên
function createProceduralWaterNormalTexture(): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext("2d")!;
  const imgData = ctx.createImageData(512, 512);
  const data = imgData.data;

  for (let y = 0; y < 512; y++) {
    for (let x = 0; x < 512; x++) {
      const idx = (y * 512 + x) * 4;
      const u = (x / 512) * Math.PI * 10;
      const v = (y / 512) * Math.PI * 10;

      // Sóng biển phức hợp đa tầng (trochoidal wave simulation approximation)
      const dx =
        Math.cos(u * 1.2 + v * 0.7) * 1.5 -
        Math.sin(v * 2.2 - u * 0.8) * 1.2 +
        Math.cos(u * 3.5 - v * 2.1) * 1.8;
      const dy =
        Math.cos(u * 1.2 + v * 0.7) * 0.8 +
        Math.cos(v * 2.2 - u * 0.8) * 2.0 -
        Math.sin(u * 3.5 - v * 2.1) * 1.1;

      let nx = -dx * 0.16;
      let ny = -dy * 0.16;
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

export default function CentralSeaScene() {
  const hostRef = useRef<HTMLDivElement | null>(null);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState("");
  const [timeMode, setTimeMode] = useState<"dawn" | "day">("dawn");

  const resetRef = useRef<() => void>(() => {});
  const switchTimeRef = useRef<((mode: "dawn" | "day") => void) | null>(null);

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
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 0.95;

    const canvas = renderer.domElement;
    canvas.style.display = "block";
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    host.appendChild(canvas);

    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(
      52,
      host.clientWidth / host.clientHeight,
      1,
      20000
    );
    camera.position.set(0, 18, 55);

    // Orbit Controls
    const controls = new OrbitControls(camera, canvas);
    controls.enablePan = false;
    controls.minDistance = 25;
    controls.maxDistance = 160;
    controls.maxPolarAngle = Math.PI / 2 - 0.02; // Không nhìn dưới mặt nước
    controls.minPolarAngle = 0.2;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.35;
    controls.target.set(0, 5, 0);
    controls.update();

    resetRef.current = () => {
      camera.position.set(0, 18, 55);
      controls.target.set(0, 5, 0);
      controls.update();
    };

    // ==========================================
    // 1. BẦU TRỜI CHÂN THỰC VỚI RAYLEIGH SCATTERING (SKY SHADER)
    // ==========================================
    const sky = new Sky();
    sky.scale.setScalar(10000);
    scene.add(sky);

    const skyUniforms = sky.material.uniforms;
    skyUniforms["turbidity"].value = 6;
    skyUniforms["rayleigh"].value = 1.8;
    skyUniforms["mieCoefficient"].value = 0.005;
    skyUniforms["mieDirectionalG"].value = 0.82;

    const sun = new THREE.Vector3();
    const pmremGenerator = new THREE.PMREMGenerator(renderer);

    const updateSun = (elevation: number, azimuth: number) => {
      const phi = THREE.MathUtils.degToRad(90 - elevation);
      const theta = THREE.MathUtils.degToRad(azimuth);
      sun.setFromSphericalCoords(1, phi, theta);

      sky.material.uniforms["sunPosition"].value.copy(sun);
      water.material.uniforms["sunDirection"].value.copy(sun).normalize();
      scene.environment = pmremGenerator.fromScene(sky as any).texture;
    };

    // ==========================================
    // 2. MẶT BIỂN CHÂN THẬT VỚI THREE.JS WATER SHADER
    // ==========================================
    const waterGeometry = new THREE.PlaneGeometry(10000, 10000);
    const waterNormals = createProceduralWaterNormalTexture();

    const water = new Water(waterGeometry, {
      textureWidth: 512,
      textureHeight: 512,
      waterNormals: waterNormals,
      sunDirection: new THREE.Vector3(),
      sunColor: 0xffe2b8,
      waterColor: 0x0a3b52,
      distortionScale: 3.5,
      fog: scene.fog !== undefined,
    });
    water.rotation.x = -Math.PI / 2;
    scene.add(water);

    // Thiết lập ánh sáng theo chế độ Bình minh biển miền Trung
    updateSun(5.5, 175); // Mặt trời vừa nhô lên khỏi đường chân trời

    switchTimeRef.current = (mode: "dawn" | "day") => {
      if (mode === "dawn") {
        updateSun(5.5, 175);
        water.material.uniforms["sunColor"].value.setHex(0xffaa55);
        water.material.uniforms["waterColor"].value.setHex(0x0a3b52);
        renderer.toneMappingExposure = 0.95;
      } else {
        updateSun(28, 175);
        water.material.uniforms["sunColor"].value.setHex(0xffffff);
        water.material.uniforms["waterColor"].value.setHex(0x00415a);
        renderer.toneMappingExposure = 1.05;
      }
    };

    // ==========================================
    // 3. THUYỀN GỖ ĐÁNH CÁ CỦA NGƯ DÂN MIỀN TRUNG
    // ==========================================
    const boatGroup = new THREE.Group();

    // Thân thuyền nan gỗ uốn cong
    const hullShape = new THREE.Shape();
    hullShape.moveTo(-3, 0);
    hullShape.quadraticCurveTo(-1.5, -1.2, 0, -1.4);
    hullShape.quadraticCurveTo(1.5, -1.2, 3, 0);
    hullShape.quadraticCurveTo(1.8, 1.1, 0, 1.2);
    hullShape.quadraticCurveTo(-1.8, 1.1, -3, 0);

    const extrudeSettings = {
      depth: 1.6,
      bevelEnabled: true,
      bevelSegments: 4,
      steps: 2,
      bevelSize: 0.2,
      bevelThickness: 0.3,
    };
    const hullGeo = new THREE.ExtrudeGeometry(hullShape, extrudeSettings);
    hullGeo.rotateX(Math.PI / 2);
    hullGeo.rotateZ(Math.PI / 2);

    const woodMaterial = new THREE.MeshStandardMaterial({
      color: "#543825",
      roughness: 0.75,
      metalness: 0.1,
    });
    const hullMesh = new THREE.Mesh(hullGeo, woodMaterial);
    hullMesh.position.y = 0.2;
    boatGroup.add(hullMesh);

    // Cột buồm gỗ thẳng đứng
    const mastGeo = new THREE.CylinderGeometry(0.1, 0.14, 7.5, 12);
    const mastMesh = new THREE.Mesh(mastGeo, woodMaterial);
    mastMesh.position.set(0.3, 3.8, 0);
    boatGroup.add(mastMesh);

    // Cánh buồm nâu mộc mạc giương đón gió biển
    const sailGeo = new THREE.BufferGeometry();
    const sailVertices = new Float32Array([
      // Tam giác cánh buồm
      0.3, 7.2, 0,
      0.3, 1.5, 0,
      3.8, 1.8, 0.4,
    ]);
    sailGeo.setAttribute("position", new THREE.BufferAttribute(sailVertices, 3));
    sailGeo.computeVertexNormals();

    const sailMat = new THREE.MeshStandardMaterial({
      color: "#9c603b",
      roughness: 0.65,
      side: THREE.DoubleSide,
    });
    const sailMesh = new THREE.Mesh(sailGeo, sailMat);
    boatGroup.add(sailMesh);

    // Đèn bão treo đầu mũi thuyền phát sáng ấm áp
    const lanternGeo = new THREE.SphereGeometry(0.2, 12, 12);
    const lanternMat = new THREE.MeshBasicMaterial({ color: "#fef08a" });
    const lanternMesh = new THREE.Mesh(lanternGeo, lanternMat);
    lanternMesh.position.set(-2.8, 1.6, 0);
    boatGroup.add(lanternMesh);

    const lanternLight = new THREE.PointLight("#ffaa33", 2.2, 12);
    lanternLight.position.set(-2.8, 1.6, 0);
    boatGroup.add(lanternLight);

    boatGroup.position.set(12, 0, -18);
    boatGroup.rotation.y = -0.4;
    scene.add(boatGroup);

    // Chiếc thuyền thúng tròn đặc trưng xứ Trung
    const basketBoat = new THREE.Group();
    const basketGeo = new THREE.SphereGeometry(1.6, 16, 12, 0, Math.PI * 2, 0, Math.PI / 2);
    basketGeo.scale(1, 0.6, 1);
    const basketMat = new THREE.MeshStandardMaterial({
      color: "#785838",
      roughness: 0.85,
      side: THREE.DoubleSide,
    });
    const basketMesh = new THREE.Mesh(basketGeo, basketMat);
    basketMesh.rotation.x = Math.PI;
    basketMesh.position.y = 0.7;
    basketBoat.add(basketMesh);

    // Vành tre đan quanh miệng thuyền thúng
    const rimGeo = new THREE.TorusGeometry(1.62, 0.08, 8, 24);
    rimGeo.rotateX(Math.PI / 2);
    const rimMat = new THREE.MeshStandardMaterial({ color: "#997349", roughness: 0.9 });
    const rimMesh = new THREE.Mesh(rimGeo, rimMat);
    rimMesh.position.y = 0.7;
    basketBoat.add(rimMesh);

    basketBoat.position.set(-16, 0, -8);
    scene.add(basketBoat);

    // ==========================================
    // 4. ĐÀN HẢI ÂU BAY LƯỢN TRÊN MẶT BIỂN
    // ==========================================
    const gulls: Array<{
      group: THREE.Group;
      radius: number;
      speed: number;
      angle: number;
      height: number;
      wingL: THREE.Mesh;
      wingR: THREE.Mesh;
    }> = [];

    for (let i = 0; i < 5; i++) {
      const gullGroup = new THREE.Group();

      const wingMat = new THREE.MeshBasicMaterial({
        color: "#ffffff",
        side: THREE.DoubleSide,
      });

      // Cánh trái
      const wingGeo = new THREE.PlaneGeometry(0.8, 0.25);
      const wingL = new THREE.Mesh(wingGeo, wingMat);
      wingL.position.x = -0.4;
      gullGroup.add(wingL);

      // Cánh phải
      const wingR = new THREE.Mesh(wingGeo, wingMat);
      wingR.position.x = 0.4;
      gullGroup.add(wingR);

      scene.add(gullGroup);

      gulls.push({
        group: gullGroup,
        radius: 35 + Math.random() * 25,
        speed: 0.4 + Math.random() * 0.3,
        angle: (i / 5) * Math.PI * 2,
        height: 12 + Math.random() * 8,
        wingL,
        wingR,
      });
    }

    // ==========================================
    // 5. ANIMATION LOOP
    // ==========================================
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const time = clock.getElapsedTime();

      // 1. Chuyển động sóng biển Water Shader (Realistic fluid)
      water.material.uniforms["time"].value += 1.0 / 60.0;

      // 2. Thuyền gỗ nhấp nhô theo sóng biển
      boatGroup.position.y = Math.sin(time * 1.6) * 0.35;
      boatGroup.rotation.z = Math.sin(time * 1.2) * 0.05;
      boatGroup.rotation.x = -0.4 + Math.cos(time * 1.4) * 0.03;

      // Thuyền thúng dập dềnh
      basketBoat.position.y = Math.sin(time * 2.1 + 1) * 0.25;
      basketBoat.rotation.z = Math.sin(time * 1.8 + 1) * 0.08;
      basketBoat.rotation.x = Math.cos(time * 1.5 + 1) * 0.06;

      // 3. Hải âu bay lượn & đập cánh
      gulls.forEach((g) => {
        g.angle += g.speed * 0.015;
        g.group.position.x = Math.cos(g.angle) * g.radius;
        g.group.position.z = Math.sin(g.angle) * (g.radius * 0.7) - 20;
        g.group.position.y = g.height + Math.sin(g.angle * 3) * 1.5;

        // Hướng mỏ bay theo hướng di chuyển
        g.group.rotation.y = -g.angle + Math.PI / 2;

        // Vỗ cánh
        const flap = Math.sin(time * 10 + g.radius) * 0.35;
        g.wingL.rotation.z = flap;
        g.wingR.rotation.z = -flap;
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
      controls.dispose();
      pmremGenerator.dispose();
      waterGeometry.dispose();
      waterNormals.dispose();
      renderer.dispose();
      if (host.contains(canvas)) {
        host.removeChild(canvas);
      }
    };
  }, []);

  const handleToggleTimeMode = () => {
    const next = timeMode === "dawn" ? "day" : "dawn";
    setTimeMode(next);
    if (switchTimeRef.current) {
      switchTimeRef.current(next);
    }
  };

  return (
    <div className="relative w-full rounded-2xl overflow-hidden border border-rose-500/40 bg-[#0c1f30] shadow-xl group">
      {/* 3D Canvas Host */}
      <div
        ref={hostRef}
        className="w-full h-80 sm:h-96 md:h-[430px] cursor-grab active:cursor-grabbing"
      />

      {/* Top HUD Badge */}
      <div className="absolute top-3.5 left-4 pointer-events-none flex items-center gap-2">
        <span className="px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-black/65 text-amber-300 border border-amber-500/40 backdrop-blur-md flex items-center gap-2 shadow-sm">
          <Waves className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
          <span>BIỂN MIỀN TRUNG 3D · CHÂN THỰC & SỐNG ĐỘNG</span>
        </span>
      </div>

      {/* Top Right Controls */}
      <div className="absolute top-3.5 right-4 flex items-center gap-2">
        <button
          type="button"
          onClick={handleToggleTimeMode}
          title={timeMode === "dawn" ? "Chuyển sang ban ngày" : "Chuyển sang bình minh"}
          className="px-3 py-1.5 rounded-xl bg-black/60 hover:bg-black/80 text-amber-300 hover:text-white border border-white/10 backdrop-blur-md transition-all cursor-pointer flex items-center gap-1.5 text-xs font-medium"
        >
          {timeMode === "dawn" ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Sunset className="w-3.5 h-3.5 text-orange-400" />}
          <span>{timeMode === "dawn" ? "Bình minh" : "Ban ngày"}</span>
        </button>

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
          <span>Dùng chuột/ngón tay xoay 360° · Cuộn để phóng to/thu nhỏ thuyền và mặt nước</span>
        </div>

        <span className="text-[11px] text-amber-200/80 italic hidden sm:inline-block">
          Mô phỏng mặt nước quang học chân thực (Physical Ocean Shader)
        </span>
      </div>

      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/80 text-xs text-stone-400 p-4 text-center">
          {error}
        </div>
      )}
    </div>
  );
}
