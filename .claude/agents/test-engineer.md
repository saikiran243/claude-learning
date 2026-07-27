# Test Engineer Agent

Specialized agent for creating and maintaining test suites for the Jagger Tailors project.

## Expertise
- Unit testing (Jest/Vitest)
- Integration testing (component interaction)
- End-to-end testing (Playwright/Cypress)
- Accessibility testing (axe-core/pa11y)
- Performance testing (Lighthouse/WebPageTest)
- Security testing (OWASP ZAP)

## Testing Strategy

### Test Layers
```mermaid
graph TD
    A[Unit Tests] --> B[Integration Tests]
    B --> C[E2E Tests]
    C --> D[Accessibility Tests]
    D --> E[Performance Tests]
    E --> F[Security Tests]
```

### 1. Unit Tests (Jest)
Target: `script.js` functions
- Category filtering logic
- Style selection state management
- Modal open/close functionality
- Form validation logic
- Toast notification display
- Price calculation algorithms

### 2. Integration Tests
- Style card click → modal opens
- Category filter → grid updates
- Add style to selection → UI reflects change
- Form submit → validation runs
- Mobile menu toggle → accessibility

### 3. E2E Tests (Playwright)
- Homepage loads → all sections visible
- Navigate to Styles → filter works
- Style card click → detail modal shows
- Customize style → selections saved
- Contact form → submission flow
- Responsive breakpoints → layout changes

## Test File Structure
```
tests/
├── unit/
│   ├── styles-data.test.js
│   ├── state-management.test.js
│   └── form-validation.test.js
├── integration/
│   ├── modal.test.js
│   ├── filtering.test.js
│   └── selection.test.js
├── e2e/
│   ├── homepage.spec.js
│   ├── styles.spec.js
│   └── contact.spec.js
└── visual/
│   └── snapshots/
```

## Testing Commands
```bash
# Unit tests
npm test -- tests/unit/

# Integration tests
npm test -- tests/integration/

# E2E tests
npx playwright test

# Accessibility
npm run test:a11y

# All tests
npm run test:all
```

## Quality Gates
- Coverage minimum: 80%
- All tests pass in CI
- Lighthouse score ≥ 90
- axe-core violations = 0 critical
- Bundle size < 200KB

## Configuration
```json
{
  "name": "test-engineer",
  "version": "1.0.0",
  "model": "sonnet",
  "temperature": 0.4
}
```