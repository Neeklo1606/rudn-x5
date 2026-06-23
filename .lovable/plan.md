## Goal

Reorganize `src/routes/index.tsx` so sections render in the agreed final order. No content rewrites, no backend changes, no redesigns — only section order, with two small structural splits required to make the target order possible.

## Current vs target mapping

| # | Target section | Current source |
|---|---|---|
| 1 | Hero | `Hero` ✅ |
| 2 | Тебе к нам | first half of `ForWhomAndInside` ⚠️ split needed |
| 3 | Что внутри программы | second half of `ForWhomAndInside` ⚠️ split needed |
| 4 | Программа обучения (roadmap) | `Curriculum` ✅ |
| 5 | Треки 2 курса | `Tracks` ✅ |
| 6 | Как поступить | `Admission` ✅ |
| 7 | Преподаватели и эксперты | `Experts` ✅ |
| 8 | X5 content blocks | `PartnerBlock` + `X5Touch` ✅ (rendered as a pair) |
| 9 | Партнёры | ❌ no dedicated section yet — placeholder only |
| 10 | Новости программы | `News` ✅ |
| 11 | Application form | `ApplyForm` ✅ |
| 12 | Contacts + legal links | already in `Footer` via `SiteShell` ✅ |

`FinalCTA` is not in the target list — keep it out of the page for now (do not delete the file) so we can decide later whether it merges into the form section or is dropped.

## Step-by-step plan

1. **Split `ForWhomAndInside` into two components without changing markup or copy.**
   - Create `src/components/site/ForWhom.tsx` containing the existing «Тебе к нам» block (its own `<section>` wrapper, same background, same styles, same copy, same responsive CSS for `.for-whom-grid` and `.h2`).
   - Create `src/components/site/InsideProgram.tsx` containing the existing «Что внутри программы» block (its own `<section>` wrapper, same background, same styles, same copy, same responsive CSS for `.feature-grid` and `.h2`, same hover styles for `.feature-card` / `.hover-bar`).
   - Preserve current vertical rhythm: the inner `marginTop: 96` that today separates the two halves moves onto `InsideProgram`'s section padding so spacing between sections 2 and 3 stays visually identical.
   - Delete `ForWhomAndInside.tsx` once both replacements render correctly.

2. **Add a `Partners` placeholder section** at `src/components/site/Partners.tsx`.
   - Same `section` + `container` shell and typography tokens used by neighboring sections, with the eyebrow «ПАРТНЁРЫ», an `h2` «Партнёры», and an empty logo grid placeholder (no real logos yet).
   - Purpose: reserve slot #9 in the layout. Real partner content arrives in a follow-up.

3. **Rewrite `src/routes/index.tsx` render order only** (imports + JSX), no other edits:
   ```tsx
   <Hero />
   <ForWhom />
   <InsideProgram />
   <Curriculum />
   <Tracks />
   <Admission />
   <Experts />
   <PartnerBlock />
   <X5Touch />
   <Partners />
   <News />
   <ApplyForm />
   ```
   `Footer` (contacts + legal) continues to render from `SiteShell`, satisfying slot #12. `FinalCTA` import is removed from this route.

4. **Verification pass (no behavior changes expected):**
   - Confirm dev server compiles, route tree regenerates, no unused-import warnings.
   - Scroll the page top-to-bottom and check section order matches 1–12.
   - Visually compare sections 2 and 3 against the previous combined block to confirm spacing, backgrounds, and grid breakpoints are unchanged.
   - Re-run the existing Curriculum Playwright regression to confirm roadmap still passes after its new neighbors.

## Out of scope (explicitly)

- No copy edits, no new visuals, no redesign of any section.
- No backend, form, or routing changes.
- No deletion of `FinalCTA.tsx` — only unmounted from the index route.
- Real partner logos, news content, and any contact-page restructuring are separate follow-ups.
