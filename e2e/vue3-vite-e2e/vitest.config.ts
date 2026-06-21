import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    root: __dirname,
    include: ['tests/**/*.spec.ts'],
    // Each spec spins up a real Nx workspace on disk (generate + install + build),
    // so the old per-file `jest.setTimeout(...)` becomes generous global limits.
    // The heaviest cases shell out to a full `nx test` inside the temp workspace.
    testTimeout: 300000,
    hookTimeout: 300000,
    // Run the heavy e2e specs one file at a time to avoid saturating CPU/disk.
    fileParallelism: false,
  },
})
