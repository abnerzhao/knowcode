import test from 'node:test';
import assert from 'node:assert/strict';
import { highlightCode } from '../src/highlight.js';

test('six languages highlight keywords, strings, comments and numbers', () => {
  for (const [language, source, keyword] of [
    ['java', 'public String s = "text"; // comment\nint n = 42;', 'public'],
    ['javascript', 'const s = "text"; // comment\nlet n = 42;', 'const'],
    ['typescript', 'const s: string = "text"; // comment\nlet n = 42;', 'const'],
    ['python', 'def f():\n    s = "text" # comment\n    return 42', 'def'],
    ['cpp', 'int n = 42; // comment\nstring s = "text";', 'int'],
    ['go', 'func f() { s := "text"; n := 42 // comment\n}', 'func'],
  ]) {
    const html = highlightCode(source, language);
    assert.ok(html.includes(`<span class="syntax-keyword">${keyword}</span>`), language);
    for (const type of ['string', 'comment', 'number']) assert.ok(html.includes(`class="syntax-${type}"`), language);
  }
});

test('strings and comments do not highlight their inner keywords or numbers', () => {
  assert.equal(highlightCode('"return 42 // hi"', 'java'), '<span class="syntax-string">&quot;return 42 // hi&quot;</span>');
  assert.equal(highlightCode('# return 42', 'python'), '<span class="syntax-comment"># return 42</span>');
  assert.equal(highlightCode('/* return\n42 */', 'cpp'), '<span class="syntax-comment">/* return\n42 */</span>');
  assert.equal(highlightCode('"""return\n42"""', 'python'), '<span class="syntax-string">&quot;&quot;&quot;return\n42&quot;&quot;&quot;</span>');
  assert.equal(highlightCode('`return\n42`', 'go'), '<span class="syntax-string">`return\n42`</span>');
});

test('HTML is escaped, whitespace and Unicode are preserved, unknown languages are plain text', () => {
  const source = '\t  <img src=x onerror="alert(1)"> & 中文😀\r\n\n';
  for (const language of ['java', 'python', 'text']) {
    const html = highlightCode(source, language);
    assert.ok(!html.includes('<img'));
    const roundTrip = html.replace(/<\/?span[^>]*>/g, '')
      .replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
    assert.equal(roundTrip, source);
  }
  assert.equal(highlightCode('', 'java'), '');
  assert.equal(highlightCode('return 42 < 50', 'text'), 'return 42 &lt; 50');
});

test('unfinished comments and escaped strings remain safe while typing', () => {
  assert.equal(highlightCode('/* unfinished\nreturn', 'java'), '<span class="syntax-comment">/* unfinished\nreturn</span>');
  assert.equal(highlightCode('"unfinished', 'java'), '<span class="syntax-string">&quot;unfinished</span>');
  assert.equal(highlightCode('"say \\"hi\\""', 'javascript'), '<span class="syntax-string">&quot;say \\&quot;hi\\&quot;&quot;</span>');
  assert.equal(highlightCode('className returnValue', 'java'), 'className returnValue');
});
