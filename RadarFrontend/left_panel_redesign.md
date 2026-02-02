# Implementation Plan: Left Panel Redesign & Dynamic 3D Visuals

## Objective
Redesign the left panel of the Auth page to improve hierarchy and visual impact.
1.  **Layout Shift**: Move textual "Information" to the **TOP**.
2.  **Visual Shift**: Move the "Animated Picture" to the **BOTTOM**.
3.  **Visual Upgrade**: Replace the flat orbit with a high-end **3D Holographic Radar Floor** or **Perspective Orbit System** that feels like a premium "Gif/Video".

## Layout Strategy
- **Container**: `flex flex-col justify-between h-full p-12 relative overflow-hidden`
- **Top Section (Info)**: 
    - Radar Brand/Logo (Small)
    - Headline "Master the Markets" (Large)
    - Subtext (Medium)
- **Bottom Section (Visual)**: 
    - A perspective-tilted animation anchored at the bottom center.
    - It creates a sense of "depth" or a "platform" for the brand.

## Visual Concepts (Ideas)

### Option 1: The "Holographic Radar Floor" (Recommended)
A 3D tilted plane (perspective view) sitting at the bottom.
- **Center**: The Radar Logo floating slightly above the floor.
- **The "Floor"**: A rotating radar sweep effect (concentric circles) tilted at 60 degrees.
- **Orbiting Elements**: Stock icons floating in 3D space around the center, bobbing up and down.
- **Effect**: Looks like a futuristic command center console.

### Option 2: The "Market Data Waterfall"
- **Center**: Logo.
- **Background**: Streams of binary or stock tickers (AAPL +2.4%) falling like rain or matrix code behind the logo.
- **Placement**: Logo at bottom, data "raining" into it.

### Option 3: The "Global Network"
- A wireframe globe rotating at the bottom with glowing nodes connected by lines, representing global trading.

## Implementation Details (Option 1)

### Component: `HolographicRadar.jsx`
We will use `framer-motion` and CSS 3D transforms (`transform: rotateX(60deg) rotateZ(...)`).

```jsx
// Concept Code
<div className="perspective-[1000px] flex justify-center items-end h-[400px]">
    {/* Tilted Plane */}
    <motion.div 
        style={{ rotateX: 60 }}
        className="relative w-[600px] h-[600px] border border-emerald-500/30 rounded-full"
        animate={{ rotateZ: 360 }}
    >
        {/* Radar Sweep Gradient */}
        <div className="absolute inset-0 bg-[conic-gradient(...)] opacity-20" />
        
        {/* Orbiting Icons (Counter-rotated to stand up) */}
        <OrbitingItem icon={TrendingUp} angle={0} />
        <OrbitingItem icon={DollarSign} angle={90} />
    </motion.div>
    
    {/* Floating Central Logo (Not tilted, just floating) */}
    <motion.div className="absolute bottom-20 z-50 animate-bounce-slow">
        <img src="/logo.png" />
    </motion.div>
</div>
```

## Step-by-Step Execution
1.  **Modify `AuthLayout.jsx`**: Change flexbox properties to push text up and content down.
2.  **Create `HolographicRadar.jsx`**: Build the new 3D-style component.
3.  **Integrate**: Place the component at the bottom of the left panel (masking it slightly if needed for the "rising" look).
