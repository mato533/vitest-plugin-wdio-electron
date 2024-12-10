import { remote } from 'webdriverio'
import ElectronWorkerService, {
  launcher as Launcher,
} from 'wdio-electron-service'

import {
  WDIO_ELECTRON_SERVICE_OPTIONS,
  WDIO_CHROMEDRIVER_OPTIONS,
  GOOG_CHROME_OPTIONS,
} from './constants'

import type { VitestElectronOptions } from '../types'

const initBrowser = async (options: VitestElectronOptions) => {
  const opts = options[WDIO_ELECTRON_SERVICE_OPTIONS] || {}
  const launcherConfig = options.rootDir ? { rootDir: options.rootDir } : {}

  const electronServiceOptions = options[WDIO_ELECTRON_SERVICE_OPTIONS] || {}
  const chromeOptions = options[GOOG_CHROME_OPTIONS] || {}
  const chromedriverOptions = options[WDIO_CHROMEDRIVER_OPTIONS] || {}

  const capabilities = {
    browserName: 'electron',
    browserVersion: options.electronVersion || '',
    [WDIO_ELECTRON_SERVICE_OPTIONS]: electronServiceOptions,
    [GOOG_CHROME_OPTIONS]: chromeOptions,
    [WDIO_CHROMEDRIVER_OPTIONS]: chromedriverOptions,
  }

  const launcher = new Launcher(
    capabilities[WDIO_ELECTRON_SERVICE_OPTIONS],
    {},
    launcherConfig
  )
  const service = new ElectronWorkerService(opts)
  await launcher.onPrepare({}, [capabilities])

  const browser = await remote({
    capabilities,
  })

  await service.before(capabilities, [], browser)

  return browser
}

export { initBrowser }
