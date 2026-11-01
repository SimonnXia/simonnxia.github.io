import { gsap, ScrollTrigger } from './motion.js';

// Small supporting gestures share the same clock as the main 3D narrative.
// All content is visible by default; reduced motion leaves the layout untouched.
export function initPageMotion() {
  const media = gsap.matchMedia();
  media.add('(prefers-reduced-motion: no-preference)', () => {
    const portrait = document.querySelector('.portrait-wrap img');
    gsap.fromTo(portrait, {yPercent:-3, scale:1.08}, {
      yPercent:3, ease:'none',
      scrollTrigger:{trigger:'.portrait-wrap',start:'top bottom',end:'bottom top',scrub:true},
    });
    for (const section of ['#about', '#approach']) {
      gsap.from(`${section} .section-heading`, {
        y:22, opacity:0, duration:.75, ease:'power3.out',
        scrollTrigger:{trigger:section,start:'top 82%',once:true},
      });
    }
    gsap.from('#contact h2', {
      y:35, opacity:.35, ease:'none',
      scrollTrigger:{trigger:'#contact',start:'top 85%',end:'top 30%',scrub:true},
    });
    gsap.fromTo('#contact', {'--orbit-turn':'-12deg'}, {
      '--orbit-turn':'12deg',ease:'none',
      scrollTrigger:{trigger:'#contact',start:'top bottom',end:'bottom bottom',scrub:true},
    });
  });
  const links = [...document.querySelectorAll('.desktop-nav a')];
  const sections = [...document.querySelectorAll('main > section')];
  let watcher;
  function watchSections() {
    watcher?.disconnect();
    watcher = new IntersectionObserver(entries => {
    for (const entry of entries) if (entry.isIntersecting) {
      links.forEach(link => {
        if (link.hash === `#${entry.target.id}`) link.setAttribute('aria-current','location');
        else link.removeAttribute('aria-current');
      });
    }
    }, {rootMargin:`-${Math.round(innerHeight*.15)}px 0px -${Math.round(innerHeight*.70)}px 0px`});
    sections.forEach(section => watcher.observe(section));
  }
  watchSections();
  const resizeWatch = gsap.delayedCall(.2, watchSections).pause();
  const onResize = () => resizeWatch.restart(true);
  window.addEventListener('resize', onResize);
  // Refresh only after image loads that can change the document geometry.
  const refresh = gsap.delayedCall(.15, () => ScrollTrigger.refresh()).pause();
  document.querySelectorAll('main img').forEach(image => {
    if (!image.complete) image.addEventListener('load', () => refresh.restart(true), {once:true});
  });
  window.addEventListener('pagehide', event => {
    if (event.persisted) return;
    media.revert();watcher.disconnect();refresh.kill();resizeWatch.kill();window.removeEventListener('resize', onResize);
  }, {once:true});
}
