import * as THREE from './vendor/three.module.js';
import { GLTFLoader } from './vendor/GLTFLoader.js';
import { RoomEnvironment } from './vendor/RoomEnvironment.js';
import { createAxisPro } from './axispro-model.js';
import { createStreamX } from './streamx-model.js';
import { createPath } from './path-model.js';
import { createSimrest } from './simrest-model.js';
import { createModuframe } from './moduframe-model.js';
import { gsap, ScrollTrigger } from './motion.js';
import { scrollProjectTo } from './scroll-controller.js';

const clamp = THREE.MathUtils.clamp;
const ease = (a, b, p) => { const t = clamp((p - a) / (b - a), 0, 1); return t * t * (3 - 2 * t); };
const factories = { axispro: createAxisPro, 'stream-x': createStreamX, 'the-path': createPath, simrest: createSimrest, moduframe: createModuframe };

// One renderer belongs to one open project. Closing the view releases it entirely.
export async function initProjectScene({ key, config, scroller, story, isCurrent = () => true }) {
  const source = key === 'axispro' ? await new GLTFLoader().loadAsync('/assets/models/axispro-original.glb') : null;
  if (!isCurrent()) return () => {};
  const holder = story.querySelector('#project-scene');
  const fallback = story.querySelector('#project-scene-fallback');
  const chapters = story.querySelector('.project-chapters');
  const buttons = [...chapters.querySelectorAll('button')];
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const controller = new AbortController();
  let renderer, frame = 0, disposed = false, contextLost = false, mobile = false, activeChapter = -1;
  let sceneTimeline, sceneVisible = true;
  const heading = story.querySelector('#project-story-heading');
  const description = story.querySelector('#project-story-description');
  const count = story.querySelector('#project-story-count');
  const progress = story.querySelector('#project-story-progress');
  const resetCopy = () => [heading, description].forEach(node => {node.style.removeProperty('opacity');node.style.removeProperty('transform');});
  resetCopy();
  const playhead = { p: 0 };
  try { renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: 'high-performance' }); }
  catch { story.dataset.scene = 'fallback'; return () => {}; }
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = key === 'the-path' ? .9 : key === 'moduframe' ? 1 : 1.05;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFShadowMap;
  if (key === 'moduframe') {
    // Only the camera moves, so reuse the stationary chair's shadow map.
    renderer.shadowMap.autoUpdate = false;
    renderer.shadowMap.needsUpdate = true;
  }
  holder.append(renderer.domElement);
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(config.color);
  scene.fog = new THREE.Fog(config.color, key === 'stream-x' ? 24 : 20, key === 'stream-x' ? 90 : 50);
  const camera = new THREE.PerspectiveCamera(36, 1, .1, 250);
  const pmrem = new THREE.PMREMGenerator(renderer);
  const studio = new RoomEnvironment();
  const environment = pmrem.fromScene(studio, .04);
  scene.environment = environment.texture;
  scene.environmentIntensity = key === 'stream-x' ? .55 : key === 'moduframe' ? .65 : .45;
  studio.dispose(); pmrem.dispose();
  scene.add(new THREE.HemisphereLight(0xfffcf5, key === 'moduframe' ? 0xb5b5b0 : 0x789489, key === 'the-path' ? 1.4 : key === 'stream-x' ? 1 : key === 'moduframe' ? 1.15 : 2));
  const light = new THREE.DirectionalLight(0xfffcf5, key === 'the-path' ? 2 : key === 'stream-x' ? 1.6 : key === 'moduframe' ? 2.4 : 3); light.position.set(-5, 8, 7); light.castShadow = true; light.shadow.mapSize.set(key === 'moduframe' ? 2048 : 1024, key === 'moduframe' ? 2048 : 1024); Object.assign(light.shadow.camera, {left:-10,right:10,top:10,bottom:-10}); light.shadow.bias=-.001; light.shadow.normalBias=.025; scene.add(light);
  const rim = new THREE.DirectionalLight(0xe2e8df, 1.4); rim.position.set(6, 4, -5); scene.add(rim);
  if (key === 'moduframe') {
    // A higher, softer studio key keeps the cast shadow close to the chair and
    // lets the fabric, moulded armrests and brushed metal read independently.
    light.position.set(-3, 9, 5); light.intensity = 2.1;
    light.shadow.normalBias = .012;
    light.shadow.radius = 3;
    rim.intensity = .75;
  }
  const model = factories[key](THREE, source?.scene);
  const root = new THREE.Group(); root.add(model.group); scene.add(root);
  if (key === 'stream-x') model.group.scale.setScalar(1.3);
  const bounds = new THREE.Box3().setFromObject(model.group);
  const center = bounds.getCenter(new THREE.Vector3());
  const modelSize = bounds.getSize(new THREE.Vector3());
  if (key !== 'stream-x') model.group.position.sub(center);
  const parts = (model.parts || []).map(({ object, offset }) => ({ object, base: object.position.clone(), offset: new THREE.Vector3(...offset) }));
  const solids = new Map();
  model.group.traverse(object => {
    if (!object.isMesh) return;
    for (const material of [].concat(object.material)) {
      if (!solids.has(material)) solids.set(material, { opacity: material.opacity, transparent: material.transparent, depthWrite: material.depthWrite });
    }
  });
  const wires = new Set((model.wireframes || []).map(w => w.material));
  (model.wireframes || []).forEach(wire => { wire.visible = true; });
  let road;
  if (key === 'stream-x') road = makeRoad(root);
  else if (key === 'moduframe') {
    const floorY = -modelSize.y / 2 - .008;
    const floor = new THREE.Mesh(new THREE.PlaneGeometry(160, 160), new THREE.MeshStandardMaterial({color: config.color, roughness: 1, metalness: 0}));
    floor.rotation.x = -Math.PI / 2; floor.position.y = floorY; floor.receiveShadow = true; scene.add(floor);
    const grid = new THREE.GridHelper(24, 48, 0x98afa2, 0xaabdb1);
    grid.position.y = floorY + .003; grid.material.transparent = true; grid.material.opacity = .07; scene.add(grid);
    light.shadow.camera.left = light.shadow.camera.bottom = -4;
    light.shadow.camera.right = light.shadow.camera.top = 4;
    light.shadow.camera.updateProjectionMatrix();
  } else {
    const grid = new THREE.GridHelper(40, 40, 0x789489, 0x8da697);
    grid.position.y = key === 'axispro' ? -2.8 : key === 'the-path' ? -1.6 : -2;
    grid.material.transparent = true; grid.material.opacity = key === 'simrest' ? .2 : .17; scene.add(grid);
  }

  function requestRender() {
    if (disposed || contextLost || document.hidden || frame) return;
    if (!sceneVisible) return;
    frame = requestAnimationFrame(render);
  }
  function render() {
    frame = 0;
    if (disposed || contextLost || document.hidden) return;
    const p = reduced.matches ? 0 : playhead.p;
    const chapter = p < .3 ? 0 : p < .72 ? 1 : 2;
    if (chapter !== activeChapter) {
      activeChapter = chapter;
      heading.textContent = config.chapters[chapter].title;
      description.textContent = config.chapters[chapter].text;
      count.textContent = `${String(chapter + 1).padStart(2, '0')} / 03`;
      buttons.forEach((button, index) => { if (index === chapter) button.setAttribute('aria-current', 'step'); else button.removeAttribute('aria-current'); });
    }
    // The copy fades through each boundary, so reversing scroll reverses the transition.
    const boundary = Math.min(Math.abs(p - .3), Math.abs(p - .72));
    const copyAlpha = reduced.matches ? 1 : ease(0, .035, boundary);
    const direction = p < .3 || (p > .5 && p < .72) ? -1 : 1;
    for (const node of [heading, description]) {
      node.style.opacity = String(copyAlpha);
      node.style.transform = `translateY(${direction * (1 - copyAlpha) * 12}px)`;
    }
    const orbit = ease(0, 1, p);
    if (road) {
      // Distance and wheel rotation are functions of scroll, so reversing scroll reverses the drive.
      const distance = p * 155;
      root.position.set(mobile ? 0 : 2.6, mobile ? 1.5 : -.85, 0);
      root.scale.setScalar(mobile ? .6 : .96);
      root.rotation.y = -.63 - orbit * 1.30;
      // The road top is local y=-.035. Keep tyres tangent after model scaling.
      model.group.position.y = -.035 - model.wheelContactY * model.group.scale.y;
      // Moving forward is +z: positive x rotation carries the tyre bottom toward -z.
      model.wheels.forEach(wheel => { wheel.rotation.x = distance / (wheel.userData.radius * model.group.scale.x); });
      road.markers.forEach(({ object, z }) => { object.position.z = ((z - distance + 240) % 180) - 90; });
      camera.position.set(0, mobile ? 3.3 : 3.5 - p * .6, mobile ? 15 : 14.4);
      camera.lookAt(0, mobile ? -.15 : .15, 0);
      wires.forEach(material => { material.opacity = ease(.79, 1, p) * .045; });
    } else if (key === 'moduframe') {
      // Orbit the camera around a stationary, fully assembled chair. No component
      // offsets, opacity transitions or wireframe phase are applied to this model.
      root.position.set(0, 0, 0); root.rotation.set(0, 0, 0); root.scale.setScalar(1);
      const azimuth = -.62 + orbit * Math.PI * 2;
      const elevation = .065 + Math.sin(orbit * Math.PI) * .035;
      const fitHeight = modelSize.y / (mobile ? .40 : .70);
      const fitWidth = Math.max(modelSize.x, modelSize.z) * 1.18 / (camera.aspect * (mobile ? .80 : .49));
      const distance = Math.max(fitHeight, fitWidth) / (2 * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)));
      camera.position.set(Math.sin(azimuth) * distance * Math.cos(elevation), distance * Math.sin(elevation), Math.cos(azimuth) * distance * Math.cos(elevation));
      camera.lookAt(0, 0, 0);
    } else {
      const explode = ease(.16, .48, p) * (1 - ease(.65, .95, p));
      const wire = ease(.26, .49, p) * (1 - ease(.63, .89, p));
      parts.forEach(({ object, base, offset }) => object.position.copy(base).addScaledVector(offset, explode * (key === 'the-path' ? .60 : 1)));
      solids.forEach((base, material) => { material.transparent = base.transparent || wire > .001; material.opacity = base.opacity * (1 - wire * (key === 'axispro' ? .06 : key === 'the-path' ? 0 : .22)); material.depthWrite = base.depthWrite; });
      wires.forEach(material => { material.transparent = true; material.opacity = key === 'the-path' ? .12 + wire * .06 : .05 + wire * .4; material.color.set(key === 'the-path' ? 0x47655b : 0xeeeae1); });
      const baseScale = key === 'axispro' ? 1.08 : key === 'the-path' ? .86 : 1.08;
      root.scale.setScalar(baseScale * (mobile ? key === 'simrest' ? .78 : key === 'axispro' ? .47 : .54 : 1));
      root.position.set(mobile ? 0 : key === 'the-path' ? 2.7 : 2.4, mobile ? 1.8 : 0, 0);
      root.rotation.set(key === 'axispro' ? 0 : key === 'the-path' ? .08 : .12 - ease(.7, 1, p) * 2.1, key === 'axispro' ? -.95 - orbit * .65 : key === 'the-path' ? -.46 + orbit * .95 : -.45 + orbit * Math.PI * 1.2, 0);
      camera.position.set(Math.sin(p * Math.PI) * .3, key === 'axispro' ? 4.8 : key === 'the-path' ? 6 : 4.6, mobile ? 15.5 : key === 'the-path' ? 14 : key === 'axispro' ? 15.2 : 12.4);
      camera.lookAt(0, mobile ? -.5 : 0, 0);
    }
    story.dataset.progress = p.toFixed(3);
    story.dataset.chapter = String(chapter + 1);
    progress.style.transform = `scaleX(${p})`;
    renderer.render(scene, camera);
  }
  function resize() {
    const width = holder.clientWidth, height = holder.clientHeight;
    if (!width || !height || disposed) return;
    mobile = width <= 760;
    camera.aspect = width / height;
    camera.fov = mobile ? 39 : 36;
    if (key === 'moduframe') {
      // Lens shift keeps the orbit centred in the image area beside the copy.
      camera.setViewOffset(width, height, mobile ? 0 : -width * .225, mobile ? height * .24 : height * .075, width, height);
    }
    camera.updateProjectionMatrix();
    renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 1.6, Math.sqrt(2300000 / (width * height))));
    renderer.setSize(width, height, false);
    requestRender();
  }
  function configureMotion() {
    sceneTimeline?.scrollTrigger?.kill();
    sceneTimeline?.kill();
    story.classList.toggle('scene-reduced', reduced.matches);
    chapters.hidden = reduced.matches;
    playhead.p = 0;
    if (!reduced.matches) {
      sceneTimeline = gsap.timeline({
        onUpdate: requestRender,
        scrollTrigger: {
          trigger: story, scroller, start: 'top top', end: 'bottom bottom',
          scrub: true, invalidateOnRefresh: true,
        },
      }).to(playhead, { p: 1, duration: 1, ease: 'none' })
        .addLabel('product', 0).addLabel('mechanism', .5).addLabel('details', .995);
    }
    ScrollTrigger.refresh();
    requestRender();
  }
  function jump(index) {
    const target = sceneTimeline?.scrollTrigger?.labelToScroll(['product', 'mechanism', 'details'][index]);
    if (Number.isFinite(target)) scrollProjectTo(target);
  }
  story.classList.add('scene-ready');
  story.dataset.scene = 'ready';
  fallback.hidden = true;
  configureMotion(); resize();
  const observer = new ResizeObserver(resize); observer.observe(holder);
  const visibility = new IntersectionObserver(([entry]) => {
    sceneVisible = entry.isIntersecting;
    if (sceneVisible) requestRender();
  }, {root: scroller});
  visibility.observe(story);
  scroller.addEventListener('scroll', requestRender, { passive: true, signal: controller.signal });
  document.addEventListener('visibilitychange', requestRender, { signal: controller.signal });
  reduced.addEventListener('change', configureMotion, { signal: controller.signal });
  buttons.forEach((button, index) => button.addEventListener('click', () => jump(index), { signal: controller.signal }));
  renderer.domElement.addEventListener('webglcontextlost', event => {
    event.preventDefault(); contextLost = true; cancelAnimationFrame(frame); resetCopy();
    sceneTimeline?.scrollTrigger?.kill(); sceneTimeline?.kill();
    holder.hidden = true; fallback.hidden = false; story.classList.remove('scene-ready'); chapters.hidden = true; story.dataset.scene = 'fallback';
  }, { signal: controller.signal });
  return () => {
    disposed = true; resetCopy(); cancelAnimationFrame(frame); controller.abort(); observer.disconnect(); visibility.disconnect();
    sceneTimeline?.scrollTrigger?.kill(); sceneTimeline?.kill();
    const geometries = new Set(), materials = new Set(), textures = new Set();
    environment.dispose();
    scene.traverse(object => { if (object.geometry) geometries.add(object.geometry); if (object.material) [].concat(object.material).forEach(m => materials.add(m)); });
    materials.forEach(material => { Object.values(material).forEach(value => { if (value?.isTexture) textures.add(value); }); material.dispose(); });
    geometries.forEach(geometry => geometry.dispose()); textures.forEach(texture => texture.dispose());
    renderer.dispose(); renderer.forceContextLoss(); renderer.domElement.remove(); holder.hidden = false;
  };
}

function makeRoad(root) {
  const group = new THREE.Group(); root.add(group);
  const markers = [];
  function box(width, height, depth, color, x, y, z, moving = false) {
    const object = new THREE.Mesh(new THREE.BoxGeometry(width, height, depth), new THREE.MeshStandardMaterial({ color, roughness: .95 }));
    object.position.set(x, y, z); object.receiveShadow = true; group.add(object); if (moving) markers.push({ object, z }); return object;
  }
  box(160, .12, 220, 0xa9bcad, 0, -.2, 0);
  box(8.4, .13, 220, 0xeeeae1, 0, -.1, 0);
  for (const side of [-1, 1]) {
    box(.085, .014, 220, 0x789489, side * 3.8, -.024, 0);
    box(.16, .055, 220, 0xf5f1e8, side * 4.2, 0, 0);
    for (let i = 0; i < 30; i++) {
      const z = i * 6 - 90;
      box(.1, .86, .13, 0x789489, side * 5.1, .37, z, true);
      box(.12, .14, .15, 0xeeeae1, side * 5.1, .77, z, true);
    }
    for (let i = 0; i < 18; i++) {
      const z = i * 10 - 90;
      const peak = new THREE.Mesh(new THREE.ConeGeometry(5 + (i % 4) * 1.2, 2.6 + (i % 5), 4), new THREE.MeshStandardMaterial({ color: 0x789489, roughness: 1, flatShading: true }));
      peak.position.set(side * (15 + (i % 3) * 6), .45, z); peak.rotation.y = i * .9; group.add(peak); markers.push({ object: peak, z });
    }
  }
  for (let i = 0; i < 45; i++) {
    const z = i * 4 - 90;
    box(.1, .015, 1.65, 0x789489, -1.85, -.024, z, true);
  }
  return { group, markers };
}
