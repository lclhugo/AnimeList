/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/*.{html,js,ts,vue}',
    './layouts/*.{html,js,ts,vue}',
    './pages/*.{html,js,ts,vue}',
    './app.vue',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['Nunito'],
        body: ['Nunito'],
        titles: ['Figtree'],
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: ['dark', 'light'],
  },
};
