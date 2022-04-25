export type NodeSocketDirection = 'source' | 'target'

export interface NodeSocketSchema {
  type: IoAttribute
  key: string
  label: string
}

export interface NodeSchema<T> {
  key: string
  label: string
  data: Record<string, T>
  targets: NodeSocketSchema[]
  sources: NodeSocketSchema[]
}

export interface EdgeSchema<T> {
  key: string
  label: string
  data: Record<string, T>
}

export type IoAttribute = "string" | "number" | "image" | "json"

export type IoAttributes = IoAttribute

export interface RuntimeSchema {
  key: string
  title: string
  description?: string
  nodes: NodeSchema<IoAttributes>[]
  edges: EdgeSchema<IoAttributes>[]
  ioAttributes: IoAttributes[]
}
