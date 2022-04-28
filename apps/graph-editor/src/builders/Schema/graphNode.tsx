import { GraphNode, GraphNodePosition } from "../../types/GraphSchema"
import {
  IoAttribute,
  NodeSchema,
  NodeSocketSchema
} from "../../types/RuntimeSchema"
import produce from "immer"
import { collect } from "collect.js"

export interface GraphNodeBuilder<T = IoAttribute> {
  build(): GraphNode

  position(position: GraphNodePosition): GraphNodeBuilder<T>

  data(data: Record<string, any>): GraphNodeBuilder<T>

  type(type: string): GraphNodeBuilder<T>

  key(key: string): GraphNodeBuilder<T>

  label(label: string): GraphNodeBuilder<T>

  targets(targets: NodeSocketSchema[]): GraphNodeBuilder<T>

  addTarget(target: NodeSocketSchema): GraphNodeBuilder<T>

  sources(sources: NodeSocketSchema[]): GraphNodeBuilder<T>

  addSource(source: NodeSocketSchema): GraphNodeBuilder<T>

  fromSchema(schema: NodeSchema<T>): GraphNodeBuilder<T>
}

export class GraphNodeBuilderImpl<T = IoAttribute>
  implements GraphNodeBuilder<T>
{
  graphNode: GraphNode

  defaultValues: Record<string | IoAttribute, any>

  constructor(
    params: Partial<GraphNode> = {},
    defaultValues: Record<string | IoAttribute, any> = {} as any
  ) {
    this.graphNode = this.getBaseNode(params)
    this.defaultValues = defaultValues
  }

  getBaseNode(params: Partial<GraphNode>): GraphNode {
    return {
      key: params.key || this.getNewKey(),
      sources: params.sources || [],
      targets: params.targets || [],
      data: params.data || {},
      type: params.type || "any",
      label: params.label || "Any node",
      position: {
        x: 0,
        y: 0
      }
    }
  }

  getNewKey(prefix = "node") {
    return `${prefix}_${new Date().getTime().toString()}`
  }

  updateNode(params: Partial<GraphNode>): GraphNodeBuilder<T> {
    this.graphNode = produce(this.graphNode, draft => {
      draft.key = params.key || draft.key
      draft.sources = params.sources || draft.sources
      draft.targets = params.targets || draft.targets
      draft.data = params.data || draft.data
      draft.type = params.type || draft.type
      draft.label = params.label || draft.label
      draft.position = params.position || draft.position
    })

    return this
  }

  position(position: GraphNodePosition): GraphNodeBuilder<T> {
    return this.updateNode({
      position
    })
  }

  fromSchema(schema: NodeSchema<T>): GraphNodeBuilder<T> {
    return this.updateNode({
      type: schema.key,
      label: schema.label,
      key: this.getNewKey(schema.key),
      targets: schema.targets,
      sources: schema.sources,
      data: collect(Object.entries(schema.data))
        .map(([key, type]) => {
          return [key, this.defaultValues[type as any]]
        })
        .mapToDictionary((item: any) => item)
        .all()
    })
  }

  addSource(source: NodeSocketSchema): GraphNodeBuilder<T> {
    return this.updateNode({
      sources: collect([...this.graphNode.sources])
        .push(source)
        .all()
    })
  }

  addTarget(target: NodeSocketSchema): GraphNodeBuilder<T> {
    return this.updateNode({
      targets: collect([...this.graphNode.sources])
        .push(target)
        .all()
    })
  }

  build(): GraphNode {
    return this.graphNode
  }

  data(data: Record<string, any>): GraphNodeBuilder<T> {
    return this.updateNode({
      data
    })
  }

  key(key: string): GraphNodeBuilder<T> {
    return this.updateNode({
      key
    })
  }

  label(label: string): GraphNodeBuilder<T> {
    return this.updateNode({
      label
    })
  }

  sources(sources: NodeSocketSchema[]): GraphNodeBuilder<T> {
    return this.updateNode({
      sources
    })
  }

  targets(targets: NodeSocketSchema[]): GraphNodeBuilder<T> {
    return this.updateNode({
      targets
    })
  }

  type(type: string): GraphNodeBuilder<T> {
    return this.updateNode({
      type
    })
  }
}

const defaultNodeValues: Record<string | IoAttribute, any> = {
  string: "",
  number: 0,
  boolean: false,
  json: {},
  image: {
    alt: "",
    url: ""
  }
}

export function graphNodeBuilder<T = IoAttribute>(
  initialNode: Partial<GraphNode> = {},
  defaultValues = defaultNodeValues
) {
  return new GraphNodeBuilderImpl<T>(initialNode, defaultValues)
}
