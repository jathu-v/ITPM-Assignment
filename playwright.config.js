// @ts-check
const { defineConfig, devices } = require('@playwright/test');

/**
 * Playwright Configuration File
 * This file controls how Playwright runs the tests.
 */
module.exports = defineConfig({
  // Folder where test files are located
  testDir: './tests',

  // Run tests one at a time (not in parallel) - easier for beginners
  fullyParallel: false,

  // Stop running tests after first failure? No - run all tests
  forbidOnly: !!process.env.CI,

  // How many times to retry a failed test
  retries: 1,

  // How many tests to run at the same time
  workers: 1,

  // Reporter: generates HTML report + outputs CSV-compatible results
  reporter: [
    ['html', { outputFolder: 'playwright-report' }],
    ['list'],
    ['json', { outputFile: 'test-results/results.json' }]
  ],

  use: {
    // Base URL of the website being tested
    baseURL: 'http://localhost:3000',

    // Take a screenshot when a test fails
    screenshot: 'only-on-failure',

    // Record video only on failure
    video: 'retain-on-failure',

    // Slow down actions by 500ms so you can see what's happening
    actionTimeout: 30000,

    // How long to wait for page to load
    navigationTimeout: 60000,
  },

  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        // Aggressive anti-detection settings
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        bypassCSP: true,
        // Add headers to bypass bot detection
        extraHTTPHeaders: {
          'Accept-Language': 'en-US,en;q=0.9',
          'Accept-Encoding': 'gzip, deflate, br',
          'Accept': '*/*',
          'Sec-Fetch-Site': 'none',
          'Sec-Fetch-Mode': 'navigate',
          'Sec-Fetch-User': '?1',
          'Sec-Fetch-Dest': 'document',
        },
      },
    },
  ],
});
