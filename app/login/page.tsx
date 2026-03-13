// Email-based login page
import { redirect } from "next/navigation"
import { getSession } from "@/lib/auth"
import { LoginForm } from "@/components/login-form"

export default async function LoginPage() {
  const session = await getSession()

  // If already logged in, redirect to org chart
  if (session) {
    redirect("/org-chart")
  }

  return <LoginForm />
}
