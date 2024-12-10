// import { readFileSync } from 'node:fs'
// import { join } from 'node:path'

// const packageJson = JSON.parse(
//   readFileSync(join(__dirname, '..', 'package.json'), {
//     encoding: 'utf-8',
//   })
// )
// const { name, version } = packageJson

describe('vitest', () => {
  beforeEach(async ({ browser }) => {
    // console.log(`===== beforeEach ${browser}`)
    await browser.$('#btn-reset').click()
    expect(await browser.$('#counter').getText()).toBe('0')
  })

  it('should retrieve app metadata through the electron API', async ({
    browser,
  }) => {
    // const appName = await browser.electron.app('getName')
    // expect(appName).toEqual(name)
    // const appVersion = await browser.electron.app('getVersion')
    // expect(appVersion).toEqual(version)
    const r = await browser.electron.execute((electron) => {
      console.log(electron)
      return JSON.stringify(electron, null, '  ')
    })
    console.log(`result: ${r}`)
    expect(browser.electron.bridgeActive).toBeTruthy()
  })

  it('should print application title', async ({ browser }) => {
    expect(await browser.getTitle()).toBe('Electron')
  })

  it('should invoke the function of main process', async ({ browser }) => {
    await browser.$('#btn-add').click()
    expect(await browser.$('#counter').getText()).toBe('2')
  })

  it('should receive the message from main process', async ({ browser }) => {
    await browser.$('#btn-on-test').click()
    expect(await browser.$('#counter').getText()).toBe('1')
    // console.log(await browser.$('#counter').getElement())
    // browser.$('#counter').
    await expect(browser.$('#counter')).toBeDisplayed()

    // expect('browser').toBebrowser()
  })
  // afterAll(async () => {
  //   if (browser) {
  //     await browser.deleteSession()
  //   }
  // })
})

// const { startElectron } = await import('wdio-electron-service')
// this.electron = await startElectron({
//   appBinaryPath:
//     'dist/mac-arm64/electron-app.app/Contents/MacOS/electron-app',
// })    "@testing-library/jest-dom": "^6.6.3",
