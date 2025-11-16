// playwright.config.js
const { defineConfig } = require('@playwright/test');
const path = require('path');

module.exports = defineConfig({
  testDir: './tests',
  timeout: 200 * 1000, // 200 sec per test
  retries: 0,           // No retry
  workers: 1,           // single worker for slower execution
  reporter: [
    ['list'],           // show results in CLI
    ['html', { 
      outputFolder: path.resolve(__dirname, 'reports'), 
      open: 'always',   // automatically open HTML report after test run
      // You can also set `inlineAssets: true` to make report portable
    }],
  ],
  use: {
    browserName: 'chromium',
    headless: false,      // show browser while running
    screenshot: 'only-on-failure',
    trace: 'on-first-retry',
    baseURL: 'https://www.saucedemo.com/',
    navigationTimeout: 200 * 1000,
    actionTimeout: 50000,
    
    video: {
      mode: 'retain-on-failure', // record only failed tests
    },
    
    launchOptions: {
      slowMo: 1000     // slow down each action by 1 second for visibility
    }
  },
});
