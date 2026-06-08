/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'legal-dark': '#0A0A0A',
        'legal-panel': '#121212',
        'legal-border': '#262626',
        'gold-primary': '#D4AF37',
        'gold-light': '#F3E5AB',
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #BF953F 0%, #FCF6BA 25%, #B38728 50%, #FBF5B7 75%, #AA771C 100%)',
        'dark-gradient': 'linear-gradient(180deg, #141414 0%, #050505 100%)',
        'gold-glow': 'radial-gradient(circle, rgba(187,135,40,0.15) 0%, rgba(0,0,0,0) 70%)',
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}