import puppeteer from 'puppeteer';
import * as fs from 'fs';

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  await page.setViewport({ width: 1440, height: 900 });
  // Don't wait for everything to load, just the DOM so we can read the styles
  await page.goto('https://webflow.com/blog/how-ai-powered-seo-is-accelerating-organic-growth', { waitUntil: 'domcontentloaded' });

  // wait an extra second for CSS to apply
  await new Promise(r => setTimeout(r, 1000));

  const data = await page.evaluate(() => {
    // 1. Breadcrumb
    const breadcrumbLinks = Array.from(document.querySelectorAll('.breadcrumb-nav a, nav a, .breadcrumb a'));
    let bcStyle = null;
    if (breadcrumbLinks.length > 0) {
        const cs = window.getComputedStyle(breadcrumbLinks[0]);
        bcStyle = { fontSize: cs.fontSize, lineHeight: cs.lineHeight, letterSpacing: cs.letterSpacing, textTransform: cs.textTransform, fontWeight: cs.fontWeight };
    }

    // 2. Subtitle / Excerpt
    const h1 = document.querySelector('h1');
    let subStyle = null;
    if (h1) {
        let p = h1.nextElementSibling;
        if (p && p.tagName !== 'P') {
            p = h1.parentElement.querySelector('p');
        }
        if (p) {
            const cs = window.getComputedStyle(p);
            subStyle = { fontSize: cs.fontSize, lineHeight: cs.lineHeight, letterSpacing: cs.letterSpacing, fontWeight: cs.fontWeight };
        }
    }

    return { breadcrumb: bcStyle, subtitle: subStyle };
  });
  
  fs.writeFileSync('typo_fast.json', JSON.stringify(data, null, 2));
  await browser.close();
})();
