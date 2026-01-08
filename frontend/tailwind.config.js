/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Monochrome palette
        primary: '#000000', // Black
        secondary: '#333333', // Dark Gray
        accent: '#666666', // Medium Gray
        background: '#f5f5f5', // Light Gray/White
        surface: '#ffffff', // White
      }
    },
  },
  plugins: [],
}
