# Task 002: Store Key with Operation Result

## Goal

Persist enough data to return the original result on retry.

## Scope

- Store idempotency key and related transaction/result.
- Preserve response behavior for duplicate requests.

## Acceptance Criteria

- Repeated key can locate original operation result.
- No duplicate transaction is created.

