/**
 * Locally generated, mipmapped materials for the MODUFRAME presentation model.
 * These textures describe cloth and finish only; they do not encode product geometry.
 * Maps remain ordinary material properties so the scene's shared-texture disposer
 * can release them, including maps referenced by cloned materials.
 */
export function createChairMaterials(THREE) {
  const size = 256, pitch = 16, tau = Math.PI * 2;
  const clamp = (value, low, high) => Math.max(low, Math.min(high, value));
  const byte = value => Math.round(clamp(value, 0, 255));
  // Deterministic integer noise avoids animated grain and keeps rebuilds identical.
  const noise = (x, y, salt = 0) => {
    let value = Math.imul(x + 1, 374761393) ^ Math.imul(y + 1, 668265263) ^ salt;
    value = Math.imul(value ^ (value >>> 13), 1274126177);
    return ((value ^ (value >>> 16)) >>> 0) / 4294967295;
  };
  function texture(data, name, repeatX, repeatY, isColor = false) {
    const map = new THREE.DataTexture(data, size, size, THREE.RGBAFormat);
    map.name = `MODUFRAME / ${name}`;
    map.wrapS = map.wrapT = THREE.RepeatWrapping;
    map.repeat.set(repeatX, repeatY);
    map.magFilter = THREE.LinearFilter;
    map.minFilter = THREE.LinearMipmapLinearFilter;
    map.generateMipmaps = true;
    map.anisotropy = 8;
    map.colorSpace = isColor ? THREE.SRGBColorSpace : THREE.NoColorSpace;
    map.needsUpdate = true;
    return map;
  }
  const height = new Float32Array(size * size);
  const albedo = new Uint8Array(size * size * 4);
  const normals = new Uint8Array(size * size * 4);
  const roughness = new Uint8Array(size * size * 4);
  for (let y = 0; y < size; y++) for (let x = 0; x < size; x++) {
    const column = Math.floor(x / pitch), row = Math.floor(y / pitch);
    const u = ((x + .5) % pitch) / pitch, v = ((y + .5) % pitch) / pitch;
    const warp = Math.pow(Math.sin(Math.PI * u), .72);
    const weft = Math.pow(Math.sin(Math.PI * v), .72);
    const warpOver = (column + row) % 2 === 0;
    const top = warpOver ? warp : weft, underneath = warpOver ? weft : warp;
    const strand = Math.cos((warpOver ? x : y) * Math.PI / 2) * .018;
    const fibre = noise(x, y, 1039) - .5;
    const yarnTone = (noise(column, row, 3319) - .5) * 9;
    const h = .68 * top + .16 * underneath + strand + fibre * .025;
    height[y * size + x] = h;
    const i = (y * size + x) * 4;
    // Restrained reflectance variation survives minification without a large grid.
    const shade = byte(218 + h * 23 + fibre * 12 + yarnTone);
    albedo[i] = albedo[i + 1] = albedo[i + 2] = shade;
    albedo[i + 3] = 255;
    const matte = byte(242 - top * 13 + fibre * 6);
    roughness[i] = roughness[i + 1] = roughness[i + 2] = matte;
    roughness[i + 3] = 255;
  }
  for (let y = 0; y < size; y++) for (let x = 0; x < size; x++) {
    // Wrap the finite differences across the tile edges for continuous shading.
    const left = height[y * size + (x + size - 1) % size];
    const right = height[y * size + (x + 1) % size];
    const up = height[((y + size - 1) % size) * size + x];
    const down = height[((y + 1) % size) * size + x];
    const nx = (left - right) * 2.2, ny = (up - down) * 2.2;
    const length = Math.hypot(nx, ny, 1), i = (y * size + x) * 4;
    normals[i] = byte(127.5 + nx / length * 127.5);
    normals[i + 1] = byte(127.5 + ny / length * 127.5);
    normals[i + 2] = byte(127.5 + 127.5 / length);
    normals[i + 3] = 255;
  }
  // Sixteen yarn crossings per tile, repeated conservatively: the weave remains
  // readable near the chair and converges to neutral cloth in distant views.
  const clothColor = texture(albedo, 'woven yarn reflectance', 4, 6, true);
  const clothNormal = texture(normals, 'woven yarn normal', 4, 6);
  const clothRoughness = texture(roughness, 'woven yarn roughness', 4, 6);

  const brushed = new Uint8Array(size * size * 4);
  const grain = new Uint8Array(size * size * 4);
  for (let y = 0; y < size; y++) for (let x = 0; x < size; x++) {
    const i = (y * size + x) * 4;
    // Long shallow finishing strokes, without the mirror-like chrome response.
    const line = (noise(0, y, 8923) - .5) * 14 + Math.sin(y * tau / 8) * 4;
    const finish = byte(225 + line + (noise(x, y, 1949) - .5) * 4);
    brushed[i] = brushed[i + 1] = brushed[i + 2] = finish;
    brushed[i + 3] = 255;
    const satin = byte(241 + (noise(x, y, 7331) - .5) * 18);
    grain[i] = grain[i + 1] = grain[i + 2] = satin;
    grain[i + 3] = 255;
  }
  const alloyRoughness = texture(brushed, 'brushed alloy finish', 2, 4);
  const satinRoughness = texture(grain, 'fine moulded satin finish', 3, 3);
  function cloth(name, color, sheenColor, normalStrength, sheen) {
    const material = new THREE.MeshPhysicalMaterial({
      color, map: clothColor, metalness: 0, roughness: .98,
      roughnessMap: clothRoughness, normalMap: clothNormal,
      normalScale: new THREE.Vector2(normalStrength, normalStrength),
      sheen, sheenColor, sheenRoughness: .86,
      ior: 1.45, specularIntensity: .22,
    });
    material.name = `MODUFRAME / ${name}`;
    return material;
  }
  const materials = {
    aluminium: new THREE.MeshStandardMaterial({ color: 0xcbd0d3, metalness: .87, roughness: .53, roughnessMap: alloyRoughness }),
    edgeMetal: new THREE.MeshStandardMaterial({ color: 0x969fa6, metalness: .80, roughness: .59, roughnessMap: alloyRoughness }),
    graphite: cloth('charcoal woven upholstery', 0x373b40, 0x717780, .40, .24),
    textile: cloth('neutral grey woven upholstery', 0x656b73, 0xa2a6ac, .48, .30),
    navy: new THREE.MeshPhysicalMaterial({ color: 0x172c55, metalness: 0, roughness: .62, roughnessMap: satinRoughness, ior: 1.46, specularIntensity: .42 }),
    shell: new THREE.MeshStandardMaterial({ color: 0x42474c, metalness: 0, roughness: .71, roughnessMap: satinRoughness }),
    polymer: new THREE.MeshStandardMaterial({ color: 0x202429, metalness: 0, roughness: .78, roughnessMap: satinRoughness }),
    piping: new THREE.MeshStandardMaterial({ color: 0x30343a, metalness: 0, roughness: .94 }),
    pocket: cloth('navy woven webbing and pockets', 0x263c61, 0x576b8b, .52, .22),
    inset: new THREE.MeshStandardMaterial({ color: 0x0b0e12, metalness: 0, roughness: .82 }),
  };
  for (const [name, material] of Object.entries(materials)) {
    if (!material.name) material.name = `MODUFRAME / ${name}`;
  }
  return materials;
}
