import { requireAdmin } from "@/lib/auth"
import { getAllDepartments, getDepartmentHeadcounts } from "@/lib/queries"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Building2, Users } from "lucide-react"

export default async function AdminDepartmentsPage() {
  const [admin, departments, headcounts] = await Promise.all([
    requireAdmin(),
    getAllDepartments(),
    getDepartmentHeadcounts(),
  ])

  const headcountMap = new Map(headcounts.map((h) => [h.department_name, h.count]))

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <Building2 className="h-5 w-5 text-primary" />
          <h1 className="text-xl font-semibold text-foreground font-sans">
            Departments
          </h1>
        </div>
        <p className="text-sm text-muted-foreground font-sans">
          View department details and headcounts. {departments.length} departments.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {departments.map((dept) => {
          const count = headcountMap.get(dept.name) || 0
          return (
            <Card key={dept.id} className="border border-border">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-3">
                  <div
                    className="h-4 w-4 rounded-full shrink-0"
                    style={{ backgroundColor: dept.color }}
                  />
                  <CardTitle className="text-base font-sans">{dept.name}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="font-sans text-xs gap-1">
                    <Users className="h-3 w-3" />
                    {count} {count === 1 ? "person" : "people"}
                  </Badge>
                  <div
                    className="h-2 flex-1 rounded-full bg-muted"
                  >
                    <div
                      className="h-2 rounded-full transition-all"
                      style={{
                        backgroundColor: dept.color,
                        width: `${Math.min((count / 20) * 100, 100)}%`,
                      }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
