import { NextRequest, NextResponse } from "next/server"
import { searchEmployees, getAllEmployeesWithDepartment } from "@/lib/queries"
import { auth } from "@/auth"

export async function GET(request: NextRequest) {
  // Require authentication
  const session = await auth()
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { searchParams } = request.nextUrl
  const query = searchParams.get("q") || ""
  const departmentId = searchParams.get("department") || undefined
  const location = searchParams.get("location") || undefined

  try {
    const employees = query || (departmentId && departmentId !== "all") || (location && location !== "all")
      ? await searchEmployees(query, departmentId, location)
      : await getAllEmployeesWithDepartment()

    return NextResponse.json(employees)
  } catch {
    return NextResponse.json({ error: "Failed to fetch employees" }, { status: 500 })
  }
}
