// Reconstruct only safe formatting elements. Source HTML never enters the live
// document directly; event handlers, styles, embeds and arbitrary URLs are lost.
export function renderProblemHTML(html, documentRef = document) {
  const parsed = new DOMParser().parseFromString(html, 'text/html');
  const allowed = new Set(['P', 'DIV', 'SPAN', 'STRONG', 'B', 'EM', 'I', 'U', 'S', 'CODE', 'PRE', 'UL', 'OL', 'LI', 'SUP', 'SUB', 'BR', 'HR', 'H2', 'H3', 'H4', 'TABLE', 'THEAD', 'TBODY', 'TR', 'TD', 'TH', 'BLOCKQUOTE', 'A', 'IMG']);
  const blocked = new Set(['SCRIPT', 'STYLE', 'IFRAME', 'OBJECT', 'EMBED', 'FORM', 'INPUT', 'BUTTON', 'SVG', 'MATH', 'LINK', 'META']);
  const output = documentRef.createDocumentFragment();
  function append(node, parent) {
    if (node.nodeType === 3) { parent.append(documentRef.createTextNode(node.textContent)); return; }
    if (node.nodeType !== 1 || blocked.has(node.tagName)) return;
    if (!allowed.has(node.tagName)) { for (const child of node.childNodes) append(child, parent); return; }
    const element = documentRef.createElement(node.tagName.toLowerCase());
    if (node.tagName === 'IMG') {
      const src = node.getAttribute('src') || '';
      if (!/^\.\/images\/[a-f0-9]{20}\.(png|jpe?g|gif|webp|svg)$/.test(src)) return;
      element.setAttribute('src', src);
      element.setAttribute('alt', node.getAttribute('alt') || '题目示意图');
      element.setAttribute('loading', 'lazy');
    }
    if (node.tagName === 'A') {
      const href = node.getAttribute('href') || '';
      if (/^https:\/\//i.test(href)) {
        element.setAttribute('href', href);
        element.setAttribute('target', '_blank');
        element.setAttribute('rel', 'noopener noreferrer');
      }
    }
    for (const child of node.childNodes) append(child, element);
    parent.append(element);
  }
  for (const child of parsed.body.childNodes) append(child, output);
  return output;
}
