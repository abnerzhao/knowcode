import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { mkdir, readFile, writeFile, rename } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { fileURLToPath, pathToFileURL } from 'node:url';
import path from 'node:path';
import { bankById } from '../src/banks.js';

const run = promisify(execFile);
const root = fileURLToPath(new URL('../', import.meta.url));
const cache = path.join(root, '.cache');
const output = path.join(root, 'public/data');
const assets = path.join(root, 'public/images');
const bankId = process.argv.find(arg => arg.startsWith('--bank='))?.slice(7) || 'hot100';
const bank = bankById(bankId);
if (!bank) throw new Error(`未知题库：${bankId}`);
if (!bank.plan) throw new Error('此题库为人工整理，请编辑本地题库数据，不使用力扣抓取脚本。');
const source = `https://leetcode.cn/studyplan/${bank.plan}/`;
const refresh = process.argv.includes('--refresh');
// Optional standard browser transport; no login, stealth or challenge handling.
let browser;
let browserPage;
if (process.argv.includes('--browser')) {
  const modulePath = process.env.PLAYWRIGHT_MODULE;
  const { chromium } = await import(modulePath ? pathToFileURL(modulePath).href : 'playwright');
  browser = await chromium.launch({ headless: true, channel: process.env.BROWSER_CHANNEL || undefined });
  browserPage = await browser.newPage();
}
await Promise.all([mkdir(cache, { recursive: true }), mkdir(output, { recursive: true }), mkdir(assets, { recursive: true })]);

async function request(url, binary = false) {
  const args = ['--fail', '--silent', '--show-error', '--location', '--max-time', '35', '--retry', '2', '--retry-delay', '2'];
  if (process.env.LEETCODE_PROXY) args.push('--proxy', process.env.LEETCODE_PROXY);
  const { stdout } = await run('curl', [...args, url], { maxBuffer: 16 * 1024 * 1024, encoding: binary ? 'buffer' : 'utf8' });
  return stdout;
}

function parseNextData(html) {
  const match = html.match(/<script\b(?=[^>]*\bid=["']__NEXT_DATA__["'])[^>]*>([\s\S]*?)<\/script>/);
  if (!match) throw new Error('页面中没有公开的 __NEXT_DATA__，停止抓取，不绕过访问限制。');
  return JSON.parse(match[1]).props.pageProps.dehydratedState.queries.map(q => q.state.data).filter(Boolean);
}

async function pageData(url) {
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      if (browserPage) {
        await browserPage.goto(url, { waitUntil: 'domcontentloaded', timeout: 35000 });
        await browserPage.locator('#__NEXT_DATA__').waitFor({ state: 'attached', timeout: 15000 });
        return parseNextData(await browserPage.content());
      }
      return parseNextData(await request(url));
    }
    catch (error) {
      if (attempt === 2) throw new Error(`${url}: ${error.message}`);
      console.log(`页面响应暂不可读，${(attempt + 1) * 3} 秒后重试：${url}`);
      await new Promise(resolve => setTimeout(resolve, (attempt + 1) * 3000));
    }
  }
}

async function cachedJSON(name, fetcher) {
  const filename = path.join(cache, `${name}.json`);
  if (!refresh) {
    try { return JSON.parse(await readFile(filename, 'utf8')); } catch { /* fresh fetch */ }
  }
  const data = await fetcher();
  await writeFile(filename, JSON.stringify(data));
  return data;
}

const plan = await cachedJSON(bankId === 'hot100' ? 'plan' : `plan-${bankId}`, async () => {
  const data = await pageData(source);
  const plan = data.find(x => x.studyPlanV2Detail)?.studyPlanV2Detail;
  if (!plan?.planSubGroups) throw new Error('无法读取官方题单分类。');
  return { name: plan.name, groups: plan.planSubGroups.map(g => ({ name: g.name, questions: g.questions })) };
});
const entries = plan.groups.flatMap(g => g.questions.map(q => ({ ...q, category: g.name })));
if (entries.length !== bank.count || new Set(entries.map(q => q.titleSlug)).size !== bank.count) throw new Error('官方题单数量或唯一性不符合预期，未更新题库。');

let cursor = 0;
let finished = 0;
const questions = new Array(entries.length);
async function worker() {
  while (cursor < entries.length) {
    const index = cursor++;
    const item = entries[index];
    const data = await cachedJSON(item.titleSlug, async () => {
      const url = `https://leetcode.cn/problems/${item.titleSlug}/description/`;
      const fragments = await pageData(url);
      const question = Object.assign({}, ...fragments.map(x => x.question).filter(Boolean));
      if (!question.translatedContent || question.titleSlug !== item.titleSlug) throw new Error(`${item.titleSlug} 缺少中文题干或页面不匹配`);
      const java = question.codeSnippets?.find(x => x.langSlug === 'java')?.code;
      if (!java) throw new Error(`${item.titleSlug} 缺少 Java 初始代码`);
      if (!/示例/.test(question.translatedContent)) throw new Error(`${item.titleSlug} 缺少示例`);
      return { content: question.translatedContent, java, source: url };
    });
    questions[index] = {
      order: index + 1, id: item.questionFrontendId, slug: item.titleSlug,
      title: item.translatedTitle, englishTitle: item.title, category: item.category,
      difficulty: item.difficulty.toLowerCase(), tags: item.topicTags.map(t => t.nameTranslated || t.name), ...data,
    };
    console.log(`[${++finished}/${bank.count}] ${item.translatedTitle}`);
    await new Promise(resolve => setTimeout(resolve, browserPage ? 1000 : 300));
  }
}
try {
  await Promise.all(Array.from({ length: browserPage ? 1 : 3 }, () => worker()));
} finally {
  await browser?.close();
}

// Keep the published page independent from external image hosts.
const imageMap = new Map();
for (const q of questions) {
  for (const match of q.content.matchAll(/<img\b[^>]*\bsrc=["']([^"']+)["']/gi)) {
    const url = new URL(match[1].replaceAll('&amp;', '&'), 'https://leetcode.cn').href;
    imageMap.set(match[1], url);
  }
}
let imageCount = 0;
for (const [original, url] of imageMap) {
  const parsed = new URL(url);
  if (parsed.protocol !== 'https:' || !['leetcode.cn', 'leetcode.com', 'aliyuncs.com'].some(host => parsed.hostname === host || parsed.hostname.endsWith(`.${host}`))) {
    throw new Error(`未允许的题目图片地址：${url}`);
  }
  const extension = path.extname(parsed.pathname).toLowerCase();
  if (!['.png', '.jpg', '.jpeg', '.gif', '.webp', '.svg'].includes(extension)) throw new Error(`未知图片类型：${url}`);
  const name = `${createHash('sha256').update(url).digest('hex').slice(0, 20)}${extension}`;
  const filename = path.join(assets, name);
  try { await readFile(filename); } catch { await writeFile(filename, await request(url, true)); }
  for (const q of questions) q.content = q.content.replaceAll(original, `./images/${name}`);
  console.log(`[图片 ${++imageCount}/${imageMap.size}] ${name}`);
}

const payload = { version: 1, name: plan.name, source, fetchedAt: new Date().toISOString(), groups: plan.groups.map(g => ({ name: g.name, count: g.questions.length })), questions };
await writeFile(path.join(output, `${bank.file}.tmp`), JSON.stringify(payload, null, 2) + '\n');
await rename(path.join(output, `${bank.file}.tmp`), path.join(output, bank.file));
console.log(`完成：${bank.count} 道中文题干、示例、约束、Java 模板；${imageMap.size} 张本地图片。`);
