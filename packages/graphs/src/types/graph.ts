// Source is right (output - source of data)
// Target is left (input - target of edge)
export type GraphNodeSocketDirection = "source" | "target"

export interface GraphNodeSocket<D> {
  id: string
  direction: D
  type: string
  label: string
}

export interface GraphNodePosition {
  x: number
  y: number
}

export interface GraphNode {
  id: string
  type: string
  position: GraphNodePosition
  data?: any
  targets: GraphNodeSocket<"target">[]
  sources: GraphNodeSocket<"source">[]
}

export interface GraphEdge {
  id: string
  type: string
  source: string
  target: string
  sourceSocket: string
  targetSocket: string
}

export interface NodeGraphAttribute {
  id: string
  type: string
  socketType?: string
  required?: boolean
}

export interface NodeGraph {
  nodes: GraphNode[]
  edges: GraphEdge[]
  inputs: NodeGraphAttribute[]
  outputs: NodeGraphAttribute[]
}
