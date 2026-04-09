"use client"

import { useRef } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, Download } from "lucide-react"
import { jsPDF } from "jspdf"
import autoTable from "jspdf-autotable"

interface Employee {
  id: string
  first_name: string
  last_name: string
  job_title: string | null
  department_name: string | null
  manager_name: string | null
  direct_reports: string[]
}

interface RosterTableProps {
  employees: Employee[]
}

export function RosterTable({ employees }: RosterTableProps) {
  const downloadPdf = () => {
    const doc = new jsPDF({
      orientation: "landscape",
      unit: "mm",
      format: "a4",
    })

    // Add title
    doc.setFontSize(18)
    doc.text("Mysa Employee Roster", 14, 15)
    doc.setFontSize(10)
    doc.text(`Total Employees: ${employees.length}`, 14, 22)
    doc.text(`Generated: ${new Date().toLocaleDateString()}`, 14, 27)

    // Prepare table data
    const tableData = employees.map((emp) => [
      `${emp.first_name} ${emp.last_name}`,
      emp.job_title || "—",
      emp.department_name || "—",
      emp.manager_name || "—",
      emp.direct_reports.length > 0 ? emp.direct_reports.join(", ") : "—",
    ])

    // Generate table
    autoTable(doc, {
      startY: 32,
      head: [["Name", "Job Title", "Department", "Reports To", "Direct Reports"]],
      body: tableData,
      styles: {
        fontSize: 8,
        cellPadding: 2,
      },
      headStyles: {
        fillColor: [59, 130, 246],
        textColor: 255,
        fontStyle: "bold",
      },
      alternateRowStyles: {
        fillColor: [245, 247, 250],
      },
      columnStyles: {
        0: { cellWidth: 40 },
        1: { cellWidth: 45 },
        2: { cellWidth: 35 },
        3: { cellWidth: 40 },
        4: { cellWidth: "auto" },
      },
    })

    doc.save("mysa-employee-roster.pdf")
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg font-sans">
            <Users className="h-5 w-5" />
            All Employees
          </CardTitle>
          <Button onClick={downloadPdf} variant="outline" size="sm" className="font-sans">
            <Download className="h-4 w-4 mr-2" />
            Download PDF
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="font-sans font-semibold">Name</TableHead>
                <TableHead className="font-sans font-semibold">Job Title</TableHead>
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
                    {employee.job_title || "—"}
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
  )
}
