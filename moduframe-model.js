import { createChairMaterials } from './moduframe-materials.js';

/**
 * MODUFRAME — assembled presentation model rebuilt from the front/rear concept renders.
 * Front is +Z. Geometry represents the rendered design, rather than production CAD.
 * All components remain assembled: the story's camera supplies the turntable motion.
 */
export function createModuframe(THREE) {
  const group = new THREE.Group();
  group.name = 'MODUFRAME / assembled upholstered seat';
  const parts = [], wireframes = [];
  const clamp = (v,a,b) => Math.max(a,Math.min(b,v));
  const smooth = t => { t=clamp(t,0,1); return t*t*(3-2*t); };
  const lerp = (a,b,t) => a+(b-a)*t;
  // Cubic Hermite interpolation keeps the back's curvature continuous at each control row.
  const lookup = (points,y) => {
    if(y<=points[0][0]) return points[0][1];
    if(y>=points.at(-1)[0]) return points.at(-1)[1];
    for(let i=1;i<points.length;i++) if(y<=points[i][0]) {
      const a=points[i-1],b=points[i],before=points[Math.max(0,i-2)],after=points[Math.min(points.length-1,i+1)];
      const span=b[0]-a[0],t=(y-a[0])/span,t2=t*t,t3=t2*t;
      const ma=(b[1]-before[1])/(b[0]-before[0]),mb=(after[1]-a[1])/(after[0]-a[0]);
      return (2*t3-3*t2+1)*a[1]+(t3-2*t2+t)*span*ma+(-2*t3+3*t2)*b[1]+(t3-t2)*span*mb;
    }
  };

  const materials = createChairMaterials(THREE);
  function mesh(geometry, material, name, parent=group) {
    const object=new THREE.Mesh(geometry,material); object.name=name;
    object.castShadow=true; object.receiveShadow=true; parent.add(object); return object;
  }
  function softenSharedNormals(geometry) {
    geometry.computeVertexNormals();
    const p=geometry.attributes.position,n=geometry.attributes.normal,vertices=new Map();
    for(let i=0;i<p.count;i++) {
      const key=`${Math.round(p.getX(i)*1e6)},${Math.round(p.getY(i)*1e6)},${Math.round(p.getZ(i)*1e6)}`;
      const entry=vertices.get(key)||{indices:[],sum:new THREE.Vector3()};
      entry.indices.push(i);entry.sum.add(new THREE.Vector3(n.getX(i),n.getY(i),n.getZ(i)));vertices.set(key,entry);
    }
    for(const entry of vertices.values()){entry.sum.normalize();for(const i of entry.indices)n.setXYZ(i,entry.sum.x,entry.sum.y,entry.sum.z);}
    return geometry;
  }
  function roundedGeometry(w,h,d,r=.04,segments=6) {
    r=Math.min(r,w/2-.001,h/2-.001,d/2-.001);
    const subdivisions=Array.isArray(segments)?segments:[segments,segments,segments];
    const g=new THREE.BoxGeometry(w,h,d,...subdivisions);
    const p=g.attributes.position; const core=new THREE.Vector3(), delta=new THREE.Vector3();
    for(let i=0;i<p.count;i++) {
      const x=p.getX(i),y=p.getY(i),z=p.getZ(i);
      core.set(clamp(x,-w/2+r,w/2-r),clamp(y,-h/2+r,h/2-r),clamp(z,-d/2+r,d/2-r));
      delta.set(x,y,z).sub(core).normalize().multiplyScalar(r).add(core);
      p.setXYZ(i,delta.x,delta.y,delta.z);
    }
    return softenSharedNormals(g);
  }
  function box(w,h,d,position,material,name,r=.025,parent=group) {
    const object=mesh(roundedGeometry(w,h,d,r),material,name,parent); object.position.set(...position); return object;
  }
  function pipe(points,r,material,name,closed=false) {
    const curve=new THREE.CatmullRomCurve3(points.map(p=>new THREE.Vector3(...p)),closed,'centripetal');
    return mesh(new THREE.TubeGeometry(curve,Math.max(16,points.length*5),r,5,closed),material,name);
  }
  function plate(shape,depth,x,material,name,bevel=.014) {
    const geometry=new THREE.ExtrudeGeometry(shape,{depth:depth-bevel*2,bevelEnabled:true,bevelSegments:3,steps:1,bevelSize:bevel,bevelThickness:bevel,curveSegments:16});
    geometry.translate(0,0,-depth/2+bevel); geometry.rotateY(Math.PI/2);
    softenSharedNormals(geometry);
    const object=mesh(geometry,material,name); object.position.x=x; return object;
  }
  function flatBar(a,b,width,thickness,material,name) {
    const va=new THREE.Vector3(...a),vb=new THREE.Vector3(...b),direction=vb.clone().sub(va);
    const object=box(thickness,direction.length()+.012,width,va.add(vb).multiplyScalar(.5).toArray(),material,name,.013);
    object.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),direction.normalize()); return object;
  }
  function bolt(x,y,z,side,r=.037,name='Recessed structural fastener') {
    const washer=mesh(new THREE.CylinderGeometry(r*1.5,r*1.5,.014,20),materials.edgeMetal,name+' / collar');
    washer.rotation.z=Math.PI/2; washer.position.set(x,y,z);
    const head=mesh(new THREE.CylinderGeometry(r,r,.020,16),materials.inset,name+' / head');
    head.rotation.z=Math.PI/2; head.position.set(x+side*.011,y,z);
    const centre=mesh(new THREE.CylinderGeometry(r*.37,r*.37,.022,6),materials.aluminium,name+' / socket');
    centre.rotation.z=Math.PI/2; centre.position.set(x+side*.022,y,z);
  }
  // A single continuous, bevelled side-frame section with the two source openings.
  function sideProfile(points,holeSets=[]) {
    const shape=new THREE.Shape();points.forEach(([z,y],i)=>i?shape.lineTo(-z,y):shape.moveTo(-z,y));shape.closePath();
    for(const points of holeSets){const hole=new THREE.Path();points.forEach(([z,y],i)=>i?hole.lineTo(-z,y):hole.moveTo(-z,y));hole.closePath();shape.holes.push(hole);}
    return shape;
  }
  for(const side of [-1,1]) {
    const x=side*.66;
    const outline=[[-.54,1.12],[-.88,.86],[-.43,.48],[-.44,.39],[-.94,.16],[-.98,.095],[-.91,.055],[.81,.035],[.90,.08],[.90,.20],[.53,.49],[.53,.57],[.79,1.12]];
    const upper=[[-.53,1.00],[-.73,.85],[-.29,.565],[.28,.555],[.61,1.00]];
    const lower=[[-.70,.145],[.72,.135],[.34,.40],[-.30,.43]];
    plate(sideProfile(outline,[upper,lower]),.098,x,materials.aluminium,'One-piece aluminium side frame with upper and lower openings',.016);
    bolt(x+side*.06,.485,-.28,side,.037);bolt(x+side*.06,.47,.32,side,.037);
    box(.097,.023,1.70,[x,.036,-.015],materials.polymer,'Inset protective runner strip',.008);
  }
  for(const z of [-.47,.64]) flatBar([-.66,1.065,z],[.66,1.065,z],.085,.095,materials.aluminium,'Under-seat cross member');

  // A curved, narrowing back grows continuously out of the seat rather than stacked boxes.
  const outerWidth = y => lookup([[1.12,.65],[1.30,.77],[1.65,.745],[2.1,.695],[2.65,.70],[3.12,.725],[3.35,.69],[3.49,.615],[3.57,.46]],y);
  const centreWidth = y => lookup([[1.22,.50],[1.50,.47],[1.92,.365],[2.32,.35],[2.75,.43],[3.03,.515],[3.15,.49]],y);
  const spine = y => {
    const t=clamp((y-1.12)/2.45,0,1);
    return -.47-.47*t+.14*Math.sin(Math.PI*t)*Math.exp(-2.6*t);
  };
  const front = (x,y) => {
    const r=Math.min(.999,Math.abs(x)/outerWidth(y));
    const round=.115*Math.sqrt(Math.max(0,1-r*r));
    const bolsterCentre=(outerWidth(y)+centreWidth(y))/2;
    const bolster=.10*Math.exp(-(((Math.abs(x)-bolsterCentre)/.13)**2));
    const lumbar=.055*Math.exp(-(((y-1.64)/.39)**2));
    return spine(y)+round+bolster+lumbar;
  };
  function surface(name, y0,y1, left,right,zAt,material,rows=48,columns=24) {
    const positions=[],uvs=[],indices=[];
    for(let row=0;row<=rows;row++) {
      const v=row/rows,y=lerp(y0,y1,v),lo=left(y),hi=right(y);
      for(let col=0;col<=columns;col++) {
        const u=col/columns,x=lerp(lo,hi,u);
        positions.push(x,y,zAt(x,y,u,v)); uvs.push((x+.85)/1.7,v);
      }
    }
    for(let row=0;row<rows;row++) for(let col=0;col<columns;col++) {
      const a=row*(columns+1)+col,b=a+1,c=a+columns+1,d=c+1;
      indices.push(a,b,d,a,d,c);
    }
    const geometry=new THREE.BufferGeometry();
    geometry.setAttribute('position',new THREE.Float32BufferAttribute(positions,3));
    geometry.setAttribute('uv',new THREE.Float32BufferAttribute(uvs,2)); geometry.setIndex(indices); geometry.computeVertexNormals();
    return mesh(geometry,material,name);
  }
  // One closed, padded front/back volume; fabric divisions share the same surface.
  const backPositions=[],backUV=[],backIndices=[[],[]],rows=72,cols=48;
  for(let row=0;row<=rows;row++) {
    const y=lerp(1.12,3.57,row/rows),w=outerWidth(y),c=Math.min(centreWidth(y),w-.025);
    for(let col=0;col<=cols;col++) {
      const t=col/cols;
      const x=t<.25?lerp(-w,-c,t*4):t>.75?lerp(c,w,(t-.75)*4):lerp(-c,c,(t-.25)*2);
      backPositions.push(x,y,front(x,y));backUV.push((x+.8)/1.6,(y-1.12)/2.45);
    }
  }
  for(let row=0;row<rows;row++) for(let col=0;col<cols;col++) {
    const a=row*(cols+1)+col,b=a+1,c=a+cols+1,d=c+1;
    const isCentre=col>=12&&col<36&&lerp(1.12,3.57,(row+.5)/rows)<3.06&&row>2;
    backIndices[isCentre?1:0].push(a,b,d,a,d,c);
  }
  const backGeometry=new THREE.BufferGeometry();backGeometry.setAttribute('position',new THREE.Float32BufferAttribute(backPositions,3));backGeometry.setAttribute('uv',new THREE.Float32BufferAttribute(backUV,2));backGeometry.setIndex(backIndices.flat());
  backGeometry.addGroup(0,backIndices[0].length,0);backGeometry.addGroup(backIndices[0].length,backIndices[1].length,1);backGeometry.computeVertexNormals();
  mesh(backGeometry,[materials.graphite,materials.textile],'Continuous deeply padded back with tailored centre panel');
  const rearShell=surface('Continuous sculpted rear shell',1.12,3.57,y=>-outerWidth(y),outerWidth,(x,y)=>spine(y)-.15+.023*(x/outerWidth(y))**2,materials.shell,72,32);
  rearShell.material=materials.shell.clone();rearShell.material.side=THREE.DoubleSide;
  for(const y of [1.12,3.57]) {
    const positions=[],indices=[];
    for(let i=0;i<=32;i++) {
      const x=lerp(-outerWidth(y),outerWidth(y),i/32);positions.push(x,y,front(x,y),x,y,spine(y)-.15+.023*(x/outerWidth(y))**2);
      if(i<32){const a=i*2;indices.push(a,a+1,a+3,a,a+3,a+2);}
    }
    const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(positions,3));g.setIndex(indices);g.computeVertexNormals();
    const material=materials.shell.clone();material.side=THREE.DoubleSide;mesh(g,material,'Closed padded-shell end return');
  }
  for(const side of [-1,1]) {
    const positions=[],indices=[];
    for(let i=0;i<=72;i++) {
      const y=lerp(1.12,3.57,i/72),x=side*outerWidth(y);
      for(let j=0;j<=8;j++){
        const t=j/8;positions.push(x+side*.023*Math.sin(Math.PI*t),y,lerp(front(x,y),spine(y)-.127,t));
      }
      if(i<72)for(let j=0;j<8;j++){const a=i*9+j,b=a+1,c=a+9,d=c+1;indices.push(a,b,d,a,d,c);}
    }
    const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(positions,3));g.setIndex(indices);g.computeVertexNormals();
    const material=materials.aluminium.clone();material.side=THREE.DoubleSide;mesh(g,material,'Rounded continuous aluminium shell side band');
    const seam=[],perimeter=[];
    for(let i=0;i<=58;i++) {
      const y=lerp(1.25,3.06,i/58),x=side*centreWidth(y),ex=side*(outerWidth(y)-.018);
      seam.push([x,y,front(x,y)+.003]);perimeter.push([ex,y,front(ex,y)+.005]);
    }
    pipe(seam,.006,materials.piping,'Tailored centre panel piping');pipe(perimeter,.006,materials.piping,'Bolster outer upholstery welt');
  }
  // Headrest: wide softly crowned pillow with rounded shoulders and a stitched perimeter.
  const headGeometry=roundedGeometry(1.43,.68,.30,.135,[28,20,12]);
  const hp=headGeometry.attributes.position;
  const headPoint=(x,y,z)=>{
    const worldY=y+3.163+.065*Math.max(0,1-(x/.715)**2)*smooth((y+.14)/.48),t=(y+.34)/.68;
    const xx=x*(1-.12*t),crown=z>0?.045*Math.max(0,1-(x/.715)**2)*Math.max(0,1-(y/.34)**2):0;
    return [xx,worldY,z+spine(worldY)+.11+crown];
  };
  for(let i=0;i<hp.count;i++)hp.setXYZ(i,...headPoint(hp.getX(i),hp.getY(i),hp.getZ(i)));
  softenSharedNormals(headGeometry);mesh(headGeometry,materials.graphite,'Full rounded trapezoid headrest cushion');
  const headSeam=[];
  for(let i=0;i<120;i++) {
    const t=i/120*Math.PI*2,x=.678*Math.sign(Math.cos(t))*Math.pow(Math.abs(Math.cos(t)),.44),y=.306*Math.sign(Math.sin(t))*Math.pow(Math.abs(Math.sin(t)),.55);
    const pos=headPoint(x,y,.135);pos[2]+=.008;headSeam.push(pos);
  }
  pipe(headSeam,.006,materials.piping,'Headrest tailored perimeter',true);

  // Gently dished cushion, with a rounded waterfall front and sewn charcoal bands.
  box(1.53,.12,1.44,[0,1.115,.20],materials.polymer,'Contoured seat pan and dark lower welt',.055);
  function seatPoint(x,z) {
    const t=clamp((z+.52)/1.46,0,1);
    return .026*Math.sin(Math.PI*t)+.025*(x/.765)**2-.035*smooth((t-.86)/.14);
  }
  const cushion=roundedGeometry(1.53,.34,1.46,.155,[40,12,38]),cp=cushion.attributes.position;
  function cushionPosition(x,y,z) {
    return [x,y+1.275+seatPoint(x,z)*smooth((y+.17)/.34),z];
  }
  for(let i=0;i<cp.count;i++){const x=cp.getX(i),y=cp.getY(i),z=cp.getZ(i)+.21;cp.setXYZ(i,...cushionPosition(x,y,z));}
  const originalIndex=cushion.index.array,seatRegions=[[],[]];
  for(let i=0;i<originalIndex.length;i+=3){const x=(cp.getX(originalIndex[i])+cp.getX(originalIndex[i+1])+cp.getX(originalIndex[i+2]))/3;seatRegions[Math.abs(x)>.306&&Math.abs(x)<.536?1:0].push(originalIndex[i],originalIndex[i+1],originalIndex[i+2]);}
  cushion.clearGroups();cushion.setIndex(seatRegions.flat());cushion.addGroup(0,seatRegions[0].length,0);cushion.addGroup(seatRegions[0].length,seatRegions[1].length,1);
  softenSharedNormals(cushion);const seatMesh=mesh(cushion,[materials.textile,materials.graphite],'Thick waterfall cushion with flush wraparound fabric bands');seatMesh.receiveShadow=false;
  for(const side of [-1,1])for(const x0 of [.306,.5355]) {
    const path=[];
    for(let i=0;i<=32;i++){const z=lerp(-.365,.785,i/32),pos=cushionPosition(side*x0,.17,z);pos[1]+=.002;path.push(pos);}
    for(let i=1;i<=18;i++){const t=i/18*Math.PI,z=.785+.155*Math.sin(t),y=.015+.155*Math.cos(t),pos=cushionPosition(side*x0,y,z);pos[1]+=.001;pos[2]+=.002;path.push(pos);}
    pipe(path,.004,materials.piping,'Wraparound cushion panel stitching');
  }

  // The continuous navy side arms are the characteristic feature of the source design.
  for(const side of [-1,1]) {
    const s=new THREE.Shape(); const p=(z,y)=>[-z,y];
    s.moveTo(...p(.77,1.83));
    s.bezierCurveTo(...p(.76,1.96),...p(.61,2.005),...p(.48,2.005));
    s.lineTo(...p(-.46,2.005));
    s.bezierCurveTo(...p(-.64,2.005),...p(-.70,1.90),...p(-.60,1.77));
    s.lineTo(...p(-.05,1.13));
    s.quadraticCurveTo(...p(.03,1.04),...p(.22,1.04));
    s.lineTo(...p(.83,1.04));s.quadraticCurveTo(...p(.91,1.04),...p(.91,1.11));
    s.lineTo(...p(.91,1.20));s.lineTo(...p(.23,1.20));
    s.quadraticCurveTo(...p(.15,1.20),...p(.11,1.26));
    s.lineTo(...p(-.40,1.83));s.lineTo(...p(.50,1.83));
    s.quadraticCurveTo(...p(.61,1.83),...p(.64,1.77));
    s.quadraticCurveTo(...p(.67,1.75),...p(.73,1.77));s.closePath();
    plate(s,.13,side*.84,materials.navy,'Continuous sculpted navy arm and seat rail',.026);
    // Wider soft-touch top cap subtly projects beyond the structural side arm.
    const top=new THREE.Shape();top.moveTo(...p(-.54,1.91));top.quadraticCurveTo(...p(-.60,2.00),...p(-.43,2.015));
    top.lineTo(...p(.49,2.015));top.quadraticCurveTo(...p(.74,2.015),...p(.78,1.85));top.lineTo(...p(.66,1.81));
    top.quadraticCurveTo(...p(.61,1.88),...p(.49,1.88));top.lineTo(...p(-.54,1.88));top.closePath();
    plate(top,.235,side*.85,materials.navy,'Rounded navy armrest cap',.018);
    const inset=new THREE.Shape();inset.moveTo(...p(-.40,1.83));inset.lineTo(...p(-.30,1.83));inset.lineTo(...p(.22,1.27));
    inset.quadraticCurveTo(...p(.28,1.22),...p(.40,1.22));inset.lineTo(...p(.85,1.22));inset.lineTo(...p(.85,1.13));
    inset.lineTo(...p(.29,1.13));inset.quadraticCurveTo(...p(.13,1.13),...p(.06,1.23));inset.lineTo(...p(-.47,1.78));inset.closePath();
    plate(inset,.056,side*.778,materials.aluminium,'Continuous broad silver arm inset and seat rail',.014);
    bolt(side*.925,1.9,-.48,side,.032,'Arm pivot fastener');
    const armWelt=[];for(let i=0;i<=20;i++)armWelt.push([side*.973,1.997,lerp(-.44,.47,i/20)]);
    pipe(armWelt,.004,materials.edgeMetal,'Arm cap fine parting line');
  }

  // Tall rear upholstery curves over the shoulder and joins the shell transition band.
  const rearFabric=surface('Rear upper woven upholstery',2.83,3.54,y=>-outerWidth(y)+.035,y=>outerWidth(y)-.035,(x,y)=>spine(y)-.16-.022*Math.max(0,1-(x/outerWidth(y))**2),materials.textile,34,30);
  rearFabric.material=materials.textile.clone();rearFabric.material.side=THREE.DoubleSide;
  const rearOutline=[];
  for(let i=0;i<=38;i++){const y=lerp(2.84,3.52,i/38);rearOutline.push([-(outerWidth(y)-.027),y,spine(y)-.166]);}
  for(let i=1;i<=38;i++){const y=lerp(3.52,2.84,i/38);rearOutline.push([(outerWidth(y)-.027),y,spine(y)-.166]);}
  pipe(rearOutline,.008,materials.piping,'Rear upholstered shoulder perimeter',true);
  // Accessory panels are mapped to the reclined rear surface rather than hovering behind it.
  function rearPanel(w,h,d,y,material,name,r=.03,x=0,extra=.015) {
    const g=roundedGeometry(w,h,d,r,8),p=g.attributes.position;
    for(let i=0;i<p.count;i++){const yy=p.getY(i)+y;p.setXYZ(i,p.getX(i)+x,yy,spine(yy)-.15-extra+p.getZ(i));}
    softenSharedNormals(g);return mesh(g,material,name);
  }
  rearPanel(1.31,.16,.075,2.79,materials.shell,'Broad sculpted shoulder-to-tray transition',.036,0,.022);
  // The surround is a real open frame; a solid backing would hide the recessed
  // navy face when viewed from the rear.
  const roundedOutline=(path,w,h,r)=>{
    const x=-w/2,y=-h/2;
    path.moveTo(x+r,y);path.lineTo(x+w-r,y);path.quadraticCurveTo(x+w,y,x+w,y+r);
    path.lineTo(x+w,y+h-r);path.quadraticCurveTo(x+w,y+h,x+w-r,y+h);
    path.lineTo(x+r,y+h);path.quadraticCurveTo(x,y+h,x,y+h-r);
    path.lineTo(x,y+r);path.quadraticCurveTo(x,y,x+r,y);path.closePath();return path;
  };
  const traySurround=roundedOutline(new THREE.Shape(),1.19,.88,.032);
  traySurround.holes.push(roundedOutline(new THREE.Path(),1.075,.765,.023));
  const surroundGeometry=new THREE.ExtrudeGeometry(traySurround,{depth:.050,bevelEnabled:true,bevelThickness:.01,bevelSize:.008,bevelSegments:3,curveSegments:12,steps:1});
  const surroundPoints=surroundGeometry.attributes.position;
  for(let i=0;i<surroundPoints.count;i++){
    const y=surroundPoints.getY(i)+2.325;
    surroundPoints.setXYZ(i,surroundPoints.getX(i),y,spine(y)-.15-.065+surroundPoints.getZ(i)-.025);
  }
  softenSharedNormals(surroundGeometry);mesh(surroundGeometry,materials.aluminium,'Open bevelled silver surround of recessed tray');
  rearPanel(1.075,.765,.030,2.325,materials.navy,'Recessed closed navy tray table',.023,0,.082);
  rearPanel(1.075,.024,.018,2.275,materials.aluminium,'Tray horizontal divider',.006,0,.100);
  rearPanel(.22,.055,.018,2.725,materials.aluminium,'Tray rounded upper latch surround',.021,0,.103);
  rearPanel(.052,.105,.036,2.705,materials.polymer,'Tray rotating top latch',.018,0,.122);
  const cupY=2.105,cupX=-.37,cupZ=spine(cupY)-.15-.106;
  const cup=mesh(new THREE.TorusGeometry(.071,.009,10,40),materials.aluminium,'Tray circular cup recess rim');cup.position.set(cupX,cupY,cupZ);cup.rotation.y=Math.PI;
  const cupCore=mesh(new THREE.CircleGeometry(.061,36),materials.shell,'Tray cup recess');cupCore.position.set(cupX,cupY,cupZ+.004);cupCore.rotation.y=Math.PI;
  for(const x of [-.40,.40])rearPanel(.10,.045,.032,1.895,materials.polymer,'Tray lower hinge',.012,x,.075);
  // Power fascia, blue USB insert and restrained universal socket details.
  rearPanel(.46,.23,.044,1.725,materials.polymer,'Power module gasket',.035,0,.026);
  rearPanel(.41,.185,.034,1.725,materials.aluminium,'Power module fascia',.025,0,.057);
  rearPanel(.105,.14,.008,1.725,materials.navy,'USB port blue surround',.01,.11,.079);
  for(const y of [1.690,1.752]) rearPanel(.064,.026,.012,y,materials.inset,'USB port opening',.004,.11,.089);
  for(const [x,y] of [[-.08,1.755],[-.045,1.700],[-.115,1.700]]) rearPanel(.024,.042,.012,y,materials.inset,'Socket slot',.006,x,.082);
  // Soft cylindrical fabric pockets: rounded bottoms, open oval mouths and separate tabs.
  rearPanel(1.06,.46,.038,1.395,materials.polymer,'Curved lower accessory recess',.055,0,.026);
  for(const x of [-.31,0,.31]) {
    const positions=[],uvs=[],indices=[],rows=20,columns=36;
    for(let i=0;i<=rows;i++) {
      const t=i/rows,y=1.245+t*.265,r=Math.sqrt(Math.max(.005,1-((Math.max(0,.20-t))/.20)**2));
      const centreZ=spine(y)-.15-.077;
      for(let j=0;j<=columns;j++){
        const theta=j/columns*Math.PI*2;positions.push(x+.083*r*Math.cos(theta),y,centreZ+.066*r*Math.sin(theta));uvs.push(j/columns,t);
      }
    }
    for(let i=0;i<rows;i++)for(let j=0;j<columns;j++){const a=i*(columns+1)+j,b=a+1,c=a+columns+1,d=c+1;indices.push(a,d,b,a,c,d);}
    const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(positions,3));g.setAttribute('uv',new THREE.Float32BufferAttribute(uvs,2));g.setIndex(indices);g.computeVertexNormals();
    mesh(g,materials.pocket,'Soft open woven storage pouch');
    const rimPath=[];for(let i=0;i<48;i++){const theta=i/48*Math.PI*2;rimPath.push([x+.083*Math.cos(theta),1.51,spine(1.51)-.227+.066*Math.sin(theta)]);}
    pipe(rimPath,.008,materials.piping,'Oval open pocket mouth',true);
    const inner=mesh(new THREE.CylinderGeometry(.072,.067,.06,32,1,true),materials.inset,'Dark pocket inner lining');inner.scale.z=.73;inner.position.set(x,1.48,spine(1.51)-.227);
    const bottom=mesh(new THREE.CircleGeometry(.069,32),materials.inset,'Visible pocket interior');bottom.rotation.x=-Math.PI/2;bottom.scale.y=.76;bottom.position.set(x,1.45,spine(1.51)-.227);
    rearPanel(.068,.135,.025,1.555,materials.navy,'Rounded pocket closure tab',.018,x,.044);
    rearPanel(.020,.019,.014,1.568,materials.edgeMetal,'Pocket closure press stud',.006,x,.063);
    const seam=[];for(let i=0;i<=18;i++){const y=lerp(1.28,1.49,i/18);seam.push([x-.055,y,spine(y)-.15-.129]);}
    pipe(seam,.003,materials.piping,'Fabric pouch stitched edge');
  }
  rearPanel(.82,.04,.018,1.17,materials.inset,'Lower rear ventilation / storage slot',.01,0,.026);

  // A side-facing L-shaped under-seat storage assembly, matching the reference rear view.
  box(1.02,.055,.92,[0,.18,-.03],materials.shell,'Under-seat storage board',.022);
  box(.050,.61,.87,[.505,.48,-.055],materials.graphite,'Upright upholstered side storage panel',.022);
  const sidePanelPiping=[[.535,.775,-.47],[.535,.775,.36],[.535,.73,.40],[.535,.22,.40],[.535,.195,-.45],[.535,.24,-.49]];
  pipe(sidePanelPiping,.007,materials.piping,'Storage side-panel bound perimeter',true);
  const boardEdge=[[-.49,.21,-.47],[-.49,.21,.41],[.49,.21,.41],[.49,.21,-.47]];
  pipe(boardEdge,.009,materials.edgeMetal,'Storage board bound edge',true);
  for(const x of [-.20,.20]) {
    const path=new THREE.CatmullRomCurve3([new THREE.Vector3(x,.216,.28),new THREE.Vector3(x,.43,.12),new THREE.Vector3(x,.45,-.17),new THREE.Vector3(x,.216,-.36)]);
    const positions=[],uvs=[],indices=[];
    for(let i=0;i<=32;i++){
      const p=path.getPoint(i/32);positions.push(p.x-.033,p.y,p.z,p.x+.033,p.y,p.z);uvs.push(0,i/32,1,i/32);
      if(i<32){const a=i*2;indices.push(a,a+1,a+3,a,a+3,a+2);}
    }
    const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(positions,3));g.setAttribute('uv',new THREE.Float32BufferAttribute(uvs,2));g.setIndex(indices);g.computeVertexNormals();
    const strap=mesh(g,materials.pocket.clone(),'Curved woven navy storage strap');strap.material.side=THREE.DoubleSide;
  }
  group.userData.schematic=false;
  group.userData.source='MODUFRAME front and rear concept renders / Simon Xia SDE project';
  group.userData.description='Assembled 3D visualisation rebuilt to match the upholstered chair concept; no component separation.';
  group.updateMatrixWorld(true);
  const bounds=new THREE.Box3().setFromObject(group);
  return {group,parts,wireframes,materials,bounds};
}
