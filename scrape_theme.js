import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.goto('https://webflow.com/blog/how-ai-powered-seo-is-accelerating-organic-growth', { waitUntil: 'networkidle0' });

  const results = await page.evaluate(() => {
    const mainWrap = document.querySelector('.page-wrapper') || document.body;
    const heroWrap = document.querySelector('.blog-header') || document.querySelector('.section');
    
    return {
      bodyStyle: window.getComputedStyle(document.body).cssText,
      mainWrapBg: window.getComputedStyle(mainWrap).background,
      mainWrapColor: window.getComputedStyle(mainWrap).color,
      heroBg: heroWrap ? window.getComputedStyle(heroWrap).background : null,
      heroClasses: heroWrap ? heroWrap.className : null,
      gradientElements: Array.from(document.querySelectorAll('[class*="gradient"], [style*="gradient"]'))
        .map(el => ({
          tag: el.tagName,
          className: el.className,
          bg: window.getComputedStyle(el).background
        }))
    };
  });

  console.log(JSON.stringify(results, null, 2));
  await browser.close();
})();
