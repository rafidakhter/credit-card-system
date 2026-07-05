# Phase 2: Make It Financially Safer

## Status

Completed on 2026-07-05.

## Goal

Show that correctness matters more than speed in the money path.

## What We Are Trying to Achieve

- Purchase creation is atomic.
- Transaction status changes are explicit and valid.
- Ledger events cannot be deleted or casually rewritten.
- Refunds preserve history with compensating records.
- Audit logs explain important actions.

## Architecture Lesson

Financial systems should work like a notebook written in pen: corrections are added, not erased.

Interview line:

```text
I care more about correctness than speed in the money path. If something changes, I want an auditable trail of facts instead of overwriting history.
```

## Micro Tasks

- [x] Wrap purchase creation in a database transaction.
- [x] Add unique constraint on `idempotency_key`.
- [x] Add card limit validation.
- [x] Add refund flow.
- [x] Add audit logs.
- [x] Prevent deleting ledger events through normal application code.
- [x] Add transaction status lifecycle.

## Status Lifecycle

Use a simple lifecycle first:

```text
PENDING -> APPROVED -> SETTLED -> REFUNDED
```

The exact names can evolve, but invalid transitions should be rejected.

## Non-Goals

- No async queue yet.
- No Kafka or Redpanda.
- No microservice split.
- No complex billing or interest logic.

## Done When

- Purchase writes are atomic.
- Refunds do not erase original purchases.
- Invalid status transitions fail.
- Audit and ledger records make the money story inspectable.
- Phase 2 is complete and the project is ready to move to Phase 3.

## Phase Quiz

Answer these before moving to Phase 3:

1. Why is correctness more important than speed in the money path?
2. What does it mean for purchase creation to be atomic?
3. Why should refunds create new records instead of deleting the original purchase?
4. What is one invalid status transition we should reject?
5. How do audit logs help when something goes wrong?
