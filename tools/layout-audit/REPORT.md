# Documentation layout review

Reviewed on 2026-10-30 for `docs/app-guides-refresh`.

## Scope

All 118 navigation pages were inspected with a temporary design grid at 390px, 768px, and 1440px. The browser audit measures visible article elements, checks the initial layout, opens accordions, and visits visible tabs. Each page has a full-page grid screenshot in the ignored local audit output.

The grid uses an 8px horizontal baseline and 4, 8, or 12 columns. It is injected by the audit tool only. The customer site receives the shared spacing rules in `layout.css`, with no visible grid or additional customer JavaScript.

The separate source review covers all 118 pages and four imported snippets. See `content-review.md` for the page inventory and component findings.

## Changes

- Removed the first component's extra top margin. The baseline measurements found a 16px opening offset on 81 pages at all three widths; the page container already supplies the header gap.
- Set top-level section heading spacing to 40px above and 16px below, with 32px above on phones. Subheadings use 32px above and 12px below. Heading line heights use whole-pixel values.
- Moved card row spacing into the native grid: a 16px gutter with no extra margin on individual cards. Cards retain their native padding, equal row heights, and column widths.
- Kept short inline code labels together and constrained long labels to their available width. The baseline contained seven code-background overhangs on six API pages, measuring 2.64–7.48px. Fenced code remains independently scrollable.
- Kept the rejected narrated onboarding tutorial and transcript out of the onboarding page. Its written instructions and screenshots remain available.

Native table scroll wrappers deliberately extend into the page gutter, and tab panels and heading permalink controls have their own bounded outsets. These were inspected and classified separately from accidental overflow. The API playground between the page header and article also has its own height; it is not treated as an article spacing defect.

## Visual review

Representative desktop, tablet, and phone screenshots were checked for typography, content edges, card rows, screenshots, callouts, tables, and section transitions. Reviewed examples include account setup, onboarding an agent, Contacts, Atlas, the role reference table, and API documentation. This visual review complements the all-page geometry checks; it is not a claim of manual pixel-by-pixel review of every state.

## Verification

- 354 page/viewport layouts: all 118 pages at 390px, 768px, and 1440px; 130,068 visible element/state measurements.
- Nine focused page/viewport rechecks passed after updating the detector to recognize native tab panels by their component data attribute. Their 16px left padding aligns the text with the article; no customer layout change was needed. Original and rechecked measurements remain in local output.
- 32 additional checks passed across Contacts, onboarding, the role table, and API Contacts at 375px, 639px, 640px, 1023px, 1024px, 1279px, 1280px, and 1920px.
- No remaining page load failures, page overflow, unintended content outsets, leading component offsets, block overlaps, unequal card rows, or broken visible images in the completed checks.
- `mint validate`: build and validation passed.
- `mint broken-links`: no broken links found.
- `git diff --check`: passed.

The source review found no malformed native layout components, inconsistent table column counts, or skipped heading levels. Partially filled card rows retain their intended native columns. No content was added to fill empty grid positions.
