# Task 005: Build Purchase Endpoint

## Goal

Build `POST /transactions/purchase`.

## Scope

- Validate request body.
- Confirm customer/card exists.
- Confirm card is active.
- Confirm available limit is enough.
- Create the transaction record.

## Acceptance Criteria

- Valid purchase succeeds.
- Invalid card fails.
- Insufficient limit fails.
- Response is Postman-friendly.

