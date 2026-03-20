const fs = require('fs');
const html = fs.readFileSync('public/erp-demo.html', 'utf-8');

// Extract raw CSS from <style> tag
const styleStart = html.indexOf('<style>') + '<style>'.length;
const styleEnd = html.indexOf('</style>');
const css = html.substring(styleStart, styleEnd).trim();
fs.writeFileSync('dev-css-out.txt', css);
console.log('CSS extracted, chars:', css.length);

// The HTML body is inside an IIFE as an escaped string assigned to el.innerHTML
const bodyStart = html.indexOf('if(el)el.innerHTML="') + 'if(el)el.innerHTML="'.length;
let bodyEnd = html.indexOf('";\n})();', bodyStart);
if (bodyEnd === -1) bodyEnd = html.indexOf('";\r\n})();', bodyStart);
if (bodyEnd === -1) bodyEnd = html.indexOf('";\n\n<', bodyStart);
let escaped = html.substring(bodyStart, bodyEnd);

// Unescape the string
let rawBody = escaped
  .replace(/\\n/g, '\n')
  .replace(/\\t/g, '\t')
  .replace(/\\"/g, '"')
  .replace(/\\\\/g, '\\')
  .replace(/\\u([0-9a-fA-F]{4})/g, (m, p1) => String.fromCharCode(parseInt(p1, 16)));

// Remove any <script> sections from the extracted HTML
const scriptIdx = rawBody.indexOf('<script>');
if (scriptIdx !== -1) {
  rawBody = rawBody.substring(0, scriptIdx);
}
rawBody = rawBody.trim();

// Convert HTML attributes to JSX
let jsx = rawBody;
jsx = jsx.replace(/ class="/g, ' className="');
jsx = jsx.replace(/ for="/g, ' htmlFor="');

// Fix inline style strings FIRST: style="prop:val" => style={{prop:'val'}}
jsx = jsx.replace(/ style="([^"]+)"/g, (match, s) => {
  const props = s.split(';').filter(p => p.trim()).map(p => {
    const colonIdx = p.indexOf(':');
    if (colonIdx === -1) return null;
    const k = p.substring(0, colonIdx).trim();
    const v = p.substring(colonIdx + 1).trim();
    const key = k.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
    return `${key}:"${v}"`;
  }).filter(Boolean).join(',');
  return ` style={{${props}}}`;
});

// Fix <input ...> or <input .../> to have proper JSX self-closing
// First handle inputs that have event handlers before self-closing
jsx = jsx.replace(/<input([^>]*?) oninput="[^"]*"([^>]*?)(\s*\/?)>/g, '<input$1 onChange={() => {}}$2 />');
jsx = jsx.replace(/<input([^>]*?) onchange="[^"]*"([^>]*?)(\s*\/?)>/g, '<input$1 onChange={() => {}}$2 />');
jsx = jsx.replace(/<input([^>]*?) onclick="[^"]*"([^>]*?)(\s*\/?)>/g, '<input$1 onClick={() => {}}$2 />');
// Now self-close any remaining input tags
jsx = jsx.replace(/<input([^>]*?)(\s*\/?)>/g, '<input$1 />');
// Fix <br> and <hr>
jsx = jsx.replace(/<br>/g, '<br />');
jsx = jsx.replace(/<hr>/g, '<hr />');

// Fix other event handlers on non-void elements
jsx = jsx.replace(/ onclick="[^"]+"/g, ' onClick={() => {}}');
jsx = jsx.replace(/ onchange="[^"]+"/g, ' onChange={() => {}}');
jsx = jsx.replace(/ oninput="[^"]+"/g, ' onChange={() => {}}');

// Fix HTML comments
jsx = jsx.replace(/<!--(.*?)-->/gs, '{/*$1*/}');

fs.writeFileSync('dev-jsx-out.txt', jsx);
console.log('JSX extracted, lines:', jsx.split('\n').length, 'chars:', jsx.length);
