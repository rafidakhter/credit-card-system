# Phase 3: Add Domain Boundaries

## Goal

Organize the modular monolith around banking capabilities before splitting services.

## What We Are Trying to Achieve

- Purchases, billing, accounts, customers, notifications, and analytics have clear ownership.
- Controllers stay thin.
- Business rules are easier to find.
- Future service extraction is possible without doing it too early.

## Architecture Lesson

Banking products are complex. Boundaries reduce accidental coupling before infrastructure gets distributed.

Interview line:

```text
I would split by domain boundaries inside the monolith first, then extract services only when team ownership, scaling, or deployment needs justify it.
```

## Micro Tasks

- [ ] Split core modules by responsibility.
- [ ] Add or clarify billing module ownership.
- [ ] Separate customer, account, and card responsibilities.
- [ ] Prepare notification and analytics boundaries.
- [ ] Document what each module owns.
- [ ] Prevent direct cross-module access to internals.

## Suggested Boundaries

- `transactions`: purchase requests, transaction state, idempotency
- `ledger`: immutable money events
- `billing`: bill cycles, statement summaries, due dates
- `accounts`: card accounts, limits, balances
- `customers`: customer profile and ownership
- `notifications`: alerts and customer messages
- `analytics`: spending patterns and non-critical reporting

## Non-Goals

- No microservices.
- No distributed transactions.
- No queue requirement.
- No cloud deployment.

## Done When

- Module responsibilities are clear.
- The codebase can explain where a business rule belongs.
- Later async consumers can plug into module boundaries cleanly.

## Phase Quiz

Answer these before moving to Phase 4:

1. What problem do domain boundaries solve?
2. What should the `transactions` module own?
3. What should the `ledger` module own?
4. Why should billing logic not live inside the purchase controller?
5. When would it make sense to split a module into a separate service later?
