"use client"

import { useState, useTransition, useRef } from "react"
import { format } from "date-fns"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { createEmployee, updateEmployee } from "@/app/actions/admin"
import { PhotoUpload } from "@/components/admin/photo-upload"
import type { EmployeeWithDepartment, Department } from "@/lib/types"

interface EmployeeFormProps {
  employee?: EmployeeWithDepartment
  departments: Department[]
  allEmployees: EmployeeWithDepartment[]
  onSuccess?: () => void
}

export function EmployeeForm({ employee, departments, allEmployees, onSuccess }: EmployeeFormProps) {
  const [isPending, startTransition] = useTransition()
  const [photoUrl, setPhotoUrl] = useState<string | null>(employee?.photo_url || null)
  const dateInputRef = useRef<HTMLInputElement>(null)
  const [startDate, setStartDate] = useState(() => {
    if (!employee?.start_date) return ""
    return new Date(employee.start_date).toISOString().split("T")[0]
  })
  const formattedStartDate = startDate
    ? format(new Date(startDate + "T00:00:00"), "dd-MMM-yy")
    : ""

  const handleSubmit = (formData: FormData) => {
    startTransition(async () => {
      if (employee) {
        await updateEmployee(employee.id, formData)
      } else {
        await createEmployee(formData)
      }
      onSuccess?.()
    })
  }

  // Exclude self from potential managers
  const managerOptions = allEmployees.filter((e) => e.id !== employee?.id)

  return (
    <form action={handleSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <Label className="font-sans">Employee Photo</Label>
        <PhotoUpload
          currentPhotoUrl={employee?.photo_url}
          initials={
            employee
              ? `${employee.first_name[0]}${employee.last_name[0]}`
              : "?"
          }
          onPhotoChange={setPhotoUrl}
        />
        <input type="hidden" name="photo_url" value={photoUrl || ""} />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <Label htmlFor="first_name" className="font-sans">First Name *</Label>
          <Input
            id="first_name"
            name="first_name"
            defaultValue={employee?.first_name}
            required
            className="font-sans"
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="last_name" className="font-sans">Last Name *</Label>
          <Input
            id="last_name"
            name="last_name"
            defaultValue={employee?.last_name}
            required
            className="font-sans"
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <Label htmlFor="email" className="font-sans">Email *</Label>
          <Input
            id="email"
            name="email"
            type="email"
            defaultValue={employee?.email}
            required
            className="font-sans"
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="job_title" className="font-sans">Job Title *</Label>
          <Input
            id="job_title"
            name="job_title"
            defaultValue={employee?.job_title}
            required
            className="font-sans"
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <Label htmlFor="department_id" className="font-sans">Department</Label>
          <Select name="department_id" defaultValue={employee?.department_id || ""}>
            <SelectTrigger className="font-sans">
              <SelectValue placeholder="Select department" />
            </SelectTrigger>
            <SelectContent>
              {departments.map((dept) => (
                <SelectItem key={dept.id} value={dept.id} className="font-sans">
                  {dept.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="manager_id" className="font-sans">Manager</Label>
          <Select name="manager_id" defaultValue={employee?.manager_id || ""}>
            <SelectTrigger className="font-sans">
              <SelectValue placeholder="Select manager" />
            </SelectTrigger>
            <SelectContent>
              {managerOptions.map((mgr) => (
                <SelectItem key={mgr.id} value={mgr.id} className="font-sans">
                  {mgr.first_name} {mgr.last_name} - {mgr.job_title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <Label htmlFor="location" className="font-sans">Location</Label>
          <Select name="location" defaultValue={employee?.location || "Mysa HQ"}>
            <SelectTrigger className="font-sans">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Mysa HQ" className="font-sans">Mysa HQ</SelectItem>
              <SelectItem value="Remote" className="font-sans">Remote</SelectItem>
              <SelectItem value="Hybrid" className="font-sans">Hybrid</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="employment_type" className="font-sans">Employment Type</Label>
          <Select name="employment_type" defaultValue={employee?.employment_type || "Full-Time"}>
            <SelectTrigger className="font-sans">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Full-Time" className="font-sans">Full-Time</SelectItem>
              <SelectItem value="Part-Time" className="font-sans">Part-Time</SelectItem>
              <SelectItem value="Contract" className="font-sans">Contract</SelectItem>
              <SelectItem value="Co-op" className="font-sans">Co-op</SelectItem>
              <SelectItem value="Intern" className="font-sans">Intern</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <Label htmlFor="start_date" className="font-sans">Start Date</Label>
          <div className="relative">
            <input
              ref={dateInputRef}
              type="date"
              name="start_date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="absolute inset-0 opacity-0 cursor-pointer"
              tabIndex={-1}
            />
            <div
              onClick={() => dateInputRef.current?.showPicker?.()}
              className="flex h-9 w-full items-center rounded-md border border-input bg-transparent px-3 py-1 text-sm font-sans cursor-pointer hover:bg-accent/50 transition-colors"
            >
              {formattedStartDate || <span className="text-muted-foreground">Select date</span>}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="phone" className="font-sans">Phone</Label>
          <Input
            id="phone"
            name="phone"
            defaultValue={employee?.phone || ""}
            className="font-sans"
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="name_pronunciation" className="font-sans">Name Pronunciation</Label>
        <Input
          id="name_pronunciation"
          name="name_pronunciation"
          defaultValue={employee?.name_pronunciation || ""}
          placeholder="How to pronounce their name"
          className="font-sans"
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="bio" className="font-sans">Bio</Label>
        <Textarea
          id="bio"
          name="bio"
          defaultValue={employee?.bio || ""}
          rows={3}
          className="font-sans"
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="interests" className="font-sans">Interests</Label>
        <Input
          id="interests"
          name="interests"
          defaultValue={employee?.interests || ""}
          placeholder="Comma-separated interests"
          className="font-sans"
        />
      </div>

      {employee && (
        <>
          <div className="flex items-center gap-2">
            <Checkbox
              id="is_on_leave"
              name="is_on_leave"
              defaultChecked={employee.is_on_leave}
            />
            <Label htmlFor="is_on_leave" className="font-sans">Currently on leave</Label>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="leave_note" className="font-sans">Leave Note</Label>
            <Input
              id="leave_note"
              name="leave_note"
              defaultValue={employee.leave_note || ""}
              className="font-sans"
            />
          </div>
        </>
      )}

      <div className="flex items-center gap-2">
        <Checkbox
          id="is_admin"
          name="is_admin"
          defaultChecked={employee?.is_admin}
        />
        <Label htmlFor="is_admin" className="font-sans">Admin access (P&C team)</Label>
      </div>

      <Button type="submit" disabled={isPending} className="font-sans">
        {isPending ? "Saving..." : employee ? "Update Employee" : "Add Employee"}
      </Button>
    </form>
  )
}
