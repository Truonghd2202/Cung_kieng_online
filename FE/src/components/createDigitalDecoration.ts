import * as THREE from "three";

export type DecorationId = "lotus-vase" | "river-lantern";

export function createDigitalDecoration(
  id: DecorationId
): THREE.Group {
  const group = new THREE.Group();

  const addMesh = (
    geometry: THREE.BufferGeometry,
    color: string,
    position: [number, number, number]
  ) => {
    const material = new THREE.MeshStandardMaterial({
      color,
      roughness: 0.65,
    });

    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(...position);
    group.add(mesh);

    return mesh;
  };

  if (id === "lotus-vase") {
    addMesh(
      new THREE.CylinderGeometry(0.08, 0.11, 0.24, 20),
      "#b47b55",
      [0, 0.12, 0]
    );

    for (const x of [-0.055, 0, 0.055]) {
      const height = x === 0 ? 0.24 : 0.18;

      addMesh(
        new THREE.CylinderGeometry(0.006, 0.006, height, 8),
        "#647a52",
        [x, 0.24 + height / 2, 0]
      );

      const flowerY = 0.24 + height;

      for (let i = 0; i < 6; i++) {
        const angle = (i / 6) * Math.PI * 2;

        const petal = addMesh(
          new THREE.SphereGeometry(0.045, 12, 8),
          "#d99b9b",
          [
            x + Math.cos(angle) * 0.025,
            flowerY,
            Math.sin(angle) * 0.025,
          ]
        );

        petal.scale.set(0.65, 0.45, 1);
        petal.rotation.y = Math.PI / 2 - angle;
      }

      addMesh(
        new THREE.SphereGeometry(0.022, 12, 8),
        "#d6b75a",
        [x, flowerY + 0.012, 0]
      );
    }
  } else {
    addMesh(
      new THREE.CylinderGeometry(0.14, 0.11, 0.035, 24),
      "#ae7658",
      [0, 0.018, 0]
    );

    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2;

      const petal = addMesh(
        new THREE.SphereGeometry(0.065, 12, 8),
        "#d7a375",
        [Math.cos(angle) * 0.09, 0.055, Math.sin(angle) * 0.09]
      );

      petal.scale.set(0.6, 0.45, 1);
      petal.rotation.y = Math.PI / 2 - angle;
    }

    addMesh(
      new THREE.CylinderGeometry(0.025, 0.025, 0.06, 12),
      "#f1ddba",
      [0, 0.065, 0]
    );

    const flame = new THREE.Mesh(
      new THREE.SphereGeometry(0.016, 12, 8),
      new THREE.MeshBasicMaterial({
        color: "#ffbd68",
      })
    );

    flame.scale.set(0.65, 1.6, 0.65);
    flame.position.set(0, 0.115, 0);
    group.add(flame);
  }

  return group;
}

export function disposeDigitalDecoration(group: THREE.Group): void {
  group.traverse((object) => {
    if (!(object instanceof THREE.Mesh)) return;

    object.geometry.dispose();

    const materials = Array.isArray(object.material)
      ? object.material
      : [object.material];

    materials.forEach((material) => material.dispose());
  });

  group.removeFromParent();
}
