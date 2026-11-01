import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';
import assert from 'node:assert/strict';
import { projects } from '../content.js';
import { projectStories } from '../project-stories.js';
import { projectProcesses } from '../project-process.js';

const root = fileURLToPath(new URL('../', import.meta.url));
const html = readFileSync(root + 'index.html', 'utf8');
const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
assert.equal(new Set(ids).size, ids.length, 'Duplicate document IDs');
for (const id of ['home', 'about', 'work', 'approach', 'contact']) assert(ids.includes(id), `Missing section: ${id}`);
for (const [, link] of html.matchAll(/(?:href|src|poster)="([^"]+)"/g)) {
  if (link.startsWith('/')) assert(existsSync(root + link.slice(1)), `Missing local asset: ${link}`);
  if (link.startsWith('#')) assert(ids.includes(link.slice(1)), `Broken section link: ${link}`);
}
for (const script of ['main.js', 'content.js', 'case-study.js', 'project-process.js', 'runner-world.js', 'runner-motion.js', 'motion.js', 'page-motion.js', 'scroll-controller.js', 'vendor/lenis/lenis.js', 'vendor/GLTFLoader.js', 'vendor/BufferGeometryUtils.js', 'project-gallery.js', 'project-scenes.js', 'project-stories.js', 'axispro-model.js', 'streamx-model.js', 'path-model.js', 'simrest-model.js', 'moduframe-model.js']) execFileSync(process.execPath, ['--check', root + script]);
const projectLinks = [...html.matchAll(/data-project="([^"]+)"/g)].map(match => match[1]);
for (const key of projectLinks) assert(projects[key], `Unknown project link: ${key}`);
const projectKeys = [...new Set(projectLinks)];
assert.deepEqual(projectKeys.sort(), Object.keys(projects).sort(), 'Project links must match their case studies');
const spreadKeys = [...html.matchAll(/data-book-project="([^"]+)"/g)].map(match => match[1]);
assert.deepEqual(spreadKeys.sort(), Object.keys(projects).sort(), 'The book needs one spread per project');
assert.deepEqual(Object.keys(projectStories).sort(), projectKeys.sort(), 'Every project needs its own 3D story');
assert.deepEqual(Object.keys(projectProcesses).sort(), projectKeys.sort(), 'Every project needs a process case study');
for (const process of Object.values(projectProcesses)) {
  const stageIds = process.stages.map(stage => stage.id);
  assert.equal(new Set(stageIds).size, stageIds.length, 'Process navigation IDs must be unique');
  for (const stage of process.stages) {
    assert(stage.title && stage.body && stage.images.length, 'Each process stage must include explanation and visual evidence');
    for (const item of stage.images) {
      assert(existsSync(root + item.src.slice(1)), `Missing process image: ${item.src}`);
      assert(item.alt && item.caption && item.width > 0 && item.height > 0, `Missing image description or dimensions: ${item.src}`);
    }
  }
}
for (const story of Object.values(projectStories)) assert.equal(story.chapters.length, 3, 'Each narrative must have three chapters');
for (const project of Object.values(projects)) {
  for (const asset of [project.image, ...project.gallery.map(item => item.src)]) {
    assert(existsSync(root + asset.slice(1)), `Missing case-study image: ${asset}`);
  }
}

for (const model of ['runner.glb', 'axispro-original.glb']) assert(existsSync(root + 'assets/models/' + model), `Missing 3D model: ${model}`);

// Check local module dependencies, including transitive vendor loader imports.
function checkModules(folder) {
  for (const item of readdirSync(folder, { withFileTypes: true })) {
    const path = resolve(folder, item.name);
    if (item.isDirectory()) checkModules(path);
    else if (path.endsWith('.js')) {
      const source = readFileSync(path, 'utf8');
      for (const match of source.matchAll(/(?:from\s+|import\s*\()(['"])(\.[^'"]+)\1/g)) {
        assert(existsSync(resolve(dirname(path), match[2])), `Missing module ${match[2]} imported by ${path}`);
      }
    }
  }
}
checkModules(root);

console.log('Passed: five sections, navigation, case-study assets, 3D assets, JavaScript syntax and local module dependencies.');
