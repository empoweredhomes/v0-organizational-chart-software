"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
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

export function PRDMobileNav({
  activeSection,
  onSectionClick,
}: {
  activeSection: string
  onSectionClick: (id: string) => void
}) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="lg:hidden sticky top-0 z-50 bg-card border-b border-border">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-md bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-xs font-sans">M</span>
          </div>
          <div>
            <p className="font-semibold text-sm text-card-foreground font-sans">Mysa OrgChart</p>
            <p className="text-xs text-muted-foreground font-sans">PRD</p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle navigation"
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </Button>
      </div>
      {isOpen && (
        <nav className="border-t border-border px-4 py-3 bg-card" aria-label="Document sections">
          <ul className="flex flex-col gap-0.5" role="list">
            {sections.map((section) => {
              const Icon = section.icon
              return (
                <li key={section.id}>
                  <button
                    onClick={() => {
                      onSectionClick(section.id)
                      setIsOpen(false)
                    }}
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
      )}
    </div>
  )
}
