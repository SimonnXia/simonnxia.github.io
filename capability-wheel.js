import { gsap } from './motion.js';

export function initCapabilityWheel() {
  const toolkit = document.querySelector('#capability-toolkit');
  if (!toolkit) return;
  const wheel = toolkit.querySelector('.capability-wheel');
  const buttons = [...wheel.querySelectorAll('.tool-item')];
  const slots = buttons.map(button => button.closest('.wheel-slot'));
  const controls = toolkit.querySelector('.wheel-controls');
  const category = wheel.querySelector('.wheel-category');
  const title = wheel.querySelector('.wheel-tool-title');
  const description = wheel.querySelector('.wheel-description');
  const mobileDescription = toolkit.querySelector('.wheel-mobile-description');
  const hub = wheel.querySelector('.wheel-hub');
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const step = 360 / buttons.length;
  let selected = buttons.findIndex(button => button.getAttribute('aria-pressed') === 'true');
  const state = { rotation: -selected * step };
  let motion;
  let drag;
  let suppressClickUntil = 0;
  const wrap = value => ((value % buttons.length) + buttons.length) % buttons.length;
  const shortestAngle = value => ((value + 180) % 360 + 360) % 360 - 180;

  function render() {
    slots.forEach((slot, index) => {
      const angle = (index * step + state.rotation - 90) * Math.PI / 180;
      slot.style.setProperty('--x', `${50 + Math.cos(angle) * 38}%`);
      slot.style.setProperty('--y', `${50 + Math.sin(angle) * 38}%`);
    });
  }
  function showTool(index) {
    const next = wrap(index);
    if (next === selected) return;
    selected = next;
    const button = buttons[selected];
    buttons.forEach((item, i) => item.setAttribute('aria-pressed', String(i === selected)));
    category.textContent = button.dataset.category;
    title.textContent = button.querySelector('.tool-name').textContent;
    description.textContent = button.dataset.description;
    mobileDescription.textContent = button.dataset.description;
  }
  function showNearestTool() { showTool(-Math.round(state.rotation / step)); }
  function renderFreeRotation() { render(); showNearestTool(); }
  function stopMotion() {
    motion?.kill();
    motion = null;
    hub.setAttribute('aria-live', 'polite');
  }
  function rotateTo(rotation) {
    stopMotion();
    if (reducedMotion.matches) { state.rotation = rotation; render(); }
    else motion = gsap.to(state, { rotation, duration: .65, ease: 'power3.out', onUpdate: render });
  }
  function choose(index) {
    const next = wrap(index);
    showTool(next);
    rotateTo(state.rotation + shortestAngle(-next * step - state.rotation));
  }
  buttons.forEach((button, index) => {
    button.addEventListener('click', event => {
      if (event.detail !== 0 && performance.now() < suppressClickUntil) { event.preventDefault(); return; }
      choose(index);
    });
  });
  toolkit.querySelectorAll('[data-wheel-step]').forEach(button => {
    button.addEventListener('click', () => choose(selected + Number(button.dataset.wheelStep)));
  });
  // Arrow keys rotate from any software button; Tab still visits every tool.
  wheel.addEventListener('keydown', event => {
    if (!event.target.closest('.tool-item') || !['ArrowRight', 'ArrowLeft', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    const focused = buttons.indexOf(event.target.closest('.tool-item'));
    choose(event.key === 'Home' ? 0 : event.key === 'End' ? buttons.length - 1 : focused + (event.key === 'ArrowRight' ? 1 : -1));
    buttons[selected].focus({ preventScroll: true });
  });
  function angleAt(event, rect) {
    return Math.atan2(event.clientY - rect.top - rect.height / 2, event.clientX - rect.left - rect.width / 2) * 180 / Math.PI;
  }
  function distanceFromCentre(event, rect) {
    return Math.hypot(event.clientX - rect.left - rect.width / 2, event.clientY - rect.top - rect.height / 2);
  }
  wheel.addEventListener('pointerdown', event => {
    if (!event.isPrimary || event.button !== 0) return;
    stopMotion();
    showNearestTool();
    const rect = wheel.getBoundingClientRect();
    drag = {
      id: event.pointerId, x: event.clientX, y: event.clientY, lastX: event.clientX,
      rect, lastAngle: angleAt(event, rect), lastTime: performance.now(), velocity: 0,
      moved: false, touch: event.pointerType === 'touch', needsRebase: false,
      // The hub behaves like a swipe surface; the rim behaves like a physical dial.
      swipe: event.pointerType === 'touch' || distanceFromCentre(event, rect) < rect.width * .28,
    };
  });
  wheel.addEventListener('pointermove', event => {
    if (!drag || drag.id !== event.pointerId) return;
    const dx = event.clientX - drag.x;
    const dy = event.clientY - drag.y;
    if (!drag.moved) {
      // Let vertical touch gestures continue scrolling the portfolio.
      if (drag.touch && Math.abs(dy) > 8 && Math.abs(dy) > Math.abs(dx)) { drag = null; return; }
      if (Math.hypot(dx, dy) < 4) return;
      drag.moved = true;
      wheel.setPointerCapture(event.pointerId);
      wheel.classList.add('is-dragging');
      // The visible details follow rotation without announcing every passing tool.
      hub.setAttribute('aria-live', 'off');
    }
    const now = performance.now();
    let delta = 0;
    if (drag.swipe) delta = (event.clientX - drag.lastX) / drag.rect.width * 360;
    else if (distanceFromCentre(event, drag.rect) < drag.rect.width * .12) {
      // Crossing the centre cannot flip atan2 by 180 degrees.
      drag.needsRebase = true;
      drag.velocity = 0;
    } else {
      const angle = angleAt(event, drag.rect);
      if (!drag.needsRebase) delta = shortestAngle(angle - drag.lastAngle);
      drag.lastAngle = angle;
      drag.needsRebase = false;
    }
    const elapsed = Math.max(8, now - drag.lastTime);
    const velocity = Math.max(-1, Math.min(1, delta / elapsed));
    drag.velocity = elapsed > 100 ? velocity : drag.velocity * .55 + velocity * .45;
    drag.lastTime = now;
    drag.lastX = event.clientX;
    state.rotation += delta;
    renderFreeRotation();
  });
  function finishDrag(event) {
    if (!drag || drag.id !== event.pointerId) return;
    const released = drag;
    drag = null;
    wheel.classList.remove('is-dragging');
    if (wheel.hasPointerCapture(event.pointerId)) wheel.releasePointerCapture(event.pointerId);
    if (released.moved) {
      suppressClickUntil = performance.now() + 350;
      const velocity = performance.now() - released.lastTime < 100 ? released.velocity : 0;
      if (event.type === 'pointerup' && !reducedMotion.matches && Math.abs(velocity) > .018) {
        // Power3-out starts at the release velocity and settles at a free angle.
        motion = gsap.to(state, {
          rotation: state.rotation + velocity * 220,
          duration: .88, ease: 'power3.out', onUpdate: renderFreeRotation,
          onComplete: () => { motion = null; hub.setAttribute('aria-live', 'polite'); },
        });
      } else hub.setAttribute('aria-live', 'polite');
    }
    showNearestTool();
  }
  wheel.addEventListener('pointerup', finishDrag);
  wheel.addEventListener('pointercancel', finishDrag);
  wheel.addEventListener('lostpointercapture', finishDrag);
  wheel.addEventListener('pointerleave', event => { if (drag && !drag.moved) finishDrag(event); });
  wheel.addEventListener('dragstart', event => event.preventDefault());
  function cancelInteraction() {
    stopMotion();
    if (drag) finishDrag({ pointerId: drag.id, type: 'pointercancel' });
    showNearestTool();
  }
  window.addEventListener('blur', cancelInteraction);
  window.addEventListener('resize', cancelInteraction);
  document.addEventListener('visibilitychange', () => { if (document.hidden) cancelInteraction(); });
  reducedMotion.addEventListener('change', () => {
    if (reducedMotion.matches) { stopMotion(); showNearestTool(); }
  });
  controls.hidden = false;
  render();
}
