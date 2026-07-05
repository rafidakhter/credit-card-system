# Feature: Phase 2 Financial Correctness

## Snapshot

- Status: In progress
- Phase: `.ai/tasks/phase-02-financial-correctness`
- Owner: project
- Last updated: 2026-07-04
- Current task: `.ai/tasks/phase-02-financial-correctness/001-wrap-purchase-in-db-transaction.md`
- Next step: Wrap purchase creation in a database transaction.

## Purpose

Phase 2 makes the money path safer and more realistic. The goal is to teach that financial systems must protect correctness, history, and auditability even when the code stays simple.

## Scope

- Make purchase writes atomic.
- Strengthen idempotency protection with database support.
- Validate card limits before purchase approval.
- Add refund and audit behavior.
- Make transaction status changes explicit and safe.

## Non-Goals

- No async queue yet.
- No Kafka or Redpanda.
- No microservice split.
- No complex billing or interest logic.

## Architecture Notes

- Keep the modular monolith shape from Phase 1.
- Use database transactions for multi-write money flows.
- Preserve append-only history for ledger and refund-related records.
- Reject invalid transaction status transitions instead of silently fixing them.

## API Contract

```text
POST /purchases
POST /refunds
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

- Purchase creation should succeed or fail as one unit.
- Add constraints that protect idempotency and financial correctness.
- Refunds should create compensating records instead of mutating the original purchase away.

## Progress

- [ ] 001 Wrap purchase creation in a database transaction.
- [ ] 002 Add unique constraint on `idempotency_key`.
- [ ] 003 Add card limit validation.
- [ ] 004 Add refund flow.
- [ ] 005 Add audit logs.
- [ ] 006 Prevent deleting ledger events through normal application code.
- [ ] 007 Add transaction status lifecycle.

## Completed Work

| Date | Work | Verification |
| --- | --- | --- |
| 2026-07-04 | Created Phase 2 active feature dossier. | Dossier created at `.ai/features/active/phase-02-financial-correctness/feature.md`. |
| 2026-07-05 | Aligned API Prisma imports to the generated client under `apps/generated/prisma`. | Confirmed `AuditLog` exists in the generated client and removed remaining `@prisma/client` imports from `apps/api/src`. |
| 2026-07-05 | Simplified Prisma back to the standard client location in `apps/node_modules/@prisma/client`. | Removed the custom generator output, regenerated Prisma successfully, and deleted the old `apps/generated/prisma` folder. |

## Decisions

| Date | Decision | Reason | ADR |
| --- | --- | --- | --- |
| 2026-07-04 | Start Phase 2 with purchase atomicity. | Multi-write money flows should become safe before adding more financial behavior. | N/A |
| 2026-07-05 | Use the default Prisma client location instead of a custom generated folder. | This keeps imports simple and prevents type mismatches between `@prisma/client` and a second generated client. | N/A |

## Mistakes and Lessons

| Date | Mistake or False Start | Lesson / Prevention |
| --- | --- | --- |
| 2026-07-05 | The API was importing Prisma types from `@prisma/client` while the schema generates the client to `apps/generated/prisma`. | When Prisma uses a custom `output`, app code should import from that generated client or the type surface can fall out of sync. |
| 2026-07-05 | A mixed setup grew where some files used `@prisma/client`, some used `apps/generated/prisma`, and one used `@prisma/client/edge`. | Keep one Prisma client import path across the backend so migrations, generate, and editor types all stay aligned. |

## Open Questions

- Decide later whether refunds should reuse the purchase module or become their own module boundary.

## Handoff Notes

Phase 2 is now the active feature. Start with `.ai/tasks/phase-02-financial-correctness/001-wrap-purchase-in-db-transaction.md` and keep explanations focused on why financial correctness matters.
