import { afterAll, beforeAll, beforeEach, expect } from 'vitest'
import { matchers } from 'expect-webdriverio'
import { inject } from 'vitest'

import { initBrowser } from './electron'
import { CONFIG_NAME } from './constants'

import type { VitestElectronOptions } from '../types'

declare module 'vitest' {
  export interface ProvidedContext {
    [CONFIG_NAME]: VitestElectronOptions
  }
}

const config = inject(CONFIG_NAME)

expect.extend(Object.fromEntries(matchers))

const browserRepository = {}

beforeAll(async (suite) => {
  browserRepository[suite.id] = await initBrowser(config)
})

beforeEach(async (context) => {
  context['browser'] = browserRepository[context.task.file.id]
})

afterAll(async (suite) => {
  const browser = browserRepository[suite.id]
  if (browser) {
    await browser.deleteSession()
  }
})
