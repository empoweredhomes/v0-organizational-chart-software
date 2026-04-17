"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Plus, Pencil, Trash2, ArrowUpDown } from "lucide-react"
import { EmployeeForm } from "./employee-form"
import { deleteEmployee } from "@/app/actions/admin"
import type { EmployeeWithDepartment, Department } from "@/lib/types"

interface AdminEmployeeTableProps {
  employees: EmployeeWithDepartment[]
  departments: Department[]
  allEmployees: EmployeeWithDepartment[]
  locations?: string[]
}

export function AdminEmployeeTable({ employees, departments, allEmployees, locations = [] }: AdminEmployeeTableProps) {
  const [search, setSearch] = useState("")
  const [sortBy, setSortBy] = useState("first-asc")
  const [editingId, setEditingId] = useState<string | null>(null)
  const [isAddOpen, setIsAddOpen] = useState(false)

  const filtered = employees
    .filter((emp) => {
      const q = search.toLowerCase()
      return (
        emp.first_name.toLowerCase().includes(q) ||
        emp.last_name.toLowerCase().includes(q) ||
        emp.email.toLowerCase().includes(q) ||
        emp.job_title.toLowerCase().includes(q)
      )
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "first-asc":
          return a.first_name.localeCompare(b.first_name)
        case "first-desc":
          return b.first_name.localeCompare(a.first_name)
        case "last-asc":
          return a.last_name.localeCompare(b.last_name)
        case "last-desc":
          return b.last_name.localeCompare(a.last_name)
        case "department":
          return (a.department_name || "").localeCompare(b.department_name || "")
        case "role":
          return (a.is_admin === b.is_admin) ? 0 : a.is_admin ? -1 : 1
        default:
          return 0
      }
    })

  return (
    <div className="flex flex-col gap-4">
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search employees..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 font-sans"
          />
        </div>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-[180px] font-sans">
            <ArrowUpDown className="h-3.5 w-3.5 mr-1.5 text-muted-foreground" />
            <SelectValue placeholder="Sort by..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="first-asc" className="font-sans">First Name A-Z</SelectItem>
            <SelectItem value="first-desc" className="font-sans">First Name Z-A</SelectItem>
            <SelectItem value="last-asc" className="font-sans">Last Name A-Z</SelectItem>
            <SelectItem value="last-desc" className="font-sans">Last Name Z-A</SelectItem>
            <SelectItem value="department" className="font-sans">Department</SelectItem>
            <SelectItem value="role" className="font-sans">Role (Admin first)</SelectItem>
          </SelectContent>
        </Select>

        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
          <DialogTrigger asChild>
            <Button className="font-sans gap-1.5">
              <Plus className="h-4 w-4" />
              Add Employee
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="font-sans">Add New Employee</DialogTitle>
            </DialogHeader>
            <EmployeeForm
              departments={departments}
              allEmployees={allEmployees}
              locations={locations}
              onSuccess={() => setIsAddOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </div>

      {/* Table */}
      <Card className="border border-border">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="text-left text-xs font-medium text-muted-foreground p-3 font-sans">Employee</th>
                  <th className="text-left text-xs font-medium text-muted-foreground p-3 font-sans hidden md:table-cell">Department</th>
                  <th className="text-left text-xs font-medium text-muted-foreground p-3 font-sans hidden lg:table-cell">Email</th>
                  <th className="text-left text-xs font-medium text-muted-foreground p-3 font-sans hidden sm:table-cell">Role</th>
                  <th className="text-right text-xs font-medium text-muted-foreground p-3 font-sans">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((emp) => (
                  <tr key={emp.id} className="border-b border-border last:border-0 hover:bg-muted/30">
                    <td className="p-3">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={emp.photo_url || undefined} alt={`${emp.first_name} ${emp.last_name}`} />
                          <AvatarFallback className="text-xs font-sans">
                            {emp.first_name[0]}{emp.last_name[0]}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium text-foreground font-sans">
                            {emp.first_name} {emp.last_name}
                          </p>
                          <p className="text-xs text-muted-foreground font-sans">{emp.job_title}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-3 hidden md:table-cell">
                      {emp.department_name && (
                        <Badge
                          variant="secondary"
                          className="text-[10px] font-sans"
                          style={
                            emp.department_color
                              ? { backgroundColor: emp.department_color + "18", color: emp.department_color }
                              : undefined
                          }
                        >
                          {emp.department_name}
                        </Badge>
                      )}
                    </td>
                    <td className="p-3 hidden lg:table-cell">
                      <span className="text-xs text-muted-foreground font-sans">{emp.email}</span>
                    </td>
                    <td className="p-3 hidden sm:table-cell">
                      {emp.is_admin ? (
                        <Badge className="text-[10px] bg-primary/10 text-primary border-0 font-sans">Admin</Badge>
                      ) : (
                        <Badge variant="outline" className="text-[10px] font-sans">Employee</Badge>
                      )}
                    </td>
                    <td className="p-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Dialog open={editingId === emp.id} onOpenChange={(open) => setEditingId(open ? emp.id : null)}>
                          <DialogTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Pencil className="h-3.5 w-3.5" />
                              <span className="sr-only">Edit {emp.first_name}</span>
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                            <DialogHeader>
                              <DialogTitle className="font-sans">Edit {emp.first_name} {emp.last_name}</DialogTitle>
                            </DialogHeader>
                            <EmployeeForm
                              employee={emp}
                              departments={departments}
                              allEmployees={allEmployees}
                              locations={locations}
                              onSuccess={() => setEditingId(null)}
                            />
                          </DialogContent>
                        </Dialog>

                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive">
                              <Trash2 className="h-3.5 w-3.5" />
                              <span className="sr-only">Delete {emp.first_name}</span>
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle className="font-sans">Delete {emp.first_name} {emp.last_name}?</AlertDialogTitle>
                              <AlertDialogDescription className="font-sans">
                                This will permanently remove this employee from the system. Any employees who report to them will have their manager set to none.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel className="font-sans">Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => deleteEmployee(emp.id)}
                                className="bg-destructive text-destructive-foreground hover:bg-destructive/90 font-sans"
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filtered.length === 0 && (
            <div className="p-8 text-center text-sm text-muted-foreground font-sans">
              No employees found.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
