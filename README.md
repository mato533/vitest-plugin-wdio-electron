# vitest-plugin-wdio-electron

## About

This plugin for vitest integrates E2E test for the electron application using the WebdriverIO.

This plugin will launch the electron application for each test suite.

## Installation

```bash
npm install --save-dev vitest-plugin-wdio-electron
```

## Configuration

### Typescript Configuration

Add the configuration for typescript using `tsconfig.json`.

```json
{
  "compilerOptions": {
    // ...
    "types": [
      "vitest-plugin-wdio-electron/types"
      // ...
    ]
  }
  // ...
}
```

### Vitest configuration

Add this plugin to configuration of the vitest.  
This plugin has some options that is explained by [here](#plugin-options).

```js
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
    // ...
  ],
  // ...
})
```

### Plugin options

Please check the following table and linked documents.

| option                        |     default     | description                                                             | reference                                                                                                         |
| ----------------------------- | :-------------: | :---------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------- |
| `wdioLogLevel`                |     `warn`      | Log level of WebdriverIO                                                | See the [Docs of WDIO](https://webdriver.io/docs/api/environment/#wdio_log_level)                                 |
| `rootDir`                     | `process.cwd()` | The root directory of the electron application                          | -                                                                                                                 |
| `electronVersion`             |        -        | Define the version of `electron`. (It will determined by automatically) | See the [`browserVersion`](https://webdriver.io/docs/desktop-testing/electron/configuration/#service-managed)     |
| `wdio:electronServiceOptions` |      `{}`       | The Option for the electron service of WebdriverIO                      | See the [Service Options](https://webdriver.io/docs/desktop-testing/electron/configuration/#service-options)      |
| `wdio:chromedriverOptions`    |      `{}`       | The option for the ChromeDriver                                         | See the [Docs](https://webdriver.io/docs/capabilities/#webdriverio-capabilities-to-manage-browser-driver-options) |
| `goog:chromeOptions`          |      `{}`       | The option for the Chrome                                               | See the [Docs](https://webdriver.io/docs/capabilities/#special-capabilities-for-specific-use-cases)               |
