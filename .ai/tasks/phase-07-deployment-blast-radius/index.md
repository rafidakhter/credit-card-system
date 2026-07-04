# Phase 7: Explain Future Scale and Blast Radius

## Goal

Prepare the interview-ready future-state architecture without prematurely building it.

## What We Are Trying to Achieve

- Explain how the modular monolith could evolve.
- Explain when to split workers from the API.
- Explain when Kafka or Redpanda becomes useful.
- Explain horizontal API scaling.
- Explain read replicas and database backup/restore.
- Explain failure isolation and blast-radius reduction.

## Architecture Lesson

Architecture is choosing trade-offs that fit the business problem. In banking, the business problem is trust.

Interview line:

```text
I would start simple, preserve correctness with immutable records, then evolve toward async messaging, service boundaries, observability, and failure isolation only as scale justifies it.
```

## Micro Tasks

- [ ] Document splitting worker from API.
- [ ] Document Kafka or Redpanda as a future event backbone.
- [ ] Document splitting Ledger Service from Transaction Service.
- [ ] Document read replicas for history queries.
- [ ] Document horizontal scaling for API.
- [ ] Document distributed tracing.
- [ ] Document metrics and alerts.
- [ ] Document disaster recovery plan.
- [ ] Document database backup and restore testing.
- [ ] Document sharding and blast-radius reduction conceptually.

## Important Future-State Concepts

- API instances should be stateless for horizontal scaling.
- Ledger and transaction services may split when ownership or scale demands it.
- Kafka/Redpanda helps durable async communication at higher scale.
- Sharding can reduce blast radius, but adds operational complexity.
- Disaster recovery is not real until restore has been tested.

## Non-Goals

- Do not implement Kubernetes.
- Do not implement sharding.
- Do not split into microservices unless explicitly requested.
- Do not add cloud infrastructure code.

## Done When

- The future architecture can be explained clearly in an interview.
- Each scaling idea is tied to a concrete problem.
- The notes distinguish built features from proposed evolution.

## Phase Quiz

Answer these when Phase 7 is complete:

1. What does blast radius mean?
2. Why should API servers be stateless when scaling horizontally?
3. What problem can read replicas help with?
4. Why are backups not enough unless restore is tested?
5. Why should we explain Kafka, Kubernetes, and sharding as future options instead of building them on day one?
