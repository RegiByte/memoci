import {
  GraphEdge,
  GraphIoMap,
  GraphNode,
  GraphNodeData,
  GraphNodePosition,
  GraphSchema
} from "../../types/GraphSchema"
import { IoAttribute } from "../../types/RuntimeSchema"
import produce from "immer"
import { collect } from "collect.js"

export interface GraphNodePositionChange {
  key: string
  position: GraphNodePosition
}

export interface GraphBuilder<T = IoAttribute> {
  build(): GraphSchema

  key(key: string): GraphBuilder<T>

  title(title: string): GraphBuilder<T>

  description(description: string): GraphBuilder<T>

  docs(docs: string): GraphBuilder<T>

  nodes(nodes: GraphNode[]): GraphBuilder<T>

  addNode(node: GraphNode): GraphBuilder<T>

  addNodes(nodes: GraphNode[]): GraphBuilder<T>

  edges(edges: GraphEdge[]): GraphBuilder<T>

  addEdge(edge: GraphEdge): GraphBuilder<T>

  addEdges(edges: GraphEdge[]): GraphBuilder<T>

  inputs(inputs: GraphIoMap<T>): GraphBuilder<T>

  outputs(outputs: GraphIoMap<T>): GraphBuilder<T>

  updateNodesPositions(changes: GraphNodePositionChange[]): GraphBuilder<T>
}

export class GraphBuilderImpl<T = IoAttribute, D = GraphNodeData<T>>
  implements GraphBuilder<T>
{
  graph: GraphSchema<T>

  constructor(params: Partial<GraphSchema<T>>) {
    this.graph = this.getBaseSchema(params)
  }

  getBaseSchema(params: Partial<GraphSchema<T>>): GraphSchema<T> {
    let graphCreationTime = new Date().getTime()
    return {
      key: params.key || `graph_${graphCreationTime}`,
      inputs: params.inputs || {},
      outputs: params.outputs || {},
      edges: params.edges || [],
      nodes: params.nodes || [],
      docs: params.docs || "",
      title: params.docs || `Graph ${graphCreationTime}`
    }
  }

  build(): GraphSchema {
    let schema = JSON.parse(JSON.stringify(this.graph))
    this.graph = this.getBaseSchema({})
    return schema
  }

  updateSchema(params: Partial<GraphSchema<T>>): GraphBuilder<T> {
    this.graph = produce(this.graph, draft => {
      draft.key = params.key || draft.key
      draft.title = params.title || draft.title
      draft.description = params.description || draft.description
      draft.docs = params.docs || draft.docs
      draft.edges = (params.edges || draft.edges || []) as any
      draft.nodes = (params.nodes || draft.nodes || []) as any
      draft.inputs = (params.inputs || draft.inputs || {}) as any
      draft.outputs = (params.outputs || draft.outputs || {}) as any
    })

    return this
  }

  updateNodesPositions(changes: GraphNodePositionChange[]): GraphBuilder<T> {
    const updatedNodes = produce(this.graph.nodes, draft => {
      const nodesByKey = (collect(draft as GraphNode[]).keyBy("key").all() as unknown as Record<string, GraphNode>)

      changes.forEach(change => {
        const changeNode = nodesByKey[change.key]
        if (!changeNode) return

        nodesByKey[change.key].position = {
          x: change.position.x || changeNode.position.x,
          y: change.position.y || changeNode.position.y
        }
      })

      draft = collect(nodesByKey).values().all() as any
    })

    console.log({
      changes,
      updatedNodes
    })

    return this
  }

  description(description: string): GraphBuilder<T> {
    return this.updateSchema({
      description
    })
  }

  docs(docs: string): GraphBuilder<T> {
    return this.updateSchema({
      docs
    })
  }

  edges(edges: GraphEdge[]): GraphBuilder<T> {
    return this.updateSchema({
      edges
    })
  }

  addEdge(edge: GraphEdge): GraphBuilder<T> {
    return this.updateSchema({
      edges: collect([...this.graph.edges])
        .push(edge)
        .unique("key")
        .all()
    })
  }

  addEdges(edges: GraphEdge[]): GraphBuilder<T> {
    return this.updateSchema({
      edges: collect([...this.graph.edges])
        .concat([edges])
        .unique("key")
        .all()
    })
  }

  nodes(nodes: GraphNode[]): GraphBuilder<T> {
    return this.updateSchema({
      nodes
    })
  }

  addNode(node: GraphNode): GraphBuilder<T> {
    return this.updateSchema({
      nodes: collect([...this.graph.nodes])
        .push(node)
        .unique("key")
        .all()
    })
  }

  addNodes(nodes: GraphNode[]): GraphBuilder<T> {
    return this.updateSchema({
      nodes: collect([...this.graph.nodes])
        .concat([nodes])
        .unique("key")
        .all()
    })
  }

  inputs(inputs: GraphIoMap<T>): GraphBuilder<T> {
    return this.updateSchema({
      inputs
    })
  }

  key(key: string): GraphBuilder<T> {
    return this.updateSchema({
      key
    })
  }

  outputs(outputs: GraphIoMap<T>): GraphBuilder<T> {
    return this.updateSchema({
      outputs
    })
  }

  title(title: string): GraphBuilder<T> {
    return this.updateSchema({
      title
    })
  }
}

export function graphBuilder<T = IoAttribute, D = GraphNodeData<T>>(
  initialGraph: Partial<GraphSchema<T>> = {}
) {
  return new GraphBuilderImpl<T>(initialGraph)
}
