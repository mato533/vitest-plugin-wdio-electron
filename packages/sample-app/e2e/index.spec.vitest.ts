describe('vitest', () => {
  beforeEach(async ({ browser }) => {
    await browser.$('#btn-reset').click()
    expect(await browser.$('#counter').getText()).toBe('0')
  })

  it('should retrieve app info through the electron API', async ({
    browser,
  }) => {
    const r = await browser.electron.execute((electron) => ({
      name: electron.app.getName(),
      version: electron.app.getVersion(),
    }))
    expect(r.name).toBe('electron-app')
    expect(r.version).toBe('1.0.0')
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
    await expect(browser.$('#counter')).toBeDisplayed()
  })
})
