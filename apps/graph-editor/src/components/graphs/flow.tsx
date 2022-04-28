import ReactFlow, {
  Background,
  BackgroundVariant,
  Controls,
  MiniMap,
  ReactFlowProps
} from "react-flow-renderer"
import "./flow.styles.css"
import React from "react"

interface FlowProps extends ReactFlowProps {}

export function Flow(props: FlowProps) {
  return (
    <ReactFlow {...props}>
      <MiniMap />
      <Controls className="bg-amber-400"/>
      <Background variant={BackgroundVariant.Lines} />
    </ReactFlow>
  )
}
