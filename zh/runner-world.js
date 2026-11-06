import * as THREE from '../vendor/three.module.js';
import { GLTFLoader } from '../vendor/GLTFLoader.js';
import { gsap, ScrollTrigger } from '../motion.js';
import { scrollPageTo } from '../scroll-controller.js';
import { runnerRouteLength, sampleRunnerRoute, billboardZ, landingDistance, runnerSourceSpeed } from '../runner-motion.js';

const PETROL=0x204743;
const IVORY=0xeeeae1;
// Adapted from the supplied motion reference: original wireframe world → clear runner exit → billboard → page.
export async function initRunnerWorld() {
  const hero=document.querySelector('#home'), holder=document.querySelector('#world-scene');
  const header=document.querySelector('#header'), arrival=document.querySelector('#world-arrival');
  const buttons=[...hero.querySelectorAll('[data-world-chapter]')];
  const abort=new AbortController();
  let renderer, frame=0, disposed=false, contextLost=false, timeline, runner, mixer, mobile=false;
  let stage=-1, media, runnerScale=1;
  try {renderer=new THREE.WebGLRenderer({antialias:true,powerPreference:'high-performance'});}
  catch {hero.dataset.scene='fallback';return;}
  renderer.outputColorSpace=THREE.SRGBColorSpace;
  renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.25;
  renderer.shadowMap.enabled=false;renderer.shadowMap.type=THREE.PCFShadowMap;
  holder.append(renderer.domElement);
  const scene=new THREE.Scene();scene.background=new THREE.Color(PETROL);scene.fog=new THREE.Fog(PETROL,48,100);
  const camera=new THREE.PerspectiveCamera(58,1,.025,140);
  scene.add(new THREE.HemisphereLight(0xfffcf5,0x789489,3));
  const light=new THREE.DirectionalLight(0xfffcf5,4);light.position.set(-5,12,9);scene.add(light,light.target);
  light.castShadow=true;light.shadow.mapSize.set(2048,2048);
  Object.assign(light.shadow.camera,{left:-8,right:8,top:8,bottom:-8,near:.1,far:35});
  light.shadow.normalBias=.025;light.shadow.bias=-.0002;light.shadow.radius=3;
  const rim=new THREE.DirectionalLight(0xc9d5cc,3);rim.position.set(4,5,-8);scene.add(rim);
  const white=new THREE.MeshStandardMaterial({color:IVORY,roughness:.6});
  const boardStock=new THREE.MeshBasicMaterial({color:IVORY,toneMapped:false});
  const route=new THREE.Group();scene.add(route);
  function box(w,h,d,mat,x,y,z,parent=route){const m=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),mat);m.position.set(x,y,z);parent.add(m);return m;}
  box(7,.16,95,white,1,-.14,-30);
  const grid=new THREE.GridHelper(95,32,0x789489,0xa9bcad);grid.position.set(1,-.049,-30);grid.scale.x=7/95;scene.add(grid);
  // A short side platform receives the runner after its turn, beyond the opening view.
  box(19,.16,9,white,14,-.14,-19);
  const lineMat=new THREE.MeshBasicMaterial({color:IVORY});
  for(const side of [-1,1]){
    if(side<0)box(.045,.16,95,lineMat,1+side*3.55,0,-30);
    else{
      box(.045,.16,30.5,lineMat,4.55,0,2.25);
      box(.045,.16,53.5,lineMat,4.55,0,-50.75);
    }
    for(let n=0;n<36;n++){const z=8-n*2.5;if(side>0&&z<-13&&z>-24)continue;box(.045,.18,.045,lineMat,1+side*3.55,.08,z);}
  }
  const images = [
    ['01','AXISPRO','产品工程','/assets/projects/axispro-exploded.webp',-3.6,2.6,-4,.28],
    ['02','THE PATH','空间设计','/assets/projects/path-reference.png',6,2.5,-11,-.4],
    ['03','STREAM X','车辆设计','/assets/projects/stream-x-road-front.webp',-4.2,2.7,-19,.25],
    ['04','SIMREST Q2','工业设计','/assets/projects/simrest-bedside.jpg',5.8,2.6,-27,-.3],
    ['05','MODUFRAME','可持续设计','/assets/moduframe-renders/moduframe-front-render.webp',-4.1,2.65,-27.5,.22,'contain'],
  ];
  const panels = images.map(([number,title,category,url,x,y,z,angle,fit])=>{
    const canvas=document.createElement('canvas');canvas.width=900;canvas.height=1080;
    const ctx=canvas.getContext('2d');
    const tex=new THREE.CanvasTexture(canvas);tex.colorSpace=THREE.SRGBColorSpace;
    function draw(img){
      ctx.fillStyle='#eeeae1';ctx.fillRect(0,0,900,1080);
      ctx.fillStyle='#193b3a';ctx.font='500 31px "Noto Sans SC", "PingFang SC", sans-serif';ctx.fillText(number+' / '+category,46,73);
      ctx.font='500 86px "Noto Sans SC", "PingFang SC", sans-serif';ctx.fillText(title,42,173);ctx.fillText('↗',786,173);
      if(img){const scale=(fit==='contain'?Math.min:Math.max)(808/img.width,695/img.height);ctx.save();ctx.beginPath();ctx.rect(46,227,808,695);ctx.clip();ctx.drawImage(img,450-img.width*scale/2,574-img.height*scale/2,img.width*scale,img.height*scale);ctx.restore();}
      ctx.font='28px "Noto Sans SC", "PingFang SC", sans-serif';ctx.fillStyle='#47655b';ctx.fillText('夏琛沣 / 设计项目',46,1007);tex.needsUpdate=true;requestRender();
    }
    draw();const img=new Image();img.onload=()=>{if(!disposed)draw(img);};img.src=url;
    const panel=new THREE.Mesh(new THREE.PlaneGeometry(3.6,4.32),new THREE.MeshBasicMaterial({map:tex,side:THREE.DoubleSide,toneMapped:false}));
    panel.position.set(x,y,z);panel.rotation.y=angle;panel.rotation.z=x<0?-.055:.035;scene.add(panel);return panel;
  });
  for(let i=0;i<4;i++){
    // Keep the original circular silhouette with an opening at foot level.
    const ring=new THREE.Mesh(new THREE.TorusGeometry(2.6,.023,6,80,5.4),lineMat);
    ring.position.set(1,2.65,-7-i*8);ring.rotation.z=-1.1292;scene.add(ring);
  }

  const boardCanvas=document.createElement('canvas');boardCanvas.width=1600;boardCanvas.height=900;
  const boardCtx=boardCanvas.getContext('2d');boardCtx.fillStyle='#eeeae1';boardCtx.fillRect(0,0,1600,900);
  boardCtx.fillStyle='#193b3a';boardCtx.textAlign='center';boardCtx.font='38px "Noto Sans SC", "PingFang SC", sans-serif';boardCtx.fillText('夏琛沣 / 设计工程',800,205);
  boardCtx.font='500 145px "Noto Sans SC", "PingFang SC", sans-serif';boardCtx.fillText('设计项目',800,452);
  boardCtx.font='34px "Noto Sans SC", "PingFang SC", sans-serif';boardCtx.fillText('五个项目，从想法走向实践。',800,550);
  boardCtx.strokeStyle='#193b3a55';boardCtx.beginPath();boardCtx.moveTo(120,710);boardCtx.lineTo(1480,710);boardCtx.stroke();
  const boardTexture=new THREE.CanvasTexture(boardCanvas);boardTexture.colorSpace=THREE.SRGBColorSpace;
  const billboard=new THREE.Group();billboard.position.set(0,3.7,billboardZ);scene.add(billboard);
  const board=new THREE.Mesh(new THREE.PlaneGeometry(10.5,5.9),new THREE.MeshBasicMaterial({map:boardTexture,toneMapped:false,transparent:true}));billboard.add(board);
  box(10.6,6,.14,boardStock,0,0,-.1,billboard);
  for(const side of [-1,1]){
    box(.09,3,.09,white,side*3.8,-4.3,-.15,billboard);
    box(.055,.5,.09,boardStock,side*4,3.2,-.1,billboard);
  }
  box(11.3,.09,.9,boardStock,0,-3.1,.32,billboard);
  const billboardMaterials=[];
  billboard.traverse(mesh=>{if(!mesh.isMesh)return;mesh.material=mesh.material.clone();mesh.material.transparent=true;billboardMaterials.push({material:mesh.material,isFace:mesh===board});});

  const rig={cx:6.1,cy:1.35,cz:7.1,tx:-.7,ty:1.65,tz:-1,roll:-.055,fov:46,distance:0,boardYaw:-.08,boardInk:1,boardReveal:0,landing:0};
  const runnerPosition=new THREE.Vector3(),runnerTangent=new THREE.Vector3();
  function requestRender(){if(!frame&&!disposed&&!contextLost&&!document.hidden)frame=requestAnimationFrame(render);}
  function render(){
    frame=0;if(disposed||contextLost||document.hidden)return;
    const r=hero.getBoundingClientRect();if(r.bottom<=0||r.top>=innerHeight)return;
    const heading=sampleRunnerRoute(rig.distance,runnerPosition,runnerTangent);
    if(runner){runner.position.copy(runnerPosition);runner.position.y=-.05;runner.rotation.y=heading;mixer.setTime(.19 + rig.distance/(runnerSourceSpeed*runnerScale));runner.updateMatrixWorld(true);}
    light.position.set(-3,8,6);light.target.position.set(0,0,0);
    const destination=billboardZ+landingDistance(camera.aspect,rig.fov);
    camera.position.set(rig.cx,rig.cy,THREE.MathUtils.lerp(rig.cz,destination,rig.landing));camera.fov=rig.fov;camera.updateProjectionMatrix();
    camera.lookAt(rig.tx,rig.ty,rig.tz);camera.rotation.z=rig.roll;
    billboard.rotation.y=rig.boardYaw;billboard.visible=rig.boardReveal>.001;
    billboardMaterials.forEach(({material,isFace})=>{material.opacity=rig.boardReveal*(isFace?rig.boardInk:1);});
    const p=timeline?.progress()||0, next=p<.43?0:p<.87?1:2;
    hero.dataset.progress=p.toFixed(3);hero.dataset.stage=String(next);
    const active=timeline?.scrollTrigger?.isActive;
    header.classList.toggle('on-world-end',p>.84&&active);
    arrival.inert=p<.94;
    if(stage!==next){stage=next;buttons.forEach((b,i)=>{if(i===next)b.setAttribute('aria-current','step');else b.removeAttribute('aria-current');});}
    document.querySelector('#world-distance').textContent=String(Math.round(rig.distance*10)).padStart(3,'0')+' M';
    document.querySelector('#world-progress').style.transform=`scaleX(${p})`;
    renderer.render(scene,camera);
  }
  function resize(){const w=holder.clientWidth,h=holder.clientHeight;if(!w||!h)return;camera.aspect=w/h;renderer.setPixelRatio(Math.min(devicePixelRatio||1,1.65,Math.sqrt(2500000/(w*h))));renderer.setSize(w,h,false);requestRender();}
  const observer=new ResizeObserver(resize);observer.observe(holder);
  document.addEventListener('visibilitychange',requestRender,{signal:abort.signal});
  buttons.forEach((b,i)=>b.addEventListener('click',()=>{if(timeline?.scrollTrigger)scrollPageTo(timeline.scrollTrigger.labelToScroll(['stride','world','inside'][i]));},{signal:abort.signal}));
  resize();render();
  function setupMotion(){
    media=gsap.matchMedia();
    media.add({mobile:'(max-width: 760px)',desktop:'(min-width: 761px)',reduced:'(prefers-reduced-motion: reduce)'},context=>{
      mobile=context.conditions.mobile;
      hero.classList.toggle('world-reduced',context.conditions.reduced);
      stage=-1;
      Object.assign(rig,{cx:mobile?4.8:6.1,cy:1.35,cz:7.1,tx:mobile?0:-.7,ty:1.65,tz:-1,roll:mobile?-.025:-.055,fov:mobile?57:46,distance:0,boardYaw:-.08,boardInk:1,boardReveal:0,landing:0});
      gsap.set(arrival,{autoAlpha:0});gsap.set('#world-interlude',{autoAlpha:0});gsap.set('.world-title, .world-coordinate',{autoAlpha:1,y:0});
      if(context.conditions.reduced){timeline=null;resize();render();return;}
      timeline=gsap.timeline({defaults:{ease:'none'},onUpdate:requestRender,scrollTrigger:{id:'portfolio-world',trigger:hero,pin:true,refreshPriority:2,start:'top top',end:()=>`+=${innerHeight*(mobile?5:6)}`,scrub:true,anticipatePin:1,invalidateOnRefresh:true,onRefresh:resize,onLeave:()=>header.classList.remove('on-world-end'),onLeaveBack:()=>header.classList.remove('on-world-end')}});
      timeline.addLabel('stride',0)
        .to(rig,{distance:13,cx:mobile?4.8:6.8,cy:2,cz:-5,tx:mobile?0:-.7,ty:1.8,tz:-14,roll:-.035,duration:3.3},0)
        .to('.world-title, .world-coordinate',{autoAlpha:0,y:-35,duration:.7},1.4)
        .to(rig,{distance:21,cx:1,cy:2.2,cz:-7.8,tx:1,ty:2.3,tz:billboardZ,roll:0,fov:mobile?60:50,duration:1},3.3)
        .to(rig,{distance:runnerRouteLength,cx:1,cy:2.2,cz:-14,tx:0,ty:3.5,tz:billboardZ,duration:1.25},4.3)
        .to(rig,{boardReveal:1,duration:1.2},3.9)
        .addLabel('world',5.55)
        .fromTo('#world-interlude',{autoAlpha:0,y:25},{autoAlpha:1,y:0,duration:.4},4.9)
        .to(rig,{cx:1,cy:2.4,cz:-22,ty:3.7,roll:0,boardYaw:0,duration:1.2},5.55)
        .to('#world-interlude',{autoAlpha:0,y:-25,duration:.3},6.4)
        .to(rig,{cx:0,cy:3.7,tx:0,ty:3.7,tz:billboardZ,roll:0,fov:mobile?64:52,duration:.8,ease:'power1.inOut'},6.75)
        .to(rig,{landing:1,duration:1.35,ease:'power2.inOut'},7.55)
        .to(rig,{boardInk:0,duration:.6},8.3)
        .to(arrival,{autoAlpha:1,duration:.3},8.9)
        .fromTo('.world-arrival-inner',{y:25,autoAlpha:0},{y:0,autoAlpha:1,duration:.6},9.1)
        .addLabel('inside',9.65)
        .to({}, {duration:.3},9.7);
      resize();requestRender();
      // Refresh after all responsive contexts have rebuilt their pins.
      requestAnimationFrame(()=>{if(!disposed)ScrollTrigger.refresh();});
      return()=>{timeline=null;header.classList.remove('on-world-end');};
    });
  }
  setupMotion();
  // Re-resolve a deep link against the final pinned layout, before model downloads finish.
  if(location.hash && location.hash !== '#home' && document.getElementById(location.hash.slice(1))) {
    requestAnimationFrame(()=>scrollPageTo(location.hash,{immediate:true}));
  }
  try {
    const loader=new GLTFLoader();
    const gltf=await loader.loadAsync('/assets/models/runner.glb');
    if(disposed)return;
    runner=gltf.scene;
    const bounds=new THREE.Box3().setFromObject(runner);
    runnerScale=4.2/bounds.getSize(new THREE.Vector3()).y;
    runner.scale.multiplyScalar(runnerScale);
    const originalMaterials=new Set(),meshes=[];
    runner.traverse(mesh=>{if(mesh.isSkinnedMesh)meshes.push(mesh);});
    for(const mesh of meshes){
      [].concat(mesh.material).forEach(material=>originalMaterials.add(material));
      mesh.material=new THREE.MeshStandardMaterial({color:PETROL,metalness:.25,roughness:.44,polygonOffset:true,polygonOffsetFactor:1,polygonOffsetUnits:1});
      const wire=new THREE.SkinnedMesh(mesh.geometry,new THREE.MeshBasicMaterial({color:IVORY,wireframe:true,transparent:true,opacity:.8}));
      wire.skeleton=mesh.skeleton;wire.bindMatrix.copy(mesh.bindMatrix);wire.bindMatrixInverse.copy(mesh.bindMatrixInverse);
      wire.position.copy(mesh.position);wire.quaternion.copy(mesh.quaternion);wire.scale.copy(mesh.scale);wire.frustumCulled=false;
      mesh.parent.add(wire);mesh.frustumCulled=false;
    }
    originalMaterials.forEach(material=>{for(const value of Object.values(material))if(value?.isTexture)value.dispose();material.dispose();});
    scene.add(runner);
    mixer=new THREE.AnimationMixer(runner);
    const clip=gltf.animations.find(c=>c.name.toLowerCase()==='run')||gltf.animations[0];
    if(!clip)throw new Error('Runner animation is missing');
    mixer.clipAction(clip).play();
    hero.dataset.scene='ready';
    requestRender();
  }catch(error){media?.revert();hero.dataset.scene='fallback';console.warn('World scene unavailable',error);}
  renderer.domElement.addEventListener('webglcontextlost',e=>{e.preventDefault();contextLost=true;media?.revert();hero.dataset.scene='fallback';holder.hidden=true;},{signal:abort.signal});
  window.addEventListener('pageshow',e=>{if(e.persisted){resize();ScrollTrigger.refresh();}},{signal:abort.signal});
  window.addEventListener('pagehide',e=>{cancelAnimationFrame(frame);frame=0;if(e.persisted)return;disposed=true;media?.revert();observer.disconnect();abort.abort();const geometries=new Set(),materials=new Set();scene.traverse(o=>{if(o.geometry)geometries.add(o.geometry);[].concat(o.material||[]).forEach(m=>materials.add(m));});geometries.forEach(g=>g.dispose());materials.forEach(m=>{for(const value of Object.values(m))if(value?.isTexture)value.dispose();m.dispose();});renderer.dispose();},{signal:abort.signal});
}
