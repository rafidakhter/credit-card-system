# Feature: Phase 1 Simple API

## Snapshot

- Status: Completed
- Phase: `.ai/tasks/phase-01-simple-api`
- Owner: project
- Last updated: 2026-07-04
- Current task: Completed
- Next step: Ask the Phase 1 quiz from `.ai/tasks/phase-01-simple-api/index.md` and move this dossier to completed.

## Purpose

Build the simplest working backend before adding database, purchases, idempotency, ledger events, or history filters. This phase proves the API can start, respond to requests, and grow into a modular monolith.

## Scope

- Create the initial NestJS API app.
- Add a basic health endpoint.
- Add Bruno API test collection for manual endpoint testing.
- Keep the structure ready for future modules.
- Later Phase 1 tasks will add purchase flow, idempotency, ledger events, history filters, Swagger, and tests around the domain-first service design.

## Non-Goals

- No frontend.
- No database in Task 001.
- No Prisma in Task 001.
- No purchases in Task 001.
- No ledger events in Task 001.
- No auth in Task 001.
- No Redis, queue, Kafka, Kubernetes, or microservices.

## Architecture Notes

- Start as a modular monolith: one backend app with clear internal module boundaries.
- Task 001 should stay intentionally small: app startup plus health endpoint.
- Health endpoint is a simple "is the app alive?" check.
- Prisma lives under `apps/prisma` by project decision, so database schema is kept outside the API source folder.
- Service logic should drive state changes. Persistence should support the domain, not lead it.
- Future modules should fit the Phase 1 direction: customers, cards, transactions, ledger, statements, merchants, and audit.

## API Contract

```text
GET /health
```

Request shape:

```json
{}
```

Response shape:

```json
{
  "status": "ok"
}
```

## Data Model Notes

- No database model in Task 001.
- Database work starts in `002-add-postgres-docker-compose.md` and `003-add-prisma-models.md`.
- Prisma schema path for this project: `apps/prisma/schema.prisma`.

## Progress

- [x] 001 Create NestJS app.
- [x] 002 Add PostgreSQL with Docker Compose.
- [x] 003 Add Prisma models.
- [x] 004 Design initial domain services and repository contracts.
- [x] 005 Build purchase endpoint.
- [x] 006 Add idempotency key check.
- [x] 007 Add immutable ledger events.
- [x] 008 Add purchase history ranges.
- [x] 009 Add Swagger docs.
- [x] 010 Add basic tests.

## Completed Work

| Date | Work | Verification |
| --- | --- | --- |
| 2026-07-04 | Created Phase 1 active feature dossier. | Dossier created at `.ai/features/active/phase-01-simple-api/feature.md`. |
| 2026-07-04 | Added Bruno collection for `GET /health`. | Collection files created under `bruno/credit-card-system`. |
| 2026-07-04 | Completed Task 001: created NestJS API app and health endpoint. | Bruno `Health Check` returned `{ "status": "ok" }`. |
| 2026-07-04 | Completed Task 002: added PostgreSQL with Docker Compose. | User confirmed Postgres is running from root `docker-compose.yaml`. |
| 2026-07-04 | Completed Task 003: added Prisma schema and initial migration. | User confirmed Prisma migration completed successfully. |
| 2026-07-04 | Added Node typings support for `apps/prisma.config.ts` by installing `@types/node` in `apps` and adding an `apps/tsconfig.json`. | Confirmed the config file now has a local TS project with `types: ["node"]`; direct `tsc` verification was not available because `typescript` is not installed in `apps`. |
| 2026-07-04 | Updated Nest config loading so the API reads `apps/api/.env.local` and `apps/api/.env` explicitly. | Confirmed `ConfigModule` now points to both files, fixing the missing `DATABASE_URL` lookup path. |
| 2026-07-04 | Added a shared Prisma seed script at `apps/prisma/seed.ts` and seeded a sample customer plus card. | Ran `npm run db:seed` from `apps/` successfully after wiring the Prisma client to the Postgres adapter and local env. |

## Decisions

| Date | Decision | Reason | ADR |
| --- | --- | --- | --- |
| 2026-07-04 | User will implement application code; Codex will maintain `.ai` and learning files unless asked to code. | Keeps the learning project hands-on for the user. | N/A |
| 2026-07-04 | Task 001 will not include database, Prisma, purchase logic, or ledger logic. | The first goal is only to prove the API app can start and respond. | N/A |
| 2026-07-04 | Keep Bruno tests at the project root under `bruno/credit-card-system`. | API tests can cover multiple apps later and stay separate from NestJS source code. | N/A |
| 2026-07-04 | Keep `docker-compose.yaml` at the repository root. | Database and future infrastructure are project-level concerns, not only API source files. | N/A |
| 2026-07-04 | Keep Prisma under `apps/prisma` instead of `apps/api/prisma`. | User wants database schema outside the API app to make the database layer feel separate. | N/A |
| 2026-07-04 | Shift Phase 1 Task 004 to a domain-first design task instead of seed-first work. | The user wants services to drive business behavior and database updates. | N/A |
| 2026-07-04 | Keep seed data next to the shared Prisma schema in `apps/prisma/seed.ts`. | One source of truth is clearer than duplicating seed logic inside the API app. | N/A |

## Mistakes and Lessons

| Date | Mistake or False Start | Lesson / Prevention |
| --- | --- | --- |
| 2026-07-04 | Seed-data-first thinking was starting to lead the design. | Keep the domain and service boundaries clear before using seed data as a support tool. |

## Open Questions

- Decide later whether to add package scripts for Prisma commands, or keep using explicit `npx prisma ...` from `apps/`.

## Handoff Notes

Phase 1 is complete. The next repository-maintenance step is to ask the Phase 1 quiz from `.ai/tasks/phase-01-simple-api/index.md`, then move this dossier from `.ai/features/active` to `.ai/features/completed` and update `.ai/features/current.md`.
