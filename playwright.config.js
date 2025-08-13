// @ts-check
import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  // Set workers dynamically: 1 for CI, 1 for single test file, 5 for multiple files
  workers: (() => {
    if (process.env.CI) return 1;
    // If only one test file is specified in the CLI args, use 1 worker
    if (process.argv.filter(arg => arg.endsWith('.spec.js') || arg.endsWith('.test.js')).length === 1) return 1;
    return 5;
  })(),
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  timeout: 30000,
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
  headless: true, // Run tests in headless mode by default
    trace:'retain-on-failure',
    screenshot: 'only-on-failure', // Take screenshots only on test failure
    video: 'retain-on-failure',
  },
  expect: {
    // Maximum time expect() should wait for the condition to be met.
    timeout: 40000,
  },


  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],



  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});

