import * as THREE from './vendor/three.module.js';
import { createAxisPro } from './axispro-model.js';

const BLUE = 0x0643ff;
const clamp = THREE.MathUtils.clamp;
const smooth = (a, b, value) => { const t = clamp((value - a) / (b - a), 0, 1); return t * t * (3 - 2 * t); };
const stories = [
  ['DESIGN', 'IN MOTION.', 'From a first idea to the way it works.\nScroll through my process.'],
  ['THINK IN', 'SYSTEMS.', 'Look beneath the surface.\nConnect form, mechanism and people.'],
  ['MAKE IT', 'REAL.', 'Build. Test. Refine.\nDiscover the projects behind the process.'],
];

export function initScrollStory() {
  const hero = document.querySelector('#home');
  const holder = document.querySelector('#story-scene');
  const fallback = document.querySelector('#story-fallback');
  const chapterNav = document.querySelector('.story-chapters');
  const chapterButtons = [...chapterNav.querySelectorAll('button')];
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let renderer;
  try { renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' }); }
  catch { hero.dataset.scene = 'fallback'; return; }
  renderer.setClearColor(BLUE, 1);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.4;
  holder.append(renderer.domElement);
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(BLUE);
  scene.fog = new THREE.Fog(BLUE, 15, 34);
  const camera = new THREE.PerspectiveCamera(36, 1, .1, 70);
  scene.add(new THREE.HemisphereLight(0xffffff, 0x527bff, 3.5));
  const key = new THREE.DirectionalLight(0xffffff, 5.2); key.position.set(-4, 7, 7); scene.add(key);
  const rim = new THREE.DirectionalLight(0xc5eaff, 4); rim.position.set(5, 1, -3); scene.add(rim);
  const fill = new THREE.DirectionalLight(0xffffff, 1.5); fill.position.set(0, -2, 7); scene.add(fill);
  const model = createAxisPro(THREE);
  const modelRoot = new THREE.Group(); modelRoot.add(model.group); scene.add(modelRoot);
  const bases = model.parts.map(({ object }) => object.position.clone());
  const wireMaterials = new Set(model.wireframes.map(w => w.material));
  Object.values(model.materials).forEach(material => { material.transparent = true; });
  const grid = new THREE.GridHelper(40, 40, 0xabc7ff, 0x7ca6ff);
  grid.position.y = -3.2; grid.material.transparent = true; grid.material.opacity = .28; scene.add(grid);
  let frame = 0, visible = true, lost = false, isMobile = false, activeChapter = -1;
  let width = 1, height = 1;
  const panels = [];
  const textures = [];

  function requestRender() {
    if (!frame && visible && !document.hidden && !lost) frame = requestAnimationFrame(render);
  }
  function makePanel(title, subtitle, source, position, rotation, panelWidth = 2.7) {
    const group = new THREE.Group();
    group.position.set(...position); group.rotation.set(...rotation);
    const drawing = document.createElement('canvas'); drawing.width = 1024; drawing.height = 820;
    const ctx = drawing.getContext('2d');
    ctx.fillStyle = '#0c1019'; ctx.fillRect(0, 0, 1024, 820);
    ctx.fillStyle = '#fff'; ctx.font = '500 65px Arial'; ctx.fillText(title, 54, 96);
    ctx.fillStyle = '#8eaaff'; ctx.font = '28px Arial'; ctx.fillText(subtitle, 56, 153);
    const texture = new THREE.CanvasTexture(drawing); texture.colorSpace = THREE.SRGBColorSpace;
    textures.push(texture);
    const material = new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide, transparent: true });
    const geometry = new THREE.PlaneGeometry(panelWidth, panelWidth * .8);
    group.add(new THREE.Mesh(geometry, material));
    const border = new THREE.LineSegments(new THREE.EdgesGeometry(geometry), new THREE.LineBasicMaterial({ color: 0x99bbff, transparent: true, opacity: .8 })); group.add(border);
    const image = new Image();
    image.onload = () => {
      const box = { x: 44, y: 204, w: 936, h: 566 };
      const scale = Math.max(box.w / image.width, box.h / image.height);
      ctx.save(); ctx.beginPath(); ctx.rect(box.x, box.y, box.w, box.h); ctx.clip();
      ctx.drawImage(image, box.x + (box.w - image.width * scale) / 2, box.y + (box.h - image.height * scale) / 2, image.width * scale, image.height * scale);
      ctx.restore(); texture.needsUpdate = true; requestRender();
    };
    image.src = source;
    scene.add(group); panels.push({ group, base: new THREE.Vector3(...position), material });
  }
  makePanel('JÌNG / THE PATH', 'Space for people', '/assets/projects/path-aerial.jpg', [-.45, 1.8, -3.2], [.08, .28, -.12], 2.65);
  makePanel('STREAM X', 'Form meets airflow', '/assets/projects/stream-x-wireframe.webp', [4.9, 2, -2.4], [-.08, -.38, .15], 3.1);
  makePanel('SIMREST Q2', 'Everyday interactions', '/assets/projects/simrest-bedside.jpg', [4.7, -1.35, -1.9], [.12, -.27, -.12], 2.4);

  function progress() {
    if (reduced.matches) return 0;
    const rect = hero.getBoundingClientRect();
    return clamp(-rect.top / Math.max(1, hero.offsetHeight - holder.clientHeight), 0, 1);
  }
  function render() {
    frame = 0;
    if (lost || !visible || document.hidden) return;
    const p = progress();
    const explode = smooth(.17, .48, p) * (1 - smooth(.66, .94, p));
    const orbit = smooth(0, 1, p);
    model.parts.forEach(({ object, offset }, index) => { object.position.copy(bases[index]).addScaledVector(new THREE.Vector3(...offset), explode * 1.05); });
    modelRoot.position.set(isMobile ? .4 : 1.95 - .4 * Math.sin(p * Math.PI), isMobile ? 1.1 : .05, 0);
    modelRoot.scale.setScalar(isMobile ? .6 : 1);
    modelRoot.rotation.set(.08 + Math.sin(p * Math.PI) * .10, -.45 + orbit * Math.PI * 1.4, -.12 + .18 * Math.sin(p * Math.PI));
    const wireAmount = smooth(.17, .38, p) * (1 - smooth(.58, .84, p));
    Object.values(model.materials).forEach(material => { material.opacity = 1 - wireAmount * .82; material.depthWrite = wireAmount < .6; });
    wireMaterials.forEach(material => { material.opacity = .24 + wireAmount * .7; material.color.set(wireAmount > .2 ? 0xffffff : 0x729dff); });
    camera.position.set(Math.sin(p * Math.PI) * .65, 1.0 + p * .65, (isMobile ? 14.5 : 11.6) - Math.sin(p * Math.PI) * .6);
    camera.lookAt(0, isMobile ? -.35 : .12, 0);
    panels.forEach(({ group, base, material }, index) => {
      group.visible = !isMobile;
      group.position.copy(base);
      group.position.x += Math.sin(p * Math.PI + index) * .6;
      group.position.y += Math.sin(p * Math.PI * 2 + index) * .24;
      group.position.z += p * (index === 0 ? 1.2 : -.8);
      group.rotation.y = [.28, -.38, -.27][index] + p * .35;
      material.opacity = index === 0 ? .82 : 1;
    });
    grid.rotation.y = p * .28;
    const chapter = p < .29 ? 0 : p < .72 ? 1 : 2;
    if (chapter !== activeChapter) {
      activeChapter = chapter;
      document.querySelector('#story-title-first').textContent = stories[chapter][0];
      document.querySelector('#story-title-second').textContent = stories[chapter][1];
      document.querySelector('#story-description').textContent = stories[chapter][2];
      chapterButtons.forEach((button, index) => { if (index === chapter) button.setAttribute('aria-current', 'step'); else button.removeAttribute('aria-current'); });
    }
    document.querySelector('#story-progress-fill').style.transform = `scaleX(${p})`;
    hero.dataset.progress = p.toFixed(3);
    hero.dataset.chapter = String(chapter + 1);
    renderer.render(scene, camera);
  }
  function resize() {
    width = holder.clientWidth; height = holder.clientHeight;
    isMobile = width < 760;
    camera.aspect = width / height;
    camera.fov = isMobile ? 40 : 36;
    camera.updateProjectionMatrix();
    renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 1.6, Math.sqrt(2300000 / Math.max(1, width * height))));
    renderer.setSize(width, height, false);
    requestRender();
  }
  function configureMotion() {
    hero.classList.toggle('story-reduced', reduced.matches);
    chapterNav.hidden = reduced.matches;
    requestAnimationFrame(resize);
  }
  hero.classList.add('story-ready');
  hero.dataset.scene = 'ready';
  fallback.hidden = true;
  configureMotion();
  resize();
  window.addEventListener('scroll', requestRender, { passive: true });
  new ResizeObserver(resize).observe(holder);
  new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; if (visible) requestRender(); }, { threshold: 0 }).observe(hero);
  document.addEventListener('visibilitychange', requestRender);
  reduced.addEventListener('change', configureMotion);
  chapterButtons.forEach((button, index) => button.addEventListener('click', () => {
    const start = window.scrollY + hero.getBoundingClientRect().top;
    window.scrollTo({ top: start + [0, .5, .99][index] * (hero.offsetHeight - holder.clientHeight), behavior: reduced.matches ? 'instant' : 'smooth' });
  }));
  renderer.domElement.addEventListener('webglcontextlost', event => {
    event.preventDefault(); lost = true; cancelAnimationFrame(frame);
    holder.hidden = true; fallback.hidden = false; hero.classList.remove('story-ready'); chapterNav.hidden = true; hero.dataset.scene = 'fallback';
  });
}
