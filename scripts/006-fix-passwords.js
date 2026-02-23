import bcrypt from "bcryptjs";
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL);
const hash = bcrypt.hashSync("mysa2026", 10);
console.log("Generated hash:", hash);

const result = await sql`UPDATE employees SET password_hash = ${hash}`;
console.log("Updated employees:", result);
