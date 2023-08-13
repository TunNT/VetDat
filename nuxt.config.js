import { resolve } from 'path'
export default {
    render: {
        csp: {
            hashArgorism: 'sha256',
            policies: {
                'script-src': [
                    "'sha256-4RS22DYeB7U14dra4KcQYxmwt5HkOInieXK1NUMBmQI='" // this line resolves the violation
                ]
            }
        }
    },
    ssr: false,
    target: 'static',
    // Global page headers: https://go.nuxtjs.dev/config-head
    head: {
        title: 'VetDat',
        htmlAttrs: {
            lang: 'en'
        },
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: '' }
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: 'logos.jpg' }
        ]
    },

    // Global CSS: https://go.nuxtjs.dev/config-css
    css: [
        'element-ui/lib/theme-chalk/index.css',
        '~/assets/css/main.css',
        '~/assets/css/main.scss'
    ],

    // Alias directory
    alias: {
        '@components': resolve(__dirname, './components'),
    },

    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    plugins: [
        '@/plugins/element-ui',
        '~/plugins/axios',
        '~/plugins/filters',
        '~/plugins/helpers',
        { src: '~/plugins/notifications.js', ssr: false },
    ],

    router: {
        middleware:['isValidToken','isValidTokenSite'],
    },
    // Auto import components: https://go.nuxtjs.dev/config-components
    components: true,

    // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
    buildModules: [],

    // Modules: https://go.nuxtjs.dev/config-modules
    modules: [
        'bootstrap-vue/nuxt',
        '@nuxtjs/axios'
    ],

    axios: {
        proxy: true,
        baseURL: process.env.API_BASE_URL,
        https: process.env.NODE_ENV === 'production' ? true : false,
        credentials: true,
        retry: { retries: 3 },
        common: {
            'Accept': 'application/json, text/plain, */*',
            'Content-type': 'application/json'
        }
    },


    // Build Configuration: https://go.nuxtjs.dev/config-build
    build: {
        transpile: [/^element-ui/],
        babel: {
            compact: true //https://github.com/bootstrap-vue/bootstrap-vue/issues/5627
        }
    },

    vue: {
        config: {
            productionTip: false,
            devtools: process.env.NODE_ENV != 'production'
        }
    },

    server: {
        host: '0',
        port: 8000
    },

    proxy: {
        '/admin': {
            target: process.env.API_BASE_URL,
            //target: process.env.NODE_ENV === 'production' ? process.env.API_BASE_URL : 'http://localhost:3000',
            pathRewrite: { '^/admin': '/api-admin' },
        },
        '/shop': {
            target: process.env.API_BASE_URL,
            //target: process.env.NODE_ENV === 'production' ? process.env.API_BASE_URL : 'http://localhost:3000',
            pathRewrite: { '^/shop': '/api-site' },
        },
    }

}