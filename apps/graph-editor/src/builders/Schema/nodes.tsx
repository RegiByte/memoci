import {
  IoAttribute,
  NodeSchema,
  NodeSocketSchema
} from "../../types/RuntimeSchema"
import { collect } from "collect.js"

export interface NodeSchemaBuilder<T> {
  build(): NodeSchema<T>

  ioType(type: T): NodeSchemaBuilder<T>

  data(data: Record<string, T>): NodeSchemaBuilder<T>

  key(key: string): NodeSchemaBuilder<T>

  label(label: string): NodeSchemaBuilder<T>

  addTargetSocket(socket: NodeSocketSchema): NodeSchemaBuilder<T>

  addSourceSocket(socket: NodeSocketSchema): NodeSchemaBuilder<T>

  removeTargetSocket(key: string): NodeSchemaBuilder<T>

  removeSourceSocket(key: string): NodeSchemaBuilder<T>
}

export class NodeSchemaBuilderImpl<T> implements NodeSchemaBuilder<T> {
  schema: NodeSchema<T>

  constructor(params: Partial<NodeSchema<T>> = {}) {
    this.schema = this.getBaseSchema(params)
  }

  getBaseSchema(params: Partial<NodeSchema<T>>): NodeSchema<T> {
    return {
      key: params.key || this.getNewKey(),
      label: params.label || "Untitled node",
      ioType: params.ioType || ("any" as any),
      data: params.data || {},
      sources: params.sources || [],
      targets: params.targets || []
    }
  }

  getNewKey() {
    return `untitled_${new Date().getTime().toString()}`
  }

  updateSchema(params: Partial<NodeSchema<T>>): NodeSchemaBuilder<T> {
    let draft = this.schema

    return new NodeSchemaBuilderImpl({
      key: params.key || draft?.key || this.getNewKey(),
      label: params.label || draft?.label || "Untitled node",
      data: (params.data as any) || draft?.data || {},
      sources: params.sources || draft?.sources || [],
      targets: params.targets || draft?.targets || [],
      ioType: params.ioType || draft?.ioType || ("any" as any)
    })
  }

  ioType(type: T): NodeSchemaBuilder<T> {
    return this.updateSchema({
      ioType: type
    })
  }

  data(data: Record<string, T>) {
    return this.updateSchema({
      data
    })
  }

  addSourceSocket(socket: NodeSocketSchema): NodeSchemaBuilder<T> {
    return this.updateSchema({
      sources: collect<NodeSocketSchema>([...this.schema.sources])
        .push(socket)
        .all()
    })
  }

  addTargetSocket(socket: NodeSocketSchema): NodeSchemaBuilder<T> {
    return this.updateSchema({
      targets: collect<NodeSocketSchema>([...this.schema.targets])
        .push(socket)
        .all()
    })
  }

  build(): NodeSchema<T> {
    const result = JSON.parse(JSON.stringify(this.schema))
    this.schema = this.getBaseSchema({})
    return {
      ...result
    }
  }

  key(key: string): NodeSchemaBuilder<T> {
    return this.updateSchema({
      key
    })
  }

  label(label: string): NodeSchemaBuilder<T> {
    return this.updateSchema({
      label
    })
  }

  removeSourceSocket(key: string): NodeSchemaBuilder<T> {
    return this.updateSchema({
      sources: collect<NodeSocketSchema>([...this.schema.sources])
        .whereNotIn("key", [key])
        .all()
    })
  }

  removeTargetSocket(key: string): NodeSchemaBuilder<T> {
    return this.updateSchema({
      targets: collect<NodeSocketSchema>([...this.schema.targets])
        .whereNotIn("key", [key])
        .all()
    })
  }
}

export function nodeBuilder<T = IoAttribute>(
  params: Partial<NodeSchema<T>> = {}
) {
  return new NodeSchemaBuilderImpl<T>(params)
}
