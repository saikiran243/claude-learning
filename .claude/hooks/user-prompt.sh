#!/bin/bash
# User prompt hook - runs when user submits a prompt
# Context injection, prompt analysis, telemetry

PROMPT="${CLAUDE_USER_PROMPT:-}"
SESSION_ID="${CLAUDE_SESSION_ID:-}"

# Log prompt for analytics
mkdir -p .claude/logs
echo "$(date -u +"%Y-%m-%dT%H:%M:%SZ") | SESSION: $SESSION_ID | PROMPT: ${PROMPT:0:200}" >> .claude/logs/prompts.log

# Detect intent patterns for auto-context
if [[ "$PROMPT" =~ (test|spec|jest|vitest) ]]; then
    echo "🧪 Test-related prompt detected"
fi

if [[ "$PROMPT" =~ (security|vulnerability|audit|penetration|xss|csrf|sql injection) ]]; then
    echo "🔒 Security-related prompt detected - consider security review agent"
fi

if [[ "$PROMPT" =~ (performance|optimize|speed|memory|bundle|load) ]]; then
    echo "⚡ Performance-related prompt detected"
fi

if [[ "$PROMPT" =~ (accessibility|a11y|wcag|screen reader|aria) ]]; then
    echo "♿ Accessibility-related prompt detected"
fi

if [[ "$PROMPT" =~ (deploy|ci|cd|pipeline|github action|gitlab) ]]; then
    echo "🚀 Deployment/CI-related prompt detected"
fi

# Auto-suggest relevant agents based on prompt
# This would integrate with the agent system

exit 0