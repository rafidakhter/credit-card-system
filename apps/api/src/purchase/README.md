# Purchase Module

## Owns

The purchase module owns the purchase request flow.

It coordinates the steps needed to approve or decline a purchase.

## Examples

- receive purchase request
- validate purchase input
- check customer exists
- check card exists
- check card belongs to customer
- check card is active
- check available limit
- create transaction
- create ledger event
- reduce available limit

## Does Not Own

- customer profile management
- billing cycle calculations
- notification delivery
- analytics reporting
- raw card data

## Rule

Purchase coordinates the purchase flow.

It should not become a place for every banking rule.
