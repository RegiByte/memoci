import {
  EdgeSchema,
  IoAttribute,
  NodeSchema,
  RuntimeSchema
} from "../../types/RuntimeSchema"
import produce from "immer"
import { collect } from "collect.js"
import { nodeBuilder, NodeSchemaBuilder } from "./nodes"

type CreateNodeFn = (builder: NodeSchemaBuilder) => NodeSchema<IoAttribute>

export interface SchemaBuilder {
  build(): RuntimeSchema

  key(key: string): SchemaBuilder

  addSchemaBundle(bundle: Partial<RuntimeSchema>): SchemaBuilder

  addSchemaBundles(bundles: Partial<RuntimeSchema>[]): SchemaBuilder

  addNode(params: Partial<NodeSchema<IoAttribute>>): SchemaBuilder

  createNode(params: CreateNodeFn): SchemaBuilder

  addEdge(params: Partial<EdgeSchema<IoAttribute>>): SchemaBuilder

  removeNode(type: string): SchemaBuilder

  removeEdge(type: string): SchemaBuilder

  description(description: string): SchemaBuilder

  title(title: string): SchemaBuilder

  addIOAttribute(attribute: IoAttribute): SchemaBuilder

  addIOAttributes(attributes: IoAttribute[]): SchemaBuilder

  removeIOAttribute(attribute: IoAttribute): SchemaBuilder

  setIoAttributes(attributes: string[]): SchemaBuilder
}

export class SchemaBuilderImpl implements SchemaBuilder {
  schema: RuntimeSchema

  constructor(params: Partial<RuntimeSchema> = {}) {
    this.schema = {
      key: params.key || "",
      title: params.title || "",
      description: params.description || "",
      ioAttributes: params.ioAttributes || [],
      nodes: params.nodes || [],
      edges: params.edges || [],
    }
  }

  key(key: string): SchemaBuilder {
    return this.updateSchema({
      key
    })
  }

  title(title: string): SchemaBuilder {
    return this.updateSchema({
      title
    })
  }

  updateSchema(params: Partial<RuntimeSchema>): SchemaBuilder {
    this.schema = produce(this.schema, draft => {
      draft!.key = params.key || draft?.key || ""
      draft!.nodes = params.nodes || draft?.nodes || []
      draft!.edges = params.edges || draft?.edges || []
      draft!.ioAttributes = params.ioAttributes || draft?.ioAttributes || []
      draft!.description = params.description || draft?.description
      draft!.title = params.title || draft?.title || ""
    })

    return this
  }

  addSchemaBundles(bundles: Partial<RuntimeSchema>[]): SchemaBuilder {
    bundles.forEach(bundle => this.addSchemaBundle(bundle))
    return this
  }

  addSchemaBundle(bundle: Partial<RuntimeSchema>): SchemaBuilder {
    if (
      !bundle.nodes?.length &&
      !bundle.edges?.length &&
      !bundle.ioAttributes?.length
    ) {
      return this
    }

    return this.updateSchema({
      nodes: collect([...this.schema.nodes])
        .concat(bundle?.nodes?.length ? [bundle.nodes] : [])
        .all(),
      edges: collect([...this.schema.edges])
        .concat(bundle.edges?.length ? [bundle.edges] : [])
        .all(),
      ioAttributes: collect([...this.schema.ioAttributes])
        .concat(bundle.ioAttributes?.length ? [bundle.ioAttributes] : [])
        .all()
    })
  }

  addNode(params: Partial<NodeSchema<IoAttribute>>): SchemaBuilder {
    return this.updateSchema({
      nodes: collect([...this.schema.nodes])
        .push({ ...params } as NodeSchema<IoAttribute>)
        .unique("key")
        .all()
    })
  }

  createNode(params: CreateNodeFn): SchemaBuilder {
    return this.addNode(params(nodeBuilder()))
  }

  addEdge(params: Partial<EdgeSchema<IoAttribute>>): SchemaBuilder {
    return this.updateSchema({
      edges: collect([...this.schema.edges])
        .push({ ...params } as EdgeSchema<IoAttribute>)
        .unique("key")
        .all()
    })
  }

  removeNode(type: string): SchemaBuilder {
    return this.updateSchema({
      nodes: collect([...this.schema.nodes])
        .filter(node => node.key !== type)
        .all()
    })
  }

  removeEdge(type: string): SchemaBuilder {
    return this.updateSchema({
      edges: collect([...this.schema.edges])
        .filter(edge => edge.key !== type)
        .all()
    })
  }

  description(description: string): SchemaBuilder {
    return this.updateSchema({
      description
    })
  }

  addIOAttribute(attribute: IoAttribute): SchemaBuilder {
    return this.updateSchema({
      ioAttributes: collect([...this.schema.ioAttributes])
        .push(attribute)
        .unique()
        .all()
    })
  }

  addIOAttributes(attributes: IoAttribute[]): SchemaBuilder {
    return this.updateSchema({
      ioAttributes: collect([...this.schema.ioAttributes])
        .concat(attributes)
        .all()
    })
  }

  removeIOAttribute(attribute: string): SchemaBuilder {
    return this.updateSchema({
      ioAttributes: collect([...this.schema.ioAttributes])
        .except([attribute])
        .all()
    })
  }

  setIoAttributes(attributes: IoAttribute[]): SchemaBuilder {
    return this.updateSchema({
      ioAttributes: attributes
    })
  }

  build(): RuntimeSchema {
    return { ...this.schema }
  }
}

export function schemaBuilder() {
  return new SchemaBuilderImpl()
}
