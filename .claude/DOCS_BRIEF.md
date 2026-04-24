# PolicyDen docs — teammate brief

You're writing user-facing documentation for PolicyDen (a health-insurance CRM for agencies). Read this brief before starting.

## Paths

- **Docs repo (where you write):** `/Users/mac/PolicyDen-Docs` on `main` branch.
- **App source code (for reference only):** `/Users/mac/PolicyDen-App` on `dev` branch — this is the source of truth for the current app state. Do NOT edit anything in this repo.
- **Vue pages:** `resources/js/pages/<feature>/`
- **Controllers:** `app/Http/Controllers/<Feature>Controller.php`
- **Routes:** `routes/web.php`, `routes/admin.php`, `routes/settings.php`

## Audience

Documentation written for everyone is useful to no one. Pick a primary reader before you write, and lean on the voice and examples that fit them.

### Who reads PolicyDen docs

The app ships three roles: **Agent**, **Admin**, and **Agency Owner** (see [Users and roles](/settings/users-and-roles)). Match those names exactly when you refer to a role — don't invent new ones.

| Audience | Who they are | What they need from docs |
| -------- | ------------ | ------------------------ |
| **Agents** | Day-to-day sellers. The role most users hold. Default audience for the User guide tab. | Task-oriented steps: add a contact, log a policy, text a client, move a pipeline card. Short, scannable, screenshot-led. |
| **Admins** | Team leads who usually sell too, plus configure users, products, templates, SMS numbers, and custom fields. | Agent-level content, plus admin-only actions (import, bulk actions, Reports) and the Agency settings tab. Assume they know the basics. |
| **Agency Owners** | The buyer persona. Owns billing and the agency's configuration. Superset of Admin. | Everything Admins see, plus billing, ownership, and quick confirmation that something is possible or configurable. |
| **Returning users** | Any role, searching for a specific control, label, or edge case. | Focused reference — one answer per page, exact UI labels, the TL;DR in the first paragraph. |

### Which tab is for whom

- **User guide** tab — default audience is agents. Admin-only actions on agent-facing lists (Contacts import, Reports nav, SMS numbers links) get called out inline with an `<Info>` callout or an "admins only" note.
- **Admin and settings** tab — audience is Admins and Agency Owners. Don't re-explain agent workflows here; link back to the User guide when you need to.

### Calling out audience on a page

- The 1–2 sentence intro should make the audience obvious in plain words: *"If you're an admin…"*, *"Agents can…"*, *"Agency Owners manage…"*.
- Admin-only pages or sections get an `<Info>` callout near the top: *"Visible to admins only."*
- Destructive or billing-affecting controls get a `<Warning>` that names who can see them.
- Cross-audience pages (Dashboard, Contacts overview) call out each admin-only control inline rather than banner-gating the whole page.

### Vocabulary

- **Agent** — the sales role. Use for sales-facing copy: *"Agents see their own numbers on the Dashboard."* Capitalize when referring to the literal role name; lowercase when referring to the person (*"ask your agent"*).
- **User** — anyone with a PolicyDen login, regardless of role. Use when role doesn't matter: *"Each user picks their own column set."*
- **Admin**, **Agency Owner** — literal role names, always capitalized. Lowercase only when the reader is thinking of the person (*"ask your agency admin to invite you"*).
- **Your agency** — the reader's organization. Avoid "the agency" or "the company".

### When to revisit

- Shipping a feature that changes what a role can do (for example, giving agents access to Reports).
- Support keeps fielding the same "can I see this?" question — the audience call-out is probably missing or wrong.
- Adding a new role. Update this section before you write the feature docs.

## What to exclude (do not mention, ever)

- **Internal admin-only automation surfaces and integrations.** The agency app has several internal-only admin surfaces that users never touch directly. These are out of scope for user docs; do not describe them.
- **Implementation details** — Laravel controllers, Vue internals, database tables, queue workers, and any other back-end plumbing.

If a user-facing feature is tangled with one of these internal surfaces, describe only the user-facing surface. When in doubt, leave it out and ask the team lead.

## Mintlify rules

- **Invoke the `mintlify` skill** before writing your first page so you follow current best practices.
- Every page needs frontmatter with `title` and `description`.
- Sentence case for headings ("Managing tasks", not "Managing Tasks").
- Second-person voice ("you"). Active voice. Direct language.
- No marketing language ("powerful", "seamless", "robust").
- No filler ("it's important to note", "in order to", "simply", "just").
- Root-relative internal links without extension: `/contacts/overview`, not `../contacts/overview.mdx`.
- Code blocks need language tags.
- Images need descriptive alt text.
- All new pages must be referenced in `docs.json` navigation — the lead already registered every page you own in `docs.json`. Only create files whose paths are already in `docs.json`.

## Preferred components

| Need | Component |
| ---- | --------- |
| Sequential steps | `<Steps>` with `<Step title="...">` |
| Optional details | `<Accordion>` / `<AccordionGroup>` |
| Parallel options | `<Tabs>` / `<Tab>` |
| Linked navigation cards | `<Card>` inside `<Columns cols={2}>` |
| Callouts | `<Note>` (FYI), `<Info>` (helpful context), `<Tip>` (best practice), `<Warning>` (destructive), `<Check>` (confirmation) |
| Parameters / fields | `<ParamField>` / `<ResponseField>` (rare for user docs) |

Do not overuse components. Plain prose is usually best; reach for a component when it improves scannability.

## Voice and structure

- Lead each page with a 1–2 sentence intro: what this page is about and what the reader will be able to do.
- When describing a task, put prerequisites first, then steps, then "what's next".
- Bold UI elements on first reference: **Add contact**, **Settings → Profile**.
- Monospace code for paths, URLs, config keys: `docs.json`, `/contacts/overview`.

## Referencing the app

When you describe a feature, open the related Vue page and controller to verify:

- UI button labels, tab names, and modal titles come from the Vue files. Use what the code actually shows.
- Workflow steps (create → save → see in list) come from the controller's routes and the Vue components.
- If you are unsure about exact wording, leave a `{/* TODO: verify "Add contact" vs "New contact" */}` marker. Don't invent.

## Shared conventions across pages

- The agency brand is always **PolicyDen** (one word, capital P and D).
- The AI assistant is **Atlas** (capital A, one word).
- Users are called **agents** when we mean the sales role, **users** when we mean anyone with a login.
- Top-level pages use a short overview format; deeper pages use focused "how to" structure.

## Linking between sections

Cross-link liberally:

- From "Contacts overview" → "Policies overview" when discussing a client's book.
- From "Tasks overview" → "Meetings" when describing scheduling.
- From "Messages overview" → "SMS numbers" setting page.

## When you're done with a page

1. Save the file.
2. Re-check frontmatter has `title` and `description`.
3. Re-check every internal link points to a page that's in `docs.json`.
4. Mark your task completed via `TaskUpdate`.
5. Pick up the next open task on your list.

## Working together

- Tasks are shared across the team. Claim one before starting by setting `owner` via `TaskUpdate`.
- When you finish, check the task list for another unclaimed task in your area.
- Send a message to `team-lead` (the orchestrator) when you finish all your assigned work or hit a blocker.
