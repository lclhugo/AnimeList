/** @type {import('tailwindcss').Config} */
export const content = [
  './components/*.{html,js,ts,vue}',
  './layouts/*.{html,js,ts,vue}',
  './pages/*.{html,js,ts,vue}',
  './app.vue',
];
export const theme = {
  extend: {
    fontFamily: {
      display: ['Nunito'],
      body: ['Nunito'],
      titles: ['Figtree'],
    },
    download: true,
  },
};
export const plugins = [require('@tailwindcss/typography'), require('daisyui')];
export const daisyui = {
  themes: ['dark', 'light'],
};
