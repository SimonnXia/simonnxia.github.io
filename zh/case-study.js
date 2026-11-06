import { projectProcesses } from './project-process.js';
import { scrollProjectTo } from '../scroll-controller.js';

const viewer = document.querySelector('#image-viewer');
const viewerImage = document.querySelector('#image-viewer-image');
const previous = document.querySelector('#image-viewer-prev');
const next = document.querySelector('#image-viewer-next');
let imageItems = [], imageIndex = 0, imageTrigger;

function showImage(index) {
  imageIndex = Math.max(0, Math.min(imageItems.length - 1, index));
  const item = imageItems[imageIndex];
  viewerImage.src = item.src;
  viewerImage.alt = item.alt;
  document.querySelector('#image-viewer-caption').textContent = item.caption + (item.kind === 'render' ? ' AI 辅助概念可视化。' : '');
  document.querySelector('#image-viewer-position').textContent = `${imageIndex + 1} / ${imageItems.length}`;
  previous.disabled = imageIndex === 0;
  next.disabled = imageIndex === imageItems.length - 1;
}
document.querySelector('#image-viewer-close').addEventListener('click', () => viewer.close());
previous.addEventListener('click', () => showImage(imageIndex - 1));
next.addEventListener('click', () => showImage(imageIndex + 1));
viewer.addEventListener('keydown', event => {
  if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
    event.preventDefault(); showImage(imageIndex + (event.key === 'ArrowRight' ? 1 : -1));
  }
});
viewer.addEventListener('close', () => imageTrigger?.focus({ preventScroll: true }));

function element(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text) node.textContent = text;
  return node;
}

export function renderProjectProcess(key, scroller) {
  const project = projectProcesses[key];
  const nav = document.querySelector('#process-nav');
  const container = document.querySelector('#process-stages');
  document.querySelector('.process-heading p').textContent = project.intro;
  nav.replaceChildren(); container.replaceChildren();
  imageItems = project.stages.flatMap(stage => stage.images);
  const sections = [], buttons = [], controller = new AbortController();
  let imageNumber = 0, frame = 0;
  project.stages.forEach((stage, index) => {
    const section = element('section', 'process-stage');
    section.id = `process-${key}-${stage.id}`;
    section.tabIndex = -1;
    section.setAttribute('aria-labelledby', `${section.id}-title`);
    const title = element('h4', '', stage.title);
    title.id = `${section.id}-title`;
    const copy = element('div', 'process-stage-copy');
    copy.append(element('span', 'process-number', String(index + 1).padStart(2, '0')), title, element('p', '', stage.body));
    const images = element('div', 'process-images');
    if (stage.images.length === 1) images.classList.add('process-images-single');
    let activeGroup, groupImages = images;
    stage.images.forEach(item => {
      if (item.group && item.group !== activeGroup) {
        activeGroup = item.group;
        images.classList.add('process-images-grouped');
        const group = element('div', 'process-image-group');
        group.append(element('h5', 'process-group-title', activeGroup));
        groupImages = element('div', 'process-group-grid');
        groupImages.dataset.count = stage.images.filter(image => image.group === activeGroup).length;
        group.append(groupImages);
        images.append(group);
      }
      const figure = element('figure', `process-figure${item.size ? ` process-figure-${item.size}` : ''}`);
      if (item.kind) figure.dataset.kind = item.kind;
      // Equal photo mounts keep mixed portrait and landscape sources aligned.
      // Intrinsic image dimensions and contain-fit preserve every original crop.
      const button = element('button', 'process-image-button');
      button.type = 'button';
      button.setAttribute('aria-label', `放大图片：${item.alt}`);
      const image = element('img');
      Object.assign(image, {src:item.src, alt:item.alt, loading:'lazy', decoding:'async', width:item.width, height:item.height});
      const expand = element('span', 'process-expand', '查看大图 ↗');
      expand.setAttribute('aria-hidden', 'true');
      button.append(image, expand);
      const position = imageNumber++;
      button.addEventListener('click', () => {
        imageTrigger = button; showImage(position); viewer.showModal();
        document.querySelector('#image-viewer-close').focus();
      });
      const caption = element('figcaption');
      if (item.title) caption.append(element('strong', 'process-image-title', item.title));
      caption.append(element('span', '', item.caption));
      if (item.kind === 'drawing' && item.group) caption.append(element('small', 'process-image-kind', '原始细节图纸'));
      figure.append(button, caption);
      groupImages.append(figure);
    });
    section.append(copy, images); container.append(section); sections.push(section);
    const button = element('button');
    button.type = 'button'; button.setAttribute('aria-controls', section.id);
    button.append(element('span', '', String(index + 1).padStart(2, '0')), element('span', '', stage.label));
    button.addEventListener('click', () => {
      const navOffset = matchMedia('(max-width: 900px)').matches ? nav.offsetHeight + 26 : 28;
      const top = scroller.scrollTop + section.getBoundingClientRect().top - scroller.getBoundingClientRect().top - navOffset;
      scrollProjectTo(top);
      section.focus({preventScroll:true});
    });
    buttons.push(button); nav.append(button);
  });
  function update() {
    frame = 0;
    const baseline = scroller.getBoundingClientRect().top + Math.min(scroller.clientHeight * .35, 240);
    let current = 0;
    sections.forEach((section, index) => { if (section.getBoundingClientRect().top <= baseline) current = index; });
    buttons.forEach((button, index) => {
      if (index === current) button.setAttribute('aria-current', 'step');
      else button.removeAttribute('aria-current');
    });
  }
  scroller.addEventListener('scroll', () => { if (!frame) frame = requestAnimationFrame(update); }, {passive:true, signal:controller.signal});
  update();
  return () => { controller.abort(); cancelAnimationFrame(frame); if (viewer.open) viewer.close(); imageItems = []; imageTrigger = null; };
}
