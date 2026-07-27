# Quick Reference - Claude Code Commands

## MCP Commands (Working)

```bash
# List configured MCP servers
claude mcp list

# Call MCP tools via prompts (these work!)
```

### Using MCP Tools (via chat)
When you ask me to use MCP tools, I can invoke them:
- `mcp.tailoring_catalog.search_styles({ category: "suits" })`
- `mcp.design_system.get_tokens({ category: "colors" })`
- `mcp.analytics.track_event({ eventName: "style_viewed", styleId: "suit-navy-two-button" })`

---

## Agent Commands

Use the Agent tool to spawn specialized agents:

### Recommended Agents to Try

1. **Code Review Agent**
```
Please review index.html for semantic HTML and accessibility
```

2. **Security Auditor Agent**
```
Audit script.js for XSS vulnerabilities and security patterns
```

3. **Performance Engineer Agent**
```
Check styles.css for performance optimizations and Core Web Vitals impact
```

4. **Tailoring Domain Expert Agent**
```
What are the key differences between a sherwani and bandhgala?
```

---

## Workflow Commands

Create deterministic workflows:

```bash
# This project includes example workflows in .claude/workflows/
# You can invoke them via the Workflow tool or create your own
```

### Practice Workflows

1. **Validate All Guardrails**
```
Run script.js through guardrails.json and report issues
```

2. **Full Code Review Pipeline**
```
Start a multi-agent review: code-reviewer, security-auditor, accessibility-auditor
```

3. **Release Preparation**
```
Prepare a release: validate → optimize → document changes
```
---

## Certification Practice Flow

### Week 1: MCP Mastery
1. Connect MCP servers: `claude mcp list` ✓ Done!
2. Query tailoring catalog via MCP tools
3. Create analytics events
4. Generate design tokens

### Week 2: Agents
1. Spawn code-reviewer agent
2. Spawn security-auditor agent  
3. Try parallel agent execution
4. Synthesize findings

### Week 3: Guardrails
1. Run `node .claude/scripts/validate.js`
2. Add new rules
3. Fix violations
4. Integrate with CI

### Week 4: Workflows
1. Create validation workflow
2. Create deployment workflow
3. Practice failure handling
4. Generate reports

---

## Available Skills (Type `/<skill-name>`)

- `/dataviz` - Charts and visualizations
- `/update-config` - Modify settings.json
- `/simplify` - Code quality review
- `/code-review` - PR review
- `/security-review` - Security audit
- `/run` - Launch application

---

## MCP Tools Reference

### Tailoring Catalog MCP
- `search_styles` - Find styles by criteria
- `get_style_details` - Full specifications
- `check_fabric_availability` - Stock levels
- `calculate_price` - Quote generation
- `create_order` - Order management
- `get_customer_history` - Client records

### Design System MCP
- `get_tokens` - Design tokens (colors, spacing, typography)
- `get_component` - Component styles and variants
- `validate_design` - Check CSS/HTML against design system
- `generate_theme` - Create theme variations
- `export_tokens` - Export in various formats

### Analytics MCP
- `track_event` - Log custom events
- `start_session` - Begin user session
- `end_session` - Close session
- `get_funnel_analysis` - Conversion tracking
- `get_revenue_report` - Financial metrics
- `get_dashboard_summary` - Executive overview

---

*Start with any MCP tool invocation or agent request to begin practicing!*