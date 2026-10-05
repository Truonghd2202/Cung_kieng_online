import type * as THREE from "three";
import type { OrbitControls } from "three/addons/controls/OrbitControls.js";

interface SceneKeyboardOptions {
  camera: THREE.PerspectiveCamera;
  controls: OrbitControls;
  canvas: HTMLCanvasElement;
  render: () => void;
}

export function setupSceneKeyboard({
  camera,
  controls,
  canvas,
  render,
}: SceneKeyboardOptions): () => void {
  const initialPosition = camera.position.clone();
  const initialTarget = controls.target.clone();

  canvas.tabIndex = 0;

  canvas.classList.add(
    "focus-visible:outline",
    "focus-visible:outline-2",
    "focus-visible:outline-accent",
    "focus-visible:outline-offset-[-2px]",
  );

  const rotate = (angle: number) => {
    const offset = camera.position.clone().sub(controls.target);
    const axis = camera.up.clone().normalize();

    offset.applyAxisAngle(axis, angle);

    camera.position.copy(controls.target).add(offset);
  };

  const zoom = (factor: number) => {
    const offset = camera.position.clone().sub(controls.target);

    const distance = Math.min(
      controls.maxDistance,
      Math.max(
        controls.minDistance,
        offset.length() * factor,
      ),
    );

    offset.setLength(distance);
    camera.position.copy(controls.target).add(offset);
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (
      event.ctrlKey ||
      event.altKey ||
      event.metaKey ||
      event.isComposing
    ) {
      return;
    }

    switch (event.key) {
      case "ArrowLeft":
        rotate(-Math.PI / 16);
        break;

      case "ArrowRight":
        rotate(Math.PI / 16);
        break;

      case "+":
      case "=":
        zoom(0.9);
        break;

      case "-":
      case "_":
        zoom(1.1);
        break;

      case "Home":
        camera.position.copy(initialPosition);
        controls.target.copy(initialTarget);
        break;

      default:
        return;
    }

    event.preventDefault();
    controls.update();
    render();
  };

  canvas.addEventListener("keydown", handleKeyDown);

  return () => {
    canvas.removeEventListener("keydown", handleKeyDown);
  };
}
