# Style & tone deep pass — findings (task #21)

Max-effort review of all 37 MDX pages registered in `docs.json`, measured
against [Mintlify's style and tone guide](https://www.mintlify.com/docs/guides/style-and-tone).
Previous reviewers had already tightened voice; this pass layered a harder
consistency and clarity pass on top. Starter-kit files under `.mintignore`
were skipped.

## TL;DR

Docs are in strong shape. Voice is already second person, active, direct.
Three systemic issues remained and were fixed across the set:

1. **Gerund headings on settings pages** broke consistency with the rest of
   the docs (which are imperative). Normalized to imperatives so every
   task-style `##` / `###` reads as a promise the section keeps.
2. **Filler "actually"** crept into four intro paragraphs. Removed.
3. **Throat-clearing intros** ("This page covers…", "gives you one place
   to…") on two pages. Rewritten to lead with the user outcome.

One A/An grammar bug slipped through earlier passes; fixed.

## Pages changed

### Grammar / typo

- `settings/profile.mdx` — "a **Avatar updated successfully**" →
  "an **Avatar updated successfully**" (A/An agreement before vowel sound).

### Filler removal

- `customization/custom-fields.mdx` — removed "actually" in intro; removed
  "genuinely" in the Referral Source example (mild editorializing); cut the
  throat-clearing "This page covers using them day-to-day" — the rest of the
  intro already states the scope.
- `settings/agency-custom-fields.mdx` — removed "actually" in intro.
- `messages/overview.mdx` — removed "actually" from the Unread tip.
- `pipeline/configuring-pipeline.mdx` — removed "actually" from tips bullet.

### Throat-clearing intros rewritten

- `tasks/managing-tasks.mdx` — "This page covers the day-to-day work with
  tasks — from creating a follow-up to running bulk actions across your
  whole list." → "Create, edit, complete, reassign, and bulk-update tasks
  without leaving the Tasks page. Every action works inline on the list or
  from a task's detail page." Leads with the verbs and the surfaces instead
  of announcing the page.
- `policies/status-history.mdx` — "The Status log gives you one place to
  answer questions agents and admins run into every day:" → "Use the Status
  log to answer questions like:". Cuts the noun phrase preamble.

### Wordiness / mechanism-first phrasing

- `contacts/creating-contacts.mdx` — "This is the one safeguard against two
  agents creating duplicate records for the same client." → "That prevents
  two agents from creating duplicate records for the same client." Active,
  no copular construction.
- `contacts/exporting-contacts.mdx` — "Your file will download as
  `contacts.csv`." → "Your file downloads as `contacts.csv`." (present
  tense, matches the rest of the doc set).
- `contacts/exporting-contacts.mdx` — "PolicyDen streams the file directly
  to your browser and opens a download." → "PolicyDen builds the file and
  your browser starts the download." (Removed the streaming implementation
  detail; user-facing framing.)
- `navigating-the-app.mdx` — "pin it open with the pin icon if you want it
  to stay" → "click the pin icon to keep it open" (drops the hedge and
  makes the instruction direct).
- `settings/sms-numbers.mdx` — "the number is being blocked or flagged as
  spam" → "the number is blocked or flagged as spam" (trims passive
  progressive).

### Marketing softening

- `settings/templates.mdx` — "send a polished, personalized message in two
  clicks" → "send a personalized message in a couple of clicks". "Polished"
  was editorializing; "two clicks" implied a hard count.
- `settings/templates.mdx` — "Turn it **Off** to stop the template from
  running without deleting it" → "Turn it **Off** to pause the template
  without deleting it" (templates don't "run"; "pause" is the ordinary
  verb for the off state).

### Heading normalization (gerund → imperative)

Applied across the settings tab so headings read as promises rather than
noun phrases, matching the user-guide tab (which already uses imperatives).

- `settings/agency-overview.mdx` — "Opening agency settings" → "Open agency
  settings"
- `settings/users-and-roles.mdx` — "Inviting a user", "Changing a user's
  status", "Viewing a user's profile", "Importing users in bulk",
  "Searching users" → imperative forms.
- `settings/products-and-carriers.mdx` — "Adding a product", "Enabling and
  disabling products", "Editing or deleting a product", "Managing
  carriers", "Adding a carrier", "Enabling and disabling carriers",
  "Editing and deleting carriers", "Linking carriers to products" →
  imperative forms (also unified "and" → "or" where the options are
  mutually exclusive).
- `settings/sms-numbers.mdx` — "Adding a number", "Inspecting usage",
  "Editing or deleting a number", "Searching" → imperatives. Last one
  became "Search numbers" because bare "Search" is ambiguous.
- `settings/billing.mdx` — "Adding a card", "Managing cards", "Paying an
  unpaid invoice" → imperative forms.
- `settings/templates.mdx` — "Creating an email template", "Enabling and
  disabling email templates", "Editing or deleting an email template",
  "Creating an SMS template", "Enabling, editing, and deleting" →
  imperatives. Last one became "Enable, edit, or delete an SMS template"
  (it was bare before, now self-contained).
- `settings/agency-custom-fields.mdx` — "Opening custom fields", "Adding
  a field", "Organizing sections", "Editing or removing a field" →
  imperatives.
- `meetings/overview.mdx` — "Editing a meeting" → "Edit a meeting".

### Heading clarity

- `policies/overview.mdx` — "What a policy is in PolicyDen" → "What's on
  a policy". The old form parsed awkwardly; the section lists the fields a
  policy has, so the new heading promises and delivers.
- `policies/overview.mdx` — "You can export either:" → "You can export:"
  ("either" was redundant with the two-item list).

### Verified no-change (already nailing the voice)

- `index.mdx` — clean. Opening establishes product, audience, and the hub
  pattern.
- `quickstart.mdx` — tutorial structure intact; "Step N" numbering,
  prerequisites up front, summary before What's next.
- `contacts/overview.mdx`, `contacts/contact-profile.mdx`,
  `contacts/importing-contacts.mdx`, `contacts/bulk-actions.mdx` — in shape.
- `policies/policy-profile.mdx`, `policies/bulk-actions.mdx` — in shape.
- `pipeline/overview.mdx` — in shape.
- `tasks/overview.mdx` — in shape.
- `meetings/scheduling-meetings.mdx` — in shape; two-path pattern reads
  clearly.
- `messages/overview.mdx` — intro still tight; "## Archive a conversation"
  section now reads as a promise.
- `calls/overview.mdx` — "phone on every page" metaphor is crisp; table of
  widget states is a good move.
- `atlas/overview.mdx` — good example prompts; the "Just the ones in
  California" quoted example is user speech, not filler.
- `dashboard/overview.mdx`, `reports/overview.mdx` — in shape.
- `customization/saved-filters.mdx`, `customization/documents.mdx`,
  `customization/notes-and-comments.mdx` — in shape.
- `settings/password.mdx`, `settings/agency-overview.mdx` (after the
  heading change) — in shape.

## Systematic patterns noticed

- **Settings pages used gerund headings; everything else used
  imperatives.** Normalized to imperative. Writing-reviewer should enforce
  this going forward: any `##`/`###` that describes an action should
  promise the action ("Add a number"), not label the topic ("Adding a
  number").
- **"Actually" is the filler word that keeps showing up.** Mintlify's
  style guide calls out "simply", "just", "easily" — the PolicyDen prose
  trips on "actually" instead. Add it to the Vale dictionary when one gets
  wired up.
- **Intro "This page covers…" pattern** was localized to one page
  (tasks/managing-tasks). Watch for it on any new page that reviewers
  write; it's always cuttable.
- **Future-tense statements of app behavior** ("Your file will download")
  can almost always become present tense ("Your file downloads").
  Applied once; worth scanning new pages for.
- **Implementation-first verbs** ("streams the file", "is being blocked")
  slip in when someone paraphrases the backend. Push to user-facing framing
  ("your browser starts the download", "the number is blocked").
- **Noun-phrase section intros** ("The Status log gives you one place to
  answer questions…") read as labels, not promises. Prefer "Use X to…"
  openers when the section is a lookup surface.

## For the next reviewer (writing-reviewer or maintenance-reviewer)

- **Heading parity across tabs.** If a new settings page lands, verify its
  `##`/`###` headings are imperative-voice. The settings tab is now
  aligned; drift back to gerunds is the main risk.
- **Watch "actually".** It's the most reliable filler tell in this codebase.
- **Watch "This page covers…".** Same pattern, different surface.
- **Terminology drift between pages.** Already consistent for: Agent /
  Admin / Agency Owner, agency, PolicyDen, Atlas, Kanban board, SMS
  numbers. Re-check if new pages are added.
- **Overview-page intros** are all strong now; don't dilute them with
  marketing language in future edits.
- **Audit-log vs status-log distinction** on `policies/status-history.mdx`
  now reads cleanly. If either surface changes, keep the "status movement
  vs every edit" split explicit.
- **One page-structure flag carried over** from `CONTENT_TYPES.md`: the
  P-1 through P-6 hybrid-overview pages were intentionally left as hybrid
  by content-templates-reviewer. Voice is tight on all of them; the
  structural decision doesn't affect style and tone.

## Validation

- `mint broken-links` — see commit log.
- `mint validate` — see commit log.

No anchor links needed updating: the only `#slug` links in scope
(`#bulk-actions` and `#create-a-task` on `tasks/managing-tasks`) point
at headings that didn't change.
