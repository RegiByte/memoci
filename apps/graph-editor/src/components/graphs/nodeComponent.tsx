import React from "react"
import { NodeProps } from "react-flow-renderer"
import { TwDummy } from "../UI/TwDummy"
import { useFlowGraphContext } from "./flowGraphContext"

const NodeWrapper =
  TwDummy(`bg-white flex  cursor-pointer
   flex-col rounded-xl border-2 border-amber-500 transition-all hover:scale-105`).div

const NodeHeader = TwDummy(`flex items-center justify-center border-b-2 
  border-sky-400 px-2 py-2`).div

const NodeSocketsWrapper = TwDummy(`flex-col`).div

function NodeComponent(props: NodeProps) {
  const flowGraph = useFlowGraphContext()
  console.log(JSON.stringify(flowGraph.runtimeSchema.nodes[2], null, 2))

  return (
    <NodeWrapper>
      <NodeHeader>{props.type}</NodeHeader>
      <NodeSocketsWrapper>
        Howdy
      </NodeSocketsWrapper>
    </NodeWrapper>
  )
}

export default NodeComponent
