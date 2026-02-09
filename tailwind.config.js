/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#8B6F47',
        'card': '#FEFAF5',
        'border': '#E8DFD5',
        'background': '#FEFAF5',
        'foreground': '#1F1F1F',
        'muted-foreground': '#666666',
      }
    },
  },
  plugins: [],
}
