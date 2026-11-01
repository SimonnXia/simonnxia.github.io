// Original implementation of the observed Hover Ink interaction.
// A cached text distance field gives the revealed letters their rounded surface.
const vertexSource = `
attribute vec2 a_position;
void main() { gl_Position = vec4(a_position, 0.0, 1.0); }
`;
const fragmentSource = `
precision highp float;
uniform vec2 u_resolution;
uniform vec2 u_size;
uniform sampler2D u_text;
uniform float u_time;
uniform float u_font;
uniform vec4 u_trail[28];

float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float noise(vec2 p) {
  vec2 i = floor(p), f = fract(p); f = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.,0.)), f.x), mix(hash(i + vec2(0.,1.)), hash(i + 1.), f.x), f.y);
}
float textDistance(vec2 p) {
  if (p.x < 0. || p.y < 0. || p.x > u_size.x || p.y > u_size.y) return -64.;
  return (texture2D(u_text, p / u_size).r - .5) * 128.;
}
void main() {
  vec2 p = vec2(gl_FragCoord.x / u_resolution.x, 1. - gl_FragCoord.y / u_resolution.y) * u_size;
  float field = 0.;
  for (int i = 0; i < 28; i++) {
    vec4 t = u_trail[i];
    vec2 delta = p - t.xy;
    delta.x *= .94;
    float d = length(delta);
    float influence = t.z * t.z / max(dot(delta,delta), 1.);
    field += influence * influence;
  }
  float rough = (noise(p * .043 + u_time * .25) - .5) * .17 + (noise(p * .17) - .5) * .055;
  float ink = smoothstep(.80, .90, field + rough);
  if (ink < .001) { gl_FragColor = vec4(0.); return; }
  float strength = smoothstep(.8, 2.2, field);
  vec2 warp = vec2(sin(p.y * .021 + p.x * .008 + u_time * 1.3), sin(p.x * .018 + u_time * .7));
  vec2 q = p + warp * u_font * .027 * strength;
  float expand = u_font * .025;
  float d = textDistance(q) + expand;
  float radius = u_font * .092;
  float slope = 1. - clamp(d / radius, 0., 1.);
  float dx = (textDistance(q + vec2(4.,0.)) - textDistance(q - vec2(4.,0.))) * .125;
  float dy = (textDistance(q + vec2(0.,4.)) - textDistance(q - vec2(0.,4.))) * .125;
  vec3 n = normalize(vec3(-dx * slope * 2.6, -dy * slope * 2.6, .45 + (1. - slope) * .6));
  float bend = n.x * 2.1 + n.y * .65;
  float stripe = sin(bend * 3. + p.x * .009 + sin(p.y * .012) * .8);
  float fine = sin(bend * 8. + p.x * .012);
  float pearlMix = smoothstep(.25, .65, p.x / u_size.x + sin(u_time * .35) * .1);
  vec3 lime = vec3(.66, .80, .055);
  vec3 pearl = .76 + .15 * cos(vec3(0., 2.1, 4.2) + bend * 3.5 + p.x * .008 + u_time * .12);
  vec3 base = mix(lime, pearl, pearlMix);
  float lighting = .44 + .48 * max(0., dot(n, normalize(vec3(-.5,-.7,1.))));
  vec3 color = base * (lighting + stripe * .18);
  color += vec3(.96, .98, .85) * pow(max(0., stripe), 14.) * .7;
  color += vec3(.55, .5, .65) * pow(max(0., fine), 18.) * .08 * pearlMix;
  float rim = 1. - smoothstep(1., 3.2, d);
  color = mix(color, vec3(.94,.95,.86), rim * .82);
  float letter = smoothstep(0., 1.2, d);
  vec3 inkColor = vec3(.018, .022, .016);
  gl_FragColor = vec4(mix(inkColor, color, letter), ink);
}
`;

function compile(gl, type, source) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const message = gl.getShaderInfoLog(shader);
    gl.deleteShader(shader);
    throw new Error(message);
  }
  return shader;
}

// Two chamfer sweeps produce a compact signed distance field from the text mask.
function distances(alpha, width, height, inside) {
  const output = new Float32Array(width * height);
  for (let i = 0; i < output.length; i++) output[i] = (alpha[i * 4 + 3] > 127) === inside ? 0 : 1e4;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = y * width + x;
      let d = output[i];
      if (x) d = Math.min(d, output[i - 1] + 1);
      if (y) {
        d = Math.min(d, output[i - width] + 1);
        if (x) d = Math.min(d, output[i - width - 1] + Math.SQRT2);
        if (x + 1 < width) d = Math.min(d, output[i - width + 1] + Math.SQRT2);
      }
      output[i] = d;
    }
  }
  for (let y = height - 1; y >= 0; y--) {
    for (let x = width - 1; x >= 0; x--) {
      const i = y * width + x;
      let d = output[i];
      if (x + 1 < width) d = Math.min(d, output[i + 1] + 1);
      if (y + 1 < height) {
        d = Math.min(d, output[i + width] + 1);
        if (x) d = Math.min(d, output[i + width - 1] + Math.SQRT2);
        if (x + 1 < width) d = Math.min(d, output[i + width + 1] + Math.SQRT2);
      }
      output[i] = d;
    }
  }
  return output;
}

export async function initInkHero() {
  const hero = document.querySelector('#home');
  const heading = document.querySelector('#hero-title');
  const canvas = document.querySelector('#ink-canvas');
  const toggle = document.querySelector('#motion-toggle');
  const hint = document.querySelector('#ink-hint');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const coarse = matchMedia('(pointer: coarse)');
  const gl = canvas.getContext('webgl', { alpha: true, antialias: false, premultipliedAlpha: false, depth: false, stencil: false });
  if (!gl) return;
  const program = gl.createProgram();
  const shaders = [compile(gl, gl.VERTEX_SHADER, vertexSource), compile(gl, gl.FRAGMENT_SHADER, fragmentSource)];
  shaders.forEach(shader => gl.attachShader(program, shader));
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(program));
  shaders.forEach(shader => gl.deleteShader(shader));
  gl.useProgram(program);
  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, -1,1, 1,-1, 1,1]), gl.STATIC_DRAW);
  const attribute = gl.getAttribLocation(program, 'a_position');
  gl.enableVertexAttribArray(attribute);
  gl.vertexAttribPointer(attribute, 2, gl.FLOAT, false, 0, 0);
  const uniform = Object.fromEntries(['resolution', 'size', 'time', 'font', 'trail', 'text'].map(key => [key, gl.getUniformLocation(program, `u_${key}`)]));
  const texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.uniform1i(uniform.text, 0);
  const samples = [];
  const trailData = new Float32Array(28 * 4);
  const mask = document.createElement('canvas');
  const ctx = mask.getContext('2d', { willReadFrequently: true });
  const maxTextureSize = gl.getParameter(gl.MAX_TEXTURE_SIZE);
  let width = 0, height = 0, fontSize = 200, frame = 0, resizeFrame = 0;
  let paused = reduced.matches, visible = true, lost = false, lastPoint = null;
  let time = 0, lastFrame = 0;

  function clear() { gl.clearColor(0, 0, 0, 0); gl.clear(gl.COLOR_BUFFER_BIT); }
  function updateLabel() {
    toggle.setAttribute('aria-label', paused ? 'Play ink animation' : 'Pause ink animation');
    toggle.setAttribute('aria-pressed', String(!paused));
    toggle.querySelector('span').textContent = paused ? '▷' : 'Ⅱ';
    hero.dataset.inkMotion = paused ? 'paused' : 'enabled';
    hint.hidden = paused;
  }
  function stop() {
    cancelAnimationFrame(frame); frame = 0; lastFrame = 0; samples.length = 0; lastPoint = null;
    if (!lost) clear();
  }
  function render(timestamp) {
    frame = 0;
    if (paused || !visible || document.hidden || lost) return;
    const delta = Math.min((timestamp - (lastFrame || timestamp)) / 1000, .05);
    lastFrame = timestamp;
    time += delta;
    trailData.fill(0);
    for (let i = samples.length - 1; i >= 0; i--) {
      samples[i].age += delta;
      if (samples[i].age >= samples[i].life) samples.splice(i, 1);
    }
    samples.forEach((sample, i) => {
      const life = 1 - sample.age / sample.life;
      trailData[i * 4] = sample.x + Math.sin(sample.seed + sample.age * 3) * sample.age * 9;
      trailData[i * 4 + 1] = sample.y + sample.age * sample.drift;
      trailData[i * 4 + 2] = sample.radius * Math.pow(life, .68);
    });
    gl.uniform4fv(uniform.trail, trailData);
    gl.uniform1f(uniform.time, time);
    gl.drawArrays(gl.TRIANGLES, 0, 6);
    if (samples.length) frame = requestAnimationFrame(render);
    else { clear(); lastFrame = 0; }
  }
  function wake() {
    if (!frame && !paused && visible && !document.hidden && !lost) frame = requestAnimationFrame(render);
  }
  function addPoint(x, y, radius, drop = false) {
    if (samples.length >= 28) samples.shift();
    samples.push({ x, y, radius, age: 0, life: drop ? 1.15 : 1.3, seed: x * .013, drift: drop ? 30 : 7 });
  }
  function pointer(event) {
    if (paused || !visible || lost || event.target.closest('a, button')) return;
    const bounds = hero.getBoundingClientRect();
    const x = event.clientX - bounds.left, y = event.clientY - bounds.top;
    const now = performance.now();
    const fresh = !lastPoint || now - lastPoint.time > 180;
    if (fresh) lastPoint = { x, y, time: now };
    const distance = Math.hypot(x - lastPoint.x, y - lastPoint.y);
    if (!fresh && event.type !== 'pointerdown' && distance < 3 && now - lastPoint.time < 30) return;
    const radius = Math.max(25, Math.min(94, fontSize * .32));
    const steps = Math.min(7, Math.max(1, Math.ceil(distance / (radius * .36))));
    for (let i = 1; i <= steps; i++) {
      const t = i / steps;
      addPoint(lastPoint.x + (x - lastPoint.x) * t, lastPoint.y + (y - lastPoint.y) * t, radius * (.82 + .18 * Math.sin(time * 4 + x * .01)));
    }
    if (distance > radius * .6) addPoint(x - radius * .4, y + radius * 1.25, radius * .18, true);
    lastPoint = { x, y, time: now };
    wake();
  }
  function resize() {
    if (lost) return;
    const bounds = hero.getBoundingClientRect();
    const rect = heading.getBoundingClientRect();
    width = Math.ceil(bounds.width); height = Math.ceil(bounds.height);
    const dpr = Math.min(devicePixelRatio || 1, 1.5, Math.sqrt(2300000 / (width * height)));
    canvas.width = Math.round(width * dpr); canvas.height = Math.round(height * dpr);
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.uniform2f(uniform.resolution, canvas.width, canvas.height);
    gl.uniform2f(uniform.size, width, height);
    const style = getComputedStyle(heading);
    fontSize = parseFloat(style.fontSize);
    gl.uniform1f(uniform.font, fontSize);
    // Bound CPU work and texture memory even on ultra-wide displays.
    const maskScale = Math.min(1, maxTextureSize / width, maxTextureSize / height, Math.sqrt(1500000 / (width * height)));
    const maskWidth = Math.max(1, Math.round(width * maskScale));
    const maskHeight = Math.max(1, Math.round(height * maskScale));
    mask.width = maskWidth; mask.height = maskHeight;
    ctx.scale(maskWidth / width, maskHeight / height);
    ctx.font = `${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;
    ctx.letterSpacing = style.letterSpacing;
    ctx.fillStyle = '#fff';
    const metrics = ctx.measureText(heading.textContent);
    const ascent = metrics.fontBoundingBoxAscent || fontSize * .9;
    const descent = metrics.fontBoundingBoxDescent || fontSize * .21;
    const baseline = rect.top - bounds.top + (rect.height - ascent - descent) / 2 + ascent;
    ctx.fillText(heading.textContent, rect.left - bounds.left, baseline);
    const pixels = ctx.getImageData(0, 0, maskWidth, maskHeight).data;
    const toInk = distances(pixels, maskWidth, maskHeight, true);
    const toPaper = distances(pixels, maskWidth, maskHeight, false);
    const sdf = new Uint8Array(maskWidth * maskHeight);
    for (let i = 0; i < sdf.length; i++) sdf[i] = Math.max(0, Math.min(255, Math.round(127.5 + (toPaper[i] - toInk[i]) * 255 / (128 * maskScale))));
    gl.pixelStorei(gl.UNPACK_ALIGNMENT, 1);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.LUMINANCE, maskWidth, maskHeight, 0, gl.LUMINANCE, gl.UNSIGNED_BYTE, sdf);
    stop();
    canvas.dataset.renderer = 'ready';
  }

  await document.fonts.ready;
  resize();
  toggle.hidden = false;
  hint.lastChild.textContent = coarse.matches ? ' Touch to make a mark.' : ' Move your cursor. Make a mark.';
  updateLabel();
  hero.addEventListener('pointermove', pointer, { passive: true });
  hero.addEventListener('pointerdown', pointer, { passive: true });
  hero.addEventListener('pointerleave', () => { lastPoint = null; });
  toggle.addEventListener('click', () => { paused = !paused; stop(); updateLabel(); });
  reduced.addEventListener('change', event => { paused = event.matches; stop(); updateLabel(); });
  new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; if (!visible) stop(); }, { threshold: 0 }).observe(hero);
  document.addEventListener('visibilitychange', () => { if (document.hidden) stop(); });
  const observer = new ResizeObserver(() => { cancelAnimationFrame(resizeFrame); resizeFrame = requestAnimationFrame(resize); });
  observer.observe(hero);
  canvas.addEventListener('webglcontextlost', event => {
    event.preventDefault(); lost = true; stop(); toggle.hidden = true; hint.hidden = true; canvas.style.opacity = '0';
  });
  window.addEventListener('pagehide', stop);
}
