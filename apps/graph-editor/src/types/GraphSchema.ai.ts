interface NodeSocketSchema {
  type: IoAttribute
  key: string
  label: string
}

type IoAttribute =
  | "string"
  | "number"
  | "image"
  | "array"
  | "json"
  | "boolean"
  | "any"

export interface GraphIoSchema<T> {
  type: T
  key: string
  label?: string
  defaultValue?: any
  required?: boolean
}

export interface GraphNodeData<T> {
  type: T
  key: string
  value: any
}

export interface GraphNodePosition {
  x: number
  y: number
}

export interface GraphNode {
  type: string
  data?: Record<string, any>
  position: GraphNodePosition
  key: string
  label: string
  targets: NodeSocketSchema[]
  sources: NodeSocketSchema[]
}

export interface GraphEdge {
  key: string
  type: string
  source: string
  target: string
  sourceSocket: string
  targetSocket: string
  data?: Record<string, any>
}

export type GraphIoMap<T = IoAttribute> = Record<string, GraphIoSchema<T>>

export interface GraphSchema<T = IoAttribute> {
  key: string
  title: string
  description?: string
  docs?: string
  nodes: GraphNode[]
  edges: GraphEdge[]
  inputs: GraphIoMap<T>
  outputs: GraphIoMap<T>
}
