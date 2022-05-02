import React from "react"
import { Handle, NodeProps, Position } from "react-flow-renderer"
import { TwDummy } from "../UI/TwDummy"
import { useFlowGraphContext } from "./flowGraphContext"
import {
  NodeSocketDirection,
  NodeSocketSchema
} from "../../types/RuntimeSchema"
import { GraphNode } from "../../types/GraphSchema"

const NodeWrapper = TwDummy(`bg-white flex  cursor-pointer
   flex-col rounded-xl border-2 min-w-[150px]`).div

const NodeHeader = TwDummy(
  `flex items-center justify-center border-b-2 px-2 py-2`
).div

const NodeSocketsWrapper = TwDummy(`flex flex-col`).div

interface NodeSocketProps {
  direction: NodeSocketDirection
  node: GraphNode
  socket: NodeSocketSchema
}

const SocketRow = TwDummy(
  "flex w-full items-center py-2 px-2 pointer-events-none"
).div

const SocketBubbleContainer = TwDummy("px-2").div
const SocketBubble = TwDummy("h-[25px] w-[25px] inline-block rounded-full").span

function NodeSocket({ direction, socket, node }: NodeSocketProps) {
  let socketBubble = (
    <SocketBubbleContainer className={`relative`}>
      <Handle
        className={`p-2`}
        id={socket.key}
        position={direction === "source" ? Position.Right : Position.Left}
        type={direction}
        style={{
          backgroundColor: `var(--io-${socket.type}-color)`
        }}
        onConnect={params => {
          console.log(params)
        }}
      />
    </SocketBubbleContainer>
  )
  let content = <span>{socket.label}</span>
  return (
    <SocketRow
      className={direction === "source" ? "justify-end" : "justify-start"}
    >
      {direction === "target" && socketBubble}
      {content}
      {direction === "source" && socketBubble}
    </SocketRow>
  )
}

function getIoColorVariable(type: string) {
  return `var(--io-${type}-color)`
}

function NodeComponent(props: NodeProps) {
  const flowGraph = useFlowGraphContext()
  const node = flowGraph.graphBundleMan.node?.[props.id]
  const nodeSchema = flowGraph.bundleMan.node?.[props.type]

  if (!node || !nodeSchema) return <></>

  return (
    <NodeWrapper
      style={{
        borderColor: getIoColorVariable(nodeSchema.ioType)
      }}
    >
      <NodeHeader
        style={{
          borderColor: getIoColorVariable(nodeSchema.ioType)
        }}
      >
        {node.label}
      </NodeHeader>
      <NodeSocketsWrapper>
        <NodeSocketsWrapper>
          {node.sources.map(source => (
            <NodeSocket
              direction="source"
              key={source.key}
              node={node}
              socket={source}
            />
          ))}
        </NodeSocketsWrapper>
        <NodeSocketsWrapper>
          {node.targets.map(target => (
            <NodeSocket
              direction="target"
              key={target.key}
              node={node}
              socket={target}
            />
          ))}
        </NodeSocketsWrapper>
      </NodeSocketsWrapper>
    </NodeWrapper>
  )
}

export default NodeComponent
