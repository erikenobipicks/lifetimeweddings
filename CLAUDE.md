# Claude Code working notes for this repo

## Merge policy

The owner (Eric) prefers that I merge my own PRs once the work is done,
instead of leaving them in draft waiting for approval. Apply this flow
by default unless the user says otherwise on a specific task:

1. Branch → commit → push → open the PR as **draft** (so the diff is
   visible while CI runs, if there's any).
2. If CI is configured and passing — or there is no CI configured —
   flip the PR to **ready for review** and **merge it** via the GitHub
   MCP tool (`merge_pull_request`).
3. Use **squash** as the merge strategy unless the PR has a meaningful
   multi-commit history worth preserving.
4. Delete the remote branch after merge (the GitHub MCP merge tool
   handles this when `delete_branch: true`).
5. Reply with a single line summarising what shipped (PR number + title).

Things I still do **not** do on my own:
- Force-push to any branch.
- Push directly to `main` (always branch + PR).
- Touch the `git config` or hooks.
- Merge a PR with failing CI without first investigating why.
- Merge a PR that another reviewer has explicitly requested changes on.
