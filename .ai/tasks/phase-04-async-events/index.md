# Phase 4: Add Async Processing

## Goal

Show sync vs async thinking while keeping the critical purchase path reliable.

## What We Are Trying to Achieve

- Purchase authorization stays synchronous.
- Slow or secondary work moves async.
- Events describe important business facts.
- Workers can update statements, notifications, and analytics.

## Architecture Lesson

The customer needs an immediate purchase decision, but emails, analytics, and statement updates can happen later.

Interview line:

```text
I keep authorization synchronous because the customer is waiting at checkout. I move non-critical side effects to async workers so the purchase path stays fast and isolated.
```

## Micro Tasks

- [ ] Define `PurchaseCreated` event.
- [ ] Add `outbox_events` table.
- [ ] Insert an outbox event when purchase is created.
- [ ] Create a NestJS worker process.
- [ ] Worker reads unprocessed outbox events.
- [ ] Worker updates statement read model.
- [ ] Add retry logic.
- [ ] Add dead-letter status for failed events.

## Queue Direction

Use the database outbox first. Do not add Kafka yet.

Later, Kafka or Redpanda can replace or sit behind the event-publishing adapter when the project reaches scale discussion.

## Non-Goals

- No Kafka or Redpanda yet.
- No microservices.
- No async purchase authorization.
- No exactly-once messaging claims.

## Done When

- Purchase creation can record an event atomically.
- A worker can process pending events.
- Failed events can be retried or marked dead-letter.
- Reprocessing risk is understood.

## Phase Quiz

Answer these before moving to Phase 5:

1. Which part of purchase processing must stay synchronous, and why?
2. What kind of work can happen asynchronously after a purchase?
3. What problem does the outbox pattern solve?
4. What is a worker process?
5. What does dead-letter mean in simple words?
