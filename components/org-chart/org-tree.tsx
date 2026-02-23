"use client"

import { useState, useCallback } from "react"
import { OrgNodeCard } from "./org-node"
import type { OrgNode } from "@/lib/types"

interface OrgTreeBranchProps {
  node: OrgNode
  collapsedNodes: Set<string>
  onToggle: (id: string) => void
  isRoot?: boolean
}

function OrgTreeBranch({ node, collapsedNodes, onToggle, isRoot }: OrgTreeBranchProps) {
  const isCollapsed = collapsedNodes.has(node.id)
  const hasChildren = node.children.length > 0
  const childCount = node.children.length

  return (
    <div className="flex flex-col items-center">
      <OrgNodeCard
        node={node}
        isCollapsed={isCollapsed}
        onToggle={() => onToggle(node.id)}
        isRoot={isRoot}
      />

      {hasChildren && !isCollapsed && (
        <div className="flex flex-col items-center w-full">
          {/* Vertical line down from parent */}
          <div className="w-px h-8 bg-border" />

          {childCount === 1 ? (
            <OrgTreeBranch
              node={node.children[0]}
              collapsedNodes={collapsedNodes}
              onToggle={onToggle}
            />
          ) : (
            <div className="flex">
              {node.children.map((child, index) => {
                const isFirst = index === 0
                const isLast = index === childCount - 1

                return (
                  <div key={child.id} className="flex flex-col items-center">
                    {/* Horizontal + vertical connector lines */}
                    <div
                      className="h-8 w-full"
                      style={{
                        borderColor: "var(--border)",
                        borderLeft: isFirst ? "none" : "1px solid var(--border)",
                        borderRight: isLast ? "none" : "1px solid var(--border)",
                        borderTop: "1px solid var(--border)",
                        width: "100%",
                        position: "relative",
                      }}
                    >
                      {/* Center vertical drop line into child */}
                      <div
                        className="absolute left-1/2 -translate-x-1/2 top-0 w-px h-full bg-border"
                      />
                    </div>
                    <OrgTreeBranch
                      node={child}
                      collapsedNodes={collapsedNodes}
                      onToggle={onToggle}
                    />
                  </div>
                )
              })}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

interface OrgTreeProps {
  tree: OrgNode[]
}

export function OrgTree({ tree }: OrgTreeProps) {
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
            />
          ))}
        </div>
      </div>
    </div>
  )
}
