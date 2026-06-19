import { test, expect, Page } from "@playwright/test";

const BREAKPOINTS = [
  { name: "mobile-320", width: 320, height: 720 },
  { name: "mobile-375", width: 375, height: 812 },
  { name: "tablet-768", width: 768, height: 1024 },
  { name: "laptop-1024", width: 1024, height: 768 },
  { name: "desktop-1440", width: 1440, height: 900 },
];

const ROUTES = ["/", "/program", "/admission", "/news"];

async function assertNoHorizontalScroll(page: Page, label: string) {
  // Check user-visible horizontal scrolling. Body uses overflow-x: hidden,
  // so scrollWidth can exceed clientWidth without producing real scroll.
  const result = await page.evaluate(() => {
    window.scrollTo(200, 0);
    const x = window.scrollX;
    window.scrollTo(0, 0);
    return { x, scroll: document.documentElement.scrollWidth, client: document.documentElement.clientWidth };
  });
  expect(
    result.x,
    `${label}: horizontally scrollable (scrollX=${result.x}, scrollWidth=${result.scroll}, clientWidth=${result.client})`
  ).toBe(0);
}

for (const route of ROUTES) {
  test.describe(`route ${route}`, () => {
    for (const bp of BREAKPOINTS) {
      test(`${bp.name} renders without horizontal scroll`, async ({ page }) => {
        await page.setViewportSize({ width: bp.width, height: bp.height });
        const consoleErrors: string[] = [];
        page.on("console", (m) => {
          if (m.type() === "error") consoleErrors.push(m.text());
        });
        page.on("pageerror", (e) => consoleErrors.push(e.message));

        const resp = await page.goto(route, { waitUntil: "networkidle" });
        expect(resp?.ok(), `${route} responded ${resp?.status()}`).toBeTruthy();

        // Let animations (framer-motion counters etc.) & lazy content settle.
        await page.waitForTimeout(1500);

        await assertNoHorizontalScroll(page, `${route} @ ${bp.name}`);

        // Visual regression baseline (per route × breakpoint).
        // Mask <img> tags — remote stock photos (Unsplash, pravatar) load
        // non-deterministically and would dominate the diff.
        await expect(page).toHaveScreenshot(`${route.replace(/\//g, "_") || "home"}-${bp.name}.png`, {
          fullPage: false,
          maxDiffPixelRatio: 0.1,
          animations: "disabled",
          mask: [page.locator("img")],
          timeout: 10_000,
        });

        // Filter out noisy dev-only logs.
        const realErrors = consoleErrors.filter(
          (e) => !/\[vite\]|DevTools|Download the React DevTools/i.test(e)
        );
        expect(realErrors, `console errors at ${route} @ ${bp.name}`).toEqual([]);
      });
    }
  });
}

test.describe("smoke navigation", () => {
  test("home → program → news → admission", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/");
    for (const r of ["/program", "/news", "/admission", "/"]) {
      await page.goto(r, { waitUntil: "domcontentloaded" });
      await expect(page).toHaveURL(new RegExp(`${r === "/" ? "/$" : r}`));
      await assertNoHorizontalScroll(page, r);
    }
  });
});