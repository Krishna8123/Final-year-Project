# Implementation Plan: High-Impact Landing Page (Home)

## Objective
Create a dedicated **Landing Page (Home)** that serves as the public face of Radar. It must be distinct from the internal Dashboard but share the same "Premium/Teal" design DNA. It needs to be "attractive, unique, and animated."

## Architecture Update
We will separate the application into two core views:
1.  **`Home.jsx` (Landing)**: Public, marketing-focused, "WOW" factor animations.
2.  **`Dashboard.jsx` (App)**: Private, data-focused, functional (The file we just renamed).

## Design Strategy for Home Page
**Theme**: Deep Teal/Sea Green Gradient (Brand Identity).

### 1. The "Hero" Section (Above the Fold)
*   **Background**: The signature animated gradient blobs (from AuthLayout).
*   **Headline**: Big, bold typography ("Investing, Evolved.").
*   **Visual Hook**: We will re-use the **MarketFloorAnimation** (or the StockOrbit) here as the central "Animated Object" to grab attention immediately.
*   **CTAs**: "Start Trading Now" (Links to Register) and "Login" (Links to Login).

### 2. Animated "GIF" Effects (Code-Based)
To achieve the "animated GIF" look without heavy downloads, we will use:
*   **Floating 3D Icons**: Stock symbols (BTC, $, Gold) floating up the screen in the background.
*   **Scroll-Triggered Glass Cards**: As the user scrolls, feature cards (Real-time Data, AI Insights) will "flip" or "slide" into view using `framer-motion`.

### 3. Layout Structure
*   **Navbar**: Transparent glass header with Logo and Login/Signup buttons.
*   **Hero**: Left text, Right Animations.
*   **Features Grid**: 3 holographic glass cards explaining the benefits.
*   **Footer**: Simple minimalist footer.

## Step-by-Step Execution

### Step 1: Create `src/pages/Home.jsx`
*   Build the new file.
*   Import `AuthLayout`'s background logic (or extract it to a shared `BackgroundWrapper`).

### Step 2: Build the Hero
*   Implement the split layout (Text Left, Animation Right).
*   Integrate `MarketFloorAnimation` into the Right side.

### Step 3: Implement Scroll Animations
*   Add a "Why Radar?" section with 3 cards that fade in + scale up when scrolled into view.

### Step 4: Routing Update
*   Update `App.jsx` to serve:
    *   `/` -> `Home.jsx`
    *   `/dashboard` -> `Dashboard.jsx` (Protected route concept).

## Visual References
*   **Background**: Deep Teal Gradient (#103E46 -> #42C0A5).
*   **Cards**: White text on dark glass (`bg-white/5 backdrop-blur-lg`).
