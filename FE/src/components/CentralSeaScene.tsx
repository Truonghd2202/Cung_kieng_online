import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { Button } from "./ui/button";
import { setupSceneKeyboard } from "./setupSceneKeyboard";

export default function CentralSeaScene() {
  const hostRef = useRef<HTMLDivElement | null>(null);
  const motionRef = useRef<(enabled: boolean) => void>(() => {});
  const resetRef = useRef<() => void>(() => {});

  const [ready, setReady] = useState(false);
  const [moving, setMoving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    let renderer: THREE.WebGLRenderer;

    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: false,
      });
    } catch {
      setError(
        "Thiết bị chưa mở được cảnh 3D. Bạn vẫn có thể đọc nội dung bên dưới."
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
      "Cảnh biển minh họa. Phím trái phải để xoay, dấu cộng trừ để phóng to hoặc thu nhỏ, Home để đặt lại góc nhìn.",
    );

    // Cho phép cuộn trang theo chiều dọc trên điện thoại.
    canvas.style.touchAction = "pan-y";
    host.appendChild(canvas);

    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#cadde2");
    scene.fog = new THREE.Fog("#cadde2", 9, 22);

    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 40);
    const initialPosition = new THREE.Vector3(3, 3, 5);
    const initialTarget = new THREE.Vector3(0, 0, -1);
    camera.position.copy(initialPosition);

    scene.add(new THREE.HemisphereLight("#ffffff", "#9f8667", 2.5));

    const sunlight = new THREE.DirectionalLight("#fff5dc", 2);
    sunlight.position.set(-3, 6, 2);
    scene.add(sunlight);

    const waterGeometry = new THREE.PlaneGeometry(12, 16, 40, 56);
    waterGeometry.rotateX(-Math.PI / 2);

    const waterMaterial = new THREE.MeshStandardMaterial({
      color: "#438b9c",
      roughness: 0.42,
      metalness: 0.12,
      side: THREE.DoubleSide,
    });

    const water = new THREE.Mesh(waterGeometry, waterMaterial);
    water.position.z = -4;
    scene.add(water);

    const sandGeometry = new THREE.BoxGeometry(12, 0.12, 3);
    const sandMaterial = new THREE.MeshStandardMaterial({
      color: "#d9c6a0",
      roughness: 1,
    });

    const sand = new THREE.Mesh(sandGeometry, sandMaterial);
    sand.position.set(0, -0.09, 4.5);
    scene.add(sand);

    const controls = new OrbitControls(camera, canvas);
    controls.enablePan = false;
    controls.minDistance = 2.5;
    controls.maxDistance = 9;
    controls.maxPolarAngle = Math.PI / 2 - 0.08;
    controls.target.copy(initialTarget);

    // Một ngón cuộn trang; hai ngón xoay và phóng to cảnh.
    controls.touches.ONE = THREE.TOUCH.PAN;
    controls.touches.TWO = THREE.TOUCH.DOLLY_ROTATE;
    controls.update();

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    const positions = waterGeometry.getAttribute(
      "position"
    ) as THREE.BufferAttribute;

    let frame = 0;
    let lastTime = 0;
    let elapsed = 0;
    let motionEnabled = !reducedMotion.matches;
    let disposed = false;
    let contextLost = false;

    const render = () => {
      if (!disposed && !contextLost) {
        renderer.render(scene, camera);
      }
    };

    const updateWaves = (time: number) => {
      for (let index = 0; index < positions.count; index += 1) {
        const x = positions.getX(index);
        const z = positions.getZ(index);

        const height =
          Math.sin(z * 1.4 + time * 0.8) * 0.025 +
          Math.sin(x * 1.1 + z * 0.6 + time * 0.5) * 0.012;

        positions.setY(index, height);
      }

      positions.needsUpdate = true;
      waterGeometry.computeVertexNormals();
    };

    const stop = () => {
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
      lastTime = 0;
    };

    const animate = (time: number) => {
      if (
        disposed ||
        contextLost ||
        !motionEnabled ||
        document.hidden
      ) {
        frame = 0;
        lastTime = 0;
        return;
      }

      const delta = lastTime
        ? Math.min((time - lastTime) / 1000, 0.05)
        : 0;

      lastTime = time;
      elapsed += delta;

      updateWaves(elapsed);
      render();
      frame = requestAnimationFrame(animate);
    };

    const syncMotion = () => {
      stop();

      if (
        !disposed &&
        !contextLost &&
        motionEnabled &&
        !document.hidden
      ) {
        frame = requestAnimationFrame(animate);
      } else {
        render();
      }
    };

    motionRef.current = (enabled) => {
      motionEnabled = enabled;
      setMoving(enabled);
      syncMotion();
    };

    resetRef.current = () => {
      camera.position.copy(initialPosition);
      controls.target.copy(initialTarget);
      controls.update();
      render();
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

    const removeKeyboardControls = setupSceneKeyboard({
      camera,
      controls,
      canvas,
      render,
    });

    const observer = new ResizeObserver(resize);
    observer.observe(host);

    const handleMotionPreference = () => {
      // Khi hệ điều hành bật giảm chuyển động, dừng sóng ngay.
      if (reducedMotion.matches) {
        motionEnabled = false;
        setMoving(false);
        syncMotion();
      }
    };

    const handleContextLost = (event: Event) => {
      event.preventDefault();
      contextLost = true;
      stop();

      setReady(false);
      setMoving(false);
      setError("Cảnh 3D đã tạm dừng. Hãy đóng rồi mở lại cảnh biển.");
    };

    controls.addEventListener("change", render);
    reducedMotion.addEventListener("change", handleMotionPreference);
    document.addEventListener("visibilitychange", syncMotion);
    canvas.addEventListener("webglcontextlost", handleContextLost);

    resize();
    updateWaves(0);
    setReady(true);
    setMoving(motionEnabled);
    syncMotion();

    return () => {
      disposed = true;
      stop();

      motionRef.current = () => {};
      resetRef.current = () => {};

      observer.disconnect();
      removeKeyboardControls();
      controls.removeEventListener("change", render);
      controls.dispose();

      reducedMotion.removeEventListener(
        "change",
        handleMotionPreference
      );
      document.removeEventListener("visibilitychange", syncMotion);
      canvas.removeEventListener("webglcontextlost", handleContextLost);

      waterGeometry.dispose();
      waterMaterial.dispose();
      sandGeometry.dispose();
      sandMaterial.dispose();
      renderer.dispose();
      canvas.remove();
    };
  }, []);

  return (
    <section className="space-y-4">
      <div>
        <h3 className="font-semibold text-ink">Một khoảng biển yên</h3>

        <p className="mt-2 text-sm text-muted">
          Cảnh biển minh họa, không tái hiện một địa điểm hoặc nghi lễ
          Cầu Ngư cụ thể. Lời chúc của bạn được viết ở phần nội dung riêng.
        </p>
      </div>

      <div
        ref={hostRef}
        className="h-72 overflow-hidden rounded-2xl bg-slate-200 sm:h-96"
      />

      {error && (
        <p role="status" className="text-sm text-muted">
          {error}
        </p>
      )}

      <div className="flex flex-wrap gap-3">
        <Button
          type="button"
          variant="outline"
          disabled={!ready}
          aria-pressed={moving}
          onClick={() => motionRef.current(!moving)}
        >
          {moving ? "Dừng sóng" : "Bật chuyển động sóng"}
        </Button>

        <Button
          type="button"
          variant="outline"
          disabled={!ready}
          onClick={() => resetRef.current()}
        >
          Đặt lại góc nhìn
        </Button>
      </div>

      <p className="text-xs text-muted">
        Máy tính: kéo để xoay, cuộn để phóng to. Điện thoại: dùng hai
        ngón để xoay và phóng to; một ngón để cuộn trang. Chuyển động tự
        dừng khi bạn chuyển sang tab khác.
      </p>

      <p className="mt-2 text-xs text-muted">
        Bàn phím: nhấn Tab đến cảnh, dùng phím trái/phải để xoay,
        dấu +/− để phóng to hoặc thu nhỏ, Home để đặt lại góc nhìn.
        Nhấn Tab để chuyển ra khỏi cảnh.
      </p>
    </section>
  );
}
