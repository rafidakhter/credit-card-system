# Task 006: Prevent Ledger Event Deletion

## Goal

Protect append-only ledger history.

## Scope

- Prevent normal application code from deleting ledger events.
- Document how corrections should be represented.
- Add tests or guardrails where practical.

## Acceptance Criteria

- Ledger events are append-only by normal code path.
- Corrections use compensating events.
- The rule is documented.

