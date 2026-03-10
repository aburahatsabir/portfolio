import puppeteer from 'puppeteer';
import * as fs from 'fs';

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('https://webflow.com/blog/how-ai-powered-seo-is-accelerating-organic-growth', { waitUntil: 'networkidle0' });

  const result = await page.evaluate(() => {
    // Webflow typically uses an img tag or a wrapper div in the hero
    const img = document.querySelector('header.section img') || document.querySelector('.hero img');
    if (!img) return { error: 'No image found in hero' };
    
    // Check the image element and its parent wrapper
    const wrapper = img.parentElement;
    
    const extractComputed = (el) => {
        if (!el) return null;
        const style = window.getComputedStyle(el);
        const rect = el.getBoundingClientRect();
        return {
            tagName: el.tagName,
            className: el.className,
            width: style.width,
            height: style.height,
            maxWidth: style.maxWidth,
            maxHeight: style.maxHeight,
            minHeight: style.minHeight,
            aspectRatio: style.aspectRatio,
            borderRadius: style.borderRadius,
            boxShadow: style.boxShadow,
            border: style.border,
            rect: { width: rect.width, height: rect.height }
        };
    };

    return {
        image: extractComputed(img),
        wrapper: extractComputed(wrapper),
        parentWrapper: extractComputed(wrapper.parentElement)
    };
  });

  fs.writeFileSync('hero_img_styles.json', JSON.stringify(result, null, 2));
  await browser.close();
})();
