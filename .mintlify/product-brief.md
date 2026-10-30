# Product brief

## Description
PolicyDen is a health-insurance CRM for managing contacts, policies, sales follow-ups, calls, messages, and agency operations. Docs help customers complete concrete tasks and recover when a control or workflow is unavailable.

## Audience decision
The user wants documentation assigned to specific users in the future, rather than asking readers to choose a persona or path. Build useful docs now; documentation access control is deferred. Do not implement access groups, authentication, role redirects, or an RBAC integration plan.

Retain these audience-guide source files for possible future assigned documentation. Exclude them from the current build and navigation; do not link to them from onboarding or workflow handoffs:
- `/start/field-agent`: owner of a solo/individual agent account, with Admin rights.
- `/start/agency-agent`: agency employee with Agent access.
- `/start/agency-admin`: Admin or Agency Owner managing an agency.

These are documentation audiences, not three separate app roles. The app roles remain Agent, Admin, and Agency Owner. Current onboarding uses one shared first-session guide and task-based setup pages. Start here must not list audience guides or a role-permissions breakdown. The role-permissions reference belongs under Admin → Users, beside user management. Shared task pages remain canonical and do not need duplication.

## Jobs to be done
- Sign in, review personal details, find a contact, and record a follow-up.
- Work a lead through contact, conversation, policy, and next action.
- Prepare an individual account’s products, licenses, relationships, and optional marketplace access.
- Prepare agency users and settings, onboard employees, and review team performance.
- Resolve sign-in issues and understand actual app feature availability.

## Motivation and evidence
Keep sales work and agency administration understandable without requiring customers to learn implementation details. This is an inferred documentation goal, not a claim about competitive differentiation.

Use the committed `origin/main` revision in `/Users/mac/PolicyDen-App` read-only as the product source of truth, rather than unrelated local workspace edits. Preserve real app permission and feature prerequisites. The isolated capture demo includes main revision `4d27ed3e0`; its Live Monitor screens and procedures were refreshed after comparing the original `036d02997` baseline with main. Screenshots and short animations use fictional demo data; do not fabricate or add placeholder media.

## Narrated tutorials

The user requested voiceover tutorials near the top of key pages and prioritized account setup and onboarding. Start with account invitation setup, agency setup, and onboarding a new agent. Use actual recordings of the fictional demo, OpenAI narration, English captions and an expandable transcript. Label the voice as AI narration. Place the player after the page introduction and before the written steps, with playback controls and no autoplay or loop. Keep the existing detailed procedures available below each tutorial.

The narrated agent-onboarding tutorial is withheld at the user’s request. Keep its player and transcript out of the onboarding page unless the user asks to restore them. The two other existing narrated tutorials remain in place.
