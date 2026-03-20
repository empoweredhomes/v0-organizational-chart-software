import { redirect } from "next/navigation"
import { headers } from "next/headers"
import { auth, signIn } from "@/auth"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Building2 } from "lucide-react"
import { isPreviewEnvironment, isServerPreview } from "@/lib/env"

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>
}) {
  // Bypass login in preview environments (check both hostname and env vars)
  const headersList = await headers()
  const host = headersList.get("host") || ""
  if (isPreviewEnvironment(host) || isServerPreview()) {
    redirect("/org-chart")
  }

  const session = await auth()
  const params = await searchParams

  if (session) {
    redirect("/org-chart")
  }

  const errorMessages: Record<string, string> = {
    InvalidDomain: "Please use your @getmysa.com email address.",
    NotFound: "No account found for this email. Please contact the P&C team.",
    Default: "An error occurred. Please try again.",
  }

  const error = params.error ? errorMessages[params.error] || errorMessages.Default : null

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 p-4">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center gap-2 mb-8">
          <div className="h-12 w-12 rounded-xl bg-primary flex items-center justify-center">
            <Building2 className="h-6 w-6 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-semibold font-sans">Mysa OrgChart</h1>
          <p className="text-muted-foreground text-sm font-sans">
            Sign in to access the organizational chart
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="font-sans">Sign in</CardTitle>
            <CardDescription className="font-sans">
              Use your Mysa Google account to continue
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            {error && (
              <div className="p-3 text-sm text-destructive bg-destructive/10 rounded-md font-sans">
                {error}
              </div>
            )}
            <form
              action={async () => {
                "use server"
                await signIn("google", { redirectTo: "/org-chart" })
              }}
            >
              <Button type="submit" className="w-full font-sans" size="lg">
                <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                Continue with Google
              </Button>
            </form>
            <p className="text-xs text-center text-muted-foreground font-sans">
              Only @getmysa.com accounts are allowed
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
