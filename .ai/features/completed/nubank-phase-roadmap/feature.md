# Feature: Nubank-Inspired Phase Roadmap

## Snapshot

- Status: Completed
- Phase: prompt infrastructure
- Owner: project
- Last updated: 2026-07-02
- Current task: expand learning roadmap for Nubank architecture interview prep
- Next step: start `phase-01-simple-api` with a feature dossier before writing app code

## Purpose

Expand the project roadmap so it teaches the architecture trade-offs behind financial systems: correctness, auditability, domain boundaries, async events, idempotency, resilience, and blast-radius reduction. The roadmap should help future AI sessions build incrementally while keeping the interview narrative clear.

## Scope

- Replace generic later phases with interview-focused phases.
- Add task briefs for financial correctness, domain boundaries, async events, idempotency, scaling/resilience, and deployment/blast-radius discussion.
- Update architecture rules to include lifecycle statuses, event consumers, retries, monitoring, and sharding as a late-stage concept.

## Non-Goals

- No application code.
- No NestJS scaffolding.
- No actual Kubernetes, Kafka, or sharding implementation.

## Architecture Notes

- The project still starts as a modular monolith.
- Microservices, Kubernetes, and sharding are explanation topics unless explicitly requested later.
- Complexity is introduced in response to business problems, not because the tools are fashionable.

## API Contract

```text
N/A
```

Request shape:

```json
{}
```

Response shape:

```json
{}
```

## Data Model Notes

- Later phases should add immutable transactions, status lifecycle fields, ledger entries, indexes, idempotency constraints, and outbox events.

## Progress

- [x] Add financial correctness phase.
- [x] Add domain boundaries phase.
- [x] Add async events phase.
- [x] Add idempotency phase.
- [x] Add scaling and resilience phase.
- [x] Add deployment and blast-radius phase.
- [x] Remove superseded generic task files.

## Completed Work

| Date | Work | Verification |
| --- | --- | --- |
| 2026-07-02 | Expanded `.ai/tasks` roadmap and architecture rules around Nubank-style architecture principles. | File tree inspection. |

## Decisions

| Date | Decision | Reason | ADR |
| --- | --- | --- | --- |
| 2026-07-02 | Use phase names that match the interview narrative. | Makes the project easier to explain verbally and easier for future models to follow. | N/A |
| 2026-07-02 | Keep deployment, Kubernetes/ECS, and sharding as late explanation tasks. | They are important interview concepts but should not complicate the learning app too early. | N/A |

## Mistakes and Lessons

| Date | Mistake or False Start | Lesson / Prevention |
| --- | --- | --- |
| 2026-07-02 | Earlier roadmap grouped several concerns into broad generic phases. | Prefer phases tied to business problems: correctness, boundaries, async reliability, idempotency, and blast radius. |

## Open Questions

- Should local async use Redis/BullMQ for ease of implementation, or Kafka/RabbitMQ for closer interview alignment?

## Handoff Notes

The next work should start with `.ai/tasks/phase-01-simple-api/001-create-nestjs-app.md`. Create an active feature dossier first, then implement only that task.
