import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import {
  Flame,
  RotateCcw,
  RotateCw,
  ZoomIn,
  ZoomOut,
  Compass,
  Sparkles,
  Heart,
} from "lucide-react";
import type { MemorialRecord } from "../screens/MemorialSpaceScreen";
import {
  createDigitalDecoration,
  disposeDigitalDecoration,
  type DecorationId,
} from "./createDigitalDecoration";

interface SanctuarySceneProps {
  memorial: MemorialRecord | null;
  onOpenMemorial: () => void;
  decoration?: DecorationId | null;
}

export const SanctuaryScene: React.FC<SanctuarySceneProps> = ({
  memorial,
  onOpenMemorial,
  decoration = null,
}) => {
  const hostRef = useRef<HTMLDivElement>(null);
  const resetRef = useRef<(() => void) | null>(null);
  const viewRef = useRef<{
    rotate: (angle: number) => void;
    zoom: (factor: number) => void;
  } | null>(null);
  const decorationControllerRef = useRef<{
    set: (id: DecorationId | null) => void;
  } | null>(null);
  const [error, setError] = useState("");
  const [incenseLit, setIncenseLit] = useState(false);

  const incenseRef = useRef<{
    setLit: (lit: boolean) => void;
  } | null>(null);

  const handleToggleIncense = () => {
    const controller = incenseRef.current;

    if (!controller || error) return;

    const next = !incenseLit;

    controller.setLit(next);
    setIncenseLit(next);
  };

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    let renderer: THREE.WebGLRenderer;

    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        powerPreference: "low-power",
      });
    } catch {
      setError(
        "Thiết bị chưa mở được cảnh 3D. Bạn vẫn có thể dùng các mục bên dưới.",
      );
      return;
    }

    let contextLost = false;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;
    // Bàn, lư hương và đèn tạo bóng đều đứng yên.
    // Chỉ cần tạo lại shadow map khi chúng thay đổi.
    renderer.shadowMap.autoUpdate = false;
    renderer.shadowMap.needsUpdate = true;
    renderer.domElement.setAttribute(
      "aria-label",
      "Cảnh 3D góc tri ân: bàn gỗ và lư hương mẫu",
    );
    host.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#d8cbbb");

    const roomEnvironment = new RoomEnvironment();
    const pmremGenerator = new THREE.PMREMGenerator(renderer);

    const environmentTarget = pmremGenerator.fromScene(
      roomEnvironment,
      0.04,
    );

    scene.environment = environmentTarget.texture;
    scene.environmentIntensity = 0.6;

    roomEnvironment.dispose();
    pmremGenerator.dispose();

    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 50);
    camera.position.set(0.75, 2.55, 4.6);

    scene.add(
      new THREE.HemisphereLight("#fff3df", "#665448", 1.0),
    );

    const light = new THREE.DirectionalLight("#fff0dc", 1.8);
    light.position.set(-3, 5, 4);
    light.castShadow = true;
    light.shadow.mapSize.set(1024, 1024);
    light.shadow.camera.left = -4;
    light.shadow.camera.right = 4;
    light.shadow.camera.top = 4;
    light.shadow.camera.bottom = -4;
    light.shadow.camera.near = 0.5;
    light.shadow.camera.far = 15;
    light.shadow.bias = -0.0002;
    light.shadow.normalBias = 0.02;
    scene.add(light);

    // Vân gỗ mô phỏng, chưa phải texture chụp từ gỗ thật.
    const woodCanvas = document.createElement("canvas");
    woodCanvas.width = 256;
    woodCanvas.height = 256;

    const woodContext = woodCanvas.getContext("2d");

    if (woodContext) {
      woodContext.fillStyle = "#a17b60";
      woodContext.fillRect(0, 0, 256, 256);

      for (let line = 0; line < 110; line += 1) {
        const baseY = (line / 110) * 256;

        woodContext.beginPath();

        for (let x = 0; x <= 256; x += 4) {
          // Các tần số là số nguyên để hai đầu texture nối nhau.
          const wave =
            Math.sin((x / 256) * Math.PI * 4 + line * 0.37) * 2.5 +
            Math.sin((x / 256) * Math.PI * 8 + line * 0.19) * 0.8;

          const y = baseY + wave;

          if (x === 0) {
            woodContext.moveTo(x, y);
          } else {
            woodContext.lineTo(x, y);
          }
        }

        woodContext.strokeStyle =
          line % 4 === 0
            ? "rgba(48, 25, 15, 0.24)"
            : "rgba(55, 29, 18, 0.10)";

        woodContext.lineWidth = line % 4 === 0 ? 1.2 : 0.6;
        woodContext.stroke();
      }
    }

    const woodTexture = new THREE.CanvasTexture(woodCanvas);
    woodTexture.colorSpace = THREE.SRGBColorSpace;
    woodTexture.wrapS = THREE.RepeatWrapping;
    woodTexture.wrapT = THREE.RepeatWrapping;

    woodTexture.anisotropy = Math.min(
      4,
      renderer.capabilities.getMaxAnisotropy(),
    );

    const wood = new THREE.MeshStandardMaterial({
      map: woodTexture,
      color: "#76503c",
      roughness: 0.42,
      metalness: 0,
    });

    // Vân đứng riêng cho các tấm cánh tủ.
    const doorTexture = woodTexture.clone();

    doorTexture.center.set(0.5, 0.5);
    doorTexture.rotation = Math.PI / 2;
    doorTexture.needsUpdate = true;

    const doorMaterial = new THREE.MeshStandardMaterial({
      map: doorTexture,
      color: "#76503c",
      roughness: 0.48,
      metalness: 0,
    });

    const bronze = new THREE.MeshStandardMaterial({
      color: "#a47c45",
      metalness: 0.8,
      roughness: 0.42,
    });

    const porcelainMaterial = new THREE.MeshStandardMaterial({
      color: "#eee8dc",
      roughness: 0.3,
      metalness: 0,
    });

    const blueMaterial = new THREE.MeshStandardMaterial({
      color: "#315478",
      roughness: 0.4,
      metalness: 0,
    });

    const branchMaterial = new THREE.MeshStandardMaterial({
      color: "#766044",
      roughness: 1,
      metalness: 0,
    });

    const fruitMaterial = new THREE.MeshStandardMaterial({
      color: "#86a83f",
      roughness: 0.72,
      metalness: 0,
    });

    const leafMaterial = new THREE.MeshStandardMaterial({
      color: "#3e6536",
      roughness: 0.9,
      metalness: 0,
    });

    // Dùng bản sao để chỉnh độ lặp riêng cho sàn.
    const floorTexture = woodTexture.clone();
    floorTexture.wrapS = THREE.RepeatWrapping;
    floorTexture.wrapT = THREE.RepeatWrapping;
    floorTexture.repeat.set(4, 3);
    floorTexture.needsUpdate = true;

    const floorMaterial = new THREE.MeshStandardMaterial({
      map: floorTexture,
      color: "#b58c68",
      roughness: 0.7,
      metalness: 0,
    });

    const geometries: THREE.BufferGeometry[] = [];

    const addBox = (
      width: number,
      height: number,
      depth: number,
      x: number,
      y: number,
      z: number,
      material: THREE.Material,
    ) => {
      const geometry = new THREE.BoxGeometry(width, height, depth);
      geometries.push(geometry);

      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(x, y, z);
      scene.add(mesh);
    };

    // Sàn và bàn mẫu.
    addBox(7, 0.12, 6, 0, -0.06, 0, floorMaterial);
    const addRoundedWood = (
      width: number,
      height: number,
      depth: number,
      x: number,
      y: number,
      z: number,
      radius: number,
    ) => {
      const geometry = new RoundedBoxGeometry(width, height, depth, 3, radius);
      geometries.push(geometry);

      const mesh = new THREE.Mesh(geometry, wood);
      mesh.position.set(x, y, z);
      scene.add(mesh);

      return mesh;
    };

    // Tủ thờ mẫu: mặt trên vẫn ở độ cao 1.3,
    // để các đồ thờ hiện tại không bị thay đổi độ cao.

    // Mặt tủ và hai lớp chỉ bên dưới.
    addRoundedWood(3.6, 0.16, 1.8, 0, 1.22, 0, 0.025);
    addRoundedWood(3.48, 0.065, 1.7, 0, 1.1075, 0, 0.012);
    addRoundedWood(3.4, 0.045, 1.62, 0, 1.0525, 0, 0.01);

    // Hai vách bên.
    for (const x of [-1.61, 1.61]) {
      addRoundedWood(
        0.14, 0.86, 1.54,
        x, 0.6, 0,
        0.012,
      );
    }

    // Vách sau.
    addRoundedWood(
      3.08, 0.86, 0.1,
      0, 0.6, -0.72,
      0.01,
    );

    // Đáy tủ và bệ chân.
    addRoundedWood(3.36, 0.1, 1.6, 0, 0.17, 0, 0.014);
    addRoundedWood(3.48, 0.12, 1.7, 0, 0.06, 0, 0.018);

    // Khung mặt trước.
    for (const x of [-1.57, -0.53, 0.53, 1.57]) {
      addRoundedWood(
        0.085, 0.8, 0.09,
        x, 0.61, 0.765,
        0.008,
      );
    }

    for (const y of [0.235, 0.985]) {
      addRoundedWood(
        3.2, 0.075, 0.09,
        0, y, 0.765,
        0.008,
      );
    }

    // Ba cánh tủ đóng, có pano lõm và chỉ nổi.
    for (const centerX of [-1.05, 0, 1.05]) {
      // Tấm cánh có vân đứng, nằm lùi sau đường viền.
      const doorPanel = addRoundedWood(
        0.94, 0.66, 0.055,
        centerX, 0.61, 0.72,
        0.008,
      );

      doorPanel.material = doorMaterial;

      // Hai thanh chỉ đứng.
      for (const offsetX of [-0.405, 0.405]) {
        addRoundedWood(
          0.028, 0.56, 0.025,
          centerX + offsetX, 0.61, 0.758,
          0.005,
        );
      }

      // Hai thanh chỉ ngang.
      for (const y of [0.345, 0.875]) {
        addRoundedWood(
          0.81, 0.028, 0.025,
          centerX, y, 0.758,
          0.005,
        );
      }
    }

    // Tường phía sau tủ.
    const wallMaterial = new THREE.MeshStandardMaterial({
      color: "#b5aa97",
      roughness: 0.95,
      metalness: 0,
    });

    const borderMaterial = new THREE.MeshStandardMaterial({
      color: "#ad8549",
      roughness: 0.45,
      metalness: 0.55,
    });

    // Tường bắt đầu từ sàn, nằm sau tủ.
    addBox(7, 4.4, 0.12, 0, 2.2, -1.25, wallMaterial);


    // Hai bình gốm đặt ở hai bên, gần phía sau mặt bàn.
    const vaseProfile = [
      [0.001, 0],
      [0.10, 0],
      [0.16, 0.04],
      [0.21, 0.15],
      [0.20, 0.27],
      [0.13, 0.38],
      [0.075, 0.43],
      [0.065, 0.56],
      [0.095, 0.60],
      [0.075, 0.60],
      [0.050, 0.55],
      [0.055, 0.43],
      [0.11, 0.37],
      [0.175, 0.26],
      [0.185, 0.15],
      [0.14, 0.06],
      [0.001, 0.03],
    ].map(([radius, height]) => new THREE.Vector2(radius, height));

    const vaseGeometry = new THREE.LatheGeometry(vaseProfile, 48);
    geometries.push(vaseGeometry);

    // Vòng hoa văn ở chân và cổ bình.
    const footRingGeometry = new THREE.TorusGeometry(
      0.125, 0.007, 8, 40,
    );

    const neckRingGeometry = new THREE.TorusGeometry(
      0.068, 0.005, 8, 32,
    );

    geometries.push(footRingGeometry, neckRingGeometry);

    // Họa tiết cánh hoa dạng hình học.
    const petalGeometry = new THREE.SphereGeometry(1, 8, 6);
    geometries.push(petalGeometry);

    // Dựng cành bằng đoạn nối giữa hai điểm.
    const addBranch = (
      group: THREE.Group,
      start: THREE.Vector3,
      end: THREE.Vector3,
      radius: number,
    ) => {
      const direction = end.clone().sub(start);
      const length = direction.length();

      const geometry = new THREE.CylinderGeometry(
        radius * 0.65,
        radius,
        length,
        6,
      );

      geometries.push(geometry);

      const branch = new THREE.Mesh(geometry, branchMaterial);

      branch.position.copy(start).add(end).multiplyScalar(0.5);
      branch.quaternion.setFromUnitVectors(
        new THREE.Vector3(0, 1, 0),
        direction.normalize(),
      );

      group.add(branch);
    };

    const flowerMaterial = new THREE.MeshStandardMaterial({
      color: "#e8b832",
      roughness: 0.75,
      metalness: 0,
    });

    const flowerCenterMaterial = new THREE.MeshStandardMaterial({
      color: "#a66d1c",
      roughness: 0.9,
      metalness: 0,
    });

    const blossomGeometry = new THREE.SphereGeometry(1, 12, 8);
    geometries.push(blossomGeometry);

    for (const side of [1]) {
      const vaseGroup = new THREE.Group();
      vaseGroup.position.set(side * 1.28, 1.3, -0.38);

      const vase = new THREE.Mesh(vaseGeometry, porcelainMaterial);
      vaseGroup.add(vase);

      const footRing = new THREE.Mesh(footRingGeometry, blueMaterial);
      footRing.rotation.x = Math.PI / 2;
      footRing.position.y = 0.025;
      vaseGroup.add(footRing);

      const neckRing = new THREE.Mesh(neckRingGeometry, blueMaterial);
      neckRing.rotation.x = Math.PI / 2;
      neckRing.position.y = 0.53;
      vaseGroup.add(neckRing);

      // Ba cụm hoa xanh chạy quanh thân bình.
      for (let flower = 0; flower < 3; flower += 1) {
        const angle = (flower / 3) * Math.PI * 2;

        const flowerGroup = new THREE.Group();
        flowerGroup.position.set(
          Math.sin(angle) * 0.203,
          0.20,
          Math.cos(angle) * 0.203,
        );

        flowerGroup.rotation.y = angle;

        for (let petal = 0; petal < 5; petal += 1) {
          const petalAngle = (petal / 5) * Math.PI * 2;

          const mesh = new THREE.Mesh(petalGeometry, blueMaterial);

          mesh.position.set(
            Math.sin(petalAngle) * 0.032,
            Math.cos(petalAngle) * 0.032,
            0,
          );

          mesh.scale.set(0.018, 0.030, 0.004);
          mesh.rotation.z = -petalAngle;

          flowerGroup.add(mesh);
        }

        vaseGroup.add(flowerGroup);
      }

      // Các cành tỏa ra từ trong cổ bình.
      // Tọa độ tính theo nhóm bình.
      const flowerTips = [
        [-0.25, 0.95, 0.02],
        [-0.16, 1.14, -0.04],
        [0.02, 1.30, -0.06],
        [0.19, 1.16, 0],
        [0.28, 0.98, 0.04],
        [-0.20, 0.79, 0.17],
        [-0.07, 0.94, 0.19],
        [0.10, 1.05, 0.14],
        [0.22, 0.80, 0.18],
        [0.03, 0.75, 0.23],
        [-0.08, 1.08, -0.16],
        [0.17, 0.90, -0.14],
      ];

      const bouquetLeafGeometry = new THREE.SphereGeometry(1, 12, 8);
      geometries.push(bouquetLeafGeometry);

      for (const [x, y, z] of flowerTips) {
        addBranch(
          vaseGroup,
          new THREE.Vector3(0, 0.48, 0),
          new THREE.Vector3(x, y, z),
          0.006,
        );

        const blossom = new THREE.Group();
        blossom.position.set(x, y, z);
        blossom.rotation.set(
          -0.15 + z * 1.2,
          x * 1.5,
          x * 0.6,
        );

        // Ba lớp cánh ngắn, xếp chồng thành bông.
        const petalLayers = [
          { count: 14, radius: 0.045, width: 0.022, length: 0.032 },
          { count: 12, radius: 0.030, width: 0.019, length: 0.027 },
          { count: 9, radius: 0.016, width: 0.014, length: 0.021 },
        ];

        for (const [layer, config] of petalLayers.entries()) {
          for (let index = 0; index < config.count; index += 1) {
            const angle =
              (index / config.count) * Math.PI * 2 + layer * 0.3;

            const petal = new THREE.Mesh(
              blossomGeometry,
              flowerMaterial,
            );

            petal.position.set(
              Math.sin(angle) * config.radius,
              Math.cos(angle) * config.radius,
              layer * 0.012,
            );

            petal.scale.set(
              config.width,
              config.length,
              0.014,
            );

            petal.rotation.set(
              0.12 * Math.cos(angle),
              0.12 * Math.sin(angle),
              -angle,
            );

            blossom.add(petal);
          }
        }

        // Thay đổi kích thước nhẹ giữa các bông.
        blossom.scale.setScalar(
          0.9 + (Math.abs(x) / 0.28) * 0.15,
        );

        const center = new THREE.Mesh(
          blossomGeometry,
          flowerCenterMaterial,
        );

        center.scale.set(0.013, 0.013, 0.012);
        center.position.z = 0.038;
        blossom.add(center);

        // Hai lá nằm dọc mỗi cành.
        const stemStart = new THREE.Vector3(0, 0.48, 0);
        const stemEnd = new THREE.Vector3(x, y, z);
        const stemDirection = stemEnd.clone().sub(stemStart).normalize();

        for (const [index, fraction] of [0.45, 0.7].entries()) {
          const side = index === 0 ? -1 : 1;

          const leafDirection = new THREE.Vector3(
            side * 0.8,
            0.45,
            0.2,
          )
            .addScaledVector(stemDirection, 0.3)
            .normalize();

          const leaf = new THREE.Mesh(
            bouquetLeafGeometry,
            leafMaterial,
          );

          leaf.scale.set(0.025, 0.09, 0.008);

          // Đặt một đầu lá gần cành.
          leaf.position
            .copy(stemStart)
            .lerp(stemEnd, fraction)
            .addScaledVector(leafDirection, 0.075);

          leaf.quaternion.setFromUnitVectors(
            new THREE.Vector3(0, 1, 0),
            leafDirection,
          );

          vaseGroup.add(leaf);
        }

        vaseGroup.add(blossom);
      }

      scene.add(vaseGroup);
    }

    // Hai đĩa trái cây mô phỏng theo bố cục ảnh tham chiếu.
    const plateProfile = [
      [0.001, 0.015],
      [0.13, 0.015],
      [0.22, 0.025],
      [0.29, 0.055],
      [0.31, 0.075],
      [0.30, 0.09],
      [0.27, 0.065],
      [0.20, 0.045],
      [0.001, 0.04],
    ].map(([radius, height]) => new THREE.Vector2(radius, height));

    const plateGeometry = new THREE.LatheGeometry(plateProfile, 40);
    const fruitGeometry = new THREE.SphereGeometry(0.105, 16, 12);
    const leafGeometry = new THREE.SphereGeometry(1, 8, 6);
    const stemGeometry = new THREE.CylinderGeometry(
      0.008,
      0.01,
      0.045,
      6,
    );

    geometries.push(
      plateGeometry,
      fruitGeometry,
      leafGeometry,
      stemGeometry,
    );

    for (const side of [-1]) {
      const offeringGroup = new THREE.Group();
      offeringGroup.position.set(side * 1.25, 1.3, 0.15);
      offeringGroup.scale.setScalar(1.25);

      const plate = new THREE.Mesh(plateGeometry, porcelainMaterial);
      offeringGroup.add(plate);

      // Bốn quả ở dưới và một quả phía trên.
      const fruitPositions = [
        [-0.11, 0.15, -0.08],
        [0.11, 0.15, -0.08],
        [-0.11, 0.15, 0.10],
        [0.11, 0.15, 0.10],
        [0, 0.31, 0],
      ];

      for (const [x, y, z] of fruitPositions) {
        const fruit = new THREE.Mesh(fruitGeometry, fruitMaterial);
        fruit.position.set(x, y, z);
        fruit.scale.y = 0.95;
        offeringGroup.add(fruit);

        const stem = new THREE.Mesh(stemGeometry, branchMaterial);
        stem.position.set(x, y + 0.105, z);
        offeringGroup.add(stem);

        const leaf = new THREE.Mesh(leafGeometry, leafMaterial);
        leaf.scale.set(0.045, 0.009, 0.018);
        leaf.position.set(x + 0.028, y + 0.108, z);
        leaf.rotation.z = -0.3;
        offeringGroup.add(leaf);
      }

      scene.add(offeringGroup);
    }

    // Khay và ba chén gốm phía trước lư hương.
    const cupProfile = [
      [0.001, 0.005],
      [0.035, 0.005],
      [0.040, 0.018],
      [0.050, 0.035],
      [0.065, 0.090],
      [0.068, 0.105],
      [0.058, 0.105],
      [0.055, 0.090],
      [0.040, 0.038],
      [0.001, 0.028],
    ].map(([radius, height]) => new THREE.Vector2(radius, height));

    const cupGeometry = new THREE.LatheGeometry(cupProfile, 32);

    const cupBandGeometry = new THREE.TorusGeometry(
      0.060,
      0.003,
      8,
      32,
    );

    const trayGeometry = new RoundedBoxGeometry(
      0.66,
      0.035,
      0.27,
      3,
      0.012,
    );

    geometries.push(cupGeometry, cupBandGeometry, trayGeometry);

    const cupsGroup = new THREE.Group();
    cupsGroup.position.set(0, 1.3, 0.62);

    // Đáy khay chạm mặt bàn.
    const tray = new THREE.Mesh(trayGeometry, porcelainMaterial);
    tray.position.y = 0.0175;
    cupsGroup.add(tray);

    for (const x of [-0.20, 0, 0.20]) {
      const cup = new THREE.Mesh(cupGeometry, porcelainMaterial);
      cup.position.set(x, 0.035, 0);
      cupsGroup.add(cup);

      const band = new THREE.Mesh(cupBandGeometry, blueMaterial);
      band.rotation.x = Math.PI / 2;
      band.position.set(x, 0.120, 0);
      cupsGroup.add(band);
    }

    scene.add(cupsGroup);

    // Lư đồng có nắp ở phía sau, dựng cách điệu theo ảnh.
    const coveredCenser = new THREE.Group();
    coveredCenser.position.set(0, 1.3, -0.55);

    const censerProfile = [
      [0.001, 0.14],
      [0.13, 0.14],
      [0.17, 0.17],
      [0.22, 0.22],
      [0.25, 0.29],
      [0.245, 0.34],
      [0.21, 0.39],
      [0.16, 0.42],
      [0.16, 0.46],
      [0.19, 0.47],
      [0.19, 0.49],
      [0.001, 0.49],
    ].map(([radius, height]) => new THREE.Vector2(radius, height));

    const censerBodyGeometry = new THREE.LatheGeometry(
      censerProfile,
      48,
    );

    const censerLidProfile = [
      [0.001, 0],
      [0.205, 0],
      [0.205, 0.02],
      [0.18, 0.04],
      [0.15, 0.075],
      [0.10, 0.105],
      [0.045, 0.12],
      [0.001, 0.12],
    ].map(([radius, height]) => new THREE.Vector2(radius, height));

    const censerLidGeometry = new THREE.LatheGeometry(
      censerLidProfile,
      48,
    );

    const censerKnobGeometry = new THREE.SphereGeometry(
      0.035,
      16,
      12,
    );

    const censerLegGeometry = new THREE.CylinderGeometry(
      0.035,
      0.045,
      0.14,
      12,
    );

    const censerHandleGeometry = new THREE.TorusGeometry(
      0.07,
      0.012,
      8,
      24,
    );

    const censerRimGeometry = new THREE.TorusGeometry(
      0.195,
      0.009,
      8,
      48,
    );

    geometries.push(
      censerBodyGeometry,
      censerLidGeometry,
      censerKnobGeometry,
      censerLegGeometry,
      censerHandleGeometry,
      censerRimGeometry,
    );

    const censerBody = new THREE.Mesh(censerBodyGeometry, bronze);
    coveredCenser.add(censerBody);

    const censerLid = new THREE.Mesh(censerLidGeometry, bronze);
    censerLid.position.y = 0.49;
    coveredCenser.add(censerLid);

    const censerKnob = new THREE.Mesh(censerKnobGeometry, bronze);
    censerKnob.position.y = 0.63;
    censerKnob.scale.set(0.8, 1.2, 0.8);
    coveredCenser.add(censerKnob);

    const censerRim = new THREE.Mesh(censerRimGeometry, bronze);
    censerRim.rotation.x = Math.PI / 2;
    censerRim.position.y = 0.49;
    coveredCenser.add(censerRim);

    // Ba chân chạm mặt bàn.
    for (let index = 0; index < 3; index += 1) {
      const angle = (index / 3) * Math.PI * 2;

      const leg = new THREE.Mesh(censerLegGeometry, bronze);
      leg.position.set(
        Math.sin(angle) * 0.14,
        0.07,
        Math.cos(angle) * 0.14,
      );

      coveredCenser.add(leg);
    }

    for (const side of [-1, 1]) {
      const handle = new THREE.Mesh(censerHandleGeometry, bronze);
      handle.position.set(side * 0.265, 0.36, 0);
      coveredCenser.add(handle);
    }

    scene.add(coveredCenser);

    // Hai chân nến mẫu bằng đồng.
    const candleStandProfile = [
      [0.001, 0],
      [0.15, 0],
      [0.15, 0.025],
      [0.12, 0.05],
      [0.09, 0.08],
      [0.055, 0.14],
      [0.04, 0.20],
      [0.035, 0.38],
      [0.055, 0.42],
      [0.055, 0.45],
      [0.035, 0.48],
      [0.035, 0.57],
      [0.09, 0.59],
      [0.12, 0.62],
      [0.12, 0.65],
      [0.095, 0.65],
      [0.08, 0.625],
      [0.001, 0.625],
    ].map(([radius, height]) => new THREE.Vector2(radius, height));

    const candleStandGeometry = new THREE.LatheGeometry(
      candleStandProfile,
      40,
    );

    const candleGeometry = new THREE.CylinderGeometry(
      0.025,
      0.03,
      0.18,
      16,
    );

    geometries.push(candleStandGeometry, candleGeometry);

    const candleMaterial = new THREE.MeshStandardMaterial({
      color: "#ead9b7",
      roughness: 0.8,
      metalness: 0,
    });

    for (const x of [-0.82, 0.82]) {
      const candleStandGroup = new THREE.Group();
      candleStandGroup.position.set(x, 1.3, -0.42);

      const stand = new THREE.Mesh(candleStandGeometry, bronze);
      candleStandGroup.add(stand);

      const candle = new THREE.Mesh(candleGeometry, candleMaterial);

      // Đáy nến nằm trên lòng đĩa của chân nến.
      candle.position.y = 0.715;
      candleStandGroup.add(candle);

      scene.add(candleStandGroup);
    }

    // Texture sọc dưa mô phỏng, không phải ảnh chụp.
    const melonCanvas = document.createElement("canvas");
    melonCanvas.width = 256;
    melonCanvas.height = 128;

    const melonContext = melonCanvas.getContext("2d");

    if (melonContext) {
      melonContext.fillStyle = "#709344";
      melonContext.fillRect(0, 0, 256, 128);

      melonContext.strokeStyle = "#345c2c";
      melonContext.lineWidth = 12;
      melonContext.lineCap = "round";

      for (let stripe = -1; stripe <= 12; stripe += 1) {
        melonContext.beginPath();

        for (let y = 0; y <= 128; y += 2) {
          const x =
            stripe * (256 / 12) +
            Math.sin((y / 128) * Math.PI * 4 + stripe * 0.7) * 3;

          if (y === 0) {
            melonContext.moveTo(x, y);
          } else {
            melonContext.lineTo(x, y);
          }
        }

        melonContext.stroke();
      }
    }

    const melonTexture = new THREE.CanvasTexture(melonCanvas);
    melonTexture.colorSpace = THREE.SRGBColorSpace;

    const melonMaterial = new THREE.MeshStandardMaterial({
      map: melonTexture,
      roughness: 0.55,
      metalness: 0,
    });

    const melonGeometry = new THREE.SphereGeometry(0.18, 32, 24);

    const melonStandProfile = [
      [0.001, 0],
      [0.13, 0],
      [0.14, 0.025],
      [0.10, 0.05],
      [0.07, 0.08],
      [0.07, 0.11],
      [0.14, 0.14],
      [0.17, 0.16],
      [0.17, 0.18],
      [0.14, 0.18],
      [0.001, 0.15],
    ].map(([radius, height]) => new THREE.Vector2(radius, height));

    const melonStandGeometry = new THREE.LatheGeometry(
      melonStandProfile,
      32,
    );

    geometries.push(melonGeometry, melonStandGeometry);

    const melonLabelMaterial = new THREE.MeshStandardMaterial({
      color: "#b52220",
      roughness: 0.8,
      metalness: 0,
      side: THREE.DoubleSide,
    });

    const melonLabelGeometry = new THREE.PlaneGeometry(0.12, 0.12);
    const melonLabelBorderGeometry = new THREE.PlaneGeometry(
      0.132,
      0.132,
    );

    geometries.push(
      melonLabelGeometry,
      melonLabelBorderGeometry,
    );

    for (const x of [-0.62, 0.62]) {
      const melonGroup = new THREE.Group();
      melonGroup.position.set(x, 1.3, 0.22);

      const stand = new THREE.Mesh(melonStandGeometry, wood);
      melonGroup.add(stand);

      const melon = new THREE.Mesh(melonGeometry, melonMaterial);
      melon.scale.set(0.95, 1.15, 0.95);

      // Đáy quả tựa trên lòng đế.
      melon.position.y = 0.357;
      melon.rotation.y = x;
      melonGroup.add(melon);

      // Miếng trang trí hình thoi ở mặt trước quả.
      // Đây là tấm phẳng mô phỏng, chưa ôm theo mặt cong.
      const labelBorder = new THREE.Mesh(
        melonLabelBorderGeometry,
        borderMaterial,
      );

      labelBorder.position.set(0, 0.357, 0.174);
      labelBorder.rotation.z = Math.PI / 4;
      melonGroup.add(labelBorder);

      const label = new THREE.Mesh(
        melonLabelGeometry,
        melonLabelMaterial,
      );

      label.position.set(0, 0.357, 0.176);
      label.rotation.z = Math.PI / 4;
      melonGroup.add(label);

      scene.add(melonGroup);
    }

    // Lư hương mẫu trong góc tri ân.
    // Thu nhỏ quanh điểm đặt trên mặt bàn, cao 1.3.
    const incenseGroup = new THREE.Group();
    incenseGroup.position.set(0, 1.3, 0.22);
    incenseGroup.scale.setScalar(0.62);

    // Giữ nguyên các tọa độ đã dùng trong code hiện tại.
    const incenseContent = new THREE.Group();
    incenseContent.position.y = -1.3;

    incenseGroup.add(incenseContent);
    scene.add(incenseGroup);

    // Biên dạng đi từ đáy ngoài, lên miệng,
    // rồi trở xuống thành trong để tạo lòng rỗng.
    const bowlProfile = [
      [0.001, -0.12],
      [0.18, -0.12],
      [0.23, -0.1],
      [0.29, -0.04],
      [0.34, 0.06],
      [0.37, 0.15],
      [0.38, 0.2],
      [0.345, 0.2],
      [0.335, 0.15],
      [0.305, 0.06],
      [0.26, -0.04],
      [0.18, -0.08],
      [0.001, -0.08],
    ].map(([radius, height]) => new THREE.Vector2(radius, height));

    const bowlGeometry = new THREE.LatheGeometry(bowlProfile, 64);
    geometries.push(bowlGeometry);

    const bowl = new THREE.Mesh(bowlGeometry, bronze);
    bowl.position.set(0, 1.48, 0);
    incenseContent.add(bowl);

    // Vành miệng.
    const rimGeometry = new THREE.TorusGeometry(0.3625, 0.022, 12, 64);
    geometries.push(rimGeometry);

    const rim = new THREE.Mesh(rimGeometry, bronze);
    rim.rotation.x = Math.PI / 2;
    rim.position.set(0, 1.68, 0);
    incenseContent.add(rim);

    // Chân đế chạm mặt bàn, mặt bàn hiện tại cao 1.3.
    const baseGeometry = new THREE.CylinderGeometry(0.2, 0.25, 0.06, 48);
    geometries.push(baseGeometry);

    const base = new THREE.Mesh(baseGeometry, bronze);
    base.position.set(0, 1.33, 0);
    incenseContent.add(base);

    // Hai quai đơn giản, dựng đối xứng.
    const handleGeometry = new THREE.TorusGeometry(0.105, 0.018, 10, 32);
    geometries.push(handleGeometry);

    for (const side of [-1, 1]) {
      const handle = new THREE.Mesh(handleGeometry, bronze);
      handle.position.set(side * 0.405, 1.56, 0);
      handle.scale.set(0.8, 1, 1);
      incenseContent.add(handle);
    }

    // Lớp tro nằm bên trong, thấp hơn vành miệng.
    const ashMaterial = new THREE.MeshStandardMaterial({
      color: "#8b8174",
      roughness: 1,
      metalness: 0,
    });

    const ashGeometry = new THREE.CylinderGeometry(0.33, 0.32, 0.025, 48);
    geometries.push(ashGeometry);

    const ash = new THREE.Mesh(ashGeometry, ashMaterial);
    ash.position.set(0, 1.6375, 0);
    incenseContent.add(ash);

    const incenseMaterial = new THREE.MeshStandardMaterial({
      color: "#a97143",
      roughness: 1,
    });
    const emberMaterial = new THREE.MeshStandardMaterial({
      color: "#55403a",
      emissive: "#ff5a1f",
      emissiveIntensity: 0,
      roughness: 0.8,
    });
    const stickGeometry = new THREE.CylinderGeometry(0.012, 0.012, 0.8, 8);
    const emberGeometry = new THREE.SphereGeometry(0.018, 8, 8);
    geometries.push(stickGeometry, emberGeometry);

    for (const x of [-0.12, 0, 0.12]) {
      const stick = new THREE.Mesh(stickGeometry, incenseMaterial);
      stick.position.set(x, 2.05, 0);
      incenseContent.add(stick);

      const ember = new THREE.Mesh(emberGeometry, emberMaterial);
      ember.position.set(x, 2.45, 0);
      incenseContent.add(ember);
    }

    const incenseLight = new THREE.PointLight("#ff8b45", 0, 2, 2);
    incenseLight.position.set(0, 2.4, 0);
    incenseContent.add(incenseLight);

    // Tấm gỗ tưởng nhớ tổ tiên.
    addRoundedWood(
      1.65, 1.9, 0.08,
      0, 2.4, -1.11,
      0.018,
    );

    // Viền đứng nổi trên mặt gỗ.
    for (const x of [-0.77, 0.77]) {
      addRoundedWood(
        0.07, 1.86, 0.035,
        x, 2.4, -1.055,
        0.008,
      );
    }

    // Viền ngang.
    for (const y of [1.505, 3.295]) {
      addRoundedWood(
        1.47, 0.07, 0.035,
        0, y, -1.055,
        0.008,
      );
    }

    // Chữ in trên nền trong suốt.
    const remembranceCanvas = document.createElement("canvas");
    remembranceCanvas.width = 1024;
    remembranceCanvas.height = 512;

    const remembranceContext = remembranceCanvas.getContext("2d");

    if (remembranceContext) {
      remembranceContext.clearRect(0, 0, 1024, 512);
      remembranceContext.fillStyle = "#dec18a";
      remembranceContext.textAlign = "center";
      remembranceContext.textBaseline = "middle";

      remembranceContext.font =
        '110px Georgia, "Times New Roman", serif';
      remembranceContext.fillText("Tưởng nhớ", 512, 175);

      remembranceContext.font =
        'bold 145px Georgia, "Times New Roman", serif';
      remembranceContext.fillText("tổ tiên", 512, 335);
    }

    const remembranceTexture = new THREE.CanvasTexture(
      remembranceCanvas,
    );
    remembranceTexture.colorSpace = THREE.SRGBColorSpace;

    const remembranceMaterial = new THREE.MeshBasicMaterial({
      map: remembranceTexture,
      transparent: true,
      depthWrite: false,
    });

    const remembranceGeometry = new THREE.PlaneGeometry(1.4, 0.7);
    geometries.push(remembranceGeometry);

    const remembranceText = new THREE.Mesh(
      remembranceGeometry,
      remembranceMaterial,
    );

    remembranceText.position.set(0, 2.55, -1.025);
    remembranceText.userData.skipShadow = true;

    scene.add(remembranceText);

    // Đặt sau khi đã tạo bàn, lư hương và nhang.
    // Các sprite khói được tạo phía sau nên không tham gia.
    scene.traverse((object) => {
      if (object instanceof THREE.Mesh) {
        const skipShadow = object.userData.skipShadow === true;

        object.castShadow = !skipShadow;
        object.receiveShadow = !skipShadow;
      }
    });

    // Đo các vật thể của bàn thờ, bỏ sàn và tường nền.
    scene.updateMatrixWorld(true);

    const altarBounds = new THREE.Box3();

    scene.traverse((object) => {
      if (!(object instanceof THREE.Mesh)) return;

      const materials = Array.isArray(object.material)
        ? object.material
        : [object.material];

      const isRoomSurface = materials.some(
        (material) =>
          material === floorMaterial ||
          material === wallMaterial
      );

      if (isRoomSurface) return;

      object.geometry.computeBoundingBox();

      const localBounds = object.geometry.boundingBox;
      if (!localBounds) return;

      const worldBounds = localBounds
        .clone()
        .applyMatrix4(object.matrixWorld);

      altarBounds.union(worldBounds);
    });

    const altarSphere = altarBounds.getBoundingSphere(
      new THREE.Sphere()
    );

    const defaultViewDirection = new THREE.Vector3(
      0.12,
      0.14,
      1
    ).normalize();

    const controls = new OrbitControls(
      camera,
      renderer.domElement
    );

    controls.enablePan = false;
    controls.enableDamping = false;

    controls.minAzimuthAngle = -Math.PI / 4.5;
    controls.maxAzimuthAngle = Math.PI / 4.5;
    controls.minPolarAngle = Math.PI / 3;
    controls.maxPolarAngle = Math.PI / 2;

    const fitCameraToAltar = (resetDirection = false) => {
      const direction = resetDirection
        ? defaultViewDirection.clone()
        : camera.position.clone().sub(controls.target).normalize();

      if (direction.lengthSq() === 0) {
        direction.copy(defaultViewDirection);
      }

      const verticalHalfFov = THREE.MathUtils.degToRad(
        camera.fov / 2
      );

      const horizontalHalfFov = Math.atan(
        Math.tan(verticalHalfFov) * camera.aspect
      );

      const limitingHalfFov = Math.min(
        verticalHalfFov,
        horizontalHalfFov
      );

      // Chừa khoảng thở quanh toàn bộ mô hình.
      const distance =
        (altarSphere.radius / Math.sin(limitingHalfFov)) * 1.12;

      controls.target.copy(altarSphere.center);

      controls.minDistance = distance * 0.55;
      controls.maxDistance = distance * 2;

      camera.position
        .copy(altarSphere.center)
        .addScaledVector(direction, distance);

      camera.near = Math.max(0.01, distance / 100);
      camera.far = Math.max(50, distance * 4);
      camera.updateProjectionMatrix();

      controls.update();
    };

    const render = () => {
      if (contextLost) return;
      renderer.render(scene, camera);
    };

    // Create a soft smoke texture locally.
    const smokeCanvas = document.createElement("canvas");
    smokeCanvas.width = 64;
    smokeCanvas.height = 64;

    const smokeContext = smokeCanvas.getContext("2d");

    if (smokeContext) {
      const gradient = smokeContext.createRadialGradient(32, 32, 0, 32, 32, 32);

      gradient.addColorStop(0, "rgba(220, 215, 205, 0.65)");
      gradient.addColorStop(0.45, "rgba(220, 215, 205, 0.25)");
      gradient.addColorStop(1, "rgba(220, 215, 205, 0)");

      smokeContext.fillStyle = gradient;
      smokeContext.fillRect(0, 0, 64, 64);
    }

    const smokeTexture = new THREE.CanvasTexture(smokeCanvas);

    const smokeParticles: {
      sprite: THREE.Sprite;
      material: THREE.SpriteMaterial;
      originX: number;
      phase: number;
    }[] = [];

    for (const originX of [-0.12, 0, 0.12]) {
      for (let index = 0; index < 6; index += 1) {
        const material = new THREE.SpriteMaterial({
          map: smokeTexture,
          transparent: true,
          opacity: 0,
          depthWrite: false,
        });

        const sprite = new THREE.Sprite(material);
        sprite.visible = false;
        incenseContent.add(sprite);

        smokeParticles.push({
          sprite,
          material,
          originX,
          phase: index / 6,
        });
      }
    }

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );

    let isLit = false;
    let animationFrame: number | null = null;
    let lastTime: number | null = null;
    let smokeTime = 0;

    const updateSmoke = () => {
      for (const particle of smokeParticles) {
        const progress = (particle.phase + smokeTime * 0.15) % 1;
        const drift = Math.sin(progress * Math.PI * 2 + particle.originX);

        particle.sprite.visible = isLit;

        particle.sprite.position.set(
          particle.originX + drift * progress * 0.14,
          2.48 + progress * 0.95,
          progress * 0.04,
        );

        const size = 0.07 + progress * 0.2;
        particle.sprite.scale.set(size, size, 1);

        particle.material.opacity = isLit
          ? Math.sin(progress * Math.PI) * 0.18
          : 0;
      }
    };

    const stopSmokeAnimation = () => {
      if (animationFrame !== null) {
        cancelAnimationFrame(animationFrame);
      }

      animationFrame = null;
      lastTime = null;
    };

    const animateSmoke = (time: number) => {
      animationFrame = null;

      if (
        contextLost ||
        !isLit ||
        reducedMotion.matches ||
        document.hidden
      ) {
        lastTime = null;
        return;
      }

      if (lastTime !== null) {
        // Limit the time step so smoke does not jump on a slow device.
        smokeTime += Math.min((time - lastTime) / 1000, 0.05);
      }

      lastTime = time;
      updateSmoke();
      render();

      animationFrame = requestAnimationFrame(animateSmoke);
    };

    const syncSmokeAnimation = () => {
      stopSmokeAnimation();
      if (contextLost) return;
      updateSmoke();
      render();

      if (isLit && !reducedMotion.matches && !document.hidden) {
        animationFrame = requestAnimationFrame(animateSmoke);
      }
    };

    const handleContextLost = () => {
      contextLost = true;
      stopSmokeAnimation();

      controls.enabled = false;
      resetRef.current = null;
      viewRef.current = null;
      incenseRef.current = null;

      setError(
        "Cảnh 3D đã tạm ngừng do mất kết nối đồ họa. Bạn hãy đóng cảnh rồi mở lại, hoặc tiếp tục ở những mục bên dưới."
      );
    };

    renderer.domElement.addEventListener(
      "webglcontextlost",
      handleContextLost
    );

    reducedMotion.addEventListener("change", syncSmokeAnimation);
    document.addEventListener("visibilitychange", syncSmokeAnimation);

    incenseRef.current = {
      setLit: (lit) => {
        isLit = lit;
        emberMaterial.color.set(lit ? "#ff9a50" : "#55403a");
        emberMaterial.emissiveIntensity = lit ? 2 : 0;
        incenseLight.intensity = lit ? 0.6 : 0;

        if (!lit) {
          smokeTime = 0;
        }

        syncSmokeAnimation();
      },
    };

    let hasInitialView = false;

    const resize = () => {
      const width = host.clientWidth;
      const height = host.clientHeight;

      if (width <= 0 || height <= 0) return;

      renderer.setSize(width, height);
      camera.aspect = width / height;

      fitCameraToAltar(!hasInitialView);
      hasInitialView = true;

      render();
    };

    // Chỉ vẽ lại khi đổi góc nhìn hoặc kích thước.
    controls.addEventListener("change", render);

    resetRef.current = () => {
      fitCameraToAltar(true);
      render();
    };

    viewRef.current = {
      rotate: (angle) => {
        const offset = camera.position.clone().sub(controls.target);
        const spherical = new THREE.Spherical().setFromVector3(offset);

        spherical.theta += angle;

        camera.position
          .copy(controls.target)
          .add(new THREE.Vector3().setFromSpherical(spherical));

        controls.update();
        render();
      },

      zoom: (factor) => {
        const offset = camera.position.clone().sub(controls.target);

        const distance = THREE.MathUtils.clamp(
          offset.length() * factor,
          controls.minDistance,
          controls.maxDistance,
        );

        offset.setLength(distance);
        camera.position.copy(controls.target).add(offset);

        controls.update();
        render();
      },
    };

    const decorationRoot = new THREE.Group();

    // Mặt bàn trong cảnh hiện tại nằm ở cao độ 1.3.
    // Đặt vật phẩm nhỏ phía trước bên trái lư hương.
    decorationRoot.position.set(-0.55, 1.3, 0.38);

    scene.add(decorationRoot);

    let currentDecoration: THREE.Group | null = null;
    let currentDecorationId: DecorationId | null = null;

    const setDecoration = (nextId: DecorationId | null) => {
      if (nextId === currentDecorationId) return;

      if (currentDecoration) {
        disposeDigitalDecoration(currentDecoration);
        currentDecoration = null;
      }

      currentDecorationId = nextId;

      if (nextId) {
        currentDecoration = createDigitalDecoration(nextId);
        decorationRoot.add(currentDecoration);
      }

      renderer.shadowMap.needsUpdate = true;
      render();
    };

    decorationControllerRef.current = {
      set: setDecoration,
    };

    const observer = new ResizeObserver(resize);
    observer.observe(host);
    resize();

    return () => {
      decorationControllerRef.current = null;

      if (currentDecoration) {
        disposeDigitalDecoration(currentDecoration);
        currentDecoration = null;
      }

      decorationRoot.removeFromParent();

      stopSmokeAnimation();
      renderer.domElement.removeEventListener(
        "webglcontextlost",
        handleContextLost
      );

      reducedMotion.removeEventListener("change", syncSmokeAnimation);
      document.removeEventListener("visibilitychange", syncSmokeAnimation);

      observer.disconnect();
      controls.removeEventListener("change", render);
      controls.dispose();

      resetRef.current = null;
      viewRef.current = null;
      incenseRef.current = null;

      for (const particle of smokeParticles) {
        incenseContent.remove(particle.sprite);
        particle.material.dispose();
      }

      smokeTexture.dispose();
      incenseMaterial.dispose();
      emberMaterial.dispose();
      ashMaterial.dispose();
      porcelainMaterial.dispose();
      blueMaterial.dispose();
      branchMaterial.dispose();
      fruitMaterial.dispose();
      leafMaterial.dispose();
      candleMaterial.dispose();
      flowerMaterial.dispose();
      flowerCenterMaterial.dispose();
      melonMaterial.dispose();
      melonTexture.dispose();

      geometries.forEach((geometry) => geometry.dispose());

      wood.dispose();
      doorMaterial.dispose();
      doorTexture.dispose();
      floorTexture.dispose();
      melonLabelMaterial.dispose();
      wallMaterial.dispose();
      remembranceMaterial.dispose();
      remembranceTexture.dispose();
      borderMaterial.dispose();
      bronze.dispose();
      floorMaterial.dispose();

      light.shadow.dispose();
      scene.environment = null;
      environmentTarget.dispose();
      woodTexture.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  useEffect(() => {
    decorationControllerRef.current?.set(decoration);
  }, [decoration]);

  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-surface shadow-md">
      {/* 3D Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line bg-surface-soft/80 p-4 sm:px-6">
        <div className="flex items-center gap-2.5">
          <Badge
            variant="outline"
            className="text-xs px-2.5 py-0.5 font-semibold bg-amber-500/10 text-amber-800 dark:text-amber-300 border-amber-400/40 gap-1.5"
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Mô hình 3D tương tác</span>
          </Badge>
          <span className="text-xs text-stone-500 dark:text-stone-400 hidden sm:inline">
            Góc tri ân và không gian bài trí
          </span>
        </div>

        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={Boolean(error)}
          onClick={() => resetRef.current?.()}
          className="text-xs border-line text-ink hover:text-accent cursor-pointer gap-1.5"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Đặt lại góc nhìn</span>
        </Button>
      </div>

      {/* 3D Canvas Viewport */}
      {error ? (
        <div role="status" className="p-8 text-center bg-surface-soft">
          <p className="text-sm text-stone-600 dark:text-stone-300">{error}</p>
        </div>
      ) : (
        <div className="relative">
          <div
            ref={hostRef}
            className="h-[360px] w-full sm:h-[440px] lg:h-[500px]"
          />

          {/* Quick Incense Status Pill over 3D Canvas */}
          <div className="absolute top-3.5 left-3.5 pointer-events-none z-10">
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-md shadow-sm transition-all ${
                incenseLit
                  ? "bg-amber-950/80 text-amber-200 border border-amber-400/50"
                  : "bg-black/50 text-stone-200 border border-white/20"
              }`}
            >
              <Flame
                className={`w-3.5 h-3.5 ${
                  incenseLit ? "text-amber-400 animate-pulse fill-current" : "text-stone-400"
                }`}
              />
              <span>{incenseLit ? "Hương đang thắp" : "Hương chưa thắp"}</span>
            </span>
          </div>
        </div>
      )}

      {/* Memorial Tribute Display (if recorded) */}
      <div className="border-t border-line bg-surface-soft/60 p-4 sm:p-6">
        {memorial ? (
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-400">
              <Heart className="w-3.5 h-3.5 fill-current text-rose-500" />
              <span>GHI CHÚ TƯỞNG NHỚ ĐÍNH KÈM</span>
            </div>

            <h3 className="font-display text-xl font-bold text-ink">
              {memorial.name}
              {memorial.relation && (
                <span className="text-sm font-normal text-stone-500 dark:text-stone-400 ml-2">
                  ({memorial.relation})
                </span>
              )}
            </h3>

            {memorial.note?.trim() && (
              <p className="whitespace-pre-wrap break-words text-sm leading-relaxed text-stone-700 dark:text-stone-200 italic bg-surface/80 p-3.5 rounded-xl border border-line">
                “{memorial.note}”
              </p>
            )}
          </div>
        ) : (
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h4 className="font-display font-semibold text-base text-ink mb-0.5">
                Chưa có ghi chú tưởng nhớ
              </h4>
              <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
                Bạn có thể ghi lại tên người thân và một tâm nguyện để gắn kết vào không gian 3D này.
              </p>
            </div>

            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={onOpenMemorial}
              className="text-xs shrink-0 border-line text-ink hover:text-accent cursor-pointer"
            >
              Tạo ghi chú tưởng nhớ
            </Button>
          </div>
        )}
      </div>

      {/* Interactive Controls Toolbar */}
      <div className="border-t border-line bg-surface p-4 sm:p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Incense Action Button */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              disabled={Boolean(error)}
              aria-pressed={incenseLit}
              onClick={handleToggleIncense}
              className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-md flex items-center gap-2 cursor-pointer ${
                incenseLit
                  ? "bg-stone-800 text-stone-200 hover:bg-stone-700 border border-stone-600"
                  : "bg-gradient-to-r from-red-800 via-amber-800 to-red-900 hover:from-red-700 hover:to-amber-700 text-white shadow-amber-900/20"
              }`}
            >
              <Flame
                className={`w-4 h-4 ${
                  incenseLit ? "text-amber-400 animate-pulse fill-current" : "text-amber-200"
                }`}
              />
              <span>{incenseLit ? "Tắt làn hương" : "Thắp hương lòng"}</span>
            </button>

            <span className="text-xs text-stone-600 dark:text-stone-300 font-medium">
              {incenseLit
                ? "Làn hương thanh tịnh đang dâng lên trong không gian."
                : "Nhấn để dâng nén hương thơm thành kính."}
            </span>
          </div>

          {/* Camera View Controls */}
          <div
            role="group"
            aria-label="Điều khiển góc nhìn 3D"
            className="flex items-center gap-1.5 self-start md:self-auto"
          >
            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={Boolean(error)}
              onClick={() => viewRef.current?.rotate(-Math.PI / 12)}
              className="text-xs h-9 px-3 gap-1 border-line cursor-pointer"
              title="Xoay góc nhìn sang trái"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Xoay trái</span>
            </Button>

            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={Boolean(error)}
              onClick={() => viewRef.current?.rotate(Math.PI / 12)}
              className="text-xs h-9 px-3 gap-1 border-line cursor-pointer"
              title="Xoay góc nhìn sang phải"
            >
              <RotateCw className="w-3.5 h-3.5" />
              <span>Xoay phải</span>
            </Button>

            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={Boolean(error)}
              onClick={() => viewRef.current?.zoom(0.85)}
              className="text-xs h-9 px-3 gap-1 border-line cursor-pointer"
              title="Phóng to góc nhìn"
            >
              <ZoomIn className="w-3.5 h-3.5" />
              <span>Phóng to</span>
            </Button>

            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={Boolean(error)}
              onClick={() => viewRef.current?.zoom(1.15)}
              className="text-xs h-9 px-3 gap-1 border-line cursor-pointer"
              title="Thu nhỏ góc nhìn"
            >
              <ZoomOut className="w-3.5 h-3.5" />
              <span>Thu nhỏ</span>
            </Button>
          </div>
        </div>

        <p className="mt-3 text-xs leading-relaxed text-stone-500 dark:text-stone-400">
          💡 <strong>Mẹo tương tác:</strong> Bạn có thể dùng chuột kéo để xoay tự do 360°, cuộn con lăn (hoặc thao tác 2 ngón tay trên điện thoại) để thu/phóng mô hình bàn thờ.
        </p>
      </div>
    </div>
  );
};

