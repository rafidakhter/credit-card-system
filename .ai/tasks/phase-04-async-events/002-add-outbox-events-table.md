# Task 002: Add Outbox Events Table

## Goal

Persist events before async processing.

## Scope

- Add `outbox_events` table/model.
- Include event type, payload, status, created time, and processed time.

## Acceptance Criteria

- Outbox events can be stored and queried.
- Status supports pending, processed, and failed/dead-letter states.

