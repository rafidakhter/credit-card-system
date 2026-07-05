# Health Module

## Owns

The health module owns simple system health checks.

It answers:

- is the backend running?
- can the API respond?

## Examples

- `GET /health`

## Does Not Own

- business logic
- purchases
- transactions
- database rules
- customer data

## Rule

Health checks should stay simple.
