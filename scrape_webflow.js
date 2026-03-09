import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.goto('https://webflow.com/blog/how-ai-powered-seo-is-accelerating-organic-growth', { waitUntil: 'networkidle2' });

  const results = await page.evaluate(() => {
    // Webflow typically uses w-richtext or similar for blog content
    const headings = Array.from(document.querySelectorAll('h2, h3, h4'));
    const styles = [];
    
    // Get headings inside the main article container
    headings.forEach(h => {
      // Only get headings that look like article content (inside a rich text block or having enough text)
      if (h.closest('.w-richtext') || h.textContent.length > 10) {
        const cs = window.getComputedStyle(h);
        styles.push({
          tag: h.tagName,
          text: h.textContent.trim().slice(0, 30),
          fontSize: cs.fontSize,
          lineHeight: cs.lineHeight,
          fontWeight: cs.fontWeight,
          marginTop: cs.marginTop,
          marginBottom: cs.marginBottom,
          letterSpacing: cs.letterSpacing,
          color: cs.color
        });
      }
    });

    // We also need to find gradient text animations.
    // Let's look for anything with a background clip of text or a gradient background.
    const allElements = Array.from(document.querySelectorAll('*'));
    const gradients = allElements.filter(el => {
      const cs = window.getComputedStyle(el);
      return cs.backgroundImage.includes('gradient') && (cs.webkitBackgroundClip === 'text' || cs.backgroundClip === 'text');
    }).slice(0, 5);

    gradients.forEach(g => {
      const cs = window.getComputedStyle(g);
      styles.push({
        type: 'gradient-text',
        tag: g.tagName,
        text: g.textContent.trim().slice(0, 30),
        backgroundImage: cs.backgroundImage,
        backgroundSize: cs.backgroundSize,
        webkitTextFillColor: cs.webkitTextFillColor,
        animation: cs.animation,
        animationName: cs.animationName,
        animationDuration: cs.animationDuration
      });
    });

    // Get a few paragraphs too for reference
    const paragraphs = Array.from(document.querySelectorAll('.w-richtext p')).slice(0,2);
    paragraphs.forEach(p => {
        const cs = window.getComputedStyle(p);
        styles.push({
          tag: 'P',
          fontSize: cs.fontSize,
          lineHeight: cs.lineHeight,
          marginBottom: cs.marginBottom
        });
    });

    return Array.from(new Set(styles.map(s => JSON.stringify(s)))).map(s => JSON.parse(s));
  });

  import('fs').then(fs => {
    fs.writeFileSync('webflow.json', JSON.stringify(results, null, 2));
  });
  
  await browser.close();
})();
