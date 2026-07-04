# Task 009: Add Retry and Dead-Letter Handling

## Goal

Make failed async work visible and isolated.

## Scope

- Add bounded retries.
- Mark permanently failed jobs as dead-letter.

## Acceptance Criteria

- Failed jobs do not block all processing.
- Failure context avoids sensitive data.

