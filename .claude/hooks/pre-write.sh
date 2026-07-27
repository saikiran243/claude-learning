#!/bin/bash
# Pre-write hook - runs before Write/Edit/MultiEdit
# Validates file structure, runs quick checks

FILE_PATH="${CLAUDE_TOOL_ARGS_FILE_PATH:-}"
TOOL_NAME="${CLAUDE_TOOL_NAME:-}"

# Skip for certain files
if [[ "$FILE_PATH" =~ \.(md|txt|json|svg|png|jpg|jpeg|gif|ico|woff|woff2)$ ]]; then
    exit 0
fi

echo "🔍 Pre-write validation: $FILE_PATH"

# HTML validation
if [[ "$FILE_PATH" == *.html ]]; then
    if command -v html-validate &> /dev/null; then
        echo "  → Running html-validate..."
        html-validate "$FILE_PATH" --quiet 2>/dev/null || echo "  ⚠️  html-validate not installed or found issues"
    fi
fi

# CSS validation
if [[ "$FILE_PATH" == *.css ]]; then
    if command -v stylelint &> /dev/null; then
        echo "  → Running stylelint..."
        stylelint "$FILE_PATH" --quiet 2>/dev/null || echo "  ⚠️  stylelint not installed or found issues"
    fi
fi

# JavaScript validation
if [[ "$FILE_PATH" == *.js ]]; then
    if command -v eslint &> /dev/null; then
        echo "  → Running eslint..."
        eslint "$FILE_PATH" --quiet 2>/dev/null || echo "  ⚠️  eslint not installed or found issues"
    fi
fi

# Check for TODO/FIXME comments in production files
if [[ "$FILE_PATH" != *test* && "$FILE_PATH" != *spec* ]]; then
    if grep -q "TODO\|FIXME\|HACK\|XXX" "$FILE_PATH" 2>/dev/null; then
        echo "  📝 Note: Found TODO/FIXME comments in $FILE_PATH"
    fi
fi

# Security check - no secrets
if grep -qE "(api[_-]?key|secret|password|token|auth)["'"'"'[:space:]]*[:=]["'"'"'[:space:]]*[a-zA-Z0-9]{20,}" "$FILE_PATH" 2>/dev/null; then
    echo "  ⚠️  WARNING: Possible hardcoded secret detected in $FILE_PATH"
fi

exit 0