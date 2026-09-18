import test from 'node:test';
import assert from 'node:assert/strict';
import { formatCode } from '../public/formatter/engine.js';
import { canFormat, formatDraft } from '../src/formatter.js';

test('本地格式化器支持 Java、JavaScript、TypeScript，四空格缩进且结果幂等', async () => {
  for (const [language, source] of [
    ['java', 'class Solution{public int sum(int a,int b){return a+b;}}'],
    ['javascript', 'function sum(a,b){return a+b}'],
    ['typescript', 'function sum(a:number,b:number):number{return a+b}'],
  ]) {
    const result = await formatCode(source, language, source.indexOf('return') + 2);
    assert.match(result.formatted, /\n {4,8}return a \+ b;/);
    assert.equal(result.formatted.slice(result.cursorOffset, result.cursorOffset + 4), 'turn');
    assert.equal((await formatCode(result.formatted, language)).formatted, result.formatted);
  }
});

test('格式化保留注释和字符串中的特殊字符，不执行代码', async () => {
  const string = '中文{};<script>"';
  const source = `// 注释内容\nconst s=${JSON.stringify(string)};globalThis.shouldNeverRun=true;`;
  const result = await formatCode(source, 'javascript');
  assert.ok(result.formatted.includes(`'${string}'`));
  assert.ok(result.formatted.includes('// 注释内容'));
  assert.equal(globalThis.shouldNeverRun, undefined);
});

test('无效语法明确拒绝，空代码可处理，不支持的语言不做伪格式化', async () => {
  for (const language of ['java', 'javascript', 'typescript']) {
    await assert.rejects(formatCode('class {', language), /原草稿未修改/);
    assert.equal((await formatCode('', language)).formatted, '');
    assert.equal(canFormat(language), true);
  }
  for (const language of ['python', 'go', 'cpp', 'text']) {
    assert.equal(canFormat(language), false);
    await assert.rejects(formatDraft('', language, 0), /暂支持/);
  }
  await assert.rejects(formatDraft('x'.repeat(100_001), 'java', 0), /10 万/);
});
