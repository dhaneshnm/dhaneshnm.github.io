// Regenerate public/og.png (1200x630) from scripts/og.html.
// One-off, dev-only — never runs during `astro build`.
//
// Usage:
//   npm i -D playwright && npx playwright install chromium
//   node scripts/og-shot.mjs
//
import { chromium } from "playwright";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const htmlPath = resolve(__dirname, "og.html");
const outPath = resolve(__dirname, "../public/og.png");

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: 1200, height: 630 },
  deviceScaleFactor: 1,
});
await page.goto("file://" + htmlPath, { waitUntil: "networkidle" });
await page.evaluate(() => document.fonts.ready);
await page.locator(".card").screenshot({ path: outPath });
await browser.close();
console.log("wrote", outPath);
