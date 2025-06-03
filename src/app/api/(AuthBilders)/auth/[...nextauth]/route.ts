import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GitHubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import bcrypt from 'bcrypt';
import { User } from "@/app/lib/(AuthBilders)/defintions"
import { getAllUsers } from "@/app/lib/(AuthBilders)/dal/queries"

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
        const users = await getAllUsers()
        const user = users.find(u => u.email === credentials?.email)
        if (!user || !user.password) return null

        const valid = await bcrypt.compare(credentials!.password, user.password)
        if (!valid) return null
        return {
          id: user.id || "",
          email: user.email,
          name: user.name,
          email_verified: user.email_verified,
        };
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
    async jwt({ token, account, user }) {
      if (user) {
        token.id = user.id;
        token.email_verified = (user as User).email_verified;
      }

      if (account) {
        token.accessToken = account.access_token;
        token.provider = account.provider;
      }
      return token;
    },
    async session({ session, token }) {
      session.expires = token.exp as string
      const provider = token.provider;
      session.user = {
        id: token.id,
        provider,
        access_token: token.accessToken,
        name: token.name,
        email: token.email,
        image: token.picture,
        email_verified: (provider === "credentials") ? token.email_verified : true,
      } as User;
      return session;
    }
  },
  pages: {
    signIn: '/login'
  },
  secret: process.env.NEXTAUTH_SECRET
})

export { handler as GET, handler as POST }