# Product brief

## Description
PolicyDen is a health-insurance CRM for managing contacts, policies, sales follow-ups, calls, messages, and agency operations. Docs help customers complete concrete tasks and recover when a control or workflow is unavailable.

## Audience decision
The user wants documentation assigned to specific users in the future, rather than asking readers to choose a persona or path. Build useful docs now; documentation access control is deferred. Do not implement access groups, authentication, role redirects, or an RBAC integration plan.

Keep three individually addressable starting guides:
- `/start/field-agent`: owner of a solo/individual agent account, with Admin rights.
- `/start/agency-agent`: agency employee with Agent access.
- `/start/agency-admin`: Admin or Agency Owner managing an agency.

These are documentation audiences, not three separate app roles. The app roles remain Agent, Admin, and Agency Owner. Address the known reader directly on each start page. The shared home is task-focused; the shared first-session guide has no persona selection or cross-audience detours. Shared task pages remain canonical and do not need duplication.

## Jobs to be done
- Sign in, review personal details, find a contact, and record a follow-up.
- Work a lead through contact, conversation, policy, and next action.
- Prepare an individual account’s products, licenses, relationships, and optional marketplace access.
- Prepare agency users and settings, onboard employees, and review team performance.
- Resolve sign-in issues and understand actual app feature availability.

## Motivation and evidence
Keep sales work and agency administration understandable without requiring customers to learn implementation details. This is an inferred documentation goal, not a claim about competitive differentiation.

Use `/Users/mac/PolicyDen-App` read-only as the product source of truth and the verified canonical task pages for shared procedures. Preserve real app permission and feature prerequisites. Screenshots and short animations with fictional demo data are handled separately; do not fabricate or add placeholder media in this content task.
