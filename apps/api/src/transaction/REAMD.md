# Transaction Module

## Owns

The transaction module owns transaction records and transaction state.

It answers questions like:

- what happened?
- when did it happen?
- what is the transaction status?
- can this transaction move to the next status?

## Examples

- purchase transaction
- refund transaction
- transaction history
- transaction status transitions

## Does Not Own

- customer profile data
- card activation rules
- credit limit ownership
- ledger event storage
- billing summaries
- notifications
- analytics

## Rule

Transactions record business activity.

Ledger records the money movement.
