"use client"

import { useState, useCallback } from "react"
import useSWR from "swr"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { EmployeeCard } from "./employee-card"
import { Search, LayoutGrid, List, Users } from "lucide-react"
import type { EmployeeWithDepartment, Department } from "@/lib/types"

const fetcher = (url: string) => fetch(url).then((r) => r.json())

interface DirectoryViewProps {
  departments: Department[]
  locations: string[]
  initialEmployees: EmployeeWithDepartment[]
}

export function DirectoryView({ departments, locations, initialEmployees }: DirectoryViewProps) {
  const [search, setSearch] = useState("")
  const [departmentFilter, setDepartmentFilter] = useState("all")
  const [locationFilter, setLocationFilter] = useState("all")
  const [view, setView] = useState<"tile" | "list">("tile")

  const buildUrl = useCallback(() => {
    const params = new URLSearchParams()
    if (search.trim()) params.set("q", search.trim())
    if (departmentFilter !== "all") params.set("department", departmentFilter)
    if (locationFilter !== "all") params.set("location", locationFilter)
    return `/api/directory?${params.toString()}`
  }, [search, departmentFilter, locationFilter])

  const shouldFetch = search.trim() !== "" || departmentFilter !== "all" || locationFilter !== "all"

  const { data, isLoading } = useSWR<EmployeeWithDepartment[]>(
    shouldFetch ? buildUrl() : null,
    fetcher,
    { keepPreviousData: true }
  )

  const employees = shouldFetch ? (data || []) : initialEmployees

  return (
    <div className="flex flex-col gap-5">
      {/* Filters row */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name, title, email, or interests..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 font-sans"
          />
        </div>
        <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
          <SelectTrigger className="w-full sm:w-48 font-sans">
            <SelectValue placeholder="All departments" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all" className="font-sans">All departments</SelectItem>
            {departments.map((dept) => (
              <SelectItem key={dept.id} value={dept.id} className="font-sans">
                {dept.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={locationFilter} onValueChange={setLocationFilter}>
          <SelectTrigger className="w-full sm:w-48 font-sans">
            <SelectValue placeholder="All locations" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all" className="font-sans">All locations</SelectItem>
            {locations.map((loc) => (
              <SelectItem key={loc} value={loc} className="font-sans">
                {loc}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <ToggleGroup
          type="single"
          value={view}
          onValueChange={(v) => { if (v) setView(v as "tile" | "list") }}
          className="shrink-0"
        >
          <ToggleGroupItem value="tile" aria-label="Tile view">
            <LayoutGrid className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="list" aria-label="List view">
            <List className="h-4 w-4" />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>

      {/* Results count */}
      <div className="flex items-center gap-1.5 text-sm text-muted-foreground font-sans">
        <Users className="h-3.5 w-3.5" />
        {employees.length} {employees.length === 1 ? "person" : "people"}
        {search && ` matching "${search}"`}
        {isLoading && " (loading...)"}
      </div>

      {/* Employee grid/list */}
      {employees.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <Users className="h-10 w-10 text-muted-foreground/50 mb-3" />
          <p className="text-sm text-muted-foreground font-sans">
            No employees found matching your search.
          </p>
        </div>
      ) : view === "tile" ? (
        <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {employees.map((emp) => (
            <EmployeeCard key={emp.id} employee={emp} view="tile" />
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {employees.map((emp) => (
            <EmployeeCard key={emp.id} employee={emp} view="list" />
          ))}
        </div>
      )}
    </div>
  )
}
