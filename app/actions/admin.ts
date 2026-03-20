"use server"

import { sql } from "@/lib/db"
import { revalidatePath } from "next/cache"
import bcrypt from "bcryptjs"
import { requireAdmin } from "@/lib/auth"

export async function createEmployee(formData: FormData) {
  // Require admin authentication
  const admin = await requireAdmin()

  const firstName = formData.get("first_name") as string
  const lastName = formData.get("last_name") as string
  const email = formData.get("email") as string
  const jobTitle = formData.get("job_title") as string
  const departmentId = formData.get("department_id") as string | null
  const managerId = formData.get("manager_id") as string | null
  const location = (formData.get("location") as string) || "Mysa HQ"
  const employmentType = (formData.get("employment_type") as string) || "Full-Time"
  const startDate = formData.get("start_date") as string | null
  const bio = formData.get("bio") as string | null
  const interests = formData.get("interests") as string | null
  const namePronunciation = formData.get("name_pronunciation") as string | null
  const phone = formData.get("phone") as string | null
  const isAdmin = formData.get("is_admin") === "on"
  const photoUrl = (formData.get("photo_url") as string) || null

  // Default password
  const passwordHash = await bcrypt.hash("mysa2026", 10)

  const rows = await sql`
    INSERT INTO employees (
      first_name, last_name, email, job_title, department_id, manager_id,
      location, employment_type, start_date, bio, interests, name_pronunciation,
      phone, is_admin, password_hash, photo_url
    ) VALUES (
      ${firstName}, ${lastName}, ${email.toLowerCase().trim()}, ${jobTitle},
      ${departmentId || null}, ${managerId || null},
      ${location}, ${employmentType}, ${startDate || null},
      ${bio || null}, ${interests || null}, ${namePronunciation || null},
      ${phone || null}, ${isAdmin}, ${passwordHash}, ${photoUrl}
    )
    RETURNING id
  `

  // Audit log
  await sql`
    INSERT INTO audit_log (action, entity_type, entity_id, changed_by, changes)
    VALUES ('create', 'employee', ${rows[0].id}, ${admin.id}, ${JSON.stringify({ first_name: firstName, last_name: lastName, email })}::jsonb)
  `

  revalidatePath("/admin/employees")
  revalidatePath("/directory")
  revalidatePath("/org-chart")
}

export async function updateEmployee(employeeId: string, formData: FormData) {
  // Require admin authentication
  const admin = await requireAdmin()

  const firstName = formData.get("first_name") as string
  const lastName = formData.get("last_name") as string
  const email = formData.get("email") as string
  const jobTitle = formData.get("job_title") as string
  const departmentId = formData.get("department_id") as string | null
  const managerId = formData.get("manager_id") as string | null
  const location = (formData.get("location") as string) || "Mysa HQ"
  const employmentType = (formData.get("employment_type") as string) || "Full-Time"
  const startDate = formData.get("start_date") as string | null
  const bio = formData.get("bio") as string | null
  const interests = formData.get("interests") as string | null
  const namePronunciation = formData.get("name_pronunciation") as string | null
  const phone = formData.get("phone") as string | null
  const isAdmin = formData.get("is_admin") === "on"
  const isOnLeave = formData.get("is_on_leave") === "on"
  const leaveNote = formData.get("leave_note") as string | null
  const photoUrl = (formData.get("photo_url") as string) || null

  await sql`
    UPDATE employees SET
      first_name = ${firstName},
      last_name = ${lastName},
      email = ${email.toLowerCase().trim()},
      job_title = ${jobTitle},
      department_id = ${departmentId || null},
      manager_id = ${managerId || null},
      location = ${location},
      employment_type = ${employmentType},
      start_date = ${startDate || null},
      bio = ${bio || null},
      interests = ${interests || null},
      name_pronunciation = ${namePronunciation || null},
      phone = ${phone || null},
      is_admin = ${isAdmin},
      is_on_leave = ${isOnLeave},
      leave_note = ${leaveNote || null},
      photo_url = ${photoUrl},
      updated_at = NOW()
    WHERE id = ${employeeId}
  `

  await sql`
    INSERT INTO audit_log (action, entity_type, entity_id, changed_by, changes)
    VALUES ('update', 'employee', ${employeeId}, ${admin.id}, ${JSON.stringify({ first_name: firstName, last_name: lastName, email })}::jsonb)
  `

  revalidatePath("/admin/employees")
  revalidatePath("/directory")
  revalidatePath("/org-chart")
  revalidatePath(`/profile/${employeeId}`)
}

export async function deleteEmployee(employeeId: string) {
  // Require admin authentication
  const admin = await requireAdmin()

  // Get employee info before delete
  const rows = await sql`SELECT first_name, last_name, email FROM employees WHERE id = ${employeeId}`
  if (rows.length === 0) return

  // Remove manager references
  await sql`UPDATE employees SET manager_id = NULL WHERE manager_id = ${employeeId}`

  await sql`DELETE FROM employees WHERE id = ${employeeId}`

  await sql`
    INSERT INTO audit_log (action, entity_type, entity_id, changed_by, changes)
    VALUES ('delete', 'employee', ${employeeId}, ${admin.id}, ${JSON.stringify(rows[0])}::jsonb)
  `

  revalidatePath("/admin/employees")
  revalidatePath("/directory")
  revalidatePath("/org-chart")
}
