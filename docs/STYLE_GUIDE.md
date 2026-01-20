# Extrasensory Studio Design System

A comprehensive guide to the design tokens, components, and patterns used across the Extrasensory Studio website.

## Table of Contents

1. [Principles](#principles)
2. [Color System](#color-system)
3. [Typography](#typography)
4. [Spacing](#spacing)
5. [Components](#components)
6. [Usage Examples](#usage-examples)
7. [Accessibility](#accessibility)
8. [Theme Switching](#theme-switching)

---

## Principles

### Design Philosophy

- **Dark-first**: The site defaults to dark mode, optimized for creative professionals
- **Accessible**: All color combinations meet WCAG AA standards (4.5:1 minimum)
- **Consistent**: Use design tokens for all values—no hardcoded colors or sizes
- **Progressive**: Tokens can be adopted incrementally across pages

### Token Architecture

```
design-tokens.js     → Single source of truth (JS)
       ↓
globals.css          → CSS custom properties
       ↓
tailwind.config.js   → Tailwind classes
       ↓
Components           → Use classes or CSS variables
```

---

## Color System

### Background Colors

| Token | CSS Variable | Dark Mode | Light Mode | Usage |
|-------|--------------|-----------|------------|-------|
| `surface-base` | `--color-bg-base` | `#000000` | `#e8eaed` | Page background |
| `surface-elevated` | `--color-bg-elevated` | `#0a0a0a` | `#f1f3f5` | Raised sections |
| `surface-card` | `--color-bg-card` | `#1a1a1a` | `#dde1e6` | Cards, panels |
| `surface-card-hover` | `--color-bg-card-hover` | `#222222` | `#d0d5db` | Card hover state |

### Text Colors

All text colors are **WCAG AA compliant** on their intended backgrounds.

| Token | CSS Variable | Dark Mode | Light Mode | Contrast | Usage |
|-------|--------------|-----------|------------|----------|-------|
| `content-primary` | `--color-text-primary` | `#ffffff` | `#171717` | 21:1 / 15.5:1 | Headings, important text |
| `content-secondary` | `--color-text-secondary` | `#b3b3b3` | `#404040` | 9.5:1 / 10:1 | Body text, descriptions |
| `content-tertiary` | `--color-text-tertiary` | `#8c8c8c` | `#525252` | 5.5:1 / 7:1 | Captions, labels |
| `content-muted` | `--color-text-muted` | `#737373` | `#737373` | 4.6:1 | Hints, use at 16px+ |
| `content-disabled` | `--color-text-disabled` | `#525252` | `#a3a3a3` | — | Disabled states only |
| `content-accent` | `--color-text-accent` | `#a58aff` | `rgb(30,0,150)` | 7.2:1 / 8.5:1 | Accent-colored text |

### Accent Colors

| Token | CSS Variable | Value | Usage |
|-------|--------------|-------|-------|
| `accent` | `--color-accent` | `rgb(51, 0, 255)` | Buttons, borders, highlights |
| `accent-hover` | `--color-accent-hover` | `rgb(40, 0, 200)` | Button hover state |
| `accent-text` | `--color-accent-text` | `#000000` (dark) / `#ffffff` (light) | Text on accent background |

### Border Colors

| Token | CSS Variable | Dark Mode | Light Mode | Usage |
|-------|--------------|-----------|------------|-------|
| `border-subtle` | `--color-border-subtle` | `#2a2a2a` | `#e5e5e5` | Default borders |
| `border-default` | `--color-border-default` | `#3a3a3a` | `#d4d4d4` | Visible borders |
| `border-strong` | `--color-border-strong` | `#525252` | `#a3a3a3` | Emphasized borders |
| `border-accent` | `--color-border-accent` | `rgb(51, 0, 255)` | `rgb(51, 0, 255)` | Accent borders |

---

## Typography

### Font Families

| Token | CSS Variable | Value | Usage |
|-------|--------------|-------|-------|
| `font-sans` | `--font-sans` | `'Inter', system-ui, sans-serif` | Body text, UI |
| `font-mono` | `--font-mono` | `'SF Mono', 'Monaco', monospace` | Code, technical |
| `font-display` | `--font-display` | `'Bitcount Grid Single', monospace` | Artistic headings (e.g., "foam") |

### Font Sizes

| Token | Size | Line Height | Tailwind Class |
|-------|------|-------------|----------------|
| `xs` | 12px | 16px | `text-xs` |
| `sm` | 14px | 20px | `text-sm` |
| `base` | 15px | 24px | `text-base` |
| `md` | 16px | 24px | `text-md` |
| `lg` | 18px | 28px | `text-lg` |
| `xl` | 20px | 28px | `text-xl` |
| `2xl` | 24px | 32px | `text-2xl` |
| `3xl` | 30px | 36px | `text-3xl` |
| `4xl` | 36px | 40px | `text-4xl` |
| `5xl` | 48px | 1 | `text-5xl` |

### Font Weights

| Token | Value | Tailwind Class |
|-------|-------|----------------|
| `normal` | 400 | `font-normal` |
| `medium` | 500 | `font-medium` |
| `semibold` | 600 | `font-semibold` |
| `bold` | 700 | `font-bold` |
| `black` | 900 | `font-black` |

### Letter Spacing

| Token | Value | Tailwind Class | Usage |
|-------|-------|----------------|-------|
| `tighter` | -0.02em | `tracking-tighter` | Large display text |
| `tight` | -0.01em | `tracking-tight` | Headings |
| `normal` | 0 | `tracking-normal` | Body text |
| `wide` | 0.025em | `tracking-wide` | Buttons |
| `wider` | 0.05em | `tracking-wider` | Labels |
| `widest` | 0.1em | `tracking-widest` | All-caps labels |

---

## Spacing

The spacing scale uses a consistent 4px base unit.

| Token | Value | Tailwind |
|-------|-------|----------|
| `1` | 4px | `p-1`, `m-1`, `gap-1` |
| `2` | 8px | `p-2`, `m-2`, `gap-2` |
| `3` | 12px | `p-3`, `m-3`, `gap-3` |
| `4` | 16px | `p-4`, `m-4`, `gap-4` |
| `5` | 20px | `p-5`, `m-5`, `gap-5` |
| `6` | 24px | `p-6`, `m-6`, `gap-6` |
| `8` | 32px | `p-8`, `m-8`, `gap-8` |
| `10` | 40px | `p-10`, `m-10`, `gap-10` |
| `12` | 48px | `p-12`, `m-12`, `gap-12` |
| `16` | 64px | `p-16`, `m-16`, `gap-16` |
| `20` | 80px | `p-20`, `m-20`, `gap-20` |
| `24` | 96px | `p-24`, `m-24`, `gap-24` |

---

## Components

### Buttons

#### Primary Button
Solid accent background with contrasting text.

```jsx
<button className="btn-primary">Buy Now</button>
```

```css
.btn-primary {
  background-color: var(--color-accent);
  color: var(--color-accent-text);
  padding: 0.75rem 1.5rem;
  font-weight: 600;
  border-radius: var(--radius-default);
}
```

#### Secondary Button
Outlined with accent border, fills on hover.

```jsx
<button className="btn-secondary">Learn More</button>
```

#### Ghost Button
Subtle border, minimal emphasis.

```jsx
<button className="btn-ghost">Cancel</button>
```

### Cards

#### Standard Card
```jsx
<div className="card p-8">
  <h3 className="text-content-primary">Title</h3>
  <p className="text-content-secondary">Description</p>
</div>
```

#### Featured Card
Accent border for emphasis.

```jsx
<div className="card-featured p-8">
  <h3 className="text-content-accent">Featured</h3>
  <p className="text-content-secondary">Highlighted content</p>
</div>
```

### Text Hierarchy

```jsx
{/* Page title - use font-display for artistic headings */}
<h1 className="font-display text-content-primary text-5xl">foam</h1>

{/* Section heading */}
<h2 className="text-content-primary text-3xl font-bold">Get FOAM</h2>

{/* Subsection heading */}
<h3 className="text-content-primary text-md font-semibold uppercase tracking-widest">
  Features
</h3>

{/* Body text */}
<p className="text-content-secondary text-base leading-relaxed">
  Main paragraph content goes here.
</p>

{/* Caption / Label */}
<span className="text-content-tertiary text-sm">
  Additional context
</span>

{/* Hint text (use sparingly, larger sizes) */}
<span className="text-content-muted text-md">
  Optional hint
</span>

{/* Accent text */}
<span className="text-content-accent">
  Highlighted information
</span>
```

---

## Usage Examples

### Using CSS Variables in Inline Styles

```jsx
<div style={{
  backgroundColor: 'var(--color-bg-card)',
  border: '1px solid var(--color-border-subtle)',
  color: 'var(--color-text-primary)'
}}>
  Content
</div>
```

### Using Tailwind Classes

```jsx
<div className="bg-surface-card border border-border-subtle text-content-primary">
  Content
</div>
```

### Importing Tokens in JavaScript

```js
import { themes, typography } from '@/lib/design-tokens'

// Access dark theme colors
const primaryText = themes.dark.textPrimary // '#ffffff'

// Access typography
const fontSans = typography.fontFamily.sans
```

### Conditional Styling

```jsx
<label
  className="p-3 rounded cursor-pointer transition-all"
  style={{
    backgroundColor: isSelected
      ? 'var(--color-bg-card-hover)'
      : 'transparent',
    border: `1px solid ${isSelected
      ? 'var(--color-accent)'
      : 'var(--color-border-default)'}`
  }}
>
  {/* ... */}
</label>
```

---

## Accessibility

### Contrast Requirements

| Text Type | Minimum Ratio | Our Standard |
|-----------|---------------|--------------|
| Normal text (< 18px) | 4.5:1 | 5.5:1+ |
| Large text (≥ 18px or 14px bold) | 3:1 | 4.5:1+ |
| UI components | 3:1 | 4.5:1+ |

### Text Color Selection Guide

| Context | Recommended Token | Minimum Size |
|---------|-------------------|--------------|
| Headings, prices, CTAs | `content-primary` | Any |
| Body paragraphs | `content-secondary` | Any |
| Labels, captions | `content-tertiary` | 12px+ |
| Hints, optional info | `content-muted` | 16px+ |
| Disabled elements | `content-disabled` | — |

### Checklist

- [ ] All text passes WCAG AA (4.5:1 for normal, 3:1 for large)
- [ ] Interactive elements have visible focus states
- [ ] Color is not the only means of conveying information
- [ ] Sufficient spacing between interactive elements (44x44px touch targets)

---

## Theme Switching

### How It Works

The theme system uses CSS custom properties that change based on a class on the root element:

- **Dark mode (default)**: `:root` styles apply
- **Light mode**: `.light` or `[data-theme="light"]` on `<html>` or `<body>`

### Implementation

```jsx
// Theme toggle component example
function ThemeToggle() {
  const [theme, setTheme] = useState('dark')

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  return (
    <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
      Toggle Theme
    </button>
  )
}
```

### Tailwind Dark Mode

The Tailwind config uses `darkMode: 'class'`, so you can also use:

```jsx
<div className="bg-white dark:bg-black">
  Adapts to theme
</div>
```

---

## File Reference

| File | Purpose |
|------|---------|
| `src/lib/design-tokens.js` | Token definitions, theme values |
| `src/app/globals.css` | CSS custom properties, component classes |
| `tailwind.config.js` | Tailwind extensions referencing tokens |

---

## Migration Guide

When updating existing pages to use the design system:

1. **Replace hardcoded colors** with CSS variables or Tailwind classes
2. **Use semantic tokens** (`content-secondary`) not raw values (`#b3b3b3`)
3. **Check accessibility** - ensure all text passes contrast requirements
4. **Test both themes** - verify the page works in light and dark mode

### Common Replacements

| Before | After (CSS var) | After (Tailwind) |
|--------|-----------------|------------------|
| `color: '#ffffff'` | `color: var(--color-text-primary)` | `text-content-primary` |
| `color: '#666666'` | `color: var(--color-text-tertiary)` | `text-content-tertiary` |
| `backgroundColor: '#1a1a1a'` | `backgroundColor: var(--color-bg-card)` | `bg-surface-card` |
| `border: '1px solid #2a2a2a'` | `border: 1px solid var(--color-border-subtle)` | `border border-border-subtle` |
| `color: 'rgb(51, 0, 255)'` | `color: var(--color-text-accent)` | `text-content-accent` |
