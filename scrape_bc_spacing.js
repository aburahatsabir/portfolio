import puppeteer from 'puppeteer';
import * as fs from 'fs';

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('https://webflow.com/blog/how-ai-powered-seo-is-accelerating-organic-growth', { waitUntil: 'domcontentloaded' });
  await new Promise(r => setTimeout(r, 1000));

  const data = await page.evaluate(() => {
    const h1 = document.querySelector('h1');
    if (!h1) return null;
    
    // The previous element is the breadcrumb wrapper
    const bc = h1.previousElementSibling;
    
    return {
        bcMarginBottom: bc ? window.getComputedStyle(bc).marginBottom : null,
        h1MarginTop: window.getComputedStyle(h1).marginTop,
        h1MarginBottom: window.getComputedStyle(h1).marginBottom,
        bcToH1ExactGap: bc ? (h1.getBoundingClientRect().top - bc.getBoundingClientRect().bottom) : null
    };
  });
  
  fs.writeFileSync('bc_spacing.json', JSON.stringify(data, null, 2));
  await browser.close();
})();
