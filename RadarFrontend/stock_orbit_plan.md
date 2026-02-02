# Implementation Plan: Stock Market Orbit Animation

## Objective
Create a visual component featuring a central image surrounded by orbiting stock market icons to represent dynamic financial activity. This mimics a "living" GIF effect using code, ensuring high quality and performance.

## Technology Stack
- **Library**: `framer-motion` (for complex orbit animations)
- **Icons**: `lucide-react` (for stock market symbols like `TrendingUp`, `CircleDollarSign`, `BarChart3`)
- **Styling**: Tailwind CSS

## Component Design: `StockOrbitAnimation.jsx`
We will create a new component `src/components/StockOrbitAnimation.jsx` that encapsulates this logic.

### 1. Structure
- **Container**: Relative positioning, centered content.
- **Central Node**: A user avatar, logo, or thematic image in the dead center.
- **Orbit Track**: A subtle dashed or solid circle SVG to visualize the path (optional, purely aesthetic).
- **Orbiting Satellite**:
    - A container that rotates 360 degrees infinitely.
    - *Alternatively*, for a more premium feel: The icons themselves move along the circular path but remain upright (counter-rotated).

### 2. Animation Logic (Framer Motion)
Using `animate` prop to rotate the containing `div` from `0deg` to `360deg` with `repeat: Infinity`, `ease: "linear"`, and a duration of ~20 seconds for a smooth, slow orbit.

### 3. Visual Detail (The "Premium" Touch)
- **Glassmorphism**: Icons will be inside small glass-effect bubbles (`backdrop-blur`).
- **Gradients**: Use the brand's teal/green gradients for the icons.
- **Pulsing**: The central image can have a subtle breathing/pulse animation.

## Implementation Steps

### Step 1: Create the Component
Create `src/components/StockOrbitAnimation.jsx`.

```jsx
import { motion } from "framer-motion";
import { TrendingUp, DollarSign, BarChart3, Wallet, Activity } from "lucide-react";

const OrbitIcon = ({ children, delay = 0, radius = 100, angle = 0 }) => {
  return (
    <motion.div
        className="absolute p-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full shadow-lg text-emerald-400"
        style={{
            top: "50%",
            left: "50%",
            x: Math.cos(angle * (Math.PI / 180)) * radius, 
            y: Math.sin(angle * (Math.PI / 180)) * radius,
        }}
    >
        {children}
    </motion.div>
  );
};

export default function StockOrbitAnimation() {
    // ... main implementation ...
}
```

*Note: For a simpler continuous rotation, we can rotate the entire container.*

### Step 2: Integrate into Layout
Add this component to the `AuthLayout` or `Login` page. Since `AuthLayout.jsx` seems to handle the visual side (right side), we will replace the existing static image or 3D tilt card with this dynamic animation if desired, or place it in the center if appropriate.

## Proposed Usage
```jsx
// In src/pages/Login.jsx or AuthLayout.jsx
<div className="flex justify-center items-center h-full w-full bg-slate-900">
    <StockOrbitAnimation />
</div>
```
