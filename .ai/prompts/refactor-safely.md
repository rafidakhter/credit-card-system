# Prompt: Refactor Safely

Use this when improving structure without changing behavior.

## Instruction

Refactor only the requested area. Preserve external behavior.

Before editing:

- identify current behavior
- identify tests or manual checks that protect it
- state the exact refactor boundary

Rules:

- no behavior changes unless explicitly requested
- no new architecture layer unless it removes real complexity
- keep names clearer than before
- run tests before and after when practical

## Final Response Format

Report:

- refactor boundary
- behavior preserved
- verification run
- any risk left uncovered

