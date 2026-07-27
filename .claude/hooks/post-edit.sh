#!/bin/bash
# Post-edit hook - runs after file modifications
# Performs linting, formatting, validation based on file type

FILE_PATH="${TOOL_INPUT_FILE_PATH}"
FILE_EXT="${FILE_PATH##*.}"

echo "🔍 Post-edit validation: $FILE_PATH"

case "$FILE_EXT" in
    js|ts|tsx|jsx)
        # JavaScript/TypeScript - run eslint if available
        if command -v npx >/dev/null 2>&1 && [ -f "package.json" ]; then
            if grep -q '"eslint"' package.json 2>/dev/null; then
                npx eslint "$FILE_PATH" --quiet 2>/dev/null || echo "  ⚠️  ESLint issues found (run 'npx eslint $FILE_PATH')"
            fi
            if grep -q '"prettier"' package.json 2>/dev/null; then
                npx prettier --check "$FILE_PATH" 2>/dev/null || echo "  💅 Prettier formatting needed (run 'npx prettier --write $FILE_PATH')"
            fi
        fi
        ;;
    py)
        # Python - run ruff/black if available
        if command -v ruff >/dev/null 2>&1; then
            ruff check "$FILE_PATH" 2>/dev/null || echo "  ⚠️  Ruff issues found"
        fi
        if command -v black >/dev/null 2>&1; then
            black --check "$FILE_PATH" 2>/dev/null || echo "  🎨 Black formatting needed"
        fi
        ;;
    json)
        # JSON - validate syntax
        if command -v jq >/dev/null 2>&1; then
            jq empty "$FILE_PATH" 2>/dev/null || echo "  ❌ Invalid JSON syntax"
        elif command -v python3 >/dev/null 2>&1; then
            python3 -m json.tool "$FILE_PATH" >/dev/null 2>&1 || echo "  ❌ Invalid JSON syntax"
        fi
        ;;
    yml|yaml)
        # YAML - validate syntax
        if command -v python3 >/dev/null 2>&1; then
            python3 -c "import yaml; yaml.safe_load(open('$FILE_PATH'))" 2>/dev/null || echo "  ❌ Invalid YAML syntax"
        fi
        ;;
    html)
        # HTML - basic validation
        if command -v htmlhint >/dev/null 2>&1; then
            htmlhint "$FILE_PATH" 2>/dev/null || echo "  ⚠️  HTMLHint issues found"
        fi
        ;;
    css)
        # CSS - validate with stylelint if available
        if command -v npx >/dev/null 2>&1 && [ -f "package.json" ]; then
            if grep -q '"stylelint"' package.json 2>/dev/null; then
                npx stylelint "$FILE_PATH" 2>/dev/null || echo "  ⚠️  Stylelint issues found"
            fi
        fi
        ;;
    md)
        # Markdown - lint with markdownlint if available
        if command -v markdownlint >/dev/null 2>&1; then
            markdownlint "$FILE_PATH" 2>/dev/null || echo "  📝 Markdown lint issues found"
        fi
        ;;
esac

# Check for common issues in any file
if grep -q "TODO\|FIXME\|XXX\|HACK" "$FILE_PATH" 2>/dev/null; then
    echo "  📌 Contains TODO/FIXME/XXX/HACK comments"
fi

# Check file size
FILE_SIZE=$(wc -c < "$FILE_PATH" 2>/dev/null || echo 0)
if [ "$FILE_SIZE" -gt 100000 ]; then
    echo "  📦 Large file ($(($FILE_SIZE / 1024))KB) - consider splitting"
fi

exit 0