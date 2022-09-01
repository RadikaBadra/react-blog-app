/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: { 
      colors:{
      'sidebar-bg': '#0F3D3E',
      'text': '#F1F1F1',
      'body-bg': '#E2DCC8',
      'title': '#100F0F',
    }},
   
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
}