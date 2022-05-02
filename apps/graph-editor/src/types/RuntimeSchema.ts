export type NodeSocketDirection = 'source' | 'target'

export interface NodeSocketSchema {
  type: IoAttribute
  key: string
  label: string
}

export interface NodeSchema<T> {
  key: string
  label: string
  ioType: T
  data: Record<string, T>
  targets: NodeSocketSchema[]
  sources: NodeSocketSchema[]
}

export interface EdgeSchema<T> {
  key: string
  label: string
  data: Record<string, T>
}

export type IoAttribute =
  | "string"
  | "number"
  | "image"
  | "array"
  | "json"
  | "json_collection"
  | "json_transform"
  | "csv_collection"
  | "csv_transform"
  | "boolean"
  | "any"

export type IoAttributes = IoAttribute

export interface RuntimeSchema<T = IoAttributes> {
  key: string
  title: string
  description?: string
  nodes: NodeSchema<T>[]
  edges: EdgeSchema<T>[]
  ioAttributes: IoAttributes[]
}
