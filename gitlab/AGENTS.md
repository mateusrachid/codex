# Toolkit

## Typecheck

```bash
pnpm tsc --noEmit
```

No need for npx.

## Linting

```bash
pnpm eslint --quiet
```

We don't care about linter warnings. Also no need for npx.

## Running a standalone file

```bash
pnpm tsx -r dotenv/config <filepath>
```

No need for npx.

# Coding Guide

- Prefer a functional and immutable approach (avoid let and modifying object properties).
- Typechecking and linting must pass.
- Type-safety first: Avoid arbitrary casts.

## About types:

- No `any` never. No `as` anything. If data is coming from outside as `any`, accept it as `unknown` and validate it.

## About comments

- Follow the convention of the codebase. Basically:
  - We add todo and fixme comments when they are needed.
  - We add jsdocs to complicated utility functions.
  - We DON'T add jsdocs to self-explanatory methods like route handlers, service methods and DAO methods.
  - We don't add comments to self-explanatory code lines and methods.

This basically means: We ALMOST NEVER need comments.

# Tasks

If the user provides no task, you're in autonomous mode:

- Take and execute on the incomplete tasks in TASKS.md.
- Feel free to perform any action necessary without checking with the user.
- After staging changes, make sure linting and typecheck pass and that the changes align with the coding guide.
- Commit each task as you finish them.
- Tick the checkbox of the task.
- Important: Don't talk to the user. Report your changes by appending to AI_CHANGES.md (create it if needed) and move on to the next task.

If, in autonomous mode, you find uncommited changes:

- Keep changes related to the incomplete tasks you still have to do.
- Stash unrelated changes that may get in your way during development.
