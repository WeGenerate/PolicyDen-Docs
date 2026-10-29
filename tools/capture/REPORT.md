# Documentation capture review

The docs now reference **118 PNG stills/posters and 21 silent looping videos**, all from the isolated fictional demo at https://policyden-docs-demo.test. The clips last 5.42–6.79 seconds. Their native controls support pausing and replay; reduced-motion users see the still image instead.

The home has no role chooser. The three audience guides remain direct entry points. RBAC is deferred. Nothing has been pushed or published.

## What was verified

- Screens show fictional Brightwater Health Partners, Alex Morgan Insurance, and generated clients rather than production data.
- Loading skeletons and partially opened dialogs were recaptured after network activity and transitions settled. Dialogs are cropped for readable text.
- Clips sit beside the instructions they demonstrate, before the Next section. The pipeline drag checks a successful local stage-change PATCH and the destination lane.
- Existing clips have readable pauses. The two follow-up demonstrations were recorded again so they finish on the Add Task form.
- Legacy root-level screenshots are excluded from publishing in `.mintignore`. Unused generated assets and raw recordings are under ignored capture-tool directories.
- The setup-progress image was visually verified at four of five steps complete. A later queue-joining capture completed that fixture, so the original valid progress image was retained.

## Capture inventory

Of 133 original capture instructions, 122 produced their intended views and 11 are explicitly blocked. This includes captures later omitted from the page when they added no useful context. `reports/manifest.json` records each result, whether it is embedded, and any archived asset location. `reports/summary.json`, `video-metadata.json`, and `missing-media.json` describe the current files.

Blocked images are omitted; unrelated dashboard or Wallet views are not substituted:

- Eight live-phone states need a configured Twilio or Telnyx provider. The demo deliberately has no provider credentials. The written call procedures remain.
- Two Billing views cannot load valid settings. A fictional non-marketplace agency reaches Billing, but GET `/agency-settings/billing/settings` returns 403 because the route is under `routes/super-admin.php`. No authorization changes were made. The documented marketplace Wallet alternative remains.
- The final policy phase requires a local contact save. Its optional image is omitted. Product, Contact, policy profile, Status Log, and plan-editing views are captured.

No live call, payment, sent message, email, or external AI operation was used. No production source or database was changed. Demo-only source and setup live at `/Users/mac/.t3/worktrees/PolicyDen-App/t3-49013fa2` and must not be merged into production.

## Validation

Parent review confirmed zero missing media references. Final `mint validate`, `mint broken-links`, and `git diff --check` results are recorded in `reports/validation.json`. There is no claim that blocked views were captured.
