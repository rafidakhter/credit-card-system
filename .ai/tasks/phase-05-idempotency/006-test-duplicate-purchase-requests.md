# Task 006: Test Duplicate Purchase Requests

## Goal

Prove client retries do not duplicate purchases.

## Scope

- Add tests for same idempotency key.
- Add tests for different idempotency key.

## Acceptance Criteria

- Same key returns original result.
- Different key creates a separate valid purchase.

