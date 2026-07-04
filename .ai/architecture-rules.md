# Architecture Rules

These rules prevent architectural drift.

## System Shape

Start with a modular monolith:

- one NestJS backend
- one PostgreSQL database
- Prisma for persistence
- Postman-first API testing
- Next.js frontend later
- Redis/BullMQ only in later async phases

Do not split into microservices during the initial build.

## Module Ownership

Each business capability should own its API, application logic, domain rules, infrastructure adapters, and tests.

Primary capabilities:

- purchases
- transactions
- cards
- customers
- accounts
- billing
- ledger
- statements
- notifications
- analytics
- auth

## Financial Safety Rules

- A purchase must not create inconsistent transaction and balance state.
- Multi-write purchase flows must use database transactions.
- Duplicate purchase requests must be handled with idempotency once that phase begins.
- Transaction records must have stable IDs.
- Financial records need audit fields such as `created_at`, `updated_at` where appropriate, and status transition timestamps when useful.
- Ledger entries are append-only once introduced.
- Refunds should create compensating records, not mutate the original money record.
- Status transitions should be explicit and validated.

Example transaction lifecycle:

```text
AUTHORIZED -> CAPTURED -> SETTLED -> REFUNDED
```

## API Direction

Initial endpoints:

```text
POST /purchases
GET /transactions?range=1m
GET /transactions?range=3m
GET /transactions?range=1y
```

Improved history endpoint:

```text
GET /transactions?from=2026-03-01&to=2026-06-01&limit=50&cursor=txn_123
```

## Security Direction

- Use JWT authentication when auth is introduced.
- Users can only access their own cards and transactions.
- Validate request DTOs.
- Rate-limit purchase creation when rate limiting is introduced.
- Never log tokens, raw card data, or sensitive request headers.
- Do not store real card numbers.

## Scalability Direction

Improve in this order:

1. correct schema and constraints
2. clear module boundaries
3. indexes for transaction history
4. cursor pagination
5. async workers for slow side effects
6. outbox pattern for reliable event publishing
7. Redis cache only when read pressure justifies it
8. read models only if query pressure justifies them
9. deployment scaling and blast-radius reduction as an explanation phase

## Async and Reliability Direction

When a purchase is created, later phases may publish:

```text
PurchaseCreated
```

Consumers may include:

- billing updates monthly bill
- notification sends alert
- analytics stores spending pattern

Async flows must handle:

- retries
- duplicate messages
- ordering assumptions
- dead-letter queues
- monitoring and alerts
- idempotent consumers

## Deployment and Blast Radius Direction

Deployment and infrastructure work belongs late in the project.

Explain options before building them:

- Docker Compose for local learning
- ECS or Kubernetes for container orchestration discussion
- horizontal scaling for stateless API instances
- database scaling through indexes, connection pooling, replicas, and partitioning only when justified
- shard-like isolation as an interview concept for reducing blast radius

Do not build Kubernetes or sharding into the learning app unless explicitly requested.
