# Claude Code Certification Practice Exercises

Use this project as a foundation to master Claude Code capabilities for enterprise certification.

## 🏋️ Exercise 1: MCP Mastery

### Objective
Configure and use MCP servers to extend Claude Code functionality.

### Tasks
1. **Install and configure MCP servers** (filesystem, github, sqlite)
   ```bash
   # Verify MCP connectivity
   /mcp list
   /mcp connect tailoring-catalog
   ```

2. **Use MCP tools in agent context**
   - Query the style catalog via MCP
   - Create a new order through MCP
   - Fetch fabric availability

3. **Create custom MCP tool invocations**
   ```javascript
   // In a workflow or agent prompt:
   const styles = await mcp.tailoring_catalog.search_styles({
     category: "traditional",
     occasion: "wedding"
   });
   ```

### Success Criteria
- [ ] MCP servers connect successfully
- [ ] Tool invocations return expected data
- [ ] Custom tools work with JSON Schema validation
- [ ] Error handling works for invalid inputs

---

## 🏋️ Exercise 2: Agent Engineering

### Objective
Build and orchestrate specialized agents for code quality.

### Tasks
1. **Create a new specialized agent** for image optimization
   - Add to `.claude/agents/image-optimizer.md`
   - Define expertise in WebP, AVIF, responsive images

2. **Delegate work to existing agents**
   ```
   /agent code-reviewer "Review index.html for semantic structure"
   /agent security-auditor "Check script.js for XSS vulnerabilities"
   /agent accessibility-auditor "Audit styles.css color contrast"
   ```

3. **Multi-agent collaboration**
   - Use `Agent` tool with multiple agents in parallel
   - Synthesize findings from different perspectives
   - Create consensus report

### Success Criteria
- [ ] Agent returns structured, actionable feedback
- [ ] Agents can be invoked individually
- [ ] Parallel agent execution works
- [ ] Findings are properly synthesized

---

## 🏋️ Exercise 3: Guardrails Implementation

### Objective
Implement comprehensive quality gates and validation.

### Tasks
1. **Run guardrails manually**
   ```bash
   node .claude/scripts/validate.js
   ```

2. **Add new guardrail rule**
   - Add rule for "no console.log in production"
   - Add rule for "missing alt text on images"

3. **Fix guardrail violations**
   - Address all errors reported
   - Achieve clean validation

### Success Criteria
- [ ] Guardrails run automatically on file changes
- [ ] New rules are properly detected
- [ ] All violations are fixable
- [ ] CI/CD respects guardrail failures

---

## 🏋️ Exercise 4: Workflow Orchestration

### Objective
Create deterministic, repeatable workflows.

### Tasks
1. **Create a release workflow**
   ```javascript
   // .claude/workflows/release.mjs
   export const meta = {
     name: 'release',
     description: 'Prepare and validate a release',
     phases: [
       { title: 'Validate', detail: 'Run all quality checks' },
       { title: 'Build', detail: 'Optimize assets' },
       { title: 'Deploy', detail: 'Deploy to staging' },
       { title: 'Verify', detail: 'Smoke test deployment' }
     ]
   };
   ```

2. **Run workflow phases in sequence**
   - Phase 1: Validation (guardrails, lint, tests)
   - Phase 2: Build (optimize, minify)
   - Phase 3: Deploy (Netlify/Vercel)
   - Phase 4: Verify (smoke test URLs)

### Success Criteria
- [ ] Workflow runs deterministically
- [ ] Each phase completes before next starts
- [ ] Failure stops workflow
- [ ] Results are logged

---

## 🏋️ Exercise 5: Enterprise Integration

### Objective
Implement enterprise patterns for observability and compliance.

### Tasks
1. **Create monitoring dashboard**
   ```bash
   # Create observability JSON
   cat .claude/monitoring.json
   ```

2. **Add pre-commit hook**
   ```bash
   # Hook runs on git commit
   npx husky add .husky/pre-commit "node .claude/scripts/validate.js"
   ```

3. **Environment-based configuration**
   - Create `.env.example`
   - Add validation for required env vars
   - Test with missing/incorrect values

### Success Criteria
- [ ] Monitoring data is structured
- [ ] Pre-commit prevents bad commits
- [ ] Configuration works across environments
- [ ] Secrets are never exposed

---

## 🏋️ Exercise 6: Performance Optimization

### Objective
Optimize the Jagger website for Core Web Vitals.

### Tasks
1. **Run Lighthouse audit**
   ```bash
   npx lighthouse http://localhost:8000 --output=json
   ```

2. **Identify bottlenecks**
   - Largest Contentful Paint (hero image)
   - Total Blocking Time (JavaScript)
   - Cumulative Layout Shift (layout instability)

3. **Apply optimizations**
   - Lazy load below-fold images
   - Minify CSS/JS
   - Add resource hints
   - Optimize critical CSS

### Success Criteria
- [ ] Lighthouse score ≥ 90
- [ ] LCP < 2.5s
- [ ] CLS < 0.1
- [ ] FID < 100ms

---

## 🏋️ Exercise 7: Security Hardening

### Objective
Complete a comprehensive security audit.

### Tasks
1. **Run security scan**
   ```bash
   npx claude-code-security-audit .
   ```

2. **Add CSP headers**
   ```html
   <meta http-equiv="Content-Security-Policy" content="default-src 'self'; img-src 'self' data: https:; script-src 'self'; style-src 'self' 'unsafe-inline';">
   ```

3. **Implement form protection**
   - Add CSRF token generation
   - Rate limit submissions
   - Validate all inputs server-side

### Success Criteria
- [ ] No critical vulnerabilities
- [ ] CSP header prevents XSS
- [ ] All forms have server-side validation
- [ ] Security scan passes

---

## 🎯 Mock Certification Exam

### Scenario: E-commerce Migration
You're migrating a legacy e-commerce site to a modern JAMstack architecture. Use the Jagger project patterns.

### Questions (Timeboxed: 120 minutes)

**Q1: Multi-Agent Architecture (30 min)**
Design a 3-agent system for product migration:
- Product scraper agent
- Data validator agent  
- Content migrator agent

Document agent schemas, communication patterns, and failure handling.

**Q2: MCP Integration (30 min)**
Create MCP tools for:
- Product catalog API integration
- Order management system
- Inventory tracking

Include JSON schemas and error handling.

**Q3: Guardrails Policy (30 min)**
Write guardrail rules for:
- Performance budget (max 200KB JS)
- Accessibility (WCAG AA checklist)
- Security (OWASP Top 10)

**Q4: Workflow Implementation (30 min)**
Create a workflow for:
1. Nightly security scans
2. Weekly performance audits
3. Monthly accessibility reviews

Include failure notifications and reporting.

---

## 📊 Progress Tracking

| Exercise | Status | Time Spent | Notes |
|----------|--------|------------|-------|
| 1. MCP Mastery | ⬜ | - | |
| 2. Agent Engineering | ⬜ | - | |
| 3. Guardrails | ⬜ | - | |
| 4. Workflows | ⬜ | - | |
| 5. Enterprise | ⬜ | - | |
| 6. Performance | ⬜ | - | |
| 7. Security | ⬜ | - | |
| Mock Exam | ⬜ | - | |

---

## 🎓 Certification Resources

- [Claude Code Documentation](https://docs.anthropic.com/claude-code)
- [MCP Specification](https://modelcontextprotocol.io/spec)
- [Agent SDK](https://github.com/anthropics/claude-agent-sdk)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

---

*Complete all exercises to prepare for certification. Each builds on concepts from the Jagger Tailors project.*