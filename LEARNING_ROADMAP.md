# Jagger Tailors - AI Engineer Learning Roadmap

## 🎯 Goal: Master Claude Code for Enterprise AI Engineering

Using the Jagger Tailors project as our practical foundation, we'll systematically master every Claude Code capability needed for enterprise certification.

---

## 📚 Phase 1: Project Foundation ✅ COMPLETED

### What We've Built
- **Full-stack frontend**: HTML5, CSS3 (custom properties), ES6+ JavaScript
- **16 predefined styles** across 4 categories with full customization
- **Interactive modal system** with focus trapping, keyboard navigation
- **State management**: Selection cart, localStorage persistence
- **Form validation**: Client-side with accessibility
- **Professional architecture**: Mobile-first, WCAG AA, zero dependencies

### Configuration Established
- `CLAUDE.md` - Project instructions for Claude
- `.claude/settings.json` - Permissions, hooks, environment
- `.claude/hooks/` - Pre/Post-write, bash, prompt, stop, compact hooks
- Project structure following enterprise conventions

---

## 📚 Phase 2: MCP (Model Context Protocol) Servers

### Learning Objectives
- [ ] Understand MCP architecture and use cases
- [ ] Set up filesystem MCP for local operations
- [ ] Configure GitHub MCP for repository management
- [ ] Create custom MCP server for tailoring business logic
- [ ] Practice MCP tool discovery and invocation

### Implementation Tasks
```
1. Install MCP servers: filesystem, github, sqlite, fetch
2. Create .mcp.json configuration
3. Build custom "tailoring-catalog" MCP server
4. Connect to external fabric API via MCP
5. Implement MCP-based measurement calculator
```

### Certification Relevance
- MCP is core to Claude Code's extensibility
- Enterprise deployments require custom MCP servers
- Demonstrates integration capability

---

## 📚 Phase 3: Specialized Sub-Agents

### Learning Objectives
- [ ] Create domain-specific agents (code-reviewer, security-auditor, performance-engineer)
- [ ] Configure agent isolation (worktree vs shared)
- [ ] Design agent communication patterns
- [ ] Implement multi-agent workflows
- [ ] Practice agent delegation and synthesis

### Agent Types to Build
| Agent | Purpose | When to Use |
|-------|---------|-------------|
| `code-reviewer` | PR review, best practices | Every PR |
| `security-auditor` | OWASP, secrets, CSP | Pre-deploy |
| `performance-engineer` | Bundle size, Core Web Vitals | Optimization sprints |
| `accessibility-auditor` | WCAG compliance, axe-core | Every release |
| `tailoring-domain-expert` | Business logic validation | Feature work |
| `test-engineer` | Unit, integration, E2E | CI pipeline |

### Certification Relevance
- Multi-agent orchestration is key differentiator
- Worktree isolation for parallel development
- Agent schemas for structured output

---

## 📚 Phase 4: Guardrails & Validation

### Learning Objectives
- [ ] Implement input/output validation schemas
- [ ] Create security guardrails (secrets, XSS, CSRF)
- [ ] Build quality gates (lint, type-check, test)
- [ ] Design policy-as-code for enterprise compliance
- [ ] Practice automated remediation

### Guardrail Layers
```
Layer 1: Pre-commit (hooks) - Fast, local
Layer 2: CI Pipeline - Comprehensive, blocking
Layer 3: Runtime - CSP, headers, monitoring
Layer 4: Policy - OPA/Rego for org standards
```

### Implementation
- JSON Schema for all data structures
- Zod/Valibot for runtime validation
- Custom ESLint rules for code patterns
- Semgrep rules for security patterns

---

## 📚 Phase 5: Repeatability & Determinism

### Learning Objectives
- [ ] Create deterministic build/deploy scripts
- [ ] Implement snapshot testing for UI
- [ ] Design reproducible development environments
- [ ] Build self-healing CI pipelines
- [ ] Practice chaos engineering concepts

### Tools & Patterns
- **DevContainers** - Identical dev environments
- **Nix/Direnv** - Reproducible toolchains
- **Playwright** - Deterministic E2E tests
- **Changesets** - Automated versioning
- **Renovate/Dependabot** - Dependency management

---

## 📚 Phase 6: Enterprise Patterns

### Learning Objectives
- [ ] Multi-environment deployment (dev/staging/prod)
- [ ] Feature flags and progressive delivery
- [ ] Observability (logs, metrics, traces)
- [ ] Security scanning (SAST, DAST, SCA)
- [ ] Compliance automation (SOC2, GDPR)

### Architecture Patterns
```
┌─────────────────────────────────────────────┐
│           Enterprise Pipeline               │
├─────────────────────────────────────────────┤
│  Code → Lint → Test → Build → Scan → Deploy │
│       ↓      ↓      ↓      ↓      ↓         │
│   Guardrails at every stage                 │
└─────────────────────────────────────────────┘
```

---

## 📚 Phase 7: Certification Preparation

### Target: Claude Code Certification

### Practice Areas
1. **Workflow Design** - Complex multi-step orchestrations
2. **Agent Orchestration** - Parallel, pipeline, adversarial patterns
3. **MCP Integration** - Custom servers, tool composition
4. **Hook Automation** - Event-driven development
5. **Security Review** - Adversarial testing
6. **Performance Optimization** - Profiling, bottlenecks
7. **Accessibility Audit** - WCAG 2.1 AA compliance
8. **Documentation Generation** - Auto-docs from code

### Mock Exam Projects
| Project | Duration | Skills Tested |
|---------|----------|---------------|
| E-commerce migration | 2 hours | Agents, MCP, Guardrails |
| Design system build | 1.5 hours | Workflows, repeatability |
| Security audit | 1 hour | Guardrails, agents |
| Performance tuning | 1 hour | Monitoring, optimization |

---

## 🗓️ Suggested Learning Schedule

### Week 1-2: MCP Mastery
- Days 1-3: Filesystem, GitHub, SQLite MCPs
- Days 4-5: Custom tailoring-catalog MCP
- Days 6-7: Integration patterns

### Week 3-4: Agent Engineering
- Days 1-3: Core agents (review, security, test)
- Days 4-5: Domain expert agents
- Days 6-7: Multi-agent workflows

### Week 5-6: Guardrails & Quality
- Days 1-3: Validation schemas, linting
- Days 4-5: Security policies, CSP
- Days 6-7: Policy-as-code

### Week 7-8: Enterprise Patterns
- Days 1-3: CI/CD, environments
- Days 4-5: Observability, feature flags
- Days 6-7: Compliance automation

### Week 9: Certification Prep
- Mock exams, weak area review
- Time-boxed practice scenarios
- Documentation review

---

## 📖 Resources & References

### Official Documentation
- [Claude Code Docs](https://docs.anthropic.com/claude-code)
- [MCP Specification](https://modelcontextprotocol.io)
- [Agent SDK](https://github.com/anthropics/claude-agent-sdk)

### Skills to Practice
```
/dataviz         - Data visualization
/update-config   - Settings management
/simplify        - Code quality
/code-review     - PR review
/security-review - Security audit
/run             - App launching
```

### Community Patterns
- `.claude/agents/` - Reusable agent templates
- `.claude/commands/` - Custom slash commands
- `.claude/workflows/` - Deterministic orchestration

---

## ✅ Progress Tracking

| Phase | Status | Started | Completed |
|-------|--------|---------|-----------|
| 1. Foundation | ✅ Done | Day 1 | Day 1 |
| 2. MCP Servers | ⏳ Next | - | - |
| 3. Sub-Agents | ⬜ Pending | - | - |
| 4. Guardrails | ⬜ Pending | - | - |
| 5. Repeatability | ⬜ Pending | - | - |
| 6. Enterprise | ⬜ Pending | - | - |
| 7. Certification | ⬜ Pending | - | - |

---

## 🚀 Next Immediate Steps

1. **Set up MCP servers** - Start with filesystem + GitHub
2. **Create first custom agent** - Code reviewer for this project
3. **Add validation schemas** - JSON Schema for stylesData
4. **Build CI pipeline** - GitHub Actions with quality gates

Let's begin with Phase 2: MCP Servers!