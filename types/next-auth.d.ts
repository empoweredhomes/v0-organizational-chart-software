import "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      employeeId: string
      firstName: string
      lastName: string
      email: string
      jobTitle: string
      photoUrl: string | null
      isAdmin: boolean
    }
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    employeeId?: string
    firstName?: string
    lastName?: string
    email?: string
    jobTitle?: string
    photoUrl?: string | null
    isAdmin?: boolean
  }
}
