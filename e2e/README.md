# E2E / responsive regression tests

Playwright suite that guards against responsive regressions across the key
breakpoints used by real visitors.

## Run

Dev server must be running on `http://localhost:8080` (override with
`PW_BASE_URL`). Then:

```bash
# fast: structural + smoke checks only (default in CI)
bun run test:e2e

# with pixel-level visual regression (flaky on framer-motion pages,
# opt-in only — set PW_VISUAL=1)
bun run test:e2e:visual

# regenerate visual baselines after intentional UI changes
bun run test:e2e:update
```

## What it covers

For each route in `/`, `/program`, `/admission`, `/news` × breakpoints
320, 375, 768, 1024, 1440:

- The page returns 2xx.
- No user-visible horizontal scroll (`window.scrollX` stays 0 after
  attempting to scroll right). Body has `overflow-x: hidden`, so this is
  the real regression signal — not raw `scrollWidth`.
- No console errors / page errors (Vite HMR + React DevTools notices are
  filtered out).
- Optional: pixel-level screenshot diff against committed baselines,
  with `<img>` tags masked so remote stock photos don't dominate the
  diff. Enabled only when `PW_VISUAL=1`.

A smoke test also navigates `home → program → news → admission → home`
and asserts no horizontal scroll at each stop.

## Adding a new route

Append it to the `ROUTES` array in `responsive.spec.ts`. New breakpoints
go in `BREAKPOINTS`. Re-run `bun run test:e2e:update` if visual baselines
are enabled in your environment.