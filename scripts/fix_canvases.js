import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const file = path.join(__dirname, '../components/ErpDemo.tsx');
let content = fs.readFileSync(file, 'utf8');

// Problem: Earlier we added dynamic key={`cv-${id}-${animKey}-${tabKey}`} to all <canvas> elements.
// This causes React to destroy and recreate the canvas DOM element when animKey/tabKey change.
// But the chart useEffect now has [] dependency (runs only once on mount).
// So after first nav: canvas is destroyed+recreated by React, but chartRef still points to OLD canvas → blank.
//
// Fix: Remove all the dynamic keys from canvases. Canvas elements should be stable DOM nodes.
// The animation is a CSS page fade — canvases don't need to remount.

const before = content.match(/<canvas id="[^"]+" key=\{`cv-[^`]+`\}><\/canvas>/g);
console.log('Canvas elements with dynamic keys found:', before?.length);

// Remove the key prop from all canvas elements
content = content.replace(/ key=\{`cv-[^`]+`\}/g, '');

const after = content.match(/<canvas id="[^"]+" key=\{`cv-[^`]+`\}><\/canvas>/g);
console.log('Canvas elements with dynamic keys remaining:', after?.length ?? 0);

fs.writeFileSync(file, content);
console.log('✅ Done! Dynamic keys removed from all canvas elements.');
