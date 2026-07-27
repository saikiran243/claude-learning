# GitHub Integration Guide - Claude Code Certification Platform

## 🚀 Push to Your Repository

```bash
# Initialize git if needed
git init

# Add remote (replace with your repo URL)
git remote add origin https://github.com/saikiran243/[your-repo-name].git

# Add all files
git add .

# Commit with conventional format
git commit -m "feat: Add Claude Code certification platform with MCP servers

- 4 custom MCP servers (tailoring-catalog, design-system, analytics, security-scanner)
- 5 specialized agents for code review/security/accessibility/performance/domain
- CI/CD workflow with security, accessibility, performance checks
- Guardrails for policy enforcement
- Hands-on learning exercises

Co-Authored-By: Claude <noreply@anthropics.com>"

# Push to main branch
git push -u origin main
```

## 📁 Repository Structure

```
your-repo/
├── .github/workflows/ci-cd.yml    # GitHub Actions (created)
├── .claude/
│   ├── agents/                   # AI specialists
│   ├── mcp-servers/              # Custom MCP servers
│   ├── scripts/validate.js       # Guardrail checker
│   └── workflows/                # Deterministic orchestrations
├── index.html, styles.css, script.js  # Main website
├── QUICK_REFERENCE.md            # Daily commands
├── LEARNING_ROADMAP.md           # Certification path
└── HANDS_ON_SESSION.md           # 30-min tutorials
```

## 🛠️ GitHub Actions Integration

### Step 1: Enable Actions
Go to your repo → Settings → Actions → Enable GitHub Actions

### Step 2: Add Secrets (if needed)
- No secrets required for this static site
- For MCP API integrations: add `GITHUB_TOKEN` for github MCP

### Step 3: Workflow Triggers
The `.github/workflows/ci-cd.yml` runs on:
- Push to main
- Pull requests
- Manual workflow dispatch

### Step 4: Branch Protection (Recommended)
Settings → Branches → Add rule for `main`:
- ✅ Require CI checks to pass
- ✅ Require security scan pass
- ✅ Require accessibility score ≥ 95
- ✅ Require performance score ≥ 90

## 🎯 Learning Integration

### Daily Practice Routine
```bash
# Morning: Run security scan on your code
git pull && claude mcp call security-scanner.scan_terraform

# Afternoon: Add a new guardrail rule
echo 'Add rule for checking public S3 buckets' > task.md

# Evening: Review with agents
# "Review my Terraform changes for security issues"
```

### Weekly Goals
| Day | Focus | Tasks |
|-----|-------|-------|
| Mon | MCP Basics | Connect 1 new MCP |
| Tue | Agent Work | Create 1 specialized agent |
| Wed | Security | Add guardrail rules |
| Thu | CI/CD | Extend workflow |
| Fri | Documentation | Update patterns |
| Sat | Testing | Run all exercises |
| Sun | Planning | Next week's goals |

## 📊 Progress Dashboard

Create `.claude/progress.json` to track your certification journey:

```json
{
  "week": 1,
  "skills_mastered": ["MCP Basics", "Agent Creation"],
  "patterns_built": ["Security Scanner"],
  "next_focus": "CI/CD Integration"
}
```

## 🔗 Integration Commands

```bash
# View current MCPs
claude mcp list

# Add a new MCP
claude mcp add my-tool node path/to/server.js

# Run guardrails
node .claude/scripts/validate.js

# View agents available
ls .claude/agents/

# Test workflow syntax
node .claude/workflows/security-scan.mjs
```

---

*Your next step: Push this repo and open a PR to see the CI/CD workflow in action!*