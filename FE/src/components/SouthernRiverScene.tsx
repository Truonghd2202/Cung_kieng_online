import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import {
  createDigitalDecoration,
  disposeDigitalDecoration,
} from "./createDigitalDecoration";
import { Button } from "./ui/button";
import { setupSceneKeyboard } from "./setupSceneKeyboard";

interface SouthernRiverSceneProps {
  wishText: string;
}

export function SouthernRiverScene({
  wishText,
}: SouthernRiverSceneProps) {
  const hostRef = useRef<HTMLDivElement>(null);

  const controllerRef = useRef<{
    release: (message: string) => number;
    reset: () => void;
  } | null>(null);

  const [count, setCount] = useState(0);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState("");

  const [releasedWishes, setReleasedWishes] = useState<
    Array<{
      number: number;
      content: string;
    }>
  >([]);

  const cleanWish = wishText.trim();

  const canRelease =
    ready &&
    count < 12 &&
    cleanWish.length > 0 &&
    cleanWish.length <= 1000;

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
        "Thiết bị chưa mở được cảnh 3D. Bạn vẫn có thể dùng màn gửi gắm."
      );
      return;
    }

    setReady(true);
    setError("");

    renderer.setPixelRatio(
      Math.min(window.devicePixelRatio || 1, 1.5)
    );
    renderer.domElement.setAttribute(
      "aria-label",
      "Cảnh sông nước minh họa. Phím trái phải để xoay, dấu cộng trừ để phóng to hoặc thu nhỏ, Home để đặt lại góc nhìn.",
    );
    host.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#202a35");
    scene.fog = new THREE.Fog("#202a35", 7, 18);

    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 40);
    camera.position.set(2.5, 2.7, 4.5);

    scene.add(
      new THREE.HemisphereLight("#d4e6ef", "#514733", 2)
    );

    const moonlight = new THREE.DirectionalLight("#dbe9f0", 2);
    moonlight.position.set(-3, 6, 2);
    scene.add(moonlight);

    const waterGeometry = new THREE.PlaneGeometry(12, 16);
    const waterMaterial = new THREE.MeshStandardMaterial({
      color: "#31545c",
      roughness: 0.35,
      metalness: 0.25,
    });
    const water = new THREE.Mesh(waterGeometry, waterMaterial);
    water.rotation.x = -Math.PI / 2;
    scene.add(water);

    const bankGeometry = new THREE.BoxGeometry(1.3, 0.18, 16);
    const bankMaterial = new THREE.MeshStandardMaterial({
      color: "#78694c",
      roughness: 1,
    });

    for (const side of [-1, 1]) {
      const bank = new THREE.Mesh(bankGeometry, bankMaterial);
      bank.position.set(side * 4, -0.02, 0);
      scene.add(bank);
    }

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(0, 0, -1);
    controls.enablePan = false;
    controls.minDistance = 2;
    controls.maxDistance = 8;
    controls.maxPolarAngle = Math.PI / 2 - 0.08;
    controls.update();

    const lanterns: {
      model: THREE.Group;
      phase: number;
    }[] = [];

    let frame: number | null = null;
    let lastTime = 0;
    let elapsed = 0;
    let disposed = false;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    const render = () => {
      if (!disposed) renderer.render(scene, camera);
    };

    const stop = () => {
      if (frame !== null) {
        cancelAnimationFrame(frame);
        frame = null;
      }

      lastTime = 0;
    };

    const animate = (time: number) => {
      frame = null;

      if (
        disposed ||
        reducedMotion.matches ||
        document.visibilityState !== "visible"
      ) {
        lastTime = 0;
        return;
      }

      const delta = lastTime
        ? Math.min((time - lastTime) / 1000, 0.05)
        : 0;

      lastTime = time;
      elapsed += delta;

      for (const lantern of lanterns) {
        lantern.model.position.z -= delta * 0.12;

        if (lantern.model.position.z < -6) {
          lantern.model.position.z = 2;
        }

        lantern.model.position.y =
          0.025 +
          Math.sin(elapsed * 1.2 + lantern.phase) * 0.01;
      }

      render();
      frame = requestAnimationFrame(animate);
    };

    const syncAnimation = () => {
      stop();

      if (
        !reducedMotion.matches &&
        document.visibilityState === "visible" &&
        lanterns.length > 0
      ) {
        frame = requestAnimationFrame(animate);
      } else {
        render();
      }
    };

    const reset = () => {
      stop();

      for (const lantern of lanterns) {
        disposeDigitalDecoration(lantern.model);
      }

      lanterns.length = 0;
      elapsed = 0;
      render();
    };

    controllerRef.current = {
      release: (message: string) => {
        if (lanterns.length >= 12) return lanterns.length;

        const index = lanterns.length;
        const model = createDigitalDecoration("river-lantern");

        // Chụp nội dung tại thời điểm thả.
        // Sửa ô nhập sau đó không thay đổi lời của đèn đã thả.
        model.userData.wish = message;
        model.userData.lanternNumber = index + 1;

        model.position.set(
          ((index % 4) - 1.5) * 0.5,
          0.025,
          1.5 - Math.floor(index / 4) * 0.5
        );

        scene.add(model);
        lanterns.push({
          model,
          phase: index * 0.7,
        });

        syncAnimation();
        return lanterns.length;
      },
      reset,
    };

    const resize = () => {
      const width = Math.max(host.clientWidth, 1);
      const height = Math.max(host.clientHeight, 1);

      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      render();
    };

    const removeKeyboardControls = setupSceneKeyboard({
      camera,
      controls,
      canvas: renderer.domElement,
      render,
    });

    const observer = new ResizeObserver(resize);
    observer.observe(host);

    controls.addEventListener("change", render);
    reducedMotion.addEventListener("change", syncAnimation);
    document.addEventListener("visibilitychange", syncAnimation);

    const handleContextLost = (event: Event) => {
      event.preventDefault();
      stop();
      controllerRef.current = null;
      setReady(false);
      setError("Cảnh 3D bị gián đoạn. Bạn hãy đóng rồi mở lại cảnh.");
    };

    renderer.domElement.addEventListener(
      "webglcontextlost",
      handleContextLost
    );

    resize();

    return () => {
      reset();
      disposed = true;
      controllerRef.current = null;

      observer.disconnect();
      removeKeyboardControls();
      controls.removeEventListener("change", render);
      controls.dispose();

      reducedMotion.removeEventListener("change", syncAnimation);
      document.removeEventListener("visibilitychange", syncAnimation);
      renderer.domElement.removeEventListener(
        "webglcontextlost",
        handleContextLost
      );

      waterGeometry.dispose();
      waterMaterial.dispose();
      bankGeometry.dispose();
      bankMaterial.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return (
    <section
      aria-labelledby="southern-river-title"
      className="mb-8 rounded-card border border-line bg-surface p-5"
    >
      <h2
        id="southern-river-title"
        className="font-display text-xl font-semibold text-ink"
      >
        Một khoảng sông nước
      </h2>

      <p className="mt-3 text-sm leading-relaxed text-muted">
        Cảnh minh họa nghệ thuật, không tái hiện địa điểm hoặc nghi lễ
        cụ thể. Kéo để xoay, dùng thao tác thu phóng để đổi khoảng nhìn.
      </p>

      <div
        ref={hostRef}
        className="mt-5 h-80 overflow-hidden rounded-panel sm:h-96"
      />

      {error && (
        <p role="alert" className="mt-3 text-sm text-danger">
          {error}
        </p>
      )}

      <div className="mt-4 rounded-panel border border-line p-4">
        <h3 className="font-semibold text-ink">
          Lời gửi gắm cho hoa đăng tiếp theo
        </h3>

        {cleanWish ? (
          <p className="mt-2 whitespace-pre-line break-words text-sm leading-relaxed text-muted">
            {cleanWish}
          </p>
        ) : (
          <p className="mt-2 text-sm text-muted">
            Bạn chưa nhập lời gửi gắm.
          </p>
        )}

        <a
          href="#regional-note"
          className="mt-3 inline-flex min-h-11 items-center text-sm font-semibold text-accent underline underline-offset-4"
        >
          {cleanWish ? "Chỉnh lời gửi gắm bên dưới" : "Viết lời gửi gắm bên dưới"}
        </a>

        <p
          id="southern-wish-help"
          className="mt-2 text-xs text-muted"
        >
          Nhập từ 1 đến 1000 ký tự ở ô cảm nhận bên dưới.
          Mỗi đèn giữ nội dung tại thời điểm bạn thả.
        </p>
      </div>

      <div className="mt-4 flex flex-col gap-3 sm:flex-row">
        <Button
          type="button"
          disabled={!canRelease}
          aria-describedby="southern-wish-help"
          onClick={() => {
            const controller = controllerRef.current;

            if (!controller || !canRelease) return;

            const nextCount = controller.release(cleanWish);

            if (nextCount <= count) return;

            setCount(nextCount);

            setReleasedWishes((current) => [
              ...current,
              {
                number: nextCount,
                content: cleanWish,
              },
            ]);
          }}
        >
          {count >= 12
            ? "Đã có 12 hoa đăng"
            : "Thả hoa đăng cùng lời gửi gắm"}
        </Button>

        <Button
          type="button"
          variant="outline"
          disabled={!ready || count === 0}
          onClick={() => {
            const controller = controllerRef.current;
            if (!controller) return;

            controller.reset();
            setCount(0);
            setReleasedWishes([]);
          }}
        >
          Đặt lại cảnh
        </Button>
      </div>

      <p role="status" className="mt-3 text-sm text-muted">
        {count} hoa đăng trong cảnh.
      </p>

      {releasedWishes.length > 0 && (
        <div className="mt-5 border-t border-line pt-4">
          <h3 className="font-semibold text-ink">
            Những lời đã gửi trong lần mở cảnh này
          </h3>

          <ul className="mt-3 space-y-3">
            {releasedWishes.map((wish) => (
              <li
                key={wish.number}
                className="rounded-panel border border-line p-3"
              >
                <details>
                  <summary className="min-h-11 cursor-pointer py-2 text-sm font-semibold text-ink">
                    Hoa đăng {wish.number}
                  </summary>

                  <p className="mt-2 whitespace-pre-line break-words text-sm leading-relaxed text-muted">
                    {wish.content}
                  </p>
                </details>
              </li>
            ))}
          </ul>
        </div>
      )}

      <p className="mt-2 text-xs leading-relaxed text-muted">
        Hoa đăng và danh sách lời gửi gắm trong cảnh sẽ mất khi
        bạn đóng hoặc đặt lại cảnh. Ô cảm nhận bên dưới được
        quản lý riêng; bạn có thể dùng nút lưu cảm nhận tại đó.
      </p>

      <p className="mt-2 text-xs text-muted">
        Bàn phím: nhấn Tab đến cảnh, dùng phím trái/phải để xoay,
        dấu +/− để phóng to hoặc thu nhỏ, Home để đặt lại góc nhìn.
        Thả hoa đăng bằng nút bên trên.
      </p>
    </section>
  );
}
