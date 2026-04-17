import { sql } from "@/lib/db"
import type { EmployeeWithDepartment, EmployeeWithDetails, Department, OrgNode, AuditLogEntry } from "@/lib/types"

export async function getAllDepartments(): Promise<Department[]> {
  const rows = await sql`SELECT * FROM departments ORDER BY name`
  return rows as Department[]
}

export async function getAllEmployeesWithDepartment(): Promise<EmployeeWithDepartment[]> {
  const rows = await sql`
    SELECT 
      e.*,
      d.name as department_name,
      d.color as department_color
    FROM employees e
    LEFT JOIN departments d ON d.id = e.department_id
    ORDER BY e.first_name, e.last_name
  `
  return rows as EmployeeWithDepartment[]
}

export async function getEmployeeById(id: string): Promise<EmployeeWithDetails | null> {
  const rows = await sql`
    SELECT 
      e.*,
      d.name as department_name,
      d.color as department_color,
      m.first_name as manager_first_name,
      m.last_name as manager_last_name,
      m.job_title as manager_job_title,
      (SELECT COUNT(*) FROM employees sub WHERE sub.manager_id = e.id)::int as direct_reports_count
    FROM employees e
    LEFT JOIN departments d ON d.id = e.department_id
    LEFT JOIN employees m ON m.id = e.manager_id
    WHERE e.id = ${id}
  `
  if (rows.length === 0) return null
  return rows[0] as EmployeeWithDetails
}

export async function getDirectReports(managerId: string): Promise<EmployeeWithDepartment[]> {
  const rows = await sql`
    SELECT 
      e.*,
      d.name as department_name,
      d.color as department_color
    FROM employees e
    LEFT JOIN departments d ON d.id = e.department_id
    WHERE e.manager_id = ${managerId}
    ORDER BY e.first_name, e.last_name
  `
  return rows as EmployeeWithDepartment[]
}

export async function getOrgTree(): Promise<OrgNode[]> {
  const rows = await sql`
    SELECT 
      e.id,
      e.first_name,
      e.last_name,
      e.job_title,
      e.manager_id,
      e.photo_url,
      e.is_on_leave,
      d.name as department_name,
      d.color as department_color
    FROM employees e
    LEFT JOIN departments d ON d.id = e.department_id
    ORDER BY e.last_name, e.first_name
  `

  // Build tree structure
  const nodeMap = new Map<string, OrgNode & { manager_id: string | null }>()
  for (const row of rows) {
    nodeMap.set(row.id as string, {
      id: row.id as string,
      first_name: row.first_name as string,
      last_name: row.last_name as string,
      job_title: row.job_title as string,
      department_name: row.department_name as string | null,
      department_color: row.department_color as string | null,
      photo_url: row.photo_url as string | null,
      is_on_leave: row.is_on_leave as boolean,
      manager_id: row.manager_id as string | null,
      children: [],
    })
  }

  const roots: OrgNode[] = []
  for (const node of nodeMap.values()) {
    if (node.manager_id && nodeMap.has(node.manager_id)) {
      nodeMap.get(node.manager_id)!.children.push(node)
    } else {
      roots.push(node)
    }
  }

  return roots
}

export async function searchEmployees(query: string, departmentId?: string, location?: string): Promise<EmployeeWithDepartment[]> {
  const hasDepartment = departmentId && departmentId !== "all"
  const hasLocation = location && location !== "all"
  
  if (hasDepartment && hasLocation) {
    const rows = await sql`
      SELECT 
        e.*,
        d.name as department_name,
        d.color as department_color
      FROM employees e
      LEFT JOIN departments d ON d.id = e.department_id
      WHERE e.department_id = ${departmentId}
        AND e.location = ${location}
        AND (
          e.first_name ILIKE ${'%' + query + '%'}
          OR e.last_name ILIKE ${'%' + query + '%'}
          OR e.job_title ILIKE ${'%' + query + '%'}
          OR e.email ILIKE ${'%' + query + '%'}
          OR e.interests ILIKE ${'%' + query + '%'}
        )
      ORDER BY e.first_name, e.last_name
    `
    return rows as EmployeeWithDepartment[]
  }
  
  if (hasDepartment) {
    const rows = await sql`
      SELECT 
        e.*,
        d.name as department_name,
        d.color as department_color
      FROM employees e
      LEFT JOIN departments d ON d.id = e.department_id
      WHERE e.department_id = ${departmentId}
        AND (
          e.first_name ILIKE ${'%' + query + '%'}
          OR e.last_name ILIKE ${'%' + query + '%'}
          OR e.job_title ILIKE ${'%' + query + '%'}
          OR e.email ILIKE ${'%' + query + '%'}
          OR e.interests ILIKE ${'%' + query + '%'}
        )
      ORDER BY e.first_name, e.last_name
    `
    return rows as EmployeeWithDepartment[]
  }
  
  if (hasLocation) {
    const rows = await sql`
      SELECT 
        e.*,
        d.name as department_name,
        d.color as department_color
      FROM employees e
      LEFT JOIN departments d ON d.id = e.department_id
      WHERE e.location = ${location}
        AND (
          e.first_name ILIKE ${'%' + query + '%'}
          OR e.last_name ILIKE ${'%' + query + '%'}
          OR e.job_title ILIKE ${'%' + query + '%'}
          OR e.email ILIKE ${'%' + query + '%'}
          OR e.interests ILIKE ${'%' + query + '%'}
        )
      ORDER BY e.first_name, e.last_name
    `
    return rows as EmployeeWithDepartment[]
  }

  const rows = await sql`
    SELECT 
      e.*,
      d.name as department_name,
      d.color as department_color
    FROM employees e
    LEFT JOIN departments d ON d.id = e.department_id
    WHERE
      e.first_name ILIKE ${'%' + query + '%'}
      OR e.last_name ILIKE ${'%' + query + '%'}
      OR e.job_title ILIKE ${'%' + query + '%'}
      OR e.email ILIKE ${'%' + query + '%'}
      OR e.interests ILIKE ${'%' + query + '%'}
    ORDER BY e.first_name, e.last_name
  `
  return rows as EmployeeWithDepartment[]
}

export async function getAuditLog(limit = 50, offset = 0): Promise<AuditLogEntry[]> {
  const rows = await sql`
    SELECT 
      al.*,
      CONCAT(e.first_name, ' ', e.last_name) as changed_by_name
    FROM audit_log al
    LEFT JOIN employees e ON e.id = al.changed_by
    ORDER BY al.created_at DESC
    LIMIT ${limit}
    OFFSET ${offset}
  `
  return rows as AuditLogEntry[]
}

export async function getDepartmentHeadcounts(): Promise<{ department_name: string; color: string; count: number }[]> {
  const rows = await sql`
    SELECT 
      d.name as department_name,
      d.color,
      COUNT(e.id)::int as count
    FROM departments d
    LEFT JOIN employees e ON e.department_id = d.id
    GROUP BY d.id, d.name, d.color
    ORDER BY d.name
  `
  return rows as { department_name: string; color: string; count: number }[]
}

export async function getTotalEmployeeCount(): Promise<number> {
  const rows = await sql`SELECT COUNT(*)::int as total FROM employees`
  return rows[0].total as number
}

export async function getUniqueLocations(): Promise<string[]> {
  const rows = await sql`
    SELECT DISTINCT location 
    FROM employees 
    WHERE location IS NOT NULL 
    ORDER BY location
  `
  return rows.map((row: { location: string }) => row.location)
}

export async function getEmployeeRoster(): Promise<{
  id: string
  first_name: string
  last_name: string
  job_title: string | null
  department_name: string | null
  manager_name: string | null
  direct_reports: string[]
}[]> {
  const rows = await sql`
    SELECT 
      e.id,
      e.first_name,
      e.last_name,
      e.job_title,
      d.name as department_name,
      CONCAT(m.first_name, ' ', m.last_name) as manager_name,
      COALESCE(
        (SELECT array_agg(CONCAT(dr.first_name, ' ', dr.last_name) ORDER BY dr.last_name, dr.first_name)
         FROM employees dr WHERE dr.manager_id = e.id),
        ARRAY[]::text[]
      ) as direct_reports
    FROM employees e
    LEFT JOIN departments d ON d.id = e.department_id
    LEFT JOIN employees m ON m.id = e.manager_id
    ORDER BY e.first_name, e.last_name
  `
  return rows as {
    id: string
    first_name: string
    last_name: string
    job_title: string | null
    department_name: string | null
    manager_name: string | null
    direct_reports: string[]
  }[]
}
