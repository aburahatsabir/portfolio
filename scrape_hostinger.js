import puppeteer from 'puppeteer';
import fs from 'fs';

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.goto('https://www.hostinger.com/blog/', { waitUntil: 'networkidle2' });

  const results = await page.evaluate(() => {
    const elements = Array.from(document.querySelectorAll('a, p, span, h1, h2, h3, h4, h5, h6, div'));
    const styles = [];

    const getStyle = (el, label) => {
      const cs = window.getComputedStyle(el);
      return {
        label,
        tag: el.tagName,
        text: el.textContent.trim().slice(0, 40),
        fontSize: cs.fontSize,
        lineHeight: cs.lineHeight,
        fontWeight: cs.fontWeight,
        color: cs.color,
        letterSpacing: cs.letterSpacing,
        textTransform: cs.textTransform
      };
    };

    // Find specific elements by text
    elements.forEach(el => {
      const txt = el.textContent.trim();
      if (txt === '02 Dec' || txt === '19 Aug' || txt === '8min') {
        if (el.children.length === 0) styles.push(getStyle(el, 'Meta Date/Time'));
      }
      if (txt === 'WordPress' && el.tagName === 'A' && el.children.length === 0) {
        styles.push(getStyle(el, 'Category'));
      }
      if (txt.includes('What’s new in WordPress 6.9?') && el.children.length === 0) {
        styles.push(getStyle(el, 'Title'));
      }
      if (txt.includes('marks the second and final major release') && el.children.length === 0) {
        styles.push(getStyle(el, 'Excerpt'));
      }
    });

    return Array.from(new Set(styles.map(s => JSON.stringify(s)))).map(s => JSON.parse(s));
  });

  fs.writeFileSync('results2.json', JSON.stringify(results, null, 2), 'utf8');
  await browser.close();
})();
