# Task 006: Add Idempotency Key Check

## Goal

Prevent obvious duplicate purchase requests in Phase 1.

## Scope

- Require `Idempotency-Key` header.
- Store idempotency key with the purchase result.
- Return the original result when the same key is retried.

## Acceptance Criteria

- Missing idempotency key fails.
- Duplicate key does not create a second purchase.
- Retry behavior is tested or manually verified.

