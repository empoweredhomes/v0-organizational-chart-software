"use client"

import { useActionState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { loginAction } from "@/app/actions/auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, Building2 } from "lucide-react"

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState(loginAction, null)
  const router = useRouter()

  useEffect(() => {
    if (state?.success) {
      router.push("/org-chart")
    }
  }, [state, router])

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="flex flex-col items-center gap-8 w-full max-w-sm">
        <div className="flex flex-col items-center gap-2">
          <div className="flex items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
              <Building2 className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-2xl font-semibold tracking-tight text-foreground font-sans">
              Mysa OrgChart
            </span>
          </div>
          <p className="text-sm text-muted-foreground font-sans">
            Sign in to access the organizational chart
          </p>
        </div>

        <Card className="w-full border border-border">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-sans">Sign in</CardTitle>
            <CardDescription className="font-sans">
              Enter your Mysa email and password
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form action={formAction} className="flex flex-col gap-4">
              {state?.error && (
                <div className="flex items-center gap-2 rounded-md bg-destructive/10 px-3 py-2.5 text-sm text-destructive font-sans">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  {state.error}
                </div>
              )}
              <div className="flex flex-col gap-2">
                <Label htmlFor="email" className="font-sans">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@getmysa.com"
                  required
                  autoComplete="email"
                  className="font-sans"
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="password" className="font-sans">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  required
                  autoComplete="current-password"
                  className="font-sans"
                />
              </div>
              <Button type="submit" disabled={isPending} className="w-full font-sans">
                {isPending ? "Signing in..." : "Sign in"}
              </Button>
            </form>
          </CardContent>
        </Card>

        <p className="text-xs text-muted-foreground text-center font-sans">
          Default password for all employees: <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">mysa2026</code>
        </p>
      </div>
    </div>
  )
}
