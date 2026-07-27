#!/usr/bin/env node
/**
 * Analytics MCP Server
 * Provides business metrics, conversion tracking, and reporting for Jagger
 */

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  ListToolsRequestSchema,
  CallToolRequestSchema,
  ErrorCode,
  McpError
} from '@modelcontextprotocol/sdk/types.js';
import fs from 'fs';
import path from 'path';

// ========================================
// Configuration & Setup
// ========================================
const DATA_DIR = process.env.ANALYTICS_DB || './data';
const ANALYTICS_FILE = path.join(DATA_DIR, 'analytics.json');

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Initialize or load analytics data
let analyticsData = {
  events: [],
  sessions: [],
  funnels: [
    { name: 'Style Selection to Order', steps: ['view_styles', 'view_style_detail', 'select_style', 'customize', 'start_checkout', 'complete_order'] },
    { name: 'Contact Form Funnel', steps: ['view_contact', 'start_form', 'submit_form', 'confirmation'] },
    { name: 'Style Gallery Funnel', steps: ['view_gallery', 'filter_category', 'view_detail', 'add_to_selection'] }
  ],
  revenue: []
};

try {
  if (fs.existsSync(ANALYTICS_FILE)) {
    analyticsData = JSON.parse(fs.readFileSync(ANALYTICS_FILE, 'utf-8'));
  } else {
    saveAnalytics();
  }
} catch (e) { /* use defaults */ }

function saveAnalytics() {
  fs.writeFileSync(ANALYTICS_FILE, JSON.stringify(analyticsData, null, 2));
}

// ========================================
// Server Instance
// ========================================
const server = new Server(
  { name: 'analytics', version: '1.0.0' },
  { capabilities: { tools: {} } }
);

// ========================================
// Tool Definitions
// ========================================
server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [
    {
      name: 'track_event',
      description: 'Track a custom analytics event',
      inputSchema: {
        type: 'object',
        properties: {
          eventName: { type: 'string' },
          category: { type: 'string' },
          action: { type: 'string' },
          label: { type: 'string' },
          value: { type: 'number' },
          userId: { type: 'string' },
          sessionId: { type: 'string' },
          properties: { type: 'object' }
        },
        required: ['eventName']
      }
    },
    {
      name: 'get_dashboard_summary',
      description: 'Get executive dashboard summary',
      inputSchema: {
        type: 'object',
        properties: {
          period: { type: 'string', enum: ['today', 'week', 'month', 'quarter', 'year'], default: 'week' }
        }
      }
    },
    {
      name: 'get_revenue_report',
      description: 'Get revenue and order analytics',
      inputSchema: {
        type: 'object',
        properties: {
          startDate: { type: 'string' },
          endDate: { type: 'string' },
          groupBy: { type: 'string', enum: ['day', 'week', 'month'] }
        }
      }
    },
    {
      name: 'record_order',
      description: 'Record a completed order for revenue tracking',
      inputSchema: {
        type: 'object',
        properties: {
          orderId: { type: 'string' },
          customerId: { type: 'string' },
          amount: { type: 'number' },
          currency: { type: 'string', default: 'INR' },
          items: { type: 'array' },
          status: { type: 'string', default: 'completed' }
        },
        required: ['orderId', 'customerId', 'amount']
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
      case 'track_event':
        return await handleTrackEvent(args);
      case 'get_dashboard_summary':
        return await handleGetDashboardSummary(args);
      case 'get_revenue_report':
        return await handleGetRevenueReport(args);
      case 'record_order':
        return await handleRecordOrder(args);
      default:
        throw new McpError(ErrorCode.MethodNotFound, `Unknown tool: ${name}`);
    }
  } catch (error) {
    throw new McpError(ErrorCode.InternalError, `Tool execution failed: ${error.message}`);
  }
});

// ========================================
// Handler Implementations
// ========================================
async function handleTrackEvent(args) {
  const event = {
    id: Date.now(),
    ...args,
    timestamp: new Date().toISOString()
  };

  analyticsData.events.push(event);
  saveAnalytics();

  return { content: [{ type: 'text', text: JSON.stringify({ success: true, eventId: event.id }) }] };
}

async function handleGetDashboardSummary(args) {
  const { period = 'week' } = args;

  const now = new Date();
  let cutoff = new Date();

  switch (period) {
    case 'today': cutoff.setHours(0, 0, 0, 0); break;
    case 'week': cutoff.setDate(now.getDate() - 7); break;
    case 'month': cutoff.setMonth(now.getMonth() - 1); break;
    case 'quarter': cutoff.setMonth(now.getMonth() - 3); break;
    case 'year': cutoff.setFullYear(now.getFullYear() - 1); break;
  }

  const recentEvents = analyticsData.events.filter(e => new Date(e.timestamp) >= cutoff);

  const metrics = {
    period,
    sessions: analyticsData.sessions.length,
    events: recentEvents.length,
    styleViews: recentEvents.filter(e => e.eventName === 'style_viewed').length,
    orders: analyticsData.revenue.length,
    revenue: analyticsData.revenue.reduce((sum, o) => sum + (o.amount || 0), 0)
  };

  return { content: [{ type: 'text', text: JSON.stringify({ metrics }, null, 2) }] };
}

async function handleGetRevenueReport(args) {
  const { groupBy = 'month' } = args;

  const summary = {
    totalOrders: analyticsData.revenue.length,
    totalRevenue: analyticsData.revenue.reduce((sum, o) => sum + (o.amount || 0), 0),
    avgOrderValue: analyticsData.revenue.length > 0
      ? analyticsData.revenue.reduce((sum, o) => sum + (o.amount || 0), 0) / analyticsData.revenue.length
      : 0
  };

  return { content: [{ type: 'text', text: JSON.stringify({ summary, byPeriod: {} }, null, 2) }] };
}

async function handleRecordOrder(args) {
  analyticsData.revenue.push({
    ...args,
    created_at: new Date().toISOString()
  });
  saveAnalytics();

  return { content: [{ type: 'text', text: JSON.stringify({ success: true, orderId: args.orderId }) }] };
}

// ========================================
// Start Server
// ========================================
const transport = new StdioServerTransport();
await server.connect(transport);
console.error('Analytics MCP Server running...');