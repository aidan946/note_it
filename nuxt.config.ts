import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: [
    '@nuxt/eslint',
    '@nuxt/icon',
    '@nuxtjs/supabase'
  ],
  css: ['~/assets/css/main.css'],
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
  supabase: {
    redirectOptions: {
      login: "/",
      callback: "/confirm",
      exclude: [],
    },
  },
})
