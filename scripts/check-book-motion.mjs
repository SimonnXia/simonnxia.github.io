import assert from 'node:assert/strict';
import { createBookWheelInput, paperStripTransforms } from '../book-input.js';

function rig(active = 0) {
  let time = 0, timerId = 0;
  const timers = new Map(), starts = [], moves = [], releases = [];
  const input = createBookWheelInput({
    start: direction => { if (active + direction < 0 || active + direction > 3) return false; starts.push(direction); return true; },
    move: p => moves.push(p), release: commit => { releases.push(commit); if (commit) active += starts.at(-1); },
    busy: () => false, extent: () => 1000, clock: () => time,
    schedule: (fn, delay) => { const id = ++timerId; timers.set(id, {fn, at:time + delay}); return id; },
    cancel: id => timers.delete(id),
  });
  const advance = ms => {
    const end = time + ms;
    for (;;) {
      const next = [...timers].sort((a,b) => a[1].at - b[1].at)[0];
      if (!next || next[1].at > end) break;
      time = next[1].at; timers.delete(next[0]); next[1].fn();
    }
    time = end;
  };
  const wheel = (x, y=0, extra={}) => input.handle({deltaX:x,deltaY:y,deltaMode:0,ctrlKey:false,shiftKey:false,...extra});
  return { input, starts, moves, releases, advance, wheel };
}
let r = rig();
assert.equal(r.wheel(0,100),false,'Vertical scroll must remain native/Lenis');
assert.equal(r.wheel(8,30),false,'Diagonal vertical intention must not turn a page');
assert.equal(r.wheel(30,0,{ctrlKey:true}),false,'Pinch zoom must pass through');
assert.deepEqual(r.starts,[]);
assert.equal(r.wheel(35),true); r.advance(30); r.wheel(35);
assert(r.moves[1] > r.moves[0], 'Finger movement must continuously advance the sheet');
r.advance(30); r.wheel(-55);
assert(r.moves[2] < r.moves[1],'Reverse movement must unwind the sheet');
r.advance(181); assert.deepEqual(r.releases,[false],'An unfinished reversed gesture must cancel');

r=rig(); r.wheel(240); r.advance(181);
assert.deepEqual(r.releases,[true]);
for (let i=0;i<8;i++) { r.wheel(15); r.advance(80); }
assert.equal(r.starts.length,1,'Momentum tails must not skip multiple projects');
r.advance(221); r.wheel(-100); assert.deepEqual(r.starts,[1,-1]);
r.input.reset(); r.advance(1000); assert.equal(r.releases.length,1,'Reset must clear pending input');

r=rig(3); assert.equal(r.wheel(100),true); assert.deepEqual(r.starts,[],'Do not turn past the final spread');
r=rig(); r.wheel(1000); assert.deepEqual(r.releases,[true],'A full gesture completes exactly one spread');
r.wheel(1000); assert.equal(r.starts.length,1);
r=rig(); r.wheel(80); assert.equal(r.wheel(0,100),false); assert.equal(r.releases.length,1,'Vertical exit releases the half-turned page');
r=rig(); r.wheel(0,10,{deltaMode:1,shiftKey:true}); assert(r.moves[0] > .3,'Shift-wheel and line deltas are normalized');

for (const direction of [-1,1]) {
  for (const p of [0,.15,.5,.85,1]) {
    const poses=paperStripTransforms(p,direction,560,14);
    assert.equal(poses.length,14);
    assert.deepEqual([poses[0].x,poses[0].z],[0,0],'The binding stays fixed');
    poses.forEach((pose,i)=>{
      assert(pose.z>=-1e-9,'The sheet must lift above the spread, not pass through it');
      if(i) assert(Math.abs(Math.hypot(pose.x-poses[i-1].x,pose.z-poses[i-1].z)-40)<1e-8,'Bending must preserve paper length');
      if(p===0||p===1) assert(Math.abs(pose.z)<1e-8,'Both endpoints must lie flat');
    });
    if(p===.5) assert(Math.abs(poses[0].angle-poses.at(-1).angle)>20,'The sheet bends rather than rotating as a rigid board');
  }
}
console.log('Passed: continuous wheel input, reversal, cancellation, inertia, boundaries, zoom/vertical passthrough, and paper geometry.');
