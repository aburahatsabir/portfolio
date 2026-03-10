import puppeteer from 'puppeteer';
import * as fs from 'fs';

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  // Checking mobile, tablet, and desktop breakpoints
  const viewports = [
    { width: 375, height: 812 },
    { width: 768, height: 1024 },
    { width: 1440, height: 900 }
  ];
  
  const results = {};

  for (const vp of viewports) {
    await page.setViewport(vp);
    await page.goto('https://webflow.com/blog/how-ai-powered-seo-is-accelerating-organic-growth', { waitUntil: 'networkidle0' });

    const data = await page.evaluate(() => {
      const h1 = document.querySelector('h1');
      if (!h1) return null;
      
      const style = window.getComputedStyle(h1);
      return {
        fontSize: style.fontSize,
        lineHeight: style.lineHeight,
        letterSpacing: style.letterSpacing,
        fontWeight: style.fontWeight,
        fontFamily: style.fontFamily
      };
    });
    
    results[`width_${vp.width}`] = data;
  }

  // Also check the specific governance page if it's different
  // The screenshot showed "Governance" / "Idempotent Operations..." 
  // Let's see if there's a different typography standard there.
  
  fs.writeFileSync('exact_typo.json', JSON.stringify(results, null, 2));
  await browser.close();
})();
