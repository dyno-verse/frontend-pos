import CredentialsProvider from 'next-auth/providers/credentials'
import {NuxtAuthHandler} from '#auth'

export default NuxtAuthHandler({
    secret: "679D6A5F47765D7E",
    pages: {
        signIn: '/login',
        signOut: '/login',
    },
    providers: [
        // @ts-expect-error
        CredentialsProvider.default({
            name: 'Credentials',
            credentials: {
                email: {label: 'Email', type: 'text'},
                password: {label: 'Password', type: 'password'}
            },
            async authorize(credentials: any) {

                const {data, pending} = await $fetch('/auth/email', {
                    method: 'POST',
                    body: {
                        email: credentials.email,
                        password: credentials.password
                    },
                    headers: {
                        'Accept': 'application/json',
                    },
                    baseURL: "https://api.dynomenu.com/",
                })

                if (data) {
                    // console.log(data)
                    // token.token = data.token
                    data.token = "djdjdjdjdjdjdd"
                    data.email = "vim@gmail.com"
                    return data
                }

                return null

            }
        })
    ]
})
