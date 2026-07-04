# Task 003: Insert Outbox Event on Purchase

## Goal

Record purchase and event intent together.

## Scope

- Insert `PurchaseCreated` outbox event during purchase creation.
- Keep insertion in the same DB transaction as purchase writes.

## Acceptance Criteria

- Purchase and outbox event commit atomically.
- Failure cannot leave purchase without event intent.

