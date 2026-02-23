import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Mail, MapPin } from "lucide-react"
import type { EmployeeWithDepartment } from "@/lib/types"

interface EmployeeCardProps {
  employee: EmployeeWithDepartment
  view: "tile" | "list"
}

export function EmployeeCard({ employee, view }: EmployeeCardProps) {
  const initials = `${employee.first_name[0]}${employee.last_name[0]}`
  const fullName = `${employee.first_name} ${employee.last_name}`

  if (view === "list") {
    return (
      <Link href={`/profile/${employee.id}`}>
        <Card className="border border-border hover:border-primary/30 hover:shadow-sm transition-all">
          <CardContent className="flex items-center gap-4 p-3">
            <Avatar className="h-10 w-10 shrink-0">
              <AvatarImage src={employee.photo_url || undefined} alt={fullName} />
              <AvatarFallback
                className="text-xs font-medium font-sans"
                style={
                  employee.department_color
                    ? { backgroundColor: employee.department_color + "20", color: employee.department_color }
                    : undefined
                }
              >
                {initials}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-card-foreground font-sans truncate">
                  {fullName}
                </span>
                {employee.is_on_leave && (
                  <Badge variant="secondary" className="text-[10px] py-0 px-1.5 font-sans shrink-0">
                    On Leave
                  </Badge>
                )}
              </div>
              <span className="text-xs text-muted-foreground font-sans">
                {employee.job_title}
              </span>
            </div>
            {employee.department_name && (
              <Badge
                variant="secondary"
                className="text-[10px] py-0 px-1.5 font-sans shrink-0 hidden sm:inline-flex"
                style={
                  employee.department_color
                    ? { backgroundColor: employee.department_color + "18", color: employee.department_color }
                    : undefined
                }
              >
                {employee.department_name}
              </Badge>
            )}
            <div className="hidden md:flex items-center gap-3 text-xs text-muted-foreground shrink-0">
              <span className="flex items-center gap-1 font-sans">
                <Mail className="h-3 w-3" />
                {employee.email}
              </span>
              <span className="flex items-center gap-1 font-sans">
                <MapPin className="h-3 w-3" />
                {employee.location}
              </span>
            </div>
          </CardContent>
        </Card>
      </Link>
    )
  }

  return (
    <Link href={`/profile/${employee.id}`}>
      <Card className="border border-border hover:border-primary/30 hover:shadow-md transition-all h-full">
        <CardContent className="flex flex-col items-center gap-3 p-5 text-center">
          <Avatar className="h-16 w-16">
            <AvatarImage src={employee.photo_url || undefined} alt={fullName} />
            <AvatarFallback
              className="text-lg font-medium font-sans"
              style={
                employee.department_color
                  ? { backgroundColor: employee.department_color + "20", color: employee.department_color }
                  : undefined
              }
            >
              {initials}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col items-center gap-0.5">
            <span className="text-sm font-semibold text-card-foreground font-sans text-balance">
              {fullName}
            </span>
            <span className="text-xs text-muted-foreground font-sans text-balance">
              {employee.job_title}
            </span>
          </div>
          <div className="flex flex-col items-center gap-1.5">
            {employee.department_name && (
              <Badge
                variant="secondary"
                className="text-[10px] py-0 px-1.5 font-sans"
                style={
                  employee.department_color
                    ? { backgroundColor: employee.department_color + "18", color: employee.department_color }
                    : undefined
                }
              >
                {employee.department_name}
              </Badge>
            )}
            {employee.is_on_leave && (
              <Badge variant="secondary" className="text-[10px] py-0 px-1.5 font-sans">
                On Leave
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground font-sans mt-auto">
            <MapPin className="h-3 w-3" />
            {employee.location}
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
