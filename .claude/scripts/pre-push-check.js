#!/usr/bin/env node
/**
 * Pre-push security check - Verify no secrets in staged files
 */

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const secretPatterns = [
  /ghp_[a-zA-Z0-9]{36}/,  // GitHub PAT
  /-----BEGIN PRIVATE KEY-----/,  // Private key
  /AKIA[0-9A-Z]{16}/,  // AWS Access Key
  /sk-[a-zA-Z0-9]{32}/,  // Anthropic API key
  /(password|secret|api_key)\s*=\s*["'][^"']{10,}["']/i  // Hardcoded secrets
];

function checkFile(file) {
  try {
    const content = fs.readFileSync(file, 'utf-8');
    for (const pattern of secretPatterns) {
      if (pattern.test(content)) {
        return `❌ Potential secret in ${file}`;
      }
    }
    return null;
  } catch (e) {
    return null;  // Binary or missing file
  }
}

console.log('🔍 Checking staged files for secrets...\n');

const stagedFiles = execSync('git diff --cached --name-only')
  .toString()
  .split('\n')
  .filter(f => f);

let foundSecrets = false;

for (const file of stagedFiles) {
  const result = checkFile(file);
  if (result) {
    console.log(result);
    foundSecrets = true;
  }
}

if (foundSecrets) {
  console.log('\n⚠️ ABORTING: Secrets detected. Remove before pushing.');
  process.exit(1);
} else {
  console.log('✅ No obvious secrets detected. Safe to push.');
}

// Check gitignore exists
if (!fs.existsSync('.gitignore')) {
  console.log('⚠️ No .gitignore found. Consider adding one.');
}