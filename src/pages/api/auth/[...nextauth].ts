/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios'
import jwtDecode from 'jwt-decode'
import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'

function parseJwt(token: string): any {
  if (!token) {
    return
  }

  return jwtDecode(token)
}

const providers = [
  Credentials({
    // The name to display on the sign in form (e.g. "Sign in with...")
    name: 'Credentials',
    // The credentials is used to generate a suitable form on the sign in page.
    // You can specify whatever fields you are expecting to be submitted.
    // e.g. domain, username, password, 2FA token, etc.
    // You can pass any HTML attribute to the <input> tag through the object.
    credentials: {
      username: { label: 'Username', type: 'text', placeholder: 'jsmith' },
      password: { label: 'Password', type: 'password' },
    },
    async authorize(credentials) {
      try {
        const response = await axios.request({
          method: 'POST',
          url: 'auth/login',
          baseURL: process.env.NEXT_PUBLIC_BASE_URL,
          data: {
            username: credentials?.username,
            password: credentials?.password,
          },
        })

        if (!response.data.access_token) {
          throw new Error('Token was not sent')
        }
        const decoded = parseJwt(response.data.access_token)

        const user = {
          name: decoded.username,
          email: decoded.username,
          role: decoded.role,
          token: response.data.access_token,
        }

        return user
      } catch (error) {
        throw new Error('Invalid credentials')
      }
    },
  }),
]

const callbacks = {
  async jwt({ token, user }: any) {
    // Persist the OAuth access_token to the token right after signin
    if (user) {
      token.accessToken = user.token
      token.role = user.role
    }
    return token
  },
  async session({ session, token }: any) {
    // Send properties to the client, like an access_token from a provider.
    if (token) {
      session.accessToken = token.accessToken
      session.role = token.role
    }
    return session
  },
}

export default NextAuth({
  providers,
  callbacks,
  pages: {
    error: '/login',
    signIn: '/login',
    signOut: '/login',
  },
  session: {
    strategy: 'jwt',
    // Seconds - How long until an idle session expires and is no longer valid.
    // maxAge: 30 * 24 * 60 * 60, // 30 days

    // Seconds - Throttle how frequently to write to database to extend a session.
    // Use it to limit write operations. Set to 0 to always update the database.
    // Note: This option is ignored if using JSON Web Tokens
    // updateAge: 24 * 60 * 60, // 24 hours
  },
})
