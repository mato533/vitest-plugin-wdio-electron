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

const initBrowser = async (_options: VitestElectronOptions) => {
  const opts = _options[WDIO_ELECTRON_SERVICE_OPTIONS] || {}
  const launcherConfig = _options.rootDir ? { rootDir: _options.rootDir } : {}

  const capabilities = {
    browserName: 'electron',
    [WDIO_ELECTRON_SERVICE_OPTIONS]: opts,
    [WDIO_CHROMEDRIVER_OPTIONS]: _options[WDIO_CHROMEDRIVER_OPTIONS] || {},
    [GOOG_CHROME_OPTIONS]: _options[GOOG_CHROME_OPTIONS] || {},
  }

  const launcher = new Launcher(opts, {}, launcherConfig)
  const service = new ElectronWorkerService(opts)
  await launcher.onPrepare({}, [capabilities])

  const browser = await remote({
    capabilities,
  })

  await service.before(capabilities, [], browser)

  return browser
}

export { initBrowser }
