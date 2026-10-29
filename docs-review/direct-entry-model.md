# Direct-entry documentation review

The home now offers tasks and support, and `/quickstart` provides a shared first session. Neither asks readers to choose an audience. Quickstart is included in Start here because the home, footer, and error page link to it.

Three existing start pages remain individually addressable for later assignment:
- `/start/field-agent`: solo account owner (Admin rights in an individual agent account).
- `/start/agency-agent`: agency employee (Agent).
- `/start/agency-admin`: agency Admin or Agency Owner.

These audiences are not new app roles. All three remain reachable in navigation during authoring. Shared task pages remain canonical. Navigation is not a security boundary, and documentation access filtering is not implemented. RBAC is deferred; this change contains no access tooling or integration plan.

Reviewed start links, onboarding workflows, and missing-feature guidance. Links that send a new employee to the agency Agent guide are purposeful handoffs. Choosing an app role while adding a user remains documented. Existing app-permission facts and prerequisites are preserved.

Legacy quickstart screenshots were removed; pending media capture elsewhere remains separate. `.mintlify/` and this `docs-review/` directory are build-excluded internal context.
