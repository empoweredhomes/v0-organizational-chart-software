import { getOrgTree, getDepartmentHeadcounts } from "@/lib/queries"
import { OrgTree } from "@/components/org-chart/org-tree"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { GitBranch, Users } from "lucide-react"

export default async function OrgChartPage() {
  const [tree, headcounts] = await Promise.all([
    getOrgTree(),
    getDepartmentHeadcounts(),
  ])

  const totalEmployees = headcounts.reduce((sum, d) => sum + d.count, 0)

  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Page header */}
      <div className="flex flex-col gap-1">
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

      {/* Department summary row */}
      <div className="flex flex-wrap gap-2">
        <Badge variant="outline" className="font-sans text-xs gap-1.5 py-1 px-2.5">
          <Users className="h-3 w-3" />
          {totalEmployees} people
        </Badge>
        {headcounts.map((dept) => (
          <Badge
            key={dept.department_name}
            variant="secondary"
            className="font-sans text-xs py-1 px-2.5"
            style={{
              backgroundColor: dept.color + "18",
              color: dept.color,
            }}
          >
            {dept.department_name} ({dept.count})
          </Badge>
        ))}
      </div>

      {/* Org tree */}
      <Card className="border border-border">
        <CardContent className="p-4">
          <OrgTree tree={tree} />
        </CardContent>
      </Card>
    </div>
  )
}
