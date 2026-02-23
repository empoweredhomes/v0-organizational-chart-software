"use client"

import { useState, useEffect, useCallback } from "react"
import { PRDSidebar } from "@/components/prd-sidebar"
import { PRDContent } from "@/components/prd-content"
import { PRDMobileNav } from "@/components/prd-mobile-nav"

const sectionIds = [
  "overview",
  "objectives",
  "users",
  "org-structure",
  "features",
  "feature-details",
  "phases",
  "risks",
]

export default function PRDPage() {
  const [activeSection, setActiveSection] = useState("overview")

  const handleSectionClick = useCallback((id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => {
            const aIndex = sectionIds.indexOf(a.target.id)
            const bIndex = sectionIds.indexOf(b.target.id)
            return aIndex - bIndex
          })

        if (visible.length > 0) {
          setActiveSection(visible[0].target.id)
        }
      },
      {
        rootMargin: "-80px 0px -60% 0px",
        threshold: 0,
      }
    )

    sectionIds.forEach((id) => {
      const element = document.getElementById(id)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <div className="flex min-h-screen bg-background">
      <PRDSidebar activeSection={activeSection} onSectionClick={handleSectionClick} />
      <div className="flex-1 flex flex-col min-w-0">
        <PRDMobileNav activeSection={activeSection} onSectionClick={handleSectionClick} />
        <PRDContent />
      </div>
    </div>
  )
}
