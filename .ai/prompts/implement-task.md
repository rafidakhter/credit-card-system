# Prompt: Implement a Task

Use this to implement one task from `.ai/tasks`.

## Instruction

Implement the selected task end to end.

Load only:

- `AGENTS.md`
- `.ai/agent-contract.md`
- `.ai/architecture-rules.md`
- `.ai/coding-standards.md`
- `.ai/definition-of-done.md`
- `Learning.md`, when the task teaches a new concept
- active `.ai/features/active/**/feature.md`, if one exists for the work
- the selected phase `index.md`
- the selected task file
- code directly touched by the task

## Working Rules

- Make the smallest complete change.
- Preserve existing patterns.
- If no pattern exists, choose the simplest conventional approach.
- Add or update tests when the task creates behavior.
- Run the narrowest useful verification command.
- Update the active feature dossier with completed work, mistakes, decisions, and next steps.
- Update `Learning.md` when the task introduces an important concept, trade-off, or mistake.
- Explain concepts in simple grade 8 to 10 language.

## Final Response Format

Report:

- what changed
- verification run
- assumptions or follow-ups
- feature dossier updates
- `Learning.md` updates, if any

Keep the response concise.
