/**
 * SIMREST Q2 — original schematic reconstructed from Simmons111.pdf, pp. 1–7.
 * Visible form, fabric surface, light ring, vents and controls follow the renders.
 * Wall sections, charging coil and circuit layout are illustrative approximations;
 * this is not engineering CAD, a manufacturing model or a functional simulation.
 * Y is up; +Z is the microphone side. No imports, images, DOM or network required.
 */
export function createSimrest(THREE) {
  const group = new THREE.Group();
  group.name = 'SIMREST Q2 schematic assembly';
  const parts = [];
  const wireframes = [];
  const materials = {
    shell: new THREE.MeshStandardMaterial({ color: 0xe6ddcf, roughness: 0.38, metalness: 0.08 }),
    fabric: new THREE.MeshStandardMaterial({ color: 0xcbbda5, roughness: 0.98, metalness: 0 }),
    trim: new THREE.MeshStandardMaterial({ color: 0xbeb3a2, roughness: 0.35, metalness: 0.38 }),
    control: new THREE.MeshStandardMaterial({ color: 0xd4c6ae, roughness: 0.55, metalness: 0.05 }),
    dark: new THREE.MeshStandardMaterial({ color: 0x343734, roughness: 0.74, metalness: 0.08 }),
    board: new THREE.MeshStandardMaterial({ color: 0x3c5550, roughness: 0.70, metalness: 0.12 }),
    copper: new THREE.MeshStandardMaterial({ color: 0xb88b57, roughness: 0.34, metalness: 0.76 }),
    metal: new THREE.MeshStandardMaterial({ color: 0xb7bab6, roughness: 0.30, metalness: 0.80 }),
    light: new THREE.MeshStandardMaterial({ color: 0xfff7e4, emissive: 0xffe3aa, emissiveIntensity: 1.4, roughness: 0.22, metalness: 0 }),
  };
  const edgeMaterial = new THREE.LineBasicMaterial({ color: 0xf4eddf, transparent: true, opacity: 0.44, depthWrite: false });
  const detailEdgeMaterial = new THREE.LineBasicMaterial({ color: 0xc7d7cf, transparent: true, opacity: 0.40, depthWrite: false });

  // A small repeating weave bump is generated in memory, so the model is portable.
  const weaveSize = 32;
  const weavePixels = new Uint8Array(weaveSize * weaveSize * 4);
  for (let y = 0; y < weaveSize; y++) for (let x = 0; x < weaveSize; x++) {
    const warp = (Math.floor(x / 4) + Math.floor(y / 4)) % 2;
    const ridge = Math.cos((warp ? x : y) % 4 / 4 * Math.PI * 2);
    const value = Math.round(146 + ridge * 52);
    const i = (y * weaveSize + x) * 4;
    weavePixels[i] = value; weavePixels[i + 1] = value; weavePixels[i + 2] = value; weavePixels[i + 3] = 255;
  }
  const weave = new THREE.DataTexture(weavePixels, weaveSize, weaveSize, THREE.RGBAFormat);
  weave.wrapS = weave.wrapT = THREE.RepeatWrapping;
  weave.magFilter = THREE.LinearFilter; weave.minFilter = THREE.LinearMipmapLinearFilter;
  weave.generateMipmaps = true; weave.repeat.set(18, 18); weave.needsUpdate = true;
  materials.fabric.bumpMap = weave; materials.fabric.bumpScale = 0.018;

  function part(name, position, offset, approximate = false) {
    const object = new THREE.Group();
    object.name = name; object.position.set(...position);
    object.userData.assembledPosition = [...position];
    object.userData.schematic = approximate;
    group.add(object); parts.push({ object, offset });
    return object;
  }
  function mesh(parent, name, geometry, material, position = [0, 0, 0], rotation = [0, 0, 0], detailed = false) {
    const object = new THREE.Mesh(geometry, material);
    object.name = name; object.position.set(...position); object.rotation.set(...rotation);
    object.castShadow = true; object.receiveShadow = true; parent.add(object);
    const lines = new THREE.LineSegments(new THREE.EdgesGeometry(geometry, detailed ? 12 : 24), detailed ? detailEdgeMaterial : edgeMaterial);
    lines.name = name + ' / edges'; lines.position.copy(object.position); lines.rotation.copy(object.rotation);
    lines.renderOrder = 2; lines.visible = true;
    // Siblings preserve the wire overlay when the host hides or fades solid meshes.
    parent.add(lines); wireframes.push(lines);
    return object;
  }
  const cylinder = (radius, height, segments = 64) => new THREE.CylinderGeometry(radius, radius, height, segments);
  const ring = (radius, tube = 0.018) => new THREE.TorusGeometry(radius, tube, 8, 96);
  const horizontal = [-Math.PI / 2, 0, 0];
  function lathe(profile) {
    return new THREE.LatheGeometry(profile.map(([r, y]) => new THREE.Vector2(r, y)), 96);
  }
  function annulus(outer, inner, height) {
    return lathe([[inner, -height / 2], [outer, -height / 2], [outer, height / 2], [inner, height / 2], [inner, -height / 2]]);
  }
  function rounded(width, height, depth, radius = 0.06) {
    const s = new THREE.Shape(), x = -width / 2, y = -height / 2;
    radius = Math.min(radius, width / 2, height / 2);
    s.moveTo(x + radius, y); s.lineTo(x + width - radius, y);
    s.quadraticCurveTo(x + width, y, x + width, y + radius); s.lineTo(x + width, y + height - radius);
    s.quadraticCurveTo(x + width, y + height, x + width - radius, y + height); s.lineTo(x + radius, y + height);
    s.quadraticCurveTo(x, y + height, x, y + height - radius); s.lineTo(x, y + radius);
    s.quadraticCurveTo(x, y, x + radius, y);
    const geometry = new THREE.ExtrudeGeometry(s, { depth, bevelEnabled: false, curveSegments: 6, steps: 1 });
    geometry.translate(0, 0, -depth / 2); return geometry;
  }
  function screw(parent, x, y, z, downward = false) {
    mesh(parent, 'Fastener head — schematic', cylinder(0.044, 0.018, 12), materials.metal, [x, y, z]);
    mesh(parent, 'Fastener slot', new THREE.BoxGeometry(0.051, 0.006, 0.009), materials.dark, [x, y + (downward ? -0.012 : 0.012), z]);
  }

  // Top layers occupy the same assembled height as the flush charging variant.
  const chargingCover = part('Fabric charging surface', [0, 0.548, 0], [0, 2.36, 0]);
  mesh(chargingCover, 'Soft charging disc', lathe([[0, -0.037], [0.834, -0.037], [0.860, -0.015], [0.860, 0.015], [0.836, 0.037], [0, 0.037]]), materials.fabric);
  mesh(chargingCover, 'Charging disc lower rim', ring(0.845, 0.016), materials.trim, [0, -0.026, 0], horizontal);

  const lightGuide = part('LED light guide', [0, 0.530, 0], [0, 1.68, 0]);
  mesh(lightGuide, 'Warm circular light ring', annulus(0.930, 0.866, 0.039), materials.light);
  mesh(lightGuide, 'Light guide lower collar', annulus(0.925, 0.877, 0.041), materials.trim, [0, -0.040, 0]);

  const chargingInsert = part('Charging insert — schematic', [0, 0.430, 0], [0, 1.16, 0], true);
  mesh(chargingInsert, 'Charging insert substrate', cylinder(0.85, 0.035), materials.dark);
  const coilPoints = [];
  for (let i = 0; i <= 420; i++) {
    const t = i / 420, angle = t * Math.PI * 2 * 8.5, radius = 0.19 + t * 0.58;
    coilPoints.push(new THREE.Vector3(Math.cos(angle) * radius, 0.031, Math.sin(angle) * radius));
  }
  mesh(chargingInsert, 'Illustrative induction winding', new THREE.TubeGeometry(new THREE.CatmullRomCurve3(coilPoints), 420, 0.013, 5, false), materials.copper);
  mesh(chargingInsert, 'Illustrative central ferrite pad', cylinder(0.17, 0.025, 32), materials.dark, [0, 0.025, 0]);

  const fabricDeck = part('Woven upper deck', [0, 0.49, 0], [0, 0.59, 0]);
  mesh(fabricDeck, 'Fabric annular deck', lathe([[0.945, -0.057], [1.865, -0.057], [1.921, -0.026], [1.944, 0.005], [1.918, 0.042], [0.945, 0.042], [0.945, -0.057]]), materials.fabric);
  mesh(fabricDeck, 'Upper perimeter piping', ring(1.925, 0.016), materials.trim, [0, 0.021, 0], horizontal);
  mesh(fabricDeck, 'Inner deck seam', ring(0.946, 0.010), materials.trim, [0, 0.028, 0], horizontal);

  const enclosure = part('Main enclosure', [0, 0.035, 0], [0, 0, 0]);
  mesh(enclosure, 'Open cylindrical enclosure', lathe([[1.897, -0.398], [1.980, -0.398], [1.999, -0.371], [1.999, 0.350], [1.983, 0.384], [1.905, 0.384], [1.897, -0.398]]), materials.shell);
  mesh(enclosure, 'Top housing seam', ring(1.985, 0.012), materials.trim, [0, 0.369, 0], horizontal);
  // The microphone and USB-C are surface recesses, not engineering booleans.
  mesh(enclosure, 'Microphone aperture', cylinder(0.026, 0.017, 16), materials.dark, [0, -0.227, 2.005], [Math.PI / 2, 0, 0]);
  mesh(enclosure, 'Front brand plaque', rounded(0.45, 0.19, 0.012, 0.045), materials.trim, [0, 0.035, 2.009]);
  mesh(enclosure, 'Brand plaque inset', rounded(0.365, 0.105, 0.006, 0.028), materials.shell, [0, 0.035, 2.018]);
  mesh(enclosure, 'USB-C recessed surround', rounded(0.31, 0.112, 0.027, 0.054), materials.trim, [0, -0.211, -2.001]);
  mesh(enclosure, 'USB-C dark opening', rounded(0.254, 0.069, 0.030, 0.032), materials.dark, [0, -0.211, -2.018]);
  mesh(enclosure, 'USB-C centre tongue', rounded(0.170, 0.018, 0.031, 0.008), materials.metal, [0, -0.211, -2.032]);

  const lowerShell = part('Ventilated lower shell', [0, -0.427, 0], [0, -0.53, 0]);
  mesh(lowerShell, 'Rounded lower enclosure', lathe([[1.43, -0.142], [1.60, -0.142], [1.77, -0.088], [1.905, 0.012], [1.98, 0.105], [1.91, 0.108], [1.76, -0.012], [1.53, -0.064], [1.43, -0.064], [1.43, -0.142]]), materials.shell);
  mesh(lowerShell, 'Lower housing seam', ring(1.976, 0.012), materials.trim, [0, 0.102, 0], horizontal);
  const ventGeometry = rounded(0.052, 0.197, 0.012, 0.025);
  for (let i = 0; i < 36; i++) {
    const angle = i / 36 * Math.PI * 2;
    const vent = new THREE.Group(); vent.rotation.y = angle; lowerShell.add(vent);
    mesh(vent, 'Vent recess ' + (i + 1), ventGeometry, materials.dark, [0, -0.008, 1.886], [0.79, 0, 0]);
  }

  // The PDF shows internal plates but no circuit specification; these parts only
  // explain a plausible layer stack and intentionally carry schematic metadata.
  const electronics = part('Electronics layer — schematic', [0, -0.372, 0], [0, -1.12, 0], true);
  mesh(electronics, 'Illustrative circuit disc', cylinder(1.435, 0.042), materials.board);
  mesh(electronics, 'Central component', new THREE.BoxGeometry(0.51, 0.085, 0.39), materials.dark, [0.09, 0.059, 0.03]);
  for (const [x, z, w] of [[-0.74, -0.40, 0.27], [0.70, 0.33, 0.23], [-0.55, 0.54, 0.20], [0.38, -0.70, 0.32]]) {
    mesh(electronics, 'Illustrative circuit component', new THREE.BoxGeometry(w, 0.048, 0.145), materials.dark, [x, 0.046, z]);
    mesh(electronics, 'Illustrative circuit contact', new THREE.BoxGeometry(w * 0.70, 0.006, 0.028), materials.copper, [x, 0.074, z]);
  }
  for (let i = 0; i < 8; i++) {
    const angle = i * Math.PI / 4;
    mesh(electronics, 'Illustrative radial trace', new THREE.BoxGeometry(0.022, 0.007, 0.38), materials.copper, [Math.sin(angle) * 0.93, 0.026, Math.cos(angle) * 0.93], [0, angle, 0]);
  }
  for (const [x, z] of [[-0.94, -0.84], [0.94, -0.84], [-0.94, 0.84], [0.94, 0.84]]) screw(electronics, x, 0.03, z);
  mesh(electronics, 'Speaker body — schematic', cylinder(0.255, 0.106, 32), materials.dark, [0, -0.075, -0.94]);
  mesh(electronics, 'Speaker magnet — schematic', cylinder(0.157, 0.051, 24), materials.metal, [0, -0.146, -0.94]);

  const controlPlate = part('Underside control plate', [0, -0.572, 0], [0, -1.76, 0]);
  mesh(controlPlate, 'Circular bottom plate', cylinder(1.61, 0.061), materials.shell);
  mesh(controlPlate, 'Bottom plate perimeter seam', ring(1.59, 0.012), materials.trim, [0, -0.034, 0], horizontal);
  const controlNames = ['Greeting setting', 'Snore-intervention sensitivity', 'Volume setting', 'Angle setting'];
  const controlCenters = [[-0.61, -0.47], [0.61, -0.47], [-0.61, 0.43], [0.61, 0.43]];
  controlCenters.forEach(([x, z], i) => {
    mesh(controlPlate, controlNames[i] + ' inset', rounded(0.90, 0.64, 0.018, 0.12), materials.control, [x, -0.040, z], horizontal);
    mesh(controlPlate, controlNames[i] + ' slider track', rounded(0.72, 0.135, 0.017, 0.065), materials.trim, [x, -0.054, z + 0.09], horizontal);
    mesh(controlPlate, controlNames[i] + ' slider thumb', cylinder(0.101, 0.061, 24), materials.shell, [x - (i === 0 ? 0.12 : 0), -0.084, z + 0.09]);
    for (let n = 0; n < 4; n++) mesh(controlPlate, 'Slider position mark', new THREE.BoxGeometry(0.025, 0.009, 0.034), materials.dark, [x - 0.27 + n * 0.18, -0.054, z - 0.095]);
  });
  // Perforated speaker area matches the underside rendering's circular grille.
  mesh(controlPlate, 'Speaker grille backing', cylinder(0.267, 0.008, 40), materials.control, [0, -0.036, -1.03]);
  for (let row = -3; row <= 3; row++) for (let col = -3; col <= 3; col++) {
    const x = col * 0.064 + (Math.abs(row) % 2) * 0.032, z = row * 0.059;
    if (x * x + z * z > 0.23 * 0.23) continue;
    mesh(controlPlate, 'Speaker grille perforation', cylinder(0.020, 0.010, 8), materials.dark, [x, -0.044, z - 1.03]);
  }
  for (const [x, z] of [[-1.05, -0.95], [1.05, -0.95], [-1.05, 0.95], [1.05, 0.95]]) screw(controlPlate, x, -0.041, z, true);

  const feet = part('Four isolation feet', [0, -0.649, 0], [0, -2.23, 0]);
  for (const [x, z] of [[-0.71, -1.15], [0.71, -1.15], [-0.71, 1.15], [0.71, 1.15]]) {
    mesh(feet, 'Foot collar', cylinder(0.145, 0.04, 24), materials.shell, [x, 0.015, z]);
    mesh(feet, 'Isolation foot pad', cylinder(0.115, 0.06, 24), materials.dark, [x, -0.022, z]);
  }

  group.userData.schematic = true;
  group.userData.front = '+Z';
  group.userData.description = 'SIMREST Q2 visual study from the supplied portfolio. Exterior follows product renders; internal construction is schematic.';
  group.userData.source = 'Simmons111.pdf, pages 1–7';
  group.userData.units = 'Normalized presentation units; not manufacturing dimensions.';
  return { group, parts, wireframes, materials };
}
