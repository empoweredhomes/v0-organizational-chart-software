import { requireAdmin } from "@/lib/auth"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Double-check admin access at the layout level
  await requireAdmin()

  return <>{children}</>
}
