#!/bin/bash
# Pre-compact hook - runs before context is compacted
# Saves important state, creates checkpoints

SESSION_ID="${CLAUDE_SESSION_ID:-}"

echo "🗜️  Context compaction triggered - saving state"

# Save critical project state
mkdir -p .claude/checkpoints
CHECKPOINT_FILE=".claude/checkpoints/pre-compact-$(date -u +"%Y%m%d-%H%M%S").json"

cat > "$CHECKPOINT_FILE" <<EOF
{
    "timestamp": "$(date -u +"%Y-%m-%dT%H:%M:%SZ")",
    "sessionId": "$SESSION_ID",
    "git": {
        "branch": "$(git branch --show-current 2>/dev/null || echo 'unknown')",
        "commit": "$(git rev-parse HEAD 2>/dev/null || echo 'unknown')",
        "status": "$(git status --short 2>/dev/null | head -20 || echo 'none')",
        "uncommittedFiles": $(git status --porcelain 2>/dev/null | wc -l || echo 0)
    },
    "workingDir": "$(pwd)",
    "openFiles": [],
    "pendingTasks": [],
    "keyDecisions": []
}
EOF

# Keep only last 10 checkpoints
ls -t .claude/checkpoints/pre-compact-*.json 2>/dev/null | tail -n +11 | xargs rm -f 2>/dev/null || true

echo "  ✅ Checkpoint saved: $CHECKPOINT_FILE"

exit 0