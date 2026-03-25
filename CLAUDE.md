# CLAUDE.md

This file provides guidance to AI assistants (Claude, Codex, etc.) working in this repository.

## Repository Overview

**Flag** is a minimal Python repository, currently in early bootstrapping stage. The main branch contains only a `.gitkeep` placeholder. Active development is tracked via pull requests and feature branches.

- **Language:** Python
- **Entry point:** `main.py` (pending merge from PR #1)
- **Status:** Early-stage / bootstrapping

## Repository Structure

```
Flag/
├── .gitkeep       # Placeholder to initialize the repository
├── main.py        # Entry point (pending merge; prints "hello world")
└── CLAUDE.md      # This file
```

As the project grows, this structure should be updated to reflect new directories (e.g., `src/`, `tests/`, `docs/`).

## Branch Conventions

| Branch pattern | Purpose |
|---|---|
| `main` | Stable, production-ready code |
| `claude/<description>-<id>` | Claude Code feature branches |
| `codex/<description>` | Codex feature branches |

- Always develop on a feature branch; never commit directly to `main`.
- Branch names should be lowercase, hyphen-separated, and descriptive.

## Development Workflow

1. **Branch** off `main` using the appropriate naming convention.
2. **Implement** changes on the feature branch.
3. **Commit** with clear, descriptive messages (imperative mood: "Add X", "Fix Y").
4. **Push** to origin: `git push -u origin <branch-name>`.
5. **Open a PR** targeting `main` with a summary of motivation, changes, and testing steps.

## Running the Project

```bash
python3 main.py
```

No dependencies or virtual environment are required at this time. Update this section if packages are added.

## Code Conventions

- **Python version:** Python 3 (use `python3` explicitly).
- **Style:** Follow [PEP 8](https://peps.python.org/pep-0008/). Keep lines under 88 characters (Black-compatible).
- **Formatting:** If a formatter is adopted, use [Black](https://black.readthedocs.io/).
- **Imports:** Standard library first, then third-party, then local — each group separated by a blank line.
- **Tests:** Add tests under a `tests/` directory using `pytest` as the project grows.
- **No secrets:** Never commit credentials, tokens, or `.env` files.

## Pull Request Guidelines

- Keep PRs small and focused on a single concern.
- Include a **Motivation** section explaining why the change is needed.
- Include a **Testing** section describing how the change was verified.
- Draft PRs are acceptable for work-in-progress; mark ready when complete.

## Notes for AI Assistants

- The repository is intentionally minimal; do not add complexity beyond what is requested.
- Prefer editing existing files over creating new ones unless clearly necessary.
- Always verify code runs (`python3 main.py`) before committing.
- Update this CLAUDE.md whenever significant structural changes are made.
