# Task 005: Track Processed Event IDs per Consumer

## Goal

Make async consumers safe against duplicate messages.

## Scope

- Store processed event ID per consumer.
- Skip events already processed by that consumer.

## Acceptance Criteria

- Same event can be safely delivered twice.
- Consumer-specific processing is tracked.

