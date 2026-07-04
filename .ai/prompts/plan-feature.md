# Prompt: Plan a Feature

Use this when the implementation path is unclear.

## Instruction

You are planning one feature for the credit-card-system learning project.

Load only:

- `AGENTS.md`
- `.ai/agent-contract.md`
- `.ai/architecture-rules.md`
- `.ai/coding-standards.md`
- `.ai/features/_template/feature.md`
- active feature dossier if the feature already exists
- the relevant task file
- existing code directly related to the feature

## Output Format

Return:

1. Goal
2. Assumptions
3. Non-goals
4. Proposed design
5. Files likely to change
6. Test plan
7. Feature dossier updates needed
8. Risks or trade-offs

## Constraints

- Keep the plan phase-aligned.
- Prefer modular monolith design.
- Do not propose infrastructure not required by the task.
- Flag any decision that deserves an ADR.
- Keep the feature dossier plain Markdown and model agnostic.
