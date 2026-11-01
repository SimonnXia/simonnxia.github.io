import { mergeGeometries } from './vendor/BufferGeometryUtils.js';

/** Jìng — an open, three-wing maquette based on the supplied project render.
 * Spaced lamellae describe seating and shelter without inventing enclosed pods.
 */
export function createPath(THREE) {
  const group = new THREE.Group(); group.name = 'Jìng / open landscape study';
  const parts = [], wireframes = [];
  const materials = {
    rib: new THREE.MeshStandardMaterial({ color:0xe4e4df, metalness:.04, roughness:.66, side:THREE.DoubleSide }),
    surface: new THREE.MeshStandardMaterial({ color:0xf0f0eb, metalness:.03, roughness:.58, side:THREE.DoubleSide }),
    base: new THREE.MeshStandardMaterial({ color:0xdadbd8, metalness:0, roughness:.85 }),
    holds: new THREE.MeshStandardMaterial({ color:0xb6b8b7, roughness:.8 }),
  };
  const edge = new THREE.LineBasicMaterial({color:0x565b62,transparent:true,opacity:.16,depthWrite:false});
  const vec = p => new THREE.Vector3(...p);
  function part(name, offset) {
    const object = new THREE.Group(); object.name = name; group.add(object);
    parts.push({object, offset}); return object;
  }
  function add(parent, name, geometry, material, outline=false) {
    const mesh = new THREE.Mesh(geometry,material); mesh.name=name;
    mesh.castShadow=mesh.receiveShadow=true; parent.add(mesh);
    if(outline){const lines=new THREE.LineSegments(new THREE.EdgesGeometry(geometry,40),edge);parent.add(lines);wireframes.push(lines);}
    return mesh;
  }
  function surface(fn, rows=56, cols=12) {
    const positions=[],indices=[];
    for(let i=0;i<=rows;i++)for(let j=0;j<=cols;j++)positions.push(...fn(i/rows,j/cols).toArray());
    for(let i=0;i<rows;i++)for(let j=0;j<cols;j++){
      const a=i*(cols+1)+j,b=a+cols+1;indices.push(a,b,a+1,a+1,b,b+1);
    }
    const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(positions,3));g.setIndex(indices);g.computeVertexNormals();return g;
  }
  const base=part('Presentation plinth',[0,-.14,0]);
  const plinth=add(base,'Thin square plinth',new THREE.BoxGeometry(7.7,.14,6.4).translate(0,-.08,0),materials.base,true);
  // Ribs are merged per wing: the outline stays legible with a small draw-call budget.
  function wing({name, points, count, height, width, curl, offset, normal=1}) {
    const parent=part(name,offset),path=new THREE.CatmullRomCurve3(points.map(([x,z])=>vec([x,0,z])),false,'centripetal');
    const ribs=[];
    function section(t){
      const p=path.getPointAt(t),d=path.getTangentAt(t),n=vec([-d.z,0,d.x]).multiplyScalar(normal).normalize();
      const h=height(t),w=width(t),c=curl(t);
      const profile=new THREE.CatmullRomCurve3([
        vec([w,.08,0]),vec([w*.65,.09,0]),vec([w*.25,.18,0]),
        vec([.02,h*.34,0]),vec([-.06,h*.70,0]),vec([c*.4,h*.94,0]),vec([c,h,0]),
      ],false,'centripetal');
      return {p,n,profile};
    }
    for(let i=0;i<count;i++){
      const {p,n,profile}=section(i/(count-1)),shape=new THREE.Shape(),sample=profile.getPoints(28);
      const thickness=.038;
      sample.forEach((q,j)=>j?shape.lineTo(q.x,q.y+thickness/2):shape.moveTo(q.x,q.y+thickness/2));
      [...sample].reverse().forEach(q=>shape.lineTo(q.x,q.y-thickness/2));shape.closePath();
      const geo=new THREE.ExtrudeGeometry(shape,{depth:.045,bevelEnabled:false,curveSegments:1,steps:1});
      geo.translate(0,0,-.0225);geo.rotateY(Math.atan2(-n.z,n.x));geo.translate(p.x,0,p.z);ribs.push(geo);
    }
    const merged=mergeGeometries(ribs,false);ribs.forEach(g=>g.dispose());
    add(parent,name+' / spaced lamellae',merged,materials.rib,true);
    // A narrow foundation keeps the seat grounded, without filling its open space.
    add(parent,name+' / seat foundation',surface((t,u)=>{
      const {p,n}=section(t);return p.clone().addScaledVector(n,width(t)*u).setY(.045);
    },count,2),materials.surface);
    return parent;
  }
  wing({name:'Right crescent seating',count:58,
    points:[[2.72,1.36],[2.60,.47],[1.96,-.24],[1.15,-.60],[.52,-.70]],
    height:t=>.48+.96*Math.sin(t*Math.PI*.86),width:t=>.93-.25*t,curl:t=>.09+.12*t,
    offset:[.58,.06,-.08],normal:1});
  wing({name:'Rear rising shelter',count:46,
    points:[[.28,-.88],[-.03,-1.42],[.20,-2.13],[.67,-2.54]],
    height:t=>1.05+1.02*Math.sin(t*Math.PI*.58),width:t=>.66-.16*t,curl:t=>.35+.85*t,
    offset:[.05,.32,-.38],normal:-1});
  wing({name:'Left shelter and front bench',count:64,
    points:[[-2.18,-2.20],[-2.70,-1.56],[-2.64,-.53],[-2.06,.26],[-.99,.65],[-.15,1.23],[.10,2.21]],
    height:t=>1.88-.78*t+.25*Math.sin(t*Math.PI),width:t=>.72+.38*Math.sin(t*Math.PI),curl:t=>.65+.33*Math.sin(t*Math.PI),
    offset:[-.48,.15,.12],normal:-1});

  const climbing=part('Central climbing ribbon',[-.10,.24,.25]);
  const climb=(t,u)=>vec([-.90+(u-.5)*(1.40-.30*t),.14+t*1.49+.26*(u-.5)**2*(1-t),2.05-1.00*t-.24*Math.sin(Math.PI*t)+.24*(u-.5)**2]);
  add(climbing,'Sloping climbing face',surface(climb,24,16),materials.surface,true);
  for(const [t,u] of [[.2,.26],[.35,.70],[.5,.33],[.67,.77],[.80,.32],[.92,.6]]){
    const hold=add(climbing,'Subtle climbing hold',new THREE.IcosahedronGeometry(.058,1),materials.holds);hold.position.copy(climb(t,u));hold.position.z+=.024;hold.scale.set(1,.7,.42);
  }
  const chute=part('Crossing upper ribbon',[0,.44,.05]);
  const route=new THREE.CatmullRomCurve3([vec([-3.03,1.91,.03]),vec([-2.36,1.75,.30]),vec([-1.35,1.78,.23]),vec([-.45,1.82,.13]),vec([.12,1.62,.32])]);
  const ribbon=(t,u)=>{
    const p=route.getPoint(t),d=route.getTangent(t),n=vec([-d.z,0,d.x]).normalize();
    return p.addScaledVector(n,(u-.5)*.70).add(vec([0,.15*Math.pow(Math.abs(u*2-1),4),0]));
  };
  add(chute,'Broad white crossing chute',surface(ribbon,64,14),materials.surface,true);
  for(const u of [0,1]){
    const points=Array.from({length:61},(_,i)=>ribbon(i/60,u));
    add(chute,'Raised chute lip',new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points),60,.024,6,false),materials.surface);
  }
  group.userData.schematic=true;
  group.userData.description='Simplified open maquette: separated seating, shelter and play ribbons. Original project imagery is shown in the case study.';
  return {group,parts,wireframes,materials};
}
