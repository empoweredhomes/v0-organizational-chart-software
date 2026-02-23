import bcrypt from "bcryptjs";
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL);

// Check what email Ameerah has in the database
const employees = await sql`SELECT id, first_name, last_name, email, password_hash FROM employees WHERE email ILIKE '%ameerah%' LIMIT 5`;
console.log("Ameerah records:", JSON.stringify(employees, null, 2));

// Test bcrypt comparison
if (employees.length > 0 && employees[0].password_hash) {
  const match = bcrypt.compareSync("mysa2026", employees[0].password_hash);
  console.log("Password 'mysa2026' matches:", match);
}

// Also check total employees with password_hash set
const counts = await sql`SELECT COUNT(*) as total, COUNT(password_hash) as with_hash FROM employees`;
console.log("Employee counts:", counts);
