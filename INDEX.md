# Jagger Tailors - Claude Code Certification Project

A comprehensive learning platform built on the Jagger Tailors website for mastering Claude Code.

## 📚 Learning Path Summary

| Phase | Status | Files Created |
|-------|--------|---------------|
| 1. Foundation | ✅ | index.html, styles.css, script.js |
| 2. MCP Servers | ✅ | tailoring-catalog, design-system, analytics MCPs |
| 3. Agents | ✅ | code-reviewer, security-auditor, accessibility-auditor, performance-engineer, tailoring-domain-expert |
| 4. Guardrails | ✅ | guardrails.json, validate.js |
| 5. Workflows | ✅ | ci-cd.yaml, lighthouserc.json |
| 6. Certification | ✅ | CERTIFICATION_EXERCISES.md |

## 🎯 Quick Start

```bash
# Navigate to project
cd /Users/saikiranshanigarapu/practise/claude-practise

# Install dev tools (optional)
npm install

# View the website
npm run dev
# or
npx serve .

# Run guardrails
npm run audit

# Run certification exercises
npm run certify
```

## 🛠️ Key Commands to Practice

```bash
# MCP commands
/mcp list                          # List connected MCP servers
/mcp connect tailoring-catalog     # Connect custom MCP
/mcp tools                         # List available tools

# Agent commands
/agent code-reviewer "Review index.html"
/agent security-auditor "Audit script.js"
/agent accessibility-auditor "Check color contrast"

# Workflow commands
/workflow validate                 # Run validation workflow
/workflow release                  # Prepare release

# Other commands
/dataviz                           # For any charts/visualizations
/simplify                          # Code quality review
/review                            # PR review (when on git)
```

## 📁 File Structure

```
jagger-tailors/
├── index.html                  # Main website (25KB)
├── styles.css                  # Styling (35KB)
├── script.js          yman  # Interactivity (49KB)
├── package.json                # Project config
├── CLAUDE.md                   # Project instructions
├── LEARNING_ROADMAP.md         # Learning path
├── CERTIFICATION_EXERCISES.md  # Practice exercises
├── MCP_CONFIG.md               # MCP documentation
└── .claude/
    ├── settings.json           # Hooks, permissions
    ├── guardrails.json         # Quality rules
    ├── workflows/
    │   └── ci-cd.yaml          # GitHub Actions
    ├── mcp-servers/
    │   ├── tailoring-catalog/  # Custom MCP server
    │   ├── design-system/      # Token MCP server
    │   └── analytics/          # Metrics MCP server
    ├── agents/
    │   ├── code-reviewer.md
    │   ├── security-auditor.md
    │   ├── accessibility-auditor.md
    │   ├── performance-engineer.md
    │   └── tailoring-domain-expert.md
    └── scripts/
        └── validate.js         # Guardrail validator
```

## 🏆 Certification Checklist

### MCP Mastery
- [ ] Configure 3+ MCP servers
- [ ] Invoke custom tools
- [ ] Handle tool errors
- [ ] Secure MCP connections

### Agent Engineering
- [ ] Create 5+ specialized agents
- [ ] Delegate work to agents
- [ ] Parallel agent execution
- [ ] Structured output schemas

### Guardrails & Quality
- [ ] Schema-based validation
- [ ] Security pattern detection
- [ ] Quality gates in CI
- [ ] Auto-fix capabilities

### Workflows
- [ ] Deterministic builds
- [ ] Multi-phase orchestration
- [ ] Failure handling
- [ ] Reporting & notifications

### Enterprise Patterns
- [ ] Multi-environment configs
- [ ] Observability hooks
- [ ] Policy enforcement
- [ ] Compliance automation

---

*Ready for certification practice. Use `/agent code-reviewer "Review this project"` to begin.*