import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.goto('https://webflow.com/blog/how-ai-powered-seo-is-accelerating-organic-growth', { waitUntil: 'networkidle0' });

  const results = await page.evaluate(() => {
    // Find elements with absolute positioning that might be background glows
    const allEls = Array.from(document.querySelectorAll('*'));
    const effects = [];
    
    // Check for fixed/absolute backgrounds with blur, gradients, or opacity
    allEls.forEach(el => {
      const cs = window.getComputedStyle(el);
      if ((cs.position === 'absolute' || cs.position === 'fixed') && parseInt(cs.zIndex) < 10) {
        if (cs.backgroundImage !== 'none' || cs.backgroundColor !== 'rgba(0, 0, 0, 0)') {
           // It's likely a background effect element
           effects.push({
             className: el.className,
             width: cs.width,
             height: cs.height,
             bg: cs.background,
             bgImage: cs.backgroundImage,
             opacity: cs.opacity,
             filter: cs.filter,
             borderRadius: cs.borderRadius
           });
        }
      }
    });

    // Also check body/wrapper pseudo-elements? Not easily done in JS, but 
    // Webflow typically uses div blocks with classes like "background-glow", "gradient-bg", etc.
    const namedEffects = Array.from(document.querySelectorAll('[class*="glow"], [class*="bg-"], [class*="gradient"], [class*="blur"]'))
      .map(el => {
        const cs = window.getComputedStyle(el);
        return {
          className: el.className,
          bg: cs.background,
          filter: cs.filter,
          opacity: cs.opacity,
          position: cs.position
        };
      });

    return { effects, namedEffects };
  });

  const fs = require('fs');
  fs.writeFileSync('webflow_glows.json', JSON.stringify(results, null, 2));
  await browser.close();
})();
