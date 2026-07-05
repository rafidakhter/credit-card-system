# Phase 5: Strengthen Idempotency

## Goal

Make retries and duplicate messages safe.

## What We Are Trying to Achieve

- Duplicate purchase requests do not create duplicate charges.
- Duplicate async events do not double-apply side effects.
- Idempotency is enforced with durable records and constraints.

## Architecture Lesson

Async systems often deliver messages more than once. Financial systems must treat duplicates as normal, not surprising.

Interview line:

```text
I assume retries and duplicate messages will happen, so purchase creation and event consumers must be idempotent by design.
```

## Micro Tasks

- [ ] Require `Idempotency-Key` for purchase creation if not already required.
- [ ] Store the key with the operation result.
- [ ] Add unique constraints scoped to customer/card.
- [ ] Return original result on retry.
- [ ] Track processed event IDs per consumer.
- [ ] Test duplicate purchase requests.
- [ ] Test duplicate event processing.

## Non-Goals

- No cache-only idempotency.
- No distributed lock unless a real need appears.
- No claim of exactly-once delivery.

## Done When

- Retrying the same purchase returns the same result.
- Reprocessing the same event does not duplicate financial side effects.
- The idempotency strategy is documented and tested.

## Phase Quiz

Answer these before moving to Phase 6:

1. What does idempotency mean in simple words?
2. Why can the same purchase request arrive twice?
3. Why can the same async event be processed twice?
4. Why is a database constraint safer than only checking in application code?
5. What should happen when the same `Idempotency-Key` is used again?
