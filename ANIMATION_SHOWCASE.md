# 🎬 Animation & Effects Showcase

## Complete List of Modern Effects

### 1. Page Load Animations

#### Dashboard Fade-In
```css
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```
- **Duration**: 0.5s
- **Easing**: ease-out
- **Effect**: Smooth entrance

#### Header Slide Down
```css
@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```
- **Duration**: 0.4s
- **Easing**: ease-out
- **Effect**: Drops in from top

### 2. Card Animations

#### Stat Card Slide In
```css
@keyframes cardSlideIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```
- **Duration**: 0.5s
- **Stagger**: 50ms between cards
- **Effect**: Cascading entrance

#### Card Hover Lift
```css
.stat-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(59, 130, 246, 0.15);
}
```
- **Animation**: smooth transition (0.3s)
- **Effect**: Lifts on hover

#### Border Animation
```css
.stat-card::before {
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.3s ease;
}

.stat-card:hover::before {
  transform: scaleX(1);
}
```
- **Effect**: Gradient bar expands from left

### 3. Header Animations

#### Search Bar Focus
```css
.search-input:focus {
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  border-color: var(--color-primary);
}
```
- **Animation**: smooth (0.2s)
- **Effect**: Glow on focus

#### Search Container Active
```css
.search-container.active {
  width: 400px;
}
```
- **Duration**: 0.3s
- **Effect**: Expands on focus

#### Avatar Hover
```css
.avatar:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
}
```
- **Animation**: smooth (0.2s)
- **Effect**: Slight bounce on hover

### 4. Notification Animations

#### Toast Slide In
```css
@keyframes toastSlideIn {
  from {
    opacity: 0;
    transform: translateX(400px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
```
- **Duration**: 0.3s
- **Easing**: cubic-bezier
- **Effect**: Slides from right

#### Toast Slide Out
```css
@keyframes toastSlideOut {
  from {
    opacity: 1;
    transform: translateX(0);
  }
  to {
    opacity: 0;
    transform: translateX(400px);
  }
}
```
- **Duration**: 0.3s
- **Effect**: Slides out on dismiss

#### Icon Bounce
```css
@keyframes iconBounce {
  0% {
    opacity: 0;
    transform: scale(0.5) rotate(-20deg);
  }
  100% {
    opacity: 1;
    transform: scale(1) rotate(0);
  }
}
```
- **Duration**: 0.5s
- **Easing**: cubic-bezier(0.68, -0.55, 0.265, 1.55)
- **Effect**: Bouncy entrance

#### Progress Bar Animation
```css
@keyframes toastProgress {
  from {
    width: 100%;
  }
  to {
    width: 0;
  }
}
```
- **Duration**: 4s linear
- **Effect**: Fills from left to right

#### Notification Badge Pulse
```css
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.8;
  }
}
```
- **Duration**: 2s infinite
- **Effect**: Gentle pulsing

### 5. Floating Action Button Animations

#### FAB Main Button Hover
```css
.fab-main:hover {
  transform: scale(1.1);
  box-shadow: 0 6px 20px rgba(59, 130, 246, 0.5);
}
```
- **Duration**: 0.3s
- **Effect**: Grows and glows

#### FAB Main Button Active
```css
.fab-main:active {
  transform: scale(0.95);
}
```
- **Effect**: Slight press effect

#### FAB Main Icon Rotate
```css
.fab-main-icon.rotate {
  transform: rotate(45deg);
}
```
- **Duration**: 0.3s ease
- **Effect**: Plus becomes X

#### FAB Action Show
```css
@keyframes fabActionShow {
  to {
    opacity: 1;
    transform: scale(1);
  }
}
```
- **Duration**: 0.3s
- **Stagger**: 50ms

#### FAB Action Hide
```css
@keyframes fabActionHide {
  from {
    opacity: 1;
    transform: scale(1);
  }
  to {
    opacity: 0;
    transform: scale(0);
  }
}
```
- **Duration**: 0.3s
- **Effect**: Shrinks and fades

#### FAB Action Positioning
Position animations for 4 actions:
- **Action 1**: `translate(0, -70px)` - Top
- **Action 2**: `translate(-50px, -50px)` - Top-left
- **Action 3**: `translate(-70px, 0)` - Left
- **Action 4**: `translate(-50px, 50px)` - Bottom-left

#### FAB Backdrop Fade
```css
@keyframes backdropFadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
```
- **Duration**: 0.2s
- **Effect**: Semi-transparent overlay

### 6. Button Animations

#### Action Button Background
```css
.action-button::before {
  opacity: 0;
  transition: opacity 0.2s ease;
}

.action-button:hover::before {
  opacity: 1;
}
```
- **Effect**: Gradient appears on hover

#### Button Active
```css
.action-button:active {
  transform: scale(0.95);
}
```
- **Effect**: Click feedback

### 7. Theme Switch Animation

```css
.theme-switch {
  transition: all 240ms ease;
}

.theme-switch .knob {
  transition: left 240ms ease;
}
```
- **Duration**: 240ms
- **Effect**: Smooth pill switch

### 8. Mobile Menu Overlay

```css
.mobile-overlay {
  transition: all 0.3s ease;
}

.mobile-overlay.active {
  opacity: 1;
  visibility: visible;
}
```
- **Duration**: 0.3s
- **Effect**: Smooth fade

## Animation Timing Reference

### Common Durations
- **Fast**: 0.2s - UI feedback
- **Standard**: 0.3s - Transitions
- **Medium**: 0.4s - Entrance animations
- **Slow**: 0.5s - Important transitions
- **Very Slow**: 4s - Progress bars
- **Infinite**: Continuous (pulse, animations)

### Timing Functions
```css
/* Standard Cubic Bezier */
cubic-bezier(0.4, 0, 0.2, 1)  /* Smooth ease */

/* Custom for Bounce */
cubic-bezier(0.68, -0.55, 0.265, 1.55)  /* Bouncy */

/* Linear */
linear  /* For progress bars */

/* Ease In */
cubic-bezier(0.4, 0, 1, 1)

/* Ease Out */
cubic-bezier(0, 0, 0.2, 1)
```

## Performance Optimizations

### Hardware Acceleration
- Using `transform` for animations (not position/size)
- Using `opacity` for fading
- Avoiding layout recalculations

### FPS Targets
- All animations: 60fps
- Smooth CPU usage
- No jank or stuttering

### Animation Triggers
- `:hover` - Mouse over
- `:active` - Click/press
- `:focus` - Keyboard focus
- Class toggle - JavaScript events
- Page load - CSS animation

## Animation Customization

### Modify Duration
```css
/* Change animation speed */
.stat-card {
  animation: cardSlideIn 1s ease-out;  /* Was 0.5s */
}
```

### Adjust Stagger
```css
/* Change delay between cards */
.stat-card:nth-child(1) {
  animation-delay: 0.1s;  /* Was 0.05s */
}
```

### Change Easing
```css
/* Different timing function */
.stat-card {
  animation: cardSlideIn 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}
```

### Disable Animations
```css
/* Reduce motion for accessibility */
@media (prefers-reduced-motion: reduce) {
  * {
    animation: none !important;
    transition: none !important;
  }
}
```

## Browser Support

### Transform
- ✅ Chrome
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Mobile browsers

### Transitions
- ✅ All modern browsers
- ✅ IE11 (basic support)

### Animations
- ✅ All modern browsers
- ✅ IE10+ (partial)

## Accessibility Considerations

### Respect User Preferences
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

### Avoid Motion Sickness
- Keep animations under 5 seconds
- Avoid rapid flashing
- Use smooth easing
- Provide clear direction

### Focus Indicators
- Always visible
- Good contrast
- Should not be animated away

## Testing Animations

### Browser DevTools
1. Open DevTools (F12)
2. Go to Performance tab
3. Record animation
4. Check for 60fps

### Mobile Testing
- Test on real devices
- Check battery impact
- Verify smooth scrolling
- Test touch interactions

---

**Animation System Version**: 1.0.0
**Last Updated**: December 27, 2025
