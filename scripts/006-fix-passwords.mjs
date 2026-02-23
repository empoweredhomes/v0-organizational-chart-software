import bcrypt from "bcryptjs"
import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL)

const hash = await bcrypt.hash("mysa2026", 10)
console.log("[v0] Generated bcrypt hash for 'mysa2026':", hash)

await sql`UPDATE employees SET password_hash = ${hash}`
console.log("[v0] Updated all employee passwords")

// Verify it works
const rows = await sql`SELECT email, password_hash FROM employees WHERE email = 'ameerah@getmysa.com'`
if (rows.length > 0) {
  const valid = await bcrypt.compare("mysa2026", rows[0].password_hash)
  console.log("[v0] Verification for ameerah@getmysa.com - password matches:", valid)
}
