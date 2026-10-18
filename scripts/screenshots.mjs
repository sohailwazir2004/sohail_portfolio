// Captures screenshots of my live projects and saves them as optimised .webp files.
// Run with: npm run screenshots
// Needs Playwright's Chromium once: npx playwright install chromium
import { chromium } from 'playwright';
import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';

const OUT_DIR = 'src/assets/projects';
const DESKTOP = { width: 1440, height: 900 };
const MOBILE = { width: 390, height: 844 };
const MAX_KB = 200;

// This portfolio itself. Point it at a local preview before deploying:
//   npm run build && npx vite preview   then   PORTFOLIO_URL=http://localhost:4173 npm run screenshots
const PORTFOLIO_URL = process.env.PORTFOLIO_URL || 'https://my-portfolio-three-silk-27.vercel.app';
// Pass ONLY=portfolio (or any name prefix) to capture just some shots.
const ONLY = process.env.ONLY;

// Each shot: file name, page URL, viewport, and optionally a heading text to scroll to first.
const shots = [
  { name: 'preghal-desktop', url: 'https://preghalfragrances.com', viewport: DESKTOP },
  {
    name: 'preghal-collection',
    url: 'https://preghalfragrances.com',
    viewport: DESKTOP,
    scrollTo: 'Different worlds. One presence.',
  },
  { name: 'preghal-product', url: 'https://preghalfragrances.com/fragrance/obsidian', viewport: DESKTOP },
  { name: 'preghal-mobile', url: 'https://preghalfragrances.com', viewport: MOBILE, mobile: true },
  { name: 'campusconnect-desktop', url: 'https://cuiconnect.app', viewport: DESKTOP },
  { name: 'campusconnect-mobile', url: 'https://cuiconnect.app', viewport: MOBILE, mobile: true },
  // wait: the intro + hero animations take ~3.5s. og: also save public/og-image.png for link previews.
  { name: 'portfolio-desktop', url: PORTFOLIO_URL, viewport: DESKTOP, wait: 5000, og: true },
  { name: 'portfolio-mobile', url: PORTFOLIO_URL, viewport: MOBILE, mobile: true, wait: 5000 },
];

// Re-encode at lower quality until the file is under MAX_KB.
async function toWebp(png, width) {
  for (let quality = 82; quality >= 40; quality -= 8) {
    const buf = await sharp(png).resize({ width }).webp({ quality }).toBuffer();
    if (buf.length / 1024 <= MAX_KB) return { buf, quality };
  }
  return { buf: await sharp(png).resize({ width }).webp({ quality: 40 }).toBuffer(), quality: 40 };
}

await mkdir(OUT_DIR, { recursive: true });
const browser = await chromium.launch();

for (const shot of shots.filter((s) => !ONLY || s.name.startsWith(ONLY))) {
  const context = await browser.newContext({
    viewport: shot.viewport,
    deviceScaleFactor: shot.mobile ? 2 : 1,
    isMobile: !!shot.mobile,
    hasTouch: !!shot.mobile,
    colorScheme: 'dark',
  });
  const page = await context.newPage();
  try {
    await page.goto(shot.url, { waitUntil: 'networkidle', timeout: 60_000 });
    await page.evaluate(() => document.fonts.ready);

    if (shot.scrollTo) {
      // Headings on animated sites are often split into one <span> per word, so compare the
      // text with all spaces removed instead of using getByText. Scroll in steps so scroll animations fire.
      await page.evaluate(async (text) => {
        const el = [...document.querySelectorAll('h1, h2, h3')].find((h) =>
          h.textContent.replace(/\s+/g, '').includes(text.replace(/\s+/g, '')),
        );
        if (!el) throw new Error(`Heading not found: ${text}`);
        const y = el.getBoundingClientRect().top + window.scrollY - 140;
        for (let pos = 0; pos < y; pos += 300) {
          window.scrollTo(0, pos);
          await new Promise((r) => setTimeout(r, 60));
        }
        window.scrollTo(0, y);
      }, shot.scrollTo);
    }

    // Let entrance animations, lazy images and particles settle.
    await page.waitForTimeout(shot.wait ?? 3000);

    const png = await page.screenshot({ type: 'png' });
    const { buf, quality } = await toWebp(png, shot.mobile ? 780 : 1440);
    await sharp(buf).toFile(`${OUT_DIR}/${shot.name}.webp`);
    if (shot.og) {
      // 1200x630 is the size LinkedIn, WhatsApp and X use for link preview cards.
      await sharp(png).resize(1200, 630, { fit: 'cover', position: 'top' }).png({ quality: 85 }).toFile('public/og-image.png');
      console.log('✓ public/og-image.png');
    }
    console.log(`✓ ${shot.name}.webp  ${(buf.length / 1024).toFixed(0)} KB (quality ${quality})`);
  } catch (err) {
    console.error(`✗ ${shot.name}: ${err.message}`);
  } finally {
    await context.close();
  }
}

await browser.close();
