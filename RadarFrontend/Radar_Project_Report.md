# Radar Frontend Project Report

## 1. Executive Summary
**Project Name:** Radar Frontend  
**Description:** A high-performance, visually immersive web application designed for real-time market analysis. Radar unifies global market data (Stocks, Crypto, Forex) into a single interface. Its core innovation is the **"Dual Mode" system**, which dynamically adapts the user interface and data presentation for two distinct personas: **Active Traders** (high-frequency, technical analysis) and **Long-Term Investors** (fundamental analysis, portfolio growth).

---

## 2. Key Modules & Features Implemented

### A. Home Page (Landing Experience)
The Home Page serves as the primary entry point, designed to "wow" the user with premium aesthetics and explain the platform's unique value.

**Key Components:**
1.  **Hero Section:**
    *   **Purpose:** Immediate value proposition.
    *   **Features:** Animated entry headlines ("Understand markets. Act confidently."), "Explore Radar" CTA, and a responsive grid of cards explaining "What is Radar" and "Who it is for."
    *   **Visuals:** Custom SVG/Lucide icon compositions with glassmorphism backgrounds.
    
2.  **Global Asset Section (The 'Radar' Scanner):**
    *   **Purpose:** Visual metaphor for the platform's core function.
    *   **Interactive Visual:** A custom-built SVG animation resembling a radar scan. It features orbiting "planets" representing major assets (Bitcoin, USD, EUR, GBP) that rotate around the central logo.
    *   **Real-time Data:** Integration with public APIs (Binance, Frankfurter) to fetch and display live price updates for these assets directly on the landing page.

3.  **Trader vs. Investor Mode Section (Split-Screen Logic):**
    *   **Innovation:** A highly interactive toggle that switches the entire section's theme, content, and emotional tone.
    *   **Trader View:** Dark blue/black theme, "High Velocity" messaging, and a laptop-style charting visualization.
    *   **Investor View:** Teal/Green theme, "Long Term" messaging, and a portfolio growth visualization.
    *   **Tech:** Uses advanced conditional rendering and Framer Motion layout transitions.

4.  **Features Carousel:**
    *   **Dynamic Theming:** A cover-flow style carousel where the background color of the entire section shifts (e.g., from Indigo to Amber to Emerald) based on the active feature card being viewed.

5.  **Navbar & Footer:**
    *   **Navbar:** Glass-effect floating navigation with a logo, search bar, and login/signup buttons.
    *   **Footer:** comprehensive sitemap and legal links.

### B. Authentication Modules
Secure and user-friendly entry points with specific business logic.

#### 1. Login Page (`/login`)
*   **Unified Input:** Users can log in using either their **Username** or **Email** in a single field.
*   **Persona Selection (Critical Feature):** Before logging in, users **must** select their preferred mode via a custom dropdown:
    *   **Investor Mode:** Sets the dashboard to a fundamental-focused view.
    *   **Trader Mode:** Sets the dashboard to a technical-focused view.
*   **Features:**
    *   Password visibility toggle (Eye icon).
    *   "Forgot Password" link.
    *   **Google OAuth Integration:** "Sign in with Google" for one-click access.

#### 2. Register Page (`/register`)
*   **Data Collection:** Username, Email, Password, Confirm Password.
*   **Validation:** Real-time checking to ensure passwords match.
*   **Google Signup:** Alternative registration via Google account.
*   **Routing:** Automatically redirects to the Login page upon successful account creation.

---

## 3. Technology Stack

| Technology | Role in Project | Highlights |
| :--- | :--- | :--- |
| **React.js** | Core Framework | Component-based architecture for modular development. |
| **Tailwind CSS** | Styling Engine | Utility-first CSS for rapid UI development, custom neon glow effects, and responsive design. |
| **Framer Motion** | Animation Library | Powers complex page transitions, the "Orbital" scan effect, and smooth mode-switching animations. |
| **React Router DOM** | Navigation | Manages client-side routing (SPA) between Home, Login, and Register pages. |
| **Axios** | API Client | Handles HTTP communication with the backend authentication endpoints (`/auth/login`, `/auth/register`). |
| **Lucide React** | Iconography | Provides a consistent, modern set of SVG icons (Globe, Activity, Eye, etc.). |
| **Google OAuth** | Authentication | `@react-oauth/google` library for secure social login integration. |
| **Vite** | Build Tool | Ensures ultra-fast development server start times and optimized production builds. |

---

## 4. User Flow Diagrams

### **Scenario A: User Registration (New User)**
1.  **Start:** User lands on **Home Page**.
2.  **Action:** Clicks "Explore Radar" or "Register" button.
3.  **Input:** User fills out the Registration Form (Username, Email, Password).
4.  **System Check:** Frontend validates input formats and password matching.
5.  **API Call:** POST request sent to server `/auth/register`.
6.  **Outcome:**
    *   *Success:* User redirected to **Login Page**.
    *   *Failure:* Error message displayed (e.g., "Email already exists").

### **Scenario B: User Login (Returning User)**
1.  **Start:** User navigates to **Login Page**.
2.  **Input:** User enters Credentials (Username/Email & Password).
3.  **Decision (Crucial Step):** User selects **"Trader"** or **"Investor"** mode from the dropdown.
4.  **API Call:** POST request sent to server `/auth/login`.
5.  **Processing:** Server validates credentials and returns a **JWT Token**.
6.  **Storage:** Application saves the **Token** and **User Mode** preference to local storage.
7.  **Outcome:** User is redirected to the **Dashboard**, which renders the specific interface for the selected mode.

### **Scenario C: Exploring the Platform (Home Page Interaction)**
1.  **Visual Hook:** User sees the "Radar Scan" animation fetching live crypto/forex prices.
2.  **Education:** User scroll through "Trader vs Investor" section.
3.  **Interaction:** Toggling the switch instantly changes the theme from Dark Blue (Trader) to Teal Green (Investor), demonstrating the platform's adaptability.
4.  **Engagement:** User swipes through the "Features" carousel, triggering background color changes that match each feature's branding.

---

## 5. Visual Design Language
The application uses a specific design language to convey "Premium Fintech":
*   **Colors:** Deep Jungle Green (`#0F2E2A`), Neon Cyan (`#00f3ff`), and Slate Blue (`#0F172A`).
*   **Typography:** 'Plus Jakarta Sans' for a modern, geometric feel.
*   **Effects:**
    *   **Glassmorphism:** Translucent backgrounds with blur effects on cards and navbars.
    *   **Neon Glows:** Drop shadows and borders that simulate illuminated interfaces.
    *   **Micro-interactions:** Buttons scale slightly on click; links shimmer on hover.

---
**Report Generated:** Monday, February 9th, 2026  
**Status:** Frontend Core Implementation Complete
