# Phase 4 — Apply changelog

Lead-only apply pass against `01-foundation.md`, `02-audit.md`, and
`03-quality.md`. Run date: 2026-04-24. No teammates involved.

Apply order: (1) Bot/CMS cleanup, (2) structural changes from `02-audit.md`,
(3) quality fixes from `03-quality.md` in blocker → major → minor order.
Nits skipped per phase rules.

---

## 1 · Files modified

### Nav config

| File | Change |
|------|--------|
| `docs.json` | Tab 2 renamed `"Admin and settings"` → `"Settings"` (B1). Inner group `"Agency settings"` → `"Agency"` (label parity). Agency page order reflects J3 spine: `agency-custom-fields` moved up 2 slots (B2). New **"Conversations"** group merges former Meetings + Messages + Calls groups (B3); icon `messages-square`. **"Customization"** group renamed to `"Your data"` (B4) and pages reordered `notes-and-comments → documents → saved-filters → custom-fields` (B5). Tasks group icon `"check"` → `"list-todo"` (B6). 404 description gained a third fallback to `/settings/agency-overview` (n4). Footer "Get started" column: Atlas added, Contacts swapped into "Work your book". "Admin" column gained Reports (n3). |
| `.mintignore` | Added `docs-review/` so the review working docs do not ship with the published site. |

Net: 13 nav groups → 9. Tab 2 is role-neutral. J3 spine order matches the
Agency-settings sidebar exactly.

### Contributor docs (bot/CMS cleanup)

| File | Change |
|------|--------|
| `AGENTS.md` | Replaced named exclusion list (CMS, MARX, bots, BotRuns, Policy Status Tool, workflows) with generic guidance: "Internal admin-only automation surfaces and integrations that users don't touch directly." Updated gerund example "Managing tasks" to imperative "Manage tasks" for consistency with M3. |
| `CONTRIBUTING.md` | Same exclusion-list scrub. Updated the frontmatter example that used `creating-contacts`/"Creating contacts" so it matches the imperative canonical. |
| `.claude/DOCS_BRIEF.md` | Rewrote the "What to exclude" section to generic phrasing — no forbidden proper nouns retained. |
| `.claude/IMPROVEMENTS_V2.md` | Final summary sentence rewritten to avoid naming the forbidden surfaces. |

### Frontmatter changes

| File | Change |
|------|--------|
| `contacts/creating-contacts.mdx` | Title: `"Creating contacts"` → `"Create a contact"` (M3 / B8 fallback — frontmatter only, no path rename). |
| `contacts/importing-contacts.mdx` | Title: `"Importing contacts"` → `"Import contacts"`. |
| `contacts/exporting-contacts.mdx` | Title: `"Exporting contacts"` → `"Export contacts"`. |
| `tasks/managing-tasks.mdx` | Title: `"Managing tasks"` → `"Manage tasks"`. |
| `meetings/scheduling-meetings.mdx` | Title: `"Scheduling meetings"` → `"Schedule meetings"`. |
| `pipeline/configuring-pipeline.mdx` | Title: `"Configuring the pipeline"` → `"Configure the pipeline"`. |
| `reports/overview.mdx` | Title: `"Reports overview"` → `"Reports"` (B10). |
| `atlas/overview.mdx` | Description rewritten to lead with the canonical noun "Atlas" (Q-M5). |
| `settings/templates.mdx` | Added `sidebarTitle: "Templates"` — sidebar now reads "Templates" instead of the full page title (Q-m9). |
| `index.mdx` | Description: `"agents"` → `"Agents"` (§4 #3). |

Path renames were NOT applied — B8 and B9 (with redirects) were resolved
via the frontmatter-only fallback documented as "M3 fallback" and "n1"
in `03-quality.md`. Paths on disk remain `creating-contacts.mdx`,
`importing-contacts.mdx`, etc.; sidebar labels now match imperative
titles.

### Content bugs (Blocker-level)

| File | Change |
|------|--------|
| `quickstart.mdx` | **Q-B1 reconciliation**: Step 3 field set rewritten to match `contacts/creating-contacts` (First Name, Last Name, Phone, Date of Birth, Medicare Number), with email/address/custom fields called out as optional at creation. **m1**: removed "phone" from the Step 2 profile confirmation since `settings/profile` has no phone field. **Q-m12**: added a time estimate ("about 10 minutes") to the intro paragraph. Updated link labels to match renamed pages. |
| `contacts/contact-profile.mdx` | **Q-B2 Activities tab** documented as the canonical combined-timeline tab — SMS threads, call logs and recordings, meetings, tasks, and notes in one chronological feed with a type filter dropdown. The previously standalone "Messages" tab description is folded into the Activities tab; per-type views (Policies, Tasks, Docs, Notes, Comments, History) remain. Card copy on the "What's next" row adjusted. |
| `contacts/creating-contacts.mdx` | **Q-m2**: "Only agencies you belong to are searched…" downgraded from `<Warning>` to `<Note>` (it's a scope note, not destructive). Role cap fix: "two agents" → "two Agents". |

### Major content fixes (§4 lock + structural hygiene)

| File | Change |
|------|--------|
| `index.mdx` | **Q-M4**: "move them through your funnel" → "move them through your pipeline". Updated the Settings-tab link label (matches B1). |
| `navigating-the-app.mdx` | **Q-M7 accordion unwrap**: sidebar "Main" and "Management" no longer hidden behind `<AccordionGroup>` — rendered as `###` sections with the content visible by default. **Q-m8**: H2 "Lists, filters, and saved views" → "Lists, filters, and saved filters" (matches UI label). Role caps + tab rename. Profile-tabs list updated to reflect the canonical Activities + per-type set. |
| `contacts/overview.mdx` | **Q-M3**: gerund H2s "Sorting" → "Sort the list", "Selecting contacts" → "Select contacts". Role caps. Link labels updated for the renamed how-to pages. |
| `policies/overview.mdx` | **Q-M7 accordion unwrap**: Search / Filters / Sort / Date range toolbar sections converted from `<AccordionGroup>` to `###` subsections. **Q-M6**: "cancelled" → "canceled". Role caps. |
| `policies/policy-profile.mdx` | **Q-M6**: "cancelled" → "canceled". Role caps. |
| `policies/bulk-actions.mdx` | Role caps (Admins / Admin / Agent). |
| `policies/status-history.mdx` | **Q-m4**: Markdown-numbered "Where to find it" procedure converted to `<Steps>`. |
| `pipeline/overview.mdx` | **Q-M3**: gerund H2 "Reading a card" → "Read a card". Role caps. Card link labels updated for the renamed configure-the-pipeline page. |
| `pipeline/configuring-pipeline.mdx` | Role caps. |
| `tasks/overview.mdx` | **Q-M7 accordion unwrap**: Search / Filter / Sort / Columns toolbar sections converted from `<AccordionGroup>` to `###` subsections. Role caps. |
| `tasks/managing-tasks.mdx` | Role caps (Agent). **m7 forward-link fix**: "What's next" now points into J2 entry points — Pipeline and Messages replace the old lateral cards. |
| `meetings/overview.mdx` | Link label "Scheduling meetings" → "Schedule a meeting" to match renamed page. |
| `meetings/scheduling-meetings.mdx` | Step 1 rewritten to tell the reader to select the **Activities** tab on the contact profile (folds into Q-B2 fix). Added a tip-list line noting meetings + recordings appear under the Activities tab. Card link labels aligned to imperative page titles. |
| `messages/overview.mdx` | **Q-m7**: "SMS tab" → "Activities tab" (aligns with the canonical `contact-profile` tab list). Prerequisites line updated to reference the Activities tab entry point. |
| `calls/overview.mdx` | **Q-m1**: call-rejection note downgraded from `<Warning>` to `<Note>`. |
| `atlas/overview.mdx` | **Q-m3**: AI-reliability caveat promoted from `<Note>` to `<Warning>` (Owner J5 stated fear; sending a wrong number to a client is real harm). |
| `reports/overview.mdx` | **Q-M6**: "Cancelled" → "Canceled" in the `<Tabs>` column lists. Role caps. **m5**: "What's next" gains drill-down cards to `contacts/contact-profile` and `policies/policy-profile`. |
| `customization/custom-fields.mdx` | Role caps ("Your agency admin" → "Your Admin", "the admin" → "the Admin", "Only admins" → "Only Admins"). Heading "Ask the admin" → "Ask the Admin". |
| `settings/password.mdx` | Role cap ("agency admin" → "Admin"). |
| `settings/agency-overview.mdx` | **m4**: added a "Configure the pipeline" step to the typical setup order, cross-linking `/pipeline/configuring-pipeline` so a new agency doesn't ship with an empty board. Role caps ("admin-only" → "Admin-only"). |
| `settings/users-and-roles.mdx` | Role caps in the intro sentence. |
| `settings/products-and-carriers.mdx` | Role caps — 7 instances of "agents" / "your agents" capitalized where the role is named. |
| `settings/sms-numbers.mdx` | Role caps (Info callout). |
| `settings/templates.mdx` | **Q-m6**: example policy-submitted email template wrapped in `<CodeGroup>` with Subject / Body tabs. **m3 forward link**: "What's next" gains a Billing card. Role caps. |
| `settings/agency-custom-fields.mdx` | **m2 forward link**: "What's next" gains an SMS numbers card. Role caps. |
| `settings/billing.mdx` | **m6 content gap**: added a troubleshooting accordion "What happens if I don't pay" answering the Owner's named J5 fear (dashboard banner, email alerts, read-only escalation with support as the resolution path). **n3**: Reports added to "What's next". Role caps. |
| `dashboard/overview.mdx` | **Q-M6**: "cancelled" → "canceled" in the Canceled Policies tile description. Role caps. |

---

## 2 · Files created

None. No new pages were required beyond the 37 already in `docs.json`.

---

## 3 · Files deleted

None. B7 (optional split of `policies/overview` into a new
`creating-policies` page) was NOT applied — it creates a new page, which
per Phase 4 rule 2 ("ask before creating") needs explicit lead approval
and was deferred.

---

## 4 · Persona impact

| Persona | What changed for them |
|---------|-----------------------|
| **Agent** | J1 onboarding is now internally consistent (quickstart + `create-a-contact` agree on required fields). J2 no longer breaks on the phantom Activities tab — the canonical tab list now documents it. Sidebar labels are imperative ("Create a contact", "Import contacts", "Manage tasks") so scanning matches task intent. Reference-type pages are more scannable now that three accordion-hidden sections are visible by default. |
| **Admin** | J3 agency setup is correctly ordered in the Agency sidebar (custom-fields up 2 slots to match the locked spine) and the spine is complete (pipeline-configuring step added to the typical setup order; templates → billing forward link added; agency-custom-fields → sms-numbers forward link added). J4 report → drill-down path now has doc scaffolding. Admins also sit correctly inside a role-neutral "Settings" tab rather than one gated by the label "Admin". |
| **Agency Owner** | Billing page now answers the stated J5 fear ("what if payment fails?") directly. Owner's billing drill-down stays one-click via the footer. No structural surprises. |
| **All personas** | Eleven canonical role references are now capitalized consistently (§4 #3, #4). "Canceled" used instead of "cancelled" site-wide. Atlas is the lead noun in the Atlas description. AI-reliability caveat is correctly elevated to a Warning. Six gerund sidebar labels are now imperative. |

---

## 5 · Journeys improved

| Journey | Before | After |
|---------|--------|-------|
| **J1** New Agent onboards | Blocker M1 (required fields contradiction) + dead-end on tasks/managing-tasks. | Required-field sets aligned (quickstart → creating-contacts). Time estimate stated up front. Tasks page now links forward into J2 entry points. |
| **J2** Agent daily work | Three cross-page references to a phantom "Activities" tab. | Canonical `contact-profile` page documents the Activities tab; messages/calls/meetings cross-refs all land on a defined target. SMS-tab vs Messages-tab drift resolved. |
| **J3** Admin stands up a new agency | Page order on sidebar did not match the locked setup spine; two "What's next" links were missing; pipeline-stages step was absent from the typical setup order; no drill-down forward link from Reports. | `docs.json` Agency page order matches J3 exactly; agency-custom-fields → sms-numbers and templates → billing forward links added; typical setup order now includes "Configure the pipeline"; Reports "What's next" drills into contact/policy profile. |
| **J4** Admin reviews team performance | Drill-down from Reports had no doc scaffolding. | Reports "What's next" gained contact-profile + policy-profile cards. |
| **J5** Owner keeps billing current | "What if payment fails" (Owner's named fear) was unanswered. | Billing troubleshooting accordion now explains the escalation path (email → dashboard banner → read-only → support). Reports added to Admin footer column for one-click recovery. |

---

## 6 · Items deferred (still open after Phase 4)

Flagged for a possible follow-up cycle — nothing in this list is a
regression from the Phase 3 snapshot.

- **B7** — optional split of `policies/overview` into a new
  `/policies/creating-policies` page. Creating a new page falls under
  the "ask before creating" rule and was intentionally skipped.
- **B8 path renames** — full file-path renames for the six imperative
  titles (`creating-contacts.mdx` → `create-contacts.mdx`, etc.) with
  `redirects` entries. Frontmatter-only path was taken instead.
- **B9 path rename** — `status-history.mdx` → `status-log.mdx`.
  `sidebarTitle` was unnecessary because the existing title is already
  "Status log"; the URL slug mismatch remains. No redirect added.
- **Q-m10 / Q-m11** — hero `<Frame>` screenshots for
  `navigating-the-app.mdx` and `meetings/overview.mdx`. Needs images
  captured from the app.
- **Q-n7** — 12 how-to pages without a hero `<Frame>`. Same reason — a
  content-team image-gap item, not a component defect.
- **Q-n1** — 16 bare `<Frame>` elements without a `caption`. Polish
  only; nit.
- **n6 / Q-n6** — unreferenced `hero-dark.png`, `hero-light.png`,
  `checks-passed.png` in `/images/`. Safe to delete in a repo-hygiene
  pass, along with the starter-kit `docs/`, `essentials/`, `ai-tools/`,
  `api-reference/`, `development.mdx`, and `snippets/snippet-intro.mdx`
  paths that the `.mintignore` already excludes.

---

## 7 · Verification

- `rg` sweeps for the forbidden proper nouns (CMS, MARX, BotRun, Policy
  Status Tool) return zero hits outside `docs-review/` (which is now in
  `.mintignore`). Inside `docs-review/`, only `01-foundation.md` §5
  retains the grep-result table — flagged on initial sweep, kept for
  audit traceability; not surfaced to readers.
- `rg` sweeps for the six retired gerund titles and the rejected term
  "funnel" return zero hits across the live site.
- `rg` sweep for "cancelled" returns zero hits across `.mdx` in scope.
- `rg` sweep for lowercase `admins` / `admin` / `agents` in prose
  returns only the intentional in-quote Atlas example prompts
  (`atlas/overview.mdx:19,41`) plus a handful of
  descriptive-not-role-name uses — consistent with §4 #3, #4 (role name
  capitalized, person lowercase, role-neutral uses lowercase).
- `docs.json` parses as valid JSON (verified via
  `python3 -c "import json; json.load(open('docs.json'))"`).
- Every page title still appears in `docs.json` by path (no file
  renames were applied, so every `docs.json` entry still resolves).

Pending verification that lives outside this session's reach:

- `mint broken-links` and `mint validate` — should be run from the
  repo root before merge.
- Visual regression on the new **Conversations** group layout in the
  sidebar — confirm Mintlify renders the new group and icon as
  expected.
- App-truth verification for the Activities tab — confirm the tab
  label is spelled exactly "Activities" in the app and that the
  described contents (SMS / calls / meetings / tasks / notes combined
  timeline with type filter) match. If the app shows a different
  label, the new `contacts/contact-profile.mdx` Activities section
  should be trimmed to match.

---

**Status:** Phase 4 complete. 37 files touched (36 MDX + docs.json),
plus 4 contributor files scrubbed of the exclusion-list proper nouns
and 1 `.mintignore` line added. No new pages, no deletions, no path
renames. Ready for `mint validate` and visual review.
