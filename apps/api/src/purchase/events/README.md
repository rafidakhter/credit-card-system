# Purchase Events

## PurchaseCreated

`PurchaseCreated` is a business event that means a purchase was successfully recorded.

## Producer

The purchase flow will create this event after the purchase transaction is recorded.

## Future Consumers

- billing or statements
- notifications
- analytics

## Payload Rules

Do not include sensitive data.

Allowed:

- IDs
- amount
- currency
- timestamp

Not allowed:

- raw card number
- CVV
- auth token
- full customer personal details
