# Task 004: Add Refund Flow

## Goal

Support refunds without erasing purchase history.

## Scope

- Add refund endpoint.
- Validate refundable status.
- Create compensating ledger event.
- Update transaction status through valid transition.

## Acceptance Criteria

- Refund preserves original purchase.
- Invalid refunds fail.
- Ledger shows the correction story.

