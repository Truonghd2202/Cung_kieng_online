import * as THREE from "three";

/** Dispose scene-owned GPU resources once when a WebGL scene is unmounted. */
export function disposeThreeScene(scene: THREE.Scene): void {
  const geometries = new Set<THREE.BufferGeometry>();
  const materials = new Set<THREE.Material>();
  const textures = new Set<THREE.Texture>();

  const collectTexture = (value: unknown) => {
    if (value instanceof THREE.Texture) textures.add(value);
  };

  scene.traverse((object) => {
    const renderable = object as THREE.Mesh;
    if (renderable.geometry) geometries.add(renderable.geometry);
    const objectMaterials = Array.isArray(renderable.material)
      ? renderable.material
      : renderable.material ? [renderable.material] : [];
    for (const material of objectMaterials) {
      materials.add(material);
      Object.values(material).forEach(collectTexture);
      const uniforms = (material as THREE.ShaderMaterial).uniforms;
      if (uniforms) Object.values(uniforms).forEach((uniform) => collectTexture(uniform.value));
    }
  });

  textures.forEach((texture) => texture.dispose());
  materials.forEach((material) => material.dispose());
  geometries.forEach((geometry) => geometry.dispose());
}
