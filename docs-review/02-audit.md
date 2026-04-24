# Phase 2 — Audit

Consolidated findings from three audit-only teammates run against
`01-foundation.md`: **diataxis-reviewer** (content type per page),
**gaps-reviewer** (journey-by-journey coverage), **ia-reviewer**
(navigation and site structure). All three used the `/mintlify` skill and
the Mintlify MCP, read-only. Sweep date: 2026-04-24.

---

## Executive summary

**Docs are in strong shape.** Voice is tight, Diátaxis classifications hold
up (31 of 37 pages land cleanly on a single type or a principled mix), and
no page is recommended for delete or merge. The site ships the three
personas the right core content for four of the five locked journeys.

**Two major content bugs are shipping today**, both inside the hero J1 /
daily-work J2 loops. (1) `quickstart.mdx` and `contacts/creating-contacts.mdx`
give the new Agent contradictory answers about what's required to save a
first contact — the reader cannot complete the step as written from
quickstart alone. (2) Three pages (`messages/overview`, `calls/overview`,
`meetings/overview`) tell the reader to open an **Activities** tab on the
contact profile, but `contacts/contact-profile.mdx` never names that tab,
leaving three cross-page dead-ends.

**The nav mirrors the engineering feature list more than the three
personas' journeys.** 11 User-guide groups (vs. Mintlify's 5–7 target),
three of them singletons; six sidebar labels still in gerund form; the
Agency settings group is ordered against its own locked J3 setup spine.
Every proposed fix is small. The single biggest win — and the one the
IA reviewer nominates if we can only do one — is merging the three
singleton channel groups (Meetings + Messages + Calls) into one
**Conversations** group. That takes the User guide from 11 → 9 groups
and matches how Agents think ("reach this client") rather than how the
engineering team built it ("which channel").

---

## Findings by severity

Scope key: `B` = Blocker (touches `docs.json` / page files / nav — lead
approval required), `M` = Major (journey-breaking or contradiction),
`m` = Minor (gap, drift, missed cross-link), `n` = Nit (polish only).

### Blocker — needs lead approval before Phase 4 applies

Every B-item changes `docs.json`, renames or adds a page, or adds a
redirect. The lead decides which to approve at the Phase 3 → Phase 4 gate.

| # | ask | source | reference rule |
|---|-----|--------|----------------|
| B1 | Rename tab-2 label `"Admin and settings"` → `"Settings"` (1 word, role-neutral). "Your account" group serves all users and shouldn't sit behind an "Admin" gate. | ia #1 | navigation guide · "labels ≤ 4 words, match user vocabulary" |
| B2 | Reorder Agency settings group pages to match J3 spine — move `settings/agency-custom-fields` from slot 6 to slot 4. New order: `agency-overview → users-and-roles → products-and-carriers → agency-custom-fields → sms-numbers → templates → billing`. | ia #2 | navigation guide · "organize by user journey, not product features"; Phase 1 §3 J3 |
| B3 | Consolidate **Meetings + Messages + Calls** into one new group **"Conversations"** (4 pages). Removes three singletons; gets User guide from 11 → 9 groups. | ia #3 | navigation guide · "5–7 top-level sections max, prefer depth over breadth" |
| B4 | Rename `"Customization"` group label to something user-facing (e.g., `"Your data"`). "Customization" is engineer-speak; users search for "custom fields", "filters", "documents". | ia #5 | navigation guide · "avoid internal terminology users won't recognize" |
| B5 | Reorder `"Customization"` / `"Your data"` group pages by daily frequency and dependency: `notes-and-comments → documents → saved-filters → custom-fields`. | ia #9 | navigation guide · "organize by user journey" |
| B6 | Change Tasks group `icon` from `"check"` (single checkmark, reads as "done state") to `"list-todo"` or `"check-square"` (reads as "tasks list"). | ia #18 | navigation guide · label/icon scannability |
| B7 | **Optional** — split the embedded **Create a policy** `<Steps>` out of `policies/overview.mdx` into a new `/policies/creating-policies` page, restoring symmetry with the Contacts section (where creation is on `creating-contacts`, not the overview). Adds a page → needs `docs.json` update. Default: keep. | diataxis · policies/overview | content-types · "review mixed-purpose pages" |
| B8 | **Optional** — file-path renames to match Phase 1 §4's imperative-title lock (e.g., `creating-contacts.mdx` → `create-contacts.mdx`, six candidates total). Requires `redirects` entries. If not approved, do the title-in-frontmatter rewrite only (non-BLOCKER, see M3). | ia #4 | navigation guide · "use verbs for task-oriented sections" |
| B9 | **Optional** — rename `policies/status-history.mdx` → `policies/status-log.mdx` to match page title "Status log". Needs redirect. Lower-cost alternative: add `sidebarTitle: "Status log"` in frontmatter only (non-BLOCKER, see n1). | ia #8 | Mintlify conventions — URL should reflect canonical title |
| B10 | **Optional** — title-only frontmatter rewrite on `reports/overview.mdx`: "Reports overview" → "Reports". Structurally the page is a how-to task hub, not an overview; title currently mis-sets reader expectation. No `docs.json` edit needed (slug, path, nav position all stay). Flagged as B because the audit treats any title rename as BLOCKER. | diataxis · reports/overview | content-types · title/structure alignment |
| B11 | If any B8 / B9 renames are approved, add a `redirects: [{source, destination}]` array to `docs.json` in the same change set. | ia #16 | navigation guide · "broken bookmarks are real" |

### Major — journey-breaking content today

| # | issue | source | severity driver |
|---|-------|--------|-----------------|
| M1 | **`quickstart.mdx` vs `contacts/creating-contacts.mdx` contradict each other on required fields at first-contact creation.** Quickstart says "first name, last name, phone, and email are enough" and DOB / Medicare number "can come later." `contacts/creating-contacts` says every field including DOB + Medicare number is required and does not list email as required. Reader hits a wall in J1 step 5. Fix on one page (likely `creating-contacts`, since that's the canonical form-reference page) and align the other. | gaps J1 step 5 | breaks J1 |
| M2 | **Phantom "Activities" tab.** `messages/overview`, `calls/overview`, and `meetings/overview` (plus the "Call history" section of calls) instruct the reader to "open the Activities tab on the contact profile" to see the combined timeline. `contacts/contact-profile.mdx` documents the profile tabs as Policies, Tasks, Docs, Notes, Comments, History, Messages — no Activities tab is named. Three cross-page dead-ends inside J2. Fix by documenting the Activities tab on `contact-profile` (it exists in the app — verified via the three outbound references). | gaps J2 steps 4, 7 | breaks J2 in three places |
| M3 | **Six sidebar labels are in gerund form**, violating Phase 1 §4's imperative lock: "Creating contacts", "Importing contacts", "Exporting contacts", "Managing tasks", "Scheduling meetings", "Configuring the pipeline". Fix by frontmatter `title` rewrites (no path change, so non-BLOCKER). Path renames for full consistency are in B8. | ia #4 | §4 lock + nav guide |

### Minor — gaps, drift, missed cross-links

| # | issue | source |
|---|-------|--------|
| m1 | `quickstart.mdx` Step 2 tells the reader to confirm "name, work email, and phone" on `settings/profile`. `settings/profile` lists only First Name, Last Name, Email — no phone field. Either the profile page is missing a field it should document, or quickstart is describing a field that doesn't exist. Verify against the app and fix whichever is wrong. | gaps J1 step 3 |
| m2 | `settings/agency-custom-fields.mdx` "What's next" has no forward link to `settings/sms-numbers` — J3 spine interrupted between step 4 and step 5. | gaps J3 |
| m3 | `settings/templates.mdx` "What's next" has no forward link to `settings/billing` — J3 spine interrupted between step 6 and step 7. | gaps J3 |
| m4 | `settings/agency-overview.mdx` "typical setup order" omits `pipeline/configuring-pipeline` entirely. `pipeline/overview` says admins must configure stages before contacts can appear on the board; J3 as locked lands a new agency on an empty pipeline. Add a cross-link or a step. | gaps J3 |
| m5 | `reports/overview.mdx` "What's next" has no forward pointer to `contacts/contact-profile` or `policies/policy-profile` — the optional drill-down step in J4 has no doc scaffolding. | gaps J4 |
| m6 | `settings/billing.mdx` doesn't answer what happens if payments keep failing (is access suspended? after how long?). Owner's named top-of-mind fear in Phase 1 §2 — leave unanswered and the Owner escalates to support instead of self-serving. | gaps J5 step 8 |
| m7 | `tasks/managing-tasks.mdx` "What's next" cards all point laterally (tasks/overview backward, meetings, saved-filters, contact-profile). Hero J1 terminates on this page; there's no forward pointer into J2 entry points (pipeline, messages, calls). | gaps J1 tail |
| m8 | Group **"Dashboard and reports"** bundles two distinct features under one 3-word label while Messages / Calls / Atlas get their own 1-page groups. Pick one consolidation rule and apply consistently (see B3 recommendation). | ia #6 |
| m9 | Atlas appears in the footer column "Work your book" alongside Policies / Pipeline / Messages. Atlas is not a book tool — move to "Get started" or a new column. | ia #10 |
| m10 | `"Your account"` group semantic placement depends on B1. If B1 is rejected, `"Your account"` is misplaced inside an "Admin and settings" tab and should move to the User guide tab. | ia #7 |

### Nit — polish

| # | issue | source |
|---|-------|--------|
| n1 | `policies/status-history.mdx` title is "Status log" but the path is `policies/status-history`. Cheapest fix: add `sidebarTitle: "Status log"` in frontmatter — no path change, no redirect, no BLOCKER. (The redirect-path variant is B9.) | ia #8 |
| n2 | No `"What's new"` / release-notes navbar link. Don't add unless release-notes content exists. Flag for future content. | ia #11 |
| n3 | Footer "Admin" column has Agency settings / Users and roles / Billing. Append `reports/overview` — J4 Admins use reports heavily. | ia #12 |
| n4 | 404 page offers `/` and `/quickstart` fallbacks. Add `/settings/agency-overview` as a third so Admins hitting a stale link recover faster. | ia #21 |
| n5 | User-guide group order (Contacts → Policies → Pipeline → Tasks) leaves Pipeline at slot 4. If analytics later show returning Agents dominate traffic, Pipeline belongs higher. Leave as-is until there's data. | ia #17 |
| n6 | Phase-4 **repo hygiene** (not IA): the duplicated `docs/` starter-kit tree at the repo root is excluded by `.mintignore` but still bloats the repo. Candidate for a full directory delete in Phase 4. Same class: `essentials/`, `ai-tools/`, `api-reference/`, `development.mdx`, `snippets/snippet-intro.mdx`. | ia #15 + Phase 1 §5 |
| n7 | Phase-1 §5 carry-over: four internal contributor files name the forbidden surfaces (`AGENTS.md:21`, `CONTRIBUTING.md:63`, `.claude/DOCS_BRIEF.md:55–60`, `.claude/IMPROVEMENTS_V2.md:234–235`). Not published by Mintlify. Phase 4 decides whether to reword as generic guidance or leave as a deliberate contributor guard. Default recommendation: reword. | Phase 1 §5 |

---

## Journey verdicts (from gaps-reviewer)

| Journey | Persona | Ship-ready? | Single biggest gap |
|--------|---------|-------------|---------------------|
| **J1** New Agent onboards | Agent | Structurally yes, **content no** | M1 — the required-fields contradiction blocks the new Agent at the first-contact step |
| **J2** Agent daily work | Agent | Structurally yes, **content no** | M2 — the phantom Activities tab breaks three cross-page handoffs |
| **J3** Admin stands up a new agency | Admin | Structurally yes, **cross-links incomplete** | m2 + m3 + m4 — the setup spine is interrupted twice and pipeline-stage setup isn't cued at all |
| **J4** Admin reviews team performance | Admin | Yes, minor polish | m5 — reports → drill-down has no forward link |
| **J5** Owner keeps billing current | Agency Owner | Yes, minor polish | m6 — no "what happens if payment fails" cue for the Owner's stated top fear |

---

## Scope for Phase 3

All 37 pages from Phase 1 stay in scope. No page is recommended for
**delete** or **merge**. The two optional BLOCKER restructures surfaced
by diataxis-reviewer (B7 split `policies/overview`; B10 rename
`reports/overview` title) and the Conversations group merge (B3) don't
remove any pages — they relabel or re-home existing ones.

Phase 3 auditors (style, mdx, codelinks) should cover every page below;
flag anything marked "keep with edits" in Phase 4 order.

```
index.mdx
quickstart.mdx
navigating-the-app.mdx

contacts/overview.mdx
contacts/creating-contacts.mdx
contacts/contact-profile.mdx
contacts/importing-contacts.mdx
contacts/exporting-contacts.mdx
contacts/bulk-actions.mdx

policies/overview.mdx
policies/policy-profile.mdx
policies/status-history.mdx
policies/bulk-actions.mdx

pipeline/overview.mdx
pipeline/configuring-pipeline.mdx

tasks/overview.mdx
tasks/managing-tasks.mdx

meetings/overview.mdx
meetings/scheduling-meetings.mdx

messages/overview.mdx
calls/overview.mdx
atlas/overview.mdx

dashboard/overview.mdx
reports/overview.mdx

customization/custom-fields.mdx
customization/saved-filters.mdx
customization/documents.mdx
customization/notes-and-comments.mdx

settings/profile.mdx
settings/password.mdx

settings/agency-overview.mdx
settings/users-and-roles.mdx
settings/products-and-carriers.mdx
settings/sms-numbers.mdx
settings/templates.mdx
settings/agency-custom-fields.mdx
settings/billing.mdx
```

37 pages, 2 tabs, 13 groups (or 9 post-B3).

---

## Classification summary (from diataxis-reviewer)

| Diátaxis type | Count | Pages |
|---------------|-------|-------|
| Tutorial | 1 | quickstart |
| How-to (pure) | 14 | creating-contacts, importing-contacts, exporting-contacts, contacts/bulk-actions, policies/bulk-actions, configuring-pipeline, managing-tasks, scheduling-meetings, saved-filters, documents, password, products-and-carriers, templates, reports/overview |
| Reference (pure) | 6 | navigating-the-app, contact-profile, policy-profile, tasks/overview, meetings/overview, dashboard/overview |
| Explanation (pure) | 1 | index |
| Mixed (principled) | 14 | contacts/overview, status-history, pipeline/overview, messages/overview, calls/overview, atlas/overview, custom-fields, notes-and-comments, profile, agency-overview, users-and-roles, sms-numbers, agency-custom-fields, billing |
| Mixed (accidental) | 1 | policies/overview |

Structural match: **31 ✅ / 6 ⚠️**. Every ⚠️ is a Mixed page where the
hybrid is either principled or principled-with-caveat; only
`policies/overview` is flagged as accidental (B7 optional split).

---

## Lead decisions requested before Phase 3 closes

Answering these shapes Phase 3's brief and Phase 4's work queue:

1. **B3 Conversations merge** — approve, reject, or defer?
2. **B1 Tab rename** "Admin and settings" → "Settings" — approve, reject, or defer?
3. **B2 Agency settings reorder** (move `agency-custom-fields` up 2 slots) — approve or reject?
4. **B4 + B5** "Customization" → "Your data" + page reorder — approve or reject?
5. **B7** split `policies/overview` → new `creating-policies` page — approve, reject, or defer?
6. **B8 + B9 + B11** path renames for gerund titles and status-log — approve (needs redirects) or use frontmatter-only fallbacks (M3 + n1)?
7. **B10** `reports/overview` title → "Reports" (title-only) — approve or reject?
8. **B6** Tasks icon swap — approve or reject?
9. **n7** reword the contributor-doc exclusion lists (`AGENTS.md`, `CONTRIBUTING.md`, `.claude/*`) — approve, reject, or defer?

Phase 3 can start without answers on these — style/mdx/codelinks work
at the page level — but approvals unblock the Phase 4 apply order.

---

**Status:** Phase 2 complete. Awaiting user approval before spawning the
Phase 3 quality team (`style`, `mdx`, `codelinks`).
