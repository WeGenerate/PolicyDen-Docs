# Documentation layout audit

This read-only browser audit visits every local page in `docs.json`. It injects a temporary design grid into each screenshot: an 8px horizontal baseline and 4, 8, or 12 columns for phone, tablet, and desktop widths. The grid is never loaded by the published site. Shared customer-facing spacing lives in `/layout.css`.

## Run

Start the documentation preview from the repository root:

```sh
mint dev --port 3333 --no-open
```

With Playwright and its Chromium browser available, run the audit in another terminal:

```sh
PHASE=after node tools/layout-audit/audit.cjs
```

If Playwright is installed outside the repository, set `PLAYWRIGHT_PATH` to its module directory. No site dependency or browser package is added by this tool.

Optional filters:

```sh
PHASE=sample WIDTHS=390,768,1440 ONLY=index,contacts/overview,api/contacts node tools/layout-audit/audit.cjs
```

`output/<phase>/` contains full-page grid screenshots, element measurements, and a JSON summary. Output is ignored by Git. A nonzero exit code means that a page failed to load or a geometry check needs review.

## Checks and scope

- Header and article alignment, leading component offsets, page overflow, and content extending beyond the reading column.
- Adjacent top-level block overlap, broken visible images, and equal heights for cards sharing a row.
- The initial page, open accordions, and each visible tab. Pages are scrolled before measurement to load off-screen media.
- Native permalink gutters, padded table scroll areas, and tab panel outsets are treated as intentional only within their measured bounds. Whole-page overflow still fails.

Geometry checks cover visible article elements, including imported snippets. They complement visual review; they do not establish aesthetic quality, image readability, accessibility, or the behavior of external destinations. The audit pauses videos rather than testing playback.

See `REPORT.md` for the completed review and `content-review.md` for the per-page source inventory.
