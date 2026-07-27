# JAGGER - Premium Men's Custom Tailoring
## Project Documentation for Claude Code

---

## 📋 Project Overview

**Jagger** is a professional frontend website for a men's custom tailoring business in Nizamabad, Telangana. Built with vanilla HTML5, CSS3, and ES6+ JavaScript - no frameworks, no build step, zero dependencies.

### Key Details
- **Store Name**: Jagger
- **Location**: Shop No. 12, Beside Clock Tower, Main Road, Nizamabad - 503001, Telangana, India
- **Phone**: +91 90909 09009
- **Email**: info@jaggertailors.com | appointments@jaggertailors.com
- **Specialization**: Men's bespoke tailoring (suits, shirts, traditional wear, smart casual)
- **Established**: 2024

---

## 🏗️ Architecture

### Tech Stack (Zero Dependencies)
```
├── index.html          # Semantic HTML5, accessibility-first
├── styles.css          # CSS Custom Properties, modern layout
├── script.js           # ES6+ modules, state management
└── .claude/            # Claude Code configuration
    ├── settings.json   # Hooks, permissions, env
    └── hooks/          # Automation scripts
```

### Design System
- **Typography**: Playfair Display (headings) + Inter (body)
- **Colors**: 
  - Primary: `#1a1a1a` (near black)
  - Accent: `#d4a574` (champagne gold)
  - Background: `#fafafa` / `#ffffff`
- **Spacing**: 8px base unit (`--space-xs` through `--space-3xl`)
- **Border Radius**: `--radius-sm` (4px) → `--radius-lg` (16px) → `--radius-full`
- **Shadows**: Layered system (`--shadow-sm` → `--shadow-xl`)
- **Transitions**: `--transition-fast` (150ms) → `--transition-slow` (400ms)

### Breakpoints
- Mobile: `< 480px`
- Tablet: `480px - 768px`
- Desktop: `768px - 1024px`
- Large: `1024px - 1440px`
- XL: `> 1440px`

---

## 🎯 Features Implemented

### 1. Style Catalog System
- **4 Categories**: Suits & Blazers, Shirts, Traditional Wear, Smart Casual
- **16 Predefined Styles** with detailed specifications
- **Category Filtering** with keyboard-accessible tabs
- **Style Detail Modal** with full customization options
- **Selection Cart** with persistence (localStorage)

### 2. Customization Engine
Each style supports configurable options:
- Fabrics (100+ combinations across categories)
- Lapels, collars, cuffs
- Buttons, pockets, vents
- Linings, monograms
- Fit preferences

### 3. Consultation Booking
- Validated contact form (HTML5 + JS)
- Occasion selection (wedding, business, formal, etc.)
- Selected styles auto-attached to inquiry
- Toast notifications for feedback

### 4. Professional Sections
- **Hero**: Stats, CTAs, scroll indicator
- **About**: Craftsmanship, timeline, guarantees
- **Process**: 6-step journey (consultation → delivery)
- **Contact**: Location, phone, email, social links
- **Footer**: Navigation, legal, location

---

## ♿ Accessibility (WCAG 2.1 AA)

- Semantic HTML5 landmarks (`<nav>`, `<main>`, `<section>`, `<footer>`)
- ARIA labels, roles, and live regions
- Focus management (modal trap, skip links)
- Keyboard navigation (Tab, Enter, Escape, Arrow keys)
- Color contrast ratios ≥ 4.5:1
- Reduced motion support (`prefers-reduced-motion`)
- Screen reader optimized content
- Form validation with `aria-live` errors

---

## 🔧 Claude Code Configuration

### Hooks (`.claude/hooks/`)
| Hook | Trigger | Purpose |
|------|---------|---------|
| `stop.sh` | Session end | Save git state, checkpoint |
| `pre-compact.sh` | Context compaction | Save critical state |
| `post-edit.sh` | File write/edit | Lint, format, validate |
| `PreToolUse` | Bash/Write/Edit | Logging, audit trail |

### Permissions (`.claude/settings.json`)
- **Allowed**: Git, npm, node, file ops, Read/Write/Edit, WebFetch/Search
- **Denied**: sudo, rm -rf, curl/wget (security)

### Environment Variables
```json
{
  "NODE_ENV": "development",
  "PROJECT_NAME": "jagger-tailors"
}
```

---

## 📝 Development Workflow

### Starting Development
```bash
# No build step needed - open directly in browser
open index.html
# Or serve locally
npx serve .
python3 -m http.server 8000
```

### Code Quality (Manual)
```bash
# Install dev tools (optional)
npm init -y
npm install -D eslint prettier stylelint htmlhint markdownlint-cli

# Run checks
npx eslint script.js
npx prettier --check .
npx stylelint styles.css
npx htmlhint index.html
npx markdownlint CLAUDE.md
```

### Git Workflow
```bash
git init
git add .
git commit -m "Initial commit: Jagger tailoring website"
# Feature branches for changes
git checkout -b feature/new-style-category
```

---

## 🧪 Testing Checklist

### Functional
- [ ] All 16 styles render correctly
- [ ] Category filters work (All, Suits, Shirts, Traditional, Casual)
- [ ] Modal opens/closes with keyboard (Esc, Tab trap)
- [ ] Style selection adds/removes from cart
- [ ] Cart persists across reloads (localStorage)
- [ ] Form validates required fields
- [ ] Form submits successfully (mock API)
- [ ] Toast notifications appear/dismiss
- [ ] Mobile menu toggles correctly
- [ ] Smooth scroll navigation works

### Responsive
- [ ] Mobile (< 480px): Single column, stacked cards
- [ ] Tablet (480-768px): 2-column grid
- [ ] Desktop (768-1024px): 3-4 column grid
- [ ] Large (1024-1440px): Full layout
- [ ] XL (> 1440px): Max-width container

### Accessibility
- [ ] Tab order logical throughout
- [ ] Focus visible on all interactive elements
- [ ] Screen reader announces modal changes
- [ ] Form errors announced via aria-live
- [ ] Color contrast passes WCAG AA
- [ ] Reduced motion respected

### Performance
- [ ] No render-blocking resources
- [ ] Images optimized (SVG placeholders)
- [ ] CSS/JS minified for production
- [ ] Cache headers configured
- [ ] Lighthouse score > 90

---

## 📦 Data Structure

### Style Object (script.js)
```javascript
{
  id: 'suit-navy-two-button',
  category: 'suits',
  name: 'Navy Two-Button Suit',
  description: 'Cornerstone of every gentleman\'s wardrobe...',
  image: 'data:image/svg+xml,...',
  features: ['Super 130\'s Italian Wool', 'Natural Shoulder', ...],
  customizations: {
    fabric: ['Navy Super 130\'s', 'Midnight Blue Flannel', ...],
    lapel: ['Notch (Classic)', 'Peak (Formal)', ...],
    buttons: ['2-Button (Standard)', '3-Button (Traditional)', ...],
    vents: ['Double Vent (Classic)', 'Single Vent (Traditional)', ...],
    lining: ['Bemberg Navy', 'Bemberg Burgundy', ...],
    pockets: ['Flap Pockets', 'Jetted Pockets', ...]
  }
}
```

### Category Info
```javascript
{
  suits: { name: 'Suits & Blazers', icon: '🎩' },
  shirts: { name: 'Shirts', icon: '👔' },
  traditional: { name: 'Traditional Wear', icon: '👑' },
  casual: { name: 'Smart Casual', icon: '🧥' }
}
```

### Selection State
```javascript
{
  selectedStyles: [
    { ...styleObject, customizations: { fabric: 'Navy Super 130\'s', ... } }
  ]
}
```

---

## 🔮 Future Enhancements

### Phase 1 - Core Features
- [ ] Fabric swatch visualizer
- [ ] Measurement guide with diagrams
- [ ] Price calculator (fabric + labor + options)
- [ ] Appointment calendar integration

### Phase 2 - Business Features
- [ ] Customer portal (order history, reorder)
- [ ] WhatsApp Business API integration
- [ ] PDF quote generation
- [ ] Inventory management

### Phase 3 - Advanced
- [ ] 3D garment preview (Three.js)
- [ ] AR try-on (WebXR)
- [ ] AI style recommendations
- [ ] Multi-language support (Telugu, Hindi, English)

---

## 📚 Learning Resources (Claude Code)

### Skills to Practice
| Skill | Command | Purpose |
|-------|---------|---------|
| `dataviz` | `/dataviz` | Charts, dashboards, visualizations |
| `update-config` | `/update-config` | Modify settings.json, hooks |
| `keybindings-help` | `/keybindings-help` | Custom shortcuts |
| `simplify` | `/simplify` | Code quality review |
| `fewer-permission-prompts` | `/fewer-permission-prompts` | Reduce prompts |
| `run` | `/run` | Launch/preview app |

### Useful Commands
```bash
# Model switching
/model sonnet
/model opus
/model haiku

# Planning
/plan "Add fabric swatch visualizer"

# Code review
/code-review

# Memory
/remember "Jagger uses champagne gold accent #d4a574"

# Workflows
/workflows
```

---

## 🛡️ Security Considerations

- **No external CDNs** - All fonts self-hosted via Google Fonts preconnect
- **No inline scripts** - CSP compatible
- **Form validation** - Client + server (when backend added)
- **XSS prevention** - Text content only, no dangerouslySetInnerHTML
- **Data privacy** - localStorage only, no tracking
- **HTTPS only** - Production deployment requirement

---

## 📄 License & Credits

- **Fonts**: Playfair Display & Inter via Google Fonts (OFL)
- **Icons**: Inline SVG (custom)
- **Images**: SVG placeholders (replace with real photography)
- **Code**: MIT License - Free for commercial use

---

## 🤝 Contributing

1. Fork repository
2. Create feature branch
3. Follow existing code style
4. Test across breakpoints
5. Ensure accessibility
6. Submit PR with description

---

*Last updated: 2025-07-24 | Claude Code v1.0 | Project: Jagger Tailors*