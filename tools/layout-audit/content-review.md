# Source layout review

Reviewed 2026-10-29 on `docs/app-guides-refresh`. Scope: root documentation repository only; nested `docs` gitlink and app source were not traversed. This report is the only file written by this review. Existing working changes were preserved. No commits, pushes, external messages, or content edits were made.

Read `AGENTS.md`, `.claude/DOCS_BRIEF.md`, `CONTRIBUTING.md`, `docs.json`, `.mintignore`, and `.mintlify/product-brief.md`. The explicit task restrictions take precedence over older brief guidance. No access control, audience chooser, or onboarding tutorial changes are proposed.

## Coverage and method

All **118 navigation pages** were scanned for component structure, heading hierarchy, table cell counts, grid population, media wrappers, captions, and block boundaries. The inventory below gives exact source line anchors for every page. Counts exclude fenced code examples and imported snippet expansion where applicable; opening component tags count instances, not closing tags. The four non-navigation snippets were also read: `who-everyone.mdx`, `who-admins.mdx`, `who-field-agent.mdx`, and `snippet-intro.mdx`. The first three each contain one Info callout at line 1; the fourth contains ordinary prose. They are not added to page totals. Ignored draft/audience pages and starter-kit directories were excluded as specified by `.mintignore`.

This is a **source audit**, not a pixel or browser audit. No claim is made about measured gutters, baseline offsets, rendered line wrapping, mobile overflow, or computed margins. The parent's runtime audit must establish those. Whitespace indentation in MDX is not itself proof of visible indentation.

## Component totals

| Component | Instances |
| --- | ---: |
| CardGroup | 93 |
| Columns | 2 |
| Card | 237 |
| Steps | 93 |
| Step | 425 |
| Frame | 121 |
| img | 119 |
| video | 23 |
| AccordionGroup | 81 |
| Accordion | 262 |
| Info | 70 |
| Warning | 26 |
| Note | 5 |
| Tip | 3 |
| Check | 0 |
| tables | 42 |
| headings | 518 |

## Findings and minimal recommendations

### 1. No confirmed structural layout break in source

The scan found no mismatched/unclosed native layout component tags, no table rows with a different pipe-delimited column count from their table header, and no heading-level jumps. Native CardGroup/Columns, Steps/Step, Frame, callout and accordion structures should remain native. Do not replace these with custom layouts merely to impose uniform page composition. Short references without body headings are valid; the frontmatter title supplies the page heading.

### 2. Partially filled two-column grids: verify last-row treatment, do not pad content

Nine existing grids contain an odd number of cards. This is a concrete source condition, **not a confirmed visual defect**. Each leaves a single card in its final two-column row. Check that this card retains the same width, padding and alignment as earlier cards. Minimal change if the runtime audit finds a defect: adjust the shared grid styling while retaining the requested two-column native pattern. Do not invent another card or rewrite copy merely to fill a row.

| Path | Grid opening line | Cards |
| --- | ---: | ---: |
| `atlas/overview.mdx` | 15 | 3 |
| `pipeline/overview.mdx` | 21 | 3 |
| `pipeline/managing-deals.mdx` | 79 | 3 |
| `tasks/overview.mdx` | 15 | 3 |
| `meetings/overview.mdx` | 20 | 3 |
| `messages/overview.mdx` | 15 | 3 |
| `settings/wallet.mdx` | 21 | 3 |
| `compliance/overview.mdx` | 15 | 3 |
| `api/overview.mdx` | 56 | 5 |

### 3. Step-to-media block formatting is inconsistent

The following Frames immediately follow prose without a blank separator. Several also use eight-space Frame indentation with a two-space image child. This is a maintainability inconsistency, not evidence that MDX renders a bad margin. Minimal optional cleanup: add one blank line before Frame and align Frame/image indentation to the containing Step. Preserve containment, captions and media. Runtime spacing fixes belong in shared styling if the compiled output already consists of separate blocks.

| Path | Frame opening line |
| --- | ---: |
| `getting-started/sign-in.mdx` | 21 |
| `getting-started/setup-checklist.mdx` | 19 |
| `getting-started/notifications-and-alerts.mdx` | 16 |
| `customization/notes-and-comments.mdx` | 16 |
| `customization/documents.mdx` | 21 |
| `policies/creating-policies.mdx` | 27 |
| `policies/creating-policies.mdx` | 43 |
| `policies/policy-profile.mdx` | 18 |
| `policies/status-history.mdx` | 21 |
| `policies/attaching-plans.mdx` | 22 |
| `pipeline/configuring-pipeline.mdx` | 34 |
| `meetings/scheduling-meetings.mdx` | 18 |
| `contacts/importing-contacts.mdx` | 25 |
| `contacts/bulk-actions.mdx` | 27 |
| `policies/bulk-actions.mdx` | 24 |

Additional unusually indented prose occurs at `api/relationships.mdx:206`, `:210`, and `:267` (eight spaces versus surrounding Tab prose at four). Normalize only if touching this source; verify compiled output before treating it as a displayed code block or spacing defect. No prose rewrite is needed.

### 4. Media and captions: reserve sizing in shared rendering if necessary

121 Frames contain 119 img elements and 23 video elements; video/image fallback pairs account for the excess media count. 39 Frames have a caption attribute and 82 omit it. Missing captions are not defects: adding redundant captions would change page rhythm and content without evidence. All media use native Frames; no inline width/height or local layout styles were found in these pages.

Check loading-state layout shift, fallback exclusivity, and caption width against the associated media in the runtime audit. If a defect is measured, reserve the real media aspect ratio and keep the caption inside its Frame using shared styles or actual intrinsic dimensions. Do not apply a single fixed image height across different screenshots. Preserve the rejected onboarding tutorial's absence in `workflows/onboard-a-new-agent.mdx`.

### 5. Tables: no malformed row structure; target mobile overflow checks

All 42 tables have consistent column counts. Prioritize `start/roles.mdx:11` (five columns and long role labels), `reports/metrics-and-columns.mdx:9` (four prose-heavy columns), `api/authentication.mdx:45` (scope reference), and the API endpoint/validation tables in the inventory for narrow-viewport testing. These are risk locations, not established overflow failures. Minimal fix if needed: a scrollable table container and wrapping of long tokens within cells, preserving native headers and row semantics. Do not flatten tables into arbitrary cards or rewrite labels.

### 6. Accordions, callouts, and headings

81 AccordionGroups and 262 Accordions have balanced wrappers; standalone tutorial-transcript Accordions are intentional and need not be grouped just for consistency. Callouts are balanced. No source-level correction is warranted for these families. Check their shared left/right edges against prose and Frames in the parent's runtime report, including nested Step callouts in `api/make-your-first-request.mdx` and transcript Accordions on the two existing tutorial pages.

## Full page inventory

Numbers after `@` are source lines. Component counts include their children; anchors identify containers, headings, tables and callouts. This is the review snapshot; concurrent edits can move line numbers.

| Page | Component counts | Layout anchors |
| --- | --- | --- |
| `index.mdx` | headings 3 | H2@9, H2@13, H2@23 |
| `quickstart.mdx` | Steps 1, Step 4, headings 2 | H2@10, Steps@14, H2@31 |
| `navigating-the-app.mdx` | Frame 1, img 1, CardGroup 1, Card 6, tables 1, headings 3 | Frame@9, H2@13, CardGroup@15, H2@24, H2@32, Table@34 |
| `getting-started/sign-in.mdx` | Steps 1, Step 4, Frame 1, img 1, AccordionGroup 1, Accordion 3, CardGroup 1, Card 2, headings 5 | H2@13, Steps@18, Frame@21, H2@36, H2@42, H2@46, AccordionGroup@48, H2@60, CardGroup@62 |
| `getting-started/set-up-your-account.mdx` | Frame 1, video 1, Accordion 5, Steps 1, Step 7, AccordionGroup 1, CardGroup 1, Card 2, headings 5 | H2@14, Frame@18, H2@42, Steps@48, H2@76, H2@80, AccordionGroup@82, H2@99, CardGroup@101 |
| `getting-started/setup-checklist.mdx` | Info 1, Steps 1, Step 6, Frame 1, img 1, AccordionGroup 1, Accordion 3, CardGroup 1, Card 2, headings 4 | Info@7, H2@11, Steps@16, Frame@19, H2@42, H2@46, AccordionGroup@48, H2@60, CardGroup@62 |
| `getting-started/notifications-and-alerts.mdx` | Steps 1, Step 3, Frame 1, img 1, AccordionGroup 1, Accordion 3, CardGroup 1, Card 2, headings 4 | Steps@13, Frame@16, H2@30, H2@36, H2@40, AccordionGroup@42, H2@54, CardGroup@56 |
| `workflows/work-a-new-lead.mdx` | Info 1, Frame 5, img 5, video 1, AccordionGroup 1, Accordion 2, CardGroup 1, Card 2, headings 8 | Info@7, H2@11, H2@16, Frame@20, H2@26, Frame@37, H2@43, Frame@49, H2@56, Frame@60, H2@66, Frame@70, H2@76, AccordionGroup@78, H2@87, CardGroup@89 |
| `workflows/follow-up-with-your-book.mdx` | Info 1, Frame 5, img 5, video 1, AccordionGroup 1, Accordion 2, CardGroup 1, Card 2, headings 8 | Info@7, H2@11, H2@16, Frame@20, H2@26, Frame@30, H2@36, Frame@40, H2@46, Frame@50, H2@56, Frame@60, H2@67, AccordionGroup@69, H2@78, CardGroup@80 |
| `workflows/run-a-dialer-shift.mdx` | Info 1, Frame 2, img 2, AccordionGroup 1, Accordion 2, CardGroup 1, Card 2, headings 8 | Info@7, H2@11, H2@16, H2@28, H2@38, H2@48, Frame@52, H2@58, Frame@64, H2@70, AccordionGroup@72, H2@81, CardGroup@83 |
| `workflows/buy-and-work-marketplace-leads.mdx` | Info 1, Warning 1, Frame 3, img 3, AccordionGroup 1, Accordion 2, CardGroup 1, Card 2, headings 7 | Info@7, H2@11, H2@17, Warning@21, Frame@23, H2@29, Frame@35, H2@41, H2@47, Frame@51, H2@57, AccordionGroup@59, H2@68, CardGroup@70 |
| `workflows/set-up-your-solo-account.mdx` | Info 1, Frame 5, img 5, AccordionGroup 1, Accordion 2, CardGroup 1, Card 2, headings 8 | Info@7, H2@11, H2@16, Frame@20, H2@26, Frame@30, H2@36, Frame@42, H2@48, Frame@54, H2@60, Frame@64, H2@70, AccordionGroup@72, H2@81, CardGroup@83 |
| `workflows/set-up-your-agency.mdx` | Info 1, Frame 6, video 1, Accordion 3, img 5, AccordionGroup 1, CardGroup 1, Card 2, headings 10 | Info@7, H2@12, Frame@16, H2@42, H2@48, Frame@52, H2@58, Frame@64, H2@70, Frame@76, H2@82, Frame@86, H2@92, H2@102, Frame@110, H2@116, AccordionGroup@118, H2@127, CardGroup@129 |
| `workflows/onboard-a-new-agent.mdx` | Info 1, Frame 5, img 5, AccordionGroup 1, Accordion 2, CardGroup 1, Card 2, headings 8 | Info@7, H2@11, H2@17, Frame@21, H2@27, Frame@33, H2@39, Frame@43, H2@49, Frame@56, H2@62, Frame@68, H2@74, AccordionGroup@76, H2@85, CardGroup@87 |
| `workflows/review-team-performance.mdx` | Info 1, Frame 6, img 6, AccordionGroup 1, Accordion 2, CardGroup 1, Card 2, headings 9 | Info@7, H2@11, H2@16, Frame@20, H2@26, Frame@30, H2@36, Frame@42, H2@48, Frame@54, H2@60, Frame@64, H2@70, Frame@76, H2@82, AccordionGroup@84, H2@93, CardGroup@95 |
| `dashboard/overview.mdx` | Frame 2, img 2, CardGroup 1, Card 4, headings 2 | Frame@9, H2@13, CardGroup@15, H2@22, Frame@33 |
| `dashboard/live-leaderboard.mdx` | Info 1, Steps 1, Step 4, Frame 1, img 1, AccordionGroup 1, Accordion 3, CardGroup 1, Card 2, headings 3 | Info@7, Steps@11, Frame@26, H2@30, H2@36, AccordionGroup@38, H2@50, CardGroup@52 |
| `atlas/overview.mdx` | Frame 1, img 1, CardGroup 1, Card 3, headings 2 | Frame@9, H2@13, CardGroup@15, H2@21 |
| `atlas/ask-atlas.mdx` | Info 1, Steps 1, Step 5, Frame 1, video 1, img 1, AccordionGroup 1, Accordion 3, CardGroup 1, Card 2, headings 3 | Info@7, Steps@11, Frame@29, H2@34, H2@40, AccordionGroup@42, H2@54, CardGroup@56 |
| `contacts/overview.mdx` | Frame 1, img 1, CardGroup 1, Card 6, headings 2 | Frame@9, H2@15, CardGroup@17, H2@26 |
| `contacts/filtering-contacts.mdx` | Steps 1, Step 6, Frame 1, video 1, img 1, AccordionGroup 1, Accordion 3, CardGroup 1, Card 2, headings 3 | Steps@13, Frame@25, H2@47, H2@51, AccordionGroup@53, H2@65, CardGroup@67 |
| `contacts/creating-contacts.mdx` | Steps 1, Step 6, Frame 1, video 1, img 1, AccordionGroup 1, Accordion 3, CardGroup 1, Card 2, headings 4 | H2@13, Steps@18, Frame@22, H2@46, H2@50, AccordionGroup@52, H2@64, CardGroup@66 |
| `contacts/contact-profile.mdx` | Frame 1, video 1, img 1, CardGroup 1, Card 6, headings 2 | Frame@9, H2@18, CardGroup@20, H2@31 |
| `contacts/editing-contact-details.mdx` | Steps 1, Step 5, Frame 1, img 1, Note 1, AccordionGroup 1, Accordion 3, CardGroup 1, Card 2, headings 3 | Steps@13, Frame@20, Note@39, H2@41, H2@45, AccordionGroup@47, H2@59, CardGroup@61 |
| `customization/notes-and-comments.mdx` | Info 1, Steps 2, Step 8, Frame 1, video 1, img 1, Warning 1, AccordionGroup 1, Accordion 3, CardGroup 1, Card 2, headings 5 | Info@7, H2@11, Steps@13, Frame@16, H2@35, Steps@37, H2@53, Warning@57, H2@62, AccordionGroup@64, H2@76, CardGroup@78 |
| `customization/documents.mdx` | Info 1, Steps 2, Step 6, Frame 1, video 1, img 1, Warning 1, AccordionGroup 1, Accordion 3, CardGroup 1, Card 2, headings 6 | Info@7, H2@11, H2@16, Steps@18, Frame@21, H2@34, Steps@36, Warning@52, H2@55, H2@59, AccordionGroup@61, H2@73, CardGroup@75 |
| `customization/custom-fields.mdx` | Info 1, Frame 1, img 1, CardGroup 1, Card 4, headings 3 | Info@7, Frame@11, H2@15, CardGroup@17, H2@24, H2@37 |
| `contacts/exporting-contacts.mdx` | Steps 1, Step 4, Frame 1, img 1, AccordionGroup 1, Accordion 3, CardGroup 1, Card 2, headings 4 | H2@13, Steps@18, Frame@22, H2@46, H2@50, AccordionGroup@52, H2@64, CardGroup@66 |
| `policies/overview.mdx` | Frame 1, img 1, CardGroup 1, Card 6, tables 1, headings 3 | Frame@9, H2@13, CardGroup@15, H2@24, H2@28, Table@30 |
| `policies/creating-policies.mdx` | Info 1, Steps 2, Step 9, Frame 2, video 1, img 2, AccordionGroup 1, Accordion 4, CardGroup 1, Card 2, headings 6 | Info@7, H2@11, H2@17, Steps@19, Frame@27, Frame@43, H2@53, Steps@55, H2@73, H2@79, AccordionGroup@81, H2@96, CardGroup@98 |
| `policies/policy-profile.mdx` | Info 1, Steps 1, Step 4, Frame 1, img 1, AccordionGroup 1, Accordion 3, CardGroup 1, Card 2, headings 3 | Info@7, Steps@11, Frame@18, H2@34, H2@38, AccordionGroup@40, H2@54, CardGroup@56 |
| `policies/status-history.mdx` | Info 1, Steps 1, Step 4, Frame 1, img 1, AccordionGroup 1, Accordion 3, CardGroup 1, Card 2, headings 3 | Info@7, Steps@11, Frame@21, H2@31, H2@35, AccordionGroup@37, H2@52, CardGroup@54 |
| `policies/attaching-plans.mdx` | Info 1, Steps 1, Step 5, Frame 1, img 1, AccordionGroup 1, Accordion 4, CardGroup 1, Card 2, headings 4 | Info@7, H2@11, Steps@16, Frame@22, H2@40, H2@46, AccordionGroup@48, H2@65, CardGroup@67 |
| `pipeline/overview.mdx` | Frame 1, img 1, CardGroup 1, Card 3, headings 2 | Frame@9, H2@19, CardGroup@21, H2@27 |
| `pipeline/managing-deals.mdx` | Info 1, Steps 2, Step 8, Frame 1, video 1, img 1, AccordionGroup 1, Accordion 3, CardGroup 1, Card 3, headings 6 | Info@7, H2@11, Steps@13, H2@33, Steps@35, Frame@47, H2@53, H2@59, H2@63, AccordionGroup@65, H2@77, CardGroup@79 |
| `pipeline/configuring-pipeline.mdx` | Info 1, Steps 2, Step 9, Warning 2, Frame 1, video 1, img 1, AccordionGroup 1, Accordion 3, CardGroup 1, Card 2, headings 6 | Info@7, H2@11, Steps@13, H2@27, Warning@29, Steps@31, Frame@34, H2@56, Warning@60, H2@62, H2@66, AccordionGroup@68, H2@80, CardGroup@82 |
| `tasks/overview.mdx` | Frame 1, img 1, CardGroup 1, Card 3, headings 2 | Frame@9, H2@13, CardGroup@15, H2@21 |
| `tasks/creating-tasks.mdx` | Steps 1, Step 6, Frame 1, video 1, img 1, AccordionGroup 1, Accordion 4, CardGroup 1, Card 2, headings 4 | H2@13, Steps@18, Frame@22, H2@46, H2@50, AccordionGroup@52, H2@67, CardGroup@69 |
| `tasks/managing-tasks.mdx` | Steps 1, Step 6, Frame 1, img 1, Warning 1, AccordionGroup 1, Accordion 3, CardGroup 1, Card 2, headings 3 | Steps@13, Frame@20, Warning@44, H2@48, H2@52, AccordionGroup@54, H2@66, CardGroup@68 |
| `meetings/overview.mdx` | Frame 1, img 1, CardGroup 1, Card 3, Warning 1, headings 4 | Frame@9, H2@18, CardGroup@20, H2@26, H2@35, Warning@39, H2@42 |
| `meetings/scheduling-meetings.mdx` | Info 1, Steps 2, Step 10, Frame 1, video 1, img 1, AccordionGroup 1, Accordion 3, CardGroup 1, Card 2, headings 5 | Info@7, H2@11, Steps@13, Frame@18, H2@48, Steps@50, H2@65, H2@69, AccordionGroup@71, H2@83, CardGroup@85 |
| `messages/overview.mdx` | Frame 1, img 1, CardGroup 1, Card 3, headings 2 | Frame@9, H2@13, CardGroup@15, H2@21 |
| `messages/sending-texts.mdx` | Steps 1, Step 4, Frame 1, video 1, img 1, AccordionGroup 1, Accordion 3, CardGroup 1, Card 2, headings 4 | H2@13, Steps@19, Frame@23, H2@45, H2@49, AccordionGroup@51, H2@63, CardGroup@65 |
| `messages/finding-conversations.mdx` | Steps 1, Step 4, Frame 1, img 1, AccordionGroup 1, Accordion 3, CardGroup 1, Card 2, headings 3 | Steps@13, Frame@17, H2@42, H2@46, AccordionGroup@48, H2@60, CardGroup@62 |
| `calls/overview.mdx` | CardGroup 1, Card 6, tables 1, headings 2 | H2@13, CardGroup@15, H2@24, Table@26 |
| `calls/setting-your-status.mdx` | Info 1, Steps 1, Step 5, AccordionGroup 1, Accordion 3, CardGroup 1, Card 2, headings 4 | Info@7, H2@11, Steps@16, H2@37, H2@41, AccordionGroup@43, H2@55, CardGroup@57 |
| `calls/making-calls.mdx` | Info 1, Steps 1, Step 4, AccordionGroup 1, Accordion 4, CardGroup 1, Card 2, headings 4 | Info@7, H2@11, Steps@16, H2@36, H2@40, AccordionGroup@42, H2@57, CardGroup@59 |
| `calls/answering-calls.mdx` | Info 1, Steps 1, Step 4, AccordionGroup 1, Accordion 3, CardGroup 1, Card 2, headings 4 | Info@7, H2@11, Steps@16, H2@36, H2@40, AccordionGroup@42, H2@54, CardGroup@56 |
| `calls/transferring-calls.mdx` | Info 1, Steps 1, Step 5, AccordionGroup 1, Accordion 2, CardGroup 1, Card 2, headings 4 | Info@7, H2@11, Steps@16, H2@39, H2@43, AccordionGroup@45, H2@54, CardGroup@56 |
| `calls/wrapping-up-calls.mdx` | Info 1, Steps 1, Step 5, AccordionGroup 1, Accordion 2, CardGroup 1, Card 2, headings 3 | Info@7, Steps@11, H2@34, H2@38, AccordionGroup@40, H2@49, CardGroup@51 |
| `calls/call-log.mdx` | Info 1, Steps 1, Step 4, Frame 1, img 1, AccordionGroup 1, Accordion 2, CardGroup 1, Card 2, headings 3 | Info@7, Steps@11, Frame@25, H2@33, H2@37, AccordionGroup@39, H2@48, CardGroup@50 |
| `calls/call-details.mdx` | Info 1, Steps 1, Step 4, Frame 1, video 1, img 1, AccordionGroup 1, Accordion 3, CardGroup 1, Card 2, headings 3 | Info@7, Steps@11, Frame@25, H2@34, H2@38, AccordionGroup@40, H2@52, CardGroup@54 |
| `calls/reporting.mdx` | Info 1, Steps 1, Step 4, Frame 1, img 1, AccordionGroup 1, Accordion 2, CardGroup 1, Card 2, headings 3 | Info@7, Steps@11, Frame@25, H2@33, H2@37, AccordionGroup@39, H2@48, CardGroup@50 |
| `marketplace/overview.mdx` | Info 1, Frame 1, img 1, Warning 1, CardGroup 1, Card 4, headings 2 | Info@9, Frame@11, Warning@17, H2@21, CardGroup@23, H2@30 |
| `marketplace/joining-queues.mdx` | Info 1, Warning 1, Steps 2, Step 6, Frame 2, img 2, AccordionGroup 1, Accordion 4, CardGroup 1, Card 2, headings 5 | Info@7, H2@11, Warning@16, Steps@18, Frame@22, H2@34, Steps@38, Frame@42, H2@54, H2@58, AccordionGroup@60, H2@75, CardGroup@77 |
| `settings/wallet.mdx` | Info 1, Frame 1, img 1, CardGroup 1, Card 3, Warning 1, headings 4 | Info@9, Frame@13, H2@19, CardGroup@21, H2@27, Warning@33, H2@35, H2@42 |
| `settings/wallet-funds.mdx` | Info 1, Warning 1, Steps 2, Step 9, Frame 1, video 1, img 1, AccordionGroup 1, Accordion 4, CardGroup 1, Card 2, headings 6 | Info@7, H2@11, Warning@16, H2@18, Steps@20, Frame@27, H2@46, Steps@48, H2@68, H2@72, AccordionGroup@74, H2@89, CardGroup@91 |
| `settings/wallet-transactions.mdx` | Info 1, tables 3, headings 3 | Info@7, H2@11, Table@13, H2@19, Table@21, H2@30, Table@32 |
| `settings/profile.mdx` | Info 1, Steps 1, Step 4, Frame 1, img 1, AccordionGroup 1, Accordion 3, CardGroup 1, Card 2, headings 3 | Info@7, Steps@11, Frame@15, H2@34, H2@38, AccordionGroup@40, H2@52, CardGroup@54 |
| `settings/password.mdx` | Info 1, Steps 1, Step 5, Frame 1, img 1, AccordionGroup 1, Accordion 3, CardGroup 1, Card 2, headings 3 | Info@7, Steps@11, Frame@15, H2@33, H2@37, AccordionGroup@39, H2@51, CardGroup@53 |
| `settings/sessions.mdx` | Info 1, Steps 1, Step 4, Frame 1, img 1, AccordionGroup 1, Accordion 3, CardGroup 1, Card 2, headings 3 | Info@7, Steps@11, Frame@15, H2@30, H2@36, AccordionGroup@38, H2@50, CardGroup@52 |
| `settings/credentials.mdx` | Info 1, Steps 1, Step 4, Frame 1, img 1, AccordionGroup 1, Accordion 3, CardGroup 1, Card 2, headings 3 | Info@7, Steps@11, Frame@15, H2@34, H2@38, AccordionGroup@40, H2@52, CardGroup@54 |
| `settings/licensed-states-and-contracts.mdx` | Info 1, Steps 1, Step 7, Frame 1, img 1, AccordionGroup 1, Accordion 3, CardGroup 1, Card 2, headings 4 | Info@7, H2@11, Steps@17, Frame@21, H2@45, H2@51, AccordionGroup@53, H2@65, CardGroup@67 |
| `fix/cant-see-a-feature.mdx` | AccordionGroup 1, Accordion 7 | AccordionGroup@9 |
| `fix/sign-in-problems.mdx` | AccordionGroup 1, Accordion 7 | AccordionGroup@9 |
| `fix/not-getting-calls.mdx` | Info 1, AccordionGroup 1, Accordion 7 | Info@7, AccordionGroup@11 |
| `fix/text-didnt-send.mdx` | AccordionGroup 1, Accordion 6 | AccordionGroup@9 |
| `fix/import-problems.mdx` | AccordionGroup 1, Accordion 8 | AccordionGroup@9 |
| `fix/wallet-and-payments.mdx` | Info 1, AccordionGroup 1, Accordion 4 | Info@7, AccordionGroup@11 |
| `start/glossary.mdx` | headings 26 | H2@9, H2@13, H2@17, H2@21, H2@25, H2@29, H2@33, H2@37, H2@41, H2@45, H2@49, H2@53, H2@57, H2@61, H2@65, H2@69, H2@73, H2@77, H2@81, H2@85, H2@89, H2@93, H2@97, H2@101, H2@105, H2@109 |
| `settings/agency-overview.mdx` | Frame 1, img 1, CardGroup 1, Card 6, headings 2 | Frame@9, H2@13, CardGroup@15, H2@24 |
| `settings/products-and-carriers.mdx` | Info 1, Steps 2, Step 9, Frame 1, img 1, Warning 1, AccordionGroup 1, Accordion 3, CardGroup 1, Card 2, headings 5 | Info@7, H2@11, Steps@13, Frame@17, H2@32, Steps@34, Warning@54, H2@56, H2@60, AccordionGroup@62, H2@74, CardGroup@76 |
| `settings/relationships.mdx` | Info 1, Steps 2, Step 9, Frame 1, img 1, AccordionGroup 1, Accordion 3, CardGroup 1, Card 2, headings 5 | Info@7, H2@11, Steps@13, Frame@17, H2@35, Steps@39, H2@62, H2@66, AccordionGroup@68, H2@80, CardGroup@82 |
| `settings/agency-custom-fields.mdx` | Info 1, Steps 1, Step 6, Frame 1, img 1, AccordionGroup 1, Accordion 3, CardGroup 1, Card 2, headings 5 | Info@7, H2@11, Steps@13, Frame@17, H2@46, H2@50, H2@54, AccordionGroup@56, H2@68, CardGroup@70 |
| `settings/task-templates.mdx` | Steps 1, Step 6, Frame 1, img 1, AccordionGroup 1, Accordion 3, CardGroup 1, Card 2, headings 4 | H2@13, Steps@18, Frame@25, H2@43, H2@49, AccordionGroup@51, H2@63, CardGroup@65 |
| `settings/integrations.mdx` | Info 1, Steps 1, Step 3, Frame 1, img 1, AccordionGroup 1, Accordion 3, CardGroup 1, Card 2, headings 4 | Info@7, H2@11, Steps@13, Frame@17, H2@41, H2@47, AccordionGroup@49, H2@61, CardGroup@63 |
| `settings/billing.mdx` | Info 1, Steps 2, Step 8, Warning 1, AccordionGroup 1, Accordion 4, CardGroup 1, Card 2, headings 5 | Info@7, H2@11, Steps@13, H2@35, Steps@39, Warning@53, H2@55, H2@61, AccordionGroup@63, H2@78, CardGroup@80 |
| `settings/users-and-roles.mdx` | Info 1, Steps 1, Step 7, Frame 1, img 1, AccordionGroup 1, Accordion 3, CardGroup 1, Card 2, headings 4 | Info@7, H2@11, Steps@16, Frame@20, H2@46, H2@50, AccordionGroup@52, H2@64, CardGroup@66 |
| `start/roles.mdx` | tables 1, headings 1 | Table@11, H2@36 |
| `settings/import-users.mdx` | Info 1, Steps 1, Step 6, Frame 1, video 1, img 1, AccordionGroup 1, Accordion 3, CardGroup 1, Card 2, headings 4 | Info@7, H2@11, Steps@17, Frame@21, H2@43, H2@53, AccordionGroup@55, H2@67, CardGroup@69 |
| `settings/user-profiles.mdx` | Info 1, Steps 1, Step 6, Frame 1, video 1, img 1, AccordionGroup 1, Accordion 3, CardGroup 1, Card 2, headings 3 | Info@7, Steps@11, Frame@15, H2@43, H2@47, AccordionGroup@49, H2@61, CardGroup@63 |
| `settings/user-access-and-security.mdx` | Info 1, Steps 2, Step 7, Frame 1, img 1, AccordionGroup 1, Accordion 3, CardGroup 1, Card 2, headings 6 | Info@7, H2@11, Steps@13, Frame@20, H2@32, H2@38, Steps@42, H2@54, H2@58, AccordionGroup@60, H2@72, CardGroup@74 |
| `contacts/importing-contacts.mdx` | Info 1, Warning 1, Steps 1, Step 6, Frame 1, img 1, AccordionGroup 1, Accordion 3, CardGroup 1, Card 2, headings 5 | Info@7, H2@11, Warning@18, H2@20, Steps@22, Frame@25, H2@48, H2@52, AccordionGroup@54, H2@66, CardGroup@68 |
| `contacts/bulk-actions.mdx` | Info 1, Steps 3, Step 9, Frame 1, img 1, Warning 1, AccordionGroup 1, Accordion 3, CardGroup 1, Card 2, headings 7 | Info@7, H2@11, H2@16, Steps@18, Frame@27, H2@33, Steps@35, H2@49, Warning@51, Steps@54, H2@66, H2@70, AccordionGroup@72, H2@84, CardGroup@86 |
| `policies/importing-policies.mdx` | Steps 1, Step 6, Frame 1, img 1, AccordionGroup 1, Accordion 3, CardGroup 1, Card 2, headings 4 | H2@13, Steps@21, Frame@47, H2@51, H2@55, AccordionGroup@57, H2@70, CardGroup@72 |
| `policies/bulk-actions.mdx` | Steps 2, Step 7, Frame 1, img 1, Warning 1, AccordionGroup 1, Accordion 3, CardGroup 1, Card 2, headings 6 | H2@13, H2@18, Steps@20, Frame@24, H2@40, Warning@42, Steps@44, H2@59, H2@63, AccordionGroup@65, H2@79, CardGroup@81 |
| `reports/overview.mdx` | Frame 1, img 1, CardGroup 1, Card 4, headings 2 | Frame@9, H2@13, CardGroup@15, H2@22 |
| `reports/building-reports.mdx` | Info 1, Steps 1, Step 7, Frame 1, img 1, AccordionGroup 1, Accordion 4, CardGroup 1, Card 2, headings 4 | Info@7, H2@11, Steps@16, Frame@40, H2@44, H2@52, AccordionGroup@54, H2@70, CardGroup@72 |
| `reports/metrics-and-columns.mdx` | tables 1 | Table@9 |
| `reports/persistency.mdx` | Info 1, Steps 1, Step 5, Frame 1, img 1, AccordionGroup 1, Accordion 3, CardGroup 1, Card 2, headings 3 | Info@7, Steps@11, Frame@31, H2@35, H2@43, AccordionGroup@45, H2@57, CardGroup@59 |
| `compliance/overview.mdx` | Frame 1, img 1, CardGroup 1, Card 3, headings 3 | Frame@9, H2@13, CardGroup@15, H2@21, H2@29 |
| `dialer/overview.mdx` | Info 1, Frame 1, img 1, CardGroup 1, Card 6, tables 1, headings 2 | Info@7, Frame@11, H2@15, CardGroup@17, H2@30, Table@32 |
| `dialer/live-monitor.mdx` | Info 1, Steps 1, Step 5, Frame 1, img 1, AccordionGroup 1, Accordion 3, CardGroup 1, Card 2, tables 1, headings 4 | Info@7, Steps@11, Frame@28, H2@42, Table@44, H2@56, H2@60, AccordionGroup@62, H2@74, CardGroup@76 |
| `dialer/phone-numbers.mdx` | Info 1, Steps 3, Step 14, Frame 1, video 1, img 1, Warning 1, AccordionGroup 1, Accordion 3, CardGroup 1, Card 2, headings 6 | Info@7, H2@11, Steps@13, Frame@30, Warning@35, H2@39, Steps@41, H2@60, Steps@62, H2@82, H2@86, AccordionGroup@88, H2@100, CardGroup@102 |
| `dialer/queues.mdx` | Info 1, Steps 2, Step 8, Frame 1, img 1, Warning 1, AccordionGroup 1, Accordion 3, CardGroup 1, Card 2, tables 1, headings 6 | Info@7, H2@11, H2@16, Steps@18, Frame@29, H2@33, Steps@35, Table@53, Warning@69, H2@71, H2@75, AccordionGroup@77, H2@89, CardGroup@91 |
| `dialer/queue-routing-and-hours.mdx` | Info 1, Frame 1, img 1, Steps 2, Step 10, AccordionGroup 1, Accordion 3, CardGroup 1, Card 2, tables 1, headings 6 | Info@7, H2@11, Frame@16, Steps@20, H2@41, Table@43, H2@60, Steps@62, H2@77, H2@81, AccordionGroup@83, H2@95, CardGroup@97 |
| `dialer/campaigns.mdx` | Info 1, Steps 1, Step 7, Frame 1, video 1, img 1, AccordionGroup 1, Accordion 3, CardGroup 1, Card 2, headings 4 | Info@7, H2@11, Steps@17, Frame@21, H2@48, H2@54, AccordionGroup@56, H2@70, CardGroup@72 |
| `dialer/campaign-dialing-settings.mdx` | Info 1, Steps 1, Step 5, Frame 1, img 1, Warning 1, AccordionGroup 1, Accordion 3, CardGroup 1, Card 2, tables 1, headings 3 | Info@7, Steps@11, Frame@18, Table@33, Warning@44, H2@48, H2@54, AccordionGroup@56, H2@68, CardGroup@70 |
| `dialer/dispositions.mdx` | Info 1, Steps 1, Step 5, Frame 1, img 1, AccordionGroup 1, Accordion 3, CardGroup 1, Card 2, tables 1, headings 3 | Info@7, Steps@11, Frame@15, Table@33, H2@45, H2@51, AccordionGroup@53, H2@65, CardGroup@67 |
| `dialer/scripts.mdx` | Info 1, Steps 1, Step 6, Frame 1, img 1, AccordionGroup 1, Accordion 2, CardGroup 1, Card 2, headings 4 | Info@7, H2@11, Steps@16, Frame@20, H2@47, H2@51, AccordionGroup@53, H2@62, CardGroup@64 |
| `dialer/audio-library.mdx` | Info 1, Steps 2, Step 7, Frame 1, img 1, Warning 1, AccordionGroup 1, Accordion 2, CardGroup 1, Card 2, tables 1, headings 6 | Info@7, H2@11, Steps@16, Frame@30, H2@34, Table@36, H2@44, Steps@46, Warning@60, H2@62, H2@66, AccordionGroup@68, H2@77, CardGroup@79 |
| `dialer/dnc-numbers.mdx` | Info 1, Warning 1, Steps 2, Step 7, Frame 1, img 1, AccordionGroup 1, Accordion 3, CardGroup 1, Card 2, headings 4 | Info@7, Warning@11, Steps@13, Frame@17, H2@32, Steps@34, H2@46, H2@54, AccordionGroup@56, H2@68, CardGroup@70 |
| `dialer/pay-per-call.mdx` | Info 1, Frame 1, img 1, Steps 2, Step 11, Warning 1, AccordionGroup 1, Accordion 3, CardGroup 1, Card 2, tables 1, headings 6 | Info@7, H2@11, Frame@16, Steps@20, Warning@41, H2@43, Table@45, H2@59, Steps@61, H2@83, H2@87, AccordionGroup@89, H2@101, CardGroup@103 |
| `dialer/vendors-and-tags.mdx` | Info 1, Steps 2, Step 6, Frame 2, img 2, AccordionGroup 1, Accordion 3, CardGroup 1, Card 2, headings 5 | Info@7, H2@11, Steps@13, Frame@17, H2@33, Steps@35, Frame@39, H2@51, H2@57, AccordionGroup@59, H2@71, CardGroup@73 |
| `marketplace/managing-queue-access.mdx` | Info 1, Warning 1, Steps 1, Step 5, Frame 1, video 1, img 1, AccordionGroup 1, Accordion 4, CardGroup 1, Card 2, headings 4 | Info@7, H2@11, Warning@16, Steps@18, Frame@28, H2@45, H2@49, AccordionGroup@51, H2@66, CardGroup@68 |
| `api/overview.mdx` | Tip 1, Columns 1, Card 5, tables 1, headings 5 | H2@11, Table@15, H2@27, H2@32, H2@38, Tip@50, H2@54, Columns@56 |
| `api/manage-api-keys.mdx` | Info 1, Steps 1, Step 6, Frame 2, img 2, Note 1, headings 5 | Info@7, H2@11, Steps@13, Frame@34, H2@43, Frame@49, H2@53, H2@58, Note@63, H2@68 |
| `api/authentication.mdx` | Tip 1, tables 3, headings 8 | H2@11, Table@21, H2@35, H2@41, Table@45, Tip@64, H2@70, H3@74, Table@76, H3@88, H3@100, H2@110 |
| `api/make-your-first-request.mdx` | Note 1, Steps 1, Step 5, Info 1, Columns 1, Card 2, headings 4 | H2@11, Note@17, H2@21, Steps@23, Info@118, H2@122, H2@146, Columns@148 |
| `api/pagination-filtering-and-sorting.mdx` | Note 2, Tip 1, tables 5, headings 10 | H2@9, H3@15, Table@17, H3@24, Table@50, Note@62, Note@66, H2@78, Table@82, H3@90, Table@92, H3@111, Tip@139, H3@143, H2@149, H2@153, Table@157, H2@172 |
| `api/errors-and-rate-limits.mdx` | tables 2, headings 10 | H2@9, Table@15, H2@25, H3@29, Table@33, H3@41, H3@51, H3@61, H3@81, H3@97, H2@101, H2@114 |
| `api/contacts.mdx` | Warning 1, tables 2, headings 8 | H2@19, Table@21, H2@38, H2@94, H2@108, H2@246, Warning@258, Table@264, H2@274, H2@412, H2@418 |
| `api/policies.mdx` | Warning 1, tables 3, headings 9 | H2@19, Table@21, H2@30, Table@34, H2@50, H2@102, H2@106, H2@179, Table@225, Warning@232, H2@240, H2@422, H2@428 |
| `api/custom-fields.mdx` | tables 2, headings 7 | H2@19, Table@21, H2@45, H3@102, H2@148, Table@154, H3@167, H2@171, H2@176 |
| `api/relationships.mdx` | tables 3, headings 9 | H2@19, Table@21, H2@37, H2@63, H2@67, H2@123, H3@293, Table@311, H3@318, Table@320, H2@327, H2@333 |
| `api/pipelines.mdx` | Warning 1, tables 1, headings 6 | H2@19, Table@21, H2@36, H2@50, H2@84, H2@126, Warning@153, H2@161 |
| `api/products.mdx` | tables 2, headings 3 | H2@19, Table@21, H2@69, H2@115, Table@117 |
| `api/users.mdx` | tables 2, headings 3 | H2@23, Table@25, H2@77, H2@111, Table@113 |
