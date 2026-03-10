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
    if (!h1) return { error: 'No H1 found' };
    
    // The breadcrumb is structurally before the H1 in the hero section
    let breadcrumb = h1.previousElementSibling;
    let styleData = null;
    
    if (breadcrumb) {
        // sometimes it's wrapped in a link block, let's just get the computed style of the container itself 
        // or the first text-bearing child
        const textElement = breadcrumb.querySelector('a') || breadcrumb;
        const style = window.getComputedStyle(textElement);
        
        styleData = {
            tagName: textElement.tagName,
            className: textElement.className,
            fontSize: style.fontSize,
            lineHeight: style.lineHeight,
            letterSpacing: style.letterSpacing,
            fontWeight: style.fontWeight,
            textTransform: style.textTransform
        };
    }

    return styleData;
  });
  
  console.log(JSON.stringify(data, null, 2));
  fs.writeFileSync('typo_bc.json', JSON.stringify(data, null, 2));
  await browser.close();
})();
