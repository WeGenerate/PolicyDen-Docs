# Phase 1 — Foundation

Lead-authored, locked with the user on 2026-04-24. Inputs to Phases 2–4.
Scope: the 37 `.mdx` pages registered in `docs.json`. Starter-kit paths
(`docs/`, `essentials/`, `ai-tools/`, `api-reference/`, `development.mdx`,
`snippets/`) are excluded via `.mintignore` and out of scope.

## 1 · Site map

PolicyDen docs ship as a single Mintlify site (`docs.policyden.com`) with two
top-level tabs: **User guide** (the default audience is Agents) and
**Admin and settings** (for Admins and Agency Owners). The User guide mirrors
the app's left sidebar — one group per feature area, plus a Getting-started
group up front and a Customization group at the end. Admin and settings
splits into a small "Your account" group (for any user) and an "Agency
settings" group (Admin/Owner only). Total: 37 pages across 13 groups. No
versions, no localization, no product-level split.

```
Tab: User guide
├── Getting started
│   ├── index                         (Welcome to PolicyDen — hub)
│   ├── quickstart                    (tutorial)
│   └── navigating-the-app            (app tour)
├── Contacts
│   ├── contacts/overview             (list surface)
│   ├── contacts/creating-contacts
│   ├── contacts/contact-profile
│   ├── contacts/importing-contacts
│   ├── contacts/exporting-contacts
│   └── contacts/bulk-actions
├── Policies
│   ├── policies/overview             (list surface + embedded create)
│   ├── policies/policy-profile
│   ├── policies/status-history
│   └── policies/bulk-actions
├── Pipeline
│   ├── pipeline/overview             (board surface + embedded how-tos)
│   └── pipeline/configuring-pipeline
├── Tasks
│   ├── tasks/overview
│   └── tasks/managing-tasks
├── Meetings
│   ├── meetings/overview
│   └── meetings/scheduling-meetings
├── Messages
│   └── messages/overview             (inbox surface + embedded how-tos)
├── Calls
│   └── calls/overview                (widget surface + embedded how-tos)
├── Atlas
│   └── atlas/overview                (assistant surface + embedded how-tos)
├── Dashboard and reports
│   ├── dashboard/overview
│   └── reports/overview              (named "overview" but shaped as a how-to hub)
└── Customization
    ├── customization/custom-fields
    ├── customization/saved-filters
    ├── customization/documents
    └── customization/notes-and-comments

Tab: Admin and settings
├── Your account
│   ├── settings/profile
│   └── settings/password
└── Agency settings
    ├── settings/agency-overview      (hub)
    ├── settings/users-and-roles
    ├── settings/products-and-carriers
    ├── settings/sms-numbers
    ├── settings/templates
    ├── settings/agency-custom-fields
    └── settings/billing
```

Navbar links: **Support** (mailto) and **Open app** (button to
`app.policyden.com`). Footer has four columns: Get started, Work your book,
Admin, Help. Contextual actions: copy, view, chatgpt, claude, perplexity.
SEO `indexing: navigable`. Freshness timestamp enabled via
`metadata.timestamp: true` (Mintlify reads the git commit date).

## 2 · Personas

The app ships three roles — **Agent**, **Admin**, **Agency Owner** — which
match the role picker in `settings/users-and-roles` and the copy in
`.claude/DOCS_BRIEF.md`. These are the same three personas used throughout
this review. The user's prompt referred to the middle persona as "agency
manager"; the canonical app term is **Admin**, and we use **Admin**
everywhere in the docs and in Phases 2–4.

### Agent — the default User-guide reader

- **Prior knowledge.** Sells Medicare / ACA plans for a living. Comfortable
  with phones, CSVs, basic filtering, and usually one or two prior CRMs.
  New to PolicyDen's specific labels and layouts.
- **Top 3 daily tasks.**
  1. Work the pipeline and tasks queue: move stages, complete follow-ups,
     book meetings.
  2. Send SMS / make calls to leads and clients, with the conversation
     logged against the contact.
  3. Log new policies on existing contacts and keep their statuses
     current through renewal.
- **What they fear getting wrong.** Creating a duplicate contact record.
  Sending a text from the wrong number or at the wrong time. Losing a hot
  lead because the pipeline stage is wrong. Missing a renewal.

### Admin — team lead with admin rights

- **Prior knowledge.** Everything an Agent knows, plus experience setting
  up CRM users, products, templates, and custom fields elsewhere.
  Frequently still sells. Responsible for the team's production number.
- **Top 3 daily tasks.**
  1. Onboard and offboard users (invite, assign role, deactivate).
  2. Review team performance: dashboard tiles, high-risk policies,
     report breakdowns, exports.
  3. Configure or fix agency-wide settings: products and carriers,
     custom fields, SMS templates, saved filters.
- **What they fear getting wrong.** Granting the wrong permissions.
  Breaking a custom field or template the whole team depends on. Missing a
  production drop. Letting a deactivated user keep any access.

### Agency Owner — the buyer, superset of Admin

- **Prior knowledge.** Admin-level, plus final say on billing, the agency's
  book, and compliance posture. Rarely in the day-to-day sales flow.
- **Top 3 daily tasks.**
  1. Keep billing current: update card, pay invoice, review charges.
  2. Control ownership — who has Admin or Owner access, who does not.
  3. Spot-check agency-level production and retention.
- **What they fear getting wrong.** Service interruption from a failed
  payment. The wrong person holding Owner access. A compliance gap (SMS
  opt-outs, data exposure) they didn't know existed.

## 3 · Critical journeys

Five journeys, locked with the user. Each names the pages a reader would
actually traverse. Phases 2 and 3 measure the docs against these first —
anything outside the journey set is "polish, not blocker".

### J1 — New Agent onboards and logs first contact, policy, and task (≤ 10 min) _(Agent)_

`index` → `quickstart` → `navigating-the-app` → `contacts/creating-contacts`
→ `policies/overview` (embedded Create a policy) → `tasks/managing-tasks`.

The hero path for the biggest persona. If this journey has a gap, every
later journey inherits it.

### J2 — Agent works a normal day _(Agent)_

`pipeline/overview` → `tasks/overview` → `contacts/contact-profile` →
`messages/overview` → `calls/overview`. Re-entry loop, not a linear
tutorial. Readers land here from search or a bookmark; every page has to
stand on its own.

### J3 — Admin stands up a new agency _(Admin)_

`settings/agency-overview` → `settings/users-and-roles` →
`settings/products-and-carriers` → `settings/agency-custom-fields` →
`settings/sms-numbers` → `settings/templates` → `settings/billing`. The
Agency settings tab's "typical setup order" is the spine. Adjacent pages
(custom fields, saved filters) may join, but the seven listed are the
primary set.

### J4 — Admin reviews team performance _(Admin)_

`dashboard/overview` → `reports/overview` → (optional drill-down on a
contact or policy via `contacts/contact-profile` / `policies/policy-profile`).
Ends with a saved or exported report.

### J5 — Agency Owner keeps billing current _(Agency Owner)_

`settings/billing` (card management, invoice payment, receipts). Narrow
but high-stakes — service continuity rides on this page working cleanly in
isolation, since Owners don't browse around first.

## 4 · Terminology lock

Eleven terms. Use the canonical form on every page, in every nav label,
every callout, every image alt. Reject the alternates in Phase 3 and
Phase 4. Terms already in `DOCS_BRIEF.md` are included so every reviewer
works from one list.

| # | Canonical | Use for | Reject |
|---|-----------|---------|--------|
| 1 | **PolicyDen** | the product name — one word, capital P and D | Policy Den, policyden, PolicyDEN |
| 2 | **Atlas** | the built-in AI assistant (first mention may introduce it as "Atlas, the AI assistant") | "the AI", "PolicyDen AI", "AI assistant" after first mention |
| 3 | **Agent** | the sales role; capitalize when naming the role, lowercase when naming the person (*"ask your agent"*) | sales rep, broker, salesperson |
| 4 | **Admin** | the admin role; capitalize when naming the role | agency manager, team lead, manager |
| 5 | **Agency Owner** | the owner role; both words capitalized | owner, principal, agency admin |
| 6 | **User** | anyone with a PolicyDen login, role-agnostic — use when role does not matter | "team member" (ambiguous), "person" |
| 7 | **Contact** | the CRM record for any lead/client — always the record type | prospect |
| 8 | **Policy** | the record of a sold plan, with status, carrier, product, effective date | plan (reserve *plan* for the product offering) |
| 9 | **Product** / **Carrier** | product line (Medicare Advantage, ACA, etc.) / insurance company — two distinct layers | "carrier product", "plan carrier" |
| 10 | **Pipeline** | the Kanban board view of contacts by stage — the feature name | funnel, board (alone) |
| 11 | **Your agency** | the reader's organization in second person | the company, the brokerage, the firm |

Supporting conventions (not separately locked but enforced alongside):

- **Sentence case** for every heading. No title case, no gerund headings —
  imperative verbs for task headings ("Add a user", not "Adding a user").
- **Bold on first reference** for UI elements: **Add Contact**,
  **Settings → Profile**.
- **Monospace** for paths, URLs, and config keys: `docs.json`,
  `/contacts/overview`.
- **Root-relative** internal links without the `.mdx` extension.

## 5 · Bot / CMS reference sweep

Hard Rule: the docs must not reference, describe, document, or acknowledge
the bot or the CMS anywhere — not in copy, findings, nav labels, examples,
screenshots, or contributor docs. Flag existing mentions for removal in
Phase 4.

Sweep pattern (ripgrep, case-insensitive):
`CMS | MARX | bot | bots | BotRun | reconciliation | reconcile | Policy Status Tool | workflow | workflows | CmsAccounts | federal marketplace`
across every `.mdx`, `.md`, and `docs.json` in the repo.

### Published content (pages surfaced by Mintlify)

Zero named references to the bot, CMS, MARX, BotRun, reconciliation, or
the Policy Status Tool in any `.mdx` page registered in `docs.json`.

One grep hit that is NOT a violation, kept for transparency:

| Path : line | Match | Disposition |
| ------------ | ----- | ----------- |
| `index.mdx:34` | `## Core workflows` | Generic English heading introducing the Contacts / Policies / Pipeline / Tasks / Messages / Calls card set. Not a reference to the internal Workflows feature. Leave. |
| `policies/status-history.mdx:4` | keyword `"policy status history"` | Generic phrase in the keywords array. The forbidden proper noun is **Policy Status Tool**; this is not it. Leave. |

### Internal / non-published files (ignored by Mintlify, visible only to contributors)

These name the forbidden surfaces in exclusion lists. Per the Hard Rule
("anywhere"), they are flagged for Phase 4 review. None of them ship to
readers — `AGENTS.md`, `CONTRIBUTING.md`, `README.md`, and the `.claude/`
directory are excluded from the Mintlify build by default or via
`.mintignore`. Phase 4 will decide whether to scrub, reword, or keep as a
deliberate internal guard against future contributor drift.

| Path : line | Match | Category |
| ------------ | ----- | -------- |
| `AGENTS.md:21` | "Federal marketplace CMS accounts, MARX, bots and bot runs, reconciliation, the Policy Status Tool, or internal workflows." | **A — named reference in exclusion list.** Flag. |
| `CONTRIBUTING.md:63` | "Federal marketplace CMS accounts, MARX, bots and bot runs, reconciliation, the Policy Status Tool, and internal workflows. These are internal surfaces and out of scope for user docs." | **A — named reference in exclusion list.** Flag. |
| `.claude/DOCS_BRIEF.md:55–60` | exclusion-list section naming CMS / MARX / bots / BotRuns / reconciliation / Policy Status Tool / Workflows | **A — named reference in exclusion list.** Flag. |
| `.claude/IMPROVEMENTS_V2.md:234–235` | "no CMS, MARX, bots, workflows, reconciliation, or policy-status-tool references" | **A — named reference in exclusion list.** Flag. |
| `AGENTS.md:57` | `.github/workflows/mint-checks.yml` | **B — benign.** GitHub Actions path, unrelated to the bot. Leave. |
| `CONTRIBUTING.md:80` | `.github/workflows/mint-checks.yml` | **B — benign.** GitHub Actions path. Leave. |
| `README.md:23` | "includes component reference, writing standards, and workflow guidance." | **B — benign.** Generic Mintlify starter-kit copy, not a reference to PolicyDen's internal Workflows. Leave. |

### Summary for Phase 4

- **Published copy:** no action. Clean as of 2026-04-24.
- **Contributor docs (Category A, four locations):** confirm with user in
  Phase 4 whether to rewrite the exclusion lists as generic guidance
  ("internal admin-only surfaces are out of scope for user docs") so the
  forbidden proper nouns no longer appear in the repo, or leave them as a
  deliberate guardrail. Default recommendation: rewrite.
- **Benign matches (Category B, three locations):** leave.

---

**Status:** Phase 1 complete. Awaiting user approval before spawning the
Phase 2 audit team.
