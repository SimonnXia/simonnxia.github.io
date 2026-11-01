/** STREAM X — simplified clay body study, guided by the supplied CAD render.
 * Clay body proportions, fitted rolling wheels and the rear airflow channel.
 * This is a geometric interpretation; the original project renders remain in the case study.
 */
export function createStreamX(THREE) {
  const group = new THREE.Group(); group.name = 'STREAM X / clay form study';
  const wheels = [], wireframes = [];
  const wheelRadius=.505, wheelCenterY=.535;
  const materials = {
    body: new THREE.MeshStandardMaterial({ color:0x555960, metalness:.18, roughness:.56, side:THREE.DoubleSide }),
    tyre: new THREE.MeshStandardMaterial({color:0x202522,metalness:0,roughness:.88}),
    rim: new THREE.MeshStandardMaterial({color:0xa8ada9,metalness:.72,roughness:.30}),
    brake: new THREE.MeshStandardMaterial({color:0x565e59,metalness:.55,roughness:.54}),
  };
  const wireMaterial = new THREE.LineBasicMaterial({color:0xc9d2e7,transparent:true,opacity:0,depthWrite:false});
  // Shape-preserving cubic interpolation: C1-continuous profiles with no overshoot or cusp.
  function profile(nodes) {
    const n=nodes.length,h=[],d=[],m=[];
    for(let i=0;i<n-1;i++){h[i]=nodes[i+1][0]-nodes[i][0];d[i]=(nodes[i+1][1]-nodes[i][1])/h[i];}
    m[0]=d[0];m[n-1]=d[n-2];
    for(let i=1;i<n-1;i++){
      if(d[i-1]*d[i]<=0)m[i]=0;
      else{const a=2*h[i]+h[i-1],b=h[i]+2*h[i-1];m[i]=(a+b)/(a/d[i-1]+b/d[i]);}
    }
    return value=>{
      if(value<=nodes[0][0])return nodes[0][1];if(value>=nodes[n-1][0])return nodes[n-1][1];
      let i=0;while(nodes[i+1][0]<value)i++;
      const t=(value-nodes[i][0])/h[i],t2=t*t,t3=t2*t;
      return (2*t3-3*t2+1)*nodes[i][1]+(t3-2*t2+t)*h[i]*m[i]+(-2*t3+3*t2)*nodes[i+1][1]+(t3-t2)*h[i]*m[i+1];
    };
  }
  const smoothstep=(a,b,value)=>{const t=Math.max(0,Math.min(1,(value-a)/(b-a)));return t*t*(3-2*t);};
  const bodyWidth=profile([[-3.06,1.07],[-2.72,1.23],[-1.85,1.29],[-.3,1.19],[.65,1.20],[1.86,1.27],[2.43,1.14],[2.85,.91],[3.13,.57],[3.28,.29],[3.36,.018]]);
  // An elliptical plan-view tip keeps the bonnet broad until it turns around the nose.
  // The previous narrow taper made the front look pinched and left sharp outer shoulders.
  const width=z=>{
    const t=Math.max(0,(z-1.86)/1.5),ellipse=1.27*Math.sqrt(Math.max((.018/1.27)**2,1-t*t));
    const blend=smoothstep(1.86,2.4,z);return bodyWidth(z)*(1-blend)+ellipse*blend;
  };
  const roof=profile([[-3.06,.85],[-2.65,1.06],[-1.9,1.29],[-1.1,1.59],[-.45,1.69],[.12,1.63],[.64,1.48],[1.16,1.28],[1.80,1.22],[2.26,1.07],[2.68,.88],[3.0,.665],[3.21,.48],[3.36,.30]]);
  const belt=profile([[-3.06,.81],[-2.65,1.02],[-1.85,1.16],[-.8,.98],[.55,.97],[1.85,1.13],[2.45,.76],[2.91,.40],[3.23,.265],[3.36,.236]]);
  const roofWidth=profile([[-3.06,0.92],[-2.5,0.92],[-1.8,0.80],[-0.65,0.61],[0.35,0.60],[1.05,0.65],[1.6,0.75],[3.06,0.83]]);
  const arch=profile([[0,1.08],[0.20,1.043],[0.40,0.903],[0.52,0.708],[0.58,0.407],[0.65,0.245],[0.72,0.235]]);
  const scoop=profile([[-1.4,0],[-0.65,1],[0.5,1],[1.4,0]]);
  const channel=profile([[-3.06,0],[-2.65,1],[-1.9,1],[-1.15,0]]);
  const archHeight=z=>Math.max(0.235,arch(Math.abs(z-1.84)),arch(Math.abs(z+1.87)));
  function crossSection(z) {
    const w=width(z),r=roof(z),a=archHeight(z),b=belt(z),rw=w*roofWidth(z);
    const crownRaw=Math.max(0,Math.min(1,((r-b)-0.12)/0.30));
    const crown=crownRaw*crownRaw*(3-2*crownRaw);
    const roofSide=(r*0.35+b*0.65)*(1-crown)+(r-0.080)*crown;
    const outerShoulder=Math.max(b-.018,a+.065),archLip=a+.014;
    const hollow=channel(z)*0.07;
    const lowerX=w-0.095*(1-Math.min(1,(a-0.235)/0.6))*scoop(z);
    const points=[
      new THREE.Vector3(0,r,z),
      new THREE.Vector3(rw*0.58,r+(roofSide-r)*0.18,z),
      new THREE.Vector3(rw,roofSide,z),
      new THREE.Vector3(w*0.92,b+0.010-hollow,z),
      new THREE.Vector3(w,outerShoulder,z),
      new THREE.Vector3(lowerX,outerShoulder*0.52+archLip*0.48,z),
      new THREE.Vector3(w*0.988,archLip,z),
      new THREE.Vector3(w*0.755,a+0.010,z),
      new THREE.Vector3(w*0.69,0.224,z),
      new THREE.Vector3(0,0.224,z),
    ];
    // A single convex bonnet rolls into the arch, instead of dipping before a raised
    // fender ridge. The smooth longitudinal blend leaves the cabin and rear unchanged.
    const bonnet=smoothstep(1.18,1.94,z),depth=r-archLip;
    const roundNose=[
      [0,r],[w*.36,r-depth*.018],[w*.69,r-depth*.11],
      [w*.90,r-depth*.40],[w,r-depth*.81],
      [w*.997,archLip+depth*.035],[w*.988,archLip],
    ];
    for(let i=0;i<roundNose.length;i++){
      points[i].x+=(roundNose[i][0]-points[i].x)*bonnet;
      points[i].y+=(roundNose[i][1]-points[i].y)*bonnet;
    }
    // The arch underside folds inward to form a closed wheel tunnel.
    return new THREE.CatmullRomCurve3(points,false,'centripetal');
  }
  function point(side,t,z,offset=0) {
    const p=crossSection(z).getPoint(t);p.x*=side;
    if(offset){p.x+=side*offset*Math.sin(t*Math.PI);p.y+=offset*Math.cos(t*Math.PI);}
    return p;
  }
  function geometry(positions,indices) {
    const geo=new THREE.BufferGeometry();geo.setAttribute('position',new THREE.Float32BufferAttribute(positions,3));geo.setIndex(indices);geo.computeVertexNormals();return geo;
  }
  function surface(fn,rows,cols) {
    const p=[],ids=[];for(let j=0;j<=rows;j++)for(let i=0;i<=cols;i++){const v=fn(i/cols,j/rows);p.push(v.x,v.y,v.z);}
    for(let j=0;j<rows;j++)for(let i=0;i<cols;i++){const a=j*(cols+1)+i,c=a+cols+1;ids.push(a,c,a+1,a+1,c,c+1);}
    return geometry(p,ids);
  }
  function add(name,geo,mat,parent=group,wire=true) {
    const mesh=new THREE.Mesh(geo,mat);mesh.name=name;mesh.castShadow=true;mesh.receiveShadow=true;parent.add(mesh);
    if(wire){const lines=new THREE.LineSegments(new THREE.WireframeGeometry(geo),wireMaterial);lines.name=name+' / wire';lines.visible=false;parent.add(lines);wireframes.push(lines);mesh.userData.wireframe=lines;}
    return mesh;
  }


  // One closed shell; a single vertex ring continues from bonnet through roof to fastback tail.
  const positions=[],indices=[],sections=240,half=56,ring=half*2;
  for(let j=0;j<=sections;j++){
    const z=-3.06+6.42*j/sections,curve=crossSection(z);
    for(let i=0;i<ring;i++){
      const t=i<=half?i/half:(ring-i)/half,side=i<=half?1:-1;
      const p=curve.getPoint(t);positions.push(p.x*side,p.y,z);
    }
  }
  for(let j=0;j<sections;j++)for(let i=0;i<ring;i++){
    const a=j*ring+i,b=j*ring+(i+1)%ring,c=a+ring,d=b+ring;indices.push(a,c,b,b,c,d);
  }
  // Convex face closures are gently rounded by a shallow additional axial offset.
  for(const front of [false,true]){
    const j=front?sections:0,base=j*ring,centre=positions.length/3;
    const z=front?3.366:-3.09;positions.push(0,front?.234:.54,z);
    for(let i=0;i<ring;i++){const a=base+i,b=base+(i+1)%ring;indices.push(...(front?[centre,b,a]:[centre,a,b]));}
  }
  const shell=add('Continuous coupe shell with closed wheel tunnels',geometry(positions,indices),materials.body);
  shell.userData.closedShell=true;



  // Subtle same-material glazing relief, as in the monochrome CAD study.
  // Keep glazing and trim restrained so the body remains a monochrome form study.
  const relief = materials.body.clone(); relief.color.set(0x4b4f55); relief.roughness=.59;
  materials.relief=relief;
  const windEdge=profile([[0,.16],[.4,.20],[1,.31]]);
  add('Windscreen relief',surface((u,v)=>{
    const side=u<.5?-1:1,f=Math.abs(u*2-1),z=.22+.16*f*f+v*(.95-.26*f*f);
    return point(side,f*windEdge(v),z,.012);
  },36,38),relief,group,false);
  const top=profile([[-1.72,.29],[-1.20,.21],[-.5,.195],[.3,.215],[.92,.332]]);
  const bottom=profile([[-1.72,.29],[-1.20,.337],[-.5,.35],[.3,.351],[.92,.332]]);
  for(const side of [-1,1])add('Side window relief',surface((u,v)=>{
    const z=-1.72+2.64*v;return point(side,top(z)*(1-u)+bottom(z)*u,z,.012);
  },44,14),relief,group,false);
  // A thin continuous rear lip describes the integrated airflow channel.
  add('Integrated rear channel',surface((u,v)=>{
    const side=u<.5?-1:1,f=Math.abs(u*2-1),z=-1.04-v*1.87;
    const p=point(side,f*(.22+v*.12),z,.008);
    p.y+=.11*Math.sin(Math.PI*v)*Math.pow(f,.8);return p;
  },48,32),materials.body,group,false);

  // Each fixed axle pivot contains a separately rotating wheel. All four contact
  // patches sit on the same plane; radius also drives the scroll-to-rotation ratio.
  const tyreProfile=[
    [.374,-.118],[.414,-.130],[.452,-.132],[.480,-.118],
    [.499,-.092],[wheelRadius,-.060],[wheelRadius,.060],
    [.499,.092],[.480,.118],[.452,.132],[.414,.130],
    [.374,.118],[.374,-.118],
  ];
  const tyreGeometry=new THREE.LatheGeometry(tyreProfile.map(([r,x])=>new THREE.Vector2(r,x)),72);
  tyreGeometry.rotateZ(Math.PI/2);
  const barrelGeometry=new THREE.CylinderGeometry(.374,.374,.224,64,1,true);
  barrelGeometry.rotateZ(Math.PI/2);
  const lipGeometry=new THREE.TorusGeometry(.357,.016,10,64);
  lipGeometry.rotateY(Math.PI/2);
  const hubGeometry=new THREE.CylinderGeometry(.083,.083,.042,32);
  hubGeometry.rotateZ(Math.PI/2);
  const brakeGeometry=new THREE.CylinderGeometry(.304,.304,.018,48);
  brakeGeometry.rotateZ(Math.PI/2);
  const spokeGeometry=new THREE.BoxGeometry(.031,.284,.028);
  for(const [axle,z] of [['front',1.84],['rear',-1.87]])for(const side of [-1,1]){
    const assembly=new THREE.Group();
    assembly.name=`${axle} ${side<0?'left':'right'} / fixed axle`;
    assembly.position.set(side*width(z)*.882,wheelCenterY,z);
    group.add(assembly);
    const spinning=new THREE.Group();spinning.name=`${axle} ${side<0?'left':'right'} / wheel`;
    spinning.userData.radius=wheelRadius;assembly.add(spinning);wheels.push(spinning);
    add('Rubber tyre',tyreGeometry,materials.tyre,spinning,false);
    add('Metallic rim barrel',barrelGeometry,materials.rim,spinning,false);
    const face=side*.118;
    const lip=add('Rim lip',lipGeometry,materials.rim,spinning,false);lip.position.x=face;
    const hub=add('Wheel hub',hubGeometry,materials.rim,spinning,false);hub.position.x=face;
    const disc=add('Recessed brake disc',brakeGeometry,materials.brake,assembly,false);disc.position.x=side*.055;
    for(let i=0;i<5;i++)for(const branch of [-1,1]){
      const spoke=new THREE.Group();spoke.rotation.x=i*Math.PI*2/5;
      const mesh=add('Split spoke',spokeGeometry,materials.rim,spoke,false);
      mesh.position.set(face,.222,branch*.030);mesh.rotation.x=branch*.105;
      spinning.add(spoke);
    }
  }
  group.userData.wheelContactY=wheelCenterY-wheelRadius;

  group.userData.schematic = true;
  group.userData.description = 'Simplified clay body study based on the supplied STREAM X CAD render.';
  return { group, wheels, wheelRadius, wheelContactY:wheelCenterY-wheelRadius, wireframes, materials };
}
