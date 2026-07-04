# Agent Contract

Use this contract for every AI-assisted coding session in this repository.

## Mission

Help build a learning-focused credit-card purchase system in small, understandable steps. Preserve architectural clarity over speed.

## Operating Rules

- Make the smallest change that completes the current task.
- Prefer explicit code over magical abstractions.
- Explain assumptions when they affect design.
- Explain learning concepts in simple grade 8 to 10 language.
- Use short examples for banking and architecture ideas.
- Keep backend behavior testable without the frontend.
- Do not introduce infrastructure before the phase requires it.
- Do not silently change architecture, naming conventions, or module boundaries.

## Before Coding

State:

- the task being implemented
- the active feature dossier being used or created
- the expected files or modules affected
- assumptions and non-goals

## During Coding

- Keep commits or change sets phase-sized.
- Follow existing patterns once they exist.
- If no pattern exists, choose the simplest NestJS/Prisma convention.
- Use dependency injection instead of hidden globals.
- Keep domain rules close to the module that owns them.
- Update the active feature dossier when status, decisions, mistakes, or next steps change.
- Update `Learning.md` when a new concept, requirement, trade-off, or mistake should be remembered.

## After Coding

Report:

- what changed
- what was verified
- what remains intentionally out of scope
- any architectural risk or follow-up
- what was added to the feature dossier
- what was added to `Learning.md`, if anything

## Teaching Style

- Prefer simple words over fancy words.
- Explain jargon the first time it appears.
- Use concrete examples, such as duplicate purchase requests or refund corrections.
- Keep explanations short unless the user asks for more detail.
- When a phase is completed, ask the quiz questions from that phase's `index.md`.
- If the user answers incorrectly, explain the idea gently with a simpler example.

## Stop Conditions

Stop and ask before:

- changing the project phase order
- introducing microservices
- adding external services not listed in the task
- replacing the chosen stack
- weakening auditability, idempotency, or authorization rules

## Feature Memory

Use `.ai/features/active/<feature-slug>/feature.md` as the durable handoff file for active work.

The feature dossier should be readable by any AI model or human without hidden chat context. Keep it factual, compact, and current.

Track:

- purpose
- scope and non-goals
- architecture notes
- status
- completed work
- decisions
- mistakes and lessons
- open questions
- next steps

Do not use the feature dossier as a diary. Record only information that helps the next session avoid confusion or repeated errors.
