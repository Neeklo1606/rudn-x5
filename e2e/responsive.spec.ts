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
  // Allow 1px rounding tolerance.
  const overflow = await page.evaluate(() => {
    const d = document.documentElement;
    return { scroll: d.scrollWidth, client: d.clientWidth };
  });
  expect(
    overflow.scroll - overflow.client,
    `${label}: horizontal overflow scrollWidth=${overflow.scroll} clientWidth=${overflow.client}`
  ).toBeLessThanOrEqual(1);
}

async function assertNoOverflowingElements(page: Page, label: string) {
  // Catch elements wider than the viewport (common regression source).
  // Ignore descendants of horizontally scrollable containers (intentional carousels).
  const offenders = await page.evaluate(() => {
    const vw = document.documentElement.clientWidth;
    const bad: { tag: string; cls: string; w: number; left: number }[] = [];
    const isInsideScroller = (el: HTMLElement) => {
      let cur: HTMLElement | null = el.parentElement;
      while (cur && cur !== document.body) {
        const cs = getComputedStyle(cur);
        if ((cs.overflowX === "auto" || cs.overflowX === "scroll") && cur.scrollWidth > cur.clientWidth) {
          return true;
        }
        cur = cur.parentElement;
      }
      return false;
    };
    document.querySelectorAll<HTMLElement>("body *").forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.width > vw + 1 || r.right > vw + 1 || r.left < -1) {
        if (isInsideScroller(el)) return;
        const cs = getComputedStyle(el);
        if (cs.overflowX === "auto" || cs.overflowX === "scroll" || cs.overflowX === "hidden") return;
        bad.push({
          tag: el.tagName.toLowerCase(),
          cls: (el.className || "").toString().slice(0, 80),
          w: Math.round(r.width),
          left: Math.round(r.left),
        });
      }
    });
    return bad.slice(0, 5);
  });
  expect(offenders, `${label}: overflowing elements: ${JSON.stringify(offenders)}`).toEqual([]);
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

        // Let animations & lazy content settle.
        await page.waitForTimeout(400);

        await assertNoHorizontalScroll(page, `${route} @ ${bp.name}`);
        await assertNoOverflowingElements(page, `${route} @ ${bp.name}`);

        // Visual regression baseline (per route × breakpoint).
        await expect(page).toHaveScreenshot(`${route.replace(/\//g, "_") || "home"}-${bp.name}.png`, {
          fullPage: false,
          maxDiffPixelRatio: 0.02,
          animations: "disabled",
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