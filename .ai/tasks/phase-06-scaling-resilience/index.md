# Phase 6: Scale and Harden the System

## Goal

Improve read performance, resilience, and operational visibility where pressure appears.

## What We Are Trying to Achieve

- Purchase history reads are fast.
- Read models support common queries.
- Redis is used only as an optimization.
- Workers retry safely and isolate failed jobs.
- Logs, metrics, and rate limits make the system observable and safer.

## Architecture Lesson

Ledger is the source of truth. Read-friendly tables and caches are summaries for speed.

Interview line:

```text
I keep the ledger as the official record, then add read models, indexes, pagination, and cache only where query pressure justifies it.
```

## Micro Tasks

- [ ] Add `transaction_views` or equivalent read-friendly model if needed.
- [ ] Add indexes for `customer_id + created_at`.
- [ ] Add indexes for `card_id + created_at`.
- [ ] Add indexes for `status + created_at`.
- [ ] Add cursor pagination.
- [ ] Add Redis cache for recent purchase history.
- [ ] Cache current statement summary.
- [ ] Add cache invalidation when purchases or refunds happen.
- [ ] Add retry and dead-letter handling.
- [ ] Add monitoring, metrics-ready logs, and rate limiting.

## Metrics To Consider

- purchase approval rate
- purchase latency
- duplicate idempotency attempts
- outbox processing lag
- failed event count
- cache hit rate

## Non-Goals

- No read replica unless explicitly requested.
- No Kafka yet unless the scale phase is expanded.
- No Kubernetes manifests.
- No sharding implementation.

## Done When

- History queries are indexed and paginated.
- Cache behavior is bounded and safe.
- Worker failures are visible and isolated.
- Operators can debug important flows without sensitive logs.

## Phase Quiz

Answer these before moving to Phase 7:

1. Why is the ledger the source of truth?
2. Why might we add a read model like `transaction_views`?
3. What problem does cursor pagination solve?
4. Why should Redis cache not become the source of truth?
5. What metric would tell us the outbox worker is falling behind?
