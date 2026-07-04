# Coding Standards

These standards apply once application code exists.

## General

- Optimize for readability first.
- Use clear names over comments.
- Keep functions small enough to understand at a glance.
- Avoid premature abstraction.
- Avoid duplicating business rules across modules.
- Prefer boring framework conventions unless there is a concrete reason not to.

## TypeScript

- Use strict TypeScript patterns.
- Avoid `any` unless the boundary is genuinely unknown and documented.
- Prefer explicit DTOs for API input and output.
- Keep validation close to API boundaries.
- Keep persistence models separate from API contracts when behavior becomes non-trivial.

## NestJS

- Keep controllers thin.
- Put orchestration in application services.
- Keep domain rules out of controllers.
- Use modules to preserve feature boundaries.
- Do not let one feature reach into another feature's internal implementation.

Suggested module shape:

```text
modules/
  purchases/
    api/
    application/
    domain/
    infrastructure/
    tests/
```

Use this shape when the module has enough behavior to justify it. Do not create empty ceremony for tiny modules.

## Prisma and Database

- Use database transactions for multi-write financial operations.
- Use unique constraints for idempotency.
- Use indexes that match real query patterns.
- Do not rely only on application code for critical invariants.
- Avoid destructive edits to money records after ledger functionality exists.

## Testing

- Test business behavior, not framework internals.
- Include failure paths for purchase authorization, duplicate idempotency keys, invalid ranges, and unauthorized access.
- Keep test data readable and close to the test.

