/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'green_1': '#00000026',
        'product_name': '#191919',
        'product_price': '#00000099',
        
      },
      maxWidth:{
        'banner_size': '30rem',
      }
    },
  },
  plugins: [],
}