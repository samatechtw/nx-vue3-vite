# nx-vue3-vite Contributing Guide

Hi! We're glad that you're interested in contributing!. Before submitting a pull request or issue, please make sure to take a moment and read through the following guide.

## Pull Request Guidelines

- Checkout a topic branch from a base branch, e.g. `main`, and merge back against that branch.

- If adding a new feature:

  - Add accompanying test case.
  - Provide a convincing reason to add this feature. Open a suggestion issue first and have it approved before working on it.

- If fixing a bug:

  - When resolving a specific issue, add `(fix #xxxx[,#xxxx])` (#xxxx is the issue id) in your PR title for a better release log, e.g. `fix: update entities encoding/decoding (fix #3899)`.
  - Provide a detailed description of the bug in the PR. Live demo preferred.
  - Add appropriate test coverage if applicable.

- Make sure tests pass!

- Commit messages must follow the [commit message convention](./.github/commit-convention.md) so that changelogs can be automatically generated. Commit messages are automatically validated before commit (by invoking [Git Hooks](https://git-scm.com/docs/githooks) via [husky](https://github.com/typicode/husky)).

- No need to worry about code style as long as you have installed the dev dependencies - modified files are automatically formatted with Prettier on commit (by invoking [Git Hooks](https://git-scm.com/docs/githooks) via [husky](https://github.com/typicode/husky)).

## Project Structure

Source code and documentation are included in the top-level folders listed below:

| Folder   | Description                         |
| -------- | ----------------------------------- |
| packages | Plugin source code                  |
| e2e      | e2e tests associated with plugins   |
| tools    | Miscellaneous scripts and utilities |

## Repo Setup

This is a monorepo generated with Nx. We use [PNPM](https://pnpm.io/) for internal development and highly recommend it, but you are free to use `NPM` or `Yarn` if preferred.

Detailed instructions are below, but you can get started quickly:

1. Install: `pnpm i`
2. Build: `pnx run vue3-vite:build`
3. Test: `pnx test vue3-vite`

The `pnx` command above is an alias which can be added to your bash profile, or replaced with `npx` if you're using `NPM`.

```bash
alias pnx="pnpm run nx --"
```

### Build

Build the main `vue3-vite` app plugin:

```
pnx run vue3-vite:build
```

Build all app plugins:

```
pnx run-many --target build --all
```

### Unit Tests

Run unit tests for the `vue3-vite` plugin:

```
pnx test vue3-vite
```

Prepend `affected` to only execute unit tests affected by a change:

```
pnx affected:test vue3-vite
```

Run unit tests for all plugins:

```
pnx run-many --target test --all
```

### E2E Tests

```
pnx e2e vue3-vite-e2e
```

## Release

Currently, a custom release script is used to update the version and publish to NPM. This must be executed on the main branch, and `<version>` must not equal the current version on NPM.

```bash
node tools/scripts/release.js <version>
```
