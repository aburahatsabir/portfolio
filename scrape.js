import puppeteer from 'puppeteer';
import fs from 'fs';
(async () => {
    try {
        const browser = await puppeteer.launch({ headless: 'new' });
        const page = await browser.newPage();
        await page.goto('https://thimpress.com/showcase-your-projects-using-a-website/#ftoc-heading-20', { waitUntil: 'networkidle2' });
        const styles = await page.evaluate(() => {
            const getStyle = (selector) => {
                const els = document.querySelectorAll(selector);
                if (els.length === 0) return null;
                const el = els[0];
                const comp = window.getComputedStyle(el);
                return {
                    fontSize: comp.fontSize,
                    lineHeight: comp.lineHeight,
                    fontWeight: comp.fontWeight,
                    marginTop: comp.marginTop,
                    marginBottom: comp.marginBottom
                };
            };
            return {
                h2: getStyle('.entry-content h2'),
                h3: getStyle('.entry-content h3'),
                p: getStyle('.entry-content p'),
                ul_li: getStyle('.entry-content ul li')
            };
        });
        fs.writeFileSync('scrape_utf8.json', JSON.stringify(styles, null, 2), 'utf-8');
        await browser.close();
    } catch (e) {
        console.error(e);
    }
})();
