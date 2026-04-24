# PolicyDen docs — agent instructions

This is a Mintlify documentation site for **PolicyDen**, a health-insurance CRM for agencies. Pages are MDX with YAML frontmatter; site config lives in `docs.json`.

## Before you write

- Read `.claude/DOCS_BRIEF.md` for the full teammate brief (voice, structure, exclusions).
- Read `CONTRIBUTING.md` for how to add a page, style notes, and checks to run.
- Read `docs.json` to see which pages exist and how the navigation is organized. Only create files whose path is already in `docs.json` — pages not in `docs.json` are hidden.
- Read 2–3 sibling pages before writing to match voice, structure, and level of detail.

## Project terminology

- **PolicyDen** — one word, capital P and D. Always.
- **Atlas** — the AI assistant, capital A, one word.
- **Agents** — the sales role (the people who use the CRM to sell policies).
- **Users** — anyone with a login (includes agents, admins, support staff).

## Content boundaries — do not document

- Internal admin-only automation surfaces and integrations that users don't touch directly.
- Implementation details (Laravel controllers, database tables, queue workers, Vue internals).

If a feature overlaps with one of these, document only the user-facing surface. When in doubt, ask the team lead before writing.

## Style

- Second-person voice, active voice, direct language.
- Sentence case for headings, imperative verbs for task headings: "Manage tasks", not "Managing tasks" or "Managing Tasks".
- Frontmatter requires `title` and `description` on every page.
- Bold UI elements on first reference: **Add contact**, **Settings → Profile**.
- Monospace code for paths, URLs, config keys: `docs.json`, `/contacts/overview`.
- Root-relative internal links without the extension: `/contacts/overview`, not `../contacts/overview.mdx`.
- Code blocks always need a language tag.
- Images always need descriptive alt text.
- No marketing language ("powerful", "seamless", "robust"). No filler ("simply", "just", "in order to").

## Referencing the app

The source of truth for the current app is `/Users/mac/PolicyDen-App` on the `dev` branch. Read it — never edit it.

- Vue pages: `resources/js/pages/<feature>/`
- Controllers: `app/Http/Controllers/<Feature>Controller.php`
- Routes: `routes/web.php`, `routes/admin.php`, `routes/settings.php`

Verify UI labels, tab names, and modal titles from the Vue source. If you are unsure about exact wording, leave `{/* TODO: verify "X" vs "Y" */}` — do not invent.

## Checks to run

Before finishing a page:

```bash
mint broken-links
mint validate
```

Both also run on pull requests via `.github/workflows/mint-checks.yml`.

## When you finish a page

1. Check frontmatter has `title` and `description`.
2. Check every internal link points to a page in `docs.json`.
3. Run `mint broken-links` and `mint validate`.
4. Mark your task completed via `TaskUpdate`.
5. Pick up the next open task on your list, or message `team-lead` if you are done.
