import { requireAdmin } from "@/lib/auth"
import { getAuditLog } from "@/lib/queries"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FileText, Plus, Pencil, Trash2 } from "lucide-react"
import { formatDistanceToNow } from "date-fns"

function ActionIcon({ action }: { action: string }) {
  switch (action) {
    case "create":
      return <Plus className="h-3.5 w-3.5 text-accent" />
    case "update":
      return <Pencil className="h-3.5 w-3.5 text-primary" />
    case "delete":
      return <Trash2 className="h-3.5 w-3.5 text-destructive" />
    default:
      return <FileText className="h-3.5 w-3.5 text-muted-foreground" />
  }
}

function ActionBadge({ action }: { action: string }) {
  switch (action) {
    case "create":
      return <Badge className="bg-accent/10 text-accent border-0 text-[10px] font-sans">Created</Badge>
    case "update":
      return <Badge className="bg-primary/10 text-primary border-0 text-[10px] font-sans">Updated</Badge>
    case "delete":
      return <Badge className="bg-destructive/10 text-destructive border-0 text-[10px] font-sans">Deleted</Badge>
    default:
      return <Badge variant="outline" className="text-[10px] font-sans">{action}</Badge>
  }
}

export default async function AdminAuditLogPage() {
  const [admin, logs] = await Promise.all([
    requireAdmin(),
    getAuditLog(100),
  ])

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-primary" />
          <h1 className="text-xl font-semibold text-foreground font-sans">
            Audit Log
          </h1>
        </div>
        <p className="text-sm text-muted-foreground font-sans">
          Track all changes to employees and the org structure.
        </p>
      </div>

      {logs.length === 0 ? (
        <Card className="border border-border">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <FileText className="h-10 w-10 text-muted-foreground/50 mb-3" />
            <p className="text-sm text-muted-foreground font-sans">
              No changes logged yet. Changes will appear here when employees are added, updated, or removed.
            </p>
          </CardContent>
        </Card>
      ) : (
        <Card className="border border-border">
          <CardContent className="p-0">
            <div className="divide-y divide-border">
              {logs.map((log) => {
                const changes = log.changes as Record<string, string>
                const entityName = changes?.first_name && changes?.last_name
                  ? `${changes.first_name} ${changes.last_name}`
                  : `${log.entity_type} ${log.entity_id.slice(0, 8)}`

                return (
                  <div key={log.id} className="flex items-start gap-3 p-4">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted">
                      <ActionIcon action={log.action} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <ActionBadge action={log.action} />
                        <span className="text-sm font-medium text-foreground font-sans">
                          {entityName}
                        </span>
                        <span className="text-xs text-muted-foreground font-sans">
                          ({log.entity_type})
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-muted-foreground font-sans">
                          by {log.changed_by_name || "Unknown"}
                        </span>
                        <span className="text-xs text-muted-foreground font-sans">
                          {formatDistanceToNow(new Date(log.created_at), { addSuffix: true })}
                        </span>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
