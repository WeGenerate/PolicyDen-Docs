# Docs improvement audit (task #17)

Checklist derived from Mintlify's "How to measure and improve documentation quality" guide (https://mintlify.com/docs/guides/improving-docs) plus the task brief's focus areas: scannability, specific examples, clarity of CTAs, freshness markers, redundancy.

Site has no analytics feedback yet, so prioritization leans on structural heuristics across the three–five most critical user journeys (quickstart → contacts → policies → pipeline → messages).

## Priority 1 — apply now

These improvements are visible to readers, unambiguous, and non-overlapping with completed reviewers' scope.

### P1.1 — Replace `<ParamField>` / `<ResponseField>` used for UI form fields

The brief notes these components are "rare for user docs" — they're API-reference chrome that renders with a `type` badge (string / email / read-only) that doesn't describe a user-facing input correctly. Swap in a plain field table so the same info reads as user guidance.

- `contacts/creating-contacts.mdx` — 5 `<ParamField>` blocks under "Step 3: Fill in the required details".
- `policies/policy-profile.mdx` — 6 `<ResponseField>` blocks under "Policy info".
- `settings/profile.mdx` — 3 `<ParamField>` blocks under "Name and email".

### P1.2 — Resolve the lingering TODO in `messages/overview.mdx`

Line 105 carries `{/* TODO: confirm the exact button label and location for archive/unarchive … */}`. It's an MDX comment so readers don't see it, but it blocks the archive section from standing on its own. Replace the comment with either the verified steps or a short "ask support if unclear" sentence — don't ship the TODO.

### P1.3 — Add `keywords` frontmatter to deeper entry-point pages

Overview pages already have keywords (good for SEO/GEO). Deeper pages are common landing points from external search and lack them. Add focused keyword arrays to:

- `contacts/creating-contacts.mdx`, `contacts/contact-profile.mdx`, `contacts/importing-contacts.mdx`, `contacts/exporting-contacts.mdx`, `contacts/bulk-actions.mdx`
- `policies/policy-profile.mdx`, `policies/status-history.mdx`, `policies/bulk-actions.mdx`
- `pipeline/configuring-pipeline.mdx`
- `tasks/managing-tasks.mdx`
- `meetings/scheduling-meetings.mdx`
- `customization/custom-fields.mdx`, `customization/saved-filters.mdx`, `customization/documents.mdx`, `customization/notes-and-comments.mdx`
- `settings/profile.mdx`, `settings/password.mdx`, `settings/agency-overview.mdx`, `settings/users-and-roles.mdx`, `settings/products-and-carriers.mdx`, `settings/sms-numbers.mdx`, `settings/templates.mdx`, `settings/agency-custom-fields.mdx`, `settings/billing.mdx`

## Priority 2 — follow up

Lower-risk suggestions; skip now, revisit in a maintenance pass.

### P2.1 — Add a freshness marker convention

No page carries a "last updated" signal. Mintlify frontmatter doesn't ship a built-in `lastUpdated`, but a `meta: { updatedAt }` field (or a visible note on pages that describe volatile workflows — billing, SMS provisioning, Atlas capabilities) would help readers judge currency. Defer until there's a team convention.

### P2.2 — Surface more specific examples on thin pages

Mostly already strong (Atlas prompts, Pipeline stage names, Reports breakdowns). Candidates:
- `settings/templates.mdx` could show one full example SMS/email template body with tags in place.
- `settings/users-and-roles.mdx` "Importing users in bulk" says "upload a CSV with one user per row" without listing headers.
- `customization/custom-fields.mdx` could anchor the Field types table to a worked example ("Referral Source" field).

### P2.3 — Tighten the toolbar table on `contacts/overview.mdx`

The 12-row toolbar table restates Export / Import, which have dedicated pages. Trim to the unique list-page controls and link out for the rest.

### P2.4 — Tighten primary CTAs on the home page

`index.mdx` leads with two paired cards (Quickstart and App tour). The primary action for a brand-new reader is Quickstart; consider a full-width lead block for that alone with the tour as secondary.

## Priority 3 — housekeeping

Not visible to readers (build-excluded via `.mintignore`), so no user-facing impact. Clean up in a repo maintenance pass.

### P3.1 — Delete starter-kit leftovers at the repo root

`.mintignore` already excludes `development.mdx`, `essentials/`, `ai-tools/`, `api-reference/`, `docs/`. They're tracked in git from the initial Mintlify clone. Removing them tidies the repo but changes nothing in the built site. Left in place for now.

## Out of scope — handled elsewhere

These are other reviewers' domains:
- Writing voice / filler word scrub — writing-reviewer (done).
- Image alt text + media embeds — media-reviewer (done).
- Navigation and docs.json topology — organize-reviewer (done).
- SEO and AI discoverability — ai-seo-reviewer (done).
- Theme, colors, custom CSS — customize-reviewer (done).
- Internal linking patterns — linking-reviewer.
- Accessibility (contrast, keyboard, alt) — accessibility-reviewer.
- Content types / templates / page layouts — content-types, content-templates, page-layouts reviewers.
- Freshness policy and maintenance cadence — maintenance-reviewer.

## Validation

Run after applying P1 items:

```
mint validate
mint broken-links
```
