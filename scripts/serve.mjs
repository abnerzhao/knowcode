import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const production = process.argv.includes('dist');
const base = production ? path.join(root, 'dist') : root;
const port = Number(process.env.PORT || 4173);
const formatterRoute = /^\/formatter\/(?:[a-z-]+\.js|(?:web-tree-sitter|tree-sitter-java_orchard)\.wasm|(?:LICENSES|NOTICES)\.txt)$/;
const types = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.json': 'application/json; charset=utf-8', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.gif': 'image/gif', '.svg': 'image/svg+xml' };
createServer(async (req, res) => {
  try {
    const url = new URL(req.url, 'http://localhost');
    let route = decodeURIComponent(url.pathname);
    if (route === '/') route = '/index.html';
    // Only expose public product files, never scripts, dotfiles, or workspace data.
    if (!formatterRoute.test(route) && !/^\/(index\.html|styles\.css|favicon\.svg|THIRD_PARTY_LICENSES\.txt|src\/[a-z-]+\.js|data\/(questions|interview150|offer|scenarios|system-design|devops-sre|data-middleware|os-network|languages-frameworks|data-structures-algorithms|design-patterns)\.json|images\/[a-f0-9]+\.(png|jpe?g|gif|webp|svg))$/.test(route)) {
      res.writeHead(404).end('Not found'); return;
    }
    const publicAsset = formatterRoute.test(route) || /^\/(data|images)\//.test(route) || ['/favicon.svg', '/THIRD_PARTY_LICENSES.txt'].includes(route);
    const filename = path.join(base, !production && publicAsset ? 'public' : '', route);
    if (!(await stat(filename)).isFile()) throw new Error('not file');
    res.writeHead(200, { 'Content-Type': path.extname(filename) === '.wasm' ? 'application/wasm' : types[path.extname(filename)] || 'application/octet-stream', 'Cache-Control': 'no-cache', 'X-Content-Type-Options': 'nosniff' });
    res.end(await readFile(filename));
  } catch { res.writeHead(404).end('Not found'); }
}).listen(port, '127.0.0.1', () => console.log(`Local: http://127.0.0.1:${port}`));
