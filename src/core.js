import { bankById } from './banks.js';

export const DIFFICULTIES = { easy: '简单', medium: '中等', hard: '困难' };
export const STORAGE_KEY = 'hot100-review:v1';
export const LANGUAGES = {
  java: { label: 'Java', file: 'Solution.java' },
  javascript: { label: 'JavaScript', file: 'solution.js' },
  typescript: { label: 'TypeScript', file: 'solution.ts' },
  python: { label: 'Python', file: 'solution.py' },
  cpp: { label: 'C++', file: 'solution.cpp' },
  go: { label: 'Go', file: 'solution.go' },
};

// Keep the original Java keys so existing drafts need no migration.
export function draftKey(slug, language) {
  return language === 'java' ? slug : `${slug}:${language}`;
}

export function initialCode(question, language) {
  if (question.kind === 'discussion') return question.answerTemplate;
  return language === 'java' ? question.java : '';
}

export function isReferenceURL(value) {
  try {
    const url = new URL(value);
    return url.protocol === 'https:' && !url.username && !url.password &&
      ['github.com', 'www.nowcoder.com', 'leetcode.cn', 'leetcode.com',
        'sre.google', 'kubernetes.io', 'docs.kernel.org', 'cdn.kernel.org',
        'docs.openssl.org', 'docs.github.com', 'opengitops.dev',
        'developer.hashicorp.com', 'prometheus.io', 'opentelemetry.io',
        'docs.aws.amazon.com', 'www.postgresql.org', 'dev.mysql.com',
        'redis.io', 'www.elastic.co', 'kafka.apache.org', 'man7.org',
        'www.gnu.org', 'www.rfc-editor.org', 'datatracker.ietf.org', 'curl.se',
        'docs.oracle.com', 'docs.python.org', 'go.dev', 'pkg.go.dev',
        'docs.spring.io', 'docs.djangoproject.com', 'fastapi.tiangolo.com', 'gin-gonic.com',
        'git-scm.com', 'docs.docker.com', 'maven.apache.org', 'docs.astral.sh', 'help.eclipse.org',
        'algs4.cs.princeton.edu', 'ocw.mit.edu', 'cses.fi', 'www.informit.com',
        'www.unicode.org', 'blog.cleancoder.com', 'bytebytego.com'].includes(url.hostname);
  } catch { return false; }
}

export function parsePracticeRoute(hash) {
  const [pathname, query = ''] = hash.replace(/^#\/?/, '').split('?');
  const parts = pathname.split('/');
  const bank = bankById(parts[0]) ? parts.shift() : null;
  const [mode, slug] = parts;
  if (!['ordered', 'random'].includes(mode)) return { bank, mode: null };
  const difficulty = new URLSearchParams(query).get('difficulty');
  return { bank: bank || 'hot100', mode, slug: slug || null, difficulty: Object.hasOwn(DIFFICULTIES, difficulty) ? difficulty : 'all' };
}

export function practiceHash(mode, slug, difficulty = 'all', bank = 'hot100') {
  return `#/${bank}/${mode}/${slug}${mode === 'random' ? `?difficulty=${difficulty}` : ''}`;
}

export function validateDataset(data, count = 100) {
  if (data?.version !== 1 || data.questions?.length !== count) throw new Error(`题库需要完整的 ${count} 道题。`);
  if (new Set(data.questions.map(q => q.slug)).size !== count) throw new Error('题库包含重复题目。');
  data.questions.forEach((q, i) => {
    const questionsOnly = q.format === 'questions-only';
    if ((q.format !== undefined && !questionsOnly) || (questionsOnly && q.kind !== 'discussion')) throw new Error('题目格式无效。');
    if (q.order !== i + 1 || !q.title || !q.id || !q.category || !DIFFICULTIES[q.difficulty] || !Array.isArray(q.tags) ||
        typeof q.content !== 'string' || !q.content.trim() || !(questionsOnly ? q.content.includes('？') : q.content.includes('示例'))) {
      throw new Error(`第 ${i + 1} 道题数据不完整。`);
    }
    if (q.kind === 'discussion') {
      if (typeof q.answerTemplate !== 'string' || (questionsOnly ? q.answerTemplate !== '' : !q.answerTemplate.trim()) || !q.references?.length ||
          !q.references.every(ref => ref.title && isReferenceURL(ref.url)) ||
          !q.references.some(ref => ref.url === q.source)) throw new Error('讨论题的作答模板或来源不完整。');
    } else {
      if ((q.kind && q.kind !== 'algorithm') || !q.java) throw new Error('算法题模板不完整。');
      if (!/^https:\/\/leetcode\.cn\/problems\/[a-z0-9-]+\/description\/$/.test(q.source)) throw new Error('题目来源地址无效。');
    }
  });
  if (data.groups.reduce((sum, g) => sum + g.count, 0) !== count) throw new Error('分类数量不正确。');
  return true;
}

export function filterQuestions(questions, difficulty = 'all', query = '') {
  const text = query.trim().toLowerCase();
  return questions.filter(q => (difficulty === 'all' || q.difficulty === difficulty) &&
    (!text || `${q.id} ${q.title} ${q.englishTitle} ${q.category}`.toLowerCase().includes(text)));
}

// Fisher–Yates: one complete round with no duplicates, avoiding the current
// problem as the first draw when at least two candidates exist.
export function randomRound(questions, currentSlug, random = Math.random) {
  const slugs = questions.map(q => q.slug);
  for (let i = slugs.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [slugs[i], slugs[j]] = [slugs[j], slugs[i]];
  }
  if (slugs.length > 1 && slugs[0] === currentSlug) [slugs[0], slugs[1]] = [slugs[1], slugs[0]];
  return slugs;
}

export function normalizeSaved(value) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return { drafts: {}, statuses: {}, current: null, language: 'java' };
  const drafts = {};
  const statuses = {};
  for (const [key, text] of Object.entries(value.drafts || {})) {
    const [slug, language, extra] = key.split(':');
    if (/^[a-z0-9-]+$/.test(slug) && extra === undefined &&
        (language === undefined || language === 'text' || Object.hasOwn(LANGUAGES, language)) && typeof text === 'string') drafts[key] = text;
  }
  for (const [slug, status] of Object.entries(value.statuses || {})) {
    if (/^[a-z0-9-]+$/.test(slug) && ['review', 'done'].includes(status)) statuses[slug] = status;
  }
  return { drafts, statuses, current: typeof value.current === 'string' ? value.current : null,
    language: Object.hasOwn(LANGUAGES, value.language) ? value.language : 'java' };
}
