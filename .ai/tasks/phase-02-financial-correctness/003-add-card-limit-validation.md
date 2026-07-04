# Task 003: Add Card Limit Validation

## Goal

Prevent purchases above the available limit.

## Scope

- Validate card status.
- Validate available limit.
- Keep limit checks inside the money-path transaction where needed.

## Acceptance Criteria

- Over-limit purchase fails.
- Valid purchase reduces available limit consistently.
- Error response is clear.

