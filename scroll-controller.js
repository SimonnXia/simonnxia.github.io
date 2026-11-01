import Lenis from './vendor/lenis/lenis.js';
import { gsap, ScrollTrigger } from './motion.js';
let page, project, initialized=false;
const options={autoRaf:false,smoothWheel:true,syncTouch:false,respectReducedMotion:true,lerp:.105,wheelMultiplier:.92,stopInertiaOnNavigate:true};
const tick=time=>{page?.raf(time*1000);project?.raf(time*1000);};
export function initPageScroll(){
  if(initialized)return;initialized=true;
  page=new Lenis({...options,prevent:node=>node.id==='project-dialog',virtualScroll:({event})=>{
    if(event.defaultPrevented)return false;
    return true;
  }});
  page.on('scroll',ScrollTrigger.update);
  // Own the anchor transition so the browser's hash jump cannot race Lenis.
  document.addEventListener('click',event=>{
    const link=event.target.closest?.('a[href]');
    if(!link||event.defaultPrevented||event.button!==0||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey||link.target||link.hasAttribute('download'))return;
    const url=new URL(link.href,location.href);
    if(url.origin!==location.origin||url.pathname!==location.pathname||url.search!==location.search||!url.hash)return;
    const target=document.getElementById(decodeURIComponent(url.hash.slice(1)));
    if(!target)return;
    event.preventDefault();
    if(location.hash!==url.hash)history.pushState(null,'',url.hash);
    scrollPageTo(target,{onComplete:()=>{
      const hadTabindex=target.hasAttribute('tabindex');
      if(!hadTabindex)target.setAttribute('tabindex','-1');
      target.focus({preventScroll:true});
      if(!hadTabindex)target.addEventListener('blur',()=>target.removeAttribute('tabindex'),{once:true});
    }});
  });
  gsap.ticker.add(tick);gsap.ticker.lagSmoothing(0);
  ScrollTrigger.addEventListener('refresh',()=>{page?.resize();project?.resize();});
  document.fonts?.ready.then(()=>ScrollTrigger.refresh());
  window.addEventListener('pageshow',e=>{if(e.persisted){page?.resize();project?.resize();ScrollTrigger.refresh();}});
  window.addEventListener('pagehide',e=>{if(e.persisted)return;gsap.ticker.remove(tick);project?.destroy();page?.destroy();});
}
export function openProjectScroll(wrapper){
  page?.stop();project?.destroy();
  project=new Lenis({...options,wrapper,content:wrapper.querySelector('#project-scroll-content'),eventsTarget:wrapper,lerp:.12,wheelMultiplier:.95,overscroll:false});
  project.on('scroll',ScrollTrigger.update);
  project.scrollTo(0,{immediate:true});
}
export function closeProjectScroll(){project?.destroy();project=null;page?.resize();page?.start();ScrollTrigger.update();}
export function scrollPageTo(target,options={}){
  // Pinned sections must use their original scroll position, not the moved DOM box.
  const element=typeof target==='string'?document.querySelector(target):target;
  const pinned=element?.id==='home'?ScrollTrigger.getById('portfolio-world'):null;
  if(pinned)target=pinned.start;
  if(page)page.scrollTo(target,{...options});
  else window.scrollTo({top:typeof target==='number'?target:document.querySelector(target)?.offsetTop||0,behavior:'smooth'});
}
export function scrollProjectTo(top){
  if(project)project.scrollTo(top);
  else document.querySelector('#project-scroll').scrollTo({top,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});
}
