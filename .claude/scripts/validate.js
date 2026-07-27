#!/usr/bin/env node
/**
 * Guardrails Validation Script
 * Runs against guardrails.json to check code quality
 */

import fs from 'fs';
import path from 'path';
import { glob } from 'glob';
import { ESLint } from 'eslint';

const GUARDRAILS_PATH = '.claude/guardrails.json';
const IGNORE_PATTERNS = ['node_modules/**', 'dist/**', '.git/**', 'coverage/**'];

async function main() {
  console.log('🛡️  Running Guardrails Validation...\n');

  const guardrails = JSON.parse(fs.readFileSync(GUARDRAILS_PATH, 'utf-8'));
  const results = {
    errors: [],
    warnings: [],
    info: [],
    passed: 0
  };

  // Get all project files
  const files = await glob(['**/*.{html,css,js}'], {
    ignore: IGNORE_PATTERNS
  });

  for (const file of files) {
    const content = fs.readFileSync(file, 'utf-8');
    const relativePath = path.relative(process.cwd(), file);

    // Check schema rules
    for (const rule of guardrails.schema.rules || []) {
      const matches = checkPattern(content, rule.pattern);
      if (matches.length > 0) {
        const severity = rule.severity;
        results[severity].push({
          file: relativePath,
          rule: rule.id,
          description: rule.description,
          matches: matches,
          fix: rule.fix
        });
      }
    }
  }

  // Run ESLint for additional patterns
  const eslint = new ESLint({ fix: false });
  const lintResults = await eslint.lintFiles(files);

  for (const result of lintResults) {
    if (result.messages.length > 0) {
      for (const msg of result.messages) {
        if (msg.severity === 2) {
          results.errors.push({
            file: path.relative(process.cwd(), result.filePath),
            rule: msg.ruleId,
            description: msg.message,
            line: msg.line
          });
        } else {
          results.warnings.push({
            file: path.relative(process.cwd(), result.filePath),
            rule: msg.ruleId,
            description: msg.message,
            line: msg.line
          });
        }
      }
    }
  }

  // Print summary
  console.log('📊 Guardrails Summary');
  console.log('═'.repeat(50));

  if (results.errors.length > 0) {
    console.log(`\n❌ Errors (${results.errors.length}):`);
    for (const err of results.errors) {
      console.log(`  ${err.file}:${err.line || ''} - ${err.description}`);
    }
  }

  if (results.warnings.length > 0) {
    console.log(`\n⚠️  Warnings (${results.warnings.length}):`);
    for (const warn of results.warnings) {
      console.log(`  ${warn.file} - ${warn.description}`);
    }
  }

  if (results.info.length > 0) {
    console.log(`\nℹ️  Info (${results.info.length}):`);
    for (const info of results.info) {
      console.log(`  ${info.file} - ${info.description}`);
    }
  }

  const totalIssues = results.errors.length + results.warnings.length + results.info.length;
  console.log(`\n${totalIssues === 0 ? '✅ All guardrails passed!' : `Found ${totalIssues} issues`}`);

  // Exit with error code if critical issues
  process.exit(results.errors.length > 0 ? 1 : 0);
}

function checkPattern(content, patterns) {
  const findings = [];
  const patternArray = Array.isArray(patterns) ? patterns : [patterns];

  for (const pattern of patternArray) {
    const regex = new RegExp(pattern, 'gi');
    const matches = content.match(regex);
    if (matches) {
      findings.push(...matches);
    }
  }

  return [...new Set(findings)]; // Unique
}

main().catch(console.error);