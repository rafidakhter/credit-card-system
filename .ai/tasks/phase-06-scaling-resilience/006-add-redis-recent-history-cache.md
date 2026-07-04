# Task 006: Add Redis Recent History Cache

## Goal

Cache recent purchase history as an optimization.

## Scope

- Add Redis for recent history reads.
- Use short TTL.
- Keep database as source of truth.

## Acceptance Criteria

- Cache hit/miss behavior is visible.
- App remains correct if Redis is unavailable.

