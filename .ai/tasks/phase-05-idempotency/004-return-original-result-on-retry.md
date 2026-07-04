# Task 004: Return Original Result on Retry

## Goal

Make duplicate client retries predictable.

## Scope

- Detect duplicate idempotency key.
- Return the original successful result.

## Acceptance Criteria

- Retry response shape matches original response.
- No additional ledger event is created.

