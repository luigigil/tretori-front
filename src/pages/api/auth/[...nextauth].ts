/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios'
import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'

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
      if (process.env.RUNNING_TEST) {
        return {
          name: 'dev-admin@tretori.com',
          email: 'dev-admin@tretori.com',
          role: 'admin',
          token:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImRldi1hZG1pbkB0cmV0b3JpLmNvbSIsInN1YiI6OCwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjY1NjczNzY2LCJleHAiOjE2NjU2NzM4MjZ9.P8HjNf5LVv83kZCPH6Cxq0PEZ-CSFZm6WfKgSXhu-_I',
        }
      }

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

        const userData = response.data
        const user = {
          id: userData.id,
          name: userData.username,
          email: userData.username,
          role: userData.role,
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
    }
    return session
  },
}

export default NextAuth({
  providers,
  callbacks,
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
  },
  jwt: {
    secret: 'INp8IvdIyeMcoGAgFGoA61DdBglwwSqnXJZkgz8PSnw',
  },
  debug: process.env.NODE_ENV !== 'production',
})
