# Environment Workflows - Comparison Table

## 📊 Complete Comparison

| Aspect | Production | QA | Developer |
|--------|-----------|----|-----------| 
| **Workflow Name** | Production Environment - Daily Test Run | QA Environment - Daily Test Run | Developer Environment - Daily Test Run |
| **File** | `daily-tests.yml` | `qa-daily-tests.yml` | `dev-daily-tests.yml` |
| **Job Name** | `prod-test` | `qa-test` | `dev-test` |
| **Notify Job** | `notify-prod` | `notify-qa` | `notify-dev` |
| **Schedule (Cron)** | `0 2 * * *` | `0 2 * * *` | `0 3 * * *` |
| **Schedule (Time)** | 2:00 AM UTC | 2:00 AM UTC | 3:00 AM UTC |
| **Base URL** | https://automationexercise.com | https://qa.automationexercise.com | https://dev.automationexercise.com |
| **TEST_ENV** | `production` | `qa` | `dev` |
| **Push Branches** | `main`, `master`, `framework-Structure` | `qa`, `qa-test`, `framework-Structure` | `dev`, `develop`, `development`, `framework-Structure` |
| **PR Branches** | `main`, `master` | `qa` | `dev`, `develop` |
| **Report Artifact** | `prod-playwright-report-{browser}` | `qa-playwright-report-{browser}` | `dev-playwright-report-{browser}` |
| **Trace Artifact** | `prod-playwright-traces-{browser}` | `qa-playwright-traces-{browser}` | `dev-playwright-traces-{browser}` |
| **Browsers** | chromium, firefox, webkit | chromium, firefox, webkit | chromium, firefox, webkit |
| **Timeout** | 60 minutes | 60 minutes | 60 minutes |
| **Retention** | 30 days | 30 days | 30 days |
| **Retries** | 2 | 2 | 2 |
| **Workers** | 1 (CI mode) | 1 (CI mode) | 1 (CI mode) |

## 🎯 Trigger Summary

### Production Workflow Triggers
- ✅ Daily at 2:00 AM UTC
- ✅ Manual trigger via GitHub UI
- ✅ Push to `main`, `master`, `framework-Structure`
- ✅ PR to `main`, `master`

### QA Workflow Triggers
- ✅ Daily at 2:00 AM UTC
- ✅ Manual trigger via GitHub UI
- ✅ Push to `qa`, `qa-test`, `framework-Structure`
- ✅ PR to `qa`

### Developer Workflow Triggers
- ✅ Daily at 3:00 AM UTC
- ✅ Manual trigger via GitHub UI
- ✅ Push to `dev`, `develop`, `development`, `framework-Structure`
- ✅ PR to `dev`, `develop`

## 📦 Artifact Naming Convention

### Production
```
prod-playwright-report-chromium.zip
prod-playwright-report-firefox.zip
prod-playwright-report-webkit.zip
prod-playwright-traces-chromium.zip (if failed)
prod-playwright-traces-firefox.zip (if failed)
prod-playwright-traces-webkit.zip (if failed)
```

### QA
```
qa-playwright-report-chromium.zip
qa-playwright-report-firefox.zip
qa-playwright-report-webkit.zip
qa-playwright-traces-chromium.zip (if failed)
qa-playwright-traces-firefox.zip (if failed)
qa-playwright-traces-webkit.zip (if failed)
```

### Developer
```
dev-playwright-report-chromium.zip
dev-playwright-report-firefox.zip
dev-playwright-report-webkit.zip
dev-playwright-traces-chromium.zip (if failed)
dev-playwright-traces-firefox.zip (if failed)
dev-playwright-traces-webkit.zip (if failed)
```

## 🔗 Badge URLs

```markdown
![Production Tests](https://github.com/vovan-u-s/work-task-for-our-work-sprint/actions/workflows/daily-tests.yml/badge.svg)

![QA Tests](https://github.com/vovan-u-s/work-task-for-our-work-sprint/actions/workflows/qa-daily-tests.yml/badge.svg)

![Dev Tests](https://github.com/vovan-u-s/work-task-for-our-work-sprint/actions/workflows/dev-daily-tests.yml/badge.svg)
```

## 🌐 URLs by Environment

| Environment | URL | Notes |
|------------|-----|-------|
| Production | https://automationexercise.com | Live production site |
| QA | https://qa.automationexercise.com | QA testing environment |
| Developer | https://dev.automationexercise.com | Development environment |

**Note**: Make sure these URLs are accessible and correspond to your actual environment setup.

## ⚙️ Environment Variables

Each workflow sets these environment variables:

### Production
```yaml
env:
  CI: true
  BASE_URL: https://automationexercise.com
  TEST_ENV: production
```

### QA
```yaml
env:
  CI: true
  BASE_URL: https://qa.automationexercise.com
  TEST_ENV: qa
```

### Developer
```yaml
env:
  CI: true
  BASE_URL: https://dev.automationexercise.com
  TEST_ENV: dev
```

## 📝 Quick Commands

### Run Locally by Environment
```powershell
# PowerShell (Windows)
$env:TEST_ENV="production"; npm test
$env:TEST_ENV="qa"; npm test
$env:TEST_ENV="dev"; npm test

# Or use NPM scripts
npm run test:prod
npm run test:qa
npm run test:dev
```

### Check Workflow Syntax
```powershell
# Install act (GitHub Actions local runner)
# Then validate workflows
act -l
```

### View Workflow Files
```powershell
# List all workflows
Get-ChildItem ".github\workflows\*.yml"

# View specific workflow
Get-Content ".github\workflows\daily-tests.yml"
```

## 🎨 Workflow Visualization

```
Production (main/master) → daily-tests.yml → 2:00 AM UTC → prod-* artifacts
      ↓
QA (qa/qa-test) → qa-daily-tests.yml → 2:00 AM UTC → qa-* artifacts
      ↓
Developer (dev/develop) → dev-daily-tests.yml → 3:00 AM UTC → dev-* artifacts
```

## ✅ Checklist for Each Environment

### Before Pushing
- [ ] Verify environment URLs are correct
- [ ] Ensure branches exist (qa, dev, main)
- [ ] Test locally with environment variables
- [ ] Review workflow file syntax
- [ ] Update documentation if needed

### After Pushing
- [ ] Check workflow appears in Actions tab
- [ ] Manually trigger workflow to test
- [ ] Verify artifacts are created correctly
- [ ] Check notification/logging
- [ ] Monitor first scheduled run

## 🔍 Troubleshooting

### Workflow Not Running
1. Check branch name matches trigger
2. Verify GitHub Actions is enabled
3. Review workflow file for syntax errors
4. Check repository permissions

### Wrong Environment Detected
1. Verify environment variables in workflow logs
2. Check `playwright.config.ts` logic
3. Review BASE_URL and TEST_ENV values
4. Test locally with same environment variables

### Artifacts Not Found
1. Ensure workflow completed successfully
2. Check artifact upload step in logs
3. Verify retention period hasn't expired
4. Check artifact naming matches environment

---

**Last Updated**: November 1, 2025
**Environments**: 3 (Production, QA, Developer)
**Status**: ✅ Active
