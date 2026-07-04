# AI Working System

This folder contains prompts, rules, and task briefs for building the credit-card-system project with any capable coding model.

The goal is to make future AI sessions:

- model agnostic
- token efficient
- architecture consistent
- readable and maintainable
- safe for iterative learning

## Folder Map

- `agent-contract.md`: how an AI agent should work in this repo
- `architecture-rules.md`: non-negotiable architecture constraints
- `coding-standards.md`: code quality and readability rules
- `definition-of-done.md`: completion checklist for each task
- `features/`: durable feature dossiers for status, decisions, mistakes, and handoffs
- `prompts/`: reusable prompts for planning, implementation, review, debugging, and ADR updates
- `tasks/`: small task briefs grouped by learning phase

## Recommended Workflow

1. Create or select a feature dossier in `.ai/features/active`.
2. Pick one task from `.ai/tasks`.
3. Use `.ai/prompts/plan-feature.md` if the implementation path is unclear.
4. Use `.ai/prompts/implement-task.md` to build the task.
5. Update the feature dossier with completed work, mistakes, decisions, and next steps.
6. Use `.ai/prompts/review-code.md` before moving on.
7. Update architecture notes or ADRs only when a decision changes the system direction.

## Token Discipline

Load only what is needed for the current task. Prefer targeted file reads over broad scans.

Default context:

- root `AGENTS.md`
- `.ai/agent-contract.md`
- `.ai/architecture-rules.md`
- `.ai/coding-standards.md`
- current `.ai/features/active/**/feature.md`, if one exists
- current task file

Add more context only when it affects behavior, architecture, or tests.

## Model-Agnostic Handoff

Every feature should leave a plain Markdown trail that another model can continue from:

- what we are building
- why it exists
- current status
- completed work
- decisions made
- mistakes or false starts to avoid repeating
- next recommended step

Avoid model-specific references such as "ChatGPT decided" or "Claude should." Write notes as project facts.
