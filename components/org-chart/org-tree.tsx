"use client"

import { useState, useCallback } from "react"
import { OrgNodeCard } from "./org-node"
import type { OrgNode } from "@/lib/types"

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

function OrgTreeBranch({ node, collapsedNodes, onToggle, isRoot, parentDepartment, headcounts }: OrgTreeBranchProps) {
  const isCollapsed = collapsedNodes.has(node.id)
  const hasChildren = node.children.length > 0
  const childCount = node.children.length

  // Show department banner when this node's department differs from parent's
  const showDeptBanner = !isRoot && node.department_name && node.department_name !== parentDepartment
  const deptInfo = showDeptBanner ? headcounts.get(node.department_name!) : null

  return (
    <div className="flex flex-col items-center">
      {showDeptBanner && (
        <>
          <div
            className="flex items-center justify-between rounded-md border px-3 py-1.5 w-48 font-sans"
            style={{
              borderColor: node.department_color || "var(--border)",
              backgroundColor: (node.department_color || "#6366f1") + "12",
            }}
          >
            <span
              className="text-sm font-semibold leading-tight"
              style={{ color: node.department_color || "var(--foreground)" }}
            >
              {node.department_name}
            </span>
            <span
              className="text-sm font-semibold tabular-nums"
              style={{ color: node.department_color || "var(--muted-foreground)" }}
            >
              {deptInfo?.count ?? ""}
            </span>
          </div>
          {/* Vertical line from department banner to person card */}
          <div className="w-px h-6 bg-border" />
        </>
      )}

      <OrgNodeCard
        node={node}
        isCollapsed={isCollapsed}
        onToggle={() => onToggle(node.id)}
        isRoot={isRoot}
      />

      {hasChildren && !isCollapsed && (
        <>
          {/* Single vertical line down from parent to the horizontal rail */}
          <div className="w-px h-8 bg-border" />

          {childCount === 1 ? (
            <OrgTreeBranch
              node={node.children[0]}
              collapsedNodes={collapsedNodes}
              onToggle={onToggle}
              parentDepartment={node.department_name}
              headcounts={headcounts}
            />
          ) : (
            /* Children row with a shared horizontal rail */
            <div className="flex items-start">
              {node.children.map((child, index) => {
                const isFirst = index === 0
                const isLast = index === childCount - 1

                return (
                  <div key={child.id} className="flex flex-col items-center px-1.5">
                    {/* Horizontal rail segment + vertical drop */}
                    <div className="relative w-full h-8">
                      {/* Horizontal rail: extends left half (unless first) and right half (unless last) */}
                      <div
                        className="absolute top-0 h-px bg-border"
                        style={{
                          left: isFirst ? "50%" : 0,
                          right: isLast ? "50%" : 0,
                        }}
                      />
                      {/* Single vertical drop from rail center into child */}
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-border" />
                    </div>
                    <OrgTreeBranch
                      node={child}
                      collapsedNodes={collapsedNodes}
                      onToggle={onToggle}
                      parentDepartment={node.department_name}
                      headcounts={headcounts}
                    />
                  </div>
                )
              })}
            </div>
          )}
        </>
      )}
    </div>
  )
}

interface OrgTreeProps {
  tree: OrgNode[]
  headcounts: DepartmentHeadcount[]
}

export function OrgTree({ tree, headcounts: headcountsList }: OrgTreeProps) {
  const headcountsMap = new Map<string, DepartmentHeadcount>()
  for (const hc of headcountsList) {
    headcountsMap.set(hc.department_name, hc)
  }
  const [collapsedNodes, setCollapsedNodes] = useState<Set<string>>(() => {
    // Start with level 3+ collapsed for readability
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

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2 px-1">
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

      <div className="overflow-auto">
        <div className="inline-flex flex-col items-center min-w-max p-8">
          {tree.map((root) => (
            <OrgTreeBranch
              key={root.id}
              node={root}
              collapsedNodes={collapsedNodes}
              onToggle={toggleNode}
              isRoot
              parentDepartment={null}
              headcounts={headcountsMap}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
