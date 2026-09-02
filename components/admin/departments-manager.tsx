"use client"

import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { createDepartment, deleteDepartment } from "@/app/actions/admin"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Building2, Users, Plus, Trash2 } from "lucide-react"
import type { Department } from "@/lib/types"

interface DepartmentsManagerProps {
  departments: Department[]
  headcountMap: Record<string, number>
}

const PRESET_COLORS = [
  "#ef4444",
  "#f59e0b",
  "#10b981",
  "#3b82f6",
  "#8b5cf6",
  "#ec4899",
  "#14b8a6",
  "#64748b",
]

export function DepartmentsManager({ departments, headcountMap }: DepartmentsManagerProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState<Department | null>(null)
  const [name, setName] = useState("")
  const [color, setColor] = useState(PRESET_COLORS[3])
  const [error, setError] = useState<string | null>(null)

  function handleCreate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    const formData = new FormData()
    formData.set("name", name)
    formData.set("color", color)
    startTransition(async () => {
      const result = await createDepartment(formData)
      if (result?.error) {
        setError(result.error)
        return
      }
      setName("")
      setColor(PRESET_COLORS[3])
      setIsAddOpen(false)
      router.refresh()
    })
  }

  function handleDelete() {
    if (!deleteTarget) return
    const id = deleteTarget.id
    startTransition(async () => {
      await deleteDepartment(id)
      setDeleteTarget(null)
      router.refresh()
    })
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-end">
        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
          <DialogTrigger asChild>
            <Button className="font-sans gap-2">
              <Plus className="h-4 w-4" />
              Add Department
            </Button>
          </DialogTrigger>
          <DialogContent>
            <form onSubmit={handleCreate}>
              <DialogHeader>
                <DialogTitle className="font-sans">Add Department</DialogTitle>
                <DialogDescription className="font-sans">
                  Create a new department. Employees can be assigned to it afterward.
                </DialogDescription>
              </DialogHeader>
              <div className="flex flex-col gap-4 py-4">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="dept-name" className="font-sans">Name</Label>
                  <Input
                    id="dept-name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Marketing"
                    className="font-sans"
                    autoFocus
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label className="font-sans">Color</Label>
                  <div className="flex flex-wrap gap-2">
                    {PRESET_COLORS.map((c) => (
                      <button
                        key={c}
                        type="button"
                        onClick={() => setColor(c)}
                        className={`h-8 w-8 rounded-full transition-transform ${
                          color === c ? "ring-2 ring-offset-2 ring-ring scale-110" : ""
                        }`}
                        style={{ backgroundColor: c }}
                        aria-label={`Select color ${c}`}
                      />
                    ))}
                  </div>
                </div>
                {error && (
                  <p className="text-sm text-destructive font-sans">{error}</p>
                )}
              </div>
              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsAddOpen(false)}
                  className="font-sans"
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isPending} className="font-sans">
                  {isPending ? "Creating..." : "Create"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {departments.map((dept) => {
          const count = headcountMap[dept.name] || 0
          return (
            <Card key={dept.id} className="border border-border">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className="h-4 w-4 rounded-full shrink-0"
                      style={{ backgroundColor: dept.color }}
                    />
                    <CardTitle className="text-base font-sans truncate">{dept.name}</CardTitle>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 shrink-0 text-muted-foreground hover:text-destructive"
                    onClick={() => setDeleteTarget(dept)}
                    aria-label={`Delete ${dept.name}`}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="font-sans text-xs gap-1">
                    <Users className="h-3 w-3" />
                    {count} {count === 1 ? "person" : "people"}
                  </Badge>
                  <div className="h-2 flex-1 rounded-full bg-muted">
                    <div
                      className="h-2 rounded-full transition-all"
                      style={{
                        backgroundColor: dept.color,
                        width: `${Math.min((count / 20) * 100, 100)}%`,
                      }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <AlertDialog open={deleteTarget !== null} onOpenChange={(open) => !open && setDeleteTarget(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="font-sans">
              Delete {deleteTarget?.name}?
            </AlertDialogTitle>
            <AlertDialogDescription className="font-sans">
              This will permanently delete the department.
              {(headcountMap[deleteTarget?.name || ""] || 0) > 0 && (
                <>
                  {" "}
                  The {headcountMap[deleteTarget?.name || ""]} employee(s) in this department
                  will be unassigned (not deleted).
                </>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="font-sans">Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isPending}
              className="font-sans bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isPending ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
