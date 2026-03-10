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
    
    const h1Style = window.getComputedStyle(h1);
    
    const prev = h1.previousElementSibling;
    let prevStyle = prev ? window.getComputedStyle(prev) : null;
    
    let next = h1.nextElementSibling;
    if (next && next.tagName !== 'P') {
        const parentP = h1.parentElement.querySelector('p');
        if(parentP) next = parentP;
    }
    let nextStyle = next ? window.getComputedStyle(next) : null;
    
    const parent = h1.parentElement;
    const parentStyle = window.getComputedStyle(parent);
    
    const hero = h1.closest('header, .section');
    const heroStyle = hero ? window.getComputedStyle(hero) : null;

    return {
        h1: {
            marginTop: h1Style.marginTop,
            marginBottom: h1Style.marginBottom,
            paddingTop: h1Style.paddingTop,
            paddingBottom: h1Style.paddingBottom
        },
        breadcrumb: prevStyle ? {
            marginBottom: prevStyle.marginBottom,
        } : null,
        excerpt: nextStyle ? {
            marginTop: nextStyle.marginTop,
            marginBottom: nextStyle.marginBottom
        } : null,
        parentColumn: {
            display: parentStyle.display,
            flexDirection: parentStyle.flexDirection,
            gap: parentStyle.gap,
            paddingTop: parentStyle.paddingTop,
            paddingBottom: parentStyle.paddingBottom
        },
        heroSection: heroStyle ? {
            paddingTop: heroStyle.paddingTop,
            paddingBottom: heroStyle.paddingBottom,
            minHeight: heroStyle.minHeight
        } : null
    };
  });
  
  fs.writeFileSync('vertical_spacing.json', JSON.stringify(data, null, 2));
  await browser.close();
})();
