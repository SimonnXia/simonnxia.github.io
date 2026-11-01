import { gsap } from './motion.js';
import { createBookWheelInput, paperStripTransforms } from './book-input.js';

// Real spread controls stay connected, preserving focus when a project closes.
export function initProjectGallery() {
  const book = document.querySelector('#project-book');
  if (!book) return;
  const spreads = [...book.querySelectorAll('.book-spread')];
  const previous = document.querySelector('#project-prev'), next = document.querySelector('#project-next');
  const status = document.querySelector('#book-status');
  const tabs = [...document.querySelectorAll('[data-book-page]')];
  const reduced = matchMedia('(prefers-reduced-motion: reduce)'), compact = matchMedia('(max-width: 780px)');
  const abort = new AbortController();
  const on = (node, type, fn, options = {}) => node.addEventListener(type, fn, { ...options, signal: abort.signal });
  let active = 0, turn = null, drag = null, tween = null, suppressUntil = 0;
  function show(index) {
    spreads.forEach((spread, i) => {
      spread.hidden = i !== index; spread.inert = i !== index;
      spread.setAttribute('aria-hidden', String(i !== index));
    });
  }
  function update() {
    book.dataset.page = String(active + 1);
    previous.disabled = active === 0; next.disabled = active === spreads.length - 1;
    status.textContent = `${String(active * 2 + 1).padStart(2, '0')} — ${String(active * 2 + 2).padStart(2, '0')} / ${String(spreads.length * 2).padStart(2, '0')} · ${spreads[active].dataset.title}`;
    tabs.forEach((tab, i) => i === active ? tab.setAttribute('aria-current', 'page') : tab.removeAttribute('aria-current'));
  }
  function clonePage(page) {
    const clone = page.cloneNode(true);
    for (const element of [clone, ...clone.querySelectorAll('*')]) {
      for (const attribute of ['id','data-project','aria-labelledby']) element.removeAttribute(attribute);
    }
    clone.inert = true; clone.setAttribute('aria-hidden', 'true');
    return clone;
  }
  function begin(target) {
    if (turn || target === active || target < 0 || target >= spreads.length) return false;
    if (spreads[active].contains(document.activeElement)) book.focus({ preventScroll: true });
    const direction = target > active ? 1 : -1;
    if (reduced.matches || compact.matches) { turn = { target, direction, progress: 0, simple: true }; return true; }
    const old = spreads[active], incoming = spreads[target];
    const layer = document.createElement('div');
    layer.className = 'book-turn-layer'; layer.setAttribute('aria-hidden', 'true'); layer.inert = true;
    const still = clonePage(old.querySelector(direction === 1 ? '.book-left' : '.book-right'));
    still.classList.add('book-still'); still.style.left = direction === 1 ? '0' : '50%';
    const leaf = document.createElement('div'); leaf.className = 'book-leaf';
    const width = book.clientWidth / 2, height = book.clientHeight, count = 14, sliceWidth = width / count;
    const frontPage = old.querySelector(direction === 1 ? '.book-right' : '.book-left');
    const backPage = incoming.querySelector(direction === 1 ? '.book-left' : '.book-right');
    const strips = Array.from({ length: count }, (_, index) => {
      const strip = document.createElement('div'); strip.className = 'book-strip';
      strip.style.width = `${sliceWidth + .6}px`;
      strip.style.left = direction === 1 ? '0' : `${-sliceWidth}px`;
      strip.style.transformOrigin = direction === 1 ? 'left center' : 'right center';
      const frontIndex = direction === 1 ? index : count - index - 1;
      for (const [page, part, backFace] of [[frontPage, frontIndex, false], [backPage, count - frontIndex - 1, true]]) {
        const face = document.createElement('div'); face.className = `book-face ${backFace ? 'book-back' : 'book-front'}`;
        const clone = clonePage(page);
        Object.assign(clone.style, { position: 'absolute', width: `${width}px`, height: `${height}px`, left: `${-part * sliceWidth}px`, top: '0' });
        // Decorative faces must have the same loaded photos as the original.
        clone.querySelectorAll('img').forEach(image => { image.loading = 'eager'; });
        face.append(clone); strip.append(face);
      }
      leaf.append(strip); return strip;
    });
    layer.append(still, leaf);
    show(target); incoming.inert = true; book.append(layer); book.classList.add('is-turning');
    turn = { target, direction, progress: 0, layer, leaf, strips, width, simple: false }; draw(); return true;
  }
  function draw() {
    if (!turn || turn.simple) return;
    paperStripTransforms(turn.progress, turn.direction, turn.width, turn.strips.length).forEach((pose, index) => {
      const strip = turn.strips[index];
      strip.style.transform = `translate3d(${pose.x}px,0,${pose.z}px) rotateY(${pose.angle}deg)`;
      strip.style.setProperty('--page-shade', pose.shade.toFixed(3));
    });
    turn.layer.style.setProperty('--cast-shadow', String(Math.sin(turn.progress * Math.PI) * .18));
  }
  function settle(commit) {
    if (!turn) return;
    tween?.kill(); if (commit) active = turn.target; turn.layer?.remove();
    turn = null; tween = null; book.classList.remove('is-turning', 'is-dragging'); show(active); update();
  }
  function animate(commit = true) {
    if (!turn) return;
    if (turn.simple) { settle(commit); return; }
    tween?.kill(); tween = gsap.to(turn, { progress: commit ? 1 : 0,
      duration: Math.max(.3, Math.abs((commit ? 1 : 0) - turn.progress) * 1.05),
      ease: 'power2.inOut', onUpdate: draw, onComplete: () => settle(commit) });
  }
  function go(target) { if (!drag && !turn && begin(target)) animate(); }
  const wheelInput = createBookWheelInput({
    start: direction => begin(active + direction),
    move: progress => { if (turn) { turn.progress = progress; draw(); } },
    release: commit => animate(commit),
    busy: () => Boolean(drag || turn),
    extent: () => book.clientWidth,
  });
  on(book, 'wheel', event => {
    if (wheelInput.handle(event)) event.preventDefault();
  }, { passive: false });
  on(previous, 'click', () => go(active - 1)); on(next, 'click', () => go(active + 1));
  tabs.forEach(tab => on(tab, 'click', () => go(Number(tab.dataset.bookPage))));
  on(book, 'keydown', event => {
    if (event.altKey || event.ctrlKey || event.metaKey || event.target.closest('input,textarea,select')) return;
    const target = { ArrowLeft: active - 1, ArrowRight: active + 1, Home: 0, End: spreads.length - 1 }[event.key];
    if (target === undefined) return; event.preventDefault(); go(target);
  });
  on(book, 'dragstart', event => event.preventDefault());
  on(book, 'pointerdown', event => {
    if (event.button !== 0 || turn || event.target.closest('button,a,input,select,textarea')) return;
    drag = { id: event.pointerId, x: event.clientX, y: event.clientY, started: false };
  });
  on(book, 'pointermove', event => {
    if (!drag || drag.id !== event.pointerId) return;
    const dx = event.clientX - drag.x, dy = event.clientY - drag.y;
    if (!drag.started) {
      if (Math.abs(dy) > 12 && Math.abs(dy) > Math.abs(dx)) { drag = null; return; }
      if (Math.abs(dx) < 9 || Math.abs(dx) < Math.abs(dy)) return;
      if (!begin(active + (dx < 0 ? 1 : -1))) { drag = null; return; }
      drag.started = true; book.setPointerCapture(event.pointerId); book.classList.add('is-dragging');
    }
    turn.progress = Math.max(0, Math.min(1, -turn.direction * dx / (book.clientWidth * (compact.matches ? .6 : .5))));
    draw(); event.preventDefault();
  });
  function endDrag(cancelled = false) {
    if (!drag) return;
    const ended = drag; drag = null;
    if (book.hasPointerCapture(ended.id)) book.releasePointerCapture(ended.id);
    if (!ended.started) return;
    suppressUntil = performance.now() + 160; book.classList.remove('is-dragging');
    animate(!cancelled && turn.progress > .18);
  }
  on(book, 'pointerup', () => endDrag()); on(book, 'pointercancel', () => endDrag(true));
  on(book, 'lostpointercapture', () => { if (drag) endDrag(true); });
  on(book, 'pointerleave', () => { if (drag && !drag.started) drag = null; });
  on(book, 'click', event => {
    if (performance.now() < suppressUntil && event.detail !== 0) { event.preventDefault(); event.stopImmediatePropagation(); }
  }, { capture: true });
  const reset = () => { wheelInput.reset(); endDrag(true); settle(false); };
  on(window, 'resize', reset); on(reduced, 'change', reset); on(compact, 'change', reset);
  on(window, 'pagehide', event => { if (!event.persisted) { reset(); abort.abort(); } });
  show(active); update();
}
