// Offline content assembly. Source workbooks and authored notes remain untouched.
import { readFile, writeFile } from 'node:fs/promises';
import { chapters, patterns, interviewFocus, hot100StructureCategories } from './algorithm-fasttrack/outline.mjs';
import { supplements } from './algorithm-fasttrack/supplements.mjs';
import { validateDataset } from '../src/core.js';

const root = new URL('../', import.meta.url);
const sourceBooks = await Promise.all(['questions', 'interview150', 'offer'].map(async name =>
  JSON.parse(await readFile(new URL(`public/data/${name}.json`, root), 'utf8'))));
const hot100Slugs = new Set(sourceBooks[0].questions.map(question => question.slug));
const byId = new Map();
for (const book of sourceBooks) for (const question of book.questions) {
  if (!byId.has(question.id)) byId.set(question.id, question);
}
for (const question of supplements) {
  if (byId.has(question.id)) throw new Error(`补充题与已有题目重复：${question.id}`);
  byId.set(question.id, question);
}
const escape = text => String(text).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
const list = items => `<ul>${items.map(item => `<li>${escape(item)}</li>`).join('')}</ul>`;
const questions = [];
for (const chapter of chapters) {
  for (const [id, patternId, focus] of chapter.questions) {
    const original = byId.get(String(id));
    const pattern = patterns[patternId];
    if (!original || !pattern) throw new Error(`缺少题目或模式：${id}/${patternId}`);
    const related = chapter.questions.filter(item => item[1] === patternId).map(([id]) => byId.get(String(id)));
    const review = [
      `<h3>${escape(chapter.name)}：核心思路</h3><p>${escape(chapter.core)}</p>`,
      `<h3>题型：${escape(pattern.title)}</h3><h4>识别信号</h4>${list(pattern.signals)}`,
      `<h4>核心思路</h4><p>${escape(pattern.idea)}</p>`,
      `<h4>本题切入点</h4><p>${escape(focus)}</p>`,
      `<h4>Java 通用模板</h4><p>模板演示这一类题的基本方法，不一定能直接提交到当前题目。需要结合本题切入点调整。使用 Java 17，集合类需 import java.util.*；链表/树节点沿用题目定义。</p><pre><code>${escape(pattern.java)}</code></pre>`,
      `<h4>复杂度与易错点</h4><p>${escape(pattern.boundary)}</p>`,
      `<h4>代表题（本册均已收录）</h4><ul>${related.map(q => q.contentOrigin === 'original-exercise'
        ? `<li>${escape(q.id)}. ${escape(q.title)}（本站自编）</li>`
        : `<li><a href="${escape(q.source)}">${escape(q.id)}. ${escape(q.title)}</a></li>`).join('')}</ul>`,
      `<h4>建议练习顺序</h4>${list(chapter.stages)}`,
      '<p>先独立尝试，再看识别信号和模板；合上笔记后重新实现，并说明为什么指针移动或出入栈不会遗漏答案。</p>',
    ].join('\n');
    questions.push({ ...original, order: questions.length + 1, category: chapter.name,
      ...(hot100Slugs.has(original.slug) ? { hot100: true } : {}),
      ...(interviewFocus[id] ? { interviewFocus: interviewFocus[id] } : {}),
      technique: pattern.title, review,
      contentOrigin: original.contentOrigin || (supplements.includes(original) ? 'original-restatement' : 'existing-workbook') });
  }
}
const data = {
  version: 1, name: '算法题速通', source: 'https://leetcode.cn/problemset/',
  fetchedAt: '2026-09-28T00:00:00.000Z',
  groups: chapters.map(chapter => ({ name: chapter.name, count: chapter.questions.length })), questions,
};
const included = new Set(questions.map(question => question.slug));
const missing = sourceBooks[0].questions.filter(question =>
  hot100StructureCategories.includes(question.category) && !question.tags.includes('矩阵') && !included.has(question.slug));
if (missing.length) throw new Error(`HOT 100 数据结构题未补齐：${missing.map(q => q.id).join(', ')}`);
validateDataset(data, 110);
await writeFile(new URL('public/data/algorithm-fasttrack.json', root), JSON.stringify(data, null, 2) + '\n');
console.log(`算法题速通：${questions.length} 题、${chapters.length} 个结构、${Object.keys(patterns).length} 个题型；离线生成完成。`);
