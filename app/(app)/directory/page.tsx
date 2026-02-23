import { getAllEmployeesWithDepartment, getAllDepartments } from "@/lib/queries"
import { DirectoryView } from "@/components/directory/directory-view"
import { Users } from "lucide-react"

export default async function DirectoryPage() {
  const [employees, departments] = await Promise.all([
    getAllEmployeesWithDepartment(),
    getAllDepartments(),
  ])

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <Users className="h-5 w-5 text-primary" />
          <h1 className="text-xl font-semibold text-foreground font-sans">
            Employee Directory
          </h1>
        </div>
        <p className="text-sm text-muted-foreground font-sans">
          Search and browse the Mysa team. Click any card to view their full profile.
        </p>
      </div>

      <DirectoryView departments={departments} initialEmployees={employees} />
    </div>
  )
}
