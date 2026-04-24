# Docs improvement — deep pass (task #22)

Second, deeper audit against Mintlify's "How to measure and improve
documentation quality" guide
(<https://www.mintlify.com/docs/guides/improving-docs>) and the Feedback
configuration guide (<https://www.mintlify.com/docs/optimize/feedback>).

This builds on the first pass in `IMPROVEMENTS.md` (task #17) — it does not
repeat it. The goal here is to apply the P2 items the first pass parked, add
the discoverability / feedback wiring the guide recommends that `docs.json`
supports, and fix new gaps found on a cross-reference read of every page.

## What the guide actually recommends (and where it maps)

The guide breaks improvement work into three signal types plus a
prioritization framework:

| Signal | What the guide says | Where it applies here |
| ------ | ------------------- | --------------------- |
| Quantitative metrics | Page views, time on page, bounce rate, traffic × satisfaction | Requires analytics integration (see F-5 below). |
| Qualitative feedback | In-page ratings, open-ended comments, stakeholder input | Requires dashboard Add-on enablement (see F-4 below). |
| Business signals | Support ticket reductions, onboarding drop-off, retention | Operational; flagged in Deferrals. |
| Prioritization | Fix high-traffic + low-satisfaction pages first. Focus on 3-5 critical journeys. | Applied indirectly by auditing index → quickstart → contacts → policies → pipeline → messages end-to-end. |

## Applied in this pass

### V2.A — P2.1 resolved: freshness markers

**Change**: added `"metadata": { "timestamp": true }` to `docs.json`.

Mintlify supports per-page last-updated timestamps as a built-in feature. The
first pass parked this under P2.1 ("No page carries a 'last updated'
signal…") because they didn't find a built-in mechanism. `docs.json`'s
`metadata.timestamp` ships exactly that — Mintlify reads the git commit date
of each `.mdx` file and renders the timestamp at the bottom of each page.

Why now: the guide explicitly calls out that "Products change, users' needs
evolve, and content that worked six months ago may no longer reflect how the
product behaves." Surfacing the freshness signal lets readers judge currency
at a glance and gives the docs team a visible accountability anchor for the
monthly / quarterly review cadence the guide recommends.

### V2.B — P2.2 resolved: specific examples on thin pages

Three pages carried generic guidance the first pass flagged as
example-starved:

1. **`settings/templates.mdx`** — Added a fully worked **email** example
   (subject + body with `{{contact.first_name}}`, `{{policy.product}}`,
   `{{policy.carrier}}`, `{{agent.first_name}}`, `{{agency.name}}` tags) and a
   160-character **SMS** example with an explicit **Reply STOP to opt out**
   compliance line. Also added a new `<Accordion>` item *"Always include an
   opt-out on SMS"* covering Medicare / ACA compliance expectations.

2. **`settings/users-and-roles.mdx`** — Added a **CSV format** subsection
   under *Importing users in bulk* that lists the expected headers
   (`first_name`, `last_name`, `email`, `role`), flags which are required,
   specifies the allowed `role` values, and includes a three-row CSV example.
   Addresses the first-pass note "says 'upload a CSV with one user per row'
   without listing headers."

3. **`customization/custom-fields.mdx`** — Added an **Example: a Referral
   Source field** subsection that anchors the abstract field-type table to a
   concrete Single Choice field, lists the typical option set
   (`Website`, `Facebook ad`, `Radio`, `Referral from client`, `Walk-in`,
   `Other`), and explains the three follow-on actions (filter, column,
   report) that make the field pay off.

### V2.C — P2.3 resolved: toolbar redundancy on Contacts overview

**`contacts/overview.mdx`** — The 12-row toolbar table restated Import /
Export / Add Contact, each of which has a dedicated page. Trimmed the table
to the unique list-page controls (Search, Filters, Reset filters, Sort,
Customize columns, My Contacts, Date range) and lifted the three entry-point
rows into a short three-item list directly below the table, each with a
one-sentence purpose and a link to its dedicated page. Net: tighter toolbar
reference, same discoverability.

### V2.D — P2.4 resolved: tighter primary CTA on the home page

**`index.mdx`** — Renamed "Where to start" to "Start here" and replaced the
two paired Quickstart / App-tour cards with a three-part structure:

1. A one-sentence framing sentence telling brand-new readers to do the
   walkthrough first.
2. A **full-width horizontal `<Card>`** titled *"Quickstart: your first
   session"* with a richer one-line description (outcome + rough time
   estimate — "in about ten minutes"). This is now the unambiguous primary
   CTA for new users.
3. A two-card secondary row with **App tour** and a new **Agency setup**
   card for the admin / owner path that was previously hidden in prose.

This matches the guide's advice to "focus on the 3-5 critical user journeys"
— we now have one hero CTA for the dominant new-agent journey and two
secondary CTAs for the other critical entry points (navigation orientation
and admin setup).

### V2.E — New finding: discoverability footer

**`docs.json`** — Previously only had `footer.socials: {}` (empty). Added a
four-column `footer.links` with **Get started**, **Work your book**,
**Admin**, and **Help** sections. Each column is a hand-curated set of 3-4
links that corresponds to the three primary audiences from `DOCS_BRIEF.md`
(new agents, working agents, admins / owners) plus a support column.

Why it matters for this pass: the guide's core premise is that high-value
pages under-perform when users can't find them. The footer surfaces a stable
secondary navigation entry across every page — especially important for
users who've scrolled to the bottom of a long reference page and are looking
for the next thing.

## Not applied in this pass (with justification)

### F-1 — In-page thumbs-up / thumbs-down ratings

The guide's single most-cited recommendation is "Enable feedback on your
documentation pages so readers can signal when something isn't working."
Mintlify ships this as a built-in **Feedback** add-on, not a `docs.json`
setting. It is enabled from the **Add-ons** page in the Mintlify dashboard,
and once enabled it renders the thumbs-up / thumbs-down UI on every page
automatically.

`docs.json` only exposes the *disable* switch
(`integrations.telemetry.enabled`), which is not set here — so telemetry
defaults to enabled and feedback features will work the moment the dashboard
toggle flips. **Action for the team lead**: turn on *Thumbs rating*,
*Contextual feedback*, and *Collect reader emails* in the dashboard's
Add-ons page when ready.

### F-2 — Code-snippet feedback, Edit suggestions, Raise issues

Also dashboard-only; same path as F-1. **Edit suggestions** and **Raise
issues** are tied to public GitHub repos; PolicyDen-Docs is private, so
these two specific add-ons won't apply unless the repo is made public or a
mirror is configured.

### F-3 — Agent feedback

Beta-gated dashboard add-on. Same action path as F-1. Recommend enabling
once the core product feedback flow is stable, so third-party AI agents
fetching the docs via the MCP server (already configured via
`contextual.options: ["chatgpt", "claude", "perplexity"]`) can post
structured feedback.

### F-4 — Analytics integration (Google Analytics, PostHog, Mixpanel, etc.)

The guide's entire *Quantitative metrics* section depends on having page
views, time-on-page, bounce-rate, and satisfaction data. `docs.json` supports
every major analytics provider under `integrations.*` — none are currently
wired up. **Deferred** because picking a provider is a cross-company
privacy / tooling decision, and Mintlify's built-in feedback dashboard
provides first-signal coverage once F-1 is done.

### F-5 — Description length backfill

The guide (via `/guides/seo.mdx`) recommends descriptions of 150-160
characters. A spot check of the current set shows most pages land between
70 and 120 characters. The current descriptions are precise and outcome-led,
so lengthening them for the sake of a character count would dilute clarity
without a measurable ranking lift. **Deferred** until analytics data tells
us which specific descriptions are under-performing on search / social.

### F-6 — Page timestamps (visible delta)

Applied via `metadata.timestamp: true`. No per-page frontmatter timestamps
added because Mintlify derives the timestamp from git history — a frontmatter
duplicate would drift. If the team wants an *authoritatively maintained*
"reviewed on" signal distinct from the last commit, the existing
`variables` frontmatter surface can carry it — defer until there's a content
freshness policy to enforce.

### F-7 — Announcement banner

`banner.content` in `docs.json` is available but no current announcement is
warranted. Reserve for product-launch beats, scheduled maintenance windows,
or urgent compliance notices. Leave unset.

### F-8 — Admin `<Info>` on `pipeline/configuring-pipeline.mdx`

Every other admin-only page opens with an `<Info>` callout per
`DOCS_BRIEF.md` ("Admin-only pages or sections get an `<Info>` callout near
the top"). This page uses a richer `## Prerequisites` H2 section instead,
linking to Users and roles and naming the two required roles. Both are
sanctioned by the brief ("put prerequisites first, then steps, then what's
next"), and the Prerequisites pattern carries more information than an
`<Info>` callout would. Left as-is.

## Cross-reference consistency audit

Read every page end-to-end. The site is in strong shape. Specific
consistency observations:

- **Opening pattern**: Every page opens with 1–2 sentences that state what
  the page is about and the primary audience. ✅
- **Admin callouts**: Every admin-only page except the Prerequisites-style
  `pipeline/configuring-pipeline.mdx` uses `<Info>` near the top. ✅
- **"What's next" payoff**: Every non-hub page ends with a `<Columns>` of
  2–4 `<Card>` components pointing to the logical next pages. ✅
- **Hub pages** (`index.mdx`, `settings/agency-overview.mdx`) use their
  `<Columns>` of cards as the body payoff — no separate "What's next" is
  needed and one would be redundant. ✅
- **Frontmatter coverage**: Every page has `title`, `description`, and
  `keywords`. Wide-layout pages (`contacts/overview`, `policies/overview`,
  `pipeline/overview`, `dashboard/overview`, `reports/overview`,
  `settings/agency-custom-fields`, `settings/billing`) carry `mode: "wide"`.
  ✅
- **Image alt text**: Every `<img>` has descriptive alt text. ✅
- **Cross-links**: Referenced the linking graph while reading. No dead ends
  spotted; internal links all root-relative without extensions. ✅
- **Internal TODO markers**: Grepped for `{/* TODO */}` — none remain. The
  Messages archive TODO flagged under P1.2 is resolved in the current copy.

## Validation

```
mint validate       → success build validation passed
mint broken-links   → success no broken links found
```

Run from `/Users/mac/PolicyDen-Docs` after applying every change above.

## Summary of files touched

| File | Change |
| ---- | ------ |
| `docs.json` | Added `metadata.timestamp: true`; added a four-column `footer.links` for discoverability. |
| `index.mdx` | Restructured *Where to start* as a single hero Quickstart card plus a two-card secondary row (App tour + Agency setup). |
| `contacts/overview.mdx` | Trimmed toolbar table redundancy; lifted Add / Import / Export into a short list with cross-links. |
| `settings/templates.mdx` | Added full worked email + SMS template examples with tag placeholders; added an opt-out compliance tip. |
| `settings/users-and-roles.mdx` | Added a CSV format subsection with headers, required flags, allowed `role` values, and a 3-row example. |
| `customization/custom-fields.mdx` | Added a Referral Source worked example anchoring the field-type table. |

Six files changed. All changes preserve the hard content exclusions
called out in `DOCS_BRIEF.md` — no references to internal admin-only
automation surfaces leaked into user-facing copy.
