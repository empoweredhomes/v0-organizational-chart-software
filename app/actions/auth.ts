"use server"

import { sql } from "@/lib/db"
import { createSession, destroySession } from "@/lib/auth"
import { redirect } from "next/navigation"
import bcrypt from "bcryptjs"

export async function loginAction(
  _prevState: { error: string } | null,
  formData: FormData
): Promise<{ error: string } | null> {
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  if (!email || !password) {
    return { error: "Email and password are required." }
  }

  const rows = await sql`
    SELECT id, password_hash FROM employees WHERE email = ${email.toLowerCase().trim()}
  `

  if (rows.length === 0) {
    return { error: "Invalid email or password." }
  }

  const employee = rows[0]

  if (!employee.password_hash) {
    return { error: "Account not set up. Please contact the P&C team." }
  }

  const valid = await bcrypt.compare(password, employee.password_hash)
  if (!valid) {
    return { error: "Invalid email or password." }
  }

  await createSession(employee.id)
  redirect("/org-chart")
}

export async function logoutAction(): Promise<void> {
  await destroySession()
  redirect("/login")
}
