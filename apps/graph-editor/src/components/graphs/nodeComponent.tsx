import React from "react"
import { NodeProps } from "react-flow-renderer"
import { TwDummy } from "../UI/TwDummy"
import { useFlowGraphContext } from "./flowGraphContext"
import {
  NodeSocketDirection,
  NodeSocketSchema
} from "../../types/RuntimeSchema"
import { GraphNode } from "../../types/GraphSchema"

const NodeWrapper = TwDummy(`bg-white flex  cursor-pointer
   flex-col rounded-xl border-2 border-amber-500 transition-all hover:scale-105 min-w-[150px]`).div

const NodeHeader = TwDummy(`flex items-center justify-center border-b-2 
  border-sky-400 px-2 py-2`).div

const NodeSocketsWrapper = TwDummy(`flex-col`).div

interface NodeSocketProps extends NodeSocketSchema {
  direction: NodeSocketDirection
  node: GraphNode
}

const SocketRow = TwDummy(
  "flex w-full items-center py-2 px-2 pointer-events-none"
).div

const SocketBubbleContainer = TwDummy("px-2").div
const SocketBubble = TwDummy("h-[25px] w-[25px] inline-block rounded-full").span

function NodeSocket(props: NodeSocketProps) {
  let socketBubble = (
    <SocketBubbleContainer>
      <SocketBubble className="bg-sky-400" />
    </SocketBubbleContainer>
  )
  let content = <span>{props.label}</span>
  return (
    <SocketRow className={props.direction === 'source' ? 'justify-end' : 'justify-start'}>
      {props.direction === "target" && socketBubble}
      {content}
      {props.direction === "source" && socketBubble}
    </SocketRow>
  )
}

function NodeComponent(props: NodeProps) {
  const flowGraph = useFlowGraphContext()
  const node = flowGraph.graphBundleMan.node?.[props.id]

  if (!node) return <></>

  return (
    <NodeWrapper>
      <NodeHeader>{node.label}</NodeHeader>
      <NodeSocketsWrapper>
        <div className="flex flex-col">
          {node.sources.map(source => (
            <NodeSocket
              {...source}
              direction="source"
              key={source.key}
              node={node}
            />
          ))}
        </div>
        <div className="flex flex-col">
          {node.targets.map(target => (
            <NodeSocket
              {...target}
              direction="target"
              key={target.key}
              node={node}
            />
          ))}
        </div>
      </NodeSocketsWrapper>
    </NodeWrapper>
  )
}

export default NodeComponent
