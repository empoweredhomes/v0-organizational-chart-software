import { getEmployeeById, getDirectReports } from "@/lib/queries"
import { notFound } from "next/navigation"
import { ProfileHeader } from "@/components/profile/profile-header"
import { ProfileDetails } from "@/components/profile/profile-details"
import { DirectReportsList } from "@/components/profile/direct-reports-list"

interface ProfilePageProps {
  params: Promise<{ id: string }>
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  const { id } = await params
  const employee = await getEmployeeById(id)

  if (!employee) notFound()

  const directReports = await getDirectReports(employee.id)

  return (
    <div className="flex flex-col gap-6 p-6 max-w-4xl mx-auto">
      <ProfileHeader employee={employee} />
      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <ProfileDetails employee={employee} />
        </div>
        <div>
          <DirectReportsList
            managerId={employee.manager_id}
            managerFirstName={employee.manager_first_name}
            managerLastName={employee.manager_last_name}
            managerJobTitle={employee.manager_job_title}
            directReports={directReports}
          />
        </div>
      </div>
    </div>
  )
}
