/**
 * AxisPro original CAD-derived assembly adapter.
 * Load axispro-original.glb using GLTFLoader, then pass gltf.scene as sourceScene.
 * The geometry comes from the supplied Tower3.fbx; no procedural substitute is used.
 * Length axis: Z. Camera recommendation: [8, 5.2, 9], target [0, 0, -.1].
 */
export function createAxisPro(THREE, sourceScene) {
  if (!sourceScene) throw new Error('AxisPro requires the loaded axispro-original.glb scene.');
  const source = sourceScene.getObjectByName('AxisPro_original_assembly') || sourceScene;
  const group = source.clone(true);
  group.name = 'AxisPro original assembly';
  const parts = [];
  const wireframes = [];
  const materialMap = new Map();
  const materials = {};
  const edgeMaterial = new THREE.LineBasicMaterial({
    color: 0xaec7df, transparent: true, opacity: .10, depthWrite: false,
  });
  // Clone materials to keep later scroll opacity changes local to this scene.
  group.traverse(object => {
    if (Array.isArray(object.userData?.explodeOffset)) {
      object.userData.assembledPosition = object.position.toArray();
      parts.push({ object, offset: [...object.userData.explodeOffset] });
    }
    if (!object.isMesh) return;
    const cloneMaterial = material => {
      if (!materialMap.has(material)) {
        const clone = material.clone();
        materialMap.set(material, clone);
        materials[clone.name || 'material_' + materialMap.size] = clone;
      }
      return materialMap.get(material);
    };
    object.material = Array.isArray(object.material) ? object.material.map(cloneMaterial) : cloneMaterial(object.material);
    object.castShadow = true;
    object.receiveShadow = true;
  });
  // Sibling overlays survive when the host fades solid mesh materials.
  const meshes = [];
  group.traverse(object => { if (object.isMesh) meshes.push(object); });
  for (const mesh of meshes) {
    const geometry = new THREE.EdgesGeometry(mesh.geometry, 28);
    if (!geometry.attributes.position.count) { geometry.dispose(); continue; }
    const lines = new THREE.LineSegments(geometry, edgeMaterial);
    lines.name = mesh.name + '_edges';
    lines.position.copy(mesh.position);
    lines.quaternion.copy(mesh.quaternion);
    lines.scale.copy(mesh.scale);
    lines.visible = false;
    lines.renderOrder = 1;
    mesh.parent.add(lines);
    wireframes.push(lines);
  }
  group.userData.originalGeometry = true;
  group.userData.description = 'AxisPro original CAD-derived assembly, preserving the supplied model geometry.';
  return { group, parts, wireframes, materials };
}
