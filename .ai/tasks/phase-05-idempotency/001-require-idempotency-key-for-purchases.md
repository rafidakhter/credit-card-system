# Task 001: Require Idempotency-Key for Purchases

## Goal

Make purchase requests explicitly idempotent.

## Scope

- Require `Idempotency-Key` header.
- Return validation error when missing.

## Acceptance Criteria

- Purchase without key fails.
- API docs show the required header.

