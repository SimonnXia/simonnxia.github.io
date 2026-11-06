import { gsap } from '../motion.js';
import { initPageMotion } from '../page-motion.js';
import { initCapabilityWheel } from '../capability-wheel.js';
import { profile, projects } from './content.js';
import { initPageScroll, openProjectScroll, closeProjectScroll, scrollProjectTo } from '../scroll-controller.js';
import { initProjectGallery } from '../project-gallery.js';
import { projectStories } from './project-stories.js';
import { renderProjectProcess } from './case-study.js';

initPageScroll();
initProjectGallery();
initPageMotion();
initCapabilityWheel();

const header = document.querySelector('#header');
const hero = document.querySelector('#home');
const contact = document.querySelector('#contact');
let toastTimer;

function updateHeader() {
  header.classList.toggle('on-paper', hero.getBoundingClientRect().bottom < 90 && contact.getBoundingClientRect().top > 65);
  header.classList.toggle('on-hero', hero.getBoundingClientRect().bottom >= 90);
}
window.addEventListener('scroll', updateHeader, { passive: true });
window.addEventListener('resize', updateHeader);
updateHeader();

// The decorative renderer is isolated so an unavailable GPU never blocks the portfolio.
import('./runner-world.js').then(({ initRunnerWorld }) => initRunnerWorld()).catch(error => { hero.dataset.scene = 'fallback'; console.warn('World scene unavailable', error); });

const email = profile.email || profile.emailPlaceholder;
document.querySelectorAll('[data-email]').forEach(el => { el.textContent = email; });
const emailLink = document.querySelector('#email-link');
emailLink.href = `mailto:${email}`;
if (profile.email) {
  document.querySelector('#email-note').hidden = true;
  document.querySelector('#copy-email span').textContent = '复制邮箱';
} else {
  emailLink.removeAttribute('href');
  emailLink.setAttribute('aria-label', '邮箱信息待补充。');
}
if (profile.name) {
  document.querySelectorAll('.wordmark').forEach(el => { el.textContent = `${profile.name.toUpperCase()}.`; });
  document.title = `${profile.name} Simon Xia — 设计工程作品集`;
}

function toast(message) {
  const el = document.querySelector('#toast');
  clearTimeout(toastTimer);
  el.textContent = message;
  el.classList.add('visible');
  toastTimer = setTimeout(() => el.classList.remove('visible'), 3200);
}
document.querySelector('#copy-email').addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(email);
    toast(profile.email ? '邮箱已复制，期待与你联系。' : '示例邮箱已复制。');
  } catch {
    const selection = window.getSelection();
    const range = document.createRange();
    range.selectNodeContents(emailLink);
    selection.removeAllRanges();
    selection.addRange(range);
    toast('已选中邮箱地址，请手动复制。');
  }
});

const dialog = document.querySelector('#project-dialog');
const projectScroll = document.querySelector('#project-scroll');
const story = document.querySelector('#project-story');
const chapterNav = document.querySelector('.project-chapters');
let lastProjectTrigger;
let sceneCleanup;
let processCleanup;
let sceneRequest = 0;
let dialogMotion, closing = false;
const motionReduced = matchMedia('(prefers-reduced-motion: reduce)');
function readCaseStudy() {
  scrollProjectTo(document.querySelector('#project-case-study').offsetTop);
  document.querySelector('#project-case-study').focus({ preventScroll: true });
}
document.querySelector('.project-case-link').addEventListener('click', readCaseStudy);
document.querySelectorAll('[data-project]').forEach(button => {
  button.addEventListener('click', () => {
    const key = button.dataset.project;
    const project = projects[key];
    if (!project) return;
    sceneCleanup?.();
    sceneCleanup = null;
    processCleanup?.();
    const request = ++sceneRequest;
    const narrative = projectStories[key];
    story.className = 'project-story';
    gsap.set(['#project-story-heading','#project-story-description'],{clearProps:'opacity,transform'});
    story.dataset.scene = 'loading';
    story.dataset.project = key;
    story.dataset.chapter = '1';
    dialog.dataset.theme = narrative.theme;
    document.querySelector('.project-model-caption').textContent = key === 'axispro' ? '原始 CAD 装配 · 滚动查看结构' : key === 'stream-x' ? '车身造型研究' : key === 'the-path' ? '空间概念模型' : key === 'moduframe' ? '概念模型 · 滚动环绕查看' : '交互模型展示';
    document.querySelector('#project-bar-title').textContent = project.title;
    document.querySelector('#project-story-name').textContent = narrative.title;
    document.querySelector('#project-story-category').textContent = narrative.category;
    document.querySelector('#project-story-heading').textContent = narrative.chapters[0].title;
    document.querySelector('#project-story-description').textContent = narrative.chapters[0].text;
    document.querySelector('#project-story-count').textContent = '01 / 03';
    document.querySelector('#project-story-progress').style.transform = 'scaleX(0)';
    document.querySelector('#project-scene').replaceChildren();
    const fallback = document.querySelector('#project-scene-fallback');
    fallback.src = project.image;
    fallback.alt = project.alt;
    fallback.hidden = false;
    chapterNav.hidden = true;
    chapterNav.querySelectorAll('button').forEach((item, i) => { item.textContent = narrative.chapters[i].label; });
    lastProjectTrigger = button;
    document.querySelector('#dialog-title').textContent = project.title;
    document.querySelector('#dialog-description').textContent = project.description;
    document.querySelector('#dialog-category').textContent = project.category;
    document.querySelector('#dialog-focus-label').textContent = project.focusLabel;
    document.querySelector('#dialog-focus').textContent = project.focus;
    document.querySelector('#dialog-context-label').textContent = project.contextLabel;
    document.querySelector('#dialog-context').textContent = project.context;
    document.querySelector('#dialog-credit').textContent = project.credit;
    document.querySelector('#dialog-image-caption').textContent = project.imageCaption;
    const companionView = document.querySelector('#dialog-companion-view');
    const companionImage = document.querySelector('#dialog-companion-image');
    companionView.hidden = !project.companionImage;
    document.querySelector('#dialog-image-label').hidden = !project.companionImage;
    document.querySelector('.case-hero').classList.toggle('case-hero-paired', Boolean(project.companionImage));
    if (project.companionImage) {
      companionImage.src = project.companionImage.src;
      companionImage.alt = project.companionImage.alt;
      document.querySelector('#dialog-companion-label').textContent = project.companionImage.label;
    } else {
      companionImage.removeAttribute('src');
      companionImage.alt = '';
    }
    processCleanup = renderProjectProcess(key, projectScroll);
    const image = document.querySelector('#dialog-image');
    image.src = project.image;
    image.alt = project.alt;
    image.className = `dialog-image ${project.imageStyle}`;
    if (project.imageWidth && project.imageHeight) {
      image.width = project.imageWidth;
      image.height = project.imageHeight;
    } else {
      image.removeAttribute('width');
      image.removeAttribute('height');
    }
    closing = false;
    dialogMotion?.kill();
    dialog.showModal();
    if (!motionReduced.matches) dialogMotion = gsap.fromTo(dialog, {opacity:0, y:22}, {opacity:1,y:0,duration:.42,ease:'power3.out',clearProps:'transform,opacity'});
    projectScroll.scrollTo({ top: 0, behavior: 'instant' });
    document.body.style.overflow = 'hidden';
    openProjectScroll(projectScroll);
    dialog.querySelector('.dialog-close').focus();
    import('../project-scenes.js').then(async ({ initProjectScene }) => {
      if (!dialog.open || request !== sceneRequest) return;
      const cleanup = await initProjectScene({ key, config: narrative, scroller: projectScroll, story, isCurrent: () => dialog.open && request === sceneRequest });
      if (!dialog.open || request !== sceneRequest) cleanup?.();
      else sceneCleanup = cleanup;
    }).catch(() => { if (request === sceneRequest) story.dataset.scene = 'fallback'; });
  });
});
function closeDialog() {
  if (closing || !dialog.open) return;
  closing = true;
  dialogMotion?.kill();
  if (motionReduced.matches) dialog.close();
  else dialogMotion = gsap.to(dialog, {opacity:0, y:14, duration:.22, ease:'power2.in', onComplete:() => dialog.close()});
}
dialog.querySelector('.dialog-close').addEventListener('click', closeDialog);
dialog.querySelector('.case-return').addEventListener('click', closeDialog);
dialog.addEventListener('cancel', event => {event.preventDefault();closeDialog();});
dialog.addEventListener('click', e => {
  if (e.target !== dialog) return;
  const bounds = dialog.getBoundingClientRect();
  if (e.clientX < bounds.left || e.clientX > bounds.right || e.clientY < bounds.top || e.clientY > bounds.bottom) closeDialog();
});
dialog.addEventListener('close', () => {
  dialogMotion?.kill();
  gsap.set(dialog,{clearProps:'transform,opacity'});
  closing = false;
  ++sceneRequest;
  sceneCleanup?.();
  sceneCleanup = null;
  processCleanup?.();
  processCleanup = null;
  document.querySelector('#project-scene').replaceChildren();
  document.body.style.overflow = '';
  closeProjectScroll();
  lastProjectTrigger?.focus({ preventScroll: true });
});
