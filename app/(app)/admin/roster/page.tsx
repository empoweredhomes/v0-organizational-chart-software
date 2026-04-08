import { getEmployeeRoster } from "@/lib/queries"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users } from "lucide-react"

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

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg font-sans">
            <Users className="h-5 w-5" />
            All Employees
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-sans font-semibold">Name</TableHead>
                  <TableHead className="font-sans font-semibold">Department</TableHead>
                  <TableHead className="font-sans font-semibold">Reports To</TableHead>
                  <TableHead className="font-sans font-semibold">Direct Reports</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {employees.map((employee) => (
                  <TableRow key={employee.id}>
                    <TableCell className="font-sans font-medium">
                      {employee.first_name} {employee.last_name}
                    </TableCell>
                    <TableCell className="font-sans text-muted-foreground">
                      {employee.department_name || "—"}
                    </TableCell>
                    <TableCell className="font-sans text-muted-foreground">
                      {employee.manager_name || "—"}
                    </TableCell>
                    <TableCell className="font-sans text-muted-foreground max-w-xs">
                      {employee.direct_reports.length > 0
                        ? employee.direct_reports.join(", ")
                        : "—"}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
