# MCP Usage Guide - Jagger Tailors Project

## 🚀 Getting Started

All MCP servers are configured and connected. Here's how to use them:

## 🔧 Connected MCP Servers

```
tailoring-catalog: ✔ Connected
design-system: ✔ Connected  
analytics: ✔ Connected
```

## 🎯 How to Invoke MCP Tools

Ask me to use MCP tools by mentioning the server and tool name:

### Examples

**1. Search Styles**
```
Use tailoring-catalog MCP to search for wedding suits
```
This calls `mcp.tailoring_catalog.search_styles({ category: "traditional" })`

**2. Get Design Tokens**
```
Use design-system MCP to get color tokens
```
This calls `mcp.design_system.get_tokens({ category: "colors" })`

**3. Track Analytics**
```
Use analytics MCP to track a style_viewed event
```
This calls `mcp.analytics.track_event({ eventName: "style_viewed" })`

## 📊 Available Tools by Server

### tailoring-catalog
| Tool | Purpose | Example |
|------|---------|---------|
| `search_styles` | Find styles by category/fabric/occasion | `{ category: "suits", occasion: "wedding" }` |
| `get_style_details` | Get full specifications | `{ styleId: "suit-navy-two-button" }` |
| `check_fabric_availability` | Stock levels | `{ fabricIds: ["wool-navy"], requiredMeters: 3.5 }` |
| `calculate_price` | Quote generation | `{ styleId: "...", fabricId: "...", customizations: {...} }` |
| `create_order` | Order management | `{ customerName, styleId, customizations }` |
| `get_recommendations` | AI recommendations | `{ occasion: "wedding", bodyType: "athletic" }` |

### design-system
| Tool | Purpose | Example |
|------|---------|---------|
| `get_tokens` | Design tokens | `{ category: "colors" }` or `{ category: "all" }` |
| `get_component` | Component styles | `{ name: "button", variant: "primary" }` |
| `validate_design` | Check CSS/HTML | `{ css: "body { color: #333 }" }` |
| `generate_theme` | Theme variants | `{ baseTheme: "light", variant: "dark" }` |
| `export_tokens` | Export formats | `{ format: "css", category: "colors" }` |

### analytics
| Tool | Purpose | Example |
|------|---------|---------|
| `track_event` | Log interactions | `{ eventName: "style_viewed", styleId: "..." }` |
| `get_dashboard_summary` | Overview metrics | `{ period: "week" }` |
| `get_revenue_report` | Financial data | `{ groupBy: "month" }` |
| `record_order` | Revenue tracking | `{ orderId: "...", amount: 35000 }` |

## 🛠️ Practical Exercises

### Exercise 1: Style Catalog Query
Ask: *"Use tailoring-catalog MCP to find all traditional wear suitable for weddings with their estimated prices"*

### Exercise 2: Design Tokens
Ask: *"Use design-system MCP to export all color tokens in CSS format"*

### Exercise 3: Analytics Integration
Ask: *"Use analytics MCP to track that I viewed the navy two-button suit"*

### Exercise 4: Price Calculator
Ask: *"Use tailoring-catalog MCP to calculate price for a navy suit with full canvas construction"*

## 📝 Sample Invocations

```javascript
// When you ask me to use MCP tools, I can invoke them like this:

// Style catalog
mcp.tailoring_catalog.search_styles({ category: "traditional" })
mcp.tailoring_catalog.get_style_details({ styleId: "traditional-sherwani" })

// Design system
mcp.design_system.export_tokens({ format: "tailwind", category: "colors" })
mcp.design_system.generate_theme({ baseTheme: "light", variant: "wedding" })

// Analytics
mcp.analytics.track_event({ 
  eventName: "style_selected", 
  styleId: "suit-navy-two-button",
  userId: "session-123"
})
mcp.analytics.record_order({ orderId: "JGR-001", amount: 35000, items: [...] })
```

## 🎯 Certification Practice

Try these MCP-based tasks:

1. **Tool Discovery** - Ask me to list and describe available tools
2. **Data Retrieval** - Use MCP to fetch style/fabric/customer data
3. **State Mutation** - Create orders, track events, record revenue
4. **Error Handling** - Try invalid inputs and observe error responses
5. **Integration** - Chain multiple MCP tool calls together

*Just ask me to use any of these tools and I'll demonstrate the results!*