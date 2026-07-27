#!/bin/bash
# Post-write hook - runs after Write/Edit/MultiEdit
# Formats, lints, validates, updates docs

FILE_PATH="${CLAUDE_TOOL_ARGS_FILE_PATH:-}"
TOOL_NAME="${CLAUDE_TOOL_NAME:-}"

# Skip for certain files
if [[ "$FILE_PATH" =~ \.(md|txt|json|svg|png|jpg|jpeg|gif|ico|woff|woff2)$ ]]; then
    exit 0
fi

echo "✨ Post-write processing: $FILE_PATH"

# Format with Prettier
if command -v prettier &> /dev/null && [[ "$FILE_PATH" =~ \.(html|css|js|json|md|yaml|yml)$ ]]; then
    echo "  → Formatting with Prettier..."
    prettier --write "$FILE_PATH" 2>/dev/null || true
fi

# Run ESLint fix on JS files
if [[ "$FILE_PATH" == *.js ]] && command -v eslint &> /dev/null; then
    echo "  → Auto-fixing with ESLint..."
    eslint "$FILE_PATH" --fix --quiet 2>/dev/null || true
fi

# Run stylelint fix on CSS files
if [[ "$FILE_PATH" == *.css ]] && command -v stylelint &> /dev/null; then
    echo "  → Auto-fixing with stylelint..."
    stylelint "$FILE_PATH" --fix --quiet 2>/dev/null || true
fi

# Validate HTML
if [[ "$FILE_PATH" == *.html ]] && command -v html-validate &> /dev/null; then
    echo "  → Validating HTML..."
    html-validate "$FILE_PATH" --quiet 2>/dev/null || true
fi

# Update file modification timestamp for cache busting
if [[ -f "$FILE_PATH" ]]; then
    touch "$FILE_PATH"
fi

# Log change for audit trail
echo "$(date -u +"%Y-%m-%dT%H:%M:%SZ") | $TOOL_NAME | $FILE_PATH" >> .claude/logs/changes.log 2>/dev/null || mkdir -p .claude/logs && echo "$(date -u +"%Y-%m-%dT%H:%M:%SZ") | $TOOL_NAME | $FILE_PATH" >> .claude/logs/changes.log

exit 0