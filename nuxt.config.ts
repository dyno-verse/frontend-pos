import {resolve} from "node:path"

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
    devtools: {enabled: true},
    modules: [
        // '@sidebase/nuxt-auth',
        '@nuxtjs/tailwindcss',
        'nuxt-snackbar'
    ],
    snackbar: {
        bottom: true,
        right: true,
        duration: 5000
    }
    // auth: {
    //     // origin: process.env.ORIGIN,
    //     isEnabled: true,
    //     // globalAppMiddleware: true,
    //     origin: 'https://business.dynomenu.com',
    // }
    ,
    css: ['~/assets/css/main.css'],
    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {},
        },
    },
    // colorMode: {
    //     preference: 'system', // default value of $colorMode.preference
    //     fallback: 'light', // fallback value if not system preference found
    //     // hid: 'nuxt-color-mode-script',
    //     // globalName: '__NUXT_COLOR_MODE__',
    //     // componentName: 'ColorScheme',
    //     // classPrefix: '',
    //     classSuffix: '',
    //     storageKey: 'nuxt-color-mode'
    // }
  ssr: false
})
