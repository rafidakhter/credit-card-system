# ChatGPT Handoff

Use this file when discussing the project in ChatGPT before coming back to Codex for implementation.

## What This Project Is

This is a learning project for a credit card backend system.

The system will grow in phases:

- create purchases
- list transaction history
- add idempotency
- add immutable ledger events
- improve correctness and scalability later

The goal is not just to make it work. The goal is to learn clean backend design.

## Current Stack

- NestJS backend
- PostgreSQL database
- Prisma ORM
- Bruno for API testing

## Current Architecture Direction

- Start as a modular monolith
- Backend first
- Frontend later
- Keep code simple and readable
- Use service logic to drive business behavior
- Let the database persist the result
- Do not jump to microservices

## Important Rules

- Keep explanations simple enough for an 8th to 10th grader
- Prefer small, clear changes
- Do not introduce fancy abstractions early
- Do not store real card numbers or sensitive payment data
- Treat financial history as audit-sensitive
- Once ledger work begins, money history should be append-only
- Use database transactions for multi-write financial flows

## Current Project State

- NestJS app is created
- Health endpoint works
- PostgreSQL is running with Docker Compose
- Prisma schema and first migration are done
- Current focus is Phase 1 Task 004

## Current Task

Phase 1 Task 004 is now a design-first task.

We are not starting with seed-data-driven design.
We are defining the first domain services and repository boundaries first.

Current implementation direction:

- keep the folder structure simple
- stay close to the `health` module style
- use:

```text
purchases/
  purchases.module.ts
  purchases.service.ts
  purchases.controller.ts
  dto/
    create-purchase.dto.ts
  types/
    purchase-result.type.ts
```

## First Service We Are Designing

The first main service is:

`CreatePurchaseService`

Its job is to:

- check customer exists
- check card exists
- check the card belongs to that customer
- check card is active
- check available limit is enough
- create the transaction
- create the ledger event
- reduce available limit

## Prisma Model Summary

Current main models:

- `Customer`
- `Card`
- `Transaction`
- `LedgerEvent`

Important idea:

- customer makes the purchase
- card is the payment tool
- transaction records what happened
- ledger event preserves the money story

## How ChatGPT Should Help

Please help as a design partner.

Good kinds of help:

- explain backend concepts simply
- review service design
- review DTOs and return types
- suggest cleaner naming
- point out architectural drift
- explain tradeoffs
- help think through edge cases

Avoid:

- pushing microservices early
- overengineering the folder structure
- suggesting complex infrastructure before the phase needs it
- making the database shape drive the business design

## How To Answer

- keep answers short
- use simple language
- give one step at a time when implementation is being discussed
- explain jargon in plain English
- use small concrete examples

## What To Assume

- I will discuss ideas in ChatGPT
- I will come back to Codex for implementation help
- Codex is maintaining `.ai` files and project tracking
- I want model-agnostic notes and low architectural drift

## Useful Repo Context

- Main project guide: `AGENTS.md`
- AI workflow guide: `.ai/README.md`
- Agent rules: `.ai/agent-contract.md`
- Architecture rules: `.ai/architecture-rules.md`
- Active feature pointer: `.ai/features/current.md`
- Current feature dossier: `.ai/features/active/phase-01-simple-api/feature.md`
- Current phase index: `.ai/tasks/phase-01-simple-api/index.md`

## Prompt To Paste Into ChatGPT

```text
You are helping me think through a learning project for a credit card backend.

Please follow these rules:
- Keep explanations simple enough for an 8th to 10th grader.
- Keep answers short.
- Give one step at a time when discussing implementation.
- Prefer simple, readable backend design over fancy patterns.
- Do not push microservices or overengineering.
- Treat financial data as correctness-sensitive and audit-sensitive.
- Use service-first thinking: business logic should drive persistence, not the other way around.

Current project state:
- NestJS backend
- PostgreSQL
- Prisma
- Bruno for API testing
- Health endpoint works
- Prisma schema and first migration are done
- Current focus is designing and implementing the purchases flow in a simple way

Current folder direction:
purchases/
  purchases.module.ts
  purchases.service.ts
  purchases.controller.ts
  dto/
    create-purchase.dto.ts
  types/
    purchase-result.type.ts

Please help me think through the next step without overcomplicating the project.
```
