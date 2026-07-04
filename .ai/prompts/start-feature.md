# Prompt: Start a Feature

Use this when beginning a new feature.

## Instruction

Create a feature dossier before implementation begins.

Load only:

- `AGENTS.md`
- `.ai/agent-contract.md`
- `.ai/architecture-rules.md`
- `.ai/features/README.md`
- `.ai/features/_template/feature.md`
- the relevant task file, if one exists

## Steps

1. Choose a short kebab-case feature slug.
2. Create `.ai/features/active/<feature-slug>/feature.md` from the template.
3. Fill in purpose, scope, non-goals, architecture notes, progress, and next step.
4. Update `.ai/features/current.md` with the active feature path.

## Constraints

- Keep the dossier plain Markdown.
- Do not include chat transcripts.
- Do not include model-specific references.
- Do not over-plan beyond the current phase.

## Final Response Format

Report:

- feature slug
- dossier path
- next implementation task

