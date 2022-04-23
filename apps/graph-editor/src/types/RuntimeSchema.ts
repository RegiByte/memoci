interface NodeSchema<T> {
  type: string
  label: string
  data: T
}

interface EdgeSchema<T> {
  type: string
  label: string
  data: T
}

export interface IoAttribute<T> {
  type: string
  data: T
}

export interface RuntimeSchema {
  nodes: NodeSchema<any>[]
  edges: EdgeSchema<any>[]
  ioAttributes: IoAttribute<any>[]
}
