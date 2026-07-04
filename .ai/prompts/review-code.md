# Prompt: Review Code

Use this before moving from one task to the next.

## Instruction

Review the current change set for bugs, architectural drift, missing tests, and readability problems.

Focus on:

- incorrect behavior
- unsafe financial state changes
- missing idempotency or transaction handling where required
- weak authorization boundaries
- leaky module boundaries
- over-engineering
- missing or fragile tests
- stale or missing feature dossier updates

## Output Format

Return findings first, ordered by severity:

```text
Severity: high | medium | low
File:
Issue:
Why it matters:
Suggested fix:
```

If no findings are found, say so and list residual risks.
