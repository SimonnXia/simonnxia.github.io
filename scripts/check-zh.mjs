import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { projects as enProjects } from '../content.js';
import { projectProcesses as enProcesses } from '../project-process.js';
import { projects, profile } from '../zh/content.js';
import { projectProcesses } from '../zh/project-process.js';
import { projectStories } from '../zh/project-stories.js';

const root = fileURLToPath(new URL('../', import.meta.url));
const html = readFileSync(root + 'zh/index.html', 'utf8');
const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
assert(html.includes('lang="zh-CN"'));
assert.equal(ids.length, new Set(ids).size, 'Duplicate Chinese document IDs');
assert.equal(profile.name, '夏琛沣');
assert.deepEqual(Object.keys(projects).sort(), Object.keys(enProjects).sort());
assert.deepEqual(Object.keys(projectProcesses).sort(), Object.keys(projects).sort());
assert.deepEqual(Object.keys(projectStories).sort(), Object.keys(projects).sort());
assert.equal((html.match(/class="language-switch"/g) || []).length, 1);
for (const [, link] of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
  if (link.startsWith('/')) assert(existsSync(root + link.slice(1)), `Missing asset: ${link}`);
  if (link.startsWith('#')) assert(ids.includes(link.slice(1)), `Missing anchor: ${link}`);
}
for (const [key, project] of Object.entries(projectProcesses)) {
  const original = enProcesses[key];
  assert.equal(project.stages.length, original.stages.length, `Missing process stages: ${key}`);
  project.stages.forEach((stage, index) => {
    assert.equal(stage.id, original.stages[index].id);
    assert(/[\u3400-\u9fff]/.test(stage.title + stage.body), `Untranslated stage: ${key}/${stage.id}`);
    assert.equal(stage.images.length, original.stages[index].images.length);
    stage.images.forEach((item, imageIndex) => {
      assert.equal(item.src, original.stages[index].images[imageIndex].src);
      assert(existsSync(root + item.src.slice(1)), `Missing image: ${item.src}`);
      assert(item.alt && item.caption && item.width > 0 && item.height > 0);
    });
  });
  assert.equal(projectStories[key].chapters.length, 3);
}
assert(html.includes('/assets/downloads/Simon-Xia-Portfolio-2026-CN.pdf'));
assert(html.includes('/assets/downloads/Simon-Xia-CV-CN.pdf'));
assert(readFileSync(root + 'index.html', 'utf8').includes('/assets/downloads/Simon-Xia-Portfolio-2026.pdf'));
console.log('Passed: Chinese navigation, language entry, five projects, all original process images, narrative chapters and separate PDF downloads.');
