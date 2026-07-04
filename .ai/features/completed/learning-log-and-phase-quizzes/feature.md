# Feature: Learning Log and Phase Quizzes

## Snapshot

- Status: Completed
- Phase: prompt infrastructure
- Owner: project
- Last updated: 2026-07-04
- Current task: add root learning notes and phase quizzes
- Next step: use `Learning.md` during Phase 1 implementation

## Purpose

Make the project easier to learn from, not just build. The root `Learning.md` explains concepts in simple grade 8 to 10 language, and each phase now has quiz questions to check understanding before moving forward.

## Scope

- Added root `Learning.md`.
- Added functional and non-functional requirement tables.
- Added phase quiz sections to all phase `index.md` files.
- Updated AI guidance to use simple explanations.
- Updated prompts and definition of done to update `Learning.md` when important concepts are learned.

## Non-Goals

- No application code.
- No implementation of project phases.
- No formal school-style grading.

## Architecture Notes

- `Learning.md` is the human learning log.
- Feature dossiers are project handoff memory.
- Phase indexes are phase maps and quiz checkpoints.

## Progress

- [x] Create `Learning.md`.
- [x] Add requirement tables.
- [x] Add simple-language instruction.
- [x] Add phase quizzes.
- [x] Update AI workflow docs.

## Completed Work

| Date | Work | Verification |
| --- | --- | --- |
| 2026-07-04 | Added learning log, requirement tables, simple-language rules, and phase quizzes. | File inspection and quiz-section search. |

## Decisions

| Date | Decision | Reason | ADR |
| --- | --- | --- | --- |
| 2026-07-04 | Keep learning notes in root `Learning.md`. | Easy to find and separate from AI handoff files. | N/A |
| 2026-07-04 | Add quizzes to phase `index.md` files. | The phase overview is the natural checkpoint before moving on. | N/A |

## Mistakes and Lessons

| Date | Mistake or False Start | Lesson / Prevention |
| --- | --- | --- |
| 2026-07-04 | AI guidance previously optimized for building but not explicit learning checks. | Add learning and quiz rules to the workflow, not only to a standalone file. |

## Open Questions

- Should quiz answers also be tracked in `Learning.md`, or should they stay in chat during review?

## Handoff Notes

Future sessions should explain new concepts simply, update `Learning.md` when useful, and ask phase quiz questions before moving to the next phase.

