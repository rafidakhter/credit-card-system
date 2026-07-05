# Phase 1: Build the Simple Working System

## Goal

Prove the core business flow with the simplest reliable design:

```text
Client/Postman -> NestJS API -> PostgreSQL
```

This phase should already be useful in an interview because it shows a working purchase system without over-engineering.

We are taking a domain-first approach:

- model the business behavior first
- define services before controller-heavy implementation
- let services decide state changes
- let the database persist the result

## What We Are Trying to Achieve

- A customer can have a card account.
- A mock purchase can be created through Postman.
- The backend records the purchase.
- The system prevents obvious duplicate purchase requests.
- Money-related movement is recorded in an append-only ledger.
- Purchase history can be viewed by month, 3 months, and year.
- The API is documented and covered by basic tests.

## Architecture Lesson

Start with a modular monolith. Keep one backend app, but draw clean module boundaries so the system can evolve later.

Interview line:

```text
I would not start with microservices. I would start with a simple modular monolith, prove the domain, and keep boundaries clear so we can split later if scale or team ownership justifies it.
```

## Micro Tasks

- [ ] Create NestJS app using JavaScript or the project-selected NestJS default.
- [ ] Add PostgreSQL with Docker Compose.
- [ ] Add Prisma models.
- [ ] Design initial domain services and repository contracts.
- [ ] Build `POST /transactions/purchase`.
- [ ] Add idempotency key check.
- [ ] Add immutable `ledger_events`.
- [ ] Add purchase history by month, 3 months, and year.
- [ ] Add Swagger docs.
- [ ] Add basic tests.

## Suggested Modules

- `auth`: login, JWT, customer identity later if needed in this phase
- `customers`: customer profile
- `cards`: credit limit, available balance, card status
- `transactions`: purchase request, idempotency, transaction status
- `ledger`: immutable money events
- `statements`: monthly summaries and history later
- `merchants`: mock merchant data if useful
- `audit`: who did what and when later

## Service-First Direction

Before building more endpoints, define the first use cases:

- `CreatePurchaseService`
- `GetTransactionHistoryService`
- later `CreateCustomerService`
- later `IssueCardService`

The service layer should:

- validate business rules
- decide whether a purchase is allowed
- call repositories to save the result

The database layer should:

- load and save data
- not contain the main business decision-making

## API Direction

```text
POST /transactions/purchase
GET /transactions?range=month
GET /transactions?range=3months
GET /transactions?range=year
```

Purchase requests require:

```text
Idempotency-Key: unique-request-id
```

## Non-Goals

- No frontend.
- No Redis cache.
- No Kafka, Redpanda, RabbitMQ, or SQS.
- No Kubernetes or cloud deployment.
- No microservices.
- No complex fraud engine.

## Done When

- The first service and repository boundaries are clear.
- Duplicate purchase requests do not double-charge.
- Ledger events preserve the money story.
- Purchase history works for the required ranges.
- Swagger and basic tests exist.

## Phase Quiz

Answer these before moving to Phase 2:

1. In your own words, what did Phase 1 prove?
2. Why do we start with a modular monolith instead of microservices?
3. Why does a purchase request need an `Idempotency-Key`?
4. What is a `ledger_event`, explained like a notebook written in pen?
5. What could go wrong if we only stored purchases in a simple editable table?
