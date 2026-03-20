const fs = require('fs');
let c = fs.readFileSync('components/ErpDemo.tsx', 'utf-8');
// Fix escaped closing tags: <\/div> => </div>
c = c.replace(/<\\\/([a-zA-Z0-9]+)>/g, '</$1>');
// Fix broken arrow functions: onChange={() = /> {}} /> => onChange={() => {}} />
c = c.replace(/onChange\(\(\) = \/> \{\}\} \/>/g, 'onChange={() => {}} />');
// Any remaining variants
c = c.replace(/onClick\(\(\) = \/> \{\}\} \/>/g, 'onClick={() => {}} />');
c = c.replace(/onInput\(\(\) = \/> \{\}\}/g, 'onChange={() => {}}');
c = c.replace(/onChange\(\(\) = \/>/g, 'onChange={() =>');
c = c.replace(/onClick\(\(\) = \/>/g, 'onClick={() =>');
// Fix the pattern where /> got stuck inside the lambda: {}} />
c = c.replace(/\{\}\} \/>/g, (match, offset) => {
  // It's already correct if that's the end of a JSX self-closing element
  return '{}}/>';
});
// Specifically fix our known broken pattern
c = c.replace(/onChange=\{.*?\}/g, 'onChange={() => {}}');
// Also fix remaining oninput in final file just in case
c = c.replace(/ oninput="[^"]+"/g, ' onChange={() => {}}');
fs.writeFileSync('components/ErpDemo.tsx', c);
console.log('Fixup done!');
