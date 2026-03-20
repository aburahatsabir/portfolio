const fs = require('fs');

function removeDescriptions(filepath) {
  if (!fs.existsSync(filepath)) return;
  let content = fs.readFileSync(filepath, 'utf8');
  
  const searchStr = `  <!-- Alerts -->\\n  <div class=\\"alert-row\\">\\n    <div class=\\"alert danger\\">\\n      <div class=\\"alert-icon\\">!<\\/div>\\n      <div class=\\"alert-body\\">\\n        <div class=\\"alert-title\\">Outstanding Dues \\u2014 \\u09f315,46,032 across 9 accounts<\\/div>\\n        <div class=\\"alert-msg\\">Dealers 977, 974, 975, 976 each carry \\u09f32.1L\\u2013\\u09f34.6L unpaid from Aug 2023 deliveries. Immediate follow-up required.<\\/div>\\n      <\\/div>\\n    <\\/div>\\n    <div class=\\"alert warn\\">\\n      <div class=\\"alert-icon\\">~<\\/div>\\n      <div class=\\"alert-body\\">\\n        <div class=\\"alert-title\\">18 Return Events \\u00b7 ~2,100 kg unresolved stock<\\/div>\\n        <div class=\\"alert-msg\\">3 returns from Aug\\u2013Oct 2023 still pending credit settlement in next challan.<\\/div>\\n      <\\/div>\\n    <\\/div>\\n    <div class=\\"alert info\\">\\n      <div class=\\"alert-icon\\">\\u2191<\\/div>\\n      <div class=\\"alert-body\\">\\n        <div class=\\"alert-title\\">Revenue 66\\u00d7 growth \\u2014 Sep 2022 to Oct 2023<\\/div>\\n        <div class=\\"alert-msg\\">Monthly order value grew from \\u09f357,640 to \\u09f338,70,740. Oct 2023 is the highest month on record.<\\/div>\\n      <\\/div>\\n    <\\/div>\\n  <\\/div>`;

  const replaceStr = `  <!-- Alerts -->\\n  <div class=\\"alert-row\\">\\n    <div class=\\"alert danger\\">\\n      <div class=\\"alert-icon\\">!<\\/div>\\n      <div class=\\"alert-title\\">Outstanding Dues \\u2014 \\u09f315,46,032 across 9 accounts<\\/div>\\n    <\\/div>\\n    <div class=\\"alert warn\\">\\n      <div class=\\"alert-icon\\">~<\\/div>\\n      <div class=\\"alert-title\\">18 Return Events \\u00b7 ~2,100 kg unresolved stock<\\/div>\\n    <\\/div>\\n    <div class=\\"alert info\\">\\n      <div class=\\"alert-icon\\">\\u2191<\\/div>\\n      <div class=\\"alert-title\\">Revenue 66\\u00d7 growth \\u2014 Sep 2022 to Oct 2023<\\/div>\\n    <\\/div>\\n  <\\/div>`;

  if (content.includes(searchStr)) {
    content = content.split(searchStr).join(replaceStr);
    fs.writeFileSync(filepath, content, 'utf8');
    console.log('Successfully replaced ALL occurences in ' + filepath);
  } else {
    console.log('String not found in ' + filepath);
  }
}

removeDescriptions('public/case-studies/fmcg-erp.html');
removeDescriptions('public/case-studies/fmcg-erp-app.html');
