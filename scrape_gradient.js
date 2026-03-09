import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.goto('https://webflow.com/blog/how-ai-powered-seo-is-accelerating-organic-growth', { waitUntil: 'networkidle2' });

  const results = await page.evaluate(() => {
    // Specifically target the animated gradient text in the hero or content
    const styleBlock = Array.from(document.querySelectorAll('style')).map(s => s.textContent).join('\n');
    
    // Webflow often uses classes like .text-gradient, .gradient-text-clip, or specific keyframes
    // Let's grab any CSS rules that mention text-fill-color or gradient
    
    const elements = Array.from(document.querySelectorAll('*'));
    const gradientEls = elements.filter(el => {
      const cs = window.getComputedStyle(el);
      return (cs.webkitBackgroundClip === 'text' || cs.backgroundClip === 'text');
    });

    return gradientEls.map(el => {
      const cs = window.getComputedStyle(el);
      return {
        text: el.textContent.trim().slice(0, 50),
        className: el.className,
        backgroundImage: cs.backgroundImage,
        backgroundSize: cs.backgroundSize,
        animation: cs.animation,
        animationName: cs.animationName,
        animationDuration: cs.animationDuration,
        animationIterationCount: cs.animationIterationCount,
        animationTimingFunction: cs.animationTimingFunction
      };
    });
  });

  console.log(JSON.stringify({
    gradients: results
  }, null, 2));
  
  await browser.close();
})();
