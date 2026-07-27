# GitHub Authentication - Secure Token Management

## 🔐 Secure Authentication Setup

### Option 1: SSH (Recommended)
```bash
# Generate SSH key (if you don't have one)
ssh-keygen -t ed25519 -C "your_email@example.com"

# Add to SSH agent
ssh-add ~/.ssh/id_ed25519

# Copy public key
cat ~/.ssh/id_ed25519.pub
# Add to GitHub: Settings → SSH and GPG keys → New SSH key
```

**Push with SSH:**
```bash
git remote add origin git@github.com:saikiran243/claude-learning.git
git push -u origin main
```

### Option 2: Personal Access Token (PAT)
```bash
# Create fine-grained PAT at:
# GitHub → Settings → Developer settings → Personal access tokens → Fine-grained tokens

# Token needed for this repo:
# - Repository permissions: Contents (Read/Write)
# - No admin permissions needed

# Store safely in keychain (macOS)
printf "github-cli: https://github.com\nprotocol=https\nhost=github.com\n" | git-credential-store
```

**Push with HTTPS:**
```bash
git remote add origin https://github.com/saikiran243/claude-learning.git
git push -u origin main
```

### Option 3: GitHub CLI (Easiest)
```bash
# Install GitHub CLI
brew install gh

# Authenticate
gh auth login
# Choose: GitHub.com, HTTPS, Login with web browser

# Push directly
gh repo create saikiran243/claude-learning --public --source=. --push
```

## 🔒 Security Best Practices

### Never Commit These Files:
- `.env` - Environment variables
- `.claude/settings.local.json` - If it contains secrets
- `data/*.db` - SQLite databases
- `keys/` - Any private keys

### Safe Files to Commit:
- `.claude/settings.json` - Contains no secrets
- `.mcp.json` - References tokens via `${GITHUB_TOKEN}`
- All `.js`, `.css`, `.html` files
- Documentation (`*.md`)

### Protected Values in Code:
```javascript
// ✅ Safe - References environment
GITHUB_TOKEN: "${GITHUB_TOKEN}"

// ❌ Unsafe - Hardcoded
GITHUB_TOKEN: "ghp_xxxxxxxxxxxxxxxxxxxx"
```

## 📁 .gitignore for Security

Add to `.gitignore`:
```gitignore
# Secrets and credentials
.env
.env.local
*.key
*.pem

# MCP servers
data/*.db  # SQLite databases
*.log      # Log files with potential PII

# Claude Code
.claude/memory/
.claude/logs/
.claude/checkpoints/
.settings.local.json

# Build artifacts
dist/
coverage/
report.json
```

## 🚀 Push Your Code (Safe Sequence)

```bash
# 1. Create .gitignore
cat > .gitignore << 'EOF'
.env
.env.local
*.key
*.pem
data/*.db
*.log
.claude/memory/
.claude/logs/
.claude/checkpoints/
.settings.local.json
dist/
coverage/
report.json
EOF

# 2. Stage everything except secrets
git add .

# 3. Verify no secrets staged
git diff --cached | grep -i "ghp_\|-----BEGIN\|password" && echo "WARNING: Potential secrets!" || echo "✅ No obvious secrets detected"

# 4. Commit
git commit -m "feat: Add Claude Code certification platform with MCP servers

- 4 custom MCP servers for security/compliance/analytics/design
- 5 specialized agents for code review/security/accessibility/performance/domain
- GitHub Actions CI/CD workflow
- Guardrails for policy enforcement
- Hands-on learning exercises

Co-Authored-By: Claude <noreply@anthropic.com>"

# 5. Set up remote (using SSH - most secure)
git remote add origin git@github.com:saikiran243/claude-learning.git

# 6. Push
git push -u origin main
```

## 🎯 Post-Push Setup

### 1. Enable GitHub Actions
- Go to: https://github.com/saikiran243/claude-learning/actions
- Click "Enable Actions"

### 2. Add Repository Secrets (if needed later)
Settings → Secrets and variables → Actions:
- `GITHUB_TOKEN` - Auto-provided by GitHub
- Custom API keys (for external MCP integrations)

### 3. Branch Protection
Settings → Branches → Add rule:
- Branch: `main`
- ✅ Require status checks
- ✅ Include administrators

---

## ✅ Your Repository is Ready

Your `claude-learning` repo will contain:
- **35+ files** of production-ready patterns
- **Custom MCP servers** for enterprise integration
- **CI/CD workflows** demonstrating security checks
- **Learning documentation** for your journey

Ready to push when you are!