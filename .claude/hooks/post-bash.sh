#!/bin/bash
# Post-bash hook - runs after Bash tool execution
# Logs commands, captures output, checks for errors

COMMAND="${CLAUDE_TOOL_ARGS_COMMAND:-}"
EXIT_CODE="${CLAUDE_TOOL_RESULT_EXIT_CODE:-0}"

# Skip logging for certain commands
if [[ "$COMMAND" =~ ^(ls|cd|pwd|cat|head|tail|grep|find|which|echo|sleep|date)$ ]]; then
    exit 0
fi

# Log command execution
mkdir -p .claude/logs
echo "$(date -u +"%Y-%m-%dT%H:%M:%SZ") | CMD: $COMMAND | EXIT: $EXIT_CODE" >> .claude/logs/commands.log

# Alert on failures
if [[ "$EXIT_CODE" -ne 0 ]]; then
    echo "⚠️  Command failed (exit $EXIT_CODE): $COMMAND"
    echo "$(date -u +"%Y-%m-%dT%H:%M:%SZ") | FAILED: $COMMAND" >> .claude/logs/errors.log
fi

# Track npm/yarn/pnpm installs
if [[ "$COMMAND" =~ (npm|yarn|pnpm)\ (install|add|remove) ]]; then
    echo "📦 Package change detected: $COMMAND"
    echo "$(date -u +"%Y-%m-%dT%H:%M:%SZ") | PACKAGE: $COMMAND" >> .claude/logs/packages.log
fi

# Track git operations
if [[ "$COMMAND" =~ ^git\ (commit|push|pull|merge|rebase|checkout|branch) ]]; then
    echo "🔀 Git operation: $COMMAND"
    echo "$(date -u +"%Y-%m-%dT%H:%M:%SZ") | GIT: $COMMAND" >> .claude/logs/git.log
fi

exit 0