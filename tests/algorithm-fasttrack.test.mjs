import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { chapters, patterns } from '../scripts/algorithm-fasttrack/outline.mjs';
import { supplements } from '../scripts/algorithm-fasttrack/supplements.mjs';
import { filterQuestions, validateDataset, initialCode } from '../src/core.js';

const data = JSON.parse(await readFile(new URL('../public/data/algorithm-fasttrack.json', import.meta.url), 'utf8'));

test('算法题速通完整覆盖六种结构、75题、32类笔记和用户指定的19道栈题', () => {
  assert.equal(validateDataset(data, 75), true);
  assert.deepEqual(data.groups, [
    { name: '数组', count: 15 }, { name: '链表', count: 12 }, { name: '堆', count: 8 },
    { name: '栈', count: 19 }, { name: '队列', count: 6 }, { name: '二叉树', count: 15 },
  ]);
  assert.equal(Object.keys(patterns).length, 32);
  assert.equal(new Set(data.questions.map(q => q.id)).size, 75);
  assert.deepEqual(data.questions.filter(q => q.category === '栈').map(q => Number(q.id)),
    [20,32,921,155,232,225,1381,150,224,227,1047,735,71,394,496,739,503,84,42]);
  assert.deepEqual(data.questions.map(q => Number(q.id)), chapters.flatMap(c => c.questions.map(q => q[0])));
  for (const q of data.questions) {
    for (const section of ['识别信号', '核心思路', '本题切入点', 'Java 通用模板', '复杂度与易错点', '代表题', '建议练习顺序']) {
      assert.ok(q.review.includes(section), `${q.id}: ${section}`);
    }
    assert.match(q.content, /示例/);
    assert.match(q.content, /输入/);
    assert.match(q.content, /输出/);
    assert.match(q.content, /提示|约束/);
    assert.equal(initialCode(q, 'java'), q.java);
    assert.equal(initialCode(q, 'python'), '');
  }
  assert.equal(filterQuestions(data.questions, 'all', '单调栈').length, 5);
  assert.equal(filterQuestions(data.questions, 'all', '二叉树').length, 15);
  assert.equal(filterQuestions(data.questions, 'all', '循环队列').length, 2);
});

test('算法题速通复用55道既有题面，补充20道原创重述，不改原有题库', async () => {
  const originals = (await Promise.all(['questions','interview150','offer'].map(async name =>
    JSON.parse(await readFile(new URL(`../public/data/${name}.json`, import.meta.url), 'utf8'))))).flatMap(d => d.questions);
  assert.equal(supplements.length, 20);
  assert.equal(data.questions.filter(q => q.contentOrigin === 'existing-workbook').length, 55);
  for (const q of data.questions) {
    const original = originals.find(item => item.id === q.id) || supplements.find(item => item.id === q.id);
    for (const key of ['id', 'slug', 'title', 'difficulty', 'content', 'java', 'source']) assert.deepEqual(q[key], original[key], `${q.id}/${key}`);
  }
});

test('速通笔记缺失题型或内容时校验失败', () => {
  for (const patch of [{ review: '' }, { review: 123 }, { technique: '' }]) {
    const broken = JSON.parse(JSON.stringify(data));
    Object.assign(broken.questions[0], patch);
    assert.throws(() => validateDataset(broken, 75), /速通笔记/);
  }
});
