import puppeteer from 'puppeteer';
import * as fs from 'fs';

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('https://webflow.com/blog/how-ai-powered-seo-is-accelerating-organic-growth', { waitUntil: 'networkidle0' });

  const result = await page.evaluate(() => {
    // Get H1 precise styling
    const h1 = document.querySelector('h1');
    const h1Style = window.getComputedStyle(h1);
    const h1Data = {
        fontSize: h1Style.fontSize,
        lineHeight: h1Style.lineHeight,
        letterSpacing: h1Style.letterSpacing,
        fontWeight: h1Style.fontWeight
    };

    // Find the hero image card. It's usually the main large image in the right column of the hero.
    // Let's grab all images in the header/hero, exclude the background fluted-glass ones.
    const heroSection = h1.closest('.section') || h1.closest('header');
    const imgs = Array.from(heroSection.querySelectorAll('img')).filter(img => !img.className.includes('fluted-glass'));
    
    // The photo card is likely the first or largest one.
    let cardData = null;
    if (imgs.length > 0) {
        const targetImg = imgs[0]; // Usually the main rich text or hero thumbnail
        // Sometimes Webflow applies border-radius to the parent wrapper, not the img tag itself, if it has hidden overflow.
        let wrapper = targetImg.parentElement;
        const imgStyle = window.getComputedStyle(targetImg);
        const wrapperStyle = window.getComputedStyle(wrapper);
        
        cardData = {
            image: {
                width: imgStyle.width,
                height: imgStyle.height,
                aspectRatio: imgStyle.aspectRatio,
                borderRadius: imgStyle.borderRadius,
                boxShadow: imgStyle.boxShadow,
                objectFit: imgStyle.objectFit
            },
            wrapper: {
                tagName: wrapper.tagName,
                width: wrapperStyle.width,
                height: wrapperStyle.height,
                borderRadius: wrapperStyle.borderRadius,
                boxShadow: wrapperStyle.boxShadow,
                overflow: wrapperStyle.overflow
            }
        };
    }
    
    return { h1: h1Data, card: cardData };
  });

  fs.writeFileSync('photo_card_styles.json', JSON.stringify(result, null, 2));
  await browser.close();
})();
