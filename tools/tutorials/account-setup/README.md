# Account setup recording

Owned files for the invited agency Agent tutorial. No app source changes.

Run `php fixture.php` to create or reuse `casey.tutorial@example.com` in the isolated demo. The helper checks Laravel environment, configured driver/database, and the actual connected database before writing. It uses the User model and the existing fictional Jordan Rivera agency. It creates no mail and refuses to reset a completed account. The local invitation URL is written with mode 0600 under ignored `output/`.

Run `node record.cjs` to record the real form. Browser writes are restricted to the source-verified `/join/progress`, `/join/finalize`, and `/login` POST routes; reads are same-origin only. Source-reviewed controllers: RegisteredUserController, JoinUserRequest, UserService, Onboarding.vue and its step components. No calls, messages, payments, or provider changes.

`output/manifest.json` contains the exact narration and raw video scene timings. `output/diagnostics.json` logs browser errors and blocked requests with token URLs removed. The raw capture has no audio; final narration, captions, editing and encoding belong to the parent. The initial load before the first scene must be excluded. State is a postal abbreviation. The completion screen redirects after six seconds, so the recording explicitly clicks Go To Dashboard before then.

Re-run verification: `php fixture.php verify`. A completed invitation cannot be replayed. Reuse the completed raw recording or create another fictional account in the same guarded demo for a fresh recording; preserve the completed fixture.

Verified final take: 76.56 seconds, 1440×1000, seven scenes, 167 narration words. `verify.py` validates durations and extracts raw frame proofs; `output/frame-review.jpg` assembles the start/end review and `proof-completion.png` shows the intermediate success screen. Database confirmation: active Agent with the entered address and NPN; browser ended at `/dashboard`. Source HEAD b08de22207bee505fac0795754936fc085f20a0b includes main 4d27ed3e0.

Known demo limitation: address autocomplete returns 500 when its external provider is blocked. Manual address entry succeeded. The narration makes no autocomplete claim. Browser console also logs blocked development diagnostics (`/herd-studio/loader.js`, `/_boost/browser-logs`). No uncaught application page errors were reported. No completion blocker remains.
