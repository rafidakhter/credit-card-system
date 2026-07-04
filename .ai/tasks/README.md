# Task Briefs

These files are prompt-friendly task briefs. They are intentionally small so an AI session can load one task at a time.

Each phase folder has an `index.md` overview. Read the phase `index.md` before reading individual task files.

Recommended order:

1. `phase-01-simple-api`
2. `phase-02-financial-correctness`
3. `phase-03-domain-boundaries`
4. `phase-04-async-events`
5. `phase-05-idempotency`
6. `phase-06-scaling-resilience`
7. `phase-07-deployment-blast-radius`

Each task should be implemented with `.ai/prompts/implement-task.md`.

## Phase Folder Shape

```text
phase-XX-name/
  index.md
  001-task-name.md
  002-task-name.md
```

The `index.md` explains the phase goal, architecture lesson, micro tasks, what should not be built yet, and the phase quiz. Task files describe one implementable slice.

## Learning Workflow

- Keep explanations simple enough for grade 8 to 10.
- Update root `Learning.md` when a phase teaches an important idea.
- After a phase is completed, ask the quiz from that phase's `index.md`.
- Do not move to the next phase until the user can explain the main lesson in simple words.

## Interview Narrative

Use the phases to tell a clear architecture story:

1. Start simple: Client/Postman to API server to database.
2. Make financial data correct and auditable.
3. Encapsulate complex banking domains with module boundaries.
4. Add async events for slow or cross-domain work.
5. Add idempotency because retries and duplicate messages happen.
6. Add scaling and resilience where pressure appears.
7. Explain deployment, failure isolation, and blast-radius reduction.

The key trade-off: do not start with fancy infrastructure. Add complexity only when the business problem justifies it.
