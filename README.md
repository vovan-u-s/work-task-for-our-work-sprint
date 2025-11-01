# Automation Exercise Test Suite

![Daily Tests](https://github.com/vovan-u-s/work-task-for-our-work-sprint/actions/workflows/daily-tests.yml/badge.svg)
![PR Tests](https://github.com/vovan-u-s/work-task-for-our-work-sprint/actions/workflows/pr-tests.yml/badge.svg)

This project contains automated tests for https://automationexercise.com/ using Playwright with TypeScript.

## Project Structure

```
├── tests/                      # Test files
│   ├── homepage.spec.ts         # TC5: Homepage verification
│   ├── userRegistration.spec.ts # TC1: User registration
│   ├── userLogin.spec.ts        # TC2: Login functionality
│   ├── cartFunctionality.spec.ts# TC3: Cart operations
│   └── orderPlacement.spec.ts   # TC4: Order placement
├── pages/                      # Page Object Model (optional)
│   ├── BasePage.ts
│   ├── HomePage.ts
│   ├── CartPage.ts
│   └── LoginSignupPage.ts
├── utils/                      # Test utilities
│   └── TestDataGenerator.ts
├── playwright.config.ts        # Playwright configuration
├── package.json
└── .gitignore
```

## Test Cases Covered

1. **TC1: User Registration** - Complete registration flow
2. **TC2: Login Verification** - Login form validation  
3. **TC3: Cart Functionality** - Adding products to cart
4. **TC4: Order Placement** - Checkout process verification
5. **TC5: Homepage** - Features items verification

## Installation & Setup

```bash
npm install
npx playwright install
```

## Running Tests

```bash
# Run all tests
npm test

# Run tests with browser UI
npm run test:headed

# Run specific test file
npx playwright test tests/homepage.spec.ts

# Run with specific browser
npm run test:chromium
npm run test:firefox
npm run test:webkit

# Run tests in CI mode
npm run test:ci

# Run tests in parallel
npm run test:parallel
```

## CI/CD Integration

This project includes automated CI/CD workflows for continuous testing:

### 🕐 Daily Test Runs
- **Schedule**: Runs automatically at 2 AM UTC daily
- **Coverage**: Tests across all browsers (Chromium, Firefox, WebKit)
- **File**: `.github/workflows/daily-tests.yml`

### 🔀 Pull Request Tests
- **Trigger**: Automatically runs on all pull requests
- **Coverage**: Chromium browser tests
- **Features**: 
  - Automated test execution
  - PR comments with test results
  - Fast feedback on code changes
- **File**: `.github/workflows/pr-tests.yml`

### 🎯 On-Demand Tests
- **Trigger**: Manual execution from GitHub Actions UI
- **Features**:
  - Select specific browser (Chromium, Firefox, WebKit, or all)
  - Run specific test files
  - Headed or headless mode
- **File**: `.github/workflows/on-demand-tests.yml`

### Workflow Features
- ✅ Multi-browser testing (Chromium, Firefox, WebKit)
- ✅ Automatic retry on failures (2 retries in CI)
- ✅ Test artifacts (reports, traces, screenshots)
- ✅ 30-day artifact retention
- ✅ Multiple report formats (HTML, JUnit, JSON)
- ✅ Notifications on test failures

### Running Workflows
1. **View workflows**: Go to repository → Actions tab
2. **Manual trigger**: Actions → Select workflow → Run workflow
3. **View results**: Click on workflow run → Check jobs and artifacts

### CI Environment Configuration
The `playwright.config.ts` automatically detects CI environment and applies:
- 2 retries on test failures
- Single worker for stability
- Multiple reporter formats (HTML, JUnit, JSON)
- Extended timeouts for reliability

## Key Features

✅ **Simplified Tests**: Direct page interactions without complex abstractions
✅ **Reliable Selectors**: Uses stable element selectors
✅ **Error Handling**: Graceful handling of modal dialogs and timeouts
✅ **Cross-browser**: Configured for Chrome, Firefox, and Safari
✅ **Reports**: HTML reports with screenshots and videos on failure
✅ **CI/CD Ready**: GitHub Actions workflows for automated testing
✅ **Daily Automation**: Scheduled test runs for continuous validation

## Notes

- Tests are designed to be simple and maintainable
- Each test is independent and can run separately
- Uses TypeScript for better code quality and IDE support
- Includes proper error handling for dynamic content
- CI/CD workflows ensure code quality through automated testing
- Test artifacts are preserved for debugging and analysis