# Hands-On Session: AI Architecture from Infra Background

## ⏱️ 30-Minute Quick Start (Day 1)

### Minute 0-5: Connect MCP Servers

```bash
# Add security-scanner MCP
claude mcp add security-scanner node .claude/mcp-servers/security-scanner/index.js

# Verify connection
claude mcp list
# You should see: security-scanner ✓ Connected
```

### Minute 5-15: Test Your First MCP Tool

Ask me to use the tools:
```
Use security-scanner MCP to scan this Terraform code for vulnerabilities:
resource "aws_iam_role" "admin" {
  assume_role_policy = "*"  # This should trigger a finding
}
```

I invoke `mcp.security_scanner.scan_terraform()` and show security findings.

### Minute 15-25: Create CI/CD Integration

Add to your existing pipeline:

```yaml
# .github/workflows/ai-security.yml
name: AI Security Checks
on: [push, pull_request]

jobs:
  scan:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Run Security MCP
        run: |
          # This would call our security scanner
          node .claude/mcp-servers/security-scanner/index.js
```

### Minute 25-30: Document Pattern

Create your team pattern:

```markdown
# Security Scan Pattern

## When to Use
- Every PR with infrastructure changes
- Before production deployments
- Scheduled weekly scans

## Tools
- `scan_terraform` via MCP
- `scan_kubernetes` via MCP
- `scan_ai_output` via MCP

## Integration
- GitHub Actions workflow
- Slack notifications for critical findings
- Auto-block on high-severity issues
```

---

## 🛠️ Your Enterprise Toolkit

### 1. Security Scanner MCP (Created)
- Scans Terraform for IAM/secrets/networking issues
- Scans Kubernetes for privilege/networking problems
- Scans AI outputs for prompt injection/PII

### 2. Agent Templates (Ready)
Ready in .claude/agents/:
- security-auditor.md - Infrastructure security
- compliance-auditor.md - SOC2/HIPAA/PCI checks
- cost-optimizer.md - Resource optimization
- terraform-validator.md - IaC best practices

### 3. Workflows (Create These)
- `security-scan.mjs` - Multi-stage security pipeline
- `cost-optimization.mjs` - Right-sizing recommendations
- `compliance-check.mjs` - Policy enforcement

---

## 🎯 Next Steps After Session

1. **Add to your CI/CD** - Integrate MCP security scans
2. **Customize agents** - Add your company policies
3. **Build workflows** - Create deterministic pipelines
4. **Measure impact** - Track vulnerability detection rate

---

## 💡 Your Value Proposition

Companies need AI engineers who understand:
- Production deployment (your strength)
- Security compliance (your expertise)
- Cost optimization (your experience)
- Reliability patterns (your background)

Start building your portfolio today with these patterns.