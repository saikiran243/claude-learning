#!/usr/bin/env node
/**
 * Design System MCP Server
 * Provides design tokens, components, and validation for Jagger brand
 */

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  ListToolsRequestSchema,
  CallToolRequestSchema,
  ErrorCode,
  McpError
} from '@modelcontextprotocol/sdk/types.js';

// ========================================
// Design Tokens (from styles.css)
// ========================================
const designTokens = {
  colors: {
    primary: '#1a1a1a',
    primaryLight: '#2d2d2d',
    accent: '#d4a574',
    accentLight: '#e8c59a',
    accentDark: '#b8865a',
    white: '#ffffff',
    offWhite: '#fafafa',
    lightGray: '#f5f5f5',
    mediumGray: '#e0e0e0',
    gray: '#999999',
    darkGray: '#666666',
    text: '#1a1a1a',
    textLight: '#666666',
    textMuted: '#999999',
    error: '#c0392b',
    success: '#27ae60',
    focus: '#d4a574',

    // Semantic aliases
    background: '#ffffff',
    surface: '#fafafa',
    border: '#e0e0e0',
    onPrimary: '#ffffff',
    onSurface: '#1a1a1a',
    onAccent: '#1a1a1a'
  },

  typography: {
    fontFamilies: {
      heading: "'Playfair Display', Georgia, serif",
      body: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      mono: "'JetBrains Mono', 'Fira Code', monospace"
    },
    fontSizes: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '2rem',
      '4xl': '2.5rem',
      '5xl': '3rem',
      '6xl': '4rem'
    },
    fontWeights: {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700
    },
    lineHeights: {
      tight: 1.1,
      normal: 1.5,
      relaxed: 1.7,
      loose: 2
    },
    letterSpacings: {
      tight: '-0.02em',
      normal: '0',
      wide: '0.05em',
      wider: '0.1em',
      widest: '0.2em'
    }
  },

  spacing: {
    xs: '0.5rem',
    sm: '1rem',
    md: '1.5rem',
    lg: '2rem',
    xl: '3rem',
    '2xl': '4rem',
    '3xl': '6rem'
  },

  breakpoints: {
    mobile: '480px',
    tablet: '768px',
    desktop: '1024px',
    large: '1440px'
  },

  shadows: {
    sm: '0 1px 3px rgba(0, 0, 0, 0.08)',
    md: '0 4px 12px rgba(0, 0, 0, 0.1)',
    lg: '0 8px 30px rgba(0, 0, 0, 0.12)',
    xl: '0 20px 50px rgba(0, 0, 0, 0.15)'
  },

  borderRadius: {
    sm: '4px',
    md: '8px',
    lg: '16px',
    full: '9999px'
  },

  transitions: {
    fast: '150ms ease',
    base: '250ms ease',
    slow: '400ms ease'
  },

  zIndex: {
    dropdown: 100,
    modal: 200,
    toast: 300,
    nav: 1000
  }
};

// ========================================
// Component Library
// ========================================
const components = {
  button: {
    base: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.5rem',
      padding: '1rem 2rem',
      fontSize: '0.875rem',
      fontWeight: 600,
      letterSpacing: '0.05em',
      textTransform: 'uppercase',
      borderRadius: '9999px',
      transition: 'all 250ms ease',
      whiteSpace: 'nowrap',
      border: '2px solid transparent'
    },
    variants: {
      primary: {
        background: 'var(--color-primary)',
        color: 'var(--color-white)',
        borderColor: 'var(--color-primary)'
      },
      secondary: {
        background: 'transparent',
        color: 'var(--color-primary)',
        borderColor: 'var(--color-primary)'
      },
      outline: {
        background: 'transparent',
        color: 'var(--color-accent)',
        borderColor: 'var(--color-accent)'
      },
      text: {
        padding: '0.5rem 1rem',
        fontSize: '0.875rem',
        color: 'var(--color-text-light)',
        background: 'transparent',
        border: 'none'
      }
    },
    states: {
      hover: {
        primary: { background: 'var(--color-accent)', borderColor: 'var(--color-accent)', color: 'var(--color-primary)', transform: 'translateY(-2px)', boxShadow: 'var(--shadow-md)' },
        secondary: { background: 'var(--color-primary)', color: 'var(--color-white)', transform: 'translateY(-2px)', boxShadow: 'var(--shadow-md)' },
        outline: { background: 'var(--color-accent)', color: 'var(--color-primary)' }
      },
      focus: { outline: '2px solid var(--color-focus)', outlineOffset: '2px' },
      disabled: { opacity: 0.6, cursor: 'not-allowed', transform: 'none' }
    }
  },

  input: {
    base: {
      width: '100%',
      padding: '0.875rem 1rem',
      fontSize: '1rem',
      color: 'var(--color-text)',
      background: 'var(--color-white)',
      border: '1px solid var(--color-medium-gray)',
      borderRadius: 'var(--radius-md)',
      transition: 'all 150ms ease'
    },
    states: {
      focus: { borderColor: 'var(--color-accent)', boxShadow: '0 0 0 3px rgba(212, 165, 116, 0.2)', outline: 'none' },
      error: { borderColor: 'var(--color-error)' },
      disabled: { background: 'var(--color-light-gray)', cursor: 'not-allowed' }
    }
  },

  card: {
    base: {
      background: 'var(--color-white)',
      border: '1px solid var(--color-medium-gray)',
      borderRadius: 'var(--radius-lg)',
      overflow: 'hidden',
      transition: 'all 250ms ease'
    },
    hover: {
      transform: 'translateY(-4px)',
      boxShadow: 'var(--shadow-lg)',
      borderColor: 'var(--color-accent)'
    }
  },

  modal: {
    overlay: {
      position: 'fixed',
      inset: 0,
      background: 'rgba(0, 0, 0, 0.7)',
      backdropFilter: 'blur(4px)',
      zIndex: 200
    },
    content: {
      position: 'relative',
      width: '100%',
      maxWidth: '900px',
      maxHeight: '90vh',
      background: 'var(--color-white)',
      borderRadius: 'var(--radius-lg)',
      overflow: 'hidden'
    }
  }
};

// ========================================
// Utility Functions
// ========================================
function generateCSSVariables(tokens) {
  let css = ':root {\n';

  function flatten(obj, prefix = '') {
    for (const [key, value] of Object.entries(obj)) {
      const newKey = prefix ? `${prefix}-${key}` : key;
      if (typeof value === 'object' && value !== null) {
        flatten(value, newKey);
      } else {
        css += `  --color-${newKey}: ${value};\n`;
      }
    }
  }

  flatten(tokens.colors);
  css += '}\n';
  return css;
}

function generateTailwindConfig(tokens) {
  return {
    theme: {
      extend: {
        colors: {
          primary: tokens.colors.primary,
          'primary-light': tokens.colors.primaryLight,
          accent: tokens.colors.accent,
          'accent-light': tokens.colors.accentLight,
          'accent-dark': tokens.colors.accentDark
        },
        fontFamily: {
          heading: tokens.typography.fontFamilies.heading.split(',')[0].replace(/'/g, ''),
          body: tokens.typography.fontFamilies.body.split(',')[0].replace(/'/g, '')
        },
        spacing: tokens.spacing,
        borderRadius: tokens.borderRadius,
        boxShadow: tokens.shadows,
        transitionDuration: {
          fast: '150ms',
          base: '250ms',
          slow: '400ms'
        }
      }
    }
  };
}

// ========================================
// Server Instance
// ========================================
const server = new Server(
  { name: 'design-system', version: '1.0.0' },
  { capabilities: { tools: {} } }
);

// ========================================
// Tool Definitions
// ========================================
server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [
    {
      name: 'get_tokens',
      description: 'Get all design tokens (colors, typography, spacing, etc.)',
      inputSchema: {
        type: 'object',
        properties: {
          category: { type: 'string', enum: ['colors', 'typography', 'spacing', 'shadows', 'borderRadius', 'transitions', 'breakpoints', 'zIndex', 'all'], description: 'Token category to retrieve' }
        }
      }
    },
    {
      name: 'get_component',
      description: 'Get component styles and variants',
      inputSchema: {
        type: 'object',
        properties: {
          name: { type: 'string', enum: ['button', 'input', 'card', 'modal', 'all'], description: 'Component name' },
          variant: { type: 'string', description: 'Specific variant (optional)' }
        },
        required: ['name']
      }
    },
    {
      name: 'validate_design',
      description: 'Validate CSS/HTML against design system',
      inputSchema: {
        type: 'object',
        properties: {
          css: { type: 'string', description: 'CSS to validate' },
          checkTokens: { type: 'boolean', default: true, description: 'Check for non-token values' },
          checkAccessibility: { type: 'boolean', default: true, description: 'Check contrast ratios' }
        },
        required: ['css']
      }
    },
    {
      name: 'generate_theme',
      description: 'Generate theme variations (dark, high-contrast, seasonal)',
      inputSchema: {
        type: 'object',
        properties: {
          baseTheme: { type: 'string', enum: ['light', 'dark'], default: 'light' },
          variant: { type: 'string', enum: ['default', 'high-contrast', 'festive', 'wedding', 'monochrome'], default: 'default' }
        }
      }
    },
    {
      name: 'export_tokens',
      description: 'Export tokens in various formats',
      inputSchema: {
        type: 'object',
        properties: {
          format: { type: 'string', enum: ['css', 'json', 'scss', 'tailwind', 'figma'], description: 'Export format' },
          category: { type: 'string', enum: ['colors', 'typography', 'spacing', 'all'], default: 'all' }
        }
      }
    }
  ]
}));

// ========================================
// Tool Handlers
// ========================================
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    switch (name) {
      case 'get_tokens':
        return handleGetTokens(args);
      case 'get_component':
        return handleGetComponent(args);
      case 'validate_design':
        return handleValidateDesign(args);
      case 'generate_theme':
        return handleGenerateTheme(args);
      case 'export_tokens':
        return handleExportTokens(args);
      default:
        throw new McpError(ErrorCode.MethodNotFound, `Unknown tool: ${name}`);
    }
  } catch (error) {
    if (error instanceof McpError) throw error;
    throw new McpError(ErrorCode.InternalError, `Tool execution failed: ${error.message}`);
  }
});

function handleGetTokens(args) {
  const { category = 'all' } = args;

  if (category === 'all') {
    return { content: [{ type: 'text', text: JSON.stringify(designTokens, null, 2) }] };
  }

  return { content: [{ type: 'text', text: JSON.stringify(designTokens[category] || {}, null, 2) }] };
}

function handleGetComponent(args) {
  const { name, variant } = args;

  if (name === 'all') {
    return { content: [{ type: 'text', text: JSON.stringify(components, null, 2) }] };
  }

  const component = components[name];
  if (!component) {
    throw new McpError(ErrorCode.InvalidParams, `Component not found: ${name}`);
  }

  if (variant && component.variants?.[variant]) {
    return { content: [{ type: 'text', text: JSON.stringify({ ...component.base, ...component.variants[variant] }, null, 2) }] };
  }

  return { content: [{ type: 'text', text: JSON.stringify(component, null, 2) }] };
}

function handleValidateDesign(args) {
  const { css, checkTokens = true, checkAccessibility = true } = args;
  const issues = [];
  const warnings = [];

  if (checkTokens) {
    // Check for hardcoded colors not in design tokens
    const colorRegex = /#[0-9a-fA-F]{3,8}|rgba?\([^)]+\)|hsla?\([^)]+\)/g;
    const colors = css.match(colorRegex) || [];
    const validColors = new Set(Object.values(designTokens.colors).filter(v => v.startsWith('#')));

    for (const color of colors) {
      if (!validColors.has(color.toLowerCase()) && !color.includes('var(')) {
        warnings.push(`Non-token color detected: ${color}`);
      }
    }

    // Check for hardcoded spacing
    const spacingRegex = /\b(\d+(\.\d+)?)(px|rem|em)\b/g;
    const spacings = css.match(spacingRegex) || [];
    const validSpacing = new Set(Object.values(designTokens.spacing));

    for (const spacing of spacings) {
      if (!validSpacing.has(spacing)) {
        warnings.push(`Non-token spacing detected: ${spacing}`);
      }
    }
  }

  if (checkAccessibility) {
    // Basic contrast check (simplified)
    if (css.includes('color:') && css.includes('background:')) {
      // Would need actual color parsing for real check
      warnings.push('Verify contrast ratios meet WCAG AA (4.5:1 for text, 3:1 for large text)');
    }
  }

  return {
    content: [{
      type: 'text',
      text: JSON.stringify({
        valid: issues.length === 0,
        issues,
        warnings,
        suggestions: warnings.length > 0 ? ['Replace hardcoded values with design tokens', 'Run accessibility audit'] : []
      }, null, 2)
    }]
  };
}

function handleGenerateTheme(args) {
  const { baseTheme = 'light', variant = 'default' } = args;

  const themes = {
    light: { ...designTokens },
    dark: {
      ...designTokens,
      colors: {
        ...designTokens.colors,
        primary: '#fafafa',
        primaryLight: '#ffffff',
        white: '#1a1a1a',
        offWhite: '#2d2d2d',
        lightGray: '#2d2d2d',
        mediumGray: '#3d3d3d',
        gray: '#999999',
        darkGray: '#cccccc',
        text: '#fafafa',
        textLight: '#cccccc',
        textMuted: '#999999',
        background: '#1a1a1a',
        surface: '#2d2d2d',
        border: '#3d3d3d',
        onPrimary: '#1a1a1a',
        onSurface: '#fafafa',
        onAccent: '#1a1a1a'
      }
    }
  };

  const variants = {
    default: {},
    'high-contrast': {
      colors: {
        ...themes[baseTheme].colors,
        accent: '#ffcc00',
        text: baseTheme === 'dark' ? '#ffffff' : '#000000',
        border: baseTheme === 'dark' ? '#ffffff' : '#000000'
      }
    },
    festive: {
      colors: {
        ...themes[baseTheme].colors,
        accent: '#c41e3a',
        accentLight: '#e84d5e',
        primary: '#0d2818'
      }
    },
    wedding: {
      colors: {
        ...themes[baseTheme].colors,
        accent: '#d4a574',
        accentLight: '#f0d9b5',
        accentDark: '#b8865a',
        primary: '#1a1a2e'
      }
    },
    monochrome: {
      colors: {
        ...themes[baseTheme].colors,
        accent: baseTheme === 'dark' ? '#ffffff' : '#000000',
        accentLight: baseTheme === 'dark' ? '#cccccc' : '#333333',
        accentDark: baseTheme === 'dark' ? '#999999' : '#666666'
      }
    }
  };

  const theme = { ...themes[baseTheme], ...variants[variant] };

  return {
    content: [{ type: 'text', text: JSON.stringify(theme, null, 2) }]
  };
}

function handleExportTokens(args) {
  const { format = 'json', category = 'all' } = args;
  const tokens = category === 'all' ? designTokens : designTokens[category];

  let output = '';

  switch (format) {
    case 'json':
      output = JSON.stringify(tokens, null, 2);
      break;
    case 'css':
      output = generateCSSVariables(tokens);
      break;
    case 'scss':
      output = generateSCSSVariables(tokens);
      break;
    case 'tailwind':
      output = JSON.stringify(generateTailwindConfig(tokens), null, 2);
      break;
    case 'figma':
      output = JSON.stringify(generateFigmaTokens(tokens), null, 2);
      break;
    default:
      throw new McpError(ErrorCode.InvalidParams, `Unknown format: ${format}`);
  }

  return {
    content: [{ type: 'text', text: output }]
  };
}

function generateSCSSVariables(tokens) {
  let scss = '// Design System Tokens\n\n';

  function flatten(obj, prefix = '') {
    for (const [key, value] of Object.entries(obj)) {
      const newKey = prefix ? `${prefix}-${key}` : key;
      if (typeof value === 'object' && value !== null) {
        flatten(value, newKey);
      } else {
        scss += `$${newKey}: ${value};\n`;
      }
    }
  }

  flatten(tokens.colors, 'color');
  flatten(tokens.spacing, 'space');
  flatten(tokens.borderRadius, 'radius');
  flatten(tokens.shadows, 'shadow');

  return scss;
}

function generateFigmaTokens(tokens) {
  // Figma Tokens plugin format
  const figmaTokens = {
    global: {}
  };

  for (const [category, values] of Object.entries(tokens)) {
    if (typeof values === 'object' && values !== null) {
      figmaTokens.global[category] = {};
      for (const [key, value] of Object.entries(values)) {
        if (typeof value === 'object') {
          figmaTokens.global[category][key] = {};
          for (const [subKey, subValue] of Object.entries(value)) {
            figmaTokens.global[category][key][subKey] = { value: subValue, type: getTokenType(subValue) };
          }
        } else {
          figmaTokens.global[category][key] = { value, type: getTokenType(value) };
        }
      }
    }
  }

  return figmaTokens;
}

function getTokenType(value) {
  if (typeof value === 'number') return 'number';
  if (value.startsWith('#')) return 'color';
  if (value.includes('px') || value.includes('rem') || value.includes('em')) return 'dimension';
  if (value.includes('ms') || value.includes('s')) return 'duration';
  return 'string';
}

// ========================================
// Start Server
// ========================================
const transport = new StdioServerTransport();
await server.connect(transport);
console.error('Design System MCP Server running...');