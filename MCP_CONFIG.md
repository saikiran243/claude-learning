# MCP Server Configuration for Jagger Tailors Project

## Overview
This project uses Model Context Protocol (MCP) servers to extend Claude Code's capabilities with external tools and data sources.

## Core MCP Servers (Pre-installed)

### 1. Filesystem MCP
**Purpose**: Secure file system access within project boundaries
```json
{
  "name": "filesystem",
  "command": "npx",
  "args": ["-y", "@modelcontextprotocol/server-filesystem", "/Users/saikiranshanigarapu/practise/claude-practise"]
}
```

### 2. GitHub MCP
**Purpose**: Repository operations, PR management, issue tracking
```json
{
  "name": "github",
  "command": "npx",
  "args": ["-y", "@modelcontextprotocol/server-github"],
  "env": {
    "GITHUB_PERSONAL_ACCESS_TOKEN": "${GITHUB_TOKEN}"
  }
}
```

### 3. SQLite MCP
**Purpose**: Local database for style catalog, orders, analytics
```json
{
  "name": "sqlite",
  "command": "npx",
  "args": ["-y", "@modelcontextprotocol/server-sqlite", "jagger.db"]
}
```

### 4. Memory MCP
**Purpose**: Persistent knowledge graph across sessions
```json
{
  "name": "memory",
  "command": "npx",
  "args": ["-y", "@modelcontextprotocol/server-memory"]
}
```

## Custom MCP Servers (Project-Specific)

### 5. Tailoring Catalog MCP
**Purpose**: Domain-specific operations for bespoke tailoring business

```json
{
  "name": "tailoring-catalog",
  "command": "node",
  "args": [".claude/mcp-servers/tailoring-catalog/index.js"],
  "env": {
    "CATALOG_PATH": "./data/styles.json",
    "ORDERS_DB": "./data/orders.db"
  }
}
```

**Tools Provided**:
- `search_styles` - Query styles by category, fabric, occasion
- `get_style_details` - Full customization options
- `check_availability` - Fabric stock levels
- `calculate_price` - Quote generation with options
- `create_order` - Order management
- `get_customer_history` - Client measurement records

### 6. Design System MCP
**Purpose**: Design token management, component library

```json
{
  "name": "design-system",
  "command": "node",
  "args": [".claude/mcp-servers/design-system/index.js"]
}
```

**Tools Provided**:
- `get_tokens` - Colors, spacing, typography
- `get_components` - React/Vue/HTML components
- `validate_design` - Check against design system
- `generate_theme` - Create theme variations

### 7. Analytics MCP
**Purpose**: Business metrics, conversion tracking

```json
{
  "name": "analytics",
  "command": "node",
  "args": [".claude/mcp-servers/analytics/index.js"]
}
```

**Tools Provided**:
- `track_event` - Custom event tracking
- `get_funnel` - Conversion funnel analysis
- `get_popular_styles` - Style popularity rankings
- `get_revenue` - Revenue reports

## MCP Configuration File

Create `.mcp.json` in project root:

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/Users/saikiranshanigarapu/practise/claude-practise"]
    },
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "${GITHUB_TOKEN}"
      }
    },
    "sqlite": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-sqlite", "jagger.db"]
    },
    "memory": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-memory"]
    },
    "tailoring-catalog": {
      "command": "node",
      "args": [".claude/mcp-servers/tailoring-catalog/index.js"],
      "env": {
        "CATALOG_PATH": "./data/styles.json",
        "ORDERS_DB": "./data/orders.db"
      }
    },
    "design-system": {
      "command": "node",
      "args": [".claude/mcp-servers/design-system/index.js"]
    },
    "analytics": {
      "command": "node",
      "args": [".claude/mcp-servers/analytics/index.js"]
    }
  }
}
```

## Usage in Claude Code

### Auto-connect on Startup
Add to `.claude/settings.json`:
```json
{
  "mcp": {
    "autoConnect": ["filesystem", "memory", "tailoring-catalog"]
  }
}
```

### Manual Connection
```bash
# In Claude Code
/mcp connect filesystem
/mcp connect tailoring-catalog
/mcp list
```

### Using MCP Tools
Once connected, tools are available to agents:
```javascript
// In agent prompt or workflow
const styles = await mcp.tailoring_catalog.search_styles({
  category: "suits",
  fabric: "wool",
  occasion: "wedding"
});
```

## Development Workflow

### 1. Create Custom MCP Server
```bash
mkdir -p .claude/mcp-servers/tailoring-catalog
cd .claude/mcp-servers/tailoring-catalog
npm init -y
npm install @modelcontextprotocol/sdk
```

### 2. Implement Server (index.js)
```javascript
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { 
  ListToolsRequestSchema, 
  CallToolRequestSchema 
} from '@modelcontextprotocol/sdk/types.js';

const server = new Server(
  { name: 'tailoring-catalog', version: '1.0.0' },
  { capabilities: { tools: {} } }
);

server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [
    {
      name: 'search_styles',
      description: 'Search tailoring styles by criteria',
      inputSchema: {
        type: 'object',
        properties: {
          category: { type: 'string', enum: ['suits', 'shirts', 'traditional', 'casual'] },
          fabric: { type: 'string' },
          occasion: { type: 'string' },
          priceRange: { type: 'object', properties: { min: { type: 'number' }, max: { type: 'number' } } }
        }
      }
    },
    // ... more tools
  ]
}));

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  // Implementation
});

const transport = new StdioServerTransport();
await server.connect(transport);
```

### 3. Test Server
```bash
node index.js
# Should start and wait for stdio communication
```

## Security Best Practices

1. **Scope filesystem** to project directory only
2. **Use env vars** for tokens, never hardcode
3. **Validate all inputs** in custom servers
4. **Rate limit** external API calls
5. **Audit tool permissions** regularly

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Server won't start | Check Node version (18+), dependencies installed |
| Tools not appearing | Restart Claude Code, check `/mcp list` |
| Permission denied | Verify filesystem scope, token validity |
| Timeout errors | Increase timeout in settings, optimize queries |

## Next Steps

1. Install core MCP packages:
   ```bash
   npm install -g @modelcontextprotocol/server-filesystem @modelcontextprotocol/server-github @modelcontextprotocol/server-sqlite @modelcontextprotocol/server-memory
   ```

2. Create custom MCP servers in `.claude/mcp-servers/`

3. Test with `/mcp connect <server-name>`

4. Integrate into agent workflows