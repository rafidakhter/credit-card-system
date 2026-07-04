# Feature Dossiers

This folder tracks active and completed features in plain Markdown so any AI model or human can resume work without relying on previous chat history.

## Structure

```text
.ai/features/
  README.md
  current.md
  _template/
    feature.md
  active/
    <feature-slug>/
      feature.md
  completed/
    <feature-slug>/
      feature.md
```

## Rules

- Keep one `feature.md` per feature.
- Write notes as project facts, not model-specific memories.
- Keep entries compact and useful for handoff.
- Record mistakes when they would prevent repeated errors.
- Move feature folders from `active` to `completed` when done.

## What Belongs Here

- Feature purpose and scope
- Current status
- Architecture notes
- Task progress
- Decisions made
- Mistakes and lessons
- Open questions
- Next handoff step

## What Does Not Belong Here

- Long chat transcripts
- Temporary thoughts that do not affect future work
- Secrets, tokens, credentials, or private data
- Full implementation plans that duplicate task files

