"use server"

import { cookies } from "next/headers"
import { sql } from "@/lib/db"
import { redirect } from "next/navigation"
import type { SessionUser } from "@/lib/types"

const SESSION_COOKIE_NAME = "mysa_session"
const SESSION_DURATION_MS = 7 * 24 * 60 * 60 * 1000 // 7 days

export async function createSession(employeeId: string): Promise<string> {
  const token = crypto.randomUUID() + "-" + crypto.randomUUID()
  const expiresAt = new Date(Date.now() + SESSION_DURATION_MS).toISOString()

  await sql`
    INSERT INTO sessions (employee_id, token, expires_at)
    VALUES (${employeeId}, ${token}, ${expiresAt})
  `

  const cookieStore = await cookies()
  cookieStore.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_DURATION_MS / 1000,
  })

  return token
}

export async function getSession(): Promise<SessionUser | null> {
  const cookieStore = await cookies()
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value

  if (!token) return null

  const rows = await sql`
    SELECT 
      e.id,
      e.email,
      e.first_name,
      e.last_name,
      e.is_admin,
      e.photo_url,
      e.job_title
    FROM sessions s
    JOIN employees e ON e.id = s.employee_id
    WHERE s.token = ${token}
      AND s.expires_at > NOW()
  `

  if (rows.length === 0) return null

  return rows[0] as SessionUser
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

export async function destroySession(): Promise<void> {
  const cookieStore = await cookies()
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value

  if (token) {
    await sql`DELETE FROM sessions WHERE token = ${token}`
  }

  cookieStore.delete(SESSION_COOKIE_NAME)
}
