# Modern Teacher Portal - Visual Design Guide

## 🎨 Design System Overview

### Color Palette

#### Primary Colors
- **Primary Blue**: `#3b82f6` - Main brand color
- **Secondary Purple**: `#a855f7` - Accent color
- **Success Green**: `#10b981` - Success states
- **Warning Orange**: `#f59e0b` - Warning states
- **Error Red**: `#ef4444` - Error states

#### Neutral Colors
- **Dark Slate**: `#1e293b` - Primary text
- **Slate**: `#475569` - Secondary text
- **Light Slate**: `#cbd5e1` - Borders
- **Very Light Slate**: `#f1f5f9` - Light backgrounds

### Typography

#### Font Sizes
- **4xl**: 36px - Page titles
- **3xl**: 30px - Section headers
- **2xl**: 24px - Card titles
- **xl**: 20px - Subsections
- **lg**: 18px - Body text
- **base**: 16px - Default text
- **sm**: 14px - Secondary text
- **xs**: 12px - Labels

#### Font Weights
- **Bold**: 700 - Headings
- **Semibold**: 600 - Emphasis
- **Medium**: 500 - Labels
- **Regular**: 400 - Body text

### Spacing Scale
```
xs: 4px
sm: 8px
md: 12px
lg: 16px
xl: 24px
2xl: 32px
3xl: 48px
4xl: 64px
```

## 📐 Component Specifications

### Header Component

**Height**: 60px (80px with padding)
**Position**: Sticky (z-index: 50)
**Background**: Semi-transparent with backdrop blur

#### Layout
- Left: Menu toggle (mobile) + Search bar
- Right: Quick actions + Notifications + User profile

#### Search Bar
- **Width**: 300px (400px when active)
- **Height**: 40px
- **Border Radius**: 8px
- **Icon**: Magnifying glass (18px)

#### Quick Action Buttons
- **Size**: 40px × 40px
- **Border Radius**: 8px
- **Gap**: 12px
- **Hidden on mobile** (< 768px)

#### Notification Badge
- **Size**: 20px × 20px (min-width: 20px)
- **Position**: Absolute top-right
- **Animation**: Pulse (2s infinite)

### Floating Action Button (FAB)

**Main Button**
- **Size**: 56px × 56px
- **Position**: Fixed bottom-right (2rem from edges)
- **Border Radius**: 50% (circular)
- **Shadow**: `0 4px 12px rgba(59, 130, 246, 0.4)`
- **Z-index**: 40

**Action Buttons**
- **Size**: 48px × 48px
- **Position**: Circular around main button
- **Distance**: 70px from main button
- **Animation**: Scale + Translate (0.3s)

#### Action Button Positions (when expanded)
```
        ↑ (0, -70px)
        
    ↙        ↗
(-50px, -50px) (-70px, -50px)

        ↓
    (-50px, 50px)
```

### Toast Notifications

**Container**
- **Position**: Fixed top-right (1.5rem)
- **Z-index**: 9999
- **Min Width**: 320px

**Individual Toast**
- **Padding**: 16px
- **Border Radius**: 8px
- **Border Left**: 4px (colored by type)
- **Height**: Auto (~60px)

**Icon**
- **Size**: 20px × 20px
- **Animation**: IconBounce (0.5s)

**Progress Bar**
- **Height**: 3px
- **Position**: Bottom
- **Duration**: 4s linear

### Dashboard Cards

**Stat Cards**
- **Min Width**: 250px
- **Padding**: 32px
- **Border Radius**: 16px
- **Box Shadow**: Multiple levels
- **Animation**: SlideIn (0.5s with stagger)

**Lesson Cards**
- **Padding**: 16px
- **Border Radius**: 12px
- **Height**: Auto
- **Hover**: Border color change + lift effect

**Submission Cards**
- **Similar to lesson cards**
- **Includes action button**

## 🎬 Animation Specifications

### Timing Functions
- **Smooth Ease**: `cubic-bezier(0.4, 0, 0.2, 1)`
- **Ease In**: `cubic-bezier(0.4, 0, 1, 1)`
- **Ease Out**: `cubic-bezier(0, 0, 0.2, 1)`
- **Bounce**: `cubic-bezier(0.68, -0.55, 0.265, 1.55)`

### Common Animations

#### Fade In
```css
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
```
**Duration**: 0.5s
**Use**: Page loads, main content

#### Slide In
```css
@keyframes slideDown {
  from { opacity: 0; transform: translateY(-20px); }
  to { opacity: 1; transform: translateY(0); }
}
```
**Duration**: 0.4s
**Use**: Headers, top-level sections

#### Card Slide In
```css
@keyframes cardSlideIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
```
**Duration**: 0.5s with stagger
**Use**: Stat cards (50ms stagger between cards)

#### Toast Slide In
```css
@keyframes toastSlideIn {
  from { opacity: 0; transform: translateX(400px); }
  to { opacity: 1; transform: translateX(0); }
}
```
**Duration**: 0.3s
**Use**: Toast notifications

#### FAB Action Show
```css
@keyframes fabActionShow {
  to {
    opacity: 1;
    transform: scale(1);
  }
}
```
**Duration**: 0.3s with 50ms stagger
**Use**: FAB action buttons appearing

#### Pulse Animation
```css
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.8; }
}
```
**Duration**: 2s infinite
**Use**: Notification badges

## 📱 Responsive Breakpoints

### Desktop (> 1024px)
- Full layout with all features
- All quick actions visible
- Maximum spacing
- 2-3 column layouts

### Tablet (768px - 1024px)
- Adjusted spacing and sizing
- Quick actions still visible but condensed
- Font sizes slightly reduced
- Single sidebar still visible

### Mobile (480px - 768px)
- Single column layouts
- Header menu toggle visible
- Quick actions hidden
- Sidebar as overlay
- Reduced font sizes

### Small Mobile (< 480px)
- Minimal padding (0.75rem)
- FAB adjusted size (44px)
- Toast full width
- Single action FAB items

## 🎯 Interactive States

### Button States

#### Default
- Background gradient or solid
- No transform

#### Hover
- Slight scale increase (1.05-1.1)
- Enhanced shadow
- Brightness increase

#### Active
- Scale down (0.95)
- Immediate feedback

#### Focus
- Outline or glow effect
- Accessibility ring

### Card States

#### Default
- Base styling with subtle shadow
- Border in neutral color

#### Hover
- Lift effect (translateY: -2 to -4px)
- Enhanced shadow
- Border color change
- Brightness increase

## 🔍 Shadow Specifications

### Shadow Levels

```css
/* Shadow SM */
box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);

/* Shadow MD */
box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

/* Shadow LG */
box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);

/* Shadow XL */
box-shadow: 0 20px 25px rgba(0, 0, 0, 0.1);

/* Shadow 2XL */
box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
```

## 🎓 Accessibility Guidelines

### Color Contrast
- Text: Minimum 4.5:1 ratio (WCAG AA)
- Large text: Minimum 3:1 ratio
- Interactive elements: Sufficient color differentiation

### Focus States
- Visible focus ring (2-3px outline)
- Color: Primary color or contrasting color
- Not removed from keyboard navigation

### Keyboard Navigation
- Tab order: Left to right, top to bottom
- Focus indicators: Always visible
- Skip links: Jump to main content

### Screen Readers
- Semantic HTML
- ARIA labels where needed
- Alt text for images
- Form labels properly associated

---

**Design System Version**: 1.0.0
**Last Updated**: December 27, 2025
