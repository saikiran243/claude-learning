#!/usr/bin/env node
/**
 * Tailoring Catalog MCP Server
 * Provides domain-specific tools for Jagger bespoke tailoring business
 */

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  ListToolsRequestSchema,
  CallToolRequestSchema,
  ErrorCode,
  McpError
} from '@modelcontextprotocol/sdk/types.js';
import Database from 'better-sqlite3';
import { z } from 'zod';
import fs from 'fs';
import path from 'path';

// ========================================
// Configuration & Setup
// ========================================
const CATALOG_PATH = process.env.CATALOG_PATH || './data/styles.json';
const ORDERS_DB_PATH = process.env.ORDERS_DB || './data/orders.db';
const DATA_DIR = path.dirname(CATALOG_PATH);

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Initialize SQLite database for orders
const db = new Database(ORDERS_DB_PATH);
db.exec(`
  CREATE TABLE IF NOT EXISTS orders (
    id TEXT PRIMARY KEY,
    customer_name TEXT NOT NULL,
    customer_phone TEXT NOT NULL,
    customer_email TEXT,
    style_id TEXT NOT NULL,
    customizations TEXT,
    measurements TEXT,
    status TEXT DEFAULT 'pending',
    total_price REAL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS customers (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    phone TEXT UNIQUE NOT NULL,
    email TEXT,
    measurements TEXT,
    preferences TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS fabrics (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    composition TEXT,
    weight_gsm INTEGER,
    color TEXT,
    pattern TEXT,
    price_per_meter REAL,
    stock_meters REAL,
    supplier TEXT,
    lead_time_days INTEGER
  );

  CREATE INDEX IF NOT EXISTS idx_orders_customer ON orders(customer_phone);
  CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
  CREATE INDEX IF NOT EXISTS idx_fabrics_category ON fabrics(category);
`);

// Load styles catalog
let stylesCatalog = [];
try {
  const catalogData = fs.readFileSync(CATALOG_PATH, 'utf-8');
  stylesCatalog = JSON.parse(catalogData);
} catch (e) {
  // Initialize with default styles from script.js
  stylesCatalog = getDefaultStyles();
  fs.writeFileSync(CATALOG_PATH, JSON.stringify(stylesCatalog, null, 2));
}

// ========================================
// Zod Schemas for Validation
// ========================================
const StyleSearchSchema = z.object({
  category: z.enum(['suits', 'shirts', 'traditional', 'casual', 'all']).optional(),
  fabric: z.string().optional(),
  occasion: z.string().optional(),
  priceRange: z.object({ min: z.number(), max: z.number() }).optional(),
  features: z.array(z.string()).optional()
});

const StyleDetailsSchema = z.object({
  styleId: z.string()
});

const CreateOrderSchema = z.object({
  customerName: z.string().min(2),
  customerPhone: z.string().regex(/^\+?[1-9]\d{1,14}$/),
  customerEmail: z.string().email().optional(),
  styleId: z.string(),
  customizations: z.record(z.string()).optional(),
  measurements: z.record(z.string()).optional(),
  notes: z.string().optional()
});

const FabricSearchSchema = z.object({
  category: z.string().optional(),
  color: z.string().optional(),
  maxPrice: z.number().optional(),
  minStock: z.number().optional()
});

const CustomerHistorySchema = z.object({
  phone: z.string().regex(/^\+?[1-9]\d{1,14}$/)
});

// ========================================
// Server Instance
// ========================================
const server = new Server(
  { name: 'tailoring-catalog', version: '1.0.0' },
  { capabilities: { tools: {} } }
);

// ========================================
// Tool Definitions
// ========================================
server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [
    {
      name: 'search_styles',
      description: 'Search tailoring styles by category, fabric, occasion, or features',
      inputSchema: {
        type: 'object',
        properties: {
          category: { type: 'string', enum: ['suits', 'shirts', 'traditional', 'casual', 'all'], description: 'Style category' },
          fabric: { type: 'string', description: 'Fabric type (e.g., wool, cotton, silk, linen)' },
          occasion: { type: 'string', description: 'Occasion (e.g., wedding, business, casual, festival)' },
          priceRange: { type: 'object', properties: { min: { type: 'number' }, max: { type: 'number' } }, description: 'Price range in INR' },
          features: { type: 'array', items: { type: 'string' }, description: 'Required features (e.g., hand-stitched, lined, custom-fit)' }
        }
      }
    },
    {
      name: 'get_style_details',
      description: 'Get complete details for a specific style including all customization options',
      inputSchema: {
        type: 'object',
        properties: {
          styleId: { type: 'string', description: 'Unique style identifier' }
        },
        required: ['styleId']
      }
    },
    {
      name: 'check_fabric_availability',
      description: 'Check fabric stock levels and lead times',
      inputSchema: {
        type: 'object',
        properties: {
          fabricIds: { type: 'array', items: { type: 'string' }, description: 'Array of fabric IDs to check' },
          requiredMeters: { type: 'number', description: 'Meters needed for the garment' }
        },
        required: ['fabricIds', 'requiredMeters']
      }
    },
    {
      name: 'calculate_price',
      description: 'Calculate price for a style with selected customizations',
      inputSchema: {
        type: 'object',
        properties: {
          styleId: { type: 'string' },
          customizations: { type: 'object', description: 'Selected customization options' },
          fabricId: { type: 'string', description: 'Selected fabric ID' },
          quantity: { type: 'number', default: 1 }
        },
        required: ['styleId', 'customizations', 'fabricId']
      }
    },
    {
      name: 'create_order',
      description: 'Create a new tailoring order',
      inputSchema: {
        type: 'object',
        properties: {
          customerName: { type: 'string', minLength: 2 },
          customerPhone: { type: 'string', pattern: '^\\+?[1-9]\\d{1,14}$' },
          customerEmail: { type: 'string', format: 'email' },
          styleId: { type: 'string' },
          customizations: { type: 'object' },
          measurements: { type: 'object' },
          notes: { type: 'string' }
        },
        required: ['customerName', 'customerPhone', 'styleId', 'customizations']
      }
    },
    {
      name: 'get_order_status',
      description: 'Get status and details of an existing order',
      inputSchema: {
        type: 'object',
        properties: {
          orderId: { type: 'string' }
        },
        required: ['orderId']
      }
    },
    {
      name: 'get_customer_history',
      description: 'Get order history and measurements for a customer',
      inputSchema: {
        type: 'object',
        properties: {
          phone: { type: 'string', pattern: '^\\+?[1-9]\\d{1,14}$' }
        },
        required: ['phone']
      }
    },
    {
      name: 'search_fabrics',
      description: 'Search available fabrics by category, color, price, or stock',
      inputSchema: {
        type: 'object',
        properties: {
          category: { type: 'string' },
          color: { type: 'string' },
          maxPrice: { type: 'number' },
          minStock: { type: 'number' }
        }
      }
    },
    {
      name: 'get_recommendations',
      description: 'Get style recommendations based on occasion, body type, and preferences',
      inputSchema: {
        type: 'object',
        properties: {
          occasion: { type: 'string', enum: ['wedding', 'business', 'formal', 'casual', 'festival', 'interview'] },
          bodyType: { type: 'string', enum: ['slim', 'athletic', 'regular', 'broad', 'tall', 'short'] },
          ageRange: { type: 'string', enum: ['20s', '30s', '40s', '50s', '60+'] },
          preferredColors: { type: 'array', items: { type: 'string' } },
          budget: { type: 'object', properties: { min: { type: 'number' }, max: { type: 'number' } } }
        },
        required: ['occasion']
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
      case 'search_styles':
        return await handleSearchStyles(args);
      case 'get_style_details':
        return await handleGetStyleDetails(args);
      case 'check_fabric_availability':
        return await handleCheckFabricAvailability(args);
      case 'calculate_price':
        return await handleCalculatePrice(args);
      case 'create_order':
        return await handleCreateOrder(args);
      case 'get_order_status':
        return await handleGetOrderStatus(args);
      case 'get_customer_history':
        return await handleGetCustomerHistory(args);
      case 'search_fabrics':
        return await handleSearchFabrics(args);
      case 'get_recommendations':
        return await handleGetRecommendations(args);
      default:
        throw new McpError(ErrorCode.MethodNotFound, `Unknown tool: ${name}`);
    }
  } catch (error) {
    if (error instanceof McpError) throw error;
    throw new McpError(ErrorCode.InternalError, `Tool execution failed: ${error.message}`);
  }
});

// ========================================
// Handler Implementations
// ========================================
async function handleSearchStyles(args) {
  const parsed = StyleSearchSchema.parse(args);
  let results = [...stylesCatalog];

  if (parsed.category && parsed.category !== 'all') {
    results = results.filter(s => s.category === parsed.category);
  }

  if (parsed.fabric) {
    results = results.filter(s =>
      s.features?.some(f => f.toLowerCase().includes(parsed.fabric.toLowerCase())) ||
      s.customizations?.fabric?.some(f => f.toLowerCase().includes(parsed.fabric.toLowerCase()))
    );
  }

  if (parsed.occasion) {
    const occasionKeywords = parsed.occasion.toLowerCase().split(' ');
    results = results.filter(s =>
      occasionKeywords.some(k =>
        s.description.toLowerCase().includes(k) ||
        s.name.toLowerCase().includes(k)
      )
    );
  }

  if (parsed.features?.length) {
    results = results.filter(s =>
      parsed.features.every(f =>
        s.features?.some(sf => sf.toLowerCase().includes(f.toLowerCase()))
      )
    );
  }

  // Add price estimates
  results = results.map(s => ({
    ...s,
    estimatedPrice: estimateBasePrice(s.category)
  }));

  return {
    content: [{ type: 'text', text: JSON.stringify({ results, count: results.length }, null, 2) }]
  };
}

async function handleGetStyleDetails(args) {
  const parsed = StyleDetailsSchema.parse(args);
  const style = stylesCatalog.find(s => s.id === parsed.styleId);

  if (!style) {
    throw new McpError(ErrorCode.InvalidParams, `Style not found: ${parsed.styleId}`);
  }

  // Enrich with fabric details
  const enrichedStyle = {
    ...style,
    estimatedPrice: estimateBasePrice(style.category),
    customizationSummary: summarizeCustomizations(style.customizations),
    fabricRecommendations: getFabricRecommendations(style.category)
  };

  return {
    content: [{ type: 'text', text: JSON.stringify(enrichedStyle, null, 2) }]
  };
}

async function handleCheckFabricAvailability(args) {
  const { fabricIds, requiredMeters } = args;
  const results = [];

  for (const fabricId of fabricIds) {
    const fabric = db.prepare('SELECT * FROM fabrics WHERE id = ?').get(fabricId);

    if (!fabric) {
      results.push({ fabricId, available: false, reason: 'Fabric not found in inventory' });
      continue;
    }

    const available = fabric.stock_meters >= requiredMeters;
    results.push({
      fabricId,
      fabricName: fabric.name,
      available,
      stockMeters: fabric.stock_meters,
      requiredMeters,
      shortfall: available ? 0 : requiredMeters - fabric.stock_meters,
      leadTimeDays: fabric.lead_time_days || 7,
      pricePerMeter: fabric.price_per_meter,
      estimatedFabricCost: fabric.price_per_meter * requiredMeters
    });
  }

  return {
    content: [{ type: 'text', text: JSON.stringify({ results }, null, 2) }]
  };
}

async function handleCalculatePrice(args) {
  const { styleId, customizations, fabricId, quantity = 1 } = args;

  const style = stylesCatalog.find(s => s.id === styleId);
  if (!style) {
    throw new McpError(ErrorCode.InvalidParams, `Style not found: ${styleId}`);
  }

  const fabric = db.prepare('SELECT * FROM fabrics WHERE id = ?').get(fabricId);
  if (!fabric) {
    throw new McpError(ErrorCode.InvalidParams, `Fabric not found: ${fabricId}`);
  }

  // Base price by category
  const basePrice = estimateBasePrice(style.category);

  // Fabric cost (assuming 3.5 meters for suit, 2.5 for shirt, etc.)
  const fabricMeters = getFabricMeters(style.category);
  const fabricCost = fabric.price_per_meter * fabricMeters;

  // Customization surcharges
  const customizationCost = calculateCustomizationCost(style, customizations);

  // Labor (base + complexity)
  const laborCost = calculateLaborCost(style, customizations);

  const subtotal = basePrice + fabricCost + customizationCost + laborCost;
  const gst = subtotal * 0.18; // 18% GST
  const total = (subtotal + gst) * quantity;

  return {
    content: [{ type: 'text', text: JSON.stringify({
      breakdown: {
        basePrice,
        fabricCost,
        customizationCost,
        laborCost,
        subtotal,
        gst,
        quantity,
        total: Math.round(total)
      },
      currency: 'INR',
      notes: 'Prices are estimates. Final quote provided after consultation.'
    }, null, 2) }]
  };
}

async function handleCreateOrder(args) {
  const parsed = CreateOrderSchema.parse(args);

  const orderId = `JGR-${Date.now()}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`;
  const style = stylesCatalog.find(s => s.id === parsed.styleId);

  if (!style) {
    throw new McpError(ErrorCode.InvalidParams, `Style not found: ${parsed.styleId}`);
  }

  // Calculate price
  const priceResult = await handleCalculatePrice({
    styleId: parsed.styleId,
    customizations: parsed.customizations,
    fabricId: parsed.customizations.fabric,
    quantity: 1
  });
  const { total } = JSON.parse(priceResult.content[0].text).breakdown;

  // Insert order
  db.prepare(`
    INSERT INTO orders (id, customer_name, customer_phone, customer_email, style_id, customizations, measurements, total_price, status)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'confirmed')
  `).run(
    orderId,
    parsed.customerName,
    parsed.customerPhone,
    parsed.customerEmail || null,
    parsed.styleId,
    JSON.stringify(parsed.customizations),
    JSON.stringify(parsed.measurements || {}),
    total
  );

  // Upsert customer
  db.prepare(`
    INSERT INTO customers (id, name, phone, email, measurements, preferences)
    VALUES (?, ?, ?, ?, ?, ?)
    ON CONFLICT(phone) DO UPDATE SET
      name = excluded.name,
      email = excluded.email,
      measurements = excluded.measurements,
      preferences = excluded.preferences
  `).run(
    `CUST-${parsed.customerPhone.replace(/\D/g, '')}`,
    parsed.customerName,
    parsed.customerPhone,
    parsed.customerEmail || null,
    JSON.stringify(parsed.measurements || {}),
    JSON.stringify({ preferredStyles: [parsed.styleId], notes: parsed.notes })
  );

  return {
    content: [{ type: 'text', text: JSON.stringify({
      orderId,
      status: 'confirmed',
      totalPrice: total,
      estimatedDelivery: '2-3 weeks',
      nextSteps: [
        'Master tailor will contact within 24 hours for measurement appointment',
        'Fabric will be reserved upon confirmation',
        'First fitting scheduled for week 2'
      ]
    }, null, 2) }]
  };
}

async function handleGetOrderStatus(args) {
  const { orderId } = args;
  const order = db.prepare('SELECT * FROM orders WHERE id = ?').get(orderId);

  if (!order) {
    throw new McpError(ErrorCode.InvalidParams, `Order not found: ${orderId}`);
  }

  return {
    content: [{ type: 'text', text: JSON.stringify({
      ...order,
      customizations: JSON.parse(order.customizations || '{}'),
      measurements: JSON.parse(order.measurements || '{}')
    }, null, 2) }]
  };
}

async function handleGetCustomerHistory(args) {
  const parsed = CustomerHistorySchema.parse(args);

  const customer = db.prepare('SELECT * FROM customers WHERE phone = ?').get(parsed.phone);
  const orders = db.prepare('SELECT * FROM orders WHERE customer_phone = ? ORDER BY created_at DESC').all(parsed.phone);

  return {
    content: [{ type: 'text', text: JSON.stringify({
      customer: customer ? { ...customer, measurements: JSON.parse(customer.measurements || '{}'), preferences: JSON.parse(customer.preferences || '{}') } : null,
      orders: orders.map(o => ({ ...o, customizations: JSON.parse(o.customizations || '{}') })),
      orderCount: orders.length,
      totalSpent: orders.reduce((sum, o) => sum + (o.total_price || 0), 0)
    }, null, 2) }]
  };
}

async function handleSearchFabrics(args) {
  const parsed = FabricSearchSchema.parse(args);

  let query = 'SELECT * FROM fabrics WHERE 1=1';
  const params = [];

  if (parsed.category) {
    query += ' AND category = ?';
    params.push(parsed.category);
  }
  if (parsed.color) {
    query += ' AND color LIKE ?';
    params.push(`%${parsed.color}%`);
  }
  if (parsed.maxPrice) {
    query += ' AND price_per_meter <= ?';
    params.push(parsed.maxPrice);
  }
  if (parsed.minStock) {
    query += ' AND stock_meters >= ?';
    params.push(parsed.minStock);
  }

  query += ' ORDER BY price_per_meter ASC LIMIT 50';

  const fabrics = db.prepare(query).all(...params);

  return {
    content: [{ type: 'text', text: JSON.stringify({ fabrics, count: fabrics.length }, null, 2) }]
  };
}

async function handleGetRecommendations(args) {
  const { occasion, bodyType, ageRange, preferredColors, budget } = args;

  // Score each style based on criteria
  const scoredStyles = stylesCatalog.map(style => {
    let score = 0;
    const reasons = [];

    // Occasion matching
    const occasionMap = {
      wedding: ['suits', 'traditional'],
      business: ['suits', 'shirts'],
      formal: ['suits'],
      casual: ['casual', 'shirts'],
      festival: ['traditional'],
      interview: ['suits', 'shirts']
    };

    if (occasionMap[occasion]?.includes(style.category)) {
      score += 30;
      reasons.push(`Perfect for ${occasion}`);
    }

    // Body type considerations
    if (bodyType === 'slim' && style.features?.some(f => f.includes('Slim') || f.includes('Contemporary'))) {
      score += 15;
      reasons.push('Slim fit available');
    }
    if (bodyType === 'broad' && style.customizations?.fit?.some(f => f.includes('Regular') || f.includes('Classic'))) {
      score += 15;
      reasons.push('Classic fit available');
    }

    // Age range preferences
    if (ageRange) {
      const agePreferences = {
        '20s': ['casual', 'slim', 'modern'],
        '30s': ['suits', 'contemporary', 'versatile'],
        '40s': ['suits', 'classic', 'traditional'],
        '50s': ['traditional', 'classic', 'comfort'],
        '60+': ['traditional', 'comfort', 'easy-care']
      };
      if (agePreferences[ageRange]?.some(p => style.description.toLowerCase().includes(p) || style.features?.some(f => f.toLowerCase().includes(p)))) {
        score += 10;
        reasons.push(`Popular for ${ageRange}`);
      }
    }

    // Budget filtering
    const estPrice = estimateBasePrice(style.category);
    if (budget && (estPrice < budget.min || estPrice > budget.max)) {
      score -= 50;
    }

    return { style, score, reasons, estimatedPrice: estPrice };
  });

  // Sort by score and return top 5
  const recommendations = scoredStyles
    .filter(s => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);

  return {
    content: [{ type: 'text', text: JSON.stringify({ recommendations }, null, 2) }]
  };
}

// ========================================
// Helper Functions
// ========================================
function estimateBasePrice(category) {
  const basePrices = {
    suits: 35000,
    shirts: 4500,
    traditional: 25000,
    casual: 15000
  };
  return basePrices[category] || 10000;
}

function getFabricMeters(category) {
  const meters = {
    suits: 3.5,
    shirts: 2.5,
    traditional: 5,
    casual: 3
  };
  return meters[category] || 3;
}

function calculateCustomizationCost(style, customizations) {
  let cost = 0;
  const surcharges = {
    'Full Canvas': 5000,
    'Hand-stitched Lapels': 3000,
    'Working Buttonholes': 1500,
    'Monogram': 800,
    'Contrast Stitching': 1200,
    'Special Lining': 2000
  };

  for (const [key, value] of Object.entries(customizations || {})) {
    if (surcharges[value]) cost += surcharges[value];
    if (surcharges[key]) cost += surcharges[key];
  }

  return cost;
}

function calculateLaborCost(style, customizations) {
  let baseLabor = 8000; // Base tailoring labor

  if (style.category === 'traditional') baseLabor += 5000;
  if (style.category === 'suits') baseLabor += 3000;

  // Complexity multipliers
  const complexity = Object.keys(customizations || {}).length;
  return baseLabor + (complexity * 500);
}

function summarizeCustomizations(customizations) {
  if (!customizations) return {};
  const summary = {};
  for (const [category, options] of Object.entries(customizations)) {
    summary[category] = Array.isArray(options) ? options.length : 1;
  }
  return summary;
}

function getFabricRecommendations(category) {
  const recommendations = {
    suits: ['Super 130\'s Wool', 'Super 150\'s Wool', 'Cashmere Blend', 'Fresco'],
    shirts: ['Egyptian Cotton Poplin', 'Sea Island Cotton', 'Linen Cotton', 'Twill'],
    traditional: ['Banarasi Silk', 'Raw Silk', 'Velvet', 'Brocade'],
    casual: ['Linen', 'Cotton Linen', 'Hopsack', 'Tweed']
  };
  return recommendations[category] || [];
}

function getDefaultStyles() {
  // Return the styles from script.js - abbreviated for brevity
  return [
    {
      id: 'suit-navy-two-button',
      category: 'suits',
      name: 'Navy Two-Button Suit',
      description: 'Cornerstone of every gentleman\'s wardrobe. Italian Super 130\'s wool.',
      features: ['Super 130\'s Italian Wool', 'Natural Shoulder', 'Notch Lapel', 'Functioning Buttonholes', 'Half Canvas Construction'],
      customizations: {
        fabric: ['Navy Super 130\'s', 'Navy Super 150\'s', 'Midnight Blue Flannel', 'Navy Hopsack', 'Navy Fresco'],
        lapel: ['Notch (Classic)', 'Peak (Formal)', 'Notch with Peak Accent'],
        buttons: ['2-Button (Standard)', '3-Button (Traditional)', '1-Button (Modern)'],
        vents: ['Double Vent (Classic)', 'Single Vent (Traditional)', 'No Vent (Clean)'],
        lining: ['Bemberg Navy', 'Bemberg Burgundy', 'Custom Monogram', 'Silk Paisley'],
        pockets: ['Flap Pockets', 'Jetted Pockets', 'Patch Pockets (Casual)']
      }
    }
    // ... other styles would be here
  ];
}

// ========================================
// Start Server
// ========================================
const transport = new StdioServerTransport();
await server.connect(transport);
console.error('Tailoring Catalog MCP Server running...');