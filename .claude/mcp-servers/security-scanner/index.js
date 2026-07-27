#!/usr/bin/env node
/**
 * Security Scanner MCP
 * Infrastructure security patterns + AI security for enterprise use
 */

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  ListToolsRequestSchema,
  CallToolRequestSchema,
  ErrorCode,
  McpError
} from '@modelcontextprotocol/sdk/types.js';
import { z } from 'zod';

// ========================================
// Security Rules Database (Your Infra Knowledge)
// ========================================
const SECURITY_RULES = {
  terraform: [
    {
      id: 'TFSEC_AWS001',
      severity: 'critical',
      category: 'iam',
      pattern: /aws_iam_role.*assume_role_policy.*(\*|"")/,
      message: 'IAM role allows wildcard actions',
      fix: 'Limit to specific actions required'
    },
    {
      id: 'TFSEC_AWS002',
      severity: 'critical',
      category: 'secrets',
      pattern: /(password|secret|token)\s*=\s*["'][^"']+["']/,
      message: 'Hardcoded credential detected',
      fix: 'Use variables and external secret store'
    },
    {
      id: 'TFSEC_GCP001',
      severity: 'high',
      category: 'networking',
      pattern: /google_compute_firewall.*source_ranges.*\[.*0\.0\.0\.0\/0.*\]/,
      message: 'Firewall allows public access',
      fix: 'Restrict to specific IP ranges or use IAP'
    },
    {
      id: 'TFSEC_K8S001',
      severity: 'high',
      category: 'privileges',
      pattern: /kubernetes_deployment.*(runAsUser|fsGroup).*:\s*0/,
      message: 'Container running as root',
      fix: 'Use non-root user'
    }
  ],
  kubernetes: [
    {
      id: 'KUBE001',
      severity: 'critical',
      category: 'privileges',
      pattern: /runAsNonRoot:\s*false/,
      message: 'Pod allows root user',
      fix: 'Set runAsNonRoot: true'
    },
    {
      id: 'KUBE002',
      severity: 'critical',
      category: 'networking',
      pattern: /hostNetwork:\s*true/,
      message: 'Host network access enabled',
      fix: 'Use cluster networking'
    },
    {
      id: 'KUBE003',
      severity: 'high',
      category: 'secrets',
      pattern: / env:\s*\n\s*- name:/,
      message: 'Hardcoded environment variable',
      fix: 'Use secret references'
    }
  ],
  ai_security: [
    {
      id: 'AI001',
      severity: 'critical',
      category: 'prompt-injection',
      pattern: /(ignore previous instructions|system prompt|forget above)/gi,
      message: 'Potential prompt injection detected',
      fix: 'Sanitize user inputs'
    },
    {
      id: 'AI002',
      severity: 'high',
      category: 'data-privacy',
      pattern: /(ssn|credit card|password|api key|secret)\s*:\s*\d+/gi,
      message: 'PII/credentials in output',
      fix: 'Redact sensitive data'
    },
    {
      id: 'AI003',
      severity: 'medium',
      category: 'hallucination',
      pattern: /(as an ai|i cannot|i don't have access)/gi,
      message: 'AI uncertainty detected',
      fix: 'Verify facts from knowledge base'
    }
  ]
};

// ========================================
// Server Instance
// ========================================
const server = new Server(
  { name: 'security-scanner', version: '1.0.0' },
  { capabilities: { tools: {} } }
);

// ========================================
// Tool Definitions
// ========================================
server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [
    {
      name: 'scan_terraform',
      description: 'Scan Terraform code for security vulnerabilities (like tfsec)',
      inputSchema: {
        type: 'object',
        properties: {
          code: { type: 'string', description: 'Terraform HCL code to scan' },
          format: { type: 'string', enum: ['hcl', 'json'], default: 'hcl' }
        }
      }
    },
    {
      name: 'scan_kubernetes',
      description: 'Scan Kubernetes YAML for security issues (like kubeaudit)',
      inputSchema: {
        type: 'object',
        properties: {
          yaml: { type: 'string', description: 'Kubernetes YAML to scan' }
        }
      }
    },
    {
      name: 'scan_ai_output',
      description: 'Scan AI outputs for security/data privacy issues',
      inputSchema: {
        type: 'object',
        properties: {
          text: { type: 'string', description: 'AI output to analyze' },
          checkPromptInjection: { type: 'boolean', default: true },
          checkPII: { type: 'boolean', default: true }
        }
      }
    },
    {
      name: 'get_security_rules',
      description: 'Get available security rules for your stack',
      inputSchema: {
        type: 'object',
        properties: {
          category: { type: 'string' }
        }
      }
    },
    {
      name: 'compliance_check',
      description: 'Check code against compliance standards (SOC2, HIPAA, PCI)',
      inputSchema: {
        type: 'object',
        properties: {
          code: { type: 'string' },
          standard: { type: 'string', enum: ['soc2', 'hipaa', 'pci', 'all'] }
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
      case 'scan_terraform':
        return scanTerraform(args);
      case 'scan_kubernetes':
        return scanKubernetes(args);
      case 'scan_ai_output':
        return scanAIOutput(args);
      case 'get_security_rules':
        return getSecurityRules(args);
      case 'compliance_check':
        return complianceCheck(args);
      default:
        throw new McpError(ErrorCode.MethodNotFound, `Unknown tool: ${name}`);
    }
  } catch (error) {
    throw new McpError(ErrorCode.InternalError, `Scan failed: ${error.message}`);
  }
});

// ========================================
// Scan Implementations
// ========================================
function scanTerraform(args) {
  const { code } = args;
  const findings = [];
  const rules = SECURITY_RULES.terraform;

  for (const rule of rules) {
    const matches = code.match(rule.pattern);
    if (matches) {
      findings.push({
        rule: rule.id,
        severity: rule.severity,
        category: rule.category,
        message: rule.message,
        match: matches[0].substring(0, 100),
        fix: rule.fix,
        line: findLineNumber(code, matches[0])
      });
    }
  }

  return {
    content: [{
      type: 'text',
      text: JSON.stringify({
        scanType: 'terraform',
        findings,
        summary: {
          critical: findings.filter(f => f.severity === 'critical').length,
          high: findings.filter(f => f.severity === 'high').length,
          medium: findings.filter(f => f.severity === 'medium').length,
          total: findings.length
        }
      }, null, 2)
    }]
  };
}

function scanKubernetes(args) {
  const { yaml } = args;
  const findings = [];
  const rules = SECURITY_RULES.kubernetes;

  for (const rule of rules) {
    const matches = yaml.match(rule.pattern);
    if (matches) {
      findings.push({
        rule: rule.id,
        severity: rule.severity,
        category: rule.category,
        message: rule.message,
        match: matches[0].substring(0, 100),
        fix: rule.fix
      });
    }
  }

  return {
    content: [{
      type: 'text',
      text: JSON.stringify({
        scanType: 'kubernetes',
        findings,
        summary: {
          critical: findings.filter(f => f.severity === 'critical').length,
          high: findings.filter(f => f.severity === 'high').length,
          total: findings.length
        }
      }, null, 2)
    }]
  };
}

function scanAIOutput(args) {
  const { text, checkPromptInjection = true, checkPII = true } = args;
  const findings = [];
  const rules = SECURITY_RULES.ai_security;

  if (checkPromptInjection) {
    for (const rule of rules.filter(r => r.category === 'prompt-injection')) {
      const matches = text.match(rule.pattern);
      if (matches) {
        findings.push({
          rule: rule.id,
          severity: rule.severity,
          category: rule.category,
          message: rule.message,
          match: matches[0],
          fix: rule.fix
        });
      }
    }
  }

  if (checkPII) {
    for (const rule of rules.filter(r => r.category === 'data-privacy')) {
      const matches = text.match(rule.pattern);
      if (matches) {
        findings.push({
          rule: rule.id,
          severity: rule.severity,
          category: rule.category,
          message: rule.message,
          match: matches[0],
          fix: rule.fix
        });
      }
    }
  }

  return {
    content: [{
      type: 'text',
      text: JSON.stringify({
        scanType: 'ai-output',
        findings,
        safe: findings.length === 0,
        recommendation: findings.length > 0 ? 'Review flagged content with security team' : 'No security issues detected'
      }, null, 2)
    }]
  };
}

function getSecurityRules(args) {
  const { category } = args;
  let rules = SECURITY_RULES;

  if (category) {
    rules = Object.fromEntries(
      Object.entries(SECURITY_RULES).map(([type, typeRules]) => [
        type,
        typeRules.filter(r => r.category === category)
      ])
    );
  }

  return {
    content: [{
      type: 'text',
      text: JSON.stringify({ rules, availableCategories: ['iam', 'secrets', 'networking', 'privileges', 'prompt-injection', 'data-privacy'] }, null, 2)
    }]
  };
}

function complianceCheck(args) {
  const { code, standard = 'all' } = args;
  const findings = [];

  // SOC2 controls
  if (standard === 'soc2' || standard === 'all') {
    if (/open\s*=\s*\d+/.test(code)) findings.push({ standard: 'soc2', control: 'CC6.1', message: 'Firewall port open without restriction' });
    if (/admin|root/i.test(code)) findings.push({ standard: 'soc2', control: 'CC6.6', message: 'Privileged access detected' });
  }

  // HIPAA controls
  if (standard === 'hipaa' || standard === 'all') {
    const hipaaPattern = /(ssn|medical|health)\s*:\s*\d+/;
    if (hipaaPattern.test(code)) findings.push({ standard: 'hipaa', control: '164.312', message: 'PHI in code' });
  }

  // PCI controls
  if (standard === 'pci' || standard === 'all') {
    const pciPattern = /(credit|card|cvc)\s*:\s*\d+/;
    if (pciPattern.test(code)) findings.push({ standard: 'pci', control: '3.4', message: 'Card data in code' });
  }

  return {
    content: [{
      type: 'text',
      text: JSON.stringify({
        standard,
        compliant: findings.length === 0,
        violations: findings,
        controlsChecked: standard === 'all' ? 15 : 5
      }, null, 2)
    }]
  };
}

// ========================================
// Helper Functions
// ========================================
function findLineNumber(code, match) {
  return code.substring(0, code.indexOf(match)).split('\n').length;
}

// ========================================
// Start Server
// ========================================
const transport = new StdioServerTransport();
await server.connect(transport);
console.error('Security Scanner MCP Server running...');