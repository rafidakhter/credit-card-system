# Definition of Done

A task is done when these checks pass or are explicitly marked not applicable.

## Behavior

- The requested behavior works through the intended API, command, or test.
- Happy path and meaningful failure paths are handled.
- Inputs are validated at the boundary.
- Error responses are understandable and do not leak sensitive data.

## Architecture

- The change belongs to the correct module.
- No unrelated infrastructure was introduced.
- No cross-module shortcut was added without an explicit reason.
- Database constraints exist for critical invariants when persistence is involved.

## Code Quality

- Code is readable without relying on excessive comments.
- Names communicate intent.
- Duplication is acceptable only when abstraction would be premature.
- Public API shapes are clear.

## Tests and Verification

- Relevant tests were added or updated.
- The narrowest useful test command was run.
- Manual verification steps are documented if automated tests are not available yet.

## Documentation

- Task file status or notes are updated when useful.
- ADRs are updated only for architectural decisions, not routine implementation details.
- `Learning.md` is updated when the task teaches an important concept, trade-off, or mistake.
- If the whole phase is complete, ask the quiz from the phase `index.md` before moving on.
