# Task 008: Add Purchase History Ranges

## Goal

List purchase history by month, 3 months, and year.

## Scope

- Add `GET /transactions`.
- Support `range=month`, `range=3months`, and `range=year`.
- Return newest records first.

## Acceptance Criteria

- Each supported range returns expected records.
- Invalid ranges fail validation.
- Results are scoped to the intended customer/card design.

