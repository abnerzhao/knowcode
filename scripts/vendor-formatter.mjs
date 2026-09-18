// Optional maintenance step. Generated assets are committed, so normal builds stay offline.
import { cp, mkdir, readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { build } from 'esbuild';

const root = fileURLToPath(new URL('../', import.meta.url));
const output = path.join(root, 'public/formatter');
await mkdir(output, { recursive: true });
for (const [source, target] of [
  ['prettier/standalone.mjs', 'prettier.js'],
  ['prettier/doc.mjs', 'doc.js'],
  ['prettier/plugins/babel.mjs', 'babel.js'],
  ['prettier/plugins/estree.mjs', 'estree.js'],
  ['prettier/plugins/typescript.mjs', 'typescript.js'],
  ['web-tree-sitter/web-tree-sitter.js', 'web-tree-sitter.js'],
  ['web-tree-sitter/web-tree-sitter.wasm', 'web-tree-sitter.wasm'],
  ['prettier-plugin-java/dist/tree-sitter-java_orchard.wasm', 'tree-sitter-java_orchard.wasm'],
]) await cp(path.join(root, 'node_modules', source), path.join(output, target));
await build({
  entryPoints: [path.join(root, 'node_modules/prettier-plugin-java/dist/index.mjs')],
  outfile: path.join(output, 'java.js'), bundle: true, minify: true, format: 'esm', platform: 'browser',
  plugins: [{ name: 'local-dependencies', setup(build) {
    const files = { prettier: 'prettier.js', 'prettier/doc': 'doc.js', 'web-tree-sitter': 'web-tree-sitter.js' };
    build.onResolve({ filter: /^(prettier(?:\/doc)?|web-tree-sitter)$/ }, args => ({ path: `./${files[args.path]}`, external: true }));
  } }],
});
const notices = [];
for (const name of ['prettier', 'prettier-plugin-java', 'web-tree-sitter']) {
  const dir = path.join(root, 'node_modules', name);
  const pkg = JSON.parse(await readFile(path.join(dir, 'package.json'), 'utf8'));
  notices.push(`${name} ${pkg.version}\n${await readFile(path.join(dir, 'LICENSE'), 'utf8')}`);
}
notices.push(await readFile(path.join(root, 'scripts/licenses/tree-sitter-java-orchard.txt'), 'utf8'));
await writeFile(path.join(output, 'LICENSES.txt'), notices.join('\n\n----------------------------------------\n\n'));
await cp(path.join(root, 'node_modules/prettier/THIRD-PARTY-NOTICES.md'), path.join(output, 'NOTICES.txt'));
console.log('格式化静态资源已生成到 public/formatter/，请一并提交资源与许可证。');
