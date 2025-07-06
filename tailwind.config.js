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
      },
      fontFamily: {
        sans: ["Inter", "Arial", "sans-serif"],
        mono: ["Fira Mono", "Menlo", "monospace"],
      },
    },
  },
  plugins: [],
};
