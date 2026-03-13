"use server"

import { sql } from "@/lib/db"
import { createSession, destroySession } from "@/lib/auth"
import { redirect } from "next/navigation"

export async function loginAction(
  _prevState: { error?: string; success?: boolean } | null,
  formData: FormData
): Promise<{ error?: string; success?: boolean }> {
  const email = formData.get("email") as string

  if (!email) {
    return { error: "Email is required." }
  }

  const normalizedEmail = email.toLowerCase().trim()

  // Only allow @getmysa.com emails
  if (!normalizedEmail.endsWith("@getmysa.com")) {
    return { error: "Please use your @getmysa.com email address." }
  }

  const rows = await sql`
    SELECT id FROM employees WHERE email = ${normalizedEmail}
  `

  if (rows.length === 0) {
    return { error: "No account found for this email. Please contact the P&C team." }
  }

  await createSession(rows[0].id)
  return { success: true }
}

export async function logoutAction(): Promise<void> {
  await destroySession()
  redirect("/login")
}
