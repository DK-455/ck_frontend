/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fef7ee',
          100: '#fdedd6',
          200: '#fad7ac',
          300: '#f6ba77',
          400: '#f1933e',
          500: '#ed7519',
          600: '#de5a0f',
          700: '#b8430f',
          800: '#933514',
          900: '#762e14',
        },
        cake: {
          50: '#fef7f7',
          100: '#fdeded',
          200: '#fad9d9',
          300: '#f5b8b8',
          400: '#ed8a8a',
          500: '#e25c5c',
          600: '#d13e3e',
          700: '#ae2f2f',
          800: '#8f2a2a',
          900: '#772828',
        }
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
} 