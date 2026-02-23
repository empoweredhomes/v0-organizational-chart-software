export interface Department {
  id: string
  name: string
  color: string
  created_at: string
}

export interface Employee {
  id: string
  first_name: string
  last_name: string
  email: string
  job_title: string
  department_id: string | null
  manager_id: string | null
  photo_url: string | null
  phone: string | null
  bio: string | null
  interests: string | null
  name_pronunciation: string | null
  location: string
  employment_type: string
  start_date: string
  is_admin: boolean
  is_on_leave: boolean
  leave_note: string | null
  created_at: string
  updated_at: string
}

export interface EmployeeWithDepartment extends Employee {
  department_name: string | null
  department_color: string | null
}

export interface EmployeeWithDetails extends EmployeeWithDepartment {
  manager_first_name: string | null
  manager_last_name: string | null
  manager_job_title: string | null
  direct_reports_count: number
}

export interface OrgNode {
  id: string
  first_name: string
  last_name: string
  job_title: string
  department_name: string | null
  department_color: string | null
  photo_url: string | null
  is_on_leave: boolean
  children: OrgNode[]
}

export interface AuditLogEntry {
  id: string
  action: string
  entity_type: string
  entity_id: string
  changed_by: string
  changes: Record<string, unknown>
  created_at: string
  changed_by_name?: string
}

export interface SessionUser {
  id: string
  email: string
  first_name: string
  last_name: string
  is_admin: boolean
  photo_url: string | null
  job_title: string
}
