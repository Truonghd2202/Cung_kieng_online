import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { Button } from "./ui/button";

interface SceneController {
  rotate: (angle: number) => void;
  zoom: (factor: number) => void;
  reset: () => void;
  setIncense: (lit: boolean) => void;
}

export default function NorthernShrineScene() {
  const hostRef = useRef<HTMLDivElement | null>(null);
  const controllerRef = useRef<SceneController | null>(null);

  const [ready, setReady] = useState(false);
  const [incenseLit, setIncenseLit] = useState(false);
  const [error, setError] = useState("");

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
        "Thiết bị chưa mở được cảnh 3D. Bạn vẫn có thể đọc nội dung Bắc Bộ bên dưới."
      );
      return;
    }

    renderer.setPixelRatio(
      Math.min(window.devicePixelRatio || 1, 1.5)
    );

    const canvas = renderer.domElement;
    canvas.setAttribute("role", "img");
    canvas.setAttribute(
      "aria-label",
      "Không gian phủ điện minh họa gồm cột, mái, bàn và lư hương. Dùng các nút bên dưới để điều khiển."
    );
    host.appendChild(canvas);

    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#ded2bf");

    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 30);
    const initialPosition = new THREE.Vector3(2.5, 2.7, 5);
    const initialTarget = new THREE.Vector3(0, 1.1, 0);
    camera.position.copy(initialPosition);

    scene.add(
      new THREE.HemisphereLight("#fff8e8", "#665341", 2.5)
    );

    const light = new THREE.DirectionalLight("#fff0cd", 2);
    light.position.set(3, 6, 4);
    scene.add(light);

    const geometries = new Set<THREE.BufferGeometry>();
    const materials = new Set<THREE.Material>();

    const wood = new THREE.MeshStandardMaterial({
      color: "#763b31",
      roughness: 0.85,
    });

    const stone = new THREE.MeshStandardMaterial({
      color: "#998e7d",
      roughness: 1,
    });

    const roof = new THREE.MeshStandardMaterial({
      color: "#544843",
      roughness: 1,
    });

    const bronze = new THREE.MeshStandardMaterial({
      color: "#967348",
      metalness: 0.55,
      roughness: 0.45,
    });

    const incenseMaterial = new THREE.MeshStandardMaterial({
      color: "#a87040",
      roughness: 1,
    });

    const emberMaterial = new THREE.MeshBasicMaterial({
      color: "#ff843c",
    });

    [wood, stone, roof, bronze, incenseMaterial, emberMaterial].forEach(
      (material) => materials.add(material)
    );

    const addMesh = (
      geometry: THREE.BufferGeometry,
      material: THREE.Material,
      x: number,
      y: number,
      z: number
    ) => {
      geometries.add(geometry);

      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(x, y, z);
      scene.add(mesh);

      return mesh;
    };

    addMesh(
      new THREE.BoxGeometry(4.4, 0.16, 3.4),
      stone,
      0,
      -0.08,
      0
    );

    for (const x of [-1.7, 1.7]) {
      for (const z of [-1.1, 1.1]) {
        addMesh(
          new THREE.CylinderGeometry(0.09, 0.11, 2.5, 16),
          wood,
          x,
          1.25,
          z
        );
      }
    }

    addMesh(
      new THREE.BoxGeometry(4.1, 0.16, 2.9),
      wood,
      0,
      2.5,
      0
    );

    for (const direction of [-1, 1]) {
      const roofSide = addMesh(
        new THREE.BoxGeometry(4.5, 0.12, 1.75),
        roof,
        0,
        2.8,
        direction * 0.72
      );

      roofSide.rotation.x = direction * 0.3;
    }

    addMesh(
      new THREE.BoxGeometry(1.8, 0.13, 0.8),
      wood,
      0,
      1.03,
      -0.35
    );

    for (const x of [-0.72, 0.72]) {
      for (const z of [-0.6, -0.1]) {
        addMesh(
          new THREE.BoxGeometry(0.09, 0.96, 0.09),
          wood,
          x,
          0.48,
          z
        );
      }
    }

    addMesh(
      new THREE.CylinderGeometry(0.2, 0.14, 0.22, 24),
      bronze,
      0,
      1.2,
      -0.35
    );

    const embers: THREE.Mesh[] = [];

    for (const x of [-0.06, 0, 0.06]) {
      addMesh(
        new THREE.CylinderGeometry(0.008, 0.008, 0.42, 8),
        incenseMaterial,
        x,
        1.49,
        -0.35
      );

      const ember = addMesh(
        new THREE.SphereGeometry(0.014, 8, 6),
        emberMaterial,
        x,
        1.7,
        -0.35
      );

      ember.visible = false;
      embers.push(ember);
    }

    const controls = new OrbitControls(camera, canvas);
    controls.target.copy(initialTarget);
    controls.enablePan = false;
    controls.minDistance = 2.8;
    controls.maxDistance = 8;
    controls.maxPolarAngle = Math.PI / 2 - 0.05;

    // Giữ thao tác cuộn trang bằng một ngón trên điện thoại.
    controls.touches.ONE = THREE.TOUCH.PAN;
    controls.touches.TWO = THREE.TOUCH.DOLLY_ROTATE;
    canvas.style.touchAction = "pan-y";
    controls.update();

    let disposed = false;
    let contextLost = false;

    const render = () => {
      if (!disposed && !contextLost) {
        renderer.render(scene, camera);
      }
    };

    controllerRef.current = {
      rotate: (angle) => {
        const offset = camera.position.clone().sub(controls.target);
        offset.applyAxisAngle(new THREE.Vector3(0, 1, 0), angle);

        camera.position.copy(controls.target).add(offset);
        controls.update();
        render();
      },

      zoom: (factor) => {
        const offset = camera.position.clone().sub(controls.target);
        const distance = THREE.MathUtils.clamp(
          offset.length() * factor,
          controls.minDistance,
          controls.maxDistance
        );

        offset.setLength(distance);
        camera.position.copy(controls.target).add(offset);
        controls.update();
        render();
      },

      reset: () => {
        camera.position.copy(initialPosition);
        controls.target.copy(initialTarget);
        controls.update();
        render();
      },

      setIncense: (lit) => {
        embers.forEach((ember) => {
          ember.visible = lit;
        });

        render();
      },
    };

    const resize = () => {
      const width = host.clientWidth;
      const height = host.clientHeight;

      if (!width || !height) return;

      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      render();
    };

    const handleContextLost = (event: Event) => {
      event.preventDefault();
      contextLost = true;
      controllerRef.current = null;

      setReady(false);
      setIncenseLit(false);
      setError("Cảnh 3D đã tạm dừng. Hãy đóng rồi mở lại cảnh.");
    };

    const observer = new ResizeObserver(resize);
    observer.observe(host);

    controls.addEventListener("change", render);
    canvas.addEventListener("webglcontextlost", handleContextLost);

    resize();
    setReady(true);

    return () => {
      disposed = true;
      controllerRef.current = null;

      observer.disconnect();
      controls.removeEventListener("change", render);
      controls.dispose();
      canvas.removeEventListener("webglcontextlost", handleContextLost);

      geometries.forEach((geometry) => geometry.dispose());
      materials.forEach((material) => material.dispose());

      renderer.dispose();
      canvas.remove();
    };
  }, []);

  const toggleIncense = () => {
    const controller = controllerRef.current;
    if (!controller) return;

    const next = !incenseLit;
    controller.setIncense(next);
    setIncenseLit(next);
  };

  return (
    <section className="space-y-4">
      <div>
        <h3 className="font-semibold text-ink">
          Không gian phủ điện minh họa
        </h3>

        <p className="mt-2 text-sm text-muted">
          Mô hình hình học phục vụ trải nghiệm giao diện, chưa phải
          bản tái hiện một phủ điện hoặc cách bố trí thờ cụ thể.
          Thắp nhang là thao tác mô phỏng.
        </p>
      </div>

      <div
        ref={hostRef}
        className="h-80 overflow-hidden rounded-2xl bg-stone-200 sm:h-96"
      />

      {error && (
        <p role="status" className="text-sm text-muted">
          {error}
        </p>
      )}

      <div className="flex flex-wrap gap-2">
        <Button
          type="button"
          disabled={!ready}
          aria-pressed={incenseLit}
          onClick={toggleIncense}
        >
          {incenseLit ? "Tắt nhang mô phỏng" : "Thắp nhang mô phỏng"}
        </Button>

        <Button
          type="button"
          variant="outline"
          disabled={!ready}
          onClick={() => controllerRef.current?.rotate(-Math.PI / 8)}
        >
          Xoay trái
        </Button>

        <Button
          type="button"
          variant="outline"
          disabled={!ready}
          onClick={() => controllerRef.current?.rotate(Math.PI / 8)}
        >
          Xoay phải
        </Button>

        <Button
          type="button"
          variant="outline"
          disabled={!ready}
          onClick={() => controllerRef.current?.zoom(0.85)}
        >
          Phóng to
        </Button>

        <Button
          type="button"
          variant="outline"
          disabled={!ready}
          onClick={() => controllerRef.current?.zoom(1.15)}
        >
          Thu nhỏ
        </Button>

        <Button
          type="button"
          variant="outline"
          disabled={!ready}
          onClick={() => controllerRef.current?.reset()}
        >
          Đặt lại góc nhìn
        </Button>
      </div>

      <p role="status" className="text-sm text-muted">
        {incenseLit
          ? "Ba nén nhang mô phỏng đang sáng."
          : "Nhang mô phỏng chưa được thắp."}
      </p>

      <p className="text-xs text-muted">
        Dùng các nút để điều khiển bằng bàn phím. Trên điện thoại,
        dùng hai ngón để xoay và phóng to; một ngón để cuộn trang.
      </p>
    </section>
  );
}
