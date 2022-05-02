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
      <MiniMap className="bottom-[135px]" />
      <Controls className="bottom-[135px] bg-white" />
      <Background
        color="var(--tw-color-purple-300)"
        variant={BackgroundVariant.Lines}
      />
    </ReactFlow>
  )
}
