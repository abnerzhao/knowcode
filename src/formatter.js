export function canFormat(language) {
  return ['java', 'javascript', 'typescript'].includes(language);
}

export function formatDraft(source, language, cursorOffset) {
  if (!canFormat(language)) return Promise.reject(new Error('暂支持 Java、JavaScript、TypeScript 格式化。'));
  if (source.length > 100_000) return Promise.reject(new Error('草稿超过 10 万字符，请在本地编辑器中格式化。'));
  return new Promise((resolve, reject) => {
    // Keep parsing off the UI thread and release parser/WASM memory after each job.
    const worker = new Worker(new URL('./format-worker.js', import.meta.url), { type: 'module' });
    const finish = (error, result) => {
      clearTimeout(timer);
      worker.terminate();
      if (error) reject(error); else resolve(result);
    };
    const timer = setTimeout(() => finish(new Error('格式化超时，原草稿未修改。请稍后重试。')), 15000);
    worker.onmessage = ({ data }) => finish(data.error ? new Error(data.error) : null, data.result);
    worker.onerror = event => {
      event.preventDefault();
      finish(new Error('格式化器加载失败，原草稿未修改。请刷新后重试。'));
    };
    worker.postMessage({ source, language, cursorOffset });
  });
}
