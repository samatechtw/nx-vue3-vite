## Changelog

TODO -- automate changelog generation

### v0.30.0 - 250119

- Update to Nx 20.3.2
- Update to Vite 6
- Update various packages

### v0.29.0 - 241002

- Update packages
- Update to Nx 19.8.3
- Check pnpm lockfile into git

### v0.28.0 - 240511

- Update packages
- Update to Nx 18.3.4
- Make Cypress optional peer dependency
- BREAKING - may need to add project path to vitest executors in project.json. For example, `"config": "apps/myproject/vite.config.ts"`
- BREAKING - postcss config may need to be renamed from `postcss.config.js` to `postcss.config.mjs`

### v0.27.0 - 240117

- Update packages
- Update to Nx 17.2.8

### v0.26.0 - 231015

- Update packages
- Update to Nx 16.10.0
- Update to Cypress 13.3.1

### v0.25.0 - 230616

- Update packages
- Remove unnecessary packages
- Update to Nx 16.3.2

### v0.24.0 - 230407

- Copy project package.json to lib/app dist on build
- Cypress executor fixes
- Update packages

### v0.23.4 - 230312

- Cypress executor logging and bugfixes

### v0.23.2 - 230302

- Update packages

### v0.23.1 - 230108

- Update extension recommendations

### v0.23.0 - 230106

- Improve E2E tests for app/lib testing
- Support both Jest and Vitest for app/lib
- Update packages

### v0.22.1 - 230103

- Fix directory for component generator

### v0.22.0 - 221230

- Add lib path to tsconfig.base.json in generator
- Improve lib directory selection
- Add app generator alias option
- Better unit and e2e testing
- Export tsconfigBaseAliases function for vite.config.ts

### v0.21.0 - 221222

- Upgrade Vite to 4.0.X
- Upgrade Cypress to 12.2.0
- Fix app generator issue in package based monorepo
- Improve component generator
- Improve unit and integration tests
- Package updates

### v0.20.0 - 221202

- Package updates

### v0.19.0 - 220928

- Package updates
- Fix generator vue3-jest setup
- Simplify app/lib generator

### v0.18.0 - 220813

- Update Vite to 3.0.7
- Update Nx to 14.5.5
- Package updates

### v0.17.0 - 220725

- Add preview server executor
- Package updates

### v0.16.0 - 220623

- Update to Nx 14.3.6
- Update Cypress to 10.2.0
- Minor version package updates

### v0.15.0 - 220402

- Fix `picocolors` package name typo (https://github.com/samatechtw/nx-vue3-vite/issues/47)
- Update to Nx 13.9.6 (https://github.com/samatechtw/nx-vue3-vite/issues/49)
- Remove vite-plugin-vue-images (https://github.com/samatechtw/nx-vue3-vite/issues/50)
- Fix outdated documentation
- Add a changelog
