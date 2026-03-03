import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import type { EmployeeWithDetails } from "@/lib/types"

interface ProfileHeaderProps {
  employee: EmployeeWithDetails
}

export function ProfileHeader({ employee }: ProfileHeaderProps) {
  const initials = `${employee.first_name[0]}${employee.last_name[0]}`
  const fullName = `${employee.first_name} ${employee.last_name}`

  return (
    <Card className="border border-border overflow-hidden">
      {/* Color banner */}
      <div
        className="h-20"
        style={{
          backgroundColor: employee.department_color || "var(--primary)",
          opacity: 0.85,
        }}
      />
      <CardContent className="relative px-6 pb-6">
        {/* Avatar overlapping banner */}
        <div className="-mt-12 mb-4">
          <Avatar className="h-24 w-24 border-4 border-card shadow-lg">
            <AvatarImage src={employee.photo_url || undefined} alt={fullName} />
            <AvatarFallback
              className="text-2xl font-semibold font-sans"
              style={
                employee.department_color
                  ? { backgroundColor: employee.department_color + "20", color: employee.department_color }
                  : undefined
              }
            >
              {initials}
            </AvatarFallback>
          </Avatar>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
            <h1 className="text-2xl font-semibold text-card-foreground font-sans">
              {fullName}
            </h1>
            {employee.is_on_leave && (
              <Badge variant="secondary" className="w-fit text-xs font-sans">
                On Leave
              </Badge>
            )}
          </div>

          {employee.name_pronunciation && (
            <p className="text-sm text-muted-foreground font-sans italic">
              Pronounced: {employee.name_pronunciation}
            </p>
          )}

          <p className="text-base text-muted-foreground font-sans">
            {employee.job_title}
          </p>

          <div className="flex flex-wrap items-center gap-2 mt-1">
            {employee.department_name && (
              <Badge
                variant="secondary"
                className="text-xs font-sans"
                style={
                  employee.department_color
                    ? { backgroundColor: employee.department_color + "18", color: employee.department_color }
                    : undefined
                }
              >
                {employee.department_name}
              </Badge>
            )}

          </div>
        </div>
      </CardContent>
    </Card>
  )
}
