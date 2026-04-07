import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, Phone, Calendar, Heart, MapPin } from "lucide-react"
import { format } from "date-fns"
import type { EmployeeWithDetails } from "@/lib/types"

interface ProfileDetailsProps {
  employee: EmployeeWithDetails
}

export function ProfileDetails({ employee }: ProfileDetailsProps) {
  const startDate = employee.start_date
    ? format(new Date(employee.start_date), "dd-MMM-yy")
    : null

  return (
    <div className="flex flex-col gap-4">
      {/* Bio */}
      {employee.bio && (
        <Card className="border border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold font-sans">About</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground leading-relaxed font-sans">
              {employee.bio}
            </p>
          </CardContent>
        </Card>
      )}

      {/* Contact info */}
      <Card className="border border-border">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold font-sans">Contact Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <Mail className="h-4 w-4 text-muted-foreground shrink-0" />
              <div>
                <p className="text-xs text-muted-foreground font-sans">Email</p>
                <a
                  href={`mailto:${employee.email}`}
                  className="text-sm text-primary hover:underline font-sans"
                >
                  {employee.email}
                </a>
              </div>
            </div>
            {employee.phone && (
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-muted-foreground shrink-0" />
                <div>
                  <p className="text-xs text-muted-foreground font-sans">Phone</p>
                  <p className="text-sm text-card-foreground font-sans">{employee.phone}</p>
                </div>
              </div>
            )}
            {employee.location && (
              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-muted-foreground shrink-0" />
                <div>
                  <p className="text-xs text-muted-foreground font-sans">Location</p>
                  <p className="text-sm text-card-foreground font-sans">{employee.location}</p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Employment details */}
      <Card className="border border-border">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold font-sans">Employment</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-3">

            {startDate && (
              <div className="flex items-center gap-3">
                <Calendar className="h-4 w-4 text-muted-foreground shrink-0" />
                <div>
                  <p className="text-xs text-muted-foreground font-sans">Start Date</p>
                  <p className="text-sm text-card-foreground font-sans">{startDate}</p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Interests */}
      {employee.interests && (
        <Card className="border border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold font-sans flex items-center gap-1.5">
              <Heart className="h-3.5 w-3.5" />
              Interests
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground leading-relaxed font-sans">
              {employee.interests}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
