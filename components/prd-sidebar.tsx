"use client"

import { cn } from "@/lib/utils"
import {
  FileText,
  Target,
  Users,
  LayoutGrid,
  Layers,
  GitBranch,
  Shield,
  BarChart3,
  Calendar,
  CheckCircle2,
} from "lucide-react"

const sections = [
  { id: "overview", label: "Overview", icon: FileText },
  { id: "objectives", label: "Objectives & Goals", icon: Target },
  { id: "users", label: "Target Users", icon: Users },
  { id: "org-structure", label: "Mysa Org Structure", icon: GitBranch },
  { id: "features", label: "Core Features", icon: LayoutGrid },
  { id: "feature-details", label: "Feature Details", icon: Layers },
  { id: "integrations", label: "Integrations", icon: Shield },
  { id: "metrics", label: "Success Metrics", icon: BarChart3 },
  { id: "phases", label: "Phased Rollout", icon: Calendar },
  { id: "risks", label: "Risks & Mitigations", icon: CheckCircle2 },
]

export function PRDSidebar({
  activeSection,
  onSectionClick,
}: {
  activeSection: string
  onSectionClick: (id: string) => void
}) {
  return (
    <aside className="hidden lg:flex flex-col w-64 shrink-0 sticky top-0 h-screen border-r border-border bg-card">
      <div className="p-6 border-b border-border">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm font-sans">M</span>
          </div>
          <div>
            <p className="font-semibold text-sm text-card-foreground font-sans">Mysa OrgChart</p>
            <p className="text-xs text-muted-foreground font-sans">Product Requirements</p>
          </div>
        </div>
      </div>
      <nav className="flex-1 overflow-y-auto p-4" aria-label="Document sections">
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3 px-2 font-sans">
          Sections
        </p>
        <ul className="flex flex-col gap-0.5" role="list">
          {sections.map((section) => {
            const Icon = section.icon
            return (
              <li key={section.id}>
                <button
                  onClick={() => onSectionClick(section.id)}
                  className={cn(
                    "flex items-center gap-2.5 w-full px-2.5 py-2 rounded-md text-sm transition-colors font-sans",
                    activeSection === section.id
                      ? "bg-primary/10 text-primary font-medium"
                      : "text-muted-foreground hover:text-card-foreground hover:bg-secondary"
                  )}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  {section.label}
                </button>
              </li>
            )
          })}
        </ul>
      </nav>
      <div className="p-4 border-t border-border">
        <div className="px-2.5 py-2 rounded-md bg-secondary">
          <p className="text-xs font-medium text-card-foreground font-sans">Status</p>
          <p className="text-xs text-muted-foreground font-sans mt-0.5">Draft v1.0 - Feb 2026</p>
        </div>
      </div>
    </aside>
  )
}
