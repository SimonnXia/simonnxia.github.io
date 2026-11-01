// Horizontal wheel gestures are independent of the page's vertical smooth scroll.
export function createBookWheelInput({ start, move, release, busy, extent, clock = () => performance.now(), schedule = setTimeout, cancel = clearTimeout }) {
  let session = null, timer;
  const clear = () => { cancel(timer); timer = undefined; };
  function arm(delay) {
    clear();
    timer = schedule(() => {
      if (session?.mode === 'tracking') finish();
      else session = null;
    }, delay);
  }
  function finish() {
    if (session?.mode !== 'tracking') return;
    const { progress, velocity, last } = session;
    const commit = progress >= .42 || (progress > .12 && velocity > .5 && clock() - last < 230);
    session = { mode: 'tail' };
    release(commit);
    arm(220);
  }
  return {
    handle(event) {
      // Browser pinch-to-zoom remains a browser gesture.
      if (event.ctrlKey) return false;
      const scale = event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? extent() : 1;
      let x = event.deltaX * scale, y = event.deltaY * scale;
      if (event.shiftKey && Math.abs(x) < 1) { x = y; y = 0; }
      if (Math.abs(x) < 1 || Math.abs(x) <= Math.abs(y) * 1.15) {
        if (session?.mode === 'tracking' && Math.abs(y) > Math.abs(x) * 1.4) finish();
        return false;
      }
      // A decaying trackpad tail must never start a second page turn.
      if (session?.mode === 'tail') { arm(220); return true; }
      if (!session) {
        const direction = Math.sign(x);
        if (busy() || !start(direction)) { session = { mode: 'tail' }; arm(220); return true; }
        session = { mode: 'tracking', direction, progress: 0, velocity: 0, last: clock() - 16 };
      }
      const now = clock(), dt = Math.max(8, Math.min(80, now - session.last));
      const forward = x * session.direction;
      session.velocity = session.velocity * .35 + forward / dt * .65;
      session.progress = Math.max(0, Math.min(1, session.progress + forward / Math.max(180, extent() * .46)));
      session.last = now;
      move(session.progress);
      if (session.progress >= 1) finish();
      else arm(180);
      return true;
    },
    reset() { clear(); session = null; },
  };
}

// Integrate a flexible sheet from its bound edge. Length stays constant and
// both endpoints are exactly flat; only the middle of the turn is curved.
export function paperStripTransforms(progress, direction, width, count = 14) {
  const p = Math.max(0, Math.min(1, progress));
  const segment = width / count, bend = Math.sin(p * Math.PI) * .62;
  let x = 0, z = 0;
  return Array.from({ length: count }, (_, index) => {
    const s = (index + .5) / count;
    const angle = -direction * (p * Math.PI + bend * (Math.sin(s * Math.PI / 2) - .35));
    const transform = { x, z, angle: angle * 180 / Math.PI, shade: Math.abs(Math.sin(angle)) * .19 };
    x += direction * segment * Math.cos(angle);
    z -= direction * segment * Math.sin(angle);
    return transform;
  });
}
