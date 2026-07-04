# Credit Card System Agent Guide

This repository is a learning project for building a credit-card purchase and transaction-history system. Keep changes small, readable, and phase-aligned.

## Load Order

When starting a task, read only the minimum context needed:

1. `.ai/agent-contract.md`
2. `.ai/architecture-rules.md`
3. `.ai/coding-standards.md`
4. `Learning.md`, when the task teaches or explains a project concept
5. `.ai/features/current.md`
6. The active `.ai/features/active/**/feature.md`, if one exists
7. The current phase `.ai/tasks/phase-*/index.md`
8. The specific `.ai/tasks/**` task file being implemented
9. Existing code directly touched by the task

Do not load every document by default. Add context only when it changes a decision.

## Project Direction

- Start as a modular monolith.
- Build backend first with Postman-friendly APIs.
- Add frontend late, after backend behavior is stable.
- Prefer boring, correct code over clever abstractions.
- Treat financial records as audit-sensitive even though this is a mock system.

## Architectural Guardrails

- Keep module boundaries explicit.
- Do not introduce microservices unless a task explicitly asks for that exploration.
- Do not store real card numbers or sensitive payment data.
- Use database constraints for invariants that must never be violated.
- Preserve append-only history for money-related events once ledger work begins.

## Working Style

- Implement one task at a time.
- Before coding, state the task, assumptions, and files likely to change.
- After coding, run the narrowest useful verification.
- Keep the active feature dossier updated with status, decisions, mistakes, and next steps.
- Keep explanations simple enough for a grade 8 to 10 student.
- Use examples and plain language when explaining architecture or banking concepts.
- Update `Learning.md` when a task introduces an important new concept.
- After finishing a phase, ask the phase quiz from that phase's `index.md`.
- If a task would require architectural drift, stop and update the relevant ADR or ask for direction.
