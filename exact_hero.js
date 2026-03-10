import puppeteer from 'puppeteer';
import * as fs from 'fs';

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.goto('https://webflow.com/blog/how-ai-powered-seo-is-accelerating-organic-growth', { waitUntil: 'networkidle0' });

  const result = await page.evaluate(() => {
    const h1 = document.querySelector('h1');
    if (!h1) return null;
    
    let container = h1.closest('.section, header, .hero');
    if (!container) container = h1.parentElement.parentElement;
    
    function getAbsoluteChildrenAndBackgrounds(element, depth = 0) {
        if (!element || depth > 4) return [];
        let data = [];
        const style = window.getComputedStyle(element);
        
        // Only care about things that might contribute to background visuals
        if (style.position === 'absolute' || style.backgroundImage !== 'none' || style.backgroundColor !== 'rgba(0, 0, 0, 0)') {
            data.push({
                tag: element.tagName,
                className: element.className,
                position: style.position,
                background: style.background,
                backgroundImage: style.backgroundImage,
                backgroundColor: style.backgroundColor,
                filter: style.filter,
                backdropFilter: style.backdropFilter,
                opacity: style.opacity,
                mixBlendMode: style.mixBlendMode
            });
        }
        
        Array.from(element.children).forEach(child => {
            data = data.concat(getAbsoluteChildrenAndBackgrounds(child, depth + 1));
        });
        
        return data;
    }
    
    return {
       html: container.outerHTML.substring(0, 2000), // Just to see structure
       styles: getAbsoluteChildrenAndBackgrounds(container)
    };
  });

  fs.writeFileSync('exact_hero.json', JSON.stringify(result, null, 2));
  await browser.close();
})();
