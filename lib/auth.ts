import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { headers } from "next/headers"
import { sql } from "@/lib/db"
import { isPreviewEnvironment } from "@/lib/env"
import type { SessionUser } from "@/lib/types"

// Default admin user for preview environments
async function getDefaultPreviewUser(): Promise<SessionUser> {
  const rows = await sql`
    SELECT e.id, e.first_name, e.last_name, e.email, e.job_title, e.photo_url, e.is_admin
    FROM employees e
    WHERE e.email = 'ameerah@getmysa.com'
    LIMIT 1
  `
  if (rows.length > 0) {
    return rows[0] as SessionUser
  }
  return {
    id: "",
    first_name: "Preview",
    last_name: "User",
    email: "preview@getmysa.com",
    job_title: "Preview Mode",
    photo_url: null,
    is_admin: true,
  }
}

export async function getSession(): Promise<SessionUser | null> {
  // Check for preview environment
  const headersList = await headers()
  const host = headersList.get("host") || ""
  
  if (isPreviewEnvironment(host)) {
    return getDefaultPreviewUser()
  }

  const session = await auth()
  
  if (!session?.user) return null

  return {
    id: session.user.employeeId,
    email: session.user.email || "",
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
