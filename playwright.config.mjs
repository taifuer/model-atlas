import { defineConfig } from '@playwright/test';

const externalBaseURL = process.env.ATLAS_BASE_URL;
const baseURL = externalBaseURL || 'http://127.0.0.1:4173';

export default defineConfig({
  testDir: './tests/browser',
  testMatch: '**/*.spec.mjs',
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 1 : 0,
  workers: 2,
  timeout: 60_000,
  expect: { timeout: 8_000 },
  reporter: process.env.CI ? 'github' : 'list',
  use: {
    baseURL,
    browserName: 'chromium',
    locale: 'zh-CN',
    reducedMotion: 'reduce',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
  projects: [
    { name: 'desktop', use: { viewport: { width: 1440, height: 1000 } } },
    { name: 'mobile', use: { viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true } },
  ],
  webServer: externalBaseURL ? undefined : {
    command: 'npm run build && node tests/browser/serve.mjs',
    url: baseURL,
    reuseExistingServer: false,
    timeout: 30_000,
  },
});
