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
  callbacks: {
    async signIn({ user, account, profile }) {
      // Only allow @getmysa.com emails
      const email = user.email?.toLowerCase()
      if (!email?.endsWith("@getmysa.com")) {
        return false
      }

      // Check if user exists in employees table
      const rows = await sql`
        SELECT id, is_admin FROM employees WHERE LOWER(email) = ${email}
      `

      if (rows.length === 0) {
        // User not in employee database - deny access
        return false
      }

      return true
    },
    async jwt({ token, user, account, profile }) {
      if (account && user?.email) {
        // Fetch employee data on first sign in
        const email = user.email.toLowerCase()
        const rows = await sql`
          SELECT id, first_name, last_name, email, job_title, photo_url, is_admin
          FROM employees 
          WHERE LOWER(email) = ${email}
        `

        if (rows.length > 0) {
          const employee = rows[0]
          token.employeeId = employee.id
          token.firstName = employee.first_name
          token.lastName = employee.last_name
          token.email = employee.email
          token.jobTitle = employee.job_title
          token.photoUrl = employee.photo_url
          token.isAdmin = employee.is_admin
        }
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.employeeId = token.employeeId as string
        session.user.firstName = token.firstName as string
        session.user.lastName = token.lastName as string
        session.user.email = token.email as string
        session.user.jobTitle = token.jobTitle as string
        session.user.photoUrl = token.photoUrl as string | null
        session.user.isAdmin = token.isAdmin as boolean
      }
      return session
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
})
