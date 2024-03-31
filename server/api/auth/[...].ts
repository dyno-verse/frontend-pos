import CredentialsProvider from 'next-auth/providers/credentials'
import {NuxtAuthHandler} from '#auth'

export default NuxtAuthHandler({
    secret: "679D6A5F47765D7E",
    pages: {
        signIn: '/login',
        signOut: '/login',
    },
    callbacks: {
        // Callback when the JWT is created / updated, see https://next-auth.js.org/configuration/callbacks#jwt-callback
        jwt: async ({token, user}) => {
            const isSignIn = !!user;
            if (isSignIn) {
                token.jwt = user ? (user as any).access_token || 'a' : 'b';
                token.id = user ? user.id || '' : '';
                token.role = user ? (user as any).role || '' : '';
                token.businessId = user ? (user as any).businessId || '' : '';
            }
            return Promise.resolve(token);
        },
        // Callback whenever session is checked, see https://next-auth.js.org/configuration/callbacks#session-callback
        session: async ({session, token}) => {
            (session as any).role = token.role;
            (session as any).access_token = token.jwt;
            (session as any).businessId = token.businessId;
            return Promise.resolve(session);
        },
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
                    // return data
                    return {
                        name: data.firstName + " " + data.lastName,
                        email: data.email,
                        access_token: data.accessToken,
                        role: data.role,
                        businessId: data.businesses[0].id
                    };
                }
                else {
                    throw createError({
                        statusCode: 403,
                        statusMessage: "Credentials not working",
                    });
                }
            }
        })
    ]
})
