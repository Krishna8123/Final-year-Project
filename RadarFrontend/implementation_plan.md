# implementation_plan.md

## High-Level Objective
Create a sophisticated, "Webull-inspired" Home Page for **Radar** that features a high-contrast dark theme, neon accents, glassmorphism, and a "Split-Screen" layout to showcase the Dual-Mode functionality (Trader vs. Investor).

## 1. Design System & Theming
**Goal:** Establish the visual language (Dark Mode, Neon, Glassmorphism).

-   **Color Palette:**
    -   **Backgrounds:** Deep Gunmetal (`#0F172A`), Midnight Blue (`#020617`), Pure Black (`#000000`).
    -   **Accents:**
        -   **Radar Cyan:** `#6FFFE9` (Primary Brand)
        -   **Neon Green:** `#4ADE80` (Growth/Profit)
        -   **Electric Blue:** `#3B82F6` (Trust/Data)
        -   **Hot Pink/Purple:** `#D946EF` (Gradients/Highlights)
-   **Typography:**
    -   Headings: `Plus Jakarta Sans` or `Inter` (Bold, Tracking-Tight).
    -   Body: `Inter` or `Roboto` (Clean, Legible).
-   **Glassmorphism:**
    -   `bg-white/5 backdrop-blur-md border border-white/10` style cards.

**Design Updates:**
1.  Update `tailwind.config.js` to include these colors and fonts.
2.  Ensure `index.css` has base styles for smooth scrolling and dark mode defaults.

## 2. Component Architecture
We will build a reusable `SplitScreenSection` component to handle the "Alternating Grid" layout efficiently, and then specialized components for each unique section.

### Components to Build:
1.  **`SplitScreenSection.jsx`**
    -   **Props:** `title`, `description`, `features` (array), `imageComp` (React Node), `reverse` (boolean for Left/Right swap), `id`.
    -   **Behavior:** Uses `framer-motion` to slide text in when in view. High-performance scroll triggers.
2.  **`HeroSection.jsx` (The Adaptive Interface)**
    -   **Visual:** A large, interactive toggle switch animation demonstrating "Lite" vs "Pro" views.
    -   **Content:** "One Platform, Two Personas", "Tailored Complexity", "Smart Persistence".
3.  **`GlobalAssetSection.jsx` (Global Asset Coverage)**
    -   **Visual:** A 3D-style orbital animation (using CSS/Framer Motion) showing floating logos (Bitcoin, Apple, Forex symbols) revolving around a central Radar core.
    -   **Content:** "Unified Multi-Asset Support", "Smart Search", "Real-Time Precision".
4.  **`TraderModeSection.jsx` (Professional Terminal)**
    -   **Visual:** A complex, high-density dashboard mockup (Candlesticks, Depth Charts) with glowing indicators. Tilt effect enabled.
    -   **Content:** "Technical Depth", "Market Depth", "Low Latency Execution".
5.  **`InvestorModeSection.jsx` (Fundamental Insights)**
    -   **Visual:** Clean, wide area charts, growth cards, and simplified metrics. Green/Teal dominant.
    -   **Content:** "Simplified Growth", "Core Fundamentals", "Curated Watchlists".
6.  **`Home.jsx` (Assembly)**
    -   Stacks these sections vertically.
    -   Adds a unified background gradient/mesh that subtly shifts as you scroll.

## 3. Implementation Steps

### Step 1: Configuration
-   Modify `tailwind.config.js` to add custom colors (`radar-dark`, `radar-teal`, etc.) and fonts.
-   Add global CSS for "neon-glow" utilities.

### Step 2: Base Components
-   Create `src/components/landing/SplitScreenSection.jsx`.
-   Ensure it handles `framer-motion` scroll animations (fade-in + slide-up).

### Step 3: Section Implementation (Iterative)
-   **Hero:** Build the "Adaptive Interface" visualization.
-   **Global Assets:** Implement the orbital animation.
-   **Trader View:** create a "Card" that looks like a trading terminal.
-   **Investor View:** create a "Card" that looks like a portfolio summary.

### Step 4: Page Assembly
-   Update `src/pages/Home.jsx` to import and arrange these sections.
-   Add a Footer (if not already present/updated).

## 4. Animation Strategy (The "Wow" Factor)
-   **Scroll Reveal:** Text staggers in line-by-line using `staggerChildren`.
-   **Parallax:** Subtle movement of background elements against the foreground cards.
-   **Hover Effects:** Cards glow or tilt (`react-tilt`) on mouse interaction.
-   **Syncing:** Text highlights light up when the corresponding visual part animates (if possible, otherwise standard scroll sync).

## 5. Dependencies
-   `framer-motion` (Installed)
-   `react-tilt` (Installed)
-   `lucide-react` (Installed)
-   `clsx` / `tailwind-merge` (Recommended for dynamic classes, check if available or install).

## 6. Verification
-   Check responsivity (Mobile stack vs Desktop split).
-   Verify contrast ratios (Webull aesthetic requires legible text on dark backgrounds).
