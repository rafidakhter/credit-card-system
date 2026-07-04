# Prompt: Debug an Issue

Use this when behavior is broken or unclear.

## Instruction

Debug by evidence, not guessing.

Steps:

1. Reproduce the issue or identify why it cannot be reproduced.
2. Inspect the narrowest relevant code path.
3. State the likely root cause.
4. Make the smallest fix.
5. Verify the fix.

## Constraints

- Do not rewrite unrelated code.
- Do not broaden scope while debugging.
- If the issue reveals an architectural problem, document it separately from the immediate fix.

## Final Response Format

Report:

- symptom
- root cause
- fix
- verification

