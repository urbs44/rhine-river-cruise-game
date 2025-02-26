/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        cruise: {
          blue: {
            light: '#e0f2fe',
            DEFAULT: '#0369a1',
            dark: '#0c4a6e',
          },
          gold: {
            light: '#fef9c3',
            DEFAULT: '#ca8a04',
            dark: '#854d0e',
          }
        }
      },
      backgroundImage: {
        'water-pattern': "url('/assets/images/patterns/water.svg')",
        'map-pattern': "url('/assets/images/patterns/map-bg.svg')",
      },
    },
  },
  plugins: [],
}