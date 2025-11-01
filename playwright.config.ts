import { defineConfig, devices } from '@playwright/test';

// Get base URL from environment variable or use default
const getBaseURL = () => {
  if (process.env.BASE_URL) {
    return process.env.BASE_URL;
  }
  
  // Default URLs based on TEST_ENV
  const testEnv = process.env.TEST_ENV || 'production';
  const envUrls = {
    production: 'https://automationexercise.com',
    qa: 'https://qa.automationexercise.com',
    dev: 'https://dev.automationexercise.com'
  };
  
  return envUrls[testEnv as keyof typeof envUrls] || envUrls.production;
};

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: process.env.CI 
    ? [
        ['html'],
        ['junit', { outputFile: 'test-results/junit.xml' }],
        ['json', { outputFile: 'test-results/results.json' }],
        ['list']
      ]
    : 'html',
  use: {
    baseURL: getBaseURL(),
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    actionTimeout: 15000,
    navigationTimeout: 30000
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    }
  ]
});