"use client"

import { useState, useCallback, useMemo, useRef, useEffect } from "react"
import { OrgNodeCard } from "./org-node"
import { Search, X, ZoomIn, ZoomOut, Maximize } from "lucide-react"
import type { OrgNode } from "@/lib/types"

const ZOOM_STEP = 0.1
const MIN_ZOOM = 0.2
const MAX_ZOOM = 1.5

interface DepartmentHeadcount {
  department_name: string
  color: string
  count: number
}

interface OrgTreeBranchProps {
  node: OrgNode
  collapsedNodes: Set<string>
  onToggle: (id: string) => void
  isRoot?: boolean
  parentDepartment?: string | null
  headcounts: Map<string, DepartmentHeadcount>
}

// Department banner component
function DepartmentBanner({ name, color, count }: { name: string; color?: string | null; count?: number }) {
  return (
    <div
      className="flex items-center justify-between rounded-md border px-3 py-1.5 w-48 font-sans"
      style={{
        borderColor: color || "var(--border)",
        backgroundColor: (color || "#6366f1") + "12",
      }}
    >
      <span
        className="text-sm font-semibold leading-tight"
        style={{ color: color || "var(--foreground)" }}
      >
        {name}
      </span>
      <span
        className="text-sm font-semibold tabular-nums"
        style={{ color: color || "var(--muted-foreground)" }}
      >
        {count ?? ""}
      </span>
    </div>
  )
}

// Counts all nodes in a subtree (including the root node itself)
function countSubtree(node: OrgNode): number {
  let count = 1
  for (const child of node.children) {
    count += countSubtree(child)
  }
  return count
}

// Counts all nodes across multiple subtrees
function countSubtrees(nodes: OrgNode[]): number {
  return nodes.reduce((sum, node) => sum + countSubtree(node), 0)
}

// Groups consecutive children that share the same "new" department
// (i.e. department differs from parent) into grouped entries
interface DeptGroup {
  type: "group"
  department: string
  color: string | null
  count: number
  children: OrgNode[]
}
interface SingleChild {
  type: "single"
  child: OrgNode
}
interface SinglesCluster {
  type: "singles"
  children: OrgNode[]
}
type ChildEntry = DeptGroup | SingleChild | SinglesCluster

function groupChildrenByDept(children: OrgNode[], parentDept: string | null): ChildEntry[] {
  const entries: ChildEntry[] = []
  const deptGroupMap = new Map<string, DeptGroup>()
  const singles: OrgNode[] = []

  for (const child of children) {
    const isNewDept = child.department_name && child.department_name !== parentDept

    if (isNewDept) {
      const existing = deptGroupMap.get(child.department_name!)
      if (existing) {
        existing.children.push(child)
        // Recalculate count to include new child's subtree
        existing.count = countSubtrees(existing.children)
      } else {
        const group: DeptGroup = {
          type: "group",
          department: child.department_name!,
          color: child.department_color || null,
          count: countSubtree(child),
          children: [child],
        }
        deptGroupMap.set(child.department_name!, group)
        entries.push(group)
      }
    } else {
      singles.push(child)
    }
  }

  // Consolidate all singles into one cluster at the end
  if (singles.length === 1) {
    entries.push({ type: "single", child: singles[0] })
  } else if (singles.length > 1) {
    entries.push({ type: "singles", children: singles })
  }

  return entries
}

// Renders children (one or more) under a connector rail
function ChildrenRail({ children, parentDepartment, collapsedNodes, onToggle, headcounts, highlightId }: {
  children: OrgNode[]
  parentDepartment: string | null
  collapsedNodes: Set<string>
  onToggle: (id: string) => void
  headcounts: Map<string, DepartmentHeadcount>
  highlightId?: string | null
}) {
  if (children.length === 1) {
    return (
      <OrgTreeBranch
        node={children[0]}
        collapsedNodes={collapsedNodes}
        onToggle={onToggle}
        parentDepartment={parentDepartment}
        headcounts={headcounts}
        showBanner={false}
        highlightId={highlightId}
      />
    )
  }

  return (
    <div className="flex items-start">
      {children.map((child, index) => {
        const isFirst = index === 0
        const isLast = index === children.length - 1
        return (
          <div key={child.id} className="flex flex-col items-center px-1.5">
            <div className="relative w-full h-8">
              <div
                className="absolute top-0 h-[1.5px] bg-border"
                style={{
                  left: isFirst ? "50%" : "-6px",
                  right: isLast ? "50%" : "-6px",
                }}
              />
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1.5px] h-full bg-border" />
            </div>
            <OrgTreeBranch
              node={child}
              collapsedNodes={collapsedNodes}
              onToggle={onToggle}
              parentDepartment={parentDepartment}
              headcounts={headcounts}
              showBanner={false}
              highlightId={highlightId}
            />
          </div>
        )
      })}
    </div>
  )
}

function OrgTreeBranch({ node, collapsedNodes, onToggle, isRoot, parentDepartment, headcounts, showBanner = true, highlightId }: OrgTreeBranchProps & { showBanner?: boolean; highlightId?: string | null }) {
  const isCollapsed = collapsedNodes.has(node.id)
  const hasChildren = node.children.length > 0

  return (
    <div className="flex flex-col items-center">
      <OrgNodeCard
        node={node}
        isCollapsed={isCollapsed}
        onToggle={() => onToggle(node.id)}
        isRoot={isRoot}
        isHighlighted={highlightId === node.id}
      />

      {hasChildren && !isCollapsed && (
        <>
          {/* Single vertical line down from parent to the horizontal rail */}
          <div className="w-[1.5px] h-8 bg-border" />

          {(() => {
            const entries = groupChildrenByDept(node.children, node.department_name)
            const totalEntries = entries.length

            if (totalEntries === 1) {
              const entry = entries[0]
              if (entry.type === "group") {
                return (
                  <div className="flex flex-col items-center">
                    <DepartmentBanner name={entry.department} color={entry.color} count={entry.count} />
                    <div className="w-[1.5px] h-6 bg-border" />
                    <ChildrenRail
                      children={entry.children}
                      parentDepartment={entry.department}
                      collapsedNodes={collapsedNodes}
                      onToggle={onToggle}
                      headcounts={headcounts}
                      highlightId={highlightId}
                    />
                  </div>
                )
              } else if (entry.type === "singles") {
                return (
                  <ChildrenRail
                    children={entry.children}
                    parentDepartment={node.department_name}
                    collapsedNodes={collapsedNodes}
                    onToggle={onToggle}
                    headcounts={headcounts}
                    highlightId={highlightId}
                  />
                )
              } else {
                return (
                  <OrgTreeBranch
                    node={entry.child}
                    collapsedNodes={collapsedNodes}
                    onToggle={onToggle}
                    parentDepartment={node.department_name}
                    headcounts={headcounts}
                    highlightId={highlightId}
                  />
                )
              }
            }

            return (
              <div className="flex items-start">
                {entries.map((entry, index) => {
                  const isFirst = index === 0
                  const isLast = index === totalEntries - 1

                  return (
                    <div key={entry.type === "group" ? entry.department : entry.type === "singles" ? "singles-cluster" : entry.child.id} className="flex flex-col items-center px-1.5">
                      {/* Horizontal rail segment + vertical drop */}
                      <div className="relative w-full h-8">
                        <div
                          className="absolute top-0 h-[1.5px] bg-border"
                          style={{
                            left: isFirst ? "50%" : "-6px",
                            right: isLast ? "50%" : "-6px",
                          }}
                        />
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1.5px] h-full bg-border" />
                      </div>

                      {entry.type === "group" ? (
                        <div className="flex flex-col items-center">
                          <DepartmentBanner name={entry.department} color={entry.color} count={entry.count} />
                          <div className="w-[1.5px] h-6 bg-border" />
                          <ChildrenRail
                            children={entry.children}
                            parentDepartment={entry.department}
                            collapsedNodes={collapsedNodes}
                            onToggle={onToggle}
                            headcounts={headcounts}
                            highlightId={highlightId}
                          />
                        </div>
                      ) : entry.type === "singles" ? (
                        <ChildrenRail
                          children={entry.children}
                          parentDepartment={node.department_name}
                          collapsedNodes={collapsedNodes}
                          onToggle={onToggle}
                          headcounts={headcounts}
                          highlightId={highlightId}
                        />
                      ) : (
                        <OrgTreeBranch
                          node={entry.child}
                          collapsedNodes={collapsedNodes}
                          onToggle={onToggle}
                          parentDepartment={node.department_name}
                          headcounts={headcounts}
                          highlightId={highlightId}
                        />
                      )}
                    </div>
                  )
                })}
              </div>
            )
          })()}
        </>
      )}
    </div>
  )
}

interface OrgTreeProps {
  tree: OrgNode[]
  headcounts: DepartmentHeadcount[]
}

// Flatten the tree into a list of { id, name, path } for searching
function flattenTree(nodes: OrgNode[], path: string[] = []): { id: string; name: string; title: string; ancestorIds: string[] }[] {
  const result: { id: string; name: string; title: string; ancestorIds: string[] }[] = []
  for (const node of nodes) {
    result.push({
      id: node.id,
      name: `${node.first_name} ${node.last_name}`,
      title: node.job_title,
      ancestorIds: [...path],
    })
    result.push(...flattenTree(node.children, [...path, node.id]))
  }
  return result
}

export function OrgTree({ tree, headcounts: headcountsList }: OrgTreeProps) {
  const headcountsMap = new Map<string, DepartmentHeadcount>()
  for (const hc of headcountsList) {
    headcountsMap.set(hc.department_name, hc)
  }

  const [search, setSearch] = useState("")
  const [highlightId, setHighlightId] = useState<string | null>(null)
  const [zoom, setZoom] = useState(0.55)
  const containerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  const zoomIn = useCallback(() => setZoom((z) => Math.min(MAX_ZOOM, z + ZOOM_STEP)), [])
  const zoomOut = useCallback(() => setZoom((z) => Math.max(MIN_ZOOM, z - ZOOM_STEP)), [])
  const fitToScreen = useCallback(() => {
    if (!containerRef.current || !contentRef.current) return
    const container = containerRef.current.getBoundingClientRect()
    const content = contentRef.current
    // Reset zoom to 1 to measure actual size
    const actualWidth = content.scrollWidth / zoom
    const actualHeight = content.scrollHeight / zoom
    const scaleX = (container.width - 32) / actualWidth
    const scaleY = (container.height - 32) / actualHeight
    setZoom(Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, Math.min(scaleX, scaleY))))
  }, [zoom])

  const flatList = useMemo(() => flattenTree(tree), [tree])

  const searchResults = useMemo(() => {
    if (search.length < 2) return []
    const q = search.toLowerCase()
    return flatList.filter(
      (e) => e.name.toLowerCase().includes(q) || e.title.toLowerCase().includes(q)
    ).slice(0, 8)
  }, [search, flatList])

  const [collapsedNodes, setCollapsedNodes] = useState<Set<string>>(() => {
    const collapsed = new Set<string>()
    function walkTree(nodes: OrgNode[], depth: number) {
      for (const node of nodes) {
        if (depth >= 2 && node.children.length > 0) {
          collapsed.add(node.id)
        }
        walkTree(node.children, depth + 1)
      }
    }
    walkTree(tree, 0)
    return collapsed
  })

  const toggleNode = useCallback((id: string) => {
    setCollapsedNodes((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }, [])

  const expandAll = useCallback(() => {
    setCollapsedNodes(new Set())
  }, [])

  const collapseAll = useCallback(() => {
    const collapsed = new Set<string>()
    function walkTree(nodes: OrgNode[]) {
      for (const node of nodes) {
        if (node.children.length > 0) {
          collapsed.add(node.id)
        }
        walkTree(node.children)
      }
    }
    walkTree(tree)
    setCollapsedNodes(collapsed)
  }, [tree])

  const selectEmployee = useCallback((entry: { id: string; ancestorIds: string[] }) => {
    // Expand all ancestors so the node is visible
    setCollapsedNodes((prev) => {
      const next = new Set(prev)
      for (const aid of entry.ancestorIds) {
        next.delete(aid)
      }
      return next
    })
    setHighlightId(entry.id)
    setSearch("")
    // Scroll to the node after a short delay
    setTimeout(() => {
      const el = document.getElementById(`org-node-${entry.id}`)
      el?.scrollIntoView({ behavior: "smooth", block: "center", inline: "center" })
    }, 150)
  }, [])

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <button
            onClick={expandAll}
            className="text-xs text-primary hover:underline font-sans"
          >
            Expand all
          </button>
          <span className="text-xs text-muted-foreground">/</span>
          <button
            onClick={collapseAll}
            className="text-xs text-primary hover:underline font-sans"
          >
            Collapse all
          </button>
        </div>

        {/* Search bar */}
        <div className="relative">
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
            <input
              type="text"
              value={search}
              onChange={(e) => { setSearch(e.target.value); setHighlightId(null) }}
              placeholder="Search employee..."
              className="h-8 w-56 rounded-md border border-border bg-background pl-8 pr-8 text-sm font-sans placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
            />
            {search && (
              <button
                onClick={() => { setSearch(""); setHighlightId(null) }}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
          {searchResults.length > 0 && (
            <div className="absolute right-0 top-full mt-1 z-50 w-72 rounded-md border border-border bg-card shadow-lg overflow-hidden">
              {searchResults.map((entry) => (
                <button
                  key={entry.id}
                  onClick={() => selectEmployee(entry)}
                  className="w-full text-left px-3 py-2 hover:bg-accent/50 transition-colors border-b border-border last:border-b-0"
                >
                  <p className="text-sm font-medium font-sans text-foreground">{entry.name}</p>
                  <p className="text-xs text-muted-foreground font-sans">{entry.title}</p>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div ref={containerRef} className="relative overflow-auto flex-1" style={{ minHeight: "70vh" }}>
        <div
          ref={contentRef}
          className="inline-flex flex-col items-center min-w-max p-8"
          style={{
            transform: `scale(${zoom})`,
            transformOrigin: "top center",
          }}
        >
          {tree.map((root) => (
            <OrgTreeBranch
              key={root.id}
              node={root}
              collapsedNodes={collapsedNodes}
              onToggle={toggleNode}
              isRoot
              parentDepartment={null}
              headcounts={headcountsMap}
              highlightId={highlightId}
            />
          ))}
        </div>

        {/* Zoom controls - bottom right */}
        <div className="sticky bottom-4 float-right mr-4 flex items-center gap-1 rounded-lg border border-border bg-card shadow-md p-1">
          <button
            onClick={zoomOut}
            className="flex items-center justify-center h-8 w-8 rounded-md hover:bg-accent transition-colors"
            title="Zoom out"
          >
            <ZoomOut className="h-4 w-4 text-foreground" />
          </button>
          <span className="text-xs font-mono text-muted-foreground w-12 text-center select-none">
            {Math.round(zoom * 100)}%
          </span>
          <button
            onClick={zoomIn}
            className="flex items-center justify-center h-8 w-8 rounded-md hover:bg-accent transition-colors"
            title="Zoom in"
          >
            <ZoomIn className="h-4 w-4 text-foreground" />
          </button>
          <div className="w-px h-5 bg-border mx-0.5" />
          <button
            onClick={fitToScreen}
            className="flex items-center justify-center h-8 w-8 rounded-md hover:bg-accent transition-colors"
            title="Fit to screen"
          >
            <Maximize className="h-4 w-4 text-foreground" />
          </button>
        </div>
      </div>
    </div>
  )
}
