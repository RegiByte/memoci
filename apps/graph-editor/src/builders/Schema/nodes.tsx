import {
  IoAttribute,
  IoAttributes,
  NodeSchema,
  NodeSocketSchema
} from "../../types/RuntimeSchema"
import produce from "immer"
import { collect } from "collect.js"

export interface NodeSchemaBuilder {
  build(): NodeSchema<IoAttribute>

  data(data: Record<string, IoAttribute>): NodeSchemaBuilder

  key(key: string): NodeSchemaBuilder

  label(label: string): NodeSchemaBuilder

  addTargetSocket(socket: NodeSocketSchema): NodeSchemaBuilder

  addSourceSocket(socket: NodeSocketSchema): NodeSchemaBuilder

  removeTargetSocket(key: string): NodeSchemaBuilder

  removeSourceSocket(key: string): NodeSchemaBuilder
}

export class NodeSchemaBuilderImpl implements NodeSchemaBuilder {
  schema: NodeSchema<IoAttributes>

  constructor(params: Partial<NodeSchema<IoAttribute>> = {}) {
    this.schema = this.getBaseSchema(params)
  }

  getBaseSchema(params: Partial<NodeSchema<IoAttribute>>) {
    return {
      key: params.key || this.getNewKey(),
      label: params.label || "Untitled node",
      data: params.data || {},
      sources: params.sources || [],
      targets: params.targets || []
    }
  }

  getNewKey() {
    return `untitled_${new Date().getTime().toString()}`
  }

  updateSchema(params: Partial<NodeSchema<IoAttributes>>): NodeSchemaBuilder {
    this.schema = produce(this.schema, draft => {
      draft!.key = params.key || draft?.key || this.getNewKey()
      draft!.label = params.label || draft?.label || "Untitled node"
      draft!.data = params.data || draft?.data || {}
      draft!.sources = params.sources || draft?.sources || []
      draft!.targets = params.targets || draft?.targets || []
      draft!.data = params.data || draft?.data || {}
    })

    return this
  }

  data(data: Record<string, IoAttribute>) {
    return this.updateSchema({
      data
    })
  }

  addSourceSocket(socket: NodeSocketSchema): NodeSchemaBuilder {
    return this.updateSchema({
      sources: collect<NodeSocketSchema>([...this.schema.sources])
        .push(socket)
        .all()
    })
  }

  addTargetSocket(socket: NodeSocketSchema): NodeSchemaBuilder {
    return this.updateSchema({
      targets: collect<NodeSocketSchema>([...this.schema.targets])
        .push(socket)
        .all()
    })
  }

  build(): NodeSchema<IoAttribute> {
    const result = JSON.parse(JSON.stringify(this.schema))
    this.schema = this.getBaseSchema({})
    return {
      ...result
    }
  }

  key(key: string): NodeSchemaBuilder {
    return this.updateSchema({
      key
    })
  }

  label(label: string): NodeSchemaBuilder {
    return this.updateSchema({
      label
    })
  }

  removeSourceSocket(key: string): NodeSchemaBuilder {
    return this.updateSchema({
      sources: collect<NodeSocketSchema>([...this.schema.sources])
        .whereNotIn("key", [key])
        .all()
    })
  }

  removeTargetSocket(key: string): NodeSchemaBuilder {
    return this.updateSchema({
      targets: collect<NodeSocketSchema>([...this.schema.targets])
        .whereNotIn("key", [key])
        .all()
    })
  }
}

export function nodeBuilder() {
  return new NodeSchemaBuilderImpl()
}
