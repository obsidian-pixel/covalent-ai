/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        carbon: "#1A202C", // background
        graphite: "#2D3748", // surfaces
        chalk: "#E2E8F0", // text
        electron: "#4299E1", // accent
        amber: {
          DEFAULT: '#FFBF00',
          '50': '#FFFBEB',
          '100': '#FEF3C7',
          '200': '#FDE68A',
          '300': '#FCD34D',
          '400': '#FBBF24',
          '500': '#F59E0B',
          '600': '#D97706',
          '700': '#B45309',
          '800': '#92400E',
          '900': '#78350F',
        },
      },
      fontFamily: {
        sans: ["Inter", "Arial", "sans-serif"],
        mono: ["Fira Mono", "Menlo", "monospace"],
      },
      animation: {
        fadeIn: 'fadeIn 0.5s ease-out',
        slideUp: 'slideUp 0.5s ease-out',
        pulse: 'pulse 2s infinite',
        'subtle-glow': 'subtle-glow 1.5s infinite alternate',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        slideUp: {
          from: { transform: 'translateY(20px)', opacity: '0'},
          to: { transform: 'translateY(0)', opacity: '1'},
        },
        pulse: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
        },
        'subtle-glow': {
          '0%, 100%': { 'box-shadow': '0 0 5px rgba(255, 255, 255, 0.1)' },
          '50%': { 'box-shadow': '0 0 15px rgba(255, 255, 255, 0.2)' },
        },
      },
    },
  },
  plugins: [],
};
