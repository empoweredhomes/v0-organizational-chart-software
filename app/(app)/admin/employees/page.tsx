import { getAllEmployeesWithDepartment, getAllDepartments, getUniqueLocations } from "@/lib/queries"
import { AdminEmployeeTable } from "@/components/admin/employee-table"
import { Shield, UserPlus } from "lucide-react"

export default async function AdminEmployeesPage() {
  const [employees, departments, locations] = await Promise.all([
    getAllEmployeesWithDepartment(),
    getAllDepartments(),
    getUniqueLocations(),
  ])

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            <h1 className="text-xl font-semibold text-foreground font-sans">
              Manage Employees
            </h1>
          </div>
          <p className="text-sm text-muted-foreground font-sans">
            Add, edit, or remove employee records. {employees.length} total employees.
          </p>
        </div>
      </div>

      <AdminEmployeeTable
        employees={employees}
        departments={departments}
        allEmployees={employees}
        locations={locations}
      />
    </div>
  )
}
