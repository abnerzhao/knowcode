// Lightweight lexical highlighting, not a parser. Unfinished code stays editable.
const words = text => new Set(text.split(/\s+/));
const keywords = {
  java: words('abstract assert boolean break byte case catch char class const continue default do double else enum extends final finally float for if implements import instanceof int interface long native new package private protected public record return short static strictfp super switch synchronized this throw throws transient try var void volatile while yield sealed permits'),
  javascript: words('async await break case catch class const continue debugger default delete do else export extends finally for from function get if import in instanceof let new of return set static super switch this throw try typeof var void while with yield'),
  typescript: words('abstract any as asserts async await boolean break case catch class const constructor continue declare default delete do else enum export extends finally for from function get if implements import in infer instanceof interface is keyof let module namespace never new number of private protected public readonly require return satisfies set static string super switch symbol this throw try type typeof undefined unique unknown var void while yield'),
  python: words('and as assert async await break class continue def del elif else except finally for from global if import in is lambda nonlocal not or pass raise return try while with yield match case'),
  cpp: words('alignas alignof auto bool break case catch char class const constexpr const_cast continue decltype default delete do double dynamic_cast else enum explicit extern float for friend if inline int long namespace new noexcept nullptr operator private protected public register reinterpret_cast return short signed sizeof static static_assert static_cast struct switch template this thread_local throw try typedef typename union unsigned using virtual void volatile wchar_t while'),
  go: words('break case chan const continue default defer else fallthrough for func go goto if import interface map package range return select struct switch type var'),
};
const literals = words('true false null nil None True False undefined');
const builtins = {
  java: words('String Object Integer Long Double Float Boolean Character Byte Short Math System List ArrayList Map HashMap Set HashSet Arrays Collections StringBuilder'),
  javascript: words('Array Boolean Date Error JSON Map Math Number Object Promise RegExp Set String console'),
  typescript: words('Array Boolean Date Error JSON Map Math Number Object Promise RegExp Set String console'),
  python: words('bool bytes dict enumerate float int len list max min print range reversed set sorted str sum tuple zip'),
  cpp: words('string vector map unordered_map set unordered_set queue priority_queue stack deque pair size_t cout cin endl'),
  go: words('bool byte complex64 complex128 error float32 float64 int int8 int16 int32 int64 rune string uint uint8 uint16 uint32 uint64 uintptr append cap close copy delete len make new panic print println recover'),
};
const patterns = {
  python: /(?<comment>#[^\n]*)|(?<string>"""[\s\S]*?(?:"""|$)|'''[\s\S]*?(?:'''|$)|"(?:\\[^]|[^"\\\n])*(?:"|$)|'(?:\\[^]|[^'\\\n])*(?:'|$))|(?<number>\b(?:0[xob][\da-f_]+|\d[\d_]*(?:\.\d[\d_]*)?(?:e[+-]?\d+)?j?)\b)|(?<word>[\p{L}_$][\p{L}\p{N}_$]*)/giu,
  common: /(?<comment>\/\/[^\n]*|\/\*[\s\S]*?(?:\*\/|$))|(?<string>"(?:\\[^]|[^"\\\n])*(?:"|$)|'(?:\\[^]|[^'\\\n])*(?:'|$)|`(?:\\[^]|[^`\\])*(?:`|$))|(?<number>\b(?:0[xob][\da-f_]+|\d[\d_]*(?:\.\d[\d_]*)?(?:e[+-]?\d+)?[fl]?)\b)|(?<word>[\p{L}_$][\p{L}\p{N}_$]*)/giu,
};

function escapeHTML(text) {
  return text.replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
}

export function highlightCode(source, language) {
  if (!keywords[language]) return escapeHTML(source);
  const pattern = patterns[language] || patterns.common;
  const output = [];
  let cursor = 0;
  for (const match of source.matchAll(pattern)) {
    output.push(escapeHTML(source.slice(cursor, match.index)));
    const value = match[0];
    const type = match.groups.comment !== undefined ? 'comment'
      : match.groups.string !== undefined ? 'string'
      : match.groups.number !== undefined ? 'number'
      : keywords[language].has(value) ? 'keyword'
      : literals.has(value) ? 'literal'
      : builtins[language].has(value) ? 'builtin' : null;
    const escaped = escapeHTML(value);
    output.push(type ? `<span class="syntax-${type}">${escaped}</span>` : escaped);
    cursor = match.index + value.length;
  }
  output.push(escapeHTML(source.slice(cursor)));
  return output.join('');
}
