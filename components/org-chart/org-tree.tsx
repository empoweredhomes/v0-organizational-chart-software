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

  return (
    <div className="flex flex-col items-center">
      <OrgNodeCard
        node={node}
        isCollapsed={isCollapsed}
        onToggle={() => onToggle(node.id)}
        isRoot={isRoot}
      />

      {hasChildren && !isCollapsed && (
        <>
          {/* Vertical line from parent */}
          <div className="w-px h-6 bg-border" />

          {/* Horizontal connector for multiple children */}
          {node.children.length > 1 && (
            <div className="relative flex items-start">
              <div
                className="absolute top-0 bg-border"
                style={{
                  height: "1px",
                  left: `calc(50% / ${node.children.length})`,
                  right: `calc(50% / ${node.children.length})`,
                }}
              />
            </div>
          )}

          {/* Children */}
          <div className="flex gap-2 pt-0">
            {node.children.map((child) => (
              <div key={child.id} className="flex flex-col items-center">
                {node.children.length > 1 && (
                  <div className="w-px h-6 bg-border" />
                )}
                <OrgTreeBranch
                  node={child}
                  collapsedNodes={collapsedNodes}
                  onToggle={onToggle}
                />
              </div>
            ))}
          </div>
        </>
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
