import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { Separator } from "@/components/ui/separator"
import { sql } from "@/lib/db"
import type { SessionUser } from "@/lib/types"

async function getDefaultUser(): Promise<SessionUser> {
  // AUTH DISABLED - default to first admin user (Ameerah)
  const rows = await sql`
    SELECT e.id, e.first_name, e.last_name, e.email, e.job_title, e.photo_url, e.is_admin,
           d.name as department_name
    FROM employees e
    LEFT JOIN departments d ON e.department_id = d.id
    WHERE e.email = 'ameerah@getmysa.com'
    LIMIT 1
  `
  if (rows.length > 0) {
    return rows[0] as SessionUser
  }
  // Fallback if no admin found
  return {
    id: "",
    first_name: "Admin",
    last_name: "User",
    email: "admin@mysa.com",
    job_title: "Admin",
    photo_url: null,
    is_admin: true,
    department_name: null,
  }
}

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await getDefaultUser()

  return (
    <SidebarProvider>
      <AppSidebar user={user} />
      <SidebarInset>
        <header className="flex h-14 shrink-0 items-center gap-2 border-b border-border bg-background px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground font-sans">
              Mysa OrgChart
            </span>
          </div>
        </header>
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
