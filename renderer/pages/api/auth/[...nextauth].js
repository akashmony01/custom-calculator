import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient()

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "username",
          type: "text",
          placeholder: "example123",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          if (!credentials?.password || !credentials?.username) {
            return null
          }

          const user = await prisma.tbl_Admin.findFirst({
            where: {
              username: credentials?.username,
            },
          })

          if (!user) {
            return null
          }

          if (credentials.password !== user.password) {
            return null
          }

          await prisma.$disconnect()

          return {
            id: user.id,
          }
        } catch (error) {
          console.log(error)

          return null
        }
      },
    }),
  ],
  jwt: {
    secret: process.env.NEXTAUTH_JWT_SECRET,
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.id = user.id
        token.username = user.username
      }

      return token
    },
    session: async ({ session, token }) => {
      if (token) {
        session.id = token.id
        session.username = token.username
      }

      return session
    },
  },
  pages: {
    signIn: "/signin",
    error: "/signin",
  },
})
