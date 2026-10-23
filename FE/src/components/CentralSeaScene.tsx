import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { Water } from "three/examples/jsm/objects/Water.js";
import { Sky } from "three/examples/jsm/objects/Sky.js";
import { disposeThreeScene } from "./threeSceneUtils";
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

// HÃ m táº¡o Procedural Normal Map cho sÃ³ng biá»ƒn chuyá»ƒn Ä‘á»™ng tá»± nhiÃªn
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

      // SÃ³ng biá»ƒn phá»©c há»£p Ä‘a táº§ng (trochoidal wave simulation approximation)
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
  const [soundEnabled, setSoundEnabled] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const birdTimerRef = useRef<number | null>(null);

  const resetRef = useRef<() => void>(() => {});
  const switchTimeRef = useRef<((mode: "dawn" | "day") => void) | null>(null);

  const handleToggleSound = () => {
    if (audioContextRef.current) {
      if (birdTimerRef.current !== null) window.clearInterval(birdTimerRef.current);
      birdTimerRef.current = null;
      void audioContextRef.current.close();
      audioContextRef.current = null;
      setSoundEnabled(false);
      return;
    }

    const context = new AudioContext();
    audioContextRef.current = context;
    const buffer = context.createBuffer(1, context.sampleRate * 4, context.sampleRate);
    const samples = buffer.getChannelData(0);
    for (let i = 0; i < samples.length; i++) samples[i] = (Math.random() * 2 - 1) * 0.45;

    const waves = context.createBufferSource();
    waves.buffer = buffer;
    waves.loop = true;
    const lowPass = context.createBiquadFilter();
    lowPass.type = "lowpass";
    lowPass.frequency.value = 520;
    const waveGain = context.createGain();
    waveGain.gain.value = 0.026;
    waves.connect(lowPass).connect(waveGain).connect(context.destination);
    waves.start();

    const swell = context.createOscillator();
    const swellDepth = context.createGain();
    swell.frequency.value = 0.11;
    swellDepth.gain.value = 0.018;
    swell.connect(swellDepth).connect(waveGain.gain);
    swell.start();

    const chirp = () => {
      for (let note = 0; note < 3; note++) {
        const start = context.currentTime + note * 0.19;
        const bird = context.createOscillator();
        const envelope = context.createGain();
        bird.type = "sine";
        bird.frequency.setValueAtTime(1550 + note * 120, start);
        bird.frequency.exponentialRampToValueAtTime(2450 + note * 100, start + 0.07);
        bird.frequency.exponentialRampToValueAtTime(1750 + note * 80, start + 0.19);
        envelope.gain.setValueAtTime(0.0001, start);
        envelope.gain.exponentialRampToValueAtTime(0.022, start + 0.025);
        envelope.gain.exponentialRampToValueAtTime(0.0001, start + 0.2);
        bird.connect(envelope).connect(context.destination);
        bird.start(start);
        bird.stop(start + 0.21);
      }
    };
    chirp();
    birdTimerRef.current = window.setInterval(chirp, 7200);
    void context.resume();
    setSoundEnabled(true);
  };

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
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMappingExposure = 0.9;

    const canvas = renderer.domElement;
    canvas.style.display = "block";
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    host.appendChild(canvas);

    const scene = new THREE.Scene();
    scene.add(new THREE.HemisphereLight("#fff3dc", "#17414a", 1.85));
    const sunlight = new THREE.DirectionalLight("#ffe8c8", 2.15);
    sunlight.position.set(-18, 28, 16);
    sunlight.castShadow = true;
    sunlight.shadow.mapSize.set(1024, 1024);
    sunlight.shadow.camera.near = 1;
    sunlight.shadow.camera.far = 120;
    sunlight.shadow.bias = -0.00015;
    scene.add(sunlight);

    // Camera
    const camera = new THREE.PerspectiveCamera(
      38,
      host.clientWidth / host.clientHeight,
      0.1,
      1800
    );
    camera.position.set(0, 14, 12);

    // Orbit Controls
    const controls = new OrbitControls(camera, canvas);
    controls.enablePan = false;
    controls.minDistance = 30;
    controls.maxDistance = 48;
    controls.maxPolarAngle = 1.38;
    controls.minPolarAngle = 0.58;
    controls.enableDamping = true;
    controls.autoRotate = false;
    controls.target.set(0, 2.4, -25);
    controls.update();

    resetRef.current = () => {
      camera.position.set(0, 14, 12);
      controls.target.set(0, 2.4, -25);
      controls.update();
    };

    // ==========================================
    // 1. Báº¦U TRá»œI CHÃ‚N THá»°C Vá»šI RAYLEIGH SCATTERING (SKY SHADER)
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
    let environmentTarget: THREE.WebGLRenderTarget | null = null;

    const updateSun = (elevation: number, azimuth: number) => {
      const phi = THREE.MathUtils.degToRad(90 - elevation);
      const theta = THREE.MathUtils.degToRad(azimuth);
      sun.setFromSphericalCoords(1, phi, theta);

      sky.material.uniforms["sunPosition"].value.copy(sun);
      water.material.uniforms["sunDirection"].value.copy(sun).normalize();
      environmentTarget?.dispose();
      environmentTarget = pmremGenerator.fromScene(sky as any);
      scene.environment = environmentTarget.texture;
    };

    // ==========================================
    // 2. Máº¶T BIá»‚N CHÃ‚N THáº¬T Vá»šI THREE.JS WATER SHADER
    // ==========================================
    const waterGeometry = new THREE.PlaneGeometry(1200, 1200);
    const waterNormals = createProceduralWaterNormalTexture();

    const water = new Water(waterGeometry, {
      textureWidth: 512,
      textureHeight: 512,
      waterNormals: waterNormals,
      sunDirection: new THREE.Vector3(),
      sunColor: 0xffe2b8,
      waterColor: 0x124b59,
      distortionScale: 1.45,
      fog: scene.fog !== undefined,
    });
    water.rotation.x = -Math.PI / 2;
    scene.add(water);

    // Thiáº¿t láº­p Ã¡nh sÃ¡ng theo cháº¿ Ä‘á»™ BÃ¬nh minh biá»ƒn miá»n Trung
    updateSun(5.5, 175); // Máº·t trá»i vá»«a nhÃ´ lÃªn khá»i Ä‘Æ°á»ng chÃ¢n trá»i

    switchTimeRef.current = (mode: "dawn" | "day") => {
      if (mode === "dawn") {
        updateSun(5.5, 175);
        water.material.uniforms["sunColor"].value.setHex(0xffaa55);
        water.material.uniforms["waterColor"].value.setHex(0x0a3b52);
        renderer.toneMappingExposure = 0.82;
      } else {
        updateSun(28, 175);
        water.material.uniforms["sunColor"].value.setHex(0xffffff);
        water.material.uniforms["waterColor"].value.setHex(0x00415a);
        renderer.toneMappingExposure = 0.92;
      }
    };

    // ==========================================
    // 3. THUYá»€N Gá»– ÄÃNH CÃ Cá»¦A NGÆ¯ DÃ‚N MIá»€N TRUNG
    // ==========================================
    const boatGroup = new THREE.Group();

    // ThÃ¢n thuyá»n nan gá»— uá»‘n cong
    const hullShape = new THREE.Shape();
    hullShape.moveTo(-3, -0.62);
    hullShape.quadraticCurveTo(-2.8, -0.84, -2.2, -0.82);
    hullShape.lineTo(1.65, -0.49);
    hullShape.quadraticCurveTo(2.65, -0.27, 3, 0);
    hullShape.quadraticCurveTo(2.65, 0.27, 1.65, 0.49);
    hullShape.lineTo(-2.2, 0.82);
    hullShape.quadraticCurveTo(-2.8, 0.84, -3, 0.62);
    hullShape.closePath();

    const hullGeo = new THREE.ExtrudeGeometry(hullShape, { depth: 0.55, bevelEnabled: true, bevelSegments: 3, steps: 1, bevelSize: 0.08, bevelThickness: 0.08 });
    hullGeo.rotateX(-Math.PI / 2);
    const woodMaterial = new THREE.MeshStandardMaterial({ color: "#60412c", roughness: 0.64 });
    woodMaterial.name = "hull-wood";
    const hullMesh = new THREE.Mesh(hullGeo, woodMaterial);
    hullMesh.position.y = 0.1;
    boatGroup.add(hullMesh);

    const deck = new THREE.Mesh(new THREE.ShapeGeometry(hullShape), new THREE.MeshStandardMaterial({ color: "#a57a4b", roughness: 0.78, side: THREE.DoubleSide }));
    deck.geometry.rotateX(-Math.PI / 2);
    deck.position.y = 0.66;
    boatGroup.add(deck);

    const mastMaterial = new THREE.MeshStandardMaterial({ color: "#49301e", roughness: 0.82 });
    const mastMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.075, 0.11, 3.65, 10), mastMaterial);
    mastMesh.position.set(-0.35, 2.49, 0);
    boatGroup.add(mastMesh);

    const sailMat = new THREE.MeshStandardMaterial({ color: "#e7ce91", roughness: 0.88, side: THREE.DoubleSide });
    sailMat.name = "sail-canvas";
    const addSail = (vertices: number[], material = sailMat) => {
      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute("position", new THREE.Float32BufferAttribute(vertices, 3));
      geometry.setIndex([0, 1, 2, 0, 2, 3]);
      geometry.computeVertexNormals();
      boatGroup.add(new THREE.Mesh(geometry, material));
    };
    addSail([-0.3, 3.92, 0.08, 1.35, 3.66, 0.08, 2.05, 1.0, 0.08, -0.3, 1.0, 0.08]);

    const aftMast = new THREE.Mesh(new THREE.CylinderGeometry(0.055, 0.08, 2.55, 8), mastMaterial);
    aftMast.position.set(-1.9, 1.94, 0);
    boatGroup.add(aftMast);
    const aftSailMat = sailMat.clone();
    aftSailMat.name = "aft-sail-canvas";
    aftSailMat.color.set("#d8bd7e");
    addSail([-1.9, 3.2, -0.07, -0.82, 2.98, -0.07, -0.55, 1.0, -0.07, -1.9, 1.0, -0.07], aftSailMat);

    const sparMaterial = new THREE.MeshStandardMaterial({ color: "#765333", roughness: 0.78 });
    const mainYard = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.045, 2.2, 8), sparMaterial);
    mainYard.position.set(0.55, 3.72, 0.1);
    mainYard.rotation.z = -0.1;
    boatGroup.add(mainYard);
    const mainBoom = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.05, 2.5, 8), sparMaterial);
    mainBoom.position.set(0.88, 0.98, 0.1);
    mainBoom.rotation.z = -0.04;
    boatGroup.add(mainBoom);

    const ropeMaterial = new THREE.MeshStandardMaterial({ color: "#b39a6c", roughness: 0.9 });
    const addRigging = (start: THREE.Vector3, end: THREE.Vector3) => {
      const rope = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, start.distanceTo(end), 5), ropeMaterial);
      rope.position.copy(start).add(end).multiplyScalar(0.5);
      rope.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), end.clone().sub(start).normalize());
      boatGroup.add(rope);
    };
    addRigging(new THREE.Vector3(-0.35, 4.31, 0), new THREE.Vector3(2.7, 0.7, 0));
    addRigging(new THREE.Vector3(-0.35, 4.31, 0), new THREE.Vector3(-2.7, 0.7, 0));

    // ÄÃ¨n bÃ£o treo Ä‘áº§u mÅ©i thuyá»n phÃ¡t sÃ¡ng áº¥m Ã¡p
    const lanternGeo = new THREE.SphereGeometry(0.2, 12, 12);
    const lanternMat = new THREE.MeshBasicMaterial({ color: "#fef08a" });
    const lanternMesh = new THREE.Mesh(lanternGeo, lanternMat);
    lanternMesh.position.set(2.65, 0.83, 0);
    boatGroup.add(lanternMesh);

    const lanternLight = new THREE.PointLight("#ffaa33", 2.2, 12);
    lanternLight.position.set(2.65, 0.83, 0);
    boatGroup.add(lanternLight);

    boatGroup.position.set(4, 0, -5);
    boatGroup.rotation.y = -0.4;
    boatGroup.scale.setScalar(1.22);
    scene.add(boatGroup);

    const fishingBoats: Array<{ group: THREE.Group; phase: number; amplitude: number }> = [
      { group: boatGroup, phase: 0, amplitude: 0.34 },
    ];
    [
      { x: -11, z: 0, scale: 0.92, rotation: 0.35, phase: 1.4 },
      { x: 12, z: -9, scale: 0.84, rotation: -0.65, phase: 2.7 },
      { x: -3, z: -18, scale: 0.72, rotation: 0.8, phase: 4.2 },
      { x: 17, z: -29, scale: 0.66, rotation: -0.4, phase: 5.3 },
      { x: -17, z: -34, scale: 0.62, rotation: 0.7, phase: 2.2 },
      { x: 8, z: 8, scale: 0.58, rotation: -0.8, phase: 3.5 },
    ].forEach(({ x, z, scale, rotation, phase }) => {
      const boat = boatGroup.clone(true);
      boat.scale.setScalar(scale);
      boat.position.set(x, 0, z);
      boat.rotation.y = rotation;
      boat.traverse((object) => {
        const mesh = object as THREE.Mesh;
        if (mesh.material && !Array.isArray(mesh.material)) {
          mesh.material = mesh.material.clone();
          if (mesh.material instanceof THREE.MeshStandardMaterial && mesh.material.name.includes("sail-canvas")) {
            mesh.material.color.set(x < 0 ? "#e6d49f" : "#c9d2c1");
          } else if (mesh.material instanceof THREE.MeshStandardMaterial && mesh.material.name === "hull-wood") {
            mesh.material.color.set(x < 0 ? "#755239" : "#493b30");
          }
        }
      });
      scene.add(boat);
      fishingBoats.push({ group: boat, phase, amplitude: 0.22 * scale });
    });

    // Chiáº¿c thuyá»n thÃºng trÃ²n Ä‘áº·c trÆ°ng xá»© Trung
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

    // VÃ nh tre Ä‘an quanh miá»‡ng thuyá»n thÃºng
    const rimGeo = new THREE.TorusGeometry(1.62, 0.08, 8, 24);
    rimGeo.rotateX(Math.PI / 2);
    const rimMat = new THREE.MeshStandardMaterial({ color: "#997349", roughness: 0.9 });
    const rimMesh = new THREE.Mesh(rimGeo, rimMat);
    rimMesh.position.y = 0.7;
    basketBoat.add(rimMesh);

    basketBoat.position.set(-8, 0, 3);
    scene.add(basketBoat);

    // Low, broken limestone islets evoke the central coast without copying a landmark.
    const terrainTextureCanvas = document.createElement("canvas");
    terrainTextureCanvas.width = 512;
    terrainTextureCanvas.height = 512;
    const terrainTextureContext = terrainTextureCanvas.getContext("2d")!;
    const terrainImage = terrainTextureContext.createImageData(512, 512);
    let textureSeed = 82371;
    for (let i = 0; i < terrainImage.data.length; i += 4) {
      textureSeed = (textureSeed * 1664525 + 1013904223) >>> 0;
      const grain = 190 + (textureSeed % 58);
      terrainImage.data[i] = grain;
      terrainImage.data[i + 1] = grain;
      terrainImage.data[i + 2] = grain;
      terrainImage.data[i + 3] = 255;
    }
    terrainTextureContext.putImageData(terrainImage, 0, 0);
    const terrainTexture = new THREE.CanvasTexture(terrainTextureCanvas);
    terrainTexture.colorSpace = THREE.SRGBColorSpace;
    terrainTexture.wrapS = THREE.RepeatWrapping;
    terrainTexture.wrapT = THREE.RepeatWrapping;
    terrainTexture.repeat.set(3, 2);

    const terrainWidth = 56;
    const terrainDepth = 19;
    const segmentsX = 112;
    const segmentsZ = 48;
    const terrainPositions: number[] = [];
    const terrainColors: number[] = [];
    const terrainUvs: number[] = [];
    const terrainIndices: number[] = [];
    const shoreColor = new THREE.Color("#77786c");
    const scrubColor = new THREE.Color("#52684a");
    const forestColor = new THREE.Color("#35563a");
    const summitColor = new THREE.Color("#53664b");
    const terrainHeightAt = (x: number, z: number) => {
      const nx = x / (terrainWidth * 0.5);
      const nz = z / (terrainDepth * 0.5);
      const edge = Math.max(0, 1 - nx * nx - nz * nz * 0.92);
      const ridge = 0.68
        + 0.26 * Math.exp(-(((x + 9) / 8) ** 2))
        + 0.34 * Math.exp(-(((x - 5) / 7) ** 2))
        + 0.15 * Math.exp(-(((x - 17) / 5) ** 2));
      const roughness = 0.28 * Math.sin(x * 0.72 + z * 0.38)
        + 0.16 * Math.sin(x * 1.41 - z * 0.83)
        + 0.1 * Math.cos(z * 1.8 + x * 0.5);
      return -1.6 + 10.5 * Math.pow(edge, 0.68) * ridge + roughness * Math.sqrt(edge);
    };

    for (let row = 0; row <= segmentsZ; row++) {
      const z = (row / segmentsZ - 0.5) * terrainDepth;
      for (let column = 0; column <= segmentsX; column++) {
        const x = (column / segmentsX - 0.5) * terrainWidth;
        const height = terrainHeightAt(x, z);
        terrainPositions.push(x, height, z);
        terrainUvs.push(column / segmentsX, row / segmentsZ);

        const color = height < 0.55
          ? shoreColor.clone().lerp(scrubColor, THREE.MathUtils.smoothstep(height, -0.2, 1.2))
          : scrubColor.clone().lerp(height > 6.4 ? summitColor : forestColor, THREE.MathUtils.smoothstep(height, 0.5, 5.4));
        const fleck = 0.94 + 0.1 * Math.sin(x * 4.3 + z * 5.1);
        terrainColors.push(color.r * fleck, color.g * fleck, color.b * fleck);
      }
    }
    for (let row = 0; row < segmentsZ; row++) {
      for (let column = 0; column < segmentsX; column++) {
        const a = row * (segmentsX + 1) + column;
        const b = a + 1;
        const c = a + segmentsX + 1;
        const d = c + 1;
        terrainIndices.push(a, c, b, b, c, d);
      }
    }

    const terrainGeometry = new THREE.BufferGeometry();
    terrainGeometry.setAttribute("position", new THREE.Float32BufferAttribute(terrainPositions, 3));
    terrainGeometry.setAttribute("color", new THREE.Float32BufferAttribute(terrainColors, 3));
    terrainGeometry.setAttribute("uv", new THREE.Float32BufferAttribute(terrainUvs, 2));
    terrainGeometry.setIndex(terrainIndices);
    terrainGeometry.computeVertexNormals();
    const terrainMaterial = new THREE.MeshStandardMaterial({
      map: terrainTexture,
      bumpMap: terrainTexture,
      bumpScale: 0.08,
      vertexColors: true,
      roughness: 0.94,
      metalness: 0,
      side: THREE.DoubleSide,
    });
    const island = new THREE.Mesh(terrainGeometry, terrainMaterial);
    island.position.set(0, 0, -54);
    island.receiveShadow = true;
    scene.add(island);

    const rockMaterial = new THREE.MeshStandardMaterial({ color: "#8b8370", map: terrainTexture, roughness: 0.9 });
    const rockGeometry = new THREE.IcosahedronGeometry(1, 1);
    for (let i = 0; i < 34; i++) {
      const seed = Math.sin(i * 127.1 + 311.7) * 43758.5453;
      const random = seed - Math.floor(seed);
      const x = -25 + random * 50;
      const z = 4.7 + Math.sin(i * 1.71) * 2.2 + (random - 0.5) * 1.8;
      const rock = new THREE.Mesh(rockGeometry, rockMaterial);
      rock.position.set(x, Math.max(-0.1, terrainHeightAt(x, z) + 0.05), -54 + z);
      const size = 0.42 + random * 0.68;
      rock.scale.set(size * (0.8 + random * 0.5), size * (0.48 + random * 0.28), size * (0.72 + random * 0.45));
      rock.rotation.set(i * 0.17, i * 0.41, i * 0.13);
      rock.castShadow = true;
      rock.receiveShadow = true;
      scene.add(rock);
    }

    const treeTrunkMaterial = new THREE.MeshStandardMaterial({ color: "#574538", roughness: 0.96 });
    const canopyMaterials = ["#34553b", "#3f6342", "#496943", "#526c45"].map((color) =>
      new THREE.MeshStandardMaterial({ color, roughness: 0.98 })
    );
    const canopyGeometry = new THREE.IcosahedronGeometry(0.8, 1);
    const canopyPositions = canopyGeometry.attributes.position;
    for (let i = 0; i < canopyPositions.count; i++) {
      const x = canopyPositions.getX(i);
      const y = canopyPositions.getY(i);
      const z = canopyPositions.getZ(i);
      const scale = 1 + 0.09 * Math.sin(x * 8 + z * 5) * Math.cos(y * 7);
      canopyPositions.setXYZ(i, x * scale, y * scale, z * scale);
    }
    canopyGeometry.computeVertexNormals();

    for (let i = 0; i < 17; i++) {
      const x = -19 + i * 2.35;
      const localZ = -1.8 + Math.sin(i * 2.2) * 3.4;
      const ground = terrainHeightAt(x, localZ);
      if (ground < 1.3) continue;
      const tree = new THREE.Group();
      const height = 1.1 + (i % 4) * 0.24;
      const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.15, height, 7), treeTrunkMaterial);
      trunk.position.y = height * 0.5;
      tree.add(trunk);
      for (let crown = 0; crown < 3; crown++) {
        const foliage = new THREE.Mesh(canopyGeometry, canopyMaterials[(i + crown) % canopyMaterials.length]);
        foliage.position.set((crown - 1) * 0.38, height + (crown === 1 ? 0.42 : 0.12), (crown % 2 ? 0.24 : -0.18));
        foliage.scale.set(0.68 + (i % 3) * 0.1, 0.56 + (crown % 2) * 0.16, 0.62 + (i % 2) * 0.12);
        tree.add(foliage);
      }
      tree.position.set(x, ground - 0.05, -54 + localZ);
      tree.rotation.y = i * 0.71;
      tree.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.castShadow = true;
          object.receiveShadow = true;
        }
      });
      scene.add(tree);
    }

    // ==========================================
    // 4. ÄÃ€N Háº¢I Ã‚U BAY LÆ¯á»¢N TRÃŠN Máº¶T BIá»‚N
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

    for (let i = 0; i < 14; i++) {
      const gullGroup = new THREE.Group();

      const wingMat = new THREE.MeshBasicMaterial({
        color: "#40585d",
        side: THREE.DoubleSide,
      });

      // CÃ¡nh trÃ¡i
      const makeWing = (side: -1 | 1) => {
        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute("position", new THREE.Float32BufferAttribute([
          0, 0, 0,
          side * 0.8, 0.19, 0,
          side * 0.48, -0.13, 0.025,
          side * 0.18, -0.08, 0.02,
        ], 3));
        geometry.setIndex([0, 1, 2, 0, 2, 3]);
        geometry.computeVertexNormals();
        const wing = new THREE.Mesh(geometry, wingMat);
        gullGroup.add(wing);
        return wing;
      };
      const wingL = makeWing(-1);
      const wingR = makeWing(1);
      const birdBody = new THREE.Mesh(
        new THREE.SphereGeometry(0.13, 10, 8),
        new THREE.MeshBasicMaterial({ color: "#34474a" })
      );
      birdBody.scale.set(0.72, 0.72, 1.8);
      gullGroup.add(birdBody);
      gullGroup.scale.setScalar(1.15);

      scene.add(gullGroup);

      gulls.push({
        group: gullGroup,
        radius: 12 + Math.random() * 12,
        speed: 0.1 + Math.random() * 0.09,
        angle: (i / 14) * Math.PI * 2,
        height: 9 + Math.random() * 7,
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

      const delta = Math.min(clock.getDelta(), 0.05);
      const time = clock.elapsedTime;

      // 1. Chuyá»ƒn Ä‘á»™ng sÃ³ng biá»ƒn Water Shader (Realistic fluid)
      water.material.uniforms["time"].value += delta;

      // 2. Thuyá»n gá»— nháº¥p nhÃ´ theo sÃ³ng biá»ƒn
      fishingBoats.forEach(({ group, phase, amplitude }) => {
        group.position.y = Math.sin(time * 1.6 + phase) * amplitude;
        group.rotation.z = Math.sin(time * 1.2 + phase) * 0.045;
        group.rotation.x = -0.4 + Math.cos(time * 1.4 + phase) * 0.025;
      });

      // Thuyá»n thÃºng dáº­p dá»nh
      basketBoat.position.y = Math.sin(time * 2.1 + 1) * 0.25;
      basketBoat.rotation.z = Math.sin(time * 1.8 + 1) * 0.08;
      basketBoat.rotation.x = Math.cos(time * 1.5 + 1) * 0.06;

      // 3. Háº£i Ã¢u bay lÆ°á»£n & Ä‘áº­p cÃ¡nh
      gulls.forEach((g) => {
        g.angle += g.speed * delta;
        g.group.position.x = Math.cos(g.angle) * g.radius;
        g.group.position.z = Math.sin(g.angle) * (g.radius * 0.7) - 23;
        g.group.position.y = g.height + Math.sin(g.angle * 3) * 1.5;

        // HÆ°á»›ng má» bay theo hÆ°á»›ng di chuyá»ƒn
        g.group.rotation.y = -g.angle + Math.PI / 2;

        // Vá»— cÃ¡nh
        const flap = Math.sin(time * 8 + g.radius) * 0.35;
        g.wingL.rotation.z = flap;
        g.wingR.rotation.z = -flap;
      });

      controls.update();
      renderer.render(scene, camera);
    };

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
      cancelAnimationFrame(animationFrameId);
      if (birdTimerRef.current !== null) window.clearInterval(birdTimerRef.current);
      birdTimerRef.current = null;
      if (audioContextRef.current) void audioContextRef.current.close();
      audioContextRef.current = null;
      resizeObserver.disconnect();
      controls.dispose();
      environmentTarget?.dispose();
      pmremGenerator.dispose();
      disposeThreeScene(scene);
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
          aria-label={soundEnabled ? "Tắt âm thanh sóng biển và chim" : "Bật âm thanh sóng biển và chim"}
          aria-pressed={soundEnabled}
          onClick={handleToggleSound}
          title={soundEnabled ? "Tắt âm thanh biển" : "Bật tiếng sóng biển và chim"}
          className="p-2 rounded-xl bg-black/60 hover:bg-black/80 text-amber-200 hover:text-white border border-white/10 backdrop-blur-md transition-all cursor-pointer"
        >
          {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
        </button>
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
          <span className="text-amber-400 font-bold">âœ¦</span>
          <span>Kéo để xoay quanh đảo và thuyền · Cuộn để phóng to hoặc thu nhỏ</span>
        </div>

        <span className="text-[11px] text-amber-200/80 italic hidden sm:inline-block">
          Mô phỏng mặt nước và ánh sáng biển
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
