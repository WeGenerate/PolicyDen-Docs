# Documentation captures

Use only https://policyden-docs-demo.test. Demo setup, fictional logins, exact database guards, and reseeding instructions are in `/Users/mac/.t3/worktrees/PolicyDen-App/t3-49013fa2/DEMO_ENVIRONMENT.md`. The real application and its database must remain untouched.

Requires Node, Python, Playwright, and ffmpeg. The scripts use the locally installed Playwright package; set `PLAYWRIGHT_PATH` to its module path if the installation moves. Browser sessions stay in memory. Credentials in the demo are fictional local fixtures; never commit `.env`.

## Capture and review

```bash
node tools/capture/capture.cjs
node tools/capture/clips.cjs
python3 tools/capture/reconcile-videos.py
python3 tools/capture/finalize.py
mint validate
mint broken-links
```

`ONLY=id-one,id-two node tools/capture/capture.cjs` targets exact instruction IDs and preserves other manifest rows. `RESUME=1` retains completed rows. Loop instructions are handled by `clips.cjs`; `ONLY_CLIPS=pipeline/drag-deal` can repeat the saved drag demonstration.

Use `node tools/capture/stabilize.cjs` for a review pass over previously completed stills, with fresh pages and settled loading states. `REVIEW_IDS=id-one,id-two` selects exact IDs; `RESUME=1` keeps completed parent-review rows. This writes a separate `reports/parent-captures.json` for review rather than silently declaring failed captures successful. `node tools/capture/review-clips.cjs` repeats the current clip registry with readable pauses; `REVIEW_CLIP_IDS=id-one,id-two` narrows it. It preserves the separately verified saved pipeline drag.

The primary runner allows only this demo origin, GET/HEAD requests, login, and the source-verified local pipeline stage PATCH. Calling, purchases, outgoing messages, emails, and arbitrary writes remain blocked. The review recorder permits only GET/HEAD requests after loading its authenticated session. Do not run capture processes concurrently.

## Acceptance

Inspect actual screenshots and video frames. A successful click alone does not prove the intended screen loaded. Reject loading skeletons, fading dialogs, error pages, unrelated overviews, and inaccurate captions. A genuinely unavailable state stays blocked; omit its image rather than fabricate one. The current 118 referenced PNG files and 21 clips are reviewed in REPORT.md.

`finalize.py` places verified clips at existing instructional image positions, adds native controls and reduced-motion still alternatives, and audits references. It does not append demonstrations after the Next section or invent fallback screenshots. Index, quickstart, and audience entry pages are protected from this layout helper. Run it again after changing the clip registry.

Tooling and reports are excluded from the published site. `recordings/`, `unused/`, Python caches, and log files are ignored by git. The manifest includes non-embedded historical attempts; active media are inventoried in `reports/summary.json`. `missing-media.json` must be empty before a docs commit.
