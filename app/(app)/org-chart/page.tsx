import { getOrgTree, getDepartmentHeadcounts, getTotalEmployeeCount } from "@/lib/queries"
import { getSession } from "@/lib/auth"
import { OrgTree } from "@/components/org-chart/org-tree"
import { Card, CardContent } from "@/components/ui/card"
import { GitBranch } from "lucide-react"

export default async function OrgChartPage() {
  let tree: Awaited<ReturnType<typeof getOrgTree>> = []
  let headcounts: Awaited<ReturnType<typeof getDepartmentHeadcounts>> = []
  let totalEmployees = 0
  let isAdmin = false

  try {
    const [treeData, headcountsData, totalData, session] = await Promise.all([
      getOrgTree(),
      getDepartmentHeadcounts(),
      getTotalEmployeeCount(),
      getSession(),
    ])
    tree = treeData
    headcounts = headcountsData
    totalEmployees = totalData
    isAdmin = session?.is_admin ?? false
  } catch (err) {
    console.error("[v0] OrgChart error:", err)
    return <div className="p-6 text-destructive font-sans">Failed to load org chart. Check console for details.</div>
  }

  return (
    <div className="flex flex-col gap-6 p-6 h-full overflow-hidden">
      {/* Page header */}
      <div className="flex flex-col gap-1 shrink-0">
        <div className="flex items-center gap-2">
          <GitBranch className="h-5 w-5 text-primary" />
          <h1 className="text-xl font-semibold text-foreground font-sans">
            Organization Chart
          </h1>
        </div>
        <p className="text-sm text-muted-foreground font-sans">
          Explore the Mysa team structure. Click any person to view their full profile.
        </p>
      </div>

      {/* Org tree */}
      <Card className="border border-border flex-1 min-h-0 overflow-hidden">
        <CardContent className="p-4 h-full overflow-hidden">
          <OrgTree tree={tree} headcounts={headcounts} totalEmployees={totalEmployees} isAdmin={isAdmin} />
        </CardContent>
      </Card>
    </div>
  )
}
