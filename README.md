

<h2 align='center'>nx-vue3-vite</h2>

<p align='center'>NX Plugin for generating opinionated Vue3+Vite+PostCSS applications</p>

<p align='center'>
<a href='https://www.npmjs.com/package/@samatech/nx-vue3-vite'>
  <img src='https://img.shields.io/npm/v/@samatech/nx-vue3-vite?color=222&style=flat-square'>
</a>
</p>

<br>


This project was generated using [Nx](https://nx.dev):
```
npx create-nx-plugin <org> --pluginName <plugin>
```

## Vue3 Plugin Usage

### Install
**npm**
```bash
npm install nx-vue3-vite --save-dev
```

### Generate App
```bash
nx g nx-vue3-vite:app <app-name>
```

### Serve
```bash
nx serve <app-name>
```

## Vue3 Generators ([NX Docs](https://nx.dev/latest/angular/executors/using-builders))

### Application
```
nx g nx-vue3-vite:app <app-name> [options]
```

Arguments  |	Description
---------- | ------------------------
<app-name> |	The name of the generated app

Options     |    Default     | Description
----------- | -------------- | ------------
--tags      | -              | Comma delimited tags for linting
--directory | apps           | Workspace directory to place the Vue project

### Component

TBD

### Library

TBD

## Vue3 Executors ([NX Docs](https://nx.dev/latest/angular/generators/using-schematics))

### Dev Server
```
nx serve <app-name> [options]
```

Arguments  |	Description
---------- | ------------------------
<app-name> |	The name of your app

Options     |    Default     | Description
----------- | -------------- | ------------
--host      | localhost      | [Server host location](https://vitejs.dev/config/#server-host)
--port      | 3000           | [Server port](https://vitejs.dev/config/#server-port)
--https     | false          | [Run in HTTPS/SSL mode](https://vitejs.dev/config/#server-https)

### Build
```
nx build <app-name> [options]
```

Arguments  |	Description
---------- | ------------------------
<app-name> |	The name of your app

Options     |    Default     | Description
----------- | -------------- | ------------
--dist      | localhost      | [Output directory](https://vitejs.dev/config/#build-outdir)

### Lint
```
nx lint <app-name> [options]
```

See [options](https://nx.dev/latest/angular/linter/eslint) for `@nrwl/linter`

### Unit Testing
```
nx test <app-name> [options]
```

See [options](https://nx.dev/latest/angular/jest/jest) for `@nrwl/jest`

### E2E Testing
```
nx e2e <app-name> [options]
```

See [options](https://nx.dev/latest/angular/cypress/overview) for `@nrwl/cypress`

## dep-graph hack
In order to get `nx dep-graph` to work in a generated Vue app, the NX code responsible for parsing file extension must be patched.

The `build` and `serve` executors in this plugin automatically check your workspace `node_modules` to see if the patch is already installed, and installs if not. See [`packages/vue3-vite/patch-nx-dep-graph.js`](packages/vue3-vite/patch-nx-dep-graph.js).

Patch details: https://github.com/ZachJW34/nx-plus/tree/master/libs/vue#nx-dependency-graph-support

Related NX issue: https://github.com/nrwl/nx/issues/2960

## Development/Contributing

### Project Structure
Source code and documentation are included in the top-level folders listed below:

Folder   | Description
-------- | -----------
packages | Plugin source code
e2e      | e2e tests associated with plugins
tools    | Miscellaneous scripts and utilities

### Build

Build the main `vue3-vite` app plugin:
```
nx run vue3-vite:build
```

Build all app plugins:
```
nx run-many --target build --all
```

### Unit Tests

Run unit tests for the `vue3-vite` plugin:
```
nx test vue3-vite
```

Prepend `affected` to only execute unit tests affected by a change:
```
nx affected:test vue3-vite
```

Run unit tests for all plugins:
```
nx run-many --target test --all
```

### E2E Tests

Run e2e tests for the `vue3-vite` plugin:
```
nx e2e vue3-vite
```

Run e2e tests for all plugins:
```
nx run-many --target e2e --all
```

## Running end-to-end tests

Run `ng e2e my-app` to execute the end-to-end tests via [Cypress](https://www.cypress.io).

Run `nx affected:e2e` to execute the end-to-end tests affected by a change.
