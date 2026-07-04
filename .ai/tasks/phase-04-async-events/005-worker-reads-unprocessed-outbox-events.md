# Task 005: Worker Reads Unprocessed Outbox Events

## Goal

Let the worker find pending async work.

## Scope

- Query pending outbox events.
- Process events in a safe batch size.
- Avoid processing already-completed events.

## Acceptance Criteria

- Pending events are discovered.
- Processed events are skipped.

