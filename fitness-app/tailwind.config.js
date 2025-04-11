/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      animation: {
        'rotate-subtle': 'rotate-subtle 0.3s ease-in-out 1', // Name, duration, easing, iteration count
        'shake': 'shake 0.5s ease-in-out 1', // Keep the shake animation
      },
      keyframes: {
        'rotate-subtle': {
          '0%': { transform: 'rotate(0deg)' },
          '50%': { transform: 'rotate(2deg)' },
          '100%': { transform: 'rotate(0deg)' },
        },
        shake: {
          '0%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(-5px)' },
          '50%': { transform: 'translateX(5px)' },
          '75%': { transform: 'translateX(-3px)' },
          '100%': { transform: 'translateX(0)' },
        },
      },
  },
  },
  plugins: [],
}
