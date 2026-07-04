# Task 007: Add Retry Logic

## Goal

Handle temporary worker failures.

## Scope

- Track retry attempts.
- Retry failed events with bounded attempts.
- Preserve failure details safely.

## Acceptance Criteria

- Temporary failures can be retried.
- Retry attempts do not loop forever.

