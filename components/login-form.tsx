"use client"

import { useActionState } from "react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { loginAction } from "@/app/actions/auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Building2, AlertCircle } from "lucide-react"

export function LoginForm() {
  const router = useRouter()
  const [state, formAction, isPending] = useActionState(loginAction, null)

  useEffect(() => {
    if (state?.success) {
      router.push("/org-chart")
    }
  }, [state?.success, router])

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
              Enter your Mysa email to continue
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
                  className="font-sans"
                />
              </div>
              <Button type="submit" className="w-full font-sans" disabled={isPending}>
                {isPending ? "Signing in..." : "Sign in"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
