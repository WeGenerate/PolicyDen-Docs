# Phase 3 — Quality

Consolidated findings from three audit-only teammates run against
`01-foundation.md` + `02-audit.md`: **style-reviewer** (voice, tone,
heading, terminology, persona), **mdx-reviewer** (component usage,
frontmatter, template match per Diátaxis type), **codelinks-reviewer**
(code fences, internal/external links, images, alt text). All three
used the `/mintlify` skill and the Mintlify MCP, read-only. Sweep date:
2026-04-24. Scope: the 37 in-scope pages from `02-audit.md` §Scope for
Phase 3.

---

## Executive summary

**Page-level quality is high.** Zero broken links, zero missing alt
text, zero code blocks without language tags, zero `<CardGroup>`,
zero `<ParamField>` / `<ResponseField>` stragglers, zero raw HTML
primitives, zero `<img>` outside a `<Frame>`, all 37 pages carry
`title` + `description` (50–160 chars) + `keywords`. The seven
wide-table pages correctly declare `mode: "wide"`.

**One pervasive style pattern warrants a dedicated fix pass.** Role
names (`Agent`, `Admin`, `Agency Owner`) are lowercased in roughly
**27 in-prose uses across 18 pages** in violation of the §4
terminology lock. This is batch-fixable in a single commit with a
grep-targeted sweep, and it is by far the largest single source of
findings in this phase.

**Three `<AccordionGroup>` blocks hide primary reference content**
— the Contacts / Policies / Tasks list-toolbar descriptions and the
app-tour sidebar list are collapsed behind accordions on pages where
they're the main content. Mintlify guidance reserves accordions for
optional detail or expandable troubleshooting. Unwrap them.

**Three `<Warning>` / `<Note>` severity mismatches** also cluster for
a single-pass fix: two over-warn on behavior notes; one under-warns
on an AI-reliability caveat the Owner's J5 fear is tied to.

**No new BLOCKERs opened.** Every structural ask that surfaced was
already captured as B1–B11 in `02-audit.md`. Everything below this
line is an in-file edit Phase 4 can apply without new lead approvals
beyond the ones already pending on `02-audit.md`.

---

## Findings by severity

Severity key: **blocker** (journey-breaking or deployment-risk),
**major** (breaks §4 lock or contradicts the app), **minor** (drift,
missed fix, consistency), **nit** (polish only). Each finding cites
its source reviewer and the Mintlify rule or Phase-1/2 decision that
makes it a finding.

### Blocker — journey-breaking content

| # | page : line | issue | fix | source · rule |
|---|-------------|-------|-----|----------------|
| Q-B1 | `quickstart.mdx:65` and `contacts/creating-contacts.mdx:54` | Contradict each other on required fields at first-contact creation. Quickstart: "first name, last name, phone, and email are enough." Creating-contacts: "every field including DOB and Medicare number is required." Same finding as `02-audit` M1; reconfirmed by style-reviewer. | Align both on one field set. Canonical is `creating-contacts` (it's the form-reference page); rewrite quickstart Step 3 to match. Verify the actual required set from the app before deciding. | style-reviewer · 02-audit M1 |
| Q-B2 | `contacts/contact-profile.mdx` (page-wide) | Phantom "Activities" tab — `messages/overview.mdx:19`, `calls/overview.mdx:89,93`, `meetings/overview.mdx:11`, and now `navigating-the-app.mdx:63` all tell the reader to open an Activities tab that `contact-profile.mdx` never documents. Three cross-page dead-ends inside J2. Same as `02-audit` M2; reconfirmed by style-reviewer with a fourth contradicting page. | Add the Activities tab to the canonical tabs list on `contact-profile.mdx`. Confirm label against the app before landing — style-reviewer also flags "SMS tab" vs "Messages tab" drift between `messages/overview.mdx:50` and the canonical profile doc. Pick one label per tab, apply everywhere. | style-reviewer · 02-audit M2 |

### Major — §4 lock violations and systemic drift

| # | page : line | issue | fix | source · rule |
|---|-------------|-------|-----|----------------|
| Q-M1 | 18 pages, ~27 in-prose instances | Role names lowercased when the role is named. Examples: `quickstart.mdx:7` "new agents", `quickstart.mdx:15,20` "your agency admin" (×2), `navigating-the-app.mdx:28` "admins only", `contacts/overview.mdx:8,58` "if you're an admin" / "(admins only)", `contacts/creating-contacts.mdx:82` "two agents", `contacts/importing-contacts.mdx:10,101` lower admin / "the agents", `policies/overview.mdx:80,126,130` "agency admins" / "your agency admin", `policies/policy-profile.mdx:77,82` "agency admins" / "your admin", `pipeline/overview.mdx:15,70` "An admin", `pipeline/configuring-pipeline.mdx:7` "Agency admins", `reports/overview.mdx:8,15` "admin tool" / "admins only", `customization/custom-fields.mdx:7,14,83,85` "Your agency admin" / "the admin" / "Ask the admin" / "Only admins", `settings/users-and-roles.mdx:7` "admins who configure", `settings/products-and-carriers.mdx:7,38,45,60,72,96,114` "your agents" / "agents" (×7), `settings/sms-numbers.mdx:13–14` "admin task" / "an admin", `settings/templates.mdx:10,144` "by admins" / "how agents send SMS", `settings/agency-custom-fields.mdx:8,96,99,106` "your agents" (×3) + "agents start", `settings/billing.mdx:15` "admin-only", `settings/password.mdx:50` "your agency admin", `dashboard/overview.mdx:8` "agents and carriers", `meetings/overview.mdx:11` folded into Q-B2. | Batch pass: when the word names the role, capitalize (`Admin`, `Agent`, `Agency Owner`). When the word names the person in informal direct address, it stays lowercase (`"ask your agent"`). Keep `user(s)` lowercase per §4 #6. | style-reviewer · §4 #3, #4 |
| Q-M2 | `contacts/creating-contacts.mdx:2`, `contacts/importing-contacts.mdx:2`, `contacts/exporting-contacts.mdx:2`, `tasks/managing-tasks.mdx:2`, `meetings/scheduling-meetings.mdx:2`, `pipeline/configuring-pipeline.mdx:2` | Six page titles in gerund form, surfacing as gerund sidebar labels. §4 supporting conventions require imperative verbs for task headings. Same as `02-audit` M3. | Frontmatter `title` rewrites (non-BLOCKER path): `Create contacts`, `Import contacts`, `Export contacts`, `Manage tasks`, `Schedule meetings`, `Configure the pipeline`. Path renames (`creating-contacts.mdx` → `create-contacts.mdx`, etc.) are B8 / need redirects. | style-reviewer · §4 + 02-audit M3 |
| Q-M3 | `contacts/overview.mdx:74` and `:78`, `pipeline/overview.mdx:26` | Three in-page H2s in gerund form on task-type sections: "Sorting", "Selecting contacts", "Reading a card". Not in M3's sidebar-label set. Same rule, smaller blast radius. | Rewrite to imperative: "Sort the list", "Select contacts", "Read a card" (or "What a card shows" for the pipeline read). | style-reviewer · style-and-tone · imperative task headings |
| Q-M4 | `index.mdx:38` | "move them through your funnel" — `funnel` is rejected by §4 #10 (canonical: `pipeline`). | "move them through your pipeline" | style-reviewer · §4 #10 |
| Q-M5 | `atlas/overview.mdx:3` | Description "Your PolicyDen AI assistant — ask questions about your book and get fast answers." The page is about Atlas and omits the canonical name from the description — §4 #2 requires "Atlas" on first mention. | "Atlas is PolicyDen's built-in AI assistant. Ask it questions about your book and get fast answers." (or similar — keep within 50–160 chars). | style-reviewer · §4 #2 |
| Q-M6 | `policies/overview.mdx:22`, `policies/policy-profile.mdx:46`, `reports/overview.mdx:52,55` | British `cancelled` in prose and `<Tabs>` label, while `dashboard/overview.mdx:31` and the app's status values use `canceled`. Same word, two spellings across the set. | Verify the app UI's spelling. Canonicalize across the four pages (and anywhere else a follow-up sweep catches) to match the app. | style-reviewer · style-and-tone · consistency |
| Q-M7 | `policies/overview.mdx:44–69`, `tasks/overview.mdx:47–66`, `navigating-the-app.mdx:15–33` | Three `<AccordionGroup>` blocks collapse **primary reference content** (Contacts and Tasks list-toolbar controls; app-tour sidebar list). Mintlify reserves accordions for optional detail / troubleshooting / expandable reference, not the main content of a reference-type page. | Unwrap into plain `###` subsections with their contents visible by default. Leave troubleshooting / decision-aid accordions (on `importing-contacts`, `password`, `billing`, `notes-and-comments`, `meetings/overview`) alone. | mdx-reviewer · mintlify.com/docs/components — Accordion purpose |

### Minor — drift, missed cross-links, severity mismatches

| # | page : line | issue | fix | source · rule |
|---|-------------|-------|-----|----------------|
| Q-m1 | `calls/overview.mdx:69-71` | `<Warning>` used for a behavior note ("rejected calls hear line-busy tone; no voicemail routing"). Not destructive. | Downgrade to `<Note>` or `<Info>`. | mdx-reviewer · Mintlify callouts |
| Q-m2 | `contacts/creating-contacts.mdx:84-86` | `<Warning>` used for a scope limitation ("only agencies you belong to are searched"). Not destructive. | Downgrade to `<Note>` or `<Info>`. | mdx-reviewer · Mintlify callouts |
| Q-m3 | `atlas/overview.mdx:51-53` | `<Note>` is the wrong severity for an AI-reliability caveat ("double-check any number, name, or date before acting on it — especially for quotes, renewals, or anything you'd send to a client"). Tied to the Owner's named fear in Phase 1 §2. | Promote to `<Warning>`. | mdx-reviewer · Mintlify callouts |
| Q-m4 | `policies/status-history.mdx:11-12` | Markdown `1.` / `2.` list describes a 2-step procedure ("open a policy → select Status log tab"). Sequential user actions should use `<Steps>`. | Convert to `<Steps><Step title="Open a policy">…</Step><Step title="Select the Status log tab">…</Step></Steps>`. | mdx-reviewer · mintlify.com/docs/components — Steps |
| Q-m5 | `contacts/creating-contacts.mdx:69-71` | Markdown `1.` / `2.` / `3.` describes what PolicyDen does after save. Borderline — describes system outcomes, not user actions. | Keep as Markdown list (outcomes aren't steps), OR convert to `<Steps>` if the team reads it as a named sequence. Default: leave. | mdx-reviewer |
| Q-m6 | `settings/templates.mdx:88-106` | Two back-to-back code blocks (Subject, Body) describe the same example email. Candidate for `<CodeGroup>` with tabs. | Optional: wrap in `<CodeGroup>` with tab titles "Subject" / "Body". Alternative: keep labeled `###` headings (also clear). | mdx-reviewer · mintlify.com/docs/components — CodeGroup |
| Q-m7 | `messages/overview.mdx:50` vs `contacts/contact-profile.mdx` tab list | `messages/overview.mdx` references an "SMS tab" on the contact profile; canonical profile documents the tab as "Messages" (with an SMS dropdown). Drift folds into Q-B2 — fix together. | Pick one canonical label per tab; apply across all references. | style-reviewer · style-and-tone · UI label consistency |
| Q-m8 | `navigating-the-app.mdx:48` | H2 "Lists, filters, and saved views" — but the section describes saved filters (the UI label). | "Lists, filters, and saved filters" for label parity. | style-reviewer · style-and-tone · terminology |
| Q-m9 | `settings/templates.mdx` frontmatter | Page title is 24-char "SMS and email templates" but the sidebar entry reads the full title — users search for "templates". | Add `sidebarTitle: "Templates"` in frontmatter. Zero-cost, no redirect. | mdx-reviewer · mintlify.com/docs/settings/global |
| Q-m10 | `navigating-the-app.mdx` (page-wide) | Reference page describing the app layout has no hero `<Frame>` screenshot, which is where a spatial tour benefits most from one. | Add one labeled sidebar + top-bar screenshot in a `<Frame>` at the top. | mdx-reviewer · content-templates · Reference |
| Q-m11 | `meetings/overview.mdx` (page-wide) | Reference page with no hero `<Frame>`. | Optional: add a screenshot of the meetings activity area on the contact profile. Lower priority than Q-m10. | mdx-reviewer · content-templates · Reference |
| Q-m12 | `quickstart.mdx` body intro | `index.mdx` teases "in about ten minutes" on the Quickstart card, but the body of `quickstart.mdx` doesn't restate the time estimate for readers who arrive direct. | Add "This walkthrough takes about 10 minutes." to the intro paragraph. | mdx-reviewer · content-templates · Tutorial |

### Nit — polish only

| # | page : line | issue | fix | source |
|---|-------------|-------|-----|--------|
| Q-n1 | 16 pages with bare `<Frame>` | Frames around hero screenshots without a `caption=""`. Alt text carries the context, so functionally fine. | Optional: add short captions on the 16 pages for parity with the 4 frames (in `quickstart`, `pipeline/overview`, `messages/overview`) that already have captions. | codelinks-reviewer |
| Q-n2 | `tasks/overview.mdx:58` | UI description "**Assigned To** — one or more agents". Defensible as UI-label context, but inconsistent with the rest of the doc that capitalizes Agent. | Capitalize to "Agents". | style-reviewer · §4 #3 |
| Q-n3 | `contacts/creating-contacts.mdx:80` | "the uppercased MBI" phrasing. Technically fine. | Optional: "MBI in uppercase." | style-reviewer |
| Q-n4 | `atlas/overview.mdx:36` | Quoted user-prompt example contains "Just the ones in California". `just` is user speech inside a quote — intentional. | Leave. | style-reviewer |
| Q-n5 | `tasks/managing-tasks.mdx:104` | Example uses literal name "Dejan". | Leave — realistic per style-and-tone. | style-reviewer |
| Q-n6 | `/images/hero-dark.png`, `/images/hero-light.png`, `/images/checks-passed.png` | Image files exist on disk but no in-scope page references them (leftover from starter-kit trees). | Repo-hygiene candidate for Phase 4 delete pass (same class as audit n6). | codelinks-reviewer |
| Q-n7 | 12 pages without hero `<Frame>` | Pure how-to / troubleshooting pages lack a screenshot. Defensible for most (the how-to structure carries the page), but some (e.g. `contacts/bulk-actions`, `contacts/importing-contacts`) would benefit from a list-preset screenshot. | Flag as Phase-4 content team image-gap backlog. Not a component defect. | mdx-reviewer |

---

## Summary by rule class (batch-fix planning)

| class | count | pages affected | fixable in a single pass? |
|-------|-------|----------------|---------------------------|
| Role-name capitalization (§4 #3, #4) | ~27 | 18 | **Yes** — targeted grep + sweep; single commit |
| Gerund titles/headings (§4 + M3) | 6 titles + 3 H2s | 7 | **Yes** — frontmatter + H2 rewrite pass |
| `<AccordionGroup>` hides primary content | 3 blocks | 3 | **Yes** — structural MDX edits on 3 files |
| Callout severity (Warning/Note) | 3 | 3 | **Yes** — one commit |
| `cancelled` / `canceled` spelling | 4 | 3 | **Yes** — verify app UI, then grep-replace |
| Markdown→`<Steps>` for procedures | 1 (+1 borderline) | 1–2 | **Yes** — small MDX edit |
| Drift / terminology one-offs | 3 (`funnel`, Atlas description, `SMS tab`) | 3 | **Yes** — one commit |
| `<Frame caption>` consistency | 16 | 16 | **Yes, but optional** — polish pass |
| Missing hero `<Frame>` on 2 Reference pages | 2 | 2 | No — needs screenshots captured from the app |
| Content gaps (Activities tab content, required fields) | 2 content bugs (Q-B1, Q-B2) | 2–3 | No — needs SME/app verification before writing |

---

## Classification: findings folded into existing `02-audit.md` items vs new

Folded (reinforced by Phase 3, no separate action needed):

- `02-audit` **M1** ← Q-B1 (style-reviewer confirms both pages + `settings/profile.mdx:37` field count)
- `02-audit` **M2** ← Q-B2 + Q-m7 (style-reviewer adds `navigating-the-app.mdx:63` as 4th contradicting page)
- `02-audit` **M3** ← Q-M2 (6 gerund sidebar titles confirmed)
- `02-audit` **m1** ← `settings/profile.mdx:37` field count mismatch
- `02-audit` **m4** ← `settings/agency-overview.mdx:44–64` confirmed omits `pipeline/configuring-pipeline`
- `02-audit` **m6** ← folded into Q-m3's severity promotion rationale (Owner J5 fear)
- `02-audit` **n6** ← Q-n6 unreferenced image files reinforced
- `02-audit` **B7** ← `policies/overview.mdx:94–109` accidental mixed confirmed
- `02-audit` **B10** ← `reports/overview.mdx` title mis-sets type expectations

New in Phase 3 (Phase 4 apply queue additions):

- Q-M1 — 27-instance role-capitalization batch
- Q-M3 — 3 in-page gerund H2s
- Q-M4 — `funnel` → `pipeline` in `index.mdx:38`
- Q-M5 — Atlas description rewrite
- Q-M6 — `cancelled` → `canceled` canonicalization
- Q-M7 — 3 accordion unwraps
- Q-m1 / Q-m2 / Q-m3 — 3 callout severity fixes
- Q-m4 / Q-m5 — Markdown → `<Steps>` conversion(s)
- Q-m6 — optional `<CodeGroup>` on templates example
- Q-m8 — H2 label parity on `navigating-the-app.mdx`
- Q-m9 — `sidebarTitle: "Templates"` frontmatter add
- Q-m10 / Q-m11 — optional hero `<Frame>` on two Reference pages
- Q-m12 — quickstart time estimate in body
- Q-n1 / Q-n6 / Q-n7 — polish nits

---

## No new BLOCKERs

All three Phase 3 reviewers independently confirmed no structural asks
beyond `02-audit.md` B1–B11. Every Phase 3 fix is an in-file edit —
frontmatter rewrites, MDX-body changes, component swaps, link/image
touch-ups. Phase 4 can stage them in a single "quality pass" commit
(or several smaller ones, if the lead prefers) without gating on the
Phase 2 B-decisions.

**B-decision status (awaiting lead):** B1–B11 from `02-audit.md` remain
unresolved and do not block Phase 3-level edits. They do shape Phase 4
ordering (rename + redirect vs frontmatter-only fallback for M3; full
group merge for B3; etc.).

---

**Status:** Phase 3 complete. Awaiting user approval before Phase 4
(lead-only apply pass) begins.
