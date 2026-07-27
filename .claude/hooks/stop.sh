#!/bin/bash
# Stop hook - runs when Claude stops/finishes a task
# Cleanup, summary, notifications

SESSION_ID="${CLAUDE_SESSION_ID:-}"
DURATION="${CLAUDE_SESSION_DURATION:-}"

echo "🏁 Session ending: $SESSION_ID"

# Generate session summary
mkdir -p .claude/logs
{
    echo "=== Session Summary ==="
    echo "Session ID: $SESSION_ID"
    echo "Duration: ${DURATION}s"
    echo "End Time: $(date -u +"%Y-%m-%dT%H:%M:%SZ")"
    echo ""
    echo "Files Modified:"
    git diff --name-only 2>/dev/null | head -20 || echo "  (no git repo)"
    echo ""
    echo "Commands Run:"
    tail -20 .claude/logs/commands.log 2>/dev/null || echo "  (no command log)"
} >> .claude/logs/session-summary.log

# Notify if long session
if [[ -n "$DURATION" && "$DURATION" -gt 1800 ]]; then
    echo "📊 Long session detected (${DURATION}s) - consider breaking into smaller tasks"
fi

# Save session state for resume
cat > .claude/last-session.json <<EOF
{
    "sessionId": "$SESSION_ID",
    "endTime": "$(date -u +"%Y-%m-%dT%H:%M:%SZ")",
    "duration": $DURATION,
    "workingDir": "$(pwd)",
    "gitBranch": "$(git branch --show-current 2>/dev/null || echo 'unknown')",
    "gitStatus": "$(git status --short 2>/dev/null | head -5 || echo 'none')"
}
EOF

exit 0