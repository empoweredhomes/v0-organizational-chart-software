import { NextRequest, NextResponse } from "next/server"
import { searchEmployees, getAllEmployeesWithDepartment } from "@/lib/queries"

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl
  const query = searchParams.get("q") || ""
  const departmentId = searchParams.get("department") || undefined

  try {
    const employees = query || (departmentId && departmentId !== "all")
      ? await searchEmployees(query, departmentId)
      : await getAllEmployeesWithDepartment()

    return NextResponse.json(employees)
  } catch {
    return NextResponse.json({ error: "Failed to fetch employees" }, { status: 500 })
  }
}
