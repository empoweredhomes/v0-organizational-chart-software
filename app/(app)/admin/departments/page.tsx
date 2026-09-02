import { getAllDepartments, getDepartmentHeadcounts } from "@/lib/queries"
import { DepartmentsManager } from "@/components/admin/departments-manager"
import { Building2 } from "lucide-react"

export default async function AdminDepartmentsPage() {
  const [departments, headcounts] = await Promise.all([
    getAllDepartments(),
    getDepartmentHeadcounts(),
  ])

  const headcountMap = Object.fromEntries(headcounts.map((h) => [h.department_name, h.count]))

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
          Manage department details and headcounts. {departments.length} departments.
        </p>
      </div>

      <DepartmentsManager departments={departments} headcountMap={headcountMap} />
    </div>
  )
}
