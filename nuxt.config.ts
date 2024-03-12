// https://nuxt.com/docs/api/configuration/nuxt-config
// @ts-ignore
export default defineNuxtConfig({
    app: {
        baseURL: '/',
        head: {
            charset: 'utf-8',
            viewport: 'width=device-width, initial-scale=1',
        },
        buildAssetsDir: 'assets',
        pageTransition: {name: 'page', mode: 'out-in'}
    },
    modules: [
        // '@sidebase/nuxt-auth',
        '@nuxtjs/tailwindcss',
        'nuxt-snackbar'
    ],
    snackbar: {
        top: true,
        right: true,
        duration: 5000
    },
    // css: ['~/assets/css/main.css'],
    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {},
        },
    },
    devtools: {enabled: true}
})
