# Multi-Environment Workflow Guide

## 📋 Overview

This project includes 3 separate CI/CD workflows for different environments:

1. **Production Environment** (`daily-tests.yml`)
2. **QA Environment** (`qa-daily-tests.yml`)
3. **Developer Environment** (`dev-daily-tests.yml`)

Each environment has its own:
- Unique workflow name
- Dedicated branch triggers
- Environment-specific URLs
- Separate artifact naming
- Custom schedule timing

## 🌍 Environment Details

### 1. Production Environment
- **Workflow File**: `.github/workflows/daily-tests.yml`
- **Workflow Name**: "Production Environment - Daily Test Run"
- **Base URL**: `https://automationexercise.com`
- **Schedule**: Daily at 2:00 AM UTC
- **Branches**: `main`, `master`, `framework-Structure`
- **Job Name**: `prod-test`
- **Artifacts Prefix**: `prod-playwright-*`

### 2. QA Environment
- **Workflow File**: `.github/workflows/qa-daily-tests.yml`
- **Workflow Name**: "QA Environment - Daily Test Run"
- **Base URL**: `https://qa.automationexercise.com`
- **Schedule**: Daily at 2:00 AM UTC
- **Branches**: `qa`, `qa-test`, `framework-Structure`
- **Job Name**: `qa-test`
- **Artifacts Prefix**: `qa-playwright-*`

### 3. Developer Environment
- **Workflow File**: `.github/workflows/dev-daily-tests.yml`
- **Workflow Name**: "Developer Environment - Daily Test Run"
- **Base URL**: `https://dev.automationexercise.com`
- **Schedule**: Daily at 3:00 AM UTC
- **Branches**: `dev`, `develop`, `development`, `framework-Structure`
- **Job Name**: `dev-test`
- **Artifacts Prefix**: `dev-playwright-*`

## 🚀 Running Tests

### From GitHub Actions UI

1. Go to **Actions** tab in your repository
2. Select the environment workflow:
   - "Production Environment - Daily Test Run"
   - "QA Environment - Daily Test Run"
   - "Developer Environment - Daily Test Run"
3. Click **Run workflow**
4. Select branch and click **Run workflow**

### Locally with Environment Variables

#### PowerShell (Windows)
```powershell
# Test Production
$env:TEST_ENV="production"; npm test

# Test QA
$env:TEST_ENV="qa"; npm test

# Test Developer
$env:TEST_ENV="dev"; npm test

# Using custom URL
$env:BASE_URL="https://custom.example.com"; npm test
```

#### Bash (Linux/Mac)
```bash
# Test Production
TEST_ENV=production npm test

# Test QA
TEST_ENV=qa npm test

# Test Developer
TEST_ENV=dev npm test

# Using custom URL
BASE_URL=https://custom.example.com npm test
```

### Using NPM Scripts

```powershell
# Production environment
npm run test:prod

# QA environment
npm run test:qa

# Developer environment
npm run test:dev
```

## 📅 Automated Schedules

| Environment | Schedule | UTC Time | Your Local Time* |
|------------|----------|----------|-----------------|
| Production | Daily | 2:00 AM | Calculate based on timezone |
| QA | Daily | 2:00 AM | Calculate based on timezone |
| Developer | Daily | 3:00 AM | Calculate based on timezone |

*Note: Convert UTC to your local timezone

## 🔀 Branch Strategy

### Production Workflow Triggers
- **Push** to: `main`, `master`, `framework-Structure`
- **PR** to: `main`, `master`

### QA Workflow Triggers
- **Push** to: `qa`, `qa-test`, `framework-Structure`
- **PR** to: `qa`

### Developer Workflow Triggers
- **Push** to: `dev`, `develop`, `development`, `framework-Structure`
- **PR** to: `dev`, `develop`

## 📦 Artifacts

Each environment creates separate artifacts to avoid confusion:

### Production
- `prod-playwright-report-chromium`
- `prod-playwright-report-firefox`
- `prod-playwright-report-webkit`
- `prod-playwright-traces-*` (on failure)

### QA
- `qa-playwright-report-chromium`
- `qa-playwright-report-firefox`
- `qa-playwright-report-webkit`
- `qa-playwright-traces-*` (on failure)

### Developer
- `dev-playwright-report-chromium`
- `dev-playwright-report-firefox`
- `dev-playwright-report-webkit`
- `dev-playwright-traces-*` (on failure)

**Retention**: 30 days for all environments

## 🛠️ Configuration

### Environment Variables

Each workflow sets these environment variables:

| Variable | Production | QA | Developer |
|----------|-----------|----|-----------| 
| `CI` | `true` | `true` | `true` |
| `BASE_URL` | `https://automationexercise.com` | `https://qa.automationexercise.com` | `https://dev.automationexercise.com` |
| `TEST_ENV` | `production` | `qa` | `dev` |

### Playwright Config

The `playwright.config.ts` automatically detects the environment:

```typescript
// Reads BASE_URL or TEST_ENV environment variable
const getBaseURL = () => {
  if (process.env.BASE_URL) {
    return process.env.BASE_URL;
  }
  
  const testEnv = process.env.TEST_ENV || 'production';
  const envUrls = {
    production: 'https://automationexercise.com',
    qa: 'https://qa.automationexercise.com',
    dev: 'https://dev.automationexercise.com'
  };
  
  return envUrls[testEnv] || envUrls.production;
};
```

## 📊 Workflow Status Badges

Add these badges to your README to show workflow status:

```markdown
![Production Tests](https://github.com/vovan-u-s/work-task-for-our-work-sprint/actions/workflows/daily-tests.yml/badge.svg)
![QA Tests](https://github.com/vovan-u-s/work-task-for-our-work-sprint/actions/workflows/qa-daily-tests.yml/badge.svg)
![Dev Tests](https://github.com/vovan-u-s/work-task-for-our-work-sprint/actions/workflows/dev-daily-tests.yml/badge.svg)
```

## 🎯 Common Workflows

### Scenario 1: Deploy to QA
```bash
# Create and push to qa branch
git checkout -b qa
git push origin qa

# Workflow automatically runs
# Check: Actions → "QA Environment - Daily Test Run"
```

### Scenario 2: Test Feature Branch on Dev
```bash
# Create feature branch from dev
git checkout -b feature/new-feature dev
git push origin feature/new-feature

# Create PR to dev branch
# Workflow automatically runs on PR
```

### Scenario 3: Production Release
```bash
# Merge to main
git checkout main
git merge release/v1.0.0
git push origin main

# Production workflow runs automatically
# Monitor: Actions → "Production Environment - Daily Test Run"
```

## 🔍 Monitoring

### View All Environments
1. Go to **Actions** tab
2. Use filters:
   - Filter by workflow name
   - Filter by branch
   - Filter by status (success/failure)

### Compare Environments
1. Open each workflow
2. Check latest run status
3. Download and compare artifacts
4. Review test results

## 🚨 Troubleshooting

### Issue: Wrong environment URL being used
**Solution**: Check environment variables in workflow run logs
```yaml
- name: Debug environment
  run: |
    echo "BASE_URL: ${{ env.BASE_URL }}"
    echo "TEST_ENV: ${{ env.TEST_ENV }}"
```

### Issue: Workflow not triggering for branch
**Solution**: Verify branch name matches workflow triggers
- Check exact branch name: `git branch`
- Compare with workflow file triggers

### Issue: Tests pass locally but fail in specific environment
**Solution**: 
1. Check environment-specific URL is accessible
2. Review network/CORS issues
3. Verify test data exists in that environment
4. Check environment-specific configuration

## 📝 Best Practices

### 1. Branch Naming
- Use consistent naming: `dev`, `qa`, `main`
- Avoid variations that don't match workflow triggers

### 2. Environment URLs
- Keep URLs updated in `playwright.config.ts`
- Use environment variables for flexibility
- Document any URL changes

### 3. Test Data
- Ensure test data exists in all environments
- Use environment-specific test accounts if needed
- Clean up test data after runs

### 4. Artifacts Review
- Regularly download and review artifacts
- Clean up old artifacts to save storage
- Check traces for failed tests

### 5. Notifications
- Monitor workflow failure notifications
- Set up environment-specific alert channels
- Review daily run summaries

## 🔗 Related Documentation

- [CI-CD-GUIDE.md](./CI-CD-GUIDE.md) - Comprehensive CI/CD guide
- [CI-CD-QUICK-REF.md](./CI-CD-QUICK-REF.md) - Quick reference
- [CI-CD-CHECKLIST.md](./CI-CD-CHECKLIST.md) - Setup checklist

## 📞 Support

For environment-specific issues:
1. Check workflow logs in GitHub Actions
2. Review environment configuration
3. Verify branch and URL settings
4. Check test compatibility across environments
