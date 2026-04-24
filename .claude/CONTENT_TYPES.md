# Content-type classification

Classification of every MDX page in `/Users/mac/PolicyDen-Docs/` that ships in
`docs.json`, against Mintlify's content-type guide
(https://www.mintlify.com/docs/guides/content-types), which uses the four
Diátaxis types: **Tutorial**, **How-to**, **Reference**, **Explanation**.

This file lives under `.claude/` so Mintlify does not build it.

## Types used in this review

| Label | Diátaxis mapping | Meaning in PolicyDen docs |
| ----- | ---------------- | ------------------------- |
| **Tutorial** | Tutorial | Learning-oriented walkthrough for a new user. One prescriptive path, milestone-based, minimal alternatives. |
| **How-to** | How-to guide | Task-oriented. Assumes prerequisites; delivers an ordered set of steps to achieve a specific goal. `<Steps>` heavy. |
| **Reference** | Reference | Information-oriented. Describes the thing being documented (a page, a profile, a settings surface). Tables, field lists, consistent formatting. |
| **Overview (hub)** | Explanation | Landing / orientation page that introduces a feature area and links out to sibling pages via `<Card>` in `<Columns>`. |
| **Explanation** | Explanation | Concept-oriented. Explains *what* something is, *when* to reach for it, or *why* the product works this way (e.g. notes vs comments). |
| **Hybrid** | Mixed | The page intentionally combines two of the above. Common in single-page sections where no sibling how-to exists. |

Pages that classify as **Hybrid** list the dominant type first and the
secondary type in parentheses, e.g. `Overview (hub) + How-to`.

The starter-kit directories (`/docs/**`, top-level `/ai-tools/**`,
`/api-reference/**`, `/essentials/**`, `/snippets/**`, `development.mdx`) are
not registered in `docs.json` and are out of scope for this review.

## Classification table

| Path | Title | Content type | Structural match? | Notes |
| ---- | ----- | ------------ | ----------------- | ----- |
| `index.mdx` | Welcome to PolicyDen | Overview (hub) | ✅ | Lead paragraph + three `<Columns cols={2}>` groups of `<Card>` links. Textbook hub. |
| `quickstart.mdx` | Quickstart | Tutorial | ✅ | "This guide walks you through your first session." Prerequisites, five labelled `Step` blocks, one prescriptive path, ends with cross-links. |
| `navigating-the-app.mdx` | Navigating the app | Reference | ✅ | Describes sidebar, top bar, list UI, profile layout, shortcuts. Tables + accordion groups. Correctly scannable. |
| `contacts/overview.mdx` | Contacts overview | Overview (hub) + Reference | ✅ | Describes the Contacts list surface (toolbar, filters, columns). Links out to sibling how-tos. Dual role is intentional. |
| `contacts/creating-contacts.mdx` | Creating contacts | How-to | ✅ | Three labelled steps, duplicate detection, `<ParamField>` for required fields. |
| `contacts/contact-profile.mdx` | Contact profile | Reference | ✅ | Describes the profile's two-column layout, header, tabs, right-column accordions. Classic Reference. |
| `contacts/importing-contacts.mdx` | Importing contacts | How-to | ✅ | Prerequisites → required fields table → `<Steps>` → results. |
| `contacts/exporting-contacts.mdx` | Exporting contacts | How-to | ✅ | Four-step sequence with `<Tabs>` for selection mode. |
| `contacts/bulk-actions.mdx` | Bulk actions | How-to | ✅ | Admin preamble + Assign + Archive, each with `<Steps>`. |
| `policies/overview.mdx` | Policies overview | Overview (hub) + How-to | ⚠️ | Hybrid. Describes the list, presets, filters, sort — and then embeds a **Create a policy** `<Steps>` block. Inconsistent with Contacts, where creation lives on `/contacts/creating-contacts`. See flag P-1. |
| `policies/policy-profile.mdx` | Policy profile | Reference | ✅ | `<ResponseField>` for every identifying field, plus descriptive sections for details, Medicare extras, audit log. |
| `policies/status-history.mdx` | Status log | Reference + Explanation | ✅ | Mostly describes the log. Small "Why it matters" section adds concept context — acceptable. |
| `policies/bulk-actions.mdx` | Policies bulk actions | How-to | ✅ | Admin preamble, "How it works" `<Steps>`, Assign and Archive sub-sections. |
| `pipeline/overview.mdx` | Pipeline overview | Overview (hub) + How-to | ⚠️ | Hybrid. Card reference + **Move a contact between stages** and **Add a deal** `<Steps>`. No sibling how-to exists for these. See flag P-2. |
| `pipeline/configuring-pipeline.mdx` | Configuring the pipeline | How-to | ✅ | Prerequisites + `<Steps>` blocks for add / rename / reorder / delete. |
| `tasks/overview.mdx` | Tasks overview | Reference | ✅ | Describes presets, columns, filter UI, row actions. Table-heavy. |
| `tasks/managing-tasks.mdx` | Managing tasks | How-to | ✅ | Task hub: create, edit, complete, reassign, delete, bulk. Each sub-task uses `<Steps>` or `<Tabs>`. |
| `meetings/overview.mdx` | Meetings overview | Reference + Overview (hub) | ✅ | Describes where meetings live + field table + editing instruction. Links out to `/meetings/scheduling-meetings`. |
| `meetings/scheduling-meetings.mdx` | Scheduling meetings | How-to | ✅ | Prerequisites, two entry paths (`<Steps>` each), all-day + attachments + tips. |
| `messages/overview.mdx` | Messages overview | Overview (hub) + How-to | ⚠️ | Hybrid. Describes the inbox **and** embeds **Send a message** and **Mark conversations as read** `<Steps>`. No sibling how-to. See flag P-3. Contains one `{/* TODO */}` marker for unverified archive UI. |
| `calls/overview.mdx` | Calls overview | Overview (hub) + How-to | ⚠️ | Hybrid. Widget description + outbound, incoming, and recording `<Steps>`. No sibling how-to. See flag P-4. |
| `atlas/overview.mdx` | Atlas overview | Overview (hub) + How-to | ⚠️ | Hybrid. Describes Atlas + **Ask a question** `<Steps>` + history management. No sibling how-to. See flag P-5. |
| `dashboard/overview.mdx` | Dashboard overview | Reference | ✅ | Describes tiles, chart, performance table, high-risk table. One small `<Steps>` block describing the performance-table UI is consistent with Reference. |
| `reports/overview.mdx` | Reports overview | How-to (task-hub) | ⚠️ | Named "overview" but structurally a how-to hub: Pick a date range + Choose a breakdown + Filter + Save + Share + Delete + Export, each with `<Steps>`. See flag P-6. |
| `customization/custom-fields.mdx` | Custom fields | How-to + Reference | ✅ | Field-type table + fill-in / column / filter how-to sub-sections. |
| `customization/saved-filters.mdx` | Saved filters | How-to | ✅ | Save, Use, Edit, Share, Delete each with `<Steps>`. |
| `customization/documents.mdx` | Documents | How-to | ✅ | Location table + Upload / Download / Rename / Delete actions. |
| `customization/notes-and-comments.mdx` | Notes and comments | Explanation + How-to | ✅ | Comparison table → "Which one should I use?" accordion → embedded Add-note / Add-comment `<Steps>`. Explanation-dominant. |
| `settings/profile.mdx` | Your profile | How-to + Reference | ✅ | Upload-photo `<Steps>` + `<ParamField>` describing each profile field. |
| `settings/password.mdx` | Password | How-to + Troubleshooting | ✅ | Five-step update + requirements + `<AccordionGroup>` titled **Troubleshooting**. The only dedicated troubleshooting surface in the current docs set. |
| `settings/agency-overview.mdx` | Agency settings overview | Overview (hub) | ✅ | Info callout + `<Columns>` of six Cards + "A typical setup order" `<Steps>`. Hub-first. |
| `settings/users-and-roles.mdx` | Users and roles | How-to + Reference | ✅ | Invite `<Steps>` + built-in roles table + status, profile, import, search sections. |
| `settings/products-and-carriers.mdx` | Products and carriers | How-to | ✅ | Add-product / Add-carrier / Manage-carriers `<Steps>` blocks. |
| `settings/sms-numbers.mdx` | SMS numbers | How-to + Reference | ✅ | Add-number `<Steps>` + active/inactive + usage field list. |
| `settings/templates.mdx` | SMS and email templates | How-to | ✅ | Two parallel `<Steps>` flows (email, SMS) + shared enable/edit/delete + tips accordion. |
| `settings/agency-custom-fields.mdx` | Agency custom fields | How-to + Reference | ✅ | Field-type table + Add-field / Organize-sections `<Steps>`. |
| `settings/billing.mdx` | Billing | How-to + Reference + Troubleshooting | ✅ | Billing-overview cards (Reference) + card / invoice `<Steps>` + Troubleshooting accordion. |

Totals by primary type (counting the first type listed for hybrids):

- **Tutorial**: 1
- **How-to**: 17
- **Reference**: 5
- **Overview (hub)**: 8
- **Explanation**: 1
- **Hybrid with how-to as secondary**: 5 (P-1 – P-5 flags below)

## Structural mismatches to flag

These are cases where the page's structure doesn't cleanly match any single
Diátaxis type and a future split would improve alignment. None are
straightforward to fix in-place without changes to `docs.json` and sibling
content, so they are documented here for `content-templates-reviewer` and
`writing-reviewer` to weigh in on.

### P-1 · `policies/overview.mdx` embeds creation flow

The Contacts section keeps creation on `/contacts/creating-contacts` and the
overview is orientation-only. Policies break that pattern: the overview
contains a full **Create a policy** `<Steps>` block. Two clean options:

- Move the Create a policy steps into a new `/policies/creating-policies`
  page and reduce the overview to a link.
- Accept the hybrid. The page is already well-sectioned and reads cleanly.

### P-2 · `pipeline/overview.mdx` embeds board how-tos

Overview embeds **Move a contact between stages** and **Add a deal**
`<Steps>`. Either promote these into a dedicated
`/pipeline/working-the-board` page, or leave as a hybrid.

### P-3 · `messages/overview.mdx` embeds inbox how-tos

Overview embeds **Send a message** and **Mark conversations as read**
`<Steps>`. A future `/messages/sending-messages` could absorb these. Also
contains a live `{/* TODO */}` marker about archive/unarchive UI.

### P-4 · `calls/overview.mdx` embeds call how-tos

Overview embeds **Place an outbound call**, **Answer an incoming call**, and
**Call recordings** `<Steps>` — enough material to seed a
`/calls/making-calls` sibling.

### P-5 · `atlas/overview.mdx` embeds ask-a-question how-to

Overview embeds **Ask a question** `<Steps>` plus history-management
sub-sections. Candidate split: `/atlas/asking-questions`.

### P-6 · `reports/overview.mdx` is a task-hub, not an overview

Despite the filename, the page is dominated by `<Steps>` blocks covering date
range, breakdown, filter, save, share, delete, and export — matching the
`tasks/managing-tasks` task-hub pattern. Options:

- Rename title to something like **Reports** (drop "overview"); keep the
  slug and nav. Title-only change, no `docs.json` edits.
- Split into `/reports/overview` (tile reference) + `/reports/building-reports`
  (the how-to content). Heavier.

Agreed resolution with `content-templates-reviewer`: take the title-only
rename. Deferred to `writing-reviewer` to land alongside the voice/title
pass.

## Cross-cutting notes

- **Overview-named pages that are single-section hubs** (`atlas/overview`,
  `calls/overview`, `messages/overview`, `pipeline/overview`) share the same
  hybrid pattern. The pattern is acceptable given there is no sibling content
  in those sections, but the template in use should explicitly support
  "Overview + inline how-to" so it doesn't read as off-template.
- **User-docs pages use tables, not API-ref components, for field
  descriptions**: `<ParamField>` and `<ResponseField>` are reserved for API
  reference. DOCS_BRIEF already calls these out as "rare for user docs". As
  of the task #15 template pass, `contacts/creating-contacts`,
  `policies/policy-profile`, and `settings/profile` have been switched from
  `<ParamField>` / `<ResponseField>` blocks to Markdown tables.
- **Reference pages use consistent moves**: Markdown tables for fields and
  fixed enumerations, `<AccordionGroup>` for expand/collapse sections,
  `<Frame>` for screenshots. That convention is already strong and worth
  codifying in a template.
- **Troubleshooting sections** only exist on `settings/password.mdx` and
  `settings/billing.mdx`. If the team wants Troubleshooting as a recognized
  content type, the current `<AccordionGroup>` pattern is a good base.
- **Every page ends with a "What's next" `<Columns cols={2}>`** of `<Card>`
  components. This is consistent across types and is a good fit for both
  Overview and How-to; leave as-is.
- **Frontmatter**: `title` and `description` are present on every page. Only
  top-level pages (`index`, `quickstart`, `navigating-the-app`) and first
  pages in each group use `keywords`. Not a content-type issue but worth
  flagging for the AI-optimization review.

## Fixes applied in this pass

None by `content-types-reviewer` directly. Every observed mismatch touches
sibling pages, navigation, or titles and needs coordination with
`content-templates-reviewer` (task #15) and `writing-reviewer`. Flags P-1
through P-6 were forwarded in the handoff messages.

Follow-on edits applied during task #15 by `content-templates-reviewer`:

- `contacts/creating-contacts.mdx` — `<ParamField>` block replaced with a
  Markdown table (how-to template does not use API-ref components).
- `policies/policy-profile.mdx` — `<ResponseField>` block replaced with a
  Markdown table.
- `settings/profile.mdx` — `<ParamField>` block replaced with a Markdown
  table.
- `navigating-the-app.mdx` — added a "What's next" `<Columns>` + `<Card>`
  section to match the site-wide convention.
- `quickstart.mdx` — added a one-sentence learning summary above "What's
  next" to match the Mintlify tutorial template.

`mint validate` and `mint broken-links` both pass after those edits.
