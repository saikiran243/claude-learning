# GitOps Implementation Guide

## Overview
This document describes the GitOps patterns implemented in this repository for enterprise-grade CI/CD with Claude Code integration.

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        GITOPS PIPELINE                           │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌──────────┐    ┌─────────────┐    ┌────────────┐    ┌───────┐ │
│  │  CODE    │───▶│   LINT &    │───▶│   TEST     │───▶│ BUILD │ │
│  │  COMMIT      │    │   SECURITY   │    │   SUITE    │    │ IMAGE │ │
│  └──────────┘    └─────────────┘    └────────────┘    └───────┘ │
│       │               │                   │               │      │
│       ▼               ▼                   ▼               ▼      │
│  ┌──────────┐    ┌─────────────┐    ┌────────────┐    ┌───────┐ │
│  │ GITLEAKS │    │  GUARDRAILS  │    │ LIGHTHOUSE │    │ DEPLOY│ │
│  │  SCAN    │    │  VALIDATION  │    │  CI        │    │ STAGING│ │
│  └──────────┘    └─────────────┘    └────────────┘    └───────┘ │
│                                                                  │
│       ▼               ▼                   ▼               ▼      │
│  ┌──────────┐    ┌─────────────┐    ┌────────────┐    ┌───────┐ │
│  │ SECURITY │    │  POLICY      │    │ PERFORMANCE│    │ PROD  │ │
│  │  REVIEW  │    │  ENFORCEMENT │    │  GATES     │    │ DEPLOY│ │
│  └──────────┘    └─────────────┘    └────────────┘    └───────┘ │
│                                                                  │
│       ▼               ▼                   ▼               ▼      │
│  ┌─────────────────────────────────────────────────────────────┐ │
│  │                    MCP INTEGRATION                            │ │
│  │  • Security Scanner MCP    • Analytics MCP                  │ │
│  │  • Design System MCP       • Tailoring Catalog MCP          │ │
│  └─────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🔐 Branch Strategy

```
main (protected)
  │
  ├── develop (integration branch)
  │     │
  │     ├── feature/* (feature branches)
  │     ├── fix/* (bug fix branches)
  │     └── chore/* (maintenance branches)
  │
  ├── release/* (release preparation)
  │
  └── hotfix/* (emergency fixes)
```

### Branch Protection Rules (Configure in GitHub Settings)

**main branch:**
- ✅ Require pull request reviews (2 approvals)
- ✅ Dismiss stale reviews on new commits
- ✅ Require status checks to pass:
  - `lint-and-security`
  - `test`
  - `quality-gates`
- ✅ Require branches to be up to date
- ✅ Restrict pushes to matching branches
- ✅ Require signed commits
- ✅ Require linear history

**develop branch:**
- ✅ Require pull request reviews (1 approval)
- ✅ Require status checks to pass
- ✅ Allow force pushes (for rebasing)

---

## 🔧 CI/CD Pipeline Stages

### 1. Lint & Security (5-10 min)
```yaml
# Runs on every push/PR
- ESLint (JavaScript)
- Stylelint (CSS)
- HTML Validation
- Custom Guardrails
- Gitleaks Secret Scanning
- npm audit (high/critical)
```

### 2. Test Suite (10-15 min)
```yaml
- Unit Tests (Vitest/Jest)
- E2E Tests (Playwright)
- Accessibility Tests (axe-core)
- Coverage Reports
```

### 3. Quality Gates (5-10 min)
```yaml
- Lighthouse CI (Performance ≥ 90, A11y ≥ 95)
- Bundle Size Check
- Performance Budgets
```

### 4. Container Build (3-5 min)
```yaml
- Multi-stage Docker build
- Security scanning (Trivy)
- Push to GHCR with semantic tags
```

### 5. Deploy Staging (2-3 min)
```yaml
- Auto-deploy on develop branch
- Vercel Preview Deployments
- Health Checks
- Smoke Tests
```

### 6. Deploy Production (Manual/Approval)
```yaml
- Manual approval required
- GitHub Environment: production
- Rollback capability
- Post-deploy health checks
```

---

## 🤖 MCP Integration in CI/CD

### Using MCP Servers in Workflows

```yaml
# Example: Security scan using MCP
- name: Run Security Scan via MCP
  run: |
    # Start MCP server
    node .claude/mcp-servers/security-scanner/index.js &
    MCP_PID=$!
    sleep 3
    
    # Call MCP tool
    echo '{"jsonrpc":"2.0","method":"tools/call","params":{"name":"scan_terraform","arguments":{"code":"..."}},"id":1}' | nc localhost 3000
    
    kill $MCP_PID
```

### Available MCP Tools in CI

| MCP Server | Tool | CI Use Case |
|------------|------|-------------|
| `security-scanner` | `scan_terraform` | IaC security |
| `security-scanner` | `scan_kubernetes` | K8s security |
| `security-scanner` | `scan_ai_output` | PII detection |
| `analytics` | `track_event` | CI metrics |
| `design-system` | `validate_design` | Design compliance |

---

## 🛡️ Security Gates

### Required Checks (Block Merge)
1. **No Critical/High Vulnerabilities** - `npm audit --audit-level=high`
2. **No Secrets** - Gitleaks scan passes
3. **No Guardrail Violations** - Custom rules pass
4. **Lighthouse Score ≥ 90** - Performance, A11y, Best Practices
3. **Tests Pass** - All test suites green
4. **Code Coverage ≥ 80%** - Unit tests

### Warning Checks (Allow Merge with Warning)
1. Medium npm vulnerabilities
2. Bundle size increase > 10%
3. New TODO/FIXME comments

---

## 📦 Release Process

### Automated Release (Tag-based)
```bash
# Create and push tag
git tag -a v1.2.3 -m "Release v1.2.3"
git push origin v1.2.3
```

**Automated Actions:**
1. Generate changelog from conventional commits
2. Create GitHub Release with artifacts
3. Build and push Docker images
4. Deploy to production
5. Notify team (Slack/Discord)

### Semantic Versioning
| Change Type | Version Bump | Example |
|-------------|--------------|---------|
| Breaking | Major | 1.0.0 → 2.0.0 |
| Feature | Minor | 1.0.0 → 1.1.0 |
| Bug Fix | Patch | 1.0.0 → 1.0.1 |

---

## 🔍 Monitoring & Observability

### Key Metrics Tracked
| Metric | Source | Alert Threshold |
|--------|--------|-----------------|
| Build Success Rate | GitHub Actions | < 95% |
| Deployment Frequency | GitHub Actions | Daily |
| Lead Time for Changes | GitHub Actions | > 1 day |
| Mean Time to Recovery | GitHub Actions | > 1 hour |
| Change Failure Rate | GitHub Actions | > 15% |

### Health Checks
```yaml
# Post-deployment verification
- curl -f https://app.example.com/health
- curl -f https://app.example.com/api/ready
- Lighthouse CI re-run on production
```

---

## 🚀 Getting Started

### 1. Enable GitHub Actions
```bash
# Repository Settings → Actions → General
# ✅ Allow all actions
# ✅ Allow reusable workflows
```

### 2. Configure Environments
```bash
# Settings → Environments
# Create: staging, production
# Add protection rules
```

### 3. Add Secrets
```bash
# Settings → Secrets and variables → Actions
VERCEL_TOKEN=xxx
VERCEL_ORG_ID=xxx
VERCEL_PROJECT_ID=xxx
GITHUB_TOKEN=auto-provided
```

### 4. Enable Branch Protection
```bash
# Settings → Branches → Add rule
# Branch pattern: main
# ✅ Require PR reviews (2)
# ✅ Require status checks
# ✅ Require branches up to date
```

### 5. Enable Dependabot
```bash
# Settings → Security → Dependabot
# ✅ Dependabot alerts
# ✅ Dependabot security updates
# ✅ Dependabot version updates
```

---

## 📚 Best Practices

### Commit Messages
```bash
# Conventional commits
feat: add new MCP server for analytics
fix: resolve security scanner false positive
docs: update GitOps documentation
chore: update dependencies
refactor: simplify guardrails logic
```

### Pull Requests
- Small, focused changes
- Descriptive titles
- Link related issues
- Include screenshots for UI
- Update documentation

### Reviews
- Review within 24 hours
- Focus on security, performance, maintainability
- Approve only when confident
- Use "Request Changes" for blocking issues

---

## 🚨 Incident Response

### Rollback Procedure
```bash
# Quick rollback via GitHub Actions
# 1. Go to Actions → Deploy Production
# 2. Click "Re-run jobs" on previous successful run
# 3. Or: git revert <commit> && git push origin main
```

### Post-Incident
1. Create incident report
2. Root cause analysis
3. Add preventive guardrails
4. Update runbooks

---

## 📚 Additional Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Vercel Git Integration](https://vercel.com/docs/git)
- [Dependabot Configuration](https://docs.github.com/en/code-security/dependabot)
- [GitLeaks Configuration](https://github.com/gitleaks/gitleaks)
- [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci)

---

*This GitOps implementation showcases enterprise patterns using your infrastructure automation background combined with AI-powered development workflows.*