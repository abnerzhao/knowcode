import { DIFFICULTIES, LANGUAGES, draftKey, initialCode, indentedNewline, validateDataset, filterQuestions, randomRound, normalizeSaved, parsePracticeRoute, practiceHash } from './core.js';
import { highlightCode } from './highlight.js';
import { BANKS, bankById, storageKey } from './banks.js';
import { renderProblemHTML } from './content.js';

const $ = id => document.getElementById(id);
const SITE_NAME = '一题一会';
const EDITOR_THEME_KEY = 'knowcode:editor-theme:v1';
let editorTheme = 'light';
try { if (localStorage.getItem(EDITOR_THEME_KEY) === 'dark') editorTheme = 'dark'; }
catch { /* Storage is optional; keep the default light palette. */ }
function applyEditorTheme(theme) {
  document.querySelector('.editor-panel').dataset.editorTheme = theme;
  $('editor-theme').value = theme;
}
applyEditorTheme(editorTheme);
$('editor-theme').addEventListener('change', () => {
  editorTheme = $('editor-theme').value === 'dark' ? 'dark' : 'light';
  applyEditorTheme(editorTheme);
  try { localStorage.setItem(EDITOR_THEME_KEY, editorTheme); }
  catch { notify('配色已切换，但浏览器无法保存此偏好。'); }
});
let data;
let bank = bankById('hot100');
let routeVersion = 0;
const datasets = new Map();
const bankSaves = new Map();
let current;
let mode = null;
let difficulty = 'all';
let queue = [];
let randomHistory = [];
let historyIndex = -1;
let query = '';
let toastTimer;
let saveTimer;
let storageWarning = false;
let memoryWarning = false;
let saved;
try { saved = normalizeSaved(JSON.parse(localStorage.getItem(storageKey(bank.id)))); }
catch { saved = normalizeSaved(null); storageWarning = true; }
bankSaves.set(bank.id, saved);
let language = saved.language;
for (const [value, { label }] of Object.entries(LANGUAGES)) {
  $('code-language').add(new Option(label, value));
}
$('code-language').value = language;
let shelfRow;
for (const [index, item] of BANKS.entries()) {
  if (index % 3 === 0) {
    shelfRow = document.createElement('div');
    shelfRow.className = 'book-row';
    $('bank-options').append(shelfRow);
  }
  const button = document.createElement('button');
  button.className = 'workbook';
  button.dataset.bank = item.id;
  button.setAttribute('aria-label', `${item.name}，${item.count} 题，开始练习`);
  const book = document.createElement('span');
  book.className = 'book-object';
  const cover = document.createElement('span');
  cover.className = 'book-cover';
  const title = document.createElement('strong');
  title.className = 'book-title';
  title.textContent = item.name;
  const footer = document.createElement('span');
  footer.className = 'book-footer';
  const count = document.createElement('span');
  count.textContent = `${item.count} 道题`;
  footer.append(count);
  cover.append(title, footer);
  book.append(cover);
  button.append(book);
  shelfRow.append(button);
}

function isDiscussion() { return current?.kind === 'discussion'; }
function draftLanguage() { return isDiscussion() ? 'text' : language; }

function notify(message) {
  clearTimeout(toastTimer);
  $('toast').textContent = message;
  $('toast').hidden = false;
  toastTimer = setTimeout(() => { $('toast').hidden = true; }, 3500);
}

function persist() {
  clearTimeout(saveTimer);
  try {
    localStorage.setItem(storageKey(bank.id), JSON.stringify(saved));
    $('save-status').textContent = '已自动保存到此浏览器';
    storageWarning = false;
  } catch {
    $('save-status').textContent = '保存失败，请复制草稿备份';
    if (!memoryWarning) notify('浏览器存储不可用或已满，请复制草稿备份。');
    storageWarning = true;
    memoryWarning = true;
  }
}

function syncDraft() {
  if (!current) return;
  const code = $('code-editor').value;
  const key = draftKey(current.slug, draftLanguage());
  if (code === initialCode(current, language)) delete saved.drafts[key];
  else saved.drafts[key] = code;
}

function renderEditor() {
  const discussion = isDiscussion();
  const config = LANGUAGES[language];
  const editor = $('code-editor');
  editor.value = saved.drafts[draftKey(current.slug, draftLanguage())] ?? initialCode(current, language);
  editor.placeholder = discussion ? '写下你的分析、方案和取舍…' : `在此编写 ${config.label} 解法（仅编辑，不执行）`;
  editor.setAttribute('aria-label', discussion ? '思路草稿编辑框' : `${config.label} 代码编辑框`);
  editor.wrap = discussion ? 'soft' : 'off';
  document.querySelector('.editor-panel').classList.toggle('discussion-editor', discussion);
  document.querySelector('.editor-panel').setAttribute('aria-label', discussion ? '思路草稿' : '代码草稿');
  $('code-language').hidden = discussion;
  $('line-numbers').hidden = discussion;
  $('editor-heading-label').textContent = discussion ? '思路草稿' : '代码草稿';
  $('show-editor').textContent = discussion ? '思路草稿' : '代码编辑框';
  $('copy-code').textContent = discussion ? '复制思路' : '复制代码';
  $('editor-note-text').textContent = discussion
    ? '先独立推演，再对照来源补充。此处保存纯文本，不执行代码或自动评分。'
    : '先独立写一遍，再去力扣验证。此处仅编辑与保存代码，不执行或判题。';
  $('verify-link').textContent = discussion ? '参考来源 ↗' : '去验证 ↗';
  editor.scrollTop = 0;
  editor.scrollLeft = 0;
  editor.setSelectionRange(0, 0);
  $('editor-file').textContent = discussion ? '思路笔记.txt' : language === 'java'
    ? (current.java.includes('class Solution') ? 'Solution.java' : `${current.java.match(/class\s+(\w+)/)?.[1] || 'Solution'}.java`)
    : config.file;
  $('reset-code').textContent = current.format === 'questions-only' ? '清空草稿' : discussion || language === 'java' ? '重置模板' : '清空草稿';
  $('reset-code').title = discussion ? '重置本题的思路草稿' : `重置本题的 ${config.label} 草稿`;
  updateEditorInfo();
  renderHighlight();
}

function syncEditorScroll() {
  const editor = $('code-editor');
  $('line-numbers').scrollTop = editor.scrollTop;
  $('code-highlight').style.width = `${editor.clientWidth}px`;
  $('code-highlight').style.height = `${editor.clientHeight}px`;
  $('highlight-content').style.transform = `translate(${-editor.scrollLeft}px, ${-editor.scrollTop}px)`;
}

function renderHighlight() {
  const editor = $('code-editor');
  $('highlight-content').innerHTML = isDiscussion() ? '' : highlightCode(editor.value, language);
  editor.classList.toggle('highlighted', !isDiscussion());
  syncEditorScroll();
}

new ResizeObserver(syncEditorScroll).observe($('code-editor'));

function updateEditorInfo() {
  const editor = $('code-editor');
  const count = editor.value.split('\n').length;
  $('line-numbers').textContent = Array.from({ length: count }, (_, i) => i + 1).join('\n');
  $('line-numbers').scrollTop = editor.scrollTop;
  const before = editor.value.slice(0, editor.selectionStart);
  const lines = before.split('\n');
  $('cursor-position').textContent = `Ln ${lines.length}, Col ${lines.at(-1).length + 1}`;
}

function renderCatalog() {
  if (mode !== 'ordered') {
    $('question-list').replaceChildren();
    return;
  }
  const filtered = filterQuestions(data.questions, 'all', query);
  const fragment = document.createDocumentFragment();
  for (const group of data.groups) {
    const questions = filtered.filter(q => q.category === group.name);
    if (!questions.length) continue;
    const section = document.createElement('section');
    section.className = 'question-group';
    const heading = document.createElement('div');
    heading.className = 'group-heading';
    const name = document.createElement('span');
    name.textContent = group.name;
    const count = document.createElement('span');
    count.textContent = questions.length;
    heading.append(name, count);
    section.append(heading);
    for (const question of questions) {
      const button = document.createElement('button');
      button.className = 'question-button';
      button.dataset.slug = question.slug;
      button.setAttribute('aria-current', String(current?.slug === question.slug));
      button.title = `${question.id}. ${question.title} · ${DIFFICULTIES[question.difficulty]}`;
      for (const [className, text] of [['question-id', question.id], ['question-name', question.title]]) {
        const span = document.createElement('span'); span.className = className; span.textContent = text; button.append(span);
      }
      const badge = document.createElement('span');
      badge.className = `question-dot ${question.difficulty}`;
      badge.setAttribute('aria-label', DIFFICULTIES[question.difficulty]);
      button.append(badge);
      section.append(button);
    }
    fragment.append(section);
  }
  if (!filtered.length) {
    const empty = document.createElement('p'); empty.className = 'empty-list'; empty.textContent = '没有匹配的题目，试试其他题名或编号。'; fragment.append(empty);
  }
  $('question-list').replaceChildren(fragment);
}

function renderNavigation() {
  const random = mode === 'random';
  const pool = filterQuestions(data.questions, difficulty);
  $('random-controls').hidden = !random;
  $('session-title').textContent = random ? '随机练习' : '顺序练习';
  $('order-label').textContent = random ? '' : `${String(current.order).padStart(2, '0')} / ${data.questions.length}`;
  $('pool-count').textContent = `${pool.length} 题`;
  $('previous').disabled = random ? historyIndex <= 0 : current.order === 1;
  $('next').disabled = !random && current.order === data.questions.length;
  $('next').textContent = random ? '随机下一题 ⤨' : '下一题 →';
}

function visit(slug) {
  const question = data.questions.find(q => q.slug === slug);
  if (!question) return;
  syncDraft();
  current = question;
  saved.current = question.slug;
  persist();
  $('problem-title').textContent = `${question.id}. ${question.title}`;
  $('english-title').textContent = question.englishTitle;
  $('english-title').hidden = !question.englishTitle;
  $('problem-category').textContent = question.category;
  $('problem-number').textContent = `#${question.id}`;
  $('difficulty-badge').className = `difficulty-badge ${question.difficulty}`;
  $('difficulty-badge').textContent = DIFFICULTIES[question.difficulty];
  $('problem-tags').textContent = question.tags.slice(0, 3).join(' · ');
  $('source-link').href = question.source;
  $('source-link').textContent = isDiscussion() ? '题目参考 ↗' : '力扣原题 ↗';
  $('verify-link').href = question.source;
  $('problem-content').replaceChildren(renderProblemHTML(question.content));
  $('problem-scroll').scrollTop = 0;
  renderEditor();
  renderCatalog();
  renderNavigation();
  history.replaceState(null, '', practiceHash(mode, question.slug, difficulty, bank.id));
  document.title = `${question.title.trim()} · ${bank.name} · ${SITE_NAME}`;
}

function randomNext() {
  if (historyIndex < randomHistory.length - 1) {
    visit(randomHistory[++historyIndex]); return;
  }
  if (!queue.length) queue = randomRound(filterQuestions(data.questions, difficulty), current?.slug);
  const slug = queue.shift();
  if (!slug) { notify('当前没有可抽取的题目。'); return; }
  randomHistory.push(slug);
  historyIndex = randomHistory.length - 1;
  visit(slug);
}

function setMode(nextMode) {
  if (!data) return;
  if (nextMode === 'random') {
    location.hash = `#/${bank.id}/random`;
    return;
  }
  const slug = (data.questions.find(q => q.slug === saved.current) || data.questions[0]).slug;
  location.hash = practiceHash(nextMode, slug, 'all', bank.id);
}

async function applyRoute() {
  const version = ++routeVersion;
  if (current) { syncDraft(); persist(); }
  current = null;
  const route = parsePracticeRoute(location.hash);
  mode = route.mode;
  for (const id of ['bank-picker', 'mode-picker', 'workspace', 'loading', 'load-error']) $(id).hidden = true;
  if (!route.bank) {
    // Legacy problem links still remember the Hot 100 question, but start at banks.
    const legacySlug = location.hash.slice(1);
    if (/^[a-z0-9-]+$/.test(legacySlug)) {
      const legacySaved = bankSaves.get('hot100');
      legacySaved.current = legacySlug;
      try { localStorage.setItem(storageKey('hot100'), JSON.stringify(legacySaved)); } catch { /* in-memory fallback */ }
    }
    $('bank-picker').hidden = false;
    history.replaceState(null, '', '#/');
    document.title = SITE_NAME;
    return;
  }
  if (bank.id !== route.bank) {
    bank = bankById(route.bank);
    if (!bankSaves.has(bank.id)) {
      try { bankSaves.set(bank.id, normalizeSaved(JSON.parse(localStorage.getItem(storageKey(bank.id))))); }
      catch { bankSaves.set(bank.id, normalizeSaved(null)); storageWarning = true; }
    }
    saved = bankSaves.get(bank.id);
    language = saved.language;
    $('code-language').value = language;
    query = '';
    $('search').value = '';
  }
  data = null;
  $('loading').hidden = false;
  try {
    const selectedBank = bank;
    if (!datasets.has(selectedBank.id)) {
      const response = await fetch(`./data/${selectedBank.file}`);
      if (!response.ok) throw new Error(`题库请求失败（${response.status}）。`);
      const loaded = await response.json();
      validateDataset(loaded, selectedBank.count);
      datasets.set(selectedBank.id, loaded);
    }
    if (version !== routeVersion) return;
    data = datasets.get(selectedBank.id);
  } catch (error) {
    if (version !== routeVersion) return;
    $('loading').hidden = true;
    $('load-error').hidden = false;
    $('load-error-message').textContent = `${error.message} 请通过本地服务器或静态托管访问页面。`;
    return;
  }
  $('loading').hidden = true;
  $('back-to-modes').href = `#/${bank.id}`;
  $('back-to-banks').textContent = `← 书架 · ${bank.name}`;
  $('bank-source').href = data.source;
  $('bank-source').textContent = bank.kind === 'discussion' ? '选题参考 ↗' : '官方题单 ↗';
  $('catalog-caption').textContent = bank.kind === 'discussion' ? '按主题整理，难度为本站练习分级' : '按官方分类顺序排列';
  $('data-date').textContent = data.fetchedAt.slice(0, 10);
  $('data-date').dateTime = data.fetchedAt;
  $('question-list').setAttribute('aria-label', `${bank.name} 题目`);
  for (const option of $('difficulty').options) {
    option.disabled = !filterQuestions(data.questions, option.value).length;
  }
  $('mode-picker').hidden = mode !== null;
  $('workspace').hidden = mode === null;
  if (!mode) {
    history.replaceState(null, '', `#/${bank.id}`);
    document.title = `${bank.name} · ${SITE_NAME}`;
    return;
  }
  difficulty = route.difficulty;
  if (!filterQuestions(data.questions, difficulty).length) difficulty = 'all';
  $('difficulty').value = difficulty;
  $('workspace').classList.toggle('random-workspace', mode === 'random');
  document.querySelector('.sidebar').hidden = mode === 'random';
  document.querySelector('.sidebar').classList.remove('expanded');
  $('toggle-catalog').setAttribute('aria-expanded', 'false');
  $('toggle-catalog').textContent = '展开题目';
  mobileView(false);
  if (mode === 'random') {
    const pool = filterQuestions(data.questions, difficulty);
    queue = randomRound(pool, current?.slug);
    const slug = pool.some(q => q.slug === route.slug) ? route.slug : queue[0];
    queue = queue.filter(item => item !== slug);
    randomHistory = [slug];
    historyIndex = 0;
    visit(slug);
  } else {
    const slug = [route.slug, saved.current].find(slug => data.questions.some(q => q.slug === slug));
    visit(slug || data.questions[0].slug);
  }
}

function mobileView(editor) {
  $('panels').classList.toggle('show-editor', editor);
  $('show-description').setAttribute('aria-pressed', String(!editor));
  $('show-editor').setAttribute('aria-pressed', String(editor));
}

$('retry-load').addEventListener('click', applyRoute);
$('bank-options').addEventListener('click', event => {
  const button = event.target.closest('[data-bank]');
  if (button) location.hash = `#/${button.dataset.bank}`;
});
$('ordered-mode').addEventListener('click', () => setMode('ordered'));
$('random-mode').addEventListener('click', () => setMode('random'));
$('code-language').addEventListener('change', event => {
  const nextLanguage = event.target.value;
  if (!current || !Object.hasOwn(LANGUAGES, nextLanguage)) return;
  syncDraft();
  language = nextLanguage;
  saved.language = language;
  renderEditor();
  persist();
});
$('difficulty').addEventListener('change', event => {
  difficulty = event.target.value;
  queue = []; randomHistory = []; historyIndex = -1;
  randomNext();
});
$('search').addEventListener('input', event => { query = event.target.value; renderCatalog(); });
$('question-list').addEventListener('click', event => {
  const button = event.target.closest('[data-slug]');
  if (!button) return;
  visit(button.dataset.slug);
  document.querySelector('.sidebar').classList.remove('expanded');
  $('toggle-catalog').setAttribute('aria-expanded', 'false');
  $('toggle-catalog').textContent = '展开题目';
});
$('previous').addEventListener('click', () => {
  if (mode === 'random') { if (historyIndex > 0) visit(randomHistory[--historyIndex]); }
  else if (current.order > 1) visit(data.questions[current.order - 2].slug);
});
$('next').addEventListener('click', () => {
  if (mode === 'random') randomNext();
  else if (current.order < data.questions.length) visit(data.questions[current.order].slug);
});
$('code-editor').addEventListener('input', () => {
  syncDraft(); updateEditorInfo(); renderHighlight();
  $('save-status').textContent = '保存中…';
  clearTimeout(saveTimer); saveTimer = setTimeout(persist, 250);
});
$('code-editor').addEventListener('scroll', syncEditorScroll);
$('code-editor').addEventListener('beforeinput', event => {
  if (isDiscussion() || event.isComposing || !event.cancelable ||
      !['insertLineBreak', 'insertParagraph'].includes(event.inputType)) return;
  const editor = event.currentTarget;
  const text = indentedNewline(editor.value, editor.selectionStart);
  if (text === '\n') return; // Leave unindented newlines to the browser.
  event.preventDefault();
  // Native insertion preserves undo history; setRangeText is the fallback.
  let inserted = false;
  try { inserted = document.execCommand('insertText', false, text); }
  catch { /* Some browsers do not support native text insertion. */ }
  if (!inserted) editor.setRangeText(text, editor.selectionStart, editor.selectionEnd, 'end');
  editor.dispatchEvent(new Event('input', { bubbles: true }));
});
for (const event of ['click', 'keyup', 'select']) $('code-editor').addEventListener(event, updateEditorInfo);
$('code-editor').addEventListener('keydown', event => {
  if (event.key === 'Tab' && !event.shiftKey) {
    event.preventDefault();
    const editor = event.currentTarget;
    editor.setRangeText('    ', editor.selectionStart, editor.selectionEnd, 'end');
    editor.dispatchEvent(new Event('input'));
  }
  // Shift+Tab retains the browser's normal focus escape for keyboard access.
});
$('copy-code').addEventListener('click', async () => {
  try { await navigator.clipboard.writeText($('code-editor').value); notify(isDiscussion() ? '思路已复制。' : '代码已复制，可粘贴到力扣验证。'); }
  catch { $('code-editor').focus(); $('code-editor').select(); notify('请按 Ctrl / ⌘ + C 复制已选中的草稿。'); }
});
$('reset-code').addEventListener('click', () => {
  if (!current) return;
  const questionsOnly = current.format === 'questions-only';
  $('reset-title').textContent = questionsOnly ? '清空本题草稿？' : isDiscussion() || language === 'java' ? '恢复初始模板？' : '清空代码草稿？';
  $('reset-description').textContent = questionsOnly ? '将清空本题的思路草稿，其他题目的草稿不受影响。' : isDiscussion() ? '将恢复本题的作答提纲，其他题目的草稿不受影响。' : `将重置本题的 ${LANGUAGES[language].label} 草稿，其他语言和题目的草稿不受影响。`;
  $('reset-confirm').textContent = questionsOnly ? '清空草稿' : isDiscussion() || language === 'java' ? '恢复模板' : '清空草稿';
  $('reset-dialog').returnValue = '';
  $('reset-dialog').showModal();
});
$('reset-dialog').addEventListener('close', () => {
  if ($('reset-dialog').returnValue !== 'confirm') return;
  delete saved.drafts[draftKey(current.slug, draftLanguage())];
  renderEditor(); persist(); notify(isDiscussion() ? '已重置本题思路草稿。' : `已重置本题 ${LANGUAGES[language].label} 草稿。`);
});
$('toggle-catalog').addEventListener('click', () => {
  const expanded = document.querySelector('.sidebar').classList.toggle('expanded');
  $('toggle-catalog').setAttribute('aria-expanded', String(expanded));
  $('toggle-catalog').textContent = expanded ? '收起题目' : '展开题目';
});
$('show-description').addEventListener('click', () => mobileView(false));
$('show-editor').addEventListener('click', () => mobileView(true));
window.addEventListener('pagehide', () => { if (current) { syncDraft(); persist(); } });
document.addEventListener('visibilitychange', () => { if (document.hidden && current) { syncDraft(); persist(); } });
window.addEventListener('hashchange', applyRoute);
await applyRoute();
