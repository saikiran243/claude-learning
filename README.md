# Jagger - Premium Men's Custom Tailoring Website

A professional, responsive frontend website for **Jagger**, a premium men's custom tailoring business based in Nizamabad, Telangana.

## 🌟 Features

### Core Functionality
- **Style Selection**: Browse 16 predefined styles across 4 categories (Suits & Blazers, Shirts, Traditional Wear, Smart Casual)
- **Interactive Style Cards**: Click any style to view detailed modal with full specifications
- **Customization Options**: Each style offers multiple fabric, fit, and detail choices via dropdown selectors
- **Style Selection Cart**: Add styles to your selection, review, and proceed to consultation booking
- **Contact Form**: Full validation with phone, email, occasion selection, and message fields
- **Toast Notifications**: User feedback for form submissions and actions

### Design & UX
- **Professional Aesthetic**: Elegant typography (Playfair Display + Inter), refined color palette (charcoal, gold accent, off-white)
- **Fully Responsive**: Mobile-first design, works beautifully on all screen sizes (320px - 1440px+)
- **Accessible**: WCAG AA compliant - semantic HTML, ARIA labels, focus management, keyboard navigation, screen reader support
- **Smooth Animations**: Fade/slide transitions, hover effects, scroll animations (respects `prefers-reduced-motion`)
- **Performance**: CSS custom properties, optimized selectors, lazy-loading ready images

### Sections
1. **Hero** - Compelling headline, stats, dual CTAs
2. **Styles Gallery** - Filterable grid with 16 detailed styles
3. **About** - Workshop story, credentials, trust indicators
4. **Process** - 6-step bespoke journey visualization
5. **Selection Summary** - Dynamic cart of chosen styles
6. **Contact** - Workshop info, phone, email, WhatsApp, social links, booking form
7. **Footer** - Links, location, legal

## 📁 Project Structure

```
claude-practise/
├── index.html      # Main HTML structure (semantic, accessible)
├── styles.css      # Complete styling (35KB, mobile-first, CSS custom properties)
├── script.js       # All interactivity (15KB, vanilla ES6+, no dependencies)
└── README.md       # This file
```

## 🚀 Getting Started

### Quick Start
Simply open `index.html` in any modern browser:

```bash
# Option 1: Direct open
open index.html

# Option 2: Serve locally (recommended for form handling)
npx serve .
# or
python3 -m http.server 8000
# Then visit http://localhost:8000
```

### No Build Step Required
- Zero dependencies
- No bundlers, transpilers, or frameworks
- Runs in any modern browser (Chrome 80+, Firefox 75+, Safari 14+, Edge 80+)

## 🎨 Customization

### Colors (CSS Custom Properties)
Edit `:root` in `styles.css`:

```css
:root {
    --color-primary: #1a1a1a;      /* Main dark */
    --color-accent: #d4a574;        /* Gold accent */
    --color-accent-light: #e8c59a;  /* Lighter gold */
    --color-white: #ffffff;
    --color-off-white: #fafafa;
    /* ... more variables */
}
```

### Adding Styles
Add new objects to `stylesData` array in `script.js`:

```javascript
{
    id: 'unique-id',
    category: 'suits', // suits | shirts | traditional | casual
    name: 'Style Name',
    description: 'Marketing description...',
    image: 'data:image/svg+xml,...', // or path to image
    features: ['Feature 1', 'Feature 2', '...'],
    customizations: {
        fabric: ['Option A', 'Option B'],
        fit: ['Slim', 'Regular', 'Relaxed'],
        // ... any customization categories
    }
}
```

### Contact Information
Update in `index.html`:
- Phone: `+91 90909 09009` (in 3 places)
- Email: `info@jaggertailors.com`, `appointments@jaggertailors.com`
- Address: Shop No. 12, Beside Clock Tower, Main Road, Nizamabad - 503001

## ♿ Accessibility Checklist

- [x] Semantic HTML5 elements (header, nav, main, section, article, footer)
- [x] Proper heading hierarchy (h1 → h2 → h3)
- [x] ARIA labels on interactive elements
- [x] Focus visible styles on all interactive elements
- [x] Keyboard navigation (Tab, Enter, Escape)
- [x] Modal focus trap
- [x] Screen reader announcements for dynamic content
- [x] `prefers-reduced-motion` respected
- [x] Color contrast ratios ≥ 4.5:1
- [x] Alt text for all images
- [x] Form labels associated with inputs
- [x] Error messages linked via `aria-describedby`

## 📱 Browser Support

| Browser | Version | Support |
|---------|---------|---------|
| Chrome  | 80+     | ✅ Full |
| Firefox | 75+     | ✅ Full |
| Safari  | 14+     | ✅ Full |
| Edge    | 80+     | ✅ Full |
| Mobile Safari | 14+ | ✅ Full |
| Chrome Mobile | 80+ | ✅ Full |

## 🔧 Technical Details

### CSS Architecture
- **Mobile-first** responsive design
- **CSS Custom Properties** for theming
- **BEM-inspired** naming convention
- **Logical properties** where applicable
- **Container queries** ready structure

### JavaScript Patterns
- **Module pattern** with IIFE-like organization
- **Event delegation** for dynamic elements
- **State management** via single state object
- **DOM caching** for performance
- **Progressive enhancement** - core content works without JS

### Performance
- **No external dependencies** (fonts loaded via Google Fonts with `preconnect`)
- **Optimized CSS** - no redundant rules
- **Lazy-loading ready** images (IntersectionObserver)
- **Minimal reflows** - batched DOM operations

## 📞 Business Information

| Detail | Value |
|--------|-------|
| **Store Name** | Jagger |
| **Location** | Nizamabad, Telangana |
| **Specialization** | Men's Wear (Bespoke Tailoring) |
| **Phone** | +91 90909 09009 |
| **Email** | info@jaggertailors.com |
| **Hours** | Mon-Sat: 10 AM - 8 PM, Sun: By Appointment |

## 📄 License

This project is created for Jagger Tailors, Nizamabad. All rights reserved.

---

**Crafted with precision** — just like a bespoke suit.