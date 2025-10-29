# Automation Exercise Test Suite

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
npx playwright test --project=chromium
```

## Key Features

✅ **Simplified Tests**: Direct page interactions without complex abstractions
✅ **Reliable Selectors**: Uses stable element selectors
✅ **Error Handling**: Graceful handling of modal dialogs and timeouts
✅ **Cross-browser**: Configured for Chrome, Firefox, and Safari
✅ **Reports**: HTML reports with screenshots and videos on failure

## Notes

- Tests are designed to be simple and maintainable
- Each test is independent and can run separately
- Uses TypeScript for better code quality and IDE support
- Includes proper error handling for dynamic content