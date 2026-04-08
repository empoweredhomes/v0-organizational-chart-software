import { getEmployeeRoster } from "@/lib/queries"
import { RosterTable } from "@/components/admin/roster-table"

export default async function RosterPage() {
  const employees = await getEmployeeRoster()

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold font-sans">Employee Roster</h1>
        <p className="text-muted-foreground font-sans">
          Overview of all {employees.length} employees
        </p>
      </div>

      <RosterTable employees={employees} />
    </div>
  )
}
