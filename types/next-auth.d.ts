import { DefaultSession } from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      employeeId: string
      firstName: string
      lastName: string
      isAdmin: boolean
      photoUrl: string | null
      jobTitle: string
    } & DefaultSession["user"]
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    employeeId?: string
    firstName?: string
    lastName?: string
    isAdmin?: boolean
    photoUrl?: string | null
    jobTitle?: string
  }
}
