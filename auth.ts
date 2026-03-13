import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import { sql } from "@/lib/db"

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  pages: {
    signIn: "/login",
    error: "/login",
  },
  callbacks: {
    async signIn({ user, account }) {
      if (!user.email) return false
      
      // Only allow @getmysa.com emails
      if (!user.email.endsWith("@getmysa.com")) {
        return "/login?error=InvalidDomain"
      }

      // Check if employee exists in database
      const rows = await sql`
        SELECT id, is_admin FROM employees WHERE email = ${user.email.toLowerCase()}
      `

      if (rows.length === 0) {
        return "/login?error=NotFound"
      }

      return true
    },
    async jwt({ token, user, account }) {
      if (account && user?.email) {
        // Fetch employee data on initial sign in
        const rows = await sql`
          SELECT id, first_name, last_name, email, job_title, photo_url, is_admin
          FROM employees WHERE email = ${user.email.toLowerCase()}
        `
        if (rows.length > 0) {
          const employee = rows[0]
          token.employeeId = employee.id
          token.firstName = employee.first_name
          token.lastName = employee.last_name
          token.isAdmin = employee.is_admin
          token.photoUrl = employee.photo_url
          token.jobTitle = employee.job_title
        }
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.employeeId = token.employeeId as string
        session.user.firstName = token.firstName as string
        session.user.lastName = token.lastName as string
        session.user.isAdmin = token.isAdmin as boolean
        session.user.photoUrl = token.photoUrl as string | null
        session.user.jobTitle = token.jobTitle as string
      }
      return session
    },
  },
})
