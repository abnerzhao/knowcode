import { formatCode } from '../formatter/engine.js';

self.onmessage = async ({ data }) => {
  try {
    const result = await formatCode(data.source, data.language, data.cursorOffset);
    self.postMessage({ result });
  } catch (error) {
    self.postMessage({ error: error.message });
  }
};
