import CredentialsProvider from 'next-auth/providers/credentials'
import {NuxtAuthHandler} from '#auth'

// export default NuxtAuthHandler({
//     // a) Never hardcode your secret in your code!! and b) use a secure secret, `test-123` is **not** secure!!
//     secret: "679D6A5F47765D7E",
//     pages: {
//         // Change the default behavior to use `/login` as the path for the sign-in page
//         signIn: '/login',
//         signOut: '/login',
//     },
//     providers: [
//         // @ts-expect-error
//         CredentialsProvider.default({
//             // The name to display on the signin form (e.g. 'Sign in with...')
//             name: 'Credentials',
//             // The credentials  used to generate a suitable form on the sign in page.
//             // You can specify whatever fields you are expecting to be submitted.
//             // e.g. domain, username, password, 2FA token, etc.
//             // You can pass any HTML attribute to the <input> tag through the object.
//             credentials: {
//                 username: {label: 'Username', type: 'text', placeholder: '(hint: jsmith)'},
//                 password: {label: 'Password', type: 'password', placeholder: '(hint: hunter2)'}
//             },
//             async authorize(credentials: any) {
//                 // You need to provide your own logic here that takes the credentials
//                 // submitted and returns either a object representing a user or value
//                 // that is false/null if the credentials are invalid.
//                 // NOTE: THE BELOW LOGIC IS NOT SAFE OR PROPER FOR AUTHENTICATION!
//
//                 const {data, pending} = await $fetch('/login', {
//                     method: 'POST',
//                     body: {
//                         email: credentials.username,
//                         password: credentials.password
//                     },
//                     headers: {
//                         'Accept': 'application/json',
//                     },
//                     baseURL: "https://api.dynomenu.com/",
//                 })
//                 const token = {id: '1', token: 'J Smith'}
//                 if (data) {
//                     token.token = data.token
//                     // window.localStorage.setItem('token', data.token)
//                     return token
//                 }
//
//                 return null
//
//             }
//         })
//     ]
// })
