# Refund Module

## Owns

The refund module owns refund request behavior.

It handles the business flow for reversing or compensating a previous purchase.

## Examples

- validate refund request
- check original transaction exists
- check transaction can be refunded
- create refund transaction
- create refund ledger event
- restore available limit if needed

## Does Not Own

- original purchase approval
- customer profile data
- billing cycle calculations
- notifications
- analytics

## Rule

Refunds should create new records.

Do not erase or rewrite the original purchase money history.
