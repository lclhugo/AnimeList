// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/supabase',
    '@nuxtjs/google-fonts',
    '@vueuse/nuxt',
    '@vueuse/motion/nuxt',
  ],
  ssr: false,
  googleFonts: {
    families: {
      Nunito: [100, 200, 300, 400, 500, 600, 700, 800, 900],
      Figtree: [100, 200, 300, 400, 500, 600, 700, 800, 900],
    },
    display: 'swap',
    prefetch: true,
    preconnect: true,
  },
  supabase: {
    url: process.env.SUPABASE_URL,
    key: process.env.SUPABASE_KEY,
    redirect: false,
  },
  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
  ],
});
