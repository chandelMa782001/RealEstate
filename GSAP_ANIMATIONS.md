# GSAP Animations Implementation

This project now uses GSAP (GreenSock Animation Platform) for smooth, professional animations throughout.

## Installed Package
- `gsap` - Professional-grade animation library

## Components with GSAP Animations

### 1. **Notification Component** (`src/component/Notification.jsx`)
- Slide-in from right animation when notification appears
- Smooth slide-out animation when dismissed
- Auto-dismiss with animation after duration

### 2. **FeaturedProperties Component** (`src/component/FeaturedProperties.jsx`)
- Property cards animate in on scroll with stagger effect
- Each card fades in, scales up, and moves from bottom
- Button click animation with scale effect
- Uses ScrollTrigger plugin for scroll-based animations

### 3. **Hero Component** (`src/component/Hero.jsx`)
- Title animates down with fade-in
- Subtitle follows with stagger
- Search box scales up with bounce effect
- Timeline-based sequential animations

### 4. **PropertyDetail Page** (`src/pages/PropertyDetail.jsx`)
- Main content slides in from left
- Sidebar slides in from right
- Smooth page entry animation

### 5. **LoginModal Component** (`src/component/LoginModal.jsx`)
- Modal scales up with bounce effect
- Overlay fades in
- Close animation scales down and fades out

### 6. **SignupModal Component** (`src/component/SignupModal.jsx`)
- Same smooth modal animations as LoginModal
- Consistent user experience across modals

## Animation Features
- **Smooth Easing**: Uses power3, power2, and back easing functions
- **Stagger Effects**: Sequential animations for multiple elements
- **Scroll Triggers**: Animations triggered by scroll position
- **Timeline Control**: Coordinated multi-element animations
- **Performance**: Hardware-accelerated transforms for 60fps animations

## Usage Example
```javascript
import gsap from 'gsap';

// Simple fade in
gsap.fromTo(element, 
  { opacity: 0, y: 50 },
  { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
);

// With ScrollTrigger
gsap.fromTo(element,
  { opacity: 0 },
  {
    opacity: 1,
    scrollTrigger: {
      trigger: element,
      start: 'top 85%'
    }
  }
);
```

## Benefits
- Professional, smooth animations
- Better user experience
- Improved perceived performance
- Consistent animation timing across the app
