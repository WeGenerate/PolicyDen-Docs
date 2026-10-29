# Direct-entry documentation review

The home now offers tasks and support, and `/quickstart` provides a shared first session. Neither asks readers to choose an audience. Quickstart is included in Start here because the home, footer, and error page link to it.

Three audience-guide source files are retained for possible future assignment, but are excluded from the current build and navigation:
- `/start/field-agent`: solo account owner (Admin rights in an individual agent account).
- `/start/agency-agent`: agency employee (Agent).
- `/start/agency-admin`: agency Admin or Agency Owner.

These audiences are not new app roles. Start here contains only the shared first session, app tour, sign-in, account setup, setup checklist, and notifications pages. The role-permissions matrix is under Admin → Users. Shared task pages remain canonical. Navigation is not a security boundary, and documentation access filtering is not implemented. RBAC is deferred; this change contains no access tooling or integration plan.

Workflow handoffs link to the shared first session, and the solo-account workflow links to its setup checklist. Readers do not choose an audience guide. Choosing an app role while adding a user remains documented. Existing app-permission facts and prerequisites are preserved.

Legacy quickstart screenshots were removed. `.mintlify/` and this `docs-review/` directory are build-excluded internal context.
