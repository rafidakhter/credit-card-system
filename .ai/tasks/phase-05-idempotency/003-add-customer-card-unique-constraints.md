# Task 003: Add Customer/Card Unique Constraints

## Goal

Enforce idempotency at the database level.

## Scope

- Add unique constraint scoped by customer/card and idempotency key.
- Handle constraint conflict safely.

## Acceptance Criteria

- Concurrent duplicate requests cannot double-create purchases.
- Conflict handling returns original result.

