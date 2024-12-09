import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

import { mergeConfig } from 'vitest/config'

import { CONFIG_NAME } from './constants'

import type { VitestElectronOptions } from '../types'
import type { Plugin } from 'vitest/config'

const getSetupFilePath = (filename: string) =>
  join(dirname(fileURLToPath(import.meta.url)), filename)

const vitestPluginWdioElectron = (options: VitestElectronOptions): Plugin => {
  const wdioLogLevel = options.wdioLogLevel ?? 'warn'
  return {
    name: 'vitest-plugin-wdio-electron',
    config(config) {
      const setupFile = getSetupFilePath('setup.js')

      return mergeConfig(config, {
        test: {
          setupFiles: [setupFile],
          env: {
            WDIO_LOG_LEVEL: wdioLogLevel,
          },
          provide: {
            [CONFIG_NAME]: options,
          },
        },
      })
    },
  }
}

export { vitestPluginWdioElectron }
