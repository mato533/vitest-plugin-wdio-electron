import { defineConfig } from 'vitest/config'
import vitestPluginWdioElectron from 'vitest-plugin-wdio-electron'

export default defineConfig({
  plugins: [
    vitestPluginWdioElectron({
      wdioLogLevel: 'warn',
      'goog:chromeOptions': {
        args: ['--disable-dev-shm-usage', '--disable-gpu', '--headless'],
      },
    }),
  ],

  test: {
    globals: true,
    hookTimeout: 30000,
    include: ['e2e/**/*.spec.vitest.ts'],
    environment: 'node',
  },
})
