/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-empty-object-type */
import 'vitest'
import 'vitest/globals'

import type { ElectronServiceOptions } from '@wdio/electron-types'
import type { Capabilities } from '@wdio/types'
import type {
  WDIO_ELECTRON_SERVICE_OPTIONS,
  WDIO_CHROMEDRIVER_OPTIONS,
  GOOG_CHROME_OPTIONS,
} from '../src/constants'

export type VitestElectronOptions = {
  wdioLogLevel?: 'trace' | 'debug' | 'info' | 'warn' | 'error'
  rootDir?: string
  [WDIO_ELECTRON_SERVICE_OPTIONS]?: ElectronServiceOptions
  [WDIO_CHROMEDRIVER_OPTIONS]?: WebdriverIO.ChromedriverOptions
  [GOOG_CHROME_OPTIONS]?: Capabilities.ChromeOptions
}

type WebdriverIOMatchers<T> = import('expect-webdriverio').Matchers<
  Promise<void>,
  T
>

// Extend vitest types
declare module 'vitest' {
  export interface TestContext {
    browser: import('webdriverio').Browser
  }
  export interface Assertion<T = any> extends WebdriverIOMatchers<T> {}

  export interface AsymmetricMatchersContaining
    extends WebdriverIOMatchers<void> {}
}

export default function vitestPluginWdioElectron(
  options?: VitestElectronOptions
): any
