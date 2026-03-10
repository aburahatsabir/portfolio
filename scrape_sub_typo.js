import puppeteer from 'puppeteer';
import * as fs from 'fs';

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('https://webflow.com/blog/how-ai-powered-seo-is-accelerating-organic-growth', { waitUntil: 'networkidle0' });

  const data = await page.evaluate(() => {
    // 1. Get the breadcrumb ("Blog > Category")
    const breadcrumbNav = document.querySelector('nav.breadcrumb-nav, .breadcrumb-nav, nav ol');
    let breadcrumbData = null;
    if (breadcrumbNav) {
        // often the text is in Li or A tags
        const link = breadcrumbNav.querySelector('a, li.breadcrumb-item');
        if (link) {
            const style = window.getComputedStyle(link);
            breadcrumbData = {
                fontSize: style.fontSize,
                lineHeight: style.lineHeight,
                fontWeight: style.fontWeight,
                letterSpacing: style.letterSpacing,
                textTransform: style.textTransform,
            }
        }
    }

    // 2. Get the subtitle / excerpt ("Why generic productivity...")
    // In Webflow this is usually the P tag immediately following the H1, or contained in the same hero block.
    const h1 = document.querySelector('h1');
    let subtitleData = null;
    if (h1) {
        const parent = h1.parentElement;
        const pMatch = parent.querySelector('p');
        if (pMatch) {
            const style = window.getComputedStyle(pMatch);
            subtitleData = {
                fontSize: style.fontSize,
                lineHeight: style.lineHeight,
                fontWeight: style.fontWeight,
                letterSpacing: style.letterSpacing
            };
        }
    }

    return { breadcrumb: breadcrumbData, subtitle: subtitleData };
  });
  
  fs.writeFileSync('exact_sub_typo.json', JSON.stringify(data, null, 2));
  await browser.close();
})();
