# Task 002: Add Idempotency Unique Constraint

## Goal

Enforce idempotency at the database layer.

## Scope

- Add unique constraint for customer/card plus idempotency key.
- Handle unique constraint conflict by returning the original result.

## Acceptance Criteria

- Race conditions cannot create duplicate purchases with the same key.
- Constraint behavior is tested or manually verified.

