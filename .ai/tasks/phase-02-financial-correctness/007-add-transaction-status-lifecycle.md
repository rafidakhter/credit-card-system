# Task 007: Add Transaction Status Lifecycle

## Goal

Validate transaction status transitions.

## Scope

- Add lifecycle such as `PENDING -> APPROVED -> SETTLED -> REFUNDED`.
- Reject invalid transitions.
- Keep lifecycle rules out of controllers.

## Acceptance Criteria

- Valid transitions succeed.
- Invalid transitions fail.
- Lifecycle behavior is tested.

