# Prompt: Continue a Feature

Use this when resuming work from a previous session or different AI model.

## Instruction

Resume the active feature from the project files, not from chat memory.

Load only:

- `AGENTS.md`
- `.ai/agent-contract.md`
- `.ai/architecture-rules.md`
- `Learning.md`, when the next step teaches a concept
- `.ai/features/current.md`
- the active feature dossier
- the current phase `index.md`
- the current task file named in the dossier
- code directly related to the next step

## Steps

1. Summarize the current feature state in 3-5 bullets.
2. Identify the next task.
3. Implement only that next task.
4. Run the narrowest useful verification.
5. Update the feature dossier with completed work, mistakes, decisions, and next step.
6. Update `Learning.md` when a concept, trade-off, or mistake should be remembered.

## Constraints

- Do not assume prior chat context.
- Do not repeat mistakes listed in the dossier.
- Do not change feature scope without recording the decision.
- Explain concepts in simple grade 8 to 10 language.

## Final Response Format

Report:

- resumed feature
- work completed
- verification run
- dossier updates
