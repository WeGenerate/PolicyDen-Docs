# Agency tutorials handoff

Both JSON files are completed, with absolute raw recording and poster paths and exact English narration. Frame timestamps are seconds in their respective raw WebM. Initial page load is excluded; each marked scene begins on a settled view and includes an action and end pause. All dimensions are 1440 × 1000. Source checkout: `/Users/mac/.t3/worktrees/PolicyDen-App/t3-49013fa2`, HEAD `b08de22207bee505fac0795754936fc085f20a0b`, verified to include `4d27ed3e0`.

- `prepare-your-agency.json`: 78.40s raw, 68.01s marked, 171 narration words.
- `invite-and-prepare-a-new-agent.json`: 85.12s raw, 77.01s marked, approximately 198 narration words.

## Verification

`output/*-ffprobe.json` contains stream/duration metadata. `output/*-proof.jpg` contains extracted start/end frames for every marked scene; full-resolution `*-frame.png` files are also present. Frames were visually reviewed: no blank/error/login/skeleton end views. `output/fixture-verification.json` verifies local PostgreSQL database `policyden_docs_demo` and one matching pending Taylor Brooks account. `output/invitation-proof.json` is the successful response; `*-invite-end-frame.png` shows the pending row.

Browser errors and blocked requests are retained in each JSON. These are expected blocks of Herd tooling, external Stripe script on Wallet, and the POST browser-log sink; no page JavaScript exceptions or data-loading failure screens occurred in final captures. Wallet remained an overview only. No payment operations or assignments were performed.

The first invitation attempt returned 401 and created no user (verified). The isolated retry succeeded. No duplicate invitation was created. All final JSON and recordings refer to successful runs.

## Email caveat

The provider configures mail `log` and queue `docs_null`. `UserInvited` implements `ShouldQueue`, so its queued notification is discarded by the null queue before the log transport runs. No actual invitation mail-log entry was found. Narration therefore says only that no real email is delivered, rather than claiming a log entry or real delivery. The user was successfully saved as Pending.

## Reproduction

Run `node record.cjs` from any directory. Use `ONLY=prepare-your-agency` or `ONLY=invite-and-prepare-a-new-agent` to select a tutorial. The invitation recorder checks the existing email and refuses a duplicate; retain the successful original recording. It never deletes or resets a fixture. Do not rerun invitation creation against the existing account. `node` needs the installed Playwright path specified in the script. Run `python3 verify.py` for ffprobe checks and extracted proofs (requires ffmpeg, ffprobe, Pillow).

`record.cjs` only permits same-origin GET/HEAD and the exact verified fictional invitation POST during its save step. Authentication uses the existing capture helper before recording. No app source or production state was changed. Output is ignored by this directory's `.gitignore`.
