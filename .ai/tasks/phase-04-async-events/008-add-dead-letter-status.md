# Task 008: Add Dead-Letter Status

## Goal

Isolate events that cannot be processed successfully.

## Scope

- Mark permanently failed events as dead-letter.
- Keep enough context to debug safely.

## Acceptance Criteria

- Failed events stop blocking the worker.
- Dead-letter records are visible for inspection.

