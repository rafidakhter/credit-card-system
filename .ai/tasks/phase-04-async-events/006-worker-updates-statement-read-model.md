# Task 006: Worker Updates Statement Read Model

## Goal

Use async processing to update statement summaries.

## Scope

- Consume purchase-created outbox events.
- Update a statement read model or monthly summary.

## Acceptance Criteria

- Statement summary reflects processed purchases.
- Purchase API does not wait on statement update.

