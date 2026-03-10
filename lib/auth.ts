import { auth } from "@/auth"
import { redirect } from "next/navigation"
import type { SessionUser } from "@/lib/types"

export async function getSession(): Promise<SessionUser | null> {
  const session = await auth()
  
  if (!session?.user) return null

  return {
    id: session.user.employeeId,
    email: session.user.email,
    first_name: session.user.firstName,
    last_name: session.user.lastName,
    is_admin: session.user.isAdmin,
    photo_url: session.user.photoUrl,
    job_title: session.user.jobTitle,
  }
}

export async function requireSession(): Promise<SessionUser> {
  const user = await getSession()
  if (!user) redirect("/login")
  return user
}

export async function requireAdmin(): Promise<SessionUser> {
  const user = await requireSession()
  if (!user.is_admin) redirect("/org-chart")
  return user
}
