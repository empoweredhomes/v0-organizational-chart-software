"use client"

import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ChevronDown, ChevronRight, Users } from "lucide-react"
import type { OrgNode } from "@/lib/types"

interface OrgNodeCardProps {
  node: OrgNode
  isCollapsed: boolean
  onToggle: () => void
  isRoot?: boolean
  isHighlighted?: boolean
}

export function OrgNodeCard({ node, isCollapsed, onToggle, isRoot, isHighlighted }: OrgNodeCardProps) {
  const initials = `${node.first_name[0]}${node.last_name[0]}`
  const hasChildren = node.children.length > 0

  return (
    <div className="flex flex-col items-center" id={`org-node-${node.id}`}>
      <div
        className={`
          relative flex flex-col items-center rounded-lg border bg-card p-3 shadow-sm
          transition-all hover:shadow-md w-48
          ${isRoot ? "border-primary/30 shadow-md" : "border-border"}
          ${isHighlighted ? "ring-2 ring-primary ring-offset-2 shadow-lg" : ""}
        `}
        style={
          node.department_color
            ? { borderTopColor: node.department_color, borderTopWidth: "3px" }
            : undefined
        }
      >
        <Link href={`/profile/${node.id}`} className="flex flex-col items-center gap-2 w-full">
          <Avatar className="h-12 w-12">
            <AvatarImage src={node.photo_url || undefined} alt={`${node.first_name} ${node.last_name}`} />
            <AvatarFallback
              className="text-sm font-medium font-sans"
              style={
                node.department_color
                  ? { backgroundColor: node.department_color + "20", color: node.department_color }
                  : undefined
              }
            >
              {initials}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col items-center text-center w-full">
            <span className="text-sm font-semibold text-card-foreground font-sans leading-tight text-balance">
              {node.first_name} {node.last_name}
            </span>
            <span className="text-xs text-muted-foreground font-sans mt-0.5 leading-tight text-balance">
              {node.job_title}
            </span>

          </div>
        </Link>

        {hasChildren && (
          <button
            onClick={(e) => {
              e.stopPropagation()
              onToggle()
            }}
            className="absolute -bottom-3 left-1/2 -translate-x-1/2 flex items-center justify-center h-6 w-6 rounded-full border bg-card shadow-sm hover:bg-secondary transition-colors"
            aria-label={isCollapsed ? "Expand team" : "Collapse team"}
          >
            {isCollapsed ? (
              <ChevronRight className="h-3 w-3 text-muted-foreground" />
            ) : (
              <ChevronDown className="h-3 w-3 text-muted-foreground" />
            )}
          </button>
        )}

        {hasChildren && (
          <div className="absolute -top-2.5 -right-2.5 flex items-center gap-0.5 text-[10px] text-muted-foreground font-sans bg-card border rounded-full px-1.5 py-0.5 shadow-sm">
            <Users className="h-3 w-3" />
            {node.children.length}
          </div>
        )}
      </div>
    </div>
  )
}
