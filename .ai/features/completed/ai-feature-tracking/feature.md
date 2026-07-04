# Feature: AI Feature Tracking System

## Snapshot

- Status: Completed
- Phase: prompt infrastructure
- Owner: project
- Last updated: 2026-07-02
- Current task: create model-agnostic feature memory structure
- Next step: start the first application feature dossier before bootstrapping the API

## Purpose

Create a durable project memory system so different AI models or humans can resume feature work without relying on previous chat history. The system tracks what is being built, why it exists, how it is architected, what is complete, and what mistakes should not be repeated.

## Scope

- Add `.ai/features` structure.
- Add a reusable feature dossier template.
- Add a current feature pointer.
- Add prompts for starting and continuing features.
- Update existing AI guidance to require dossier updates during implementation.

## Non-Goals

- No application code.
- No NestJS or Next.js scaffolding.
- No tool-specific memory format.

## Architecture Notes

- Feature memory is plain Markdown to stay model agnostic.
- Each feature owns one `feature.md` file.
- Active work lives under `.ai/features/active`.
- Completed work lives under `.ai/features/completed`.
- `.ai/features/current.md` points to the active feature so future sessions can load context cheaply.

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

- No runtime data model.
- The dossier template acts as the structured schema.

## Progress

- [x] Add feature folder structure.
- [x] Add feature dossier template.
- [x] Add current feature pointer.
- [x] Add start and continue prompts.
- [x] Update agent contract and implementation prompt.
- [x] Update root agent guide load order.

## Completed Work

| Date | Work | Verification |
| --- | --- | --- |
| 2026-07-02 | Added model-agnostic feature tracking docs and prompts. | File tree inspection. |

## Decisions

| Date | Decision | Reason | ADR |
| --- | --- | --- | --- |
| 2026-07-02 | Use plain Markdown dossiers instead of tool-specific memory. | Keeps handoff portable between ChatGPT, Claude, IDEs, and humans. | N/A |
| 2026-07-02 | Keep feature status separate from task briefs. | Tasks describe planned work; feature dossiers track actual progress, mistakes, and decisions. | N/A |

## Mistakes and Lessons

| Date | Mistake or False Start | Lesson / Prevention |
| --- | --- | --- |
| 2026-07-02 | Initial AI guidance had tasks but no durable feature memory. | Always create or update a feature dossier before sustained implementation work. |

## Open Questions

- Should the first application feature be `bootstrap-nest-api` or a broader `simple-api-phase` dossier?

## Handoff Notes

Before building application code, create an active feature dossier from `.ai/features/_template/feature.md`, update `.ai/features/current.md`, then implement one task from `.ai/tasks`.

