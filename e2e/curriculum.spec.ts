import { test, expect, Page } from "@playwright/test";

type Snapshot = {
  scrollY: number;
  fillPct: number;
  active: number;
  expectedActive: number;
  blockCenters: number[];
  vhCenter: number;
};

async function readSnapshot(page: Page): Promise<Snapshot> {
  return await page.evaluate(() => {
    const wrap = document.querySelector(".curriculum-wrap") as HTMLElement;
    const fill = wrap?.querySelector("div[aria-hidden] > div") as HTMLElement;
    const dots = Array.from(
      document.querySelectorAll("[data-year-dot]")
    ) as HTMLElement[];
    const blocks = Array.from(
      document.querySelectorAll("[data-year-index]")
    ) as HTMLElement[];

    const lime = "rgb(182, 232, 53)";
    const active = dots.findIndex(
      (d) => getComputedStyle(d).backgroundColor === lime
    );

    const vhCenter = window.innerHeight / 2;
    const blockCenters = blocks.map((el) => {
      const r = el.getBoundingClientRect();
      return r.top + r.height / 2;
    });
    let expectedActive = 0;
    let best = Infinity;
    blockCenters.forEach((c, i) => {
      const d = Math.abs(c - vhCenter);
      if (d < best) {
        best = d;
        expectedActive = i;
      }
    });

    const fillH = parseFloat(fill?.style.height || "0");
    return {
      scrollY: window.scrollY,
      fillPct: fillH,
      active,
      expectedActive,
      blockCenters,
      vhCenter,
    };
  });
}

async function scrollToY(page: Page, y: number) {
  await page.evaluate((target) => window.scrollTo(0, target), y);
  // Wait for rAF + React commit + 0.4s dot transition to settle.
  await page.waitForTimeout(550);
}

test.describe("curriculum roadmap", () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/", { waitUntil: "domcontentloaded" });
    // Let images/fonts settle so block positions stop shifting.
    await page.waitForLoadState("networkidle").catch(() => undefined);
    await page.evaluate(() => {
      document.getElementById("program")?.scrollIntoView({ block: "start" });
    });
    await page.waitForTimeout(400);
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(200);
  });

  test("active year and rail fill stay in sync scrolling down then back up", async ({
    page,
  }) => {
    // Discover each year block's center scroll position.
    const targets = await page.evaluate(() => {
      const blocks = Array.from(
        document.querySelectorAll("[data-year-index]")
      ) as HTMLElement[];
      const vh = window.innerHeight;
      return blocks.map((el) => {
        const r = el.getBoundingClientRect();
        const absCenter = r.top + window.scrollY + r.height / 2;
        return Math.max(0, Math.round(absCenter - vh / 2));
      });
    });

    expect(targets.length).toBe(4);

    const downSnapshots: Snapshot[] = [];
    for (let i = 0; i < targets.length; i++) {
      await scrollToY(page, targets[i]);
      const snap = await readSnapshot(page);
      downSnapshots.push(snap);
      expect(
        snap.active,
        `down→year ${i}: active dot should match closest block (got ${snap.active}, expected ${snap.expectedActive})`
      ).toBe(snap.expectedActive);
      expect(
        snap.fillPct,
        `down→year ${i}: fill must be within [0,100]`
      ).toBeGreaterThanOrEqual(0);
      expect(snap.fillPct).toBeLessThanOrEqual(100);
    }

    // Fill must be monotonically non-decreasing while scrolling down.
    for (let i = 1; i < downSnapshots.length; i++) {
      expect(
        downSnapshots[i].fillPct,
        `fill should grow scrolling down (step ${i})`
      ).toBeGreaterThanOrEqual(downSnapshots[i - 1].fillPct - 0.5);
    }

    const upSnapshots: Snapshot[] = [];
    for (let i = targets.length - 1; i >= 0; i--) {
      await scrollToY(page, targets[i]);
      const snap = await readSnapshot(page);
      upSnapshots.push(snap);
      expect(
        snap.active,
        `up→year ${i}: active dot should match closest block on reverse scroll (got ${snap.active}, expected ${snap.expectedActive})`
      ).toBe(snap.expectedActive);
    }

    // Fill must be monotonically non-increasing scrolling up.
    for (let i = 1; i < upSnapshots.length; i++) {
      expect(
        upSnapshots[i].fillPct,
        `fill should shrink scrolling up (step ${i})`
      ).toBeLessThanOrEqual(upSnapshots[i - 1].fillPct + 0.5);
    }

    // Hitting the same scroll position twice (down vs up) must yield the same
    // active year and a fill value within a small tolerance — proves the
    // roadmap state is a pure function of scroll position, not history.
    for (let i = 0; i < targets.length; i++) {
      const down = downSnapshots[i];
      const up = upSnapshots[targets.length - 1 - i];
      expect(
        up.active,
        `year ${i}: active must match between down and up passes`
      ).toBe(down.active);
      expect(
        Math.abs(up.fillPct - down.fillPct),
        `year ${i}: fill must match between down (${down.fillPct}%) and up (${up.fillPct}%) passes`
      ).toBeLessThan(2);
    }

    // Back to the very top — first year should be active, fill should be 0.
    await scrollToY(page, 0);
    const top = await readSnapshot(page);
    expect(top.active).toBe(0);
    expect(top.fillPct).toBeLessThan(1);
  });
});