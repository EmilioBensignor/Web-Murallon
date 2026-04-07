import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  ssr: false,
  css: ['~/assets/css/main.css'],
  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: {
      include: ['@vue/devtools-core', '@vue/devtools-kit']
    }
  },
  modules: [
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxtjs/seo',
    '@nuxtjs/supabase'
  ],
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes',
      htmlAttrs: { lang: 'es' },
      meta: [
        { name: 'format-detection', content: 'telephone-no' },
        { name: 'theme-color', content: '#ffffff' },
        { name: 'mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'default' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'apple-touch-icon', href: '/images/Logo-Murallon.svg' },
        { rel: 'preconnect', href: 'https://fxytgajevhfuzwlyaorb.supabase.co' }
      ]
    }
  },
  runtimeConfig: {
    public: {
      siteUrl: 'https://www.murallon.com.ar/',
      googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY,
      supabase: {
        url: process.env.SUPABASE_URL
      }
    }
  },
  site: {
    url: 'https://www.murallon.com.ar/',
    name: 'Murallón',
    description: 'Murallón — soluciones innovadoras en almacenamiento y tratamiento del agua. Tanques, accesorios y asesoramiento técnico en Argentina.',
    defaultLocale: 'es'
  },
  seo: {
    fallbackTitle: false,
    redirectToCanonicalSiteUrl: false
  },
  fonts: {
    defaults: {
      weights: [300, 400, 500, 600, 700, 800]
    }
  },
  icon: {
    provider: 'iconify',
    collections: ['material-symbols']
  },
  image: {
    format: ['webp']
  },
  ogImage: {
    enabled: false
  },
  schemaOrg: {
    enabled: false
  },
  supabase: {
    redirect: false
  }
})
