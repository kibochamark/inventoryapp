
import Credentials from "next-auth/providers/credentials"
import NextAuth from "next-auth"
import axios from "axios"
// Your own logic for dealing with plaintext password strings; be careful!


import type { NextAuthConfig } from "next-auth"


export default {
    providers: [
        Credentials({
            // You can specify which fields should be submitted, by adding keys to the `credentials` object.
            // e.g. domain, username, password, 2FA token, etc.
            credentials: {
                email: {label:"email", type:"email", required:true},
                password: {label:"password", type:"password", required:true},
            },
            authorize: async (credentials) => {
                console.log(credentials,"cred")
                let user = null

                const res = await axios.post(process.env.BASE_URL! + "login", {
                    email:credentials.email,
                    password:credentials.password
                })

                if(res.status === 200){
                    user=res.data
                }

                // return user object with their profile data
                return user
            },
        }),
    ]
} satisfies NextAuthConfig