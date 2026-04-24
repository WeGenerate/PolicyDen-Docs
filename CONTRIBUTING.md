# Contribute to the PolicyDen docs

This repo is the source for [docs.policyden.com](https://docs.policyden.com). Pages are MDX, configured by `docs.json`, and deployed through Mintlify on push to `main`.

## How to contribute

### Edit on GitHub

1. Navigate to the page in GitHub.
2. Click the pencil icon to edit.
3. Open a pull request with your changes.

### Local development

1. Clone this repo and create a branch.
2. Install the Mintlify CLI: `npm i -g mint`.
3. Run `mint dev` from the repo root to preview at `http://localhost:3000`.
4. Commit your changes and open a pull request.

## How to add a new page

1. Confirm the page is already registered in `docs.json` navigation. Only add files whose path is in `docs.json` — pages not in `docs.json` are hidden from the sidebar.
2. Create the `.mdx` file at the path that matches its entry in `docs.json` (for example, `contacts/create-contacts` → `contacts/create-contacts.mdx`).
3. Add frontmatter with at least `title` and `description`:
   ```yaml
   ---
   title: "Create a contact"
   description: "Add a new contact and capture the details you need to follow up."
   ---
   ```
4. Lead with a 1–2 sentence intro that says what the page covers and what the reader will be able to do.
5. Cross-link related pages using root-relative paths without the extension: `/contacts/overview`, not `../contacts/overview.mdx`.
6. Run `mint dev` to preview, then `mint broken-links` and `mint validate` before pushing.

## Style notes

Keep the voice consistent with the rest of the docs.

- **Second person, active voice.** "You can add a contact." Not "Contacts can be added by users."
- **Sentence case, imperative verbs for task headings.** "Manage tasks", not "Managing tasks" or "Managing Tasks".
- **Bold UI elements on first reference.** Click **Add contact**. Go to **Settings → Profile**.
- **Monospace code for paths, URLs, config keys, filenames.** `docs.json`, `/contacts/overview`.
- **Code blocks need a language tag.** ` ```json `, ` ```bash `, ` ```mdx `.
- **Images need descriptive alt text.** Store images in `/images` and reference them as `/images/filename.png`.
- **No marketing language.** Skip "powerful", "seamless", "robust", "cutting-edge".
- **No filler.** Skip "simply", "just", "in order to", "it's important to note".
- **Use PolicyDen terminology.** PolicyDen (one word, capital P and D). Atlas (the AI assistant). Agents (sales role). Users (anyone with a login).

### Components

Prefer plain prose. Reach for a Mintlify component when it improves scannability:

| Need | Component |
| ---- | --------- |
| Sequential steps | `<Steps>` with `<Step title="...">` |
| Optional details | `<Accordion>` / `<AccordionGroup>` |
| Parallel options | `<Tabs>` / `<Tab>` |
| Linked navigation cards | `<Card>` inside `<Columns cols={2}>` |
| Callouts | `<Note>`, `<Info>`, `<Tip>`, `<Warning>`, `<Check>` |

### What we do not document

- Internal admin-only automation surfaces and integrations. These are not user-facing and are out of scope for user docs.
- Implementation details (Laravel controllers, database tables, queues, Vue internals).

If a feature overlaps with one of these, document only the user-facing surface. When in doubt, ask before writing.

## Checks to run before opening a pull request

From the repo root:

```bash
mint broken-links
mint validate
```

- `mint broken-links` — finds broken internal and external links.
- `mint validate` — strict build validation. Exits non-zero on any error or warning, including OpenAPI spec issues.

Both checks also run automatically on pull requests via `.github/workflows/mint-checks.yml`. A PR that fails either check should be fixed before merging.

## When the product changes

Update the docs in the same pull request as the product change whenever possible. It keeps context fresh and avoids drift.

If you find a page that no longer matches the app, open a PR to fix it or file an issue. Wrong documentation is worse than no documentation.
