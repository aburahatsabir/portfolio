import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('https://webflow.com/blog/how-ai-powered-seo-is-accelerating-organic-growth', { waitUntil: 'networkidle0' });

  const data = await page.evaluate(() => {
    // find hero wrapper
    const h1 = document.querySelector('h1');
    if (!h1) return [];
    
    // get parent container
    const hero = h1.closest('header, section, .section');
    
    // get all text bearing elements
    const elements = Array.from(hero.querySelectorAll('h1, h2, h3, h4, h5, h6, p, a, span, div'));
    const results = [];
    
    elements.forEach(el => {
        // filter out empty or large containers
        if(el.children.length === 0 && el.textContent.trim().length > 0) {
            const style = window.getComputedStyle(el);
            results.push({
                text: el.textContent.trim().substring(0, 30),
                tagName: el.tagName,
                fontSize: style.fontSize,
                lineHeight: style.lineHeight,
                letterSpacing: style.letterSpacing
            });
        }
    });

    return results;
  });
  
  // print out unique matches only to save space
  const unique = [];
  const seen = new Set();
  for (const item of data) {
      const key = `${item.text}-${item.fontSize}`;
      if(!seen.has(key)) {
          seen.add(key);
          unique.push(item);
      }
  }

  console.log(JSON.stringify(unique, null, 2));
  await browser.close();
})();
