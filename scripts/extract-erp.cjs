const fs = require('fs');
const lines = fs.readFileSync('C:/Users/Nigher Sultana/Downloads/fmcg-casestudy-portfolio.html', 'utf-8').split('\n');

const fontLinks = lines.slice(10, 14).join('\n');
const rootVars = lines.slice(18, 32).join('\n');

const styleStart = lines.findIndex(l => l.includes('.erp-embed{font-family:var(--sans);'));
const styleEnd = lines.findIndex((l, i) => i > styleStart && l.includes('</style>'));
const erpStyles = lines.slice(styleStart, styleEnd).join('\n');

const jsStart = lines.findIndex((l, i) => i > styleEnd && l.includes('<script>'));
// The file ends at 1796, so we capture from jsStart up to the end minus body/html tags
const jsEnd = lines.findLastIndex(l => l.includes('</script>'));
const erpScripts = lines.slice(jsStart, jsEnd + 1).join('\n');

const finalHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  ${fontLinks}
  <style>
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
  ${rootVars}
  body{font-family:var(--sans);background:transparent;color:var(--ink);-webkit-font-smoothing:antialiased;overflow-x:hidden;margin:0;padding:0}
  ${erpStyles}
  </style>
</head>
<body>
  <div id="erp-container"></div>
  ${erpScripts}
</body>
</html>`;

fs.writeFileSync('C:/New folder/OneDrive - 55phcx/port/portfolio/public/erp-demo.html', finalHtml);
console.log('ERP demo extracted and saved to public/erp-demo.html');
