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
    
    const h1Rect = h1.getBoundingClientRect();
    
    const breadcrumbNodes = Array.from(document.querySelectorAll('a, span')).filter(el => el.textContent.includes('Blog'));
    let bcRect = null;
    if(breadcrumbNodes.length > 0) {
        // get the parent wrapper of this breadcrumb
        const bc = breadcrumbNodes[0].parentElement;
        bcRect = bc.getBoundingClientRect();
    }
    
    let pMatch = h1.nextElementSibling;
    if (pMatch && pMatch.tagName !== 'P') {
        pMatch = h1.parentElement.querySelector('p');
    }
    let pRect = pMatch ? pMatch.getBoundingClientRect() : null;
    
    return {
        bcToH1Gap: (bcRect && h1Rect) ? (h1Rect.top - bcRect.bottom) : null,
        h1ToPGap: (pRect && h1Rect) ? (pRect.top - h1Rect.bottom) : null,
        overallHeroPadding: {
             top: h1.closest('header, section').getBoundingClientRect().top,
        }
    };
  });
  
  fs.writeFileSync('distances.json', JSON.stringify(data, null, 2));
  await browser.close();
})();
