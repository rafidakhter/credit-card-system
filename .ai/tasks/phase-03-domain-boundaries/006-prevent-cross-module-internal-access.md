# Task 006: Prevent Cross-Module Internal Access

## Goal

Avoid accidental coupling between modules.

## Scope

- Identify internal APIs vs public module APIs.
- Refactor direct internal access where needed.

## Acceptance Criteria

- Modules depend on public interfaces.
- Internal implementation details are not imported casually.

