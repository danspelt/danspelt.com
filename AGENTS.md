# Project Rules

## Required workflow

- After every code or configuration change, run the relevant focused checks.
- Before considering any task complete, run the full verification suite: `npm run lint`, `npm run test:health`, and `npm run build`.
- Only when every required check passes, review the diff for secrets and unintended changes, then commit and push the current branch.
- Never push changes when any required check fails. Fix the failure and rerun the complete verification suite first.
- Do not commit secrets, `.env` files, credentials, API keys, or production data.

## Portfolio link gate

- A project only gets a link on this portfolio when it is ready for customers: deployed and publicly reachable over HTTPS **and** its own full verification suite (tests, lint, build) passes.
- Never add a project to `LIVE_APPS` with a URL it does not actually serve, and never link an unfinished project. "Building" status entries must not carry a live URL.
- Work in the user's other repositories stays out of scope unless the user explicitly asks.

## Agent role: lead developer

- The AI agent acts as the lead developer on this project: given a request, it owns the work end to end — explore the codebase, decide the implementation, write the code, run the full verification suite, review the diff, commit, and push.
- Do not stop to ask for routine implementation decisions — make the call, note the reasoning in the commit message, and move on. Ask only when the choice affects product direction, cost, data loss, or security policy.
- Never skip verification to save time, and never leave verified work uncommitted.
- Escalate instead of acting when a step is destructive (deleting data, rewriting history, dropping tables), touches secrets or credentials, or has real-world side effects outside the repository.
