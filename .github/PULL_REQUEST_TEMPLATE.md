---
name: Pull Request Template
description: Standard PR template for this repository
title: ""
labels: []
---

## Description
<!-- Provide a clear and concise description of what this PR does -->

## Type of Change
<!-- Check all that apply -->
- [ ] 🐛 Bug fix (non-breaking change that fixes an issue)
- [ ] ✨ New feature (non-breaking change that adds functionality)
- [ ] 💥 Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] 📝 Documentation update
- [ ] 🔧 Refactoring (no functional changes)
- [ ] 🧪 Test addition/modification
- [ ] 🚀 CI/CD improvement
- [ ] 🔒 Security improvement

## Related Issues
<!-- Link related issues using "Fixes #123" or "Closes #123" -->
Fixes #
Related to #

## Changes Made
<!-- List the specific changes made in this PR -->
1.
2.
3.

## Testing
<!-- Describe how you tested your changes -->
- [ ] Unit tests pass
- [ ] Integration tests pass
- [ ] E2E tests pass
- [ ] Manual testing performed
- [ ] Accessibility testing (axe-core)
- [ ] Lighthouse scores ≥ 90

### Test Details
```
Test commands run:
- npm test
- npx playwright test
- npx axe-cli http://localhost:3000
```

## Screenshots
<!-- Add screenshots for UI changes -->

## Checklist
<!-- Ensure all items are checked before requesting review -->
- [ ] Code follows project style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex logic
- [ ] Documentation updated
- [ ] No new warnings/errors introduced
- [ ] Dependencies updated if needed
- [ ] Breaking changes documented

## Security Checklist
- [ ] No secrets committed
- [ ] Input validation added
- [ ] XSS/CSRF protections in place
- [ ] Dependencies scanned for vulnerabilities

## Performance Impact
- [ ] No performance regression
- [ ] Bundle size unchanged
- [ ] Lighthouse scores maintained

## Deployment Notes
<!-- Any special deployment considerations -->
- [ ] No special deployment steps needed
- [ ] Database migration required
- [ ] Environment variables need update
- [ ] Feature flag needed

## Reviewers
<!-- Tag specific reviewers if needed -->
/cc @reviewer1 @reviewer2