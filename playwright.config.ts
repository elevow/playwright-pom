// playwright.config.ts
import { defineConfig, devices } from 'playwright/test';
/**
* See https://playwright.dev/docs/test-configuration.
*/
export default defineConfig({
    /* Opt out of parallel tests on CI. */
    workers: process.env.CI ? 1 : undefined,
    timeout: 3600000, // One hour to ensure crawler does not end too soon
    /* Configure projects for major browsers */
    projects: [
        {
            name: 'Large',
            use: { ...devices['Desktop Chrome'], channel: 'chromium' },
        },
        /* Test against mobile viewports. */
        {
            name: 'Medium',
            use: { ...devices['iPad Pro 11'] },
        },
        {
            name: 'Small',
            use: { ...devices['iPhone 15 Pro'] },
        },
    ],
});
