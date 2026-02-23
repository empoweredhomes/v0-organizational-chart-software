import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowUpRight, Users } from "lucide-react"
import type { EmployeeWithDepartment } from "@/lib/types"

interface DirectReportsListProps {
  managerId: string | null
  managerFirstName: string | null
  managerLastName: string | null
  managerJobTitle: string | null
  directReports: EmployeeWithDepartment[]
}

export function DirectReportsList({
  managerId,
  managerFirstName,
  managerLastName,
  managerJobTitle,
  directReports,
}: DirectReportsListProps) {
  return (
    <div className="flex flex-col gap-4">
      {/* Reports to */}
      {managerId && managerFirstName && managerLastName && (
        <Card className="border border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold font-sans flex items-center gap-1.5">
              <ArrowUpRight className="h-3.5 w-3.5" />
              Reports to
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Link
              href={`/profile/${managerId}`}
              className="flex items-center gap-3 rounded-md p-2 -mx-2 hover:bg-secondary transition-colors"
            >
              <Avatar className="h-9 w-9">
                <AvatarFallback className="text-xs font-medium font-sans bg-primary/10 text-primary">
                  {managerFirstName[0]}{managerLastName[0]}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium text-card-foreground font-sans">
                  {managerFirstName} {managerLastName}
                </p>
                <p className="text-xs text-muted-foreground font-sans">{managerJobTitle}</p>
              </div>
            </Link>
          </CardContent>
        </Card>
      )}

      {/* Direct reports */}
      {directReports.length > 0 && (
        <Card className="border border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold font-sans flex items-center gap-1.5">
              <Users className="h-3.5 w-3.5" />
              Direct reports ({directReports.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-1">
              {directReports.map((report) => (
                <Link
                  key={report.id}
                  href={`/profile/${report.id}`}
                  className="flex items-center gap-3 rounded-md p-2 -mx-2 hover:bg-secondary transition-colors"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={report.photo_url || undefined} alt={`${report.first_name} ${report.last_name}`} />
                    <AvatarFallback
                      className="text-xs font-medium font-sans"
                      style={
                        report.department_color
                          ? { backgroundColor: report.department_color + "20", color: report.department_color }
                          : undefined
                      }
                    >
                      {report.first_name[0]}{report.last_name[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium text-card-foreground font-sans">
                      {report.first_name} {report.last_name}
                    </p>
                    <p className="text-xs text-muted-foreground font-sans">{report.job_title}</p>
                  </div>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
