/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'radar-bg': '#0F172A', // Deep Gunmetal
        'radar-dark': '#020617', // Midnight Blue
        'radar-black': '#000000', // Pure Black
        'radar-cyan': '#6FFFE9', // Primary Brand
        'radar-green': '#4ADE80', // Growth/Profit
        'radar-blue': '#3B82F6', // Trust/Data
        'radar-purple': '#D946EF', // Gradients/Highlights
        'radar-teal': '#10706B', // Secondary Brand
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}