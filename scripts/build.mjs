import { cp, mkdir, readFile, stat } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { validateDataset } from '../src/core.js';
import { BANKS } from '../src/banks.js';

const root = fileURLToPath(new URL('../', import.meta.url));
const datasets = await Promise.all(BANKS.map(async bank => {
  const data = JSON.parse(await readFile(path.join(root, 'public/data', bank.file), 'utf8'));
  validateDataset(data, bank.count);
  return data;
}));
const questions = datasets.flatMap(data => data.questions);
const imageSources = new Set(questions.flatMap(q => [...q.content.matchAll(/<img\b[^>]*\bsrc=["']([^"']+)["']/gi)].map(match => match[1])));
for (const source of imageSources) {
  if (!/^\.\/images\/[a-f0-9]{20}\.(png|jpe?g|gif|webp|svg)$/.test(source)) throw new Error(`图片未本地化：${source}`);
  const image = await stat(path.join(root, 'public', source));
  if (!image.isFile() || image.size === 0) throw new Error(`图片缺失或为空：${source}`);
}
const dist = path.join(root, 'dist');
await mkdir(dist, { recursive: true });
for (const name of ['index.html', 'styles.css', 'src']) {
  await cp(path.join(root, name), path.join(dist, name), { recursive: true });
}
await cp(path.join(root, 'public'), dist, { recursive: true });
console.log(`静态构建完成：dist/，包含 ${datasets.length} 个题库、${questions.length} 个题目条目。构建无需联网抓取。`);
