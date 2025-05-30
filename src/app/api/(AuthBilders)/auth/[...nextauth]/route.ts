import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GitHubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import fs from 'fs/promises'
import bcrypt from 'bcrypt';
import path from 'path'
import { User } from "@/app/lib/(AuthBilders)/defintions"

const getUsers = async (): Promise<User[]> => {
  const filePath = path.join(process.cwd(), '/src/app/lib/(AuthBilders)/data/users.json')
  const data = await fs.readFile(filePath, 'utf8')
  return JSON.parse(data)
}

const time_seconds = 60 * 60 * 1 // 1 hour

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        const users = await getUsers()
        const user = users.find(u => u.email === credentials?.email)
        if (!user || !user.password) return null

        const valid = await bcrypt.compare(credentials!.password, user.password)
        if (!valid) return null
        return { id: user.email || "", email: user.email, expires: 60 * 60 * 1 }
      }
    })
  ],
  session: {
    strategy: 'jwt',
    maxAge: time_seconds
  },
  jwt: {
    maxAge: time_seconds
  },
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.exp = Math.floor(Date.now() / 1000) + time_seconds // Set expiration time
      }
      return token
    },
    async session({ session, token }) {
      session.expires = token.exp as string
      return {
        ...session,
        user: {
          ...session.user,
          email: token.email || null,
          name: token.name || null,
          image: token.picture || null,
          email_verified: token.email_verified || false
        } as User
      }
    }
  },
  pages: {
    signIn: '/login'
  },
  secret: process.env.NEXTAUTH_SECRET
})

export { handler as GET, handler as POST }