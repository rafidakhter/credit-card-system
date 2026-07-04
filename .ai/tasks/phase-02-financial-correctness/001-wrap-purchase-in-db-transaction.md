# Task 001: Wrap Purchase in Database Transaction

## Goal

Make purchase creation atomic.

## Scope

- Wrap transaction creation, card-limit update, and ledger event creation together.
- Roll back all writes if any step fails.

## Acceptance Criteria

- Partial purchase state cannot be created.
- Tests or manual checks cover failure behavior.

