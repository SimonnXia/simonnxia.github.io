import * as THREE from './vendor/three.module.js';

// Restore the original centre track; the runner takes a clear right exit before the billboard.
export const runnerRoute = new THREE.CatmullRomCurve3([
  [1.15,0,0], [1.15,0,-8], [1.15,0,-15], [3,0,-18], [8,0,-19], [18,0,-19],
].map(point => new THREE.Vector3(...point)), false, 'centripetal');
runnerRoute.arcLengthDivisions = 400;
export const runnerRouteLength = runnerRoute.getLength();
export const billboardZ = -36;
export const runnerSourceSpeed = 3.72;

export function sampleRunnerRoute(distance, position, tangent) {
  const progress = THREE.MathUtils.clamp(distance / runnerRouteLength, 0, 1);
  runnerRoute.getPointAt(progress, position);
  runnerRoute.getTangentAt(progress, tangent);
  return Math.atan2(tangent.x, tangent.z);
}

// Fill the viewport with the billboard while remaining safely in front of its surface.
export function landingDistance(aspect, verticalFov) {
  const halfAngle = Math.tan(THREE.MathUtils.degToRad(verticalFov / 2));
  return Math.min(3.2, 5.25 / (halfAngle * aspect) * .82, 2.95 / halfAngle * .82);
}
