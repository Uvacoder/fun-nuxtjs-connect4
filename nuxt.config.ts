// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: [
        '@nuxtjs/supabase',
        '@vueuse/nuxt',
        'nuxt-icon'
    ],

    css: [
        '~/assets/scss/reset.scss',
        '~/assets/scss/root.scss',
    ]
})
