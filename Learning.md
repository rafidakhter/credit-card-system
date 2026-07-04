# Learning Notes

This file tracks what I am learning while building the credit card purchase and transaction history system.

Keep notes simple. Explain ideas like I am in grade 8 to 10. Use examples.

## Big Idea

We are building a mock credit card backend.

A customer has a card. The customer makes purchases. The backend records those purchases. Later, the customer can view purchase history.

Because this is like a banking system, we care a lot about correctness. We do not want to lose money history, double-charge someone, or show the wrong balance.

## Functional Requirements

Functional requirements are what the system must do.

| Requirement | Simple Explanation | Example |
| --- | --- | --- |
| Create a customer | The system needs someone who owns the card. | A test customer named Alex exists in the database. |
| Create or seed a card | The customer needs a card with a credit limit. | Alex has a card with a $1,000 limit. |
| Create a purchase | The system must accept a mock purchase request. | Alex buys something for $50. |
| Validate the card | The system checks if the card exists and is active. | A blocked card cannot make purchases. |
| Check available limit | The system checks if the customer has enough credit left. | A $2,000 purchase fails if the limit is $1,000. |
| Record a transaction | The system stores the purchase. | A transaction row says Alex spent $50 at Amazon. |
| Record a ledger event | The system stores the money event in an append-only record. | `PURCHASE_APPROVED +50.00` is saved. |
| Prevent duplicate purchases | The system should not charge twice if the same request is retried. | Same `Idempotency-Key` returns the first result. |
| List purchase history | The customer can see past purchases. | Show all purchases from the last month. |
| Filter history by time | The system supports month, 3 months, and year filters. | `GET /transactions?range=3months`. |
| Track transaction status | The system knows where a transaction is in its lifecycle. | `PENDING -> APPROVED -> SETTLED -> REFUNDED`. |
| Support refunds | The system can refund without deleting the original purchase. | A refund adds a new correction event. |
| Document the API | The system has Swagger docs for testing. | Postman users can see request examples. |
| Add tests | The important flows should be tested. | A test proves duplicate purchase requests do not double-charge. |

## Non-Functional Requirements

Non-functional requirements describe how well the system must work.

| Requirement | Simple Explanation | Why It Matters |
| --- | --- | --- |
| Correctness | The system must store the right money data. | Wrong balances break trust. |
| Auditability | We should be able to look back and understand what happened. | Banks need a clear history. |
| Immutability | Do not erase the past. Add new records instead. | A refund should not delete the purchase story. |
| Reliability | Important writes should not be half-finished. | A purchase should not save without its ledger event. |
| Idempotency | Running the same request twice should not create two charges. | Network retries happen all the time. |
| Security | Customers should only see their own data. | Alex must not see Sam's transactions. |
| Privacy | Do not store real card numbers or sensitive payment data. | Less sensitive data means less risk. |
| Validation | Bad input should be rejected early. | Negative purchase amounts should fail. |
| Performance | History queries should be fast enough. | Customers should not wait forever for transactions. |
| Scalability | The design should grow step by step. | Add indexes, pagination, cache, and workers only when needed. |
| Maintainability | Code should be easy to read and change. | Future me should understand it without pain. |
| Observability | Logs and metrics should help us debug. | We need to know when purchases or workers fail. |
| Resilience | Failures should be handled safely. | A failed worker job should retry or go to dead-letter. |
| Simplicity | Start simple before adding fancy tools. | Microservices too early make learning harder. |

## Key Terms

| Term | Simple Meaning |
| --- | --- |
| Transaction | A record of a purchase or refund. |
| Ledger event | A permanent money-history entry. Think notebook written in pen. |
| Append-only | You can add new rows, but you do not edit/delete old money history. |
| Idempotency key | A unique request ID that prevents duplicate charges. |
| Modular monolith | One app, split into clean internal modules. |
| Outbox pattern | Save an event in the database first, then a worker sends/processes it later. |
| Dead-letter | A place for failed jobs that could not be processed after retries. |
| Blast radius | How much damage one failure can cause. Smaller is better. |

## Phase Learning Checklist

After each phase, answer the quiz in that phase's `index.md`.

Use this pattern:

1. What did I build?
2. Why did it matter?
3. What can go wrong?
4. How does the design prevent that problem?
5. What trade-off did I make?

## Running Notes

Add notes here as I learn new ideas.

| Date | Topic | What I Learned |
| --- | --- | --- |
| 2026-07-04 | Functional vs non-functional requirements | Functional means what the system does. Non-functional means how safely, quickly, and reliably it does it. |
| 2026-07-04 | Health endpoint | A health endpoint is a simple URL that tells us the app is running. It is like asking, "Are you alive?" and the app answers, "yes." |
| 2026-07-04 | Bruno collection | Bruno is a tool for saving API requests. It is like a notebook of buttons you can click to test endpoints such as `GET /health`. |
| 2026-07-04 | Manual API verification | Getting `{ "status": "ok" }` from Bruno means the API route is connected and responding correctly. |
| 2026-07-04 | Docker Compose | Docker Compose is a recipe for running local services. Here, it starts PostgreSQL so the API can use a real database later. |
| 2026-07-04 | Prisma location | Putting Prisma in `apps/prisma` means we are treating the database schema like a project-level database layer, not just a file inside the API folder. |
| 2026-07-04 | Prisma migration | A migration is Prisma's way of turning our schema into real database tables. It means the database now matches the model we designed. |
