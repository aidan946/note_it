
// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/supabase',
  ],
  build: {
    transpile:
      process.env.NODE_ENV === 'production'
        ? [
          '@css-render/vue3-ssr',
          '@juggle/resize-observer'
        ]
        : ['@juggle/resize-observer']
  },
  vite: {
    optimizeDeps: {
    }
  },
  supabase: {
    redirect: true,
    redirectOptions: {
      login: '/',
      callback: '/confirm',
      exclude: [],
    },
  },

  css: ['~/assets/css/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
      'tailwindcss/nesting': {},
    },
  },
})
