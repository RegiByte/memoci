import React from "react"
import {
  ConnectionLineComponentProps,
  getBezierPath
} from "react-flow-renderer"
import { useFlowGraphContext } from "./flowGraphContext"
import { collect } from "collect.js"

export default ({
  sourceX,
  sourceY,
  sourcePosition,
  sourceHandle,
  targetX,
  targetY,
  targetPosition,
  connectionLineType,
  connectionLineStyle,
  sourceNode
}: ConnectionLineComponentProps) => {
  const flowGraph = useFlowGraphContext()
  const nodeSchema = flowGraph.bundleMan.node?.[sourceNode!.type! || "any"]
  const socketSchema = collect(nodeSchema?.sources || [])
    .where("key", sourceHandle?.id || "any")
    .first()

  const edgePath = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  })

  return (
    <g>
      <path
        className="animated"
        // d={`M${sourceX},${sourceY} C ${sourceX} ${targetY} ${sourceX} ${targetY} ${targetX},${targetY}`}
        d={edgePath}
        fill="none"
        style={{
          stroke: socketSchema
            ? `var(--io-${socketSchema.type}-color)`
            : `#222`,
          strokeWidth: 3
        }}
      />

      <circle
        className="graphix-connection-line--head"
        cx={targetX}
        cy={targetY}
        fill="#fff"
        r={8}
        stroke="#222"
        strokeWidth={1.5}
      />
    </g>
  )
}
