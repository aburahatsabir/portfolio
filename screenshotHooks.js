import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('https://webflow.com/blog/how-ai-powered-seo-is-accelerating-organic-growth', { waitUntil: 'networkidle0' });

  // Take screenshot of the top hero section
  await page.screenshot({ path: 'C:\\Users\\abura\\.gemini\\antigravity\\brain\\63c81ae8-4451-4c55-8364-cfb0b6b2ff6e\\webflow_hero.png' });

  // Scroll down a bit to see the content headings
  await page.evaluate(() => {
    window.scrollBy(0, 800);
  });
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: 'C:\\Users\\abura\\.gemini\\antigravity\\brain\\63c81ae8-4451-4c55-8364-cfb0b6b2ff6e\\webflow_content.png' });

  await browser.close();
})();
