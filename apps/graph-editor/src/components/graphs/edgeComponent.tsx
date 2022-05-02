import React from "react"
import { EdgeProps, getBezierPath } from "react-flow-renderer"
import "./edge.styles.css"

export default function EdgeComponent({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  data,
  markerEnd
}: EdgeProps) {
  const edgePath = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition
  })

  return (
    <>
      <path
        className={`react-flow__edge-path graphix-edge stroke-[3]`}
        d={edgePath}
        id={id}
        markerEnd={markerEnd}
        style={style}
      />
      <text>
        {data?.text && (
          <textPath
            href={`#${id}`}
            startOffset="50%"
            style={{ fontSize: "12px" }}
            textAnchor="middle"
          >
            {data.text}
          </textPath>
        )}
      </text>
    </>
  )
}
