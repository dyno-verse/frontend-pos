import {resolve} from "node:path"

// https://nuxt.com/docs/api/configuration/nuxt-config
// @ts-ignore
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
    routeRules: {
        '/': {redirect: '/login'},
    },
    devtools: {enabled: true},
    modules: [
        '@nuxtjs/tailwindcss',
        'nuxt-snackbar',
        '@sidebase/nuxt-auth',
        'nuxt-primevue'
    ],
    snackbar: {
        bottom: true,
        right: true,
        duration: 5000
    },
    auth: {
        // origin: process.env.ORIGIN,
        isEnabled: true,
        globalAppMiddleware: true,
        origin: 'https://business.dynomenu.com',
        // provider: {
        //     type: 'local',
        //     endpoints: {
        //         getSession: {path: '/user/profile', method: 'get'}
        //     },
        //     token: {
        //         signInResponseTokenPointer: '/accessToken'
        //     },
        //     sessionDataType: {}
        // }
    },
    css: ['~/assets/css/main.css', 'primevue/resources/themes/aura-light-green/theme.css'],
    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {},
        },
    },
    ssr: false
})
