# Task 007: Add Immutable Ledger Events

## Goal

Record money movement in append-only `ledger_events`.

## Scope

- Insert a ledger event when a purchase is created.
- Do not update or delete ledger events through normal code paths.
- Keep ledger event data audit-friendly.

## Acceptance Criteria

- Purchase creates a transaction and ledger event.
- Ledger event stores amount, currency, event type, and created time.
- The implementation makes append-only behavior clear.

